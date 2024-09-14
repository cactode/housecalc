import type { IncomeTaxTable, CapitolGainsTaxTable, TaxTable } from '@/calc/types'

///
/// TABLES ARE FOR 2024
///

export const MAX_INTEREST_DEDUCTION = 750000

export const INCOME_TAX_TABLE_SINGLE: IncomeTaxTable = {
  table: [
    { rate: 0.37, threshold: 609351, base: 183647 },
    { rate: 0.35, threshold: 243726, base: 55678 },
    { rate: 0.32, threshold: 191951, base: 39110 },
    { rate: 0.24, threshold: 100526, base: 17168 },
    { rate: 0.22, threshold: 47151, base: 5426 },
    { rate: 0.12, threshold: 11601, base: 1160 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  standardDeduction: 14600
}

export const INCOME_TAX_TABLE_JOINT: IncomeTaxTable = {
  table: [
    { rate: 0.37, threshold: 731201, base: 196669 },
    { rate: 0.35, threshold: 487451, base: 111357 },
    { rate: 0.32, threshold: 383901, base: 78221 },
    { rate: 0.24, threshold: 201051, base: 34337 },
    { rate: 0.22, threshold: 94301, base: 10852 },
    { rate: 0.12, threshold: 23201, base: 2320 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  standardDeduction: 29200
}

export const CAPITAL_GAINS_TAX_TABLE_SINGLE: CapitolGainsTaxTable = {
  table: [
    { rate: 0.2, threshold: 518901, base: 0 },
    { rate: 0.15, threshold: 47026, base: 0 },
    { rate: 0.1, threshold: 0, base: 0 }
  ],
  houseDeduction: 250000
}

export const CAPITAL_GAINS_TAX_TABLE_JOINT: CapitolGainsTaxTable = {
  table: [
    { rate: 0.2, threshold: 583751, base: 0 },
    { rate: 0.15, threshold: 94051, base: 0 },
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
