// Variables globales
let trips = [];
let editingIndex = -1;
let currentFilter = 'all';

// Elementos del DOM
const tripForm = document.getElementById('tripForm');
const editForm = document.getElementById('editForm');
const upcomingTripsList = document.getElementById('upcomingTripsList');
const allTripsList = document.getElementById('allTripsList');
const modal = document.getElementById('editModal');
const createTripLink = document.getElementById('createTripLink');
const listTripsLink = document.getElementById('listTripsLink');
const createTripSection = document.getElementById('createTripSection');
const listTripsSection = document.getElementById('listTripsSection');
const logoutBtn = document.getElementById('logoutBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const filterAllBtn = document.getElementById('filterAll');
const filterUpcomingBtn = document.getElementById('filterUpcoming');
const filterCompletedBtn = document.getElementById('filterCompleted');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Cargar viajes desde localStorage si existen
    const savedTrips = localStorage.getItem('travelTruxViajes');
    if (savedTrips) {
        trips = JSON.parse(savedTrips);
        renderUpcomingTrips();
        renderAllTrips();
    }
    
    // Configurar fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    document.getElementById('editDate').min = today;
    
    // Configurar eventos
    setupEventListeners();
    
    // Inicializar renderizado
    renderUpcomingTrips();
    renderAllTrips();
});

// Configuración de event listeners
function setupEventListeners() {
    // Navegación del menú lateral
    createTripLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(createTripLink);
        createTripSection.style.display = 'grid';
        listTripsSection.style.display = 'none';
    });

    listTripsLink.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveNav(listTripsLink);
        createTripSection.style.display = 'none';
        listTripsSection.style.display = 'block';
        renderAllTrips();
    });

    // Formularios
    tripForm.addEventListener('submit', handleTripSubmit);
    editForm.addEventListener('submit', handleEditSubmit);
    
    // Botones
    logoutBtn.addEventListener('click', cerrarSesion);
    cancelEditBtn.addEventListener('click', closeModal);
    
    // Filtros
    filterAllBtn.addEventListener('click', () => filterTrips('all'));
    filterUpcomingBtn.addEventListener('click', () => filterTrips('upcoming'));
    filterCompletedBtn.addEventListener('click', () => filterTrips('completed'));
    
    // Modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Navegación
function setActiveNav(activeLink) {
    // Remover clase active de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Agregar clase active al enlace clickeado
    activeLink.classList.add('active');
}

// Manejo de formularios
function handleTripSubmit(e) {
    e.preventDefault();
    
    const trip = {
        id: Date.now(),
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        destination: document.getElementById('destination').value,
        vehicle: document.getElementById('vehicle').value,
        description: document.getElementById('description').value,
        status: 'programado',
        createdAt: new Date().toLocaleString('es-ES')
    };

    trips.push(trip);
    saveToLocalStorage();
    renderUpcomingTrips();
    renderAllTrips();
    tripForm.reset();
    
    // Mostrar notificación
    showNotification('Viaje creado correctamente', 'success');
}

function handleEditSubmit(e) {
    e.preventDefault();
    
    trips[editingIndex].title = document.getElementById('editTitle').value;
    trips[editingIndex].date = document.getElementById('editDate').value;
    trips[editingIndex].time = document.getElementById('editTime').value;
    trips[editingIndex].destination = document.getElementById('editDestination').value;
    trips[editingIndex].vehicle = document.getElementById('editVehicle').value;
    trips[editingIndex].description = document.getElementById('editDescription').value;

    saveToLocalStorage();
    renderUpcomingTrips();
    renderAllTrips();
    closeModal();
    
    // Mostrar notificación
    showNotification('Viaje actualizado correctamente', 'success');
}

// Renderizado de viajes
function renderUpcomingTrips() {
    // Obtener viajes próximos (de hoy en adelante)
    const today = new Date().toISOString().split('T')[0];
    const upcomingTrips = trips.filter(trip => trip.date >= today)
                              .sort((a, b) => new Date(a.date) - new Date(b.date))
                              .slice(0, 5);

    if (upcomingTrips.length === 0) {
        upcomingTripsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-road"></i>
                <p>No hay viajes programados próximamente.</p>
            </div>
        `;
        return;
    }

    upcomingTripsList.innerHTML = upcomingTrips.map((trip, index) => `
        <li class="trip-item">
            <div class="trip-info">
                <h3>${trip.title}</h3>
                <p>${trip.description.substring(0, 100)}${trip.description.length > 100 ? '...' : ''}</p>
                <div class="trip-details">
                    <div class="trip-detail">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formatDate(trip.date)} ${trip.time}</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${trip.destination}</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-bus"></i>
                        <span>${getVehicleName(trip.vehicle)}</span>
                    </div>
                </div>
            </div>
            <div class="trip-actions">
                <button class="btn-icon btn-edit" onclick="editTrip(${trip.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteTrip(${trip.id})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');
}

