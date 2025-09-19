<template>
  <ActionBox :instructionTitle="t('jacques.action.cityDisc.title')" :modalSizeLg="true">
    <template #action>
      <div class="city-disc">
        <AppIcon name="city-disc" class="icon"/>
        <div class="number">{{action.cityNumber}}</div>
      </div>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t('jacques.action.cityDisc.place', {cityNumber:action.cityNumber})"></li>
        <li v-html="t('jacques.action.cityDisc.noPlace')"></li>
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
  name: 'ActionCityDisc',
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
.city-disc {
  display: flex;
  flex-direction: column;
  align-items: end;
  .icon {
    width: 4rem;
    margin-right: 0.25rem;
  }
  .number {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00a3d8;
    border: 2px solid #110617;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.25rem;
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    padding-bottom: 0.1rem;
  }
}
</style>
