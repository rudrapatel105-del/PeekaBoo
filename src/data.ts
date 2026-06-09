import { LanguageCode, GoogleReview, WeeklyMenu, BlogPost, EnrollmentSubmission, TourBooking, ChildPortfolio } from "./types";

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    brandName: "Peekaboo Corner Regina Childcare",
    tagline: "Where Little Minds Grow, Explore & Thrive",
    subTagline: "Saskatchewan Licensed Childcare providing nurturing care, nature focus, healthy vegetarian meals, and individualized play-based learning.",
    bookTour: "Book a Tour",
    joinWaitlist: "Join Waitlist",
    downloadHandbook: "Parent Handbook",
    licensingReady: "Licensed Space",
    grantReady: "Saskatchewan Parent Grant Eligible",
    healthyMeals: "100% Vegetarian Nutrition",
    navHome: "Home",
    navAbout: "About Us",
    navPrograms: "Programs",
    navCurriculum: "Curriculum",
    navDailyLife: "Daily Life",
    navParentResources: "Resources",
    navEnrollment: "Enrollment",
    navGallery: "Gallery",
    navBlog: "Blog",
    navContact: "Contact",
    navPortal: "Parent Portal",
    navAdmin: "Admin Provider Portal",
    subsidyHighlight: "Under the federal-provincial child care agreement, our licensed space brings fees down to roughly $217.50/month for infant/toddler eligible parents. That's affordable, premium care for Regina families!",
    schoolHours: "Hours: Monday – Friday | 7:30 AM – 5:30 PM",
    address: "4822 Queen Street, Regina, SK, S4S 6V3",
    phone: "Phone: (306) 555-0198",
    email: "Email: hello@peekaboocorner.ca"
  },
  fr: {
    brandName: "Garderie Peekaboo Corner Regina",
    tagline: "Où les petits esprits grandissent, explorent et s'épanouissent",
    subTagline: "Garde d'enfants agréée en Saskatchewan offrant des soins attentionnés, une focalisation sur la nature, de repas végétariens sains et un apprentissage par le jeu personnalisé.",
    bookTour: "Réserver une visite",
    joinWaitlist: "Rejoindre la liste d'attente",
    downloadHandbook: "Guide des parents",
    licensingReady: "Espace agréé",
    grantReady: "Éligible aux subventions de la Saskatchewan",
    healthyMeals: "Alimentation 100% végétarienne",
    navHome: "Accueil",
    navAbout: "À propos de nous",
    navPrograms: "Programmes",
    navCurriculum: "Programme d'études",
    navDailyLife: "Vie quotidienne",
    navParentResources: "Ressources",
    navEnrollment: "Inscription",
    navGallery: "Galerie",
    navBlog: "Blog",
    navContact: "Contact",
    navPortal: "Portail Parents",
    navAdmin: "Régisseur",
    subsidyHighlight: "Dans le cadre de l'accord fédéral-provincial sur la garde d'enfants, nos places réduisent les frais à environ 217,50 $/mois pour les parents éligibles.",
    schoolHours: "Heures : Lundi – Vendredi | 7h30 – 17h30",
    address: "4822 Queen Street, Regina, SK, S4S 6V3",
    phone: "Tél : (306) 555-0198",
    email: "Courriel : hello@peekaboocorner.ca"
  },
  hi: {
    brandName: "पीकाबू कॉर्नर रेजिना चाइल्डकेयर",
    tagline: "जहाँ नन्हे दिमाग बढ़ते हैं, खोजते हैं और फलते-फूलते हैं",
    subTagline: "सस्केचेवान लाइसेंसीकृत चाइल्डकेयर जो पोषण देखभाल, प्रकृति फोकस, स्वस्थ शाकाहारी भोजन और व्यक्तिगत खेल-आधारित शिक्षा प्रदान करता है।",
    bookTour: "दौरे की बुकिंग करें",
    joinWaitlist: "प्रतीक्षा सूची में शामिल हों",
    downloadHandbook: "अभिभावक पुस्तिका",
    licensingReady: "लाइसेंसीकृत स्थान",
    grantReady: "सस्केचेवान मूल अनुदान योग्य",
    healthyMeals: "100% शाकाहारी पोषण",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navPrograms: "कार्यक्रम",
    navCurriculum: "पाठ्यक्रम",
    navDailyLife: "दैनिक जीवन",
    navParentResources: "अभिभावक संसाधन",
    navEnrollment: "नामांकन",
    navGallery: "गैलरी",
    navBlog: "ब्लॉग",
    navContact: "संपर्क",
    navPortal: "अभिभावक पोर्टल",
    navAdmin: "प्रदाता पोर्टल",
    subsidyHighlight: "संघीय-प्रांतीय बाल देखभाल समझौते के तहत, हमारा लाइसेंसीकृत स्थान पात्र माता-पिता के लिए प्रति माह लगभग $217.50 तक शुल्क कम करता है।",
    schoolHours: "समय: सोमवार से शुक्रवार | सुबह 7:30 - शाम 5:30 बजे",
    address: "4822 क्वीन स्ट्रीट, रेजिना, सस्केचेवान",
    phone: "फोन: (306) 555-0198",
    email: "ईमेल: hello@peekaboocorner.ca"
  },
  gu: {
    brandName: "પીકાબુ કોર્નર રેજીના ચાઇલ્ડકેર",
    tagline: "જ્યાં નાનાં મગજો વધે છે, અન્વેષણ કરે છે અને ખીલે છે",
    subTagline: "સાસ્કાચેવાન લાયસન્સવાળું ચાઇલ્ડકેર જે પ્રેમાળ સંભાળ, પ્રકૃતિ કેન્દ્ર, સ્વસ્થ શાકાહારી ભોજન અને વ્યક્તિગત રમત-આધારિત શિક્ષણ પૂરું પાડે છે.",
    bookTour: "મુલાકાત બુક કરો",
    joinWaitlist: "પ્રતિક્ષા યાદીમાં જોડાઓ",
    downloadHandbook: "વાલી પુસ્તિકા",
    licensingReady: "લાયસન્સવાળી જગ્યા",
    grantReady: "સરકારી સબસિડી લાયક",
    healthyMeals: "100% શાકાહારી સંતુલિત આહાર",
    navHome: "મુખ્ય પૃષ્ઠ",
    navAbout: "અમારા વિશે",
    navPrograms: "કાર્યક્રમો",
    navCurriculum: "અભ્યાસક્રમ",
    navDailyLife: "દિનચર્યા",
    navParentResources: "વાલી સ્ત્રોત",
    navEnrollment: "પ્રવેશ પ્રક્રિયા",
    navGallery: "ગેલેરી",
    navBlog: "બ્લોગ",
    navContact: "સંપર્ક",
    navPortal: "વાલી પોર્ટલ",
    navAdmin: "સંચાલક પોર્ટલ",
    subsidyHighlight: "સરકારી સબસિડી કરાર હેઠળ, આપણી લાયસન્સવાળી જગ્યાઓમાં વાલીઓને મહિને માત્ર આશરે $217.50 જેવી ઓછી રકમ ચૂકવવાની રહે છે.",
    schoolHours: "સમય: સોમવાર થી શુક્રવાર | સવારે 7:30 થી સાંજે 5:30",
    address: "4822 ક્વીન સ્ટ્રીટ, રેજીના, સાસ્કાચેવાન",
    phone: "ફોન: (306) 555-0198",
    email: "ઈમેલ: hello@peekaboocorner.ca"
  }
};

