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
        // { numero, nombres, apellido_paterno, apellido_materno }
    } catch (error) {
        console.error("Error validando DNI:", error);
        return null;
    }
}

// ===================================
// VARIABLES GLOBALES
// ===================================
let empleadoEditIndex = null;

// ===================================
// CAMBIO DE SECCIÓN
// ===================================
function cargarSeccion(seccion) {

    empleadoEditIndex = null;
    const cont = document.getElementById("contenido");

    switch (seccion) {
        case "clientes":
            listarClientes();
            break;

        case "empleados_list":
            listarEmpleados();
            break;

        case "empleado_register":
            mostrarFormularioRegistroEmpleado();
            break;

        default:
            cont.innerHTML = "<p>Sección desconocida.</p>";
    }
}

// ===================================
// LISTAR CLIENTES (TABLA COMPLETA)
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
                    <button class="btn btn-danger" onclick="eliminarCliente(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += "</table></div>";
    cont.innerHTML = html;
}

function eliminarCliente(index) {
    let clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (!confirm("¿Eliminar cliente?")) return;

    clientes.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(clientes));

    listarClientes();
}

// ===================================
// FORMULARIO REGISTRAR / EDITAR EMPLEADO
// ===================================
function mostrarFormularioRegistroEmpleado() {
    const cont = document.getElementById("contenido");

    const isEdit = empleadoEditIndex !== null;

    let empleados = JSON.parse(localStorage.getItem("empleados") || "[]");
    let empleado = isEdit ? empleados[empleadoEditIndex] : {
        nombres: "",
        apellidos: "",
        email: "",
        celular: "",
        dni: "",
        password: ""
    };

    cont.innerHTML = `
        <div class="card" style="max-width:650px; margin:auto;">
            <h2 style="margin-bottom: 20px;">
                ${isEdit ? "Editar Empleado" : "Registrar Empleado"}
            </h2>

            <div style="display: flex; flex-direction: column; gap: 15px;">

                <div>
                    <label>Nombres:</label>
                    <input id="emp_nombre" type="text" value="${empleado.nombres}">
                </div>

                <div>
                    <label>Apellidos:</label>
                    <input id="emp_apellidos" type="text" value="${empleado.apellidos}">
                </div>

                <div>
                    <label>Email:</label>
                    <input id="emp_email" type="email" value="${empleado.email}">
                </div>

                <div>
                    <label>Celular (9 dígitos):</label>
                    <input id="emp_celular" type="text" maxlength="9" value="${empleado.celular}">
                </div>

                <div>
                    <label>DNI (8 dígitos):</label>
                    <input id="emp_dni" type="text" maxlength="8" value="${empleado.dni}" onblur="buscarDNI()">
                </div>

                <div>
                    <label>Contraseña (8 dígitos):</label>
                    <input id="emp_pass" type="password" maxlength="8" value="${empleado.password}">
                </div>

                <div style="text-align:center; margin-top:10px;">
                    <button class="btn btn-success" onclick="guardarEmpleado()">
                        ${isEdit ? "Guardar Cambios" : "Registrar Empleado"}
                    </button>
                </div>

            </div>
        </div>
    `;
}

// ===================================
// AUTO-LLENAR DATOS DESDE LA API
// ===================================
async function buscarDNI() {
    const dni = document.getElementById("emp_dni").value.trim();

    if (dni.length !== 8 || isNaN(dni)) return;

    const data = await validarDNI_API(dni);

    if (!data) {
        alert("DNI no válido o no encontrado.");
        return;
    }

    document.getElementById("emp_nombre").value = data.nombres;
    document.getElementById("emp_apellidos").value =
        `${data.apellido_paterno} ${data.apellido_materno}`;
}

// ===================================
// GUARDAR EMPLEADO (REGISTRO + EDICIÓN)
// ===================================
async function guardarEmpleado() {
    let empleados = JSON.parse(localStorage.getItem("empleados") || []);

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

    if (celular.length !== 9 || isNaN(celular)) {
        alert("El celular debe tener 9 dígitos.");
        return;
    }

    if (dni.length !== 8 || isNaN(dni)) {
        alert("El DNI debe tener 8 dígitos.");
        return;
    }

    // VALIDACIÓN REAL DE DNI
    const persona = await validarDNI_API(dni);
    if (!persona) {
        alert("El DNI ingresado NO es válido.");
        return;
    }

    if (pass.length !== 8) {
        alert("La contraseña debe tener 8 dígitos.");
        return;
    }

    const nuevoEmpleado = {
        nombres,
        apellidos,
        email,
        celular,
        dni,
        password: pass
    };

    if (empleadoEditIndex === null) {
        empleados.push(nuevoEmpleado);
    } else {
        empleados[empleadoEditIndex] = nuevoEmpleado;
    }

    localStorage.setItem("empleados", JSON.stringify(empleados));

    alert("Empleado guardado correctamente.");
    cargarSeccion("empleados_list");
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
    mostrarFormularioRegistroEmpleado();
}

// ===================================
// ELIMINAR EMPLEADO
// ===================================
function eliminarEmpleado(index) {
    let empleados = JSON.parse(localStorage.getItem("empleados") || []);
    if (!confirm("¿Eliminar empleado?")) return;

    empleados.splice(index, 1);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    listarEmpleados();
}

// ===================================
// SECCIÓN INICIAL
// ===================================
cargarSeccion("clientes");
