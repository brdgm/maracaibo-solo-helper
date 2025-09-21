import Player from '@/services/enum/Player'
import { BotPersistence, Turn } from '@/store/state'
import mockBotPersistenceJean from './mockBotPersistenceJean'

export default function (params?: MockTurnParams) : Turn {
  return {
    turn: params?.turn ?? 1,
    round: params?.round ?? 1,
    player: params?.player ?? Player.PLAYER,
    botPersistence: params?.botPersistence ?? mockBotPersistenceJean(),
    endOfRound: params?.endOfRound ?? undefined
  }
}

export interface MockTurnParams {
  turn? : number
  round? : number
  player? : Player
  botPersistence?: BotPersistence
  endOfRound?: boolean
}
