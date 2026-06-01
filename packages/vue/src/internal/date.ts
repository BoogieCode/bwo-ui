export type DateLike = Date | string | number;

export function toDate(value: DateLike): Date {
  if (value instanceof Date) return new Date(value.getTime());
  return new Date(value);
}

export function startOfDay(d: Date): Date {
  const out = new Date(d.getTime());
  out.setHours(0, 0, 0, 0);
  return out;
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function addDays(d: Date, days: number): Date {
  const out = new Date(d.getTime());
  out.setDate(out.getDate() + days);
  return out;
}

export function addMonths(d: Date, months: number): Date {
  const out = new Date(d.getTime());
  out.setMonth(out.getMonth() + months);
  return out;
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfter(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export function clamp(d: Date, min?: Date | null, max?: Date | null): Date {
  if (min && isBefore(d, min)) return min;
  if (max && isAfter(d, max)) return max;
  return d;
}

export function getMonthGrid(month: Date, weekStartsOn: number = 0): Date[] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

export function formatISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getMonthName(d: Date): string {
  return MONTH_NAMES[d.getMonth()]!;
}

export function getWeekdayHeaders(weekStartsOn: number = 0): string[] {
  return Array.from({ length: 7 }, (_, i) => WEEKDAY_NAMES_SHORT[(i + weekStartsOn) % 7]!);
}
