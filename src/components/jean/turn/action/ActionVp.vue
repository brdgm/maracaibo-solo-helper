<template>
  <ActionBox :instructionTitle="t('jean.action.vp.title')" :modalSizeLg="true">
    <template #action>
      <VpAmount v-if="action.vp" :vp="action.vp"/>
    </template>
    <template #instruction>
      <p v-html="t('jean.action.vp.get', {amount: action.vp}, action.vp ?? 0)"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import ActionBox from '@/components/structure/ActionBox.vue'
import { CardAction } from '@/services/jean/JeanCard'
import VpAmount from '@/components/structure/VpAmount.vue'

export default defineComponent({
  name: 'ActionVp',
  emits: {
    extraVP: (_extraVP: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionBox,
    VpAmount
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
