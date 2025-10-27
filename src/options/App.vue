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
          label="OpenAI base URL"
          path="openai.baseUrl"
          v-show="config.translationService === 'openai'"
        >
          <n-input v-model:value="config.openai.baseUrl" placeholder="https://api.openai.com/v1" />
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
            theme="atom-one-dark"
            height="200px"
            border-radius="3px"
            font-size="12px"
          ></CodeEditor>
        </n-form-item>
      </n-form>
    </n-flex>
  </n-config-provider>
</template>

<script lang="ts">
import { cfg } from '../stores/config'
import {
  NConfigProvider,
  NGlobalStyle,
  type GlobalThemeOverrides,
  NFlex,
  NGradientText,
  darkTheme,
  useOsTheme,
  NForm,
  NFormItem,
  NInput,
  NSelect,
} from 'naive-ui'
import hljs from 'highlight.js'
import css from 'highlight.js/lib/languages/css'
import CodeEditor from 'simple-code-editor'

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
  components: {
    NConfigProvider,
    NGlobalStyle,
    NFlex,
    NGradientText,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    CodeEditor,
  },
  computed: {
    darkTheme() {
      return useOsTheme().value === 'dark' ? darkTheme : null
    },
  },
}
</script>
