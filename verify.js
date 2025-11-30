const msg = document.getElementById("verify-msg");

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

const usuario = usuarios.find(u => u.token === token);

if (!usuario) {
    msg.textContent = "❌ Enlace inválido o usuario no encontrado.";
    msg.style.color = "red";
} else {
    usuario.estado = "activo";
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    msg.textContent = "✔ Cuenta verificada correctamente. Ya puede iniciar sesión.";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}
