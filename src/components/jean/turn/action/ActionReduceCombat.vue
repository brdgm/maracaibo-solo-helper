<template>
  <ActionBox :instructionTitle="t('jean.action.reduceCombat.title')" :modalSizeLg="true">
    <template #action>
      {{t('jean.action.reduceCombat.title')}}
    </template>
    <template #instruction>
      <ul class="instruction">
        <li>
          {{t('jean.action.reduceCombat.title')}}...
        </li>
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
  }
})
</script>

<style lang="scss" scoped>
</style>
