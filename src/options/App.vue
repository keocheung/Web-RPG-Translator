<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <n-form
      ref="formRef"
      :model="config"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :style="{
        maxWidth: '640px',
        marginTop: '40px',
        marginLeft: '40px',
      }"
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
      <n-form-item label="Prompt" path="prompt">
        <n-input
          v-model:value="config.prompt"
          type="textarea"
          placeholder="翻译成中文，不要添加不必要的主语"
        />
      </n-form-item>
    </n-form>
  </n-config-provider>
</template>

<script lang="ts">
import { cfg } from '../stores/config'
import {
  NConfigProvider,
  NGlobalStyle,
  darkTheme,
  useOsTheme,
  NForm,
  NFormItem,
  NInput,
} from 'naive-ui'

export default {
  name: 'App',
  data() {
    return {
      config: cfg,
    }
  },
  components: {
    NConfigProvider,
    NGlobalStyle,
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
