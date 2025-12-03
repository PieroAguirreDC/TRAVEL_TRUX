document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar seguridad (Solo admin entra)
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuario || usuario.rol !== 'admin') {
        alert("Acceso denegado");
        window.location.href = 'login.html';
        return;
    }

    // 2. Cargar tabla inicial
    renderizarTabla();

    // 3. Configurar formulario
    const form = document.getElementById('form-reembolso');
    form.addEventListener('submit', guardarReembolso);

    // 4. Validación: No permitir números en el nombre
    const inputCliente = document.getElementById('cliente');
    inputCliente.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
});

function guardarReembolso(e) {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value.trim();
    const monto = parseFloat(document.getElementById('monto').value);
    const motivo = document.getElementById('motivo').value.trim();

    if (cliente && monto && motivo) {
        const nuevoRegistro = {
            id: Date.now(),
            cliente,
            monto,
            motivo
        };

        // Guardar en memoria
        const lista = JSON.parse(localStorage.getItem('reembolsos')) || [];
        lista.push(nuevoRegistro);
        localStorage.setItem('reembolsos', JSON.stringify(lista));

        // Limpiar y actualizar
        document.getElementById('form-reembolso').reset();
        renderizarTabla();
        
        // Pequeña alerta visual
        alert("✅ Guardado correctamente");
    }
}

function renderizarTabla() {
    const lista = JSON.parse(localStorage.getItem('reembolsos')) || [];
    const tbody = document.getElementById('tabla-body');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:20px; color:#777;">No hay reembolsos registrados todavía.</td></tr>';
        return;
    }

    lista.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight:600;">${item.cliente}</td>
            <td style="color:#d35400; font-weight:bold;">S/ ${item.monto.toFixed(2)}</td>
            <td>${item.motivo}</td>
            <td>
                <button onclick="borrar(${item.id})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.borrar = (id) => {
    if(confirm("¿Eliminar registro?")) {
        let lista = JSON.parse(localStorage.getItem('reembolsos')) || [];
        lista = lista.filter(i => i.id !== id);
        localStorage.setItem('reembolsos', JSON.stringify(lista));
        renderizarTabla();
    }
};