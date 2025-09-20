<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-3 col-sm-2 col-md-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
    </div>
    <div class="col-6 col-sm-8 col-md-5">
      <input type="range" class="form-range" min="1" :max="maxLevel" id="difficultyLevel"
          :value="difficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-3 col-sm-2 col-md-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
    </div>
  </div>  
  <div class="row">
    <div class="col-6 offset-3 col-sm-8 offset-sm-2 col-md-5 offset-md-1">
      <i>
        {{t(`difficultyLevel.${bot}.${difficultyLevel}`)}}
      </i>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Bot from '@/services/enum/Bot'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const bot = computed(() => state.setup.bot)
    const difficultyLevel = ref(state.setup.difficultyLevel)

    // Helper function to get max level for a bot
    const getMaxLevel = (botType: Bot): number => {
      return botType === Bot.JEAN ? 5 : 4
    }

    // Watch for bot changes and adjust difficulty level if needed
    watch(bot, (newBot) => {
      const newMaxLevel = getMaxLevel(newBot)
      if (difficultyLevel.value > newMaxLevel) {
        difficultyLevel.value = newMaxLevel
        state.setup.difficultyLevel = newMaxLevel
      }
    })

    const maxLevel = computed(() => getMaxLevel(bot.value))

    return { t, state, bot, difficultyLevel, maxLevel }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      this.difficultyLevel = parseInt((event.target as HTMLInputElement).value)
      this.state.setup.difficultyLevel = this.difficultyLevel
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.5rem;
  margin-top: -0.25rem;
  margin-right: 0.25rem;
}
</style>
