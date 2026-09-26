// =====================================================
// VINIX - USER PERSONA
// UI/UX Design Task 2
// script.js
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // ================= MOBILE MENU =================

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }

        });


        // Close menu when navigation link is clicked

        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    // ================= ACTIVE NAVIGATION =================

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 140;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    // ================= THEME TOGGLE =================

    const themeToggle =
        document.getElementById("themeToggle");


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;


        if (document.body.classList.contains("dark")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }


    // Load saved theme

    const savedTheme =
        localStorage.getItem("vinixPersonaTheme");


    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const currentTheme =
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light";

            localStorage.setItem(
                "vinixPersonaTheme",
                currentTheme
            );

            updateThemeIcon();

        });

    }


    // ================= SMOOTH SCROLL =================

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(".header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    // ================= CARD ANIMATION =================

    const animatedElements =
        document.querySelectorAll(
            ".persona-card, .goal-card, .pain-card, .motivation-card, .insight-card"
        );


    if ("IntersectionObserver" in window) {

        animatedElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";

        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {
            observer.observe(element);
        });

    }


    // ================= FOOTER YEAR =================

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // ================= CLOSE MENU ON RESIZE =================

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 760 &&
            navbar
        ) {

            navbar.classList.remove("active");


            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        }

    });


    // ================= CONSOLE MESSAGE =================

    console.log(
        "Vinix User Persona Task 2 loaded successfully."
    );

});