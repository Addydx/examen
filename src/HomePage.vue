<!-- src/components/HomePage.vue -->
<template>
    <div>
      <h1>Bienvenido a la Página Principal</h1>
      <p>Aquí puedes mostrar el contenido principal de la aplicación.</p>
      <!-- Aquí puedes agregar más lógica o interacción -->
      <button @click="loadData">Cargar Datos</button>
      <div v-if="loading">Cargando datos...</div>
      <div v-if="data">
        <p>Datos Cargados: {{ data }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        loading: false,
        data: null
      };
    },
    methods: {
      async loadData() {
        this.loading = true;
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const jsonData = await response.json();
          this.data = jsonData;
        } catch (error) {
          console.error('Error al cargar datos', error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí van tus estilos */
  h1 {
    color: #42b983;
  }
  </style>
  