/*************************************************
    HEADER
*************************************************/

const inicio = document.querySelector("#inicio");
const header = document.querySelector("header");
const botaoMenu = document.querySelector(".menu-mobile");
const navbar = document.querySelector("#navbar");
const linksMenu = document.querySelectorAll("#navbar a");
const secoes = document.querySelectorAll("main section")

const observar = new IntersectionObserver((entries) => {
    const entry = entries[0];

    if (entry.intersectionRatio > 0.15) {
        header.classList.remove("visivel");

        navbar.classList.remove("aberto");
        botaoMenu.textContent = "☰";
    } else {
        header.classList.add("visivel");
    }
}, {
    threshold: [0, 0.15]
});

observar.observe(inicio);


/*************************************************
    MENU MOBILE
*************************************************/

botaoMenu.addEventListener("click", () => {
    const menuAberto = navbar.classList.toggle("aberto");

    if (menuAberto) {
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.textContent = "☰";
    }
});


linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("aberto");
        botaoMenu.textContent = "☰";
    });
});


/*************************************************
    NAVEGACAO ATIVA
*************************************************/

const obeservarSecoes = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            const idSecao = entry.target.id;

            linksMenu.forEach((link) => {
                link.classList.remove("ativo");
            });

            const linkAtivo = document.querySelector(
                `#navbar a[href="#${idSecao}"]`
            );
            if (linkAtivo){
                linkAtivo.classList.add("ativo");
            }
        }
    });

}, {
    rootMargin: "-40% 0px -50% 0px"
});

secoes.forEach((secao) => {
    obeservarSecoes.observe(secao);
});


/*************************************************
    SOCIEDADES
*************************************************/

const abasSociedades = document.querySelectorAll(".aba-sociedade");
const conteudosSociedades = document.querySelectorAll(".conteudo-sociedade");
const fundoSociedades = document.querySelector(".sociedades-fundo");

if (
    abasSociedades.length > 0 &&
    conteudosSociedades.length > 0 &&
    fundoSociedades
) {

    let indiceAtual = [...abasSociedades].findIndex((aba) => {
        return aba.classList.contains("ativo");
    });

    if (indiceAtual === -1) {
        indiceAtual = 0;

        abasSociedades[0].classList.add("ativo");
        conteudosSociedades[0].classList.add("ativo");
    }

    let emTransicao = false;


    /*********** IMAGEM INICIAL ***********/

    const abaInicial = abasSociedades[indiceAtual];

    if (abaInicial.dataset.imagem) {
        fundoSociedades.style.backgroundImage =
            `url("${abaInicial.dataset.imagem}")`;
    }


    /*********** NAVEGAÇÃO DAS SOCIEDADES ***********/

    abasSociedades.forEach((aba, novoIndice) => {

        aba.addEventListener("click", () => {

            if (novoIndice === indiceAtual || emTransicao) {
                return;
            }

            const sociedadeDestino = aba.dataset.sociedade;

            const novoConteudo = document.querySelector(
                `#${sociedadeDestino}`
            );

            if (!novoConteudo) {
                return;
            }

            emTransicao = true;

            const mobile =
                window.matchMedia("(max-width: 768px)").matches;

            const indoParaFrente =
                novoIndice > indiceAtual;

            const conteudoAtual =
                conteudosSociedades[indiceAtual];


            /*********** BOTÃO ATIVO ***********/

            abasSociedades.forEach((item) => {
                item.classList.remove("ativo");
            });

            aba.classList.add("ativo");


            /*********** ANIMAÇÃO DE SAÍDA ***********/

            let animacaoSaida;

            if (mobile) {

                animacaoSaida = indoParaFrente
                    ? "sair-cima"
                    : "sair-baixo";

            } else {

                animacaoSaida = indoParaFrente
                    ? "sair-esquerda"
                    : "sair-direita";
            }

            conteudoAtual.classList.add(animacaoSaida);


            /*********** TROCA DO BACKGROUND ***********/

            if (aba.dataset.imagem) {

                fundoSociedades.classList.add("trocando");

                setTimeout(() => {

                    fundoSociedades.style.backgroundImage =
                        `url("${aba.dataset.imagem}")`;

                    fundoSociedades.classList.remove("trocando");

                }, 400);
            }


            /*********** TROCA DO CONTEÚDO ***********/

            setTimeout(() => {

                conteudoAtual.classList.remove(
                    "ativo",
                    "sair-esquerda",
                    "sair-direita",
                    "sair-cima",
                    "sair-baixo"
                );


                let animacaoEntrada;

                if (mobile) {

                    animacaoEntrada = indoParaFrente
                        ? "entrar-baixo"
                        : "entrar-cima";

                } else {

                    animacaoEntrada = indoParaFrente
                        ? "entrar-direita"
                        : "entrar-esquerda";
                }


                novoConteudo.classList.add(
                    "ativo",
                    animacaoEntrada
                );


                setTimeout(() => {

                    novoConteudo.classList.remove(
                        "entrar-direita",
                        "entrar-esquerda",
                        "entrar-baixo",
                        "entrar-cima"
                    );

                    indiceAtual = novoIndice;
                    emTransicao = false;

                }, 900);

            }, 500);

        });

    });

}