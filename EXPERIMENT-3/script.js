const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 45000 },
    { id: 2, name: "Smartphone", category: "Electronics", price: 20000 },
    { id: 3, name: "T-shirt", category: "Clothing", price: 500 },
    { id: 4, name: "Jeans", category: "Clothing", price: 1200 },
    { id: 5, name: "Coffee Maker", category: "Home Appliances", price: 2500 },
    { id: 6, name: "Mixer Grinder", category: "Home Appliances", price: 1800 },
    { id: 7, name: "Notebook", category: "Stationery", price: 50 },
    { id: 8, name: "Pen Set", category: "Stationery", price: 120 },
];

const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");

function renderProducts(productList) {
    if (productList.length === 0) {
        productContainer.innerHTML = `<p class="no-products">No products found!</p>`;
        return;
    }

    productContainer.innerHTML = productList.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
        </div>
    `).join('');
}

function populateFilterOptions() {
    const categories = [...new Set(products.map(p => p.category))]; // unique categories
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

categoryFilter.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all") {
        renderProducts(products);
    } else {
        const filteredProducts = products.filter(p => p.category === selectedCategory);
        renderProducts(filteredProducts);
    }
});

populateFilterOptions();
renderProducts(products);

