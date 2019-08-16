import axios from "axios";

const powermonitorRoute = "customApi/powermonitor";

export async function getPowermonitorData() {
  let result = await axios({
    url: encodeURI(powermonitorRoute),
    method: "GET",
    headers: { "Content-type": "application/json" },
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}

export async function changePowermonitorSettings(data) {
  let result = await axios({
    url: encodeURI(powermonitorRoute),
    method: "PUT",
    headers: { "Content-type": "application/json" },
    data: data,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN"
  });

  return result.data;
}
