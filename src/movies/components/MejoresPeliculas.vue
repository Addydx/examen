<template>
    <div>
      <h1>Películas Populares</h1>
  
      <!-- Cargando mientras obtenemos las películas -->
      <div v-if="loading">Cargando...</div>
  
      <!-- Mostrar películas si existen -->
      <div v-if="!loading && movies.length > 0">
        <div v-for="movie in movies" :key="movie.id" class="movie">
          <h3>{{ movie.title }}</h3>
          <img 
            :src="movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : 'https://via.placeholder.com/500x750?text=Sin+Póster'" 
            alt="Poster de la película" 
          />
          <p>{{ movie.overview }}</p>
        </div>
      </div>
  
      <!-- Mensaje de error si ocurre un problema -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  
      <!-- Botón para cargar más películas -->
      <div v-if="!loading && !errorMessage">
        <button @click="loadMoreMovies" :disabled="loading">Cargar más películas</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Movies',
    setup() {
      const movies = ref([]); // Array de películas
      const loading = ref(true); // Estado de carga
      const errorMessage = ref(''); // Mensaje de error
      const currentPage = ref(1); // Página actual de la API
      const totalPages = ref(1);  // Total de páginas disponibles en la API
  
      // Función para cargar las películas desde la API
      const loadMovies = async (page = 1) => {
        const API_KEY = '5c6c7905631c1c1e0bd1adb75f4780d5';
        const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;
  
        try {
          const response = await fetch(API_URL_POPULAR);
          if (!response.ok) throw new Error('Error al obtener las películas');
          const data = await response.json();
  
          // Agregar nuevas películas o reemplazar las iniciales
          movies.value = page === 1 ? data.results : [...movies.value, ...data.results]; 
  
          totalPages.value = data.total_pages;  // Actualizar el total de páginas
          loading.value = false; // Cambio de estado
        } catch (err) {
          errorMessage.value = `Error al cargar las películas. Detalle: ${err.message}`;
          loading.value = false; // Cambiar estado a false incluso si hay error
        }
      };
  
      // Función para cargar más películas cuando el usuario hace clic en el botón
      const loadMoreMovies = () => {
        if (currentPage.value < totalPages.value && !loading.value) {
          loading.value = true; // Mientras cargamos
          currentPage.value += 1; // Aumentamos el número de página
          loadMovies(currentPage.value); // Cargar las siguientes películas
        }
      };
  
      // Llamada inicial cuando el componente se monta
      onMounted(() => {
        loadMovies(currentPage.value);
      });
  
      return {
        movies,
        loading,
        errorMessage,
        loadMoreMovies, // Devolvemos la función para cargar más
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos básicos para la presentación de las películas */
  .movie {
    margin: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    width: 200px;
    text-align: center;
    display: inline-block;
    vertical-align: top;
  }
  
  .movie img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
    text-align: center;
  }
  
  button {
    padding: 10px 15px;
    margin: 20px 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  