/**
 * X-FIGURE FITNESS — LUXURY CYBER-GOLD CLIENT ENGINE
 * Handles:
 * 1. Ambient Web Audio API Soundscape Synth
 * 2. Hero Interactive Multi-View Showcase
 * 3. Before/After Split-Screen Transformation Slider (Pointer & Touch)
 * 4. Fitness Utility Suite (BMI, Kerala Diet Macro Calorie, Body Fat %, 1RM Strength)
 * 5. Weekly Schedule Switcher (incl. Saturday Functional Blast)
 * 6. Gallery Lightbox with Keyboard & Touch Nav
 * 7. Real-time Indian Standard Time (IST) Facility Open/Close Calculator
 * 8. Canvas Sparkles & Interactive 3D Hologram Tilt
 * 9. Custom Glow Cursor Tracker
 * 10. Direct WhatsApp & Free Trial Lead System
 */

document.addEventListener('DOMContentLoaded', () => {
  initSparkleCanvas();
  initCursorGlow();
  initISTLiveGymStatus();
  initHeaderAndProgress();
  initHeroShowcase();
  initBeforeAfterSlider();
  initFitnessCalculatorSuite();
  initScheduleTabs();
  initGalleryAndLightbox();
  initFAQAccordion();
  initCard3DTilt();
  initScrollAnimations();
  initEnquiryAndTrialModals();
});

/* =============================================================================
   1. HERO SHOWCASE & RESPONSIVE VISUAL
   ============================================================================= */
function initHeroShowcase() {
  const heroImg = document.getElementById('heroMainImg');
  if (!heroImg) return;
  // Keeps hero image aspect ratio crisp and loaded
  heroImg.addEventListener('load', () => {
    heroImg.style.opacity = '1';
  });
}

/* =============================================================================
   3. BEFORE / AFTER SPLIT-SCREEN TRANSFORMATION SLIDER (RAHUL M, ANOOP K, DIVYA S)
   ============================================================================= */
function initBeforeAfterSlider() {
  const container = document.getElementById('baSliderContainer');
  const beforeWrapper = document.getElementById('baBeforeWrapper');
  const handle = document.getElementById('baHandle');
  const memberTabs = document.querySelectorAll('.transform-tab-btn');
  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');

  if (!container || !beforeWrapper || !handle) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    let percentage = (offsetX / rect.width) * 100;

    // Constrain within bounds (5% to 95%)
    percentage = Math.max(5, Math.min(95, percentage));

    beforeWrapper.style.width = percentage + '%';
    handle.style.left = percentage + '%';
  }

  function syncBeforeImgWidth() {
    if (beforeImg && container) {
      beforeImg.style.width = container.offsetWidth + 'px';
    }
  }

  window.addEventListener('resize', syncBeforeImgWidth);
  syncBeforeImgWidth();

  // Mouse Drag Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // 3 Kerala Transformations (Rahul M., Anoop K., Divya S.)
  const memberData = {
    rahul: {
      name: 'Rahul M. (27 yrs)',
      coach: 'Guided by Coach Sumesh & Kannan',
      badge: '16 WEEKS SHRED',
      statBig: '-14 KG',
      statSub: 'Body Fat: 26% → 12%',
      timeline: '16 Weeks',
      diet: 'Kerala High-Protein Deficit',
      highlight: 'Saturday Cardio + Push/Pull Split',
      strength: 'Bench +30kg / Squat +45kg',
      quote: '"The weekly diet tracking with Coach Sumesh and Kannan made all the difference. Having high ceilings and natural airflow meant I never felt suffocated during high-rep heavy sets."',
      beforeImg: 'assets/images/rahul-before.jpg',
      afterImg: 'assets/images/rahul-after.jpg'
    },
    anoop: {
      name: 'Anoop K. (25 yrs)',
      coach: 'Guided by Coach Sumesh (Founder)',
      badge: '20 WEEKS LEAN BULK',
      statBig: '+9 KG',
      statSub: 'Body Fat: 11% (Lean Hypertrophy)',
      timeline: '20 Weeks',
      diet: 'Kerala Clean Surplus & Recomp',
      highlight: 'Progressive Overload & Free Weights',
      strength: 'Deadlift 70kg → 160kg / Squat 50kg → 125kg',
      quote: '"I was skinny and struggled to gain weight. Sumesh sir created a customized high-calorie Kerala nutrition plan with heavy lifting. Gained 9kg pure lean muscle!"',
      beforeImg: 'assets/images/anoop-before.jpg',
      afterImg: 'assets/images/anoop-after.jpg'
    },
    divya: {
      name: 'Divya S. (29 yrs)',
      coach: 'Guided by Coach Praveen & Sumesh',
      badge: '14 WEEKS RECOMP',
      statBig: 'RECOMP & TONE',
      statSub: '-8kg Fat + Sculpted Core',
      timeline: '14 Weeks',
      diet: 'Balanced Macro Recomp & Hydration',
      highlight: 'Functional HIIT & Kettlebells',
      strength: 'Hip Thrust 20kg → 85kg / Full Posture',
      quote: '"X-Figure is so welcoming and safe for women in Kerala. The trainers taught me proper barbell form without intimidation. My stamina, posture, and core strength have reached a whole new level!"',
      beforeImg: 'assets/images/divya-before.jpg',
      afterImg: 'assets/images/divya-after.jpg'
    }
  };

  memberTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-case') || tab.getAttribute('data-member');
      const data = memberData[key];
      if (!data) return;

      memberTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update Images
      if (beforeImg && afterImg) {
        beforeImg.src = data.beforeImg;
        afterImg.src = data.afterImg;
        beforeImg.onload = syncBeforeImgWidth;
        syncBeforeImgWidth();
      }

      // Update Card Info
      const nameEl = document.getElementById('transName') || document.getElementById('tmName');
      const coachEl = document.getElementById('transCoach') || document.getElementById('tmCoach');
      const badgeEl = document.getElementById('transBadge') || document.getElementById('tmBadge');
      const statBigEl = document.getElementById('transBigStat') || document.getElementById('tmStatBig');
      const statSubEl = document.getElementById('transSubStat') || document.getElementById('tmStatSub');
      const timelineEl = document.getElementById('transTimeline') || document.getElementById('tmTimeframe');
      const dietEl = document.getElementById('transDiet');
      const highlightEl = document.getElementById('transHighlight');
      const strengthEl = document.getElementById('transStrength') || document.getElementById('tmSquat');
      const quoteEl = document.getElementById('transQuote') || document.getElementById('tmQuote');

      if (nameEl) nameEl.textContent = data.name;
      if (coachEl) coachEl.innerHTML = `<i class="fa-solid fa-user-check"></i> ${data.coach}`;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (statBigEl) statBigEl.textContent = data.statBig;
      if (statSubEl) statSubEl.textContent = data.statSub;
      if (timelineEl) timelineEl.textContent = data.timeline;
      if (dietEl) dietEl.textContent = data.diet;
      if (highlightEl) highlightEl.textContent = data.highlight;
      if (strengthEl) strengthEl.textContent = data.strength;
      if (quoteEl) quoteEl.textContent = data.quote;

      // Animate Slider Reset to 50%
      beforeWrapper.style.transition = 'width 0.4s ease';
      handle.style.transition = 'left 0.4s ease';
      beforeWrapper.style.width = '50%';
      handle.style.left = '50%';
      setTimeout(() => {
        beforeWrapper.style.transition = 'none';
        handle.style.transition = 'none';
        syncBeforeImgWidth();
      }, 450);
    });
  });
}

