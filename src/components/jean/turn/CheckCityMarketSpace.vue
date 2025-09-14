<template>
  <button class="btn btn-success mt-4 me-2" @click="$emit('marketSpace')">
    <AppIcon name="city-market-space" class="icon"/><br/>
    <span v-html="t('jean.turnBot.cityMarketSpace')"></span>
  </button>
  <button class="btn btn-danger mt-4" @click="$emit('removeCard')">
    <AppIcon name="remove-card" class="icon"/><br/>
    <span v-html="t('jean.turnBot.removeCard', {card:card.displayCard})"></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'
import JeanCard, { CardAction } from '@/services/jean/JeanCard'

export default defineComponent({
  name: 'CheckCityMarketSpace',
  emits: ['marketSpace', 'removeCard'],
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    card: {
      type: Object as PropType<JeanCard>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.75rem;
}
</style>