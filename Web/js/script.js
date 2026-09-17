const abasSociedades = document.querySelectorAll(".aba-sociedade");
const conteudosSociedades = document.querySelectorAll(".conteudo-sociedade");
const fundoSociedades = document.querySelector(".sociedades-fundo");

let indiceAtual = [...abasSociedades].findIndex((aba) => {
    return aba.classList.contains("ativo");
});

let emTransicao = false;


// Define a imagem inicial

const abaInicial = abasSociedades[indiceAtual];

fundoSociedades.style.backgroundImage =
    `url("${abaInicial.dataset.imagem}")`;


// Navegação entre as sociedades

abasSociedades.forEach((aba, novoIndice) => {

    aba.addEventListener("click", () => {

        if (novoIndice === indiceAtual || emTransicao) {
            return;
        }

        emTransicao = true;

        const indoParaDireita = novoIndice > indiceAtual;

        const conteudoAtual = conteudosSociedades[indiceAtual];

        const sociedadeDestino = aba.dataset.sociedade;

        const novoConteudo = document.querySelector(
            `#${sociedadeDestino}`
        );


        // Atualiza a aba ativa

        abasSociedades.forEach((item) => {
            item.classList.remove("ativo");
        });

        aba.classList.add("ativo");


        // Anima a saída do conteúdo atual

        conteudoAtual.classList.add(
            indoParaDireita
                ? "sair-esquerda"
                : "sair-direita"
        );


        // Começa a transição da imagem

        fundoSociedades.classList.add("trocando");


        setTimeout(() => {

            fundoSociedades.style.backgroundImage =
                `url("${aba.dataset.imagem}")`;

            fundoSociedades.classList.remove("trocando");

        }, 400);


        // Troca o conteúdo

        setTimeout(() => {

            conteudoAtual.classList.remove(
                "ativo",
                "sair-esquerda",
                "sair-direita"
            );


            novoConteudo.classList.add(
                "ativo",
                indoParaDireita
                    ? "entrar-direita"
                    : "entrar-esquerda"
            );


            setTimeout(() => {

                novoConteudo.classList.remove(
                    "entrar-direita",
                    "entrar-esquerda"
                );

                indiceAtual = novoIndice;
                emTransicao = false;
                
            }, 900);

        }, 500);

    });

});