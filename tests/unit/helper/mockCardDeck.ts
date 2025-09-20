import CardDeck from '@/services/CardDeck'
import Bot from '@/services/enum/Bot'

export default function (bot: Bot, params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence(bot, {
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  })
}

export interface MockCardDeckParams {
  pile?: string[]
  discard?: string[]
}
