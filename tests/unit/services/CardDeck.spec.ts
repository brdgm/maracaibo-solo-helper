import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'
import JeanCards from '@/services/jean/JeanCards'
import CardLevel from '@/services/enum/CardLevel'
import JacquesCards from '@/services/jacques/JacquesCards'

describe('services/CardDeck', () => {
  it('new-jean', () => {
    const deck = CardDeck.new(5, 2, 1, JeanCards.getAll)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(8)
    expect(deck.discard.length, 'discard').to.eq(0)

    expect(deck.pile.filter(card => card.cardLevel == CardLevel.A).length, 'level-A').to.eq(5)
    expect(deck.pile.filter(card => card.cardLevel == CardLevel.B).length, 'level-B').to.eq(2)
    expect(deck.pile.filter(card => card.cardLevel == CardLevel.C).length, 'level-C').to.eq(1)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(8)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('new-jacques', () => {
    const deck = CardDeck.new(5, 2, 0, JacquesCards.getAll)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(7)
    expect(deck.discard.length, 'discard').to.eq(0)

    expect(deck.pile.filter(card => card.cardLevel == CardLevel.A).length, 'level-A').to.eq(5)
    expect(deck.pile.filter(card => card.cardLevel == CardLevel.B).length, 'level-B').to.eq(2)
    expect(deck.pile.filter(card => card.cardLevel == CardLevel.C).length, 'level-C').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(7)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = mockCardDeck(JeanCards.get, {pile:['A1','B2','C3']})

    expect(deck.pile.length, 'pile').to.eq(3)
    expect(deck.discard.length, 'discard').to.eq(0)

    expect(deck.draw().id, 'draw-1').to.eq('A1')
    expect(deck.draw().id, 'draw-2').to.eq('B2')
    expect(deck.draw().id, 'draw-3').to.eq('C3')

    expect(deck.pile.length, 'pile').to.eq(0)
    expect(deck.discard.length, 'discard').to.eq(3)

    expect(deck.draw().id, 'draw-4').to.not.undefined

    expect(deck.pile.length, 'pile').to.eq(2)
    expect(deck.discard.length, 'discard').to.eq(1)
  })
})
