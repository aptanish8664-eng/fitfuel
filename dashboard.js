// ===============================
// FITFUEL DASHBOARD SCRIPT (INTEGRATED)
// ===============================

// ---------- SECTIONS ----------
const sections = {
  home: `
  <div class="max-w-4xl mx-auto animation-fade-in">
    <h1 class="text-5xl font-bold mb-2">Hello, <span class="text-[#ccff00]">User</span>.</h1>
    <p class="text-zinc-400 mb-8">Let's optimize your biological parameters.</p>

    <div class="glass p-8 rounded-3xl border border-white/5 shadow-2xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold flex items-center gap-2">
          <i data-lucide="activity" class="text-[#ccff00]"></i> Calorie Calculator
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><p class="field-title">Goal</p><select id="goal" class="input"><option value="">Select Goal</option><option value="lose">Lose Fat</option><option value="maintain">Maintain</option><option value="gain">Gain Muscle</option></select></div>
        <div><p class="field-title">Gender</p><select id="gender" class="input"><option value="">Select Gender</option><option value="male">Male</option><option value="female">Female</option></select></div>
        <div><p class="field-title">Age</p><input id="age" type="number" placeholder="Years" class="input"></div>
        <div><p class="field-title">Height</p><input id="height" type="number" placeholder="cm" class="input"></div>
        <div><p class="field-title">Weight</p><input id="weight" type="number" placeholder="kg" class="input"></div>
        <div><p class="field-title">Activity</p><select id="activity" class="input"><option value="">Select Activity</option><option value="1.2">Sedentary (Office Job)</option><option value="1.375">Light Exercise</option><option value="1.55">Moderate Exercise</option><value="1.725">Athlete</option></select></div>
      </div>

      <button id="calc-btn" class="w-full mt-8 bg-[#ccff00] hover:bg-[#b3e600] text-black text-lg font-bold py-4 rounded-xl transition-transform hover:scale-[1.02]">
        INITIATE CALCULATION
      </button>

      <div id="calorie-result" class="mt-8"></div>
    </div>
  </div>
`,

  reports: `
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold mb-6 flex items-center gap-3">
        <span class="text-[#ccff00]">///</span> Medical Vault
      </h1>

      <div class="glass p-10 rounded-3xl text-center border-2 border-dashed border-zinc-700 hover:border-[#ccff00] transition-colors group">
        <i data-lucide="scan-line" class="w-16 h-16 mx-auto text-zinc-500 group-hover:text-[#ccff00] mb-4 transition-colors"></i>
        <h3 class="text-xl font-bold mb-2">Upload Medical Report</h3>
        <p class="text-zinc-400 text-sm mb-6">Supported formats: JPG, PNG, PDF</p>
        
        <input type="file" id="report-file" class="hidden" accept=".png,.jpg,.jpeg,.pdf" onchange="processReport(event)">
        <label for="report-file" class="relative z-20 bg-[#ccff00] hover:bg-[#b3e600] text-black px-8 py-3 rounded-full cursor-pointer font-bold transition-all">
          Select File
        </label>
      </div>

      <div id="scan-status" class="mt-6 text-center text-sm font-mono text-[#ccff00] animate-pulse"></div>
      <div id="ai-insight" class="mt-6 space-y-4"></div>
    </div>
  `,

  diet: `
  <div class="space-y-8 max-w-5xl mx-auto">
    <div class="flex justify-between items-end">
      <h1 class="text-4xl font-bold">Diet <span class="text-[#ccff00]">Protocol</span></h1>
    </div>

    <div id="diet-warning" class="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-red-200 hidden">
      <i data-lucide="alert-triangle" class="inline mr-2"></i> Please calculate your calories in Home first.
    </div>

    <div id="diet-content" class="hidden space-y-8">
      <div class="glass p-6 rounded-2xl flex items-center justify-between">
        <span class="text-zinc-400">Diet Preference</span>
        <select id="diet-type" class="bg-black text-white border border-zinc-700 px-4 py-2 rounded-lg outline-none focus:border-[#ccff00]">
          <option value="veg">Vegetarian</option>
          <option value="egg">Egg-etarian</option>
          <option value="nonveg">Non-Vegetarian</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass p-8 rounded-3xl relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10"><i data-lucide="pie-chart" class="w-24 h-24"></i></div>
          <p class="text-zinc-400 text-sm uppercase">Total Energy</p>
          <p id="diet-calories" class="text-5xl font-bold text-white mt-2 mb-6 racing-number"></p>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center"><span class="text-blue-400">Carbs</span><span id="carbs-g" class="font-mono text-xl">0</span></div>
            <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden"><div class="bg-blue-400 h-full w-[45%]"></div></div>
            
            <div class="flex justify-between items-center"><span class="text-[#ccff00]">Protein</span><span id="protein-g" class="font-mono text-xl">0</span></div>
            <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden"><div class="bg-[#ccff00] h-full w-[30%]"></div></div>

            <div class="flex justify-between items-center"><span class="text-orange-400">Fats</span><span id="fat-g" class="font-mono text-xl">0</span></div>
            <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden"><div class="bg-orange-400 h-full w-[25%]"></div></div>
          </div>
        </div>

        <div class="glass p-6 rounded-3xl flex items-center justify-center">
          <canvas id="macroChart"></canvas>
        </div>
      </div>

      <!-- MEAL PLAN -->
      <div class="glass p-8 rounded-3xl">
        <h3 class="text-xl font-bold text-[#ccff00] mb-6 flex items-center gap-2">
          <i data-lucide="utensils"></i> AI Generated Meal Plan
        </h3>
        <div id="meal-plan" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
      </div>
      
      <!-- FOOD GUIDANCE -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass p-6 rounded-2xl border-l-4 border-green-500 interactive-card">
          <h3 class="font-bold text-green-400 mb-4">Recommended Foods</h3>
          <div id="foods-prefer" class="text-sm text-zinc-300"></div>
        </div>
        <div class="glass p-6 rounded-2xl border-l-4 border-red-500 interactive-card">
          <h3 class="font-bold text-red-400 mb-4">Foods to Avoid</h3>
          <div id="foods-avoid" class="text-sm text-zinc-300"></div>
        </div>
      </div>
      
      <!-- DAILY MEAL PLAN (NON-AI FALLBACK) -->
      <div class="glass p-6 rounded-2xl hidden" id="fallback-meal-plan">
        <h3 class="text-xl font-bold text-[#ccff00] mb-4">Daily Meal Plan</h3>
        <div id="basic-meal-plan" class="space-y-4"></div>
      </div>
    </div>
  </div>
`,

  workout: `
  <div class="max-w-4xl mx-auto space-y-8">
    <h1 class="text-4xl font-bold">Training <span class="text-[#ccff00]">Matrix</span></h1>

    <!-- CATEGORY SELECTOR -->
    <div class="glass p-6 rounded-2xl flex items-center gap-4 interactive-card">
      <div class="bg-[#ccff00] p-3 rounded-full text-black"><i data-lucide="dumbbell"></i></div>
      <div class="flex-grow">
        <p class="text-zinc-400 text-xs uppercase">Current Focus</p>
        <select id="workout-type" class="bg-transparent text-xl font-bold text-white outline-none w-full cursor-pointer">
          <option value="calisthenics" class="text-black">Calisthenics (Bodyweight)</option>
          <option value="weights" class="text-black">Weight Training (Gym)</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- MAIN WORKOUT PLAN -->
      <div id="workout-plan" class="glass p-8 rounded-3xl border-t-4 border-[#ccff00] interactive-card">
        Select a workout category to see your plan.
      </div>
      
      <!-- SIDE SECTIONS -->
      <div class="space-y-6">
        <!-- CARDIO SECTION -->
        <div class="glass p-6 rounded-3xl interactive-card">
          <h3 class="text-[#ccff00] font-bold mb-3">Cardio Protocol</h3>
          <div id="cardio-plan" class="text-zinc-300 text-sm leading-relaxed"></div>
        </div>

        <!-- SAFETY CHECKS -->
        <div class="glass p-6 rounded-3xl border border-red-500/20 bg-red-500/5 interactive-card">
          <h3 class="text-red-400 font-bold mb-3 flex items-center gap-2">
            <i data-lucide="shield-alert"></i> Safety Checks
          </h3>
          <ul id="workout-warnings" class="list-disc pl-5 text-sm text-red-200/80"></ul>
        </div>
        
        <!-- SIMPLE WORKOUT FALLBACK -->
        <div class="glass p-6 rounded-3xl hidden" id="simple-workout">
          <h3 class="text-lg font-bold text-[#ccff00] mb-2">Workout Plan</h3>
          <div id="basic-workout-plan"></div>
        </div>
      </div>
    </div>
  </div>
`
};



