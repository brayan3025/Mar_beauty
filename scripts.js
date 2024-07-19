document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

function searchProducts() {
    var input = document.getElementById('searchInput').value.trim().toLowerCase(); // Usar trim para eliminar espacios al inicio y final
    var products = document.querySelectorAll('.product');
    var found = false;

    if (input === "") {
        // Si el campo de búsqueda está vacío, mostrar todos los productos
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

document.getElementById('searchInput').addEventListener('input', function() {
    // Actualizar los productos visibles si el campo de búsqueda está vacío
    if (this.value.trim() === "") {
        searchProducts();
    }
});

document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

// Generar estrellas al azar en la página
for (let i = 0; i < 100; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDelay = `${Math.random() * 10}s`;
    document.body.appendChild(star);
}
