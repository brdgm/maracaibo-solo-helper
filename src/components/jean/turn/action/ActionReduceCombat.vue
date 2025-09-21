<template>
  <ActionBox :instructionTitle="t('jean.action.reduceCombat.title')" :modalSizeLg="true">
    <template #action>
      <div class="reduce-combat">
        <div class="amount">{{action.reduceCombat}}</div>
        <AppIcon name="combat-point" class="icon"/>
        <label class="pointsLabel" @click.stop>
          <div v-html="t('jean.action.reduceCombat.enterPoints')"></div>
          <NumberInput v-model="reducedCombatPoints" :min="0" :max="action.reduceCombat" :step="1" class="points"/>
        </label>
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
import { defineComponent, PropType, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionBox from '@/components/structure/ActionBox.vue'
import { CardAction } from '@/services/jean/JeanCard'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'

export default defineComponent({
  name: 'ActionReduceCombat',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    ActionBox,
    NumberInput
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
  setup(props) {
    const { t } = useI18n()

    const combatPointVP = (props.navigationState.round >= 3) ? 4 : 3
    const reducedCombatPoints = ref(props.action.reduceCombat ?? 0)

    return { t, combatPointVP, reducedCombatPoints }
  },
 watch: {
    reducedCombatPoints(value) {
      const missingPoints = (this.action.reduceCombat ?? 0) - (value ?? 0)
      const extraVP = missingPoints * this.combatPointVP
      console.log("emit: " + extraVP)
      this.$emit('extraVP', extraVP)
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
  .pointsLabel {
    margin-left: 1rem;
  }
  .points {
    width: 4rem;
  }
}
</style>
