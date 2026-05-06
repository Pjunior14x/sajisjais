/* ============= UTILITIES ============= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const fmt = (n) => `R$ ${Number(n).toFixed(2)}`;

const findJersey = (id) => {
  for (const l of LEAGUES) {
    const j = l.jerseys.find(x => x.id === id);
    if (j) return { jersey: j, league: l };
  }
  return null;
};

/* ============= SEARCH ============= */
function searchJerseys(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  const results = [];
  for (const l of LEAGUES) {
    for (const j of l.jerseys) {
      const hay = `${j.team} ${j.edition} ${l.name} ${l.country} ${j.season}`.toLowerCase();
      if (hay.includes(q)) results.push({ jersey: j, league: l });
    }
  }
  return results;
}

function highlight(text, q) {
  if (!q) return escapeHtml(text);
  const safe = escapeHtml(text);
  const safeQ = escapeHtml(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(`(${safeQ})`, 'ig'), '<mark>$1</mark>');
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ============= CART ============= */
const STORAGE_KEY = 'p-cart';
let cart = [];
try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { cart = []; }

const saveCart = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
};
const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
const cartSubtotal = () => cart.reduce((s, i) => s + i.qty * i.price, 0);

function updateCartCount() {
  $('#cart-count').textContent = cartCount();
}

function addToCart(jerseyId, size, qty, customName, customNumber) {
  const found = findJersey(jerseyId);
  if (!found) return;
  const { jersey } = found;
  const idx = cart.findIndex(i => i.id === jerseyId && i.size === size);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    cart.push({
      id: jersey.id, team: jersey.team, edition: jersey.edition, season: jersey.season,
      price: jersey.price, image: jersey.image, size, qty, customName, customNumber,
    });
  }
  saveCart();
  showToast(`${jersey.team} (${size}) added to cart`);
}

function removeFromCart(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  router(); // re-render
}
function updateQty(id, size, qty) {
  const it = cart.find(i => i.id === id && i.size === size);
  if (it) { it.qty = Math.max(1, qty); saveCart(); router(); }
}
function clearCart() { cart = []; saveCart(); router(); }

/* ============= JERSEY CARD HTML ============= */
function jerseyCardHTML(j) {
  const discount = j.originalPrice && j.originalPrice > j.price
    ? Math.round(((j.originalPrice - j.price) / j.originalPrice) * 100) : 0;
  return `
    <a class="card" href="#/product/${j.id}">
      <div class="card-img">
        <img src="${j.image}" alt="${escapeHtml(j.team)} ${escapeHtml(j.edition)} ${j.season}" loading="lazy" />
        <div class="badges">
          ${j.badge ? `<span class="tag tag-${j.badge}">${j.badge}</span>` : ''}
          ${discount ? `<span class="tag tag-discount">-${discount}%</span>` : ''}
        </div>
        <button class="wishlist-btn" aria-label="Favoritos" onclick="event.preventDefault(); event.stopPropagation();">♡</button>
        <button class="quick-add" onclick="event.preventDefault(); event.stopPropagation(); Adicionar('${j.id}','M',1)">Adicionar agora</button>
      </div>
      <div class="card-body">
        <span class="card-eyebrow">${j.season} · ${escapeHtml(j.edition)}</span>
        <h3 class="card-title">${escapeHtml(j.team)}</h3>
        <div class="price-row">
          <span class="price">${fmt(j.price)}</span>
          ${j.originalPrice ? `<span class="price-original">${fmt(j.originalPrice)}</span>` : ''}
        </div>
      </div>
    </a>`;
}

