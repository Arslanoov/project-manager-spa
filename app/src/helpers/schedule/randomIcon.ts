const randomIcon = (): string => {
  const icons: Array<string> = ["mdi-star", "mdi-book-variant", "mdi-airballoon", "mdi-buffer"]
  return icons[Math.floor(Math.random() * icons.length)]
}

export default randomIcon