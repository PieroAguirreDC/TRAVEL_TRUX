/* ==============================
   VARIABLES GLOBALES
============================== */

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;

let paquetes = [
    {
        id: 1,
        nombre: "Cusco - Machu Picchu",
        precio: 899,
        cupos: 20,
        imagen: "https://i.ibb.co/FqtLpc8/cusco.jpg"
    },
    {
        id: 2,
        nombre: "Arequipa - Colca",
        precio: 650,
        cupos: 15,
        imagen: "https://i.ibb.co/qpRpVJ0/arequipa.jpg"
    },
    {
        id: 3,
        nombre: "Iquitos - Río Amazonas",
        precio: 1200,
        cupos: 10,
        imagen: "https://i.ibb.co/44hz13X/amazonas.jpg"
    }
];


/* ==============================
   CAMBIO DE VISTAS
============================== */

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let vista = btn.getAttribute("data-view");
        cambiarVista(vista);
    });
});

function cambiarVista(vista) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById(`${vista}-view`).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-view="${vista}"]`).classList.add("active");

    // Si entro a paquetes, los muestro
    if (vista === "paquetes") {
        mostrarPaquetes();
    }
}

// Mantener vista si hay sesión
if (usuarioActual) {
    cambiarVista("bienvenida");
}



/* ==============================
   REGISTRO
============================== */

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let nombre = document.getElementById("reg-nombre").value;
        let correo = document.getElementById("reg-correo").value;
        let password = document.getElementById("reg-password").value;

        let existe = usuarios.find(u => u.correo === correo);

        if (existe) {
            alert("El correo ya está registrado");
            return;
        }

        let nuevoUsuario = { nombre, correo, password };
        usuarios.push(nuevoUsuario);

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registro completado. Ahora inicia sesión.");
        cambiarVista("login");
    });
}



/* ==============================
   LOGIN
============================== */

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let correo = document.getElementById("login-correo").value;
        let password = document.getElementById("login-password").value;

        let usuario = usuarios.find(u => u.correo === correo && u.password === password);

        if (!usuario) {
            alert("Credenciales incorrectas");
            return;
        }

        usuarioActual = usuario;
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        alert("Bienvenido " + usuario.nombre);
        cambiarVista("bienvenida");
    });
}



/* ==============================
   LOGOUT
============================== */

function cerrarSesion() {
    localStorage.removeItem("usuarioActual");
    usuarioActual = null;
    alert("Sesión cerrada");
    cambiarVista("login");
}



/* ==============================
   MOSTRAR PAQUETES
============================== */

function mostrarPaquetes() {
    let contenedor = document.getElementById("paquetes-lista");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    paquetes.forEach(p => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${p.imagen}" class="img-center" style="max-height:200px;">
            <h2>${p.nombre}</h2>
            <p><strong>Precio:</strong> $${p.precio}</p>
            <p><strong>Cupos disponibles:</strong> ${p.cupos}</p>
            <button class="btn btn-primary" onclick="comprarPaquete(${p.id})">Comprar</button>
        `;

        contenedor.appendChild(card);
    });
}



/* ==============================
   COMPRA DE PAQUETE
============================== */

function comprarPaquete(idPaquete) {

    if (!usuarioActual) {
        alert("Debes iniciar sesión para comprar un paquete.");
        cambiarVista("login");
        return;
    }

    let paquete = paquetes.find(p => p.id === idPaquete);

    if (paquete.cupos <= 0) {
        alert("No hay cupos disponibles.");
        return;
    }

    paquete.cupos--;

    alert(`Compra realizada con éxito.
Paquete: ${paquete.nombre}`);

    mostrarPaquetes(); // refrescar cupos
}