export const INITIAL_SUBMISSIONS: EnrollmentSubmission[] = [
  {
    id: "REG-839210",
    parent: {
      firstName: "Ravi",
      lastName: "Patel",
      email: "ravi14patel@gmail.com",
      phone: "(306) 555-4321",
      relationship: "Father",
      address: "123 Albert St, Regina, SK"
    },
    child: {
      firstName: "Aarav",
      lastName: "Patel",
      birthDate: "2024-04-12",
      gender: "Male",
      allergies: "Dairy products",
      medications: "None",
      specialNeeds: "None"
    },
    preferredStartDate: "2026-09-01",
    scheduleRequirements: "Full-Time",
    photoPermissions: true,
    status: "Approved",
    submissionDate: "2026-05-10T10:00:00Z",
    waitlistRank: 1
  },
  {
    id: "REG-120938",
    parent: {
      firstName: "Sarah",
      lastName: "McDonald",
      email: "sarah.m@yahoo.ca",
      phone: "(306) 555-9876",
      relationship: "Mother",
      address: "4509 Parliament Ave, Regina, SK"
    },
    child: {
      firstName: "Liam",
      lastName: "McDonald",
      birthDate: "2023-01-08",
      gender: "Male",
      allergies: "None",
      medications: "None",
      specialNeeds: "Sensory room requirement"
    },
    preferredStartDate: "2026-07-01",
    scheduleRequirements: "Full-Time",
    photoPermissions: true,
    status: "Waitlisted",
    submissionDate: "2026-05-22T14:30:00Z",
    waitlistRank: 5
  },
  {
    id: "REG-657190",
    parent: {
      firstName: "Marie",
      lastName: "Dumont",
      email: "marie.d@gmail.com",
      phone: "(306) 555-7711",
      relationship: "Mother",
      address: "2209 Broad Street, Regina, SK"
    },
    child: {
      firstName: "Chloé",
      lastName: "Dumont",
      birthDate: "2025-02-14",
      gender: "Female",
      allergies: "Nut Allergy (Strict Room Restrictions Apply)",
      medications: "EpiPen on file",
      specialNeeds: "None"
    },
    preferredStartDate: "2026-08-15",
    scheduleRequirements: "Part-Time",
    photoPermissions: false,
    status: "Pending",
    submissionDate: "2026-06-01T09:15:00Z",
    waitlistRank: 12
  },
  {
    id: "REG-991244",
    parent: {
      firstName: "Monali",
      lastName: "Patel",
      email: "ravi14patel@gmail.com",
      phone: "(306) 555-0101",
      relationship: "Mother",
      address: "4822 Queen Street, Regina"
    },
    child: {
      firstName: "Daksh",
      lastName: "Patel",
      birthDate: "2018-04-12",
      gender: "Male",
      allergies: "Strawberry redness (strictly vegetarian diet)",
      medications: "None on regular file",
      specialNeeds: "Enjoys sketching native Saskatchewan prairies"
    },
    preferredStartDate: "2026-09-01",
    scheduleRequirements: "Full-Time",
    photoPermissions: true,
    status: "Pending",
    submissionDate: "2026-06-05T14:20:00Z",
    waitlistRank: 3,
    ageGroupSelected: "school_age",
    schoolAgeSocialResume: {
      schoolName: "Regina Public School District",
      schoolAddress: "Wascana Parkway, Regina",
      schoolPhone: "(306) 555-2244",
      howGetToFromSchool: "School Bus Service arranged by School board",
      languagesSpokenInHome: "English and Gujarati",
      hasPetsCheck: false,
      childAppetiteDesc: "Moderate - loves vegetables and lentils",
      worryShow: "Clings or remains quiet",
      angerShow: "Sighs and seeks a books reading space",
      excitementShow: "Jumps and claps",
      isShy: "Sometimes",
      playAlone: "Sometimes",
      playYounger: "Often",
      playOwnAge: "Often",
      playOlder: "Sometimes",
      playAdults: "Often",
      makeFriendsEasilyCheck: true,
      makeFriendsEasilyComments: "Extremely welcoming of diverse buddies",
      homeDisciplineMethod: "Calm redirection and emotional conversation",
      characteristicsEncouraged: "Empathy, native tree appreciation, sharing"
    },
    emergencyInfo: {
      emer1Name: "Anil Patel",
      emer1Relationship: "Uncle",
      emer1CellPhone: "(306) 555-0199",
      isImmunizedUpToDate: true,
      checkedIllnesses: ["Asthma", "Frequent colds"],
      drugAllergies: "None",
      foodAllergies: "Strawberry",
      otherAllergies: "Dust"
    },
    childCareAgreement: {
      monthlyFeeValue: "450.00",
      additionalCareArrangements: "Before school 07:30 to 08:45 AM and After school 03:30 to 05:30 PM",
      alternateArrangementsText: "Parents provide alternate family care on stats.",
      terminationWeeksNotice: "4 weeks (1 month)",
      authorizedSignatureName: "Monali Patel"
    }
  }
];

