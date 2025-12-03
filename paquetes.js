document.addEventListener('DOMContentLoaded', () => {

    const listaPaquetes = [
        {
            titulo: "TESOROS DE TRUJILLO",
            subtitulo: "Chan Chan, Huanchaco y Huacas",
            duracion: "3 Días / 2 Noches",
            precio: 450.00,
            precioAntes: 600.00,
            descuento: "-25%",
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/105/1.1/Principal/Huanchaco.jpg",
            millas: "+350 millas"
        },
        {
            titulo: "LIMA GASTRONÓMICA",
            subtitulo: "Miraflores, Barranco y Centro",
            duracion: "3 Días / 2 Noches",
            precio: 380.00,
            precioAntes: 550.00,
            descuento: "-30%",
            imagen: "https://media.traveler.es/photos/61376a6b568343e2e5052341/master/w_1600%2Cc_limit/196620.jpg",
            millas: "+200 millas"
        },
        {
            titulo: "RUTA MOCHE Y CAPITAL",
            subtitulo: "Lima y Trujillo al completo",
            duracion: "5 Días / 4 Noches",
            precio: 850.00,
            precioAntes: 1200.00,
            descuento: "-15%",
            imagen: "https://blog.redbus.pe/wp-content/uploads/2018/03/Plaza-de-Armas-Trujillo.jpg",
            millas: "+800 millas"
        }
        // Puedes añadir más objetos aquí y se ordenarán automáticamente
    ];

    const gridContainer = document.getElementById('packages-grid');

    listaPaquetes.forEach(viaje => {
        const card = document.createElement('div');
        // ESTA CLASE ES FUNDAMENTAL
        card.classList.add('promo-card');
        
        // Al hacer click, ir al detalle
        card.onclick = () => {
            window.location.href = 'detalle.html'; 
        };

        // ESTRUCTURA HTML EXACTA PARA LA TARJETA
        card.innerHTML = `
            <div class="card-image-header">
                <span class="discount-badge">Ahorras ${viaje.descuento}</span>
                <img src="${viaje.imagen}" alt="${viaje.titulo}">
                <button class="btn-medida">✏️ ¡Hazlo a tu medida!</button>
            </div>
            
            <div class="card-body">
                <h4 class="card-title">${viaje.titulo}</h4>
                <p class="card-subtitle">${viaje.subtitulo}</p>
                
                <div class="card-icons">
                    <span>📅 ${viaje.duracion}</span>
                    <span>✈️ Suma ${viaje.millas}</span>
                    <span>🚫 Cancelación gratuita</span>
                </div>

                <div class="card-pricing">
                    <span class="price-old">Desde S/ ${viaje.precioAntes.toFixed(2)}</span>
                    <span class="price-new">S/ ${viaje.precio.toFixed(2)}</span>
                </div>
            </div>
        `;
        gridContainer.appendChild(card);
    });
});