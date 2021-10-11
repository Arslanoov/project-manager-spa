export const LOW = "Not Important"
export const HIGH = "Important"
export const VERY_HIGH = "Very Important"

export type translatedType = typeof LOW | typeof HIGH | typeof VERY_HIGH

export default {
  [LOW]: "Not Important",
  [HIGH]: "Important",
  [VERY_HIGH]: "Very Important"
}
