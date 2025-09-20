import CardLevel from '@/services/enum/CardLevel'
import JacquesCards from '@/services/jacques/JacquesCards'
import { expect } from 'chai'

describe('services/JacquesCards', () => {
  it('get', () => {
    const card = JacquesCards.get('A1')

    expect(card).not.undefined
    expect(card?.id).to.eq('A1')
  })

  it('getAll', () => {
    expect(JacquesCards.getAll(CardLevel.A).length).to.eq(7)
    expect(JacquesCards.getAll(CardLevel.B).length).to.eq(5)
    expect(JacquesCards.getAll(CardLevel.C).length).to.eq(0)
  })
})
