// src/router/router.apis.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue'; // Importa el nuevo componente HomePage

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // Usando la base URL
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage  // Ruta que carga el componente HomePage
    }
  ]
});

export default router;
