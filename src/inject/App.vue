<template>
  <vue-draggable-resizable :active="false" :x="100" :y="100">
    <n-flex vertical>
      <n-flex justify="flex-end">
        <n-button-group>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button style="font-size: 20px">
                <n-icon>
                  <TranslateRound />
                </n-icon>
              </n-button>
            </template>
            刷新翻译 (T)
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button style="font-size: 20px">
                <n-icon>
                  <HistoryRound />
                </n-icon>
              </n-button>
            </template>
            历史记录 (H)
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button style="font-size: 20px" @click="openSettingsPage">
                <n-icon>
                  <SettingsRound />
                </n-icon>
              </n-button>
            </template>
            全局设置
          </n-tooltip>
        </n-button-group>
      </n-flex>
      <p>
        {{ mainText }}
      </p>
    </n-flex>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import { NFlex, NButtonGroup, NButton, NIcon, NTooltip } from 'naive-ui'
import { SettingsRound, HistoryRound, TranslateRound } from '@vicons/material'
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
    NTooltip,
    SettingsRound,
    HistoryRound,
    TranslateRound,
  },
}
</script>

<style></style>
