<template>
  <ActionBox :instructionTitle="t('jean.action.combat.title')" :modalSizeLg="true">
    <template #action>
      <div class="combat">
        <AppIcon name="combat" class="icon combat"/>
        <ol>
          <li>
            <span v-html="t('jean.action.combat.max')"></span> <AppIcon name="combat-nation-selection" class="icon combat-nation-selection"/><br/>
            <span v-html="t('jean.action.combat.tie')"></span><br/>
            <AppIcon name="combat-nation-tiebreak" class="icon combat-nation-tiebreak"/>
          </li>
          <li><AppIcon name="combat-annex-city" class="icon combat-annex-city"/></li>
          <li v-if="action.combatAdditionalVillage"><AppIcon name="combat-annex-village" class="icon combat-annex-village"/></li>
          <li><AppIcon type="influence" name="any" class="icon influence" v-for="i in action.influence" :key="i"/></li>
        </ol>
      </div>
    </template>
    <template #instruction>
      <ul class="instruction">
        <li v-html="t('jean.action.combat.instruction.token')"></li>
        <li v-html="t('jean.action.combat.instruction.modifyValue')"></li>
        <li v-html="t('jean.action.combat.instruction.tie')"></li>
        <li v-html="t('jean.action.combat.instruction.annexCity')"></li>
        <li v-if="action.combatAdditionalVillage" v-html="t('jean.action.combat.instruction.annexVillage')" class="fw-bold"></li>
        <li v-html="t('jean.action.combat.instruction.influence')"></li>
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
  name: 'ActionCombat',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
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
.icon {
  height: 3rem;
}
.combat {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -0.75rem;
  ol li {
    margin-top: 0.6rem;
  }
  .icon.combat-nation-selection, .icon.combat-nation-tiebreak {
    height: 1.75rem;
  }
  .icon.combat-annex-city, .icon.combat-annex-village {
    height: 2rem;
  }
  .icon.influence {
    margin-right: -0.5rem;
    height: 2.5rem;
  }
}
</style>
