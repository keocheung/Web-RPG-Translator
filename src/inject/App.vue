<template>
  <vue-draggable-resizable :active="false" :x="100" :y="100">
    <p>
      {{ mainText }}
    </p>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import { Stream } from 'openai/streaming'
export default {
  name: 'App',
  data() {
    return {
      mainText: 'RPG Translator',
    }
  },
  mounted() {
    console.log('App mounted')

    window.addEventListener('message', async (event) => {
      if (event.source !== window || !event.data.fromPage || !event.data.payload) return
      console.log('Received message from page:', event.data.payload)
      this.mainText = ''
      if (event.data.payload instanceof Stream) {
        for await (const chunk of event.data.payload) {
          this.mainText += chunk.choices[0]?.delta?.content
        }
      }
    })
  },
}
</script>

<style></style>
