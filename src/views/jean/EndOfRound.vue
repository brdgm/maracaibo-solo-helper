<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('jean.endOfRound.title')}}</h1>

  <p>End of round...</p>

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
    const { turn, routeCalculator } = navigationState

    return { t, router, state, turn, navigationState, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    }
  },
  methods: {
    next() : void {
      this.router.push(this.routeCalculator.getNextRouteTo())
    }
  }
})
</script>
