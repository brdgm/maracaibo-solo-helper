<template>
  <ActionBox :instructionTitle="t('jacques.action.vp.title')" :modalSizeLg="true">
    <template #action>
      <VpAmount :vp="vp"/>
    </template>
    <template #instruction>
      <p v-html="t('jacques.action.vp.get', {amount: vp}, vp)"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '@/components/structure/ActionBox.vue'
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
    vp: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
