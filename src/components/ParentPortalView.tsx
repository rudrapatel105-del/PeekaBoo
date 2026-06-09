import React, { useState } from "react";
import { Lock, User, CheckCircle, ShieldAlert, FileText, ArrowRight, Printer, Sparkles, Smile, Coffee } from "lucide-react";
import { LanguageCode, ChildPortfolio, ChildMilestone } from "../types";
import { INITIAL_PORTFOLIOS, MOCK_MENU } from "../data";

interface ParentPortalViewProps {
  lang: LanguageCode;
}

export default function ParentPortalView({ lang }: ParentPortalViewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "milestones" | "meals" | "receipts">("dashboard");

  // Load sample portfolio for Aarav Patel
  const samplePortfolio: ChildPortfolio = INITIAL_PORTFOLIOS[0];
  const [milestones, setMilestones] = useState<ChildMilestone[]>(samplePortfolio.milestones);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "parent" || password === "123456" || email.includes("@")) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid passcode! Try hint passcode: 'parent' for immediate access.");
    }
  };

  // Printable receipt mockup toggle
  const handlePrintReceipt = (month: string, amount: number) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Peekaboo Corner Regina Childcare Inc. - Tax Invoice Receipt</title>
            <style>
              body { font-family: 'Nunito', 'Segoe UI', Arial, sans-serif; padding: 40px; color: #2D3748; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #FF724E; padding-bottom: 20px; margin-bottom: 30px; }
              .header h2 { color: #FF724E; margin: 0; font-size: 24px; }
              .meta-box { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 13px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
              th, td { border: 1px solid #E2E8F0; padding: 12px; text-align: left; }
              th { background-color: #F8FAFC; color: #475569; }
              .total-box { text-align: right; margin-top: 20px; font-size: 16px; font-weight: bold; color: #22C55E; }
              .stamp { border: 3px dashed #22C55E; color: #22C55E; display: inline-block; padding: 5px 15px; font-weight: bold; transform: rotate(-5deg); margin-top: 20px; }
              .footer { text-align: center; font-size: 11px; color: #94A3B8; margin-top: 50px; border-top: 1px solid #E2E8F0; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>PEEKABOO CORNER REGINA CHILDCARE INC.</h2>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748B;">4822 Queen Street, Regina, SK, S4S 6V3 &bull; Licensed Spaces Grant Approved</p>
            </div>
            
            <div class="meta-box">
              <div>
                <strong>ISSUED TO:</strong><br/>
                Ravi Patel (Father)<br/>
                Student: Aarav Patel (Toddler room)<br/>
                Regina, SK
              </div>
              <div style="text-align: right;">
                <strong>RECEIPT DETAILS:</strong><br/>
                Invoice ID: PKB-${Math.floor(Math.random() * 90000 + 10000)}<br/>
                Billing Cycle: ${month} 2026<br/>
                Date: June 05, 2026
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Original Space Fee</th>
                  <th>Saskatchewan Parent Fee Grant Offset</th>
                  <th>Net Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Licensed full-time Toddler Childcare & 100% vegetarian nutrition</td>
                  <td>$950.00</td>
                  <td>-$732.50</td>
                  <td>$217.50</td>
                </tr>
              </tbody>
            </table>

            <div class="total-box">
              TOTAL YEAR-TO-DATE SASK TAX ELIGIBLE FEES PAID: $${amount.toFixed(2)} CAD
            </div>

            <div style="text-align: center;">
              <div class="stamp">FULLY PAID - SASK LICENSED</div>
            </div>

            <div class="footer">
              Approved provider registration under Canada-Saskatchewan Early Learning initiative. Preserve this document for your regional taxation returns.
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      alert("Please allow popups to open and print the tax receipt invoice!");
    }
  };

  // login screen
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-50/50 space-y-6 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#59C7F5] to-[#FF724E]"></div>
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF724E] mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Parent Portal Access</h1>
            <p className="text-xs text-gray-400">Review attendance logs, daily sheets, and print tax reduction invoices.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Parent Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ravi14patel@gmail.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Portal Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter parent passcode Hint: parent"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
              />
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-[10px] text-amber-800 leading-relaxed">
              <strong>Access Hint:</strong> Enter any email and passcode <strong>'parent'</strong> to access simulated student folders!
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF724E] hover:bg-[#e65e3a] text-white py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-wider cursor-pointer shadow-sm"
            >
              Sign In Securely &rarr;
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* PORTAL HEADER PROFILE CARD */}
      <div className="bg-gradient-to-r from-[#59C7F5] to-[#FF724E] rounded-3xl p-6.5 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white text-gray-800 flex items-center justify-center font-black text-2xl border-2 border-white/20 select-none">
            👱
          </div>
          <div>
            <h2 className="title-font text-lg font-bold">Welcome Back, Ravi Patel</h2>
            <p className="text-xs text-sky-105 flex items-center gap-1">
              Student Folder: <strong>Aarav Patel</strong> (Toddler playroom) | ID: REG-839210
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="text-xs font-semibold px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* PORTAL INNER TABS CONTROL */}
      <div className="flex gap-2 border-b border-gray-100 pb-3">
        {[
          { id: "dashboard", label: "📊 Day Sheets" },
          { id: "milestones", label: "🎯 Milestone Portfolio" },
          { id: "meals", label: "🥗 Active Menus" },
          { id: "receipts", label: "🧾 printable Receipts" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
              activeTab === tab.id
                ? "bg-[#FF724E] text-white"
                : "bg-white text-gray-500 hover:bg-orange-50/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABS INNER PAGES */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Daily reports parameters */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-5">
              <div className="border-b border-gray-100 pb-3 flex justify-between items-center bg-amber-50/5 p-3 rounded-lg">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Child's Daily Report Sheet</h3>
                  <p className="text-[10px] text-gray-400">Date: Friday June 5, 2026 | Compiled by Lead Educator Helena</p>
                </div>
                <span className="px-3 py-1 bg-green-105 text-emerald-800 border border-green-205 rounded-full text-[10px] font-bold uppercase">
                  Verified Complete
                </span>
              </div>

              {/* Day values metrics row */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-amber-50/20 p-3 rounded-xl border border-orange-100/30">
                  <Smile className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                  <p className="text-[10px] uppercase text-gray-400 font-bold">General Mood</p>
                  <p className="font-black text-xs text-gray-800 mt-0.5">Highly Cooperative</p>
                </div>
                <div className="bg-sky-50/20 p-3 rounded-xl border border-sky-100/30">
                  <p className="text-lg mx-auto mb-1.5">💤</p>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Nap Rest Duration</p>
                  <p className="font-black text-xs text-gray-800 mt-0.5">1h 45m (12:45 to 2:30)</p>
                </div>
                <div className="bg-rose-50/20 p-3 rounded-xl border border-rose-100/30">
                  <p className="text-lg mx-auto mb-1.5">🧻</p>
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Bathroom Checks</p>
                  <p className="font-black text-xs text-gray-800 mt-0.5">4 Potty Trips (Dry)</p>
                </div>
              </div>

              {/* Feedings detail */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-xs uppercase text-[#FF724E]">Nutrition intake report</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-gray-700 leading-normal">
                  <div className="bg-[#FFFBF5] border border-orange-100/40 p-3 rounded-xl flex gap-2.5">
                    <span className="text-lg">🥣</span>
                    <div>
                      <p className="font-semibold text-gray-800">Breakfast (08:30 AM)</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Porridge & wild blueberries: Cleared entire plate!</p>
                    </div>
                  </div>
                  <div className="bg-[#EFF8EF]/50 border border-emerald-100 p-3 rounded-xl flex gap-2.5">
                    <span className="text-lg">🍲</span>
                    <div>
                      <p className="font-semibold text-gray-800">Lunch (11:45 AM)</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Red Lentil Dahl & side rice: Cleared 1.5 portions!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning highlight */}
              <div className="space-y-2 text-xs text-gray-650">
                <h4 className="font-semibold text-gray-805 text-xs uppercase text-[#59C7F5]">Day Enrichment activity</h4>
                <p className="leading-relaxed">
                  Aarav was extremely helpful during morning circle. He correctly selected the 'Cree seasonal rain sticker' to describe Regina's morning precipitation! In the art studio, he cooperated wonderfully with Chloé, sharing modeling clay blocks peacefully of his own volition.
                </p>
              </div>
            </div>
          </div>

          {/* Right side: quick stats milestones progress & quick alerts checks */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6.5 shadow-sm border border-orange-50/20 space-y-4">
              <h4 className="font-bold text-gray-900 text-sm">Portfolio Summary Overview</h4>
              
              <div className="space-y-3.5">
                {samplePortfolio.summaries.map((sum, idx) => (
                  <div key={idx} className="bg-orange-50/10 p-3 rounded-xl border border-orange-55 space-y-2 text-xs text-gray-700">
                    <p className="font-black text-[10px] text-[#FF724E] uppercase">{sum.month}</p>
                    <p className="leading-relaxed italic text-[11px]">"{sum.text}"</p>
                    <p className="text-[9px] text-gray-400 font-semibold uppercase">{sum.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "milestones" && (
        <div className="bg-white rounded-3xl p-6.5 shadow-sm border border-orange-50/20 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900">Child's Continuous Development Portfolio</h3>
            <p className="text-[10px] text-gray-400">Verifiably logged milestones matching early childhood standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((mil, idx) => (
              <div key={idx} className="bg-[#FFFBF5]/70 border border-orange-100/30 rounded-2xl p-4.5 flex gap-4.5">
                <div className="text-3xl">🏅</div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase text-[#59C7F5] bg-sky-50 px-2 py-0.5 rounded-md">
                      {mil.category}
                    </span>
                    <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md ${
                      mil.status === "Mastered" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {mil.status}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-gray-800 text-sm leading-tight">{mil.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-normal">{mil.notes}</p>
                  <p className="text-[9px] text-gray-400 uppercase font-semibold">Date Logged: {mil.achievedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "meals" && (
        <div className="bg-white rounded-3xl p-6.5 shadow-sm border border-orange-50/20 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-gray-900">Weekly Regina Childcare Menu</h3>
              <p className="text-[10px] text-gray-400">100% Healthy Vegetarian nutrition & Nut-Free.</p>
            </div>
            <button 
              onClick={() => alert("Simulating weekly dietary program PDF download!")}
              className="text-[#FF724E] border border-orange-100 hover:bg-orange-50 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all"
            >
              Export Monthly Menu PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700 border-collapse">
              <thead>
                <tr className="bg-[#FFFBF5]">
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-400">Day</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-450">Breakfast (8:30)</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-450">Morning Snack (10:15)</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-450">Lentil Kitchen Lunch (11:45)</th>
                  <th className="p-3 border border-orange-50 text-[10px] uppercase font-bold text-gray-450">PM Snack (3:15)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                {MOCK_MENU.days.map((row, idx) => (
                  <tr key={idx} className="hover:bg-orange-50/10">
                    <td className="p-3 border border-orange-50 font-bold text-gray-900 font-sans">{row.day}</td>
                    <td className="p-3 border border-orange-50 font-normal">{row.breakfast}</td>
                    <td className="p-3 border border-orange-50 font-normal">{row.morningSnack}</td>
                    <td className="p-3 border border-orange-50 font-bold text-orange-950 font-sans">{row.lunch}</td>
                    <td className="p-3 border border-orange-50 font-normal">{row.afternoonSnack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "receipts" && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50/20 space-y-6">
          <div>
            <h3 className="font-bold text-gray-900">Billing History & Year-End Tax Receipts</h3>
            <p className="text-[10px] text-gray-400">Review government parent fee grant deductions and export certified receipts.</p>
          </div>

          <div className="space-y-4">
            {[
              { month: "June 2026", originalFee: 950.0, rebate: 732.5, netPaid: 217.5 },
              { month: "May 2026", originalFee: 950.0, rebate: 732.5, netPaid: 217.5 },
              { month: "April 2026", originalFee: 950.0, rebate: 732.5, netPaid: 217.5 }
            ].map((inv, idx) => {
              const amountAccum = (idx + 1) * 217.5;
              return (
                <div key={idx} className="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-xs border border-gray-100">
                  <div className="space-y-2">
                    <p className="font-bold text-gray-800 text-sm leading-tight">{inv.month} Childcare Invoice</p>
                    <div className="grid grid-cols-3 gap-6 text-[11px] text-gray-500 font-normal">
                      <p>Full Base Fee: <strong className="text-gray-700">${inv.originalFee.toFixed(2)}</strong></p>
                      <p>Sask Grant Subsidy: <strong className="text-rose-500">-${inv.rebate.toFixed(2)}</strong></p>
                      <p>Net Parent paid: <strong className="text-emerald-500">${inv.netPaid.toFixed(2)}</strong></p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePrintReceipt(inv.month, amountAccum)}
                    className="bg-[#59C7F5] hover:bg-[#3bb0e3] text-white px-4.5 py-2.5 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-sm ml-auto md:ml-0"
                  >
                    Print Tax Receipt <Printer className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
