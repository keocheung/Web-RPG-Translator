/// <reference types="@types/chrome" />
import { cfg } from '@/stores/config'
import type { DataCharacter, DataItem, GameMessage } from '@/types/rpg'
import OpenAI from 'openai'

console.log('Background service worker started!')

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.')
})

chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension icon clicked.')
  if (!tab.id) {
    return
  }

  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   const tabId = tabs[0].id;

  //   const handler = () => {
  //     console.log("Debugger attached");

  //     // 启动 DOM 调试器
  //     chrome.debugger.sendCommand({ tabId }, "DOM.enable");
  //     chrome.debugger.sendCommand({ tabId }, "DOMDebugger.getEventListeners", { objectId: "document" }, (listeners) => {
  //       console.log(listeners);
  //     });
  //   }
  //   chrome.debugger.attach({ tabId }, "1.3", handler);
  //   chrome.debugger.detach({ tabId }, handler);
  // });

  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['assets/style.css'],
    })
  } catch (error) {
    console.error('Failed to inject css:', error)
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // @ts-ignore
        const dataCharacters = window.$dataCharaters as DataCharacter[]
        // @ts-ignore
        const dataItems = window.$dataItems as DataItem[]
        const sendMessage = async () => {
          // @ts-ignore
          const gameMessage = (window.$gameMessage as GameMessage)._texts
            .join('')
            .replaceAll(/\\S[EA]\[\d+\]/g, '')
            .replaceAll(/<I\\\*?item\[(\d+)\]>/g, (s, id) => {
              return dataItems[parseInt(id)]?.name || ''
            })
            .replaceAll(/\\N\[(\d+)\]>/g, (s, id) => {
              return dataCharacters[parseInt(id)]?.name || ''
            })
          chrome.runtime.sendMessage(
            {
              type: 'GET_TRANSLATION',
              data: gameMessage,
            },
            (response) => {
              const completion = response.data
              window.postMessage({ fromPage: true, payload: completion })
            },
          )
        }
        document.addEventListener('click', sendMessage)
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Control') {
            setInterval(sendMessage, 100)
          }
        })
      },
      world: 'MAIN',
    })
  } catch (error) {
    console.error('Failed to inject content script:', error)
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['main.js'],
    })
  } catch (error) {
    console.error('Failed to inject content script:', error)
  }
})

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === 'GET_CONFIG') {
    sendResponse({ config: cfg.value })
    return true
  }
  if ((msg.type === 'GET_TRANSLATION', msg.data)) {
    const client = new OpenAI({
      baseURL: cfg.value.openAi.baseUrl,
      apiKey: cfg.value.openAi.apiKey,
      dangerouslyAllowBrowser: true,
    })
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: cfg.value.prompt },
        { role: 'user', content: msg.data },
      ],
      stream: true,
    })
    sendResponse({ data: completion })
    return true
  }
})
