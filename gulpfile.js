const {src, dest, watch, parallel, series} = require('gulp');

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const cssnano = require('cssnano');
const prefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');

//javascript
const terser = require('gulp-terser');

function css(done) {
    src('src/sass/**/*.scss')//identificar archivo a compilar
        .pipe(sourcemaps.init())
        .pipe( plumber() )      
        .pipe( sass() )//compilar
        .pipe( postcss( [prefixer, cssnano] ))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') );//guardar en disco

    done();
}

//optimización de imagenes
function versionWebp(done) {
    const options = {
        quality: 50
    }
    src('src/img/**/*.{jpg, png}')
        .pipe( webp(options) )
        .pipe( dest('build/img') );

    done();
}

function imagenes(done) {
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg, png}')
        .pipe( imagemin(options) )
        .pipe( dest('build/img') );

    done();
}

function versionAvif (done) {
    const options = {
        quality: 50
    }
    src('src/img/**/*.{jpg, png}')
    .pipe( avif(options) )
    .pipe( dest('build/img') );

    done();
}

//minificar archivos js
function javascript(done) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js') );

    done();
}

function dev(done) {
    watch('src/sass/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}


exports.css = css;
exports.dev = dev;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.javascript = javascript;

exports.imgs = series(versionWebp, imagenes, versionAvif);
exports.default = parallel(css, dev, javascript);

/**NOTA:
 * Dentro de las funciones si utiliza return para retornar todo, 
 * se puede omitir el uso de done() así como de gulp-plumber
 */