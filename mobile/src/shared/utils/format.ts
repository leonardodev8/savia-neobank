/**
  Shared date/time display formatting
**/

const MONTHS_ES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "set",
  "oct",
  "nov",
  "dic",
] as const;

const pad2 = (n: number): string => String(n).padStart(2, "0");

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// "Hoy 08:02", "Ayer 19:10" or "05 jul 09:00"
export const formatDayTime = (iso: string, now = new Date()): string => {
  const date = new Date(iso);
  const time = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;

  if (isSameDay(date, now)) return `Hoy ${time}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) return `Ayer ${time}`;

  return `${date.getDate()} ${MONTHS_ES[date.getMonth()]} ${time}`;
};
