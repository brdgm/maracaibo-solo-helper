import Card from '../Card'
import CardLevel from '../enum/CardLevel'
import Action from './enum/Action'

export default interface JacquesCard extends Card {
  id: string
  cardLevel: CardLevel
  vp: number
  actions: CardAction[]
}

export interface CardAction {
  action: Action
  cityNumber?: number
  cityNumberFrom?: number
  cityNumberTo?: number
  exploreSteps?: number
}
