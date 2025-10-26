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

// 监听页面发送的翻译请求，并转发给background script
window.addEventListener('message', async (event) => {
  // 确保消息来自我们注入的脚本
  if (event.source === window && event.data && event.data.type === 'RPG_TRANSLATE_REQUEST') {
    try {
      // 使用chrome.runtime.sendMessage与background script通信
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            type: 'GET_TRANSLATION',
            data: event.data.data,
          },
          (response) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError)
            } else {
              resolve(response)
            }
          },
        )
      })

      // 将翻译结果发送回页面
      window.postMessage(
        {
          fromPage: true,
          payload: response,
        },
        '*',
      )
    } catch (error) {
      console.error('翻译请求处理失败:', error)
    }
  }
})
