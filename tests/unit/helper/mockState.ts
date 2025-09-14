import Bot from '@/services/enum/Bot'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      bot: params?.bot ?? Bot.JEAN,
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.LEVEL_1
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  bot?: Bot
  difficultyLevel?: DifficultyLevel
  rounds?: Round[]
}
