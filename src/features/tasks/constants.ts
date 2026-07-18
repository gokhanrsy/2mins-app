export const TASK_CATEGORIES = [
  "mind",
  "body",
  "home",
  "digital",
  "social",
  "productivity",
  "selfCare",
] as const;

export const TASK_TYPES = ["do", "think", "reset"] as const;

export const ENERGY_LEVELS = ["low", "medium", "high"] as const;

export const USER_CONTEXTS = ["home", "work", "outside", "resting"] as const;

export const MIN_TASK_SECONDS = 10;
export const MAX_TASK_SECONDS = 120;
