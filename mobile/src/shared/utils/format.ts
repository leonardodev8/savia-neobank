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

const WEEKDAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

const pad2 = (n: number): string => String(n).padStart(2, "0");

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// "08:02"
export const formatClockTime = (iso: string): string => {
  const date = new Date(iso);
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};

// Day-group label: "Hoy 18 jun", "Ayer 17 jun" or "Mar 16 jun"
export const formatDayLabel = (iso: string, now = new Date()): string => {
  const date = new Date(iso);
  const dayMonth = `${date.getDate()} ${MONTHS_ES[date.getMonth()]}`;

  if (isSameDay(date, now)) return `Hoy ${dayMonth}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) return `Ayer ${dayMonth}`;

  return `${WEEKDAYS_ES[date.getDay()]} ${dayMonth}`;
};

// "Hoy 08:02", "Ayer 19:10" or "05 jul 09:00"
export const formatDayTime = (iso: string, now = new Date()): string => {
  const date = new Date(iso);
  const time = formatClockTime(iso);

  if (isSameDay(date, now)) return `Hoy ${time}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) return `Ayer ${time}`;

  return `${date.getDate()} ${MONTHS_ES[date.getMonth()]} ${time}`;
};
