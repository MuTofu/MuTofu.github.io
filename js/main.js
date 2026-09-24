// Merender konten dari data.js ke halaman + interaksi (menu, filter proyek,
// form kontak, animasi scroll). Konten diubah di data.js, bukan di sini.

const D = PORTFOLIO;

// ---------- helper ----------
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const get = (obj, path) => path.split(".").reduce((o, k) => o?.[k], obj);
const icon = (id) => `<svg class="i"><use href="#i-${id}"/></svg>`;

// ---------- teks sederhana ----------
$$("[data-bind]").forEach((el) => (el.textContent = get(D, el.dataset.bind) ?? ""));
$$("[data-logo]").forEach((el) => (el.innerHTML = `${esc(D.firstName)}<span class="accent">.</span>`));
$$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
$$("[data-cv]").forEach((el) => (D.cv ? (el.href = D.cv) : el.remove()));

// ---------- foto (fallback ke inisial kalau file belum ada) ----------
const photoBox = $("[data-photo]");
const showInitials = () => $(".hero").classList.add("no-photo");
if (D.photo) {
  const img = new Image();
  img.alt = D.name;
  img.onload = () => photoBox.replaceChildren(img);
  img.onerror = showInitials;
  img.src = D.photo;
} else showInitials();

// ---------- sosial media ----------
$$("[data-socials]").forEach((ul) => {
  ul.innerHTML = D.socials
    .map((s) => {
      const ext = s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
      return `<li><a href="${esc(s.url)}"${ext} aria-label="${esc(s.label)}">${icon(s.icon)}</a></li>`;
    })
    .join("");
});

// ---------- tentang ----------
$("[data-about-lead]").innerHTML = esc(D.about.lead)
  .replace(/\{accent\}/g, '<span class="accent">')
  .replace(/\{\/accent\}/g, "</span>");
$("[data-count]").dataset.count = D.about.stat.value;
$("[data-count]").textContent = "0";
$("[data-stat-suffix]").textContent = D.about.stat.suffix;
$("[data-stat-label]").textContent = D.about.stat.label;
$("[data-facts]").innerHTML = D.about.facts
  .map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
  .join("");

// ---------- keahlian ----------
$("[data-skills]").innerHTML = D.skills
  .map(
    (g, i) => `
    <div class="skill-group reveal" style="--d:${i * 0.08}s">
      <h3>${esc(g.group)} <small>${String(i + 1).padStart(2, "0")}</small></h3>
      <ul class="skill-list">${g.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
    </div>`
  )
  .join("");

// ---------- proyek ----------
$("[data-filters]").innerHTML = D.projectFilters
  .map((f, i) => `<button role="tab" data-filter="${esc(f.key)}" aria-selected="${i === 0}"><span>${esc(f.label)}</span></button>`)
  .join("");

$("[data-projects]").innerHTML = D.projects
  .map((p) => {
    const imgs = p.images.map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join("");
    return `
    <article class="project reveal" data-cats="${esc(p.cats.join(" "))}">
      <a href="${esc(p.url)}" class="project-media media-${esc(p.fit)}" style="--tone:${esc(p.tone)}"
         aria-label="Studi kasus ${esc(p.title)}">
        ${imgs}
        <span class="project-view">Lihat studi kasus ${icon("arrow")}</span>
      </a>
      <div class="project-info">
        <div>
          <h3>${esc(p.title)}</h3>
          <p class="project-kind">${esc(p.kind)}</p>
          <ul class="project-stack">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
        <span class="project-year">${esc(p.year)}</span>
      </div>
    </article>`;
  })
  .join("");

// Pola lebar kartu: lebar-sempit / sempit-lebar, dihitung ulang setelah filter.
function layoutProjects() {
  $$(".project:not(.is-hidden)").forEach((card, i) => card.classList.toggle("wide", i % 4 === 0 || i % 4 === 3));
}
layoutProjects();

$("[data-filters]").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  $$("[data-filter]").forEach((b) => b.setAttribute("aria-selected", b === btn));
  const key = btn.dataset.filter;
  const cards = $$(".project");
  cards.forEach((c) => c.classList.add("is-fading"));
  setTimeout(() => {
    cards.forEach((c) => c.classList.toggle("is-hidden", !(key === "all" || c.dataset.cats.split(" ").includes(key))));
    layoutProjects();
    requestAnimationFrame(() => cards.forEach((c) => c.classList.remove("is-fading")));
  }, 250);
});

