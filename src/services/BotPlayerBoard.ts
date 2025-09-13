import { ref } from 'vue'
import Worker from './enum/Worker'
import { BotPlayerBoardState, WorkerState } from '@/store/state'
import BonusCard from './BonusCard'
import { cloneDeep, shuffle } from 'lodash'
import BonusCards from './BonusCards'
import DifficultyLevel from './enum/DifficultyLevel'
import BotPlayerBoardConfigs from './BotPlayerBoardConfigs'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import BotPlayerBoardConfig from './BotPlayerBoardConfig'
import { BonusAmount } from './BonusAmount'
import Bonus from './enum/Bonus'

/**
 * Current state of bot player board.
 */
export default class BotPlayerBoard {

  private readonly _bonusTrackPosition = ref(0)
  private readonly _money = ref(0)
  private readonly _tents = ref(0)
  private readonly _stamps = ref(0)
  private readonly _availableWorkers = ref([] as Worker[])
  private readonly _restingWorkers = ref(0)
  private readonly _workerState = ref([] as WorkerState[])
  private readonly _bonusCards : BonusCard[] = []

  private readonly _config : BotPlayerBoardConfig
  private readonly _round : number

  private constructor(state : BotPlayerBoardState, config: BotPlayerBoardConfig, round: number) {
    this._bonusTrackPosition.value = state.bonusTrackPosition
    this._money.value = state.money
    this._tents.value = state.tents
    this._stamps.value = state.stamps
    this._availableWorkers.value = cloneDeep(state.availableWorkers)
    this._restingWorkers.value = cloneDeep(state.restingWorkers)
    this._workerState.value = cloneDeep(state.workerState)
    this._bonusCards = state.bonusCards.map(id => BonusCards.get(id))
    this._config = config
    this._round = round
  }

  public get bonusTrackPosition() : number {
    return this._bonusTrackPosition.value
  }

  public get money() : number {
    return this._money.value
  }

  public get tents() : number {
    return this._tents.value
  }

  public get stamps() : number {
    return this._stamps.value
  }

  public get availableWorkers() : Worker[] {
    return this._availableWorkers.value
  }

  public get restingWorkers() : number {
    return this._restingWorkers.value
  }

  public get workerState() : WorkerState[] {
    return this._workerState.value
  }

  /**
   * Bot gains money. Money >12 gains bonus track progress.
   * @return Boni gained during progress
   */
  public gainMoney(amount: number) : BonusAmount[] {
    const overpaidMoney = this._money.value + amount - MAX_MONEY
    if (overpaidMoney > 0) {
      this._money.value += amount - overpaidMoney
      return this.resolveBoni(this.gainBonusTrackProgress(overpaidMoney))
    }
    else {
      this._money.value += amount 
      return []
    }
  }

  /**
   * Bot spends money.
   */
  public spendMoney(amount: number) : void {
    if (amount > this._money.value) {
      throw new Error(`Not enough money (${this._money.value}), to spend: ${amount}`)
    }
    this._money.value -= amount
  }

  /**
   * Bot ganis bonus track progress.
   * @returns Boni gained during progress
   */
  public gainBonusTrackProgress(amount: number) : BonusAmount[] {
    const boni : BonusAmount[] = []

    const initialPos = this._bonusTrackPosition.value
    const newPos = this._bonusTrackPosition.value + amount
    this._bonusTrackPosition.value = newPos

    if (newPos >= BONUS_TRACK_CARD1_THRESHOLD && initialPos < BONUS_TRACK_CARD1_THRESHOLD) {
      boni.push(...this.getRoundBonus(0))
    }
    if (newPos >= BONUS_TRACK_CARD2_THRESHOLD_MAX && initialPos < BONUS_TRACK_CARD2_THRESHOLD_MAX) {
      boni.push(...this.getRoundBonus(1))
    }
    if (newPos > BONUS_TRACK_CARD2_THRESHOLD_MAX) {
      this._bonusTrackPosition.value = 0
      const furtherAmount = newPos - BONUS_TRACK_CARD2_THRESHOLD_MAX
      boni.push({ bonus:Bonus.VICTORY_POINTS, amount:this._config.bonusTrackSurpassVP })
      boni.push(...this.gainBonusTrackProgress(furtherAmount))
    }
    return boni
  }

  /**
   * Remove tent and gain bonus for that tent spot.
   * @returns Boni gained
   */
  public removeTent() : BonusAmount[] {
    if (this.tents == 0) {
      throw new Error('No tent left')
    }
    const tentBonus = 5 - this._tents.value + 1
    this._tents.value -= 1
    const boni = this._config.tentBonus.filter(bonus => bonus.tent == tentBonus)
    return this.resolveBoni(boni)
  }

  /**
   * Removes a number of stamps and gains boni.
   * @returns Boni gained
   */
  public removeStamps(amount: number) : BonusAmount[] {
    if (this._stamps.value < amount) {
      throw new Error(`Not enough stamps left (${this._stamps.value}), to remove: ${amount}`)
    }
    const boni : BonusAmount[] = []

    const initialAmount = this._stamps.value
    const newAmount = this._stamps.value - amount
    this._stamps.value = newAmount

    if (newAmount <= STAMPS_PER_STACK*2 && initialAmount > STAMPS_PER_STACK*2) {
      boni.push(...this.getStampStackBonus(1))
    }
    if (newAmount <= STAMPS_PER_STACK && initialAmount > STAMPS_PER_STACK) {
      boni.push(...this.getStampStackBonus(2))
    }
    if (newAmount == 0 && initialAmount > 0) {
      boni.push(...this.getStampStackBonus(3))
    }

    return this.resolveBoni(boni)
  }