/* =============================================================================
   4. FITNESS UTILITY SUITE (4 TABS: BMI, MACRO, BODY FAT, 1RM)
   ============================================================================= */
function initFitnessCalculatorSuite() {
  const calcTabs = document.querySelectorAll('.calc-tab-btn');
  const calcPanes = document.querySelectorAll('.calc-tab-content');

  calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      calcTabs.forEach(t => t.classList.remove('active'));
      calcPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // --- Tab 1: BMI Calculator ---
  const bmiForm = document.getElementById('bmiCalcForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const height = parseFloat(document.getElementById('bmiHeight').value); // cm
      const weight = parseFloat(document.getElementById('bmiWeight').value); // kg

      if (!height || !weight) return;

      const heightMeters = height / 100;
      const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

      const bmiValEl = document.getElementById('bmiVal');
      const bmiBadgeEl = document.getElementById('bmiBadge');
      const bmiIdealEl = document.getElementById('bmiIdealWeight');
      const bmiWaterEl = document.getElementById('bmiWaterIntake');

      if (bmiValEl) bmiValEl.textContent = bmi;

      let category = 'NORMAL WEIGHT';
      let badgeClass = 'badge-normal';

      if (bmi < 18.5) {
        category = 'UNDERWEIGHT';
        badgeClass = 'badge-under';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'OVERWEIGHT';
        badgeClass = 'badge-over';
      } else if (bmi >= 30) {
        category = 'OBESE (STAGE 1+)';
        badgeClass = 'badge-over';
      }

      if (bmiBadgeEl) {
        bmiBadgeEl.className = 'result-badge ' + badgeClass;
        bmiBadgeEl.textContent = category;
      }

      // Ideal weight for 22 BMI
      const idealWeight = (22 * heightMeters * heightMeters).toFixed(1);
      if (bmiIdealEl) bmiIdealEl.textContent = `${idealWeight} kg`;

      // Recommended daily water intake (approx 35ml per kg)
      const waterLiters = ((weight * 35) / 1000).toFixed(1);
      if (bmiWaterEl) bmiWaterEl.textContent = `${waterLiters} Liters/day`;
    });
  }

  // --- Tab 2: Calorie & Kerala Macro Calculator ---
  const calorieForm = document.getElementById('calorieCalcForm');
  if (calorieForm) {
    calorieForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById('calAge').value, 10);
      const gender = document.getElementById('calGender').value;
      const height = parseFloat(document.getElementById('calHeight').value);
      const weight = parseFloat(document.getElementById('calWeight').value);
      const activity = parseFloat(document.getElementById('calActivity').value);
      const goal = document.getElementById('calGoal').value;

      // Mifflin-St Jeor Equation
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      bmr = gender === 'male' ? bmr + 5 : bmr - 161;

      let tdee = bmr * activity;
      let targetCalories = tdee;

      if (goal === 'cut') targetCalories = tdee - 450;
      else if (goal === 'bulk') targetCalories = tdee + 350;

      targetCalories = Math.round(targetCalories);

      // Macros (Protein: 2g/kg, Fat: 0.8g/kg, Rest Carbs)
      const proteinGrams = Math.round(weight * 2.0);
      const fatGrams = Math.round(weight * 0.85);
      const remainingCal = targetCalories - (proteinGrams * 4 + fatGrams * 9);
      const carbGrams = Math.max(50, Math.round(remainingCal / 4));

      document.getElementById('calDailyTarget').textContent = targetCalories.toLocaleString() + ' kcal';
      document.getElementById('calProtein').textContent = proteinGrams + 'g';
      document.getElementById('calCarbs').textContent = carbGrams + 'g';
      document.getElementById('calFats').textContent = fatGrams + 'g';

      const dietBox = document.getElementById('calKeralaDietTip');
      if (dietBox) {
        if (goal === 'cut') {
          dietBox.innerHTML = `<strong>Kerala Cutting Protocol:</strong> Prioritize Ayila (Mackerel) or Ayala fish curry with minimal coconut paste, egg whites, steamed red rice (Matta rice 1 cup), and boiled green gram (Cherupayar).`;
        } else if (goal === 'bulk') {
          dietBox.innerHTML = `<strong>Kerala Clean Bulk Protocol:</strong> Include Nendran banana pre-workout, grilled chicken breast/Paneer with Kerala whole wheat parotta/chapati, boiled Kadala (Chickpea) sundal, and tender coconut water post-workout.`;
        } else {
          dietBox.innerHTML = `<strong>Kerala Recomp Protocol:</strong> Balanced portions of Matta rice, Thoran (vegetables without excess oil), fish steak (Neymeen/Ayala), and Moru (buttermilk) for digestive health.`;
        }
      }
    });
  }

  // --- Tab 3: US Navy Body Fat Calculator ---
  const bfForm = document.getElementById('bfCalcForm');
  if (bfForm) {
    bfForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const gender = document.getElementById('bfGender').value;
      const height = parseFloat(document.getElementById('bfHeight').value); // cm
      const neck = parseFloat(document.getElementById('bfNeck').value); // cm
      const waist = parseFloat(document.getElementById('bfWaist').value); // cm
      const hip = parseFloat(document.getElementById('bfHip')?.value || 90); // cm (women)

      let bf = 0;
      if (gender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
      }

      bf = Math.max(4, Math.min(50, bf)).toFixed(1);

      document.getElementById('bfVal').textContent = bf + '%';
      const bfStatus = document.getElementById('bfStatus');
      if (bfStatus) {
        if (gender === 'male') {
          if (bf < 10) bfStatus.textContent = 'ATHLETE / SHREDDED';
          else if (bf < 17) bfStatus.textContent = 'FITNESS / LEAN';
          else if (bf < 24) bfStatus.textContent = 'AVERAGE HEALTHY';
          else bfStatus.textContent = 'ELEVATED (RECOMMEND CUT)';
        } else {
          if (bf < 18) bfStatus.textContent = 'ATHLETE / TONED';
          else if (bf < 24) bfStatus.textContent = 'FITNESS LEAN';
          else if (bf < 31) bfStatus.textContent = 'AVERAGE HEALTHY';
          else bfStatus.textContent = 'ELEVATED (RECOMMEND CUT)';
        }
      }
    });
  }

  // --- Tab 4: 1RM Strength Calculator (Brzycki & Epley Formulas) ---
  const onermForm = document.getElementById('onermCalcForm');
  if (onermForm) {
    onermForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const weight = parseFloat(document.getElementById('onermWeight').value);
      const reps = parseInt(document.getElementById('onermReps').value, 10);

      if (!weight || !reps) return;

      // Epley Formula: 1RM = Weight * (1 + 0.0333 * reps)
      const oneRm = reps === 1 ? weight : Math.round(weight * (1 + 0.0333 * reps));

      document.getElementById('onermVal').textContent = `${oneRm} KG`;

      // Fill Breakdown Table
      const tableBody = document.getElementById('onermTableBody');
      if (tableBody) {
        const percentages = [
          { p: 95, r: '2 Reps' },
          { p: 90, r: '3-4 Reps' },
          { p: 85, r: '5-6 Reps' },
          { p: 80, r: '7-8 Reps' },
          { p: 75, r: '10 Reps' },
          { p: 70, r: '12 Reps' },
          { p: 60, r: '15+ Reps' }
        ];

        tableBody.innerHTML = percentages.map(item => `
          <tr>
            <td><strong>${item.p}%</strong></td>
            <td><strong>${(oneRm * (item.p / 100)).toFixed(1)} kg</strong></td>
            <td>${item.r}</td>
          </tr>
        `).join('');
      }
    });
  }
}