// ---------- pengalaman & pendidikan ----------
$("[data-experience]").innerHTML = D.experience
  .map(
    (j) => `
    <article class="job reveal">
      <p class="job-period">${esc(j.period)}</p>
      <div>
        <h3>${esc(j.role)}</h3>
        <p class="job-org">${esc(j.org)}</p>
        <ul>${j.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>
    </article>`
  )
  .join("");

$("[data-education]").innerHTML = D.education
  .map(
    (e, i) => `
    <div class="edu-card reveal" style="--d:${i * 0.08}s">
      <p class="job-period">${esc(e.period)}</p>
      <h4>${esc(e.title)}</h4>
      <p>${esc(e.org)}</p>
      ${e.note ? `<p class="edu-note">${esc(e.note)}</p>` : ""}
    </div>`
  )
  .join("");

// ---------- kontak ----------
const contactRows = [
  { href: `mailto:${D.email}`, icon: "mail", text: D.email, note: "Email" },
  D.whatsapp && { href: `https://wa.me/${D.whatsapp}`, icon: "whatsapp", text: D.phone, note: "WhatsApp", ext: true },
  ...D.socials
    .filter((s) => s.icon !== "mail")
    .map((s) => ({ href: s.url, icon: s.icon, text: s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), note: s.label, ext: true })),
].filter(Boolean);
$("[data-contact-list]").innerHTML = contactRows
  .map(
    (r) => `<li><a href="${esc(r.href)}"${r.ext ? ' target="_blank" rel="noopener"' : ""}>
      ${icon(r.icon)}<span>${esc(r.text)}</span><small>${esc(r.note)}</small></a></li>`
  )
  .join("");

// Form → dikirim lewat Web3Forms (kalau web3formsKey diisi), selain itu mailto.
const form = $("#contact-form");
const formMsg = $("[data-form-msg]");
const submitBtn = $("button[type=submit]", form);
const setMsg = (text, type = "") => {
  formMsg.textContent = text;
  formMsg.className = `form-msg ${type}`;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let ok = true;
  $$(".field input, .field textarea", form).forEach((el) => {
    const bad = !el.checkValidity();
    el.closest(".field").classList.toggle("invalid", bad);
    if (bad) ok = false;
  });
  if (!ok) return setMsg("Mohon isi nama, email yang valid, dan pesan.", "err");

  const f = new FormData(form);
  const subject = f.get("subject") || `Pesan dari ${f.get("name")}`;

  if (!D.web3formsKey) {
    const body = `${f.get("message")}\n\n— ${f.get("name")}\n${f.get("email")}`;
    location.href = `mailto:${D.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return setMsg("Membuka aplikasi email kamu…");
  }

  submitBtn.disabled = true;
  setMsg("Mengirim…");
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: D.web3formsKey,
        subject: `[Portofolio] ${subject}`,
        from_name: "Portofolio Website",
        name: f.get("name"),
        email: f.get("email"),
        message: f.get("message"),
        botcheck: f.get("botcheck") === "on",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
    setMsg("Terima kasih! Pesan kamu sudah terkirim ✓", "ok");
    form.reset();
  } catch (err) {
    console.error("Gagal mengirim form:", err);
    setMsg(`Pesan gagal terkirim. Coba lagi, atau email langsung ke ${D.email}.`, "err");
  } finally {
    submitBtn.disabled = false;
  }
});
form.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("invalid"));

// ---------- menu mobile & link aktif ----------
const nav = $("#nav");
const burger = $(".burger");
const setMenu = (open) => {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
};
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

const navLinks = $$("#nav a");
const spy = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (en.isIntersecting)
        navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
    }),
  { rootMargin: "-45% 0px -50% 0px" }
);
navLinks.forEach((a) => {
  const target = $(a.getAttribute("href"));
  if (target) spy.observe(target);
});

// ---------- tombol ke atas + progres scroll ----------
const toTop = $(".to-top");
const ring = $(".to-top-ring circle");
const RING = 2 * Math.PI * 47;
ring.style.strokeDasharray = RING;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  toTop.classList.toggle("show", scrollY > 500);
  ring.style.strokeDashoffset = RING * (1 - (max > 0 ? scrollY / max : 0));
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- animasi muncul saat scroll + counter ----------
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function countUp(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) return (el.textContent = target);
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const revealer = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("[data-count]", en.target).forEach(countUp);
      revealer.unobserve(en.target);
    }),
  { threshold: 0.12 }
);
$$(".reveal").forEach((el) => revealer.observe(el));
