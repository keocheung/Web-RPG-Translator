import { createApp } from 'vue'
import App from './App.vue'
// @ts-expect-error
import VueDraggableResizable from 'vue-draggable-resizable'

const container = document.createElement('div')
container.id = 'rpg-translator-app'
document.body.appendChild(container)
createApp(App)
  .component('vue-draggable-resizable', VueDraggableResizable)
  .mount('#rpg-translator-app')
