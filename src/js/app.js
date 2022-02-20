window.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    mostrarGaleria();
    smootScroll();
    navFijo();
}

function navFijo() {
    const header = document.querySelector('.header');
    const lineup = document.querySelector('.lineup');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        const top = lineup.getBoundingClientRect().top;

        if(top < 0 ) {
            header.classList.add('fijo');
            body.classList.add('fix-scroll-nav');//agrega padding al body en proporcion al tamaño del nav
        }else {
            header.classList.remove('fijo');
            body.classList.remove('fix-scroll-nav');
        }
    })
}

function smootScroll() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {

        enlace.addEventListener('click', function(event) {
            event.preventDefault();
            const seccion = document.querySelector(event.target.attributes.href.value);
            seccion.scrollIntoView( {block: "start", behavior: "smooth"} );
        })
    }) 
}


function mostrarGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.classList.add('thumb');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen_vocalista" >
        `;
        galeria.appendChild(imagen);

        imagen.onclick = function () {
            imagenGrande(i);
        }

    }
}

function imagenGrande(idImagen) {

    //generando html para ventana modal
    const overlay = document.createElement('DIV');
    overlay.classList.add('overlay');
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${idImagen}.avif" type="image/avif">
        <source srcset="build/img/grande/${idImagen}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${idImagen}.jpg" alt="imagen_vocalista" >
    `;
    overlay.appendChild(imagen);
    
    //insertando en el body
    const body = document.querySelector('body');    
    body.classList.add('fijo');
    body.appendChild(overlay);

    //boton para cerrar
    const btnCerrar = document.createElement('P');
    btnCerrar.classList.add('btn-cerrar');
    btnCerrar.textContent = 'X';
    btnCerrar.onclick = function () {
        overlay.remove();        
        body.classList.remove('fijo');
    }
    overlay.appendChild(btnCerrar);

    //eliminar el elemento overlay al dar click sobre el mismo
    overlay.onclick = function() {
        overlay.remove();        
        body.classList.remove('fijo');
    } 
}

