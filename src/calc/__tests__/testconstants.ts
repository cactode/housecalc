import type { BasicVars, MortgageVars } from '@/calc/types'

export const TEST_INPUTS: BasicVars = {
  house: {
    price: 1000000,
    apprecPct: 0.035,
    remodelCost: 15000,
    upkeepYear: 2500,
    utilitiesMonth: 150,
    insurancePct: 0.001,
    hoaMonth: 0,
    sellingFeesPct: 0.06,
    sellingFees: 0
  },
  taxes: {
    singleFiler: false,
    itemDeductions: 0,
    propertyPct: 0.01,
    addReet: true,
    reetLocalPct: 0.0
  },
  financial: {
    incomeYear: 300000,
    investPct: 0.05,
    inflatePct: 0.02,
    sellYear: 30
  },
  rent: {
    priceMonth: 3000,
    utilitiesMonth: 100,
    apprecPct: 0.05
  }
}

export const TEST_FIXED_MORTGAGE: MortgageVars = {
  startYear: 0,
  downPct: 0.2,
  interestPct: 0.06,
  pmiPct: 0.005,
  termYear: 30,
  startFeePct: 0.01,
  startFee: 0,
  points: 0,
  isArm: false,
  arm: {
    interestFloatPct: 0.07,
    fixedYear: 5
  }
}
