// ===============================
// Simple Shopping Cart
// ===============================

// Load products from localStorage or use defaults
let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "Apple", price: 1.2 },
  { id: 2, name: "Banana", price: 0.8 },
  { id: 3, name: "Orange", price: 1.5 }
];

// Save products back to localStorage (so they persist)
localStorage.setItem("products", JSON.stringify(products));

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const totalDisplay = document.getElementById("total");

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// Render product list
// ===============================
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

// ===============================
// Add product to cart
// ===============================
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// ===============================
// Remove product from cart
// ===============================
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// ===============================
// Update cart display
// ===============================
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
      <div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);

  // Save cart in localStorage so it persists
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// Initialize
// ===============================
renderProducts();
updateCart();
