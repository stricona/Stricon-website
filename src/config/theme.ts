export const themeColors = {
  light: {
    background: "#F7F6F1",
    surface: "#FFFFFF",
    foreground: "#29283A",
    mutedForeground: "#686879",
    primary: "#494B98",
    primaryForeground: "#FFFFFF",
    secondary: "#148078",
    secondaryForeground: "#FFFFFF",
    accentGold: "#E4B94F",
    accentGoldForeground: "#29283A",
    border: "#E7E5DE",
  },
  dark: {
    background: "#191923",
    surface: "#222230",
    foreground: "#F5F4FA",
    mutedForeground: "#B7B5C7",
    primary: "#7779CC",
    primaryForeground: "#14141F",
    secondary: "#36B5A5",
    secondaryForeground: "#14141F",
    accentGold: "#E4B94F",
    accentGoldForeground: "#29283A",
    border: "#383747",
  },
} as const;

export type ThemeColors = typeof themeColors;
