export const isAuth = (): boolean => {
  return !!JSON.parse(window.localStorage.getItem("token") as string)
}
