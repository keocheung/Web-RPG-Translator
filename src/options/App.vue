<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-flex
      vertical
      :style="{
        maxWidth: '640px',
        marginTop: '40px',
        marginLeft: '40px',
      }"
    >
      <h1>
        <n-gradient-text type="info" :style="{ fontWeight: 'bold' }">
          Web RPG Translator
        </n-gradient-text>
      </h1>
      <n-tabs type="bar" placement="left">
        <n-tab-pane name="general" label="General">
          <n-form
            ref="formRef"
            :model="config"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
            <n-form-item label="Translate Service" path="translationService">
              <n-select
                v-model:value="config.translationService"
                :options="translationServiceOptions"
              />
            </n-form-item>
            <n-form-item
              label="OpenAI Base URL"
              path="openai.baseUrl"
              v-show="config.translationService === 'openai'"
            >
              <n-input
                v-model:value="config.openai.baseUrl"
                placeholder="https://api.openai.com/v1"
              />
            </n-form-item>
            <n-form-item
              label="OpenAI API Key"
              path="openai.apiKey"
              v-show="config.translationService === 'openai'"
            >
              <n-input
                v-model:value="config.openai.apiKey"
                placeholder="sk-..."
                :style="{
                  'font-family': 'monospace',
                }"
                type="password"
                show-password-on="mousedown"
              />
            </n-form-item>
            <n-form-item
              label="Ollama API URL"
              path="ollama.apiUrl"
              v-show="config.translationService === 'ollama'"
            >
              <n-input v-model:value="config.ollama.apiUrl" placeholder="http://localhost:11434" />
            </n-form-item>
            <n-form-item label="Model" path="model">
              <n-input v-model:value="config.model" placeholder="gpt-4o" />
            </n-form-item>
            <n-form-item label="Prompt" path="prompt">
              <n-input v-model:value="config.prompt" type="textarea" />
            </n-form-item>
            <n-form-item label="Custom Style">
              <CodeEditor
                v-model:modelValue="config.customCSS"
                :languages="[['css', 'CSS']]"
                :highlight="hljs"
                :theme="editorTheme"
                height="200px"
                border-radius="3px"
                font-size="12px"
              ></CodeEditor>
            </n-form-item>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="import-export" label="Import/Export">
          <n-flex>
            <n-button @click="handleImport">
              <n-icon class="icon">
                <FileUploadOutlined />
              </n-icon>
              Import
            </n-button>
            <n-button @click="handleExport">
              <n-icon class="icon">
                <FileDownloadOutlined />
              </n-icon>
              Export
            </n-button>
          </n-flex>
        </n-tab-pane>
      </n-tabs>
    </n-flex>
  </n-config-provider>
</template>

<script lang="ts">
import { cfg } from '../stores/config'
import {
  type GlobalThemeOverrides,
  NConfigProvider,
  NGlobalStyle,
  NTabs,
  NTabPane,
  NFlex,
  NGradientText,
  darkTheme,
  useOsTheme,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NButton,
  NIcon,
  createDiscreteApi,
} from 'naive-ui'
import { FileUploadOutlined, FileDownloadOutlined } from '@vicons/material'
import hljs from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import CodeEditor from 'simple-code-editor'

const { message } = createDiscreteApi(['message'])

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0000FF',
    primaryColorHover: '#0000CC',
  },
}

hljs.registerLanguage('css', css)

export default {
  name: 'App',
  data() {
    return {
      config: cfg,
      message,
      themeOverrides,
      hljs,
      translationServiceOptions: [
        {
          label: 'OpenAI Compatible',
          value: 'openai',
        },
        {
          label: 'Ollama',
          value: 'ollama',
        },
      ],
    }
  },
  methods: {
    handleExport() {
      const configToExport = JSON.parse(JSON.stringify(this.config))
      const configJson = JSON.stringify(configToExport, null, 2)
      const blob = new Blob([configJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'web-rpg-translator.json'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    handleImport() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json'

      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]

        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            try {
              const content = e.target?.result as string
              const importedConfig = JSON.parse(content)
              Object.assign(this.config, importedConfig)
              this.message.success('Import succeeded')
            } catch (error) {
              this.message.error('Import failed')
              console.error('Import failed:', error)
            }
          }
          reader.readAsText(file)
        }
      }

      input.click()
    },
  },
  components: {
    NConfigProvider,
    NGlobalStyle,
    NTabs,
    NTabPane,
    NFlex,
    NGradientText,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NButton,
    NIcon,
    FileUploadOutlined,
    FileDownloadOutlined,
    CodeEditor,
  },
  computed: {
    darkTheme() {
      return useOsTheme().value === 'dark' ? darkTheme : null
    },
    editorTheme() {
      return useOsTheme().value === 'dark' ? 'atom-one-dark' : 'atom-one-light'
    },
  },
}
</script>

<style>
html {
  text-autospace: normal;
}

.icon {
  font-size: 1.3em;
  margin-right: 8px;
}
</style>
