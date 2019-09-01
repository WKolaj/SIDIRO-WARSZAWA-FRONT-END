import axios from "axios";

const subscribeRoute = "/customApi/notifySubscribe";
const subscribeRouteIsRegistered = "/customApi/notifySubscribe/isRegistered";

const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const doesRegistrationObjectExist = async () => {
  if (!("serviceWorker" in navigator)) return false;

  let allRegistrations = await navigator.serviceWorker.getRegistrations();

  if (allRegistrations.length === 0) return false;

  return true;
};

const getRegistrationObject = async () => {
  let allRegistrations = await navigator.serviceWorker.getRegistrations();

  return allRegistrations[0];
};

export async function register(group) {
  // Check for service worker
  if ("serviceWorker" in navigator) {
    try {
      const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
      });

      await navigator.serviceWorker.ready;

      // Register Push
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      let result = await axios({
        url: encodeURI(subscribeRoute + "/" + group),
        method: "POST",
        headers: { "Content-type": "application/json" },
        data: JSON.stringify(subscription),
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN"
      });

      return result.data;
    } catch (err) {
      console.error(err.message, err);
    }
  }
}

export async function unregister(group) {
  // Check for service worker
  if ("serviceWorker" in navigator) {
    try {
      const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
      });

      const subscription = await register.pushManager.getSubscription();

      await subscription.unsubscribe();
      await register.unregister();

      let result = await axios({
        url: encodeURI(subscribeRoute + "/" + group),
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        data: JSON.stringify(subscription),
        withCredentials: true,
        xsrfCookieName: "XSRF-TOKEN"
      });

      return result.data;
    } catch (err) {
      console.error(err.message, err);
    }
  }
}

export async function isRegistered(group) {
  try {
    if (!(await doesRegistrationObjectExist())) return false;

    let registration = await getRegistrationObject();

    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) return false;

    let result = await axios({
      url: encodeURI(subscribeRouteIsRegistered + "/" + group),
      method: "POST",
      headers: { "Content-type": "application/json" },
      data: JSON.stringify(subscription),
      withCredentials: true,
      xsrfCookieName: "XSRF-TOKEN"
    });

    return result.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}
