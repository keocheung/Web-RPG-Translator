import { useStorage } from '@vueuse/core'

export interface Config {
  prompt: string
  openAi: {
    baseUrl: string
    apiKey: string
  }
}

export const cfg = useStorage('config', {
  prompt: '翻译成中文，不要添加不必要的主语',
  openAi: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
  },
} as Config)
