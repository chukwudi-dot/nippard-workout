export const DAYS = [
  {
    id: 'upper-a',
    label: 'Upper A',
    tag: 'STRENGTH',
    day: 'MON',
    accent: '#E8FF47',
    bg: 'rgba(232,255,71,0.07)',
    focus: 'Heavy horizontal push / pull',
    exercises: [
      { name: 'Smith Machine Bench Press', sets: 4, reps: '5–6', rest: '3–4 min', equipment: 'Smith Machine', sub: 'Primary chest compound', cue: 'Tuck elbows 45°, squeeze shoulder blades, controlled 2-sec descent. Smith lets you go heavier safely solo.', gifQuery: 'bench press', muscle: 'Chest', compound: true, swaps: ['Dumbbell Bench Press', 'Push-Up (Weighted)'] },
      { name: 'Cable Seated Row', sets: 4, reps: '6–8', rest: '3–4 min', equipment: 'Lat/Row Machine', sub: 'Primary back compound', cue: 'Pull elbows tight to sides, hold 1 sec at peak. Full stretch on return — don\'t cut range short.', gifQuery: 'seated cable row', muscle: 'Back', compound: true, swaps: ['Dumbbell Row (Two-Arm)', 'T-Bar Row'] },
      { name: 'Smith Machine Incline Press', sets: 3, reps: '10', rest: '2–3 min', equipment: 'Smith Machine', sub: 'Upper chest hypertrophy', cue: 'Set bench to 30–45°. Pause briefly at bottom to kill momentum. Targets the clavicular pec head.', gifQuery: 'incline bench press', muscle: 'Upper Chest', compound: true, swaps: ['Dumbbell Incline Press', 'Incline Cable Fly'] },
      { name: 'Lat Pulldown', sets: 3, reps: '10–12', rest: '2–3 min', equipment: 'Lat Pulldown Machine', sub: 'Lat width', cue: 'Shoulder-width grip, pull elbows DOWN and IN toward hips. Slight lean back is fine.', gifQuery: 'lat pulldown', muscle: 'Lats', compound: true, swaps: ['Pull-Up (Assisted)', 'Straight Arm Pulldown'] },
      { name: 'Dumbbell Lateral Raise', sets: 3, reps: '15–20', rest: '1–2 min', equipment: 'Dumbbells', sub: 'Side delt isolation', cue: 'Lead with elbows, slight forward lean. Avoid shrugging. Control the lowering phase.', gifQuery: 'lateral raise', muscle: 'Side Delts', swaps: ['Cable Lateral Raise', 'Machine Lateral Raise'] },
      { name: 'Cable Tricep Pushdown', sets: 3, reps: '12–15', rest: '1 min', equipment: 'Functional Cable', sub: 'Tricep isolation', cue: 'Spread the rope apart at the bottom. Lock upper arms at your sides — only forearms move.', gifQuery: 'tricep pushdown rope', muscle: 'Triceps', swaps: ['Overhead Tricep Extension', 'Skull Crushers'] },
    ],
  },
  {
    id: 'lower-a',
    label: 'Lower A',
    tag: 'STRENGTH',
    day: 'TUE',
    accent: '#FF6B35',
    bg: 'rgba(255,107,53,0.07)',
    focus: 'Quad dominant / heavy compound',
    exercises: [
      { name: 'Smith Machine Back Squat', sets: 4, reps: '5–6', rest: '3–4 min', equipment: 'Smith Machine', sub: 'Primary leg compound', cue: 'Feet slightly forward of bar. 15° toe flare, drive knees out. The Smith lets you go deep safely.', gifQuery: 'barbell squat', muscle: 'Quads', compound: true, swaps: ['Goblet Squat', 'Leg Press'] },
      { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10', rest: '2–3 min', equipment: 'Dumbbells (40–50 lbs)', sub: 'Hamstring / glute hinge', cue: 'Neutral lower back, push hips BACK. Feel the stretch in hamstrings. Never round your spine.', gifQuery: 'romanian deadlift dumbbell', muscle: 'Hamstrings', compound: true, swaps: ['Cable Romanian Deadlift', 'Good Morning'] },
      { name: 'Leg Extension', sets: 3, reps: '12–15', rest: '1–2 min', equipment: 'Leg Extension Machine', sub: 'Quad isolation', cue: 'Full range of motion. Squeeze and hold 1 sec at the top. Control the descent.', gifQuery: 'leg extension', muscle: 'Quads', swaps: ['Sissy Squat', 'Wall Sit'] },
      { name: 'Lying Leg Curl', sets: 3, reps: '10–12', rest: '1–2 min', equipment: 'Leg Curl Machine', sub: 'Hamstring isolation', cue: 'Squeeze hamstrings hard. Slow 3-sec eccentric. Don\'t let hips rise off the pad.', gifQuery: 'lying leg curl', muscle: 'Hamstrings', swaps: ['Seated Leg Curl', 'Nordic Curl'] },
      { name: 'Cable Pull-Through', sets: 3, reps: '15', rest: '1 min', equipment: 'Functional Cable (low pulley)', sub: 'Glute / posterior chain finisher', cue: 'Hip hinge — don\'t squat it. Squeeze glutes hard at the top. Keep arms passive throughout.', gifQuery: 'cable pull through', muscle: 'Glutes', swaps: ['Hip Thrust (Dumbbell)', 'Glute Bridge'] },
    ],
  },
  {
    id: 'upper-b',
    label: 'Upper B',
    tag: 'VOLUME',
    day: 'THU',
    accent: '#A78BFA',
    bg: 'rgba(167,139,250,0.07)',
    focus: 'Vertical push / pull + isolation',
    exercises: [
      { name: 'Smith Machine Overhead Press', sets: 3, reps: '8–10', rest: '2–3 min', equipment: 'Smith Machine', sub: 'Shoulder compound', cue: 'Press in front of face. Squeeze glutes and brace core to avoid lower back arch.', gifQuery: 'overhead press barbell', muscle: 'Shoulders', compound: true, swaps: ['Dumbbell Shoulder Press', 'Arnold Press'] },
      { name: 'Lat Pulldown (Underhand)', sets: 3, reps: '10–12', rest: '2–3 min', equipment: 'Lat Pulldown Machine', sub: 'Lats + bicep recruitment', cue: 'Supinated grip. Pull elbows to sides. More bicep involvement — great pairing with the press.', gifQuery: 'underhand lat pulldown', muscle: 'Lats', compound: true, swaps: ['Chin-Up (Assisted)', 'Cable Row (Underhand)'] },
      { name: 'Cable Chest Fly', sets: 3, reps: '12–15', rest: '1–2 min', equipment: 'Cable Machine', sub: 'Chest isolation / stretch', cue: 'Slight bend in elbows. Focus on the STRETCH at the bottom — that\'s where growth happens.', gifQuery: 'cable chest fly', muscle: 'Chest', swaps: ['Dumbbell Fly', 'Pec Deck'] },
      { name: 'Dumbbell One-Arm Row', sets: 3, reps: '12', rest: '1–2 min', equipment: 'Dumbbells (40–50 lbs)', sub: 'Unilateral back thickness', cue: 'Brace knee on bench. Drive elbow up and BACK. Full stretch at the bottom every rep.', gifQuery: 'one arm dumbbell row', muscle: 'Back', compound: true, swaps: ['Cable One-Arm Row', 'Meadows Row'] },
      { name: 'Cable Face Pull', sets: 3, reps: '15–20', rest: '1 min', equipment: 'Functional Cable (high pulley)', sub: 'Rear delt / rotator cuff health', cue: 'Pull rope to FOREHEAD, spread arms OUT. Non-negotiable for shoulder health — every upper day.', gifQuery: 'cable face pull', muscle: 'Rear Delts', swaps: ['Band Face Pull', 'Reverse Fly'] },
      { name: 'Dumbbell Supinated Curl', sets: 3, reps: '10–12', rest: '1 min', equipment: 'Dumbbells', sub: 'Bicep peak', cue: 'Supinate (rotate palm up) as you curl. Drive your PINKY into handle harder than index finger.', gifQuery: 'dumbbell bicep curl supinated', muscle: 'Biceps', swaps: ['Cable Curl', 'Hammer Curl'] },
    ],
  },
  {
    id: 'lower-b',
    label: 'Lower B',
    tag: 'VOLUME',
    day: 'FRI',
    accent: '#34D399',
    bg: 'rgba(52,211,153,0.07)',
    focus: 'Hip dominant / single-leg volume',
    exercises: [
      { name: 'Smith Machine Bulgarian Split Squat', sets: 3, reps: '10–12 ea.', rest: '2–3 min', equipment: 'Smith Machine', sub: 'Unilateral quad / glute', cue: 'Rear foot on bench, bar across upper traps. Big step forward. Sink straight down — don\'t lean.', gifQuery: 'bulgarian split squat', muscle: 'Quads', compound: true, swaps: ['Dumbbell Bulgarian Split Squat', 'Step-Up'] },
      { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '12', rest: '2 min', equipment: 'Dumbbells (35–45 lbs)', sub: 'Hamstring / glute volume', cue: 'Higher rep version of Lower A. Focus on the stretch and squeezing glutes at lockout.', gifQuery: 'romanian deadlift dumbbell', muscle: 'Hamstrings', compound: true, swaps: ['Stiff-Leg Deadlift', 'Cable Pull-Through'] },
      { name: 'Leg Extension', sets: 3, reps: '15', rest: '1–2 min', equipment: 'Leg Extension Machine', sub: 'Quad isolation (volume)', cue: 'Lighter weight, higher reps today. Slow 2-sec lowering phase. Feel the burn.', gifQuery: 'leg extension', muscle: 'Quads', swaps: ['Sissy Squat', 'Wall Sit'] },
      { name: 'Lying Leg Curl', sets: 3, reps: '12–15', rest: '1–2 min', equipment: 'Leg Curl Machine', sub: 'Hamstring isolation (volume)', cue: '3-second eccentric. Stretch the hamstring on the way down, squeeze on the way up.', gifQuery: 'lying leg curl', muscle: 'Hamstrings', swaps: ['Seated Leg Curl', 'Swiss Ball Curl'] },
      { name: 'Dumbbell Walking Lunge', sets: 3, reps: '12 steps ea.', rest: '1–2 min', equipment: 'Dumbbells (20–35 lbs each)', sub: 'Glute / quad finisher', cue: 'Long stride, knee hovers above floor. Stay upright. Use all available space.', gifQuery: 'dumbbell walking lunge', muscle: 'Glutes', compound: true, swaps: ['Reverse Lunge', 'Goblet Lunge'] },
      { name: 'Cable Pull-Through', sets: 3, reps: '15', rest: '1 min', equipment: 'Functional Cable (low pulley)', sub: 'Glute finisher', cue: 'Same as Lower A. Reinforce the hip hinge. Squeeze glutes aggressively at lockout.', gifQuery: 'cable pull through', muscle: 'Glutes', swaps: ['Hip Thrust (Dumbbell)', 'Glute Bridge'] },
    ],
  },
]

export const SCHEDULE = [
  { day: 'MON', label: 'Upper A', active: true, id: 'upper-a' },
  { day: 'TUE', label: 'Lower A', active: true, id: 'lower-a' },
  { day: 'WED', label: 'Rest', active: false },
  { day: 'THU', label: 'Upper B', active: true, id: 'upper-b' },
  { day: 'FRI', label: 'Lower B', active: true, id: 'lower-b' },
  { day: 'SAT', label: 'Rest', active: false },
  { day: 'SUN', label: 'Rest', active: false },
]

export const TIPS = [
  { icon: '\u{1F4C8}', title: 'Progressive Overload', body: 'Add 1 rep or 2.5\u20135 lbs each week. This single habit drives 90% of results.' },
  { icon: '\u{1F3AF}', title: 'Train Near Failure', body: 'Stop 2\u20133 reps short (RPE 7\u20138) on most sets. Last set of each exercise: RPE 9.' },
  { icon: '\u23F1\uFE0F', title: 'Rest Times Matter', body: 'Compounds: 3\u20134 min. Isolation: 1\u20132 min. Cutting rest short kills strength output.' },
  { icon: '\u{1F504}', title: 'Deload Every 6\u20138 Weeks', body: 'Drop weight 40% for one week. Mandatory \u2014 this is when you actually grow.' },
  { icon: '\u{1F373}', title: 'Protein Target', body: '0.8\u20131g per lb of bodyweight daily. Spread across 4+ meals.' },
  { icon: '\u{1F634}', title: 'Sleep = Gains', body: '7\u20139 hrs. Growth hormone peaks during deep sleep. Don\'t skip this.' },
]

export const EQUIPMENT = [
  ['\u{1F3D7}\uFE0F', 'Smith Machine'],
  ['\u{1F3CB}\uFE0F', 'Dumbbells (up to 50 lbs)'],
  ['\u{1F517}', 'Functional Cable'],
  ['\u2B06\uFE0F', 'Chest/Shoulder Press Cable'],
  ['\u{1F9B5}', 'Leg Curl/Extension Machine'],
  ['\u2B07\uFE0F', 'Lat Pulldown/Row Machine'],
]
