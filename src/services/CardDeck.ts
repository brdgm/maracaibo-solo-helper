import { shuffle } from 'lodash'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'
import Card from './Card'
import CardLevel from './enum/CardLevel'

/**
 * Manages the solo card deck.
 */
export default class CardDeck {

  private readonly _pile
  private readonly _discard

  private constructor(pile : Card[], discard : Card[]) {
    this._pile = ref(pile)
    this._discard = ref(discard)
  }

  public get currentCard() : Card|undefined {
    return this._discard.value[0]
  }

  public get pile() : readonly Card[] {
    return this._pile.value
  }

  public get discard() : readonly Card[] {
    return this._discard.value
  }

  /**
   * Draws next card.
   * @returns Next action card
   */
  public draw() : Card {
    const card = this._pile.value.shift()
    if (!card) {
      // empty pile? shuffle and draw again
      this._pile.value = shuffle(this._discard.value)
      this._discard.value = []
      return this.draw()
    }
    this._discard.value.unshift(card)
    return card
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.value.map(card => card.id),
      discard: this._discard.value.map(card => card.id),
    }
  }

  /**
   * Creates a shuffled new card deck.
   */
  public static new(cardLevelA: number, cardLevelB: number, cardLevelC: number, getAllMethod: (level: CardLevel) => Card[]) : CardDeck {
    const cardsLevelA = shuffle(getAllMethod(CardLevel.A))
    const cardsLevelB = shuffle(getAllMethod(CardLevel.B))
    const cardsLevelC = shuffle(getAllMethod(CardLevel.C))
    const cards = [ ...cardsLevelA.slice(0, cardLevelA), ...cardsLevelB.slice(0, cardLevelB), ...cardsLevelC.slice(0, cardLevelC) ]
    return new CardDeck(cards, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence, getMethod: (id: string) => Card) : CardDeck {
    return new CardDeck(
      persistence.pile.map(getMethod),
      persistence.discard.map(getMethod)
    )
  }

}
