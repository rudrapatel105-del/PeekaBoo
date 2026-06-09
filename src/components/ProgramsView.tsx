import React, { useState } from "react";
import { CheckCircle, ShieldAlert, Users, Award, Clock, Smile, Trash, ChefHat } from "lucide-react";

interface ProgramDetail {
  id: string;
  title: string;
  age: string;
  ratio: string;
  desc: string;
  goals: string[];
  outcomes: string[];
  meals: string;
  outdoor: string;
  routine: { time: string; activity: string }[];
  testimonial: { text: string; parent: string };
  emoji: string;
}

const PROGRAMS_DATA: ProgramDetail[] = [
  {
    id: "infant",
    title: "Infant Program",
    age: "0 to 18 months",
    ratio: "1 educator to 3 infants (Premium Quality Range)",
    desc: "A warm, nurturing sanctuary centered on building secure emotional attachments, healthy sleep rhythms, safe crawling, and gentle sensory discoveries.",
    goals: [
      "Develop secure attachments with dedicated primary caregivers",
      "Stimulate gross motor skills (rolling, grasping, sitting, crawling)",
      "Establish safe, comfortable individualized sleeping routines",
      "Encourage early vocalizations and language comprehension"
    ],
    outcomes: [
      "Physical comfort and confident crawling in soft-play yards",
      "Response to simple gestures, basic words and hand signs",
      "Mastery of sensory-bin coordination (sorting, soft squeezing)"
    ],
    meals: "Individualized nutritional plans matching mother-provided directions or allergen-free freshly prepared purees. Clean feeding protocols on file.",
    outdoor: "Daily buggy rides around our private backyard, natural gentle warm breeze sensory exposure, and blanket play on real grass.",
    routine: [
      { time: "7:30 AM", activity: "Gentle intake, sensory exploration and quiet soft book readings" },
      { time: "9:00 AM", activity: "Morning botanical milk/purees feeding & first nap cycle" },
      { time: "10:30 AM", activity: "Sensory crawl play, mirror activities, and fine motor grasp lessons" },
      { time: "11:30 AM", activity: "Nutritional puréed organic vegetable soup lunch" },
      { time: "12:30 PM", activity: "Buggy fresh air stroll & main afternoon nap cycle" },
      { time: "03:00 PM", activity: "Physical rolling exercises, music class & fruit snack" },
      { time: "04:30 PM", activity: "Secure playtime, language cards & parent pickup preparation" }
    ],
    testimonial: {
      text: "Leaving my 10-month-old was terrifying, but the primary caregiver bonds at Peekaboo made drop-offs completely tears-free. The daily reports are so detailed!",
      parent: "Ananya S., Regina Mother"
    },
    emoji: "🍼"
  },
  {
    id: "toddler",
    title: "Toddler Program",
    age: "18 to 36 months",
    ratio: "1 educator to 5 toddlers",
    desc: "A lively, active zone curated to channel energetic curiosity into coordinated physical skills, language growth, early socialization, and primary independence.",
    goals: [
      "Expand spoken vocabulary and communication of primary desires",
      "Build balance, running mechanics, and finger paint control",
      "Introduce gentle sharing strategies during community circles",
      "Support physiological ready-signs for early potty training"
    ],
    outcomes: [
      "Clear articulation of short sentences (3-4 words)",
      "Cooperative matching of structural blocks and puzzles",
      "Acquiring handwashing and coat-buttoning independence"
    ],
    meals: "Nutritious fully vegetarian breakfast, protein-packed hot lentil lunches, seasonal orchard snacks, and filtered plant milks.",
    outdoor: "Two daily sessions in our custom-fenced toddler yard: sand sensory digging, low climbing triangles, and grassy rolling hills.",
    routine: [
      { time: "07:30 AM", activity: "Warm arrival & self-led classroom construction play" },
      { time: "09:00 AM", activity: "Morning snack: fresh Regina apples & organic seed-butter" },
      { time: "09:30 AM", activity: "Interactive morning circle: local stories, songs & name cards" },
      { time: "10:15 AM", activity: "Reggio Emilia exploration: clay play, water board splashing" },
      { time: "11:00 AM", activity: "Outdoor active play & obstacle navigation" },
      { time: "11:45 AM", activity: "Warm butternut squash mac & cheese lunch" },
      { time: "12:30 PM", activity: "Quiet storybooks and major afternoon sleep/nap cycle" },
      { time: "03:00 PM", activity: "Potty check-ins, language matching & blueberry muffins snack" },
      { time: "03:30 PM", activity: "Saskatchewan plant sorting circle & music loops" },
      { time: "04:30 PM", activity: "Tidy-up circles and parent pick-up transition" }
    ],
    testimonial: {
      text: "The potty training support we received here was brilliant. The educators were patient, encouraging, and made sure our routines were 100% matched.",
      parent: "Mark V., Regina Father"
    },
    emoji: "🎨"
  },
  {
    id: "preschool",
    title: "Preschool Program",
    age: "3 to 4 years",
    ratio: "1 educator to 10 preschoolers",
    desc: "An inquiry-rich, bento-grid inspired learning sandbox that models pre-literacy, numeracy, science observations, and social-emotional confidence.",
    goals: [
      "Introduce synthetic phonics, letter contours, and name writing",
      "Foster sorting, grouping, counting up to 20, and pattern arrays",
      "Model peaceful conflict resolutions and self-regulation pathways",
      "Expand science curiosity through nature collections and experiments"
    ],
    outcomes: [
      "Writing first names and recognizing all primary letters",
      "Expressing empathy and complex emotions with peer words",
      "Independently carrying out simple classroom tidy chore routines"
    ],
    meals: "High-protein plant-based menu featuring chickpeas stew, dahl, garden pasta, seed cakes, and seasonal fresh vegetable sticks.",
    outdoor: "Explorative playground days: seedling-planting, climbing structures, snow sledding in winter, and nature scavenger hunts.",
    routine: [
      { time: "07:30 AM", activity: "Fostering arriving independence: locker checks, morning puzzles" },
      { time: "08:45 AM", activity: "Nutritious breakfast bowl: hot porridge, fresh prairie honey" },
      { time: "09:15 AM", activity: "Circle of sharing, global calendars & Cree greetings" },
      { time: "09:45 AM", activity: "STEM workshop: sink-or-float boards, magnetic towers" },
      { time: "10:45 AM", activity: "Active nature school play and active physical yard games" },
      { time: "11:45 AM", activity: "Organic tomato-spinach pizza flatbread lunch" },
      { time: "12:30 PM", activity: "Rest restorative circle, light sensory relaxation and quiet time" },
      { time: "02:30 PM", activity: "Art studio craft: leaf collage, clay sculptures" },
      { time: "03:15 PM", activity: "Healthy hummus snacks and organic apple wedges" },
      { time: "03:45 PM", activity: "Literacy workshop: phonetic games & letter sorting" },
      { time: "04:45 PM", activity: "Reflection circle, bag packing & parent desk updates" }
    ],
    testimonial: {
      text: "My daughter entered kindergarten reading basic sentences and completely confident. The STEM projects they do at Peekaboo are mind-blowing!",
      parent: "Chantal L., Regina Mother"
    },
    emoji: "🧩"
  },
  {
    id: "kindergarten",
    title: "Kindergarten Program",
    age: "4 to 5 years",
    ratio: "1 educator to 12 children",
    desc: "A robust preparatory bridge coordinating high academic benchmarks, reading skills, structured mathematics, and group-driven collaborative leadership.",
    goals: [
      "Achieve fluid phonetic blending and writing of primary sentences",
      "Master single-digit summation, subtraction concepts, and groupings",
      "Formulate cooperative engineering logic during group building projects",
      "Introduce diverse cultures, French counting, and Treaty relationships"
    ],
    outcomes: [
      "Confident early reader capability matching standard school metrics",
      "Unlocking independent problem solving without needing immediate instruction",
      "Highly stable social bonds and verbal empathy behaviors"
    ],
    meals: "Customized healthy hot meals: vegetable fried rice with tofu, lentil dahl with brown rice, whole-wheat bagel spreads, fresh juices.",
    outdoor: "Sports drills, complex playground logic games, seed propagation, and building winter forts.",
    routine: [
      { time: "07:30 AM", activity: "Warm greeting, storage sorting and table block construction" },
      { time: "08:30 AM", activity: "Prairie pancake breakfast topped with real maple sirup" },
      { time: "09:00 AM", activity: "Interactive morning news circle & French language lessons" },
      { time: "09:30 AM", activity: "Advanced academic tracks: math, phonetic blends & syllables" },
      { time: "10:30 AM", activity: "Outdoor active exercises, team sports & seed care" },
      { time: "11:45 AM", activity: "Dahl lentil curry, brown rice, side salad & organic milk" },
      { time: "12:30 PM", activity: "Restorative meditation, soft instrumental music, journal drawings" },
      { time: "02:00 PM", activity: "Science exploration: volcano reactions & weather logs" },
      { time: "03:00 PM", activity: "Afternoon snack: Greek yogurt, berry compote & sunflower seeds" },
      { time: "03:30 PM", activity: "Artistry corner: water coloring and theatre play" },
      { time: "04:30 PM", activity: "Clean-up chore board & group reflection" },
      { time: "05:00 PM", activity: "Parent pickup & sharing updates" }
    ],
    testimonial: {
      text: "The Kindergarten program prepared Aarav incredibly well. The teachers knew exactly what public school targets looked like in Regina.",
      parent: "Ravi P., Regina Father"
    },
    emoji: "✏️"
  },
  {
    id: "schoolage",
    title: "School Age Track",
    age: "5 to 7 years",
    ratio: "1 educator to 15 children",
    desc: "An enriching, secure after-school loop supporting academic tutoring, physical fitness, creative team crafting, and positive peer community connections.",
    goals: [
      "Support daily homework assignments and tutoring requirements",
      "Model project-based leadership and respectful peer feedback",
      "Encourage active community exercises and physical team builders",
      "Build life skills, cooking foundations, and basic gardening"
    ],
    outcomes: [
      "Homework tasks completed accurately before arriving home",
      "Demonstrating inclusive sportsmanship and mutual cooperative leadership",
      "Understanding early organic gardening and natural kitchen safety"
    ],
    meals: "Special high-energy snack boards: vegetable wraps, nutrient-dense seed muffins, yogurt cups, and warm cocoa in winter.",
    outdoor: "Outdoor soccer goals, complex tag, gardening in custom wood boxes, and building snow tunnels.",
    routine: [
      { time: "03:15 PM", activity: "Pickup from Regina local elementary stops and safe check-in" },
      { time: "03:30 PM", activity: "Unpack, hand sanitation, and high-energy veggie wrap snack" },
      { time: "03:45 PM", activity: "Homework circle & personalized academic tutoring support" },
      { time: "04:30 PM", activity: "Physical team builders: soccer targets, coordination agility lines" },
      { time: "05:00 PM", activity: "Creative club time: Lego challenges, digital stop-motion" },
      { time: "05:30 PM", activity: "Desk cleanup and final family pickup" }
    ],
    testimonial: {
      text: "Having after-school custody matching local Regina bus stops was a lifesaver. The homework helps mean we relax much more as a family at night!",
      parent: "Liam's Mother, Regina"
    },
    emoji: "🚴"
  }
];

