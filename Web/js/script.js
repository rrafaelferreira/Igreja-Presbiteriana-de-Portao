const inicio = document.querySelector("#inicio");
const header = document.querySelector("header");
const botaoMenu = document.querySelector(".menu-mobile");
const navbar = document.querySelector("#navbar");
const linksMenu = document.querySelectorAll("#navbar a");

const observar = new IntersectionObserver((entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
        header.classList.remove("visivel");

        // Garante que o menu mobile esteja fechado ao voltar para o início
        navbar.classList.remove("aberto");
        botaoMenu.textContent = "☰";
    } else {
        header.classList.add("visivel");
    }
});

observar.observe(inicio);


// Menu hambúrguer no mobile

botaoMenu.addEventListener("click", () => {
    const menuAberto = navbar.classList.toggle("aberto");

    if (menuAberto) {
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.textContent = "☰";
    }
});


// Garante que após clicar em um dos links o menu seja fechado

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("aberto");
        botaoMenu.textContent = "☰";
    });
});