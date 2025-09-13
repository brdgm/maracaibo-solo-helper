import { BonusAmount } from './BonusAmount'
import DifficultyLevel from './enum/DifficultyLevel'

export default interface BonusCard {
  id: string
  difficultyLevel: DifficultyLevel
  bonus: RoundBonus[]
}

export interface RoundBonus extends BonusAmount {
  round: number
}
