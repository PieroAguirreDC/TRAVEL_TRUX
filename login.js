<<<<<<< HEAD
// Funciones para el modal de recuperación de contraseña
function openRecoveryModal() {
    document.getElementById('recoveryModal').style.display = 'flex';
}

function closeRecoveryModal() {
    document.getElementById('recoveryModal').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('recovery-email').value = '';
}

function sendRecoveryLink() {
    const email = document.getElementById('recovery-email').value;
    
    if (!email) {
        alert('Por favor, ingresa tu correo electrónico');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }
    
    // Aquí iría la lógica para enviar el enlace de recuperación
    // Por ahora, solo mostramos el mensaje de éxito
    document.getElementById('successMessage').style.display = 'block';
    
    // Cerrar el modal después de 3 segundos
    setTimeout(function() {
        closeRecoveryModal();
    }, 3000);
}

// Función de login existente
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("login-correo").value.trim();
    const pass = document.getElementById("login-password").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find(u => u.correo === correo && u.password === pass);

    // Crear elemento para mensajes si no existe
    let msg = document.getElementById("login-msg");
    if (!msg) {
        msg = document.createElement("div");
        msg.id = "login-msg";
        msg.style.marginTop = "10px";
        msg.style.padding = "10px";
        msg.style.borderRadius = "5px";
        msg.style.textAlign = "center";
        msg.style.fontSize = "14px";
        document.getElementById("login-form").appendChild(msg);
    }

    if (!usuario) {
        msg.textContent = "❌ Credenciales incorrectas.";
        msg.style.color = "red";
        msg.style.backgroundColor = "#ffe6e6";
        return;
    }

    if (usuario.estado !== "activo") {
        msg.textContent = "⚠ Su cuenta aún no está verificada. Revise su correo.";
        msg.style.color = "orange";
        msg.style.backgroundColor = "#fff3e6";
        return;
    }

    msg.textContent = "✔ Inicio de sesión exitoso.";
    msg.style.color = "green";
    msg.style.backgroundColor = "#e6ffe6";

    // Guardar usuario en sesión
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
=======
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
    // VALIDACIÓN EMPLEADO
    // ============================
    const empleados = JSON.parse(localStorage.getItem("empleados") || "[]");

    const empleado = empleados.find(emp => 
        emp.email === correo && emp.password === pass
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
    // VALIDACIÓN CLIENTE
    // ============================
    const clientes = JSON.parse(localStorage.getItem("usuarios") || "[]");
>>>>>>> 5affc4b02dbf622b51d6255b76ed77a458ce8e0a

    const cliente = clientes.find(cli =>
        cli.correo === correo && cli.password === pass
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

// Event Listeners para el modal
document.addEventListener('DOMContentLoaded', function() {
    // Forgot password link
    const forgotPasswordLink = document.querySelector(".forgot-password");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", openRecoveryModal);
    }
    
    // Modal buttons
    const cancelButton = document.querySelector(".btn-cancel");
    const sendButton = document.querySelector(".btn-send");
    
    if (cancelButton) {
        cancelButton.addEventListener("click", closeRecoveryModal);
    }
    
    if (sendButton) {
        sendButton.addEventListener("click", sendRecoveryLink);
    }
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', function(event) {
    const modal = document.getElementById('recoveryModal');
    if (event.target === modal) {
        closeRecoveryModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeRecoveryModal();
    }
});