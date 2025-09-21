<template>
  <ActionBox :instructionTitle="t('jacques.action.endRound.title')" :modalSizeLg="true">
    <template #action>
      <div class="end-round">
        <LocationNumber :value="'20'"/>
        <div v-html="t(endRoundKey)"></div>
      </div>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t(endRoundKey)"></li>
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
  },
  computed: {
    endRoundKey() : string {
      if (this.navigationState.round == 4) {
        return 'jacques.action.endRound.twoTurns'
      }
      else {
        return 'jacques.action.endRound.nextTurn'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.end-round {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>
