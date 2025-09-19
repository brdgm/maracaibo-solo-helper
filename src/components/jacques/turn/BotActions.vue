<template>
  <div class="mt-3">
    <component v-if="action" :is="`action-${action.action}`" :navigationState="navigationState" :action="action"/>
  </div>
  <div class="mt-3">
    <ActionVp :vp="navigationState.currentCard.vp"/>
  </div>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
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
import ActionVp from './action/ActionVp.vue'
import Action from '@/services/jacques/enum/Action'

export default defineComponent({
  name: 'BotActions',
  emits: {
    next: (_params: JacquesBotPersistence, _botField20: boolean) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  components: {
    ActionCityDisc,
    ActionEndRound,
    ActionExplore,
    ActionQuest,
    ActionVp
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
    next() : void {
      const botField20 = this.action?.action == Action.END_ROUND
      this.$emit('next', {vp:this.navigationState.currentCard.vp}, botField20)
    }
  }
})
</script>
