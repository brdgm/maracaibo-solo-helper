<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('player.bot')}}</h1>

  <button class="btn btn-primary btn-lg mt-4" @click="next">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'

export default defineComponent({
  name: 'TurnBot',
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
      return `/jacques/turn/${this.turn - 1}/player`
    }
  },
  methods: {
    next() : void {
      this.router.push(`/jacques/turn/${this.turn + 1}/player`)
    }
  }
})
</script>
