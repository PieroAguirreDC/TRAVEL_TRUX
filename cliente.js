document.addEventListener('DOMContentLoaded', () => {
    
    // =================================================
    // 1. SEGURIDAD: VERIFICAR QUE SEA CLIENTE
    // =================================================
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuario || usuario.rol !== 'cliente') {
        window.location.href = 'login.html'; // Si intenta entrar un admin o nadie, fuera.
        return;
    }

    // =================================================
    // 2. LÓGICA DE PUNTOS (FIDELIZACIÓN)
    // =================================================
    // Si ya tiene puntos guardados, los usa. Si no, le regalamos 2450.
    let misPuntos = localStorage.getItem('misTravelPuntos');
    
    if (!misPuntos) {
        misPuntos = 2450; 
        localStorage.setItem('misTravelPuntos', misPuntos);
    }

    // Actualizar el número en la tarjeta dorada
    const displayPuntos = document.getElementById('puntos-actuales');
    if(displayPuntos) {
        displayPuntos.textContent = misPuntos;
    }

    // Hacer que el botón "Canjear" funcione
    const btnCanjear = document.querySelector('.btn-redeem');
    if(btnCanjear) {
        btnCanjear.onclick = () => {
            alert(`🎉 ¡Genial ${usuario.nombre}!\n\nTienes ${misPuntos} puntos disponibles.\nPronto habilitaremos el catálogo de premios.`);
        };
    }

    // =================================================
    // 3. BASE DE DATOS DE PAQUETES (FOTOS REALES)
    // =================================================
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
            imagen: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=600&q=80", 
            millas: "+1000"
        }
    ];

    // =================================================
    // 4. DIBUJAR LAS TARJETAS EN PANTALLA
    // =================================================
    const contenedor = document.getElementById("packages-grid");

    if (contenedor) {
        contenedor.innerHTML = ""; // Limpiar antes de dibujar
        
        paquetes.forEach(viaje => {
            const card = document.createElement("div");
            card.className = "promo-card"; // Usamos la clase del CSS nuevo

            // Al hacer click en cualquier parte de la tarjeta
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
                    
                    <div class="card-icons">
                        <span>📅 ${viaje.duracion}</span>
                        <span style="color: #F6A329; font-weight: bold;">💎 Gana ${viaje.millas.replace('+','')} pts</span>
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

    // =================================================
    // 5. FUNCIÓN PARA IR AL DETALLE
    // =================================================
    window.irADetalle = (id) => {
        localStorage.setItem("viajeSeleccionado", id);
        window.location.href = "detalle.html";
    };
});