<template>
  <button class="btn btn-success mt-4 me-2" @click="$emit('foundQuest')">
    <AppIcon name="quest" class="icon"/>
    {{t('jean.turnBot.foundQuest')}}
  </button>
  <button class="btn btn-danger mt-4" @click="$emit('noQuest')">
    {{t('jean.turnBot.noQuest')}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'CheckFoundQuest',
  emits: ['foundQuest', 'noQuest'],
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 1.75rem;
}
</style>