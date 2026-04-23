import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "emerald" | "indigo" | "orange" | "sky" | "rose" | "violet";

const accentMap: Record<Accent, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10",
  indigo: "text-indigo-400 bg-indigo-500/10",
  orange: "text-orange-400 bg-orange-500/10",
  sky: "text-sky-400 bg-sky-500/10",
  rose: "text-rose-400 bg-rose-500/10",
  violet: "text-violet-400 bg-violet-500/10",
};

export function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  accent = "emerald",
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  accent?: Accent;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-5 transition hover:border-foreground/20">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={cn("rounded-md p-1.5", accentMap[accent])}>
          <Icon className="size-3.5" />
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        {unit && (
          <span className="text-sm text-muted-foreground">{unit}</span>
        )}
      </div>
    </div>
  );
}