export default function ProgramsView() {
  const [activeTab, setActiveTab] = useState<string>("infant");
  const activeProg = PROGRAMS_DATA.find((p) => p.id === activeTab) || PROGRAMS_DATA[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 pb-16">
      {/* 1. SECTION INTRO */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-extrabold text-[#59C7F5] tracking-widest bg-sky-50 px-3 py-1 rounded-full">Explore Classroom Paths</span>
        <h1 className="text-3xl font-extrabold text-gray-900">Tailored Tracks for Every Age Category</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-xs leading-relaxed">
          Select a program tab below to explore specific ages served, active daily routines, sample meals, and peer outcomes.
        </p>
      </div>

      {/* 2. TAB CONTROLLER CAROUSEL */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2 border-b border-gray-100 pb-4">
        {PROGRAMS_DATA.map((prog) => (
          <button
            key={prog.id}
            onClick={() => setActiveTab(prog.id)}
            className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeTab === prog.id
                ? "bg-[#FF724E] text-white shadow-md shadow-orange-400/10 scale-102"
                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-100 hover:border-orange-100"
            }`}
          >
            <span className="text-lg">{prog.emoji}</span>
            <span>{prog.title}</span>
          </button>
        ))}
      </div>

      {/* 3. DYNAMIC CONTENT SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Aspect: General overview */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <span className="text-4xl">{activeProg.emoji}</span>
              {activeProg.title} Detail
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-650">
              <span className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-xl">Age: {activeProg.age}</span>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl">Ratio: {activeProg.ratio}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {activeProg.desc}
            </p>
          </div>

          {/* Development Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-100/60 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-800 text-sm border-b border-gray-105 pb-2 text-[#FF724E]">Development Goals</h4>
              <ul className="space-y-2.5">
                {activeProg.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-105 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-800 text-sm border-b border-gray-105 pb-2 text-[#59C7F5]">Target Outcomes</h4>
              <ul className="space-y-2.5">
                {activeProg.outcomes.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed">
                    <Award className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dinings & Healthy Meals & Outdoors Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#EFF8EF]/40 rounded-2xl p-5 border border-emerald-100/35 space-y-2">
              <h4 className="font-bold text-gray-800 text-xs uppercase text-emerald-700 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4" /> Fresh Vegetarian Meals
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">{activeProg.meals}</p>
            </div>

            <div className="bg-[#E6F7FF]/40 rounded-2xl p-5 border border-sky-100/35 space-y-2">
              <h4 className="font-bold text-gray-800 text-xs uppercase text-sky-700 flex items-center gap-1.5">
                🌳 Outdoor active explorations
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">{activeProg.outdoor}</p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="bg-orange-50/20 border-l-4 border-[#FF724E] rounded-r-2xl p-5 italic space-y-2">
            <p className="text-xs text-gray-600 leading-relaxed">
              "{activeProg.testimonial.text}"
            </p>
            <p className="text-[10px] font-bold text-gray-500 not-italic uppercase tracking-widest">
              &mdash; {activeProg.testimonial.parent}
            </p>
          </div>
        </div>

        {/* Right Aspect: Timeline Schedule Routine */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6.5 shadow-sm border border-orange-50/40 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-[#FF724E]" />
              Sample Daily Routine
            </h3>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-0.5">A Glimpse into the Day</p>
          </div>

          <div className="relative border-l border-orange-100 ml-2.5 pl-5.5 space-y-5">
            {activeProg.routine.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[28.5px] top-1 w-3 h-3 rounded-full border border-orange-200 bg-white group-hover:bg-[#FF724E] group-hover:border-[#FF724E] transition-colors"></div>
                
                <p className="text-[10px] font-extrabold text-[#FF724E] tracking-wider uppercase mb-0.5">{item.time}</p>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">{item.activity}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <p className="text-[10px] text-gray-400">
              *Daily structures adjust dynamically to seasonal weather & individual transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
