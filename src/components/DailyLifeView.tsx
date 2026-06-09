import React, { useState } from "react";
import { Clock, Calendar, Download, AlertCircle, Sparkles, Smile, ArrowRight, Heart, Utensils } from "lucide-react";
import SaskMenuPlanner from "./SaskMenuPlanner";

interface ActivityEvent {
  day: string;
  focus: string;
  highlight: string;
}

const MONTHLY_CALENDARS: Record<string, ActivityEvent[]> = {
  infants: [
    { day: "Week 1", focus: "Texture Play", highlight: "Gentle warm safe mud tracing and soft sponge squeezing" },
    { day: "Week 2", focus: "Language Sounds", highlight: "Listening to bird chirps and high pitch animal stories" },
    { day: "Week 3", focus: "Motor Control", highlight: "Soft block stacking, mirror smiling and crawling tunnels" },
    { day: "Week 4", focus: "Melody Circles", highlight: "Traditional shaking sand rattles and indigenous soft lullabies" }
  ],
  toddlers: [
    { day: "Week 1", focus: "Prairie Seed Sifting", highlight: "Sorting sunflower seeds from lentils inside sand containers" },
    { day: "Week 2", focus: "Sensory Color Blends", highlight: "Blending non-toxic finger paints onto textured canvas sheets" },
    { day: "Week 3", focus: "Climbing Obstacles", highlight: "Navigating low wooden structures, building leg motor balance" },
    { day: "Week 4", focus: "Animal Sounds Cree", highlight: "Learning sounds of prairie forest animals (bison, eagles, rabbits)" }
  ],
  preschool: [
    { day: "Week 1", focus: "Sink or Float Lab", highlight: "Testing prairie wooden twigs and limestone pebbles inside water columns" },
    { day: "Week 2", focus: "Leaf Charcoal Tracing", highlight: "Collecting backyard forest oak leaves and sketching outlines" },
    { day: "Week 3", focus: "Cree Tansi Introduction", highlight: "Vocabulary circles, learning community greetings and Treaty 4 concepts" },
    { day: "Week 4", focus: "Regina Baker Junior", highlight: "Kneading gluten free sourdough bun loops with certified kitchen leads" }
  ],
  schoolage: [
    { day: "Week 1", focus: "My First Robot", highlight: "Assembling Lego gearboxes and structural wheels" },
    { day: "Week 2", focus: "Saskatchewan Pioneers", highlight: "Sketching regional history structures, discussing treaty relationships" },
    { day: "Week 3", focus: "Junior Herb Garden", highlight: "Planting organic basil and dill seeds inside custom wooden boxes" },
    { day: "Week 4", focus: "Prairie Storytelling", highlight: "Designing short theater scripts, presenting to group peers" }
  ]
};

