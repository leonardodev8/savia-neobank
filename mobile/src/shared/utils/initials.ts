// Avatar initials from a person or business name.
// Spanish particles skipped when deriving initials ("Inversiones del Sur" -> "IS")
const PARTICLES = new Set(["de", "del", "la", "las", "los", "el", "y", "-"]);

export const toInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter((word) => word.length > 0 && !PARTICLES.has(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => (word[0] ?? "").toUpperCase())
    .join("");
