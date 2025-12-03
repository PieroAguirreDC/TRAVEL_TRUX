document.addEventListener('DOMContentLoaded', () => {

    /* ==============================
       1. BASE DE DATOS DE PAQUETES
       (Mejorada con más datos para que se vea bonita)
    ============================== */
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

    let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;

    /* ==============================
       2. LÓGICA PARA EL HOME (index.html)
       Busca el contenedor "destacados-grid"
    ============================== */
    const contenedorDestacados = document.getElementById("destacados-grid");
    
    if (contenedorDestacados) {
        // Limpiamos
        contenedorDestacados.innerHTML = "";
        
        // Mostramos todos (o podrías usar .slice(0, 3) para mostrar solo 3)
        paquetes.forEach(p => {
            crearTarjeta(p, contenedorDestacados);
        });
    }

    /* ==============================
       3. LÓGICA PARA PAQUETES (paquetes.html)
       Busca el contenedor "packages-grid"
    ============================== */
    const contenedorPaquetes = document.getElementById("packages-grid");

    if (contenedorPaquetes) {
        contenedorPaquetes.innerHTML = "";
        paquetes.forEach(p => {
            crearTarjeta(p, contenedorPaquetes);
        });
    }

    /* ==============================
       4. FUNCIÓN GENERADORA DE TARJETAS (DISEÑO NUEVO)
       Esta función crea el HTML exacto para que el CSS funcione
    ============================== */
    function crearTarjeta(viaje, contenedor) {
        const card = document.createElement("div");
        card.className = "promo-card"; // Clase clave del CSS nuevo

        // Al hacer click, vamos al detalle (puedes cambiarlo a comprar directo si prefieres)
        card.onclick = () => {
            // Guardamos el ID del viaje seleccionado para saber cuál cargar en detalle.html
            localStorage.setItem("viajeSeleccionado", viaje.id);
            window.location.href = "detalle.html";
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
                    <span>✈️ ${viaje.millas}</span>
                    <span>👥 ${viaje.cupos} cupos</span>
                </div>

                <div class="card-pricing">
                    <span class="price-old">S/ ${viaje.precioAntes.toFixed(2)}</span>
                    <span class="price-new">S/ ${viaje.precio.toFixed(2)}</span>
                </div>
                
                <button class="btn-medida" style="margin-top:10px; width:100%;">Ver Detalles</button>
            </div>
        `;

        contenedor.appendChild(card);
    }
});