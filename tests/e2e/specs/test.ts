// https://docs.cypress.io/api/introduction/api.html
// const mountVue = require('cypress-vue-unit-test')

describe('My First Test', () => {
  it('Login in', () => {
    cy.index()
    cy.contains('p', '时间是一切财富中最宝贵的财富')
    cy.login({
      username: 'admin',
      password: 'admin'
    })
    cy.get('.el-menu--horizontal.el-menu > .is-active > span').contains('首页')
    cy.get('.el-menu--horizontal > .el-submenu > .el-submenu__title').contains('页面')
  })

  it('Switch Page', () => {
    cy.index()
    cy.contains('p', '时间是一切财富中最宝贵的财富')
    cy.login({
      username: 'admin',
      password: 'admin'
    })
    cy.get('.el-menu--horizontal.el-menu > .is-active > span').contains('首页')
    cy.get('.el-menu--horizontal > .el-submenu > .el-submenu__title').contains('页面').click()
    cy.contains('页面 1').click()

    cy.contains('div', 'Page 1 header')
  })

  it('Login out', () => {
    cy.visit('/')
    cy.contains('p', '时间是一切财富中最宝贵的财富')
    cy.login({
      username: 'admin',
      password: 'admin'
    })
    cy.get('.el-menu--horizontal.el-menu > .is-active > span').contains('首页')

    cy.get('.d2-mr.el-dropdown > .btn-text').click()
    cy.contains('注销').click()
    cy.confirmAlert()

    cy.contains('p', '时间是一切财富中最宝贵的财富')
  })
})
