const api = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"
const peliculasFavoritas = localStorage.getItem("favorites")
const container = document.getElementById ('container')

fetch("https://moviestack.onrender.com/api/movies", {
    headers: {
        "X-API-Key": api
    },
     })
    .then((response) => response.json())
    .then((data) => {
        const movies = data.movies.filter((movie) => peliculasFavoritas.includes(movie.id));
        
        container.innerHTML= imprimirCard (movies)
        container.addEventListener('click', (e)=>{
            if (e.target.dataset.id != undefined) {
                container.innerHTML= imprimirCard(movies)
               alternarFavoritos(e.target.dataset.id)              
            }
            container.innerHTML= imprimirCard(movies)
        })

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
        
        function estructuraCard(image, title, tagline, overview, id) {
            const favorites = JSON.parse(localStorage.getItem("favorites"))|| []
            const fav = favorites.includes(id)

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
                return ""
            }
            
        }



        function imprimirCard(listaMovies) {
            let cards = "";
            for (const movie of listaMovies) {
                cards += estructuraCard(movie.image, movie.title, movie.tagline, movie.overview, movie.id);
            }
            return cards;
        }
    } )

.catch(error => console.log(error));