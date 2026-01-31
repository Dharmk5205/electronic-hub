// cart.js or inside script tag
function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        // Item exists, increment quantity
        cart[itemIndex].qty += 1;
    } else {
        // New item
        cart.push({ name, price, img, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Optional: Display cart items on cart.html
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    cartContainer.innerHTML = ""; // Clear
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" width="100">
                <p>${item.name}</p>
                <p>Qty: ${item.qty}</p>
                <p>Price: $${item.price * item.qty}</p>
            </div>
        `;
    });
}
