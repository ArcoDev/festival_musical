document.addEventListener('DOMContenLoaded', function() {
    scrollNav();
});

function scrollNav() {
    const enlaces = document.querySelectorAll('navegacion-principal a');
}
document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i; //esto sirve para agrgar en el html un atributo personalizado
        //añadir la funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    const id = parseInt(e.target.dataset.imagenId);
    //Generar la image nueva al momento de dar click
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }


    //Boton para errar la imagen 
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