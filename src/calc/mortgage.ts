import { getInterestDeductionSavings } from '@/calc/tax'
import type { BasicVars, MortgageVars, Paid } from '@/calc/types'
import { divSafe, toMonths } from '@/calc/util'
import {
  MAX_INTEREST_DEDUCTION,
  INCOME_TAX_TABLE_SINGLE,
  INCOME_TAX_TABLE_JOINT
} from '@/stores/constants'

/**
 * Gets the compounded value of P after N intervals at rate r
 * @param P Principal amount
 * @param r Rate
 * @param N Number of intervals
 * @returns
 */
export function compounding(P: number, r: number, N: number): number {
  return P * (1 + r) ** N
}

/**
 * Gets the periodic payment amount for a loan
 * @param P Principal amount
 * @param r Rate
 * @param N Periods remaining on loan
 * @returns
 */
export function payment(P: number, r: number, N: number): number {
  const num = P * r * (1 + r) ** N
  const dem = (1 + r) ** N - 1
  // if rate is 0, dem will be 0, so return P / N
  if (dem === 0) {
    return P / N
  } else {
    return num / dem
  }
}

/**
 * Gets the interest paid on a loan for a single period
 * @param P Principal amount
 * @param r Rate
 * @returns
 */
export function interest(P: number, r: number): number {
  return P * r
}

/**
 * Gets the principal paid on a loan for a single period
 * @param P Principal amount
 * @param r Rate
 * @param N Periods remaining on loan
 * @returns
 */
export function principal(P: number, r: number, N: number): number {
  return payment(P, r, N) - interest(P, r)
}

export function applyMortgageStart(vars: BasicVars, mortgage: MortgageVars, paid: Paid) {
  paid.principal += vars.house.price * mortgage.downPct
  const debt = vars.house.price - paid.principal
  const pointsPct = mortgage.points * 0.01
  paid.expenses += debt * (mortgage.startFeePct + pointsPct) + mortgage.startFee
}

export function applyMortgageYear(
  vars: BasicVars,
  mortgage: MortgageVars,
  paid: Paid,
  year: number
): number {
  const mortgageYear = year - mortgage.startYear

  // switch to ARM if applicable
  let interestPct = mortgage.interestPct
  if (mortgage.isArm) {
    if (mortgage.arm.fixedYear <= mortgageYear) {
      interestPct = mortgage.arm.interestFloatPct
    }
  }

  // calculate change in principal and interest month-by-month for greatest accuracy
  const oldPrincipal = paid.principal
  const oldInterest = paid.interest
  let interestForDeduction = 0 // track separately for tax purposes
  for (let i = 0; i < 12; i++) {
    const monthsPassed = toMonths(mortgageYear) + i
    const monthsLeft = toMonths(mortgage.termYear) - monthsPassed
    const P = vars.house.price - paid.principal

    // // bail out if we've paid off the loan
    if (monthsLeft <= 0) {
      break
    }

    // convert to monthly rate, add PMI if applicable
    let r = divSafe(interestPct, 12)
    if (paid.principal < vars.house.price * 0.2) {
      r += divSafe(mortgage.pmiPct, 12)
    }

    paid.principal += principal(P, r, monthsLeft)
    paid.interest += interest(P, r)
    interestForDeduction += interest(Math.min(P, MAX_INTEREST_DEDUCTION), r)
  }

  // get tax savings
  const interestSavings = getInterestDeductionSavings(
    vars.financial.incomeYear,
    vars.taxes.itemDeductions,
    interestForDeduction,
    vars.taxes.singleFiler ? INCOME_TAX_TABLE_SINGLE : INCOME_TAX_TABLE_JOINT
  )

  // add to paid
  paid.taxes -= interestSavings

  // return recurring components
  const changePrincipal = paid.principal - oldPrincipal
  const changeInterest = paid.interest - oldInterest
  return changePrincipal + changeInterest - interestSavings
}
