import { State, Turn } from '@/store/state'
import Player from '../enum/Player'
import { RouteLocation } from 'vue-router'

/**
 * Calculate routes for next/back respecting "passed" state of players.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly state : State

  public readonly currentPlayer : Player
  readonly nextPlayer : Player
  readonly endOfRound : boolean
  readonly previousTurn? : Turn

  constructor(params:{turn: number, route: RouteLocation, state: State}) {
    this.turn = params.turn
    this.state = params.state
    this.currentPlayer = params.route.name?.toString().match(JEAN_TURN_REGEX) ? Player.PLAYER : Player.BOT
    this.nextPlayer = this.currentPlayer == Player.BOT ? Player.PLAYER : Player.BOT
    this.endOfRound = params.route.name?.toString().match(ENDOFROUND_REGEX) ? true : false
    this.previousTurn = this.state.turns.find(item => item.turn == this.turn - 1)

    if (this.previousTurn?.endOfRound) {
      this.round = this.previousTurn.round + 1
    }
    else {
      this.round = this.previousTurn?.round ?? 1
    }
  }

  /**
   * Get route to next step in round.
   */
  public getNextRouteTo() : string {
    return `/jean/turn/${this.turn + 1}/${this.nextPlayer}`
  }

  /**
   * Get route to next step in round (end of round).
   */
  public getNextRouteToEndOfRound() : string {
    if (this.round == 4) {
      return `/jean/turn/${this.turn + 1}/endOfGame`
    }
    else {
      return `/jean/turn/${this.turn + 1}/${this.currentPlayer}/endOfRound`
    }
  }

  /**
   * Get route to previous step in round.
   */
  public getBackRouteTo() : string {
    if (this.turn == 1) {
      return ''
    }
    if (this.endOfRound) {
      return `/jean/turn/${this.turn - 1}/${this.currentPlayer}`
    }
    else if (this.previousTurn?.endOfRound) {
      return `/jean/turn/${this.turn - 1}/${this.previousTurn.player}/endOfRound`
    }
    else {
      return `/jean/turn/${this.turn - 1}/${this.previousTurn?.player ?? Player.PLAYER}`
    }
  }

}

const JEAN_TURN_REGEX = /^JeanTurnPlayer(.*)?$/
const ENDOFROUND_REGEX = /^.*EndOfRound$/
