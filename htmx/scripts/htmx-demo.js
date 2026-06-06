const body = document.body;

body.addEventListener("htmx:beforeRequest", () => {
  body.dataset.htmxActive = "true";
});

body.addEventListener("htmx:afterRequest", () => {
  body.dataset.htmxActive = "false";
});

body.addEventListener("htmx:responseError", (event) => {
  const toast = document.querySelector("#toast");
  if (toast) {
    toast.textContent = `Request failed with status ${event.detail.xhr.status}.`;
  }
});
