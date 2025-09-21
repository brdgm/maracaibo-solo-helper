import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Action from './enum/Action'
import JacquesCard from './JacquesCard'
import CardLevel from '../enum/CardLevel'

/**
 * Solo cards (Jacques)
 */
const cards : JacquesCard[] = [
  {
    id: 'A1',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.CITY_DISC, cityNumber: 5 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 7 },
      { action: Action.CITY_DISC, cityNumber: 11 },
      { action: Action.CITY_DISC, cityNumber: 13 },
      { action: Action.CITY_DISC, cityNumber: 17 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'A2',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'A3',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.CITY_DISC, cityNumber: 4 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.CITY_DISC, cityNumber: 11 },
      { action: Action.CITY_DISC, cityNumber: 17 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'A4',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.CITY_DISC, cityNumber: 14 },
      { action: Action.CITY_DISC, cityNumber: 17 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'A5',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.CITY_DISC, cityNumber: 4 },
      { action: Action.CITY_DISC, cityNumber: 5 },
      { action: Action.CITY_DISC, cityNumber: 11 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'A6',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.EXPLORE, exploreSteps: 1 },
      { action: Action.CITY_DISC, cityNumber: 13 },
      { action: Action.CITY_DISC, cityNumber: 17 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'A7',
    cardLevel: CardLevel.A,
    vp: 5,
    actions: [
      { action: Action.CITY_DISC, cityNumber: 4 },
      { action: Action.CITY_DISC, cityNumber: 5 },
      { action: Action.CITY_DISC, cityNumber: 11 },
      { action: Action.CITY_DISC, cityNumber: 14 },
      { action: Action.CITY_DISC, cityNumber: 17 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'B1',
    cardLevel: CardLevel.B,
    vp: 10,
    actions: [
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'B2',
    cardLevel: CardLevel.B,
    vp: 10,
    actions: [
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'B3',
    cardLevel: CardLevel.B,
    vp: 10,
    actions: [
      { action: Action.CITY_DISC, cityNumber: 5 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 7 },
      { action: Action.CITY_DISC, cityNumber: 11 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'B4',
    cardLevel: CardLevel.B,
    vp: 10,
    actions: [
      { action: Action.CITY_DISC, cityNumber: 4 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 7 },
      { action: Action.CITY_DISC, cityNumber: 11 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.QUEST, cityNumberFrom: 2, cityNumberTo: 19 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
  {
    id: 'B5',
    cardLevel: CardLevel.B,
    vp: 10,
    actions: [
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.EXPLORE, exploreSteps: 2 },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
      { action: Action.END_ROUND },
    ]
  },
]

const cardsMap = new Map<string,JacquesCard>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : JacquesCard {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardLevel Card level
   * @returns Cards
   */
  getAll(cardLevel: CardLevel) : JacquesCard[] {
    return cards.filter(card => card.cardLevel === cardLevel)
  }

}
