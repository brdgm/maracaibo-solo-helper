import { ref } from 'vue'
import Player from './enum/Player'
import MainBoardLocation from './enum/MainBoardLocation'
import { MainBoardState } from '@/store/state'
import { cloneDeep } from 'lodash'

/**
 * Occupied locations on main board
 */
export default class MainBoard {

  // left main diary
  private readonly exploration = ref([] as Player[][])
  private readonly navigation = ref([] as Player[][])
  // right main diary
  private readonly correspondence = ref([] as Player[][])
  private readonly academy = ref([] as Player[][])
  // special action diary
  private readonly specialAction = ref([] as Player[][])
  // small diary
  private readonly unlockLens = ref([] as Player[][])

  private readonly deliverSpecimen = ref([] as Player[])
  private readonly researchMuseumSpecimen = ref([] as Player[])
  private readonly turnOrder = ref([] as Player[])
  private readonly gainObjective = ref([] as Player[])

  public constructor(state?: MainBoardState) {
    if (state) {
      this.exploration.value = cloneDeep(state.exploration)
      this.navigation.value = cloneDeep(state.navigation)
      this.correspondence.value = cloneDeep(state.correspondence)
      this.academy.value = cloneDeep(state.academy)
      this.specialAction.value = cloneDeep(state.specialAction)
      this.unlockLens.value = cloneDeep(state.unlockLens)
      this.deliverSpecimen.value = cloneDeep(state.deliverSpecimen)
      this.researchMuseumSpecimen.value = cloneDeep(state.researchMuseumSpecimen)
      this.turnOrder.value = cloneDeep(state.turnOrder)
      this.gainObjective.value = cloneDeep(state.gainObjective)
    }
    else {
      this.reset()
    }
  }

  public get state() : MainBoardState {
    return {
      exploration: this.exploration.value,
      navigation: this.navigation.value,
      correspondence: this.correspondence.value,
      academy: this.academy.value,
      specialAction: this.specialAction.value,
      unlockLens: this.unlockLens.value,
      deliverSpecimen: this.deliverSpecimen.value,
      researchMuseumSpecimen: this.researchMuseumSpecimen.value,
      turnOrder: this.turnOrder.value,
      gainObjective: this.gainObjective.value
    }
  }

  public reset() {
    this.exploration.value = [[],[],[]]
    this.navigation.value = [[],[],[]]
    this.correspondence.value = [[],[],[]]
    this.academy.value = [[],[],[]]
    this.specialAction.value = [[],[],[],[]]
    this.unlockLens.value = [[],[]]
    this.deliverSpecimen.value = []
    this.researchMuseumSpecimen.value = []
    this.turnOrder.value = []
    this.gainObjective.value = []
  }

  public occupy(location: MainBoardLocation, player: Player, spot?: number) : void {
    if (this.isOccupied(location, spot)) {
      throw new Error(`Location ${location}${spot?':'+spot:''} is already occupied.`)
    }
    switch (location) {
      case MainBoardLocation.EXPLORATION:
        this.exploration.value[spot ?? 0].push(player)
        break
      case MainBoardLocation.NAVIGATION:
        this.navigation.value[spot ?? 0].push(player)
        break
      case MainBoardLocation.CORRESPONDENCE:
        this.correspondence.value[spot ?? 0].push(player)
        break
      case MainBoardLocation.ACADEMY:
        this.academy.value[spot ?? 0].push(player)
        break
      case MainBoardLocation.SPECIAL_ACTION:
        this.specialAction.value[spot ?? 0].push(player)
        break
      case MainBoardLocation.UNLOCK_LENS:
        this.unlockLens.value[spot ?? 0].push(player)
        break
      case MainBoardLocation.RESEARCH_MUSEUM_SPECIMEN:
        this.researchMuseumSpecimen.value.push(player)
        break
      case MainBoardLocation.TURN_ORDER:
        this.turnOrder.value.push(player)
        break
      case MainBoardLocation.GAIN_OBJECTIVE:
        this.gainObjective.value.push(player)
        break
    }
  }

  public isOccupied(location: MainBoardLocation, spot?: number) : boolean {
    switch (location) {
      case MainBoardLocation.EXPLORATION:
        return isSpotOccupied(this.exploration.value, spot ?? 0, 0)
      case MainBoardLocation.NAVIGATION:
        return isSpotOccupied(this.navigation.value, spot ?? 0, 0)
      case MainBoardLocation.CORRESPONDENCE:
        return isSpotOccupied(this.correspondence.value, spot ?? 0, 0)
      case MainBoardLocation.ACADEMY:
        return isSpotOccupied(this.academy.value, spot ?? 0, 0)
      case MainBoardLocation.SPECIAL_ACTION:
        return isSpotOccupied(this.specialAction.value, spot ?? 0)
      case MainBoardLocation.UNLOCK_LENS:
        return isSpotOccupied(this.unlockLens.value, spot ?? 0)
      case MainBoardLocation.RESEARCH_MUSEUM_SPECIMEN:
        return isLocationOccupied(this.researchMuseumSpecimen.value)
      default:
        return false
    }
  }

  public hasPenalty(location: MainBoardLocation) : boolean {
    switch (location) {
      case MainBoardLocation.EXPLORATION:
      case MainBoardLocation.NAVIGATION:
        return isAnySpotOccupied(this.exploration.value) || isAnySpotOccupied(this.navigation.value)
      case MainBoardLocation.CORRESPONDENCE:
      case MainBoardLocation.ACADEMY:
        return isAnySpotOccupied(this.correspondence.value) || isAnySpotOccupied(this.academy.value)
      case MainBoardLocation.SPECIAL_ACTION:
        return isAnySpotOccupied(this.specialAction.value)
      case MainBoardLocation.UNLOCK_LENS:
        return isAnySpotOccupied(this.unlockLens.value)
      default:
        return false
    }
  }

}

function isAnySpotOccupied(location: Player[][]) : boolean {
  return location.some(spot => spot.length > 0)
}

function isSpotOccupied(location: Player[][], spot: number, unrestricted?: number) : boolean {
  if (unrestricted && spot == unrestricted) {
    return false
  }
  return location[spot].length > 0
}

function isLocationOccupied(location: Player[]) : boolean {
  return location.length > 0
}
