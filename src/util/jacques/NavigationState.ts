import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, JacquesBotPersistence, State } from '@/store/state'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import JacquesCard from '@/services/jacques/JacquesCard'
import RouteCalculator from '@/services/RouteCalculator'
import Bot from '@/services/enum/Bot'

export default class NavigationState {

  readonly turn : number
  readonly round : number
  readonly player : Player
  readonly cardDeck : CardDeck
  readonly jacques : JacquesBotPersistence
  readonly routeCalculator : RouteCalculator
  readonly botAction : number

  readonly botEndRound : boolean
  readonly botEndRoundNextTurn : boolean

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.player = route.name == 'JacquesTurnPlayer' ? Player.PLAYER : Player.BOT
    this.routeCalculator = new RouteCalculator(Bot.JACQUES, this.turn, route, state)
    this.round = this.routeCalculator.round
    
    const botPersistence = getLastBotPersistence(state, this.turn)
    this.cardDeck = CardDeck.fromPersistence(state.setup.bot, botPersistence.cardDeck)
    if (this.routeCalculator.currentPlayer == Player.BOT && !this.routeCalculator.endOfRound) {
      // check if bot has already started to end the round
      const botField20TurnsAway = getBotField20TurnsAway(state, this.round, this.turn)
      this.botEndRound = (this.round == 4 && botField20TurnsAway == 2) || (this.round < 4 && botField20TurnsAway == 1)
      this.botEndRoundNextTurn = (this.round == 4 && botField20TurnsAway == 1)
      if (!(this.botEndRound || this.botEndRoundNextTurn)) {
        this.cardDeck.draw()
      }
    }
    else {
      this.botEndRound = false
      this.botEndRoundNextTurn = false
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

function getBotField20TurnsAway(state: State, round : number, turn: number) : number {
  return state.turns
      .filter(item => item.round == round && item.turn < turn && item.player == Player.BOT)
      .sort((a,b) => b.turn - a.turn)
      .findIndex(item => item.botField20) + 1
}
