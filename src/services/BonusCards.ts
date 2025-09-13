import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import BonusCard from './BonusCard'
import DifficultyLevel from './enum/DifficultyLevel'
import Bonus from './enum/Bonus'

/**
 * Solo bonus cards
 */
const cards : BonusCard[] = [
  {
    id: 'white-1',
    difficultyLevel: DifficultyLevel.LEVEL_1_WHITE,
    bonus: [
      { round: 1, bonus: Bonus.NAVIGATION, amount: 1 },
      { round: 2, bonus: Bonus.EXPLORATION, amount: 2 },
      { round: 3, bonus: Bonus.VICTORY_POINTS, amount: 4 },
      { round: 4, bonus: Bonus.VICTORY_POINTS, amount: 5 },
      { round: 5, bonus: Bonus.EVOLUTION_THEORY, amount: 4 },
    ]
  },
  {
    id: 'white-2',
    difficultyLevel: DifficultyLevel.LEVEL_1_WHITE,
    bonus: [
      { round: 1, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 2, bonus: Bonus.EVOLUTION_THEORY, amount: 1 },
      { round: 3, bonus: Bonus.CORRESPONDENCE, amount: 1 },
      { round: 3, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 4, bonus: Bonus.EXPLORATION, amount: 2 },
      { round: 5, bonus: Bonus.VICTORY_POINTS, amount: 6 },
    ]
  },
  {
    id: 'blue-1',
    difficultyLevel: DifficultyLevel.LEVEL_2_BLUE,
    bonus: [
      { round: 1, bonus: Bonus.NAVIGATION, amount: 2 },
      { round: 2, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 2, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 3, bonus: Bonus.EXPLORATION, amount: 3 },
      { round: 4, bonus: Bonus.EVOLUTION_THEORY, amount: 3 },
      { round: 5, bonus: Bonus.VICTORY_POINTS, amount: 9 },
    ]
  },
  {
    id: 'blue-2',
    difficultyLevel: DifficultyLevel.LEVEL_2_BLUE,
    bonus: [
      { round: 1, bonus: Bonus.CORRESPONDENCE, amount: 1 },
      { round: 2, bonus: Bonus.EVOLUTION_THEORY, amount: 2 },
      { round: 3, bonus: Bonus.VICTORY_POINTS, amount: 6 },
      { round: 4, bonus: Bonus.NAVIGATION, amount: 3 },
      { round: 5, bonus: Bonus.EVOLUTION_THEORY, amount: 4 },
    ]
  },
  {
    id: 'yellow-1',
    difficultyLevel: DifficultyLevel.LEVEL_3_YELLOW,
    bonus: [
      { round: 1, bonus: Bonus.CORRESPONDENCE, amount: 2 },
      { round: 2, bonus: Bonus.VICTORY_POINTS, amount: 6 },
      { round: 3, bonus: Bonus.VICTORY_POINTS, amount: 8 },
      { round: 4, bonus: Bonus.CORRESPONDENCE, amount: 3 },
      { round: 5, bonus: Bonus.EVOLUTION_THEORY, amount: 4 },
    ]
  },
  {
    id: 'yellow-2',
    difficultyLevel: DifficultyLevel.LEVEL_3_YELLOW,
    bonus: [
      { round: 1, bonus: Bonus.EXPLORATION, amount: 1 },
      { round: 2, bonus: Bonus.NAVIGATION, amount: 2 },
      { round: 3, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 3, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 4, bonus: Bonus.EVOLUTION_THEORY, amount: 3 },
      { round: 5, bonus: Bonus.VICTORY_POINTS, amount: 12 },
    ]
  },
  {
    id: 'green-1',
    difficultyLevel: DifficultyLevel.LEVEL_4_GREEN,
    bonus: [
      { round: 1, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 2, bonus: Bonus.VICTORY_POINTS, amount: 6 },
      { round: 3, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 3, bonus: Bonus.ACADEMY, amount: 1 },
      { round: 4, bonus: Bonus.VICTORY_POINTS, amount: 8 },
      { round: 5, bonus: Bonus.EVOLUTION_THEORY, amount: 4 },
    ]
  },
  {
    id: 'green-2',
    difficultyLevel: DifficultyLevel.LEVEL_4_GREEN,
    bonus: [
      { round: 1, bonus: Bonus.EXPLORATION, amount: 2 },
      { round: 2, bonus: Bonus.CORRESPONDENCE, amount: 2 },
      { round: 3, bonus: Bonus.EVOLUTION_THEORY, amount: 3 },
      { round: 4, bonus: Bonus.NAVIGATION, amount: 2 },
      { round: 5, bonus: Bonus.VICTORY_POINTS, amount: 9 },
    ]
  },
]

const cardsMap = new Map<string,BonusCard>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : BonusCard {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns Cards
   */
  getAll(difficultyLevel: DifficultyLevel) : BonusCard[] {
    return cards.filter(card => card.difficultyLevel === difficultyLevel)
  }

}
