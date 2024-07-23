// Desplazamiento suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Función para formatear números como moneda en pesos colombianos sin decimales
function formatCurrency(value) {
    return `$${value.toLocaleString('es-CO')}`; // Formato sin decimales
}

// Función para manejar la búsqueda de productos
function searchProducts() {
    var input = document.getElementById('searchInput').value.trim().toLowerCase();
    var products = document.querySelectorAll('.product');
    var found = false;

    if (input === "") {
        products.forEach(product => {
            product.style.display = 'block';
        });
        return;
    }

    products.forEach(product => {
        var productName = product.querySelector('h3').innerText.toLowerCase();
        var productPrice = product.querySelector('p').innerText.toLowerCase();
        
        if (productName.includes(input) || productPrice.includes(input)) {
            product.style.display = 'block';
            product.scrollIntoView({ behavior: 'smooth', block: 'center' });
            found = true;
        } else {
            product.style.display = 'none';
        }
    });

    if (!found && input !== "") {
        alert('No se encontró ningún producto que coincida con la búsqueda.');
    }
}

// Actualizar los productos visibles si el campo de búsqueda está vacío
document.getElementById('searchInput').addEventListener('input', function() {
    if (this.value.trim() === "") {
        searchProducts();
    }
});

// Manejo del evento 'Enter' en el campo de búsqueda
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchProducts();
    }
});

// Mostrar las diapositivas del slider
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("show");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("show");
    dots[slideIndex - 1].classList.add("active");
    
    setTimeout(showSlides, 10000);
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

showSlides();

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index + 1));
});

// Efecto de nieve
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    const size = Math.random() * 10 + 10 + 'px';
    snowflake.style.width = size;
    snowflake.style.height = size;
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), (Math.random() * 3 + 2) * 1000);
}

setInterval(createSnowflake, 200);

// Inicialización del carrito
let carrito = [];

// Función para añadir productos al carrito
function addToCart(button) {
    const productElement = button.closest('.product');
    const productData = JSON.parse(productElement.getAttribute('data-product'));
    carrito.push(productData);
    updateCart();
    showCart();
}

// Función para actualizar el contenido del carrito
function updateCart() {
    const carritoContent = document.getElementById('carrito-content');
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');

    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoVacio.style.display = 'block';
    } else {
        carritoVacio.style.display = 'none';
        carrito.forEach((item, index) => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.name} - ${formatCurrency(item.price)}`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => removeFromCart(index));
            itemElement.appendChild(removeButton);
            
            carritoItems.appendChild(itemElement);
        });
    }

    updateTotal();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    carrito.splice(index, 1);
    updateCart();
}

// Función para eliminar todos los productos del carrito
function clearCart() {
    carrito = [];
    updateCart();
}

// Función para realizar la compra a través de WhatsApp
function buy() {
    if (carrito.length > 0) {
        const totalAmount = carrito.reduce((sum, item) => sum + item.price, 0);
        const message = `Hola, quisiera comprar los siguientes productos:\n\n${carrito.map(item => `${item.name} - ${formatCurrency(item.price)}`).join('\n')}\n\nTotal: ${formatCurrency(totalAmount)}`;
        window.location.href = `https://wa.me/573146783321?text=${encodeURIComponent(message)}`;
        carrito = [];
        updateCart();
    } else {
        alert('Tu carrito está vacío.');
    }
}

// Función para cerrar el carrito
function closeCart() {
    document.getElementById('carrito').style.display = 'none';
}

// Función para mostrar el carrito
function showCart() {
    document.getElementById('carrito').style.display = 'block';
}

// Función para actualizar el total del carrito
function updateTotal() {
    const totalElement = document.getElementById('total');
    const total = carrito.reduce((sum, item) => sum + item.price, 0);
    totalElement.textContent = `Total: ${formatCurrency(total)}`;
}



// Función para eliminar un producto del carrito
function removeFromCart(index) {
    carrito.splice(index, 1);
    updateCart();
}

// Función para eliminar todos los productos del carrito
function clearCart() {
    carrito = [];
    updateCart();
}

// Función para realizar la compra a través de WhatsApp
function buy() {
    if (carrito.length > 0) {
        const totalAmount = carrito.reduce((sum, item) => sum + item.price, 0);
        const message = `Hola, quisiera comprar los siguientes productos:\n\n${carrito.map(item => `${item.name} - ${formatCurrency(item.price)}`).join('\n')}\n\nTotal: ${formatCurrency(totalAmount)}`;
        window.location.href = `https://wa.me/573146783321?text=${encodeURIComponent(message)}`;
        carrito = [];
        updateCart();
    } else {
        alert('Tu carrito está vacío.');
    }
}

// Función para cerrar el carrito
function closeCart() {
    document.getElementById('carrito').style.display = 'none';
}

// Función para mostrar el carrito
function mostrarCarrito() {
    document.getElementById('carrito').style.display = 'block';
}

// Inicializar AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 50
    });
});