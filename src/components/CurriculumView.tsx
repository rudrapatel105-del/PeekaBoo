import React from "react";
import { BookOpen, HelpCircle, Palette, Sparkles, Lightbulb, Music, Globe, Anchor } from "lucide-react";

export default function CurriculumView() {
  const categories = [
    {
      title: "Phonetic Literacy",
      desc: "Based on Montessori sandpaper letters and modern synthetic phonics. We encourage syllable clapping, structural shape tracing, and reading confidence early.",
      emoji: "📚",
      color: "from-sky-50 to-sky-100/30 text-sky-800"
    },
    {
      title: "Sensory Numeracy",
      desc: "Math isn't abstract equations—it’s physical! Count wooden beads, arrange seeds in row arrays, and discover volume through sand and water pours.",
      emoji: "🧮",
      color: "from-orange-50 to-orange-100/30 text-orange-800"
    },
    {
      title: "Active STEM Lab",
      desc: "Encouraging young Regina researchers to hypothesize. Simple experiments (sink-or-float containers, ramp physics, weather charts, and color mixing).",
      emoji: "🔬",
      color: "from-amber-50 to-amber-100/30 text-amber-800"
    },
    {
      title: "Creative Studio Arts",
      desc: "Reggio Emilia inspires: clay molding, organic leaf collage craft, charcoal tracing, and watercolors. Craft is self-led, not cookie-cutter imitation.",
      emoji: "🎨",
      color: "from-rose-50 to-rose-100/30 text-rose-800"
    },
    {
      title: "Treaty 4 Indigenous Learning",
      desc: "Introducing respectful land relations: Cree seasonal markers, bison narratives, animal elder storytelling, and introductory words (e.g. Tansi = Hello).",
      emoji: "🪶",
      color: "from-yellow-50 to-yellow-101/30 text-yellow-800"
    },
    {
      title: "Music & Rythmic Expression",
      desc: "Daily singing circles, traditional percussion play, toddler lullabies, and active rhythmic dancing which stimulates neurological growth.",
      emoji: "🎵",
      color: "from-emerald-50 to-emerald-100/30 text-emerald-800"
    },
    {
      title: "Social Emotional Regulation",
      desc: "Providing healthy vocabulary for complex feelings ('breathe like a tree'). Children discover respectful sharing, boundaries, and group consensus.",
      emoji: "🌱",
      color: "from-purple-50 to-purple-100/30 text-purple-800"
    },
    {
      title: "Life Skills & Independence",
      desc: "Montessori framework focus: buttoning winter coats, sweeping up sandbox spills, setting classroom tables, and practicing natural garden planting.",
      emoji: "🏡",
      color: "from-blue-50 to-blue-100/30 text-blue-800"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 pb-16">
      {/* 1. CURRICULUM INTRO */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase font-extrabold text-[#FF724E] tracking-widest bg-orange-50 px-3 py-1 rounded-full">
          The Play-Based Inquiry Model
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Our Framework for Lifelong Growth
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
          At Peekaboo Corner, our pedagogy honors the child’s native interests. Our teachers act as co-designers, tailoring learning pathways that nurture academic stability and creative freedom.
        </p>
      </div>

      {/* 2. PERSPECTIVE STATEMENT */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        <div className="md:col-span-8 space-y-3">
          <h3 className="text-lg font-bold text-gray-800">
            Reggio Emilia & Montessori Harmony
          </h3>
          <p className="text-xs text-gray-550 leading-relaxed">
            We do not believe in rigid, silent classrooms or screen-based entertainment. The infant and preschool brain learns natively by grasping, smelling, weighing, and discussing. By combining Maria Montessori’s practical life guidelines with Reggio Emilia’s environmental discovery methods, our Regina spaces are filled with natural woods, open light, and organic textures that ignite continuous childhood interest.
          </p>
        </div>
        <div className="md:col-span-4 bg-orange-50 rounded-2xl p-5 text-center space-y-2 border border-orange-100/40">
          <span className="text-4xl block">🍃</span>
          <p className="text-xs font-bold text-[#FF724E] uppercase tracking-wider">Natural Toys Only</p>
          <p className="text-[10px] text-gray-500 leading-normal">
            No plastic electronic noise generators. We prioritize timber blocks, natural canvas, sand bays, and seeds.
          </p>
        </div>
      </div>

      {/* 3. BENTO GRID OF CORE TOPICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className={`bg-gradient-to-br ${cat.color} rounded-x2 p-6 border border-gray-100/50 shadow-sm rounded-3xl flex flex-col justify-between space-y-4 hover:scale-[1.01] hover:shadow-md transition-all duration-300`}
          >
            <div className="space-y-2">
              <span className="text-3xl filter drop-shadow block mb-2">{cat.emoji}</span>
              <h3 className="font-extrabold text-base text-gray-900">{cat.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{cat.desc}</p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>● Montessori-Approved</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. SEED EXPERIENCE COMMITMENT */}
      <div className="bg-[#EFF8EF]/60 rounded-3xl p-6.5 md:p-8 border border-emerald-100 space-y-4 max-w-4xl mx-auto text-center">
        <span className="text-2xl">🌱</span>
        <h4 className="font-extrabold text-gray-800 text-sm">Empagogy & Regina Nature Exploration</h4>
        <p className="text-xs text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Every spring and summer, children participate in growing our custom garden beds. They plant prairie tomatoes, carrots, sunflower stalks, and sage, monitoring watering logs and celebrating raw harvests. This early exposure reduces vegetable hesitation and develops fine physical skills and deep ecological thankfulness.
        </p>
      </div>
    </div>
  );
}
