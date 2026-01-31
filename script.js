
const bar = document.getElementById('bar');
const nav = document.querySelector('.navbar');
const close = document.querySelector('.close');

if (bar) {
    bar.addEventListener('click', () => nav.classList.add('active'));
}
if (close) {
    close.addEventListener('click', () => nav.classList.remove('active'));
}

document.addEventListener("DOMContentLoaded", function () {
  const myCarousel = document.querySelector("#carouselExampleAutoplaying");
  if (myCarousel) {
    const carousel = new bootstrap.Carousel(myCarousel, {
      interval: 3000, // 3 seconds
      ride: "carousel",
      pause: false // continues even on hover
    });
  }
});



function isLoggedIn() {
    return localStorage.getItem("loggedInUser") !== null;
}

function handleBuyNow(amount, name, description) {
    if (!isLoggedIn()) {
        alert("Please login to proceed with purchase.");
        window.location.href = "login.html";
        return;
    }

    makePayment(amount, name, description);
}

function signupUser() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    const user = { username, password };
    localStorage.setItem("user_" + username, JSON.stringify(user));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user_" + username));
    if (storedUser && storedUser.password === password) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials!");
    }
}
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}






const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const cartBody = document.getElementById('cart-body');
    let subtotal = 0;
    cartBody.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartBody.innerHTML += `
                    <tr>
                        <td><button onclick="removeItem(${index})">X</button></td>
                        <td><img src="${item.image}" width="50"></td>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>${item.quantity}</td>
                        <td>$${itemTotal.toFixed(2)}</td>
                    </tr>
                `;
    });

    document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('total-price').innerText = `$${subtotal.toFixed(2)}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

window.onload = renderCart;

function renderCart() {
    const cartBody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total");
    if (!cartBody || !totalEl) return;

    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        cartBody.innerHTML += `
            <tr>
                <td><button onclick="removeFromCart(${i})">❌</button></td>
                <td><img src="${item.img}" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQty(${i}, this.value)"></td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    });

    totalEl.textContent = total.toFixed(2);
}

function updateQty(index, qty) {
    cart[index].quantity = parseInt(qty) || 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


document.querySelectorAll('.cart').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const pro = icon.closest('.pro');
        const name = pro.querySelector('h5')?.innerText || 'Unknown';
        const price = parseFloat(pro.querySelector('h4')?.innerText.replace('$', '')) || 0;
        const img = pro.querySelector('img')?.src || '';
        const id = name + price;

        addToCart({ id, name, price, img });
    });
});


const detailAddBtn = document.querySelector('.single-pro-details .normal');
if (detailAddBtn) {
    detailAddBtn.addEventListener('click', () => {
        const img = document.getElementById('MainImg')?.src || '';
        const name = document.querySelector('.single-pro-details h4')?.innerText || 'Product';
        const price = parseFloat(document.querySelector('.single-pro-details h2')?.innerText.replace('$', '')) || 0;
        const qty = parseInt(document.querySelector('.single-pro-details input')?.value) || 1;
        const id = name + price;

        addToCart({ id, name, price, img, quantity: qty });
    });
}


window.addEventListener('load', () => {
    renderCart();
    const cartContainer = document.getElementById("cart-container");
    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cartContainer.innerHTML = '';
            cart.forEach(item => {
                const el = document.createElement("div");
                el.innerHTML = `
                    <img src="${item.img}" width="100">
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <hr>
                `;
                cartContainer.appendChild(el);
            });
        }
    }
});


if (window.location.pathname.includes('cart.html')) {
    displayCart();
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartContainer.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const itemTotal = product.price * product.quantity;
        total += itemTotal;

        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="100">
            <div>
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(item);
    });

    cartTotal.innerHTML = `<h3>Grand Total: $${total.toFixed(2)}</h3>`;
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}


function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}


function applyCoupon() {
    const coupon = document.getElementById("coupon-code").value.trim();
    const discountCode = "SAVE10";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

    if (coupon.toUpperCase() === discountCode) {
        total = total * 0.9;
        alert("Coupon applied! You saved 10%.");
    } else {
        alert("Invalid coupon.");
    }

    document.getElementById("cart-subtotal").textContent = `$${total.toFixed(2)}`;
    document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
}


function proceedToCheckout() {
    alert("Redirecting to payment (not implemented)");
}


function addToCart(name, price, img) {
    const qtyInput = document.getElementById('product-qty');
    const quantity = parseInt(qtyInput.value) || 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(item => item.name === name);

    if (existingIndex !== -1) {
        cart[existingIndex].qty += quantity;
    } else {
        cart.push({ name, price, img, qty: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart (${quantity})!`);
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            name: document.querySelector('.product-name').innerText,
            price: parseFloat(document.querySelector('.product-price').innerText.replace('$', '')),
            qty: parseInt(document.querySelector('.product-qty').value) || 1,
            image: document.querySelector('.product-image').src
        };
        addToCart(product);
    });
});


document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (username && email && password) {

        alert('Sign Up Successful');

        window.location.href = 'login.html';
    } else {
        alert('Please fill in all fields');
    }
});


document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;


    const validEmail = "test@example.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {

        localStorage.setItem("loggedIn", "true");


        window.location.href = "index.html";
    } else {
        alert("Invalid email or password!");
    }
});

document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = "index.html";
    } else {
        alert(data.msg);
    }
});

document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        alert("Signup successful. Please login.");
        window.location.href = "login.html";
    } else {
        alert(data.msg);
    }
});


