let contenedor = document.getElementById('contenedor');
let generoSelect = document.getElementById('generoSelect');
let busquedaInput = document.getElementById('busquedaInput');
let detallesPelicula = document.getElementById('detallesPelicula');

// Obtengo la lista de géneros de las películas
let generos = obtenerGeneros(movies);

// Lleno el select con los géneros
llenarSelect(generos);

//Creo la estructura básica de una card HTML
function estructuraCard(image, title, tagline, overview) {
    return `<div class="contenedor w-96 h-96 shadow-2xl border-solid border-2 border-white rounded-2xl text-center bg-violet-200 text-black">
        <img class="h-40 w-96 object-cover rounded-t-2xl" src="${image}" alt="imagen-película">
        <h4 class="font-bold">${title}</h4>
        <p class="p-2 text-xs">${tagline}</p>
        <p class="pb-3 text-xs">${overview}</p>
        <a class="w-14 text-white border-solid border-2 border-white mr-1 p-1 rounded-lg p-1 bg-black hover:bg-violet-700" href="#" onclick="mostrarDetalles('${title}')">Ver detalles</a>
    </div>`;
}
//Imprimo cada card 
function imprimirCard(listaMovies) {
    let cards = "";
    for (const movie of listaMovies) {
        cards += estructuraCard(movie.image, movie.title, movie.tagline, movie.overview, movie.genres);
    }
    return cards;
}

function obtenerGeneros(listaMovies) {
    // Obtengo todos los géneros únicos de las películas
    let uniqueGeneros = [];
    for (const movie of listaMovies) {
        for (const genero of movie.genres) {
            if (!uniqueGeneros.includes(genero)) {
                uniqueGeneros.push(genero);
            }
        }
    }
    return uniqueGeneros;
}

function llenarSelect(generos) {
    // Lleno el select con los géneros
    for (const genero of generos) {
        let option = document.createElement('option');
        option.value = genero;
        option.text = genero;
        generoSelect.add(option);
    }
}

function mostrarDetalles(title) {
    let pelicula = movies.find(movie => movie.title === title);

    // Redirige a la página de detalles con los parámetros de la película
    window.location.href = `detalles.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(pelicula.image)}&tagline=${encodeURIComponent(pelicula.tagline)}&genres=${encodeURIComponent(pelicula.genres.join(', '))}&overview=${encodeURIComponent(pelicula.overview)}&original_language=${encodeURIComponent(pelicula.original_language)}&release_date=${encodeURIComponent(pelicula.release_date)}&runtime=${encodeURIComponent(pelicula.runtime)}&status=${encodeURIComponent(pelicula.status)}&vote_average=${encodeURIComponent(pelicula.vote_average)}&budget=${encodeURIComponent(pelicula.budget)}&revenue=${encodeURIComponent(pelicula.revenue)}`;
}

function filtrarPeliculas() {
    // Obtengo el género seleccionado
    let selectedGenero = generoSelect.value;
    // Obtengo el nombre ingresado para la búsqueda
    let nombreBusqueda = busquedaInput.value.trim().toLowerCase();

    // Filtro las películas por género y nombre
    let peliculasFiltradas = movies.filter(movie => 
        (selectedGenero === 'todas' || movie.genres.includes(selectedGenero)) &&
        (nombreBusqueda === '' || movie.title.toLowerCase().includes(nombreBusqueda))
    );

    if (peliculasFiltradas.length > 0) {
        // Imprimo las tarjetas filtradas en el contenedor
        contenedor.innerHTML = imprimirCard(peliculasFiltradas);
    } else {
        // Muestro un mensaje si no hay resultados
        contenedor.innerHTML = '<p>No se encontraron resultados</p>';
    }
}