import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, JeanBotPersistence, State } from '@/store/state'
import Player from '@/services/enum/Player'
import CardDeck from '@/services/CardDeck'
import JeanCard from '@/services/jean/JeanCard'

export default class NavigationState {

  readonly turn : number
  readonly round : number
  readonly player : Player
  readonly cardDeck : CardDeck
  readonly jean : JeanBotPersistence

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.round = getRound(state, this.turn)
    this.player = route.name == 'JeanTurnPlayer' || route.name == 'JeanTurnPlayerEndOfRound' ? Player.PLAYER : Player.BOT
    
    const botPersistence = getLastBotPersistence(state, this.turn)
    this.cardDeck = CardDeck.fromPersistence(state.setup.bot, botPersistence.cardDeck)
    if (this.player == Player.BOT) {
      this.cardDeck.draw()
    }
    this.jean = botPersistence.jean ?? { questCount: 0, projectCardCount: 0, discRemovedCount: 0, vp: 0 }
  }

  get currentCard() : JeanCard {
    return this.cardDeck.currentCard as JeanCard
  }

}

function getRound(state: State, turn: number) : number {
  const turnData = state.turns.filter(item => item.turn < turn).sort((a,b) => b.turn - a.turn)[0]
  return turnData?.round ?? 1
}

function getLastBotPersistence(state: State, turn: number) : BotPersistence {
  const turnData = state.turns.filter(item => item.turn < turn && item.botPersistence != undefined).sort((a,b) => b.turn - a.turn)[0]
  if (turnData?.botPersistence) {
    return turnData?.botPersistence
  }
  return {
    cardDeck: state.setup.initialCardDeck ?? CardDeck.new(state.setup.bot, state.setup.difficultyLevel).toPersistence()
  }
}
