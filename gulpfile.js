const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function generateCSS(cb) {
    src("./scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("css"));
    cb();
}
exports.css = generateCSS

function watchFiles(){
	watch("./scss/*.scss", generateCSS)
}
exports.watch = watchFiles