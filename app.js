document.addEventListener('DOMContentLoaded', () => {

    /* 1. DATOS CON IMÁGENES REALES (QUE SÍ FUNCIONAN) */
    const paquetes = [
        { 
            id: 1, 
            nombre: "Cusco - Machu Picchu", 
            subtitulo: "Valle Sagrado y Montaña",
            precio: 899.00, 
            precioAntes: 1100.00,
            descuento: "-18%",
            cupos: 20, 
            duracion: "4 Días",
            // IMAGEN REAL DE UNSPLASH
            imagen: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80",
            millas: "+1200"
        },
        { 
            id: 2, 
            nombre: "Arequipa - Colca", 
            subtitulo: "Cañón profundo y Cóndores",
            precio: 650.00, 
            precioAntes: 800.00,
            descuento: "-15%",
            cupos: 15, 
            duracion: "3 Días",
            // IMAGEN REAL DE UNSPLASH
            imagen: "https://images.unsplash.com/photo-1534234828569-1f353be91847?w=600&q=80",
            millas: "+600"
        },
        { 
            id: 3, 
            nombre: "Iquitos - Río Amazonas", 
            subtitulo: "Aventura en la selva",
            precio: 1200.00, 
            precioAntes: 1500.00,
            descuento: "-20%",
            cupos: 10, 
            duracion: "5 Días",
            // IMAGEN REAL DE UNSPLASH
            imagen: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=600&q=80",
            millas: "+1000"
        }
    ];

    /* 2. DIBUJAR TARJETAS EN EL INICIO */
    const contenedorDestacados = document.getElementById("destacados-grid");
    
    if (contenedorDestacados) {
        contenedorDestacados.innerHTML = "";
        paquetes.forEach(p => crearTarjeta(p, contenedorDestacados));
    }

    /* 3. DIBUJAR TARJETAS EN PAQUETES (Si aplica) */
    const contenedorPaquetes = document.getElementById("packages-grid");
    if (contenedorPaquetes) {
        contenedorPaquetes.innerHTML = "";
        paquetes.forEach(p => crearTarjeta(p, contenedorPaquetes));
    }

    /* 4. FUNCIÓN CREADORA */
    function crearTarjeta(viaje, contenedor) {
        const card = document.createElement("div");
        card.className = "promo-card"; 

        card.onclick = (e) => {
            if(e.target.tagName !== 'BUTTON') irADetalle(viaje.id);
        };

        card.innerHTML = `
            <div class="card-image-header">
                <span class="discount-badge">Oferta ${viaje.descuento}</span>
                <img src="${viaje.imagen}" alt="${viaje.nombre}">
            </div>
            <div class="card-body">
                <h4 class="card-title">${viaje.nombre}</h4>
                <p class="card-subtitle">${viaje.subtitulo}</p>
                <div class="card-pricing">
                    <span class="price-old">S/ ${viaje.precioAntes.toFixed(2)}</span>
                    <span class="price-new">S/ ${viaje.precio.toFixed(2)}</span>
                </div>
                <button class="btn-card-action" onclick="irADetalle(${viaje.id})">Ver Detalles</button>
            </div>
        `;
        contenedor.appendChild(card);
    }

    window.irADetalle = (id) => {
        localStorage.setItem("viajeSeleccionado", id);
        window.location.href = "detalle.html";
    };
});