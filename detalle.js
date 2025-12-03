document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA DE VIAJES (Trujillo y Lima en Soles)
    const paquetes = [
        {
            id: 1,
            titulo: "TESOROS DE TRUJILLO",
            subtitulo: "Chan Chan, Huanchaco y Huacas",
            descripcion: "Descubre la capital de la eterna primavera. Incluye visita a la ciudadela de barro más grande del mundo y show de caballos de paso.",
            precio: 450.00,
            precioAntes: 600.00, // Precio para tachar
            descuento: "-25%",
            duracion: "3 Días / 2 Noches",
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/105/1.1/Principal/Huanchaco.jpg",
            itinerario: [
                "Día 1: Recepción y City Tour Trujillo.",
                "Día 2: Full Day Chan Chan y Huanchaco.",
                "Día 3: Compras de zapatos y traslado."
            ]
        },
        {
            id: 2,
            titulo: "LIMA GASTRONÓMICA",
            subtitulo: "Miraflores, Barranco y Centro",
            descripcion: "Un recorrido por los mejores sabores de la capital. Visita mercados locales, clases de cocina y cena en restaurante top.",
            precio: 380.00,
            precioAntes: 550.00,
            descuento: "-30%",
            duracion: "3 Días / 2 Noches",
            imagen: "https://media.traveler.es/photos/61376a6b568343e2e5052341/master/w_1600%2Cc_limit/196620.jpg",
            itinerario: [
                "Día 1: Circuito Mágico del Agua.",
                "Día 2: Tour Gastronómico y Barranco.",
                "Día 3: Mañana libre en Larcomar."
            ]
        },
        {
            id: 3,
            titulo: "RUTA MOCHE Y CAPITAL",
            subtitulo: "Lima y Trujillo al completo",
            descripcion: "La combinación perfecta entre historia y modernidad. Conecta la capital con el norte en un viaje inolvidable.",
            precio: 850.00,
            precioAntes: 1200.00,
            descuento: "-15%",
            duracion: "5 Días / 4 Noches",
            imagen: "https://blog.redbus.pe/wp-content/uploads/2018/03/Plaza-de-Armas-Trujillo.jpg",
            itinerario: [
                "Día 1: Llegada a Lima y tour nocturno.",
                "Día 2: Vuelo a Trujillo y playa.",
                "Día 3: Ruta del Sol y la Luna.",
                "Día 4: Complejo El Brujo.",
                "Día 5: Retorno."
            ]
        }
    ];

    // 2. REFERENCIAS AL DOM
    const contenedorLista = document.getElementById('packages-list');

    // 3. FUNCIÓN: Cargar viaje en el visor principal
    window.cargarViaje = (indice) => {
        const viaje = paquetes[indice];
        
        const imgMain = document.getElementById('main-image');
        imgMain.style.opacity = '0';
        
        setTimeout(() => {
            imgMain.src = viaje.imagen;
            imgMain.style.opacity = '1';
            
            document.getElementById('trip-title').textContent = viaje.titulo;
            document.getElementById('trip-price').textContent = `S/ ${viaje.precio.toFixed(2)}`;
            document.getElementById('trip-desc').textContent = viaje.descripcion;
            document.getElementById('trip-duration').textContent = `📅 ${viaje.duracion}`;
            document.getElementById('trip-capacity').textContent = `👥 Cupos limitados`;
            
            const listaItin = document.getElementById('itinerary-list');
            listaItin.innerHTML = '';
            viaje.itinerario.forEach(item => {
                const li = document.createElement('li');
                li.textContent = "📍 " + item;
                listaItin.appendChild(li);
            });
        }, 200);
    };

    // 4. GENERAR LAS TARJETAS ESTILO "AGENCIA"
    contenedorLista.innerHTML = ''; // Limpiar antes de llenar
    paquetes.forEach((viaje, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('promo-card'); // Nueva clase para el estilo nuevo
        tarjeta.onclick = () => cargarViaje(index);

        tarjeta.innerHTML = `
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
                    <span>🚫 Cancelación gratuita</span>
                </div>

                <div class="card-pricing">
                    <span class="price-old">Desde S/ ${viaje.precioAntes}</span>
                    <span class="price-new">S/ ${viaje.precio.toFixed(2)}</span>
                </div>
            </div>
        `;
        contenedorLista.appendChild(tarjeta);
    });

    // Cargar el primero por defecto
    cargarViaje(0);
});