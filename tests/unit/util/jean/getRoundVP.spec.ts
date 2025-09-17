import { describe, it, expect } from 'vitest'
import getRoundVP from '@/util/jean/getRoundVP'

describe('util/jean/getRoundVP', () => {
  it('getRoundVP', () => {
    expect(getRoundVP(undefined)).to.eq(0)
    expect(getRoundVP({questCount:0, discRemovedCount:0, projectCardCount:0, vp:0})).to.eq(0)
    expect(getRoundVP({questCount:0, discRemovedCount:1, projectCardCount:0, vp:0})).to.eq(0)
    expect(getRoundVP({questCount:0, discRemovedCount:2, projectCardCount:0, vp:0})).to.eq(1)
    expect(getRoundVP({questCount:0, discRemovedCount:3, projectCardCount:3, vp:0})).to.eq(5)
    expect(getRoundVP({questCount:0, discRemovedCount:5, projectCardCount:0, vp:0})).to.eq(4)
    expect(getRoundVP({questCount:0, discRemovedCount:6, projectCardCount:0, vp:0})).to.eq(6)
    expect(getRoundVP({questCount:0, discRemovedCount:7, projectCardCount:0, vp:0})).to.eq(8)
    expect(getRoundVP({questCount:0, discRemovedCount:22, projectCardCount:0, vp:0})).to.eq(38)
    expect(getRoundVP({questCount:0, discRemovedCount:23, projectCardCount:0, vp:0})).to.eq(38)
  })
})
