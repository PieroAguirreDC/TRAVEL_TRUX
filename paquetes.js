document.addEventListener('DOMContentLoaded', () => {

    // BASE DE DATOS DE VIAJES
    const listaPaquetes = [
        {
            titulo: "TRIO DE LOS BALCANES", // Ejemplo de tu imagen
            subtitulo: "Zagreb, Sarajevo, Dubrovnik",
            duracion: "10 Días / 9 Noches",
            precio: 1602.76,
            precioAntes: 1763.00,
            descuento: "-10%",
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/105/1.1/Principal/Huanchaco.jpg", // Cambia esto por tus fotos
            millas: "+32000 millas",
            cancelacion: true
        },
        {
            titulo: "TESOROS DE TRUJILLO",
            subtitulo: "Chan Chan, Huanchaco y Huacas",
            duracion: "3 Días / 2 Noches",
            precio: 450.00,
            precioAntes: 600.00,
            descuento: "-25%",
            imagen: "https://blog.redbus.pe/wp-content/uploads/2018/03/Plaza-de-Armas-Trujillo.jpg",
            millas: "+350 millas",
            cancelacion: true
        },
        {
            titulo: "LIMA GASTRONÓMICA",
            subtitulo: "Miraflores, Barranco y Centro",
            duracion: "3 Días / 2 Noches",
            precio: 380.00,
            precioAntes: 550.00,
            descuento: "-30%",
            imagen: "https://media.traveler.es/photos/61376a6b568343e2e5052341/master/w_1600%2Cc_limit/196620.jpg",
            millas: "+200 millas",
            cancelacion: true
        }
    ];

    const gridContainer = document.getElementById('packages-grid');

    // Limpiamos por si acaso
    gridContainer.innerHTML = '';

    listaPaquetes.forEach(viaje => {
        // Crear el elemento tarjeta
        const card = document.createElement('div');
        card.classList.add('promo-card');
        
        // Al hacer click, lleva al detalle
        card.onclick = () => {
            window.location.href = 'detalle.html'; 
        };

        // HTML INTERNO DE LA TARJETA
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
                    ${viaje.cancelacion ? '<span>🚫 Cancelación gratuita</span>' : ''}
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