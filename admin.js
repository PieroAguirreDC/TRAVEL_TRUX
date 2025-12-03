// ===================================
// VALIDAR ADMIN
// ===================================
const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

if (!usuarioActual || usuarioActual.rol !== "admin") {
    alert("Acceso denegado. Solo administradores.");
    window.location.href = "login.html";
}

// ===================================
// LOGOUT
// ===================================
function logout() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "login.html";
}

// ===================================
// TOKEN PARA VALIDAR DNI (API PERÚ)
// ===================================
const API_TOKEN = "5cfcd56dcb11cc3ebee5812dad1ef0a48f3da29708b0729fb3b7e3b6d586951a";

async function validarDNI_API(dni) {
    try {
        const response = await fetch(`https://apiperu.dev/api/dni/${dni}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });

        const data = await response.json();
        if (!data.success || !data.data) return null;

        return data.data;
    } catch (error) {
        console.error("Error validando DNI:", error);
        return null;
    }
}

// ===================================
// VARIABLES GLOBALES
// ===================================
let empleadoEditIndex = null;
let clienteEditIndex = null;

// ===================================
// CAMBIO DE SECCIÓN
// ===================================
function cargarSeccion(seccion) {
    empleadoEditIndex = null;
    clienteEditIndex = null;

    switch (seccion) {
        case "clientes":
            listarClientes();
            break;

        case "empleados_list":
            listarEmpleados();
            break;

        case "empleado_register":
            mostrarFormularioEmpleado();
            break;

        default:
            document.getElementById("contenido").innerHTML = "<p>Sección desconocida.</p>";
    }
}

// ===================================
// LISTAR CLIENTES
// ===================================
function listarClientes() {
    const clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const cont = document.getElementById("contenido");

    let html = `
        <div class="card">
            <h2>Clientes Registrados</h2>
            <table cellpadding="10">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>DNI</th>
                    <th>Correo</th>
                    <th>Contraseña</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
    `;

    clientes.forEach((c, index) => {
        html += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.apellido}</td>
                <td>${c.telefono}</td>
                <td>${c.documento}</td>
                <td>${c.correo}</td>
                <td style="color:red; font-weight:bold;">${c.password}</td>
                <td>${c.estado}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarCliente(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarCliente(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += "</table></div>";
    cont.innerHTML = html;
}

// ===================================
// ELIMINAR CLIENTE
// ===================================
function eliminarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (!confirm("¿Eliminar cliente?")) return;

    clientes.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(clientes));

    listarClientes();
}

// ===================================
// EDITAR CLIENTE
// ===================================
function editarCliente(index) {
    clienteEditIndex = index;
    mostrarFormularioCliente();
}

// ===================================
// FORMULARIO CLIENTE
// ===================================
function mostrarFormularioCliente() {
    const cont = document.getElementById("contenido");
    let clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const cliente = clientes[clienteEditIndex];

    cont.innerHTML = `
        <div class="card" style="max-width:650px; margin:auto;">
            <h2>Editar Cliente</h2>

            <div style="display:flex; flex-direction:column; gap:15px;">

                <div>
                    <label>Nombre:</label>
                    <input id="cli_nombre" type="text" value="${cliente.nombre}">
                </div>

                <div>
                    <label>Apellido:</label>
                    <input id="cli_apellido" type="text" value="${cliente.apellido}">
                </div>

                <div>
                    <label>Teléfono:</label>
                    <input id="cli_telefono" type="text" maxlength="9" value="${cliente.telefono}">
                </div>

                <div>
                    <label>DNI:</label>
                    <input id="cli_dni" type="text" maxlength="8" value="${cliente.documento}">
                </div>

                <div>
                    <label>Correo:</label>
                    <input id="cli_correo" type="email" value="${cliente.correo}">
                </div>

                <div style="text-align:center;">
                    <button class="btn btn-success" onclick="guardarCliente()">Guardar Cambios</button>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// GUARDAR CLIENTE EDITADO
// ===================================
async function guardarCliente() {
    let clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const nombre = document.getElementById("cli_nombre").value.trim();
    const apellido = document.getElementById("cli_apellido").value.trim();
    const telefono = document.getElementById("cli_telefono").value.trim();
    const dni = document.getElementById("cli_dni").value.trim();
    const correo = document.getElementById("cli_correo").value.trim();

    if (!nombre || !apellido || !telefono || !dni || !correo) {
        alert("Complete todos los campos.");
        return;
    }

    const dniInfo = await validarDNI_API(dni);
    if (!dniInfo) {
        alert("El DNI ingresado no es válido.");
        return;
    }

    clientes[clienteEditIndex] = {
        ...clientes[clienteEditIndex],
        nombre,
        apellido,
        telefono,
        documento: dni,
        correo
    };

    localStorage.setItem("usuarios", JSON.stringify(clientes));

    alert("Cliente actualizado.");
    listarClientes();
}

// ===================================
// FORMULARIO EMPLEADO (REGISTRAR / EDITAR)
// ===================================
function mostrarFormularioEmpleado() {
    const cont = document.getElementById("contenido");

    const isEdit = empleadoEditIndex !== null;

    let empleados = JSON.parse(localStorage.getItem("empleados") || "[]");
    let empleado = isEdit
        ? empleados[empleadoEditIndex]
        : { nombres: "", apellidos: "", email: "", celular: "", dni: "", password: "" };

    cont.innerHTML = `
        <div class="card" style="max-width:650px; margin:auto;">
            <h2>${isEdit ? "Editar Empleado" : "Registrar Empleado"}</h2>

            <div style="display:flex; flex-direction:column; gap:15px;">

                <label>Nombres:</label>
                <input id="emp_nombre" type="text" value="${empleado.nombres}">

                <label>Apellidos:</label>
                <input id="emp_apellidos" type="text" value="${empleado.apellidos}">

                <label>Email:</label>
                <input id="emp_email" type="email" value="${empleado.email}">

                <label>Celular (9 dígitos):</label>
                <input id="emp_celular" type="text" maxlength="9" value="${empleado.celular}">

                <label>DNI (8 dígitos):</label>
                <input id="emp_dni" type="text" maxlength="8" value="${empleado.dni}" onblur="buscarDNI_Empleado()">

                <label>Contraseña:</label>
                <input id="emp_pass" type="text" value="${empleado.password}">

                <button class="btn btn-success" onclick="guardarEmpleado()">
                    ${isEdit ? "Guardar Cambios" : "Registrar Empleado"}
                </button>
            </div>
        </div>
    `;
}

// ===================================
// AUTO-LLENADO DNI PARA EMPLEADOS
// ===================================
async function buscarDNI_Empleado() {
    const dni = document.getElementById("emp_dni").value.trim();
    if (dni.length !== 8 || isNaN(dni)) return;

    const data = await validarDNI_API(dni);

    if (!data) {
        alert("DNI no válido.");
        return;
    }

    document.getElementById("emp_nombre").value = data.nombres;
    document.getElementById("emp_apellidos").value = `${data.apellido_paterno} ${data.apellido_materno}`;
}

// ===================================
// GUARDAR EMPLEADO
// ===================================
async function guardarEmpleado() {
    let empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    const nombres = document.getElementById("emp_nombre").value.trim();
    const apellidos = document.getElementById("emp_apellidos").value.trim();
    const email = document.getElementById("emp_email").value.trim();
    const celular = document.getElementById("emp_celular").value.trim();
    const dni = document.getElementById("emp_dni").value.trim();
    const pass = document.getElementById("emp_pass").value.trim();

    if (!nombres || !apellidos || !email || !celular || !dni || !pass) {
        alert("Complete todos los campos.");
        return;
    }

    if (celular.length !== 9) {
        alert("El celular debe tener 9 dígitos.");
        return;
    }

    if (dni.length !== 8) {
        alert("El DNI debe tener 8 dígitos.");
        return;
    }

    const dniInfo = await validarDNI_API(dni);
    if (!dniInfo) {
        alert("El DNI ingresado no existe.");
        return;
    }

    const nuevo = { nombres, apellidos, email, celular, dni, password: pass };

    if (empleadoEditIndex === null) {
        empleados.push(nuevo);
    } else {
        empleados[empleadoEditIndex] = nuevo;
    }

    localStorage.setItem("empleados", JSON.stringify(empleados));

    alert("Empleado guardado.");
    listarEmpleados();
}

// ===================================
// LISTAR EMPLEADOS
// ===================================
function listarEmpleados() {
    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");
    const cont = document.getElementById("contenido");

    let html = `
        <div class="card">
            <h2>Empleados Registrados</h2>
            <table cellpadding="10">
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Celular</th>
                    <th>DNI</th>
                    <th>Contraseña</th>
                    <th>Acciones</th>
                </tr>
    `;

    empleados.forEach((e, index) => {
        html += `
            <tr>
                <td>${e.nombres}</td>
                <td>${e.apellidos}</td>
                <td>${e.email}</td>
                <td>${e.celular}</td>
                <td>${e.dni}</td>
                <td style="color:red; font-weight:bold;">${e.password}</td>
                <td>
                    <button class="btn btn-warning" onclick="editarEmpleado(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarEmpleado(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += "</table></div>";
    cont.innerHTML = html;
}

// ===================================
// EDITAR EMPLEADO
// ===================================
function editarEmpleado(index) {
    empleadoEditIndex = index;
    mostrarFormularioEmpleado();
}

// ===================================
// ELIMINAR EMPLEADO
// ===================================
function eliminarEmpleado(index) {
    let empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    if (!confirm("¿Eliminar empleado?")) return;

    empleados.splice(index, 1);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    listarEmpleados();
}

// ===================================
// SECCIÓN INICIAL
// ===================================
cargarSeccion("clientes");