/* =============================================================================
   5. SCHEDULE DAY SWITCHER & INTERACTIVE ROUTINE VIEWER
   ============================================================================= */
function initScheduleTabs() {
  const dayBtns = document.querySelectorAll('.day-tab-btn');
  const scheduleDisplay = document.getElementById('scheduleDisplayCard');

  if (!dayBtns.length || !scheduleDisplay) return;

  const scheduleRoutines = {
    mon: {
      dayName: 'Monday',
      title: 'Chest Sculpting & Tricep Hypertrophy',
      splitBadge: 'UPPER PUSH PROTOCOL',
      trainer: 'Coach Sumesh (Founder) & Kannan',
      focus: 'Mechanical tension, progressive overload on barbell incline, weighted dips, dumbbell flies & cable extensions.',
      morningSlot: '5:30 AM – 11:30 AM (Peak morning strength training & coach supervision)',
      eveningSlot: '4:30 PM – 9:30 PM (Evening powerhouse density workout & form spots)',
      warmup: '10 min rotator cuff band warmup + dynamic chest openers',
      nutrition: 'Post-workout: 4-5 boiled eggs / Whey protein + banana within 45 mins',
      whatsappText: 'Hello Coach Sumesh, I want to reserve a slot for Monday Chest & Triceps workout at X-Figure Fitness.',
      exercises: [
        { name: 'Incline Olympic Barbell Press', target: 'Upper Clavicular Chest', sets: '4 Sets × 8–10 Reps' },
        { name: 'Flat Heavy Dumbbell Press', target: 'Mid Sternal Pectorals', sets: '4 Sets × 10–12 Reps' },
        { name: 'Standing Dual Cable Flyes', target: 'Inner Squeeze & Peak Tension', sets: '3 Sets × 12–15 Reps' },
        { name: 'Parallel Bar Weighted / Machine Dips', target: 'Lower Pectorals & Triceps', sets: '3 Sets × 10–12 Reps' },
        { name: 'Overhead Cable Rope Extension', target: 'Long Head Tricep Growth', sets: '4 Sets × 12–15 Reps' },
        { name: 'Close-Grip Straight Bar Pushdowns', target: 'Lateral Head Tricep Burnout', sets: '3 Sets × 15 Reps' }
      ]
    },
    tue: {
      dayName: 'Tuesday',
      title: 'High-Lats Back Density & Bicep Peak',
      splitBadge: 'POSTERIOR PULL PROTOCOL',
      trainer: 'Trainer Vishnu M. & Coach Sumesh',
      focus: 'Heavy hinge patterns, deadlifts, T-bar rowing density, wide-grip lat pulldowns & supinated bicep curls.',
      morningSlot: '5:30 AM – 11:30 AM (Deadlift spine warmup & progressive pull overload)',
      eveningSlot: '4:30 PM – 9:30 PM (High-intensity superset protocol & back pump)',
      warmup: 'Cat-cow spine articulation, lat activation bands & hang stretches',
      nutrition: 'Pre-workout: Black coffee + dates. Post: 200g chicken/fish thoran + rice',
      whatsappText: 'Hello Coach, I want to join Tuesday Back & Biceps training session at X-Figure Fitness.',
      exercises: [
        { name: 'Conventional / Rack Deadlifts', target: 'Full Posterior Chain & Traps', sets: '4 Sets × 6–8 Reps' },
        { name: 'Heavy Chest-Supported T-Bar Row', target: 'Rhomboids & Mid-Back Thickness', sets: '4 Sets × 8–10 Reps' },
        { name: 'Wide-Grip Lat Pulldown', target: 'Lat Width & V-Taper Flare', sets: '3 Sets × 10–12 Reps' },
        { name: 'Seated Neutral Grip Cable Row', target: 'Lower Lat Squeeze', sets: '3 Sets × 12 Reps' },
        { name: 'Standing EZ-Bar Bicep Curls', target: 'Bicep Peak Hypertrophy', sets: '4 Sets × 10–12 Reps' },
        { name: 'Incline Dumbbell Hammer Curls', target: 'Brachialis & Forearm Grip', sets: '3 Sets × 12–15 Reps' }
      ]
    },
    wed: {
      dayName: 'Wednesday',
      title: 'Quad Dominance, Hamstrings & Calves',
      splitBadge: 'LOWER POWER PROTOCOL',
      trainer: 'Coach Sumesh & Vishnu',
      focus: 'Deep Olympic squats, 45° leg press volume, Romanian deadlifts, Bulgarian split squats & calf raises in our open arena.',
      morningSlot: '5:30 AM – 11:30 AM (Leg powerhouse session with spotters)',
      eveningSlot: '4:30 PM – 9:30 PM (Lower body mobility & hypertrophy density)',
      warmup: 'Deep bodyweight squats, hip 90/90 mobility & ankle dorsiflexion drills',
      nutrition: 'High Kerala carb intake: Oats / Sweet potato + 30g clean protein',
      whatsappText: 'Hi Coach Sumesh, reserving a slot for Wednesday Leg Day powerhouse session.',
      exercises: [
        { name: 'Olympic Barbell Back Squats', target: 'Quad & Glute Power Drive', sets: '4 Sets × 8–10 Reps' },
        { name: '45-Degree Heavy Leg Press', target: 'Quad Sweep & Continuous Load', sets: '4 Sets × 12–15 Reps' },
        { name: 'Romanian Dumbbell Deadlifts', target: 'Hamstrings & Glute-Ham Tie-in', sets: '4 Sets × 10–12 Reps' },
        { name: 'Bulgarian Split Squats', target: 'Unilateral Balance & Stability', sets: '3 Sets × 10 Reps/leg' },
        { name: 'Lying Hamstring Leg Curls', target: 'Knee Flexion Isolation', sets: '3 Sets × 12–15 Reps' },
        { name: 'Standing Heavy Calf Raises', target: 'Gastrocnemius & Soleus Density', sets: '4 Sets × 20 Reps' }
      ]
    },
    thu: {
      dayName: 'Thursday',
      title: '3D Shoulder Caps & Core Stabilization',
      splitBadge: '3D DELT & CORE PROTOCOL',
      trainer: 'Coach Sumesh',
      focus: 'Strict military barbell presses, seated lateral raises, rear delt cable flyes, hanging leg raises & core stability.',
      morningSlot: '5:30 AM – 11:30 AM (Deltoid isolation & posture correction)',
      eveningSlot: '4:30 PM – 9:30 PM (Rotator cuff conditioning & core burn)',
      warmup: 'Light dumbbell lateral raises & rotator cuff external rotations',
      nutrition: 'Electrolyte hydration with Kerala tender coconut water pre/post workout',
      whatsappText: 'Hello Coach, booking for Thursday Shoulders & Core training at X-Figure Fitness.',
      exercises: [
        { name: 'Overhead Barbell Military Press', target: 'Anterior Deltoid & Core Brace', sets: '4 Sets × 8–10 Reps' },
        { name: 'Seated Dumbbell Lateral Raises', target: 'Lateral Delt 3D Width', sets: '4 Sets × 12–15 Reps' },
        { name: 'Face Pulls with Rope Attachment', target: 'Rear Delts & Rotator Cuff Health', sets: '4 Sets × 15 Reps' },
        { name: 'Dumbbell Front Raises / Upright Rows', target: 'Anterior / Clavicular Cap', sets: '3 Sets × 12 Reps' },
        { name: 'Hanging Straight Leg Raises', target: 'Lower Rectus Abdominis', sets: '3 Sets × 15 Reps' },
        { name: 'Cable Woodchoppers & Ab Rollout', target: 'Oblique & Transverse Core', sets: '3 Sets × 15 Reps/side' }
      ]
    },
    fri: {
      dayName: 'Friday',
      title: 'Posterior Chain & Arm Overload (Supersets)',
      splitBadge: 'ARM & POWER METABOLIC PUMP',
      trainer: 'Trainer Akhil P. & Coach Sumesh',
      focus: 'Pre-weekend arm specialization: Skull crushers superset with incline curls, cable pushdowns, preacher bench & grip power.',
      morningSlot: '5:30 AM – 11:30 AM (Arm volume & metabolic pump conditioning)',
      eveningSlot: '4:30 PM – 9:30 PM (Pre-weekend athletic high-volume session)',
      warmup: 'Elbow warmup, wrist stretches & light cable tricep/bicep warmup',
      nutrition: 'Lean protein meal with egg whites, grilled fish and green salad',
      whatsappText: 'Hello Coach, I want to attend Friday Arms & Power session at X-Figure Fitness.',
      exercises: [
        { name: 'EZ-Bar Skull Crushers', target: 'Tricep Long & Medial Heads', sets: '4 Sets × 10–12 Reps' },
        { name: 'Incline Bench Dumbbell Curls', target: 'Deep Bicep Long Head Stretch', sets: '4 Sets × 10–12 Reps' },
        { name: 'Dual Cable Tricep Kickbacks', target: 'Peak Contraction Lockdown', sets: '3 Sets × 15 Reps' },
        { name: 'Preacher Bench Spider Curls', target: 'Strict Bicep Peak Isolation', sets: '3 Sets × 12 Reps' },
        { name: 'Barbell Shrugs & Farmers Walk', target: 'Upper Traps & Grip Strength', sets: '4 Sets × 15 Reps' },
        { name: 'Reverse Wrist Curls & Forearm Roll', target: 'Brachioradialis & Forearm Size', sets: '3 Sets × 20 Reps' }
      ]
    },
    sat: {
      dayName: 'Saturday',
      title: 'High-Ceiling Functional HIIT & Cardio Blast',
      splitBadge: 'SATURDAY COMMUNITY BLAST',
      trainer: 'Full Coaching Staff (Open Floor Team)',
      focus: 'Battle ropes, heavy kettlebell swings, plyometric box jumps, slam balls, and agility drills taking full advantage of our 18-ft ceiling space.',
      morningSlot: '5:30 AM – 11:30 AM (Full community high-energy team workout)',
      eveningSlot: '4:30 PM – 8:30 PM (Metabolic fat burn & cardio sweat)',
      warmup: '15 min dynamic agility ladder drills & joint activation',
      nutrition: 'High hydration + post-workout banana smoothie with peanut butter',
      whatsappText: 'Hi Coach Sumesh, sign me up for the Saturday Functional HIIT & Cardio Blast!',
      exercises: [
        { name: 'Heavy Battle Rope Alternating Waves', target: 'Cardiovascular & Shoulder Stamina', sets: '5 Rounds × 45 Sec' },
        { name: 'Kettlebell Russian Swings (24-32kg)', target: 'Hip Hinge Power & Glute Drive', sets: '4 Sets × 20 Reps' },
        { name: 'Plyometric High Box Jumps', target: 'Lower Body Explosive Power', sets: '4 Sets × 12 Reps' },
        { name: 'Overhead Medicine Slam Balls', target: 'Full Body Core & Lat Power', sets: '4 Sets × 15 Reps' },
        { name: 'High-Cadence Curved Treadmill Sprints', target: 'Anaerobic Threshold Blast', sets: '6 Sprints × 30 Sec' },
        { name: 'Weighted Plank Holds & Cooldown', target: 'Core Isometric Endurance', sets: '3 Sets × 60 Sec' }
      ]
    },
    sun: {
      dayName: 'Sunday',
      title: 'Active Recovery & Facility Sanitization',
      splitBadge: 'RECOVERY & RESTORE',
      trainer: 'Gym Closed for Deep Rest',
      focus: 'Rest, muscle fiber repair, central nervous system rejuvenation, and facility maintenance so you return stronger on Monday.',
      morningSlot: 'Facility Closed (Recommended: Light 30-min brisk walk or yoga in fresh Kerala air)',
      eveningSlot: 'Facility Closed (Prepare meals & recovery sleep for upcoming week)',
      warmup: '15 min full-body foam rolling & static stretching at home',
      nutrition: 'High hydration, clean micronutrient-rich Kerala diet & 8 hours of sleep',
      whatsappText: 'Hello Coach Sumesh, I would like to enquire about membership starting this Monday.',
      exercises: [
        { name: 'Outdoor Walking / Nature Trail', target: 'Light Active Blood Circulation', sets: '30–45 Mins' },
        { name: 'Full Body Foam Rolling & Mobility', target: 'Myofascial Release & Flexibility', sets: '20 Mins' },
        { name: 'Deep Diaphragmatic Breathing / Yoga', target: 'Parasympathetic Nervous Recovery', sets: '15 Mins' },
        { name: 'Hydration & Weekly Meal Prep', target: 'Optimum Protein & Calorie Readiness', sets: 'All Day' }
      ]
    }
  };

  function renderDayRoutine(dayKey) {
    const data = scheduleRoutines[dayKey] || scheduleRoutines['mon'];

    scheduleDisplay.style.opacity = '0';
    scheduleDisplay.style.transform = 'translateY(6px)';

    setTimeout(() => {
      const exercisesHtml = data.exercises.map(ex => `
        <div class="sched-exercise-card">
          <div class="ex-info">
            <span class="ex-name">${ex.name}</span>
            <span class="ex-target">${ex.target}</span>
          </div>
          <span class="ex-sets">${ex.sets}</span>
        </div>
      `).join('');

      const encodedMsg = encodeURIComponent(data.whatsappText);
      const isSunday = dayKey === 'sun';
      const isSat = dayKey === 'sat';

      scheduleDisplay.innerHTML = `
        <div class="sched-header">
          <div class="sched-title-group">
            <div class="sched-meta-tags">
              <span class="section-tag" style="margin:0;"><i class="fa-solid fa-dumbbell"></i> ${data.splitBadge}</span>
              <span class="sched-coach-tag"><i class="fa-solid fa-user-shield" style="color:var(--gold-primary);"></i> Supervised by: <strong>${data.trainer}</strong></span>
            </div>
            <h3>${data.dayName}: ${data.title}</h3>
          </div>
          <a href="https://wa.me/919446788888?text=${encodedMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 10px 22px; font-size: 0.86rem;">
            <i class="fa-brands fa-whatsapp"></i> ${isSunday ? 'Enquire for Monday' : 'Reserve Spot on WhatsApp'}
          </a>
        </div>

        <div class="sched-timings-grid">
          <div class="sched-time-slot morning">
            <span class="sched-time-label"><i class="fa-solid fa-sun"></i> Morning Batch</span>
            <span class="sched-time-hours">${isSunday ? '5:30 AM – 11:30 AM' : '5:30 AM – 11:30 AM IST'}</span>
            <p class="sched-time-desc">${data.morningSlot}</p>
          </div>
          <div class="sched-time-slot evening">
            <span class="sched-time-label"><i class="fa-solid fa-moon"></i> Evening Batch</span>
            <span class="sched-time-hours">${isSat ? '4:30 PM – 8:30 PM IST' : isSunday ? '4:30 PM – 9:30 PM' : '4:30 PM – 9:30 PM IST'}</span>
            <p class="sched-time-desc">${data.eveningSlot}</p>
          </div>
        </div>

        <div class="sched-protocol-box">
          <div class="sched-protocol-title">
            <i class="fa-solid fa-list-check" style="color:var(--gold-primary);"></i>
            <span>Curated ${data.dayName} Workout Regimen & Target Sets:</span>
          </div>
          <div class="sched-exercises-grid">
            ${exercisesHtml}
          </div>
        </div>

        <div class="sched-extra-grid">
          <div class="sched-tip-card">
            <h5><i class="fa-solid fa-heart-pulse"></i> Warmup & Mobility Protocol</h5>
            <p>${data.warmup}</p>
          </div>
          <div class="sched-tip-card">
            <h5><i class="fa-solid fa-apple-whole"></i> Coach Sumesh Nutrition Directive</h5>
            <p>${data.nutrition}</p>
          </div>
        </div>
      `;

      scheduleDisplay.style.opacity = '1';
      scheduleDisplay.style.transform = 'translateY(0)';
    }, 150);
  }

  // Initial Render for Monday on load
  renderDayRoutine('mon');

  // Tab click listeners
  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const dayKey = btn.getAttribute('data-day');
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDayRoutine(dayKey);
    });
  });
}

