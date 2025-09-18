import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, JeanBotPersistence, State } from '@/store/state'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import JeanCard from '@/services/jean/JeanCard'
import RouteCalculator from '@/services/jean/RouteCalculator'

export default class NavigationState {

  readonly turn : number
  readonly round : number
  readonly cardDeck : CardDeck
  readonly jean : JeanBotPersistence
  readonly routeCalculator : RouteCalculator

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.routeCalculator = new RouteCalculator({turn: this.turn, route, state})
    this.round = this.routeCalculator.round
    
    const botPersistence = getLastBotPersistence(state, this.turn, this.routeCalculator.endOfRound)
    this.cardDeck = CardDeck.fromPersistence(state.setup.bot, botPersistence.cardDeck)
    if (this.routeCalculator.currentPlayer == Player.BOT) {
      this.cardDeck.draw()
    }
    this.jean = botPersistence.jean ?? { questCount: 0, projectCardCount: 0, discRemovedCount: 0, vp: 0 }
  }

  get currentCard() : JeanCard {
    return this.cardDeck.currentCard as JeanCard
  }

}

function getLastBotPersistence(state: State, turn: number, endOfRound: boolean) : BotPersistence {
  const turnData = state.turns
      .filter(item => ((item.turn < turn) || (endOfRound && item.turn <= turn)) && item.botPersistence != undefined)
      .sort((a,b) => b.turn - a.turn)[0]
  if (turnData?.botPersistence) {
    return turnData?.botPersistence
  }
  return {
    cardDeck: state.setup.initialCardDeck ?? CardDeck.new(state.setup.bot, state.setup.difficultyLevel).toPersistence()
  }
}
