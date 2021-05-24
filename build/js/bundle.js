document.addEventListener('DOMContentLoaded', function() {
    scrollNav();
    navFija();
});

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}
function navFija() {
    const barra = document.querySelector('.header');
    //Registrar el Intersection Observer API
    const observer = new IntersectionObserver(function (entries) {
        if(entries[0].isIntersecting) {
            barra.classList.remove('fijo');
        } else {
           barra.classList.add('fijo');
        }
    });
    
    //Elemnto observar
    observer.observe(document.querySelector('.sobre-festival'));
}
document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i; //esto sirve para agregar en el html un atributo personalizado
        //añadir la funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId);
    //Generar la imagen nueva al momento de dar click
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }


    //Boton para cerrar la imagen 
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //Cerrar la imagen grande del overlay al darle click a la X
    cerrarImagen.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');

    }
    overlay.appendChild(cerrarImagen);

    //mostrar en el html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}