/* =============================================================================
   6. GALLERY FILTER AND LIGHTBOX SYSTEM
   ============================================================================= */
function initGalleryAndLightbox() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('galleryLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentGalleryList = Array.from(galleryCards);
  let currentIndex = 0;

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.getAttribute('data-filter');
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Update active list for lightbox
      currentGalleryList = Array.from(galleryCards).filter(c => c.style.display !== 'none');
    });
  });

  // Open Lightbox
  function openLightbox(index) {
    if (!lightboxModal || !currentGalleryList[index]) return;
    currentIndex = index;
    const activeCard = currentGalleryList[index];
    const imgEl = activeCard.querySelector('img');
    const captionEl = activeCard.querySelector('.gallery-caption-text');

    if (lightboxImg && imgEl) lightboxImg.src = imgEl.src;
    if (lightboxCaption && captionEl) lightboxCaption.textContent = captionEl.textContent;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentGalleryList.length;
    openLightbox(currentIndex);
  }

  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const index = currentGalleryList.indexOf(card);
      if (index !== -1) openLightbox(index);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/* =============================================================================
   7. IST REAL-TIME LIVE GYM STATUS
   ============================================================================= */
function initISTLiveGymStatus() {
  const statusEls = document.querySelectorAll('#liveGymStatus, #qbarLiveStatus');
  if (!statusEls.length) return;

  function updateStatus() {
    const now = new Date();
    const options = { timeZone: 'Asia/Kolkata', hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    let weekday = '';
    let hour = 0;
    let minute = 0;

    parts.forEach(p => {
      if (p.type === 'weekday') weekday = p.value;
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    });

    const totalMins = hour * 60 + minute;
    const morningOpen = 5 * 60 + 30; // 5:30 AM (330m)
    const morningClose = 11 * 60 + 30; // 11:30 AM (690m)
    const eveningOpen = 16 * 60 + 30; // 4:30 PM (990m)
    const eveningClose = 21 * 60 + 30; // 9:30 PM (1290m)

    statusEls.forEach(el => {
      if (weekday === 'Sun') {
        el.innerHTML = `<span class="status-dot" style="background:#EF4444;box-shadow:0 0 10px #EF4444;"></span> CLOSED TODAY (SUNDAY IST)`;
      } else if ((totalMins >= morningOpen && totalMins < morningClose) || (totalMins >= eveningOpen && totalMins < eveningClose)) {
        const closeTimeStr = totalMins < morningClose ? '11:30 AM IST' : '9:30 PM IST';
        el.innerHTML = `<span class="status-dot"></span> OPEN NOW (UNTIL ${closeTimeStr})`;
      } else if (totalMins < morningOpen) {
        el.innerHTML = `<span class="status-dot" style="background:#F59E0B;box-shadow:0 0 10px #F59E0B;"></span> OPENS AT 5:30 AM IST TODAY`;
      } else if (totalMins >= morningClose && totalMins < eveningOpen) {
        el.innerHTML = `<span class="status-dot" style="background:#F59E0B;box-shadow:0 0 10px #F59E0B;"></span> REOPENS AT 4:30 PM IST TODAY`;
      } else {
        el.innerHTML = `<span class="status-dot" style="background:#F59E0B;box-shadow:0 0 10px #F59E0B;"></span> CLOSED FOR THE NIGHT (5:30 AM TOMORROW)`;
      }
    });
  }

  updateStatus();
  setInterval(updateStatus, 60000); // Check every minute
}

/* =============================================================================
   8. CANVAS SPARKLE PARTICLES & 3D TILT
   ============================================================================= */
function initSparkleCanvas() {
  const canvas = document.getElementById('sparkleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = 40;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(255, 215, 0, ' : 'rgba(255, 46, 99, ',
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.5 - 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color + '0.7)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 1024) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

function initCard3DTilt() {
  if (window.innerWidth < 1024) return;
  const cards = document.querySelectorAll('.glass-card, .pricing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* =============================================================================
   9. HEADER, PROGRESS & SCROLL REVEALS
   ============================================================================= */
function initHeaderAndProgress() {
  const header = document.getElementById('mainHeader');
  const progressBar = document.getElementById('scrollProgressBar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';

    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-active');
      mobileToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        mobileToggle.classList.remove('active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-active') && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-active');
        mobileToggle.classList.remove('active');
      }
    });
  }
}

function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger counters inside
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter);
          }
        });
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const duration = 1800; // ms
  const isFloat = el.getAttribute('data-float') === 'true';
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

    const currentVal = start + (target - start) * easeProgress;
    el.textContent = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isFloat ? target.toFixed(1) : target;
    }
  }

  requestAnimationFrame(update);
}

