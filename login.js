/* ===========================================
   LOGIN.JS - Lógica exclusiva del inicio de sesión
=========================================== */

// Obtener usuarios guardados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Manejar formulario
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let correo = document.getElementById("login-correo").value.trim().toLowerCase();
        let password = document.getElementById("login-password").value;

        let usuario = usuarios.find(u => u.correo === correo && u.password === password);

        if (!usuario) {
            alert("Correo o contraseña incorrectos.");
            return;
        }

        // Guardar usuario logueado
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        alert("Bienvenido " + usuario.nombre);

        // Redirigir al home correcto (fuera de /pages)
        window.location.href = "../index.html";
    });
}
