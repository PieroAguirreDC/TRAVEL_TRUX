document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find(u => u.correo === correo && u.password === pass);

    const msg = document.getElementById("login-msg");

    if (!usuario) {
        msg.textContent = "❌ Credenciales incorrectas.";
        msg.style.color = "red";
        return;
    }

    if (usuario.estado !== "activo") {
        msg.textContent = "⚠ Su cuenta aún no está verificada. Revise su correo.";
        msg.style.color = "orange";
        return;
    }

    msg.textContent = "✔ Inicio de sesión exitoso.";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});
