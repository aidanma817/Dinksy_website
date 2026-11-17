import { MASCOTS, PRODUCTS, QUIZ, VIDEOS, img } from "./data.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const money = (n) => `$${n.toFixed(2)}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const app = $("#app");

/* ---------------- cart (localStorage, safe) ---------------- */
const CART_KEY = "dinksy-cart";
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { cart = []; }
const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} };
const lineKey = (l) => `${l.id}|${l.size || ""}|${l.color || ""}`;

function addToCart(item) {
  const found = cart.find((l) => lineKey(l) === lineKey(item));
  if (found) found.qty += item.qty; else cart.push(item);
  saveCart(); renderCart(); bumpCount(); openCart();
}
function setQty(key, qty) {
  cart = cart.map((l) => (lineKey(l) === key ? { ...l, qty } : l)).filter((l) => l.qty > 0);
  saveCart(); renderCart();
}
const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
const cartTotal = () => cart.reduce((n, l) => n + l.qty * (PRODUCTS.find((p) => p.id === l.id)?.price || 0), 0);

function bumpCount() {
  $$(".cart-count").forEach((el) => { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); });
}

function renderCart() {
  const n = cartCount();
  $$(".cart-count").forEach((el) => (el.textContent = n ? n : ""));
  const body = $("#cart-body");
  if (!cart.length) {
    body.innerHTML = `<div class="empty">
      <img class="sticker" src="${img("dindin-face-bored.png")}" alt="">
      <p><strong>Your cart is empty.</strong><br>DinDin is unimpressed.</p>
      <a class="btn yellow" href="#shop" data-close>Shop merch</a></div>`;
    $("#cart-foot").hidden = true;
    return;
  }
  $("#cart-foot").hidden = false;
  body.innerHTML = cart.map((l) => {
    const p = PRODUCTS.find((x) => x.id === l.id); if (!p) return "";
    const key = esc(lineKey(l));
    const meta = [l.size, l.color].filter(Boolean).join(" · ");
    return `<div class="line-item">
      <a class="thumb bg-${p.bg}" href="#product-${p.id}" data-close><img src="${img(p.art)}" alt=""></a>
      <div><h3>${esc(p.name)}</h3><div class="meta">${esc(meta)}</div>
        <button class="remove" data-remove="${key}">Remove</button></div>
      <div style="text-align:right">
        <div class="price">${money(p.price * l.qty)}</div>
        <div class="qty" style="margin-top:6px">
          <button aria-label="Decrease" data-qty="${key}" data-d="-1">−</button><span>${l.qty}</span>
          <button aria-label="Increase" data-qty="${key}" data-d="1">+</button></div>
      </div></div>`;
  }).join("");
  $("#cart-subtotal").textContent = money(cartTotal());
}

function openCart() { $("#drawer").classList.add("open"); $("#scrim").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); $("#close-cart").focus(); }
function closeCart() { $("#drawer").classList.remove("open"); $("#scrim").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); }

/* ---------------- toast & modal ---------------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
function modal(html) { $("#modal-card").innerHTML = html; $("#modal").classList.add("open"); $("#modal [data-modal-close]")?.focus(); }
function closeModal() { $("#modal").classList.remove("open"); }

/* ---------------- shared pieces ---------------- */
const productCard = (p) => `
  <a class="card product-card" href="#product-${p.id}">
    <div class="product-art bg-${p.bg}">${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
      <img class="sticker" src="${img(p.art)}" alt="${esc(p.name)} artwork" loading="lazy"></div>
    <div class="product-info"><h3>${esc(p.name)}</h3><div class="price">${money(p.price)}</div></div>
  </a>`;

const mascotButton = (m, size = "") => `
  <button class="mascot" data-mascot="${m.id}" data-step="0" aria-label="Tap ${m.name}">
    <span class="bubble" aria-live="polite"></span>
    <img class="sticker" src="${img(m.cycle[0].img)}" alt="${m.name}" ${size}>
    <span class="hint">tap ${m.name}</span>
  </button>`;

const signup = () => `
  <section class="wrap section">
    <div class="card signup">
      <h2>Join the rally</h2>
      <p>New drops, new animations, zero spam. DonDon promises. DinDin doesn't care either way.</p>
      <form id="signup-form">
        <label class="sr-only" for="email">Email</label>
        <input id="email" type="email" placeholder="you@email.com" required>
        <button class="btn black" type="submit">Sign up</button>
      </form>
    </div>
  </section>`;

