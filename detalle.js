document.addEventListener('DOMContentLoaded', () => {
    
    // Simulación de datos (Mock Data)
    const viajeSeleccionado = {
        id: 1,
        titulo: "Maravillas de Cusco y Machu Picchu",
        descripcion: "Explora la capital del imperio incaico con un tour completo de 4 días y 3 noches. Incluye visitas guiadas, transporte y desayunos.",
        precio: 1450.00,
        cupos: 12, 
        imagen: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop",
        itinerario: [
            { dia: 1, actividad: "Llegada a Cusco y aclimatación. Tour por la Plaza de Armas." },
            { dia: 2, actividad: "Visita al Valle Sagrado de los Incas y almuerzo buffet." },
            { dia: 3, actividad: "Viaje en tren y visita guiada a la ciudadela de Machu Picchu." },
            { dia: 4, actividad: "Mañana libre para compras y traslado al aeropuerto." }
        ]
    };

    renderizarDetalles(viajeSeleccionado);
});

function renderizarDetalles(viaje) {
    document.getElementById('trip-title').textContent = viaje.titulo;
    document.getElementById('trip-desc').textContent = viaje.descripcion;
    document.getElementById('trip-price').textContent = `S/ ${viaje.precio}`;
    document.getElementById('trip-capacity').textContent = viaje.cupos;
    document.getElementById('main-image').src = viaje.imagen;

    const listaItinerario = document.getElementById('itinerary-list');
    listaItinerario.innerHTML = ''; 

    viaje.itinerario.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="day-badge">Día ${item.dia}</span>
            <p>${item.actividad}</p>
        `;
        listaItinerario.appendChild(li);
    });
}