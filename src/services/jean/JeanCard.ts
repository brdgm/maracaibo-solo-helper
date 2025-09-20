import Card from '../Card'
import CardLevel from '../enum/CardLevel'
import Nation from '../enum/Nation'
import Action from './enum/Action'
import Direction from './enum/Direction'

export default interface JeanCard extends Card {
  id: string
  cardLevel: CardLevel
  movementSteps: number
  direction: Direction
  displayCard: number
  actions: CardAction[]
}

export interface CardAction {
  roundFrom: number
  roundTo: number
  action: Action
  exploreSteps?: number
  nation?: Nation
  influence?: number
  combatAdditionalVillage?: boolean
  reduceCombat?: number
  vp?: number
}
