// In-memory OAuth store for Google Workspace Access Token
let cachedAccessToken: string | null = null;
let googleUser: { name: string; email: string; picture?: string } | null = null;

export function getCachedToken(): string | null {
  return cachedAccessToken;
}

export function setCachedToken(token: string | null) {
  cachedAccessToken = token;
}

export function getGoogleUser() {
  return googleUser;
}

export function setGoogleUser(user: { name: string; email: string; picture?: string } | null) {
  googleUser = user;
}

// Check if we are running in the sandbox or have user credentials
export function isGoogleAuthenticated(): boolean {
  return !!cachedAccessToken;
}

/**
 * Parses Google Docs response body content into HTML/Renderable items
 * StructuralElement conforms to Google Docs REST formatting rules.
 */
export function parseDocContentToText(docData: any): { title: string; paragraphs: string[] } {
  if (!docData) return { title: "Untitled Doc", paragraphs: [] };
  
  const title = docData.title || "Untitled Document";
  const paragraphs: string[] = [];

  try {
    const body = docData.body;
    if (body && body.content) {
      body.content.forEach((element: any) => {
        if (element.paragraph && element.paragraph.elements) {
          let pText = "";
          element.paragraph.elements.forEach((el: any) => {
            if (el.textRun && el.textRun.content) {
              pText += el.textRun.content;
            }
          });
          const trimmed = pText.trim();
          if (trimmed) {
            paragraphs.push(trimmed);
          }
        }
      });
    }
  } catch (e) {
    console.error("Error parsing Google Doc paragraphs:", e);
  }

  return { title, paragraphs };
}

/**
 * --------------------------------------------
 * GOOGLE DOCS REST API CALLS
 * --------------------------------------------
 */

export async function fetchGoogleDoc(accessToken: string, docId: string): Promise<any> {
  const url = `https://docs.googleapis.com/v1/documents/${docId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Docs API Error (${response.status}): ${errText}`);
  }

  return response.json();
}

export async function createGoogleDoc(accessToken: string, title: string, initialContent: string): Promise<any> {
  // 1. Create empty document
  const createUrl = "https://docs.googleapis.com/v1/documents";
  const createRes = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Doc (${createRes.status}): ${errText}`);
  }

  const newDoc = await createRes.json();
  const documentId = newDoc.documentId;

  // 2. Insert initial content using batchUpdate
  if (initialContent && initialContent.trim() !== "") {
    const updateUrl = `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`;
    const updateRes = await fetch(updateUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: [
          {
            insertText: {
              text: initialContent,
              location: { index: 1 },
            },
          },
        ],
      }),
    });

    if (!updateRes.ok) {
      console.warn("Google Doc content insertions failed, returning empty document shell.");
    }
  }

  return newDoc;
}

/**
 * --------------------------------------------
 * GOOGLE FORMS REST API CALLS
 * --------------------------------------------
 */

export async function fetchGoogleForm(accessToken: string, formId: string): Promise<any> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Forms API Error (${response.status}): ${errText}`);
  }

  return response.json();
}

/**
 * Fetches responses for a specific form
 * Scope: https://www.googleapis.com/auth/forms.responses.readonly
 */
export async function fetchGoogleFormResponses(accessToken: string, formId: string): Promise<any> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}/responses`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Form Responses API Error (${response.status}): ${errText}`);
  }

  return response.json();
}

/**
 * Creates a beautiful, customized Google Form and populates it with question items
 */
export interface ChoiceOption {
  value: string;
}

export interface FormQuestionDraft {
  title: string;
  required: boolean;
  type: "TEXT" | "RADIO" | "CHECKBOX";
  options?: string[]; // For RADIO or CHECKBOX choices
}

export async function createGoogleFormWithQuestions(
  accessToken: string,
  title: string,
  description: string,
  questions: FormQuestionDraft[]
): Promise<any> {
  // 1. Create the base form shell
  const createUrl = "https://forms.googleapis.com/v1/forms";
  const createRes = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      info: {
        title,
        description,
      },
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Form shell (${createRes.status}): ${errText}`);
  }

  const formObj = await createRes.json();
  const formId = formObj.formId;

  // 2. Add questions using batchUpdate
  if (questions && questions.length > 0) {
    const batchUrl = `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`;
    
    // Transform questions into Forms API createItem requests
    const requests = questions.map((q, idx) => {
      const questionItem: any = {};
      
      if (q.type === "TEXT") {
        questionItem.question = {
          required: q.required,
          textQuestion: { paragraph: false }
        };
      } else {
        const choiceType = q.type; // RADIO or CHECKBOX
        questionItem.question = {
          required: q.required,
          choiceQuestion: {
            type: choiceType,
            options: q.options ? q.options.map(val => ({ value: val })) : [{ value: "Default Option" }]
          }
        };
      }

      return {
        createItem: {
          item: {
            title: q.title,
            questionItem
          },
          location: {
            index: idx
          }
        }
      };
    });

    const updateRes = await fetch(batchUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    });

    if (!updateRes.ok) {
      console.warn("Subsequent batch update to add questions to Form failed, returning base form shell.");
    }
  }

  return formObj;
}
