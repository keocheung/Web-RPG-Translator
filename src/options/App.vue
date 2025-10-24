<script lang="ts">
import { cfg } from '../stores/config'
export default {
  name: 'App',
  data() {
    return {
      config: cfg,
    }
  },
}
</script>

<template>
  <div>
    Prompt
    <input type="text" v-model="config.prompt" />
  </div>
  <div>
    OpenAI base URL
    <input type="text" v-model="config.openAi.baseUrl" />
  </div>
  <div>
    OpenAI API Key
    <input type="text" v-model="config.openAi.apiKey" />
  </div>
</template>
