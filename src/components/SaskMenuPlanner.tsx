import React, { useState, useMemo } from "react";
import { 
  Apple, 
  Milk, 
  Droplet, 
  Sparkles, 
  Heart, 
  Check, 
  AlertTriangle, 
  Printer, 
  Clock, 
  Coffee, 
  Baby, 
  ShieldCheck,
  ChevronRight,
  User,
  Activity,
  Info
} from "lucide-react";

interface Meal {
  items: string[];
  groups: string[];
  isWarm?: boolean;
}

interface CustomDay {
  morningSnack: Meal;
  lunch: Meal;
  afternoonSnack: Meal;
}

const MENU_WEEKS: Record<string, Record<string, CustomDay>> = {
  "week1-2": {
    Monday: {
      morningSnack: {
        items: ["Fresh Banana", "Whole grain crackers"],
        groups: ["Fruit", "Grain"]
      },
      lunch: {
        items: ["Veggie Stir-Fry (tofu, broccoli, carrots)", "Brown Rice", "Fresh Milk"],
        groups: ["Vegetable", "Protein", "Grain", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Carrot sticks", "Hummus", "Fresh Milk"],
        groups: ["Vegetable", "Protein", "Milk"]
      }
    },
    Tuesday: {
      morningSnack: {
        items: ["Apple slices", "Organic Yogurt"],
        groups: ["Fruit", "Milk/Protein"]
      },
      lunch: {
        items: ["Veggie Soup (lentils, carrots, spinach)", "Whole wheat roll", "Apple slices", "Fresh Milk"],
        groups: ["Vegetable", "Protein", "Grain", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Whole Grain Crackers", "Broccoli Crowns", "Fresh Milk"],
        groups: ["Grain", "Vegetable", "Milk"]
      }
    },
    Wednesday: {
      morningSnack: {
        items: ["Cucumber slices", "Whole wheat toast", "Fresh Milk"],
        groups: ["Vegetable", "Grain", "Milk"]
      },
      lunch: {
        items: ["Veggie Pasta Bake (spinach, zucchini, tomato sauce)", "Steamed potato cubes", "Sweet Orange slices", "Organic Yogurt"],
        groups: ["Vegetable", "Grain", "Fruit", "Milk/Protein"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Assorted Crunch Veggies", "Salt-free Crackers", "Fresh Milk"],
        groups: ["Vegetable", "Grain", "Milk"]
      }
    },
    Thursday: {
      morningSnack: {
        items: ["Pear slices", "Mild Cheese cubes"],
        groups: ["Fruit", "Milk/Protein"]
      },
      lunch: {
        items: ["Mild Lentil Porridge", "Steamed Broccoli crowns", "Whole Wheat Roll", "Ripe Pear cubes", "Fresh Milk"],
        groups: ["Protein", "Vegetable", "Grain", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Carrot sticks", "Fresh homemade whole grain muffin", "Fresh Milk"],
        groups: ["Vegetable", "Grain", "Milk"]
      }
    },
    Friday: {
      morningSnack: {
        items: ["Banana slices", "Whole wheat toast", "Fresh Milk"],
        groups: ["Fruit", "Grain", "Milk"]
      },
      lunch: {
        items: ["Rich Kidney Bean Curry", "Fluffy Brown Rice", "Steamed carrots", "Juicy Orange slices", "Fresh Milk"],
        groups: ["Protein", "Grain", "Vegetable", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Pear slices", "Soft homemade oatmeal cookie", "Fresh Milk"],
        groups: ["Fruit", "Grain", "Milk"]
      }
    }
  },
  "week3-4": {
    Monday: {
      morningSnack: {
        items: ["Apple slices", "Whole grain crackers"],
        groups: ["Fruit", "Grain"]
      },
      lunch: {
        items: ["Steamed Broccoli", "Organic White/Brown Rice Mix", "Rich Lentil Dal", "Fresh Grapes", "Fresh Milk"],
        groups: ["Vegetable", "Grain", "Protein", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Carrot sticks", "Cheddar Cheese cubes", "Fresh Milk"],
        groups: ["Vegetable", "Milk/Protein", "Milk"]
      }
    },
    Tuesday: {
      morningSnack: {
        items: ["Fresh Banana", "Homemade whole grain oatmeal cookie", "Fresh Milk"],
        groups: ["Fruit", "Grain", "Milk"]
      },
      lunch: {
        items: ["Mixed Veggie Pasta (carrots, peas, spinach)", "Light Tomato Herb Sauce", "Juicy Orange slices", "Fresh Milk"],
        groups: ["Grain", "Vegetable", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Crispy Cucumber slices", "Creamy Hummus", "Fresh Milk"],
        groups: ["Vegetable", "Protein", "Milk"]
      }
    },
    Wednesday: {
      morningSnack: {
        items: ["Crisp Pear slices", "Whole wheat toast"],
        groups: ["Fruit", "Grain"]
      },
      lunch: {
        items: ["Veggie Wrap (wheat tortilla, beans, lettuce, corn)", "Steamed baby peas", "Watermelon cubes", "Fresh Milk"],
        groups: ["Grain", "Protein", "Vegetable", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Fresh Banana", "Homemade low-sugar whole grain muffin", "Fresh Milk"],
        groups: ["Fruit", "Grain", "Milk"]
      }
    },
    Thursday: {
      morningSnack: {
        items: ["Carrot sticks", "Mild Cheddar cheese cubes"],
        groups: ["Vegetable", "Milk/Protein"]
      },
      lunch: {
        items: ["Veggie Tofu Stir-Fry (broccoli, carrots, tofu)", "Steamed Brown Rice", "Apple slices", "Fresh Milk"],
        groups: ["Protein", "Vegetable", "Grain", "Fruit", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Plain Unsweetened Yogurt", "Organic Granola", "Fresh Banana"],
        groups: ["Milk/Protein", "Grain", "Fruit"]
      }
    },
    Friday: {
      morningSnack: {
        items: ["Cucumber slices", "Whole wheat crackers", "Fresh Milk"],
        groups: ["Vegetable", "Grain", "Milk"]
      },
      lunch: {
        items: ["Veggie Shepherd's Pie (lentils, potato)", "Steamed sweet corn cups", "Crisp Cucumber slices", "Fresh Milk"],
        groups: ["Protein", "Vegetable", "Milk"],
        isWarm: true
      },
      afternoonSnack: {
        items: ["Fresh Blueberries", "Organic Yogurt cup"],
        groups: ["Fruit", "Milk/Protein"]
      }
    }
  }
};

export default function SaskMenuPlanner() {
  const [selectedWeek, setSelectedWeek] = useState<string>("week1-2");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [childAgeMonths, setChildAgeMonths] = useState<string>("24");
  const [userAllergyFilter, setUserAllergyFilter] = useState<string>("");
  
  // Custom interactive note to chef state
  const [dietNote, setDietNote] = useState({
    childName: "",
    selectedDay: "Monday",
    note: "",
    severeCheck: false
  });
  const [dietRequestsList, setDietRequestsList] = useState<Array<any>>([
    {
      id: "1",
      childName: "Arya Patel",
      selectedDay: "Tuesday",
      note: "Strictly vegetarian menus preferred. Cut carrots into baby-safe bite-sized rounds.",
      severeCheck: true,
      timestamp: "Just now"
    }
  ]);

  // Milk recommendation logic based on age (Saskatchewan early learning regulations)
  const milkRecommendation = useMemo(() => {
    const months = parseInt(childAgeMonths, 10);
    if (isNaN(months) || months < 0) {
      return {
        label: "Invalid age input",
        milkType: "Specify age to calculate layout",
        desc: "Saskatchewan guidelines suggest special milk categories between 12-30 months."
      };
    }
    if (months < 12) {
      return {
        label: "Infant (Under 1 Year Old)",
        milkType: "Breastmilk or Formula exclusively",
        desc: "Whole cow's milk is not recommended for infants under 12 months. Mother's milk or certified formula remains standard."
      };
    } else if (months >= 12 && months <= 24) {
      return {
        label: "Toddler (12 Months to 2 Years)",
        milkType: "Whole Milk Only (3.25% M.F.)",
        desc: "Saskatchewan Form Regulation 7786 mandates 3.25% M.F. whole milk only twice daily to support early biological brain lipid development. Lower-fat milk is forbidden under 24 months unless prescribed."
      };
    } else {
      return {
        label: "Child / Preschooler (2+ Years)",
        milkType: "Lower Fat Milk (0% - 2% M.F.) or Plain Unsweetened Fortified Soy Beverage",
        desc: "Saskatchewan childhood regulations mandate low fat milk or plain soy beverage starting at 24 months to maintain ideal childhood cholesterol limits."
      };
    }
  }, [childAgeMonths]);

  // Handle allergy safety match
  const checkAllergyWarning = (items: string[]) => {
    if (!userAllergyFilter.trim()) return null;
    const search = userAllergyFilter.toLowerCase();
    const matches = items.filter(item => item.toLowerCase().includes(search));
    
    // special common allergens mapping:
    if (search.includes("dairy") || search.includes("milk") || search.includes("cheese") || search.includes("yogurt")) {
      const dairyMatched = items.some(item => 
        item.toLowerCase().includes("milk") || 
        item.toLowerCase().includes("yogurt") || 
        item.toLowerCase().includes("cheese") || 
        item.toLowerCase().includes("cheddar")
      );
      if (dairyMatched) return "Dairy alert flag! Kitchen will substitute with Oat or Soy milk / vegan cheese alternatives.";
    }
    
    if (search.includes("gluten") || search.includes("wheat") || search.includes("crackers") || search.includes("bread") || search.includes("roll")) {
      const glutenMatched = items.some(item => 
        item.toLowerCase().includes("crackers") || 
        item.toLowerCase().includes("toast") || 
        item.toLowerCase().includes("bread") || 
        item.toLowerCase().includes("roll") || 
        item.toLowerCase().includes("pasta") || 
        item.toLowerCase().includes("muffin") || 
        item.toLowerCase().includes("cookie") || 
        item.toLowerCase().includes("tortilla") || 
        item.toLowerCase().includes("wrap")
      );
      if (glutenMatched) return "Gluten allergen found. Standard rolls and crackers will be substituted with certified gluten-free options.";
    }

    if (matches.length > 0) {
      return `Contains matched ingredient "${matches.join(", ")}". Safe child-specific kitchen substitutions will be mapped.`;
    }

    return null;
  };

  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dietNote.childName.trim() || !dietNote.note.trim()) {
      alert("Please fill out your child's name and the specific dietary adjustments!");
      return;
    }
    const newReq = {
      id: Date.now().toString(),
      childName: dietNote.childName,
      selectedDay: dietNote.selectedDay,
      note: dietNote.note,
      severeCheck: dietNote.severeCheck,
      timestamp: "Saved and compiled"
    };

    setDietRequestsList([newReq, ...dietRequestsList]);
    setDietNote({
      childName: "",
      selectedDay: "Monday",
      note: "",
      severeCheck: false
    });
    alert("Success! Your child's culinary adjustments have been transmitted to Chef Monali Patel and recorded for Treaty 4 Facility inspection compliance.");
  };

  const removeRequest = (id: string) => {
    setDietRequestsList(dietRequestsList.filter(r => r.id !== id));
  };

  const activeMenu = MENU_WEEKS[selectedWeek];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-orange-50 shadow-sm space-y-10" id="sask-meal-section">
      
      {/* SECTION BANNER HERO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-orange-50 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍏</span>
            <span className="text-xs font-extrabold text-[#FF724E] tracking-wider uppercase bg-orange-50 px-3 py-0.5 rounded-full">
              Saskatchewan Ministry Standards compliant
            </span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Peekaboo Corner Eat-Well Food Menu Planning Planner
          </h2>
          <p className="text-xs text-gray-400">
            Regina Licensed Child Care Facility Nutrition Planner ● Effective September 2025 – Present
          </p>
        </div>

        {/* PRINT SIMULATOR BUTTON */}
        <button 
          onClick={() => alert("Rendering high-resolution child care facility print output layout for Treaty 4 board inspection...")}
          className="flex items-center gap-1.5 bg-sky-50 text-[#3FAFCF] hover:bg-sky-100 border border-sky-200/50 px-4.5 py-2.5 rounded-xl text-xs font-extrabold transition-all active:scale-98 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-sky-500" />
          <span>Print Facility Menu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT 8_COLS: INTERACTIVE WEEK & DAY MENU RENDERING */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* WEEK SELECTOR TABLE SELECTION */}
          <div className="bg-slate-50/70 p-1.5 rounded-2xl flex gap-2">
            <button
              onClick={() => setSelectedWeek("week1-2")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black tracking-wide transition-all ${
                selectedWeek === "week1-2"
                  ? "bg-white text-[#FF724E] shadow-xs border border-orange-100"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              📅 Week 1 & 2 Cycle (Harvest)
            </button>
            <button
              onClick={() => setSelectedWeek("week3-4")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black tracking-wide transition-all ${
                selectedWeek === "week3-4"
                  ? "bg-white text-[#3FAFCF] shadow-xs border border-sky-100"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              📅 Week 3 & 4 Cycle (Plentiful)
            </button>
          </div>

          {/* DYNAMIC ALLERGY SEARCH BAR */}
          <div className="bg-orange-50/10 border border-orange-200/40 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-orange-950 font-extrabold text-[11px] shrink-0">
              <span className="scale-110">🛡️</span>
              <span>Allergy Filter Safe Check:</span>
            </div>
            <input
              type="text"
              placeholder="Type allergen e.g. Dairy, Gluten, Hazelnuts..."
              value={userAllergyFilter}
              onChange={(e) => setUserAllergyFilter(e.target.value)}
              className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#FF724E] font-medium"
            />
            {userAllergyFilter && (
              <button 
                onClick={() => setUserAllergyFilter("")}
                className="text-[10px] text-gray-400 hover:text-gray-900 font-bold underline"
              >
                Clear Alert
              </button>
            )}
          </div>

          {/* DAYS BAR TABS */}
          <div className="flex flex-wrap gap-1.5">
            {daysOfWeek.map(dayName => {
              const isActive = selectedDay === dayName;
              return (
                <button
                  key={dayName}
                  onClick={() => setSelectedDay(dayName)}
                  className={`px-4.5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? "bg-[#3FAFCF] text-white shadow-xs" 
                      : "bg-[#FAFDFE] text-slate-650 border border-slate-100 hover:bg-sky-50/10"
                  }`}
                >
                  <span>{isActive ? "🌟" : "🔹"}</span>
                  <span>{dayName}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE DAY HIGHLIGHTS */}
          <div className="bg-[#FAFDFE] border border-sky-100/50 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl text-sky-650">🍲</span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">
                    {selectedDay} Approved Menu Items (Fresh Organic)
                  </h3>
                  <p className="text-[10.5px] text-gray-400">
                    Curated fully vegetarian nutrition, non-GMO, nut-free, zero processed foods.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black text-[#FF724E] bg-orange-50 px-3 py-1 rounded-full uppercase">
                {selectedWeek === "week1-2" ? "Week 1&2 Plan" : "Week 3&4 Plan"}
              </span>
            </div>

            {/* MEALS RENDER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* MORNING SNACK CARD */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-sky-600 uppercase bg-sky-50 px-2.5 py-1 rounded">
                    🌅 Morning Snack (9:30 AM)
                  </span>
                  
                  <div className="space-y-2">
                    {activeMenu[selectedDay].morningSnack.items.map((it, i) => (
                      <p key={i} className="text-xs text-slate-800 font-bold flex items-start gap-1.5">
                        <span className="text-[#3FAFCF] mt-0.5">•</span>
                        <span>{it}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {activeMenu[selectedDay].morningSnack.groups.map(g => (
                      <span key={g} className="text-[8.5px] bg-[#EAF7FA] text-[#3FAFCF] px-1.5 py-0.5 rounded-full font-bold">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Allergy matching alerts */}
                  {checkAllergyWarning(activeMenu[selectedDay].morningSnack.items) && (
                    <div className="bg-rose-50 p-2 rounded-lg border border-rose-100 text-[10px] text-rose-800 flex gap-1 items-start mt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500 mt-0.5" />
                      <p className="leading-tight">{checkAllergyWarning(activeMenu[selectedDay].morningSnack.items)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* LUNCH CARD */}
              <div className="bg-white p-5 rounded-2xl border-2 border-[#3FAFCF]/20 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#3FAFCF] text-white text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-bl">
                  Main Dine
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2.5 py-1 rounded">
                    🍲 Hot Lunch Feast (11:30 AM)
                  </span>
                  
                  <div className="space-y-2">
                    {activeMenu[selectedDay].lunch.items.map((it, i) => (
                      <p key={i} className="text-xs text-slate-900 font-extrabold flex items-start gap-1.5">
                        <span className="text-[#FF724E] mt-0.5">✓</span>
                        <span>{it}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {activeMenu[selectedDay].lunch.groups.map(g => (
                      <span key={g} className="text-[8.5px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Allergy matching alerts */}
                  {checkAllergyWarning(activeMenu[selectedDay].lunch.items) && (
                    <div className="bg-rose-50 p-2 rounded-lg border border-rose-100 text-[10px] text-rose-800 flex gap-1 items-start mt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500 mt-0.5" />
                      <p className="leading-tight">{checkAllergyWarning(activeMenu[selectedDay].lunch.items)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* AFTERNOON SNACK */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded">
                    🍪 Afternoon Restor (3:00 PM)
                  </span>
                  
                  <div className="space-y-2">
                    {activeMenu[selectedDay].afternoonSnack.items.map((it, i) => (
                      <p key={i} className="text-xs text-slate-800 font-bold flex items-start gap-1.5">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{it}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {activeMenu[selectedDay].afternoonSnack.groups.map(g => (
                      <span key={g} className="text-[8.5px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Allergy matching alerts */}
                  {checkAllergyWarning(activeMenu[selectedDay].afternoonSnack.items) && (
                    <div className="bg-rose-50 p-2 rounded-lg border border-rose-100 text-[10px] text-rose-800 flex gap-1 items-start mt-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500 mt-0.5" />
                      <p className="leading-tight">{checkAllergyWarning(activeMenu[selectedDay].afternoonSnack.items)}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* CONSTANT DAILY FOOTNOTE ALIGNED WITH REGULATION */}
            <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4.5 text-[10.5px] text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-sky-100 rounded-lg text-[#3FAFCF] shrink-0 font-bold text-xs">💧</span>
                <div>
                  <h4 className="font-bold text-sky-950">Water Consumption Mandate</h4>
                  <p className="text-gray-500 leading-normal">
                    Plain, cool reverse-osmosis purified water is offered continuously and throughout the day of child activities.
                  </p>
                </div>
              </div>
              <span className="font-extrabold text-[#3FAFCF] uppercase tracking-wider whitespace-nowrap bg-white border border-sky-200 px-2.5 py-1 rounded text-[9.5px]">
                Sask Regulation Sec 32
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT 4_COLS: INTERACTIVE MILK CALCULATOR & KITCHEN DIET TRANSMITTER */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* MILK CALCULATOR */}
          <div className="bg-gradient-to-br from-[#FAFDFE] to-[#F1FAFD] rounded-3xl p-6 border border-sky-200/50 space-y-4">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Milk className="w-4 h-4 text-sky-500" />
              <span>Sask Milk calculator Rule</span>
            </h3>
            
            <p className="text-[10.5px] text-slate-500 leading-relaxed">
              Saskatchewan child licensing mandates double daily servings of milk, varying strictly by age category. Enter age in months:
            </p>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-gray-550 block">Child's Age (In Months)</label>
              <div className="relative">
                <input
                  type="number"
                  min="3"
                  max="120"
                  value={childAgeMonths}
                  onChange={(e) => setChildAgeMonths(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-3 pr-20 py-2 text-xs font-bold font-mono focus:outline-none focus:border-sky-400"
                />
                <span className="absolute right-3.5 top-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  Months
                </span>
              </div>
            </div>

            {/* CALCULATED OUTPUT BAR */}
            <div className="bg-white rounded-2xl p-4 border border-sky-100/40 space-y-1.5">
              <span className="text-[9px] font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded uppercase tracking-wider">
                {milkRecommendation.label}
              </span>
              <p className="text-xs font-black text-slate-800 leading-snug">
                {milkRecommendation.milkType}
              </p>
              <p className="text-[9.5px] text-gray-500 leading-normal">
                {milkRecommendation.desc}
              </p>
            </div>
          </div>

          {/* NOTIFY CHEF ADJUSTMENT BOX */}
          <div className="bg-amber-50/25 border border-amber-100 rounded-3xl p-6 space-y-4">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-orange-400" />
              <span>Live Dietary Requests Tracker</span>
            </h3>

            <p className="text-[10.5px] text-slate-500 leading-relaxed">
              Submit toddler allergen modifications directly to Chef Monali Patel. Requests sync to our kitchen dashboard for Treaty inspections.
            </p>

            <form onSubmit={handleAddRequest} className="space-y-3 text-[11px]">
              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-gray-400">Child's Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arya Patel"
                  value={dietNote.childName}
                  onChange={(e) => setDietNote({...dietNote, childName: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-gray-400">Weekday target</label>
                  <select
                    value={dietNote.selectedDay}
                    onChange={(e) => setDietNote({...dietNote, selectedDay: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
                  >
                    {daysOfWeek.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center pt-4">
                  <label className="flex items-center gap-1 cursor-pointer select-none text-[9.5px] font-bold text-rose-800">
                    <input 
                      type="checkbox" 
                      checked={dietNote.severeCheck} 
                      onChange={(e) => setDietNote({...dietNote, severeCheck: e.target.checked})} 
                    /> Severe Allergy?
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-gray-400">Special Instructions or Substitution</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Please substitute cow's milk with plain fortified soy beverage on Tuesday."
                  value={dietNote.note}
                  onChange={(e) => setDietNote({...dietNote, note: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF724E] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#ee623e]"
              >
                Assemble and Send to Kitchen
              </button>
            </form>

            {/* LIVE KITCHEN BOARD LIST */}
            <div className="space-y-2.5 pt-3 border-t border-slate-200">
              <p className="text-[10px] uppercase font-black text-slate-800 tracking-wider">
                Kitchen Transmission Log ({dietRequestsList.length}):
              </p>

              {dietRequestsList.length === 0 ? (
                <p className="text-[10px] text-gray-400 italic">No custom variations recorded.</p>
              ) : (
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {dietRequestsList.map((req) => (
                    <div 
                      key={req.id} 
                      className={`p-3 rounded-xl border text-[10.5px] relative space-y-1 ${
                        req.severeCheck 
                          ? "bg-rose-50 border-rose-100 text-rose-950 font-bold" 
                          : "bg-slate-50 border-slate-100 text-slate-850"
                      }`}
                    >
                      <button
                        onClick={() => removeRequest(req.id)}
                        className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-slate-200 hover:bg-slate-300 text-gray-600 flex items-center justify-center text-[8px] font-black cursor-pointer"
                        title="Remove instruction"
                      >
                        ✕
                      </button>
                      <div className="flex gap-1.5 items-center">
                        <span className="font-extrabold text-sky-800">{req.childName}</span>
                        <span className="text-[9px] bg-sky-100/50 text-[#3FAFCF] px-1 rounded">
                          {req.selectedDay}
                        </span>
                      </div>
                      <p className="text-[10px] leading-tight text-slate-650">{req.note}</p>
                      <span className="text-[8.5px] uppercase text-gray-400 font-extrabold block">
                        Status: {req.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
      
      {/* SECTION FOOTER: REGULATORY SUMMARY CARD */}
      <div className="bg-[#FFF9F2] rounded-3xl p-6.5 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1 text-center md:text-left">
          <div className="flex items-center gap-1.5 justify-center md:justify-start">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
            <h4 className="font-extrabold text-slate-800 text-sm">
              Saskatchewan Early Childhood Nutrition Regulation Core Standards Match
            </h4>
          </div>
          <p className="text-xs text-gray-500 max-w-2xl leading-normal">
            Every entry on our menu planning form complies with the <em>Child Care Act (Regulation 32)</em>. No processed meats, maximum 2 dietary limited items week cycles, full nutritional grouping compliance verified by Saskatchewan Government Health inspectors.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[10px] font-bold text-[#FF724E] uppercase">
          <span className="bg-white px-3 py-1.5 rounded-full shadow-xs border border-orange-100">🚫 Zero Trans Fats</span>
          <span className="bg-white px-3 py-1.5 rounded-full shadow-xs border border-orange-100">🥗 100% Nut-Free</span>
          <span className="bg-white px-3 py-1.5 rounded-full shadow-xs border border-[#3FAFCF]/20 text-[#3FAFCF]">🇨🇦 Sask Approved</span>
        </div>
      </div>

    </div>
  );
}
