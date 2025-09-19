<template>
  <div class="mt-3">
    <component v-if="action" :is="`action-${action.action}`" :navigationState="navigationState" :action="action"/>
  </div>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next(false)">
    {{t('action.next')}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/jacques/NavigationState'
import { JacquesBotPersistence } from '@/store/state'
import { CardAction } from '@/services/jacques/JacquesCard'
import ActionCityDisc from './action/ActionCityDisc.vue'
import ActionEndRound from './action/ActionEndRound.vue'
import ActionExplore from './action/ActionExplore.vue'
import ActionQuest from './action/ActionQuest.vue'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_params: JacquesBotPersistence, _endRound: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionCityDisc,
    ActionEndRound,
    ActionExplore,
    ActionQuest
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
    }
  },
  computed: {
    action() : CardAction|undefined {
      return this.navigationState.currentCard.actions[this.navigationState.botAction]
    }
  },
  methods: {
    next(endRound: boolean) : void {
      this.$emit('next', {vp:0}, endRound)
    }
  }
})
</script>
