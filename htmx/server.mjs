import http from "node:http";

const port = Number(process.env.PORT ?? 4011);

const recipes = [
  ["Live search", "Use GET requests on input events for quick filters."],
  ["Todo swap", "Target one list and let the server return the replacement."],
  ["Cart panel", "Repeat small forms and update a shared aside."],
  ["Profile validation", "Let the browser validate before htmx sends the form."],
  ["Out-of-band toast", "Send a primary fragment and a toast in one response."],
  ["Preserved island", "Keep stable UI with hx-preserve across swaps."],
  ["History controls", "Use explicit push/history settings for predictable URLs."],
  ["Request sync", "Queue or replace overlapping requests for one target."]
];

const products = {
  atlas: { name: "Atlas kit", price: 29 },
  signal: { name: "Signal pack", price: 39 },
  harbor: { name: "Harbor pack", price: 59 }
};

const todos = [
  { id: 1, text: "Read the adapter docs", priority: "normal" },
  { id: 2, text: "Inspect generated hx attributes", priority: "high" }
];

const cart = new Map();
let nextTodoId = 3;
let eventCount = 1;

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);

  try {
    if (request.method === "GET" && url.pathname === "/api/summary") {
      return sendHtml(response, summaryFragment());
    }

    if (request.method === "GET" && url.pathname === "/api/search") {
      return sendHtml(response, searchFragment(url.searchParams.get("q") ?? ""));
    }

    if (request.method === "POST" && url.pathname === "/api/todos") {
      const body = await readForm(request);
      const text = String(body.todo ?? "").trim();
      if (text) {
        todos.unshift({
          id: nextTodoId++,
          text,
          priority: body.priority === "high" ? "high" : "normal"
        });
      }
      return sendHtml(response, `${todoListFragment()}${toastFragment(text ? "Todo added." : "Type a todo first.")}`);
    }

    const todoMatch = url.pathname.match(/^\/api\/todos\/(\d+)$/);
    if (request.method === "DELETE" && todoMatch) {
      const id = Number(todoMatch[1]);
      const index = todos.findIndex((todo) => todo.id === id);
      if (index >= 0) {
        todos.splice(index, 1);
      }
      return sendHtml(response, `${todoListFragment()}${toastFragment("Todo completed.")}`);
    }

    if (request.method === "POST" && url.pathname === "/api/cart") {
      const body = await readForm(request);
      const sku = String(body.sku ?? "");
      if (products[sku]) {
        cart.set(sku, (cart.get(sku) ?? 0) + 1);
      }
      return sendHtml(response, `${cartFragment()}${toastFragment(`${products[sku]?.name ?? "Item"} added to cart.`)}`);
    }

    if (request.method === "POST" && url.pathname === "/api/cart/clear") {
      cart.clear();
      return sendHtml(response, `${cartFragment()}${toastFragment("Cart cleared.")}`);
    }

    if (request.method === "POST" && url.pathname === "/api/profile") {
      const body = await readForm(request);
      return sendHtml(response, `${profileFragment(body)}${toastFragment("Profile saved.")}`);
    }

    if (request.method === "GET" && url.pathname === "/api/advanced/clock") {
      return sendHtml(response, clockFragment());
    }

    if (request.method === "POST" && url.pathname === "/api/advanced/toast") {
      const prompt = request.headers["hx-prompt"];
      const message = typeof prompt === "string" && prompt.trim() ? prompt.trim() : "Prompt accepted";
      return sendHtml(response, `${eventFragment(message)}${toastFragment(message)}`);
    }

    if (request.method === "GET" && url.pathname === "/api/advanced/filter") {
      return sendHtml(response, filterFragment(url.searchParams.get("kind") ?? "fragments"));
    }

    sendHtml(response, `<section class="result-panel"><h2>Not found</h2><p>${escapeHtml(url.pathname)} is not an example endpoint.</p></section>`, 404);
  } catch (error) {
    sendHtml(response, `<section class="result-panel"><h2>Server error</h2><p>${escapeHtml(error.message)}</p></section>`, 500);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`htmx example API listening at http://127.0.0.1:${port}`);
});

