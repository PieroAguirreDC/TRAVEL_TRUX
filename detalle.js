document.addEventListener('DOMContentLoaded', () => {

    /* =============================================================
       1. BASE DE DATOS DE VIAJES (SINCRONIZADA Y COMPLETA)
       ¡Tiene que tener los mismos IDs y fotos que app.js!
    ============================================================= */
    const baseDatosViajes = [
        {
            id: 1, 
            titulo: "CUSCO IMPERIAL",
            subtitulo: "Machu Picchu y Valle Sagrado",
            precio: 1450.00,
            precioAntes: 1800.00,
            cupos: 20,
            // FOTO REAL DE UNSPLASH
            imagen: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1000&q=80",
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
            // FOTO REAL DE UNSPLASH
            imagen: "https://images.unsplash.com/photo-1534234828569-1f353be91847?w=1000&q=80",
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
            // FOTO REAL DE UNSPLASH
            imagen: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=1000&q=80",
            itinerario: [
                "Día 1: Navegación por el río Amazonas hasta el Lodge.",
                "Día 2: Caminata por la selva y observación de delfines rosados.",
                "Día 3: Visita a comunidad nativa Yagua.",
                "Día 4: Pesca de pirañas y caminata nocturna.",
                "Día 5: Retorno a la ciudad de Iquitos."
            ]
        },
        // (Si tienes más viajes, agrégalos aquí con sus IDs correctos)
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
            // Si el ID existe pero no lo encuentro en la base de datos local
            console.error("Viaje ID no encontrado en detalle.js:", viajeId);
            document.getElementById('loading-msg').textContent = "Error: Viaje no encontrado.";
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
        
        // Imagen (Ahora sí carga porque es el link correcto)
        const img = document.getElementById('detail-image');
        img.src = viaje.imagen;
        img.onerror = function() {
            // Fallback por si la imagen falla
            this.src = 'https://via.placeholder.com/800x400?text=Imagen+No+Disponible';
        };

        // Itinerario (Bucle para crear la lista)
        const listaItinerario = document.getElementById('detail-itinerary');
        listaItinerario.innerHTML = ''; // Limpiar

        if(viaje.itinerario && viaje.itinerario.length > 0) {
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
        } else {
            listaItinerario.innerHTML = '<li>Información de itinerario pendiente.</li>';
        }

        // Mostrar el contenido y ocultar mensaje de carga
        const loading = document.getElementById('loading-msg');
        const content = document.getElementById('detail-content');
        
        if(loading) loading.style.display = 'none';
        if(content) content.style.display = 'block';
    }

    /* 5. ADAPTAR EL NAVBAR PARA CLIENTES (Código Extra) */
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (usuarioActual && usuarioActual.rol === 'cliente') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.innerHTML = `
                <a href="cliente.html" style="font-weight:bold;">⬅ Volver a Mi Panel</a>
                <a href="history.html">Mis Viajes</a>
                <button class="nav-btn" onclick="salir()" style="background-color:#F6A329; color:#0F375A;">Cerrar Sesión</button>
            `;
        }
    }

    window.salir = () => {
        localStorage.removeItem('usuarioActual');
        window.location.href = 'index.html';
    };
});