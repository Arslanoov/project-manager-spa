export const LOW = "Низкий"
export const HIGH = "Высокий"
export const VERY_HIGH = "Высочайший"

export type translatedType = typeof LOW | typeof HIGH | typeof VERY_HIGH

export default {
  [LOW]: "Not Important",
  [HIGH]: "Important",
  [VERY_HIGH]: "Very Important"
}
