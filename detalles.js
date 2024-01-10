const urlParams = new URLSearchParams(window.location.search);

// Obtengo los valores de los parámetros 
const title = urlParams.get('title');
const image = urlParams.get('image');
const tagline = urlParams.get('tagline');
const genres = urlParams.get('genres');
const overview = urlParams.get('overview');
const originalLanguage = urlParams.get('original_language');
const releaseDate = urlParams.get('release_date');
const runtime = urlParams.get('runtime');
const status = urlParams.get('status');
const voteAverageValue = parseFloat(urlParams.get('vote_average'));
const budgetValue = parseFloat(urlParams.get('budget'));
const revenueValue = parseFloat(urlParams.get('revenue'));

// Convierte el voto a porcentaje (asumiendo que la puntuación es en una escala de 0 a 10)
const voteAveragePercentage = (voteAverageValue / 10) * 100;

// Convierte el presupuesto y los ingresos a formato de moneda (USD)
const budgetFormatted = formatCurrency(budgetValue);
const revenueFormatted = formatCurrency(revenueValue);

// Función para formatear la moneda en USD
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

// Actualizo los elementos HTML con la información obtenida
document.getElementById('detalleImagen').src = decodeURIComponent(image);
document.getElementById('detalleTitle').innerText = decodeURIComponent(title);
document.getElementById('detalleTagline').innerText = decodeURIComponent(tagline);
document.getElementById('detalleGenres').innerText = decodeURIComponent(genres);
document.getElementById('detalleOverview').innerText = decodeURIComponent(overview);
document.getElementById('detalleOriginalLanguage').innerText = decodeURIComponent(originalLanguage);
document.getElementById('detalleReleaseDate').innerText = decodeURIComponent(releaseDate);
document.getElementById('detalleRuntime').innerText = decodeURIComponent(runtime);
document.getElementById('detalleStatus').innerText = decodeURIComponent(status);
document.getElementById('detalleVoteAverage').innerText = `${voteAveragePercentage.toFixed(2)}%`; // Redondea a 2 decimales
document.getElementById('detalleBudget').innerText = budgetFormatted;
document.getElementById('detalleRevenue').innerText = revenueFormatted;