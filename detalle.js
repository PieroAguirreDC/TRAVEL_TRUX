document.addEventListener('DOMContentLoaded', () => {

    /* 1. BASE DE DATOS DE VIAJES
       (Debe ser idéntica a la de paquetes.js para que coincida la info) */
    const baseDatosViajes = [
        {
            id: 1, 
            titulo: "CUSCO IMPERIAL",
            subtitulo: "Machu Picchu y Valle Sagrado",
            precio: 1450.00,
            precioAntes: 1800.00,
            cupos: 20,
            imagen: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop",
            itinerario: [
                "Día 1: Recepción en aeropuerto, traslado al hotel y mate de coca.",
                "Día 2: Tour completo al Valle Sagrado de los Incas.",
                "Día 3: Viaje en tren y visita guiada a la ciudadela de Machu Picchu.",
                "Día 4: Mañana libre para compras y traslado al aeropuerto."
            ]
        },
        {
            id: 2,
            titulo: "VERANO EN MÁNCORA",
            subtitulo: "Sol, playa y arena en el norte",
            precio: 890.00,
            precioAntes: 1100.00,
            cupos: 15,
            imagen: "https://images.unsplash.com/photo-1534234828569-1f353be91847?q=80&w=1000&auto=format&fit=crop",
            itinerario: [
                "Día 1: Bienvenida con coctel y tarde libre en la playa.",
                "Día 2: Tour de avistamiento de ballenas y nado con tortugas.",
                "Día 3: Desayuno buffet y check-out al mediodía."
            ]
        },
        {
            id: 3,
            titulo: "AMAZONAS SALVAJE",
            subtitulo: "Iquitos, Río Amazonas y Naturaleza",
            precio: 1200.00,
            precioAntes: 1500.00,
            cupos: 10,
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/184/1.1/Principal/Rio%20Amazonas.jpg",
            itinerario: [
                "Día 1: Navegación por el río Amazonas hasta el Lodge.",
                "Día 2: Caminata por la selva y observación de delfines rosados.",
                "Día 3: Visita a comunidad nativa Yagua.",
                "Día 4: Pesca de pirañas y caminata nocturna.",
                "Día 5: Retorno a la ciudad de Iquitos."
            ]
        },
        {
            id: 4,
            titulo: "TESOROS DE TRUJILLO",
            subtitulo: "Chan Chan y Balneario de Huanchaco",
            precio: 450.00,
            precioAntes: 600.00,
            cupos: 8,
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/105/1.1/Principal/Huanchaco.jpg",
            itinerario: [
                "Día 1: City Tour por el centro histórico de Trujillo.",
                "Día 2: Visita a la ciudadela de Chan Chan y playa Huanchaco.",
                "Día 3: Tour a las Huacas del Sol y la Luna."
            ]
        },
        {
            id: 5,
            titulo: "LIMA GASTRONÓMICA",
            subtitulo: "Capital del sabor y la historia",
            precio: 380.00,
            precioAntes: 550.00,
            cupos: 12,
            imagen: "https://media.traveler.es/photos/61376a6b568343e2e5052341/master/w_1600%2Cc_limit/196620.jpg",
            itinerario: [
                "Día 1: Circuito Mágico del Agua y cena show.",
                "Día 2: Tour gastronómico por mercados y clases de cocina.",
                "Día 3: Paseo por Barranco y Miraflores."
            ]
        },
        {
            id: 6,
            titulo: "TRIO DE LOS BALCANES",
            subtitulo: "Europa clásica: Zagreb, Sarajevo y Dubrovnik",
            precio: 1602.76,
            precioAntes: 1763.00,
            cupos: 5,
            imagen: "https://www.viajeselcorteingles.es/imagenes/v3/ofertas/cruceros/crucero-fluvial/rio-danubio/1.jpg",
            itinerario: [
                "Día 1-3: Zagreb - Recorrido por la ciudad alta y baja.",
                "Día 4-6: Sarajevo - Historia y cultura en el corazón de los Balcanes.",
                "Día 7-9: Dubrovnik - La perla del Adriático y sus murallas.",
                "Día 10: Traslado al aeropuerto internacional."
            ]
        }
    ];

    /* 2. RECUPERAR EL ID SELECCIONADO */
    const viajeId = localStorage.getItem("viajeSeleccionado");

    /* 3. LÓGICA DE CARGA */
    if (viajeId) {
        // Buscamos el viaje en el array (convertimos el ID a número por si acaso)
        const viaje = baseDatosViajes.find(v => v.id === parseInt(viajeId));

        if (viaje) {
            mostrarDetalles(viaje);
        } else {
            alert("Viaje no encontrado.");
            window.location.href = "paquetes.html";
        }
    } else {
        // Si no hay ID, volvemos a la lista
        window.location.href = "paquetes.html";
    }

    /* 4. FUNCIÓN PARA DIBUJAR EN PANTALLA */
    function mostrarDetalles(viaje) {
        // Textos básicos
        document.getElementById('detail-title').textContent = viaje.titulo;
        document.getElementById('detail-subtitle').textContent = viaje.subtitulo;
        document.getElementById('detail-price').textContent = `S/ ${viaje.precio.toFixed(2)}`;
        document.getElementById('detail-old-price').textContent = `S/ ${viaje.precioAntes.toFixed(2)}`;
        document.getElementById('detail-cupos').textContent = viaje.cupos;
        
        // Imagen
        document.getElementById('detail-image').src = viaje.imagen;

        // Itinerario (Bucle para crear la lista)
        const listaItinerario = document.getElementById('detail-itinerary');
        listaItinerario.innerHTML = ''; // Limpiar

        viaje.itinerario.forEach(actividad => {
            const item = document.createElement('li');
            item.style.marginBottom = "10px";
            item.style.padding = "10px";
            item.style.background = "#f8f9fa";
            item.style.borderRadius = "8px";
            item.style.borderLeft = "4px solid #F6A329"; // Decoración naranja
            item.textContent = actividad;
            listaItinerario.appendChild(item);
        });

        // Mostrar el contenido y ocultar mensaje de carga
        document.getElementById('loading-msg').style.display = 'none';
        document.getElementById('detail-content').style.display = 'block';
    }
});