import { useExtensionStorage } from '@/utils/useExtensionStorage'

export interface Config {
  translationService: 'openai' | 'ollama'
  openai: {
    baseUrl: string
    apiKey: string
  }
  ollama: {
    apiUrl: string
  }
  model: string
  prompt: string
  customCSS: string
}

export const cfg = useExtensionStorage('config', {
  translationService: 'openai',
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
  },
  ollama: {
    apiUrl: 'http://localhost:11434',
  },
  model: 'gpt-4o',
  prompt: '翻译成中文，不要添加不必要的主语',
  customCSS: '',
} as Config)
