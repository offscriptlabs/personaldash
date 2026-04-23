import { StatCard } from "@/components/dashboard/stat-card";
import { Activity, Flame, Footprints, Moon, Smartphone, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 space-y-10">
      <header className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Today</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Connect sources in <span className="font-mono">.env.local</span>
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Recovery" value="—" unit="%" icon={Heart} accent="emerald" />
        <StatCard label="Sleep" value="—" unit="h" icon={Moon} accent="indigo" />
        <StatCard label="Strain" value="—" icon={Activity} accent="orange" />
        <StatCard label="Steps" value="—" icon={Footprints} accent="sky" />
        <StatCard label="Calories" value="—" unit="kcal" icon={Flame} accent="rose" />
        <StatCard label="Screen" value="—" unit="h" icon={Smartphone} accent="violet" />
      </section>

      <section className="rounded-xl border bg-card p-8">
        <h2 className="text-lg font-medium">Welcome</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-prose">
          This dashboard is scaffolded but not yet wired to data sources. Next
          steps: create the Supabase schema, register a Whoop dev app, and set up
          an iOS Shortcut to post daily health data.
        </p>
      </section>
    </main>
  );
}
