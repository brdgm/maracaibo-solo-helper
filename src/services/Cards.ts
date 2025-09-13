import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import Worker from './enum/Worker'
import SpecialActionPosition from './enum/SpecialActionPosition'

/**
 * Solo cards
 */
const cards : Card[] = [
  {
    id: 1,
    actions: [
      { action: Action.MAIN_DIARY,  workers: [Worker.A, Worker.B, Worker.D, Worker.C] },
      { action: Action.REST }
    ]
  },
  {
    id: 2,
    actions: [
      { action: Action.MAIN_DIARY, workers: [Worker.B, Worker.A, Worker.D, Worker.C] },
      { action: Action.REST }
    ]
  },
  {
    id: 3,
    actions: [
      { action: Action.SMALL_DIARY },
      { action: Action.MAIN_DIARY,  workers: [Worker.A, Worker.B, Worker.C, Worker.D] },
      { action: Action.REST }
    ]
  },
  {
    id: 4,
    actions: [
      { action: Action.SMALL_DIARY },
      { action: Action.MAIN_DIARY,  workers: [Worker.A, Worker.C, Worker.B, Worker.D] },
      { action: Action.REST }
    ]
  },
  {
    id: 5,
    actions: [
      { action: Action.SMALL_DIARY },
      { action: Action.MAIN_DIARY,  workers: [Worker.B, Worker.A, Worker.C, Worker.D] },
      { action: Action.REST }
    ]
  },
  {
    id: 6,
    actions: [
      { action: Action.SMALL_DIARY },
      { action: Action.SPECIAL_ACTION_DIARY,  position: SpecialActionPosition.LEFT, bonusTrackSteps: 4 },
      { action: Action.REST }
    ]
  },
  {
    id: 7,
    actions: [
      { action: Action.DELIVER_SPECIMENS },
      { action: Action.MAIN_DIARY,  workers: [Worker.A, Worker.B, Worker.C, Worker.D] },
      { action: Action.REST }
    ]
  },
  {
    id: 8,
    actions: [
      { action: Action.DELIVER_SPECIMENS },
      { action: Action.SPECIAL_ACTION_DIARY, position: SpecialActionPosition.RIGHT, bonusTrackSteps: 4 },
      { action: Action.REST }
    ]
  },
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
