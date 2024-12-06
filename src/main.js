// main.js
import { createApp } from 'vue';       // Traemos la función para crear una aplicación Vue
import './style.css';                   // Traemos los estilos globales
import App from './App.vue';            // Importamos el componente principal (App.vue)


createApp(App)                        // Creamos la instancia de Vue pasando el componente principal
  .mount('#app');                     // Montamos la aplicación en el DOM (el contenedor con id="app")



 