/* ============= PAGES ============= */
function pageHome() {
  const heroHTML = `
    <section class="hero">
      <div class="hero-img-wrap">
        <img src="assets/aaaa.jpg" alt="" />
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <span class="badge-pill">Nova Temporada 25/26</span>
          <h1>Viva o jogo.</h1>
          <p>Camisas de futebol autênticas de todas as principais ligas — Premier League, La Liga, Serie A, Bundesliga, Ligue 1 e seleções nacionais..</p>
          <div class="hero-cta">
            <a class="btn btn-lg btn-primary btn-bold" href="#/league/premier-league">Confira as novidades</a>
            <a class="btn btn-lg btn-ink btn-bold" href="#/league/la-liga">Ver oferta</a>
          </div>
        </div>
      </div>
    </section>`;

  const pillsHTML = `
    <section class="league-pills">
      <div class="container">
        <h2 class="section-eyebrow">Compre por Liga</h2>
        <div class="pills-row">
          ${LEAGUES.map(l => `
            <a class="pill pill-${l.id}" href="#/league/${l.id}">
              <span class="country">${escapeHtml(l.country)}</span>
              <span class="name">${escapeHtml(l.name)}</span>
              <span class="count">${l.jerseys.length} kits →</span>
            </a>`).join('')}
        </div>
      </div>
    </section>`;

  const featuresHTML = `
    <section class="features">
      <div class="container">
 
      </div>
    </section>`;

  const sectionsHTML = LEAGUES.map(l => `
    <section id="${l.id}" class="league-section container">
      <div class="header-row">
        <div>
          <span class="card-eyebrow">${escapeHtml(l.country)}</span>
          <h2>${escapeHtml(l.name)}</h2>
        </div>
        <a class="view-all-link" href="#/league/${l.id}">Ver tudo ›</a>
      </div>
      <div class="jersey-grid">
        ${l.jerseys.map(jerseyCardHTML).join('')}
      </div>
    </section>`).join('');

  return heroHTML + pillsHTML + featuresHTML + sectionsHTML;
}

function pageLeague(id) {
  const l = LEAGUES.find(x => x.id === id);
  if (!l) return pageNotFound();
  return `
    <div class="container breadcrumb">
      <a href="#/">Inicio</a> <span>›</span> <span class="current">${escapeHtml(l.name)}</span>
    </div>
    <section class="container" style="padding-bottom:1rem">
      <span class="card-eyebrow">${escapeHtml(l.country)}</span>
      <h1 style="font-size:2.25rem;font-weight:900;letter-spacing:-.02em">${escapeHtml(l.name)}</h1>
      <p style="color:var(--muted);margin-top:4px">${l.jerseys.length} kits disponíveis</p>
    </section>
    <section class="container" style="padding-bottom:4rem">
      <div class="jersey-grid">${l.jerseys.map(jerseyCardHTML).join('')}</div>
    </section>`;
}

