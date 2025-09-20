import Bot from '@/services/enum/Bot'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State, Turn } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      bot: params?.bot ?? Bot.JEAN,
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.LEVEL_1
    },
    turns: params?.turns ?? []
  }
}

export interface MockStateParams {
  bot?: Bot
  difficultyLevel?: DifficultyLevel
  turns?: Turn[]
}
