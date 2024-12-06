<template>
    <div>
      <h1>Hechos sobre Gatos</h1>
      <div v-if="loading">Cargando...</div>
      <div v-if="!loading && facts.length > 0">
        <div v-for="(fact, index) in facts" :key="index" class="fact">
          <p>{{ fact.fact }}</p>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Phone',  // Cambiar el nombre del componente si lo deseas
    setup() {
      const facts = ref([]);  // Aquí guardamos los hechos de gatos
      const loading = ref(true);  // Estado de carga
      const errorMessage = ref('');  // Mensaje de error si algo falla
  
      // Función para cargar los hechos desde la API
      const loadCatFacts = async () => {
        const API_URL = 'https://catfact.ninja/facts';  // URL de la API de Cat Facts
  
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error('Error al obtener los hechos de gatos');
          const data = await response.json();
          facts.value = data.data;  // La respuesta tiene un array en 'data'
          loading.value = false;
        } catch (err) {
          errorMessage.value = 'Error al cargar los hechos de gatos. Por favor, intenta de nuevo más tarde.';
          loading.value = false;
        }
      };
  
      // Cargar los hechos cuando el componente se monta
      onMounted(() => {
        loadCatFacts();
      });
  
      return { facts, loading, errorMessage };
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para los hechos sobre gatos */
  .fact {
    margin: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    width: 250px;
    text-align: center;
    font-size: 1.1em;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
    margin-top: 20px;
  }
  </style>
  
  