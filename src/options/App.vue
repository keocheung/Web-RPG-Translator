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
        <n-form-item label="OpenAI base URL" path="openAi.baseUrl">
          <n-input v-model:value="config.openAi.baseUrl" placeholder="https://api.openai.com/v1" />
        </n-form-item>
        <n-form-item label="OpenAI API Key" path="openAi.apiKey">
          <n-input
            v-model:value="config.openAi.apiKey"
            placeholder="sk-..."
            :style="{
              'font-family': 'monospace',
            }"
            type="password"
            show-password-on="mousedown"
          />
        </n-form-item>
        <n-form-item label="Model" path="model">
          <n-input v-model:value="config.model" placeholder="gpt-4o" />
        </n-form-item>
        <n-form-item label="Prompt" path="prompt">
          <n-input
            v-model:value="config.prompt"
            type="textarea"
            placeholder="翻译成中文，不要添加不必要的主语"
          />
        </n-form-item> </n-form
    ></n-flex>
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
} from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0000FF',
    primaryColorHover: '#0000CC',
  },
}

export default {
  name: 'App',
  data() {
    return {
      config: cfg,
      themeOverrides,
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
  },
  computed: {
    darkTheme() {
      return useOsTheme().value === 'dark' ? darkTheme : null
    },
  },
}
</script>
