//Gulp utiliza sintaxis de node js
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS 
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
}

//funcion para compilar sass
function css() {
    return src(paths.scss)
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano()]))
        .pipe(dest('./build/css'))
}

function minificarCSS() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'))
}

function javascript() {
    return src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(dest('./build/js'))

}

function minificarIMG() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagen minificada' }));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Version webp lista' }));
}

function watchArchivos() {
    watch(paths.scss, css); //Un * es la carpeta actual y ** son todos los archivos con extencion de sass
    watch(paths.js, javascript);
}
exports.css = css;
exports.minificarCSS = minificarCSS;
exports.minificarIMG = minificarIMG;
exports.watchArchivos = watchArchivos;
exports.default = series(css, javascript, minificarIMG, versionWebp, watchArchivos); //poner defaukt a un export y uttilizar series nos sirve para compilar varias tareas juntas