const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => {
            item.style.color = "#222";
        });

        link.style.color = "#0077ff";

    });

});