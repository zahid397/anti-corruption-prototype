const f = document.getElementById("f");
const list = document.getElementById("list");
const API = "http://localhost:5000";

f.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };
  await fetch(`${API}/api/complaints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  f.reset();
  load();
});

async function load() {
  list.innerHTML = "Loading...";
  const res = await fetch(`${API}/api/complaints`);
  const data = await res.json();
  list.innerHTML = "";
  data.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name} — ${c.message} [${c.status}]`;
    list.appendChild(li);
  });
}
load();