/* ---------------- pages ---------------- */
function home() {
  const d = MASCOTS.dondon, p = MASCOTS.dindin;
  const words = ["Play hard", "Dink responsibly", "Stay out of the kitchen", "Rally on", "Unbothered", "Never chill"];
  const track = [...words, ...words].map((w) => `<span>${w} ●</span>`).join("");
  return `
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <div class="eyebrow">Pickleball, but make it cute</div>
        <h1>Play hard.</h1>
        <p class="tag">Dink responsibly.</p>
        <div class="hero-cta">
          <a class="btn black" href="#shop">Shop merch</a>
          <button class="btn" data-scroll="quiz">Which one are you?</button>
        </div>
      </div>
      <div class="stage">${mascotButton(d)}${mascotButton(p)}</div>
    </div>
  </section>
  <div class="marquee" aria-hidden="true"><div class="marquee-track">${track}</div></div>

  <section class="wrap section">
    <div class="section-head"><h2>Meet the crew</h2></div>
    <div class="crew">
      ${[d, p].map((m) => `
      <a class="card crew-card ${m.color}" href="#${m.id}">
        <img class="sticker" src="${m.hero}" alt="${m.name}">
        <div><h3 class="display" style="font-size:32px;margin:0">${m.name}</h3>
          <div class="traits">${m.traits.map((t) => `<span class="trait">${t}</span>`).join("")}</div>
          <span class="btn" style="font-size:15px;padding:8px 16px">Meet ${m.id === "dondon" ? "him" : "her"} →</span></div>
      </a>`).join("")}
    </div>
  </section>

  <section class="wrap section" style="padding-top:0">
    <div class="section-head"><h2>Fresh drops</h2><a class="btn yellow" href="#shop">See all</a></div>
    <div class="grid">${PRODUCTS.slice(0, 4).map(productCard).join("")}</div>
  </section>

  <section class="wrap section" id="quiz" style="padding-top:0">
    <div class="card quiz" id="quiz-box"></div>
  </section>

  <section class="wrap section" style="padding-top:0">
    <div class="section-head"><div><div class="eyebrow">Animations</div><h2>Watch the crew</h2></div></div>
    <div class="videos">${VIDEOS.map((v) => `
      <a class="card video bg-${v.bg}" href="#" data-soon="Animations land here once the social channels are linked.">
        <span class="title">${esc(v.title)}</span>
        <img class="sticker" src="${img(v.art)}" alt="">
        <span class="play" aria-hidden="true"></span>
        <span class="sr-only">Play video</span>
      </a>`).join("")}</div>
  </section>
  ${signup()}`;
}

function shop(filter = "all") {
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.mascot === filter);
  const chips = [["all", "All"], ["dondon", "DonDon"], ["dindin", "DinDin"], ["dinksy", "Dinksy"]];
  return `
  <section class="wrap section">
    <div class="section-head">
      <div><div class="eyebrow">Merch</div><h2>Shop</h2></div>
      <div class="filters" role="group" aria-label="Filter by character">
        ${chips.map(([k, l]) => `<a class="chip" href="#shop${k === "all" ? "" : "-" + k}" aria-pressed="${k === filter}" style="text-decoration:none">${l}</a>`).join("")}
      </div>
    </div>
    <div class="grid">${list.map(productCard).join("")}</div>
    <p class="muted" style="margin-top:22px;font-size:14px">Mockup artwork and sample prices. Real product photos arrive with the Shopify store.</p>
  </section>`;
}

function product(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return notFound();
  const m = MASCOTS[p.mascot];
  const opt = (name, vals) => vals ? `
    <div class="option-group"><div class="label">${name}</div>
      <div class="options" data-option="${name.toLowerCase()}">
        ${vals.map((v, i) => `<button class="chip" aria-pressed="${i === 0}" data-val="${esc(v)}">${esc(v)}</button>`).join("")}
      </div></div>` : "";
  const related = PRODUCTS.filter((x) => x.id !== p.id && x.mascot === p.mascot).slice(0, 4);
  return `
  <section class="wrap section">
    <div class="crumbs"><a href="#shop">Shop</a> / ${m ? `<a href="#shop-${m.id}">${m.name}</a> / ` : ""}${esc(p.name)}</div>
    <div class="pdp" data-product="${p.id}">
      <div class="product-art bg-${p.bg}">${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        <img class="sticker" src="${img(p.art)}" alt="${esc(p.name)} artwork"></div>
      <div>
        <h2 style="text-transform:none">${esc(p.name)}</h2>
        <div class="price" style="font-size:24px;margin-bottom:12px">${money(p.price)}</div>
        <p>${esc(p.desc)}</p>
        ${opt("Size", p.sizes)}${opt("Color", p.colors)}
        <div class="option-group"><div class="label">Quantity</div>
          <div class="qty"><button data-pq="-1" aria-label="Decrease">−</button><span id="pq">1</span><button data-pq="1" aria-label="Increase">+</button></div></div>
        <button class="btn black block" id="add" style="margin-top:8px">Add to cart</button>
        <p class="muted" style="font-size:14px;margin-top:14px">Ships in 3–5 days · Free returns on unworn items</p>
      </div>
    </div>
  </section>
  ${related.length ? `<section class="wrap section" style="padding-top:0">
    <div class="section-head"><h2>More ${m ? m.name : "Dinksy"}</h2></div>
    <div class="grid">${related.map(productCard).join("")}</div></section>` : ""}`;
}

