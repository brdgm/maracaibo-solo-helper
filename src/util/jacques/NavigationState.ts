import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, JacquesBotPersistence, State } from '@/store/state'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'

export default class NavigationState {

  readonly turn : number
  readonly round : number
  readonly player : Player
  readonly cardDeck : CardDeck
  readonly jacques : JacquesBotPersistence

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.player = route.name == 'JeanTurnPlayer' ? Player.PLAYER : Player.BOT
    this.round = 1 // TODO: get round
    
    const botPersistence = getLastBotPersistence(state, this.turn)
    this.cardDeck = CardDeck.fromPersistence(state.setup.bot, botPersistence.cardDeck)
    if (this.player == Player.BOT) {
      this.cardDeck.draw()
    }
    this.jacques = botPersistence.jacques ?? { vp: 0 }
  }

}

function getLastBotPersistence(state: State, turn: number) : BotPersistence {
  const turnData = state.turns
      .filter(item => (item.turn < turn) && item.botPersistence != undefined)
      .sort((a,b) => b.turn - a.turn)[0]
  if (turnData?.botPersistence) {
    return turnData?.botPersistence
  }
  return {
    cardDeck: state.setup.initialCardDeck ?? CardDeck.new(state.setup.bot, state.setup.difficultyLevel).toPersistence()
  }
}
