<template>
  <p>Setup the game up as for a 2-player game, with the following changes:</p>
  <ul>
    <li>Choose a color for Jean.</li>
    <li>Setup her ship, explorer, victory point marker and influence markers as usual.</li>
    <li>She does not use her figures.</li>
    <li>She doesn't need a ship board.</li>
    <li>She does not collect doubloons or combat points.</li>
    <li>She does not receive any project cards at the start of the game.</li>
  </ul>
  <p>The Automa board and Automa cards are not required, they are managed by the application.</p>
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
