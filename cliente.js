document.addEventListener('DOMContentLoaded', () => {

    // 1. LA MISMA BASE DE DATOS QUE EN EL INICIO
    const paquetes = [
        { 
            id: 1, 
            nombre: "Cusco - Machu Picchu", 
            subtitulo: "Valle Sagrado y Montaña",
            precio: 899.00, 
            precioAntes: 1100.00,
            descuento: "-18%",
            cupos: 20, 
            duracion: "4 Días / 3 Noches",
            imagen: "https://i.ibb.co/FqtLpc8/cusco.jpg",
            millas: "+1200 millas"
        },
        { 
            id: 2, 
            nombre: "Arequipa - Colca", 
            subtitulo: "Cañón profundo y Cóndores",
            precio: 650.00, 
            precioAntes: 800.00,
            descuento: "-15%",
            cupos: 15, 
            duracion: "3 Días / 2 Noches",
            imagen: "https://i.ibb.co/qpRpVJ0/arequipa.jpg",
            millas: "+600 millas"
        },
        { 
            id: 3, 
            nombre: "Iquitos - Río Amazonas", 
            subtitulo: "Aventura en la selva",
            precio: 1200.00, 
            precioAntes: 1500.00,
            descuento: "-20%",
            cupos: 10, 
            duracion: "5 Días / 4 Noches",
            imagen: "https://i.ibb.co/44hz13X/amazonas.jpg",
            millas: "+1000 millas"
        }
    ];

    // 2. BUSCAR EL CONTENEDOR NUEVO
    const contenedor = document.getElementById("packages-grid");

    if (contenedor) {
        contenedor.innerHTML = ""; // Limpiar
        
        // 3. GENERAR LAS TARJETAS (DISEÑO NUEVO)
        paquetes.forEach(viaje => {
            const card = document.createElement("div");
            card.className = "promo-card"; // ¡Importante! Usa la clase del CSS nuevo

            card.onclick = (e) => {
                // Si no es click en el botón, redirige igual
                if(e.target.tagName !== 'BUTTON') irADetalle(viaje.id);
            };

            // HTML IDÉNTICO AL DE LA PÁGINA DE INICIO
            card.innerHTML = `
                <div class="card-image-header">
                    <span class="discount-badge">Oferta ${viaje.descuento}</span>
                    <img src="${viaje.imagen}" alt="${viaje.nombre}">
                </div>
                
                <div class="card-body">
                    <h4 class="card-title">${viaje.nombre}</h4>
                    <p class="card-subtitle">${viaje.subtitulo}</p>
                    
                    <div class="card-icons">
                        <span>📅 ${viaje.duracion}</span>
                        <span>✈️ ${viaje.millas}</span>
                        <span>👥 ${viaje.cupos} cupos</span>
                    </div>

                    <div class="card-pricing">
                        <span class="price-old">S/ ${viaje.precioAntes.toFixed(2)}</span>
                        <span class="price-new">S/ ${viaje.precio.toFixed(2)}</span>
                    </div>
                    
                    <button class="btn-card-action" onclick="irADetalle(${viaje.id})">Ver Detalles</button>
                </div>
            `;

            contenedor.appendChild(card);
        });
    }

    // Función global para redirigir
    window.irADetalle = (id) => {
        localStorage.setItem("viajeSeleccionado", id);
        window.location.href = "detalle.html";
    };
})