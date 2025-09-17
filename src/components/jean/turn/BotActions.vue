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
      <div v-for="(action,index) in botActions.actions" :key="index" class="mt-3">
        <component :is="`action-${action.action}`" :navigationState="navigationState" :action="action"/>
      </div>
      
      <template v-if="botActions.hasExploreSteps() && !explorerQuestChecked">
        <CheckFoundQuest v-if="botActions.hasExploreSteps()" @foundQuest="foundQuestExplore" @noQuest="notFoundQuestExplore"/>
      </template>
      
      <template v-if="!botActions.hasExploreSteps() || explorerQuestChecked">
        <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
          {{t('action.next')}}
        </button>
        <ReachedFinalSpaceButton :round="navigationState.round" @endRound="next(true)"/>
      </template>
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
import BotActions from '@/services/jean/BotActions'
import ReachedFinalSpaceButton from './ReachedFinalSpaceButton.vue'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_params: JeanBotPersistence, _endRound: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
    ActionVp,
    ReachedFinalSpaceButton
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()

    const { currentCard, round } = props.navigationState
    const botActions = new BotActions(currentCard, round)

    return { t, botActions }
  },
  data() {
    return {
      noQuest: false,
      cityCompleted: false,
      placedCityDisc: false,
      exploreFoundQuest : false,
      explorerQuestChecked: false
    }
  },
  computed: {
    movementSteps() : number {
      return this.navigationState.currentCard.movementSteps
    },
    direction() : Direction {
      return this.navigationState.currentCard.direction
    }
  },
  methods: {
    next(endRound: boolean) : void {
      this.$emit('next', this.botActions.getParams(this.placedCityDisc, this.exploreFoundQuest), endRound)
    },
    foundQuest() : void {
      this.$emit('next', {
        questCount: 1,
        projectCardCount: 0,
        discRemovedCount: 0,
        vp: 0
      }, false)
    },
    cityPlacedDisc() : void {
      this.placedCityDisc = true
      this.cityCompleted = true
    },
    removedCard() : void {
      this.placedCityDisc = false
      this.cityCompleted = true
    },
    foundQuestExplore() : void {
      this.exploreFoundQuest = true
      this.explorerQuestChecked = true
    },
    notFoundQuestExplore() : void {
      this.exploreFoundQuest = false
      this.explorerQuestChecked = true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 1.75rem;
}
</style>