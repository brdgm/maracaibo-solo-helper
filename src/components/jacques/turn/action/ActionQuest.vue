<template>
  <ActionBox :instructionTitle="t('jacques.action.quest.title')" :modalSizeLg="true">
    <template #action>
      <div class="quest">
        <div class="amount">{{action.exploreSteps}}</div>
        <AppIcon name="quest-discard" class="icon"/>
        <div class="range">
          <LocationNumber v-if="action.cityNumberFrom" :value="action.cityNumberFrom"/>
          <span> - </span>
          <LocationNumber v-if="action.cityNumberTo" :value="action.cityNumberTo"/>
        </div>
      </div>
    </template>
    <template #instruction>
      <ul>
        <li v-html="t('jacques.action.quest.selectLocation', {from: action.cityNumberFrom, to: action.cityNumberTo})"></li>
        <li v-html="t('jacques.action.quest.none')"></li>
        <li v-html="t('jacques.action.quest.multiple')"></li>
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
  name: 'ActionQuest',
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
.quest {
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    width: 3.5rem;
  }
  .range {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.25rem;
    font-size: 1.25rem;
  }
}
</style>