export const INITIAL_TOURS: TourBooking[] = [
  {
    id: "TR-5541",
    parentName: "Amara Singh",
    email: "amara@singh.ca",
    phone: "(306) 555-8822",
    childAgeGroup: "Preschool",
    tourType: "In-Person",
    date: "2026-06-12",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: "TR-5542",
    parentName: "Jean-Pierre Tremblay",
    email: "jp@tremblay.ca",
    phone: "(306) 555-3311",
    childAgeGroup: "Infant",
    tourType: "Virtual",
    date: "2026-06-15",
    time: "02:00 PM",
    status: "Confirmed"
  }
];

export const INITIAL_PORTFOLIOS: ChildPortfolio[] = [
  {
    childId: "REG-839210",
    childName: "Aarav Patel",
    ageGroup: "Toddler (18–36 mos)",
    milestones: [
      {
        category: "Cognitive",
        name: "Identifies primary shapes & counts to 5 consistently",
        achievedDate: "2026-05-15",
        status: "Mastered",
        notes: "Aarav excels at separating circles and triangles with high speed."
      },
      {
        category: "Language",
        name: "Constructs 3-word sentences explaining desires",
        achievedDate: "2026-05-28",
        status: "Mastered",
        notes: "Speaks wonderfully: 'I want water', 'Let us play' during morning activity."
      },
      {
        category: "Social-Emotional",
        name: "Shares soft toys and cooperative play toys during Circle Time",
        achievedDate: "2026-06-01",
        status: "Developing",
        notes: "Learning to trade with teammates; exhibits high empathy."
      },
      {
        category: "Physical",
        name: "Balances on one foot for 4 seconds",
        achievedDate: "2026-06-03",
        status: "Emerging",
        notes: "Loves hopping games in our modern outdoor play yard!"
      }
    ],
    summaries: [
      {
        month: "May 2026",
        text: "Aarav has integrated beautifully into our toddler playroom. He is energetic, curious, and incredibly vocal during our Saskatchewan native plant identification circle. His appetite for the vegetarian kitchen is outstanding!",
        author: "Ms. Helena (Lead Early Educator)"
      },
      {
        month: "April 2026",
        text: "Initial transition month was fantastic. Aarav settled from morning drop-offs within 3 minutes and was drawn to the sand sensory exploration bin.",
        author: "Ms. Clara (Licensed Consultant)"
      }
    ]
  }
];

