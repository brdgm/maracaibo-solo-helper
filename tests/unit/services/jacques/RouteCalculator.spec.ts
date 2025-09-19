import { expect } from 'chai'
import Bot from '@/services/enum/Bot'
import Player from '@/services/enum/Player'
import mockState from '../../helper/mockState'
import mockTurn from '../../helper/mockTurn'
import mockCardDeck from '../../helper/mockCardDeck'
import mockRouteLocation from '../../helper/mockRouteLocation'
import mockBotPersistenceJacques from '../../helper/mockBotPersistenceJacques'
import RouteCalculator from '@/services/jacques/RouteCalculator'

const state = mockState({bot:Bot.JACQUES, turns:[
  mockTurn({turn:1, round:1, player:Player.PLAYER}),
  mockTurn({turn:2, round:1, player:Player.BOT, botPersistence:mockBotPersistenceJacques(
    {cardDeck:mockCardDeck(Bot.JACQUES, {pile:['A2','A3'], discard:['A1']})}
  )}),
  mockTurn({turn:3, round:1, player:Player.PLAYER}),
  mockTurn({turn:4, round:1, player:Player.BOT, botPersistence:mockBotPersistenceJacques(
    {cardDeck:mockCardDeck(Bot.JACQUES, {pile:['A3'], discard:['A2','A1']}),vp:4}
  )}),
  mockTurn({turn:5, round:1, endOfRound:true, player:Player.BOT, botPersistence:mockBotPersistenceJacques(
    {cardDeck:mockCardDeck(Bot.JACQUES, {pile:['A3'], discard:['A2','A1']}),vp:5}
  )}),
]})

describe('services/jacques/RouteCalculator', () => {
  it('turn1', () => {
    const routeCalculator = new RouteCalculator({turn:1,state,route:mockRouteLocation({name:'JacquesTurnPlayer'})})

    expect(routeCalculator.turn).to.eq(1)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jacques/turn/2/bot')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jacques/turn/2/player/endOfRound')
  })

  it('turn2', () => {
    const routeCalculator = new RouteCalculator({turn:2,state,route:mockRouteLocation({name:'JacquesTurnBot'})})

    expect(routeCalculator.turn).to.eq(2)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jacques/turn/1/player')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jacques/turn/3/player')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jacques/turn/3/bot/endOfRound')
  })

  it('turn4', () => {
    const routeCalculator = new RouteCalculator({turn:4,state,route:mockRouteLocation({name:'JacquesTurnBot'})})

    expect(routeCalculator.turn).to.eq(4)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jacques/turn/3/player')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jacques/turn/5/player')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jacques/turn/5/bot/endOfRound')
  })

  it('turn5-endOfRound', () => {
    const routeCalculator = new RouteCalculator({turn:5,state,route:mockRouteLocation({name:'JacquesTurnBotEndOfRound'})})

    expect(routeCalculator.turn).to.eq(5)
    expect(routeCalculator.round).to.eq(1)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jacques/turn/4/bot')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jacques/turn/6/player')
  })

  it('turn6', () => {
    const routeCalculator = new RouteCalculator({turn:6,state,route:mockRouteLocation({name:'JacquesTurnPlayer'})})

    expect(routeCalculator.turn).to.eq(6)
    expect(routeCalculator.round).to.eq(2)
    expect(routeCalculator.getBackRouteTo()).to.eq('/jacques/turn/5/bot/endOfRound')
    expect(routeCalculator.getNextRouteTo()).to.eq('/jacques/turn/7/bot')
    expect(routeCalculator.getNextRouteToEndOfRound()).to.eq('/jacques/turn/7/player/endOfRound')
  })
})
