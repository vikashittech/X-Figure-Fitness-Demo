/**
 * X-FIGURE FITNESS - ULTRA LUXURY ANIMATED SCRIPT
 * Handles Canvas Sparkle Particles, Indian Standard Time (IST) Live Status,
 * Card 3D Tilt, FAQ Accordion, Quick Enquiry Form, BMI/Workout Calculators, and Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSparkleCanvas();
  initISTLiveGymStatus();
  initScrollAnimations();
  initCard3DTilt();
  initFAQAccordion();
  initEnquiryForm();
  initBMICalculator();
  initWorkoutGenerator();
  initGalleryFilterAndLightbox();
  initModalSystem();
  initHeaderScroll();
});

/* 1. Canvas Sparkle Particle Engine */
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
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(255, 215, 0, ' : 'rgba(255, 46, 99, ',
      alpha: Math.random() * 0.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      pulse: Math.random() * 0.05
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * 0.003 + p.x) * 0.015;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.max(0.1, Math.min(1, p.alpha)) + ')';
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color + '0.8)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* 2. Indian Standard Time (IST +5:30) Live Gym Hours Calculation */
function initISTLiveGymStatus() {
  const statusEl = document.getElementById('liveGymStatus');
  if (!statusEl) return;

  // Get current date & time in Asia/Kolkata timezone
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

  // Operating Hours in IST
  // Mon-Sat Morning: 5:30 (330 mins) - 11:30 (690 mins)
  // Mon-Sat Evening: 16:30 (990 mins) - 21:30 (1290 mins)
  const morningOpen = 5 * 60 + 30; // 330
  const morningClose = 11 * 60 + 30; // 690
  const eveningOpen = 16 * 60 + 30; // 990
  const eveningClose = 21 * 60 + 30; // 1290

  if (weekday === 'Sun') {
    statusEl.innerHTML = `<span class="status-dot" style="background:#EF4444;box-shadow:0 0 10px #EF4444;"></span> CLOSED TODAY (SUNDAY IST)`;
    statusEl.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    statusEl.style.color = '#EF4444';
  } else if ((totalMins >= morningOpen && totalMins < morningClose) || (totalMins >= eveningOpen && totalMins < eveningClose)) {
    const closeTimeStr = totalMins < morningClose ? '11:30 AM IST' : '9:30 PM IST';
    statusEl.innerHTML = `<span class="status-dot"></span> OPEN NOW IN IST (UNTIL ${closeTimeStr})`;
  } else if (totalMins < morningOpen) {
    statusEl.innerHTML = `<span class="status-dot" style="background:#F59E0B;box-shadow:0 0 10px #F59E0B;"></span> OPENS AT 5:30 AM IST TODAY`;
    statusEl.style.color = '#F59E0B';
  } else if (totalMins >= morningClose && totalMins < eveningOpen) {
    statusEl.innerHTML = `<span class="status-dot" style="background:#F59E0B;box-shadow:0 0 10px #F59E0B;"></span> REOPENS AT 4:30 PM IST TODAY`;
    statusEl.style.color = '#F59E0B';
  } else {
    statusEl.innerHTML = `<span class="status-dot" style="background:#F59E0B;box-shadow:0 0 10px #F59E0B;"></span> CLOSED NOW (OPENS 5:30 AM IST MON)`;
    statusEl.style.color = '#F59E0B';
  }
}

/* 3. Card 3D Tilt Effect on Mouse Move */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.glass-card, .pricing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* 4. FAQ Accordion Logic */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // If wasn't active before, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 5. Quick Enquiry Form Handler */
function initEnquiryForm() {
  const form = document.getElementById('quickEnquiryForm');
  const alertBox = document.getElementById('enquirySuccessAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('enqName').value;
    const phone = document.getElementById('enqPhone').value;
    const goal = document.getElementById('enqGoal').value;
    const message = document.getElementById('enqMessage').value || 'No additional message';

    const textPayload = `Hi X-Figure Fitness! Enquiry from ${name} (${phone}). Goal: ${goal}. Notes: ${message}`;
    const whatsappUrl = `https://wa.me/919539445415?text=${encodeURIComponent(textPayload)}`;

    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Opening WhatsApp to connect with Sumesh & Team...`;
    }

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      form.reset();
    }, 800);
  });
}

/* 6. Header & Scroll Progress */
function initHeaderScroll() {
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
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      mobileToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        mobileToggle.classList.remove('active');
      });
    });
  }
}

/* 7. Intersection Observer Scroll Reveal & Counters */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
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
  const target = parseFloat(el.getAttribute('data-target') || '0');
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
  }, stepTime);
}

/* 8. BMI, BMR, Body Fat & Calorie Calculator */
function initBMICalculator() {
  const genderInput = document.getElementById('bmiGender');
  const ageInput = document.getElementById('bmiAge');
  const heightInput = document.getElementById('bmiHeight');
  const weightInput = document.getElementById('bmiWeight');
  const calcBtn = document.getElementById('calcBmiBtn');
  const resultVal = document.getElementById('bmiResultVal');
  const resultBadge = document.getElementById('bmiResultBadge');
  const calorieVal = document.getElementById('calorieVal');
  const bodyFatVal = document.getElementById('bodyFatVal');

  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const gender = genderInput ? genderInput.value : 'male';
    const age = parseFloat(ageInput ? ageInput.value : '25');
    const h = parseFloat(heightInput.value);
    const w = parseFloat(weightInput.value);

    if (!h || !w || !age || h <= 0 || w <= 0 || age <= 0) {
      alert('Please enter valid Age, Height (cm), and Weight (kg).');
      return;
    }

    // BMI Formula
    const heightInM = h / 100;
    const bmi = (w / (heightInM * heightInM)).toFixed(1);
    resultVal.innerText = bmi;

    // Mifflin-St Jeor BMR Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Daily Maintenance Calories (Moderate Activity x1.55)
    const maintenance = Math.round(bmr * 1.55);
    if (calorieVal) calorieVal.innerText = `${maintenance} kcal/day`;

    // Adult Body Fat % Estimation (Deurenberg Formula)
    const genderFactor = gender === 'male' ? 1 : 0;
    let bodyFat = (1.20 * parseFloat(bmi)) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
    bodyFat = Math.max(5, Math.min(50, bodyFat)).toFixed(1);
    if (bodyFatVal) bodyFatVal.innerText = `${bodyFat}%`;

    // Category Badge
    if (bmi < 18.5) {
      resultBadge.innerText = 'UNDERWEIGHT';
      resultBadge.className = 'result-badge badge-under';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      resultBadge.innerText = 'HEALTHY WEIGHT';
      resultBadge.className = 'result-badge badge-normal';
    } else if (bmi >= 25 && bmi < 29.9) {
      resultBadge.innerText = 'OVERWEIGHT';
      resultBadge.className = 'result-badge badge-over';
    } else {
      resultBadge.innerText = 'OBESE';
      resultBadge.className = 'result-badge badge-over';
    }
  });
}

/* 9. Real Custom Weekly Workout Generator */
function initWorkoutGenerator() {
  const goalSelect = document.getElementById('workoutGoal');
  const levelSelect = document.getElementById('fitnessLevel');
  const genBtn = document.getElementById('genRoutineBtn');
  const routineBox = document.getElementById('routineOutput');

  if (!genBtn) return;

  const realRoutines = {
    fatloss: {
      beginner: {
        title: "X-Figure Starter Fat Loss & Recomp",
        trainer: "Sumesh & Kannan (Guided Form)",
        days: [
          { day: "Mon: Upper Body Fundamentals", ex: "Flat Dumbbell Bench Press (3x12), Lat Pulldown (3x12), Standing Overhead Dumbbell Press (3x12), Cable Bicep Curls (3x15), Tricep Rope Pushdown (3x15)" },
          { day: "Tue: Lower Body & Core Conditioning", ex: "Goblet Squats (3x12), Seated Leg Extensions (3x15), Lying Leg Curls (3x15), Bodyweight Walking Lunges (3x12/leg), Hanging Knee Raises (3x15)" },
          { day: "Wed: Active Recovery & Zone 2 Cardio", ex: "30-min Treadmill Incline Walk + Dynamic Stretching & Foam Rolling" },
          { day: "Thu: Full Body Sculpt", ex: "Dumbbell Incline Press (3x12), Seated Cable Rows (3x12), Dumbbell Romanian Deadlifts (3x12), Dumbbell Lateral Raises (3x15), Plank Holds (3x45s)" },
          { day: "Fri: Core & Functional Endurance", ex: "Kettlebell Swings (4x15), Battle Ropes (4x30s), Ab Mat Crunches (3x20), Stairmaster (20 mins)" },
          { day: "Sat: Trainer Anoop's High-Intensity Cardio", ex: "Special Saturday Group HIIT & Agility Circuit (45-min guided session)" },
          { day: "Sun: Rest Day", ex: "Full body recovery & hydration check with trainers" }
        ]
      },
      intermediate: {
        title: "X-Figure Shred Split (Intermediate)",
        trainer: "Praveen & Anoop (High Density)",
        days: [
          { day: "Mon: Heavy Chest & Triceps Shred", ex: "Barbell Bench Press (4x10), Incline Dumbbell Flyes (3x12), Dips (3xMax), Skullcrushers (4x12), Cable Fly Supersets (3x15)" },
          { day: "Tue: Back & Biceps Width", ex: "Wide Grip Lat Pulldown (4x10), Bent Over Barbell Rows (4x10), Single Arm Dumbbell Rows (3x12), EZ Bar Preacher Curls (4x12), Hammer Curls (3x15)" },
          { day: "Wed: Quads & Calves Burn", ex: "Barbell Back Squats (4x10), Leg Press (4x12), Bulgarian Split Squats (3x10/leg), Standing Calf Raises (4x20)" },
          { day: "Thu: Shoulders & Core Sculpt", ex: "Seated Dumbbell Shoulder Press (4x10), Cable Lateral Raises (4x15), Face Pulls (4x15), Cable Woodchoppers (3x15)" },
          { day: "Fri: Posterior Chain & Hamstrings", ex: "Romanian Deadlifts (4x10), Lying Leg Curls (4x12), Glute Ham Bridges (3x12), Hanging Leg Raises (4x15)" },
          { day: "Sat: Trainer Anoop's Saturday Cardio Blast", ex: "Advanced Saturday High-Intensity Cardio & Plyometrics Group Blast" },
          { day: "Sun: Rest & Diet Review", ex: "Weekly weight & macro check-in with Sumesh" }
        ]
      },
      advanced: {
        title: "X-Figure Pro Competition Conditioning",
        trainer: "Sumesh & Bodybuilding Champions",
        days: [
          { day: "Mon: Push Hypertrophy + HIIT", ex: "Incline Barbell Press (5x8), Flat Dumbbell Flyes (4x10), Cable Crossovers (4x15), Overhead Tricep Extension (4x12), 15-min HIIT Sprints" },
          { day: "Tue: Pull Thickness + Abs", ex: "Weighted Pull-ups (4x8), Barbell T-Bar Rows (4x10), Chest Supported Rows (4x12), Barbell Curls (4x10), Cable Ab Crunches (4x20)" },
          { day: "Tue/Wed: Heavy Legs", ex: "Heavy Barbell Squats (5x6), Hack Squats (4x10), Romanian Deadlifts (4x8), Seated Leg Curls (4x15), Donkey Calf Raises (5x20)" },
          { day: "Thu: Shoulders & Trap Destruction", ex: "Barbell Overhead Press (5x6), Dumbbell Lateral Raises (5x15), Reverse Pec Deck Flyes (4x15), Heavy Dumbbell Shrugs (4x12)" },
          { day: "Fri: Arms & Core Sculpting", ex: "Superset: Barbell Curls (4x10) + Close Grip Bench (4x10), Incline Dumbbell Curls (4x12) + Tricep Pushdowns (4x15), Hanging Toes-to-Bar (4x15)" },
          { day: "Sat: High Intensity Saturday Cardio", ex: "Trainer Anoop's Elite Endurance Circuit + Posing Practice" },
          { day: "Sun: Rest Day", ex: "Complete rest & refeed macro check" }
        ]
      }
    },
    muscle: {
      beginner: {
        title: "X-Figure Foundation Mass Split",
        trainer: "Kannan & Sumesh",
        days: [
          { day: "Mon: Upper Body Mass", ex: "Barbell Bench Press (3x10), Seated Cable Lat Rows (3x10), Dumbbell Shoulder Press (3x12), EZ Bar Bicep Curls (3x12), Tricep Dips (3x12)" },
          { day: "Tue: Lower Body Mass", ex: "Barbell Back Squat (3x10), Dumbbell Romanian Deadlift (3x10), Leg Press (3x12), Standing Calf Raise (3x15)" },
          { day: "Wed: Rest & Recovery", ex: "Active recovery walk & flexibility" },
          { day: "Thu: Push Hypertrophy", ex: "Incline Dumbbell Press (3x10), Cable Crossovers (3x12), Dumbbell Lateral Raises (3x15), Skullcrushers (3x12)" },
          { day: "Fri: Pull & Core", ex: "Lat Pulldowns (3x10), Single Arm Rows (3x12), Cable Hammer Curls (3x12), Abdominal Crunches (3x20)" },
          { day: "Sat: Legs & Cardio", ex: "Leg Extensions (3x15), Lying Leg Curls (3x15), Anoop's Saturday Cardio session" },
          { day: "Sun: Rest", ex: "Nutrient dense meal prep & rest" }
        ]
      },
      intermediate: {
        title: "X-Figure Hypertrophy Titan 5-Day Split",
        trainer: "Praveen & Sumesh",
        days: [
          { day: "Mon: Chest & Triceps Hypertrophy", ex: "Barbell Bench Press (4x8), Incline Dumbbell Flyes (4x10), Cable Flyes (3x15), Skullcrushers (4x10), Tricep Rope Pushdowns (3x15)" },
          { day: "Tue: Back & Biceps Width", ex: "Barbell Deadlifts (4x6), Wide Lat Pulldowns (4x10), T-Bar Rows (4x10), Standing Barbell Curls (4x10), Incline Dumbbell Curls (3x12)" },
          { day: "Wed: Rest Day", ex: "Full rest & mobility work" },
          { day: "Thu: Quad & Calf Destruction", ex: "Barbell Back Squats (4x8), Leg Press (4x10), Walking Lunges (3x12/leg), Standing Calf Raises (5x15)" },
          { day: "Fri: Shoulder Boulders & Arms", ex: "Seated Dumbbell Press (4x8), Dumbbell Lateral Raises (4x15), Rear Delt Cable Flyes (4x15), Preacher Curls (4x10), Overhead Tricep Extensions (4x12)" },
          { day: "Sat: Hamstrings & Saturday Cardio", ex: "Romanian Deadlifts (4x8), Seated Leg Curls (4x12), Anoop's Saturday High Cardio" },
          { day: "Sun: Rest Day", ex: "Diet progress check with Kannan" }
        ]
      },
      advanced: {
        title: "X-Figure Maximum Mass Overload",
        trainer: "Sumesh (Owner)",
        days: [
          { day: "Mon: Heavy Chest & Front Delts", ex: "Incline Barbell Bench (5x5), Flat Dumbbell Press (4x8), Cable Crossovers (4x12), Seated Arnold Press (4x8)" },
          { day: "Tue: Heavy Back & Rear Delts", ex: "Conventional Deadlifts (5x5), Weighted Pull-ups (4x8), Pendlay Barbell Rows (4x8), Reverse Pec Deck (4x15)" },
          { day: "Wed: Leg Day (Quad Heavy)", ex: "Barbell Squats (5x5), Hack Squats (4x8), Leg Press Drop-Sets (4x12), Standing Calf Raises (5x15)" },
          { day: "Thu: Heavy Shoulders & Traps", ex: "Standing Military Press (5x5), Cable Lateral Raises (5x12), Barbell Shrugs (4x10), Face Pulls (4x15)" },
          { day: "Fri: Arm Farm (Biceps/Triceps)", ex: "Close Grip Bench Press (4x8) superset with Heavy Barbell Curls (4x8), Cable Tricep Pushdowns (4x12) with Hammer Curls (4x12)" },
          { day: "Sat: Posterior Chain & Saturday Cardio", ex: "Romanian Deadlifts (4x8), Lying Leg Curls (4x12), Anoop's Saturday Cardio" },
          { day: "Sun: Rest & Recovery", ex: "Recovery massage & sleep focus" }
        ]
      }
    },
    strength: {
      beginner: {
        title: "X-Figure Power Foundations",
        trainer: "Kannan & Sumesh",
        days: [
          { day: "Mon: Squat & Upper Push", ex: "Barbell Squats (3x5), Barbell Bench Press (3x5), Lat Pulldowns (3x10), Planks (3x60s)" },
          { day: "Tue: Rest Day", ex: "Active recovery walk" },
          { day: "Wed: Deadlift & Overhead Press", ex: "Barbell Deadlift (3x5), Overhead Barbell Press (3x5), Cable Rows (3x10), Hanging Knee Raises (3x15)" },
          { day: "Thu: Rest Day", ex: "Mobility stretching" },
          { day: "Fri: Squat & Bench Volume", ex: "Barbell Squats (3x8), Dumbbell Bench Press (3x8), Romanian Deadlifts (3x10), Face Pulls (3x15)" },
          { day: "Sat: Saturday Cardio & Core", ex: "Anoop's Saturday Cardio + Abdominal Circuit" },
          { day: "Sun: Rest", ex: "Hydration & rest" }
        ]
      },
      intermediate: {
        title: "Kerala Power & Performance 4-Day Split",
        trainer: "Praveen & Kannan",
        days: [
          { day: "Mon: Squat Heavy Focus", ex: "Barbell Back Squat (5x5), Paused Squats (3x5), Leg Press (3x10), Hanging Leg Raises (4x12)" },
          { day: "Tue: Bench Press Heavy Focus", ex: "Barbell Bench Press (5x5), Close Grip Bench (3x8), Incline Dumbbell Press (3x10), Cable Rows (4x10)" },
          { day: "Wed: Rest Day", ex: "Foam rolling & mobility" },
          { day: "Thu: Deadlift Heavy Focus", ex: "Conventional Deadlifts (5x3), Deficit Deadlifts (3x5), Barbell Shrugs (4x10), Ab Wheel Rollouts (3x12)" },
          { day: "Fri: Overhead Press & Upper Body", ex: "Standing Overhead Press (5x5), Weighted Dips (3x8), Barbell Curls (4x10), Face Pulls (4x15)" },
          { day: "Sat: Saturday Cardio & Conditioning", ex: "Anoop's Group HIIT Cardio Session" },
          { day: "Sun: Rest Day", ex: "Diet review with Sumesh" }
        ]
      },
      advanced: {
        title: "X-Figure Elite Powerlifting Peak",
        trainer: "Sumesh & Competition Champions",
        days: [
          { day: "Mon: Max Effort Squat", ex: "Low Bar Squats (Work up to 1x3 Top Set, then 4x5 Back-off), Safety Bar Squats (3x6), Bulgarian Split Squats (3x8/leg)" },
          { day: "Tue: Max Effort Bench", ex: "Competition Bench Press (Work up to 1x3 Top Set, then 4x5 Back-off), Spoto Press (3x5), Heavy Dumbbell Rows (4x8)" },
          { day: "Wed: Rest & Recovery", ex: "Massage & active mobility" },
          { day: "Thu: Max Effort Deadlift", ex: "Conventional/Sumo Deadlifts (Work up to 1x2 Top Set, then 3x4 Back-off), Block Pulls (3x4), Glute Ham Raises (4x10)" },
          { day: "Fri: Accessory Power", ex: "Strict Overhead Press (4x6), Incline Dumbbell Press (4x8), Heavy Lat Pulldowns (4x8), Ab Roller (4x15)" },
          { day: "Sat: Saturday Cardio & Conditioning", ex: "Anoop's Group Cardio + Posing/Form Analysis" },
          { day: "Sun: Rest Day", ex: "Full recovery & macro review" }
        ]
      }
    }
  };

  genBtn.addEventListener('click', () => {
    const goal = goalSelect ? goalSelect.value : 'fatloss';
    const level = levelSelect ? levelSelect.value : 'beginner';

    const selectedCategory = realRoutines[goal] || realRoutines.fatloss;
    const selected = selectedCategory[level] || selectedCategory.beginner;

    let html = `
      <div style="width:100%;">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,215,0,0.25);padding-bottom:12px;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div>
            <h4 style="color:var(--gold-primary);font-size:1.25rem;font-weight:800;">${selected.title}</h4>
            <div style="font-size:0.82rem;color:var(--text-muted);">Lead Trainer: <strong style="color:var(--text-main);">${selected.trainer}</strong></div>
          </div>
          <span style="background:rgba(255,215,0,0.12);border:1px solid var(--gold-primary);color:var(--gold-primary);padding:4px 12px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:700;text-transform:uppercase;">Verified X-Figure Plan</span>
        </div>

        <div style="display:grid;gap:12px;">
          ${selected.days.map(d => `
            <div style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-md);padding:14px;">
              <div style="font-weight:700;color:var(--gold-primary);font-size:0.95rem;margin-bottom:4px;">${d.day}</div>
              <div style="font-size:0.88rem;color:var(--text-main);line-height:1.5;">${d.ex}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    routineBox.innerHTML = html;
  });
}

/* 10. Gallery & Lightbox */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const galleryItems = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }
}

/* 11. Modal System */
function initModalSystem() {
  const modalBackdrop = document.getElementById('joinModal');
  const modalClose = document.getElementById('modalClose');
  const triggerBtns = document.querySelectorAll('.open-join-modal');
  const joinForm = document.getElementById('joinForm');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan') || 'Standard Membership';
      const planInput = document.getElementById('modalPlanName');
      if (planInput) planInput.value = planName;
      if (modalBackdrop) modalBackdrop.classList.add('active');
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => modalBackdrop.classList.remove('active'));
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
    });
  }

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('memberName').value;
      const phone = document.getElementById('memberPhone').value;
      const plan = document.getElementById('modalPlanName').value;
      const slot = document.getElementById('preferredSlot').value;

      const message = `Hello X-Figure Fitness team! My name is ${name} (${phone}). I am interested in joining the ${plan} plan for ${slot} workouts. Please call me back!`;
      const whatsappUrl = `https://wa.me/919539445415?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');
      modalBackdrop.classList.remove('active');
    });
  }
}