export const REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Michelle Vance",
    rating: 5,
    text: "Peekaboo Corner Regina is truly a home away from home. Being licensed and grant eligible made it extremely affordable under the parent fee reduction scheme! The staff are amazingly loving, the vegetarian food is highly nutritious, and the outdoor focus is so refreshing.",
    relativeTime: "2 weeks ago",
    avatarColor: "bg-amber-100 text-amber-800"
  },
  {
    id: "rev-2",
    author: "Harpreet Dhillon",
    rating: 5,
    text: "The combination of Montessori methods and Reggio Emilia's play philosophy is flawless. My toddler learns so many life skills. Also, the Indigenous and Treaty 4 educational storytelling is integrated with such respect.",
    relativeTime: "1 month ago",
    avatarColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "rev-3",
    author: "Chantal Levesque",
    rating: 5,
    text: "Such a clean, warm, and highly professional daycare! The parent portal daily updates, reports, and milestone summaries give me perfect peace of mind throughout the work day. Highly, highly recommend Peekaboo Regina!",
    relativeTime: "3 months ago",
    avatarColor: "bg-rose-100 text-rose-800"
  }
];

export const MOCK_MENU: WeeklyMenu = {
  weekStarting: "June 2026",
  days: [
    {
      day: "Monday",
      breakfast: "Organic Oats with Regina Prairie Honey & Blueberries",
      morningSnack: "Fresh Sliced Saskatchewan Apples & Seed-butter",
      lunch: "Creamy Red Lentil Dahl with Warm Basmati Rice & Steamed Broccoli",
      afternoonSnack: "Whole wheat Crackers & Homemade Red Pepper Hummus"
    },
    {
      day: "Tuesday",
      breakfast: "Prairie Wheat pancakes with warm maple drizzle",
      morningSnack: "Banana slices & allergen-free seed muffin",
      lunch: "Butternut Squash Macaroni & Cheese with side garden spinach salad",
      afternoonSnack: "Greek Yogurt topped with honey & flax seeds"
    },
    {
      day: "Wednesday",
      breakfast: "Fluffy Scrambled Tofu Toast with spinach",
      morningSnack: "Assorted Saskatchewan summer berries cup",
      lunch: "Chickpea & Potato vegetable stew with fresh baked sourdough buns",
      afternoonSnack: "Crispy Cucumber wheels & creamy Avocado dip"
    },
    {
      day: "Thursday",
      breakfast: "Quinoa porridge cooked in coconut milk with raspberries",
      morningSnack: "Crispy roasted chickpeas (lightly salted)",
      lunch: "Vegetable Fried Rice with Organic baked tofu cubes & snap peas",
      afternoonSnack: "Watermelon triangles & homemade sunflower butter"
    },
    {
      day: "Friday",
      breakfast: "Fresh whole-grain bagels with cream cheese alternative",
      morningSnack: "Pear wedges & sweet melon cubes",
      lunch: "Multigrain flatbread pizza with organic mozzarella, bell peppers, tomato & olives",
      afternoonSnack: "Carrot & celery sticks with garden dill dressing"
    }
  ]
};

