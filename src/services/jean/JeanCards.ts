import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import JeanCard from './JeanCard'
import Action from './enum/Action'
import CardLevel from '../enum/CardLevel'
import Direction from './enum/Direction'
import Nation from '../enum/Nation'

/**
 * Solo cards (Jean)
 */
const cards : JeanCard[] = [
  {
    id: 'A1',
    cardLevel: CardLevel.A,
    movementSteps: 1,
    direction: Direction.RIGHT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.EXPLORE, exploreSteps: 2 }
    ]
  },
  {
    id: 'A2',
    cardLevel: CardLevel.A,
    movementSteps: 1,
    direction: Direction.LEFT,
    displayCard: 2,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.INFLUENCE, nation: Nation.FRANCE, influence: 1 }
    ]
  },
  {
    id: 'A3',
    cardLevel: CardLevel.A,
    movementSteps: 1,
    direction: Direction.LEFT,
    displayCard: 4,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.COMBAT, influence: 2 }
    ]
  },
  {
    id: 'A4',
    cardLevel: CardLevel.A,
    movementSteps: 2,
    direction: Direction.RIGHT,
    displayCard: 1,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.INFLUENCE, nation: Nation.SPAIN, influence: 1 }
    ]
  },
  {
    id: 'A5',
    cardLevel: CardLevel.A,
    movementSteps: 2,
    direction: Direction.LEFT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.INFLUENCE, nation: Nation.ENGLAND, influence: 1 }
    ]
  },
  {
    id: 'B1',
    cardLevel: CardLevel.B,
    movementSteps: 2,
    direction: Direction.RIGHT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 4 },
      { roundFrom: 1, roundTo: 2, action: Action.EXPLORE, exploreSteps: 2},
      { roundFrom: 3, roundTo: 4, action: Action.EXPLORE, exploreSteps: 4},
    ]
  },
  {
    id: 'B2',
    cardLevel: CardLevel.B,
    movementSteps: 2,
    direction: Direction.RIGHT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.QUEST_PILE },
      { roundFrom: 3, roundTo: 4, action: Action.VP, vp: 4 },
    ]
  },
  {
    id: 'B3',
    cardLevel: CardLevel.B,
    movementSteps: 2,
    direction: Direction.RIGHT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.REMOVE_DISC },
      { roundFrom: 3, roundTo: 4, action: Action.VP, vp: 4 },
    ]
  },
  {
    id: 'B4',
    cardLevel: CardLevel.B,
    movementSteps: 2,
    direction: Direction.LEFT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 4 },
      { roundFrom: 1, roundTo: 2, action: Action.EXPLORE, exploreSteps: 2},
      { roundFrom: 3, roundTo: 4, action: Action.EXPLORE, exploreSteps: 4},
    ]
  },
  {
    id: 'B5',
    cardLevel: CardLevel.B,
    movementSteps: 2,
    direction: Direction.LEFT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.REMOVE_DISC },
      { roundFrom: 3, roundTo: 4, action: Action.VP, vp: 4 },
    ]
  },
  {
    id: 'B6',
    cardLevel: CardLevel.B,
    movementSteps: 2,
    direction: Direction.LEFT,
    displayCard: 4,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.COMBAT, influence: 3 },
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 2 },
    ]
  },
  {
    id: 'B7U',
    cardLevel: CardLevel.B,
    movementSteps: 1,
    direction: Direction.LEFT,
    displayCard: 1,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 5 },
      { roundFrom: 1, roundTo: 2, action: Action.REDUCE_COMBAT, reduceCombat: 1 },
      { roundFrom: 3, roundTo: 4, action: Action.REDUCE_COMBAT, reduceCombat: 4 },
    ]
  },
  {
    id: 'C1',
    cardLevel: CardLevel.C,
    movementSteps: 2,
    direction: Direction.RIGHT,
    displayCard: 1,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 4 },
      { roundFrom: 1, roundTo: 4, action: Action.REMOVE_DISC },
    ]
  },
  {
    id: 'C2',
    cardLevel: CardLevel.C,
    movementSteps: 2,
    direction: Direction.LEFT,
    displayCard: 2,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.QUEST_PILE },
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 3 },
    ]
  },
  {
    id: 'C3',
    cardLevel: CardLevel.C,
    movementSteps: 2,
    direction: Direction.RIGHT,
    displayCard: 3,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 4 },
      { roundFrom: 1, roundTo: 2, action: Action.EXPLORE, exploreSteps: 3 },
      { roundFrom: 3, roundTo: 4, action: Action.EXPLORE, exploreSteps: 4 },
    ]
  },
  {
    id: 'C4',
    cardLevel: CardLevel.C,
    movementSteps: 2,
    direction: Direction.LEFT,
    displayCard: 4,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.COMBAT, combatAdditionalVillage: true, influence: 3 },
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 2 },
    ]
  },
  {
    id: 'C5U',
    cardLevel: CardLevel.C,
    movementSteps: 1,
    direction: Direction.RIGHT,
    displayCard: 2,
    actions: [
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 5 },
      { roundFrom: 1, roundTo: 2, action: Action.REDUCE_COMBAT, reduceCombat: 2 },
      { roundFrom: 3, roundTo: 4, action: Action.REDUCE_COMBAT, reduceCombat: 4 },
    ]
  },
]

const cardsMap = new Map<string,JeanCard>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : JeanCard {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardLevel Card level
   * @returns Cards
   */
  getAll(cardLevel: CardLevel) : JeanCard[] {
    return cards.filter(card => card.cardLevel === cardLevel)
  }

}
