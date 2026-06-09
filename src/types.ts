export type LanguageCode = "en" | "fr" | "hi" | "gu";

export interface ParentInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
  address: string;
}

export interface ChildInfo {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  allergies: string;
  medications: string;
  specialNeeds: string;
}

export interface EnrollmentSubmission {
  id: string;
  parent: ParentInfo;
  child: ChildInfo;
  preferredStartDate: string;
  scheduleRequirements: "Full-Time" | "Part-Time" | "Half-Day";
  photoPermissions: boolean;
  status: "Pending" | "Waitlisted" | "Approved" | "Enrolled";
  submissionDate: string;
  waitlistRank: number;
  ageGroupSelected?: string;
  schoolAgeSocialResume?: any;
  infantSocialResume?: any;
  toddlerSocialResume?: any;
  parentHandbookConsent?: any;
  emergencyInfo?: any;
  healthResume?: any;
  medicationForm?: any;
  childCareAgreement?: any;
  medicalCertificate?: any;
}

export interface TourBooking {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childAgeGroup: "Infant" | "Toddler" | "Preschool" | "Kindergarten" | "School Age";
  tourType: "In-Person" | "Virtual";
  date: string;
  time: string;
  status: "Confirmed" | "Rescheduled" | "Completed";
}

export interface DailyReport {
  id: string;
  date: string;
  mood: string;
  meals: {
    breakfast: string;
    lunch: string;
    snack1: string;
    snack2: string;
  };
  activities: string[];
  naps: string;
  incidentOrNote: string;
  photos: string[];
}

export interface ChildMilestone {
  category: "Cognitive" | "Social-Emotional" | "Physical" | "Language" | "Creative";
  name: string;
  achievedDate: string;
  status: "Emerging" | "Developing" | "Mastered";
  notes: string;
}

export interface ChildPortfolio {
  childId: string;
  childName: string;
  ageGroup: string;
  milestones: ChildMilestone[];
  summaries: { month: string; text: string; author: string }[];
}

export interface WeeklyMenu {
  weekStarting: string;
  days: {
    day: string;
    breakfast: string;
    morningSnack: string;
    lunch: string;
    afternoonSnack: string;
  }[];
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  avatarColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
}
