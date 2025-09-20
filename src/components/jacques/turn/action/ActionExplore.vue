<template>
  <ActionBox :instructionTitle="t('jacques.action.explore.title')" :modalSizeLg="true">
    <template #action>
      <div class="explore">
        <div class="amount">{{action.exploreSteps}}</div>
        <AppIcon name="explorer-track" class="icon"/>
      </div>
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
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionBox from '@/components/structure/ActionBox.vue'
import NavigationState from '@/util/jacques/NavigationState'
import { CardAction } from '@/services/jacques/JacquesCard'

export default defineComponent({
  name: 'ActionExplore',
  components: {
    AppIcon,
    ActionBox
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
.explore {
  display: flex;
  align-items: center;
  .amount {
    margin-right: 0.25rem;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  }
  .icon {
    width: 3rem;
  }
}
</style>
