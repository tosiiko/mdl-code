const $ = (selector) => document.querySelector(selector)

function showToast(message) {
  const toast = $("#siteToast")
  if (!toast) return

  toast.textContent = message
  toast.classList.add("visible")
  window.setTimeout(() => toast.classList.remove("visible"), 2400)
}

function setTab(activeId, buttonId) {
  const tabs = ["#tabBasics", "#tabProjects", "#tabDeploy"]
  const buttons = ["#tabBasicsButton", "#tabProjectsButton", "#tabDeployButton"]

  tabs.forEach((selector) => {
    const tab = $(selector)
    if (!tab) return
    if (selector === activeId) {
      tab.setAttribute("data-state", "active")
    } else {
      tab.removeAttribute("data-state")
    }
  })

  buttons.forEach((selector) => {
    const button = $(selector)
    if (!button) return
    button.classList.toggle("mdl-btn-secondary", selector === buttonId)
    button.classList.toggle("mdl-btn-ghost", selector !== buttonId)
  })
}

export function showDocsBasics() {
  setTab("#tabBasics", "#tabBasicsButton")
}

export function showDocsProjects() {
  setTab("#tabProjects", "#tabProjectsButton")
}

export function showDocsDeploy() {
  setTab("#tabDeploy", "#tabDeployButton")
}

export function showPlan(event) {
  const label = event.currentTarget?.textContent?.trim() || "Plan"
  showToast(`${label} selected. This local demo keeps the interaction on-page.`)
}

export function handleContact(event) {
  event.preventDefault()

  const name = $("#nameInput")?.value.trim() || ""
  const email = $("#emailInput")?.value.trim() || ""
  const message = $("#messageInput")?.value.trim() || ""
  const status = $("#contactStatus")
  const button = $("#contactButton")

  ;["#nameField", "#emailField", "#messageField"].forEach((selector) => {
    $(selector)?.classList.remove("field-error")
  })

  const missing = []
  if (!name) missing.push(["#nameField", "name"])
  if (!email || !email.includes("@")) missing.push(["#emailField", "email"])
  if (!message) missing.push(["#messageField", "project"])

  if (missing.length > 0) {
    missing.forEach(([selector]) => $(selector)?.classList.add("field-error"))
    if (status) status.textContent = "Add a valid name, email, and project note."
    showToast("The form needs a little more detail.")
    return
  }

  if (button) button.disabled = true
  if (status) status.textContent = `Thanks, ${name}. Your MDL website request is ready locally.`
  showToast("Message prepared locally. No network request was sent.")

  window.setTimeout(() => {
    if (button) button.disabled = false
  }, 900)
}
