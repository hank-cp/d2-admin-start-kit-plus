import axios from './index'
import MockAdapter from 'axios-mock-adapter'

const mockAdapter = new MockAdapter(axios, {
  onNoMatch: 'passthrough'
})

const req = context => context.keys().map(context)
const mockers = req(require.context('@/module', true, /mock\.(js|ts)$/))
  .filter(e => e.default)
  .map(e => e.default)

mockers.forEach(mocker => mocker(mockAdapter))
