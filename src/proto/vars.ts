/* eslint-disable */
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = ''

export interface AllVars {
  version: number
  basicVars: BasicVars | undefined
  mortgageVars: MortgageVars[]
}

export interface MortgageVars {
  startYear: number
  downPct: number
  interestPct: number
  pmiPct: number
  termYear: number
  startFeePct: number
  startFee: number
  points: number
  isArm: boolean
  arm: Arm | undefined
}

export interface Arm {
  interestFloatPct: number
  fixedYear: number
}

export interface BasicVars {
  house: House | undefined
  rent: Rent | undefined
  taxes: Taxes | undefined
  financial: Financial | undefined
}

export interface House {
  price: number
  apprecPct: number
  remodelCost: number
  sellerCredits: number
  utilitiesMonth: number
  upkeepYear: number
  insurancePct: number
  hoaMonth: number
  sellingFeesPct: number
  sellingFees: number
}

export interface Rent {
  priceMonth: number
  utilitiesMonth: number
  apprecPct: number
  insurancePct: number
  securityDep: number
}

export interface Taxes {
  singleFiler: boolean
  itemDeductions: number
  propertyPct: number
  addReet: boolean
  reetLocalPct: number
}

export interface Financial {
  incomeYear: number
  investPct: number
  inflatePct: number
  sellYear: number
}

function createBaseAllVars(): AllVars {
  return { version: 0, basicVars: undefined, mortgageVars: [] }
}

