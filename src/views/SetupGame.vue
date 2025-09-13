<template>
  <h1>{{t('setupGame.title')}}</h1>

  <div class="instructions mt-4">
    <h3>{{t('setupGame.mainBoard.title')}}</h3>
    <p v-html="t('setupGame.mainBoard.setup2Players')"></p>
    <ol type="A">
      <li v-html="t('setupGame.mainBoard.specialActionTiles')"></li>
      <li v-html="t('setupGame.mainBoard.objectiveTiles')"></li>
      <li v-html="t('setupGame.mainBoard.turnOrderToken')"></li>
      <li v-html="t('setupGame.mainBoard.botFirstPlayer')"></li>
    </ol>

    <h3>{{t('setupGame.crewCards.title')}}</h3>
    <ol type="A">
      <li v-html="t('setupGame.crewCards.draw5')"></li>
      <li v-html="t('setupGame.crewCards.select3')"></li>
      <li v-html="t('setupGame.crewCards.waxSeals')"></li>
    </ol>

    <h3>{{t('setupGame.objectiveTiles.title')}}</h3>
    <p v-html="t('setupGame.objectiveTiles.followInstructions')"></p>
    <ul>
      <li v-html="t('setupGame.objectiveTiles.selectOnePair')"></li>
    </ul>  
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

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
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
