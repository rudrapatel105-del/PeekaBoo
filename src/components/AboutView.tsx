import React from "react";
import { Quote, Heart, Star, Sparkles, BookOpen, Compass, Users } from "lucide-react";

export default function AboutView() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16 pb-16">
      {/* 1. HERO HEADER */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-extrabold text-[#FF724E] tracking-widest bg-orange-50 px-3 py-1 rounded-full">
          Est. 2014 &bull; Licensed Regina Childcare
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          Nurturing Regina's Wonder-Filled Learner Generation
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          We combine the Reggio Emilia focus on environmental inquiry with Montessori’s devotion to life skills, inside a warm, family-centered space.
        </p>
      </div>

      {/* 2. REGINA TREATY 4 LAND ACKNOWLEDGEMENT & INDIGENOUS COMMITMENT */}
      <div className="bg-amber-50/60 rounded-3xl p-6 md:p-8 border border-amber-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-7xl opacity-5 select-none font-extrabold text-[#FF724E]">TREATY 4</div>
        <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-3xl shrink-0">
            🪶
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800">Treaty 4 Territory & Indigenous Learning Commitment</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Peekaboo Corner Regina Childcare Inc. is honored to rest, learn, play, and grow on **Treaty 4 Territory**—the traditional lands of the Cree, Saulteaux, Dakota, Lakota, and Nakoda, and the beautiful homeland of the Métis Nation. 
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              We pledge to plant seeds of respect and integration early. In alignment with our curriculum, children hear traditional stories, sing songs honoring prairie streams and bison, and learn essential seasonal outdoor lessons, building cooperative respect for the beautiful Saskatchewan land and its diverse caregivers.
            </p>
          </div>
        </div>
      </div>

      {/* 3. MISSION, VISION & PHILOSOPHY GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 outline-dashed outline-1 outline-orange-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF724E] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Our Mission</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            To provide a safe, licensed, and highly nurturing Regina childcare environment where young children lead custom discoveries, develop lifelong social-emotional stability, eat healthy plant-based vegetarian meals, and embark confidently on academic journeys.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 outline-dashed outline-1 outline-sky-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#59C7F5] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Our Vision</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            To remain the highest trusted early learning institution in southern Saskatchewan, setting premium benchmarks for play-based hybrid models, inclusive diverse pedagogy, parent integrations, and eco-friendly early childhood infrastructure.
          </p>
        </div>
      </div>

      {/* 4. STORY CORNER */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-orange-50/30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
          <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">A Prairie Dream Realized</p>
          <div className="w-16 h-1 bg-[#FF724E] rounded-full"></div>
        </div>
        
        <div className="md:col-span-8 text-xs text-gray-600 space-y-4 leading-relaxed">
          <p>
            Peekaboo Corner began as a passionate, licensed home daycare initiative in Regina in 2014. Founded by childcare specialists and Saskatchewan certified kindergarten consultants, our spaces aimed to solve a local dilemma: standard commercial environments looked sterile, while typical home cares lacked academic and regulatory stability.
          </p>
          <p>
            We realized that preschool children thrive best inside a cozy, home-like "corner" structured around high-integrity early childhood philosophies. By integrating standard licensed protocols, a certified nutrient-rich vegetarian menu, and introducing local Treaty 4 stories, we scaled into Regina's most requested center.
          </p>
          <p className="font-semibold text-gray-800">
            "We believe that when children are respected as capable, natural researchers of their environment, magic happens." – The Peekaboo Directors
          </p>
        </div>
      </div>

      {/* 5. BRAND VALUES (Bento Cards) */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900">Our Pillars of Excellence</h3>
          <p className="text-gray-400 text-xs mt-1">Five founding guidelines that direct our day-to-day choices.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Individualized Love", desc: "No child fits a single box. We map curriculum speeds and routines based on your infant or preschooler's native temperament.", emoji: "💖", color: "bg-orange-50/40" },
            { title: "Empathetic Play", desc: "Toys are open-ended (wooden units, sand bins, water boards). Play develops strong engineering brains.", emoji: "🧩", color: "bg-sky-50/40" },
            { title: "Vibrant Diversity", desc: "Our families speak many languages. We actively support English, French, Hindi, and Gujarati integrations natively.", emoji: "🌏", color: "bg-emerald-50/40" },
            { title: "Dietary Nurturing", desc: "We support physical growth through plant-based vegetarian diets packed with protein, fresh local fibers, and allergen safety.", emoji: "🍎", color: "bg-red-50/40" },
            { title: "Nature Stewardship", desc: "Regina Prairie winters might be harsh, but our outdoor and sensory-led indoor play yard guarantees constant active wellness.", emoji: "🌱", color: "bg-amber-50/40" },
            { title: "Parent Transparency", desc: "Through real-time milestone trackers and portal summaries, we build a supportive bridge directly to your family desk.", emoji: "🤝", color: "bg-purple-50/40" },
          ].map((item, idx) => (
            <div key={idx} className={`${item.color} rounded-2xl p-6 border border-gray-100/30 shadow-sm space-y-2`}>
              <span className="text-3xl block filter drop-shadow">{item.emoji}</span>
              <h4 className="font-extrabold text-sm text-gray-800">{item.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
