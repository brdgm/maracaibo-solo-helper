import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Bot from '@/services/enum/Bot'
import Player from '@/services/enum/Player'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        bot: Bot.JEAN,
        difficultyLevel: DifficultyLevel.LEVEL_1
      },
      turns: []
    } as State
  },
  actions: {
    resetGame() {
      this.turns = []
      this.setup.initialCardDeck = undefined
    },
    storeTurn(turn : Turn) : void {
      this.turns = this.turns.filter(item => item.turn < turn.turn)
      this.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  turns: Turn[]
}
export interface Setup {
  bot: Bot,
  difficultyLevel: DifficultyLevel
  initialCardDeck?: CardDeckPersistence
  debugMode?: boolean
}

export interface Turn {
  turn: number
  round: number
  player: Player
  botPersistence?: BotPersistence
  endOfRound?: boolean
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
  jean?: JeanBotPersistence
  jacques?: JacquesBotPersistence
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
}
export interface JeanBotPersistence {
  questCount: number
  projectCardCount: number
  discRemovedCount: number
  vp: number
}
export interface JacquesBotPersistence {
  vp: number
}
