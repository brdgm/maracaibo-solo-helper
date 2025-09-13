<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundRewards.title')}}</h1>

  <div class="instructions">
    <ul class="mt-4">
      <li v-html="t('roundRewards.intro')"></li>
    </ul>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
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
  name: 'RoundRewards',
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
      return `/round/${this.round}/turn/5/player`
    }
  },
  methods: {
    next() : void {
      if (this.round == 5) {
        this.router.push('/gameEnd')
      }
      else {
        this.router.push(`/round/${this.round}/cleanup`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  & > ul > li {
    margin-top: 0.5rem;
  }
}
</style>
