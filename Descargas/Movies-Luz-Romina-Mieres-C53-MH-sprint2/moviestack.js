const api = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
let contenedor = document.getElementById('contenedor');
let generoSelect = document.getElementById('generoSelect');
let busquedaInput = document.getElementById('busquedaInput');
let detallesPelicula = document.getElementById('detallesPelicula');


fetch("https://moviestack.onrender.com/api/movies", {
    headers: {
        "X-API-Key": api
    }
})
    .then(response => response.json())
    .then(data => {
        const movies = data.movies.filter((movie) => movie != null);
        llenarSelect(obtenerGeneros(movies))

        contenedor.innerHTML= imprimirCard (movies)

    contenedor.addEventListener('click', (e) => {
        if (e.target.dataset.id != undefined) {
            alternarFavoritos(e.target.dataset.id)            
        }
    })

        function estructuraCard(image, title, tagline, overview, id) {
            const favorites = JSON.parse(localStorage.getItem("favorites"))|| []
            const fav = favorites.includes(id)
            console.log(favorites)
            if (fav) {
                return `
            <div class="flex flex-col items-center justify-between bg-violet-600 shadow-lg shadow-indigo-500/40 h-[400px] w-[300px] object-cover rounded-2xl border border-black">
            <div class="relative">
                <img class="h-[200px] w-[300px] object-cover rounded-t-2xl"
                    src="https://moviestack.onrender.com/static/${image}" alt="imagen-película">
                    <button data-id="${id}">
                         <img data-id="${id}" class="absolute top-1 right-1 w-20 h-10" src="https://static.vecteezy.com/system/resources/previews/014/392/001/non_2x/love-heart-love-icon-on-transparent-background-free-png.png" alt="logo corazon">
                    </button>
            </div>
            <div class="flex flex-col items-center overflow-y-auto h-72 p-5">
                <h4 class="font-bold text-xl">${title}</h4>
                <p class="p-2 text-lg">${tagline}</p>
                <p class="pb-3 text-ms">${overview}</p>
                <a class="w-32 text-center text-white border-solid border-2 border-white mr-1 p-1 rounded-lg p-1 bg-black hover:bg-violet-700"
                    href="./detalles.html?id=${id}" onclick="mostrarDetalles('${title}')">Ver detalles</a>
            </div>
        </div>`
                
            }else{
                return `
            <div class="flex flex-col items-center justify-between bg-violet-600 shadow-lg shadow-indigo-500/40 h-[400px] w-[300px] object-cover rounded-2xl border border-black">
            <div class="relative">
                <img class="h-[150px] w-[300px] object-cover rounded-t-2xl"
                    src="https://moviestack.onrender.com/static/${image}" alt="imagen-película">
                    <button data-id="${id}">
                         <img data-id="${id}" class="absolute top-1 right-1 w-20 h-10" src="../images/logo-corazon-vacio.png" alt="logo corazon">
                    </button>
            </div>
            <div class="flex flex-col items-center overflow-y-auto h-72 p-5">
                <h4 class="font-bold text-xl">${title}</h4>
                <p class="p-2 text-lg">${tagline}</p>
                <p class="pb-3 text-ms">${overview}</p>
                <a class="w-32 text-center text-white border-solid border-2 border-white mr-1 p-1 rounded-lg p-1 bg-black hover:bg-violet-700"
                    href="./detalles.html?id=${id}" onclick="mostrarDetalles('${title}')">Ver detalles</a>
            </div>
        </div>`
            }
            
        }

        const favorites = JSON.parse(localStorage.getItem("favorites"))|| []

        function alternarFavoritos(id) {
            const index = favorites.indexOf(id)
            if (index === -1) {
                favorites.push(id)
                localStorage.setItem("favorites", JSON.stringify(favorites))               
            }else{
                favorites.splice(index, 1)
                localStorage.setItem("favorites", JSON.stringify(favorites)) 
            }
            
        }

        function imprimirCard(listaMovies) {
            let cards = "";
            for (const movie of listaMovies) {
                cards += estructuraCard(movie.image, movie.title, movie.tagline, movie.overview, movie.id);
            }
            return cards;
        }

        function obtenerGeneros(listaMovies) {
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
            for (const genero of generos) {
                let option = document.createElement('option');
                option.value = genero;
                option.text = genero;
                generoSelect.add(option);
            }
        }

        document.getElementById('buttonFiltrar').addEventListener('click', function (){
            let selectedGenero = generoSelect.value;
            let nombreBusqueda = busquedaInput.value.trim().toLowerCase();
            let peliculasFiltradas = movies.filter(movie =>
                (selectedGenero === 'todas' || movie.genres.includes(selectedGenero)) &&
                (nombreBusqueda === '' || movie.title.toLowerCase().includes(nombreBusqueda))
            );
            if (peliculasFiltradas.length > 0) {
                contenedor.innerHTML = imprimirCard(peliculasFiltradas);
            } else {
                contenedor.innerHTML = '<p>No se encontraron resultados</p>';
            }
        })
        
    })
    .catch(error => console.log(error));

 /*  
*/