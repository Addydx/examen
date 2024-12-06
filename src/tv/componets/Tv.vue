<template>
  <div>
    <h1>Series de TV Populares</h1>

    <div v-if="loading">Cargando...</div>

    <div v-if="!loading && tvShows.length > 0">
      <div v-for="show in tvShows" :key="show.id" class="tv-show">
        <h3>{{ show.name }}</h3>
        <img 
          :src="show.poster_path 
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=Sin+Póster'" 
          alt="Póster de la serie"
        />
        <p>{{ show.overview }}</p>
        <p><strong>Fecha de estreno:</strong> {{ show.first_air_date }}</p>
        <p><strong>Puntuación:</strong> {{ show.vote_average }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <div v-if="!loading && !errorMessage && currentPage < totalPages">
      <button @click="loadMoreTVShows" :disabled="loading">Cargar más series</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "TV",
  setup() {
    const tvShows = ref([]);
    const loading = ref(true);
    const errorMessage = ref("");
    const currentPage = ref(1);
    const totalPages = ref(1);

    const loadTVShows = async (page = 1) => {
      const API_URL = "https://api.themoviedb.org/3/tv/popular";
      const options = {
        method: "GET",
        url: API_URL,
        params: { language: "es-ES", page: page },
        headers: {
          accept: "application/json",
          Authorization: "Bearer <Your_API_Token>",
        },
      };

      try {
        const response = await axios.request(options);
        tvShows.value = page === 1 ? response.data.results : [...tvShows.value, ...response.data.results];
        totalPages.value = response.data.total_pages;
        loading.value = false;
      } catch (err) {
        errorMessage.value = "Error al cargar las series de TV. Por favor, intenta de nuevo más tarde.";
        loading.value = false;
      }
    };

    const loadMoreTVShows = () => {
      if (currentPage.value < totalPages.value && !loading.value) {
        loading.value = true;
        currentPage.value += 1;
        loadTVShows(currentPage.value);
      }
    };

    onMounted(() => {
      loadTVShows(currentPage.value);
    });

    return {
      tvShows,
      loading,
      errorMessage,
      loadMoreTVShows,
    };
  },
};
</script>

<style scoped>
.tv-show {
  margin: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  width: 200px;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

.tv-show img {
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

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #888;
}
</style>
