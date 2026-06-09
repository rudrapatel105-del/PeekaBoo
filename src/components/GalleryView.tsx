import React, { useState } from "react";
import { Image, Video, Sparkles, Filter, Smile, Calendar } from "lucide-react";

interface MediaItem {
  category: "all" | "learning" | "outdoor" | "arts" | "stem" | "celebrations";
  title: string;
  emoji: string;
  desc: string;
  bgColor: string;
}

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const mediaItems: MediaItem[] = [
    { category: "learning", title: "Montessori Letters Study", emoji: "📚", desc: "Toddlers tracing letters with tactile wooden sandpaper cards.", bgColor: "bg-sky-50 text-sky-800 border-sky-100" },
    { category: "outdoor", title: "Regina Prairie Gardeners", emoji: "🌻", desc: "Preschool children checking tomato sprouts in cedar boxes.", bgColor: "bg-emerald-50 text-emerald-800 border-emerald-100" },
    { category: "arts", title: "Clay Sculptures Studio", emoji: "🏺", desc: "Cooperative self-guided modeling with soft prairie river clays.", bgColor: "bg-rose-50 text-rose-800 border-rose-100" },
    { category: "stem", title: "Active Physics Ramp Test", emoji: "📐", desc: "Discovering gravity and rolling friction slopes with toy cars.", bgColor: "bg-amber-50 text-amber-800 border-amber-100" },
    { category: "celebrations", title: "Treaty 4 Story Circles", emoji: "🪶", desc: "Elders sharing sacred storytelling inside our decorated tents.", bgColor: "bg-yellow-50 text-yellow-800 border-yellow-100" },
    { category: "learning", title: "Early Numeracy Grouping", emoji: "🧮", desc: "Preschooler room sorting sunflower seeds by sets of thousands.", bgColor: "bg-sky-50 text-sky-800 border-sky-100" },
    { category: "outdoor", title: "Snow Fort Winter Sandbox", emoji: "⛄", desc: "Cooperative team sports during crisp winter garden sessions.", bgColor: "bg-emerald-50 text-emerald-800 border-emerald-100" },
    { category: "arts", title: "Tactile Leaf Collages", emoji: "🍁", desc: "Gathering fallen regional maple leaves and assembling collages.", bgColor: "bg-rose-50 text-rose-805 border-rose-100" },
    { category: "stem", title: "Sink-or-Float Columns", emoji: "💧", desc: "Testing weight, density, and floating speeds of materials.", bgColor: "bg-amber-50 text-amber-808 border-amber-100" }
  ];

  const filteredItems = activeFilter === "all" 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 pb-16">
      
      {/* 1. INTRO */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-extrabold text-[#59C7F5] tracking-widest bg-sky-50 px-3 py-1 rounded-full">Explore Classroom life</span>
        <h1 className="text-3xl font-extrabold text-gray-900">Peekaboo Life Gallery</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-xs leading-relaxed">
          Take a sensory tour through our daily schedules. Filter by study units or play classes.
        </p>
      </div>

      {/* 2. VIRTUAL TOUR SIMULATOR UNIT */}
      <div className="bg-gradient-to-r from-[#59C7F5]/10 via-[#FFFBF5] to-[#FF724E]/10 rounded-3xl p-6.5 md:p-8 border border-orange-100 shadow-xs max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-150 text-[#FF724E] border border-orange-150 rounded-full text-[10px] font-extrabold uppercase">
              <Video className="w-3.5 h-3.5" /> Virtual Classroom Tour
            </span>
            <h3 className="text-xl font-bold text-gray-800">Peek Inside Peekaboo Corner Center</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Don't wait for your scheduled physical visit! Watch our interactive 3-minute video showing classrooms, healthy dining spaces, our licensed preschool sandbox, and custom safety checkpoints.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => alert("Launching 3-Minute Virtual Walkthrough Video Showcase!")}
                className="bg-[#FF724E] hover:bg-[#e65e3a] active:scale-98 text-white px-5 py-3 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                🎥 Start Daycare Walkthrough
              </button>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 flex justify-center">
            {/* Visual simulation of interactive Video player */}
            <div className="relative w-full max-w-sm h-48 rounded-2xl bg-gray-950 flex items-center justify-center overflow-hidden border-2 border-orange-100/45 shadow-lg group select-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF724E]/30 to-[#59C7F5]/20 z-0"></div>
              <div className="z-10 text-center text-white p-4 space-y-2">
                <span className="text-4xl filter drop-shadow hover:scale-110 active:scale-95 cursor-pointer transition-transform block">▶️</span>
                <p className="text-[11px] font-bold uppercase tracking-wider text-sky-100">Play Virtual tour video</p>
                <p className="text-[9px] text-gray-300">Length: 3m 12s &bull; High resolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. IMAGES CATEGORIES FILTER */}
      <div className="space-y-6">
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: "all", label: "✨ All Photos" },
            { id: "learning", label: "📚 Classroom Study" },
            { id: "outdoor", label: "🌻 Prairie Yards" },
            { id: "arts", label: "🎨 Studio Craft" },
            { id: "stem", label: "🔬 STEM Lab" },
            { id: "celebrations", label: "🪶 Traditions" }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeFilter === btn.id
                  ? "bg-[#59C7F5] text-white border-[#59C7F5] shadow-xs"
                  : "bg-white text-gray-500 border-gray-100 hover:text-gray-900"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Dynamic Image Grid simulation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              className={`border rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-300 ${item.bgColor}`}
            >
              <div className="space-y-3">
                <span className="text-4xl filter drop-shadow block">{item.emoji}</span>
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-650 leading-relaxed font-normal">{item.desc}</p>
              </div>
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                ● Registered Category: {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
