<template>
  <ActionBox :instructionTitle="t('jean.action.reduceCombat.title')" :modalSizeLg="true">
    <template #action>
      <div class="reduce-combat">
        <div class="amount">{{action.reduceCombat}}</div>
        <AppIcon name="combat-point" class="icon"/>
      </div>
    </template>
    <template #instruction>
      <ul class="instruction">
        <li v-html="t('jean.action.reduceCombat.reduce', {amount: action.reduceCombat}, action.reduceCombat ?? 0)"></li>
        <li v-html="t('jean.action.reduceCombat.noPoints', {amount: combatPointVP})"></li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionBox from '@/components/structure/ActionBox.vue'
import { CardAction } from '@/services/jean/JeanCard'

export default defineComponent({
  name: 'ActionReduceCombat',
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
  },
  computed: {
    combatPointVP() : number {
      if (this.navigationState.round >= 3) {
        return 4
      }
      else {
        return 3
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.reduce-combat {
  display: flex;
  align-items: center;
  .amount {
    margin-right: -0.25rem;
    font-size: 2rem;
    font-weight: bold;
    color: red;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  }
  .icon {
    width: 3rem;
  }
}
</style>
