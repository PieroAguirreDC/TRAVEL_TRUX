document.addEventListener('DOMContentLoaded', () => {
    
    // 1. RECUPERAR DATOS DEL VIAJE SELECCIONADO
    // (Usamos la misma "base de datos" para saber qué precio cobrar)
    const viajeId = localStorage.getItem("viajeSeleccionado");
    
    /* Nota: En una app real, esto vendría del servidor. Aquí lo simulamos. */
    const baseDatosViajes = [
        { id: 1, titulo: "CUSCO IMPERIAL", precio: 1450.00, imagen: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80" },
        { id: 2, titulo: "VERANO EN MÁNCORA", precio: 890.00, imagen: "https://images.unsplash.com/photo-1534234828569-1f353be91847?w=600&q=80" },
        { id: 3, titulo: "AMAZONAS SALVAJE", precio: 1200.00, imagen: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=600&q=80" },
        { id: 4, titulo: "TESOROS DE TRUJILLO", precio: 450.00, imagen: "https://www.peru.travel/Contenido/Atractivo/Imagen/en/105/1.1/Principal/Huanchaco.jpg" },
        { id: 5, titulo: "LIMA GASTRONÓMICA", precio: 380.00, imagen: "https://media.traveler.es/photos/61376a6b568343e2e5052341/master/w_1600%2Cc_limit/196620.jpg" },
        { id: 6, titulo: "TRIO DE LOS BALCANES", precio: 1602.76, imagen: "https://www.viajeselcorteingles.es/imagenes/v3/ofertas/cruceros/crucero-fluvial/rio-danubio/1.jpg" }
    ];

    const viaje = baseDatosViajes.find(v => v.id == viajeId);

    if (viaje) {
        // Llenar el resumen de la derecha
        document.getElementById('summary-title').textContent = viaje.titulo;
        document.getElementById('summary-img').src = viaje.imagen;
        document.getElementById('summary-price').textContent = `S/ ${viaje.precio.toFixed(2)}`;
        document.getElementById('summary-total').textContent = `S/ ${viaje.precio.toFixed(2)}`;
        document.getElementById('btn-amount').textContent = viaje.precio.toFixed(2);
    } else {
        alert("No se seleccionó ningún viaje. Volviendo al inicio.");
        window.location.href = "cliente.html";
    }

    // 2. FORMATEO DE TARJETA (UX)
    const inputCard = document.getElementById('card-number');
    inputCard.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    // 3. PROCESAR PAGO (SIMULACIÓN)
    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Efecto de carga
        btn.disabled = true;
        btn.innerHTML = "Procesando pago...";

        setTimeout(() => {
            // AQUÍ GUARDARÍAMOS EN EL HISTORIAL (Lo haremos en el siguiente paso si quieres)
            
            alert(`✅ ¡PAGO EXITOSO!\n\nTu viaje a ${viaje.titulo} ha sido confirmado.\nTe hemos enviado los boletos a tu correo.`);
            window.location.href = "history.html"; // Redirigir al historial después de pagar
        }, 2000);
    });
});