import { StatCard } from "@/components/dashboard/stat-card";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { Ring } from "@/components/dashboard/ring";
import {
  Activity,
  Flame,
  Footprints,
  Moon,
  Smartphone,
  Heart,
} from "lucide-react";
import {
  demoRecovery,
  demoSleep,
  demoStrain,
  demoSteps,
  demoCalories,
  demoScreen,
  demoSleepStages,
  demoMacros,
  demoFoodLog,
  demoScreenByApp,
} from "@/lib/demo-data";

const last = <T,>(arr: T[]) => arr[arr.length - 1];

export default function Home() {
  const todayRecovery = last(demoRecovery).value;
  const todaySleep = last(demoSleep).value;
  const todayStrain = last(demoStrain).value;
  const todaySteps = last(demoSteps).value;
  const todayCalories = last(demoCalories).value;
  const todayScreen = last(demoScreen).value;

  const sleepTotal = demoSleepStages.reduce((a, b) => a + b.minutes, 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 space-y-8">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Good morning, Peter
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Showing sample data — connect sources to go live
        </div>
      </header>

      {/* Top stat row */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          label="Recovery"
          value={todayRecovery}
          unit="%"
          icon={Heart}
          accent="emerald"
        />
        <StatCard
          label="Sleep"
          value={todaySleep}
          unit="h"
          icon={Moon}
          accent="indigo"
        />
        <StatCard label="Strain" value={todayStrain} icon={Activity} accent="orange" />
        <StatCard
          label="Steps"
          value={todaySteps.toLocaleString()}
          icon={Footprints}
          accent="sky"
        />
        <StatCard
          label="Calories"
          value={todayCalories.toLocaleString()}
          unit="kcal"
          icon={Flame}
          accent="rose"
        />
        <StatCard
          label="Screen"
          value={todayScreen}
          unit="h"
          icon={Smartphone}
          accent="violet"
        />
      </section>

      {/* Hero: rings + recovery trend */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-6 flex flex-col items-center justify-center gap-4">
          <div className="flex gap-6">
            <Ring
              value={todayRecovery}
              color="#34d399"
              label={`${todayRecovery}%`}
              sublabel="Recovery"
            />
            <Ring
              value={(todaySleep / 9) * 100}
              color="#818cf8"
              label={`${todaySleep}h`}
              sublabel="Sleep"
            />
          </div>
          <div className="flex gap-6">
            <Ring
              value={(todayStrain / 21) * 100}
              color="#fb923c"
              label={`${todayStrain}`}
              sublabel="Strain"
            />
            <Ring
              value={Math.min((todaySteps / 10000) * 100, 100)}
              color="#38bdf8"
              label={`${(todaySteps / 1000).toFixed(1)}k`}
              sublabel="Steps"
            />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
                Recovery
              </h2>
              <p className="mt-1 text-2xl font-semibold">14-day trend</p>
            </div>
            <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
              +12% vs last week
            </span>
          </div>
          <div className="mt-4">
            <TrendChart data={demoRecovery} color="#34d399" unit="%" />
          </div>
        </div>
      </section>

      {/* Sleep + Strain */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Sleep
          </h2>
          <p className="mt-1 text-2xl font-semibold">Hours per night</p>
          <div className="mt-4">
            <TrendChart data={demoSleep} color="#818cf8" unit="h" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {demoSleepStages.map((s) => (
              <div key={s.stage} className="rounded-lg bg-background/40 p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.stage}
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {Math.floor(s.minutes / 60)}h {s.minutes % 60}m
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((s.minutes / sleepTotal) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Strain
          </h2>
          <p className="mt-1 text-2xl font-semibold">Daily exertion</p>
          <div className="mt-4">
            <TrendChart data={demoStrain} color="#fb923c" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-background/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Avg HR
              </div>
              <div className="mt-1 text-lg font-semibold">72 bpm</div>
            </div>
            <div className="rounded-lg bg-background/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Max HR
              </div>
              <div className="mt-1 text-lg font-semibold">158 bpm</div>
            </div>
            <div className="rounded-lg bg-background/40 p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Kcal burned
              </div>
              <div className="mt-1 text-lg font-semibold">2,840</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition (MyFitnessPal) */}
      <section className="rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
              Nutrition
            </h2>
            <p className="mt-1 text-2xl font-semibold">
              {demoMacros.kcal.toLocaleString()}{" "}
              <span className="text-base font-normal text-muted-foreground">
                / {demoMacros.goalKcal.toLocaleString()} kcal
              </span>
            </p>
          </div>
          <span className="rounded-md bg-rose-500/10 px-2 py-1 text-xs font-medium text-rose-400">
            MyFitnessPal
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-6 gap-3">
          <MacroTile label="Protein" value={`${demoMacros.protein}g`} pct={82} color="bg-emerald-400" />
          <MacroTile label="Carbs" value={`${demoMacros.carbs}g`} pct={71} color="bg-sky-400" />
          <MacroTile label="Fat" value={`${demoMacros.fat}g`} pct={64} color="bg-amber-400" />
          <MacroTile label="Fiber" value={`${demoMacros.fiber}g`} pct={97} color="bg-lime-400" />
          <MacroTile label="Sugar" value={`${demoMacros.sugar}g`} pct={58} color="bg-pink-400" />
          <MacroTile label="Sodium" value={`${demoMacros.sodium}mg`} pct={79} color="bg-violet-400" />
        </div>

        <div className="mt-6 divide-y divide-white/5 rounded-lg border bg-background/40">
          {demoFoodLog.map((f, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex w-20 justify-center rounded-md bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {f.meal}
                </span>
                <span className="truncate">{f.name}</span>
              </div>
              <div className="flex items-center gap-4 tabular-nums text-muted-foreground">
                <span className="hidden sm:inline">P {f.p}</span>
                <span className="hidden sm:inline">C {f.c}</span>
                <span className="hidden sm:inline">F {f.f}</span>
                <span className="font-medium text-foreground">{f.kcal} kcal</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Screen time */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Screen time
          </h2>
          <p className="mt-1 text-2xl font-semibold">14-day trend</p>
          <div className="mt-4">
            <TrendChart data={demoScreen} color="#a78bfa" unit="h" />
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            By app (today)
          </h2>
          <p className="mt-1 text-2xl font-semibold">Top 6</p>
          <div className="mt-4 space-y-3">
            {demoScreenByApp.map((a) => {
              const max = demoScreenByApp[0].minutes;
              return (
                <div key={a.app}>
                  <div className="flex justify-between text-sm">
                    <span>{a.app}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {Math.floor(a.minutes / 60)}h {a.minutes % 60}m
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-violet-400"
                      style={{ width: `${(a.minutes / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function MacroTile({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-background/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
      <div className="mt-2 h-1 w-full rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