export default function DailyLifeView() {
  const [activeTab, setActiveTab] = useState<"timeline" | "calendar" | "meals">("meals"); // default to meals to spotlight the menu
  const [activeGroup, setActiveGroup] = useState<string>("preschool");
  const currentCalendar = MONTHLY_CALENDARS[activeGroup] || MONTHLY_CALENDARS.preschool;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 pb-16">
      {/* 1. INTRO */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-extrabold text-[#59C7F5] tracking-widest bg-sky-50 px-3 py-1 rounded-full">
          Routines, Calendars & Nutrition
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          A Typical Day of Toddlerhood Exploration
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          While we follow individualized rhythms for our infants, our groups share a cohesive layout structure of play, organic vegetarian meals, outdoors, and quiet restorative rest.
        </p>
      </div>

      {/* SUB-TABS SELECTOR DECK */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-1.5 border-b border-gray-100 pb-3">
        <button
          onClick={() => setActiveTab("meals")}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "meals"
              ? "bg-[#FF724E] text-white shadow-md scale-102"
              : "bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-orange-100"
          }`}
          id="meals-tab-button"
        >
          <Utensils className="w-4 h-4" />
          <span>🥗 Approved Meal Planner</span>
        </button>

        <button
          onClick={() => setActiveTab("timeline")}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "timeline"
              ? "bg-sky-500 text-white shadow-md scale-102"
              : "bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-sky-100"
          }`}
          id="timeline-tab-button"
        >
          <Clock className="w-4 h-4" />
          <span>🕒 Schedules & Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab("calendar")}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "calendar"
              ? "bg-sky-500 text-white shadow-md scale-102"
              : "bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-sky-100"
          }`}
          id="calendar-tab-button"
        >
          <Calendar className="w-4 h-4" />
          <span>📅 Activity theme Calendars</span>
        </button>
      </div>

      {/* TAB CONTENT RENDERING CHANGER */}
      <div className="animate-fade-in">
        {activeTab === "meals" && (
          <div className="space-y-6">
            <SaskMenuPlanner />
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-orange-50/20 space-y-8 animate-fade-in">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900">Curriculum General Timeline Chronology</h3>
              <p className="text-xs text-gray-400 font-medium font-bold">Standard daily rhythm for preschool and toddler rooms.</p>
            </div>

            <div className="relative border-l-2 border-[#59C7F5]/30 ml-4 md:ml-32 pl-6 md:pl-10 space-y-8">
              {[
                { tag: "Arrival & Welcome", time: "7:30 AM – 8:30 AM", desc: "Warm transition handoffs. Children store their baggage inside designated lockers and choose light quiet table focus puzzles." },
                { tag: "Prairie Breakfast Circle", time: "8:30 AM – 9:00 AM", desc: "Fostering group values. Enjoying warm quinoa porridge or Saskatoon berry honey oatmeals prepared fresh." },
                { tag: "Morning Circle & News", time: "9:00 AM – 9:30 AM", desc: "Group greetings. Reviewing calendars, reciting Cree and French weather words, and discussing daily play stations." },
                { tag: "Custom Exploration Labs", time: "9:30 AM – 10:30 AM", desc: "Self-directed work. Montessori life activities or Reggio Emilia creative studios (painting, molding, magnet engineering)." },
                { tag: "Backyard Nature Play", time: "10:30 AM – 11:35 AM", desc: "Two daily outdoor allocations limit sedentary behavior. Climbing, digging, sand casting, seed planting, and physical games." },
                { tag: "Hot Vegetarian Family Dine", time: "11:35 AM – 12:15 PM", desc: "Cooperative dines. Fresh high-protein lentil curry, garden salad or mac and cheese bowls. Children help wipe tables." },
                { tag: "Restorative Quiet Rest", time: "12:15 PM – 2:30 PM", desc: "Low light rest with pleasant wind chimes. Non-sleepers receive quiet sketchbooks or sensory tracing patterns." },
                { tag: "Arts Studio & Afternoon Snack", time: "2:30 PM – 3:30 PM", desc: "Enjoying fruit slices with seed muffins. Entering group collages, clay molding, or interactive peer theatre workshops." },
                { tag: "Tidy-up & Handoff circle", time: "3:30 PM – 5:30 PM", desc: "Outdoor sports, cooperative classroom tidy exercises, sharing daily summary highlights, and warm pickup handoffs." }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Absolute Time badge on wider screens */}
                  <div className="hidden md:block absolute -left-44 top-0.5 w-36 text-right font-black text-[#59C7F5] text-xs uppercase tracking-wider">
                    {item.time}
                  </div>
                  
                  {/* Timeline bubble Node */}
                  <div className="absolute -left-[33px] md:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#59C7F5] group-hover:bg-[#FF724E] group-hover:border-[#FF724E] transition-colors duration-300"></div>

                  <div className="space-y-1 bg-amber-50/10 rounded-2xl p-4 border border-transparent hover:border-orange-50 hover:bg-orange-50/20 transition-all duration-200">
                    <span className="block md:hidden text-[10px] font-bold text-[#59C7F5] mb-1 uppercase tracking-wider">{item.time}</span>
                    <h4 className="font-extrabold text-sm text-gray-800 flex items-center gap-2">
                      <span>{item.tag}</span>
                    </h4>
                    <p className="text-xs text-gray-650 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-orange-50/20 space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-100 pb-5">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900">Custom Monthly Activity Calendars</h3>
                <p className="text-xs text-gray-400">Review learning topics mapped systematically by developmental groups.</p>
              </div>
              
              <button 
                onClick={() => alert(`Beginning mock download for June 2026 ${activeGroup.toUpperCase()} Activity Calendar PDF!`)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#59C7F5] to-[#FF724E] hover:opacity-90 active:scale-98 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm animate-pulse"
              >
                <Download className="w-4 h-4" /> Export Calendar PDF
              </button>
            </div>

            {/* Group Selector Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: "infants", name: "🍼 Infants Track" },
                { id: "toddlers", name: "🎨 Toddlers Track" },
                { id: "preschool", name: "🧩 Preschooler Track" },
                { id: "schoolage", name: "🚴 School Age Track" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveGroup(pill.id)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeGroup === pill.id
                      ? "bg-[#59C7F5] text-white shadow-sm"
                      : "bg-gray-100/60 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {pill.name}
                </button>
              ))}
            </div>

            {/* Table of the active Calendar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {currentCalendar.map((item, idx) => (
                <div key={idx} className="bg-[#FFFBF5] rounded-2xl p-5 border border-orange-100/40 relative flex flex-col justify-between hover:shadow-sm">
                  <div className="space-y-4">
                    <span className="text-xs font-black uppercase text-[#FF724E] bg-white border border-orange-100 px-2.5 py-1 rounded-full">
                      {item.day}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mt-1">{item.focus}</h4>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.highlight}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-semibold uppercase flex items-center gap-1.5 mt-4">
                    <span>⭐ Core Focus Unit</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
