<template>
  <ActionBox :instructionTitle="t('jacques.action.endRound.title')" :modalSizeLg="true">
    <template #action>
      <LocationNumber :value="'20'"/>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t('jacques.action.explore.move', {amount: action.exploreSteps}, action.exploreSteps ?? 0)"></li>
        <li v-html="t('jacques.action.explore.quest')"></li>
        <li v-html="t('jacques.action.explore.shortestPath')"></li>
        <li v-html="t('jacques.action.explore.noRewards')"></li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import NavigationState from '@/util/jacques/NavigationState'
import { CardAction } from '@/services/jacques/JacquesCard'
import LocationNumber from '@/components/structure/LocationNumber.vue'

export default defineComponent({
  name: 'ActionEndRound',
  components: {
    ActionBox,
    LocationNumber
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>

<style lang="scss" scoped>
</style>
