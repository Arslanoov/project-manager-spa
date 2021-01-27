import IconInterface from "@/types/schedule/IconInterface"
import IconStorage from "@/services/storage/IconStorage"

const storage = new IconStorage()

const variants: Array<string> = [
  "mdi-star",
  "mdi-book-variant",
  "mdi-airballoon",
  "mdi-buffer"
]

const calculateRandomIcon = (): string => {
  return variants[Math.floor(Math.random() * variants.length)]
}

const randomIcon = (id: string, withoutCache = false): string => {
  if (id === "new" || withoutCache) return calculateRandomIcon()
  const icon = storage.getIcon(id)
  if (icon) return icon.value

  const newIcon: IconInterface = {
    id,
    value: calculateRandomIcon()
  }

  storage.addIcon(newIcon)
  return newIcon.value
}

export default randomIcon
