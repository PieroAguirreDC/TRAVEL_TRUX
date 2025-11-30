// Inicializar EmailJS
emailjs.init("DWR3umpRngp2s9V5-"); // public key

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const documento = document.getElementById("documento").value.trim();
    const correo = document.getElementById("email").value.trim();
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("password2").value;
    const msg = document.getElementById("register-msg");

    msg.style.color = "var(--orange-dark)";

    // Validación de contraseña segura
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regexPass.test(pass1)) {
        msg.textContent = "⚠ La contraseña debe tener 8 caracteres, mayúscula, minúscula, número y símbolo.";
        return;
    }

    if (pass1 !== pass2) {
        msg.textContent = "⚠ Las contraseñas no coinciden.";
        return;
    }

    // Verificar si el usuario ya existe
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.find(u => u.correo === correo)) {
        msg.textContent = "⚠ Este correo ya está registrado.";
        return;
    }

    // Token único para verificación
    const token = crypto.randomUUID();

    // Crear usuario en LocalStorage
    const nuevoUsuario = {
        nombre,
        apellido,
        telefono,
        documento,
        correo,
        password: pass1,
        estado: "inactivo",
        token
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Link de verificación
    const linkVerificacion = `${window.location.origin}/verify.html?token=${token}`;

    // Enviar correo
    const params = {
        nombreUsuario: nombre,
        linkVerificacion: linkVerificacion,
        correo: correo
    };

    emailjs.send("service_et9akmg", "template_c02kkcs", params)
        .then(() => {
            msg.style.color = "green";
            msg.textContent = "✔ Registro exitoso. Verifique su correo para activar la cuenta.";
        })
        .catch((err) => {
            console.error(err);
            msg.textContent = "⚠ Error al enviar el correo. Intente nuevamente.";
        });
});
