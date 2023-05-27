import type { BasicVars, MortgageVars } from '@/calc/types'

const DEFAULT_VARS: BasicVars = {
  house: {
    price: 800000,
    apprecPct: 0.035,
    remodelCost: 10000,
    upkeepYear: 2000,
    utilitiesMonth: 150,
    insurancePct: 0.001,
    hoaMonth: 0,
    sellingFeesPct: 0.1,
    sellingFees: 0
  },
  taxes: {
    singleFiler: false,
    itemDeductions: 5000,
    propertyPct: 0.0088,
    addReet: false,
    reetLocalPct: 0.005
  },
  financial: {
    incomeYear: 300000,
    investPct: 0.05,
    inflatePct: 0.02,
    sellYear: 10
  },
  rent: {
    priceMonth: 3000,
    utilitiesMonth: 100,
    apprecPct: 0.035
  }
}

const DEFAULT_MORTGAGE: MortgageVars = {
  startYear: 0,
  downPct: 0.2,
  interestPct: 0.05,
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

export function getDefaultMortgage(): MortgageVars {
  const mortgage = JSON.parse(JSON.stringify(DEFAULT_MORTGAGE))
  return mortgage
}

export function getDefaultBasicVars(): BasicVars {
  return JSON.parse(JSON.stringify(DEFAULT_VARS))
}
