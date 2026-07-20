/** @type {import('tailwindcss').Config} */

const { tokens } = require("./src/core/theme/tokens");

const c = tokens.color;
const px = (n) => `${n}px`;

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class", // manual (class-based) dark mode, not OS-driven
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: c.primary, 500: c.primary500, tint: c.primaryTint },
        accent: c.accent,
        bg: c.bg,
        surface: c.surface,
        ink: { DEFAULT: c.ink, soft: c.inkSoft },
        secondary: c.secondary,
        muted: c.muted,
        hairline: { DEFAULT: c.hairline, strong: c.hairlineStrong },
        income: { DEFAULT: c.income, tint: c.incomeTint },
        expense: { DEFAULT: c.expense, tint: c.expenseTint },
        // Dark-theme palette -> use as "dark:bg-dk-bg", etc.
        dk: c.dark,
      },
      fontFamily: {
        sans: [tokens.fontFamily.sans],
        "sans-medium": [tokens.fontFamily.sansMedium],
        "sans-semibold": [tokens.fontFamily.sansSemibold],
        "sans-bold": [tokens.fontFamily.sansBold],
        display: [tokens.fontFamily.display],
        "display-semibold": [tokens.fontFamily.displaySemibold],
        "display-medium": [tokens.fontFamily.displayMedium],
      },
      fontSize: {
        caption: px(tokens.fontSize.caption),
        label: px(tokens.fontSize.label),
        body: px(tokens.fontSize.body),
        title: px(tokens.fontSize.title),
        heading: px(tokens.fontSize.heading),
        balance: px(tokens.fontSize.balance),
        "balance-lg": px(tokens.fontSize.balanceLg),
      },
      spacing: {
        xs: px(tokens.spacing.xs),
        sm: px(tokens.spacing.sm),
        md: px(tokens.spacing.md),
        lg: px(tokens.spacing.lg),
        xl: px(tokens.spacing.xl),
      },
      borderRadius: {
        sm: px(tokens.radius.sm),
        input: px(tokens.radius.input),
        button: px(tokens.radius.button),
        tile: px(tokens.radius.tile),
        card: px(tokens.radius.card),
        pill: px(tokens.radius.pill),
        full: px(tokens.radius.full),
      },
    },
  },
  plugins: [],
};
