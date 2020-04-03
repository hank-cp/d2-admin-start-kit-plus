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

  it('Login in Failed', () => {
    cy.index()
    cy.contains('p', '时间是一切财富中最宝贵的财富')
    cy.login({
      username: 'admin',
      password: 'asdf'
    })
    // loading mask is dismissed
    cy.get('.page-login--form').contains('登录中……')
  })

  it('Switch Page', () => {
    cy.index()
    cy.contains('p', '时间是一切财富中最宝贵的财富')
    cy.login({
      username: 'admin',
      password: 'admin'
    })

    // page 1
    cy.get('.el-menu--horizontal.el-menu > .is-active > span').contains('首页')
    cy.get('#app > div > div.d2-layout-header-aside-content > div.d2-theme-container > div.d2-theme-container-aside').contains('页面').click()
    cy.contains('#app > div > div.d2-layout-header-aside-content > div.d2-theme-container > div.d2-theme-container-aside li', '页面 1').click()
    cy.contains('div', 'Page 1 header')
    cy.contains('div', 'Hello world from API mock')

    // page 2
    cy.contains('#app > div > div.d2-layout-header-aside-content > div.d2-theme-container > div.d2-theme-container-aside li', '页面 2').click()
    cy.contains('div', 'Page 2 header')
    cy.contains('div', 'Hello world from Javascript')

    // page 3
    cy.contains('#app > div > div.d2-layout-header-aside-content > div.d2-theme-container > div.d2-theme-container-aside li', '页面 3').click()
    cy.contains('div', 'Page 3 header')
    cy.contains('div', 'Hello world from Typescript')
  })

  it('Login out', () => {
    cy.index()
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

  it('Module Vuex setup', () => {
    cy.index()
    cy.contains('p', '时间是一切财富中最宝贵的财富')
    cy.login({
      username: 'admin',
      password: 'admin'
    })

    // page 1
    cy.get('.el-menu--horizontal.el-menu > .is-active > span').contains('首页')
    cy.get('#app > div > div.d2-layout-header-aside-content > div.d2-theme-container > div.d2-theme-container-aside').contains('页面').click()
    cy.contains('#app > div > div.d2-layout-header-aside-content > div.d2-theme-container > div.d2-theme-container-aside li', '页面 1').click()
    cy.contains('div', 'Page 1 header')
    cy.contains('div', 'Hello world from API mock')

    cy.get('#btn_inc').click().click().click()
    cy.contains('div', 'Vuex Test - 3')
    cy.get('#btn_reset').click()
    cy.contains('div', 'Vuex Test - 0')
  })
})
