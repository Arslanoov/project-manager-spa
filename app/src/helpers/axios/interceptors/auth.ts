import axios from "axios"

import UserInterface from "@/types/user/UserInterface"

const user: UserInterface | undefined = JSON.parse(localStorage.getItem("user") as string)
if (user) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token
}
