<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('player.player')}}</h1>

  <button class="btn btn-primary btn-lg mt-4" @click="next">
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
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'

export default defineComponent({
  name: 'RoundTurnPlayer',
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
    const { round, turn } = navigationState

    return { t, router, state, round, turn, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn == 5) {
        return `/round/${this.round}/turn/${this.turn - 1}/player`
      }
      else {
        return `/round/${this.round}/turn/${this.turn}/bot`
      }
    }
  },
  methods: {
    next() : void {
      if (this.turn == 5) {
        this.router.push(`/round/${this.round}/rewards`)
      }
      else if (this.turn == 4) {
        // bot never has a 5th worker
        this.router.push(`/round/${this.round}/turn/${this.turn + 1}/player`)
      }
      else {
        this.router.push(`/round/${this.round}/turn/${this.turn + 1}/bot`)
      }
    }
  }
})
</script>
