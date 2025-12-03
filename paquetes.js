document.addEventListener('DOMContentLoaded', () => {

    /* 1. BASE DE DATOS DE PAQUETES (Completa) */
    const listaPaquetes = [
        {
            id: 1, 
            titulo: "CUSCO IMPERIAL",
            subtitulo: "Machu Picchu y Valle Sagrado",
            duracion: "4 Días / 3 Noches",
            precio: 1450.00,
            precioAntes: 1800.00,
            descuento: "-20%",
            imagen: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop",
            millas: "+1200 millas",
            cupos: 20
        },
        {
            id: 2,
            titulo: "VERANO EN MÁNCORA",
            subtitulo: "Sol, playa y arena",
            duracion: "3 Días / 2 Noches",
            precio: 890.00,
            precioAntes: 1100.00,
            descuento: "-15%",
            imagen: "https://images.unsplash.com/photo-1534234828569-1f353be91847?q=80&w=1000&auto=format&fit=crop",
            millas: "+500 millas",
            cupos: 15
        },
        {
            id: 3,
            titulo: "AMAZONAS SALVAJE",
            subtitulo: "Iquitos y Río Amazonas",
            duracion: "5 Días / 4 Noches",
            precio: 1200.00,
            precioAntes: 1500.00,
            descuento: "-18%",
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/184/1.1/Principal/Rio%20Amazonas.jpg",
            millas: "+1000 millas",
            cupos: 10
        },
        {
            id: 4,
            titulo: "TESOROS DE TRUJILLO",
            subtitulo: "Chan Chan y Huanchaco",
            duracion: "3 Días / 2 Noches",
            precio: 450.00,
            precioAntes: 600.00,
            descuento: "-25%",
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/105/1.1/Principal/Huanchaco.jpg",
            millas: "+350 millas",
            cupos: 8
        },
        {
            id: 5,
            titulo: "LIMA GASTRONÓMICA",
            subtitulo: "Ruta del sabor capitalino",
            duracion: "3 Días / 2 Noches",
            precio: 380.00,
            precioAntes: 550.00,
            descuento: "-30%",
            imagen: "https://media.traveler.es/photos/61376a6b568343e2e5052341/master/w_1600%2Cc_limit/196620.jpg",
            millas: "+200 millas",
            cupos: 12
        },
        {
            id: 6,
            titulo: "TRIO DE LOS BALCANES",
            subtitulo: "Zagreb, Sarajevo, Dubrovnik",
            duracion: "10 Días / 9 Noches",
            precio: 1602.76,
            precioAntes: 1763.00,
            descuento: "-10%",
            imagen: "https://www.viajeselcorteingles.es/imagenes/v3/ofertas/cruceros/crucero-fluvial/rio-danubio/1.jpg",
            millas: "+32000 millas",
            cupos: 5
        }
    ];

    /* 2. BUSCAR EL CONTENEDOR */
    const gridContainer = document.getElementById('packages-grid');

    if (gridContainer) {
        gridContainer.innerHTML = ''; // Limpiar contenido anterior

        /* 3. GENERAR TARJETAS */
        listaPaquetes.forEach(viaje => {
            const card = document.createElement('div');
            card.classList.add('promo-card'); // Clase maestra del CSS
            
            // Hacer click en toda la tarjeta también funciona
            card.onclick = (e) => {
                if(e.target.tagName !== 'BUTTON') irADetalle(viaje.id);
            };

            card.innerHTML = `
                <div class="card-image-header">
                    <span class="discount-badge">Oferta ${viaje.descuento}</span>
                    <img src="${viaje.imagen}" alt="${viaje.titulo}">
                </div>
                
                <div class="card-body">
                    <h4 class="card-title">${viaje.titulo}</h4>
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

            gridContainer.appendChild(card);
        });
    }

    // Función para redirigir
    window.irADetalle = (id) => {
        localStorage.setItem("viajeSeleccionado", id);
        window.location.href = 'detalle.html'; 
    };
});