export const AllVars = {
  encode(message: AllVars, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version)
    }
    if (message.basicVars !== undefined) {
      BasicVars.encode(message.basicVars, writer.uint32(18).fork()).ldelim()
    }
    for (const v of message.mortgageVars) {
      MortgageVars.encode(v!, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllVars {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseAllVars()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.version = reader.int32()
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.basicVars = BasicVars.decode(reader, reader.uint32())
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.mortgageVars.push(MortgageVars.decode(reader, reader.uint32()))
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): AllVars {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      basicVars: isSet(object.basicVars) ? BasicVars.fromJSON(object.basicVars) : undefined,
      mortgageVars: Array.isArray(object?.mortgageVars)
        ? object.mortgageVars.map((e: any) => MortgageVars.fromJSON(e))
        : []
    }
  },

  toJSON(message: AllVars): unknown {
    const obj: any = {}
    message.version !== undefined && (obj.version = Math.round(message.version))
    message.basicVars !== undefined &&
      (obj.basicVars = message.basicVars ? BasicVars.toJSON(message.basicVars) : undefined)
    if (message.mortgageVars) {
      obj.mortgageVars = message.mortgageVars.map((e) => (e ? MortgageVars.toJSON(e) : undefined))
    } else {
      obj.mortgageVars = []
    }
    return obj
  },

  create<I extends Exact<DeepPartial<AllVars>, I>>(base?: I): AllVars {
    return AllVars.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<AllVars>, I>>(object: I): AllVars {
    const message = createBaseAllVars()
    message.version = object.version ?? 0
    message.basicVars =
      object.basicVars !== undefined && object.basicVars !== null
        ? BasicVars.fromPartial(object.basicVars)
        : undefined
    message.mortgageVars = object.mortgageVars?.map((e) => MortgageVars.fromPartial(e)) || []
    return message
  }
}

function createBaseMortgageVars(): MortgageVars {
  return {
    startYear: 0,
    downPct: 0,
    interestPct: 0,
    pmiPct: 0,
    termYear: 0,
    startFeePct: 0,
    startFee: 0,
    points: 0,
    isArm: false,
    arm: undefined
  }
}

export const MortgageVars = {
  encode(message: MortgageVars, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startYear !== 0) {
      writer.uint32(8).int32(message.startYear)
    }
    if (message.downPct !== 0) {
      writer.uint32(17).double(message.downPct)
    }
    if (message.interestPct !== 0) {
      writer.uint32(25).double(message.interestPct)
    }
    if (message.pmiPct !== 0) {
      writer.uint32(33).double(message.pmiPct)
    }
    if (message.termYear !== 0) {
      writer.uint32(40).int32(message.termYear)
    }
    if (message.startFeePct !== 0) {
      writer.uint32(49).double(message.startFeePct)
    }
    if (message.startFee !== 0) {
      writer.uint32(57).double(message.startFee)
    }
    if (message.points !== 0) {
      writer.uint32(65).double(message.points)
    }
    if (message.isArm === true) {
      writer.uint32(72).bool(message.isArm)
    }
    if (message.arm !== undefined) {
      Arm.encode(message.arm, writer.uint32(82).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MortgageVars {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseMortgageVars()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.startYear = reader.int32()
          continue
        case 2:
          if (tag !== 17) {
            break
          }

          message.downPct = reader.double()
          continue
        case 3:
          if (tag !== 25) {
            break
          }

          message.interestPct = reader.double()
          continue
        case 4:
          if (tag !== 33) {
            break
          }

          message.pmiPct = reader.double()
          continue
        case 5:
          if (tag !== 40) {
            break
          }

          message.termYear = reader.int32()
          continue
        case 6:
          if (tag !== 49) {
            break
          }

          message.startFeePct = reader.double()
          continue
        case 7:
          if (tag !== 57) {
            break
          }

          message.startFee = reader.double()
          continue
        case 8:
          if (tag !== 65) {
            break
          }

          message.points = reader.double()
          continue
        case 9:
          if (tag !== 72) {
            break
          }

          message.isArm = reader.bool()
          continue
        case 10:
          if (tag !== 82) {
            break
          }

          message.arm = Arm.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): MortgageVars {
    return {
      startYear: isSet(object.startYear) ? Number(object.startYear) : 0,
      downPct: isSet(object.downPct) ? Number(object.downPct) : 0,
      interestPct: isSet(object.interestPct) ? Number(object.interestPct) : 0,
      pmiPct: isSet(object.pmiPct) ? Number(object.pmiPct) : 0,
      termYear: isSet(object.termYear) ? Number(object.termYear) : 0,
      startFeePct: isSet(object.startFeePct) ? Number(object.startFeePct) : 0,
      startFee: isSet(object.startFee) ? Number(object.startFee) : 0,
      points: isSet(object.points) ? Number(object.points) : 0,
      isArm: isSet(object.isArm) ? Boolean(object.isArm) : false,
      arm: isSet(object.arm) ? Arm.fromJSON(object.arm) : undefined
    }
  },

  toJSON(message: MortgageVars): unknown {
    const obj: any = {}
    message.startYear !== undefined && (obj.startYear = Math.round(message.startYear))
    message.downPct !== undefined && (obj.downPct = message.downPct)
    message.interestPct !== undefined && (obj.interestPct = message.interestPct)
    message.pmiPct !== undefined && (obj.pmiPct = message.pmiPct)
    message.termYear !== undefined && (obj.termYear = Math.round(message.termYear))
    message.startFeePct !== undefined && (obj.startFeePct = message.startFeePct)
    message.startFee !== undefined && (obj.startFee = message.startFee)
    message.points !== undefined && (obj.points = message.points)
    message.isArm !== undefined && (obj.isArm = message.isArm)
    message.arm !== undefined && (obj.arm = message.arm ? Arm.toJSON(message.arm) : undefined)
    return obj
  },

  create<I extends Exact<DeepPartial<MortgageVars>, I>>(base?: I): MortgageVars {
    return MortgageVars.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<MortgageVars>, I>>(object: I): MortgageVars {
    const message = createBaseMortgageVars()
    message.startYear = object.startYear ?? 0
    message.downPct = object.downPct ?? 0
    message.interestPct = object.interestPct ?? 0
    message.pmiPct = object.pmiPct ?? 0
    message.termYear = object.termYear ?? 0
    message.startFeePct = object.startFeePct ?? 0
    message.startFee = object.startFee ?? 0
    message.points = object.points ?? 0
    message.isArm = object.isArm ?? false
    message.arm =
      object.arm !== undefined && object.arm !== null ? Arm.fromPartial(object.arm) : undefined
    return message
  }
}

function createBaseArm(): Arm {
  return { interestFloatPct: 0, fixedYear: 0 }
}

export const Arm = {
  encode(message: Arm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.interestFloatPct !== 0) {
      writer.uint32(9).double(message.interestFloatPct)
    }
    if (message.fixedYear !== 0) {
      writer.uint32(16).int32(message.fixedYear)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Arm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseArm()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break
          }

          message.interestFloatPct = reader.double()
          continue
        case 2:
          if (tag !== 16) {
            break
          }

          message.fixedYear = reader.int32()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Arm {
    return {
      interestFloatPct: isSet(object.interestFloatPct) ? Number(object.interestFloatPct) : 0,
      fixedYear: isSet(object.fixedYear) ? Number(object.fixedYear) : 0
    }
  },

  toJSON(message: Arm): unknown {
    const obj: any = {}
    message.interestFloatPct !== undefined && (obj.interestFloatPct = message.interestFloatPct)
    message.fixedYear !== undefined && (obj.fixedYear = Math.round(message.fixedYear))
    return obj
  },

  create<I extends Exact<DeepPartial<Arm>, I>>(base?: I): Arm {
    return Arm.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<Arm>, I>>(object: I): Arm {
    const message = createBaseArm()
    message.interestFloatPct = object.interestFloatPct ?? 0
    message.fixedYear = object.fixedYear ?? 0
    return message
  }
}

function createBaseBasicVars(): BasicVars {
  return { house: undefined, rent: undefined, taxes: undefined, financial: undefined }
}

export const BasicVars = {
  encode(message: BasicVars, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.house !== undefined) {
      House.encode(message.house, writer.uint32(10).fork()).ldelim()
    }
    if (message.rent !== undefined) {
      Rent.encode(message.rent, writer.uint32(18).fork()).ldelim()
    }
    if (message.taxes !== undefined) {
      Taxes.encode(message.taxes, writer.uint32(26).fork()).ldelim()
    }
    if (message.financial !== undefined) {
      Financial.encode(message.financial, writer.uint32(34).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicVars {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBasicVars()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break
          }

          message.house = House.decode(reader, reader.uint32())
          continue
        case 2:
          if (tag !== 18) {
            break
          }

          message.rent = Rent.decode(reader, reader.uint32())
          continue
        case 3:
          if (tag !== 26) {
            break
          }

          message.taxes = Taxes.decode(reader, reader.uint32())
          continue
        case 4:
          if (tag !== 34) {
            break
          }

          message.financial = Financial.decode(reader, reader.uint32())
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): BasicVars {
    return {
      house: isSet(object.house) ? House.fromJSON(object.house) : undefined,
      rent: isSet(object.rent) ? Rent.fromJSON(object.rent) : undefined,
      taxes: isSet(object.taxes) ? Taxes.fromJSON(object.taxes) : undefined,
      financial: isSet(object.financial) ? Financial.fromJSON(object.financial) : undefined
    }
  },

  toJSON(message: BasicVars): unknown {
    const obj: any = {}
    message.house !== undefined &&
      (obj.house = message.house ? House.toJSON(message.house) : undefined)
    message.rent !== undefined && (obj.rent = message.rent ? Rent.toJSON(message.rent) : undefined)
    message.taxes !== undefined &&
      (obj.taxes = message.taxes ? Taxes.toJSON(message.taxes) : undefined)
    message.financial !== undefined &&
      (obj.financial = message.financial ? Financial.toJSON(message.financial) : undefined)
    return obj
  },

  create<I extends Exact<DeepPartial<BasicVars>, I>>(base?: I): BasicVars {
    return BasicVars.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<BasicVars>, I>>(object: I): BasicVars {
    const message = createBaseBasicVars()
    message.house =
      object.house !== undefined && object.house !== null
        ? House.fromPartial(object.house)
        : undefined
    message.rent =
      object.rent !== undefined && object.rent !== null ? Rent.fromPartial(object.rent) : undefined
    message.taxes =
      object.taxes !== undefined && object.taxes !== null
        ? Taxes.fromPartial(object.taxes)
        : undefined
    message.financial =
      object.financial !== undefined && object.financial !== null
        ? Financial.fromPartial(object.financial)
        : undefined
    return message
  }
}

function createBaseHouse(): House {
  return {
    price: 0,
    apprecPct: 0,
    remodelCost: 0,
    sellerCredits: 0,
    utilitiesMonth: 0,
    upkeepYear: 0,
    insurancePct: 0,
    hoaMonth: 0,
    sellingFeesPct: 0,
    sellingFees: 0
  }
}

export const House = {
  encode(message: House, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.price !== 0) {
      writer.uint32(9).double(message.price)
    }
    if (message.apprecPct !== 0) {
      writer.uint32(17).double(message.apprecPct)
    }
    if (message.remodelCost !== 0) {
      writer.uint32(25).double(message.remodelCost)
    }
    if (message.sellerCredits !== 0) {
      writer.uint32(33).double(message.sellerCredits)
    }
    if (message.utilitiesMonth !== 0) {
      writer.uint32(41).double(message.utilitiesMonth)
    }
    if (message.upkeepYear !== 0) {
      writer.uint32(49).double(message.upkeepYear)
    }
    if (message.insurancePct !== 0) {
      writer.uint32(57).double(message.insurancePct)
    }
    if (message.hoaMonth !== 0) {
      writer.uint32(65).double(message.hoaMonth)
    }
    if (message.sellingFeesPct !== 0) {
      writer.uint32(73).double(message.sellingFeesPct)
    }
    if (message.sellingFees !== 0) {
      writer.uint32(81).double(message.sellingFees)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): House {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseHouse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break
          }

          message.price = reader.double()
          continue
        case 2:
          if (tag !== 17) {
            break
          }

          message.apprecPct = reader.double()
          continue
        case 3:
          if (tag !== 25) {
            break
          }

          message.remodelCost = reader.double()
          continue
        case 4:
          if (tag !== 33) {
            break
          }

          message.sellerCredits = reader.double()
          continue
        case 5:
          if (tag !== 41) {
            break
          }

          message.utilitiesMonth = reader.double()
          continue
        case 6:
          if (tag !== 49) {
            break
          }

          message.upkeepYear = reader.double()
          continue
        case 7:
          if (tag !== 57) {
            break
          }

          message.insurancePct = reader.double()
          continue
        case 8:
          if (tag !== 65) {
            break
          }

          message.hoaMonth = reader.double()
          continue
        case 9:
          if (tag !== 73) {
            break
          }

          message.sellingFeesPct = reader.double()
          continue
        case 10:
          if (tag !== 81) {
            break
          }

          message.sellingFees = reader.double()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): House {
    return {
      price: isSet(object.price) ? Number(object.price) : 0,
      apprecPct: isSet(object.apprecPct) ? Number(object.apprecPct) : 0,
      remodelCost: isSet(object.remodelCost) ? Number(object.remodelCost) : 0,
      sellerCredits: isSet(object.sellerCredits) ? Number(object.sellerCredits) : 0,
      utilitiesMonth: isSet(object.utilitiesMonth) ? Number(object.utilitiesMonth) : 0,
      upkeepYear: isSet(object.upkeepYear) ? Number(object.upkeepYear) : 0,
      insurancePct: isSet(object.insurancePct) ? Number(object.insurancePct) : 0,
      hoaMonth: isSet(object.hoaMonth) ? Number(object.hoaMonth) : 0,
      sellingFeesPct: isSet(object.sellingFeesPct) ? Number(object.sellingFeesPct) : 0,
      sellingFees: isSet(object.sellingFees) ? Number(object.sellingFees) : 0
    }
  },

  toJSON(message: House): unknown {
    const obj: any = {}
    message.price !== undefined && (obj.price = message.price)
    message.apprecPct !== undefined && (obj.apprecPct = message.apprecPct)
    message.remodelCost !== undefined && (obj.remodelCost = message.remodelCost)
    message.sellerCredits !== undefined && (obj.sellerCredits = message.sellerCredits)
    message.utilitiesMonth !== undefined && (obj.utilitiesMonth = message.utilitiesMonth)
    message.upkeepYear !== undefined && (obj.upkeepYear = message.upkeepYear)
    message.insurancePct !== undefined && (obj.insurancePct = message.insurancePct)
    message.hoaMonth !== undefined && (obj.hoaMonth = message.hoaMonth)
    message.sellingFeesPct !== undefined && (obj.sellingFeesPct = message.sellingFeesPct)
    message.sellingFees !== undefined && (obj.sellingFees = message.sellingFees)
    return obj
  },

  create<I extends Exact<DeepPartial<House>, I>>(base?: I): House {
    return House.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<House>, I>>(object: I): House {
    const message = createBaseHouse()
    message.price = object.price ?? 0
    message.apprecPct = object.apprecPct ?? 0
    message.remodelCost = object.remodelCost ?? 0
    message.sellerCredits = object.sellerCredits ?? 0
    message.utilitiesMonth = object.utilitiesMonth ?? 0
    message.upkeepYear = object.upkeepYear ?? 0
    message.insurancePct = object.insurancePct ?? 0
    message.hoaMonth = object.hoaMonth ?? 0
    message.sellingFeesPct = object.sellingFeesPct ?? 0
    message.sellingFees = object.sellingFees ?? 0
    return message
  }
}

function createBaseRent(): Rent {
  return { priceMonth: 0, utilitiesMonth: 0, apprecPct: 0, insurancePct: 0, securityDep: 0 }
}

export const Rent = {
  encode(message: Rent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.priceMonth !== 0) {
      writer.uint32(9).double(message.priceMonth)
    }
    if (message.utilitiesMonth !== 0) {
      writer.uint32(17).double(message.utilitiesMonth)
    }
    if (message.apprecPct !== 0) {
      writer.uint32(25).double(message.apprecPct)
    }
    if (message.insurancePct !== 0) {
      writer.uint32(33).double(message.insurancePct)
    }
    if (message.securityDep !== 0) {
      writer.uint32(41).double(message.securityDep)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRent()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break
          }

          message.priceMonth = reader.double()
          continue
        case 2:
          if (tag !== 17) {
            break
          }

          message.utilitiesMonth = reader.double()
          continue
        case 3:
          if (tag !== 25) {
            break
          }

          message.apprecPct = reader.double()
          continue
        case 4:
          if (tag !== 33) {
            break
          }

          message.insurancePct = reader.double()
          continue
        case 5:
          if (tag !== 41) {
            break
          }

          message.securityDep = reader.double()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Rent {
    return {
      priceMonth: isSet(object.priceMonth) ? Number(object.priceMonth) : 0,
      utilitiesMonth: isSet(object.utilitiesMonth) ? Number(object.utilitiesMonth) : 0,
      apprecPct: isSet(object.apprecPct) ? Number(object.apprecPct) : 0,
      insurancePct: isSet(object.insurancePct) ? Number(object.insurancePct) : 0,
      securityDep: isSet(object.securityDep) ? Number(object.securityDep) : 0
    }
  },

  toJSON(message: Rent): unknown {
    const obj: any = {}
    message.priceMonth !== undefined && (obj.priceMonth = message.priceMonth)
    message.utilitiesMonth !== undefined && (obj.utilitiesMonth = message.utilitiesMonth)
    message.apprecPct !== undefined && (obj.apprecPct = message.apprecPct)
    message.insurancePct !== undefined && (obj.insurancePct = message.insurancePct)
    message.securityDep !== undefined && (obj.securityDep = message.securityDep)
    return obj
  },

  create<I extends Exact<DeepPartial<Rent>, I>>(base?: I): Rent {
    return Rent.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<Rent>, I>>(object: I): Rent {
    const message = createBaseRent()
    message.priceMonth = object.priceMonth ?? 0
    message.utilitiesMonth = object.utilitiesMonth ?? 0
    message.apprecPct = object.apprecPct ?? 0
    message.insurancePct = object.insurancePct ?? 0
    message.securityDep = object.securityDep ?? 0
    return message
  }
}

function createBaseTaxes(): Taxes {
  return { singleFiler: false, itemDeductions: 0, propertyPct: 0, addReet: false, reetLocalPct: 0 }
}

export const Taxes = {
  encode(message: Taxes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.singleFiler === true) {
      writer.uint32(8).bool(message.singleFiler)
    }
    if (message.itemDeductions !== 0) {
      writer.uint32(17).double(message.itemDeductions)
    }
    if (message.propertyPct !== 0) {
      writer.uint32(25).double(message.propertyPct)
    }
    if (message.addReet === true) {
      writer.uint32(32).bool(message.addReet)
    }
    if (message.reetLocalPct !== 0) {
      writer.uint32(41).double(message.reetLocalPct)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Taxes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseTaxes()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break
          }

          message.singleFiler = reader.bool()
          continue
        case 2:
          if (tag !== 17) {
            break
          }

          message.itemDeductions = reader.double()
          continue
        case 3:
          if (tag !== 25) {
            break
          }

          message.propertyPct = reader.double()
          continue
        case 4:
          if (tag !== 32) {
            break
          }

          message.addReet = reader.bool()
          continue
        case 5:
          if (tag !== 41) {
            break
          }

          message.reetLocalPct = reader.double()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Taxes {
    return {
      singleFiler: isSet(object.singleFiler) ? Boolean(object.singleFiler) : false,
      itemDeductions: isSet(object.itemDeductions) ? Number(object.itemDeductions) : 0,
      propertyPct: isSet(object.propertyPct) ? Number(object.propertyPct) : 0,
      addReet: isSet(object.addReet) ? Boolean(object.addReet) : false,
      reetLocalPct: isSet(object.reetLocalPct) ? Number(object.reetLocalPct) : 0
    }
  },

  toJSON(message: Taxes): unknown {
    const obj: any = {}
    message.singleFiler !== undefined && (obj.singleFiler = message.singleFiler)
    message.itemDeductions !== undefined && (obj.itemDeductions = message.itemDeductions)
    message.propertyPct !== undefined && (obj.propertyPct = message.propertyPct)
    message.addReet !== undefined && (obj.addReet = message.addReet)
    message.reetLocalPct !== undefined && (obj.reetLocalPct = message.reetLocalPct)
    return obj
  },

  create<I extends Exact<DeepPartial<Taxes>, I>>(base?: I): Taxes {
    return Taxes.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<Taxes>, I>>(object: I): Taxes {
    const message = createBaseTaxes()
    message.singleFiler = object.singleFiler ?? false
    message.itemDeductions = object.itemDeductions ?? 0
    message.propertyPct = object.propertyPct ?? 0
    message.addReet = object.addReet ?? false
    message.reetLocalPct = object.reetLocalPct ?? 0
    return message
  }
}

function createBaseFinancial(): Financial {
  return { incomeYear: 0, investPct: 0, inflatePct: 0, sellYear: 0 }
}

export const Financial = {
  encode(message: Financial, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.incomeYear !== 0) {
      writer.uint32(9).double(message.incomeYear)
    }
    if (message.investPct !== 0) {
      writer.uint32(17).double(message.investPct)
    }
    if (message.inflatePct !== 0) {
      writer.uint32(25).double(message.inflatePct)
    }
    if (message.sellYear !== 0) {
      writer.uint32(32).int32(message.sellYear)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Financial {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseFinancial()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break
          }

          message.incomeYear = reader.double()
          continue
        case 2:
          if (tag !== 17) {
            break
          }

          message.investPct = reader.double()
          continue
        case 3:
          if (tag !== 25) {
            break
          }

          message.inflatePct = reader.double()
          continue
        case 4:
          if (tag !== 32) {
            break
          }

          message.sellYear = reader.int32()
          continue
      }
      if ((tag & 7) === 4 || tag === 0) {
        break
      }
      reader.skipType(tag & 7)
    }
    return message
  },

  fromJSON(object: any): Financial {
    return {
      incomeYear: isSet(object.incomeYear) ? Number(object.incomeYear) : 0,
      investPct: isSet(object.investPct) ? Number(object.investPct) : 0,
      inflatePct: isSet(object.inflatePct) ? Number(object.inflatePct) : 0,
      sellYear: isSet(object.sellYear) ? Number(object.sellYear) : 0
    }
  },

  toJSON(message: Financial): unknown {
    const obj: any = {}
    message.incomeYear !== undefined && (obj.incomeYear = message.incomeYear)
    message.investPct !== undefined && (obj.investPct = message.investPct)
    message.inflatePct !== undefined && (obj.inflatePct = message.inflatePct)
    message.sellYear !== undefined && (obj.sellYear = Math.round(message.sellYear))
    return obj
  },

  create<I extends Exact<DeepPartial<Financial>, I>>(base?: I): Financial {
    return Financial.fromPartial(base ?? {})
  },

  fromPartial<I extends Exact<DeepPartial<Financial>, I>>(object: I): Financial {
    const message = createBaseFinancial()
    message.incomeYear = object.incomeYear ?? 0
    message.investPct = object.investPct ?? 0
    message.inflatePct = object.inflatePct ?? 0
    message.sellYear = object.sellYear ?? 0
    return message
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never }

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
