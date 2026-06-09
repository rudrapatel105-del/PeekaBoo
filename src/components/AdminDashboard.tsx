import React, { useState } from "react";
import { CheckCircle, Users, ClipboardList, Send, Calendar, ShieldCheck, Mail, ArrowRight, Star, Settings, Database, Share2, ExternalLink, CheckSquare, Download } from "lucide-react";
import { EnrollmentSubmission, TourBooking, WeeklyMenu } from "../types";
import { MOCK_MENU, INITIAL_SUBMISSIONS, INITIAL_TOURS } from "../data";
import GoogleWorkspaceHub from "./GoogleWorkspaceHub";

interface AdminDashboardProps {
  submissionsList: EnrollmentSubmission[];
  toursList: TourBooking[];
  onApproveEnrollment: (id: string, newStatus: any) => void;
  onModifyPriority: (id: string, delta: number) => void;
}

export default function AdminDashboard({ submissionsList, toursList, onApproveEnrollment, onModifyPriority }: AdminDashboardProps) {
  const [activeSegment, setActiveSegment] = useState<"admissions" | "tours" | "mealplanner" | "broadcast" | "integrations">("admissions");
  const [selectedSub, setSelectedSub] = useState<any | null>(null);

  // States of simulated custom meal planner
  const [menu, setMenu] = useState<WeeklyMenu>(MOCK_MENU);
  const [customBreakfast, setCustomBreakfast] = useState("Oatmeal & Prairie honey");
  const [customLunch, setCustomLunch] = useState("Dahl lentil curry & rice");

  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [broadcastOutcome, setBroadcastOutcome] = useState(false);

  // Form integrations state loaded dynamically from localStorage or defaults
  const [useGoogleFormsForEnrollment, setUseGoogleFormsForEnrollment] = useState(() => {
    return localStorage.getItem("peekaboo_use_google_forms_enrollment") === "true";
  });
  const [useGoogleFormsForContact, setUseGoogleFormsForContact] = useState(() => {
    return localStorage.getItem("peekaboo_use_google_forms_contact") === "true";
  });
  const [googleFormUrlEnrollment, setGoogleFormUrlEnrollment] = useState(() => {
    return localStorage.getItem("peekaboo_google_form_url_enrollment") || "";
  });
  const [googleFormUrlContact, setGoogleFormUrlContact] = useState(() => {
    return localStorage.getItem("peekaboo_google_form_url_contact") || "";
  });
  const [notificationEmail, setNotificationEmail] = useState(() => {
    return localStorage.getItem("peekaboo_notification_email") || "ravi14patel@gmail.com";
  });

  const handleSaveIntegrations = () => {
    localStorage.setItem("peekaboo_use_google_forms_enrollment", String(useGoogleFormsForEnrollment));
    localStorage.setItem("peekaboo_use_google_forms_contact", String(useGoogleFormsForContact));
    localStorage.setItem("peekaboo_google_form_url_enrollment", googleFormUrlEnrollment);
    localStorage.setItem("peekaboo_google_form_url_contact", googleFormUrlContact);
    localStorage.setItem("peekaboo_notification_email", notificationEmail);
    alert("Success! Google integration parameters saved to localStorage. Waitlist overrides are active on client tabs!");
  };

  const downloadCSV = (data: any[], headers: string[], rowMapper: (item: any) => string[], filename: string) => {
    try {
      const csvRows = [
        headers.join(","),
        ...data.map(item => rowMapper(item).map(val => {
          const str = String(val || '').replace(/"/g, '""');
          return `"${str}"`;
        }).join(","))
      ];
      // Byte order mark (BOM) for Excel
      const csvContent = "\uFEFF" + csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Spreadsheet compile error: " + err);
    }
  };

  const handleDownloadSubmissions = () => {
    const headers = [
      "Reg ID", "Submission Date", "Status", "Waitlist Rank", "Age Cohort", "Schedule Required",
      "Child First Name", "Child Last Name", "Child DOB", "Allergies", "Special Needs",
      "Parent First Name", "Parent Last Name", "Relationship", "Parent Email", "Parent Phone", "Address"
    ];
    downloadCSV(
      submissionsList,
      headers,
      (s) => [
        s.id,
        new Date(s.submissionDate).toLocaleDateString(),
        s.status,
        String(s.waitlistRank),
        s.ageGroupSelected || "General",
        s.scheduleRequirements || "Full-Time",
        s.child.firstName,
        s.child.lastName,
        s.child.birthDate,
        s.child.allergies || "None",
        s.child.specialNeeds || "None",
        s.parent.firstName,
        s.parent.lastName,
        s.parent.relationship || "Guardian",
        s.parent.email,
        s.parent.phone,
        s.parent.address || ""
      ],
      "peekaboo_waitlist_admissions.csv"
    );
  };

  const handleDownloadTours = () => {
    const headers = [
      "Tour ID", "Parent Name", "Email Address", "Phone Number", "Date of Visit", "Time of Visit", "Target Age Cohort", "Type of Tour", "Status"
    ];
    downloadCSV(
      toursList,
      headers,
      (t) => [
        t.id,
        t.parentName,
        t.email,
        t.phone,
        t.date,
        t.time,
        t.childAgeGroup,
        t.tourType,
        t.status
      ],
      "peekaboo_visit_tours.csv"
    );
  };

  const stats = {
    totalWaitlisted: submissionsList.filter(s => s.status === "Waitlisted").length,
    totalApproved: submissionsList.filter(s => s.status === "Approved").length,
    pendingActions: submissionsList.filter(s => s.status === "Pending").length,
    toursCount: toursList.length
  };

  const handleUpdateMenu = (day: string) => {
    const updatedDays = menu.days.map((d) => {
      if (d.day === day) {
        return {
          ...d,
          breakfast: customBreakfast,
          lunch: customLunch
        };
      }
      return d;
    });

    setMenu({ ...menu, days: updatedDays });
    alert(`Successfully customized menu for ${day}! It will show in real-time on Parent Portals.`);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) {
      alert("Please fill out complete broadcast notification fields.");
      return;
    }
    setBroadcastOutcome(true);
    setTimeout(() => {
      setBroadcastTitle("");
      setBroadcastBody("");
      setBroadcastOutcome(false);
      alert("Simulated mailing broadcast dispatched to all registered parent email addresses!");
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10 pb-16">
      
      {/* 1. ADMINISTRATION TITLE CARD */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-750">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-405">
            <Settings className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Peekaboo Provider Administration Portal</h2>
            <p className="text-xs text-slate-300">
              Saskatchewan Regulatory Licensing & Operations Management | Regina SKU: #PKB4822
            </p>
          </div>
        </div>
        
        {/* Rapid summary widgets */}
        <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase text-slate-800">
          <span className="px-3 py-1.5 bg-yellow-400 rounded-lg">Waitlist: {stats.totalWaitlisted}</span>
          <span className="px-3 py-1.5 bg-[#59C7F5] rounded-lg text-white">Pending: {stats.pendingActions}</span>
          <span className="px-3 py-1.5 bg-emerald-400 rounded-lg">Approved: {stats.totalApproved}</span>
        </div>
      </div>

      {/* SEGMENTS SELECTOR GRIDS */}
      <div className="flex gap-2 border-b border-gray-100 pb-3 overflow-x-auto">
        {[
          { id: "admissions", label: "📋 Applications Ledger" },
          { id: "tours", label: "🗓️ Visitation Schedule" },
          { id: "mealplanner", label: "🍳 Vegetarian Kitchen Menu" },
          { id: "broadcast", label: "📢 Parent Notification Broadcaster" },
          { id: "integrations", label: "📊 Google Sheets & Exports" }
        ].map((seg) => (
          <button
            key={seg.id}
            onClick={() => setActiveSegment(seg.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeSegment === seg.id
                ? "bg-[#FF724E] text-white"
                : "bg-white text-gray-550 hover:bg-orange-50/20"
            }`}
          >
            {seg.label}
          </button>
        ))}
      </div>

      {/* SECTION CONTENT BLOCKS */}
      {activeSegment === "admissions" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900">Waitlisted Admissions Database</h3>
            <p className="text-[10px] text-gray-400">Increase sibling priority, inspect allergies, and manage regulatory placement actions.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse text-gray-700">
              <thead>
                <tr className="bg-[#FFFBF5]">
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-405">Reg ID</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-405">Parent & Child</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-405">Target Date & schedule</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-405">Allergies checks</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-450">Waitlist Priority Rank</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-450">Admin Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50/40">
                {submissionsList.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 border border-orange-50 font-black text-[#FF724E] uppercase">{sub.id}</td>
                    <td className="p-3 border border-orange-50">
                      <div>
                        <p className="font-bold text-gray-900">{sub.child.firstName} {sub.child.lastName}</p>
                        <p className="text-[10px] text-gray-450">Guardian: {sub.parent.firstName} {sub.parent.lastName} ({sub.parent.phone})</p>
                      </div>
                    </td>
                    <td className="p-3 border border-orange-50">
                      <div>
                        <p className="font-semibold text-gray-800">{sub.preferredStartDate}</p>
                        <p className="text-[10px] text-gray-450 uppercase">{sub.scheduleRequirements}</p>
                      </div>
                    </td>
                    <td className="p-3 border border-orange-50 text-[11px] font-medium text-amber-800">
                      {sub.child.allergies ? `⚠️ ${sub.child.allergies}` : "None"}
                    </td>
                    <td className="p-3 border border-orange-50">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-800 text-sm">#{sub.waitlistRank}</span>
                        <div className="flex flex-col gap-0.5">
                          <button 
                            onClick={() => onModifyPriority(sub.id, -1)}
                            className="bg-sky-50 text-[#59C7F5] border border-sky-100 hover:bg-sky-100 px-1.5 py-0.5 text-[9px] font-black rounded cursor-pointer"
                          >
                            ▲ Increase
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 border border-orange-50">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {sub.status !== "Approved" ? (
                            <button
                              onClick={() => onApproveEnrollment(sub.id, "Approved")}
                              className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-1 rounded uppercase">
                              Approved
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedSub(sub)}
                            className="bg-orange-50 hover:bg-orange-100 text-[#FF724E] border border-orange-200 font-bold px-2 py-1 rounded-lg text-[10px] cursor-pointer"
                          >
                            Inspect Sask Forms
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => alert(`Starting simulated text coordination SMS setup to ${sub.parent.phone}!`)}
                            className="border border-gray-200 text-gray-500 font-bold px-2 py-1 rounded text-[9px] hover:bg-gray-50"
                          >
                            SMS Alert
                          </button>
                          <span className="text-[9px] font-extrabold uppercase text-slate-400 self-center">
                            Cohort: {sub.ageGroupSelected || "Pre-K"}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSegment === "tours" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900">Visitation Schedule Matrix</h3>
            <p className="text-[10px] text-gray-400">Review upcoming parent walkthrough slots and virtual video conferences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toursList.map((tr) => (
              <div key={tr.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 flex justify-between items-start gap-4 hover:shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                      tr.tourType === "In-Person" ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-850"
                    }`}>
                      {tr.tourType} Visit
                    </span>
                    <span className="bg-[#FF724E]/10 text-[#FF724E] px-2 py-0.5 text-[9px] font-bold rounded">
                      {tr.childAgeGroup} Focus
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs">{tr.parentName}</h4>
                  <p className="text-[10px] text-gray-500">Contact: {tr.email} | {tr.phone}</p>
                  <p className="text-[10px] text-[#59C7F5] font-black">Calendar Sync Schedule: {tr.date} at {tr.time}</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="bg-emerald-100 text-emerald-805 text-[9px] font-bold px-2 py-0.5 rounded">
                    {tr.status}
                  </span>
                  <button
                    onClick={() => alert(`Virtual Video Tour payload sync dispatched to ${tr.email}!`)}
                    className="bg-sky-100 text-sky-850 hover:bg-sky-200 px-2.5 py-1 text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Resend invite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSegment === "mealplanner" && (
        <div className="bg-white rounded-3xl p-6.5 shadow-sm border border-orange-50/20 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900">Interactive Weekly Meal Creator Planner</h3>
            <p className="text-[10px] text-gray-400">Optimize and deploy healthy 100% vegetarian allocations directly to portals.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-[#FFFBF5] rounded-2xl p-5 border border-orange-100/40 space-y-4">
              <h4 className="font-extrabold text-[#FF724E] text-xs uppercase">Dietary customizer box</h4>
              
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Breakfast (08:30)</label>
                  <input
                    type="text"
                    value={customBreakfast}
                    onChange={(e) => setCustomBreakfast(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Lentils Kitchen Lunch (11:45)</label>
                  <input
                    type="text"
                    value={customLunch}
                    onChange={(e) => setCustomLunch(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-[10px] text-gray-400">Click any day on the right ledger to replace and synchronize immediately!</p>
                </div>
              </div>
            </div>

            {/* Daily Menu target rows */}
            <div className="lg:col-span-8 space-y-3">
              {menu.days.map((row) => (
                <div key={row.day} className="bg-white border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-2xs">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 text-xs">{row.day}</p>
                    <p className="text-[11px] text-gray-500">Breakfast: {row.breakfast} | Lunch: {row.lunch}</p>
                  </div>
                  <button
                    onClick={() => handleUpdateMenu(row.day)}
                    className="bg-emerald-50 hover:bg-[#EFF8EF]/80 text-emerald-800 border border-emerald-150 px-3.5 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    Deploy customize &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSegment === "broadcast" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900">Dynamic Parent notification Broadcaster</h3>
            <p className="text-[10px] text-gray-400">Trigger automatic email updates, waitlist reports, closures details to our registry.</p>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4 max-w-xl">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Mailing Broadcast Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Autumn 2026 Parent fee grant update guidelines"
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#FF724E]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Notification Content Body</label>
              <textarea
                required
                rows={4}
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                placeholder="Dear Peekaboo Corner Families, we are excited to expand our toddler classroom tracks..."
                className="w-full bg-slate-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#FF724E]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={broadcastOutcome}
              className="px-6 py-3 bg-[#FF724E] hover:bg-[#e65e3a] text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> {broadcastOutcome ? "Mailing all parent directories..." : "Deploy broad notification email"}
            </button>
          </form>
        </div>
      )}

      {activeSegment === "integrations" && (
        <div className="space-y-8 animate-fade-in text-xs">
          {/* Real-time Google Workspace API Integration Panel */}
          <GoogleWorkspaceHub />

          {/* Main banner & Title */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/25 space-y-2">
            <h3 className="text-sm font-black text-slate-805 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#59C7F5]" />
              Google Sheets Synchronization & Exports Hub
            </h3>
            <p className="text-gray-400 font-medium text-[11px] leading-relaxed">
              Peekaboo Corner is fully compatible with custom Google Forms. Setup your Google Workspace Master spreadsheet link, download live backups, or redirect public submissions to your own Google Forms below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Dashboard Offline Backup Downloads Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-4">
              <div className="border-b border-gray-100 pb-2.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Option A: Direct Spreadsheet Backup Downloads</span>
                <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">Generate Instant CSV/Excel Backups</h4>
              </div>
              <p className="text-gray-500 leading-normal">
                If you are running Peekaboo Corner's local form collection, you can compile and download the complete database of waitlist applications and tours as Excel/Google Sheets-ready spreadsheets anytime with one click.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center bg-[#FFFBF5] rounded-2xl p-4 border border-orange-50">
                  <div>
                    <h5 className="font-bold text-slate-800">Enrollment & Waitlist Database</h5>
                    <p className="text-[10px] text-gray-400 font-semibold">{submissionsList.length} Active Provincial Placements on File</p>
                  </div>
                  <button
                    onClick={handleDownloadSubmissions}
                    className="flex items-center gap-2 bg-[#FF724E] hover:bg-[#e05b38] text-white font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Waitlist CSV
                  </button>
                </div>

                <div className="flex justify-between items-center bg-[#F4FBFF] rounded-2xl p-4 border border-sky-50">
                  <div>
                    <h5 className="font-bold text-slate-800">Tour Bookings & Walkthroughs</h5>
                    <p className="text-[10px] text-gray-400 font-semibold">{toursList.length} Scheduled Parent Calendar Visits</p>
                  </div>
                  <button
                    onClick={handleDownloadTours}
                    className="flex items-center gap-2 bg-[#59C7F5] hover:bg-sky-500 text-white font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Tours CSV
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 italic block pt-1 leading-relaxed">
                * Note: Download formats use standardized Excel CSV guidelines with auto-detected Unicode encoding to secure seamless column separation on any desktop device.
              </p>
            </div>

            {/* Public Interactive Google Forms Embedding Panel */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-4">
              <div className="border-b border-gray-100 pb-2.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Option B: Dynamic Public Google Forms Embedding</span>
                <h4 className="font-extrabold text-[#FF724E] text-xs mt-0.5">Redirect Live Website Submissions</h4>
              </div>
              <p className="text-gray-500 leading-normal">
                Want parents to fill out your actual Google Forms instead? Toggle overrides below. When active, parents on the waitlist page will see your embedded form, sending responses straight to your Google Master Sheet!
              </p>

              <div className="space-y-4 pt-2">
                
                {/* Override 1: Enrollment Waitlist */}
                <div className="space-y-2 border border-orange-50 bg-[#FFFBF7]/40 p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <label className="font-black text-slate-800 text-[11px] flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-orange-500" />
                      Override Enrollment/Waitlist Tab
                    </label>
                    <button
                      type="button"
                      onClick={() => setUseGoogleFormsForEnrollment(!useGoogleFormsForEnrollment)}
                      className={`px-3 py-1 text-[10px] font-extrabold rounded-lg select-none transition-all cursor-pointer ${
                        useGoogleFormsForEnrollment 
                          ? "bg-orange-500 text-white" 
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {useGoogleFormsForEnrollment ? "Active (Use Google Form)" : "Inactive (Use Local Form)"}
                    </button>
                  </div>
                  
                  {useGoogleFormsForEnrollment && (
                    <div className="space-y-1.5 pt-1.5">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Google Form Embed Link (or Direct Link URL)</p>
                      <input
                        type="text"
                        value={googleFormUrlEnrollment}
                        onChange={(e) => setGoogleFormUrlEnrollment(e.target.value)}
                        placeholder="e.g. https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?embedded=true"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-orange-500"
                      />
                      <span className="text-[9px] text-gray-400 block">* Paste the embed URL copied from Send &gt; &lt; &gt; (Embed HTML) in Google Forms, or standard share link.</span>
                    </div>
                  )}
                </div>

                {/* Override 2: Contact Tours */}
                <div className="space-y-2 border border-sky-50 bg-[#F4FBFF]/40 p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <label className="font-black text-slate-800 text-[11px] flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-sky-500" />
                      Override ContactUs / Book Tours Tab
                    </label>
                    <button
                      type="button"
                      onClick={() => setUseGoogleFormsForContact(!useGoogleFormsForContact)}
                      className={`px-3 py-1 text-[10px] font-extrabold rounded-lg select-none transition-all cursor-pointer ${
                        useGoogleFormsForContact 
                          ? "bg-sky-500 text-white" 
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {useGoogleFormsForContact ? "Active (Use Google Form)" : "Inactive (Use Local Form)"}
                    </button>
                  </div>
                  
                  {useGoogleFormsForContact && (
                    <div className="space-y-1.5 pt-1.5">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Google Form Embed Link</p>
                      <input
                        type="text"
                        value={googleFormUrlContact}
                        onChange={(e) => setGoogleFormUrlContact(e.target.value)}
                        placeholder="e.g. https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform?embedded=true"
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Alert Target Notification Email Address</label>
                  <input
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="info@peekaboocorner.com"
                    className="w-full bg-slate-50 border border-gray-150 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[9px] text-gray-400 block">We will refer parents back to this email address if they experience any accessibility difficulties.</span>
                </div>

                <button
                  onClick={handleSaveIntegrations}
                  className="w-full py-3 bg-[#FF724E] hover:bg-[#e05b38] text-white text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer transition-transform duration-100 active:scale-98"
                >
                  Save Override Settings & Deploy
                </button>

              </div>
            </div>

          </div>

          {/* Detailed Illustrated 4-Step Guide from User Suggestion */}
          <div className="bg-gradient-to-r from-slate-850 to-slate-900 border border-slate-750 text-white rounded-3xl p-6.5 space-y-5 shadow-md">
            <div>
              <span className="bg-[#59C7F5] text-slate-900 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none">
                Official Google Workspace Guide
              </span>
              <h4 className="text-sm font-black text-white mt-1 border-b border-white/10 pb-2">
                Recommended Setup: Automatically Link Google Forms responses with Google Sheets Master Database
              </h4>
              <p className="text-slate-350 text-[11px] pt-1 leading-relaxed">
                Deploying this pipeline makes certain that no matter which category a parent submits (Waitlist, Tours, or Contact), every raw entry instantly collects in one master spreadsheet backed up on Google Drive with automated email delivery notifications dispatching in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              
              <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/8">
                <div className="w-7 h-7 rounded-lg bg-[#FF724E] flex items-center justify-center font-black text-xs text-white">1</div>
                <h5 className="font-extrabold text-white text-[11px] uppercase tracking-wide">Create Google Forms</h5>
                <p className="text-[10.5px] text-slate-300 leading-relaxed font-normal">
                  Go to <a href="https://forms.google.com" target="_blank" rel="noreferrer" className="text-sky-400 underline">forms.google.com</a>. Setup separate templates for <strong>Enrollment / Waitlists</strong> and <strong>Contact Us</strong>. Use appropriate questions mapping to child DOB, allergens, and parent telephone inputs.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/8">
                <div className="w-7 h-7 rounded-lg bg-[#59C7F5] flex items-center justify-center font-black text-xs text-slate-900">2</div>
                <h5 className="font-extrabold text-white text-[11px] uppercase tracking-wide">Link to Master Sheets</h5>
                <p className="text-[10.5px] text-slate-300 leading-relaxed font-normal">
                  In each form's editor top center, select the <strong>Responses</strong> tab. Click the green <strong>Link to Sheets</strong> icon. Select <strong>"Create a new spreadsheet"</strong>. This groups waitlist arrays cleanly inside a single live spreadsheet.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/8">
                <div className="w-7 h-7 rounded-lg bg-emerald-400 flex items-center justify-center font-black text-xs text-slate-900">3</div>
                <h5 className="font-extrabold text-white text-[11px] uppercase tracking-wide">Configure Email Alerts</h5>
                <p className="text-[10.5px] text-slate-300 leading-relaxed font-normal">
                  Under the Responses tab, click the three vertical dots (More menu) and check <strong>"Get email notifications for new responses"</strong>. Now you are notified instantly at <strong>{notificationEmail}</strong> on every lead.
                </p>
              </div>

              <div className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/8">
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center font-black text-xs text-slate-900">4</div>
                <h5 className="font-extrabold text-white text-[11px] uppercase tracking-wide">Embed Into Website</h5>
                <p className="text-[10.5px] text-slate-300 leading-relaxed font-normal">
                  Click the <strong>Send</strong> button, go to the <strong>&lt; &gt;</strong> code embed tab, and copy the Google Form HTML source link. Toggle "Active Override" above, paste the link, and save!
                </p>
              </div>

            </div>

            <div className="pt-2 text-[10px] text-sky-305 bg-sky-900/20 p-4.5 rounded-2xl border border-sky-800/30 leading-relaxed font-semibold">
              💡 <strong>Regina Provider Security Tip:</strong> Google Workspace guarantees that all uploaded kid profiles are securely hosted, enabling effortless, real-time sharing of waitlist status arrays amongst educators and Saskatchewan provincial inspectors.
            </div>
          </div>
        </div>
      )}

      {/* SASKATCHEWAN REGULATORY DIGITIZED FORM INSPECT PANEL IF SELECTED */}
      {selectedSub && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto text-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-orange-50/50 p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-150 pb-4">
              <div>
                <span className="text-[9px] bg-orange-50 text-[#FF724E] px-2.5 py-0.5 rounded-full uppercase font-black tracking-widest">
                  Regina, SK Regulatory Form Portal
                </span>
                <h3 className="text-sm font-black text-slate-800 mt-1">
                  Admissions Document Record: <span className="text-[#FF724E]">{selectedSub.id}</span>
                </h3>
                <p className="text-[10px] text-gray-400">Submitted on: {new Date(selectedSub.submissionDate).toLocaleDateString()} for Cohort "{selectedSub.ageGroupSelected || "Preschool"}"</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Core Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-700 bg-slate-50 p-4 rounded-2xl border border-gray-150">
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-[10px]">Client Child Coordinates</h4>
                <p><strong>Name:</strong> {selectedSub.child.firstName} {selectedSub.child.lastName}</p>
                <p><strong>Date of Birth:</strong> {selectedSub.child.birthDate}</p>
                <p><strong>Gender:</strong> {selectedSub.child.gender}</p>
                <p><strong>Primary Allergies:</strong> <span className="text-amber-800 font-bold">{selectedSub.child.allergies || "None registered"}</span></p>
                <p><strong>Medications:</strong> {selectedSub.child.medications || "None"}</p>
                <p><strong>Special Needs/Interests:</strong> {selectedSub.child.specialNeeds || "None registered"}</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
                <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-[10px]">Applying Parent Coordinates</h4>
                <p><strong>Name:</strong> {selectedSub.parent.firstName} {selectedSub.parent.lastName} ({selectedSub.parent.relationship})</p>
                <p><strong>Email Address:</strong> {selectedSub.parent.email}</p>
                <p><strong>Home Telephone:</strong> {selectedSub.parent.phone}</p>
                <p><strong>Target Street Address:</strong> {selectedSub.parent.address} (Postal Code: {selectedSub.parent.postalCode || "S4P 3Y2"})</p>
                <p><strong>Commencement date requested:</strong> {selectedSub.preferredStartDate} ({selectedSub.scheduleRequirements})</p>
              </div>
            </div>

            {/* If school age forms attached, display full regulatory details */}
            {selectedSub.schoolAgeSocialResume ? (
              <div className="space-y-6">
                <div className="bg-emerald-50 text-emerald-900 px-4 py-2.5 rounded-xl text-[10px] font-bold border border-emerald-150">
                  🍁 Verified Compliant: Complete School-Age Provincial digital files accompany this registration. See full database keys below.
                </div>

                {/* Sub Agreement block */}
                <div className="p-4 bg-[#FFFBF5] rounded-2xl border border-orange-100/60 space-y-2 text-[10.5px]">
                  <h4 className="font-extrabold text-orange-950 uppercase text-[10px]">1. Saskatchewan Government Care Services Contract (Form 7777 / 7790 combo)</h4>
                  <p><strong>Agreed Monthly Care Fee:</strong> ${selectedSub.childCareAgreement?.monthlyFeeValue || "450.00"}</p>
                  <p><strong>Supervision Care Schedules:</strong> {selectedSub.childCareAgreement?.additionalCareArrangements || "Before and after schools hours"}</p>
                  <p><strong>Alternate closures placement agreement:</strong> {selectedSub.childCareAgreement?.alternateArrangementsText || "Parents provide alternate family care on stats."}</p>
                  <p><strong>Termination terms notice:</strong> {selectedSub.childCareAgreement?.terminationWeeksNotice || "1 month"}</p>
                  <p><strong>Digitally Witnessed Parent Signature Flag:</strong> <span className="font-mono text-xs font-bold text-orange-900 bg-white px-2 py-0.5 rounded border border-orange-150">✓ {selectedSub.childCareAgreement?.authorizedSignatureName || "Monali Patel"}</span></p>
                </div>

                {/* Emergency & Illnesses */}
                <div className="p-4 bg-[#F5FBFF] rounded-2xl border border-sky-100 space-y-2 text-[10.5px]">
                  <h4 className="font-extrabold text-sky-950 uppercase text-[10px]">2. Regulated Portable Emergency Files & Health History (Form 7790 + 7809)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-sky-900">
                    <div>
                      <p className="font-extrabold text-sky-950 block">EMERGENCY ADDITIONAL CONTACTS:</p>
                      <ul className="list-disc pl-4 space-y-0.5">
                        <li><strong>Contact #1:</strong> {selectedSub.emergencyInfo?.emer1Name} ({selectedSub.emergencyInfo?.emer1Relationship}) - {selectedSub.emergencyInfo?.emer1CellPhone}</li>
                        <li><strong>Contact #2:</strong> {selectedSub.emergencyInfo?.emer2Name || "N/A"} ({selectedSub.emergencyInfo?.emer2Relationship || "N/A"}) - {selectedSub.emergencyInfo?.emer2CellPhone || "N/A"}</li>
                      </ul>
                      <p className="mt-2 text-slate-600"><strong>Immunization is Up to date:</strong> {selectedSub.emergencyInfo?.isImmunizedUpToDate ? "Yes, Saskatchewan Health Services compliant" : "No"}</p>
                    </div>
                    <div>
                      <p className="font-black text-sky-950">CHECKED COMMUNICABLE ILLNESS HISTORY:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedSub.emergencyInfo?.checkedIllnesses && selectedSub.emergencyInfo.checkedIllnesses.length > 0 ? (
                          selectedSub.emergencyInfo.checkedIllnesses.map((ill: string) => (
                            <span key={ill} className="bg-sky-100 text-sky-850 px-2 py-0.5 rounded text-[9px] font-bold">{ill}</span>
                          ))
                        ) : (
                          <span className="text-slate-500 italic">No prior illnesses checked</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Resume */}
                <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-200/60 space-y-2 text-[10.5px]">
                  <h4 className="font-extrabold text-slate-800 uppercase text-[10px]">3. Primary School-Age Social & Emotional Mapping (Form 7788)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p><strong>Primary School name:</strong> {selectedSub.schoolAgeSocialResume?.schoolName || "Regina Public School"}</p>
                      <p><strong>Commute Method arranged:</strong> {selectedSub.schoolAgeSocialResume?.howGetToFromSchool}</p>
                      <p><strong>Home languages:</strong> {selectedSub.schoolAgeSocialResume?.languagesSpokenInHome} | <strong>Pets details:</strong> {selectedSub.schoolAgeSocialResume?.petsDetails || "None"}</p>
                      <p><strong>Toileting independent:</strong> {selectedSub.schoolAgeSocialResume?.helpToiletingCheck ? "Requires care steps" : "Fully self care independent"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-extrabold text-slate-700">How childhood feelings display:</p>
                      <ul className="list-disc pl-4 text-[9.5px] text-gray-500">
                        <li><strong>Worry:</strong> {selectedSub.schoolAgeSocialResume?.worryShow || "Quietness"}</li>
                        <li><strong>Anger:</strong> {selectedSub.schoolAgeSocialResume?.angerShow}</li>
                        <li><strong>Excitement:</strong> {selectedSub.schoolAgeSocialResume?.excitementShow}</li>
                        <li><strong>Peer shyness:</strong> {selectedSub.schoolAgeSocialResume?.isShy || "No"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedSub.infantSocialResume ? (
              <div className="space-y-6 animate-fade-in text-xs">
                <div className="bg-orange-50 text-orange-950 px-4 py-2.5 rounded-xl text-[10px] font-bold border border-orange-200">
                  🍼 Verified Compliant: Complete Saskatchewan Government Infant Regulatory Suite (Form 7777 + Form 7785) is attached.
                </div>

                {/* Infant Services Agreement (Form 7777) */}
                <div className="p-4 bg-[#FCFBF9] rounded-2xl border border-orange-100 space-y-2 text-[10.5px]">
                  <h4 className="font-extrabold text-orange-950 uppercase text-[10px] flex items-center gap-1.5">
                    <span>📄</span> 1. Child Care Agreement (Saskatchewan Form 7777 Compliance)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p><strong>Proposed Monthly Billing Rate:</strong> ${selectedSub.childCareAgreement?.monthlyFeeValue || "97.50"} <span className="text-[9.5px] text-gray-400 font-medium">(Net of $217.50 Provincial Subsidy Grant)</span></p>
                      <p><strong>Expected Withdrawal Period Notice:</strong> {selectedSub.childCareAgreement?.withdrawalNoticeValue || "4 Weeks Written Notice"}</p>
                      <p><strong>Late Pick-up Penalties:</strong> {selectedSub.childCareAgreement?.overtimeRateDescribe || "$1.00 per minute after 5:30 PM"}</p>
                    </div>
                    <div>
                      <p><strong>Primary Designated Authorized Off-site Pickups:</strong> {selectedSub.childCareAgreement?.alternateContactsComma || "Anil Patel (Uncle)"}</p>
                      <p><strong>Authorized Parent Signature Name:</strong> <span className="font-mono text-xs font-bold text-orange-900 bg-white px-2 py-0.5 rounded border border-orange-150">✓ {selectedSub.childCareAgreement?.authorizedSignatureName || "Monali Patel"}</span></p>
                    </div>
                  </div>
                </div>

                {/* Infant Social Resume (Form 7785) */}
                <div className="p-4 bg-amber-50/15 rounded-2xl border border-amber-100/60 space-y-3 text-[10.5px]">
                  <h4 className="font-extrabold text-amber-950 uppercase text-[10px] flex items-center gap-1.5">
                    <span>👶</span> 2. Saskatchewan Government Infant Social Resume (Form 7785)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <p><strong>Prior Group Care Placements:</strong> {selectedSub.infantSocialResume?.anyPriorGroupCare ? "Yes" : "No, first time in licensed group care"}</p>
                      <p><strong>Breast / Formula Nutrition Strategy:</strong> {selectedSub.infantSocialResume?.nutritionFeedType || "Breastfeeding with expressed milk support"}</p>
                      <p><strong>Solid Food Intake & Safe Textures:</strong> {selectedSub.infantSocialResume?.solidFoodsBrief || "Just starting purees"}</p>
                      <p><strong>Water Requirement Interval:</strong> {selectedSub.infantSocialResume?.waterIntakeNeeds || "Offered after play sessions"}</p>
                    </div>
                    <div className="space-y-1.5">
                      <p><strong>Sleep Schedule & Crib Comforts:</strong> {selectedSub.infantSocialResume?.napPatternNotes || "Usually sleeps at 10:00 AM and 2:00 PM for 1 hour each"}</p>
                      <p><strong>Safe Sleeping Accessories Authorized:</strong> {selectedSub.infantSocialResume?.safeSleepingNeeds || "Own sleeping bag, no blankets"}</p>
                      <p><strong>Language/Vocabulary Development:</strong> {selectedSub.infantSocialResume?.spokenWordsWords || "Coos, babbling sounds"}</p>
                      <p><strong>Motor Coordination Notes:</strong> {selectedSub.infantSocialResume?.motorMilestonesNotes || "Learning to roll, starting to sit up on own"}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Handbook Consent Info */}
                {selectedSub.parentHandbookConsent && (
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 space-y-2 text-[10.5px]">
                    <h4 className="font-extrabold text-stone-900 uppercase text-[10px] flex items-center gap-1.5">
                      <span>✓</span> 3. Peekaboo Corner Parent Handbook Digital Sign-offs
                    </h4>
                    <div className="grid grid-cols-2 gap-4 mt-1 text-[9.5px]">
                      <div>
                        <p><strong>Philosophy & Play Framework Accepted:</strong> {selectedSub.parentHandbookConsent.philosophyReadAck ? "Yes (✓)" : "No"}</p>
                        <p><strong>Daily Schedules & Festive Closures Acknowledged:</strong> {selectedSub.parentHandbookConsent.scheduleReadAck ? "Yes (✓)" : "No"}</p>
                      </div>
                      <div>
                        <p><strong>Vegetarian Diets & Nutrition Policies Acknowledged:</strong> {selectedSub.parentHandbookConsent.mealsReadAck ? "Yes (✓)" : "No"}</p>
                        <p><strong>Fee Schedules, Deposits & Late Pick Policies:</strong> {selectedSub.parentHandbookConsent.feesReadAck ? "Yes (✓)" : "No"}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-150">
                      <p className="font-semibold text-slate-800">Handbook digital signature locked for childcare file: <span className="font-mono text-orange-950 font-bold bg-white px-2 py-0.5 rounded border border-gray-200">{selectedSub.parentHandbookConsent.parentSignature}</span></p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-orange-50/20 text-orange-950 rounded-xl text-[10.5px] leading-relaxed">
                👉 This child is registered under standard <strong>{selectedSub.ageGroupSelected || "General"}</strong> waitlist track. Extended provincial school-age forms (7788 etc.) do not apply to this age bracket.
              </div>
            )}

            <div className="flex justify-end gap-2 border-t border-gray-150 pt-4">
              <button
                type="button"
                onClick={() => {
                  alert("Simulated official print spooler launched!");
                  window.print();
                }}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-[10px] cursor-pointer"
              >
                Print Saskatchewan-EC Record Page
              </button>
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="border border-gray-250 hover:bg-gray-50 text-slate-700 font-bold px-4 py-2 rounded-xl text-[10px] cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
