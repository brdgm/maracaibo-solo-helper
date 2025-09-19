<template>
  <ActionBox :instructionTitle="t('jacques.action.cityDisc.title')" :modalSizeLg="true">
    <template #action>
      <div class="city-disc">
        <AppIcon name="city-disc" class="icon"/>
        <LocationNumber v-if="action.cityNumber" :value="action.cityNumber"/>
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
import LocationNumber from '@/components/structure/LocationNumber.vue'

export default defineComponent({
  name: 'ActionCityDisc',
  components: {
    AppIcon,
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
    margin-right: 0.5rem;
  }
}
</style>
