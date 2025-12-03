document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar si el usuario está logueado (Simulación)
    // Si usas localStorage para guardar el usuario al hacer login, descomenta esto:
    /*
    const user = localStorage.getItem('usuarioLogueado');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    */

    // 2. Datos simulados (Mock Data) según los requisitos
    const historialViajes = [
        {
            id: 1,
            titulo: "Escapada a Cusco",
            fecha: "2024-05-10",
            estado: "Finalizado",
            precio: "S/ 1200",
            detalles: "Vuelo ida y vuelta + Hotel 3 noches + Tour Machu Picchu."
        },
        {
            id: 2,
            titulo: "Playa en Máncora",
            fecha: "2024-08-15",
            estado: "Finalizado",
            precio: "S/ 800",
            detalles: "Bus cama + Bungalow frente al mar."
        },
        {
            id: 3,
            titulo: "Arequipa Full Day",
            fecha: "2024-11-20",
            estado: "Cancelado",
            precio: "S/ 150",
            detalles: "Tour guiado por el cañón del Colca."
        }
    ];

    const listContainer = document.getElementById('trips-list');

    // 3. Función para renderizar la lista
    function renderizarViajes() {
        listContainer.innerHTML = ''; // Limpiar contenedor

        if (historialViajes.length === 0) {
            listContainer.innerHTML = '<p>No tienes viajes registrados.</p>';
            return;
        }

        historialViajes.forEach(viaje => {
            // Crear la tarjeta del viaje
            const card = document.createElement('div');
            card.classList.add('trip-card');

            // Determinar color del estado
            const statusClass = viaje.estado === 'Finalizado' ? 'status-done' : 'status-canceled';

            card.innerHTML = `
                <div class="trip-info">
                    <h3>${viaje.titulo}</h3>
                    <p><strong>Fecha:</strong> ${viaje.fecha}</p>
                    <span class="trip-status ${statusClass}">${viaje.estado}</span>
                </div>
                <button class="btn-details" onclick="verDetalles(${viaje.id})">Ver Detalles</button>
            `;

            listContainer.appendChild(card);
        });
    }

    // 4. Función para ver detalles (Requisito de click)
    window.verDetalles = (id) => {
        const viaje = historialViajes.find(v => v.id === id);
        if (viaje) {
            alert(`Detalles del viaje a ${viaje.titulo}:\n\n${viaje.detalles}\nPrecio: ${viaje.precio}`);
        }
    };

    // Ejecutar renderizado
    renderizarViajes();
});