  private getRoundBonus(index: number) : BonusAmount[] {
    const card = this._bonusCards[index]
    return card.bonus.filter(item => item.round == this._round)
  }

  private getStampStackBonus(stampStack: number) : BonusAmount[] {
    return this._config.stampStackBonus.filter(bonus => bonus.stampStack == stampStack)
  }

  /**
   * Converts all "gain money" boni to gained money.
   * Convert all "bonus step progress boni" to actual boni after progressing on the bonus track.
   * @returns Resolved boni
   */
  private resolveBoni(boni: BonusAmount[]) : BonusAmount[] {
    const resolvedBoni : BonusAmount[] = []
    for (const bonus of boni) {
      if (bonus.bonus == Bonus.MONEY) {
        resolvedBoni.push(...this.gainMoney(bonus.amount ?? 0))
      }
      else if (bonus.bonus == Bonus.BONUS_TRACK_PROGRESS) {
        resolvedBoni.push(...this.gainBonusTrackProgress(bonus.amount ?? 0))
      }
      else {
        resolvedBoni.push(bonus)
      }
    }
    return resolvedBoni
  }

  /**
   * Get all available workers in order of given priority.
   * @param priority Priority
   * @returns Workers
   */
  public getAvailableWorkersByPriority(priority: Worker[]) : WorkerState[] {
    const workers : WorkerState[] = []
    priority.forEach(preferredWorker => {
      if (this._availableWorkers.value.includes(preferredWorker)) {
        this._workerState.value.filter(worker => worker.worker == preferredWorker).forEach(worker => workers.push(worker))
      }
    })
    return workers
  }

  /**
   * Remove a worker from the available workers.
   */
  public removeWorker(worker: Worker) : void {
    this._availableWorkers.value = this._availableWorkers.value.filter(item => item!=worker)
  }

  /**
   * Puts the last/lowest available worker to rest.
   */
  public putWorkerToRest() : BonusAmount[] {
    const lastWorker = this._availableWorkers.value[this._availableWorkers.value.length - 1]
    if (!lastWorker) {
      throw new Error('No worker left')
    }

    this.removeWorker(lastWorker)
    this._restingWorkers.value += 1

    const boni = [
      {bonus:Bonus.MONEY, amount:this._config.restMoney},
      {bonus:Bonus.BONUS_TRACK_PROGRESS, amount:this._config.restBonusTrackProgress}
    ]
    return this.resolveBoni(boni)
  }

  /**
   * Gain objective (=bonus track progress)
   * @returns Boni
   */
  public gainObjective() : BonusAmount[] {
    const boni = [{bonus:Bonus.BONUS_TRACK_PROGRESS, amount:this._config.gainObjectiveBonusTrackProgress}]
    return this.resolveBoni(boni)
  }

  /**
   * Gain temporary knowledge (=money)
   * @returns Boni
   */
  public gainTemporaryKnowledge() : BonusAmount[] {
    const boni = [{bonus:Bonus.MONEY, amount:this._config.gainTemporaryKnowledgeMoney}]
    return this.resolveBoni(boni)
  }

  /**
   * Gets state of player board.
   */
  public toPersistence() : BotPlayerBoardState {
    return {
      bonusTrackPosition: this._bonusTrackPosition.value,
      money: this._money.value,
      tents: this._tents.value,
      stamps: this._stamps.value,
      availableWorkers: this._availableWorkers.value,
      restingWorkers: this._restingWorkers.value,
      workerState: this._workerState.value,
      bonusCards: this._bonusCards.map(card => card.id)
    }
  }
  /**
   * Creates a new player board.
   * @param difficultyLevel DifficultyLevel
   * @param round round
   */
  public static new(difficultyLevel: DifficultyLevel, round: number) : BotPlayerBoard {
    const config = BotPlayerBoardConfigs.get(difficultyLevel)
    const bonusCards = shuffle(BonusCards.getAll(difficultyLevel))
    const workerState = config.workerConfig.map(item => ({ worker: item.worker, waxSeals: item.waxSeals }))
    return new BotPlayerBoard({
      bonusTrackPosition: 0,
      money: config.initialMoney,
      tents: 5,
      stamps: 12,
      availableWorkers: getAllEnumValues(Worker),
      restingWorkers: 0,
      workerState,
      bonusCards: bonusCards.map(card => card.id)
    }, config, round)
  }

  /**
   * Re-creates player board from persistence.
   * @param state State
   * @param difficultyLevel Difficulty level
   * @param round round
   */
  public static fromPersistence(state : BotPlayerBoardState, difficultyLevel: DifficultyLevel, round: number) : BotPlayerBoard {
    const config = BotPlayerBoardConfigs.get(difficultyLevel)
    return new BotPlayerBoard(state, config, round)
  }

}

const MAX_MONEY = 12
const BONUS_TRACK_CARD1_THRESHOLD = 4
const BONUS_TRACK_CARD2_THRESHOLD_MAX = 9
const STAMPS_PER_STACK = 4
