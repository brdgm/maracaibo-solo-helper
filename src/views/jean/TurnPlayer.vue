<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('turnPlayer.title')}}</h1>

  <p v-html="t('turnPlayer.takeTurn')" class="mt-3"></p>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
    {{t('action.next')}}
  </button>

  <ReachedFinalSpaceButton :round="navigationState.round" @endRound="next(true)"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/jean/NavigationState'
import SideBar from '@/components/jean/turn/SideBar.vue'
import Player from '@/services/enum/Player'
import ReachedFinalSpaceButton from '@/components/turn/ReachedFinalSpaceButton.vue'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    SideBar,
    ReachedFinalSpaceButton
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { turn, routeCalculator } = navigationState

    return { t, router, state, turn, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    }
  },
  methods: {
    next(endOfRound : boolean) : void {
      this.state.storeTurn({
        turn: this.turn,
        round: this.navigationState.round,
        player: Player.PLAYER
      })
      if (endOfRound) {
        this.router.push(this.routeCalculator.getNextRouteToEndOfRound())
      }
      else {
        this.router.push(this.routeCalculator.getNextRouteTo())
      }
    }
  }
})
</script>
