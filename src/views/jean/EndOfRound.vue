<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('jean.endOfRound.title', {round})}}</h1>

  <ul class="mt-3">
    <li v-html="t('jean.endOfRound.interimScoring')"></li>
    <li v-html="t('jean.endOfRound.botVP', {count: botVP})"></li>
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
import NavigationState from '@/util/jean/NavigationState'
import SideBar from '@/components/jean/turn/SideBar.vue'
import getRoundVP from '@/util/jean/getRoundVP'

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
    },
    botVP() : number {
      return getRoundVP(this.navigationState.jean)
    }
  },
  methods: {
    next() : void {
      this.router.push(this.routeCalculator.getNextRouteTo())
    }
  }
})
</script>
