/* ==============================
   VARIABLES
============================== */

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual")) || null;

let paquetes = [
    { id: 1, nombre: "Cusco - Machu Picchu", precio: 899, cupos: 20, imagen: "https://i.ibb.co/FqtLpc8/cusco.jpg" },
    { id: 2, nombre: "Arequipa - Colca", precio: 650, cupos: 15, imagen: "https://i.ibb.co/qpRpVJ0/arequipa.jpg" },
    { id: 3, nombre: "Iquitos - Río Amazonas", precio: 1200, cupos: 10, imagen: "https://i.ibb.co/44hz13X/amazonas.jpg" }
];

/* ==============================
   CAMBIO DE VISTAS
============================== */

document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let vista = btn.getAttribute("data-view");
        if (vista) cambiarVista(vista);
    });
});

function cambiarVista(vista) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById(`${vista}-view`).classList.add("active");

    if (vista === "paquetes") mostrarPaquetes();
}

/* Mantener vista si hay sesión */
if (usuarioActual) {
    cambiarVista("bienvenida");
}

/* ==============================
   PAQUETES
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

function comprarPaquete(idPaquete) {
    if (!usuarioActual) {
        alert("Debes iniciar sesión para comprar un paquete.");
        window.location.href = "login.html";
        return;
    }

    let paquete = paquetes.find(p => p.id === idPaquete);

    if (paquete.cupos <= 0) {
        alert("No hay cupos disponibles.");
        return;
    }

    paquete.cupos--;
    alert(`Compra realizada con éxito.\nPaquete: ${paquete.nombre}`);
    mostrarPaquetes();
}
