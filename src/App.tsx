import React, { useState, useEffect } from "react";
import { TRANSLATIONS, INITIAL_SUBMISSIONS, INITIAL_TOURS } from "./data";
import { LanguageCode, EnrollmentSubmission, TourBooking } from "./types";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProgramsView from "./components/ProgramsView";
import CurriculumView from "./components/CurriculumView";
import DailyLifeView from "./components/DailyLifeView";
import ParentResourcesView from "./components/ParentResourcesView";
import EnrollmentView from "./components/EnrollmentView";
import GalleryView from "./components/GalleryView";
import BlogView from "./components/BlogView";
import ContactView from "./components/ContactView";
import ParentPortalView from "./components/ParentPortalView";
import AdminDashboard from "./components/AdminDashboard";
import FloatingChat from "./components/FloatingChat";
import { LogoIcon } from "./components/Logo";
import { 
  ShieldCheck, CalendarCheck, Phone, Mail, Award, Globe, Heart, Menu, X, ArrowUpRight,
  Home, Users, GraduationCap, BookOpen, Calendar, ClipboardList, FileText, Image, Newspaper, Lock, Settings
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Unified global memory database to sync states between child components
  const [submissionsList, setSubmissionsList] = useState<EnrollmentSubmission[]>(INITIAL_SUBMISSIONS);
  const [toursList, setToursList] = useState<TourBooking[]>(INITIAL_TOURS);

  // Quick book tour trigger from home
  const [quickBookTour, setQuickBookTour] = useState(false);

  const t = TRANSLATIONS[lang];

  // Callback to insert new enrollment registration
  const handleAddEnrollment = (newSub: EnrollmentSubmission) => {
    setSubmissionsList([newSub, ...submissionsList]);
  };

  // Callback to insert new tour booking
  const handleAddTour = (newTour: TourBooking) => {
    setToursList([newTour, ...toursList]);
  };

  // Administrative callback to approve admissions
  const handleApproveEnrollment = (id: string, newStatus: any) => {
    setSubmissionsList(prev => prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
  };

  // Administrative callback to change rank priority numbers
  const handleModifyPriority = (id: string, delta: number) => {
    setSubmissionsList(prev => {
      const idx = prev.findIndex(item => item.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      const target = updated[idx];
      const nextRank = Math.max(1, target.waitlistRank + delta);
      updated[idx] = { ...target, waitlistRank: nextRank };
      return updated;
    });
  };

  // Floating CTA triggers
  const triggerQuickTour = () => {
    setQuickBookTour(true);
    setActiveTab("contact");
  };

  const navItems = [
    { 
      id: "home", 
      labelKey: "navHome", 
      icon: Home, 
      activeClass: "bg-rose-50/80 text-rose-600 border-rose-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-rose-600 hover:-translate-y-[1px] hover:bg-rose-50/30", 
      iconActiveColor: "text-rose-500", 
      iconHoverColor: "text-slate-400 group-hover:text-rose-500",
      underlineColor: "bg-rose-500"
    },
    { 
      id: "about", 
      labelKey: "navAbout", 
      icon: Users, 
      activeClass: "bg-sky-50/80 text-sky-600 border-sky-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-sky-600 hover:-translate-y-[1px] hover:bg-sky-50/30", 
      iconActiveColor: "text-sky-500", 
      iconHoverColor: "text-slate-400 group-hover:text-sky-500",
      underlineColor: "bg-sky-500"
    },
    { 
      id: "programs", 
      labelKey: "navPrograms", 
      icon: GraduationCap, 
      activeClass: "bg-emerald-50/80 text-emerald-600 border-emerald-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-emerald-600 hover:-translate-y-[1px] hover:bg-emerald-50/30", 
      iconActiveColor: "text-emerald-500", 
      iconHoverColor: "text-slate-400 group-hover:text-emerald-500",
      underlineColor: "bg-emerald-500"
    },
    { 
      id: "curriculum", 
      labelKey: "navCurriculum", 
      icon: BookOpen, 
      activeClass: "bg-indigo-50/80 text-indigo-600 border-indigo-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-indigo-600 hover:-translate-y-[1px] hover:bg-indigo-50/30", 
      iconActiveColor: "text-indigo-500", 
      iconHoverColor: "text-slate-400 group-hover:text-indigo-500",
      underlineColor: "bg-indigo-500"
    },
    { 
      id: "daily", 
      labelKey: "navDailyLife", 
      icon: Calendar, 
      activeClass: "bg-amber-50/80 text-amber-700 border-amber-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-amber-600 hover:-translate-y-[1px] hover:bg-amber-50/30", 
      iconActiveColor: "text-amber-600", 
      iconHoverColor: "text-slate-400 group-hover:text-amber-500",
      underlineColor: "bg-amber-500"
    },
    { 
      id: "resources", 
      labelKey: "navParentResources", 
      icon: ClipboardList, 
      activeClass: "bg-fuchsia-50/80 text-fuchsia-600 border-fuchsia-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-fuchsia-600 hover:-translate-y-[1px] hover:bg-fuchsia-50/30", 
      iconActiveColor: "text-fuchsia-500", 
      iconHoverColor: "text-slate-400 group-hover:text-fuchsia-500",
      underlineColor: "bg-fuchsia-500"
    },
    { 
      id: "enrollment", 
      labelKey: "navEnrollment", 
      icon: FileText, 
      activeClass: "bg-teal-50/80 text-teal-600 border-teal-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-teal-600 hover:-translate-y-[1px] hover:bg-teal-50/30", 
      iconActiveColor: "text-teal-500", 
      iconHoverColor: "text-slate-400 group-hover:text-teal-500",
      underlineColor: "bg-teal-500"
    },
    { 
      id: "gallery", 
      labelKey: "navGallery", 
      icon: Image, 
      activeClass: "bg-orange-50/80 text-orange-600 border-orange-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-orange-600 hover:-translate-y-[1px] hover:bg-orange-50/30", 
      iconActiveColor: "text-orange-500", 
      iconHoverColor: "text-slate-400 group-hover:text-orange-500",
      underlineColor: "bg-orange-500"
    },
    { 
      id: "blog", 
      labelKey: "navBlog", 
      icon: Newspaper, 
      activeClass: "bg-pink-50/80 text-pink-600 border-pink-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-pink-600 hover:-translate-y-[1px] hover:bg-pink-50/30", 
      iconActiveColor: "text-pink-500", 
      iconHoverColor: "text-slate-400 group-hover:text-pink-500",
      underlineColor: "bg-pink-500"
    },
    { 
      id: "contact", 
      labelKey: "navContact", 
      icon: Phone, 
      activeClass: "bg-violet-50/80 text-violet-600 border-violet-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-violet-600 hover:-translate-y-[1px] hover:bg-violet-50/30", 
      iconActiveColor: "text-violet-500", 
      iconHoverColor: "text-slate-400 group-hover:text-violet-500",
      underlineColor: "bg-violet-500"
    },
    { 
      id: "portal", 
      labelKey: "navPortal", 
      icon: Lock, 
      activeClass: "bg-purple-50/80 text-purple-600 border-purple-100 shadow-xs scale-102", 
      hoverClass: "text-slate-600 hover:text-purple-600 hover:-translate-y-[1px] hover:bg-purple-50/30", 
      iconActiveColor: "text-purple-500", 
      iconHoverColor: "text-slate-400 group-hover:text-purple-500",
      underlineColor: "bg-purple-500"
    },
    { 
      id: "admin", 
      labelKey: "navAdmin", 
      icon: Settings, 
      activeClass: "bg-slate-100 text-slate-705 border-slate-200 shadow-xs scale-102", 
      hoverClass: "text-slate-650 hover:text-slate-800 hover:-translate-y-[1px] hover:bg-slate-50/30", 
      iconActiveColor: "text-slate-600", 
      iconHoverColor: "text-slate-400 group-hover:text-slate-600",
      underlineColor: "bg-slate-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-gray-800 flex flex-col justify-between font-sans selection:bg-[#F66B54]/20 text-xs selection:text-orange-950">
      
      {/* 1. TOP ACCESS RULES BANNER & LANGUAGE SWITCHER */}
      <div className="bg-gradient-to-r from-[#49BCE6] to-[#F66B54] text-white py-1.5 px-4 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-wider uppercase gap-2">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="flex items-center gap-1">🇨🇦 Regina Saskatchewan Early Learning Licensed Space</span>
            <span className="hidden md:inline">●</span>
            <span>{t.schoolHours}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0 text-white" />
            <div className="flex gap-1.5">
              {[
                { code: "en", name: "EN" },
                { code: "fr", name: "FR" },
                { code: "hi", name: "HI" },
                { code: "gu", name: "GU" }
              ].map((lItem) => (
                <button
                  key={lItem.code}
                  onClick={() => setLang(lItem.code as any)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest cursor-pointer hover:bg-white/20 transition-all ${
                    lang === lItem.code ? "bg-white text-[#F66B54] shadow-sm scale-105" : "text-white"
                  }`}
                >
                  {lItem.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. STICKY GLASSMORPHIC PROFESSIONAL HEADER */}
      <header className={`sticky top-0 z-[100] transition-all duration-300 ease-in-out select-none ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-orange-100/50" 
          : "bg-white/95 backdrop-blur-sm border-b border-orange-100/20"
      }`}>
        <div className={`max-w-[1440px] mx-auto px-4 lg:px-8 flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled 
            ? "h-[70px] lg:h-[75px]" 
            : "h-[90px] lg:h-[98px]"
        } h-[70px]`}>
          
          {/* BRAND AREA (LEFT) - Locked minimum dimensions to guarantee zero compression or overlap */}
          <div className="flex items-center gap-3 shrink-0 min-w-[270px] xs:min-w-[290px] sm:min-w-[320px] max-w-[360px]">
            <div 
              onClick={() => { setActiveTab("home"); setQuickBookTour(false); }}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <LogoIcon className={`${
                isScrolled ? "w-[76px] h-[40px]" : "w-[96px] h-[50px] lg:w-[108px] lg:h-[56px]"
              } shrink-0 filter drop-shadow-[0_4px_6px_rgba(246,107,84,0.12)] transition-all duration-300 group-hover:scale-105`} />
              <div className="flex flex-col justify-center">
                <h1 className={`tracking-wide leading-none transition-all duration-300 ${
                  isScrolled ? "text-sm sm:text-base lg:text-[18px]" : "text-base sm:text-lg lg:text-[22px] xl:text-[24px]"
                }`} style={{ fontFamily: "'Fredoka', sans-serif" }}>
                  <span className="text-[#EB5A3C] font-semibold">PeekaBoo</span>{" "}
                  <span className="text-[#1CA1BF] font-semibold">Corner</span>
                </h1>
                <span className={`text-[#EB5A3C] font-bold tracking-[0.14em] uppercase block mt-1.5 leading-none transition-all duration-300 ${
                  isScrolled ? "text-xs" : "text-sm"
                }`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Regina Childcare Inc.
                </span>
              </div>
            </div>
          </div>

          {/* NAVIGATION AREA (CENTER) - Squeezed center with dynamic flex wrapping & horizontal overflow fallback */}
          {/* We add 2 full lines of space (ml-[64px] lg:ml-[96px]) to ensure perfect separation between Logo and Navigation */}
          <nav className="hidden md:flex flex-1 min-w-0 ml-[64px] lg:ml-[96px] mr-4 lg:mr-8 items-center justify-center">
            <div className="flex items-center gap-1 xl:gap-2.5 overflow-x-auto scrollbar-none py-2 flex-nowrap w-full justify-center">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setQuickBookTour(false); }}
                    className={`group relative py-2 px-1.5 lg:px-2.5 rounded-full font-black uppercase tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1 shrink-0 ${
                      isActive
                        ? `${item.activeClass} border`
                        : `${item.hoverClass}`
                    } text-[8px] lg:text-[8.5px] xl:text-[9.5px]`}
                  >
                    <IconComp className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-115 ${
                      isActive ? item.iconActiveColor : item.iconHoverColor
                    }`} />
                    <span className="whitespace-nowrap">{t[item.labelKey]}</span>
                    
                    {/* Underline hover effect */}
                    {!isActive && (
                      <span className={`absolute -bottom-1 left-2 right-2 h-[2px] ${item.underlineColor} w-0 group-hover:w-[calc(100%-16px)] transition-all duration-300 rounded-full`}></span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* ACTION BUTTONS Area (RIGHT) - Neatly aligned CTA block */}
          <div className="flex items-center justify-end shrink-0 gap-3 md:min-w-[215px] lg:min-w-[245px]">
            {/* Desktop Action Buttons (Visible from tablet md up) */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={triggerQuickTour}
                className="h-10 px-4.5 bg-gradient-to-r from-[#F66B54] to-[#f4553b] text-white hover:shadow-md hover:brightness-105 active:scale-95 rounded-full font-black text-[9px] lg:text-[10px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center shrink-0 border border-orange-400/20"
              >
                Book a Tour
              </button>
              <button
                onClick={() => { setActiveTab("enrollment"); setQuickBookTour(false); }}
                className="h-10 px-4.5 bg-gradient-to-r from-[#49BCE6] to-[#2faad4] text-white hover:shadow-md hover:brightness-105 active:scale-95 rounded-full font-black text-[9px] lg:text-[10px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center shrink-0 border border-sky-400/20"
              >
                Join Waitlist
              </button>
            </div>

            {/* Mobile View Dynamic Tour Button & Hamburger Menu (Visible under tablet break md) */}
            <button
              onClick={triggerQuickTour}
              className="md:hidden h-9 px-3.5 bg-gradient-to-r from-[#F66B54] to-[#f4553b] text-white hover:shadow-md hover:brightness-105 active:scale-95 rounded-full font-black text-[8.5px] uppercase tracking-wider transition-all cursor-pointer inline-flex items-center justify-center shrink-0 border border-orange-400/20"
            >
              Book Tour
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-orange-50 rounded-xl cursor-pointer ml-1 shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5 text-gray-700" /> : <Menu className="w-5.5 h-5.5 text-gray-700" />}
            </button>
          </div>

        </div>

        {/* MOBILE NAVIGATION DRAWER OVERLAY */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 space-y-4 animate-fade-in select-none max-h-[80vh] overflow-y-auto">
            {/* Quick Action CTAs directly on mobile menu top */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-100">
              <button
                onClick={() => { triggerQuickTour(); setMobileMenuOpen(false); }}
                className="py-3 bg-gradient-to-r from-[#F66B54] to-[#f4553b] text-white font-extrabold rounded-xl text-center cursor-pointer text-[10px] uppercase tracking-wider shadow-sm"
              >
                🗓️ Book a Tour
              </button>
              <button
                onClick={() => { setActiveTab("enrollment"); setMobileMenuOpen(false); setQuickBookTour(false); }}
                className="py-3 bg-gradient-to-r from-[#49BCE6] to-[#2faad4] text-white font-extrabold rounded-xl text-center cursor-pointer text-[10px] uppercase tracking-wider shadow-sm"
              >
                📝 Join Waitlist
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {navItems.map((item) => {
                const IconComp = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                      setQuickBookTour(false);
                    }}
                    className={`p-3 rounded-2xl text-[11px] font-extrabold transition-all text-left flex items-center gap-3 border ${
                      isActive
                        ? `${item.activeClass}`
                        : `bg-slate-50/50 border-transparent ${item.hoverClass}`
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? item.iconActiveColor : 'text-slate-400'}`} />
                    <span>{t[item.labelKey]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* 2. MAIN ACTIVE VIEW CHANGER PORTAL CONTAINER */}
      <main className="flex-1">
        {activeTab === "home" && (
          <HomeView 
            lang={lang} 
            onNavigate={(page) => {
              setActiveTab(page);
              if (page === "contact") setQuickBookTour(true);
            }} 
            onOpenQuickTour={triggerQuickTour}
          />
        )}
        
        {activeTab === "about" && (
          <AboutView lang={lang} />
        )}
        
        {activeTab === "programs" && (
          <ProgramsView />
        )}
        
        {activeTab === "curriculum" && (
          <CurriculumView />
        )}

        {activeTab === "daily" && (
          <DailyLifeView />
        )}

        {activeTab === "resources" && (
          <ParentResourcesView />
        )}

        {activeTab === "enrollment" && (
          <EnrollmentView 
            lang={lang} 
            submissionsList={submissionsList} 
            onAddEnrollment={handleAddEnrollment} 
          />
        )}

        {activeTab === "gallery" && (
          <GalleryView />
        )}

        {activeTab === "blog" && (
          <BlogView />
        )}

        {activeTab === "contact" && (
          <ContactView 
            lang={lang} 
            onAddTour={handleAddTour} 
            quickBookTour={quickBookTour}
            onCloseQuickBookTour={() => setQuickBookTour(false)}
          />
        )}

        {activeTab === "portal" && (
          <ParentPortalView lang={lang} />
        )}

        {activeTab === "admin" && (
          <AdminDashboard 
            submissionsList={submissionsList} 
            toursList={toursList} 
            onApproveEnrollment={handleApproveEnrollment}
            onModifyPriority={handleModifyPriority}
          />
        )}
      </main>

      {/* 4. CHAT ASSISTANT & STICKY CTA RAIL */}
      <FloatingChat />

      <div className="fixed bottom-3 left-3 z-[45] flex flex-col gap-2 pointer-events-auto select-none">
        {activeTab !== "contact" && (
          <button 
            onClick={triggerQuickTour}
            className="flex items-center gap-1.5 bg-[#59C7F5] text-white px-4 py-2.5 rounded-full text-[10px] font-extrabold shadow-lg hover:opacity-95 cursor-pointer border border-sky-300"
          >
            <span>🗓️</span> Tour Daycare
          </button>
        )}
        {activeTab !== "enrollment" && (
          <button 
            onClick={() => setActiveTab("enrollment")}
            className="flex items-center gap-1.5 bg-[#FF724E] text-white px-4 py-2.5 rounded-full text-[10px] font-extrabold shadow-lg hover:opacity-95 cursor-pointer border border-orange-400"
          >
            <span>📝</span> Join Waitlist
          </button>
        )}
      </div>

      {/* 5. FOOTER FRAME */}
      <footer className="bg-white border-t border-orange-50 py-10 text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <LogoIcon className="w-18 h-10 shrink-0" />
              <p className="font-extrabold text-gray-900">
                <span className="text-[#EB5A3C]">PeekaBoo</span>{" "}
                <span className="text-[#1CA1BF]">Corner</span>
              </p>
            </div>
            
            <p className="text-[11px] text-gray-400 font-normal leading-relaxed">
              We reside on Treaty 4 Territory, the ancestral lands of the Cree, Saulteaux, Dakota, Lakota, Nakoda, and the homeland of the Métis Nation. By fostering early inclusion, ecological thankfulness, and respectful community care, we prepare children to walk gently on beautiful Saskatchewan soil.
            </p>
          </div>

          {/* Col 2: Info Contacts */}
          <div className="md:col-span-4 space-y-3.5 text-center md:text-left">
            <h5 className="font-bold text-gray-800 text-[10px] uppercase tracking-widest text-[#FF724E]">Direct Contacts</h5>
            <p className="text-[11px] font-normal leading-normal">{t.address}</p>
            <p className="text-[11px] font-normal leading-normal">{t.phone}</p>
            <p className="text-[11px] font-semibold text-[#59C7F5] leading-normal">{t.email}</p>
          </div>

          {/* Col 3: Safe certificates logos */}
          <div className="md:col-span-4 bg-orange-50/20 p-5 rounded-2xl border border-orange-100/40 text-center md:text-left space-y-2.5">
            <h5 className="font-extrabold text-gray-800 text-[10px] uppercase tracking-wider text-orange-900">Licensed Certifications</h5>
            <p className="text-[10px] text-gray-450 leading-relaxed font-normal">
              Licensed Early Childhood Educator team of Regina, Saskatchewan. Fully checked, allergen controlled, vegetarian kitchen certified framework.
            </p>
            <div className="flex gap-2 justify-center md:justify-start pt-1 text-[10.5px] font-black text-[#FF724E]">
              <span>✓ Sask Licensed Space</span>
              <span>•</span>
              <span>✓ Canada Grants active</span>
            </div>
          </div>
        </div>

        {/* Closing copyright label */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 tracking-wide uppercase gap-2">
          <span>&copy; {new Date().getFullYear()} Peekaboo Corner Regina Childcare Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => alert("Simulating Accessibility compliance checklist verification!")} className="hover:text-gray-600 cursor-pointer">WCAG 2.1 AA Checklist</button>
            <span>&bull;</span>
            <button onClick={() => alert("Simulating Privacy terms parameters!")} className="hover:text-gray-600 cursor-pointer">Privacy Guarantee</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
