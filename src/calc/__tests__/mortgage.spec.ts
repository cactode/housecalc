import { describe, it, expect } from 'vitest'

import { applyMortgageYear, principal } from '@/calc/mortgage'

import { TEST_INPUTS, TEST_FIXED_MORTGAGE } from './testconstants'
import type { Paid } from '@/calc/types'

// this should probably have more tests, but nah
describe('Mortgage', () => {
  it('calculates principals', () => {
    const result = principal(100000, 0.05, 100)
    expect(result).toBeCloseTo(38.313)
  })
  it('calculates principal and interest after 30 years', () => {
    const paid: Paid = {
      principal: 200000,
      interest: 0,
      expenses: 0,
      taxes: 0,
      opportunity: 0
    }
    applyMortgageYear(TEST_INPUTS, TEST_FIXED_MORTGAGE, paid, 0)
    expect(paid.principal).toBeCloseTo(200000 + 9824.09)
    expect(paid.interest).toBeCloseTo(47732.76)
  })
})
