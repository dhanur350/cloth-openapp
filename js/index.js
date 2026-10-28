/**
 * ==========================================================================
 * AURA ATELIER - CLIENT JAVASCRIPT APPLICATION
 * Handles Product Data Fetching (JSON), Dynamic Rendering (Pure Flexbox),
 * Dynamic Mapping of Constants (constant.js), State Management, Cart Drawer,
 * Quick View Modal & Toast Alerts
 * ==========================================================================
 */

// ==========================================================================
// 1. GLOBAL STATE & FALLBACK PRODUCT DATA
// ==========================================================================
/**
 * Application State
 * Maintains the current products, active filters, search queries, cart, and wishlist
 */
const AppState = {
  products: [],
  filteredProducts: [],
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  cart: [],
  wishlist: new Set(),
  selectedQuickProduct: null
};

// Products catalog is now defined and loaded from js/products.js (PRODUCTS array)


// ==========================================================================
// 2. DOM ELEMENT REFERENCES
// ==========================================================================
const DOM = {
  // Navigation & Header
  siteHeader: document.getElementById('siteHeader'),
  mobileMenuToggle: document.getElementById('mobileMenuToggle'),
  mainNavigation: document.getElementById('mainNavigation'),
  navList: document.getElementById('navList'),
  searchToggleBtn: document.getElementById('searchToggleBtn'),
  searchDrawer: document.getElementById('searchDrawer'),
  searchCloseBtn: document.getElementById('searchCloseBtn'),
  headerSearchInput: document.getElementById('headerSearchInput'),

  // Hero
  heroMetrics: document.getElementById('heroMetrics'),

  // Value Props
  valuePropsContainer: document.getElementById('valuePropsContainer'),

  // Catalog Controls
  catalogSection: document.getElementById('catalog'),
  productsFlexContainer: document.getElementById('productsFlexContainer'),
  filterPills: document.getElementById('filterPills'),
  catalogSearchInput: document.getElementById('catalogSearchInput'),
  sortSelect: document.getElementById('sortSelect'),
  productCountStatus: document.getElementById('productCountStatus'),
  resetFilterBtn: document.getElementById('resetFilterBtn'),
  emptyState: document.getElementById('emptyState'),
  emptyResetBtn: document.getElementById('emptyResetBtn'),

  // Brand Story & Testimonials
  storyFeaturesList: document.getElementById('storyFeaturesList'),
  testimonialsFlexRow: document.getElementById('testimonialsFlexRow'),

  // Footer Dynamic Lists
  footerSocialLinks: document.getElementById('footerSocialLinks'),
  footerCollectionsLinks: document.getElementById('footerCollectionsLinks'),
  footerServicesLinks: document.getElementById('footerServicesLinks'),
  footerAtelierLinks: document.getElementById('footerAtelierLinks'),

  // Cart Drawer
  cartToggleBtn: document.getElementById('cartToggleBtn'),
  cartOverlay: document.getElementById('cartOverlay'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartCloseBtn: document.getElementById('cartCloseBtn'),
  cartItemsList: document.getElementById('cartItemsList'),
  cartCountBadge: document.getElementById('cartCount'),
  cartBadgeText: document.getElementById('cartBadgeText'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  clearCartBtn: document.getElementById('clearCartBtn'),
  checkoutBtn: document.getElementById('checkoutBtn'),

  // Wishlist
  wishlistBtn: document.getElementById('wishlistBtn'),
  wishlistCountBadge: document.getElementById('wishlistCount'),

  // Quick View Modal
  quickViewModal: document.getElementById('quickViewModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalProductDetails: document.getElementById('modalProductDetails'),

  // Toast Container
  toastContainer: document.getElementById('toastContainer'),

  // Newsletter
  newsletterForm: document.getElementById('newsletterForm'),
  newsletterEmail: document.getElementById('newsletterEmail'),

  // Footer Year
  currentYear: document.getElementById('currentYear')
};

// ==========================================================================
// 3. DYNAMIC MAPPING OF CONSTANTS FROM constant.js USING .map()
// ==========================================================================
/**
 * Renders all list sections dynamically using Array.prototype.map()
 * Reads arrays defined in constant.js:
 * - NAV_ITEMS (L51-L56)
 * - HERO_METRICS (L144-L155)
 * - VALUE_PROPOSITIONS (L181-L235)
 * - CATEGORY_FILTERS (L262-L267)
 * - SORT_OPTIONS (L281-L284)
 * - STORY_FEATURES (L344-L361)
 * - TESTIMONIALS (L383-L419)
 * - FOOTER_SOCIAL_LINKS (L461-L464)
 * - FOOTER_COLLECTIONS_LINKS (L472-L476)
 * - FOOTER_SERVICES_LINKS (L484-L488)
 * - FOOTER_ATELIER_LINKS (L496-L500)
 */
function renderAllMappedConstants() {
  // 1. Map Navigation Items (index.html L51-L56)
  if (DOM.navList && typeof NAV_ITEMS !== 'undefined') {
    DOM.navList.innerHTML = NAV_ITEMS.map(item => `
      <li class="nav-item">
        <a href="${item.href}" class="nav-link ${item.active ? 'active' : ''}" ${item.filter ? `data-filter="${item.filter}"` : ''}>
          ${item.label}
        </a>
      </li>
    `).join('');
  }

  // 2. Map Hero Metrics (index.html L144-L155)
  if (DOM.heroMetrics && typeof HERO_METRICS !== 'undefined') {
    DOM.heroMetrics.innerHTML = HERO_METRICS.map(metric => `
      <div class="metric-item">
        <span class="metric-value">${metric.value}</span>
        <span class="metric-label">${metric.label}</span>
      </div>
    `).join('');
  }

  // 3. Map Value Propositions Strip (index.html L181-L235)
  if (DOM.valuePropsContainer && typeof VALUE_PROPOSITIONS !== 'undefined') {
    DOM.valuePropsContainer.innerHTML = VALUE_PROPOSITIONS.map(prop => `
      <div class="value-card">
        <div class="value-icon-box">
          ${prop.iconSvg}
        </div>
        <div class="value-text">
          <h4 class="value-title">${prop.title}</h4>
          <p class="value-desc">${prop.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 4. Map Category Filter Pills (index.html L262-L267)
  if (DOM.filterPills && typeof CATEGORY_FILTERS !== 'undefined') {
    DOM.filterPills.innerHTML = CATEGORY_FILTERS.map(filter => `
      <button class="filter-pill ${filter.active ? 'active' : ''}" data-category="${filter.category}" role="tab">
        ${filter.label}
      </button>
    `).join('');
  }

  // 5. Map Sort By Options (index.html L281-L284)
  if (DOM.sortSelect && typeof SORT_OPTIONS !== 'undefined') {
    DOM.sortSelect.innerHTML = SORT_OPTIONS.map(opt => `
      <option value="${opt.value}">${opt.label}</option>
    `).join('');
  }

  // 6. Map Atelier Story Features (index.html L344-L361)
  if (DOM.storyFeaturesList && typeof STORY_FEATURES !== 'undefined') {
    DOM.storyFeaturesList.innerHTML = STORY_FEATURES.map(feat => `
      <div class="story-feature-item">
        <span class="story-feature-check">✓</span>
        <div>
          <strong>${feat.strong}</strong> ${feat.desc}
        </div>
      </div>
    `).join('');
  }

  // 7. Map Client Testimonials (index.html L383-L419)
  if (DOM.testimonialsFlexRow && typeof TESTIMONIALS !== 'undefined') {
    DOM.testimonialsFlexRow.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${t.stars}</div>
        <p class="testimonial-quote">${t.quote}</p>
        <div class="testimonial-author">
          <span class="author-avatar">${t.initials}</span>
          <div class="author-info">
            <span class="author-name">${t.author}</span>
            <span class="author-role">${t.role}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 8. Map Footer Social Links (index.html L461-L464)
  if (DOM.footerSocialLinks && typeof FOOTER_SOCIAL_LINKS !== 'undefined') {
    DOM.footerSocialLinks.innerHTML = FOOTER_SOCIAL_LINKS.map(soc => `
      <a href="${soc.href}" class="social-icon" aria-label="${soc.label}">${soc.text}</a>
    `).join('');
  }

  // 9. Map Footer Collections Links (index.html L472-L476)
  if (DOM.footerCollectionsLinks && typeof FOOTER_COLLECTIONS_LINKS !== 'undefined') {
    DOM.footerCollectionsLinks.innerHTML = FOOTER_COLLECTIONS_LINKS.map(col => `
      <li><a href="${col.href}" ${col.filter ? `data-filter="${col.filter}"` : ''}>${col.label}</a></li>
    `).join('');
  }

  // 10. Map Footer Client Services Links (index.html L484-L488)
  if (DOM.footerServicesLinks && typeof FOOTER_SERVICES_LINKS !== 'undefined') {
    DOM.footerServicesLinks.innerHTML = FOOTER_SERVICES_LINKS.map(serv => `
      <li><a href="${serv.href}">${serv.label}</a></li>
    `).join('');
  }

  // 11. Map Footer Atelier Links (index.html L496-L500)
  if (DOM.footerAtelierLinks && typeof FOOTER_ATELIER_LINKS !== 'undefined') {
    DOM.footerAtelierLinks.innerHTML = FOOTER_ATELIER_LINKS.map(atel => `
      <li><a href="${atel.href}">${atel.label}</a></li>
    `).join('');
  }
}

// ==========================================================================
// 4. INITIALIZATION & DATA FETCHING
// ==========================================================================
/**
 * Initialize application when DOM is ready
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAllMappedConstants();
  initCopyrightYear();
  loadCartFromStorage();
  loadProductsData();
  setupEventListeners();
});

/**
 * Sets current year dynamically in the footer
 */
function initCopyrightYear() {
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
}

/**
 * Loads product catalog from products.js (with JSON fetch support if served via HTTP)
 */
async function loadProductsData() {
  // If PRODUCTS array is loaded from products.js, use it directly (works everywhere, including file:// with zero CORS errors)
  if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS) && PRODUCTS.length > 0) {
    AppState.products = [...PRODUCTS];
    applyFiltersAndSort();
    return;
  }

  // Fallback to fetch data/products.json if served over HTTP/HTTPS
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched products from data/products.json:', data);
    AppState.products = Array.isArray(data) && data.length > 0 ? data : [];
  } catch (error) {
    console.warn('Could not fetch data/products.json. Ensure js/products.js is loaded.', error);
    AppState.products = [];
  }

  // Initial filtering and rendering
  applyFiltersAndSort();
}

// ==========================================================================
// 5. FILTERING, SEARCHING & SORTING LOGIC
// ==========================================================================
/**
 * Applies category filters, search input text, and sorting rules
 */
function applyFiltersAndSort() {
  let list = [...AppState.products];

  // 1. Filter by Category
  if (AppState.activeCategory !== 'all') {
    list = list.filter(item => {
      if (AppState.activeCategory === 'women' || AppState.activeCategory === 'men') {
        return item.gender === AppState.activeCategory || item.gender === 'unisex';
      }
      return item.category.toLowerCase() === AppState.activeCategory.toLowerCase();
    });
  }

  // 2. Filter by Search Query
  if (AppState.searchQuery.trim() !== '') {
    const query = AppState.searchQuery.toLowerCase().trim();
    list = list.filter(item => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.gender && item.gender.toLowerCase().includes(query))
      );
    });
  }

  // 3. Sort Options
  if (AppState.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    // Featured (default)
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  AppState.filteredProducts = list;
  renderProductCards(list);
  updateStatusBar(list.length);
}

/**
 * Updates catalog status count label and reset button state
 */
function updateStatusBar(count) {
  if (DOM.productCountStatus) {
    DOM.productCountStatus.textContent = `Showing ${count} garment${count === 1 ? '' : 's'}`;
  }

  const isFiltered = AppState.activeCategory !== 'all' || AppState.searchQuery.trim() !== '';
  if (DOM.resetFilterBtn) {
    DOM.resetFilterBtn.style.display = isFiltered ? 'inline-block' : 'none';
  }

  if (DOM.emptyState) {
    DOM.emptyState.style.display = count === 0 ? 'flex' : 'none';
  }
}

// ==========================================================================
// 6. COMPONENT: PRODUCT CARDS RENDERER (PURE FLEXBOX)
// ==========================================================================
/**
 * Renders product cards into the flex container
 * Note: Layout uses pure flexbox (no CSS Grid)
 */
function renderProductCards(products) {
  if (!DOM.productsFlexContainer) return;

  if (products.length === 0) {
    DOM.productsFlexContainer.innerHTML = '';
    return;
  }

  DOM.productsFlexContainer.innerHTML = products.map(product => {
    const isWishlisted = AppState.wishlist.has(product.id);
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;

    // Color Swatches HTML
    const swatchesHtml = product.colors && product.colors.length > 0
      ? `<div class="product-swatches">
          ${product.colors.map(color => `<span class="color-swatch-dot" style="background-color: ${color};" title="Color swatch"></span>`).join('')}
        </div>`
      : '';

    // Badge HTML
    const badgeHtml = product.badge
      ? `<div class="product-badge-strip">
          <span class="product-badge ${hasDiscount ? 'sale' : ''}">${product.badge}</span>
        </div>`
      : '';

    // Original Price HTML
    const originalPriceHtml = hasDiscount
      ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span > `
      : '';

    return `
  <article class="product-card" data-product-id="${product.id}">

    <!-- Media Container -->
    <div class="product-image-box">
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">

        ${badgeHtml}

        <!-- Floating Actions Overlay (Quick View & Wishlist) -->
        <div class="product-actions-overlay">
          <button class="product-quick-btn" data-action="quick-view" data-id="${product.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Quick View
          </button>
          <button class="product-wish-btn ${isWishlisted ? 'active' : ''}" data-action="toggle-wishlist" data-id="${product.id}" title="Save to Wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
    </div>

    <div class="product-info">
      <div class="product-meta-row">
        <span class="product-category">${product.category}</span>
        <div class="product-rating">
          <span class="rating-star">★</span>
          <span>${product.rating.toFixed(1)}</span>
        </div>
      </div>

      <h3 class="product-name" title="${product.name}">${product.name}</h3>

      ${swatchesHtml}

      <div class="product-footer">
        <div class="price-box">
          <span class="current-price">₹${product.price.toFixed(2)}</span>
          ${originalPriceHtml}
        </div>

        <button class="add-cart-icon-btn" data-action="add-to-cart" data-id="${product.id}" title="Add to Bag">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>

  </article>
    `;
  }).join('');
}

// ==========================================================================
// 7. COMPONENT: SHOPPING CART MANAGEMENT
// ==========================================================================
/**
 * Adds a product to the cart with selected size
 */
function addToCart(productId, size = null) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
  const existingItemIndex = AppState.cart.findIndex(item => item.id === productId && item.size === chosenSize);

  if (existingItemIndex > -1) {
    AppState.cart[existingItemIndex].quantity += 1;
  } else {
    AppState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: chosenSize,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added "${product.name}"(${chosenSize}) to your shopping bag.`);
}

/**
 * Modifies quantity of a cart item
 */
function updateCartItemQuantity(index, change) {
  if (!AppState.cart[index]) return;

  AppState.cart[index].quantity += change;
  if (AppState.cart[index].quantity <= 0) {
    AppState.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

/**
 * Removes an item from the cart
 */
function removeCartItem(index) {
  if (!AppState.cart[index]) return;
  const removedName = AppState.cart[index].name;
  AppState.cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
  showToast(`Removed "${removedName}" from shopping bag.`);
}

/**
 * Clears all items from the cart
 */
function clearCart() {
  if (AppState.cart.length === 0) return;
  AppState.cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast('Shopping bag has been cleared.');
}

/**
 * Updates cart drawer UI, counters, subtotal, and badge counts
 */
function updateCartUI() {
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update Badges
  if (DOM.cartCountBadge) DOM.cartCountBadge.textContent = totalItems;
  if (DOM.cartBadgeText) DOM.cartBadgeText.textContent = `${totalItems} item${totalItems === 1 ? '' : 's'} `;
  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `$${subtotal.toFixed(2)} `;

  // Render items into drawer
  if (!DOM.cartItemsList) return;

  if (AppState.cart.length === 0) {
    DOM.cartItemsList.innerHTML = `
  < div class="cart-empty-message" >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
        </svg>
        <p>Your shopping bag is currently empty.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); window.location.hash = '#catalog';">
          Discover Collection
        </button>
      </div >
  `;
    return;
  }

  DOM.cartItemsList.innerHTML = AppState.cart.map((item, index) => `
  < div class="cart-item-card" >
    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-size-badge">Size: ${item.size}</span>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>

        <div class="cart-item-controls">
          <div class="qty-btn-group">
            <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)" title="Decrease quantity">−</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)" title="Increase quantity">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem(${index})">Remove</button>
        </div>
      </div>
    </div>
`).join('');
}

/**
 * Local storage persistence for cart
 */
function saveCartToStorage() {
  try {
    localStorage.setItem('aura_cart', JSON.stringify(AppState.cart));
  } catch (e) {
    // Local storage unavailable or disabled
  }
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('aura_cart');
    if (saved) {
      AppState.cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {
    AppState.cart = [];
  }
}

// ==========================================================================
// 8. COMPONENT: WISHLIST MANAGEMENT
// ==========================================================================
/**
 * Toggles a product in/out of the user's wishlist
 */
function toggleWishlist(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  if (AppState.wishlist.has(productId)) {
    AppState.wishlist.delete(productId);
    showToast(`Removed "${product.name}" from your wishlist.`);
  } else {
    AppState.wishlist.add(productId);
    showToast(`Saved "${product.name}" to your wishlist.`);
  }

  // Update Badge Count
  if (DOM.wishlistCountBadge) {
    DOM.wishlistCountBadge.textContent = AppState.wishlist.size;
  }

  // Re-render product cards to refresh heart icons
  renderProductCards(AppState.filteredProducts);
}

// ==========================================================================
// 9. COMPONENT: QUICK VIEW MODAL
// ==========================================================================
/**
 * Opens quick view modal for a specific product
 */
function openQuickView(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product || !DOM.modalProductDetails) return;

  AppState.selectedQuickProduct = product;
  let activeSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  DOM.modalProductDetails.innerHTML = `
  < !--Modal Media Column(Flex Child)-- >
    <div class="modal-media-col">
      <img src="${product.image}" alt="${product.name}" class="modal-img">
    </div>

    <!--Modal Information Column(Flex Child)-- >
  <div class="modal-info-col">
    <span class="modal-category">${product.category} • ${product.gender || 'unisex'}</span>
    <h2 class="modal-title">${product.name}</h2>

    <div class="modal-price-row">
      <span class="modal-current-price">$${product.price.toFixed(2)}</span>
      ${hasDiscount ? `<span class="modal-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
    </div>

    <p class="modal-desc">${product.description}</p>

    <!-- Size Selector -->
    ${product.sizes && product.sizes.length > 0 ? `
        <div class="modal-size-selector">
          <span class="size-selector-label">Select Size:</span>
          <div class="size-pill-row" id="modalSizePills">
            ${product.sizes.map((size, idx) => `
              <button class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
            `).join('')}
          </div>
        </div>
      ` : ''}

    <!-- Modal Action Buttons (Flex Row) -->
    <button class="btn btn-primary" id="modalAddToCartBtn" style="margin-top: 10px;">
      Add to Shopping Bag • $${product.price.toFixed(2)}
    </button>
  </div>
`;

  // Attach size selector listeners inside modal
  const sizePills = DOM.modalProductDetails.querySelectorAll('.size-pill');
  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeSize = pill.getAttribute('data-size');
    });
  });

  // Attach Add to Cart listener inside modal
  const addBtn = DOM.modalProductDetails.querySelector('#modalAddToCartBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(product.id, activeSize);
      closeQuickView();
      openCartDrawer();
    });
  }

  // Show Modal
  if (DOM.quickViewModal) {
    DOM.quickViewModal.classList.add('active');
    DOM.quickViewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Closes the quick view modal
 */
function closeQuickView() {
  if (DOM.quickViewModal) {
    DOM.quickViewModal.classList.remove('active');
    DOM.quickViewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// 10. COMPONENT: TOAST NOTIFICATIONS
// ==========================================================================
/**
 * Displays modern floating toast alert with auto dismiss
 */
function showToast(message) {
  if (!DOM.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
  < span class="toast-icon" >✧</span >
    <span>${message}</span>
`;

  DOM.toastContainer.appendChild(toast);

  // Force reflow for animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Auto remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// ==========================================================================
// 11. COMPONENT: CART DRAWER TOGGLES
// ==========================================================================
function openCartDrawer() {
  if (DOM.cartOverlay) {
    DOM.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  if (DOM.cartOverlay) {
    DOM.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// 12. EVENT LISTENERS & DELEGATION
// ==========================================================================
function setupEventListeners() {
  // --- Header Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (DOM.siteHeader) {
      if (window.scrollY > 30) {
        DOM.siteHeader.classList.add('scrolled');
      } else {
        DOM.siteHeader.classList.remove('scrolled');
      }
    }
  });

  // --- Mobile Hamburger Navigation Toggle ---
  if (DOM.mobileMenuToggle && DOM.mainNavigation) {
    DOM.mobileMenuToggle.addEventListener('click', () => {
      DOM.mainNavigation.classList.toggle('mobile-open');
    });
  }

  // --- Navigation Link Delegation (Supports dynamically mapped NAV_ITEMS) ---
  if (DOM.navList) {
    DOM.navList.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (!link) return;

      const navLinks = DOM.navList.querySelectorAll('.nav-link');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (DOM.mainNavigation) {
        DOM.mainNavigation.classList.remove('mobile-open');
      }

      // Check for category filter in link
      const filterAttr = link.getAttribute('data-filter');
      if (filterAttr) {
        AppState.activeCategory = filterAttr;
        // Sync active pill in catalog
        const pills = document.querySelectorAll('.filter-pill');
        pills.forEach(p => {
          if (p.getAttribute('data-category') === filterAttr) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
        applyFiltersAndSort();
      }
    });
  }

  // --- Header Search Drawer Toggle ---
  if (DOM.searchToggleBtn && DOM.searchDrawer) {
    DOM.searchToggleBtn.addEventListener('click', () => {
      DOM.searchDrawer.classList.toggle('open');
      if (DOM.searchDrawer.classList.contains('open') && DOM.headerSearchInput) {
        DOM.headerSearchInput.focus();
      }
    });
  }

  if (DOM.searchCloseBtn && DOM.searchDrawer) {
    DOM.searchCloseBtn.addEventListener('click', () => {
      DOM.searchDrawer.classList.remove('open');
    });
  }

  // Header Search Input
  if (DOM.headerSearchInput) {
    DOM.headerSearchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      if (DOM.catalogSearchInput) {
        DOM.catalogSearchInput.value = e.target.value;
      }
      applyFiltersAndSort();
    });
  }

  // Catalog Toolbar Search Input
  if (DOM.catalogSearchInput) {
    DOM.catalogSearchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      if (DOM.headerSearchInput) {
        DOM.headerSearchInput.value = e.target.value;
      }
      applyFiltersAndSort();
    });
  }

  // --- Category Filter Pills (Delegated for dynamically mapped pills) ---
  if (DOM.filterPills) {
    DOM.filterPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      const pills = DOM.filterPills.querySelectorAll('.filter-pill');
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      AppState.activeCategory = pill.getAttribute('data-category');
      applyFiltersAndSort();
    });
  }

  // --- Sort Selector ---
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      applyFiltersAndSort();
    });
  }

  // --- Reset Filter Buttons ---
  const resetAllFilters = () => {
    AppState.activeCategory = 'all';
    AppState.searchQuery = '';
    AppState.sortBy = 'featured';

    if (DOM.catalogSearchInput) DOM.catalogSearchInput.value = '';
    if (DOM.headerSearchInput) DOM.headerSearchInput.value = '';
    if (DOM.sortSelect) DOM.sortSelect.value = 'featured';

    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => {
      if (p.getAttribute('data-category') === 'all') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    applyFiltersAndSort();
  };

  if (DOM.resetFilterBtn) DOM.resetFilterBtn.addEventListener('click', resetAllFilters);
  if (DOM.emptyResetBtn) DOM.emptyResetBtn.addEventListener('click', resetAllFilters);

  // --- Product Card Click Delegation (Quick View, Wishlist, Add to Cart) ---
  if (DOM.productsFlexContainer) {
    DOM.productsFlexContainer.addEventListener('click', (e) => {
      const quickBtn = e.target.closest('[data-action="quick-view"]');
      if (quickBtn) {
        const id = quickBtn.getAttribute('data-id');
        openQuickView(id);
        return;
      }

      const wishBtn = e.target.closest('[data-action="toggle-wishlist"]');
      if (wishBtn) {
        const id = wishBtn.getAttribute('data-id');
        toggleWishlist(id);
        return;
      }

      const addBtn = e.target.closest('[data-action="add-to-cart"]');
      if (addBtn) {
        const id = addBtn.getAttribute('data-id');
        addToCart(id);
        return;
      }
    });
  }

  // --- Cart Drawer Toggles ---
  if (DOM.cartToggleBtn) DOM.cartToggleBtn.addEventListener('click', openCartDrawer);
  if (DOM.cartCloseBtn) DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (DOM.clearCartBtn) DOM.clearCartBtn.addEventListener('click', clearCart);

  if (DOM.cartOverlay) {
    DOM.cartOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.cartOverlay) {
        closeCartDrawer();
      }
    });
  }

  // --- Checkout Simulation ---
  if (DOM.checkoutBtn) {
    DOM.checkoutBtn.addEventListener('click', () => {
      if (AppState.cart.length === 0) {
        showToast('Your bag is empty. Please add garments first.');
        return;
      }
      showToast('Proceeding to secure checkout...');
      setTimeout(() => {
        alert('Thank you for shopping with AURA ATELIER. This is a demonstration store.');
      }, 300);
    });
  }

  // --- Wishlist Drawer/Action Simulation ---
  if (DOM.wishlistBtn) {
    DOM.wishlistBtn.addEventListener('click', () => {
      if (AppState.wishlist.size === 0) {
        showToast('Your wishlist is empty. Tap the heart icon on any garment to save it.');
      } else {
        showToast(`You have ${AppState.wishlist.size} saved garment${AppState.wishlist.size === 1 ? '' : 's'}.`);
      }
    });
  }

  // --- Quick View Modal Close ---
  if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeQuickView);
  if (DOM.quickViewModal) {
    DOM.quickViewModal.addEventListener('click', (e) => {
      if (e.target === DOM.quickViewModal) {
        closeQuickView();
      }
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeCartDrawer();
      if (DOM.searchDrawer) DOM.searchDrawer.classList.remove('open');
    }
  });

  // --- Newsletter Form Submission ---
  if (DOM.newsletterForm) {
    DOM.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = DOM.newsletterEmail ? DOM.newsletterEmail.value.trim() : '';
      if (email) {
        showToast('Thank you for joining our Private Club. Check your inbox shortly.');
        if (DOM.newsletterEmail) DOM.newsletterEmail.value = '';
      }
    });
  }

  // --- Footer Collections Link Delegation (Supports dynamically mapped links) ---
  if (DOM.footerCollectionsLinks) {
    DOM.footerCollectionsLinks.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-filter]');
      if (!link) return;

      const filter = link.getAttribute('data-filter');
      if (filter) {
        AppState.activeCategory = filter;
        const pills = document.querySelectorAll('.filter-pill');
        pills.forEach(p => {
          if (p.getAttribute('data-category') === filter) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
        applyFiltersAndSort();
      }
    });
  }
}

// Expose key helper functions to global window for inline event handlers
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeCartItem = removeCartItem;
window.closeCartDrawer = closeCartDrawer;
