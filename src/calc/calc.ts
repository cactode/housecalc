import {
  applyHouseExpensesBuying,
  applyHouseExpensesSelling,
  applyHouseExpensesTaxesYear
} from '@/calc/house'
import { compounding, applyMortgageStart, applyMortgageYear } from '@/calc/mortgage'
import type { BasicVars, MortgageVars, Paid, CalcHouseOutput, CalcRentOutput } from '@/calc/types'

export function calcHouse(vars: BasicVars, mortgages: Array<MortgageVars>): CalcHouseOutput {
  const paid: Paid = {
    principal: 0,
    interest: 0,
    expenses: 0,
    taxes: 0,
    opportunity: 0
  }

  const paids: Array<Paid> = []
  const recurrings: Array<number> = []

  // start main life loop
  for (let year: number = 0; year < vars.financial.sellYear; year++) {
    // calc details for house
    let recurring = 0
    const startedMortgages = mortgages.filter((m) => m.startYear <= year)
    const mortgage =
      startedMortgages.length > 0
        ? startedMortgages[startedMortgages.length - 1]
        : mortgages[mortgages.length - 1]

    applyOpportunityCost(vars, paid)

    if (year == 0) {
      applyHouseExpensesBuying(vars, paid)
    }

    if (year == mortgage.startYear) {
      applyMortgageStart(vars, mortgage, paid)
    }

    recurring += applyMortgageYear(vars, mortgage, paid, year)
    recurring += applyHouseExpensesTaxesYear(vars, paid, year)

    if (year == vars.financial.sellYear - 1) {
      applyHouseExpensesSelling(vars, paid)
    }

    // update list
    paids.push({ ...paid } as Paid)
    recurrings.push(recurring)
  }

  const housePriceFinal = compounding(
    vars.house.price,
    vars.house.apprecPct,
    vars.financial.sellYear
  )
  const sellRevenue = housePriceFinal - (vars.house.price - paid.principal)
  const netLosses = paid.principal + paid.interest + paid.expenses + paid.taxes + paid.opportunity

  return {
    paidTotal: paids,
    paidYearly: paidDerivative(paids),
    recurringYearly: recurrings,
    netLosses: netLosses,
    sellRevenue: sellRevenue
  }
}

export function calcRent(vars: BasicVars): CalcRentOutput {
  const paid: Paid = {
    principal: 0,
    interest: 0,
    expenses: 0,
    taxes: 0,
    opportunity: 0
  }

  const paids: Array<Paid> = []
  const recurrings: Array<number> = []

  for (let year: number = 0; year < vars.financial.sellYear; year++) {
    applyOpportunityCost(vars, paid)

    const expensesRent = compounding(12 * vars.rent.priceMonth, vars.rent.apprecPct, year)
    const expensesUtilities = compounding(
      12 * vars.rent.utilitiesMonth,
      vars.financial.inflatePct,
      year
    )
    const expenses = expensesRent + expensesUtilities
    paid.expenses += expenses

    // update list
    paids.push({ ...paid } as Paid)
    recurrings.push(expenses)
  }

  const netLosses = paid.expenses + paid.opportunity

  return {
    paidTotal: paids,
    paidYearly: paidDerivative(paids),
    recurringYearly: recurrings,
    netLosses: netLosses
  }
}

/**
 * Takes a list of paid values and returns the derivative of each value
 * @param paids
 * @returns A list of derivative values, size is one less than the input list
 */
export function paidDerivative(paids: Array<Paid>): Array<Paid> {
  const derivative: Array<Paid> = [{ ...paids[0] }]
  for (let i = 0; i < paids.length - 1; i++) {
    derivative.push({
      principal: paids[i + 1].principal - paids[i].principal,
      interest: paids[i + 1].interest - paids[i].interest,
      expenses: paids[i + 1].expenses - paids[i].expenses,
      taxes: paids[i + 1].taxes - paids[i].taxes,
      opportunity: paids[i + 1].opportunity - paids[i].opportunity
    })
  }

  return derivative
}

/**
 * Gets opportunity cost for a given year.
 * Opportunity cost is the cost of not investing any money that is spent.
 * @param vars
 * @param paid
 * @returns
 */
export function applyOpportunityCost(vars: BasicVars, paid: Paid) {
  const paidTotal = paid.principal + paid.interest + paid.expenses + paid.taxes
  paid.opportunity += (paidTotal + paid.opportunity) * vars.financial.investPct
}
