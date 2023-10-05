function load_cart() {
    const saved_cart = localStorage.getItem("cart");
    if (saved_cart) {
        return JSON.parse(saved_cart);
    }
    return [];
}

const cart = load_cart();

function update_cart() {
    const cart_list = document.getElementById("cart-list");
    const cart_total = document.getElementById("cart-total");

    if (!cart_list || !cart_total) {
        console.error("Required elements not found.");
        return;
    }

    cart_list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cart_item = document.createElement("li");
        cart_item.innerHTML = `${item.name} - ₹${item.price.toFixed(2)}`;
        cart_list.appendChild(cart_item);
        total += item.price;
    });

    cart_total.textContent = "₹" + total.toFixed(2);
}

update_cart();

update_cart_count();

const products_list = [
    { id: 1, name: 'Product 1', price: 149.99 },
    { id: 2, name: 'Product 2', price: 159.99 },
    { id: 3, name: 'Product 3', price: 169.99 },
    { id: 4, name: 'Product 4', price: 179.99 },
    { id: 5, name: 'Product 5', price: 189.99 },
    { id: 6, name: 'Product 6', price: 119.99 },
    { id: 7, name: 'Product 7', price: 199.99 },
    { id: 8, name: 'Product 8', price: 199.99 },
    { id: 9, name: 'Product 9', price: 159.99 },
    { id: 10, name: 'Product 10', price: 139.99 },
];

const products_section = document.getElementById("products");

if (products_section) {
    products_list.forEach(product => {
        const product_div = document.createElement("div");
        product_div.className = "product";
        product_div.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        products_section.appendChild(product_div);
    });
} else {
    console.error("Products section not found.");
}

const add_to_cart_buttons = document.getElementsByClassName("add-to-cart-btn");
Array.from(add_to_cart_buttons).forEach(button => {
    button.addEventListener("click", add_to_cart);
});

function add_to_cart(event) {
    const product_id = parseInt(event.target.getAttribute("data-id"));
    const selected_product = products_list.find(product => product.id === product_id);

    if (selected_product) {
        cart.push(selected_product);
        update_cart();
        save_cart_to_storage();
    } else {
        console.error("Selected product not found.");
    }
}

function save_cart_to_storage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function update_cart_count() {
    const cart_count = document.getElementById("cart");
    if (cart_count) {
        cart_count.textContent = `Cart: ${cart.length} items`;
    }
}

const checkout_button = document.getElementById("checkout-btn");
const modal = document.getElementById("modal");
const close_modal = document.querySelector(".close");
const selected_products = document.getElementById("selected-products");

if (checkout_button) {
    checkout_button.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add products before checkout.");
            return;
        }

        const selected_product_list = cart.map(item => `${item.name} - ₹${item.price.toFixed(2)}`).join("\n");
        selected_products.textContent = selected_product_list;

        modal.style.display = "block";
    });
}

if (close_modal) {
    close_modal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

if (window.location.pathname.includes("cart.html")) {
    update_cart_count();
}
