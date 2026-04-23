# Supabase

## Applying migrations

1. Open your project → **SQL Editor** → **New query**.
2. Paste the contents of `migrations/0001_init.sql`.
3. Run.

## Storage bucket

The screenshot ingest pipeline needs a private Storage bucket named `screenshots`:

1. Project → **Storage** → **New bucket**.
2. Name: `screenshots`
3. Public: **off** (keep private — we'll use signed URLs from the server)

## Data model summary

| Table | Source | Key |
|---|---|---|
| `whoop_tokens` | Whoop OAuth | single row |
| `whoop_cycle` | Whoop API | `day` |
| `whoop_recovery` | Whoop API | `day` |
| `whoop_sleep` | Whoop API | `day` |
| `whoop_workout` | Whoop API | workout id |
| `health_daily` | iOS Shortcut | `day` |
| `screen_time_by_app` | iOS Shortcut | `(day, app)` |
| `eight_sleep_daily` | Screenshot → Claude | `day` |
| `nutrition_daily` | Screenshot → Claude | `day` |
| `food_log` | Screenshot → Claude | id |
| `screenshot_ingest` | Raw inbox | id |

RLS is on for every table with no policies, so the anon key can't read or write. All server-side access uses the service-role key.
