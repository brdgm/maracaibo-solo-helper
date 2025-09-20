import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'
import CardLevel from '@/services/enum/CardLevel'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Bot from '@/services/enum/Bot'

describe('services/CardDeck', () => {
  it('new-jean', () => {
    const deck = CardDeck.new(Bot.JEAN, DifficultyLevel.LEVEL_3)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(7)
    expect(deck.discard.length, 'discard').to.eq(0)

    expect(deck.pile.filter(card => card.cardLevel == CardLevel.A).length, 'level-A').to.eq(5)
    expect(deck.pile.filter(card => card.cardLevel == CardLevel.B).length, 'level-B').to.eq(1)
    expect(deck.pile.filter(card => card.cardLevel == CardLevel.C).length, 'level-C').to.eq(1)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(7)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('new-jacques', () => {
    const deck = CardDeck.new(Bot.JACQUES, DifficultyLevel.LEVEL_2)

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
    const deck = mockCardDeck(Bot.JEAN, {pile:['A1','B2','C3']})

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

  it('prepareForNewRoundJacques', () => {
    const deck = mockCardDeck(Bot.JACQUES, {pile:['A1','B2'], discard:['A2','A3']})

    expect(deck.pile.length, 'pile').to.eq(2)
    expect(deck.discard.length, 'discard').to.eq(2)

    deck.prepareForNewRoundJacques()

    expect(deck.pile.length, 'pile').to.eq(4)
    expect(deck.discard.length, 'discard').to.eq(0)

    expect(deck.pile[0].id).to.eq('A1')
    expect(deck.pile[1].id).to.eq('B2')
  })
})
