import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, JacquesBotPersistence, State } from '@/store/state'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import RouteCalculator from '@/services/jacques/RouteCalculator'
import JacquesCard from '@/services/jacques/JacquesCard'

export default class NavigationState {

  readonly turn : number
  readonly round : number
  readonly player : Player
  readonly cardDeck : CardDeck
  readonly jacques : JacquesBotPersistence
  readonly routeCalculator : RouteCalculator
  readonly botAction : number

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.player = route.name == 'JacquesTurnPlayer' ? Player.PLAYER : Player.BOT
    this.routeCalculator = new RouteCalculator({turn: this.turn, route, state})
    this.round = this.routeCalculator.round
    
    const botPersistence = getLastBotPersistence(state, this.turn)
    this.cardDeck = CardDeck.fromPersistence(state.setup.bot, botPersistence.cardDeck)
    if (this.routeCalculator.currentPlayer == Player.BOT && !this.routeCalculator.endOfRound) {
      this.cardDeck.draw()
    }
    this.jacques = botPersistence.jacques ?? { vp: 0 }
    this.botAction = determineBotAction(state, this.round, this.turn)
  }

  get currentCard() : JacquesCard {
    return this.cardDeck.currentCard as JacquesCard
  }

}

function getLastBotPersistence(state: State, turn: number) : BotPersistence {
  const turnData = state.turns
      .filter(item => item.turn < turn && item.botPersistence != undefined)
      .sort((a,b) => b.turn - a.turn)[0]
  if (turnData?.botPersistence) {
    return turnData?.botPersistence
  }
  return {
    cardDeck: state.setup.initialCardDeck ?? CardDeck.new(state.setup.bot, state.setup.difficultyLevel).toPersistence()
  }
}

function determineBotAction(state: State, round: number, turn: number) : number {
  // count number of bot turns already taken this round
  return state.turns
      .filter(item => item.round == round && item.turn < turn && item.player == Player.BOT)
      .length
}
