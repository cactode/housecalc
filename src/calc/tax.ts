import type { TaxTable, CapitolGainsTaxTable, IncomeTaxTable } from '@/calc/types'

/**
 * Given a certain income and tax bracket, returns the amount of money you save on tax returns by deducting interest paid on a house.
 * The baseline tax is the better of the standard deduction or the itemized deduction without interest.
 *
 * @param income
 * @param itemDeductions
 * @param interestPaid
 * @param taxTable
 * @returns
 */
export function getInterestDeductionSavings(
  income: number,
  itemDeductions: number,
  interestPaid: number,
  taxTable: IncomeTaxTable
): number {
  const taxStandard = getBracketTax(income - taxTable.standardDeduction, taxTable.table)
  const taxDeduction = getBracketTax(income - itemDeductions, taxTable.table)
  const taxBestWithoutInterest = Math.min(taxStandard, taxDeduction)
  const taxDeductionWithInterest = getBracketTax(
    income - itemDeductions - interestPaid,
    taxTable.table
  )
  const savings = Math.max(0, taxBestWithoutInterest - taxDeductionWithInterest)
  return savings
}

/**
 * Applies capital gains tax for profits on a house sale.
 * @param income
 * @param profit
 * @param capGainTaxTable
 * @returns
 */
export function getCapitalGainsTax(
  income: number,
  profit: number,
  capGainTaxTable: CapitolGainsTaxTable
): number {
  const totalIncome = income + profit
  const adjustedProfit = profit - capGainTaxTable.houseDeduction
  for (const { rate, threshold } of capGainTaxTable.table) {
    if (totalIncome > threshold) {
      return Math.max(0, rate * adjustedProfit)
    }
  }

  return 0
}

/**
 * Calculates taxes based on brackets.
 * @param money
 * @param taxTable
 * @returns
 */
export function getBracketTax(money: number, taxTable: TaxTable): number {
  for (const { rate, threshold, base } of taxTable) {
    if (money > threshold) {
      return Math.max(0, rate * (money - threshold) + base)
    }
  }

  return 0
}
