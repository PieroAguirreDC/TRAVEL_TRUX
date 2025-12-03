document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS DE USUARIOS (Simulada)
    // Aquí definimos quiénes pueden entrar y qué rol tienen
    const usuariosRegistrados = [
        {
            email: "admin@traveltrux.com",
            password: "123",
            nombre: "Administrador Principal",
            rol: "admin" // Rol: Administrador
        },
        {
            email: "empleado@traveltrux.com",
            password: "123",
            nombre: "Sonia Caipo",
            rol: "empleado" // Rol: Empleado
        },
        {
            email: "cliente@gmail.com",
            password: "123",
            nombre: "Cliente Viajero",
            rol: "cliente" // Rol: Cliente
        },
        // Puedes agregar tu correo personal si quieres probar como cliente
        {
            email: "pierogaguirredc@gmail.com",
            password: "123",
            nombre: "Piero Aguirre",
            rol: "cliente"
        }
    ];

    // 2. DETECTAR EL ENVÍO DEL FORMULARIO
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        // 3. BUSCAR USUARIO
        const usuarioEncontrado = usuariosRegistrados.find(
            user => user.email === emailInput && user.password === passwordInput
        );

        if (usuarioEncontrado) {
            // A) Guardar sesión en el navegador
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));

            // B) Redireccionar según el ROL
            alert(`¡Bienvenido/a ${usuarioEncontrado.nombre}!`);

            switch (usuarioEncontrado.rol) {
                case 'admin':
                    window.location.href = 'admin.html';
                    break;
                case 'empleado':
                    window.location.href = 'empleado.html'; // Asegúrate de tener este archivo
                    break;
                case 'cliente':
                    window.location.href = 'cliente.html';
                    break;
                default:
                    window.location.href = 'index.html';
            }

        } else {
            // C) Error
            alert('❌ Correo o contraseña incorrectos.');
        }
    });
});