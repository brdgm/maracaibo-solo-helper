import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import Player from '@/services/enum/Player'
import WaxSeal from '@/services/enum/WaxSeal'
import Worker from '@/services/enum/Worker'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        expansions: [],
        difficultyLevel: DifficultyLevel.LEVEL_1_WHITE
      },
      alienDiscovery: {
        species: [undefined, undefined]
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    setupToggleExpansion(expansion: Expansion) : void {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeRound(round : Round) : void {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeRoundTurn(roundTurn : RoundTurn) : void {
      const round = this.rounds.find(item => item.round == roundTurn.round)
      if (!round) {
        throw new Error(`Round ${roundTurn.round} not found.`)
      }
      round.turns = round.turns.filter(item => item.turn < roundTurn.turn)
      round.turns.push(roundTurn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  expansions: Expansion[]
  difficultyLevel: DifficultyLevel
  debugMode?: boolean
}


export interface Round {
  round: number
  initialBotPersistence: BotPersistence
  turns: RoundTurn[]
}
export interface RoundTurn {
  round: number
  turn: number
  botPersistence: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
export interface MainBoardState {
  exploration: Player[][]
  navigation: Player[][]
  correspondence: Player[][]
  academy: Player[][]
  specialAction: Player[][]
  unlockLens: Player[][]
  deliverSpecimen: Player[]
  researchMuseumSpecimen: Player[]
  turnOrder: Player[]
  gainObjective: Player[]
}
export interface BotPlayerBoardState {
  bonusTrackPosition: number
  money: number
  tents: number
  stamps: number
  availableWorkers: Worker[]
  restingWorkers: number
  workerState: WorkerState[]
  bonusCards: string[]
}
export interface WorkerState {
  worker: Worker
  waxSeals: WaxSeal[]
}
