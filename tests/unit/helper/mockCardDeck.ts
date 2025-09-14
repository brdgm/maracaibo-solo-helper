import Card from '@/services/Card'
import CardDeck from '@/services/CardDeck'

export default function (getMethod: (id: string) => Card, params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    discard: params?.discard ?? []
  }, getMethod)
}

export interface MockCardDeckParams {
  pile?: string[]
  discard?: string[]
}
