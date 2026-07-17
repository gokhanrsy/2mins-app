import type { TextStyle } from "react-native";

type FontWeight = NonNullable<TextStyle["fontWeight"]>;

export const typography = {
  display: {
    fontSize: 40,
    lineHeight: 46,
    fontWeight: "600" satisfies FontWeight,
  },
  headline: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "600" satisfies FontWeight,
  },
  titleLarge: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "600" satisfies FontWeight,
  },
  titleMedium: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600" satisfies FontWeight,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "400" satisfies FontWeight,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" satisfies FontWeight,
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600" satisfies FontWeight,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400" satisfies FontWeight,
  },
} as const;
