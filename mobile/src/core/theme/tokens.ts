/**
  Savia design tokens(theme)
  
  Source of truth for color/spacing/radius/type.
  'tailwind.config.js' requires this file (utilities resolve to these values); 
  also used raw in non-Tailwind contexts (status bar, gradients, Lottie).
  Note: fontFamily strings must equal the fontMap keys in 'core/theme/fonts.ts'
**/

export const tokens = {
  color: {
    // Brand
    primary: "#0B6B5B",
    primary500: "#0E8268",
    primaryTint: "#E3F1ED",
    accent: "#E0922F",

    // Neutrals (light)
    bg: "#F6F5F2",
    surface: "#FFFFFF",
    ink: "#1C1B19",
    // Softer ink for tile/chip
    inkSoft: "#3A3833",
    secondary: "#6B6862",
    muted: "#9A968E",
    hairline: "#ECEAE4",

    // Semantic
    income: "#1F9D5B",
    incomeTint: "#E4F3EA",
    expense: "#C8483B",
    expenseTint: "#FBEAE8",

    // Dark theme
    dark: {
      bg: "#0F1C19",
      surface: "#17231F",
      accent: "#2EB597",
      ink: "#ECF1EE",
      secondary: "#C7D2CD",
      muted: "#8FA39C",
      hairline: "rgba(255,255,255,0.08)",
      income: "#3FCF9E",
      expense: "#F2796B",
    },
  },

  avatarTone: {
    green: { bg: "#E4F3EA", ink: "#1F8A50" },
    teal: { bg: "#E3F1ED", ink: "#1F8A50" },
    amber: { bg: "#F3ECDF", ink: "#9A7B3F" },
    blue: { bg: "#E7EEF3", ink: "#3F6B8A" },
    clay: { bg: "#F1E9E6", ink: "#97604A" },
  },

  // Balance card gradient
  gradient: {
    balance: ["#0E8268", "#0B6B5B", "#094E43"],
    balanceDark: ["#10987B", "#0B6B5B", "#08463C"],
  },

  spacing: { xs: 4, sm: 8, md: 14, lg: 22, xl: 32 },

  radius: {
    sm: 8,
    input: 13,
    button: 14,
    tile: 17,
    card: 22,
    pill: 20,
    full: 9999,
  },

  // One family per weight (registered in core/theme/fonts.ts)
  fontFamily: {
    sans: "Inter", // 400
    sansMedium: "Inter-Medium", // 500
    sansSemibold: "Inter-SemiBold", // 600
    sansBold: "Inter-Bold", // 700
    displayMedium: "InterTight-Medium", // 500
    displaySemibold: "InterTight-SemiBold", // 600
    display: "InterTight-Bold", // 700
  },

  fontSize: {
    caption: 12,
    label: 12,
    body: 15,
    title: 22,
    heading: 24,
    balance: 38,
    balanceLg: 52,
  },
} as const;

export type Tokens = typeof tokens;
