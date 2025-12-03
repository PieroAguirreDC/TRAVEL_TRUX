// ===============================
//   EMAILJS - INICIALIZACIÓN
// ===============================
emailjs.init("DWR3umpRngp2s9V5-"); // public key

// ===============================
//   VALIDAR DNI (API PERÚ)
// ===============================
async function validarDNI(dni) {
    try {
        const response = await fetch(`https://apiperu.dev/api/dni/${dni}`, {
            headers: { 
                "Authorization": "Bearer 5cfcd56dcb11cc3ebee5812dad1ef0a48f3da29708b0729fb3b7e3b6d586951a"
            }
        });

        const data = await response.json();

        if (data.success && data.data) {
            return {
                valido: true,
                nombres: data.data.nombres,
                apellidoPaterno: data.data.apellido_paterno,
                apellidoMaterno: data.data.apellido_materno
            };
        }

        return { valido: false };
    } catch (err) {
        console.error("Error API DNI:", err);
        return { valido: false };
    }
}

// ===============================
//   EVENTO FORMULARIO REGISTRO
// ===============================
document.getElementById("register-form").addEventListener("submit", async function (e) {
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
    msg.textContent = "Validando DNI...";

    // ===============================
    //   VALIDACIÓN DE DNI CON API
    // ===============================
    const dniInfo = await validarDNI(documento);

    if (!dniInfo.valido) {
        msg.textContent = "⚠ DNI inválido o no encontrado.";
        return;
    }

    msg.textContent = "DNI válido. Validando datos...";

    // ===============================
    //   VALIDACIÓN DE CONTRASEÑA
    // ===============================
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!regexPass.test(pass1)) {
        msg.textContent = "⚠ La contraseña debe tener 8 caracteres, mayúscula, minúscula, número y símbolo.";
        return;
    }

    if (pass1 !== pass2) {
        msg.textContent = "⚠ Las contraseñas no coinciden.";
        return;
    }

    // ===============================
    //   VALIDAR SI YA EXISTE EL CORREO
    // ===============================
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.find(u => u.correo === correo)) {
        msg.textContent = "⚠ Este correo ya está registrado.";
        return;
    }

    // ===============================
    //   CREAR TOKEN PARA VERIFICAR
    // ===============================
    const token = crypto.randomUUID();

    // ===============================
    //   CREAR USUARIO EN LOCALSTORAGE
    // ===============================
    const nuevoUsuario = {
        nombre,
        apellido,
        telefono,
        documento,
        correo,
        password: pass1,
        estado: "inactivo",
        token,
        // Datos devueltos por la API de DNI:
        dni_validado: {
            nombres: dniInfo.nombres,
            apellido_paterno: dniInfo.apellidoPaterno,
            apellido_materno: dniInfo.apellidoMaterno
        }
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // ===============================
    //   ENVIAR CORREO DE VERIFICACIÓN
    // ===============================
    const linkVerificacion = `${window.location.origin}/verify.html?token=${token}`;

    const params = {
        nombreUsuario: nombre,
        linkVerificacion,
        correo
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
