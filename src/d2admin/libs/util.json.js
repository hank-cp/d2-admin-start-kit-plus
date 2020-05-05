import _ from 'lodash'

/**
 * Implements recursive object serialization according to JSON spec
 * but without quotes around the keys.
 *
 * https://stackoverflow.com/a/11233515/482533
 */
function stringify(obj) {
  if (typeof obj !== 'object') {
    // not an object, stringify using native function
    return JSON.stringify(obj)
  }

  if (_.isArray(obj)) {
    return `[${obj.map(el => stringify(el)).join(',')}]`
  }

  let props = Object
    .keys(obj)
    .map(key => `${key}:${stringify(obj[key])}`)
    .join(',')
  return `{${props}}`
}

function stripUndefined(obj) {
  if (_.isArray(obj)) {
    obj.forEach(el => stripUndefined(el))
  } else if (_.isObject(obj)) {
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined) {
        delete obj[key]
      } else if (_.isObject(obj[key])) {
        stripUndefined(obj[key])
      }
    })
  }
  return obj
}

function stripField(obj, ...fields) {
  if (!fields || fields.length <= 0) return obj
  if (_.isArray(obj)) {
    obj.forEach(el => stripField(el, fields))
  } else if (_.isObject(obj)) {
    fields.forEach(field => delete obj[field])
    Object.keys(obj).forEach(key => {
      if (_.isObject(obj[key])) {
        stripField(obj[key], fields)
      }
    })
  }
  return obj
}

export default {
  stringify,
  stripUndefined,
  stripField
}
