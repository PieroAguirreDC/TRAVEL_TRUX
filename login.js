document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const msg = document.getElementById("login-msg");

    msg.style.color = "var(--orange-dark)";

    // ============================
    // VALIDACIÓN ADMIN FIJO
    // ============================
    const adminCorreo = "pierogaguirredc@gmail.com";
    const adminPass = "1234";

    if (correo === adminCorreo && pass === adminPass) {
        const adminUser = {
            correo: adminCorreo,
            rol: "admin"
        };

        localStorage.setItem("usuarioActual", JSON.stringify(adminUser));
        window.location.href = "admin.html";
        return;
    }

    // ============================
    // VALIDAR EMPLEADO
    // ============================
    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    const empleado = empleados.find(e => 
        e.email === correo && e.password === pass
    );

    if (empleado) {

        const empleadoUser = {
            correo: empleado.email,
            rol: "empleado",
            nombre: empleado.nombres
        };

        localStorage.setItem("usuarioActual", JSON.stringify(empleadoUser));
        window.location.href = "empleado.html";
        return;
    }

    // ============================
    // VALIDAR CLIENTE
    // ============================
    const clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const cliente = clientes.find(c => 
        c.correo === correo && c.password === pass
    );

    if (cliente) {

        const clienteUser = {
            correo: cliente.correo,
            rol: "cliente",
            nombre: cliente.nombre
        };

        localStorage.setItem("usuarioActual", JSON.stringify(clienteUser));
        window.location.href = "cliente.html";
        return;
    }

    // ============================
    // SI NO EXISTE NINGUNO
    // ============================
    msg.textContent = "⚠ Correo o contraseña incorrectos.";
});
