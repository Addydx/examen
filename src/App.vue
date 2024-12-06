<template>
  <div id="app">
    <h1>Mi Aplicación de Películas y Más</h1>
    <button @click="showMovies = !showMovies">Mostrar Películas</button>
    <button @click="showTV = !showTV">Mostrar TV</button>
    <button @click="showPhone = !showPhone">Mostrar Teléfonos</button>
    <button @click="showPost = !showPost">Mostrar Publicaciones</button>

    <Movies v-if="showMovies" />
    <TV v-if="showTV" />
    <Phone v-if="showPhone" />
    <Post v-if="showPost" />
  </div>
</template>

<script>
import Movies from "./movies/components/MejoresPeliculas.vue";
import TV from './tv/componets/Tv.vue';
import Phone from './phone/components/Phone.vue';
import Post from './post/components/Post.vue';

export default {
  name: 'App',
  components: {
    Movies,
    TV,
    Phone,
    Post
  },
  data() {
    return {
      showMovies: false,
      showTV: false,
      showPhone: false,
      showPost: false
    };
  }
};
</script>

<style>
button {
  margin: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
