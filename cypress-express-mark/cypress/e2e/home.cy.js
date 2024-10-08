/// <reference types="cypress" />
describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('/')

    //Validação mensagem da aba do navegador
    cy.title().should('eq','Gerencie suas tarefas com Mark L')
  
    })
})