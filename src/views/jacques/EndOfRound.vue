<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('jacques.endOfRound.title', {round})}}</h1>

  <ul class="mt-3">
    <li v-html="t('jacques.endOfRound.interimScoring')"></li>
    <li v-html="t('jacques.endOfRound.botNoScoring')"></li>
  </ul>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/jacques/NavigationState'
import SideBar from '@/components/jacques/turn/SideBar.vue'

export default defineComponent({
  name: 'EndOfRound',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn, routeCalculator } = navigationState

    return { t, router, state, round, turn, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    }
  },
  methods: {
    next() : void {
      // prepare jacques card deck for next round
      this.navigationState.cardDeck.prepareForNewRoundJacques()
      this.state.storeTurn({
        turn: this.turn,
        round: this.navigationState.round,
        player: this.routeCalculator.currentPlayer,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          jacques: this.navigationState.jacques
        },
        endOfRound: true
      })
      this.router.push(this.routeCalculator.getNextRouteTo())
    }
  }
})
</script>
