<template>
  <vue-draggable-resizable :active="false" :x="100" :y="100">
    <n-flex vertical>
      <n-flex justify="flex-end">
        <n-button-group>
          <n-button>翻译 (T)</n-button>
          <n-button>历史 (H)</n-button>
          <n-button @click="openSettingsPage">
            <n-icon>
              <SettingsSharp />
            </n-icon>
          </n-button>
        </n-button-group>
      </n-flex>
      <p>
        {{ mainText }}
      </p>
    </n-flex>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import { NFlex, NButtonGroup, NButton, NIcon } from 'naive-ui'
import { SettingsSharp } from '@vicons/ionicons5'
import OpenAI from 'openai'
import type { Config } from '@/stores/config'

export default {
  name: 'App',
  data() {
    return {
      mainText: 'RPG Translator',
    }
  },
  methods: {
    openSettingsPage() {
      if (window.__EXTENSION_SETTINGS_URL__) {
        window.open(window.__EXTENSION_SETTINGS_URL__, '_blank')
      }
    },
  },
  mounted() {
    window.addEventListener('message', async (event) => {
      if (event.data.type !== 'GAME_MESSAGE' || !event.data.payload) return
      if (!window.__CONFIG__) {
        console.error('CONFIG is not set')
        return
      }
      console.log('CONFIG:', window.__CONFIG__)
      const cfg = window.__CONFIG__ as Config
      console.log('Received message from page:', event.data.payload)
      this.mainText = ''
      const client = new OpenAI({
        baseURL: cfg.openAi.baseUrl,
        apiKey: cfg.openAi.apiKey,
        dangerouslyAllowBrowser: true,
      })
      const stream = await client.chat.completions.create({
        model: cfg.model,
        messages: [
          { role: 'system', content: cfg.prompt },
          { role: 'user', content: event.data.payload },
        ],
        stream: true,
      })
      for await (const chunk of stream) {
        this.mainText += chunk.choices[0]?.delta?.content
      }
    })
  },
  components: {
    NFlex,
    NButtonGroup,
    NButton,
    NIcon,
    SettingsSharp,
  },
}
</script>

<style></style>
