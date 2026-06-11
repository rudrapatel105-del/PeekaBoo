import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle, ShieldCheck, Star } from "lucide-react";
import { LanguageCode, TourBooking } from "../types";
import { TRANSLATIONS } from "../data";
import GoogleMapsZone from "./GoogleMapsZone";

interface ContactViewProps {
  lang: LanguageCode;
  onAddTour: (tour: TourBooking) => void;
  quickBookTour: boolean;
  onCloseQuickBookTour: () => void;
}

export default function ContactView({ lang, onAddTour, quickBookTour, onCloseQuickBookTour }: ContactViewProps) {
  const t = TRANSLATIONS[lang];

  // Load Google Form integration settings
  const useGoogleForm = localStorage.getItem("peekaboo_use_google_forms_contact") === "true";
  let googleFormUrl = localStorage.getItem("peekaboo_google_form_url_contact") || "";
  
  if (googleFormUrl.includes("src=")) {
    const match = googleFormUrl.match(/src="([^"]+)"/);
    if (match && match[1]) {
      googleFormUrl = match[1];
    }
  }

  // Booking states
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childAgeGroup, setChildAgeGroup] = useState<"Infant" | "Toddler" | "Preschool" | "Kindergarten" | "School Age">("Preschool");
  const [tourType, setTourType] = useState<"In-Person" | "Virtual">("In-Person");
  const [date, setDate] = useState("2026-06-15");
  const [time, setTime] = useState("10:00 AM");

  const [bookingResponse, setBookingResponse] = useState<TourBooking | null>(null);

  // General contact query state
  const [queryName, setQueryName] = useState("");
  const [queryEmail, setQueryEmail] = useState("");
  const [queryMsg, setQueryMsg] = useState("");
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !email || !phone) {
      alert("Please specify parent identity coordinates!");
      return;
    }

    const uniqueId = "TR-" + Math.floor(Math.random() * 9000 + 1000);
    const mockTour: TourBooking = {
      id: uniqueId,
      parentName,
      email,
      phone,
      childAgeGroup,
      tourType,
      date,
      time,
      status: "Confirmed"
    };

    onAddTour(mockTour);
    setBookingResponse(mockTour);
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryName || !queryEmail || !queryMsg) {
      alert("Please fill out complete message queries.");
      return;
    }
    setQuerySubmitted(true);
    setQueryName("");
    setQueryEmail("");
    setQueryMsg("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16 pb-16">
      
      {/* 1. INTRO HEADER */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-extrabold text-[#59C7F5] tracking-widest bg-sky-50 px-3 py-1 rounded-full text-sky-850">Connect with us</span>
        <h1 className="text-3xl font-extrabold text-gray-900">Get in Touch & Book a Tour</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-xs leading-relaxed">
          Schedule a physical on-site explore or virtual video visit, inquire about parent grants, or send our Regina consultants immediate questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Contact details, business parameters, map */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-orange-50/20 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="font-extrabold text-gray-900 text-sm border-b border-gray-100 pb-2">Regina HQ Parameters</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-xs text-gray-650 font-normal">
                <MapPin className="w-5 h-5 text-[#FF724E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800">Physical Address</h4>
                  <p className="mt-0.5 text-gray-500 leading-normal">{t.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-xs text-gray-650 font-normal">
                <Clock className="w-5 h-5 text-[#FF724E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800">Operating Hours</h4>
                  <p className="mt-0.5 text-gray-500 leading-normal">{t.schoolHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-xs text-gray-650 font-normal">
                <Phone className="w-5 h-5 text-[#59C7F5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800">Direct Telephone</h4>
                  <p className="mt-0.5 text-gray-500 leading-normal">{t.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-xs text-gray-650 font-normal">
                <Mail className="w-5 h-5 text-[#59C7F5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-800">Admissions Office</h4>
                  <p className="mt-0.5 text-gray-500 leading-normal">{t.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Google Maps & Directions Integration */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-xs uppercase text-[#FF724E] tracking-wider">Live Regina Center Map</h4>
            <GoogleMapsZone />
          </div>
        </div>

        {/* Right Side: Smart Online Tour Booking Planner or Contact form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-orange-50/20">
          
          {/* Quick booked confirmation toggle */}
          {bookingResponse ? (
            <div className="text-center p-6 space-y-6 bg-[#EFF8EF]/70 rounded-2xl border border-emerald-100 animate-fade-in text-gray-700">
              <span className="text-5xl">🗓️</span>
              <h4 className="font-extrabold text-emerald-800 text-lg">Tour Booked & Confirmed!</h4>
              
              <div className="bg-white rounded-xl p-4.5 text-left text-xs space-y-2 border border-emerald-100">
                <p><strong>Parent Visitor:</strong> {bookingResponse.parentName}</p>
                <p><strong>Date & Time Slot:</strong> {bookingResponse.date} at {bookingResponse.time}</p>
                <p><strong>Tour Format:</strong> {bookingResponse.tourType}</p>
                <p><strong>Child Category:</strong> {bookingResponse.childAgeGroup} Track</p>
                <p className="text-[10px] text-gray-400 italic">Reference Identifier: {bookingResponse.id}</p>
              </div>

              {/* Automatic Google Calendar / Microsoft Sync simulation block */}
              <div className="bg-sky-50 text-sky-850 p-4 rounded-xl text-[11px] leading-relaxed text-left border border-sky-100 space-y-2">
                <p className="font-bold text-[#59C7F5] uppercase tracking-wider text-[10px]">Google & Office 365 Sync Active</p>
                <p>We've dispatched mock calendar invite payloads directly to <strong>{bookingResponse.email}</strong>! Access links are configured for instant sync.</p>
                <div className="flex gap-2.5 pt-1">
                  <button onClick={() => alert("Simulated Google Calendar Synchronization Successful!")} className="bg-white hover:bg-gray-50 border px-3 py-1.5 rounded text-[10px] font-bold text-gray-700 cursor-pointer">
                    Add to Google Calendar
                  </button>
                  <button onClick={() => alert("Simulated Microsoft Outlook Calendar Synchronization Successful!")} className="bg-white hover:bg-gray-50 border px-3 py-1.5 rounded text-[10px] font-bold text-gray-700 cursor-pointer">
                    Add to Outlook
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingResponse(null);
                  if (quickBookTour) onCloseQuickBookTour();
                }}
                className="text-gray-550 hover:text-gray-950 text-xs font-bold underline"
              >
                Arrange another scheduler slot &rarr;
              </button>
            </div>
          ) : useGoogleForm && googleFormUrl ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#59C7F5] to-sky-500 text-white p-4.5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none shadow-sm text-xs">
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span>✨</span> Google Forms Live Inquiry Override
                  </h4>
                  <p className="text-[10px] text-white/90 mt-0.5 font-medium">Automatic Master Spreadsheet recording live on Google Drive</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem("peekaboo_use_google_forms_contact", "false");
                    window.location.reload();
                  }}
                  className="bg-white/20 hover:bg-white/35 text-white font-extrabold text-[9px] px-3 py-1.5 rounded-xl border border-white/20 cursor-pointer text-center whitespace-nowrap animate-pulse animate-fade-in"
                >
                  ⚙️ Switch to Native Forms
                </button>
              </div>

              <div className="w-full bg-white rounded-3xl min-h-[600px] relative overflow-hidden border border-sky-50 shadow-sm p-1">
                <iframe
                  title="Peekaboo Corner Visitation Google Form"
                  src={googleFormUrl}
                  width="100%"
                  height="650"
                  frameBorder="0"
                  className="w-full h-[650px] rounded-2xl"
                  referrerPolicy="no-referrer"
                >
                  Loading Google Form...
                </iframe>
              </div>

              <div className="bg-[#FFFBF5] text-amber-950 border border-amber-100 p-4 rounded-2xl text-[10.5px] leading-relaxed">
                👉 <strong>Provincial System Check:</strong> Submissions on this tab automatically dispatch notification triggers to target administrators on Google Workspace.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-[#FF724E] text-base">Admissions Calendar & Visit Booking</h3>
                  <p className="text-[10px] text-gray-400">Available Monday through Friday slots.</p>
                </div>
                {quickBookTour && (
                  <button 
                    onClick={onCloseQuickBookTour}
                    className="text-xs text-gray-400 hover:text-gray-700 font-bold border border-gray-200 px-2.5 py-1 rounded-lg"
                  >
                    X
                  </button>
                )}
              </div>

              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Parent Full Name</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Marie Dumont"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Child Focus Track</label>
                    <select
                      value={childAgeGroup}
                      onChange={(e) => setChildAgeGroup(e.target.value as any)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    >
                      <option value="Infant">Infant Program (0-18 mos)</option>
                      <option value="Toddler">Toddler Track (18-36 mos)</option>
                      <option value="Preschool">Preschool Group (3-4 yrs)</option>
                      <option value="Kindergarten">Kindergarten (4-5 yrs)</option>
                      <option value="School Age">School Age Track (5-7 yrs)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Parent Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marie.dumont@example.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (306) 555-4321"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Tour Format</label>
                    <select
                      value={tourType}
                      onChange={(e) => setTourType(e.target.value as any)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#59C7F5]"
                    >
                      <option value="In-Person">In-Person (HQ Walkthrough)</option>
                      <option value="Virtual">Virtual Visit (Video Link)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Preferred Time Slot</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5]"
                    >
                      <option value="09:00 AM">09:00 AM (Quiet Time check)</option>
                      <option value="10:00 AM">10:00 AM (Circle Time check)</option>
                      <option value="11:00 AM">11:00 AM (Outdoor play check)</option>
                      <option value="02:00 PM">02:00 PM (Afternoon Art check)</option>
                      <option value="04:00 PM">04:00 PM (Home pickup check)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FF724E] hover:bg-[#e65e3a] active:scale-99 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Confirm admissions tour booking &rarr;
                </button>
              </form>
            </div>
          )}

          {/* Quick contact Query Form if NOT selecting calendar */}
          <div className="mt-10 pt-8 border-t border-gray-100 space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 text-xs uppercase text-[#59C7F5]">Send a general quick inquiry</h4>
              <p className="text-[10px] text-gray-400">Response within 24 operational hours guarantee.</p>
            </div>

            {querySubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-3 text-xs flex items-center gap-2 font-semibold">
                <CheckCircle className="w-5 h-5" /> Thank you! Your inquiry has been forwarded to Regina admissions coordinators successfully.
              </div>
            ) : (
              <form onSubmit={handleQuerySubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={queryName}
                    onChange={(e) => setQueryName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5]"
                  />
                  <input
                    type="email"
                    required
                    value={queryEmail}
                    onChange={(e) => setQueryEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5]"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  value={queryMsg}
                  onChange={(e) => setQueryMsg(e.target.value)}
                  placeholder="Tell us about your requirements of parent fee grant, sibling spaces..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5]"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#59C7F5] hover:bg-[#3cacdf] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