export const BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Understanding Saskatchewan's Childcare Subsidies",
    excerpt: "Learn how the Parent Fee Reduction Grant drastically lowers your monthly childcare cost to about $217.",
    content: `Childcare is one of the most critical investments a family makes. Fortunately, the Government of Saskatchewan, partnered under the historic Canada-Saskatchewan Canada-Wide Early Learning and Child Care Agreement, has made incredible strides of support.

As a fully licensed Regina center, Peekaboo Corner Regina Childcare is privileged to participate in these Parent Fee Reduction Grants. Under this grant, eligible parents of infants, toddlers, and preschoolers in licensed, subsidized spots will see their direct childcare fees reduced flatly to approximately **$217.50 per month**! 

No extensive income test is required for this base reduction grant—the saving goes directly from the billing account of any registered family! For low-to-mid income families, further Saskatchewan Child Care Subsidies (CCS) can be applied to bring the final parent fee down to virtually $0.00. 

Speak to our administration during your tour, or ask our Peekaboo Virtual Assistant in the bottom right corner for immediate instructions on applying!`,
    date: "June 2, 2026",
    category: "Financial Resources",
    readTime: "4 min read"
  },
  {
    id: "blog-2",
    title: "Why Fresh Vegetarian Childcare Nutrition Matters",
    excerpt: "Exploring the immense physical, cognitive and cognitive advantages of our custom Regina plant-based menu.",
    content: `At Peekaboo Corner Regina, our kitchen is a source of immense pride. We are 100% vegetarian, nut-free, and focus heavily on fresh, Saskatchewan-produced staples. But why vegetarian?

Scientific early-childhood research highlights that a clean, fiber-rich, plant-based diet promotes excellent heart health, continuous gut wellness, and perfect sustained cognitive energy without the typical sugar spikes and heavy digests of processed meats. 

Our menu incorporates:
- Saskatchewan-grown red lentils, chickpeas, and prairie grains.
- High-protein options like organic block tofu, roasted seeds, and dairy alternatives.
- Antioxidant-rich wild Sask berries, local apples, and crisp garden greens.

We also eliminate cross-contamination hazards completely by being a strictly nut-free environment! Parents with dairy, gluten, or soy allergies receive customized plates cooked safely by our certified culinary lead.`,
    date: "May 25, 2026",
    category: "Nutrition",
    readTime: "5 min read"
  },
  {
    id: "blog-3",
    title: "Treaty 4 Land Education at the Preschool Stage",
    excerpt: "Our deep commitment to Indigenous learning pathways and recognizing our place in Saskatchewan’s rich heritage.",
    content: `Peekaboo Corner Regina operates proudly within the ancestral lands of Treaty 4 territory—the traditional home of the Cree, Saulteaux, Dakota, Lakota, Nakoda, and the homeland of the Métis Nation. 

We believe that reconciliation and cultural celebration should begin at the very cradle of learning. In our circles:
1. We practice natural, sensory connections to local flora (sage, sweetgrass, saskatoon willow).
2. We share traditional Indigenous legends of prairie stars, talking trees, and bisons.
3. We learn simple Cree and Saulteaux greetings, fostering a profound multicultural perspective of respect.

By honoring the treaty relationship with our little learners, we help raise a generation of Regina citizens who understand community, togetherness, and environmental stewardship natively.`,
    date: "May 10, 2026",
    category: "Learning Philosophy",
    readTime: "6 min read"
  }
];
