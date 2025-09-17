import mergeBotPersistence from '@/util/jean/mergeBotPersistence'
import { describe, it, expect } from 'vitest'
import type { JeanBotPersistence } from '@/store/state'

describe('util/jean/mergeBotPersistence', () => {
  it('merge', () => {
    const a: JeanBotPersistence = {
      questCount: 1,
      projectCardCount: 2,
      discRemovedCount: 3,
      vp: 4
    }
    const b: JeanBotPersistence = {
      questCount: 10,
      projectCardCount: 20,
      discRemovedCount: 30,
      vp: 40
    }
    const result = mergeBotPersistence(a, b)
    expect(result).toEqual({
      questCount: 11,
      projectCardCount: 22,
      discRemovedCount: 33,
      vp: 44
    })
  })

  it('merge-left-only', () => {
    const a: JeanBotPersistence = {
      questCount: 1,
      projectCardCount: 2,
      discRemovedCount: 3,
      vp: 4
    }
    const result = mergeBotPersistence(a, undefined)
    expect(result).toEqual({
      questCount: 1,
      projectCardCount: 2,
      discRemovedCount: 3,
      vp: 4
    })
  })

  it('merge-right-only', () => {
    const b: JeanBotPersistence = {
      questCount: 10,
      projectCardCount: 20,
      discRemovedCount: 30,
      vp: 40
    }
    const result = mergeBotPersistence(undefined, b)
    expect(result).toEqual({
      questCount: 10,
      projectCardCount: 20,
      discRemovedCount: 30,
      vp: 40
    })
  })
})
