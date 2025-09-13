import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(8)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(8)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    // 7 and 8 are deliver specimens cards which force a reshuffle after the turn
    const deck = mockCardDeck({pile:[1,7,8,3]})

    expect(deck.pile.length, 'pile').to.eq(4)
    expect(deck.discard.length, 'discard').to.eq(0)

    expect(deck.draw().id, 'draw-1').to.eq(1)
    expect(deck.draw().id, 'draw-2').to.eq(7)
    expect(deck.draw().id, 'draw-3').to.eq(8)

    expect(deck.pile.length, 'pile').to.eq(1)
    expect(deck.discard.length, 'discard').to.eq(3)

    expect(deck.draw().id, 'draw-4').to.be.within(1, 8)

    expect(deck.pile.length, 'pile').to.eq(3)
    expect(deck.discard.length, 'discard').to.eq(1)
  })
})
