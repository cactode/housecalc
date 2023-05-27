import { compounding } from '@/calc/mortgage'
import { getCapitalGainsTax, getBracketTax } from '@/calc/tax'
import { type BasicVars, type Paid } from '@/calc/types'
import {
  CAPITAL_GAINS_TAX_TABLE_JOINT,
  CAPITAL_GAINS_TAX_TABLE_SINGLE,
  WASHINGTON_REET_TAX_TABLE
} from '@/stores/constants'

/**
 * Gets expenses paid when buying a house
 * @param vars
 * @param paid
 */
export function applyHouseExpensesBuying(vars: BasicVars, paid: Paid) {
  paid.expenses += vars.house.remodelCost
}

/**
 * Gets expenses and taxes paid each year for a house
 * @param vars
 * @param paid
 * @param year
 * @returns Total recurring expenses and taxes paid
 */
export function applyHouseExpensesTaxesYear(vars: BasicVars, paid: Paid, year: number): number {
  const housePriceInflated = compounding(vars.house.price, vars.house.apprecPct, year)
  // insurance goes up with appreciated house price
  const expensesInsurance = housePriceInflated * vars.house.insurancePct
  const expensesOtherPreInflation =
    12 * (vars.house.utilitiesMonth + vars.house.hoaMonth) + vars.house.upkeepYear
  // upkeep and hoa are fixed, but still increase with inflation
  const expensesOtherInflation = compounding(
    expensesOtherPreInflation,
    vars.financial.inflatePct,
    year
  )
  const expenses = expensesInsurance + expensesOtherInflation
  // taxes are based on appreciated house price and are not bracketed
  const taxes = housePriceInflated * vars.taxes.propertyPct
  paid.expenses += expenses
  paid.taxes += taxes
  return expenses + taxes
}

/**
 * Applies expenses and taxes when selling a house.
 * Assumes that:
 * - Selling fees are paid on the total sale price
 * - Capital gains tax is paid on the profit of the sale minus the capital gains exemption
 * - Sales tax is paid on the total sale price (REET tax) in Washington
 * @param vars
 * @param paid
 */
export function applyHouseExpensesSelling(vars: BasicVars, paid: Paid) {
  const housePriceFinal = compounding(
    vars.house.price,
    vars.house.apprecPct,
    vars.financial.sellYear
  )
  const profit = housePriceFinal - vars.house.price

  const fees = vars.house.sellingFeesPct * housePriceFinal + vars.house.sellingFees

  const reetTax =
    housePriceFinal * vars.taxes.reetLocalPct +
    getBracketTax(housePriceFinal, WASHINGTON_REET_TAX_TABLE)
  const capitalGainsTax = getCapitalGainsTax(
    vars.financial.incomeYear,
    profit,
    vars.taxes.singleFiler ? CAPITAL_GAINS_TAX_TABLE_SINGLE : CAPITAL_GAINS_TAX_TABLE_JOINT
  )
  const totalTax = (vars.taxes.addReet ? reetTax : 0) + capitalGainsTax

  paid.expenses += fees
  paid.taxes += totalTax
}
