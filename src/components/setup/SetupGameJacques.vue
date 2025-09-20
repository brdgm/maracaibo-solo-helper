<template>
  <p>{{t('setupGame.jacques.intro')}}</p>
  <ul>
    <li>{{t('setupGame.jacques.noPlayerMaterial')}}</li>
    <li>{{t('setupGame.jacques.explorerMarker')}}</li>
  </ul>
  <p>{{t('setupGame.jacques.automaNote')}}</p>
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
