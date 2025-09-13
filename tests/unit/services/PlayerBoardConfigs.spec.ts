import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import BotPlayerBoardConfigs from '@/services/BotPlayerBoardConfigs'

describe('services/PlayerBoards', () => {
  it('get', () => {
    for (const difficultyLevel of getAllEnumValues(DifficultyLevel)) {
      const playerBoard = BotPlayerBoardConfigs.get(difficultyLevel)

      expect(playerBoard).not.undefined
      expect(playerBoard?.difficultyLevel).to.eq(difficultyLevel)
    }
  })
})
