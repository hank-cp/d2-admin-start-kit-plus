import MockAdapter from 'axios-mock-adapter'

export default function (mock: MockAdapter) {
  mock.onGet(/\/demo-api$/).reply(200, 'Hello world from API mock')
  return mock
}
