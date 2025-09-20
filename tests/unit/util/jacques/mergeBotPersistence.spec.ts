import mergeBotPersistence from '@/util/jacques/mergeBotPersistence'
import { describe, it, expect } from 'vitest'
import type { JacquesBotPersistence } from '@/store/state'

describe('util/jacques/mergeBotPersistence', () => {
  it('merge', () => {
    const a: JacquesBotPersistence = {
      vp: 4
    }
    const b: JacquesBotPersistence = {
      vp: 40
    }
    const result = mergeBotPersistence(a, b)
    expect(result).toEqual({
      vp: 44
    })
  })

  it('merge-left-only', () => {
    const a: JacquesBotPersistence = {
      vp: 4
    }
    const result = mergeBotPersistence(a)
    expect(result).toEqual({
      vp: 4
    })
  })

  it('merge-right-only', () => {
    const b: JacquesBotPersistence = {
      vp: 40
    }
    const result = mergeBotPersistence(undefined, b)
    expect(result).toEqual({
      vp: 40
    })
  })
})
