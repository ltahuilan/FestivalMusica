function startApp(){mostrarGaleria(),smootScroll(),navFijo()}function navFijo(){const e=document.querySelector(".header"),t=document.querySelector(".lineup"),n=document.querySelector("body");window.addEventListener("scroll",(function(){t.getBoundingClientRect().top<0?(e.classList.add("fijo"),n.classList.add("fix-scroll-nav")):(e.classList.remove("fijo"),n.classList.remove("fix-scroll-nav"))}))}function smootScroll(){document.querySelectorAll(".navegacion-principal a").forEach((e=>{e.addEventListener("click",(function(e){e.preventDefault();document.querySelector(e.target.attributes.href.value).scrollIntoView({block:"start",behavior:"smooth"})}))}))}function mostrarGaleria(){const e=document.querySelector(".galeria-imagenes");for(let t=1;t<=12;t++){const n=document.createElement("PICTURE");n.classList.add("thumb"),n.innerHTML=`\n            <source srcset="build/img/thumb/${t}.avif" type="image/avif">\n            <source srcset="build/img/thumb/${t}.webp" type="image/webp">\n            <img loading="lazy" width="200" height="300" src="build/img/thumb/${t}.jpg" alt="imagen_vocalista" >\n        `,e.appendChild(n),n.onclick=function(){imagenGrande(t)}}}function imagenGrande(e){const t=document.createElement("DIV");t.classList.add("overlay");const n=document.createElement("PICTURE");n.innerHTML=`\n        <source srcset="build/img/grande/${e}.avif" type="image/avif">\n        <source srcset="build/img/grande/${e}.webp" type="image/webp">\n        <img loading="lazy" width="200" height="300" src="build/img/grande/${e}.jpg" alt="imagen_vocalista" >\n    `,t.appendChild(n);const i=document.querySelector("body");i.classList.add("fijo"),i.appendChild(t);const o=document.createElement("P");o.classList.add("btn-cerrar"),o.textContent="X",o.onclick=function(){t.remove(),i.classList.remove("fijo")},t.appendChild(o),t.onclick=function(){t.remove(),i.classList.remove("fijo")}}window.addEventListener("DOMContentLoaded",(function(){startApp()}));
//# sourceMappingURL=app.js.map
