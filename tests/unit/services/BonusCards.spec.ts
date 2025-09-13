import BonusCards from '@/services/BonusCards'
import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('services/BonusCards', () => {
  it('get', () => {
    const card = BonusCards.get('white-1')

    expect(card).not.undefined
    expect(card?.id).to.eq('white-1')
  })

  it('getAll', () => {
    getAllEnumValues(DifficultyLevel).forEach((level) => {
      expect(BonusCards.getAll(level).length).to.eq(2)
    })
  })
})
