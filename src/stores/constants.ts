import type { IncomeTaxTable, CapitolGainsTaxTable, TaxTable } from '@/calc/types'

///
/// TABLES ARE FOR 2023
///

export const MAX_INTEREST_DEDUCTION = 750000

export const INCOME_TAX_TABLE_SINGLE: IncomeTaxTable = {
  table: [
    { rate: 0.37, threshold: 578126, base: 174238 },
    { rate: 0.35, threshold: 231251, base: 52832 },
    { rate: 0.32, threshold: 182101, base: 37104 },
    { rate: 0.24, threshold: 95376, base: 16290 },
    { rate: 0.22, threshold: 44726, base: 5147 },
    { rate: 0.12, threshold: 11001, base: 1100 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  standardDeduction: 13850
}

export const INCOME_TAX_TABLE_JOINT: IncomeTaxTable = {
  table: [
    { rate: 0.37, threshold: 693751, base: 186601 },
    { rate: 0.35, threshold: 462501, base: 105664 },
    { rate: 0.32, threshold: 364201, base: 74208 },
    { rate: 0.24, threshold: 190751, base: 32580 },
    { rate: 0.22, threshold: 89451, base: 10294 },
    { rate: 0.12, threshold: 22001, base: 2200 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  standardDeduction: 27700
}

export const CAPITAL_GAINS_TAX_TABLE_SINGLE: CapitolGainsTaxTable = {
  table: [
    { rate: 0.2, threshold: 459750, base: 0 },
    { rate: 0.15, threshold: 41676, base: 0 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  houseDeduction: 250000
}

export const CAPITAL_GAINS_TAX_TABLE_JOINT: CapitolGainsTaxTable = {
  table: [
    { rate: 0.2, threshold: 517201, base: 0 },
    { rate: 0.15, threshold: 83350, base: 0 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  houseDeduction: 500000
}

export const WASHINGTON_REET_TAX_TABLE: TaxTable = [
  { rate: 0.03, threshold: 3000000, base: 59550 },
  { rate: 0.0275, threshold: 1500000, base: 18300 },
  { rate: 0.0128, threshold: 500000, base: 5500 },
  { rate: 0.011, threshold: 0, base: 0 }
]
