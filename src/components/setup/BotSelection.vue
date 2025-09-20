<template>
  <h3 class="mt-4 mb-3">{{t('setup.botSelection.title')}}</h3>

  <div class="row" v-for="bot of bots" :key="bot">
    <div class="col">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" name="botSelection" :value="bot" v-model="state.setup.bot">
          {{t(`bot.${bot}`)}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Bot from '@/services/enum/Bot'

export default defineComponent({
  name: 'BotSelection',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    bots() : Bot[] {
      return Object.values(Bot)
    }
  }
})
</script>