/* =============================================================================
   10. MODAL & ENQUIRY FORMS
   ============================================================================= */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initEnquiryAndTrialModals() {
  // Free Trial Modal
  const trialModal = document.getElementById('trialModalBackdrop');
  const trialOpenBtns = document.querySelectorAll('.open-trial-modal');
  const trialCloseBtn = document.getElementById('trialModalClose');
  const trialForm = document.getElementById('trialPassForm');

  trialOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (trialModal) trialModal.classList.add('active');
    });
  });

  if (trialCloseBtn && trialModal) {
    trialCloseBtn.addEventListener('click', () => trialModal.classList.remove('active'));
    trialModal.addEventListener('click', (e) => {
      if (e.target === trialModal) trialModal.classList.remove('active');
    });
  }

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('trialName').value;
      const phone = document.getElementById('trialPhone').value;
      const slot = document.getElementById('trialSlot').value;
      const goal = document.getElementById('trialGoal').value;

      const payload = `Hi X-Figure! I would like to book my VIP 1-Day Free Guest Pass.\nName: ${name}\nPhone: ${phone}\nPreferred Slot: ${slot}\nGoal: ${goal}`;
      const url = `https://wa.me/919539445415?text=${encodeURIComponent(payload)}`;

      const alertEl = document.getElementById('trialSuccessAlert');
      if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> VIP Pass generated for ${name}! Redirecting to WhatsApp...`;
      }

      setTimeout(() => {
        window.open(url, '_blank');
        trialForm.reset();
        if (trialModal) trialModal.classList.remove('active');
      }, 1000);
    });
  }

  // Quick Enquiry on-page Form
  const enquiryForm = document.getElementById('quickEnquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('enqName').value;
      const phone = document.getElementById('enqPhone').value;
      const goal = document.getElementById('enqGoal').value;
      const message = document.getElementById('enqMessage').value || 'Inquiring about membership & coaching';

      const payload = `Hi Sumesh & X-Figure Team! Enquiry from ${name} (${phone}). Goal: ${goal}. Notes: ${message}`;
      const url = `https://wa.me/919539445415?text=${encodeURIComponent(payload)}`;

      const alertEl = document.getElementById('enquirySuccessAlert');
      if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Opening WhatsApp to connect with Coach Sumesh...`;
      }

      setTimeout(() => {
        window.open(url, '_blank');
        enquiryForm.reset();
      }, 900);
    });
  }
}
