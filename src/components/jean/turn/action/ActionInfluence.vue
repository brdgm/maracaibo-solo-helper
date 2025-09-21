<template>
  <ActionBox :instructionTitle="t('jean.action.influence.title')" :modalSizeLg="true">
    <template #action>
      <template v-if="action.nation && action.influence">
        <AppIcon v-for="i of action.influence" :key="i" type="influence" :name="action.nation" class="icon"/>
      </template>
    </template>
    <template #instruction>
      <p v-html="t('jean.action.influence.get', {count:action.influence, nation:t(`nation.${action.nation}`)})"></p>
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
  name: 'ActionInfluence',
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
  width: 3.5rem;
}
</style>
