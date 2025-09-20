import { shuffle } from 'lodash'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'
import Card from './Card'
import CardLevel from './enum/CardLevel'
import DifficultyLevel from './enum/DifficultyLevel'
import JeanCards from './jean/JeanCards'
import JacquesCards from './jacques/JacquesCards'
import Bot from './enum/Bot'

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
   * Prepare for a new round with Jacques bot.
   * The discard pile is shuffled and added to the bottom of the draw pile.
   */
  public prepareForNewRoundJacques() : void {
    this._pile.value.push(...shuffle(this._discard.value))
    this._discard.value = []
  }

  /**
   * Creates a shuffled new card deck.
   */
  public static new(bot: Bot, difficultyLevel: DifficultyLevel) : CardDeck {
    if (bot == Bot.JEAN) {
      switch (difficultyLevel) {
        case DifficultyLevel.LEVEL_1:
          return this.newInternal(5, 0, 0, JeanCards.getAll)
        case DifficultyLevel.LEVEL_2:
          return this.newInternal(5, 0, 1, JeanCards.getAll)
        case DifficultyLevel.LEVEL_3:
          return this.newInternal(5, 1, 1, JeanCards.getAll)
        case DifficultyLevel.LEVEL_4:
          return this.newInternal(5, 2, 1, JeanCards.getAll)
        case DifficultyLevel.LEVEL_5:
          return this.newInternal(5, 3, 1, JeanCards.getAll)
        default:
          throw new Error(`Unsupported difficulty level: ${difficultyLevel}`)
      }
    }
    else {
      switch (difficultyLevel) {
        case DifficultyLevel.LEVEL_1:
          return this.newInternal(7, 0, 0, JacquesCards.getAll)
        case DifficultyLevel.LEVEL_2:
          return this.newInternal(5, 2, 0, JacquesCards.getAll)
        case DifficultyLevel.LEVEL_3:
          return this.newInternal(3, 4, 0, JacquesCards.getAll)
        case DifficultyLevel.LEVEL_4:
          return this.newInternal(2, 5, 0, JacquesCards.getAll)
        default:
          throw new Error(`Unsupported difficulty level: ${difficultyLevel}`)
      }
    }
  }

  /**
   * Creates a shuffled new card deck.
   */
  private static newInternal(cardLevelA: number, cardLevelB: number, cardLevelC: number, getAllMethod: (level: CardLevel) => Card[]) : CardDeck {
    const cardsLevelA = shuffle(getAllMethod(CardLevel.A))
    const cardsLevelB = shuffle(getAllMethod(CardLevel.B))
    const cardsLevelC = shuffle(getAllMethod(CardLevel.C))
    const cards = [ ...cardsLevelA.slice(0, cardLevelA), ...cardsLevelB.slice(0, cardLevelB), ...cardsLevelC.slice(0, cardLevelC) ]
    return new CardDeck(cards, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(bot: Bot, persistence : CardDeckPersistence) : CardDeck {
    const getMethod : ((id: string) => Card) = (bot == Bot.JEAN) ? JeanCards.get : JacquesCards.get
    return new CardDeck(
      persistence.pile.map(getMethod),
      persistence.discard.map(getMethod)
    )
  }

}