function character(id) {
  const m = MASCOTS[id];
  const other = MASCOTS[id === "dondon" ? "dindin" : "dondon"];
  const merch = PRODUCTS.filter((p) => p.mascot === id);
  return `
  <section class="char-hero bg-${m.color}">
    <div class="wrap char-grid">
      <div class="stage">${mascotButton(m)}</div>
      <div>
        <div class="eyebrow">Meet</div>
        <h1>${m.name}</h1>
        <span class="pronouns">${m.pronouns}</span>
        <div class="traits">${m.traits.map((t) => `<span class="trait">${t}</span>`).join("")}</div>
        <p style="font-size:19px">${esc(m.blurb)}</p>
        <a class="btn black" href="#shop-${id}">Shop ${m.name}</a>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="section-head"><h2>Moods</h2></div>
    <div class="faces" role="group" aria-label="${m.name} expressions">
      ${m.faces.map((f, i) => `<button class="face-btn" aria-pressed="${i === 0}" data-mood="${esc(f.mood)}"><img src="${img(f.img)}" alt="${esc(f.mood)}"></button>`).join("")}
    </div>
    <div class="mood" aria-live="polite">${esc(m.faces[0].mood)}</div>
  </section>

  <section class="wrap section" style="padding-top:0">
    <div class="section-head"><h2>Signature moves</h2></div>
    <div class="poses">${m.poses.map((p) => `
      <figure class="card pose bg-${m.color}" style="margin:0"><img class="sticker" src="${img(p.img)}" alt=""><figcaption>${esc(p.label)}</figcaption></figure>`).join("")}</div>
  </section>

  <section class="wrap section" style="padding-top:0">
    <div class="section-head"><h2>${m.name} merch</h2><a class="btn" href="#${other.id}">Meet ${other.name} →</a></div>
    <div class="grid">${merch.map(productCard).join("")}</div>
  </section>`;
}

function notFound() {
  return `<section class="wrap section" style="text-align:center">
    <img class="sticker" src="${img("dondon-face-confused.png")}" alt="" style="max-height:180px;margin:0 auto 12px">
    <h2>Out of bounds</h2><p>That page went long. DonDon is still looking for it.</p>
    <a class="btn yellow" href="#home">Back home</a></section>`;
}

/* ---------------- quiz ---------------- */
function runQuiz() {
  const box = $("#quiz-box"); if (!box) return;
  let i = 0; const score = { dondon: 0, dindin: 0 };
  const dots = () => `<div class="progress">${QUIZ.map((_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div>`;
  const step = () => {
    if (i >= QUIZ.length) {
      const win = score.dondon >= score.dindin ? MASCOTS.dondon : MASCOTS.dindin;
      box.innerHTML = `<div class="quiz-result">
        <div class="eyebrow">You're a…</div>
        <img class="sticker" src="${win.sticker}" alt="${win.name}">
        <h2>${win.name}</h2>
        <p>${win.id === "dondon" ? "All gas, no brakes. You'd dive for a ball in the parking lot." : "Cool, calm, and annoyingly good. You win rallies without breaking a sweat."}</p>
        <div class="hero-cta" style="justify-content:center">
          <a class="btn ${win.color}" href="#shop-${win.id}">Shop ${win.name}</a>
          <button class="btn" id="quiz-share">Share result</button>
          <button class="btn" id="quiz-again">Retake</button>
        </div></div>`;
      $("#quiz-again").onclick = runQuiz;
      $("#quiz-share").onclick = () => toast(`Share card for “I'm a ${win.name}” goes here (social links coming).`);
      return;
    }
    const q = QUIZ[i];
    box.innerHTML = `<div class="eyebrow">Quiz</div><h2 style="font-size:clamp(24px,4.5vw,34px)">Are you a DonDon or a DinDin?</h2>
      ${dots()}<p style="font-weight:800;font-size:19px">${esc(q.q)}</p>
      <div class="answers">${q.a.map(([t, who], k) => `<button class="btn ${k ? "pink" : "yellow"}" data-who="${who}">${esc(t)}</button>`).join("")}</div>`;
    $$("[data-who]", box).forEach((b) => (b.onclick = () => { score[b.dataset.who]++; i++; step(); }));
  };
  step();
}

