export function toCurrency(value: number): string {
  return Intl.NumberFormat('en-US', {
    currency: 'USD',
    notation: 'compact',
    minimumFractionDigits: 0,
    style: 'currency'
  }).format(value)
}

export function clipFloat(num: number, places: number) {
  return +num.toFixed(places)
}

export function divSafe(num: number, dem: number): number {
  return num == 0 ? 0 : num / dem
}

export function toMonths(year: number): number {
  return year * 12
}