function pageProduct(id) {
  const found = findJersey(id);
  if (!found) return pageNotFound();
  const { jersey: j, league: l } = found;
  const related = l.jerseys.filter(x => x.id !== j.id).slice(0, 4);
  const sizes = ['S','M','L','XL','XXL'];

  return `
    <div class="container breadcrumb">
      <a href="#/">Início</a> <span>›</span>
      <a href="#/league/${l.id}">${escapeHtml(l.name)}</a> <span>›</span>
      <span class="current">${escapeHtml(j.team)}</span>
    </div>
    <section class="container product-grid">
      <div class="product-img"><img src="${j.image}" alt="${escapeHtml(j.team)}" /></div>
      <div class="product-info">
        <span class="card-eyebrow">${escapeHtml(l.name)} · ${j.season}</span>
        <h1>${escapeHtml(j.team)}</h1>
        <p class="product-edition">${escapeHtml(j.edition)}</p>
        <div class="product-price">
          <span class="price">${fmt(j.price)}</span>
          ${j.originalPrice ? `<span class="price-original">${fmt(j.originalPrice)}</span>` : ''}
        </div>

        <div class="opt-block">
          <div class="opt-label-row">
            <span class="opt-label">Tamanho</span>
            <button class="size-guide">Guia de Tamanho</button>
          </div>
          <div class="size-row" id="size-row">
            ${sizes.map(s => `<button type="button" class="size-btn ${s==='M'?'active':''}" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>

        <div class="opt-block custom-grid">
          <div>
            <label>Nome (Opcional)</label>
            <input id="cust-name" maxlength="12" placeholder="PLAYER" />
          </div>
          <div>
            <label>Número (Opcional)</label>
            <input id="cust-number" maxlength="2" placeholder="10" />
          </div>
        </div>

        <div class="opt-block">
          <span class="opt-label" style="display:block;margin-bottom:.5rem">Quantidade</span>
          <div class="qty-stepper">
            <button type="button" id="qty-dec">−</button>
            <span id="qty-val">1</span>
            <button type="button" id="qty-inc">+</button>
          </div>
        </div>

        <div class="cta-row">
          <button class="btn btn-lg btn-primary btn-bold btn-flex" id="btn-add">Adicionar ao Carrinho</button>
          <button class="btn btn-lg btn-dark btn-bold btn-flex" id="btn-buy">Comprar Agora</button>
          <button class="btn btn-lg btn-outline btn-icon" aria-label="Favoritos">♡</button>
        </div>

        <div class="trust-row">
      
        </div>
      </div>
    </section>

    ${related.length ? `
      <section class="container related">
        <h2>Você também pode gostar</h2>
        <div class="jersey-grid">${related.map(jerseyCardHTML).join('')}</div>
      </section>` : ''}
  `;
}

function bindProductPage(id) {
  let size = 'M';
  let qty = 1;
  const sizeRow = $('#size-row');
  sizeRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-btn');
    if (!btn) return;
    size = btn.dataset.size;
    $$('.size-btn', sizeRow).forEach(b => b.classList.toggle('active', b === btn));
  });
  $('#qty-dec').onclick = () => { qty = Math.max(1, qty - 1); $('#qty-val').textContent = qty; };
  $('#qty-inc').onclick = () => { qty += 1; $('#qty-val').textContent = qty; };

  const getCustom = () => ({
    name: $('#cust-name').value.trim().toUpperCase() || undefined,
    number: $('#cust-number').value.replace(/\D/g, '') || undefined,
  });

  $('#btn-add').onclick = () => {
    const c = getCustom();
    addToCart(id, size, qty, c.name, c.number);
  };
  $('#btn-buy').onclick = () => {
    const c = getCustom();
    addToCart(id, size, qty, c.name, c.number);
    location.hash = '#/checkout';
  };
}

function pageCart() {
  const subtotal = cartSubtotal();
  const shipping = subtotal > 99 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  const itemsHTML = cart.length === 0 ? `
    <div class="empty-state">
      <p class="lead">Seu carrinho está vazio</p>
      <p class="sub">Encontre sua camisa favorita e comece a comprar!.</p>
      <a class="btn btn-lg btn-primary btn-bold" href="#/">Veja as camisas</a>
    </div>` : `
    <div class="cart-items">
      ${cart.map(i => `
        <div class="cart-item">
          <a href="#/product/${i.id}"><img src="${i.image}" alt="${escapeHtml(i.team)}" /></a>
          <div class="cart-item-info">
            <a class="cart-item-title" href="#/product/${i.id}">${escapeHtml(i.team)}</a>
            <div class="cart-item-meta">${escapeHtml(i.edition)} · ${i.season} · Size ${i.size}</div>
            ${(i.customName || i.customNumber) ? `<div class="cart-item-meta">Custom: ${escapeHtml(i.customName || '—')} ${i.customNumber ? '#' + escapeHtml(i.customNumber) : ''}</div>` : ''}
            <div class="cart-item-row">
              <div class="qty-stepper">
                <button onclick="updateQty('${i.id}','${i.size}',${i.qty - 1})">−</button>
                <span>${i.qty}</span>
                <button onclick="updateQty('${i.id}','${i.size}',${i.qty + 1})">+</button>
              </div>
              <span class="price">${fmt(i.price * i.qty)}</span>
            </div>
          </div>
          <button class="remove" aria-label="Remove" onclick="removeFromCart('${i.id}','${i.size}')">🗑</button>
        </div>`).join('')}
      <button class="clear-link" onclick="clearCart()">Limpar carrinho</button>
    </div>`;

  const summaryHTML = cart.length === 0 ? '' : `
    <aside class="summary">
      <h2>Resumo do pedido</h2>
      <dl>
        <div><dt>Subtotal</dt><dd>${fmt(subtotal)}</dd></div>
        <div><dt>Frete</dt><dd>${shipping === 0 ? 'Grátis' : fmt(shipping)}</dd></div>
      </dl>
      <div class="total"><span>Total</span><span>${fmt(total)}</span></div>
      <a class="btn btn-lg btn-primary btn-bold btn-block" href="#/checkout">Confira</a>
      <a class="continue" href="#/">Continue comprando</a>
    </aside>`;

  return `
    <div class="container breadcrumb">
      <a href="#/">Home</a> <span>›</span> <span class="current">Carrinho de Compras</span>
    </div>
    <section class="container" style="padding-top:1.5rem;padding-bottom:4rem">
      <h1 class="page-title">Carrinho de compras (${cartCount()})</h1>
      <div class="cart-layout">${itemsHTML}${summaryHTML}</div>
    </section>`;
}

function pageCheckout() {
  if (cart.length === 0) {
    return `
      <section class="container" style="padding:6rem 1rem;text-align:center">
        <h1 class="page-title">Seu carrinho está vazio</h1>
        <a class="btn btn-lg btn-primary btn-bold" href="#/">Veja as camisas</a>
      </section>`;
  }
  const subtotal = cartSubtotal();
  const shipping = subtotal > 99 ? 0 : 9.99;
  const total = subtotal + shipping;


//pagamento 
  return `
    <div class="container breadcrumb">
      <a href="#/">Home</a> <span>›</span> <a href="#/cart">Cart</a> <span>›</span> <span class="current">Checkout</span>
    </div>
    <section class="container checkout-grid" style="padding-bottom:4rem">
      <form id="checkout-form">
        <div class="checkout-section">
          <h2>Contato</h2>
          <input type="email" required placeholder="Email" />
        </div>
        <div class="checkout-section">
          <h2>Endereço para envio</h2>
          <div class="input-row">
            <input required placeholder="Nome" />
            <input required placeholder="Sobrenome" />
          </div>
          <input required placeholder="Endereço" />
          <div class="input-row">
            <input required placeholder="Cidade" />
            <input required placeholder=" CEP" />
          </div>
          <input required placeholder="País" />
          <input required placeholder="Telefone" />
        </div>
        <div class="checkout-section">
          <h2>Pagamento</h2>
          <input required placeholder="Número do cartão" />
          <div class="input-row">
            <input required placeholder="MM / YY" />
            <input required placeholder="CVC" />
          </div>
          <input required placeholder="Nome no cartão" />
        </div>
        <button type="submit" class="btn btn-lg btn-primary btn-bold btn-block">Pagar ${fmt(total)}</button>
      </form>
      <aside class="summary">
        <h2>Seu pedido</h2>
        <ul>
          ${cart.map(i => `
            <li>
              <img src="${i.image}" alt="${escapeHtml(i.team)}" />
              <div class="info">
                <div class="name">${escapeHtml(i.team)}</div>
                <div class="meta">Size ${i.size} · Qty ${i.qty}</div>
              </div>
              <span style="font-weight:700">${fmt(i.price * i.qty)}</span>
            </li>`).join('')}
        </ul>
        <dl style="border-top:1px solid var(--border);padding-top:1rem">
          <div><dt>Subtotal</dt><dd>${fmt(subtotal)}</dd></div>
          <div><dt>Frete</dt><dd>${shipping === 0 ? 'Grátis' : fmt(shipping)}</dd></div>
        </dl>
        <div class="total"><span>Total</span><span>${fmt(total)}</span></div>
      </aside>
    </section>`;
}

function bindCheckout() {
  const f = $('#checkout-form');
  if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Order placed! (demo)');
    clearCart();
    setTimeout(() => { location.hash = '#/'; }, 600);
  });
}

function pageNotFound() {
  return `
    <section class="container" style="padding:6rem 1rem;text-align:center">
      <h1 class="page-title">Página não encontrada</h1>
      <a class="btn btn-lg btn-primary btn-bold" href="#/">Voltar ao início</a>
    </section>`;
}

function pageSearch(query) {
  const q = decodeURIComponent(query || '');
  const results = searchJerseys(q);
  const grid = results.length
    ? `<div class="jersey-grid">${results.map(r => jerseyCardHTML(r.jersey)).join('')}</div>`
    : `<div class="empty-state">
         <p class="lead">No jerseys found for "${escapeHtml(q)}"</p>
         <p class="sub">Try another team, league or keyword.</p>
         <a class="btn btn-lg btn-primary btn-bold" href="#/">Ver todas as camisas</a>
       </div>`;
  return `
    <div class="container breadcrumb">
      <a href="#/">Início</a> <span>›</span> <span class="current">Search</span>
    </div>
    <section class="container" style="padding-bottom:1rem">
      <span class="card-eyebrow">Resultados da busca</span>
      <h1 style="font-size:2.25rem;font-weight:900;letter-spacing:-.02em">"${escapeHtml(q)}"</h1>
      <p style="color:var(--muted);margin-top:4px">${results.length} ${results.length === 1 ? 'jersey' : 'jerseys'} found</p>
    </section>
    <section class="container" style="padding-bottom:4rem">${grid}</section>`;
}

/* ============= ROUTER ============= */
function router() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const app = $('#app');
  let html = '';
  let onMount = null;

  if (hash === '/' || hash === '') {
    html = pageHome();
  } else if (hash.startsWith('/league/')) {
    html = pageLeague(hash.slice('/league/'.length));
  } else if (hash.startsWith('/product/')) {
    const id = hash.slice('/product/'.length);
    html = pageProduct(id);
    onMount = () => bindProductPage(id);
  } else if (hash === '/cart') {
    html = pageCart();
  } else if (hash === '/checkout') {
    html = pageCheckout();
    onMount = bindCheckout;
  } else if (hash.startsWith('/search')) {
    const qIdx = hash.indexOf('?q=');
    const q = qIdx >= 0 ? hash.slice(qIdx + 3) : '';
    html = pageSearch(q);
  } else {
    html = pageNotFound();
  }

  app.innerHTML = html;
  window.scrollTo({ top: 0 });
  if (onMount) onMount();
}

window.addEventListener('hashchange', router);

/* ============= NAV DROPDOWNS + INIT ============= */
function buildNavDropdowns() {
  const clubs = LEAGUES.filter(l => l.id !== 'national');
  const national = LEAGUES.find(l => l.id === 'national');

  $('#dropdown-club').innerHTML = clubs.map(l => `
    <a href="#/league/${l.id}">
      <span>${escapeHtml(l.name)}</span>
      <span class="meta">${escapeHtml(l.country)}</span>
    </a>`).join('');

  $('#dropdown-national').innerHTML =
    (national ? national.jerseys.map(j => `
      <a href="#/product/${j.id}"><span>${escapeHtml(j.team)}</span></a>`).join('') : '') +
    `<a href="#/league/national" class="view-all">Ver tudo → →</a>`;
}

function buildFooterLinks() {
  $('#footer-leagues').innerHTML = LEAGUES.map(l =>
    `<li><a href="#/league/${l.id}">${escapeHtml(l.name)}</a></li>`
  ).join('');
  $('#year').textContent = new Date().getFullYear();
}

/* ============= SEARCH BAR WIRING ============= */
function bindSearchBar() {
  const input = $('#search-input');
  const btn = $('#search-btn');
  const box = $('#search-suggest');
  if (!input || !box) return;

  let activeIdx = -1;
  let currentResults = [];

  const close = () => { box.hidden = true; box.innerHTML = ''; activeIdx = -1; };

  const submit = (q) => {
    const query = (q ?? input.value).trim();
    if (!query) return;
    close();
    input.blur();
    location.hash = `#/search?q=${encodeURIComponent(query)}`;
  };

  const render = (q) => {
    const results = searchJerseys(q).slice(0, 8);
    currentResults = results;
    activeIdx = -1;
    if (!q.trim()) { close(); return; }
    if (results.length === 0) {
      box.innerHTML = `<div class="ss-empty">Nenhuma camisa encontrada "${escapeHtml(q)}"</div>`;
      box.hidden = false;
      return;
    }
    box.innerHTML = results.map((r, i) => `
      <a class="ss-item" data-idx="${i}" href="#/product/${r.jersey.id}">
        <img src="${r.jersey.image}" alt="" />
        <div class="ss-info">
          <div class="ss-team">${highlight(r.jersey.team, q)}</div>
          <div class="ss-meta">${escapeHtml(r.league.name)} · ${escapeHtml(r.jersey.edition)} · ${r.jersey.season}</div>
        </div>
        <span class="ss-price">${fmt(r.jersey.price)}</span>
      </a>`).join('') +
      `<a class="ss-all" href="#/search?q=${encodeURIComponent(q)}">Veja todos os resultados →</a>`;
    box.hidden = false;
  };

  const setActive = (idx) => {
    const items = $$('.ss-item', box);
    if (!items.length) return;
    activeIdx = (idx + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
    items[activeIdx].scrollIntoView({ block: 'nearest' });
  };

  input.addEventListener('input', (e) => render(e.target.value));
  input.addEventListener('focus', (e) => { if (e.target.value.trim()) render(e.target.value); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && currentResults[activeIdx]) {
        const r = currentResults[activeIdx];
        close();
        input.blur();
        location.hash = `#/product/${r.jersey.id}`;
      } else {
        submit();
      }
    } else if (e.key === 'Escape') {
      close();
    }
  });

  btn.addEventListener('click', () => submit());

  document.addEventListener('click', (e) => {
    if (!$('#search-pill').contains(e.target)) close();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildNavDropdowns();
  buildFooterLinks();
  updateCartCount();
  bindSearchBar();
  router();
});