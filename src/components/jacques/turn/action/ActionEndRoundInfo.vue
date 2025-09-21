<template>
  <ActionBox :instructionTitle="t('jacques.action.endRound.title')" :modalSizeLg="true">
    <template #action>
      <div class="end-round">
        <LocationNumber :value="locationNumber"/>
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
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
import NavigationState from '@/util/jacques/NavigationState'
import LocationNumber from '@/components/structure/LocationNumber.vue'

export default defineComponent({
  name: 'ActionEndRoundInfo',
  components: {
    ActionBox,
    LocationNumber
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    locationNumber() : string {
      if (this.navigationState.round == 4) {
        if (this.navigationState.botEndRoundNextTurn) {
          return '21b'
        }
        else {
          return '22'
        }
      }
      else {
        return '21a'
      }
    },
    endRoundKey() : string {
      if (this.navigationState.botEndRoundNextTurn) {
        return 'jacques.action.endRound.nextTurn'
      }
      else {
        return 'jacques.action.endRound.now'
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
