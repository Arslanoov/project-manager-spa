export const isAuth = (): boolean => {
  return !!JSON.parse(window.localStorage.getItem("user") as string)
}
