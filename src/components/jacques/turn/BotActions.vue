<template>
  <div class="mt-3">
    <ActionEndRoundInfo v-if="navigationState.botEndRound || navigationState.botEndRoundNextTurn" :navigationState="navigationState"/>
    <component v-else-if="action" :is="`action-${action.action}`" :navigationState="navigationState" :action="action"/>
  </div>
  <div class="mt-3">
    <ActionVp :vp="turnVp"/>
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
import ActionEndRoundInfo from './action/ActionEndRoundInfo.vue'

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
    ActionVp,
    ActionEndRoundInfo
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
      if (this.navigationState.botEndRound || this.navigationState.botEndRoundNextTurn) {
        return undefined
      }
      return this.navigationState.currentCard.actions[this.navigationState.botAction]
    },
    turnVp() : number {
      if (this.navigationState.botEndRound) {
        return 15
      }
      else if (this.navigationState.botEndRoundNextTurn) {
        return 0
      }
      else {
        return this.navigationState.currentCard.vp
      }
    }
  },
  methods: {
    next() : void {
      const botField20 = this.action?.action == Action.END_ROUND
      this.$emit('next', {vp:this.turnVp}, botField20)
    }
  }
})
</script>
