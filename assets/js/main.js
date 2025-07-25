// assets/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const BREAKPOINT_MOBILE = 992; // Punto de quiebre para móvil

    // Función para cerrar todos los dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        mainNav.classList.remove('active');
    }

    // Toggle del menú móvil
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el evento se propague
            mainNav.classList.toggle('active');
            
            // Cierra los dropdowns al abrir el menú móvil
            if (mainNav.classList.contains('active')) {
                closeAllDropdowns();
            }
        });
    }

    // Toggle de los dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= BREAKPOINT_MOBILE) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                const isActive = dropdown.classList.contains('active');
                
                // Cierra todos los dropdowns primero
                closeAllDropdowns();
                
                // Abre el actual si no estaba activo
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            }
        });
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= BREAKPOINT_MOBILE) {
                closeMobileMenu();
                closeAllDropdowns();
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= BREAKPOINT_MOBILE) {
            const isClickInsideNav = mainNav.contains(e.target);
            const isClickOnToggle = e.target === mobileMenuToggle || 
                                  mobileMenuToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle) {
                closeMobileMenu();
                closeAllDropdowns();
            }
        }
    });

    // Smooth scrolling con offset para el header fijo
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Cierra el menú móvil si está abierto
                    if (window.innerWidth <= BREAKPOINT_MOBILE) {
                        closeMobileMenu();
                        closeAllDropdowns();
                    }
                }
            }
        });
    });

    // Cerrar dropdowns al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > BREAKPOINT_MOBILE) {
            closeAllDropdowns();
        }
    });
});