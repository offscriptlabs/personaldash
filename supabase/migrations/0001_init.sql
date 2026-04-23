-- Personal Dashboard: initial schema
-- Single-user app. RLS is enabled on every table with NO public policies,
-- so the anon key cannot read or write anything. All server access uses the
-- service_role key, which bypasses RLS.

-- ============================================================
-- Whoop
-- ============================================================

create table if not exists whoop_tokens (
  id              int primary key default 1,
  access_token    text not null,
  refresh_token   text not null,
  expires_at      timestamptz not null,
  scope           text,
  updated_at      timestamptz not null default now(),
  constraint single_row check (id = 1)
);

create table if not exists whoop_cycle (
  day             date primary key,
  strain          numeric(4,1),
  avg_hr          int,
  max_hr          int,
  kilojoules      numeric(8,1),
  start_at        timestamptz,
  end_at          timestamptz,
  raw             jsonb,
  updated_at      timestamptz not null default now()
);

create table if not exists whoop_recovery (
  day             date primary key,
  score           int,
  hrv_ms          numeric(5,1),
  rhr             int,
  spo2            numeric(4,1),
  skin_temp_c     numeric(4,2),
  raw             jsonb,
  updated_at      timestamptz not null default now()
);

create table if not exists whoop_sleep (
  day                     date primary key,
  total_sleep_min         int,
  light_min               int,
  deep_min                int,
  rem_min                 int,
  awake_min               int,
  efficiency_pct          numeric(4,1),
  latency_min             int,
  disturbances            int,
  respiratory_rate        numeric(4,1),
  sleep_need_min          int,
  performance_pct         numeric(4,1),
  raw                     jsonb,
  updated_at              timestamptz not null default now()
);

create table if not exists whoop_workout (
  id              text primary key,
  day             date not null,
  sport           text,
  strain          numeric(4,1),
  kilojoules      numeric(8,1),
  avg_hr          int,
  max_hr          int,
  distance_m      numeric(10,1),
  start_at        timestamptz,
  end_at          timestamptz,
  raw             jsonb,
  updated_at      timestamptz not null default now()
);
create index if not exists whoop_workout_day_idx on whoop_workout(day);

-- ============================================================
-- Apple Health (from iOS Shortcut)
-- ============================================================

create table if not exists health_daily (
  day                 date primary key,
  steps               int,
  distance_m          numeric(10,1),
  active_energy_kcal  int,
  basal_energy_kcal   int,
  flights_climbed     int,
  exercise_min        int,
  stand_hours         int,
  resting_hr          int,
  screen_time_min     int,
  pickups             int,
  notifications       int,
  updated_at          timestamptz not null default now()
);

create table if not exists screen_time_by_app (
  day             date not null,
  app             text not null,
  minutes         int not null,
  pickups         int,
  primary key (day, app)
);
create index if not exists screen_time_day_idx on screen_time_by_app(day);

-- ============================================================
-- Eight Sleep (from screenshot parsing)
-- ============================================================

create table if not exists eight_sleep_daily (
  day                 date primary key,
  sleep_score         int,
  time_in_bed_min     int,
  time_asleep_min     int,
  toss_and_turns      int,
  avg_hr              int,
  avg_hrv_ms          numeric(5,1),
  avg_respiratory     numeric(4,1),
  bed_temp_avg_f      numeric(4,1),
  bed_temp_start_f    numeric(4,1),
  bed_temp_end_f      numeric(4,1),
  room_temp_avg_f     numeric(4,1),
  stages              jsonb,  -- [{stage: 'light'|'deep'|'rem'|'awake', minutes: int}]
  raw                 jsonb,
  updated_at          timestamptz not null default now()
);

-- ============================================================
-- Nutrition (MyFitnessPal via screenshot parsing)
-- ============================================================

create table if not exists nutrition_daily (
  day             date primary key,
  kcal            int,
  goal_kcal       int,
  protein_g       numeric(6,1),
  carbs_g         numeric(6,1),
  fat_g           numeric(6,1),
  fiber_g         numeric(6,1),
  sugar_g         numeric(6,1),
  sodium_mg       int,
  water_ml        int,
  raw             jsonb,
  updated_at      timestamptz not null default now()
);

create table if not exists food_log (
  id              bigint generated always as identity primary key,
  day             date not null,
  meal            text not null,          -- breakfast | lunch | dinner | snack
  name            text not null,
  servings        numeric(6,2),
  kcal            int,
  protein_g       numeric(6,1),
  carbs_g         numeric(6,1),
  fat_g           numeric(6,1),
  fiber_g         numeric(6,1),
  sugar_g         numeric(6,1),
  sodium_mg       int,
  source          text,                   -- 'mfp' | 'manual' | etc.
  source_ref      text,                   -- screenshot id or external id
  created_at      timestamptz not null default now()
);
create index if not exists food_log_day_idx on food_log(day);
create index if not exists food_log_day_meal_idx on food_log(day, meal);

-- ============================================================
-- Screenshot ingest (raw + parsed)
-- ============================================================

create table if not exists screenshot_ingest (
  id              bigint generated always as identity primary key,
  source          text not null,          -- 'mfp' | 'eight_sleep' | ...
  storage_path    text not null,          -- path in Supabase Storage 'screenshots' bucket
  captured_at     timestamptz,
  received_at     timestamptz not null default now(),
  parsed          jsonb,
  parse_model     text,
  parse_cost_usd  numeric(8,5),
  status          text not null default 'received', -- received | parsed | applied | failed
  error           text
);
create index if not exists screenshot_ingest_status_idx on screenshot_ingest(status);
create index if not exists screenshot_ingest_source_idx on screenshot_ingest(source, received_at desc);

-- ============================================================
-- RLS: enable on all tables, no policies = no anon access
-- ============================================================

alter table whoop_tokens            enable row level security;
alter table whoop_cycle             enable row level security;
alter table whoop_recovery          enable row level security;
alter table whoop_sleep             enable row level security;
alter table whoop_workout           enable row level security;
alter table health_daily            enable row level security;
alter table screen_time_by_app      enable row level security;
alter table eight_sleep_daily       enable row level security;
alter table nutrition_daily         enable row level security;
alter table food_log                enable row level security;
alter table screenshot_ingest       enable row level security;
