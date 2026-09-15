const inicio = document.querySelector("#inicio");
const header = document.querySelector("header");

const observar = new IntersectionObserver((entries) =>{
    const entry = entries[0];

    if (entry.isIntersecting){
        header.classList.remove("visivel");
    }else{
        header.classList.add("visivel");
    }
});

observar.observe(inicio);