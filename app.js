const navToggle = document.getElementById("nav-toggle");
const projectList = document.getElementById("project-list");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const backdrop = document.getElementById("backdrop");

function dayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function indexForDay(key, length) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close projects" : "Open projects");
}

function renderQuote() {
  const quote = QUOTES[indexForDay(dayKey(), QUOTES.length)];
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = quote.author;
}

function renderProjects() {
  projectList.replaceChildren();

  if (!PROJECTS.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Projects will appear here as they go live.";
    projectList.append(empty);
    return;
  }

  const list = document.createElement("ul");
  list.className = "project-list";

  for (const project of PROJECTS) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = project.href;
    link.textContent = project.name;
    item.append(link);
    list.append(item);
  }

  projectList.append(list);
}

navToggle.addEventListener("click", () => {
  setNavOpen(!document.body.classList.contains("nav-open"));
});

backdrop.addEventListener("click", () => setNavOpen(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavOpen(false);
  }
});

renderQuote();
renderProjects();
