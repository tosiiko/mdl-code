// Functions referenced by @click(...) and @submit(...) in the MDL pages.
// They are exported so the generated MDL runtime can bind them by name.

const demoEmail = "demo@mdl.local"
const demoPassword = "password"

const $ = (selector) => document.querySelector(selector)

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function setText(selector, text) {
  const element = $(selector)
  if (element) element.textContent = text
}

function clearFieldErrors(...selectors) {
  selectors.forEach((selector) => $(selector)?.classList.remove("mdl-field--error"))
}

function showInlineMessage(selector, text, kind = "error") {
  const element = $(selector)
  if (!element) return

  element.textContent = text
  element.classList.toggle("success", kind === "success")
  element.classList.add("visible")
}

function setLoading(buttonSelector, loading) {
  const button = $(buttonSelector)
  if (!button) return

  button.disabled = loading
  button.classList.toggle("mdl-btn-primary--loading", loading)
}

function showPopup(title, message, kind = "success", redirectTo = null) {
  const popup = $("#appPopup")
  if (!popup) return

  setText("#popupTitle", title)
  setText("#popupMessage", message)
  popup.classList.remove("success", "error")
  popup.classList.add(kind, "visible")

  if (redirectTo) {
    window.setTimeout(() => {
      window.location.assign(redirectTo)
    }, 850)
  }
}

export function closePopup() {
  const popup = $("#appPopup")
  if (!popup) return

  popup.classList.remove("visible", "success", "error")
}

async function checkLogin(email, password) {
  await wait(250)
  return email === demoEmail && password === demoPassword
}

export async function handleLogin(event) {
  event.preventDefault()

  const email = $("#emailInput")?.value.trim() || ""
  const password = $("#passwordInput")?.value || ""

  clearFieldErrors("#emailField", "#passwordField")
  setLoading("#loginBtn", true)

  if (!email || !password) {
    if (!email) $("#emailField")?.classList.add("mdl-field--error")
    if (!password) $("#passwordField")?.classList.add("mdl-field--error")
    showInlineMessage("#errorMsg", "Enter the demo email and password.")
    showPopup("Missing details", "Both fields are required before MDL can run the login flow.", "error")
    setLoading("#loginBtn", false)
    return
  }

  const ok = await checkLogin(email, password)
  setLoading("#loginBtn", false)

  if (!ok) {
    $("#emailField")?.classList.add("mdl-field--error")
    $("#passwordField")?.classList.add("mdl-field--error")
    showInlineMessage("#errorMsg", "Use demo@mdl.local with password to try the local demo.")
    showPopup("Sign in failed", "The error popup is working. Try demo@mdl.local with password.", "error")
    return
  }

  showInlineMessage("#errorMsg", "Signed in locally. Redirecting to dashboard.", "success")
  showPopup("Signed in", "Redirecting to the dashboard page now.", "success", "/dashboard")
}

export async function handleSignup(event) {
  event.preventDefault()

  const name = $("#signupNameInput")?.value.trim() || ""
  const email = $("#signupEmailInput")?.value.trim() || ""
  const password = $("#signupPasswordInput")?.value || ""

  clearFieldErrors("#signupNameField", "#signupEmailField", "#signupPasswordField")
  setLoading("#signupBtn", true)

  if (!name || !email || password.length < 6) {
    if (!name) $("#signupNameField")?.classList.add("mdl-field--error")
    if (!email) $("#signupEmailField")?.classList.add("mdl-field--error")
    if (password.length < 6) $("#signupPasswordField")?.classList.add("mdl-field--error")
    showInlineMessage("#signupMsg", "Add a name, email, and password of at least 6 characters.")
    showPopup("Signup needs work", "The signup error popup is working. Complete each field and try again.", "error")
    setLoading("#signupBtn", false)
    return
  }

  await wait(250)
  setLoading("#signupBtn", false)
  showInlineMessage("#signupMsg", "Account created locally. Redirecting to sign in.", "success")
  showPopup("Account created", "This local demo will send you back to the sign in page.", "success", "/login")
}

export async function handleResetPassword(event) {
  event.preventDefault()

  const email = $("#resetEmailInput")?.value.trim() || ""
  clearFieldErrors("#resetEmailField")
  setLoading("#resetBtn", true)

  if (!email) {
    $("#resetEmailField")?.classList.add("mdl-field--error")
    showInlineMessage("#resetMsg", "Enter an email before requesting a reset link.")
    showPopup("Email required", "The reset flow is local, but it still validates the form.", "error")
    setLoading("#resetBtn", false)
    return
  }

  await wait(250)
  setLoading("#resetBtn", false)
  showInlineMessage("#resetMsg", "Reset message prepared locally. Redirecting to sign in.", "success")
  showPopup("Reset link prepared", "No email was sent. This confirms popup and redirect behavior.", "success", "/login")
}

export function handleForgot() {
  window.location.assign("/forgot-password")
}

export function goToSignup() {
  window.location.assign("/signup")
}

export function goToLogin() {
  window.location.assign("/login")
}

export function goToDashboard() {
  window.location.assign("/dashboard")
}

export function goToComponents() {
  window.location.assign("/components")
}

export function logout() {
  showPopup("Logged out", "Returning to sign in.", "success", "/login")
}

export function showDemoToast() {
  const toast = $("#demoToast")
  if (!toast) return

  toast.classList.add("visible")
  window.setTimeout(() => {
    toast.classList.remove("visible")
  }, 1800)
}

export function openDemoModal() {
  const modal = $("#demoModal")
  if (!modal) return

  if (typeof modal.showModal === "function") {
    modal.showModal()
  } else {
    modal.setAttribute("open", "")
  }
}

export function closeDemoModal() {
  const modal = $("#demoModal")
  if (!modal) return

  if (typeof modal.close === "function") {
    modal.close()
  } else {
    modal.removeAttribute("open")
  }
}

export function openDemoDrawer() {
  $("#demoDrawer")?.classList.add("visible")
}

export function closeDemoDrawer() {
  $("#demoDrawer")?.classList.remove("visible")
}

function setComponentTab(activeId, inactiveId, activeButtonId, inactiveButtonId) {
  const active = $(activeId)
  const inactive = $(inactiveId)
  const activeButton = $(activeButtonId)
  const inactiveButton = $(inactiveButtonId)

  active?.setAttribute("data-state", "active")
  inactive?.removeAttribute("data-state")

  activeButton?.classList.remove("mdl-btn-ghost")
  activeButton?.classList.add("mdl-btn-secondary")
  inactiveButton?.classList.remove("mdl-btn-secondary")
  inactiveButton?.classList.add("mdl-btn-ghost")
}

export function showOverviewTab() {
  setComponentTab("#tabOverview", "#tabDetails", "#tabOverviewButton", "#tabDetailsButton")
}

export function showDetailsTab() {
  setComponentTab("#tabDetails", "#tabOverview", "#tabDetailsButton", "#tabOverviewButton")
}
