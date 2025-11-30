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

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
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