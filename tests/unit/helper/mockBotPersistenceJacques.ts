import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import Bot from '@/services/enum/Bot'

export default function (params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck(Bot.JACQUES)).toPersistence(),
    jacques: {
      vp: params?.vp ?? 0
    }
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
  vp?: number
}
