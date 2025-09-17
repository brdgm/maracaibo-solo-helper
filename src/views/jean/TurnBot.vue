<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('bot.jean')}}</h1>

  <BotActions :navigationState="navigationState" @next="next"/>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { JeanBotPersistence, useStateStore } from '@/store/state'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/jean/NavigationState'
import SideBar from '@/components/jean/turn/SideBar.vue'
import BotActions from '@/components/jean/turn/BotActions.vue'
import Player from '@/services/enum/Player'
import DebugInfo from '@/components/jean/turn/DebugInfo.vue'
import mergeBotPersistence from '@/util/jean/mergeBotPersistence'

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
    const { turn } = navigationState

    return { t, router, state, turn, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/jean/turn/${this.turn - 1}/player`
    }
  },
  methods: {
    next(botPersistence: JeanBotPersistence) : void {
      this.state.storeTurn({
        turn: this.turn,
        round: this.navigationState.round,
        player: Player.BOT,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          jean: mergeBotPersistence(this.navigationState.jean, botPersistence)
        }
      })
      this.router.push(`/jean/turn/${this.turn + 1}/player`)
    }
  }
})
</script>
