//----------------------------------------------
// API PERÚ – TOKEN
//----------------------------------------------
const API_TOKEN = "5cfcd56dcb11cc3ebee5812dad1ef0a48f3da29708b0729fb3b7e3b6d586951a";

//----------------------------------------------
// Ocultar todas las secciones
//----------------------------------------------
function ocultarTodo() {
    document.querySelectorAll(".seccion").forEach(sec => {
        sec.style.display = "none";
    });
}

//----------------------------------------------
// Mostrar sección específica
//----------------------------------------------
function mostrar(id) {
    ocultarTodo();
    document.getElementById(id).style.display = "block";
}

//----------------------------------------------
// EVENTOS DEL MENÚ
//----------------------------------------------
document.querySelectorAll(".btn-menu").forEach(btn => {
    btn.addEventListener("click", () => {
        mostrar(btn.dataset.target);
        if (btn.dataset.target === "seccion-empleados") listarEmpleados();
        if (btn.dataset.target === "seccion-clientes") listarClientes();
    });
});

//----------------------------------------------
// Cerrar sesión
//----------------------------------------------
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}

//----------------------------------------------
// Validar DNI con API PERÚ
//----------------------------------------------
async function validarDNI(dni) {
    try {
        const response = await fetch(`https://apiperu.dev/api/dni/${dni}`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` }
        });

        const data = await response.json();
        if (!data.success) return null;

        return data.data;
    } catch (err) {
        console.error("Error API:", err);
        return null;
    }
}

//----------------------------------------------
// Autocompletar DNI en formulario Empleado
//----------------------------------------------
const dniInput = document.getElementById("reg-dni");
const dniError = document.getElementById("dni-error");

dniInput.addEventListener("input", async () => {
    let dni = dniInput.value.replace(/\D/g, "");
    if (dni.length > 8) dni = dni.slice(0, 8);

    dniInput.value = dni;

    if (dni.length < 8) {
        dniError.textContent = "El DNI debe tener 8 dígitos";
        dniError.style.color = "red";
        return;
    }

    dniError.textContent = "Validando...";
    dniError.style.color = "orange";

    const info = await validarDNI(dni);

    if (!info) {
        dniError.textContent = "DNI no válido";
        dniError.style.color = "red";
        return;
    }

    // Autocompletar
    document.getElementById("reg-nombre").value = info.nombres;
    document.getElementById("reg-apellido").value =
        info.apellido_paterno + " " + info.apellido_materno;

    dniError.textContent = "✓ DNI válido";
    dniError.style.color = "green";
});

//----------------------------------------------
// Registrar empleado en localStorage
//----------------------------------------------
document.getElementById("form-registro-empleado").addEventListener("submit", (e) => {
    e.preventDefault();

    const dni = document.getElementById("reg-dni").value;
    const nombre = document.getElementById("reg-nombre").value;
    const apellido = document.getElementById("reg-apellido").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    if (dni.length !== 8) {
        alert("El DNI debe tener exactamente 8 dígitos.");
        return;
    }

    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    // Validar correo duplicado
    if (empleados.find(emp => emp.email === email)) {
        alert("Este correo ya está registrado.");
        return;
    }

    const nuevoEmpleado = {
        id: Date.now(),
        dni,
        nombre,
        apellido,
        email,
        password
    };

    empleados.push(nuevoEmpleado);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    alert("Empleado registrado correctamente.");

    listarEmpleados();
    mostrar("seccion-empleados");
});

//----------------------------------------------
// Listar empleados desde localStorage
//----------------------------------------------
function listarEmpleados() {
    const tabla = document.getElementById("tabla-empleados-body");
    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    tabla.innerHTML = "";

    empleados.forEach(emp => {
        tabla.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.nombre}</td>
                <td>${emp.apellido}</td>
                <td>${emp.email}</td>
                <td>
                    <button onclick="editarEmpleado(${emp.id})" class="btn-small edit">Editar</button>
                    <button onclick="eliminarEmpleado(${emp.id})" class="btn-small delete">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//----------------------------------------------
// Eliminar empleado
//----------------------------------------------
function eliminarEmpleado(id) {
    let empleados = JSON.parse(localStorage.getItem("empleados") || "[]");
    empleados = empleados.filter(e => e.id !== id);
    localStorage.setItem("empleados", JSON.stringify(empleados));
    listarEmpleados();
}

//----------------------------------------------
// Editar empleado (solo email y password)
//----------------------------------------------
function editarEmpleado(id) {
    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");
    const emp = empleados.find(e => e.id === id);

    const nuevoEmail = prompt("Nuevo correo:", emp.email);
    if (!nuevoEmail) return;

    const nuevaPass = prompt("Nueva contraseña:", emp.password);
    if (!nuevaPass) return;

    emp.email = nuevoEmail;
    emp.password = nuevaPass;

    localStorage.setItem("empleados", JSON.stringify(empleados));
    listarEmpleados();
}

//----------------------------------------------
// Listar clientes (si usas LocalStorage también)
//----------------------------------------------
function listarClientes() {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const tabla = document.getElementById("tabla-clientes-body");

    tabla.innerHTML = "";

    clientes.forEach(cli => {
        tabla.innerHTML += `
            <tr>
                <td>${cli.id}</td>
                <td>${cli.nombre}</td>
                <td>${cli.apellido}</td>
                <td>${cli.correo}</td>
                <td>${cli.telefono}</td>
                <td>
                    <button class="btn-small edit">Editar</button>
                    <button class="btn-small delete">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//----------------------------------------------
// Cargar sección por defecto
//----------------------------------------------
mostrar("seccion-clientes");
