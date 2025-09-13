import BotPlayerBoard from '@/services/BotPlayerBoard'
import Bonus from '@/services/enum/Bonus'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import WaxSeal from '@/services/enum/WaxSeal'
import Worker from '@/services/enum/Worker'
import { BotPlayerBoardState } from '@/store/state'
import { expect } from 'chai'

describe('services/BotPlayerBoard', () => {
  it('new', () => {
    const playerBoard = BotPlayerBoard.new(DifficultyLevel.LEVEL_1_WHITE, 1)

    // Check initial state
    expect(playerBoard.bonusTrackPosition, 'bonusTrackPosition').to.eq(0)
    expect(playerBoard.money, 'money').to.eq(8) // Initial money for Level 1 White
    expect(playerBoard.tents, 'tents').to.eq(5)
    expect(playerBoard.stamps, 'stamps').to.eq(12)
    expect(playerBoard.availableWorkers.length, 'availableWorkers').to.eq(4)
    expect(playerBoard.restingWorkers, 'restingWorkers').to.eq(0)
    expect(playerBoard.workerState.length, 'workerState').to.eq(4)

    // Check persistence
    const state = playerBoard.toPersistence()
    expect(state.bonusTrackPosition, 'state.bonusTrackPosition').to.eq(0)
    expect(state.money, 'state.money').to.eq(8)
    expect(state.tents, 'state.tents').to.eq(5)
    expect(state.stamps, 'state.stamps').to.eq(12)
    expect(state.availableWorkers.length, 'state.availableWorkers').to.eq(4)
    expect(state.restingWorkers, 'state.restingWorkers').to.eq(0)
    expect(state.workerState.length, 'state.workerState').to.eq(4)
    expect(state.bonusCards.length, 'state.bonusCards').to.eq(2) // Should have 2 bonus cards
  })

  it('fromPersistence', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Check that the values were properly loaded
    expect(playerBoard.bonusTrackPosition, 'bonusTrackPosition').to.eq(0)
    expect(playerBoard.money, 'money').to.eq(8)
    expect(playerBoard.tents, 'tents').to.eq(5)
    expect(playerBoard.stamps, 'stamps').to.eq(12)
  })

  it('gainMoney', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Gain 3 money
    let boni = playerBoard.gainMoney(3)
    
    // Should now have 11 money and no bonus track progress
    expect(playerBoard.money, 'money after gain').to.eq(11)
    expect(boni.length, 'boni length').to.eq(0)
    
    // Gain 3 more money (would exceed max of 12)
    boni = playerBoard.gainMoney(3)
    
    // Should now have 12 money (max) and gained bonus track progress
    expect(playerBoard.money, 'money after second gain').to.eq(12)
    expect(playerBoard.bonusTrackPosition, 'bonus track position').to.eq(2)
    expect(boni.length, 'boni length').to.eq(0)
  })

  it('spendMoney', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Spend 3 money
    playerBoard.spendMoney(3)
    
    // Should now have 5 money
    expect(playerBoard.money, 'money after spend').to.eq(5)
    
    // Try to spend more money than available
    expect(() => playerBoard.spendMoney(6)).to.throw()
  })

  it('gainBonusTrackProgress', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 2)
    
    // Initial bonus track position should be 0
    expect(playerBoard.bonusTrackPosition, 'initial bonus track position').to.eq(0)
    
    // Gain 3 bonus track progress
    let boni = playerBoard.gainBonusTrackProgress(3)
    
    // Should now have 3 bonus track progress and no boni
    expect(playerBoard.bonusTrackPosition, 'bonus track position after gain').to.eq(3)
    expect(boni.length).to.eq(0)
    
    // Gain 5 more bonus track progress (triggers 1st bonus card)
    boni = playerBoard.gainBonusTrackProgress(5)
    expect(boni, 'boni').to.eql([
      { bonus: Bonus.EXPLORATION, amount: 2, round: 2 }
    ])

    // Gain 3 more bonus track progress (triggers 2nd bonus card and surpassing bonus)
    boni = playerBoard.gainBonusTrackProgress(3)
    expect(boni, 'boni').to.eql([
      { bonus: Bonus.EVOLUTION_THEORY, amount: 1, round: 2 },
      { bonus: Bonus.VICTORY_POINTS, amount: 4 }
    ])
  })
  
  it('removeTent', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // no bonus for 1st tent
    let boni = playerBoard.removeTent()
    expect(playerBoard.tents, 'tents after removal').to.eq(4)
    expect(boni.length).to.eq(0)
    
    // get bonus for 2nd tent (1 progress step)
    boni = playerBoard.removeTent()
    expect(playerBoard.tents, 'tents after removal').to.eq(3)
    expect(boni.length).to.eq(0)
    expect(playerBoard.bonusTrackPosition).to.eq(1)
    
    // get bonus for 3nd tent (1 progress step)
    boni = playerBoard.removeTent()
    expect(playerBoard.tents, 'tents after removal').to.eq(2)
    expect(boni, 'boni').to.eql([{ tent: 3, bonus: Bonus.WAX_SEAL_NO_COIN_PENALTY }])
    
    // Remove all remaining tents
    playerBoard.removeTent()
    playerBoard.removeTent()
    
    // Try to remove more tents than available
    expect(() => playerBoard.removeTent()).to.throw()
  })

  it('removeStamps', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
 
    // Remove 2 stamps - no boni
    let boni = playerBoard.removeStamps(2)
    expect(playerBoard.stamps).to.eq(10)
    expect(boni.length).to.eq(0)
    
    // Remove 6 stamps - no boni for 1st stack
    boni = playerBoard.removeStamps(6)
    expect(playerBoard.stamps).to.eq(4)
    expect(boni.length).to.eq(0)
    
    // Remove 4 stamps - gain boni for 2nd and 3rd stack
    boni = playerBoard.removeStamps(4)
    expect(playerBoard.stamps).to.eq(0)
    expect(boni).to.eql([
        { stampStack: 3, bonus: Bonus.BEAGLE_LIMIT_LAGGING_PENALTY_2VP }
    ])
    expect(playerBoard.bonusTrackPosition).to.eq(1)
    
    // Try to remove more stamps than available
    expect(() => playerBoard.removeStamps(1)).to.throw()
  })

  it('getAvailableWorkersByPriority', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Get workers by priority
    const priorityWorkers = playerBoard.getAvailableWorkersByPriority([Worker.D, Worker.C, Worker.A, Worker.B])
    
    // Should get all 4 workers in the specified priority
    expect(priorityWorkers.length, 'priority workers length').to.eq(3)
    expect(priorityWorkers[0].worker, 'first priority worker').to.eq(Worker.D)
    expect(priorityWorkers[1].worker, 'second priority worker').to.eq(Worker.C)
    expect(priorityWorkers[2].worker, 'second priority worker').to.eq(Worker.A)
  })

  it('removeWorker', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Remove worker A
    playerBoard.removeWorker(Worker.A)
    
    // Should now have 3 available workers
    expect(playerBoard.availableWorkers.length, 'available workers after removal').to.eq(2)
    expect(playerBoard.availableWorkers.includes(Worker.A), 'worker A should be removed').to.be.false
  })

  it('putWorkerToRest', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)

    // Put a worker to rest
    playerBoard.putWorkerToRest()

    // Should now have 1 resting worker
    expect(playerBoard.restingWorkers, 'resting workers after rest').to.eq(1)

    // Should have 1 fewer available worker
    expect(playerBoard.availableWorkers, 'available workers after rest').to.eql([Worker.A, Worker.C])

    // Should have gained money and bonus track progress
    expect(playerBoard.money).to.eq(12)
    expect(playerBoard.bonusTrackPosition).to.eq(3 + 2)
  })

  it('gainObjective', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Gain objective (should give bonus track progress based on config)
    const boni = playerBoard.gainObjective()
    
    // Should have gained bonus track progress
    expect(playerBoard.bonusTrackPosition, 'bonus track position after gain').to.eq(3)
    expect(boni.length).to.eq(0) // No additional boni since we didn't cross thresholds
  })

  it('gainTemporaryKnowledge', () => {
    const playerBoard = BotPlayerBoard.fromPersistence(PLAYER_BOARD_STATE_WHITE, DifficultyLevel.LEVEL_1_WHITE, 1)
    
    // Gain temporary knowledge (should give money based on config)
    const boni = playerBoard.gainTemporaryKnowledge()
    
    // Should have gained money
    expect(playerBoard.money, 'money after gain').to.eq(11)
    expect(boni.length).to.eq(0) // No additional boni since we didn't exceed max money
  })
})

const PLAYER_BOARD_STATE_WHITE : BotPlayerBoardState = {
  bonusTrackPosition: 0,
  money: 8,
  tents: 5,
  stamps: 12,
  availableWorkers: [Worker.A, Worker.C, Worker.D],
  restingWorkers: 0,
  workerState: [
    { worker: Worker.A, waxSeals: [WaxSeal.GREEN, WaxSeal.GREEN] },
    { worker: Worker.B, waxSeals: [WaxSeal.YELLOW, WaxSeal.YELLOW] },
    { worker: Worker.C, waxSeals: [WaxSeal.BLUE] },
    { worker: Worker.D, waxSeals: [WaxSeal.RED] }
  ],
  bonusCards: ['white-1', 'white-2']
}
