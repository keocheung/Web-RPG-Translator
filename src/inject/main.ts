import { createApp } from 'vue'
import App from './App.vue'
// @ts-expect-error VueDraggableResizable库可能没有完整的TypeScript类型定义
import VueDraggableResizable from 'vue-draggable-resizable'

const container = document.createElement('div')
container.id = 'rpg-translator-app'
document.body.appendChild(container)
createApp(App)
  .component('vue-draggable-resizable', VueDraggableResizable)
  .mount('#rpg-translator-app')
