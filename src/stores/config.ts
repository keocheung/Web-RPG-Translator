import { useExtensionStorage } from '@/utils/useExtensionStorage'

export interface Config {
  openAi: {
    baseUrl: string
    apiKey: string
  }
  model: string
  prompt: string
  customCSS: string
}

export const cfg = useExtensionStorage('config', {
  openAi: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
  },
  model: 'gpt-4o',
  prompt: '翻译成中文，不要添加不必要的主语',
  customCSS: '',
} as Config)
