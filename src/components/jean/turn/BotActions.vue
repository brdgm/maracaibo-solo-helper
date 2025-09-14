<template>
  <div class="mt-3">
    <MoveShip :navigationState="navigationState"/>
  </div>

  <template v-if="!noQuest">
    <CheckFoundQuest @foundQuest="foundQuest" @noQuest="noQuest = true"/>
  </template>
  <template v-else>
    <template v-if="!cityCompleted">
      <CheckCityMarketSpace :card="navigationState.currentCard" @marketSpace="cityPlacedDisc" @removeCard="removedCard"/>
    </template>
    <template v-else>
      <div v-for="(action,index) in actions" :key="index" class="mt-3">
        <component :is="`action-${action.action}`" :navigationState="navigationState" :action="action"/>
      </div>

      <button class="btn btn-primary btn-lg mt-4" @click="next">
        {{t('action.next')}}
      </button>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jean/NavigationState'
import Direction from '@/services/jean/enum/Direction'
import AppIcon from '@/components/structure/AppIcon.vue'
import MoveShip from './action/MoveShip.vue'
import { JeanBotPersistence } from '@/store/state'
import CheckFoundQuest from './CheckFoundQuest.vue'
import ActionCombat from './action/ActionCombat.vue'
import ActionExplore from './action/ActionExplore.vue'
import ActionInfluence from './action/ActionInfluence.vue'
import ActionQuestPile from './action/ActionQuestPile.vue'
import ActionReduceCombat from './action/ActionReduceCombat.vue'
import ActionRemoveDisc from './action/ActionRemoveDisc.vue'
import ActionVp from './action/ActionVp.vue'
import CheckCityMarketSpace from './CheckCityMarketSpace.vue'
import { CardAction } from '@/services/jean/JeanCard'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_params: JeanBotPersistence) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    AppIcon,
    MoveShip,
    CheckFoundQuest,
    CheckCityMarketSpace,
    ActionCombat,
    ActionExplore,
    ActionInfluence,
    ActionQuestPile,
    ActionReduceCombat,
    ActionRemoveDisc,
    ActionVp
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
  data() {
    return {
      noQuest: false,
      cityCompleted: false,
      params: {
        questCount: 0,
        projectCardCount: 0,
        discRemovedCount: 0,
        vp: 0
      } as JeanBotPersistence
    }
  },
  computed: {
    movementSteps() : number {
      return this.navigationState.currentCard.movementSteps
    },
    direction() : Direction {
      return this.navigationState.currentCard.direction
    },
    actions() : CardAction[] {
      return this.navigationState.currentCard.actions.filter(item => item.roundFrom <= this.navigationState.round && item.roundTo >= this.navigationState.round)
    }
  },
  methods: {
    next() : void {
      this.$emit('next', this.params)
    },
    foundQuest() : void {
      this.params.questCount += 1
      this.$emit('next', this.params)
    },
    cityPlacedDisc() : void {
      this.params.discRemovedCount += 1
      this.cityCompleted = true
    },
    removedCard() : void {
      this.params.projectCardCount += 1
      this.cityCompleted = true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 1.75rem;
}
</style>