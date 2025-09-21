import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import Bot from '@/services/enum/Bot'

export default function (params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck(Bot.JEAN)).toPersistence(),
    jean: {
      questCount: params?.questCount ?? 0,
      projectCardCount: params?.projectCardCount ?? 0,
      discRemovedCount: params?.discRemovedCount ?? 0,
      vp: params?.vp ?? 0
    }
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
  questCount?: number
  projectCardCount?: number
  discRemovedCount?: number
  vp?: number
}
