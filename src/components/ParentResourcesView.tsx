import React, { useState } from "react";
import { Download, FileText, CheckCircle, ShieldAlert, FileMinus, Award, ChevronRight } from "lucide-react";

export default function ParentResourcesView() {
  const [selectedMedForm, setSelectedMedForm] = useState({
    childName: "",
    dob: "",
    medication: "",
    dosage: "",
    schedule: "Once Daily",
    agreed: false
  });
  const [showFormOutput, setShowFormOutput] = useState(false);
  const [selectedDocKey, setSelectedDocKey] = useState("handbook");

  const resourceFiles = [
    { name: "Peekaboo Parent Handbook 2026.pdf", desc: "Detailed breakdown of Regina policies, closures, parent fee grants, routines & clothing items.", size: "2.4 MB" },
    { name: "Saskatchewan Waitlist Rules & Grant Information.pdf", desc: "Government facts sheet regarding Parent Fee subsidies and direct program grants.", size: "1.1 MB" },
    { name: "Allergen Management & Dietary Policy.pdf", desc: "Detailed guide of our 100% vegetarian nut-free kitchen preparations.", size: "850 KB" },
    { name: "Emergency Contact Info & Handoff Policy.pdf", desc: "Required permissions and pickup authorization forms.", size: "720 KB" },
    { name: "Sample Year-End Childcare Tax Receipt.pdf", desc: "For Regina tax filing calculations under Saskatchewan childcare claims.", size: "450 KB" }
  ];

  const handleMedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedForm.childName || !selectedMedForm.medication || !selectedMedForm.agreed) {
      alert("Please fill in the child name, medication, and agree to the authorization check!");
      return;
    }
    setShowFormOutput(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16 pb-16">
      {/* 1. HEADER */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase font-extrabold text-[#FF724E] tracking-widest bg-orange-50 px-3 py-1 rounded-full">Parent Support hub</span>
        <h1 className="text-3xl font-extrabold text-gray-900">Resource & Document Centre</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-xs">
          Export immediate PDFs, submit medical requirements schedules, and inspect Saskatchewan licensed policy details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Resource PDF Downloads */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border-b border-gray-100 pb-3 mb-4 text-center lg:text-left">
            <h3 className="font-bold text-gray-900 text-sm">Downloadable Library</h3>
            <p className="text-[10px] text-gray-400">Click any document to start mock export.</p>
          </div>

          <div className="space-y-3.5">
            {resourceFiles.map((file, idx) => (
              <div 
                key={idx}
                onClick={() => alert(`Starting simulated download for ${file.name}`)}
                className="bg-white rounded-2xl p-4 border border-orange-50/50 shadow-xs hover:border-[#59C7F5] cursor-pointer hover:shadow-xs transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF724E] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs group-hover:text-[#59C7F5] transition-colors">{file.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">{file.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 text-right">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">{file.size}</span>
                  <span className="text-xs text-[#59C7F5] font-semibold mt-1 flex items-center gap-0.5">
                    Download <Download className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick notice banner */}
          <div className="bg-sky-50 text-sky-800 rounded-2xl p-4.5 border border-sky-100 text-xs flex gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0 text-[#59C7F5]" />
            <div>
              <h5 className="font-bold text-xs">Need Saskatchewan Tax Claim Assistance?</h5>
              <p className="text-[11px] text-sky-700/90 mt-1">
                Your year-end statements are compiled. Licensed childcare expenses qualify for substantial Provincial deductions. Check your Parent Portal invoices!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Smart Interactive Medication Authorization Submission Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6.5 shadow-sm border border-orange-50/20 space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="font-bold text-gray-900 text-sm">Interactive Medication Authorization Form</h3>
            <p className="text-[10px] text-gray-450">Saskatchewan licensing requires a signed schedule for any on-site medication.</p>
          </div>

          {!showFormOutput ? (
            <form onSubmit={handleMedSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Child's Name</label>
                  <input
                    type="text"
                    required
                    value={selectedMedForm.childName}
                    onChange={(e) => setSelectedMedForm({ ...selectedMedForm, childName: e.target.value })}
                    placeholder="e.g. Aarav Patel"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">DOB Date</label>
                  <input
                    type="date"
                    required
                    value={selectedMedForm.dob}
                    onChange={(e) => setSelectedMedForm({ ...selectedMedForm, dob: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] ... focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Medication Name</label>
                  <input
                    type="text"
                    required
                    value={selectedMedForm.medication}
                    onChange={(e) => setSelectedMedForm({ ...selectedMedForm, medication: e.target.value })}
                    placeholder="e.g. Ventolin / Claritin"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dosage Amount</label>
                  <input
                    type="text"
                    required
                    value={selectedMedForm.dosage}
                    onChange={(e) => setSelectedMedForm({ ...selectedMedForm, dosage: e.target.value })}
                    placeholder="e.g. 5ml / 1 pill"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Administration Schedule</label>
                <select
                  value={selectedMedForm.schedule}
                  onChange={(e) => setSelectedMedForm({ ...selectedMedForm, schedule: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#59C7F5] focus:bg-white"
                >
                  <option value="Once Daily (9:00 AM Circle Time)">Once Daily (9:00 AM Circle Time)</option>
                  <option value="Twice Daily (Lunch & Pickup)">Twice Daily (Lunch & Pickup)</option>
                  <option value="As Needed (with direct symptoms description)">As Needed (with direct symptoms description)</option>
                </select>
              </div>

              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="med-agree"
                  checked={selectedMedForm.agreed}
                  onChange={(e) => setSelectedMedForm({ ...selectedMedForm, agreed: e.target.checked })}
                  className="mt-1 h-4 w-4 text-[#FF724E] focus:ring-[#FF724E]"
                />
                <label htmlFor="med-agree" className="text-[11px] text-gray-500 leading-normal">
                  I hereby authorize licensed Peekaboo Corner Regina consultants to administer this specified dose to my child.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF724E] hover:bg-[#eb613d] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Assemble Signed Form PDF
              </button>
            </form>
          ) : (
            <div className="space-y-5 bg-[#EFF8EF]/60 p-5 rounded-2xl border border-emerald-100 text-center animate-pulse">
              <span className="text-3xl">📝</span>
              <h4 className="font-bold text-emerald-800 text-sm">Signed Medication Permission Generated!</h4>
              <div className="bg-white rounded-xl p-4 text-left border border-emerald-100 space-y-2 text-[11px] text-gray-700">
                <p><strong>Child:</strong> {selectedMedForm.childName}</p>
                <p><strong>DOB:</strong> {selectedMedForm.dob}</p>
                <p><strong>Medication:</strong> {selectedMedForm.medication} ({selectedMedForm.dosage})</p>
                <p><strong>Schedule:</strong> {selectedMedForm.schedule}</p>
                <p className="text-[10px] text-gray-400 italic">Signature: Authorized Client - Digital Token verified</p>
              </div>

              <button
                onClick={() => setShowFormOutput(false)}
                className="text-gray-500 hover:text-gray-900 text-xs font-bold underline"
              >
                Submit another authorization form &rarr;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. COOPERATIVE GOOGLE DOCS POLICY CHANNELS */}
      <div className="bg-white rounded-3xl p-6.5 shadow-xs border border-orange-50/30 space-y-6">
        <div className="border-b border-gray-105 pb-3">
          <span className="text-[9.5px] uppercase font-extrabold text-[#59C7F5] tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full">
            Synchronized Google Docs
          </span>
          <h3 className="font-extrabold text-gray-900 text-sm mt-1.5">Regina Childcare Regulatory Policies</h3>
          <p className="text-gray-450 text-[10.5px]">
            The following documentation registers are maintained directly on Google Docs. Select a handbook to pull live information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Docs Selector sidebar */}
          <div className="md:col-span-4 flex flex-col gap-2">
            {[
              {
                id: "handbook",
                title: "Peekaboo Parent Handbook 2026",
                desc: "Ministry ratios, Canada-Sask grants $217.50 flat fee outlines.",
                icon: "📘"
              },
              {
                id: "diet",
                title: "Dietary Allergen & Wholefood Guidelines",
                desc: "100% vegetarian nut-free kitchen preparations.",
                icon: "🥗"
              },
              {
                id: "nature",
                title: "Treaty 4 Ecological Nature Outings",
                desc: "Outdoor walks & ancestral territory learnings.",
                icon: "🌱"
              }
            ].map((doc) => (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedDocKey(doc.id);
                  // Dynamic status alert
                  alert(`Accessing Google Docs draft ID: ${doc.id === "handbook" ? "sask_handbook_doc_id" : doc.id === "diet" ? "dietary_allergen_doc_id" : "field_trip_consent_doc_id"}`);
                }}
                className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                  selectedDocKey === doc.id
                    ? "bg-orange-50/15 border-[#FF724E] text-orange-950"
                    : "bg-white border-gray-105 hover:border-gray-200 text-slate-650"
                }`}
              >
                <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                <div>
                  <h4 className="font-bold text-xs">{doc.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-normal font-normal">{doc.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Docs Render Target page */}
          <div className="md:col-span-8 bg-[#FAF9F5] border border-orange-100 rounded-2xl p-6.5 relative min-h-[240px] flex flex-col justify-between shadow-xs">
            {/* Page Ring visual element decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#49BCE6]"></div>
            
            <div className="space-y-4">
              <div className="border-b border-orange-50 pb-2.5">
                <h4 className="font-extrabold text-[#FF724E] text-xs uppercase tracking-wider">
                  📖 {selectedDocKey === "handbook" ? "Peekaboo Parent Handbook 2026" : selectedDocKey === "diet" ? "Allergen Management & Nutrition Policy" : "Treaty 4 Ecological Nature Outings"}
                </h4>
                <p className="text-[9px] text-gray-400 font-bold tracking-widest mt-0.5 uppercase">Google Workspace REST Source verified</p>
              </div>

              <div className="text-[11px] text-slate-700 leading-relaxed font-normal select-text whitespace-pre-line">
                {selectedDocKey === "handbook" ? (
                  `PEEKABOO CORNER REGINA CHILDCARE - REGULATION POLICY & HANDBOOK
Licensed Space Regulator SKU Code: SASK-PKB-4822
Treaty 4 Territory, Regina, Saskatchewan

1. REGULATORY LICENSING STATUS
Peekaboo Corner child care is certified by the Government of Saskatchewan Ministry of Education as a licensed facility. We operate under strict provincial staffing ratios:
- Infants (0-18m): 1 educator to 3 infants
- Toddlers (18-36m): 1 educator to 5 toddlers
- Preschoolers (3-5y): 1 educator to 10 preschoolers

2. CHILDFEE GRANT SUBSIDY STRUCTURE
Under the Canada-Wide Early Learning and Child Care Agreement, parents residing in Regina qualify for a provincial Parent Fee Grant. The flat rate fee for all full-time infant and toddler spaces is reduced to $217.50 per month. General billing invoices are issued on the 1st of each billing cycle.`
                ) : selectedDocKey === "diet" ? (
                  `PEEKABOO CORNER - DIETARY ALLERGEN & NUT-FREE COMPLIANCE GUIDELINES
Saskatchewan Ministry of Health Early Childhood Standards

Our kitchen prepares balanced, nutritionist-reviewed early developmental diets. The facility is verified:
- 100% Vegetarian (zero beef, poultry, fish, gelatin, or animal by-products)
- 100% Peanut-Free & Tree Nut-Free
- Wheat/Gluten Alternative options on daily call schedules.

Morning snack includes organic prairie-milled grains and fresh crop berries. Lunch emphasizes gentle legumes, red lentil dahl, and wild seeds to encourage healthy fiber intake. Afternoon snacks feature fresh fruit structures paired with Saskatchewan organic milk or soy bases.`
                ) : (
                  `PEEKABOO FIELD EXPEDITION CONSENT
Treaty 4 Ancestral Prairie Ecological Outing Track

I hereby authorize Peekaboo Corner educators to transport my child on guided ecological walks to Wascana Lake. We will observe indigenous prairie flowers, learn historical Treaty 4 teachings, and participate in low-impact nature play.

This program matches Saskatchewan Early Play frameworks highlighting outdoor nature and environmental gratitude. Parents will receive notice 24 hours prior to field trips.`
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-orange-50 flex justify-between items-center text-[9px] text-gray-400 font-bold uppercase tracking-wider select-none">
              <span>Verified Saskatchewan ECE Hub</span>
              <span className="text-[#59C7F5]">Synchronized to active cloud docs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
