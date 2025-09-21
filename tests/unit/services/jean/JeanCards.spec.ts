import CardLevel from '@/services/enum/CardLevel'
import JeanCards from '@/services/jean/JeanCards'
import { expect } from 'chai'

describe('services/jean/JeanCards', () => {
  it('get', () => {
    const card = JeanCards.get('A1')

    expect(card).not.undefined
    expect(card?.id).to.eq('A1')
  })

  it('getAll', () => {
    expect(JeanCards.getAll(CardLevel.A).length).to.eq(5)
    expect(JeanCards.getAll(CardLevel.B).length).to.eq(7)
    expect(JeanCards.getAll(CardLevel.C).length).to.eq(5)
  })
})
