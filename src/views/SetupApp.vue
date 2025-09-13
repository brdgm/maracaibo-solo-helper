<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <ExpansionsSetup/>

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
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'

export default defineComponent({
  name: 'SetupApp',
  components: {
    FooterButtons,
    DifficultyLevel,
    ExpansionsSetup
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
