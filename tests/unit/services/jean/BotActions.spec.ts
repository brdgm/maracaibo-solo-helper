import BotActions from '@/services/jean/BotActions'
import Action from '@/services/jean/enum/Action'
import JeanCards from '@/services/jean/JeanCards'
import { expect } from 'chai'

describe('services/jean/BotActions', () => {
  it('actions-round2', () => {
    const botActions = new BotActions(JeanCards.get('B1'), 2)
    expect(botActions.actions).to.eql([
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 4 },
      { roundFrom: 1, roundTo: 2, action: Action.EXPLORE, exploreSteps: 2}
    ])
  })

  it('actions-round4', () => {
    const botActions = new BotActions(JeanCards.get('B1'), 4)
    expect(botActions.actions).to.eql([
      { roundFrom: 1, roundTo: 4, action: Action.VP, vp: 4 },
      { roundFrom: 3, roundTo: 4, action: Action.EXPLORE, exploreSteps: 4}
    ])
  })

  it('params-B1-round1', () => {
    const botActions = new BotActions(JeanCards.get('B1'), 1)
    expect(botActions.getParams(false)).to.eql({ questCount: 0, projectCardCount: 1, discRemovedCount: 0, vp: 4 })
    expect(botActions.getParams(true)).to.eql({ questCount: 0, projectCardCount: 0, discRemovedCount: 1, vp: 4 })
  })

  it('params-B2-round1', () => {
    const botActions = new BotActions(JeanCards.get('B2'), 1)
    expect(botActions.getParams(false)).to.eql({ questCount: 1, projectCardCount: 1, discRemovedCount: 0, vp: 0 })
    expect(botActions.getParams(true)).to.eql({ questCount: 1, projectCardCount: 0, discRemovedCount: 1, vp: 0 })
  })

  it('params-B5-round4', () => {
    const botActions = new BotActions(JeanCards.get('B5'), 4)
    expect(botActions.getParams(false)).to.eql({ questCount: 0, projectCardCount: 1, discRemovedCount: 1, vp: 4 })
    expect(botActions.getParams(true)).to.eql({ questCount: 0, projectCardCount: 0, discRemovedCount: 2, vp: 4 })
  })

  it('hasExploreSteps-B1-round1', () => {
    const botActions = new BotActions(JeanCards.get('B1'), 1)
    expect(botActions.hasExploreSteps()).to.be.true
  })

  it('hasExploreSteps-B2-round1', () => {
    const botActions = new BotActions(JeanCards.get('B2'), 1)
    expect(botActions.hasExploreSteps()).to.be.false
  })
})
