// -------------------------------------------------------------
// LOGIN.JS - TravelTrux
// Manejo de inicio de sesión para Admin, Empleados y Clientes
// -------------------------------------------------------------

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // ---------------------------------------------------------
    // 1. Validar ADMIN
    // ---------------------------------------------------------
    if (email === "admin@traveltrux.com" && password === "admin") {
        localStorage.setItem("usuario", JSON.stringify({
            rol: "admin",
            email: email
        }));
        window.location.href = "admin.html";
        return;
    }

    // ---------------------------------------------------------
    // 2. Validar EMPLEADO desde localStorage
    // ---------------------------------------------------------
    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    const empleado = empleados.find(emp =>
        emp.email === email && emp.password === password
    );

    if (empleado) {
        localStorage.setItem("usuario", JSON.stringify({
            rol: "empleado",
            id: empleado.id,
            email: empleado.email,
            nombre: empleado.nombre
        }));

        window.location.href = "empleado.html";
        return;
    }

    // ---------------------------------------------------------
    // 3. Validar CLIENTE desde localStorage
    // ---------------------------------------------------------
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

    const cliente = clientes.find(cli =>
        cli.correo === email && cli.password === password
    );

    if (cliente) {
        localStorage.setItem("usuario", JSON.stringify({
            rol: "cliente",
            id: cliente.id,
            email: cliente.correo,
            nombre: cliente.nombre
        }));

        window.location.href = "cliente.html";
        return;
    }

    // ---------------------------------------------------------
    // 4. Si no existe ningún usuario
    // ---------------------------------------------------------
    alert("Correo o contraseña incorrectos.");
});


// -------------------------------------------------------------
// BOTÓN “OLVIDÉ MI CONTRASEÑA”
// -------------------------------------------------------------

// Crear dinámicamente el botón debajo del formulario
const form = document.getElementById("loginForm");

const btnOlvide = document.createElement("p");
btnOlvide.innerHTML = `
    <a href="recuperar.html" style="display:block; margin-top:10px; text-align:center; color:#0056b3; font-weight:600; cursor:pointer;">
        Olvidé mi contraseña
    </a>
`;

form.insertAdjacentElement("afterend", btnOlvide);
