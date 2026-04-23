// Hand-written types matching supabase/migrations/0001_init.sql.
// Keep these in sync when editing the schema. (We can later generate these
// with `supabase gen types typescript` — skipped for now to avoid the local
// Supabase CLI dep.)

export type ISODate = string; // 'YYYY-MM-DD'
export type ISODateTime = string;

export type WhoopCycle = {
  day: ISODate;
  strain: number | null;
  avg_hr: number | null;
  max_hr: number | null;
  kilojoules: number | null;
  start_at: ISODateTime | null;
  end_at: ISODateTime | null;
};

export type WhoopRecovery = {
  day: ISODate;
  score: number | null;
  hrv_ms: number | null;
  rhr: number | null;
  spo2: number | null;
  skin_temp_c: number | null;
};

export type WhoopSleep = {
  day: ISODate;
  total_sleep_min: number | null;
  light_min: number | null;
  deep_min: number | null;
  rem_min: number | null;
  awake_min: number | null;
  efficiency_pct: number | null;
  latency_min: number | null;
  disturbances: number | null;
  respiratory_rate: number | null;
  sleep_need_min: number | null;
  performance_pct: number | null;
};

export type WhoopWorkout = {
  id: string;
  day: ISODate;
  sport: string | null;
  strain: number | null;
  kilojoules: number | null;
  avg_hr: number | null;
  max_hr: number | null;
  distance_m: number | null;
  start_at: ISODateTime | null;
  end_at: ISODateTime | null;
};

export type HealthDaily = {
  day: ISODate;
  steps: number | null;
  distance_m: number | null;
  active_energy_kcal: number | null;
  basal_energy_kcal: number | null;
  flights_climbed: number | null;
  exercise_min: number | null;
  stand_hours: number | null;
  resting_hr: number | null;
  screen_time_min: number | null;
  pickups: number | null;
  notifications: number | null;
};

export type ScreenTimeByApp = {
  day: ISODate;
  app: string;
  minutes: number;
  pickups: number | null;
};

export type EightSleepDaily = {
  day: ISODate;
  sleep_score: number | null;
  time_in_bed_min: number | null;
  time_asleep_min: number | null;
  toss_and_turns: number | null;
  avg_hr: number | null;
  avg_hrv_ms: number | null;
  avg_respiratory: number | null;
  bed_temp_avg_f: number | null;
  bed_temp_start_f: number | null;
  bed_temp_end_f: number | null;
  room_temp_avg_f: number | null;
  stages: { stage: "light" | "deep" | "rem" | "awake"; minutes: number }[] | null;
};

export type NutritionDaily = {
  day: ISODate;
  kcal: number | null;
  goal_kcal: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  sodium_mg: number | null;
  water_ml: number | null;
};

export type Meal = "breakfast" | "lunch" | "dinner" | "snack";

export type FoodLogEntry = {
  id: number;
  day: ISODate;
  meal: Meal;
  name: string;
  servings: number | null;
  kcal: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  sodium_mg: number | null;
  source: string | null;
  source_ref: string | null;
};

export type ScreenshotIngest = {
  id: number;
  source: "mfp" | "eight_sleep" | string;
  storage_path: string;
  captured_at: ISODateTime | null;
  received_at: ISODateTime;
  parsed: unknown;
  parse_model: string | null;
  parse_cost_usd: number | null;
  status: "received" | "parsed" | "applied" | "failed";
  error: string | null;
};
