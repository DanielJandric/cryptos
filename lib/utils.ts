// Utilitaires généraux (dates, formats, maths)

export const MS_IN_DAY = 86_400_000;

export function makeUtcDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_IN_DAY);
}

export function diffInDays(from: Date, to: Date): number {
  const diff = to.getTime() - from.getTime();
  return Math.round(diff / MS_IN_DAY);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function formatCurrencyUSD(value: number): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value < 100 ? 2 : 0,
    }).format(value);
  } catch {
    return `$${Math.round(value).toLocaleString("en-US")}`;
  }
}

export function formatPercentSigned(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString("en-US")}%`;
}

// Interpolation exponentielle (croissance/descente) :
// price = start * (end/start) ^ progress
export function expInterpolate(start: number, end: number, progress: number): number {
  if (start <= 0 || end <= 0) return 0;
  const ratio = end / start;
  return start * Math.pow(ratio, clamp(progress, 0, 1));
}

export function isAfter(date: Date, cutoff: Date): boolean {
  return date.getTime() > cutoff.getTime();
}


