document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const header = document.getElementById("header");

    // Menú Hamburguesa
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });

    var mainHeader = document.getElementById("main-header");
var prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        // Desplazamiento hacia arriba
        mainHeader.style.top = "0";
    } else {
        // Desplazamiento hacia abajo
        mainHeader.style.top = "-" + mainHeader.offsetHeight + "px";
    }
    prevScrollPos = currentScrollPos;
});

    // Inicializar AOS (Animaciones al hacer scroll)
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Inicializar Particles.js (Efecto de partículas en el fondo)
    particlesJS.load('particles-js', 'particles.json', function () {
        console.log('Particles.js config loaded');
    });

    // Efecto Ripple en Botones
    document.querySelectorAll('.ripple-effect').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            button.appendChild(ripple);

            // Eliminar el span después de la animación
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // tarjetas de la seccion de soluciones
    function toggleContent(element) {
        const title = element.querySelector("h3");
        const content = element.querySelector(".service-card-content");
    
        // Alternar la visibilidad
        if (content.classList.contains("hidden")) {
            title.classList.add("hidden");
            content.classList.remove("hidden");
        } else {
            title.classList.remove("hidden");
            content.classList.add("hidden");
        }
    }
    
    // Asignar la función al objeto global
    window.toggleContent = toggleContent;

    // Tabs de la sección de Servicios
    const buttons = document.querySelectorAll(".tab-btn");
    const tabs = document.querySelectorAll(".tab-pane");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            tabs.forEach(tab => {
                tab.classList.remove("active");
                tab.style.opacity = "0";
                setTimeout(() => {
                    tab.style.display = "none";
                }, 300);
            });

            const activeTab = document.getElementById(this.dataset.tab);
            setTimeout(() => {
                activeTab.style.display = "block";
                setTimeout(() => {
                    activeTab.style.opacity = "1";
                    activeTab.classList.add("active");
                }, 100);
            }, 300);
        });
    });


    //carrousel 

    const track = document.querySelector(".carousel-track");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");

    let currentIndex = 0;

    function updateCarousel() {
        const width = track.children[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * width}px)`;
    }

    nextButton.addEventListener("click", () => {
        if (currentIndex < track.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Reinicia al primer elemento
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = track.children.length - 1; // Va al último elemento
        }
        updateCarousel();
    });

    // Asegurarse de ajustar el carrusel al cambiar el tamaño de la ventana
    window.addEventListener("resize", updateCarousel);

    // Automático: Cambia cada 5 segundos
    setInterval(() => {
        nextButton.click(); // Simula el clic en el botón "Siguiente"
    }, 5000); // Cambia cada 5 segundos


    // Formulario de Contacto con EmailJS
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Evita el comportamiento por defecto del formulario

            const serviceID = "service_ls0otid"; // Reemplaza con tu Service ID de EmailJS
            const templateID = "template_p64p8cr"; // Reemplaza con tu Template ID de EmailJS

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert("Correo enviado con éxito");
                    contactForm.reset();
                }, (err) => {
                    alert("Error al enviar el correo: " + JSON.stringify(err));
                });
        });
    }
});
