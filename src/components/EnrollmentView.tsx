import React, { useState } from "react";
import { 
  CheckCircle, ShieldCheck, Mail, Heart, Phone, HelpCircle, FileText, Gift, Sparkles, Star, 
  MapPin, Check, AlertTriangle, Layers, ChevronRight, Download, Printer, User, Clock, Stethoscope, Smile
} from "lucide-react";
import { LanguageCode, EnrollmentSubmission } from "../types";
import { TRANSLATIONS } from "../data";

interface EnrollmentViewProps {
  lang: LanguageCode;
  onAddEnrollment: (sub: EnrollmentSubmission) => void;
  submissionsList: EnrollmentSubmission[];
}

export default function EnrollmentView({ lang, onAddEnrollment, submissionsList }: EnrollmentViewProps) {
  const t = TRANSLATIONS[lang];

  // Load Google Form integration settings
  const useGoogleForm = localStorage.getItem("peekaboo_use_google_forms_enrollment") === "true";
  let googleFormUrl = localStorage.getItem("peekaboo_google_form_url_enrollment") || "";
  
  if (googleFormUrl.includes("src=")) {
    const match = googleFormUrl.match(/src="([^"]+)"/);
    if (match && match[1]) {
      googleFormUrl = match[1];
    }
  }

  // Active Main Age Cohort Tab
  // Options: "infant" | "toddler" | "preschool" | "school_age"
  const [activeCohort, setActiveCohort] = useState<"infant" | "toddler" | "preschool" | "school_age">("school_age");

  // Success states
  const [successSubmission, setSuccessSubmission] = useState<any | null>(null);

  // Search states for simulated advanced waitlist statuses lookup
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<EnrollmentSubmission | null>(null);

  // Core General State (Synchronized across cohort tabs)
  const [parent, setParent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    relationship: "Mother",
    address: "",
    postalCode: "S4P 3Y2",
    businessPhone: "",
    cellPhone: "",
  });

  const [child, setChild] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "Male",
    allergies: "",
    medications: "",
    specialNeeds: ""
  });

  const [preferredStartDate, setPreferredStartDate] = useState("2026-09-01");
  const [scheduleRequirements, setScheduleRequirements] = useState<"Full-Time" | "Part-Time" | "Half-Day">("Full-Time");
  const [photoPermissions, setPhotoPermissions] = useState(true);

  // --- COHORT-SPECIFIC OPTIONAL EXTENDED STATES ---

  // Infant specific inputs (Form 7785 and regulatory forms)
  const [activeInfantFormTab, setActiveInfantFormTab] = useState<"agreement" | "emergency" | "social" | "medication" | "handbook">("agreement");

  const [infantAgreement, setInfantAgreement] = useState({
    additionalCareArrangements: "Infant safe sleep, outdoor stroller fresh air, and premium sensory play 07:30 AM to 05:30 PM.",
    alternateArrangementsText: "Parents provide alternate family care on stats.",
    latePickUpFeeDetails: "$5.00 per 10 minutes",
    trialPeriodNoticeDays: "5 business days during trial",
    terminationWeeksNotice: "4 weeks (1 month)",
    monthlyFeeValue: "217.50", // Canada-Saskatchewan child care agreement parent portion fee
    authorizedSignatureName: ""
  });

  const [infantSocial, setInfantSocial] = useState({
    nickname: "",
    isBreastFed: true,
    continueBreastFeeding: true,
    breastFeedingCarryOut: "Parents provide stored mother's breastmilk pouches on site, kept cold in regulatory fridge.",
    feedingSchedule: "Demand feeding - usually every 2.5 to 3 hours",
    doesSupplement: false,
    supplementWhatHowOften: "",
    isBottleFed: false,
    bottleFeedingSchedule: "As scheduled by mother",
    // Liquids
    formulaType: "N/A", formulaAmount: "N/A", formulaTimes: "N/A",
    milkType: "Store-prepared organic milk (if 1 year+)", milkAmount: "120ml", milkTimes: "twice daily",
    waterType: "Boiled cooled fresh water", waterAmount: "50ml", waterTimes: "offer with solids",
    otherType: "N/A", otherAmount: "N/A", otherTimes: "N/A",
    bottleFeedingPosition: "Held semi-upright in arms with soft head support",
    burpedPosition: "Held over the shoulder with light patting on upper back",
    doesSpitUp: false,
    spitUpComments: "",
    introducedToSolids: true,
    introSolidsType: "Baby food",
    // Solids Table
    cerealsType: "Organic Oatmeal", cerealsConsistency: "Thin cereal formula mix", cerealsAmount: "2 tbsp", cerealsTimes: "08:15 AM",
    vegetablesType: "Pureed sweet potatoes / carrots", vegetablesConsistency: "Smooth mash", vegetablesAmount: "3 tbsp", vegetablesTimes: "12:15 PM",
    fruitsType: "Mashed banana / apple mash", fruitsConsistency: "Smooth mush", fruitsAmount: "2 tbsp", fruitsTimes: "03:30 PM",
    meatsType: "N/A (strictly vegetarian diet)", meatsConsistency: "N/A", meatsAmount: "N/A", meatsTimes: "N/A",
    snacksType: "N/A (no wheat puffs yet)", snacksConsistency: "N/A", snacksAmount: "N/A", snacksTimes: "N/A",
    foodSensitivities: false,
    foodSensitivitiesDetails: "",
    appetiteDescription: "Good - eager to accept spoons of mashed sweet potato/carrot.",
    foodsLikedDisliked: "Loves carrots and sweet banana. Dislikes spinach purees.",
    // Sleep
    sleepRoutine: "Mornings: 10:00 AM for 1 hour. Afternoons: 02:30 PM for 1.5 hours.",
    helpSleepMethod: "Swaddled in approved sleep sack, back rubbing in crib, dark room with white noise.",
    cryGoingToSleep: false,
    cryGoingToSleepDuration: "",
    cryWaking: false,
    usualSleepPlace: "Standard safety-inspected wooden crib with tight fitted sheet.",
    // Diapering
    diaperType: "Disposable Pampers size 3",
    diaperRoutine: "Change every 2 hours or immediately when wet. Applying skin barrier cream.",
    proneToDiaperRash: false,
    diaperRashTreatment: "Zinc oxide barrier cream / Sudocrem",
    diaperCount: "4 to 5 diapers per session",
    bowelMovementsComments: "Once or twice daily, brown/mustard, soft, no regular constipation issues.",
    // Social / Emotional
    temperament: "Extremely happy, quiet, smiles back at adult vocalization, loves cuddles.",
    overstimulationSigns: "Pulls ears, turns head away, slight whimper.",
    separatesEasily: true,
    separatesEasilyComments: "Enjoys looking around and smiles when handed to educators.",
    isAfraidOfAnything: false,
    fearDetails: "",
    favoriteToyObj: true,
    favoriteToyObjDetails: "Plush cotton organic bunny and soft crinkle book",
    spendTimeWithOtherKids: true,
    spendTimeWithOtherKidsComments: "Loves watching playtimes and giggles",
    activitiesEnjoy: "Tummy time with mirror, musical soft bells play, grasping wooden rattle",
    activitiesDislike: "Sudden vacuum clean noises or unexpected bright lights",
    additionalCaringDetails: "Likes being held and swayed softly when recovering from diaper switches."
  });

  const [parentHandbookConsent, setParentHandbookConsent] = useState({
    philosophyReadAck: false,
    scheduleReadAck: false,
    mealsReadAck: false,
    feesReadAck: false,
    parentSignature: ""
  });

  // Toddler specific inputs
  const [toddlerIntake, setToddlerIntake] = useState({
    pottyTrainingStage: "Not Started", // "Not Started" | "InProgress" | "FullyTrained"
    morningNapNeeded: true,
    comfortWord: "",
    socialReactionNotes: ""
  });

  // Toddler-specific Saskatchewan extended states (Forms 7786, 7777, etc.)
  const [activeToddlerFormTab, setActiveToddlerFormTab] = useState<"agreement" | "emergency" | "social" | "medication" | "handbook">("agreement");

  const [toddlerAgreement, setToddlerAgreement] = useState({
    additionalCareArrangements: "Toddler safe outdoor play, sandbox exploration, and daily social interactive circle times.",
    alternateArrangementsText: "Parents provide alternate family care on stats.",
    latePickUpFeeDetails: "$5.00 per 10 minutes",
    trialPeriodNoticeDays: "5 business days during trial",
    terminationWeeksNotice: "4 weeks (1 month)",
    monthlyFeeValue: "217.50", // Canada-Saskatchewan child care agreement parent portion fee
    authorizedSignatureName: ""
  });

  const [toddlerSocial, setToddlerSocial] = useState({
    nickname: "",
    siblingsList: "Suresh Patel (Sibling, DOB: 2020-03-12, lives at home)",
    othersInHome: "Anil Patel (Uncle)",
    languagesSpoken: "English, Gujarati",
    hasPets: true,
    petsDetails: "One friendly golden retriever named Sheru",
    // Food
    appetite: "Good, loves home cooked dahl and rice, enjoys snacks",
    foodsDisliked: "Broccoli and raw spinach",
    foodsLiked: "Mashed sweet potato, carrots, lentils, banana mash",
    forbiddenFoods: "Strictly vegetarian (no meats, no animal gelatin)",
    feedsOnOwn: "InProgress", // Yes | No | InProgress
    feedingHelpDetails: "Needs light help centering spoon when eating thin soups",
    eatTimesBreakfast: "08:15 AM",
    eatTimesLunch: "12:15 PM",
    eatTimesSnack: "03:30 PM",
    eatTimesSupper: "06:15 PM",
    // Toileting
    inDiapers: "Yes", // Yes | No
    trainingBegun: "No", // Yes | No
    completelyTrained: "No", // Yes | No
    toiletHelpNeeded: "Yes", // Yes | No
    specialToiletWords: "Peepee, Poopo",
    helpDressing: "Yes", // Yes | No
    helpDressingDetails: "Needs help with pull-on pants and socks",
    // Naps
    doesNap: "Yes", // Yes | No
    napRoutine: "Usually naps once daily at 01:00 PM for 2 hours in a quiet dark room with white noise.",
    napConcerns: "No", // Yes | No
    napConcernsDetails: "Sleeps peacefully with own comfort organic bunny plush.",
    // Social / Emotional
    separatesEasily: "Yes", // Yes | No
    separatesComments: "Enjoys waving goodbye and running to look at sand piles.",
    isShy: "Sometimes", // Yes | No | Sometimes
    shyWithWhom: "Brand new adults for the first 5 minutes",
    isAfraidOfAnything: "No", // Yes | No
    afraidDetails: "A bit surprised by unexpected loud train whistles",
    feelingsAffection: "Cuddles, gives high-fives and says 'hug'",
    feelingsFear: "Pulls ears and gets quiet, walks to adult's hand",
    feelingsAnger: "Stomps feet slightly or repeats 'no'",
    feelingsFrustration: "Whimpers, rubs eyes, or asks for helper",
    feelingsExcitement: "Claps hands and squeals, laughs out loud",
    // Page 3 Info
    favoriteToyDetails: "Soft plush cotton organic bunny and blue sandbox bucket",
    playedWithOthers: "Yes", // Yes | No
    playedWithOthersDetails: "Frequent playdates at Wascana park playgroup",
    hasImaginaryPlaymates: "No", // Yes | No
    imaginaryPlaymatesDetails: "",
    activitiesLike: "Sandbox scoops, dynamic water pouring, block towers",
    activitiesDislike: "Sudden hair washes or noisy leaf blowers",
    homeDiscipline: "Calm redirection, quiet conversation, and emotional validation",
    encouragedCharacteristics: "Generosity, patience, native bird appreciation, and sharing",
    discouragedCharacteristics: "Snatching books or shouting during nap preparation",
    additionalCaringDetails: "Enjoys humming soft tunes during transitions."
  });

  const [toddlerHandbookConsent, setToddlerHandbookConsent] = useState({
    philosophyReadAck: false,
    scheduleReadAck: false,
    mealsReadAck: false,
    feesReadAck: false,
    parentSignature: ""
  });

  // Preschool specific inputs
  const [preschoolIntake, setPreschoolIntake] = useState({
    bathroomIndependence: true,
    socialPlayStyle: "",
    fineMotorSkillNote: "",
    outdoorPlayInterest: "High"
  });

  // --- SCHOOL AGE GOVERNMENT MULTI-FORM SUITE STATE ---
  const [activeSchoolAgeFormTab, setActiveSchoolAgeFormTab] = useState<"agreement" | "emergency" | "social" | "medication">("agreement");

  // Form 1: Child Care Services Agreement (Form 7777 / 7790 combo)
  const [schoolAgeAgreement, setSchoolAgeAgreement] = useState({
    additionalCareArrangements: "",
    alternateArrangementsText: "Parents provide alternate family care on stats.",
    latePickUpFeeDetails: "$5.00 per 10 minutes",
    trialPeriodNoticeDays: "5 business days during trial",
    terminationWeeksNotice: "4 weeks (1 month)",
    monthlyFeeValue: "450.00",
    authorizedSignatureName: ""
  });

  // Form 2: Emergency Info & Health Resume (Form 7790 & 7809)
  const [emergencyInfo, setEmergencyInfo] = useState({
    parent2Name: "",
    parent2Address: "",
    parent2PostalCode: "",
    parent2HomePhone: "",
    parent2BusPhone: "",
    parent2CellPhone: "",
    parent2Email: "",
    
    emer1Name: "",
    emer1Relationship: "",
    emer1HomePhone: "",
    emer1BusPhone: "",
    emer1CellPhone: "",
    emer1Email: "",

    emer2Name: "",
    emer2Relationship: "",
    emer2HomePhone: "",
    emer2BusPhone: "",
    emer2CellPhone: "",
    emer2Email: "",

    checkedIllnesses: [] as string[],
    drugAllergies: "",
    foodAllergies: "",
    otherAllergies: "",
    isImmunizedUpToDate: true,
    wasPremature: false,
    prematureWeeks: "",
    developmentConcernsText: "",
    activityLimitationsText: "",
    undergoneSurgeryCheck: false,
    undergoneSurgeryDetails: "",
    specialDietsNeeded: false,
    specialDietsDetails: "",
    additionalMedicalComments: ""
  });

  // Form 3: School-Age Social Resume (Form 7788)
  const [schoolAgeSocial, setSchoolAgeSocial] = useState({
    nickname: "",
    schoolName: "Regina Public School District",
    schoolAddress: "",
    schoolPhone: "",
    howGetToFromSchool: "School Bus Service arranged by School board",
    transportCompanyInvolved: false,
    transportCompanyName: "",
    transportCompanyPhone: "",
    siblingsDetails: "",
    othersLivingInHome: "",
    languagesSpokenInHome: "English",
    hasPetsCheck: false,
    petsDetails: "",
    childAppetiteDesc: "Moderate - loves vegetables and lentils",
    foodsNotPermitted: "",
    eatTimeBreakfast: "07:30 AM",
    eatTimeLunch: "12:00 PM",
    eatTimeSnack: "03:15 PM",
    eatTimeSupper: "06:00 PM",
    foodEatingFurtherInfo: "",
    helpDressingCheck: false,
    helpDressingDetails: "",
    helpToiletingCheck: false,
    helpToiletingDetails: "",
    
    // Feelings displays
    affectionShow: "Speaks soft and hugs",
    worryShow: "Clings or remains quiet",
    fearShow: "Asks for holding hand",
    angerShow: "Stomps foot and sighs",
    frustrationShow: "Asks for instruction retry",
    excitementShow: "Jumps and claps",

    isShy: "Sometimes", // "Yes" | "No" | "Sometimes"
    shyWithWhom: "Unfamiliar playground environment",
    shyWhen: "First introductions day",

    // Enjoy playing settings (often, sometimes, never)
    playAlone: "Sometimes",
    playYounger: "Often",
    playOwnAge: "Often",
    playOlder: "Sometimes",
    playAdults: "Often",

    makeFriendsEasilyCheck: true,
    makeFriendsEasilyComments: "Extremely welcoming of diverse buddies",
    hasImaginaryPlaymatesCheck: false,
    imaginaryPlaymatesDetails: "",
    isEnrolledInExtracurriculars: false,
    extracurricularsList: "",
    homeDisciplineMethod: "Calm redirection and emotional conversation",
    characteristicsEncouraged: "Empathy, native tree appreciation, sharing",
    characteristicsDiscouraged: "Interrupting peers during story periods",
    additionalHelpfulCaringInfo: ""
  });

  // Form 4: Medication Authorization Form (Form 7794) and Medical Certificate (7791)
  const [medicationAuth, setMedicationAuth] = useState({
    medName: "",
    medDosage: "",
    medTimesText: "",
    physicianName: "Regina General Health Clinic",
    physicianPhone: "(306) 555-4822",
    physicianAddress: "1440 14th Ave, Regina, SK S4P 0W5",
    medConsentChecked: false,
    stateOfHealthFitCheck: true,
    medComments: ""
  });

  const ILLNESS_OPTIONS = [
    "Asthma", "Earaches", "Measles (red)", "Tonsillitis",
    "Bronchitis", "Eczema", "Mumps", "Whooping cough",
    "Chickenpox", "Frequent colds", "Pneumonia", "Other",
    "Convulsions", "Influenza", "Polio", "Croup",
    "Injuries", "Rheumatic fever", "Diphtheria", "Measles (German)",
    "Scarlet fever"
  ];

  const handleToggleIllness = (illness: string) => {
    setEmergencyInfo(prev => {
      const checked = prev.checkedIllnesses.includes(illness)
        ? prev.checkedIllnesses.filter(i => i !== illness)
        : [...prev.checkedIllnesses, illness];
      return { ...prev, checkedIllnesses: checked };
    });
  };

  // Submission dispatch handler
  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parent.firstName || !parent.lastName || !parent.email || !child.firstName || !child.birthDate) {
      alert("Please specify parent and child primary coordinates before saving the registration!");
      return;
    }

    const customId = "REG-" + Math.floor(Math.random() * 900000 + 100000);
    
    // Prepare extended bundle structured by active section
    const isSchoolAge = activeCohort === "school_age";
    const isInfant = activeCohort === "infant";
    const isToddler = activeCohort === "toddler";
    const statusLabel = (isSchoolAge || isInfant || isToddler) ? "Pending" : "Waitlisted"; // Sibling intake or infant/toddler regulatory creates Pending status
 
    const mockSubmission: EnrollmentSubmission = {
      id: customId,
      parent: { ...parent },
      child: { ...child },
      preferredStartDate,
      scheduleRequirements,
      photoPermissions,
      status: statusLabel as any,
      submissionDate: new Date().toISOString(),
      waitlistRank: submissionsList.length + 1,
      ageGroupSelected: activeCohort,
      
      // Store custom regulatory packages if school age, infant or toddler selected
      schoolAgeSocialResume: isSchoolAge ? { ...schoolAgeSocial } : null,
      infantSocialResume: isInfant ? { ...infantSocial } : null,
      toddlerSocialResume: isToddler ? { ...toddlerSocial } : null,
      emergencyInfo: (isSchoolAge || isInfant || isToddler) ? { ...emergencyInfo } : { 
        checkedIllnesses: [], 
        drugAllergies: "None", 
        foodAllergies: child.allergies, 
        otherAllergies: "None", 
        isImmunizedUpToDate: true 
      },
      healthResume: (isSchoolAge || isInfant || isToddler) ? {
        physicianName: medicationAuth.physicianName,
        physicianPhone: medicationAuth.physicianPhone,
        physicianAddress: medicationAuth.physicianAddress,
        wasPremature: emergencyInfo.wasPremature,
        prematureWeeks: emergencyInfo.prematureWeeks,
        developmentConcernsText: emergencyInfo.developmentConcernsText,
        activityLimitationsText: emergencyInfo.activityLimitationsText,
        undergoneSurgeryCheck: emergencyInfo.undergoneSurgeryCheck,
        undergoneSurgeryDetails: emergencyInfo.undergoneSurgeryDetails,
        specialDietsNeeded: emergencyInfo.specialDietsNeeded,
        specialDietsDetails: emergencyInfo.specialDietsDetails,
        additionalMedicalComments: emergencyInfo.additionalMedicalComments
      } : null,
      medicationForm: (isSchoolAge || isInfant || isToddler) ? { ...medicationAuth } : null,
      childCareAgreement: isSchoolAge ? { ...schoolAgeAgreement } : isInfant ? { ...infantAgreement } : isToddler ? { ...toddlerAgreement } : null,
      parentHandbookConsent: isInfant ? { ...parentHandbookConsent } : isToddler ? { ...toddlerHandbookConsent } : null
    };

    onAddEnrollment(mockSubmission);
    setSuccessSubmission(mockSubmission);

    // clear fields
    setParent({
      firstName: "", lastName: "", email: "", phone: "", relationship: "Mother", address: "",
      postalCode: "S4P 3Y2", businessPhone: "", cellPhone: ""
    });
    setChild({
      firstName: "", lastName: "", birthDate: "", gender: "Male", allergies: "", medications: "", specialNeeds: ""
    });
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const found = submissionsList.find(
      s => s.id.toUpperCase() === searchTerm.trim().toUpperCase() || 
           s.parent.email.toLowerCase() === searchTerm.trim().toLowerCase()
    );
    setSearchResult(found || null);
    if (!found) {
      alert("No matching registration found. Please check your Registration Token, e.g. 'REG-839210'!");
    }
  };

  // Quick preset data helper for user demo simulation
  const loadPresetParentData = () => {
    setParent({
      firstName: "Monali",
      lastName: "Patel",
      email: "ravi14patel@gmail.com",
      phone: "(306) 555-0101",
      relationship: "Mother",
      address: "4822 Queen Street, Regina",
      postalCode: "S4S 5Y9",
      businessPhone: "(306) 555-0112",
      cellPhone: "(306) 555-0144"
    });

    if (activeCohort === "infant") {
      setChild({
        firstName: "Daksh",
        lastName: "Patel",
        birthDate: "2025-11-20", // 6 months old infant DOB
        gender: "Male",
        allergies: "Mild strawberry redness (strictly vegetarian diet)",
        medications: "None",
        specialNeeds: "Enjoys looking at dynamic black-and-white sensory cards"
      });
      setInfantAgreement(prev => ({
        ...prev,
        authorizedSignatureName: "Monali Patel"
      }));
      setParentHandbookConsent({
        philosophyReadAck: true,
        scheduleReadAck: true,
        mealsReadAck: true,
        feesReadAck: true,
        parentSignature: "Monali Patel"
      });
    } else if (activeCohort === "toddler") {
      setChild({
        firstName: "Arya",
        lastName: "Patel",
        birthDate: "2024-04-10", // 2 years old toddler DOB
        gender: "Female",
        allergies: "Mild reaction to raw hazelnuts (strictly vegetarian menus preferred)",
        medications: "None",
        specialNeeds: "Super friendly, loves water pouring and construction blocks"
      });
      setToddlerAgreement(prev => ({
        ...prev,
        authorizedSignatureName: "Monali Patel"
      }));
      setToddlerHandbookConsent({
        philosophyReadAck: true,
        scheduleReadAck: true,
        mealsReadAck: true,
        feesReadAck: true,
        parentSignature: "Monali Patel"
      });
    } else {
      setChild({
        firstName: "Daksh",
        lastName: "Patel",
        birthDate: "2018-04-12",
        gender: "Male",
        allergies: "Mild strawberry redness (strictly vegetarian dahl menu compliance)",
        medications: "None",
        specialNeeds: "Loves drawing sketches of Saskatchewan prairies"
      });
    }

    setEmergencyInfo(prev => ({
      ...prev,
      emer1Name: "Anil Patel",
      emer1Relationship: "Uncle",
      emer1CellPhone: "(306) 555-0199",
      isImmunizedUpToDate: true,
      checkedIllnesses: ["Asthma", "Frequent colds"],
      drugAllergies: "None",
      foodAllergies: "Strawberry",
      otherAllergies: "Dust"
    }));

    setMedicationAuth(prev => ({
      ...prev,
      medConsentChecked: true,
      stateOfHealthFitCheck: true,
      physicianName: "Regina General Health Clinic",
      physicianPhone: "(306) 555-4822",
      physicianAddress: "1440 14th Ave, Regina, SK S4P 0W5"
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 pb-24 text-xs font-sans">
      
      {/* 1. PORTAL WATERCOLOR INTRO */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase font-extrabold text-[#FF724E] tracking-widest bg-orange-150/40 px-3 py-1 rounded-full">
          Saskatchewan Childcare Official Enrollment
        </span>
        <h1 className="text-2xl md:text-3.5xl font-black text-gray-900 tracking-tight">
          Licensed Workspace Queue & Digitized Form Portal
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-[11px] leading-relaxed">
          Select your child's age group category below to process enrollment queue entries or fully complete Regina’s 
          official provincial early learning regulatory packages online.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPANIONAspect: Waitlist Status lookup & Quick presets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* SASK REGULATORY METADATA PRESET */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100/40 space-y-4">
            <div className="border-b border-gray-100 pb-2.5">
              <h3 className="font-extrabold text-[#FF724E] text-xs uppercase tracking-wide flex items-center gap-1.5">
                <span>📋</span> Saskatchewan Care Licensing
              </h3>
              <p className="text-[10px] text-gray-400">Section 32, 36 & 40 Saskatchewan Child Care Act compliance check</p>
            </div>
            
            <div className="space-y-2 text-[11px] text-gray-650 leading-relaxed">
              <p>
                Regina early daycare service standards dictate that approved placements require the submission of strict health records and agreement resumes on site.
              </p>
              <button
                type="button"
                onClick={loadPresetParentData}
                className="w-full bg-orange-50 hover:bg-orange-100/60 text-[#FF724E] border border-orange-150/40 py-2 rounded-xl font-bold transition-all"
              >
                ⚡ Auto-Fill Monali Patel's Sample Child Data
              </button>
            </div>
          </div>

          {/* ADVANCED WAITLIST TRACKER & TRACK DETAILS */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100/40 space-y-4">
            <div className="border-b border-gray-100 pb-2.5">
              <h3 className="font-extrabold text-gray-800 text-xs uppercase tracking-wide">
                Live Status Inspector
              </h3>
              <p className="text-[10px] text-gray-400 font-medium">Verify priority rank & Saskatchewan fee credentials</p>
            </div>

            <form onSubmit={handleSearchStatus} className="space-y-3">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  required
                  placeholder="REG-XXXXXX Token or Parent Email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                />
                <button 
                  type="submit"
                  className="bg-[#59C7F5] hover:bg-[#43b0de] text-white font-bold px-3 py-2 rounded-xl transition-all"
                >
                  Inspect
                </button>
              </div>
              <p className="text-[9px] text-gray-400">Use 'REG-839210' to inspect Aarav's sample status!</p>
            </form>

            {/* Display search outcomes with complete digitized details */}
            {searchResult && (
              <div className="bg-[#FFFBF5] rounded-2xl p-4.5 border border-orange-100/40 space-y-3.5 text-[11px] text-gray-700 animate-fade-in">
                <div className="flex justify-between items-start border-b border-gray-100 pb-2">
                  <div>
                    <h5 className="font-bold text-gray-900">{searchResult.child.firstName} {searchResult.child.lastName}</h5>
                    <p className="text-[9px] text-gray-400">Cohort ID: {searchResult.id}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    searchResult.status === "Approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {searchResult.status}
                  </span>
                </div>
                
                <div className="space-y-2 leading-relaxed">
                  <p><strong>Waitlist Placement Priority Rank:</strong> <span className="text-[#FF724E] font-black text-xs">#{searchResult.waitlistRank}</span></p>
                  <p><strong>Age cohort category:</strong> <span className="uppercase font-bold text-sky-800">{searchResult.ageGroupSelected || "General Intake"}</span></p>
                  <p><strong>Schedule style:</strong> {searchResult.scheduleRequirements}</p>
                  <p><strong>Target Starting:</strong> {searchResult.preferredStartDate}</p>
                  
                  {searchResult.schoolAgeSocialResume && (
                    <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[10px] text-gray-550">
                      <p className="font-bold text-[#FF6D43] uppercase tracking-wider text-[9px]">Saskatchewan Government Forms Attached:</p>
                      <ul className="list-disc pl-3.5 space-y-0.5 font-bold">
                        <li>Sask. Services Agreement (Form 7777) ✓</li>
                        <li>Sask. Emergency Record (Form 7790) ✓</li>
                        <li>Sask. Health Resume Record (Form 7809) ✓</li>
                        <li>Sask. School-Age Social Book (Form 7788) ✓</li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl p-2.5 text-[10px] border border-orange-50 text-gray-600 leading-relaxed">
                  <strong>Estimated Placed Start Date:</strong> {searchResult.status === "Approved" ? "Confirmed Sept 2026 Space!" : "Est. October 15, 2026 (Subject to preschool graduations)"}
                </div>
                
                <button
                  type="button"
                  onClick={() => setSearchResult(null)}
                  className="text-[#FF724E] text-[10px] font-bold underline"
                >
                  Clear check &rarr;
                </button>
              </div>
            )}
          </div>

          {/* WATERCOLOR CERTIFICATION INSIGHT */}
          <div className="bg-[#EFF8EF]/70 text-emerald-900 rounded-3xl p-5 border border-emerald-100/50 space-y-3">
            <span className="text-2xl">🍁</span>
            <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wide">Canada Saskatchewan Fee Program</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed font-normal">
              For children under 6, parent food & care invoices are automatically reduced from $963.50/month to <strong>$217.50/month</strong>. Regulatory enrollment forms must be actively hosted by providers to maintain funding grants.
            </p>
          </div>
        </div>

        {/* RIGHT ASPECT: THE FORMS PORTAL COMPELLED */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-50/20 space-y-8">
          
          {/* COHORT AGE SELECTOR BAR */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold text-gray-450 tracking-wider">
              Select Child’s Age Group Level Section
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "infant", emoji: "👶", name: "Infant", desc: "6w – 18m" },
                { id: "toddler", emoji: "🧸", name: "Toddler", desc: "19m – 30m" },
                { id: "preschool", emoji: "🎨", name: "Preschool", desc: "31m – 5y" },
                { id: "school_age", emoji: "🎒", name: "School Age", desc: "6y – 12y" }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCohort(c.id as any);
                    // Update child age group presets if empty
                    if (c.id === "school_age") {
                      setChild(prev => ({ ...prev, birthDate: "2018-04-12" }));
                    } else if (c.id === "infant") {
                      setChild(prev => ({ ...prev, birthDate: "2025-11-20" }));
                    } else if (c.id === "toddler") {
                      setChild(prev => ({ ...prev, birthDate: "2024-05-15" }));
                    } else if (c.id === "preschool") {
                      setChild(prev => ({ ...prev, birthDate: "2022-08-30" }));
                    }
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer select-none flex flex-col justify-between h-20 ${
                    activeCohort === c.id
                      ? "bg-gradient-to-br from-[#FFFBF7] to-orange-50/50 border-[#FF724E] ring-2 ring-[#FF724E]/10"
                      : "bg-white border-gray-150 hover:bg-[#FFFBF5]/30 hover:border-orange-100"
                  }`}
                >
                  <span className="text-xl">{c.emoji}</span>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-[11px] leading-tight">{c.name}</h4>
                    <p className="text-[9px] text-gray-400 font-semibold">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE COHORT PREVIEW BANNER */}
          <div className="bg-[#FFFCEF]/50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-center">
            <span className="text-xl">💡</span>
            <div className="text-[11px] text-amber-900 leading-normal">
              {activeCohort === "infant" && (
                <p><strong>Infant Placement:</strong> Operating ratio 1:3. Strict USDA vegetarian organic meals support. Monthly parent portion fee is <strong>$217.50</strong> (reduced from $963.50 via grants).</p>
              )}
              {activeCohort === "toddler" && (
                <p><strong>Toddler Placement:</strong> Operating ratio 1:5. Focus on motor exploration, language play, and gentle potty integration schedules. Fee is <strong>$217.50</strong> (reduced from $900.00).</p>
              )}
              {activeCohort === "preschool" && (
                <p><strong>Preschool / Kindergarten:</strong> Regulated active ratio 1:8. Regina Public School transitions focus. Fee is <strong>$217.50</strong> (reduced from $831.27) or free Kindergarten slots.</p>
              )}
              {activeCohort === "school_age" && (
                <p><strong>School Age (Before & After School Program):</strong> Ages 6 years to 12 years. Parent portion is <strong>$400 – $450</strong> (Canada Subsidy Grant does not apply for 6y+). Includes 6 interactive Saskatchewan regulatory forms below.</p>
              )}
            </div>
          </div>

          {useGoogleForm && googleFormUrl ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-400 to-[#FF724E] text-white p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none shadow-sm">
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                    <span>✨</span> Google Forms Direct Placement Pipeline
                  </h4>
                  <p className="text-[10px] text-white/90 mt-0.5 font-medium">Automatic Master Sheet collection active on external Google Drive</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("peekaboo_use_google_forms_enrollment", "false");
                    window.location.reload();
                  }}
                  className="bg-white/20 hover:bg-white/35 text-white font-extrabold text-[9px] px-3 py-1.5 rounded-xl border border-white/20 cursor-pointer text-center animate-pulse"
                >
                  ⚙️ Switch to Native Forms
                </button>
              </div>

              <div className="w-full bg-white rounded-3xl min-h-[750px] relative overflow-hidden border border-orange-50 shadow-sm p-1">
                <iframe
                  title="Peekaboo Corner Enrollment Google Form"
                  src={googleFormUrl}
                  width="100%"
                  height="800"
                  frameBorder="0"
                  className="w-full h-[850px] rounded-2xl"
                  referrerPolicy="no-referrer"
                >
                  Loading Google Form...
                </iframe>
              </div>

              <div className="bg-sky-50 text-sky-950 border border-sky-100 p-4.5 rounded-2xl text-[10.5px] leading-relaxed">
                👉 <strong>Provincial System Check:</strong> Experiencing problems loading or completing submissions? Parents can contact our admissions coordinator directly at <strong>info@peekaboocorner.com</strong> to secure priority places offline.
              </div>
            </div>
          ) : !successSubmission ? (
            <form onSubmit={handleEnrollSubmit} className="space-y-8">
              
              {/* PRIMARY COHORTS GENERAL INPUTS (Common Parent Guardian details) */}
              <div className="space-y-4">
                <h3 className="font-black text-gray-900 text-xs uppercase tracking-wide border-b border-gray-100 pb-2 text-[#FF724E] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#FF724E]" /> Primary Parent / Guardian Coordinates
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Parent First Name</label>
                    <input
                      type="text"
                      required
                      value={parent.firstName}
                      onChange={(e) => setParent({ ...parent, firstName: e.target.value })}
                      placeholder="e.g. Monali"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Parent Last Name</label>
                    <input
                      type="text"
                      required
                      value={parent.lastName}
                      onChange={(e) => setParent({ ...parent, lastName: e.target.value })}
                      placeholder="e.g. Patel"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={parent.email}
                      onChange={(e) => setParent({ ...parent, email: e.target.value })}
                      placeholder="e.g. patel.m@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Primary Telephone</label>
                    <input
                      type="tel"
                      required
                      value={parent.phone}
                      onChange={(e) => setParent({ ...parent, phone: e.target.value })}
                      placeholder="e.g. (306) 555-0101"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Relationship</label>
                    <select
                      value={parent.relationship}
                      onChange={(e) => setParent({ ...parent, relationship: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E]"
                    >
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Home Address (Regina, SK)</label>
                    <input
                      type="text"
                      required
                      value={parent.address}
                      onChange={(e) => setParent({ ...parent, address: e.target.value })}
                      placeholder="e.g. 4822 Queen Street, Regina"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E] focus:bg-white"
                    />
                  </div>
                  <div className="md:col-span-4 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={parent.postalCode}
                      onChange={(e) => setParent({ ...parent, postalCode: e.target.value })}
                      placeholder="e.g. S4S 5Y9"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#FF724E] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* CHILD COORDINATES */}
              <div className="space-y-4">
                <h3 className="font-black text-gray-900 text-xs uppercase tracking-wide border-b border-gray-100 pb-2 text-[#59C7F5] flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#59C7F5]" /> Child Coordinates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">First Name</label>
                    <input
                      type="text"
                      required
                      value={child.firstName}
                      onChange={(e) => setChild({ ...child, firstName: e.target.value })}
                      placeholder="e.g. Daksh"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Last Name</label>
                    <input
                      type="text"
                      required
                      value={child.lastName}
                      onChange={(e) => setChild({ ...child, lastName: e.target.value })}
                      placeholder="e.g. Patel"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={child.birthDate}
                      onChange={(e) => setChild({ ...child, birthDate: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Allergies (Nut-Free Kitchen)</label>
                    <input
                      type="text"
                      value={child.allergies}
                      onChange={(e) => setChild({ ...child, allergies: e.target.value })}
                      placeholder="e.g. Strawberry redness (strictly vegetarian, allergen controlled)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Special Concerns or Needs</label>
                    <input
                      type="text"
                      value={child.specialNeeds}
                      onChange={(e) => setChild({ ...child, specialNeeds: e.target.value })}
                      placeholder="e.g. Likes crayons and outdoor walks"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* INFANT REGULATORY MULTI-FORM COMPLEX DIGITIZER */}
              {activeCohort === "infant" && (
                <div className="border border-orange-100 rounded-3xl overflow-hidden space-y-6 bg-[#FCFBF9] pb-6">
                  
                  {/* GOVERNMENT BANNER ROW */}
                  <div className="bg-gradient-to-r from-orange-400 to-[#FF724E] text-white p-4 select-none">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="font-extrabold text-[12px] uppercase tracking-wider">
                          Saskatchewan Early Childhood Government Registry (Infant Track)
                        </h4>
                        <p className="text-[10px] text-orange-100">Official Form 7785 Social Resume + Child Care Agreement Form 7777 Integration</p>
                      </div>
                      <span className="text-[9px] bg-white text-slate-800 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                        6 Weeks - 18 Months
                      </span>
                    </div>
                  </div>

                  {/* FORM SELECTION SUB TABS */}
                  <div className="px-4 border-b border-gray-200 flex flex-wrap gap-1">
                    {[
                      { id: "agreement", label: "📄 Form 7777: Services Agreement" },
                      { id: "emergency", label: "🚨 Form 7790 + 7809: Emergency & Health" },
                      { id: "social", label: "👶 Form 7785: Infant Social Resume" },
                      { id: "medication", label: "💊 Form 7794 + 7791: Meds & Cert" },
                      { id: "handbook", label: "📕 Parent Handbook & FOIP" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveInfantFormTab(tab.id as any)}
                        className={`px-3 py-2 rounded-t-xl text-[10.5px] font-extrabold transition-all border-t border-x cursor-pointer ${
                          activeInfantFormTab === tab.id
                            ? "bg-white text-[#FF724E] border-gray-200 border-b-white translate-y-[1px]"
                            : "bg-gray-100/70 text-gray-500 border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB-FORM CONTENT INJECTION */}
                  <div className="px-4 sm:px-6 space-y-6">

                    {/* SUB TAB 1: AGREEMENT (Form 7777) */}
                    {activeInfantFormTab === "agreement" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-950 leading-normal mb-2">
                          <strong>Saskatchewan Agreement for Child Care Services (Form 7777):</strong> This sets out the legally binding contract between parent Monali Patel & early care licensee Monali Patel for Infant care.
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Center Physical address</label>
                            <input
                              type="text"
                              disabled
                              value="4822 Queen Street, Regina, SK S4S 5Y9"
                              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-650"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Agreed Parent-Portion Monthly Care Fee ($ CAD)</label>
                            <input
                              type="text"
                              value={infantAgreement.monthlyFeeValue}
                              onChange={(e) => setInfantAgreement({ ...infantAgreement, monthlyFeeValue: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold text-[#FF724E]"
                            />
                            <p className="text-[9px] text-gray-400 mt-1">Saskatchewan Parent Fee reduction grant automatically applies to infants under 6y!</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Trial Period Notice Standard</label>
                            <input
                              type="text"
                              value={infantAgreement.trialPeriodNoticeDays}
                              onChange={(e) => setInfantAgreement({ ...infantAgreement, trialPeriodNoticeDays: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Termination Week's Written Notice</label>
                            <input
                              type="text"
                              value={infantAgreement.terminationWeeksNotice}
                              onChange={(e) => setInfantAgreement({ ...infantAgreement, terminationWeeksNotice: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500">Additional Infant Supervision Care schedules</label>
                          <textarea
                            rows={2}
                            value={infantAgreement.additionalCareArrangements}
                            onChange={(e) => setInfantAgreement({ ...infantAgreement, additionalCareArrangements: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                          />
                        </div>

                        <div className="p-4 bg-orange-50/20 border border-orange-100 rounded-xl space-y-3">
                          <p className="font-extrabold text-orange-950">Declaration signature simulation:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase font-bold text-orange-900">Signed Parent / Guardian Full Name</label>
                              <input
                                type="text"
                                required={activeCohort === "infant"}
                                value={infantAgreement.authorizedSignatureName}
                                onChange={(e) => setInfantAgreement({ ...infantAgreement, authorizedSignatureName: e.target.value })}
                                placeholder="Monali Patel"
                                className="w-full bg-white border border-orange-200 rounded-xl px-3 py-2 font-mono text-xs text-orange-950"
                              />
                            </div>
                            <div className="flex items-end">
                              <span className="text-[10px] text-gray-400 font-bold">Authorized Signed Date: {new Date().toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 2: EMERGENCY (Form 7790 + Health 7809) */}
                    {activeInfantFormTab === "emergency" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="text-emerald-990 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-105 leading-relaxed">
                          <strong>Saskatchewan Child Care Regulation 32 (Form 7790):</strong> Licensees must maintain a portable medical card with backup contacts and checked childhood diseases for immediate paramedic access.
                        </div>

                        {/* SECOND PARENT */}
                        <div className="space-y-3">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Parent / Guardian #2 Coordinates</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={emergencyInfo.parent2Name}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2Name: e.target.value })}
                              placeholder="Name of Parent #2"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                            <input
                              type="tel"
                              value={emergencyInfo.parent2CellPhone}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2CellPhone: e.target.value })}
                              placeholder="Cell Phone"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                            <input
                              type="email"
                              value={emergencyInfo.parent2Email}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2Email: e.target.value })}
                              placeholder="Email Address"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                          </div>
                        </div>

                        {/* OTHER EMERGENCY CONTACTS */}
                        <div className="space-y-4 pt-2">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Two other persons to contact in case of emergency:</h5>
                          
                          <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-3">
                            <p className="font-bold text-gray-500 text-[10px]">EMERGENCY CONTACT #1</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                required={activeCohort === "infant"}
                                value={emergencyInfo.emer1Name}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer1Name: e.target.value })}
                                placeholder="Contact Name"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="text"
                                required={activeCohort === "infant"}
                                value={emergencyInfo.emer1Relationship}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer1Relationship: e.target.value })}
                                placeholder="Relationship (e.g., Uncle, Aunt)"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="tel"
                                required={activeCohort === "infant"}
                                value={emergencyInfo.emer1CellPhone}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer1CellPhone: e.target.value })}
                                placeholder="Cell Phone"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-3">
                            <p className="font-bold text-gray-500 text-[10px]">EMERGENCY CONTACT #2</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={emergencyInfo.emer2Name}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer2Name: e.target.value })}
                                placeholder="Contact Name"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="text"
                                value={emergencyInfo.emer2Relationship}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer2Relationship: e.target.value })}
                                placeholder="Relationship"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="tel"
                                value={emergencyInfo.emer2CellPhone}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer2CellPhone: e.target.value })}
                                placeholder="Cell Phone"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>

                        {/* INFANT MEDICAL IMMUNIZATION STATUS */}
                        <div className="p-4 bg-[#F2F9FF] border border-sky-100 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="font-extrabold text-sky-950 block text-[10px] uppercase">Immunizations up to date?</span>
                            <div className="flex gap-4 mt-2">
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input type="radio" checked={emergencyInfo.isImmunizedUpToDate} onChange={() => setEmergencyInfo({...emergencyInfo, isImmunizedUpToDate: true})} /> Yes, compliant
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input type="radio" checked={!emergencyInfo.isImmunizedUpToDate} onChange={() => setEmergencyInfo({...emergencyInfo, isImmunizedUpToDate: false})} /> No
                              </label>
                            </div>
                          </div>
                          <div>
                            <span className="font-extrabold text-sky-950 block text-[10px] uppercase">Was Born Premature?</span>
                            <div className="flex gap-4 mt-2">
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input type="radio" checked={emergencyInfo.wasPremature} onChange={() => setEmergencyInfo({...emergencyInfo, wasPremature: true})} /> Yes
                              </label>
                              <label className="flex items-center gap-1 cursor-pointer">
                                <input type="radio" checked={!emergencyInfo.wasPremature} onChange={() => setEmergencyInfo({...emergencyInfo, wasPremature: false})} /> No
                              </label>
                            </div>
                          </div>
                          <div>
                            {emergencyInfo.wasPremature && (
                              <div className="space-y-1 animate-fade-in">
                                <label className="text-[10px] font-bold text-sky-900 uppercase">How many weeks premature?</label>
                                <input
                                  type="text"
                                  value={emergencyInfo.prematureWeeks || ""}
                                  onChange={(e) => setEmergencyInfo({...emergencyInfo, prematureWeeks: e.target.value})}
                                  placeholder="e.g. 5 weeks"
                                  className="w-full bg-white border border-sky-200 rounded-xl px-3 py-1 text-[11px]"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 3: INFANT SOCIAL RESUME (Form 7785) */}
                    {activeInfantFormTab === "social" && (
                      <div className="space-y-6 animate-fade-in text-[11px]">
                        <div className="p-3.5 rounded-2xl bg-orange-50/30 text-orange-950 border border-orange-100 leading-relaxed font-normal">
                          <strong>Saskatchewan Form 7785 (Infant Social Resume):</strong> Please thoroughly capture your baby's physical preferences regarding nursing, sleep comfort, bowel consistency, and diaper rash patterns.
                        </div>

                        {/* FOOD AND BREAST-FEEDING Section */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-gray-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>🍼</span> 1. Infant Nursing, Formula & Bottle feeding
                          </h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                              <span className="font-bold text-slate-700 block text-[10px] uppercase">Is your child breast-fed?</span>
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => setInfantSocial({...infantSocial, isBreastFed: true})}
                                  className={`px-3 py-1.5 rounded-lg border font-bold text-[10px] ${infantSocial.isBreastFed ? "bg-orange-500 text-white border-orange-550" : "bg-white text-gray-700 border-gray-200"}`}
                                >
                                  Yes, Breast-fed
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setInfantSocial({...infantSocial, isBreastFed: false})}
                                  className={`px-3 py-1.5 rounded-lg border font-bold text-[10px] ${!infantSocial.isBreastFed ? "bg-orange-500 text-white border-orange-550" : "bg-white text-gray-700 border-gray-200"}`}
                                >
                                  No
                                </button>
                              </div>

                              {infantSocial.isBreastFed && (
                                <div className="space-y-1.5 pt-2 animate-fade-in">
                                  <label className="text-[10px] font-bold text-gray-600 block">Do you plan to continue breast-feeding at Peekaboo Corner?</label>
                                  <div className="flex gap-4">
                                    <label className="flex items-center gap-1 cursor-pointer">
                                      <input type="radio" checked={infantSocial.continueBreastFeeding} onChange={() => setInfantSocial({...infantSocial, continueBreastFeeding: true})} /> Yes
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                      <input type="radio" checked={!infantSocial.continueBreastFeeding} onChange={() => setInfantSocial({...infantSocial, continueBreastFeeding: false})} /> No
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    value={infantSocial.breastFeedingCarryOut}
                                    onChange={(e) => setInfantSocial({...infantSocial, breastFeedingCarryOut: e.target.value})}
                                    placeholder="How should daycare carry out? (e.g. deliver frozen baggies)"
                                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[11px]"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                              <span className="font-bold text-slate-700 block text-[10px] uppercase">Is your child bottle-fed?</span>
                              <div className="flex gap-4">
                                <button
                                  type="button"
                                  onClick={() => setInfantSocial({...infantSocial, isBottleFed: true})}
                                  className={`px-3 py-1.5 rounded-lg border font-bold text-[10px] ${infantSocial.isBottleFed ? "bg-sky-500 text-white border-sky-550" : "bg-white text-gray-700 border-gray-200"}`}
                                >
                                  Yes, Bottle-fed
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setInfantSocial({...infantSocial, isBottleFed: false})}
                                  className={`px-3 py-1.5 rounded-lg border font-bold text-[10px] ${!infantSocial.isBottleFed ? "bg-sky-500 text-white border-sky-550" : "bg-white text-gray-700 border-gray-200"}`}
                                >
                                  No
                                </button>
                              </div>

                              <div className="space-y-1.5 pt-1.5">
                                <label className="text-[10px] font-bold text-gray-650 block">Child Nickname (if any)</label>
                                <input
                                  type="text"
                                  value={infantSocial.nickname}
                                  onChange={(e) => setInfantSocial({...infantSocial, nickname: e.target.value})}
                                  placeholder="e.g. 'Dax' or 'Sweetie'"
                                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-[11px]"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Child's Primary Feeding Schedule</label>
                              <input
                                type="text"
                                value={infantSocial.feedingSchedule}
                                onChange={(e) => setInfantSocial({...infantSocial, feedingSchedule: e.target.value})}
                                placeholder="e.g. Feed on demand approx every 3 hours"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Position child likes to be held in while bottle-feeding and burped</label>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={infantSocial.bottleFeedingPosition}
                                  onChange={(e) => setInfantSocial({...infantSocial, bottleFeedingPosition: e.target.value})}
                                  placeholder="Position while feeding"
                                  className="w-full bg-white border rounded-xl px-2.5 py-2 text-[10.5px]"
                                />
                                <input
                                  type="text"
                                  value={infantSocial.burpedPosition}
                                  onChange={(e) => setInfantSocial({...infantSocial, burpedPosition: e.target.value})}
                                  placeholder="Burping position"
                                  className="w-full bg-white border rounded-xl px-2.5 py-2 text-[10.5px]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* LIQUIDS FEEDING CHART */}
                          <div className="border border-gray-200 rounded-2xl overflow-hidden text-[10px]">
                            <div className="bg-slate-100 px-3 py-1.5 text-slate-800 font-extrabold uppercase text-[9px] tracking-wider border-b">
                              Baby Liquids Intake Reference Chart (Form 7785 Page 1 Matrix)
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-slate-50 border-b border-gray-200">
                                    <th className="p-2 font-bold text-gray-600">Liquids</th>
                                    <th className="p-2 font-bold text-gray-600">Type / Brand name</th>
                                    <th className="p-2 font-bold text-gray-600">Amount per bottle (ml)</th>
                                    <th className="p-2 font-bold text-gray-600">Times / intervals</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-gray-150">
                                    <td className="p-2 font-bold text-gray-700">Formula</td>
                                    <td className="p-1"><input type="text" value={infantSocial.formulaType} onChange={(e) => setInfantSocial({...infantSocial, formulaType: e.target.value})} className="w-full border p-1 rounded" /></td>
                                    <td className="p-1"><input type="text" value={infantSocial.formulaAmount} onChange={(e) => setInfantSocial({...infantSocial, formulaAmount: e.target.value})} className="w-full border p-1 rounded" /></td>
                                    <td className="p-1"><input type="text" value={infantSocial.formulaTimes} onChange={(e) => setInfantSocial({...infantSocial, formulaTimes: e.target.value})} className="w-full border p-1 rounded" /></td>
                                  </tr>
                                  <tr className="border-b border-gray-150">
                                    <td className="p-2 font-bold text-gray-700">Milk (Whole)</td>
                                    <td className="p-1"><input type="text" value={infantSocial.milkType} onChange={(e) => setInfantSocial({...infantSocial, milkType: e.target.value})} className="w-full border p-1 rounded" /></td>
                                    <td className="p-1"><input type="text" value={infantSocial.milkAmount} onChange={(e) => setInfantSocial({...infantSocial, milkAmount: e.target.value})} className="w-full border p-1 rounded" /></td>
                                    <td className="p-1"><input type="text" value={infantSocial.milkTimes} onChange={(e) => setInfantSocial({...infantSocial, milkTimes: e.target.value})} className="w-full border p-1 rounded" /></td>
                                  </tr>
                                  <tr>
                                    <td className="p-2 font-bold text-gray-700">Water</td>
                                    <td className="p-1"><input type="text" value={infantSocial.waterType} onChange={(e) => setInfantSocial({...infantSocial, waterType: e.target.value})} className="w-full border p-1 rounded" /></td>
                                    <td className="p-1"><input type="text" value={infantSocial.waterAmount} onChange={(e) => setInfantSocial({...infantSocial, waterAmount: e.target.value})} className="w-full border p-1 rounded" /></td>
                                    <td className="p-1"><input type="text" value={infantSocial.waterTimes} onChange={(e) => setInfantSocial({...infantSocial, waterTimes: e.target.value})} className="w-full border p-1 rounded" /></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* INTRODUCTION TO SOLIDS & FOOD CHART */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-gray-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>🥦</span> 2. Solids Foods Schedule (Form 7785 Page 2 Matrix)
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border">
                              <span className="font-extrabold text-slate-700 block text-[9px] uppercase">Introduced to Solids?</span>
                              <select
                                value={infantSocial.introSolidsType}
                                onChange={(e) => setInfantSocial({...infantSocial, introSolidsType: e.target.value})}
                                className="w-full border p-1.5 rounded-lg text-[10.5px] mt-1 bg-white"
                              >
                                <option value="None">No, Liquids Only</option>
                                <option value="Baby food">Yes, Baby Food / Purees</option>
                                <option value="Table food">Yes, Soft Table Food</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Describe baby's general appetite</label>
                              <input
                                type="text"
                                value={infantSocial.appetiteDescription}
                                onChange={(e) => setInfantSocial({...infantSocial, appetiteDescription: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-2 text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Foods Liked / Disliked</label>
                              <input
                                type="text"
                                value={infantSocial.foodsLikedDisliked}
                                onChange={(e) => setInfantSocial({...infantSocial, foodsLikedDisliked: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-2 text-[11px]"
                              />
                            </div>
                          </div>

                          {/* SOLIDS DETAILED TABLE */}
                          <div className="border border-gray-200 rounded-2xl overflow-hidden text-[10px]">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50 border-b border-gray-200">
                                  <th className="p-2 font-bold text-gray-600">Solids Category</th>
                                  <th className="p-2 font-bold text-gray-600">What Type / Ingredients</th>
                                  <th className="p-2 font-bold text-gray-600">Consistency (eg. Puree / chunky)</th>
                                  <th className="p-2 font-bold text-gray-600">Amount</th>
                                  <th className="p-2 font-bold text-gray-600">Times fed</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-gray-150">
                                  <td className="p-2 font-bold text-gray-700">Cereals</td>
                                  <td className="p-1"><input type="text" value={infantSocial.cerealsType} onChange={(e) => setInfantSocial({...infantSocial, cerealsType: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.cerealsConsistency} onChange={(e) => setInfantSocial({...infantSocial, cerealsConsistency: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.cerealsAmount} onChange={(e) => setInfantSocial({...infantSocial, cerealsAmount: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.cerealsTimes} onChange={(e) => setInfantSocial({...infantSocial, cerealsTimes: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                </tr>
                                <tr className="border-b border-gray-150">
                                  <td className="p-2 font-bold text-gray-700">Vegetables</td>
                                  <td className="p-1"><input type="text" value={infantSocial.vegetablesType} onChange={(e) => setInfantSocial({...infantSocial, vegetablesType: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.vegetablesConsistency} onChange={(e) => setInfantSocial({...infantSocial, vegetablesConsistency: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.vegetablesAmount} onChange={(e) => setInfantSocial({...infantSocial, vegetablesAmount: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.vegetablesTimes} onChange={(e) => setInfantSocial({...infantSocial, vegetablesTimes: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                </tr>
                                <tr className="border-b border-gray-150">
                                  <td className="p-2 font-bold text-gray-700">Fruits</td>
                                  <td className="p-1"><input type="text" value={infantSocial.fruitsType} onChange={(e) => setInfantSocial({...infantSocial, fruitsType: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.fruitsConsistency} onChange={(e) => setInfantSocial({...infantSocial, fruitsConsistency: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.fruitsAmount} onChange={(e) => setInfantSocial({...infantSocial, fruitsAmount: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.fruitsTimes} onChange={(e) => setInfantSocial({...infantSocial, fruitsTimes: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                </tr>
                                <tr>
                                  <td className="p-2 font-bold text-gray-700">Snacks</td>
                                  <td className="p-1"><input type="text" value={infantSocial.snacksType} onChange={(e) => setInfantSocial({...infantSocial, snacksType: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.snacksConsistency} onChange={(e) => setInfantSocial({...infantSocial, snacksConsistency: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.snacksAmount} onChange={(e) => setInfantSocial({...infantSocial, snacksAmount: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                  <td className="p-1"><input type="text" value={infantSocial.snacksTimes} onChange={(e) => setInfantSocial({...infantSocial, snacksTimes: e.target.value})} className="w-full border p-1 rounded text-[10px]" /></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* SLEEP AND DIAPERING Section */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-gray-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>😴</span> 3. Sleep Routine & Diapering (Form 7785 Page 2/3 combo)
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <p className="font-extrabold text-gray-700 uppercase text-[9px] tracking-wide">Napping & Sleep Routine</p>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 block">General sleep routine (e.g. times and lengths of naps)</label>
                                <textarea rows={2} value={infantSocial.sleepRoutine} onChange={(e) => setInfantSocial({...infantSocial, sleepRoutine: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-2 py-1 text-[11px]" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 block">Ways you help your child go to sleep (eg. blanket, light, sounds)</label>
                                <input type="text" value={infantSocial.helpSleepMethod} onChange={(e) => setInfantSocial({...infantSocial, helpSleepMethod: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-2 py-1 text-[11px]" />
                              </div>
                              <div className="grid grid-cols-2 gap-2 p-2 bg-[#FAF9F5] rounded-xl border">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650">
                                  <input type="checkbox" checked={infantSocial.cryGoingToSleep} onChange={(e) => setInfantSocial({...infantSocial, cryGoingToSleep: e.target.checked})} /> Cries going to sleep?
                                </label>
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650">
                                  <input type="checkbox" checked={infantSocial.cryWaking} onChange={(e) => setInfantSocial({...infantSocial, cryWaking: e.target.checked})} /> Cries waking up?
                                </label>
                              </div>
                            </div>

                            <div className="space-y-3 border-l pl-4 border-gray-200">
                              <p className="font-extrabold text-gray-700 uppercase text-[9px] tracking-wide">Diapering Details</p>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase">Diaper type used</label>
                                  <input type="text" value={infantSocial.diaperType} onChange={(e) => setInfantSocial({...infantSocial, diaperType: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-2 py-1" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-gray-400 uppercase">Est Diapers per Day</label>
                                  <input type="text" value={infantSocial.diaperCount} onChange={(e) => setInfantSocial({...infantSocial, diaperCount: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-2 py-1" />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500">Normal diapering routine (double diaper, linters, creams, powders):</label>
                                <input type="text" value={infantSocial.diaperRoutine} onChange={(e) => setInfantSocial({...infantSocial, diaperRoutine: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-2 py-1" />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="p-2 bg-slate-50 rounded-xl border">
                                  <label className="flex items-center gap-1 text-[10px] font-bold text-gray-600 cursor-pointer">
                                    <input type="checkbox" checked={infantSocial.proneToDiaperRash} onChange={(e) => setInfantSocial({...infantSocial, proneToDiaperRash: e.target.checked})} /> Prone to diaper rash?
                                  </label>
                                  {infantSocial.proneToDiaperRash && (
                                    <input type="text" value={infantSocial.diaperRashTreatment} onChange={(e) => setInfantSocial({...infantSocial, diaperRashTreatment: e.target.value})} placeholder="Barrier cream used" className="w-full border bg-white text-[9px] p-1 rounded mt-1" />
                                  )}
                                </div>
                                <div className="p-1">
                                  <label className="text-[9px] font-bold uppercase text-gray-450 block">Child Sleep place description</label>
                                  <input type="text" value={infantSocial.usualSleepPlace} onChange={(e) => setInfantSocial({...infantSocial, usualSleepPlace: e.target.value})} className="w-full bg-white border rounded p-1 text-[10px] mt-1" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 p-3.5 bg-slate-50 border rounded-2xl text-[10px]">
                            <label className="text-[10px] font-bold text-gray-700 uppercase">Comments on child's Bowel movements (frequency, color, consistency, constipation history):</label>
                            <textarea rows={1} value={infantSocial.bowelMovementsComments} onChange={(e) => setInfantSocial({...infantSocial, bowelMovementsComments: e.target.value})} className="w-full bg-white border rounded-xl p-2" />
                          </div>
                        </div>

                        {/* SOCIAL / EMOTIONAL DEVELOPMENT */}
                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-gray-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>👶</span> 4. Infant Social & Emotional Development (Form 7785 Page 3 Matrix)
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500">Baby Temperament (colic, likes to cuddle, active, etc.)</label>
                                <input type="text" value={infantSocial.temperament} onChange={(e) => setInfantSocial({...infantSocial, temperament: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500">How does baby show hunger, tiredness or overstimulation? (eg hooks ears, rubs eyes):</label>
                                <input type="text" value={infantSocial.overstimulationSigns} onChange={(e) => setInfantSocial({...infantSocial, overstimulationSigns: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-2.5 bg-slate-50 rounded-xl border">
                                  <label className="flex items-center gap-1 text-[10px] font-bold text-gray-650 cursor-pointer">
                                    <input type="checkbox" checked={infantSocial.separatesEasily} onChange={(e) => setInfantSocial({...infantSocial, separatesEasily: e.target.checked})} /> Separates easily?
                                  </label>
                                  <input type="text" value={infantSocial.separatesEasilyComments} onChange={(e) => setInfantSocial({...infantSocial, separatesEasilyComments: e.target.value})} placeholder="Comments on parent wavings" className="w-full border bg-white text-[9.5px] p-1 rounded mt-1" />
                                </div>
                                <div className="p-2.5 bg-slate-50 rounded-xl border">
                                  <label className="flex items-center gap-1 text-[10px] font-bold text-gray-650 cursor-pointer">
                                    <input type="checkbox" checked={infantSocial.isAfraidOfAnything} onChange={(e) => setInfantSocial({...infantSocial, isAfraidOfAnything: e.target.checked})} /> Afraid of anything?
                                  </label>
                                  <input type="text" value={infantSocial.fearDetails} onChange={(e) => setInfantSocial({...infantSocial, fearDetails: e.target.value})} placeholder="Describe fears (eg vacuums)" className="w-full border bg-white text-[9.5px] p-1 rounded mt-1" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                            <div className="space-y-1">
                              <label className="text-[10.5px] font-bold text-gray-700">Favorite toy, blanket, bottle or soother details:</label>
                              <input type="text" value={infantSocial.favoriteToyObjDetails} onChange={(e) => setInfantSocial({...infantSocial, favoriteToyObjDetails: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10.5px] font-bold text-gray-700">Does child spend time with other children? (who, when, how much)</label>
                              <input type="text" value={infantSocial.spendTimeWithOtherKidsComments} onChange={(e) => setInfantSocial({...infantSocial, spendTimeWithOtherKidsComments: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-1.5" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10.5px] font-bold text-gray-750">Activities baby enjoys most:</label>
                              <input type="text" value={infantSocial.activitiesEnjoy} onChange={(e) => setInfantSocial({...infantSocial, activitiesEnjoy: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10.5px] font-bold text-gray-750">Activities baby dislikes:</label>
                              <input type="text" value={infantSocial.activitiesDislike} onChange={(e) => setInfantSocial({...infantSocial, activitiesDislike: e.target.value})} className="w-full bg-white border rounded-xl px-3 py-1.5" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10.5px] font-bold text-gray-800">Additional Helpful Information to help educators care for baby:</label>
                            <textarea rows={1.5} value={infantSocial.additionalCaringDetails} onChange={(e) => setInfantSocial({...infantSocial, additionalCaringDetails: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-2.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 4: COMPLIANT MEDICALS (Form 7794 + 7791) */}
                    {activeInfantFormTab === "medication" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-3.5 bg-orange-50/20 text-orange-950 border border-orange-100 rounded-2xl mb-2 leading-relaxed">
                          <strong>Saskatchewan Form 7794 (Medication) & 7791 (Medical Certificate):</strong> This authorizes Peekaboo Corner's educators to administer prescribed medication to infants (eg. baby vitamins or teething rubs) if formally cleared by critical pediatric certificates.
                        </div>

                        <div className="space-y-3 bg-white p-4 border rounded-2xl">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Emergency Medication Authorization (Form 7794)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Name of Medication</label>
                              <input
                                type="text"
                                value={medicationAuth.medName}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medName: e.target.value})}
                                placeholder="e.g. Baby Tylenol (As Required)"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Strict dosage instructions</label>
                              <input
                                type="text"
                                value={medicationAuth.medDosage}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medDosage: e.target.value})}
                                placeholder="e.g. 2.5ml based on baby weight chart"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Times of Day to administer</label>
                              <input
                                type="text"
                                value={medicationAuth.medTimesText}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medTimesText: e.target.value})}
                                placeholder="e.g. Under fever thresholds only"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2 bg-white p-4 border rounded-2xl">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Saskatchewan Pediatric Physician of Record (Form 7791 clearance)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={medicationAuth.physicianName}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianName: e.target.value})}
                              placeholder="Doctor Full Name"
                              className="bg-white border rounded-xl px-3 py-2 animate-fade-in"
                            />
                            <input
                              type="tel"
                              value={medicationAuth.physicianPhone}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianPhone: e.target.value})}
                              placeholder="Doctor Telephone number"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                            <input
                              type="text"
                              value={medicationAuth.physicianAddress}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianAddress: e.target.value})}
                              placeholder="Clinic Address"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-orange-50/15 border border-orange-100 rounded-xl space-y-3">
                          <label className="flex items-start gap-2.5 cursor-pointer font-bold text-gray-850">
                            <input
                              type="checkbox"
                              checked={medicationAuth.medConsentChecked}
                              onChange={(e) => setMedicationAuth({...medicationAuth, medConsentChecked: e.target.checked})}
                              className="mt-1 h-3.5 w-3.5"
                            />
                            <span className="leading-snug text-gray-650 text-[10px]">
                              I hereby authorize Peekaboo Corner Early Learning Care to host baby health resume files with Saskatchewan Ministry of Education during regulatory inspections.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 5: PARENT HANDBOOK ACKNOWLEDGMENT (PEEKABOO CORNER OFF-WHITES CANVASES) */}
                    {activeInfantFormTab === "handbook" && (
                      <div className="space-y-4 animate-fade-in text-[10.5px] leading-relaxed text-slate-700">
                        <div className="p-4 bg-orange-50/20 text-[#FF724E] border border-orange-100 rounded-2xl">
                          <h4 className="font-extrabold uppercase text-[11px] mb-1">Peekaboo Corner Regulated Parent Handbook</h4>
                          <p className="text-[10px]">As a condition of licensing, providers must compile policy catalogs. Please read the core handbooks blocks below and Digitally Acknowledge:</p>
                        </div>

                        {/* Handbooks items grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-orange-950 text-[10.5px] uppercase">1. Our Early Learning Philosophy</h5>
                            <p className="text-[10px] text-gray-500">At Peekaboo Corner, our philosophy centers on a nurturing, strictly vegetarian, inclusive, and play-based environment following Saskatchewan's Play & Exploration Framework. We prioritize empathy, kindness, and native tree appreciation.</p>
                            <label className="flex items-center gap-1.5 font-bold text-orange-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={parentHandbookConsent.philosophyReadAck} onChange={(e) => setParentHandbookConsent({...parentHandbookConsent, philosophyReadAck: e.target.checked})} /> I Acknowledge Philosophy Statement Section
                            </label>
                          </div>

                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-orange-950 text-[10.5px] uppercase">2. Daily schedule & closures</h5>
                            <p className="text-[10px] text-gray-500">Our operational times are Monday to Friday, 7:30 AM to 5:30 PM. We are closed on all Canadian statutory holidays, plus traditional celebrations including Indian New Year and Diwali (providing advance notice).</p>
                            <label className="flex items-center gap-1.5 font-bold text-orange-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={parentHandbookConsent.scheduleReadAck} onChange={(e) => setParentHandbookConsent({...parentHandbookConsent, scheduleReadAck: e.target.checked})} /> I Acknowledge Schedule Page
                            </label>
                          </div>

                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-orange-950 text-[10.5px] uppercase">3. Vegetarian Nutrition guidelines</h5>
                            <p className="text-[10px] text-gray-500">All meals meet the Canada Food Guide requirements under our strictly vegetarian diet. No outside junk food or non-vegetarian food is permitted. Milk is served twice daily with water available always.</p>
                            <label className="flex items-center gap-1.5 font-bold text-orange-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={parentHandbookConsent.mealsReadAck} onChange={(e) => setParentHandbookConsent({...parentHandbookConsent, mealsReadAck: e.target.checked})} /> I Acknowledge Nutrition Policies
                            </label>
                          </div>

                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-orange-950 text-[10.5px] uppercase">4. Fees, late picks & notices</h5>
                            <p className="text-[10px] text-gray-500">Fees are due on the 1st of every month via cash, e-transfer, or cheque. Late payments incur a $25 charge. Late pick-ups are charged $10 per 10 minutes. A deposit of $217.50 is required upon intake matching.</p>
                            <label className="flex items-center gap-1.5 font-bold text-orange-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={parentHandbookConsent.feesReadAck} onChange={(e) => setParentHandbookConsent({...parentHandbookConsent, feesReadAck: e.target.checked})} /> I Acknowledge Fee Policies
                            </label>
                          </div>
                        </div>

                        {/* SIGNATURE BLOCK */}
                        <div className="p-4 bg-orange-50/15 border border-orange-100 rounded-2xl space-y-2">
                          <p className="font-extrabold text-slate-800 tracking-wide text-[10px]">SASKATCHEWAN PROVINCIAL REQUIRED PRIVACY COMPLIANCE STATEMENT (FOIP):</p>
                          <p className="text-[9.5px] text-gray-400 font-medium">"As a condition of the Parent Fee Grant to reduce child care fees for Saskatchewan families, the Ministry of Education is required to gather information including child's name, current fee, and parent information in order to determine funding eligibility. Collected under FOIP."</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase font-bold text-orange-900">Signed Parent / Guardian Signature</label>
                              <input
                                type="text"
                                required={activeCohort === "infant"}
                                value={parentHandbookConsent.parentSignature}
                                onChange={(e) => setParentHandbookConsent({...parentHandbookConsent, parentSignature: e.target.value})}
                                placeholder="Type Full Name to Sign"
                                className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-orange-950"
                              />
                            </div>
                            <div className="flex items-end">
                              <span className="text-[10px] text-gray-400 font-extrabold uppercase">FOIP digital timestamp locked: {new Date().toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

               {activeCohort === "toddler" && (
                <div className="border border-sky-100 rounded-3xl overflow-hidden space-y-6 bg-[#FAFDFE] pb-6">
                  
                  {/* GOVERNMENT BANNER ROW */}
                  <div className="bg-gradient-to-r from-sky-400 to-[#59C7F5] text-white p-4 select-none">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="font-extrabold text-[12px] uppercase tracking-wider">
                          Saskatchewan Early Childhood Government Registry (Toddler Track)
                        </h4>
                        <p className="text-[10px] text-sky-100 font-medium">Official Form 7786 Social Resume + Child Care Agreement Form 7777 Integration</p>
                      </div>
                      <span className="text-[9px] bg-white text-slate-800 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                        19 Months - 30 Months
                      </span>
                    </div>
                  </div>

                  {/* FORM SELECTION SUB TABS */}
                  <div className="px-4 border-b border-gray-200 flex flex-wrap gap-1">
                    {[
                      { id: "agreement", label: "📄 Form 7777: Services Agreement" },
                      { id: "emergency", label: "🚨 Form 7790 + 7809: Emergency & Health" },
                      { id: "social", label: "🧸 Form 7786: Toddler Social Resume" },
                      { id: "medication", label: "💊 Form 7794 + 7791: Meds & Cert" },
                      { id: "handbook", label: "📕 Parent Handbook & FOIP" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveToddlerFormTab(tab.id as any)}
                        className={`px-3 py-2 rounded-t-xl text-[10.5px] font-extrabold transition-all border-t border-x cursor-pointer ${
                          activeToddlerFormTab === tab.id
                            ? "bg-white text-sky-600 border-gray-200 border-b-white translate-y-[1px]"
                            : "bg-gray-100/70 text-gray-500 border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB-FORM CONTENT INJECTION */}
                  <div className="px-4 sm:px-6 space-y-6">

                    {/* SUB TAB 1: AGREEMENT (Form 7777) */}
                    {activeToddlerFormTab === "agreement" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-950 leading-normal mb-2">
                          <strong>Saskatchewan Agreement for Child Care Services (Form 7777):</strong> This sets out the legally binding contract between parent Monali Patel & early care licensee Monali Patel for Toddler care.
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Center Physical address</label>
                            <input
                              type="text"
                              disabled
                              value="4822 Queen Street, Regina, SK, S4P 3Y2"
                              className="w-full bg-slate-100/80 border text-gray-500 rounded-xl px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Licensee Operator Name</label>
                            <input
                              type="text"
                              disabled
                              value="Monali Patel (Peekaboo Corner)"
                              className="w-full bg-slate-100/80 border text-gray-500 rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-sky-900 font-bold">Total Child Care Fee (Parent Portion Net of Saskatchewan Provincial Subsidy Grant)</label>
                            <div className="relative">
                              <span className="absolute left-3 top-2 text-gray-500 font-bold">$</span>
                              <input
                                type="text"
                                required
                                value={toddlerAgreement.monthlyFeeValue}
                                onChange={(e) => setToddlerAgreement({...toddlerAgreement, monthlyFeeValue: e.target.value})}
                                className="w-full bg-white border rounded-xl pl-6 pr-3 py-2 font-mono text-xs font-bold text-slate-800"
                              />
                            </div>
                            <span className="text-[9.5px] text-gray-400">Standard Provincial net parent portion is $217.50 for full-time Toddler. (Facility fee $900.00 minus $682.50 subsidy grant).</span>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Late Pick-Up Fee Schedule (Form Section 4 Optional)</label>
                            <input
                              type="text"
                              value={toddlerAgreement.latePickUpFeeDetails}
                              onChange={(e) => setToddlerAgreement({...toddlerAgreement, latePickUpFeeDetails: e.target.value})}
                              className="w-full bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Termination Written Notice Required (Form Section 6)</label>
                            <input
                              type="text"
                              value={toddlerAgreement.terminationWeeksNotice}
                              onChange={(e) => setToddlerAgreement({...toddlerAgreement, terminationWeeksNotice: e.target.value})}
                              className="w-full bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Trial Period Notice Requirements (Form Section 5)</label>
                            <input
                              type="text"
                              value={toddlerAgreement.trialPeriodNoticeDays}
                              onChange={(e) => setToddlerAgreement({...toddlerAgreement, trialPeriodNoticeDays: e.target.value})}
                              className="w-full bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500">Additional Care Schedule / Alternate Placement Arrangements (Form Section 2)</label>
                          <textarea
                            rows={2}
                            value={toddlerAgreement.additionalCareArrangements}
                            onChange={(e) => setToddlerAgreement({...toddlerAgreement, additionalCareArrangements: e.target.value})}
                            className="w-full bg-white border rounded-xl p-2.5"
                          />
                        </div>

                        <div className="p-4 bg-slate-50 border rounded-2xl space-y-2">
                          <p className="font-extrabold text-[10px] text-gray-700 uppercase">Child Care Services Binding Agreement Signatures (Section 7 Compliant):</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div className="space-y-1">
                              <label className="text-[9.5px] uppercase font-bold text-[#FF724E]">Parent / Guardian Authorized Signature</label>
                              <input
                                type="text"
                                required={activeCohort === "toddler"}
                                value={toddlerAgreement.authorizedSignatureName}
                                onChange={(e) => setToddlerAgreement({...toddlerAgreement, authorizedSignatureName: e.target.value})}
                                placeholder="Type Full Name to Sign Contract"
                                className="w-full bg-white border rounded-xl px-3 py-2 font-mono text-xs text-sky-950 font-bold"
                              />
                            </div>
                            <div className="flex items-end text-right">
                              <p className="text-[9.5px] text-gray-400 w-full font-bold">Contract signed & locked under Monali Patel license: <span className="font-mono text-sky-600 font-bold">{new Date().toLocaleDateString()}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 2: EMERGENCY & HEALTH (Form 7790 + 7809) */}
                    {activeToddlerFormTab === "emergency" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 text-rose-950 leading-normal mb-2">
                          <strong>Saskatchewan Government Form 7790 (Emergency Info) & Form 7809 (Health Resume) Combo:</strong> Child Care Regulation 32 require every licensee to maintain portable emergency records with legal health histories for inspection.
                        </div>

                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-slate-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>🚨</span> 1. Portable Records Emergency Contacts (Form 7790 Required)
                          </h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3 p-3 bg-slate-50 border rounded-xl">
                              <p className="font-black text-rose-900 text-[10px] uppercase">Primary Emergency alternate contact (Person 1)</p>
                              <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={emergencyInfo.emer1Name} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer1Name: e.target.value})} placeholder="Contact Full Name" className="w-full bg-white border rounded p-1.5" />
                                <input type="text" value={emergencyInfo.emer1Relationship} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer1Relationship: e.target.value})} placeholder="Relationship to child" className="w-full bg-white border rounded p-1.5" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input type="tel" value={emergencyInfo.emer1CellPhone} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer1CellPhone: e.target.value})} placeholder="Cell Phone Number" className="w-full bg-white border rounded p-1.5" />
                                <input type="email" value={emergencyInfo.emer1Email} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer1Email: e.target.value})} placeholder="Email address" className="w-full bg-white border rounded p-1.5" />
                              </div>
                            </div>

                            <div className="space-y-3 p-3 bg-slate-50 border rounded-xl">
                              <p className="font-black text-rose-900 text-[10px] uppercase">Secondary Emergency alternate contact (Person 2)</p>
                              <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={emergencyInfo.emer2Name} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer2Name: e.target.value})} placeholder="Contact Full Name" className="w-full bg-white border rounded p-1.5" />
                                <input type="text" value={emergencyInfo.emer2Relationship} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer2Relationship: e.target.value})} placeholder="Relationship to child" className="w-full bg-white border rounded p-1.5" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input type="tel" value={emergencyInfo.emer2CellPhone} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer2CellPhone: e.target.value})} placeholder="Cell Phone Number" className="w-full bg-white border rounded p-1.5" />
                                <input type="email" value={emergencyInfo.emer2Email} onChange={(e) => setEmergencyInfo({...emergencyInfo, emer2Email: e.target.value})} placeholder="Email address" className="w-full bg-white border rounded p-1.5" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-slate-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>⚕️</span> 2. Complete Medical History (Check any child has had):
                          </h5>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {ILLNESS_OPTIONS.map((illness) => {
                              const isChecked = emergencyInfo.checkedIllnesses.includes(illness);
                              return (
                                <button
                                  type="button"
                                  key={illness}
                                  onClick={() => handleToggleIllness(illness)}
                                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                                    isChecked
                                      ? "bg-rose-50 text-rose-950 border-rose-300 font-bold"
                                      : "bg-slate-50 border-slate-200 text-gray-500 hover:bg-slate-100"
                                  }`}
                                >
                                  <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${isChecked ? "bg-rose-500 text-white" : "border bg-white"}`}>
                                    {isChecked && "✓"}
                                  </span>
                                  <span className="text-[10px] truncate">{illness}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Drug Allergies & Reactions</label>
                              <input type="text" value={emergencyInfo.drugAllergies} onChange={(e) => setEmergencyInfo({...emergencyInfo, drugAllergies: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Food Allergies & Reactions</label>
                              <input type="text" value={emergencyInfo.foodAllergies} onChange={(e) => setEmergencyInfo({...emergencyInfo, foodAllergies: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase">Other Allergies (Dust, Pets, Grass)</label>
                              <input type="text" value={emergencyInfo.otherAllergies} onChange={(e) => setEmergencyInfo({...emergencyInfo, otherAllergies: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-4">
                          <h5 className="font-black text-slate-800 text-xs uppercase tracking-wide border-b pb-1.5 flex items-center gap-1.5">
                            <span>👶</span> 3. Development, Diet, & Premature Birth Conditions
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2 p-3 bg-red-50/10 border rounded-2xl">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650">
                                  <input type="checkbox" checked={emergencyInfo.wasPremature} onChange={(e) => setEmergencyInfo({...emergencyInfo, wasPremature: e.target.checked})} /> Born Prematurely?
                                </label>
                                {emergencyInfo.wasPremature && (
                                  <input type="text" value={emergencyInfo.prematureWeeks || ""} onChange={(e) => setEmergencyInfo({...emergencyInfo, prematureWeeks: e.target.value})} placeholder="How many weeks?" className="border bg-white text-[10px] px-2 py-0.5 rounded" />
                                )}
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500">List all medications taken on a regular basis:</label>
                                <input type="text" value={child.medications} onChange={(e) => setChild({...child, medications: e.target.value})} placeholder="E.g. None" className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2 p-3 bg-red-50/10 border rounded-2xl">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650">
                                  <input type="checkbox" checked={emergencyInfo.specialDietsNeeded} onChange={(e) => setEmergencyInfo({...emergencyInfo, specialDietsNeeded: e.target.checked})} /> Special Diets Necessary?
                                </label>
                                {emergencyInfo.specialDietsNeeded && (
                                  <input type="text" value={emergencyInfo.specialDietsDetails || ""} onChange={(e) => setEmergencyInfo({...emergencyInfo, specialDietsDetails: e.target.value})} placeholder="Describe nutritional schedule" className="border bg-white text-[10px] px-2 py-0.5 rounded" />
                                )}
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500">Any development concerns or therapy requirements?</label>
                                <input type="text" value={emergencyInfo.developmentConcernsText} onChange={(e) => setEmergencyInfo({...emergencyInfo, developmentConcernsText: e.target.value})} placeholder="E.g. Speech support or none" className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-2 p-3.5 bg-slate-50 border rounded-2xl text-[10px]">
                            <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer select-none">
                              <input type="checkbox" checked={emergencyInfo.isImmunizedUpToDate} onChange={(e) => setEmergencyInfo({...emergencyInfo, isImmunizedUpToDate: e.target.checked})} />
                              I officially certify that my Toddler's immunizations are up to date under Saskatchewan Ministry of Health guidelines.
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 3: TODDLER SOCIAL RESUME (Form 7786) */}
                    {activeToddlerFormTab === "social" && (
                      <div className="space-y-4 animate-fade-in text-[11px] text-slate-800">
                        <div className="p-4 bg-sky-50 text-sky-950 rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div>
                            <strong>📄 Digitized Saskatchewan Government Form 7786 Compliance:</strong> Complete Toddler/Preschool Social Resume (Page 1, 2 & 3).
                          </div>
                          <span className="font-mono text-[9px] bg-sky-200/50 px-2 py-1 rounded">EY 7786 - 02/2014</span>
                        </div>

                        {/* SECTION A: FAMILY, LANGUAGE, PETS */}
                        <div className="bg-white rounded-3xl p-5 border border-sky-100/50 space-y-4 shadow-sm">
                          <h5 className="font-black text-sky-950 text-xs uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                            <span className="text-sky-500">👨‍👩‍👧‍👦</span> 1. Family Coordinates & Living Environment (Page 1)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">Does your child have a nickname? What is it?</label>
                                <input type="text" value={toddlerSocial.nickname} onChange={(e) => setToddlerSocial({...toddlerSocial, nickname: e.target.value})} placeholder="e.g. Chiku" className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">Names of brothers and sisters, birth dates, and physical residency info:</label>
                                <textarea rows={2} value={toddlerSocial.siblingsList} onChange={(e) => setToddlerSocial({...toddlerSocial, siblingsList: e.target.value})} placeholder="e.g. Suresh Patel, born 2020-03-12 (lives with child)" className="w-full bg-slate-50 border rounded-xl p-2.5" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">Names of others living in the home & relationship to child:</label>
                                <input type="text" value={toddlerSocial.othersInHome} onChange={(e) => setToddlerSocial({...toddlerSocial, othersInHome: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">What languages are spoken in your home?</label>
                                <input type="text" value={toddlerSocial.languagesSpoken} onChange={(e) => setToddlerSocial({...toddlerSocial, languagesSpoken: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="p-2.5 bg-slate-50 border rounded-xl flex items-center justify-between">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650 cursor-pointer">
                                  <input type="checkbox" checked={toddlerSocial.hasPets} onChange={(e) => setToddlerSocial({...toddlerSocial, hasPets: e.target.checked})} /> Does child have any pets?
                                </label>
                                {toddlerSocial.hasPets && (
                                  <input type="text" value={toddlerSocial.petsDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, petsDetails: e.target.value})} placeholder="Describe pets (e.g. Golden Retriever)" className="border bg-white text-[10px] px-2 py-0.5 rounded w-1/2" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* SECTION B: FOOD & NUTRITIONS */}
                        <div className="bg-white rounded-3xl p-5 border border-sky-100/50 space-y-4 shadow-sm">
                          <h5 className="font-black text-sky-950 text-xs uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                            <span className="text-sky-500">🍏</span> 2. Toddler Appetite & Food Preferences (Page 1 & 2)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">Describe child's appetite:</label>
                                <input type="text" value={toddlerSocial.appetite} onChange={(e) => setToddlerSocial({...toddlerSocial, appetite: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">What foods does your child like?</label>
                                <input type="text" value={toddlerSocial.foodsLiked} onChange={(e) => setToddlerSocial({...toddlerSocial, foodsLiked: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">What foods does your child dislike?</label>
                                <input type="text" value={toddlerSocial.foodsDisliked} onChange={(e) => setToddlerSocial({...toddlerSocial, foodsDisliked: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">What foods do you not permit your child to eat?</label>
                                <input type="text" value={toddlerSocial.forbiddenFoods} onChange={(e) => setToddlerSocial({...toddlerSocial, forbiddenFoods: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                              </div>
                            </div>

                            <div className="space-y-2 border-l pl-4 border-gray-150">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-500 block">Does child feed him/herself?</label>
                                <select value={toddlerSocial.feedsOnOwn} onChange={(e) => setToddlerSocial({...toddlerSocial, feedsOnOwn: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5 text-[11px]">
                                  <option value="Yes">Yes, completely independent</option>
                                  <option value="No">No, relies on adult spoon feeding</option>
                                  <option value="InProgress">In Progress (Learning to use spoon)</option>
                                </select>
                              </div>
                              {toddlerSocial.feedsOnOwn === "InProgress" && (
                                <div className="space-y-1 animate-fade-in">
                                  <label className="text-[9.5px] font-bold text-gray-400">If help is needed, what kind of help?</label>
                                  <input type="text" value={toddlerSocial.feedingHelpDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, feedingHelpDetails: e.target.value})} className="w-full bg-white border rounded-xl px-2 py-1" />
                                </div>
                              )}
                              <p className="font-extrabold text-[#FF724E] text-[9.5px] uppercase mt-2 tracking-wide">Standard Scheduled Meal Intervals (Form 7786 Page 2)</p>
                              <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div>Breakfast: <input type="text" value={toddlerSocial.eatTimesBreakfast} onChange={(e) => setToddlerSocial({...toddlerSocial, eatTimesBreakfast: e.target.value})} className="border rounded px-2 py-0.5 mt-0.5 w-full bg-white" /></div>
                                <div>Lunch: <input type="text" value={toddlerSocial.eatTimesLunch} onChange={(e) => setToddlerSocial({...toddlerSocial, eatTimesLunch: e.target.value})} className="border rounded px-2 py-0.5 mt-0.5 w-full bg-white" /></div>
                                <div>Snack: <input type="text" value={toddlerSocial.eatTimesSnack} onChange={(e) => setToddlerSocial({...toddlerSocial, eatTimesSnack: e.target.value})} className="border rounded px-2 py-0.5 mt-0.5 w-full bg-white" /></div>
                                <div>Supper: <input type="text" value={toddlerSocial.eatTimesSupper} onChange={(e) => setToddlerSocial({...toddlerSocial, eatTimesSupper: e.target.value})} className="border rounded px-2 py-0.5 mt-0.5 w-full bg-white" /></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* SECTION C: SELF CARE, TOILETING & NAPPING */}
                        <div className="bg-white rounded-3xl p-5 border border-sky-100/50 space-y-4 shadow-sm">
                          <h5 className="font-black text-sky-950 text-xs uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                            <span className="text-sky-500">🚽</span> 3. Self-Care, Toileting & Napping Routine (Page 2)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3 p-3.5 bg-slate-50 border rounded-2xl">
                              <p className="font-black text-sky-900 text-[10px] uppercase">Bathroom routines & training procedures</p>
                              <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                                <label className="flex items-center gap-1 font-bold text-gray-600 cursor-pointer"><input type="checkbox" checked={toddlerSocial.inDiapers === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, inDiapers: e.target.checked ? "Yes" : "No"})} /> In diapers?</label>
                                <label className="flex items-center gap-1 font-bold text-gray-600 cursor-pointer"><input type="checkbox" checked={toddlerSocial.trainingBegun === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, trainingBegun: e.target.checked ? "Yes" : "No"})} /> Potty training begun?</label>
                                <label className="flex items-center gap-1 font-bold text-gray-600 cursor-pointer"><input type="checkbox" checked={toddlerSocial.completelyTrained === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, completelyTrained: e.target.checked ? "Yes" : "No"})} /> Completely trained?</label>
                                <label className="flex items-center gap-1 font-bold text-gray-600 cursor-pointer"><input type="checkbox" checked={toddlerSocial.toiletHelpNeeded === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, toiletHelpNeeded: e.target.checked ? "Yes" : "No"})} /> Needs bathroom help?</label>
                              </div>
                              <div className="space-y-1 mt-2">
                                <label className="text-[9.5px] font-bold text-gray-500 block">Do you use any special words pertaining to toileting?</label>
                                <input type="text" value={toddlerSocial.specialToiletWords} onChange={(e) => setToddlerSocial({...toddlerSocial, specialToiletWords: e.target.value})} placeholder="e.g. Peepee/Poopo" className="w-full bg-white border rounded px-2.5 py-1 text-[11px]" />
                              </div>
                              <div className="border-t pt-2 mt-2 space-y-1">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650 cursor-pointer">
                                  <input type="checkbox" checked={toddlerSocial.helpDressing === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, helpDressing: e.target.checked ? "Yes" : "No"})} /> Needs helper with dressing?
                                </label>
                                {toddlerSocial.helpDressing === "Yes" && (
                                  <input type="text" value={toddlerSocial.helpDressingDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, helpDressingDetails: e.target.value})} placeholder="What kind of dressing support?" className="w-full bg-white border rounded p-1 text-[10px]" />
                                )}
                              </div>
                            </div>

                            <div className="space-y-3 p-3.5 bg-slate-50 border rounded-2xl">
                              <p className="font-black text-sky-900 text-[10px] uppercase">Napping & Sleep Routines</p>
                              <div className="space-y-1">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650 cursor-pointer">
                                  <input type="checkbox" checked={toddlerSocial.doesNap === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, doesNap: e.target.checked ? "Yes" : "No"})} /> Does your child routinely nap?
                                </label>
                                {toddlerSocial.doesNap === "Yes" && (
                                  <div className="space-y-1 animate-fade-in mt-1">
                                    <label className="text-[9.5px] font-bold text-gray-500 block">What are current nap time routines & durations?</label>
                                    <textarea rows={2} value={toddlerSocial.napRoutine} onChange={(e) => setToddlerSocial({...toddlerSocial, napRoutine: e.target.value})} className="w-full bg-white border rounded p-1.5 text-[10px]" />
                                  </div>
                                )}
                              </div>
                              <div className="border-t pt-2 space-y-1">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650 cursor-pointer">
                                  <input type="checkbox" checked={toddlerSocial.napConcerns === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, napConcerns: e.target.checked ? "Yes" : "No"})} /> Concerns relating to nap time?
                                </label>
                                {toddlerSocial.napConcerns === "Yes" && (
                                  <input type="text" value={toddlerSocial.napConcernsDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, napConcernsDetails: e.target.value})} placeholder="Describe concerns" className="w-full bg-white border rounded p-1 text-[10px]" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* SECTION D: SOCIAL/EMOTIONAL DEVELOPMENT */}
                        <div className="bg-white rounded-3xl p-5 border border-sky-100/50 space-y-4 shadow-sm">
                          <h5 className="font-black text-sky-950 text-xs uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
                            <span className="text-sky-500">😊</span> 4. Toddler Social/Emotional Development (Page 2 & 3 Matrix)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="p-2.5 bg-slate-50 border rounded-xl">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650 cursor-pointer">
                                  <input type="checkbox" checked={toddlerSocial.separatesEasily === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, separatesEasily: e.target.checked ? "Yes" : "No"})} /> Separates easily from you?
                                </label>
                                <input type="text" value={toddlerSocial.separatesComments} onChange={(e) => setToddlerSocial({...toddlerSocial, separatesComments: e.target.value})} placeholder="Add separation details" className="w-full border bg-white text-[9.5px] p-1 rounded mt-1" />
                              </div>

                              <div className="p-2.5 bg-slate-50 border rounded-xl space-y-1">
                                <label className="text-[10px] font-bold text-gray-650 block">Is your child shy?</label>
                                <select value={toddlerSocial.isShy} onChange={(e) => setToddlerSocial({...toddlerSocial, isShy: e.target.value})} className="bg-white border rounded p-1 text-[10px] w-full">
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                  <option value="Sometimes">Sometimes</option>
                                </select>
                                {toddlerSocial.isShy !== "No" && (
                                  <input type="text" value={toddlerSocial.shyWithWhom} onChange={(e) => setToddlerSocial({...toddlerSocial, shyWithWhom: e.target.value})} placeholder="With whom or when?" className="w-full border bg-white text-[9.5px] p-1 rounded mt-1" />
                                )}
                              </div>

                              <div className="p-2.5 bg-slate-50 border rounded-xl">
                                <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-650 cursor-pointer">
                                  <input type="checkbox" checked={toddlerSocial.isAfraidOfAnything === "Yes"} onChange={(e) => setToddlerSocial({...toddlerSocial, isAfraidOfAnything: e.target.checked ? "Yes" : "No"})} /> Afraid of anything?
                                </label>
                                {toddlerSocial.isAfraidOfAnything === "Yes" && (
                                  <input type="text" value={toddlerSocial.afraidDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, afraidDetails: e.target.value})} placeholder="Describe fears" className="w-full border bg-white text-[9.5px] p-1 rounded mt-1" />
                                )}
                              </div>
                            </div>

                            <div className="space-y-1 p-3.5 bg-slate-50 border rounded-2xl text-[10.5px]">
                              <p className="font-extrabold text-sky-900 uppercase text-[9.5px] pb-1 tracking-wider">How does your child show feelings of:</p>
                              <div className="space-y-1.5 text-[10px]">
                                <div className="grid grid-cols-12 items-center gap-1">
                                  <span className="col-span-3 font-bold text-gray-500 uppercase text-[8.5px]">Affection:</span>
                                  <input type="text" value={toddlerSocial.feelingsAffection} onChange={(e) => setToddlerSocial({...toddlerSocial, feelingsAffection: e.target.value})} className="col-span-9 border rounded px-2 py-0.5 bg-white text-[10px]" />
                                </div>
                                <div className="grid grid-cols-12 items-center gap-1">
                                  <span className="col-span-3 font-bold text-gray-500 uppercase text-[8.5px]">Fear:</span>
                                  <input type="text" value={toddlerSocial.feelingsFear} onChange={(e) => setToddlerSocial({...toddlerSocial, feelingsFear: e.target.value})} className="col-span-9 border rounded px-2 py-0.5 bg-white text-[10px]" />
                                </div>
                                <div className="grid grid-cols-12 items-center gap-1">
                                  <span className="col-span-3 font-bold text-gray-500 uppercase text-[8.5px]">Anger:</span>
                                  <input type="text" value={toddlerSocial.feelingsAnger} onChange={(e) => setToddlerSocial({...toddlerSocial, feelingsAnger: e.target.value})} className="col-span-9 border rounded px-2 py-0.5 bg-white text-[10px]" />
                                </div>
                                <div className="grid grid-cols-12 items-center gap-1">
                                  <span className="col-span-3 font-bold text-gray-500 uppercase text-[8.5px]">Frustration:</span>
                                  <input type="text" value={toddlerSocial.feelingsFrustration} onChange={(e) => setToddlerSocial({...toddlerSocial, feelingsFrustration: e.target.value})} className="col-span-9 border rounded px-2 py-0.5 bg-white text-[10px]" />
                                </div>
                                <div className="grid grid-cols-12 items-center gap-1">
                                  <span className="col-span-3 font-bold text-gray-500 uppercase text-[8.5px]">Excitement:</span>
                                  <input type="text" value={toddlerSocial.feelingsExcitement} onChange={(e) => setToddlerSocial({...toddlerSocial, feelingsExcitement: e.target.value})} className="col-span-9 border rounded px-2 py-0.5 bg-white text-[10px]" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Favorite toy, blanket, bottle, or soother identify details:</label>
                              <input type="text" value={toddlerSocial.favoriteToyDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, favoriteToyDetails: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Has your child experienced play with other children? Describe:</label>
                              <input type="text" value={toddlerSocial.playedWithOthersDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, playedWithOthersDetails: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">How do you handle discipline?</label>
                              <input type="text" value={toddlerSocial.homeDiscipline} onChange={(e) => setToddlerSocial({...toddlerSocial, homeDiscipline: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Characteristics to ENCOURAGE:</label>
                              <input type="text" value={toddlerSocial.encouragedCharacteristics} onChange={(e) => setToddlerSocial({...toddlerSocial, encouragedCharacteristics: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Characteristics to DISCOURAGE:</label>
                              <input type="text" value={toddlerSocial.discouragedCharacteristics} onChange={(e) => setToddlerSocial({...toddlerSocial, discouragedCharacteristics: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-3 py-1.5" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-750 font-bold">Additional helpful information or notes for childcare file:</label>
                            <textarea rows={1.5} value={toddlerSocial.additionalCaringDetails} onChange={(e) => setToddlerSocial({...toddlerSocial, additionalCaringDetails: e.target.value})} className="w-full bg-slate-50 border rounded-xl p-2.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 4: COMPLIANT MEDICALS (Form 7794 + 7791) */}
                    {activeToddlerFormTab === "medication" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-3.5 bg-orange-50/20 text-orange-950 border border-orange-100 rounded-2xl mb-2 leading-relaxed">
                          <strong>Saskatchewan Form 7794 (Medication) & 7791 (Medical Certificate):</strong> This authorizes Peekaboo Corner's educators to administer prescribed medication to toddlers (eg. baby vitamins or teething rubs) if formally cleared by critical pediatric certificates.
                        </div>

                        <div className="space-y-3 bg-white p-4 border rounded-2xl">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1 flex items-center gap-1.5">
                            <span>💊</span> Emergency Medication Authorization (Form 7794)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Name of Medication</label>
                              <input
                                type="text"
                                value={medicationAuth.medName}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medName: e.target.value})}
                                placeholder="e.g. Children Tylenol (As Required)"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Strict dosage instructions</label>
                              <input
                                type="text"
                                value={medicationAuth.medDosage}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medDosage: e.target.value})}
                                placeholder="e.g. 5ml based on weight chart"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Times of Day to administer</label>
                              <input
                                type="text"
                                value={medicationAuth.medTimesText}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medTimesText: e.target.value})}
                                placeholder="e.g. As required under high fever threshold"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2 bg-white p-4 border rounded-2xl">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1 flex items-center gap-1.5">
                            <span>👨‍⚕️</span> Saskatchewan Pediatric Physician of Record (Form 7791 clearance)
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={medicationAuth.physicianName}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianName: e.target.value})}
                              placeholder="Doctor Full Name"
                              className="bg-white border rounded-xl px-3 py-2 animate-fade-in"
                            />
                            <input
                              type="tel"
                              value={medicationAuth.physicianPhone}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianPhone: e.target.value})}
                              placeholder="Doctor Telephone number"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                            <input
                              type="text"
                              value={medicationAuth.physicianAddress}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianAddress: e.target.value})}
                              placeholder="Clinic Address"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-orange-50/15 border border-orange-100 rounded-xl space-y-3">
                          <label className="flex items-start gap-2.5 cursor-pointer font-bold text-gray-850">
                            <input
                              type="checkbox"
                              checked={medicationAuth.medConsentChecked}
                              onChange={(e) => setMedicationAuth({...medicationAuth, medConsentChecked: e.target.checked})}
                              className="mt-1 h-3.5 w-3.5"
                            />
                            <span className="leading-snug text-gray-650 text-[10px]">
                              I hereby authorize Peekaboo Corner Early Learning Care to host toddler health resume files with Saskatchewan Ministry of Education during regulatory inspections.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB 5: PARENT HANDBOOK ACKNOWLEDGMENT (PEEKABOO CORNER OFF-WHITES CANVASES) */}
                    {activeToddlerFormTab === "handbook" && (
                      <div className="space-y-4 animate-fade-in text-[10.5px] leading-relaxed text-slate-700">
                        <div className="p-4 bg-sky-50 text-sky-950 border border-sky-100 rounded-2xl">
                          <h4 className="font-extrabold uppercase text-[11px] mb-1">Peekaboo Corner Regulated Parent Handbook</h4>
                          <p className="text-[10px]">As a condition of licensing, providers must compile policy catalogs. Please read the core handbooks blocks below and Digitally Acknowledge:</p>
                        </div>

                        {/* Handbooks items grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-[#59C7F5] text-[10.5px] uppercase">1. Our Early Learning Philosophy</h5>
                            <p className="text-[10px] text-gray-500">At Peekaboo Corner, our philosophy centers on a nurturing, strictly vegetarian, inclusive, and play-based environment following Saskatchewan's Play & Exploration Framework. We prioritize empathy, kindness, and native tree appreciation.</p>
                            <label className="flex items-center gap-1.5 font-bold text-sky-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={toddlerHandbookConsent.philosophyReadAck} onChange={(e) => setToddlerHandbookConsent({...toddlerHandbookConsent, philosophyReadAck: e.target.checked})} /> I Acknowledge Philosophy Statement Section
                            </label>
                          </div>

                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-[#59C7F5] text-[10.5px] uppercase">2. Daily schedule & closures</h5>
                            <p className="text-[10px] text-gray-500">Our operational times are Monday to Friday, 7:30 AM to 5:30 PM. We are closed on all Canadian statutory holidays, plus traditional celebrations including Indian New Year and Diwali (providing advance notice).</p>
                            <label className="flex items-center gap-1.5 font-bold text-sky-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={toddlerHandbookConsent.scheduleReadAck} onChange={(e) => setToddlerHandbookConsent({...toddlerHandbookConsent, scheduleReadAck: e.target.checked})} /> I Acknowledge Schedule Page
                            </label>
                          </div>

                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-[#59C7F5] text-[10.5px] uppercase">3. Vegetarian Nutrition guidelines</h5>
                            <p className="text-[10px] text-gray-500">All meals meet the Canada Food Guide requirements under our strictly vegetarian diet. No outside junk food or non-vegetarian food is permitted. Milk is served twice daily with water available always.</p>
                            <label className="flex items-center gap-1.5 font-bold text-sky-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={toddlerHandbookConsent.mealsReadAck} onChange={(e) => setToddlerHandbookConsent({...toddlerHandbookConsent, mealsReadAck: e.target.checked})} /> I Acknowledge Nutrition Policies
                            </label>
                          </div>

                          <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-2">
                            <h5 className="font-extrabold text-[#59C7F5] text-[10.5px] uppercase">4. Fees, late picks & notices</h5>
                            <p className="text-[10px] text-gray-500">Fees are due on the 1st of every month via cash, e-transfer, or cheque. Late payments incur a $25 charge. Late pick-ups are charged $10 per 10 minutes. A deposit of $217.50 is required upon intake matching.</p>
                            <label className="flex items-center gap-1.5 font-bold text-sky-900 mt-1 cursor-pointer">
                              <input type="checkbox" checked={toddlerHandbookConsent.feesReadAck} onChange={(e) => setToddlerHandbookConsent({...toddlerHandbookConsent, feesReadAck: e.target.checked})} /> I Acknowledge Fee Policies
                            </label>
                          </div>
                        </div>

                        {/* SIGNATURE BLOCK */}
                        <div className="p-4 bg-sky-50/15 border border-sky-100 rounded-2xl space-y-2">
                          <p className="font-extrabold text-slate-800 tracking-wide text-[10px]">SASKATCHEWAN PROVINCIAL REQUIRED PRIVACY COMPLIANCE STATEMENT (FOIP):</p>
                          <p className="text-[9.5px] text-gray-400 font-medium">"As a condition of the Parent Fee Grant to reduce child care fees for Saskatchewan families, the Ministry of Education is required to gather information including child's name, current fee, and parent information in order to determine funding eligibility. Collected under FOIP."</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase font-bold text-sky-900">Signed Parent / Guardian Signature</label>
                              <input
                                type="text"
                                required={activeCohort === "toddler"}
                                value={toddlerHandbookConsent.parentSignature}
                                onChange={(e) => setToddlerHandbookConsent({...toddlerHandbookConsent, parentSignature: e.target.value})}
                                placeholder="Type Full Name to Sign"
                                className="w-full bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 font-mono text-xs text-sky-950 font-bold"
                              />
                            </div>
                            <div className="flex items-end">
                              <span className="text-[10px] text-gray-400 font-extrabold uppercase">FOIP digital timestamp locked: {new Date().toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {activeCohort === "preschool" && (
                <div className="p-5 bg-amber-50/10 border border-amber-100 rounded-3xl space-y-4 animate-fade-in">
                  <h4 className="font-extrabold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>🎨</span> Preschool Early Learning Readiness
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-450">Toileting Independence</label>
                      <select
                        value={preschoolIntake.bathroomIndependence ? "independent" : "relying"}
                        onChange={(e) => setPreschoolIntake({ ...preschoolIntake, bathroomIndependence: e.target.value === "independent" })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px]"
                      >
                        <option value="independent">Fully independent with handwashing</option>
                        <option value="relying">Sometimes requires gentle reminder</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-450">Outdoor Play Engagement Interest</label>
                      <select
                        value={preschoolIntake.outdoorPlayInterest}
                        onChange={(e) => setPreschoolIntake({ ...preschoolIntake, outdoorPlayInterest: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px]"
                      >
                        <option value="High">High - extremely active outdoors</option>
                        <option value="Moderate">Moderate - enjoys climbing/sitting</option>
                        <option value="Gentle">Gentle - prefers indoor drawing</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-450">Fine Motor Activities & Artistic Focus</label>
                      <input
                        type="text"
                        value={preschoolIntake.fineMotorSkillNote}
                        onChange={(e) => setPreschoolIntake({ ...preschoolIntake, fineMotorSkillNote: e.target.value })}
                        placeholder="e.g. Cut paper shapes, loves bead threading"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-gray-450">Preferred Group Interaction Style</label>
                      <input
                        type="text"
                        value={preschoolIntake.socialPlayStyle}
                        onChange={(e) => setPreschoolIntake({ ...preschoolIntake, socialPlayStyle: e.target.value })}
                        placeholder="e.g. Dramatic play, building tall block towers"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SCHOOL AGE MULTI-FORM COMPLEX DIGITIZER */}
              {activeCohort === "school_age" && (
                <div className="border border-orange-100 rounded-3xl overflow-hidden space-y-6 bg-[#FAFAFA] pb-6">
                  
                  {/* GOVERNMENT BANNER ROW */}
                  <div className="bg-gradient-to-r from-[#FF724E] to-slate-800 text-white p-4 select-none">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h4 className="font-extrabold text-[12px] uppercase tracking-wider">
                          Saskatchewan Early Learning Childcare Services Registry
                        </h4>
                        <p className="text-[10px] text-orange-200">Regulatory digital packets for placement matching under Monali Patel license</p>
                      </div>
                      <span className="text-[9px] bg-white text-slate-800 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                        6-12 Years Program
                      </span>
                    </div>
                  </div>

                  {/* FORM SELECTION SUB TABS */}
                  <div className="px-4 border-b border-gray-200 flex flex-wrap gap-1">
                    {[
                      { id: "agreement", label: "📄 Form 7777: Services Agreement" },
                      { id: "emergency", label: "🚨 Form 7790 + 7809: Emergency & Health" },
                      { id: "social", label: "🎒 Form 7788: School-Age Social" },
                      { id: "medication", label: "💊 Form 7794 + 7791: Meds & Cert" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveSchoolAgeFormTab(tab.id as any)}
                        className={`px-3 py-2 rounded-t-xl text-[10.5px] font-extrabold transition-all border-t border-x cursor-pointer ${
                          activeSchoolAgeFormTab === tab.id
                            ? "bg-white text-[#FF724E] border-gray-200 border-b-white translate-y-[1px]"
                            : "bg-gray-100/70 text-gray-500 border-transparent hover:bg-gray-100"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB-FORM CONTENT INJECTION */}
                  <div className="px-4 sm:px-6 space-y-6">
                    
                    {/* SUB TAB A: AGREEMENT */}
                    {activeSchoolAgeFormTab === "agreement" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-emerald-900 leading-normal mb-2">
                          <strong>Saskatchewan Form 7777 - Guidelines Note:</strong> This is a legally binding services contract between parent Monali Patel & Peekaboo Corner childcare operator.
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Daycare Primary Operating Address</label>
                            <input
                              type="text"
                              disabled
                              value="4822 Queen Street, Regina, SK S4S 5Y9"
                              className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-gray-600 font-medium"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Contracted Monthly Care Fee ($ CAD)</label>
                            <input
                              type="text"
                              value={schoolAgeAgreement.monthlyFeeValue}
                              onChange={(e) => setSchoolAgeAgreement({ ...schoolAgeAgreement, monthlyFeeValue: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold focus:border-[#FF724E]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Trial Period Notice Standard</label>
                            <input
                              type="text"
                              value={schoolAgeAgreement.trialPeriodNoticeDays}
                              onChange={(e) => setSchoolAgeAgreement({ ...schoolAgeAgreement, trialPeriodNoticeDays: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-500">Contract Termination Notice Standard</label>
                            <input
                              type="text"
                              value={schoolAgeAgreement.terminationWeeksNotice}
                              onChange={(e) => setSchoolAgeAgreement({ ...schoolAgeAgreement, terminationWeeksNotice: e.target.value })}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500">Scheduled Hours / Operating Times Matrix Needed</label>
                          <textarea
                            rows={2}
                            value={schoolAgeAgreement.additionalCareArrangements}
                            onChange={(e) => setSchoolAgeAgreement({ ...schoolAgeAgreement, additionalCareArrangements: e.target.value })}
                            placeholder="e.g. Morning supervision 07:30 AM to 08:45 AM. After school session 03:30 PM to 05:30 PM."
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                          />
                        </div>

                        <div className="p-4 bg-[#FFFBF5] border border-orange-100 rounded-xl space-y-3">
                          <p className="font-extrabold text-orange-950">Declaration signature simulation:</p>
                          <p className="text-[10px] text-gray-500 leading-normal">
                            By entering your name below, you confirm that you have read and agreed to the guidelines established in the Regina early child care licensee framework.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] uppercase font-bold text-orange-900">Signed Parent / Guardian Full Name</label>
                              <input
                                type="text"
                                required={activeCohort === "school_age"}
                                value={schoolAgeAgreement.authorizedSignatureName}
                                onChange={(e) => setSchoolAgeAgreement({ ...schoolAgeAgreement, authorizedSignatureName: e.target.value })}
                                placeholder="Owner Signature Monali Patel"
                                className="w-full bg-white border border-orange-200 rounded-xl px-3 py-2 font-mono text-xs text-orange-950"
                              />
                            </div>
                            <div className="flex items-end">
                              <span className="text-[10px] text-gray-400 font-bold">Signed Date: {new Date().toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB B: EMERGENCY (Form 7790 + Health 7809) */}
                    {activeSchoolAgeFormTab === "emergency" && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="text-emerald-900 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 leading-relaxed font-normal">
                          <strong>Saskatchewan Child Care Regulation 32 (Form 7790):</strong> Licensees are required to hold a portable physical and digital record of emergency illness contact protocols.
                        </div>

                        {/* SECOND PARENT (Form 7790 requires details for two parents/guardians) */}
                        <div className="space-y-3.5">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Parent / Guardian #2 Coordinates</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={emergencyInfo.parent2Name}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2Name: e.target.value })}
                              placeholder="Name of Parent #2"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                            <input
                              type="tel"
                              value={emergencyInfo.parent2CellPhone}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2CellPhone: e.target.value })}
                              placeholder="Cell Phone"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                            <input
                              type="email"
                              value={emergencyInfo.parent2Email}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2Email: e.target.value })}
                              placeholder="Email Address"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={emergencyInfo.parent2Address}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2Address: e.target.value })}
                              placeholder="Address (if different)"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                            <input
                              type="text"
                              value={emergencyInfo.parent2PostalCode}
                              onChange={(e) => setEmergencyInfo({ ...emergencyInfo, parent2PostalCode: e.target.value })}
                              placeholder="Postal Code"
                              className="bg-white border rounded-xl px-3 py-2 text-[11px]"
                            />
                          </div>
                        </div>

                        {/* TWO ADDITIONAL EMERGENCY CONTACT PERSONS */}
                        <div className="space-y-4 pt-2">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Two Other Persons to Contact in Case of Emergency</h5>
                          
                          <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-3">
                            <p className="font-bold text-gray-500 text-[10px]">EMERGENCY CONTACT #1</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                required={activeCohort === "school_age"}
                                value={emergencyInfo.emer1Name}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer1Name: e.target.value })}
                                placeholder="Contact Name"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="text"
                                required={activeCohort === "school_age"}
                                value={emergencyInfo.emer1Relationship}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer1Relationship: e.target.value })}
                                placeholder="Relationship (e.g., Uncle, Grandmother)"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="tel"
                                required={activeCohort === "school_age"}
                                value={emergencyInfo.emer1CellPhone}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer1CellPhone: e.target.value })}
                                placeholder="Primary Cell Phone"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>

                          <div className="bg-white rounded-2xl p-4 border border-gray-150 space-y-3">
                            <p className="font-bold text-gray-500 text-[10px]">EMERGENCY CONTACT #2</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={emergencyInfo.emer2Name}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer2Name: e.target.value })}
                                placeholder="Contact Name"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="text"
                                value={emergencyInfo.emer2Relationship}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer2Relationship: e.target.value })}
                                placeholder="Relationship"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                              <input
                                type="tel"
                                value={emergencyInfo.emer2CellPhone}
                                onChange={(e) => setEmergencyInfo({ ...emergencyInfo, emer2CellPhone: e.target.value })}
                                placeholder="Primary Cell Phone"
                                className="bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>

                        {/* ILLNESS CHECKBOX GRID FROM SASKATCHEWAN REQUIREMENTS */}
                        <div className="space-y-3 pt-2">
                          <h5 className="font-extrabold text-[#FF724E] border-b pb-1">Saskatchewan EC Illness Check History</h5>
                          <p className="text-[10px] text-gray-400">Check any of the following illnesses which the child has had:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {ILLNESS_OPTIONS.map((ill) => (
                              <label key={ill} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-150 cursor-pointer hover:bg-orange-50/10">
                                <input
                                  type="checkbox"
                                  checked={emergencyInfo.checkedIllnesses.includes(ill)}
                                  onChange={() => handleToggleIllness(ill)}
                                  className="h-3.5 w-3.5 rounded text-[#FF724E] focus:ring-[#FF724E]"
                                />
                                <span className="text-[10px] text-gray-700">{ill}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* HEALTH QUESTIONS SECTION */}
                        <div className="space-y-4 pt-3">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Additional Health Resume Intake (Form 7809)</h5>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-white border rounded-xl space-y-1.5">
                              <span className="font-bold text-gray-600 block text-[10px]">IMMUNIZATIONS UP-TO-DATE?</span>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={emergencyInfo.isImmunizedUpToDate} onChange={() => setEmergencyInfo({...emergencyInfo, isImmunizedUpToDate: true})} /> Yes
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={!emergencyInfo.isImmunizedUpToDate} onChange={() => setEmergencyInfo({...emergencyInfo, isImmunizedUpToDate: false})} /> No
                                </label>
                              </div>
                            </div>

                            <div className="p-3 bg-white border rounded-xl space-y-1.5">
                              <span className="font-bold text-gray-600 block text-[10px]">BORN PREMATURE?</span>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={emergencyInfo.wasPremature} onChange={() => setEmergencyInfo({...emergencyInfo, wasPremature: true})} /> Yes
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={!emergencyInfo.wasPremature} onChange={() => setEmergencyInfo({...emergencyInfo, wasPremature: false})} /> No
                                </label>
                              </div>
                            </div>

                            <div className="p-3 bg-white border rounded-xl space-y-1.5">
                              <span className="font-bold text-gray-600 block text-[10px]">ANY PRIOR SURGERY HISTORIES?</span>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={emergencyInfo.undergoneSurgeryCheck} onChange={() => setEmergencyInfo({...emergencyInfo, undergoneSurgeryCheck: true})} /> Yes
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                  <input type="radio" checked={!emergencyInfo.undergoneSurgeryCheck} onChange={() => setEmergencyInfo({...emergencyInfo, undergoneSurgeryCheck: false})} /> No
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Surgery details if applicable (otherwise leave blank)</label>
                              <input
                                type="text"
                                value={emergencyInfo.undergoneSurgeryDetails}
                                onChange={(e) => setEmergencyInfo({...emergencyInfo, undergoneSurgeryDetails: e.target.value})}
                                placeholder="Describe any hospitalizations or operations."
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Physical activities restrictions or limits</label>
                              <input
                                type="text"
                                value={emergencyInfo.activityLimitationsText}
                                onChange={(e) => setEmergencyInfo({...emergencyInfo, activityLimitationsText: e.target.value})}
                                placeholder="Describe limitations (e.g., asthmatic outdoor runs)"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB C: SCHOOL-AGE SOCIAL RESUME (Form 7788) */}
                    {activeSchoolAgeFormTab === "social" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-950 border border-sky-100 leading-normal">
                          <strong>Saskatchewan Form 7788 requirement:</strong> Under Regina bylaws, School-Age children attending early learning centers before/after school require a social mapping resume on file.
                        </div>

                        {/* SCHOOL PRESETS */}
                        <div className="space-y-3">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Primary School Information</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">School Name</label>
                              <input
                                type="text"
                                required={activeCohort === "school_age"}
                                value={schoolAgeSocial.schoolName}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, schoolName: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">School address</label>
                              <input
                                type="text"
                                value={schoolAgeSocial.schoolAddress}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, schoolAddress: e.target.value})}
                                placeholder="Regina, SK"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">School phone</label>
                              <input
                                type="text"
                                value={schoolAgeSocial.schoolPhone}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, schoolPhone: e.target.value})}
                                placeholder="(306) 555-xxxx"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>

                        {/* COMMUTE DETAILS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500">How will child get to and from daycare?</label>
                            <input
                              type="text"
                              value={schoolAgeSocial.howGetToFromSchool}
                              onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, howGetToFromSchool: e.target.value})}
                              placeholder="e.g. Walks in supervised walking school-bus block"
                              className="w-full bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                          
                          <div className="p-3 bg-white border rounded-xl space-y-1">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                              <input
                                type="checkbox"
                                checked={schoolAgeSocial.transportCompanyInvolved}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, transportCompanyInvolved: e.target.checked})}
                                className="h-4 w-4"
                              />
                              Is transportation company (bus / taxi) involved?
                            </label>
                            <p className="text-[9px] text-gray-400">Check if Regina transit or boarding busses are utilized.</p>
                          </div>
                        </div>

                        {/* FAMILY SIBLINGS & PEETS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500">Siblings Names, Birth Dates, & live in same house?</label>
                            <textarea
                              rows={2}
                              value={schoolAgeSocial.siblingsDetails}
                              onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, siblingsDetails: e.target.value})}
                              placeholder="e.g. Sibling Daksh - born April 2018 - lives in same house"
                              className="w-full bg-white border rounded-xl px-3 py-2 text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500">What languages are spoken in your home?</label>
                            <input
                              type="text"
                              value={schoolAgeSocial.languagesSpokenInHome}
                              onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, languagesSpokenInHome: e.target.value})}
                              className="w-full bg-white border rounded-xl px-3 py-2 text-xs"
                            />
                          </div>
                        </div>

                        {/* SOCIAL EMOTIONAL RESPONSE LOGS */}
                        <div className="space-y-3.5 pt-2">
                          <h5 className="font-extrabold text-[#FF724E] border-b pb-1">
                            Social/Emotional Development Responses
                          </h5>
                          <p className="text-[10px] text-gray-400">Describe briefly how your child shows feelings of:</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-450">Affection</label>
                              <input
                                type="text"
                                value={schoolAgeSocial.affectionShow}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, affectionShow: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-1.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-450">Fear & Shy cycles</label>
                              <input
                                type="text"
                                value={schoolAgeSocial.fearShow}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, fearShow: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-1.5"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-450">Anger & Frustrations</label>
                              <input
                                type="text"
                                value={schoolAgeSocial.frustrationShow}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, frustrationShow: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-1.5"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold uppercase text-gray-450">Excitement</label>
                              <input
                                type="text"
                                value={schoolAgeSocial.excitementShow}
                                onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, excitementShow: e.target.value})}
                                className="w-full bg-white border rounded-xl px-3 py-1.5"
                              />
                            </div>
                          </div>

                          {/* Enjoy playing preferences */}
                          <div className="p-4 bg-white border rounded-2xl md:col-span-2 space-y-2.5">
                            <p className="font-extrabold text-gray-700 text-[10px]">CHILD'S RECREATION PREFERENCES matrix:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-[10.5px]">
                              {[
                                { id: "playAlone", label: "👦 Playing Alone" },
                                { id: "playYounger", label: "🧸 Younger Kids" },
                                { id: "playOwnAge", label: "✏️ Same Age Peers" },
                                { id: "playOlder", label: "🎒 Older Buddy" },
                                { id: "playAdults", label: "👋 Adults Interaction" }
                              ].map((item) => (
                                <div key={item.id} className="p-2 bg-slate-50 rounded-xl space-y-1 text-[10px]">
                                  <span className="font-bold text-gray-600 block">{item.label}</span>
                                  <select
                                    value={(schoolAgeSocial as any)[item.id]}
                                    onChange={(e) => setSchoolAgeSocial({...schoolAgeSocial, [item.id]: e.target.value})}
                                    className="w-full bg-white border rounded text-[9.5px] p-0.5"
                                  >
                                    <option value="Often">Often</option>
                                    <option value="Sometimes">Sometimes</option>
                                    <option value="Never">Never</option>
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB TAB D: MEDICAL & CERTIFICATE (Form 7794 + 7791) */}
                    {activeSchoolAgeFormTab === "medication" && (
                      <div className="space-y-4 animate-fade-in text-[11px]">
                        <div className="p-3.5 bg-orange-50/20 text-orange-950 border border-orange-100 rounded-2xl mb-2 leading-relaxed">
                          <strong>Saskatchewan Form 7794 (Medication) & 7791 (Medical Certificate):</strong> Regulation 27(1) demands that any medication administrated is backed by explicit hourly parental dosage signatures.
                        </div>

                        <div className="space-y-3">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Emergency Medication Authorization Form 7794 (If Required)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Name of Medication</label>
                              <input
                                type="text"
                                value={medicationAuth.medName}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medName: e.target.value})}
                                placeholder="e.g. Ventolin inhaler / Kid's Advil"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Hourly Dosage Instructions</label>
                              <input
                                type="text"
                                value={medicationAuth.medDosage}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medDosage: e.target.value})}
                                placeholder="e.g. 1 puff under emergency asthmatic triggers"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500">Times of Day to Administer</label>
                              <input
                                type="text"
                                value={medicationAuth.medTimesText}
                                onChange={(e) => setMedicationAuth({...medicationAuth, medTimesText: e.target.value})}
                                placeholder="e.g. As required / 12:00 PM lunch"
                                className="w-full bg-white border rounded-xl px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <h5 className="font-extrabold text-gray-900 border-b pb-1">Saskatchewan Physician Coordinates (Form 7791 Match)</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={medicationAuth.physicianName}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianName: e.target.value})}
                              placeholder="Physician Full Name"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                            <input
                              type="tel"
                              value={medicationAuth.physicianPhone}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianPhone: e.target.value})}
                              placeholder="Physician Phone"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                            <input
                              type="text"
                              value={medicationAuth.physicianAddress}
                              onChange={(e) => setMedicationAuth({...medicationAuth, physicianAddress: e.target.value})}
                              placeholder="Clinic Address"
                              className="bg-white border rounded-xl px-3 py-2"
                            />
                          </div>
                        </div>

                        {/* LEGAL STATEMENTS CONSENTS */}
                        <div className="p-4 bg-orange-50/15 border border-orange-100 rounded-xl space-y-3">
                          <label className="flex items-start gap-2.5 cursor-pointer font-bold text-gray-800">
                            <input
                              type="checkbox"
                              checked={medicationAuth.medConsentChecked}
                              onChange={(e) => setMedicationAuth({...medicationAuth, medConsentChecked: e.target.checked})}
                              className="mt-1 h-4 w-4"
                            />
                            <span className="leading-snug">
                              Regulatory Personal Health Information consent: I authorize Peekaboo Corner Early Learning Care to disclose this medical history to the Saskatchewan Ministry of Education during inspections if requested.
                            </span>
                          </label>

                          <label className="flex items-start gap-2.5 cursor-pointer font-bold text-gray-850">
                            <input
                              type="checkbox"
                              checked={medicationAuth.stateOfHealthFitCheck}
                              onChange={(e) => setMedicationAuth({...medicationAuth, stateOfHealthFitCheck: e.target.checked})}
                              className="mt-1 h-3.5 w-3.5"
                            />
                            <span className="leading-snug text-[10px] text-gray-500 font-medium">
                              Form 7791 Medical Clearance Confirmation: I certify my child is in a state of health that is entirely appropriate to be cared for in a licensed early learning group facility.
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* CORE SCHEDULING DETAILS AND TERMS */}
              <div className="space-y-4 p-5 bg-[#FFFBF5]/40 border border-orange-100/60 rounded-3xl">
                <h4 className="font-extrabold text-[#FF724E] text-xs uppercase tracking-wider">
                  Target Admissions Preferences & Photo Release
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Target Commencement Date</label>
                    <input
                      type="date"
                      required
                      value={preferredStartDate}
                      onChange={(e) => setPreferredStartDate(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400">Operational Care Schedule</label>
                    <select
                      value={scheduleRequirements}
                      onChange={(e) => setScheduleRequirements(e.target.value as any)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-800"
                    >
                      <option value="Full-Time">Full-Time (5 Days / Week)</option>
                      <option value="Part-Time">Part-Time (3 Days / Week)</option>
                      <option value="Half-Day">Half-Day (Morning Only)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="pic-permissions"
                    checked={photoPermissions}
                    onChange={(e) => setPhotoPermissions(e.target.checked)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <label htmlFor="pic-permissions" className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                    Authorize secure early learning photograph milestone reports on the private Parent Portal (Never shared publicly without direct written consent).
                  </label>
                </div>
              </div>

              {/* SUBMIT TRIGGERS */}
              <button
                type="submit"
                className="w-full bg-[#FF724E] hover:bg-[#e65e3a] active:scale-99 text-white hover:shadow-lg text-xs tracking-wider uppercase font-extrabold py-4 rounded-xl transition-all cursor-pointer shadow-sm text-center"
              >
                Submit Childcare Registration Queue & Saskatchewan forms &rarr;
              </button>

            </form>
          ) : (
            <div className="text-center p-8 space-y-6 bg-emerald-50/40 rounded-3xl border border-emerald-100 animate-fade-in text-[11px]">
              <span className="text-5xl">🎉</span>
              <h4 className="font-extrabold text-emerald-800 text-lg">Application Packages Compiled & Placed!</h4>
              
              <div className="bg-white rounded-2xl p-5 border border-emerald-100/40 text-left space-y-3.5 text-[11px] text-gray-700 max-w-xl mx-auto shadow-sm">
                <div className="border-b border-gray-100 pb-2 flex justify-between">
                  <span className="font-bold text-gray-900">Registration ID:</span>
                  <span className="font-black text-[#FF724E] uppercase select-all bg-orange-50 px-2 py-0.5 rounded-md text-xs">{successSubmission.id}</span>
                </div>
                
                <p><strong>Registered Child:</strong> {successSubmission.child.firstName} {successSubmission.child.lastName} ({successSubmission.child.gender})</p>
                <p><strong>Primary Guardian Name:</strong> {successSubmission.parent.firstName} {successSubmission.parent.lastName} ({successSubmission.parent.phone})</p>
                <p><strong>Selected Age Level:</strong> <span className="uppercase font-bold text-sky-800">{successSubmission.ageGroupSelected}</span></p>
                <p><strong>Admissions Waitlist Rank:</strong> #{successSubmission.waitlistRank}</p>
                
                <div className="bg-sky-50 text-sky-850 p-3.5 rounded-xl border border-sky-100 text-[10.5px] leading-relaxed">
                  <strong>Saskatchewan compliance verification successfully triggered:</strong> Early Childhood Educator teams have received and locked the child emergency, health resume, medical clearance, and services agreements.
                </div>
              </div>

              {/* SIMULATED EXCEL OR PRINT PREVIEW BUTTONS COMPLYING WITH PHYSICAL COPY EXPECTATION */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => alert("Simulating PDF download... Saved Saskatchewan-EC-Forms-Bundle_ Daksh-Patel.pdf to local directory!")}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all text-[11px]"
                >
                  <Download className="w-3.5 h-3.5" /> Download Regulatory Printed Package (.PDF)
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-white border border-gray-200 text-gray-600 font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-gray-50 transition-all text-[11px]"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Copy
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSuccessSubmission(null)}
                  className="text-[#FF724E] font-bold underline"
                >
                  &larr; Register Another Child / Sibling Intake
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
