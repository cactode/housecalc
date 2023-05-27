import type { BasicVars, MortgageVars } from '@/calc/types'
import { getDefaultBasicVars, getDefaultMortgage } from '@/stores/defaults'
import { copyToClipboard, type QVueGlobals } from 'quasar'
import { AllVars } from '@/proto/vars'

const PROTO_VERSION = 1

// uses a convoluted protobuf conversion to compactly encode the state of the calculator
export function toQuery(vars: BasicVars, mortgages: Array<MortgageVars>) {
  const encoded = encodeURIComponent(
    btoa(
      String.fromCharCode(
        ...AllVars.encode({
          basicVars: vars,
          mortgageVars: mortgages,
          version: PROTO_VERSION
        }).finish()
      )
    )
  )
  return encoded
}

export function saveToQueryString(basicVars: BasicVars, mortgageVars: Array<MortgageVars>) {
  const baseUrl = window.location.href.split('?')[0]
  const newQueryString = `?vars=${toQuery(basicVars, mortgageVars)}`
  window.history.replaceState(null, '', newQueryString)
  copyToClipboard(baseUrl + newQueryString)
}

// decodes convoluted protobuf encoding, but returns defaults if it fails
export function restoreFromQueryString($q: QVueGlobals): {
  basicVars: BasicVars
  mortgageVars: Array<MortgageVars>
} {
  const restored = new URLSearchParams(window.location.search).get('vars')
  const defaults = { basicVars: getDefaultBasicVars(), mortgageVars: [getDefaultMortgage()] }

  if (restored == null) {
    return defaults
  }

  let decoded: AllVars
  try {
    decoded = AllVars.decode(
      new Uint8Array(
        decodeURIComponent(atob(restored))
          .split('')
          .map((c) => c.charCodeAt(0))
      )
    )
  } catch (e) {
    $q.notify({
      message: 'Share link is invalid! Restoring defaults...',
      position: 'top'
    })
    return defaults
  }

  if (decoded.version != PROTO_VERSION) {
    $q.notify({
      message: 'Share link is from an old version of the calculator! Restoring defaults...',
      position: 'top'
    })
    return defaults
  }

  return {
    basicVars: decoded.basicVars as BasicVars,
    mortgageVars: decoded.mortgageVars as Array<MortgageVars>
  }
}
