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
import NavigationState from '@/util/jacques/NavigationState'
import SideBar from '@/components/jacques/turn/SideBar.vue'

export default defineComponent({
  name: 'TurnPlayer',
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
    const { turn } = navigationState

    return { t, router, state, turn, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn > 1) {
        return `/jacques/turn/${this.turn - 1}/bot`
      }
      else {
        return ''
      }
    }
  },
  methods: {
    next() : void {
      this.router.push(`/jacques/turn/${this.turn + 1}/bot`)
    }
  }
})
</script>
