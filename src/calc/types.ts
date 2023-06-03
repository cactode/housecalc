import { BasicVars as BasicVarsProto, MortgageVars as MortgageVarsProto } from '@/proto/vars'

// special type to scrub undefined from a type
type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> }

export interface TaxBracket {
  readonly rate: number
  readonly threshold: number
  readonly base: number
}

export interface TaxTable extends Array<TaxBracket> {}

export interface IncomeTaxTable {
  readonly table: TaxTable
  readonly standardDeduction: number
}

export interface CapitolGainsTaxTable {
  readonly table: TaxTable
  readonly houseDeduction: number
}

export interface Paid {
  principal: number
  interest: number
  expenses: number
  taxes: number
  opportunity: number
}

export interface CalcHouseOutput {
  paidTotal: Array<Paid>
  paidYearly: Array<Paid>
  recurringYearly: Array<number>
  netLosses: number
  sellRevenue: number
}

export interface CalcRentOutput {
  paidTotal: Array<Paid>
  paidYearly: Array<Paid>
  recurringYearly: Array<number>
  netLosses: number
  depositRevenue: number
}

// these are defined as proto types in src/proto/vars.ts
// this makes it easier to serialize / deserialize them into compact URL params
// otherwise, they exceed the URL length limit
// mortgage-related inputs for the calculator
export type MortgageVars = NoUndefinedField<MortgageVarsProto>

// general inputs for the calculator
export type BasicVars = NoUndefinedField<BasicVarsProto>

// used to select input formatting
export enum CalcInputType {
  Percent,
  Dollar,
  Years,
  Number
}
