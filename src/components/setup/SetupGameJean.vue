<template>
  <p>{{t('setupGame.jean.intro')}}</p>
  <ul>
    <li>{{t('setupGame.jean.chooseColor')}}</li>
    <li>{{t('setupGame.jean.setupMarkers')}}</li>
    <li>{{t('setupGame.jean.noFigures')}}</li>
    <li>{{t('setupGame.jean.noShipBoard')}}</li>
    <li>{{t('setupGame.jean.noDoubloons')}}</li>
    <li>{{t('setupGame.jean.noProjectCards')}}</li>
  </ul>
  <p>{{t('setupGame.jean.automaNote')}}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SetupGameJean',
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
