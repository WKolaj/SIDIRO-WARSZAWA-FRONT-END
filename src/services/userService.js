import axios from "axios";

const userRoute = "customApi/user";

export async function getCurrentUser() {
  let result = await axios({
    url: encodeURI(userRoute + "/me"),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}
