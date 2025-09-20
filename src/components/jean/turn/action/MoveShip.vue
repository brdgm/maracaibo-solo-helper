<template>
  <ActionBox :instructionTitle="t('jean.action.moveShip.title')" :modalSizeLg="true">
    <template #action>
      <div class="movement">
        <div>{{t('jean.action.moveShip.title')}}</div>
        <div class="steps">{{ movementSteps }}</div>
        <AppIcon type="direction" :name="direction" class="direction"/>
      </div>
    </template>
    <template #instruction>
      <ul class="instruction">
        <li>
          <AppIcon name="upper" type="direction" class="icon route"/>
          {{t('jean.action.moveShip.upperRoute')}}
        </li>
        <li>
          <AppIcon name="lower" type="direction" class="icon route"/>
          {{t('jean.action.moveShip.lowerRoute')}}
        </li>
        <li>{{t('jean.action.moveShip.ignoreVillages')}}</li>
        <li>
          <AppIcon name="hand" class="icon"/>
          {{t('jean.action.moveShip.cannotSkipHand')}}
        </li>
        <li>{{t('jean.action.moveShip.legacyTiles')}}</li>
      </ul>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import Direction from '@/services/jean/enum/Direction'
import AppIcon from '@/components/structure/AppIcon.vue'
import ActionBox from '@/components/structure/ActionBox.vue'

export default defineComponent({
  name: 'MoveShip',
  components: {
    AppIcon,
    ActionBox
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
    movementSteps() : number {
      return this.navigationState.currentCard.movementSteps
    },
    direction() : Direction {
      return this.navigationState.currentCard.direction
    },
  }
})
</script>

<style lang="scss" scoped>
.movement {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  .steps {
    font-size: 2rem;
    font-weight: bold;
  }
  .direction {
    width: 2rem;
    object-fit: contain;
  }
}
.instruction {
  li {
    margin-bottom: 0.25rem;
  }
  .icon {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.25rem;
    object-fit: contain;
    float: left;
    &.route {
      margin-top: 0.2rem;
      margin-bottom: -0.2rem;
    }
  }
}
</style>