const json = {}

/**
 * Implements recursive object serialization according to JSON spec
 * but without quotes around the keys.
 *
 * https://stackoverflow.com/a/11233515/482533
 */
function stringify(obj) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    // not an object, stringify using native function
    return JSON.stringify(obj)
  }
  let props = Object
    .keys(obj)
    .map(key => `${key}:${stringify(obj[key])}`)
    .join(',')
  return `{${props}}`
}
json.stringify = stringify

export default json
