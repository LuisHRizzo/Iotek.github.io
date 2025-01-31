document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const header = document.getElementById("header");

    // Menú Hamburguesa
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });

    // Cambio de color en el header al hacer scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("bg-blue-600", "py-2");
            header.classList.remove("py-4");
        } else {
            header.classList.remove("bg-blue-600", "py-2");
            header.classList.add("py-4");
        }
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

    const panels = document.querySelectorAll('.panel');

    panels.forEach(item=>{
        item.addEventListener('click',()=>{
            item.classList.toggle('open');
        })
        item.addEventListener('transitionend',(e)=>{
            if(e.propertyName.includes('flex')){  //use this instead of `e.propertyName==='flex'` to avoid bug in different browser
                item.classList.toggle('active');  //some broswer use flex and some flex-grow
            }
        })
    })

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
