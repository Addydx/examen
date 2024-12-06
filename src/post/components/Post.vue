<template>
  <div>
    <h1>Publicaciones</h1>

    <!-- Cargando mientras obtenemos los posts -->
    <div v-if="loading">Cargando...</div>

    <!-- Mostrar publicaciones si existen -->
    <div v-if="!loading && posts.length > 0" class="posts-container">
      <div v-for="post in posts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>

    <!-- Mensaje de error si ocurre un problema -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "Post",
  setup() {
    const posts = ref([]);
    const loading = ref(true);
    const errorMessage = ref("");

    // Función para cargar las publicaciones
    const loadPosts = async () => {
      const API_URL = "https://jsonplaceholder.typicode.com/posts";

      try {
        const response = await axios.get(API_URL);
        posts.value = response.data;
        loading.value = false;
      } catch (err) {
        errorMessage.value = "Error al cargar las publicaciones. Por favor, intenta de nuevo más tarde.";
        loading.value = false;
      }
    };

    // Cargar las publicaciones cuando el componente se monta
    onMounted(() => {
      loadPosts();
    });

    return { posts, loading, errorMessage };
  },
};
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.post {
  flex: 1 1 200px;
  padding: 15px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: center;
  min-width: 200px;
  max-width: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.post:hover {
  transform: scale(1.05);
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
