let contenedor= document.getElementById('contenedor')
console.log(contenedor)

function estructuraCard(image, title, tagline, overview) {
    return `
    <div class="contenedor w-80 h-96 shadow-2xl border-solid border-2 border-white rounded-2xl text-center bg-violet-200 text-black">
    <img class="h-40 w-80 object-cover rounded-t-2xl" src="${image}" alt="imagen-fruta">
    <h4 class="font-bold">${title}</h4>
    <p class="p-3 text-xs">${tagline}</p>
    <p class="pb-3 text-xs">${overview}</p>
    </div>`
}
console.log (estructuraCard)

function imprimirCard(listaMovies) {
   let cards = ""
   for (const movie of listaMovies) {
    cards += estructuraCard(movie.image, movie.title, movie.tagline, movie.overview)
   }
   return cards
}
console.log(imprimirCard(movies))

contenedor.innerHTML=imprimirCard(movies)