function summaryFragment() {
  return `
<section id="summaryPanel" class="result-panel">
  <h2>Adapter is live</h2>
  <p>The server returned this fragment through the MDL dev-server proxy.</p>
  <div class="summary-stats">
    <strong>6 pages</strong>
    <span>5 request patterns</span>
    <span>0 raw hx attributes in MDL source</span>
  </div>
</section>`;
}

function searchFragment(query) {
  const needle = query.trim().toLowerCase();
  const matches = recipes.filter(([title, text]) => {
    const source = `${title} ${text}`.toLowerCase();
    return !needle || source.includes(needle);
  });

  const items = matches
    .map(([title, text]) => `
  <article class="result-item">
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(text)}</p>
  </article>`)
    .join("");

  return `
<div id="searchResults" class="result-panel">
  <h2>${matches.length} result${matches.length === 1 ? "" : "s"}</h2>
  <div class="result-list">${items || "<p>No matching htmx pattern yet.</p>"}</div>
</div>`;
}

function todoListFragment() {
  const items = todos
    .map((todo) => `
  <li class="todo-item">
    <span><strong>${escapeHtml(todo.text)}</strong><br><small>${escapeHtml(todo.priority)} priority</small></span>
    <button class="action-button secondary" type="button" hx-delete="/api/todos/${todo.id}" hx-target="#todoList" hx-swap="outerHTML" hx-select="#todoList" hx-select-oob="#toast">Done</button>
  </li>`)
    .join("");

  return `
<ul id="todoList" class="todo-list">
  ${items || "<li class=\"todo-item\"><span>All clear.</span></li>"}
</ul>`;
}

function cartFragment() {
  const lines = [...cart.entries()];
  const total = lines.reduce((sum, [sku, count]) => sum + products[sku].price * count, 0);
  const items = lines
    .map(([sku, count]) => `
  <li class="cart-line">
    <span><strong>${escapeHtml(products[sku].name)}</strong><br><small>${count} x $${products[sku].price}</small></span>
    <span>$${products[sku].price * count}</span>
  </li>`)
    .join("");

  return `
<aside id="cartPanel" class="cart-panel">
  <h2>Cart</h2>
  <ul class="cart-lines">${items || "<li class=\"cart-line\"><span>No products yet.</span></li>"}</ul>
  <p class="total-row"><strong>Total</strong> <span>$${total}</span></p>
  <button class="action-button ghost" type="button" hx-post="/api/cart/clear" hx-target="#cartPanel" hx-swap="outerHTML" hx-select="#cartPanel" hx-select-oob="#toast">Clear cart</button>
</aside>`;
}

function profileFragment(body) {
  const name = String(body.name ?? "Anonymous").trim() || "Anonymous";
  const email = String(body.email ?? "unknown@example.test").trim() || "unknown@example.test";
  const role = String(body.role ?? "builder").trim() || "builder";

  return `
<section id="profileResult" class="result-panel">
  <h2>Saved profile</h2>
  <p><strong>${escapeHtml(name)}</strong> is registered as ${escapeHtml(role)}.</p>
  <p>${escapeHtml(email)}</p>
</section>`;
}

function clockFragment() {
  return `
<section id="clockPanel" class="result-panel">
  <h2>Server time</h2>
  <p>${new Date().toLocaleString("en-US", { timeZone: "UTC" })} UTC</p>
</section>`;
}

function eventFragment(message) {
  return `
<article id="eventLogItem" class="log-item">
  <h3>Event ${eventCount++}</h3>
  <p>${escapeHtml(message)}</p>
</article>`;
}

function filterFragment(kind) {
  const notes = {
    fragments: "Fragments keep server-rendered HTML small and focused.",
    history: "Explicit history settings avoid surprising URL changes.",
    preserve: "Preserved islands keep stable client state across swaps."
  };

  return `
<section id="filterResult" class="result-panel">
  <h2>${escapeHtml(kind)} note</h2>
  <p>${escapeHtml(notes[kind] ?? notes.fragments)}</p>
</section>`;
}

function toastFragment(message) {
  return `<aside id="toast" class="toast" aria-live="polite" hx-swap-oob="true">${escapeHtml(message)}</aside>`;
}

async function readForm(request) {
  const raw = await readText(request);
  const params = new URLSearchParams(raw);
  return Object.fromEntries(params.entries());
}

function readText(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sendHtml(response, html, status = 200) {
  response.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(html.trim());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
