import { JeanBotPersistence } from '@/store/state'
import JeanCard, { CardAction } from './JeanCard'
import Action from './enum/Action'

/**
 * Manages the bot actions.
 */
export default class BotActions {

  readonly _currentCard : JeanCard
  readonly _round : number
  
  public constructor(currentCard: JeanCard, round: number) {
    this._currentCard = currentCard
    this._round = round
  }

  public get actions() : CardAction[] {
    return this._currentCard.actions.filter(item => item.roundFrom <= this._round && item.roundTo >= this._round)
  }

  public getParams(placedCityDisc: boolean, exploreFoundQuest: boolean) : JeanBotPersistence {
    const questCount = (exploreFoundQuest ? 1 : 0)
        + this.actions.filter(item => item.action == Action.QUEST_PILE).length
    const projectCardCount = placedCityDisc ? 0 : 1
    const discRemovedCount = (placedCityDisc ? 1 : 0)
        + this.actions.filter(item => item.action == Action.REMOVE_DISC).length
    const vp = this.actions.filter(item => item.action == Action.VP)
        .reduce((sum, item) => sum + (item.vp ?? 0), 0)
    return {
      questCount,
      projectCardCount,
      discRemovedCount,
      vp
    }
  }

  public hasExploreSteps() : boolean {
    return this.actions.some(item => item.action == Action.EXPLORE)
  }

}
