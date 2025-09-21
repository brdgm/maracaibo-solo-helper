<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('bot.jacques')}}</h1>

  <BotActions :navigationState="navigationState" @next="next"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { JacquesBotPersistence, Turn, useStateStore } from '@/store/state'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/jacques/NavigationState'
import SideBar from '@/components/jacques/turn/SideBar.vue'
import Player from '@/services/enum/Player'
import mergeBotPersistence from '@/util/jacques/mergeBotPersistence'
import DebugInfo from '@/components/jacques/turn/DebugInfo.vue'
import BotActions from '@/components/jacques/turn/BotActions.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    BotActions,
    DebugInfo
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
    next(botPersistence: JacquesBotPersistence, botField20: boolean) : void {
      const turn : Turn = {
        turn: this.turn,
        round: this.navigationState.round,
        player: Player.BOT,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          jacques: mergeBotPersistence(this.navigationState.jacques, botPersistence)
        }
      }
      if (botField20) {
        turn.botField20 = true
      }
      this.state.storeTurn(turn)
      if (this.navigationState.botEndRound) {
        this.router.push(this.routeCalculator.getNextRouteToEndOfRound())
      }
      else {
        this.router.push(this.routeCalculator.getNextRouteTo())
      }
    }
  }
})
</script>
