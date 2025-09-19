<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>currentCard</b>: {{cardDeck.currentCard}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const state = useStateStore()
    return { state }
  },
  props: {
    cardDeck: {
      type: Object as PropType<CardDeck>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
p.debug, ul.debug {
  margin: 0;
}
</style>
