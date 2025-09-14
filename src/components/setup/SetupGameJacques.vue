<template>
  <h3>{{t('setupGame.mainBoard.title')}} - JACQUES</h3>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SetupGameJacques',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
