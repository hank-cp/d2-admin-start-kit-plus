Cypress.Commands.add("index", () => {
  cy.visit('/')
})

Cypress.Commands.add('clickLink', (label) => {
  cy.get('a').contains(label).click()
})

Cypress.Commands.add('clickButton', (label) => {
  cy.get('button').contains(label).click()
})

Cypress.Commands.add('login', ({username, password}) => {
  cy.get('input[placeholder=用户名]')
    .clear().type(username)

  cy.get('input[placeholder=密码]')
    .clear().type(password)

  cy.clickButton('登录')
})

Cypress.Commands.add('confirmAlert', () => {
  cy.get('.el-message-box__btns > .el-button--primary').contains("确定").click()
})


