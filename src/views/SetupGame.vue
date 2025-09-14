<template>
  <h1>{{t('setupGame.title', {bot:t(`bot.${state.setup.bot}`)})}}</h1>

  <div class="instructions mt-4">
    <SetupGameJean v-if="isBotJean"/>
    <SetupGameJacques v-else/>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setup" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import SetupGameJean from '@/components/setup/SetupGameJean.vue'
import SetupGameJacques from '@/components/setup/SetupGameJacques.vue'
import Bot from '@/services/enum/Bot'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    SetupGameJean,
    SetupGameJacques
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    isBotJean() : boolean {
      return this.state.setup.bot == Bot.JEAN
    }
  },
  methods: {
    startGame() : void {
      this.router.push('/round/1/turn/1/bot')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
