import Action from './enum/Action'
import SpecialActionPosition from './enum/SpecialActionPosition'
import Worker from './enum/Worker'

export default interface Card {
  id: number
  actions: CardAction[]
}

export type CardAction =
  CardActionMainDiary |
  CardActionSpecialActionDiary |
  CardActionSmallDiary |
  CardActionDeliverSpecimens |
  CardActionRest

export type CardActionMainDiary = {
  action: Action.MAIN_DIARY
  workers: Worker[]
}

export type CardActionSpecialActionDiary = {
  action: Action.SPECIAL_ACTION_DIARY
  position: SpecialActionPosition
  bonusTrackSteps: number
}

export type CardActionSmallDiary = {
  action: Action.SMALL_DIARY
}

export type CardActionDeliverSpecimens = {
  action: Action.DELIVER_SPECIMENS
}

export type CardActionRest = {
  action: Action.REST
}
