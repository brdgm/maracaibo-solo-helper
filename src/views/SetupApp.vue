<template>
  <h1>{{t('setup.title')}}</h1>

  <BotSelection/>
  <DifficultyLevel/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupGame()">
    {{t('setupGame.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import { useRouter } from 'vue-router'
import BotSelection from '@/components/setup/BotSelection.vue'

export default defineComponent({
  name: 'SetupApp',
  components: {
    FooterButtons,
    BotSelection,
    DifficultyLevel
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  methods: {
    setupGame() : void {
      this.state.resetGame()
      this.router.push('/setupGame')
    }
  }
})
</script>
