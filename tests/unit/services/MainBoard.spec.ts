import MainBoard from '@/services/MainBoard'
import MainBoardLocation from '@/services/enum/MainBoardLocation'
import Player from '@/services/enum/Player'
import { expect } from 'chai'

describe('services/MainBoard', () => {
  it('constructor without state', () => {
    const mainBoard = new MainBoard()

    // Check that all locations are empty
    expect(mainBoard.state.exploration, 'exploration').to.eql([[],[],[]])
    expect(mainBoard.state.navigation, 'navigation').to.eql([[],[],[]])
    expect(mainBoard.state.correspondence, 'correspondence').to.eql([[],[],[]])
    expect(mainBoard.state.academy, 'academy').to.eql([[],[],[]])
    expect(mainBoard.state.specialAction, 'specialAction').to.eql([[],[],[],[]])
    expect(mainBoard.state.unlockLens, 'unlockLens').to.eql([[],[]])
    expect(mainBoard.state.deliverSpecimen, 'deliverSpecimen').to.eql([])
    expect(mainBoard.state.researchMuseumSpecimen, 'researchMuseumSpecimen').to.eql([])
    expect(mainBoard.state.turnOrder, 'turnOrder').to.eql([])
    expect(mainBoard.state.gainObjective, 'gainObjective').to.eql([])
  })

  it('constructor with state', () => {
    // Create a state with some occupied locations
    const state = {
      exploration: [[Player.PLAYER], [], []],
      navigation: [[], [Player.BOT], []],
      correspondence: [[], [], [Player.PLAYER]],
      academy: [[Player.BOT], [], []],
      specialAction: [[], [Player.PLAYER], [], []],
      unlockLens: [[Player.BOT], []],
      deliverSpecimen: [Player.PLAYER],
      researchMuseumSpecimen: [Player.BOT],
      turnOrder: [Player.PLAYER],
      gainObjective: [Player.BOT]
    }

    const mainBoard = new MainBoard(state)

    // Verify state was properly initialized
    expect(mainBoard.state, 'state').to.eql(state)
  })

  it('reset', () => {
    // Create a state with some occupied locations
    const state = {
      exploration: [[Player.PLAYER], [], []],
      navigation: [[], [Player.BOT], []],
      correspondence: [[], [], [Player.PLAYER]],
      academy: [[Player.BOT], [], []],
      specialAction: [[], [Player.PLAYER], [], []],
      unlockLens: [[Player.BOT], []],
      deliverSpecimen: [Player.PLAYER],
      researchMuseumSpecimen: [Player.BOT],
      turnOrder: [Player.PLAYER],
      gainObjective: [Player.BOT]
    }

    const mainBoard = new MainBoard(state)
    mainBoard.reset()

    // Check that all locations are empty after reset
    expect(mainBoard.state.exploration, 'exploration').to.eql([[],[],[]])
    expect(mainBoard.state.navigation, 'navigation').to.eql([[],[],[]])
    expect(mainBoard.state.correspondence, 'correspondence').to.eql([[],[],[]])
    expect(mainBoard.state.academy, 'academy').to.eql([[],[],[]])
    expect(mainBoard.state.specialAction, 'specialAction').to.eql([[],[],[],[]])
    expect(mainBoard.state.unlockLens, 'unlockLens').to.eql([[],[]])
    expect(mainBoard.state.deliverSpecimen, 'deliverSpecimen').to.eql([])
    expect(mainBoard.state.researchMuseumSpecimen, 'researchMuseumSpecimen').to.eql([])
    expect(mainBoard.state.turnOrder, 'turnOrder').to.eql([])
    expect(mainBoard.state.gainObjective, 'gainObjective').to.eql([])
  })

  it('occupy', () => {
    const mainBoard = new MainBoard()

    // Occupy different locations
    mainBoard.occupy(MainBoardLocation.EXPLORATION, Player.PLAYER, 0)
    mainBoard.occupy(MainBoardLocation.NAVIGATION, Player.BOT, 1)
    mainBoard.occupy(MainBoardLocation.CORRESPONDENCE, Player.PLAYER, 2)
    mainBoard.occupy(MainBoardLocation.ACADEMY, Player.BOT, 0)
    mainBoard.occupy(MainBoardLocation.SPECIAL_ACTION, Player.PLAYER, 1)
    mainBoard.occupy(MainBoardLocation.UNLOCK_LENS, Player.BOT, 0)
    mainBoard.occupy(MainBoardLocation.RESEARCH_MUSEUM_SPECIMEN, Player.PLAYER)
    mainBoard.occupy(MainBoardLocation.TURN_ORDER, Player.BOT)
    mainBoard.occupy(MainBoardLocation.GAIN_OBJECTIVE, Player.PLAYER)

    // Verify locations are occupied correctly
    expect(mainBoard.state.exploration[0], 'exploration spot 0').to.eql([Player.PLAYER])
    expect(mainBoard.state.navigation[1], 'navigation spot 1').to.eql([Player.BOT])
    expect(mainBoard.state.correspondence[2], 'correspondence spot 2').to.eql([Player.PLAYER])
    expect(mainBoard.state.academy[0], 'academy spot 0').to.eql([Player.BOT])
    expect(mainBoard.state.specialAction[1], 'specialAction spot 1').to.eql([Player.PLAYER])
    expect(mainBoard.state.unlockLens[0], 'unlockLens spot 0').to.eql([Player.BOT])
    expect(mainBoard.state.researchMuseumSpecimen, 'researchMuseumSpecimen').to.eql([Player.PLAYER])
    expect(mainBoard.state.turnOrder, 'turnOrder').to.eql([Player.BOT])
    expect(mainBoard.state.gainObjective, 'gainObjective').to.eql([Player.PLAYER])
  })

  it('isOccupied', () => {
    const mainBoard = new MainBoard()

    // Initially all locations should be unoccupied
    expect(mainBoard.isOccupied(MainBoardLocation.EXPLORATION, 0), 'exploration initially').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.NAVIGATION, 1), 'navigation initially').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.CORRESPONDENCE, 2), 'correspondence initially').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.ACADEMY, 0), 'academy initially').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.SPECIAL_ACTION, 1), 'specialAction initially').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.UNLOCK_LENS, 0), 'unlockLens initially').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.RESEARCH_MUSEUM_SPECIMEN), 'researchMuseumSpecimen initially').to.false

    // Occupy some locations
    mainBoard.occupy(MainBoardLocation.EXPLORATION, Player.PLAYER, 0)
    mainBoard.occupy(MainBoardLocation.NAVIGATION, Player.BOT, 1)
    mainBoard.occupy(MainBoardLocation.RESEARCH_MUSEUM_SPECIMEN, Player.PLAYER)

    // Check occupied locations
    expect(mainBoard.isOccupied(MainBoardLocation.EXPLORATION, 0), 'exploration after occupy').to.true
    expect(mainBoard.isOccupied(MainBoardLocation.NAVIGATION, 1), 'navigation after occupy').to.true
    expect(mainBoard.isOccupied(MainBoardLocation.RESEARCH_MUSEUM_SPECIMEN), 'researchMuseumSpecimen after occupy').to.true

    // Check locations that should still be unoccupied
    expect(mainBoard.isOccupied(MainBoardLocation.EXPLORATION, 1), 'exploration spot 1').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.NAVIGATION, 0), 'navigation spot 0').to.false
    expect(mainBoard.isOccupied(MainBoardLocation.CORRESPONDENCE, 2), 'correspondence spot 2').to.false
  })

  it('hasPenalty', () => {
    const mainBoard = new MainBoard()

    // Initially no penalties
    expect(mainBoard.hasPenalty(MainBoardLocation.EXPLORATION), 'exploration initially').to.false
    expect(mainBoard.hasPenalty(MainBoardLocation.NAVIGATION), 'navigation initially').to.false
    expect(mainBoard.hasPenalty(MainBoardLocation.CORRESPONDENCE), 'correspondence initially').to.false
    expect(mainBoard.hasPenalty(MainBoardLocation.ACADEMY), 'academy initially').to.false
    expect(mainBoard.hasPenalty(MainBoardLocation.SPECIAL_ACTION), 'specialAction initially').to.false
    expect(mainBoard.hasPenalty(MainBoardLocation.UNLOCK_LENS), 'unlockLens initially').to.false

    // Occupy exploration spot - should create penalty for both exploration and navigation
    mainBoard.occupy(MainBoardLocation.EXPLORATION, Player.PLAYER, 0)
    expect(mainBoard.hasPenalty(MainBoardLocation.EXPLORATION), 'exploration after occupy').to.true
    expect(mainBoard.hasPenalty(MainBoardLocation.NAVIGATION), 'navigation after occupy').to.true
    expect(mainBoard.hasPenalty(MainBoardLocation.CORRESPONDENCE), 'correspondence after exploration occupy').to.false

    // Occupy correspondence spot - should create penalty for both correspondence and academy
    mainBoard.occupy(MainBoardLocation.CORRESPONDENCE, Player.BOT, 1)
    expect(mainBoard.hasPenalty(MainBoardLocation.CORRESPONDENCE), 'correspondence after occupy').to.true
    expect(mainBoard.hasPenalty(MainBoardLocation.ACADEMY), 'academy after occupy').to.true

    // Occupy special action spot
    mainBoard.occupy(MainBoardLocation.SPECIAL_ACTION, Player.PLAYER, 2)
    expect(mainBoard.hasPenalty(MainBoardLocation.SPECIAL_ACTION), 'specialAction after occupy').to.true

    // Occupy unlock lens spot
    mainBoard.occupy(MainBoardLocation.UNLOCK_LENS, Player.BOT, 0)
    expect(mainBoard.hasPenalty(MainBoardLocation.UNLOCK_LENS), 'unlockLens after occupy').to.true
  })

  it('state getter', () => {
    const mainBoard = new MainBoard()

    // Occupy some locations
    mainBoard.occupy(MainBoardLocation.EXPLORATION, Player.PLAYER, 0)
    mainBoard.occupy(MainBoardLocation.NAVIGATION, Player.BOT, 1)
    mainBoard.occupy(MainBoardLocation.CORRESPONDENCE, Player.PLAYER, 2)

    // Check state getter returns correct values
    const state = mainBoard.state
    expect(state.exploration[0], 'exploration spot 0').to.eql([Player.PLAYER])
    expect(state.navigation[1], 'navigation spot 1').to.eql([Player.BOT])
    expect(state.correspondence[2], 'correspondence spot 2').to.eql([Player.PLAYER])
  })
})