function renderAllTrips() {
    let filteredTrips = trips;
    
    // Aplicar filtro
    const today = new Date().toISOString().split('T')[0];
    if (currentFilter === 'upcoming') {
        filteredTrips = trips.filter(trip => trip.date >= today);
    } else if (currentFilter === 'completed') {
        filteredTrips = trips.filter(trip => trip.date < today);
    }

    if (filteredTrips.length === 0) {
        allTripsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-road"></i>
                <p>${currentFilter === 'all' ? 'No hay viajes registrados aún.' : 
                   currentFilter === 'upcoming' ? 'No hay viajes programados próximamente.' : 
                   'No hay viajes completados.'}</p>
            </div>
        `;
        return;
    }

    // Ordenar por fecha más reciente primero
    const sortedTrips = [...filteredTrips].sort((a, b) => new Date(b.date) - new Date(a.date));

    allTripsList.innerHTML = sortedTrips.map((trip, index) => {
        const tripIndex = trips.findIndex(t => t.id === trip.id);
        const isUpcoming = new Date(trip.date) >= new Date();
        const statusClass = isUpcoming ? 'status-done' : 'status-canceled';
        const statusText = isUpcoming ? 'Próximo' : 'Completado';
        const borderColor = isUpcoming ? 'var(--blue-light)' : 'var(--gray-medium)';
        
        return `
        <li class="trip-item" style="border-left-color: ${borderColor};">
            <div class="trip-info">
                <h3>${trip.title} 
                    <span class="trip-status ${statusClass}" style="margin-left: 10px;">
                        ${statusText}
                    </span>
                </h3>
                <p>${trip.description.substring(0, 150)}${trip.description.length > 150 ? '...' : ''}</p>
                <div class="trip-details">
                    <div class="trip-detail">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${formatDate(trip.date)} ${trip.time}</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${trip.destination}</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-bus"></i>
                        <span>${getVehicleName(trip.vehicle)}</span>
                    </div>
                    <div class="trip-detail">
                        <i class="fas fa-clock"></i>
                        <span>Creado: ${trip.createdAt}</span>
                    </div>
                </div>
            </div>
            <div class="trip-actions">
                <button class="btn-icon btn-edit" onclick="editTrip(${trip.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteTrip(${trip.id})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `}).join('');
}

// Funciones de gestión de viajes
function editTrip(tripId) {
    const tripIndex = trips.findIndex(trip => trip.id === tripId);
    if (tripIndex === -1) return;
    
    editingIndex = tripIndex;
    const trip = trips[tripIndex];
    
    document.getElementById('editTitle').value = trip.title;
    document.getElementById('editDate').value = trip.date;
    document.getElementById('editTime').value = trip.time;
    document.getElementById('editDestination').value = trip.destination;
    document.getElementById('editVehicle').value = trip.vehicle;
    document.getElementById('editDescription').value = trip.description;
    
    modal.classList.add('active');
}

function deleteTrip(tripId) {
    if (confirm('¿Estás seguro de eliminar este viaje?')) {
        const tripIndex = trips.findIndex(trip => trip.id === tripId);
        if (tripIndex !== -1) {
            trips.splice(tripIndex, 1);
            saveToLocalStorage();
            renderUpcomingTrips();
            renderAllTrips();
            
            // Mostrar notificación
            showNotification('Viaje eliminado correctamente', 'warning');
        }
    }
}

// Filtrado
function filterTrips(filter) {
    currentFilter = filter;
    
    // Actualizar botones de filtro
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (filter === 'all') {
        filterAllBtn.classList.add('active');
    } else if (filter === 'upcoming') {
        filterUpcomingBtn.classList.add('active');
    } else if (filter === 'completed') {
        filterCompletedBtn.classList.add('active');
    }
    
    renderAllTrips();
}

// Utilidades
function closeModal() {
    modal.classList.remove('active');
    editForm.reset();
}

function saveToLocalStorage() {
    localStorage.setItem('travelTruxViajes', JSON.stringify(trips));
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        window.location.href = 'index.html';
    }
}

function showNotification(message, type) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function getVehicleName(vehicleId) {
    const vehicles = {
        'bus_1': 'Bus Mercedes Benz O500',
        'bus_2': 'Bus Volvo B340',
        'bus_3': 'Bus Scania K-series',
        'microbus_1': 'Microbús Toyota Coaster',
        'microbus_2': 'Microbús Mercedes Sprinter',
        'microbus_3': 'Microbús Ford Transit'
    };
    return vehicles[vehicleId] || vehicleId;
}

// Hacer funciones disponibles globalmente para los onclick en HTML
window.editTrip = editTrip;
window.deleteTrip = deleteTrip;
window.filterTrips = filterTrips;
window.closeModal = closeModal;
window.cerrarSesion = cerrarSesion;