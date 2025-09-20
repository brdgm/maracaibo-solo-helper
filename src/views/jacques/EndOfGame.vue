<template>
  <h1>{{t('jacques.endOfGame.title')}}</h1>

  <ul class="mt-3">
    <li v-html="t('jacques.endOfGame.finalScoring')"></li>
    <li v-html="t('jacques.endOfRound.botNoScoring')"></li>
  </ul>

  <p v-html="t('jacques.endOfGame.playerGainPoints.title')"></p>
  <ul>
    <li v-html="t('jacques.endOfGame.playerGainPoints.explorer')"></li>
    <li v-html="t('jacques.endOfGame.playerGainPoints.quests')"></li>
  </ul>

  <p v-html="t('jacques.endOfGame.playerLoosePoints.title')"></p>
  <ul>
    <li v-html="t('jacques.endOfGame.playerLoosePoints.explorer')"></li>
    <li v-html="t('jacques.endOfGame.playerLoosePoints.quests')"></li>
  </ul>
  <p class="small fst-italic" v-html="t('jacques.endOfGame.explorerNote')"></p>

  <p class="finalScore" v-html="t('jacques.endOfGame.finalScore', {score: jacques.vp})"></p>
  

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { JacquesBotPersistence, useStateStore } from '@/store/state'
import NavigationState from '@/util/jacques/NavigationState'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { routeCalculator } = navigationState

    return { t, router, state, navigationState, routeCalculator }
  },
  data() {
    return {
      botInfluenceMakerVP: undefined as number|undefined,
      playerQuestCount: undefined as number|undefined,
      playerShipUpgrades: undefined as number|undefined,
      botExplorerStepsAhead: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    },
    jacques() : JacquesBotPersistence {
      return this.navigationState.jacques
    }
  }
})
</script>

<style lang="scss" scoped>
.number {
  width: 5rem;
}
.finalScore {
  font-size: 1.25rem;
}
</style>