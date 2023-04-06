const BACKEND_URL = "http://localhost:8000";

// click this button to set cookie.
document.querySelector("#btn").addEventListener("click", function () {
  fetch(`${BACKEND_URL}/cookies`, {
    method: "GET",
    credentials: "include",
  });
});

// click this button after fetching cookie, so that res won't be 401.
document.querySelector("#secret").addEventListener("click", function () {
  fetch(`${BACKEND_URL}/secret`, {
    method: "GET",
    credentials: "include",
  }).then((_) => {
    console.log("secret fetch success!");
  });
});

// request without credentials, server can't get the cookies.
document.querySelector("#extra_cookie").addEventListener("click", function () {
  fetch(`${BACKEND_URL}/nocookie`, {
    method: "GET",
  });
});
