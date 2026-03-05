import { useState, useRef, useEffect } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────
const DAYS = [
  {
    id: 'upper-a',
    label: 'Upper A',
    tag: 'STRENGTH',
    day: 'MON',
    accent: '#E8FF47',
    bg: 'rgba(232,255,71,0.07)',
    focus: 'Heavy horizontal push / pull',
    exercises: [
      { name: 'Smith Machine Bench Press', sets: 4, reps: '5–6', rest: '3–4 min', equipment: 'Smith Machine', sub: 'Primary chest compound', cue: 'Tuck elbows 45°, squeeze shoulder blades, controlled 2-sec descent. Smith lets you go heavier safely solo.', gifQuery: 'bench press', muscle: 'Chest' },
      { name: 'Cable Seated Row', sets: 4, reps: '6–8', rest: '3–4 min', equipment: 'Lat/Row Machine', sub: 'Primary back compound', cue: 'Pull elbows tight to sides, hold 1 sec at peak. Full stretch on return — don\'t cut range short.', gifQuery: 'seated cable row', muscle: 'Back' },
      { name: 'Smith Machine Incline Press', sets: 3, reps: '10', rest: '2–3 min', equipment: 'Smith Machine', sub: 'Upper chest hypertrophy', cue: 'Set bench to 30–45°. Pause briefly at bottom to kill momentum. Targets the clavicular pec head.', gifQuery: 'incline bench press', muscle: 'Upper Chest' },
      { name: 'Lat Pulldown', sets: 3, reps: '10–12', rest: '2–3 min', equipment: 'Lat Pulldown Machine', sub: 'Lat width', cue: 'Shoulder-width grip, pull elbows DOWN and IN toward hips. Slight lean back is fine.', gifQuery: 'lat pulldown', muscle: 'Lats' },
      { name: 'Dumbbell Lateral Raise', sets: 3, reps: '15–20', rest: '1–2 min', equipment: 'Dumbbells', sub: 'Side delt isolation', cue: 'Lead with elbows, slight forward lean. Avoid shrugging. Control the lowering phase.', gifQuery: 'lateral raise', muscle: 'Side Delts' },
      { name: 'Cable Tricep Pushdown', sets: 3, reps: '12–15', rest: '1 min', equipment: 'Functional Cable', sub: 'Tricep isolation', cue: 'Spread the rope apart at the bottom. Lock upper arms at your sides — only forearms move.', gifQuery: 'tricep pushdown rope', muscle: 'Triceps' },
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
      { name: 'Smith Machine Back Squat', sets: 4, reps: '5–6', rest: '3–4 min', equipment: 'Smith Machine', sub: 'Primary leg compound', cue: 'Feet slightly forward of bar. 15° toe flare, drive knees out. The Smith lets you go deep safely.', gifQuery: 'barbell squat', muscle: 'Quads' },
      { name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10', rest: '2–3 min', equipment: 'Dumbbells (40–50 lbs)', sub: 'Hamstring / glute hinge', cue: 'Neutral lower back, push hips BACK. Feel the stretch in hamstrings. Never round your spine.', gifQuery: 'romanian deadlift dumbbell', muscle: 'Hamstrings' },
      { name: 'Leg Extension', sets: 3, reps: '12–15', rest: '1–2 min', equipment: 'Leg Extension Machine', sub: 'Quad isolation', cue: 'Full range of motion. Squeeze and hold 1 sec at the top. Control the descent.', gifQuery: 'leg extension', muscle: 'Quads' },
      { name: 'Lying Leg Curl', sets: 3, reps: '10–12', rest: '1–2 min', equipment: 'Leg Curl Machine', sub: 'Hamstring isolation', cue: 'Squeeze hamstrings hard. Slow 3-sec eccentric. Don\'t let hips rise off the pad.', gifQuery: 'lying leg curl', muscle: 'Hamstrings' },
      { name: 'Cable Pull-Through', sets: 3, reps: '15', rest: '1 min', equipment: 'Functional Cable (low pulley)', sub: 'Glute / posterior chain finisher', cue: 'Hip hinge — don\'t squat it. Squeeze glutes hard at the top. Keep arms passive throughout.', gifQuery: 'cable pull through', muscle: 'Glutes' },
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
      { name: 'Smith Machine Overhead Press', sets: 3, reps: '8–10', rest: '2–3 min', equipment: 'Smith Machine', sub: 'Shoulder compound', cue: 'Press in front of face. Squeeze glutes and brace core to avoid lower back arch.', gifQuery: 'overhead press barbell', muscle: 'Shoulders' },
      { name: 'Lat Pulldown (Underhand)', sets: 3, reps: '10–12', rest: '2–3 min', equipment: 'Lat Pulldown Machine', sub: 'Lats + bicep recruitment', cue: 'Supinated grip. Pull elbows to sides. More bicep involvement — great pairing with the press.', gifQuery: 'underhand lat pulldown', muscle: 'Lats' },
      { name: 'Cable Chest Fly', sets: 3, reps: '12–15', rest: '1–2 min', equipment: 'Cable Machine', sub: 'Chest isolation / stretch', cue: 'Slight bend in elbows. Focus on the STRETCH at the bottom — that\'s where growth happens.', gifQuery: 'cable chest fly', muscle: 'Chest' },
      { name: 'Dumbbell One-Arm Row', sets: 3, reps: '12', rest: '1–2 min', equipment: 'Dumbbells (40–50 lbs)', sub: 'Unilateral back thickness', cue: 'Brace knee on bench. Drive elbow up and BACK. Full stretch at the bottom every rep.', gifQuery: 'one arm dumbbell row', muscle: 'Back' },
      { name: 'Cable Face Pull', sets: 3, reps: '15–20', rest: '1 min', equipment: 'Functional Cable (high pulley)', sub: 'Rear delt / rotator cuff health', cue: 'Pull rope to FOREHEAD, spread arms OUT. Non-negotiable for shoulder health — every upper day.', gifQuery: 'cable face pull', muscle: 'Rear Delts' },
      { name: 'Dumbbell Supinated Curl', sets: 3, reps: '10–12', rest: '1 min', equipment: 'Dumbbells', sub: 'Bicep peak', cue: 'Supinate (rotate palm up) as you curl. Drive your PINKY into handle harder than index finger.', gifQuery: 'dumbbell bicep curl supinated', muscle: 'Biceps' },
    ],
  },
]