/* ---------------- router ---------------- */
function route() {
  // Plain hash names only (#home, #shop, #shop-dindin, #product-<id>, #dondon, #dindin)
  const name = location.hash.slice(1);
  let html, title = "Dinksy";
  if (!name || name === "home") html = home();
  else if (name === "shop") { html = shop("all"); title = "Shop · Dinksy"; }
  else if (name.startsWith("shop-")) { html = shop(name.slice(5)); title = "Shop · Dinksy"; }
  else if (name.startsWith("product-")) {
    const id = name.slice(8); html = product(id);
    const p = PRODUCTS.find((x) => x.id === id); if (p) title = `${p.name} · Dinksy`;
  }
  else if (MASCOTS[name]) { html = character(name); title = `${MASCOTS[name].name} · Dinksy`; }
  else html = notFound();
  app.innerHTML = html;
  document.title = title;
  $$(".nav a").forEach((a) => {
    const target = a.getAttribute("href").slice(1);
    a.setAttribute("aria-current", name === target || name.startsWith(target + "-") ? "page" : "false");
  });
  window.scrollTo(0, 0);
  runQuiz();
}

/* ---------------- events (delegated) ---------------- */
let bubbleTimer;
document.addEventListener("click", (e) => {
  const t = e.target;

  const mascotBtn = t.closest(".mascot");
  if (mascotBtn) {
    const m = MASCOTS[mascotBtn.dataset.mascot];
    const next = (Number(mascotBtn.dataset.step) + 1) % m.cycle.length;
    mascotBtn.dataset.step = next;
    $("img", mascotBtn).src = img(m.cycle[next].img);
    const bubble = $(".bubble", mascotBtn);
    bubble.textContent = m.cycle[next].line; bubble.classList.add("show");
    mascotBtn.classList.remove("pop"); void mascotBtn.offsetWidth; mascotBtn.classList.add("pop");
    clearTimeout(bubbleTimer); bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 2200);
    return;
  }

  const face = t.closest(".face-btn");
  if (face) {
    $$(".face-btn").forEach((b) => b.setAttribute("aria-pressed", b === face));
    $(".mood").textContent = face.dataset.mood; return;
  }

  const optBtn = t.closest("[data-option] .chip");
  if (optBtn) { $$(".chip", optBtn.parentElement).forEach((b) => b.setAttribute("aria-pressed", b === optBtn)); return; }

  const pq = t.closest("[data-pq]");
  if (pq) { const el = $("#pq"); el.textContent = Math.max(1, Math.min(9, Number(el.textContent) + Number(pq.dataset.pq))); return; }

  if (t.closest("#add")) {
    const root = $("[data-product]");
    const pick = (k) => $(`[data-option="${k}"] [aria-pressed="true"]`, root)?.dataset.val;
    addToCart({ id: root.dataset.product, size: pick("size"), color: pick("color"), qty: Number($("#pq").textContent) });
    return;
  }

  if (t.closest("[data-open-cart]")) { openCart(); return; }
  if (t.closest("#close-cart") || t.closest("#scrim") || t.closest("[data-close]")) closeCart();

  const qtyBtn = t.closest("[data-qty]");
  if (qtyBtn) { const l = cart.find((x) => lineKey(x) === qtyBtn.dataset.qty); setQty(qtyBtn.dataset.qty, l.qty + Number(qtyBtn.dataset.d)); return; }
  const rm = t.closest("[data-remove]");
  if (rm) { setQty(rm.dataset.remove, 0); return; }

  if (t.closest("#checkout")) {
    modal(`<img class="sticker" src="${img("dondon-face-sweaty.png")}" alt="">
      <h2 style="font-size:30px">Almost!</h2>
      <p>Checkout goes live when the Shopify store is connected. Your cart is saved on this device.</p>
      <button class="btn yellow" data-modal-close>Keep browsing</button>`);
    return;
  }
  if (t.closest("[data-modal-close]") || t === $("#modal")) { closeModal(); return; }

  const scroller = t.closest("[data-scroll]");
  if (scroller) { document.getElementById(scroller.dataset.scroll)?.scrollIntoView({ behavior: "smooth" }); return; }

  const soon = t.closest("[data-soon]");
  if (soon) { e.preventDefault(); toast(soon.dataset.soon); }
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "signup-form") { e.preventDefault(); e.target.reset(); toast("You're on the list! (Email signup connects later.)"); }
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeModal(); } });

window.addEventListener("hashchange", route);
renderCart();
route();
