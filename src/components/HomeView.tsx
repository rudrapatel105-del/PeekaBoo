import React from "react";
import { CheckCircle, ShieldCheck, Heart, Sparkles, Star, Calendar, ArrowRight, MapPin, Coffee, HelpCircle } from "lucide-react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../data";
import { LogoFull } from "./Logo";

interface HomeViewProps {
  lang: LanguageCode;
  onNavigate: (view: string) => void;
  onOpenQuickTour: () => void;
}

export default function HomeView({ lang, onNavigate, onOpenQuickTour }: HomeViewProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. PREMIUM HERO SECTION WITH SUNLIGHT & FLOATING CLOUDS */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 md:px-8 border-b border-orange-50/50 rounded-b-[40px] bg-gradient-to-b from-[#E6F7FF] via-[#FFFBF5] to-[#FFEFEB]">
        {/* Decorative Floating Elements simulating Childhood Wonder */}
        <div className="absolute top-10 left-[8%] w-16 h-10 bg-white/70 rounded-full blur-[1px] animate-float-slow hidden sm:block pointer-events-none"></div>
        <div className="absolute top-24 right-[12%] w-24 h-12 bg-white/60 rounded-full blur-[1px] animate-float-medium hidden md:block pointer-events-none"></div>
        <div className="absolute bottom-16 left-[5%] w-20 h-10 bg-white/70 rounded-full blur-[1px] animate-float-fast hidden lg:block pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100/90 text-sky-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Licensed Facility
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/90 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                🍁 Fee Grant Eligible
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              {t.tagline}
            </h1>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              {t.subTagline}
            </p>

            {/* Saskatchewan Parent Grant Box */}
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-2xl p-4.5 shadow-sm max-w-xl">
              <div className="flex gap-3">
                <div className="text-2xl mt-0.5">💰</div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Canada-Saskatchewan Parent Fee Grant</h4>
                  <p className="text-xs text-gray-700 mt-1 leading-relaxed">{t.subsidyHighlight}</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenQuickTour}
                className="bg-[#FF724E] hover:bg-[#e15f3b] text-white text-sm font-semibold tracking-wide py-4 px-8 rounded-full shadow-lg hover:shadow-orange-400/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> {t.bookTour}
              </button>
              
              <button
                onClick={() => onNavigate("enrollment")}
                className="bg-white hover:bg-orange-50/30 text-gray-800 border-2 border-orange-100 text-sm font-semibold tracking-wide py-3.5 px-8 rounded-full transition-all flex items-center justify-center gap-2"
              >
                {t.joinWaitlist} <ArrowRight className="w-4 h-4 text-[#FF724E]" />
              </button>

              <button
                onClick={() => onNavigate("parent-resources")}
                className="text-gray-500 hover:text-gray-800 text-xs font-semibold px-2 text-center underline underline-offset-4"
              >
                Download Handbook
              </button>
            </div>

            {/* Feature Row checks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <CheckCircle className="w-4 h-4 text-[#59C7F5]" /> Saskatchewan Licensed
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <CheckCircle className="w-4 h-4 text-[#59C7F5]" /> CPR & First Aid Certified
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <CheckCircle className="w-4 h-4 text-[#FF724E]" /> Healthy Veg Meals
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <CheckCircle className="w-4 h-4 text-[#FF724E]" /> Play-Based Curriculum
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-500" /> Safe Indoors & Outdoors
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-500" /> Inclusive & Multicultural
              </div>
            </div>
          </div>

          {/* Graphic / Branding Side */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Beautiful authentic branded logo sticker */}
            <div className="bg-white/85 backdrop-blur-md p-6 sm:p-10 rounded-[40px] border border-orange-100 shadow-xl shadow-orange-100/30 flex items-center justify-center max-w-sm sm:max-w-md w-full transition-transform hover:scale-[1.02] duration-300">
              <LogoFull className="w-full" />
            </div>
            
            {/* Absolute positioning overlay badges */}
            <div className="absolute top-6 left-6 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-amber-100">
              <span className="text-2xl">🧸</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Montessori</p>
                <p className="font-semibold text-xs text-gray-800">Learn & Grow</p>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-sky-100">
              <span className="text-2xl text-[#59C7F5]">🌈</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-sky-400 tracking-widest">Licensed Program</p>
                <p className="font-semibold text-xs text-gray-800">0 to 7 Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION & KEY PERFORMANCE STATS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-orange-50/50">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase font-extrabold text-[#FF724E] tracking-widest">Regina's Top Childcare Provider</span>
            <h2 className="text-3xl font-bold text-gray-900">Excellence Families Can Rely Upon</h2>
            <p className="text-gray-500 text-sm">
              We maintain high Saskatchewan standards, verified licenses, and certified loving educators.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-2 border-r last:border-0 border-gray-100">
              <div className="text-3xl md:text-4xl font-extrabold text-[#FF724E]">12+</div>
              <div className="text-sm font-semibold text-gray-700">Combined Experience</div>
              <div className="text-xs text-gray-400">Years of Quality Operation</div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2 md:border-r border-gray-100">
              <div className="text-3xl md:text-4xl font-extrabold text-[#59C7F5]">350+</div>
              <div className="text-sm font-semibold text-gray-700">Regina Children</div>
              <div className="text-xs text-gray-400">Nurtured & Guided</div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2 border-r last:border-0 border-gray-100">
              <div className="text-3xl md:text-4xl font-extrabold text-amber-500">100%</div>
              <div className="text-sm font-semibold text-gray-700">Licensed Centers</div>
              <div className="text-xs text-gray-400">Saskatchewan Compliant</div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-500">4.9 ★</div>
              <div className="text-sm font-semibold text-gray-700">Parent Rating</div>
              <div className="text-xs text-gray-400">Google Verified Reviews</div>
            </div>
          </div>

          {/* Local Security Badges Grid */}
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#FFFBF5] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Saskatchewan Licensed</h4>
                <p className="text-xs text-gray-500 mt-1">Subject to regular unannounced health, fire, & childcare safety inspections.</p>
              </div>
            </div>

            <div className="bg-[#EBF7FD] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">CPR & First Aid Elite</h4>
                <p className="text-xs text-gray-500 mt-1">Every educator undergoes emergency paediatric first aid & CPR annually.</p>
              </div>
            </div>

            <div className="bg-[#EFF8EF] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Clean Space Guarantee</h4>
                <p className="text-xs text-gray-500 mt-1">Medical-grade HEPA filters and thorough chemical-free daily sanitation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ADMISSIONS QUICKLINK PATHS */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Explore Our Early Learning Tracks</h2>
          <p className="text-gray-500 text-sm">Curated specifications designed to meet key developmental pathways.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { tag: "Infant Care", ages: "0 – 18 mos", emoji: "🍼", title: "Infant Track", desc: "Sensory, safe crawling, secure bonds", color: "border-sky-100 text-sky-600 bg-sky-50/20" },
            { tag: "Toddler", ages: "18 – 36 mos", emoji: "🎨", title: "Toddler Track", desc: "Cooperative game-playing, vocabulary growth", color: "border-orange-100 text-orange-600 bg-orange-50/20" },
            { tag: "Preschool", ages: "3 – 5 yrs", emoji: "🧩", title: "Preschooler", desc: "Phonics, early science, nature school", color: "border-amber-120 text-amber-600 bg-amber-50/20" },
            { tag: "Kindergarten", ages: "4 – 5 yrs", emoji: "✏️", title: "Kindergarten", desc: "School success, math, self-regulation", color: "border-emerald-100 text-emerald-600 bg-emerald-50/20" },
            { tag: "School Age", ages: "5 – 7 yrs", emoji: "🚴", title: "School Age", desc: "Homework aids, team sports, leadership", color: "border-purple-100 text-purple-600 bg-purple-50/20" },
          ].map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onNavigate("programs")}
              className={`border-2 rounded-2xl p-5 hover:scale-102 hover:shadow-md cursor-pointer transition-all ${item.color} flex flex-col justify-between`}
            >
              <div>
                <span className="text-3xl mb-3 block">{item.emoji}</span>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">{item.ages}</p>
                <h4 className="font-bold text-gray-800 text-sm mt-1">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-xs font-semibold underline block mt-4 text-gray-800 hover:text-[#FF724E]">
                See routine &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GOOGLE REVIEWS SHOWCASE INTEGRATION */}
      <section className="max-w-6xl mx-auto px-4 bg-[#FFFBF5]">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Loving Words From Regina Parents</h3>
              <p className="text-xs text-gray-500 mt-1">Real reviews pulled from our Regina Google Business profile.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="font-bold text-gray-800 text-sm">4.9 Out of 5.0 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                author: "Michelle Vance",
                rating: 5,
                text: "Peekaboo Corner Regina is truly a home away from home. Being licensed and grant eligible made it extremely affordable! The staff are amazingly loving, the vegetarian food is highly nutritious, and the outdoor focus is so refreshing.",
                relativeTime: "2 weeks ago"
              },
              {
                author: "Harpreet Dhillon",
                rating: 5,
                text: "The combination of Montessori methods and Reggio Emilia's play philosophy is flawless. My toddler learns so many life skills. Also, the Indigenous and Treaty 4 educational storytelling is integrated with such respect.",
                relativeTime: "1 month ago"
              },
              {
                author: "Chantal Levesque",
                rating: 5,
                text: "Such a clean, warm, and highly professional daycare! The parent portal daily updates, reports, and milestone summaries give me perfect peace of mind throughout the work day. Highly recommend Peekaboo!",
                relativeTime: "3 months ago"
              }
            ].map((rev, idx) => (
              <div key={idx} className="bg-[#FFFBF5]/60 border border-amber-50 rounded-2xl p-5 space-y-3 relative">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FF724E]/10 text-[#FF724E] flex items-center justify-center font-bold text-xs uppercase">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-800">{rev.author}</h5>
                    <p className="text-[10px] text-gray-400">{rev.relativeTime}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Review prompt collector */}
          <div className="mt-8 p-4 bg-sky-50/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-100/50 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold text-[#59C7F5] uppercase tracking-wider mb-0.5">Are you a registered Peekaboo Corner family?</p>
              <p className="text-xs text-gray-600">Help other local families search by reviewing your custom experiences!</p>
            </div>
            <button 
              onClick={() => alert("Thank you! Review links are emailed automatically upon quarterly parent portal checks.")}
              className="px-4 py-2 bg-[#59C7F5] hover:bg-[#43b6e8] text-white font-semibold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Write Review
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQs ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Admissions Questions</h2>
          <p className="text-gray-500 text-xs">Easy answers for Regina parents making the transition.</p>
        </div>

        <div className="space-y-3 bg-white rounded-2xl p-6 border border-orange-50/30">
          {[
            {
              q: "How does the parent fee grant program function?",
              a: "Because we are fully licensed in Regina by the Saskatchewan Ministry of Education, parent fees are subsidized through the federal-provincial partnership agreement. Grant offsets are applied directly to invoices, lowering parent fees for eligible children in regular attendance to around $217.50 a month without requiring paperwork on your end."
            },
            {
              q: "Can you accommodate toddlers with severe food allergies?",
              a: "Yes, completely! While our menu is 100% vegetarian, we are rigidly nut-free and maintain deep protocols for other severe intolerances. Dedicated allergen plates are marked and prepared separately by certified staff. We also coordinate with parents to store essential medical supplies such as EpiPens in marked cabinets."
            },
            {
              q: "What are your drop-off and pickup window limits?",
              a: "Operating hours are 7:30 AM to 5:30 PM, Monday through Friday. Families can drop off anytime up to morning circle (typically 9:00 AM) to maintain curriculum consistency, and pick up similarly before our 5:30 PM closing window."
            },
            {
              q: "How does waitlist priority rank calculate?",
              a: "Our advanced algorithm determines priority rank based on: date of waitlist registration, preferred starting window, age match of open space, and priority siblings. You can inspect live progress numbers directly on the waitlist tracker inside the parents tab!"
            }
          ].map((faq, idx) => (
            <details key={idx} className="group border-b border-gray-100 last:border-0 pb-3 last:pb-0 pt-3 first:pt-0 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-gray-800 text-sm list-none select-none">
                <span>{faq.q}</span>
                <span className="text-[#FF724E] group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed whitespace-pre-line pl-1 border-l-2 border-orange-100">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION EXIT SECTION */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#59C7F5] via-[#FFD54F]/80 to-[#FF724E] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl text-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-grid-white pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="uppercase text-[11px] font-extrabold tracking-widest text-[#FFF9F0] bg-white/20 px-3 py-1 rounded-full">
              Autumn & Winter Waitlists Open
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Give Your Child the Best Start in Regina?</h2>
            <p className="text-sm text-sky-50 leading-relaxed md:px-8">
              Book a safe personal tour across our classrooms, inspect our vegetarian prairie menu, meet licensed experts, and join the Waitlist today. Let’s partner in growth!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <button
                onClick={onOpenQuickTour}
                className="w-full sm:w-auto bg-white text-gray-900 border border-transparent font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-white/20 hover:scale-103 transition-all"
              >
                Schedule Tour Now
              </button>
              <button
                onClick={() => onNavigate("enrollment")}
                className="w-full sm:w-auto bg-transparent border-2 border-white/80 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
