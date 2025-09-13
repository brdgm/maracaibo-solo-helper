import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import BotPlayerBoardConfig from './BotPlayerBoardConfig'
import DifficultyLevel from './enum/DifficultyLevel'
import Bonus from './enum/Bonus'
import Worker from './enum/Worker'
import WaxSeal from './enum/WaxSeal'

/**
 * Bot player boards
 */
const PlayerBoards : BotPlayerBoardConfig[] = [
  {
    difficultyLevel: DifficultyLevel.LEVEL_1_WHITE,
    initialMoney: 8,
    restMoney: 7,
    restBonusTrackProgress: 2,
    beagleVPMultiplier: 3,
    gainObjectiveBonusTrackProgress: 3,
    gainTemporaryKnowledgeMoney: 3,
    bonusTrackSurpassVP: 4,
    tentBonus: [
      { tent: 2, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 1 },
      { tent: 3, bonus: Bonus.WAX_SEAL_NO_COIN_PENALTY },
      { tent: 4, bonus: Bonus.BEAGLE_CATCHUP },
      { tent: 5, bonus: Bonus.VICTORY_POINTS, amount: 4 },
    ],
    stampStackBonus: [
      { stampStack: 2, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 1 },
      { stampStack: 3, bonus: Bonus.BEAGLE_LIMIT_LAGGING_PENALTY_2VP },
    ],
    workerConfig: [
      { worker: Worker.A, waxSeals: [WaxSeal.YELLOW, WaxSeal.YELLOW], slot4BonusTrackProgress: 3, slot6BonusTrackProgress: 4 },
      { worker: Worker.B, waxSeals: [WaxSeal.RED, WaxSeal.RED], slot4BonusTrackProgress: 3, slot6BonusTrackProgress: 4 },
      { worker: Worker.C, waxSeals: [WaxSeal.GREEN], slot4BonusTrackProgress: 3, slot6BonusTrackProgress: 4 },
      { worker: Worker.D, waxSeals: [WaxSeal.BLUE], slot4BonusTrackProgress: 3, slot6BonusTrackProgress: 4 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.LEVEL_2_BLUE,
    initialMoney: 7,
    restMoney: 7,
    restBonusTrackProgress: 2,
    beagleVPMultiplier: 4,
    gainObjectiveBonusTrackProgress: 3,
    gainTemporaryKnowledgeMoney: 3,
    bonusTrackSurpassVP: 6,
    tentBonus: [
      { tent: 2, bonus: Bonus.WAX_SEAL_NO_COIN_PENALTY },
      { tent: 3, bonus: Bonus.CORRESPONDENCE_PROLIFIC },
      { tent: 4, bonus: Bonus.PLACEMENT_PENALTY_MINUS_1 },
      { tent: 5, bonus: Bonus.VICTORY_POINTS, amount: 6 },
    ],
    stampStackBonus: [
      { stampStack: 1, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 1 },
      { stampStack: 2, bonus: Bonus.MONEY, amount: 4 },
      { stampStack: 3, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 3 },
    ],
    workerConfig: [
      { worker: Worker.A, waxSeals: [WaxSeal.GREEN, WaxSeal.GREEN], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.B, waxSeals: [WaxSeal.YELLOW, WaxSeal.YELLOW], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.C, waxSeals: [WaxSeal.BLUE], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.D, waxSeals: [WaxSeal.RED], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.LEVEL_3_YELLOW,
    initialMoney: 5,
    restMoney: 7,
    restBonusTrackProgress: 2,
    beagleVPMultiplier: 4,
    gainObjectiveBonusTrackProgress: 3,
    gainTemporaryKnowledgeMoney: 3,
    bonusTrackSurpassVP: 8,
    tentBonus: [
      { tent: 2, bonus: Bonus.GAIN_OBJECTIVE },
      { tent: 3, bonus: Bonus.EVOLUTION_THEORY_BOOK_MULTIPLIER_PLUS_1 },
      { tent: 4, bonus: Bonus.SPECIAL_WAX_SEAL },
      { tent: 5, bonus: Bonus.VICTORY_POINTS, amount: 8 },
    ],
    stampStackBonus: [
      { stampStack: 1, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 1 },
      { stampStack: 2, bonus: Bonus.ADD_EXPLORER },
      { stampStack: 3, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 3 },
    ],
    workerConfig: [
      { worker: Worker.A, waxSeals: [WaxSeal.GREEN, WaxSeal.GREEN], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.B, waxSeals: [WaxSeal.BLUE, WaxSeal.BLUE], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.C, waxSeals: [WaxSeal.RED], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.D, waxSeals: [WaxSeal.YELLOW], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
    ]
  },
  {
    difficultyLevel: DifficultyLevel.LEVEL_4_GREEN,
    initialMoney: 5,
    restMoney: 7,
    restBonusTrackProgress: 2,
    beagleVPMultiplier: 4,
    gainObjectiveBonusTrackProgress: 3,
    gainTemporaryKnowledgeMoney: 3,
    bonusTrackSurpassVP: 8,
    tentBonus: [
      { tent: 2, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 1 },
      { tent: 3, bonus: Bonus.ACADEMY },
      { tent: 4, bonus: Bonus.EXPLORATION, amount: 1 },
      { tent: 5, bonus: Bonus.VICTORY_POINTS, amount: 8 },
    ],
    stampStackBonus: [
      { stampStack: 1, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 1 },
      { stampStack: 2, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 2 },
      { stampStack: 3, bonus: Bonus.BONUS_TRACK_PROGRESS, amount: 3 },
    ],
    workerConfig: [
      { worker: Worker.A, waxSeals: [WaxSeal.BLUE, WaxSeal.BLUE], slot4BonusTrackProgress: 1, slot6BonusTrackProgress: 2 },
      { worker: Worker.B, waxSeals: [WaxSeal.GREEN, WaxSeal.GREEN], slot4BonusTrackProgress: 1, slot6BonusTrackProgress: 3 },
      { worker: Worker.C, waxSeals: [WaxSeal.YELLOW], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
      { worker: Worker.D, waxSeals: [WaxSeal.RED], slot4BonusTrackProgress: 2, slot6BonusTrackProgress: 4 },
    ]
  },
]

const PlayerBoardsMap = new Map<DifficultyLevel,BotPlayerBoardConfig>()
PlayerBoards.forEach(playerBoard => PlayerBoardsMap.set(playerBoard.difficultyLevel, playerBoard))

export default {

  /**
 * Get bot player board
 * @param difficultyLevel Difficulty level
 * @returns player board
 */
  get(difficultyLevel: DifficultyLevel) : BotPlayerBoardConfig {
    return findMandatory(PlayerBoardsMap, difficultyLevel)
  },

}
