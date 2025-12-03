document.addEventListener('DOMContentLoaded', () => {
    
    // 1. VERIFICAR SESIÓN
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuario || usuario.rol !== 'cliente') {
        window.location.href = 'login.html';
        return;
    }

    // 2. CARGAR PUNTOS
    actualizarPanelPuntos();

    // 3. BASE DE DATOS DE PREMIOS
    const premios = [
        {
            id: 1,
            titulo: "Descuento S/ 50",
            descripcion: "Cupón válido para cualquier paquete nacional.",
            costo: 500,
            imagen: "https://img.freepik.com/free-vector/coupon-design-template_23-2150337893.jpg"
        },
        {
            id: 2,
            titulo: "Upgrade de Habitación",
            descripcion: "Mejora tu estadía a una Suite o Vista al Mar.",
            costo: 1200,
            imagen: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80"
        },
        {
            id: 3,
            titulo: "Mochila Viajera",
            descripcion: "Mochila oficial de TravelTrux resistente al agua.",
            costo: 2000,
            imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
        },
        {
            id: 4,
            titulo: "Cena Romántica",
            descripcion: "Cena para 2 personas en destinos seleccionados.",
            costo: 3500,
            imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80"
        },
        {
            id: 5,
            titulo: "Descuento S/ 200",
            descripcion: "Aplicable en paquetes internacionales.",
            costo: 4000,
            imagen: "https://img.freepik.com/free-vector/sale-banner-template_23-2150337894.jpg"
        },
        {
            id: 6,
            titulo: "Full Day Paracas",
            descripcion: "Viaje gratis de un día (ida y vuelta desde Lima).",
            costo: 5000,
            imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/188/1.1/Principal/Paracas.jpg"
        }
    ];

    // 4. RENDERIZAR CATÁLOGO
    const contenedor = document.getElementById('premios-grid');
    if (contenedor) {
        contenedor.innerHTML = '';
        
        premios.forEach(premio => {
            const card = document.createElement('div');
            card.className = 'promo-card'; // Reusamos el estilo de tarjeta

            card.innerHTML = `
                <div class="card-image-header" style="height: 180px;">
                    <span class="discount-badge" style="background:#F6A329; color:#0F375A;">💎 ${premio.costo} pts</span>
                    <img src="${premio.imagen}" alt="${premio.titulo}">
                </div>
                
                <div class="card-body">
                    <h4 class="card-title">${premio.titulo}</h4>
                    <p class="card-subtitle" style="font-size:0.9rem; color:#666;">${premio.descripcion}</p>
                    
                    <button class="btn-card-action" onclick="canjearPremio(${premio.id}, ${premio.costo}, '${premio.titulo}')">
                        Canjear Ahora
                    </button>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }
});

// 5. LÓGICA DE CANJE
function canjearPremio(id, costo, titulo) {
    let misPuntos = parseInt(localStorage.getItem('misTravelPuntos')) || 0;

    if (misPuntos >= costo) {
        if (confirm(`¿Deseas canjear "${titulo}" por ${costo} puntos?`)) {
            // Restar puntos
            misPuntos -= costo;
            localStorage.setItem('misTravelPuntos', misPuntos);
            
            // Actualizar vista
            actualizarPanelPuntos();
            
            alert(`✅ ¡Canje Exitoso!\nHas obtenido: ${titulo}\nTe quedan: ${misPuntos} puntos.\n\nRevisa tu correo para ver el cupón.`);
        }
    } else {
        alert(`❌ Puntos insuficientes.\nTe faltan ${costo - misPuntos} puntos para este premio.`);
    }
}

function actualizarPanelPuntos() {
    // Si no existen puntos, iniciamos con un regalo
    let puntos = localStorage.getItem('misTravelPuntos');
    if (!puntos) {
        puntos = 2450; 
        localStorage.setItem('misTravelPuntos', puntos);
    }
    
    const display = document.getElementById('puntos-actuales');
    if (display) display.textContent = puntos;
}