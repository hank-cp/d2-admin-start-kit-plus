// https://docs.cypress.io/api/introduction/api.html
// const mountVue = require('cypress-vue-unit-test')

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('p', '时间是一切财富中最宝贵的财富')
  })
})
