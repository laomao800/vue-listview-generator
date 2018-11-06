export function jsonToString(val: any) {
  return val ? JSON.stringify(val, null, 2) : ''
}
