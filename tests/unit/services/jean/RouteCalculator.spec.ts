import { expect } from 'chai'
import Bot from '@/services/enum/Bot'
import RouteCalculator from '@/services/jean/RouteCalculator'
import Player from '@/services/enum/Player'
import mockState from '../../helper/mockState'
import mockTurn from '../../helper/mockTurn'
import mockBotPersistenceJean from '../../helper/mockBotPersistenceJean'
import mockCardDeck from '../../helper/mockCardDeck'
import mockRouteLocation from '../../helper/mockRouteLocation'

const state = mockState({bot:Bot.JEAN, turns:[
  mockTurn({turn:1, round:1, player:Player.PLAYER}),
  mockTurn({turn:2, round:1, player:Player.BOT, botPersistence:mockBotPersistenceJean(
    {cardDeck:mockCardDeck(Bot.JACQUES, {pile:['A2','A3'], discard:['A1']}),projectCardCount:1}
  )}),
  mockTurn({turn:3, round:1, player:Player.PLAYER}),
  mockTurn({turn:4, round:1, endOfRound:true, player:Player.BOT, botPersistence:mockBotPersistenceJean(
    {cardDeck:mockCardDeck(Bot.JACQUES, {pile:['A3'], discard:['A2','A1']}),projectCardCount:1,vp:4}
  )}),
]})

describe('services/jean/RouteCalculator', () => {
  it('turn1', () => {
    const routeCalculator = new RouteCalculator({turn:1,state,route:mockRouteLocation({name:'JeanTurnPlayer'})})

    expect(routeCalculator.turn).to.eq(1)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jean/turn/2/bot')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jean/turn/1/player/endOfRound')
  })

  it('turn2', () => {
    const routeCalculator = new RouteCalculator({turn:2,state,route:mockRouteLocation({name:'JeanTurnBot'})})

    expect(routeCalculator.turn).to.eq(2)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jean/turn/1/player')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jean/turn/3/player')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jean/turn/2/bot/endOfRound')
  })

  it('turn4', () => {
    const routeCalculator = new RouteCalculator({turn:4,state,route:mockRouteLocation({name:'JeanTurnBot'})})

    expect(routeCalculator.turn).to.eq(4)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jean/turn/3/player')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jean/turn/5/player')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jean/turn/4/bot/endOfRound')
  })

  it('turn4-endOfRound', () => {
    const routeCalculator = new RouteCalculator({turn:4,state,route:mockRouteLocation({name:'JeanTurnBotEndOfRound'})})

    expect(routeCalculator.turn).to.eq(4)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jean/turn/4/bot')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jean/turn/5/player')
  })

  it('turn5', () => {
    const routeCalculator = new RouteCalculator({turn:5,state,route:mockRouteLocation({name:'JeanTurnPlayer'})})

    expect(routeCalculator.turn).to.eq(5)
    expect(routeCalculator.round).to.eq(2)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jean/turn/4/bot/endOfRound')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jean/turn/6/bot')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jean/turn/5/player/endOfRound')
  })
})
