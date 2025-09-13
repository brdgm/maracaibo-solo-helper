import { BonusAmount } from './BonusAmount'
import DiffficultyLevel from './enum/DifficultyLevel'
import WaxSeal from './enum/WaxSeal'
import Worker from './enum/Worker'

export default interface BotPlayerBoardConfig {
  difficultyLevel: DiffficultyLevel
  initialMoney: number
  restMoney: number
  restBonusTrackProgress: number
  beagleVPMultiplier: number
  gainObjectiveBonusTrackProgress: number
  gainTemporaryKnowledgeMoney: number
  bonusTrackSurpassVP: number
  tentBonus: TentBonus[]
  stampStackBonus: StampStackBonus[]
  workerConfig: WorkerConfig[]
}

export interface TentBonus extends BonusAmount {
  tent: number
}

export interface StampStackBonus extends BonusAmount {
  stampStack: number
}

export interface WorkerConfig {
  worker: Worker
  waxSeals: WaxSeal[]
  slot4BonusTrackProgress: number
  slot6BonusTrackProgress: number
}
