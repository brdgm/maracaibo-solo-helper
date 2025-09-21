<template>
  <h1>{{t('jean.endOfGame.title')}}</h1>

  <ul class="mt-3">
    <li v-html="t('jean.endOfGame.finalScoring')"></li>
    <li v-html="t('jean.endOfRound.botVP', {count: botIncomeVP})"></li>
  </ul>

  <p v-html="t('jean.endOfGame.additionalBonusPoints')"></p>

  <table class="table table-bordered table-striped">
    <thead>
      <tr class="table-secondary">
        <th>{{t('jean.endOfGame.table.condition')}}</th>
        <th>{{t('jean.endOfGame.table.player')}}</th>
        <th>{{t('jean.endOfGame.table.bot')}}</th>
        <th>{{t('jean.endOfGame.table.botVP')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3">{{t('jean.endOfGame.table.influence')}}</td>
        <td><NumberInput v-model="botInfluenceMakerVP" class="number"/></td>
      </tr>
      <tr>
        <td>{{t('jean.endOfGame.table.questTiles')}}</td>
        <td><NumberInput v-model="playerQuestCount" class="number"/></td>
        <td>{{navigationState.jean.questCount}}</td>
        <td>{{botQuestVP}}</td>
      </tr>
      <tr>
        <td>{{t('jean.endOfGame.table.shipUpgrades')}}</td>
        <td><NumberInput v-model="playerShipUpgrades" class="number" :max="12"/></td>
        <td>{{botShipUpgrades}}</td>
        <td>{{botShipUpgradesVP}}</td>
      </tr>
      <tr>
        <td colspan="2">{{t('jean.endOfGame.table.explorerStepsAhead')}}</td>
        <td><NumberInput v-model="botExplorerStepsAhead" class="number" :min="-99" :max="99"/></td>
        <td>{{botExplorerVP}}</td>
      </tr>
    </tbody>
  </table>
  <p class="small fst-italic" v-html="t('jean.endOfGame.explorerNote')"></p>

  <p class="finalScore" v-html="t('jean.endOfGame.finalScore', {score: botTotalVP})"></p>

  <p class="small">{{t('setup.difficultyLevel.title')}}: <b>{{t(`difficultyLevel.jean.${state.setup.difficultyLevel}`)}}</b></p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { JeanBotPersistence, useStateStore } from '@/store/state'
import NavigationState from '@/util/jean/NavigationState'
import getRoundVP from '@/util/jean/getRoundVP'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { routeCalculator } = navigationState

    return { t, router, state, navigationState, routeCalculator }
  },
  data() {
    return {
      botInfluenceMakerVP: undefined as number|undefined,
      playerQuestCount: undefined as number|undefined,
      playerShipUpgrades: undefined as number|undefined,
      botExplorerStepsAhead: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo()
    },
    jean() : JeanBotPersistence {
      return this.navigationState.jean
    },
    botIncomeVP() : number {
      return getRoundVP(this.jean)
    },
    botQuestVP() : number {
      let vp = this.jean.questCount * 5
      if (this.jean.questCount >= toNumber(this.playerQuestCount) + 4) {
        vp += 30
      }
      else if (this.jean.questCount >= toNumber(this.playerQuestCount) + 3) {
        vp += 20
      }
      else if (this.jean.questCount > toNumber(this.playerQuestCount)) {
        vp += 10
      }
      return vp
    },
    botShipUpgrades() : number {
      return Math.floor(this.jean.discRemovedCount / 2)
    },
    botShipUpgradesVP() : number {
      if (this.botShipUpgrades >= toNumber(this.playerShipUpgrades) + 4) {
        return 30
      }
      else if (this.botShipUpgrades >= toNumber(this.playerShipUpgrades) + 3) {
        return 20
      }
      else if (this.botShipUpgrades > toNumber(this.playerShipUpgrades)) {
        return 10
      }
      return 0
    },
    botExplorerVP() : number {
      if (toNumber(this.botExplorerStepsAhead) >= 11) {
        return 30
      }
      else if (toNumber(this.botExplorerStepsAhead) >= 8) {
        return 20
      }
      else if (toNumber(this.botExplorerStepsAhead) > 0) {
        return 10
      }
      return 0
    },
    botTotalVP() : number {
      return this.jean.vp + this.botIncomeVP + toNumber(this.botInfluenceMakerVP)
        + this.botQuestVP + this.botShipUpgradesVP + this.botExplorerVP
    }
  }
})
</script>

<style lang="scss" scoped>
.number {
  width: 5rem;
}
.finalScore {
  font-size: 1.25rem;
}
</style>