const SUPABASE_URL = "https://emnvdclqlczohkfwkiph.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtbnZkY2xxbGN6b2hrZndraXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNTk5MDksImV4cCI6MjA4MjgzNTkwOX0._e9EMVtXDEtnRwkN654humZkLV63J5XrL9ZuqndVK6s"; // REPLACE with your Anon Key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 




// ---------- TAB SWITCH ----------
function switchTab(tab) {
  const display = document.getElementById("display");
  
  // Remove active class from all tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked tab
  const activeBtn = event?.target?.closest('.nav-btn') || document.querySelector(`[onclick*="${tab}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  // Fade animation
  display.style.opacity = '0';
  display.style.transition = 'opacity 0.3s';
  
  setTimeout(() => {
    display.innerHTML = sections[tab] || `<div class="text-red-500">Section not found</div>`;
    
    // Initialize the tab
    setTimeout(() => {
      if (tab === "home") initHome();
      if (tab === "reports") {
        restoreReport();
        // Re-attach file input event
        const fileInput = document.getElementById('report-file');
        if (fileInput) fileInput.onchange = processReport;
      }
      if (tab === "diet") setTimeout(initDiet, 100);
      if (tab === "workout") initWorkout();
      
      // Add interactive effects
      addGridAnimationToCards();
      addRacingNumbers();
      
      // Fade back in
      display.style.opacity = '1';
      
      // Refresh icons
      if (window.lucide) setTimeout(() => lucide.createIcons(), 50);
    }, 10);
    
  }, 300);
}

// ---------- HOME ----------
function initHome() {
  const calcBtn = document.getElementById("calc-btn");
  if (calcBtn) calcBtn.onclick = calculateCalories;
  
  setTimeout(() => {
    restoreProfile();
    enableAutoSave();
  }, 0);
}

async function calculateCalories() {
  const goal = document.getElementById("goal").value;
  const gender = document.getElementById("gender").value;
  const age = +document.getElementById("age").value;
  const height = +document.getElementById("height").value;
  const weight = +document.getElementById("weight").value;
  const activity = +document.getElementById("activity").value;
  const output = document.getElementById("calorie-result");

  if (!goal || !gender || !age || !height || !weight || !activity) {
    output.innerHTML = `<p class="text-red-500">Fill all fields.</p>`;
    return;
  }

  // BMR Calculation logic remains the same
  let bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  let calories = Math.round(bmr * activity);
  if (goal === "lose") calories -= 400;
  if (goal === "gain") calories += 300;

  // --- SUPABASE INTEGRATION ---
  const { data: { user } } = await supabase.auth.getUser(); // Get current user id

  const { error } = await supabase
    .from('profiles')
    .upsert({ 
      id: user.id, 
      goal, gender, age, height, weight, activity, calories,
      updated_at: new Date()
    });

  if (error) {
    console.error("Supabase Error:", error);
    output.innerHTML = `<p class="text-red-500">Error saving data.</p>`;
  } else {
    output.innerHTML = `
      <div class="p-6 bg-zinc-900 rounded-2xl interactive-card">
        <p class="text-zinc-400">Daily Calories (Synced to Cloud)</p>
        <p class="text-4xl font-bold text-[#ccff00] racing-number">${calories} kcal</p>
      </div>
    `;
    addRacingNumbers();
  }
}

async function restoreProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (data) {
    document.getElementById("goal").value = data.goal || "";
    document.getElementById("gender").value = data.gender || "";
    document.getElementById("age").value = data.age || "";
    document.getElementById("height").value = data.height || "";
    document.getElementById("weight").value = data.weight || "";
    document.getElementById("activity").value = data.activity || "";

    if (data.calories) {
      document.getElementById("calorie-result").innerHTML = `
        <div class="p-6 bg-zinc-900 rounded-2xl interactive-card">
          <p class="text-zinc-400">Daily Calories</p>
          <p class="text-4xl font-bold text-[#ccff00] racing-number">${data.calories} kcal</p>
        </div>
      `;
    }
  }
}

function enableAutoSave() {
  const fields = ["goal", "gender", "age", "height", "weight", "activity"];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("input", () => {
      const user = sessionStorage.getItem("activeUser");
      const users = JSON.parse(localStorage.getItem("users")) || {};

      if (!users[user]) users[user] = {};
      if (!users[user].profile) users[user].profile = {};

      users[user].profile[id] =
        el.type === "number" ? +el.value : el.value;

      localStorage.setItem("users", JSON.stringify(users));
    });
  });
}

// ---------- REPORT OCR (INTEGRATED) ----------
async function processReport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const status = document.getElementById("scan-status");
  const output = document.getElementById("ai-insight");

  // Racing-style loading animation
  output.innerHTML = `
    <div class="bg-zinc-900 p-6 rounded-2xl border border-[#ccff00]">
      <div class="flex items-center space-x-4">
        <div class="loading-ai">
          <div></div>
          <div></div>
        </div>
        <div>
          <p class="text-[#ccff00] font-mono text-sm">SCANNING DOCUMENT...</p>
          <div class="progress-track mt-2"></div>
        </div>
      </div>
    </div>
  `;

  try {
    // Check if Tesseract is available
    if (typeof Tesseract === 'undefined') {
      throw new Error("OCR library not loaded");
    }

    const result = await Tesseract.recognize(file, "eng");
    const extractedText = result.data.text.trim();

    if (extractedText.length < 50) {
      status.innerText = "INVALID REPORT";
      output.innerHTML = `<p class="text-red-500">Not a valid medical report.</p>`;
      return;
    }

    // Telemetry-style loading
    status.innerHTML = `AI ANALYSIS IN PROGRESS<br><span class="text-xs text-[#ccff00]">TELEMETRY: INITIALIZING...</span>`;
    
    const telemetryInterval = setInterval(() => {
      const randomData = Math.floor(Math.random() * 1000);
      status.innerHTML = `AI ANALYSIS IN PROGRESS<br><span class="text-xs text-[#ccff00]">TELEMETRY: ${randomData} UNITS</span>`;
    }, 500);

    // Call AI backend
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "Analyze this medical report and summarize health issues in clean plain text:\n\n" + extractedText
      })
    });

    clearInterval(telemetryInterval);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();

    // Racing-style reveal
    output.style.opacity = '0';
    output.innerHTML = `
      <div class="bg-zinc-900 p-6 rounded-2xl border-l-4 border-[#ccff00] transform transition-all duration-500">
        <h3 class="text-[#ccff00] font-bold mb-2 font-mono text-lg">AI ANALYSIS COMPLETE</h3>
        <p class="whitespace-pre-line font-sans">${data.reply}</p>
      </div>
    `;
    
    requestAnimationFrame(() => {
      output.style.transition = 'opacity 0.5s';
      output.style.opacity = '1';
    });

    // ✅ SAVE REPORT RESULT
    const user = sessionStorage.getItem("activeUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[user]) users[user] = {};
    users[user].report = {
      summary: data.reply,
      timestamp: Date.now()
    };

    localStorage.setItem("users", JSON.stringify(users));

    status.innerHTML = `<span class="text-[#ccff00]">ANALYSIS COMPLETE ✓</span>`;

  } catch (err) {
    console.error("Report processing error:", err);
    status.innerText = "ERROR";
    output.innerHTML = `
      <div class="bg-red-900/50 p-6 rounded-2xl border border-red-500">
        <h3 class="text-red-400 font-bold mb-2">SYSTEM ERROR</h3>
        <p class="text-red-300">Failed to read report. ${err.message}</p>
      </div>
    `;
  }
}

// ---------- DIET ----------
function initDiet() {
  const user = sessionStorage.getItem("activeUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const profile = users[user]?.profile;
  const reportText = users[user]?.report?.summary?.toLowerCase() || "";
  const dietType = users[user]?.dietType || "veg";

  // Set diet type selector
  setTimeout(() => {
    const select = document.getElementById("diet-type");
    if (select) {
      select.value = dietType;
      select.onchange = () => {
        users[user].dietType = select.value;
        localStorage.setItem("users", JSON.stringify(users));
        regenerateDiet(profile, reportText, select.value);
      };
    }
  }, 0);

  const warning = document.getElementById("diet-warning");
  const content = document.getElementById("diet-content");

  if (!profile?.calories) {
    warning?.classList.remove("hidden");
    content?.classList.add("hidden");
    return;
  }

  warning?.classList.add("hidden");
  content?.classList.remove("hidden");

  const calories = profile.calories;
  const proteinG = Math.round((calories * 0.3) / 4);
  const carbsG = Math.round((calories * 0.45) / 4);
  const fatG = Math.round((calories * 0.25) / 9);

  document.getElementById("diet-calories").innerText = `${calories} kcal`;
  document.getElementById("protein-g").innerText = proteinG;
  document.getElementById("carbs-g").innerText = carbsG;
  document.getElementById("fat-g").innerText = fatG;

  // ---------- FOOD LOGIC ----------
  const prefer = {
    veg: ["Spinach", "Lentils", "Chickpeas", "Oats"],
    egg: ["Boiled eggs", "Egg omelette"],
    nonveg: ["Fish", "Chicken breast"]
  };

  const avoid = {
    veg: ["Refined sugar", "Fried snacks"],
    egg: ["Deep fried eggs"],
    nonveg: ["Processed meat"]
  };

  if (reportText.includes("anemia")) {
    prefer.veg.push("Beetroot", "Dates");
    avoid.nonveg.push("Excess red meat");
  }

  if (reportText.includes("cholesterol")) {
    avoid.nonveg.push("Fried chicken");
    avoid.egg.push("Egg yolk (excess)");
  }

  // ---------- RENDER FOODS ----------
  const renderFood = (obj) => `
    <p class="font-semibold mt-2">Vegetarian</p>
    <ul class="list-disc pl-5 text-sm">${obj.veg.map(i => `<li>${i}</li>`).join("")}</ul>
    <p class="font-semibold mt-2">Egg-etarian</p>
    <ul class="list-disc pl-5 text-sm">${obj.egg.map(i => `<li>${i}</li>`).join("")}</ul>
    <p class="font-semibold mt-2">Non-Vegetarian</p>
    <ul class="list-disc pl-5 text-sm">${obj.nonveg.map(i => `<li>${i}</li>`).join("")}</ul>
  `;

  const foodsPrefer = document.getElementById("foods-prefer");
  const foodsAvoid = document.getElementById("foods-avoid");
  if (foodsPrefer) foodsPrefer.innerHTML = renderFood(prefer);
  if (foodsAvoid) foodsAvoid.innerHTML = renderFood(avoid);

  // ---------- AI DIET PLAN ----------
  (async () => {
    try {
      if (!users[user].dietPlan || !users[user].dietPlan.breakfast) {
        const aiDiet = await generateAIDiet(profile, reportText, dietType);
        users[user].dietPlan = aiDiet;
        localStorage.setItem("users", JSON.stringify(users));
      }

      renderAIDiet(users[user].dietPlan);

    } catch (err) {
      console.error("Diet AI failed:", err);
      // Fallback to basic meal plan
      renderBasicMealPlan(calories);
    }
  })();

  // ---------- PIE CHART ----------
  const canvas = document.getElementById("macroChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    if (window.macroChartInstance) {
      window.macroChartInstance.destroy();
    }

    window.macroChartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [{
          data: [proteinG, carbsG, fatG],
          backgroundColor: ["#ccff00", "#3b82f6", "#f97316"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

async function regenerateDiet(profile, reportText, dietType) {
  const user = sessionStorage.getItem("activeUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  const mealBox = document.getElementById("meal-plan");
  if (mealBox) {
    mealBox.innerHTML = `<p class="text-zinc-400 text-sm">Regenerating diet...</p>`;
  }

  try {
    const aiDiet = await generateAIDiet(profile, reportText, dietType);
    users[user].dietPlan = aiDiet;
    localStorage.setItem("users", JSON.stringify(users));
    renderAIDiet(aiDiet);
  } catch (err) {
    console.error("Diet regeneration failed:", err);
    if (mealBox) {
      mealBox.innerHTML = `<p class="text-red-500 text-sm">Failed to regenerate diet.</p>`;
    }
  }
}

// ===============================
// AI DIET GENERATOR
// ===============================
async function generateAIDiet(profile, reportText, dietType) {
  const foodMap = {
    veg: `Allowed foods: - Dal, lentils, chickpeas - Paneer, tofu - Rice, roti, oats - Vegetables, fruits - Nuts, seeds, curd NO eggs, NO meat.`,
    egg: `Allowed foods: - Eggs (boiled, omelette) - Dal, lentils - Rice, roti, oats - Vegetables, fruits - Milk, curd NO chicken, NO fish.`,
    nonveg: `Allowed foods: - Chicken breast - Fish - Eggs - Rice, roti, oats - Vegetables - Dal optional`
  };

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `
Create a daily Indian diet plan in STRICT JSON.
User goal: ${profile.goal}
Daily calories: ${profile.calories} kcal
Diet preference: ${dietType}
${foodMap[dietType]}
Medical report notes: ${reportText || "none"}

Rules:
- Use ONLY foods from the allowed list above
- Do NOT reuse foods from other diet categories
- Each meal must include a primary protein source
- Give exact quantities in grams
- Split calories across breakfast, lunch, snacks, dinner
- Return ONLY valid JSON

Return ONLY valid JSON in this format:
{
 "breakfast":[{"food":"","grams":0,"calories":0}],
 "lunch":[{"food":"","grams":0,"calories":0}],
 "snacks":[{"food":"","grams":0,"calories":0}],
 "dinner":[{"food":"","grams":0,"calories":0}]
}`
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const data = await res.json();
    let clean = data.reply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(clean);
  } catch (err) {
    console.error("AI Diet generation error:", err);
    throw err;
  }
}

// ===============================
// AI DIET RENDERER
// ===============================
function renderAIDiet(plan) {
  const container = document.getElementById("meal-plan");
  if (!container) return;

  const renderMeal = (title, icon, items) => `
    <div class="bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-colors interactive-card">
      <div class="flex items-center gap-2 mb-3">
        <i data-lucide="${icon}" class="text-[#ccff00] w-5 h-5"></i>
        <h4 class="font-bold text-white uppercase text-sm tracking-wider">${title}</h4>
      </div>
      <div class="space-y-3">
        ${items.map(i => `
          <div class="flex justify-between items-start text-sm group">
            <span class="text-zinc-300 group-hover:text-white transition-colors">${i.food}</span>
            <span class="text-zinc-500 text-xs font-mono bg-black/30 px-2 py-1 rounded">
              ${i.grams}g · ${i.calories} kcal
            </span>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  container.innerHTML = `
    ${renderMeal("Breakfast", "coffee", plan.breakfast || [])}
    ${renderMeal("Lunch", "sun", plan.lunch || [])}
    ${renderMeal("Snacks", "cookie", plan.snacks || [])}
    ${renderMeal("Dinner", "moon", plan.dinner || [])}
  `;
  
  if (window.lucide) lucide.createIcons();
}

// Basic fallback meal plan
function renderBasicMealPlan(calories) {
  const container = document.getElementById("meal-plan");
  const fallback = document.getElementById("fallback-meal-plan");
  const basicPlan = document.getElementById("basic-meal-plan");
  
  if (!container || !fallback || !basicPlan) return;
  
  const meals = [
    ["Breakfast", "Oats + Eggs", `P:25g C:40g F:12g`],
    ["Lunch", "Rice + Dal + Veg", `P:30g C:60g F:15g`],
    ["Snacks", "Fruit + Nuts", `P:10g C:30g F:10g`],
    ["Dinner", "Roti + Paneer/Chicken", `P:35g C:40g F:15g`]
  ];

  basicPlan.innerHTML = meals.map(
    m => `
      <div class="flex justify-between border-b border-zinc-800 pb-2">
        <div>
          <p class="font-semibold">${m[0]}</p>
          <p class="text-sm text-zinc-400">${m[1]}</p>
        </div>
        <p class="text-sm text-zinc-300">${m[2]}</p>
      </div>
    `
  ).join("");
  
  container.innerHTML = "";
  fallback.classList.remove("hidden");
}

// ---------- WORKOUT ----------
function initWorkout() {
  const user = sessionStorage.getItem("activeUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const profile = users[user]?.profile;
  const report = users[user]?.report;

  const typeSelect = document.getElementById("workout-type");
  const planBox = document.getElementById("workout-plan");
  const cardioBox = document.getElementById("cardio-plan");
  const warningList = document.getElementById("workout-warnings");

  if (!profile) {
    if (planBox) planBox.innerHTML = "<p class='text-zinc-400'>Calculate calories first.</p>";
    return;
  }

  // --- WORKOUT DATABASE ---
  const workoutDB = {
    weights: {
      push: [
        { name: "Barbell Bench Press", sets: "4", reps: "6-8" },
        { name: "Overhead Shoulder Press", sets: "3", reps: "8-10" },
        { name: "Incline Dumbbell Press", sets: "3", reps: "8-12" },
        { name: "Tricep Pushdowns", sets: "3", reps: "12-15" },
        { name: "Lateral Raises", sets: "4", reps: "15-20" }
      ],
      pull: [
        { name: "Deadlifts (Conventional)", sets: "3", reps: "5" },
        { name: "Lat Pulldowns / Pull-ups", sets: "4", reps: "8-10" },
        { name: "Bent Over Barbell Rows", sets: "4", reps: "8-10" },
        { name: "Face Pulls", sets: "3", reps: "15-20" },
        { name: "Bicep Curls", sets: "3", reps: "10-12" }
      ],
      legs: [
        { name: "Barbell Squats", sets: "4", reps: "5-8" },
        { name: "Leg Press", sets: "3", reps: "10-12" },
        { name: "Romanian Deadlifts", sets: "3", reps: "8-10" },
        { name: "Leg Extensions", sets: "3", reps: "12-15" },
        { name: "Seated Calf Raises", sets: "4", reps: "15-20" }
      ]
    },
    calisthenics: {
      push: [
        { name: "Weighted/Regular Dips", sets: "4", reps: "8-12" },
        { name: "Pike Push-ups", sets: "3", reps: "8-10" },
        { name: "Diamond Push-ups", sets: "3", reps: "10-15" },
        { name: "Pseudo Planche Lean", sets: "3", reps: "30s" },
        { name: "Tricep Extensions", sets: "3", reps: "10-12" }
      ],
      pull: [
        { name: "Pull-ups / Chin-ups", sets: "4", reps: "MAX" },
        { name: "Front Lever Tucks", sets: "3", reps: "15s" },
        { name: "Bodyweight Rows", sets: "4", reps: "10-12" },
        { name: "Scapular Pulls", sets: "3", reps: "10" },
        { name: "Commando Pull-ups", sets: "3", reps: "6-8" }
      ],
      legs: [
        { name: "Pistol Squats (Assisted)", sets: "3", reps: "6-8" },
        { name: "Bulgarian Split Squats", sets: "3", reps: "8-10" },
        { name: "Nordic Hamstring Curls", sets: "3", reps: "5-8" },
        { name: "Sissy Squats", sets: "3", reps: "MAX" },
        { name: "Single Leg Calf Raises", sets: "4", reps: "15" }
      ]
    }
  };

  const schedule = [
    { day: "Monday", type: "push", label: "PUSH A" },
    { day: "Tuesday", type: "pull", label: "PULL A" },
    { day: "Wednesday", type: "legs", label: "LEGS A" },
    { day: "Thursday", type: "rest", label: "ACTIVE REST" },
    { day: "Friday", type: "push", label: "PUSH B" },
    { day: "Saturday", type: "pull", label: "PULL B" },
    { day: "Sunday", type: "rest", label: "FULL REST" }
  ];

  // --- RENDER WORKOUT ---
  function renderWorkout(mode) {
    const data = workoutDB[mode];
    if (!planBox) return;

    planBox.innerHTML = `
      <div class="grid grid-cols-1 gap-4">
        ${schedule.map(s => {
          if (s.type === 'rest') {
            return `
              <div class="glass p-4 rounded-xl opacity-60 border border-transparent hover:border-zinc-600 transition-colors">
                <div class="flex justify-between items-center">
                  <span class="text-[#ccff00] font-bold w-24">${s.day}</span>
                  <span class="text-zinc-400 font-bold tracking-widest">REST DAY</span>
                  <span class="text-xs text-zinc-500">Stretch & Recover</span>
                </div>
              </div>
            `;
          }

          const exercises = data[s.type];
          return `
            <div class="glass p-5 rounded-xl border-l-2 border-[#ccff00]/50 hover:border-[#ccff00] transition-all group">
              <div class="flex justify-between items-center mb-3 cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
                <div class="flex items-center gap-4">
                  <span class="text-[#ccff00] font-bold w-24">${s.day}</span>
                  <span class="text-white font-bold bg-white/10 px-3 py-1 rounded text-xs tracking-wider">${s.label}</span>
                </div>
                <i data-lucide="chevron-down" class="text-zinc-500 group-hover:text-white"></i>
              </div>
              
              <div class="hidden space-y-2 mt-4 pl-4 border-l border-zinc-700 animate-fade-in">
                ${exercises.map(ex => `
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-300">${ex.name}</span>
                    <span class="text-zinc-500 font-mono text-xs">${ex.sets} x ${ex.reps}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    
    if (window.lucide) setTimeout(() => lucide.createIcons(), 50);
  }

  // Initialize workout render
  if (typeSelect && planBox) {
    renderWorkout(typeSelect.value);
    typeSelect.onchange = e => renderWorkout(e.target.value);
  }

  // --- CARDIO ---
  let cardio = `
    <ul class="space-y-2">
      <li class="flex items-start gap-2">
        <i data-lucide="footprints" class="w-4 h-4 text-blue-400 mt-1"></i>
        <span>10k Steps daily (Non-negotiable)</span>
      </li>
      <li class="flex items-start gap-2">
        <i data-lucide="bike" class="w-4 h-4 text-blue-400 mt-1"></i>
        <span>20 min Low Intensity Steady State (LISS) post-workout</span>
      </li>
    </ul>
  `;

  if (report?.summary?.toLowerCase().includes("anemia")) {
    cardio = `
      <div class="bg-red-500/10 p-3 rounded text-red-200 text-sm">
        <i data-lucide="alert-triangle" class="inline mr-1"></i>
        Medical Alert: Limit cardio to light walking only.
      </div>
    `;
  }
  if (cardioBox) cardioBox.innerHTML = cardio;

  // --- WARNINGS ---
  if (warningList) {
    warningList.innerHTML = "";
    if (report?.summary) {
      const text = report.summary.toLowerCase();
      if (text.includes("anemia")) warningList.innerHTML += `<li>Avoid HIIT / High exertion</li>`;
      if (text.includes("blood pressure")) warningList.innerHTML += `<li>Controlled breathing is vital</li>`;
      if (text.includes("diabetes")) warningList.innerHTML += `<li>Keep glucose source nearby</li>`;
    }
    if (!warningList.innerHTML) warningList.innerHTML = `<li>Form over weight, always.</li>`;
  }
}

function restoreReport() {
  const user = sessionStorage.getItem("activeUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const report = users[user]?.report;

  if (!report) return;

  const status = document.getElementById("scan-status");
  const output = document.getElementById("ai-insight");

  if (status) status.innerText = "REPORT LOADED";

  if (output) {
    output.innerHTML = `
      <div class="bg-zinc-900 p-6 rounded-2xl">
        <h3 class="text-[#ccff00] font-bold mb-2">AI Insight</h3>
        <p class="whitespace-pre-line">${report.summary}</p>
      </div>
    `;
  }
}

// ---------- CHAT TOGGLE (PREMIUM ANIMATION) ----------
window.toggleChat = function () {
  const chatWindow = document.getElementById("chat-window");
  const triggerBtn = document.getElementById("chat-trigger");
  
  if (!chatWindow || !triggerBtn) return;

  const isHidden = chatWindow.classList.contains("hidden");
  
  if (isHidden) {
    chatWindow.classList.remove("hidden");
    chatWindow.classList.add("flex");
    setTimeout(() => document.getElementById("chat-input")?.focus(), 100);
  } else {
    chatWindow.classList.add("hidden");
    chatWindow.classList.remove("flex");
  }

  // Animation fix
  const icon = triggerBtn.querySelector("i, svg"); 
  icon.classList.remove("animate-wink");
  void icon.offsetWidth; // Force reflow
  icon.classList.add("animate-wink");
  
  setTimeout(() => {
    icon.classList.remove("animate-wink");
  }, 500);
};

// ---------- PREMIUM CHAT LOGIC ----------
window.sendChatMessage = async function () {
  const input = document.getElementById("chat-input");
  const box = document.getElementById("chat-messages");

  if (!input || !box) return;

  const message = input.value.trim();
  if (!message) return;

  // 1. Render User Message
  const userBubble = `
    <div class="flex justify-end mb-4 animate-fade-in">
      <div class="bg-[#ccff00] text-black px-4 py-2 rounded-2xl rounded-tr-sm font-medium text-sm max-w-[80%] shadow-lg">
        ${message}
      </div>
    </div>
  `;
  box.innerHTML += userBubble;
  box.scrollTop = box.scrollHeight;
  input.value = "";

  // 2. Add "Thinking..." Indicator
  const loadingID = "loading-" + Date.now();
  const loadingBubble = `
    <div id="${loadingID}" class="flex justify-start mb-4 animate-fade-in">
      <div class="glass px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
        <div class="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
        <div class="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
    </div>
  `;
  box.innerHTML += loadingBubble;
  box.scrollTop = box.scrollHeight;

  // 3. Prepare Context for AI
  const user = sessionStorage.getItem("activeUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const profile = users[user]?.profile;
  const report = users[user]?.report;

  let context = "You are FitFuel AI. Keep answers short (under 50 words) and motivating.\n";
  if (profile) context += `User stats: ${profile.goal}, ${profile.weight}kg.\n`;
  if (report) context += `Medical Issue: ${report.summary}\n`;

  // 4. Fetch AI Response
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        text: context + "User: " + message,
        userId: user
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    
    // Remove "Thinking..." and Show AI Message
    const loadingEl = document.getElementById(loadingID);
    if (loadingEl) loadingEl.remove();

    const aiBubble = `
      <div class="flex justify-start mb-4 animate-fade-in">
        <div class="glass border border-white/10 text-zinc-200 px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[85%] shadow-lg leading-relaxed">
          <span class="text-[#ccff00] font-bold text-xs block mb-1">FITFUEL AI</span>
          ${data.reply}
        </div>
      </div>
    `;
    box.innerHTML += aiBubble;

  } catch (err) {
    const loadingEl = document.getElementById(loadingID);
    if (loadingEl) loadingEl.remove();
    
    const aiBubble = `
      <div class="flex justify-start mb-4 animate-fade-in">
        <div class="bg-red-500/10 border border-red-500 text-red-300 px-4 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
          <span class="font-bold text-xs block mb-1">⚠️ SYSTEM</span>
          AI is offline. Please check your backend server.
        </div>
      </div>
    `;
    box.innerHTML += aiBubble;
    console.error("Chat error:", err);
  }

  box.scrollTop = box.scrollHeight;
};

// ---------- GRID ANIMATION HELPERS ----------
function addGridAnimation(elementId) {
  const element = document.getElementById(elementId);
  if (element && !element.querySelector('.grid-animate')) {
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'grid-animate absolute inset-0 -z-10';
    gridOverlay.style.pointerEvents = 'none';
    
    if (!element.style.position || element.style.position === 'static') {
      element.style.position = 'relative';
    }
    if (!element.style.overflow) {
      element.style.overflow = 'hidden';
    }
    
    element.appendChild(gridOverlay);
  }
}

function addGridAnimationToCards() {
  document.querySelectorAll('.interactive-card').forEach(card => {
    if (!card.classList.contains('card-3d')) {
      card.classList.add('card-3d');
    }
    // Add subtle hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

function addRacingNumbers() {
  document.querySelectorAll('.racing-number').forEach(el => {
    el.classList.add('racing-number');
  });
}

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', function() {
  console.log('FitFuel Dashboard Loaded');
  
  // Initialize animations
  if (window.bgAnimations) {
    console.log('Background animations loaded');
  }
  
  // Start with home tab
  setTimeout(() => {
    const display = document.getElementById('display');
    if (display && display.innerHTML.trim() === '') {
      switchTab('home');
    }
  }, 100);
  
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
  
  // Make functions globally accessible
  window.switchTab = switchTab;
  window.processReport = processReport;
  window.sendChatMessage = sendChatMessage;
  window.toggleChat = toggleChat;
  
  // Set active tab on load
  const homeBtn = document.querySelector('[onclick*="home"]');
  if (homeBtn) homeBtn.classList.add('active');
});

// Fallback initialization
window.addEventListener('load', function() {
  // Add interactive effects
  setTimeout(() => {
    addGridAnimationToCards();
    addRacingNumbers();
  }, 500);
  
  // Ensure home tab is loaded
  if (!document.getElementById('display').innerHTML.trim()) {
    switchTab('home');
  }
});