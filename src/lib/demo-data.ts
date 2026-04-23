import { subDays, format } from "date-fns";

function series(days: number, base: number, variance: number, trend = 0) {
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(new Date(), days - 1 - i);
    const value = Math.round(
      base + trend * i + (Math.sin(i * 0.7) + Math.random() - 0.5) * variance
    );
    return { date: format(date, "MMM d"), value };
  });
}

export const demoRecovery = series(14, 68, 18);
export const demoSleep = series(14, 7.4, 1.2).map((p) => ({
  ...p,
  value: Number((p.value / 1).toFixed(1)),
}));
export const demoStrain = series(14, 12, 4);
export const demoSteps = series(14, 9200, 2800);
export const demoCalories = series(14, 2450, 280);
export const demoScreen = series(14, 4.8, 1.4);

export const demoSleepStages = [
  { stage: "Awake", minutes: 22 },
  { stage: "Light", minutes: 228 },
  { stage: "Deep", minutes: 96 },
  { stage: "REM", minutes: 104 },
];

export const demoMacros = {
  protein: 164,
  carbs: 212,
  fat: 82,
  fiber: 34,
  sugar: 58,
  sodium: 2840,
  goalKcal: 2600,
  kcal: 2418,
};

export const demoFoodLog = [
  { meal: "Breakfast", name: "Greek yogurt + berries + granola", kcal: 410, p: 32, c: 48, f: 9 },
  { meal: "Breakfast", name: "Black coffee, oat milk", kcal: 45, p: 1, c: 6, f: 2 },
  { meal: "Lunch", name: "Chipotle bowl — chicken, rice, veggies", kcal: 720, p: 54, c: 82, f: 18 },
  { meal: "Snack", name: "Protein bar (RXBAR)", kcal: 210, p: 12, c: 24, f: 9 },
  { meal: "Snack", name: "Apple + almond butter", kcal: 280, p: 7, c: 28, f: 16 },
  { meal: "Dinner", name: "Grilled salmon, sweet potato, greens", kcal: 640, p: 48, c: 44, f: 24 },
  { meal: "Dinner", name: "Dark chocolate (2 squares)", kcal: 113, p: 1, c: 10, f: 8 },
];

export const demoScreenByApp = [
  { app: "Safari", minutes: 78 },
  { app: "Slack", minutes: 54 },
  { app: "Messages", minutes: 41 },
  { app: "Mail", minutes: 33 },
  { app: "X", minutes: 26 },
  { app: "Music", minutes: 22 },
];
