<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('bot.jean')}}</h1>

  <p>{{ navigationState.cardDeck.currentCard?.id }}</p>

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
import NavigationState from '@/util/jean/NavigationState'
import SideBar from '@/components/jean/turn/SideBar.vue'

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
    const { turn } = navigationState

    return { t, router, state, turn, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/jean/turn/${this.turn - 1}/player`
    }
  },
  methods: {
    next() : void {
      this.router.push(`/jean/turn/${this.turn + 1}/player`)
    }
  }
})
</script>
