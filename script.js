let allProducts = [];

// Ambil data dari data.json
const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    allProducts = data.productList; // Simpan daftar produk
    displayProducts(allProducts); // Tampilkan semua produk
  }
};
xhr.send();

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const offerItems = data.productList.filter(item => item.type === 'offer');
    displayOfferItems(offerItems);
  });

function displayProducts(products) { //function display product non offer
    const container = document.getElementById('Container');
    container.innerHTML = ''; // Bersihkan container
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      // Tambahkan atribut untuk pencarian
      productCard.setAttribute('data-name', product.name);
      productCard.setAttribute('data-description', product.description);
  
      const image = product.image.includes('http') ? product.image : `product/${product.image}`;
      productCard.innerHTML = `
        <img src="${image}" alt="Product Image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price}</p>
        </div>
      `;
  
      // Tambahkan event klik untuk membuka link
      productCard.addEventListener('click', () => {
        window.open(product.link, '_blank');
      });
  
      container.appendChild(productCard);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const notifBox = document.getElementById("xUniqueNotifBox");
    notifBox.style.display = "block";
}); 
    
function closeNotif() {
    const notifBox = document.getElementById("xUniqueNotifBox");
    notifBox.style.animation = "fadeOut 0.5s forwards";
    notifBox.addEventListener("animationend", () => notifBox.style.display = "none");
}

/* Fade out animation */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes fadeOut {
    from {
    opacity: 1;
    }
    to {
    opacity: 0;
    }
}
`;
document.head.appendChild(styleSheet);

displayProducts();