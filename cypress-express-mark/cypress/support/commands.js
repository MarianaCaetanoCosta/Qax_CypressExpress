// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Customizar comando para encapsulamento para tirar as repetições
Cypress.Commands.add('createTask', (taskNamePadrao = '') => {
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')
        
    if (taskNamePadrao !== '') {
        cy.get('@inputTask')
            .type(taskNamePadrao)
    }    
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
    cy.get('input[placeholder="Add a new Task"]')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
                targetMessage
            ).to.equal(text)
    })
})

Cypress.Commands.add('removeTaskByName' , (taskNamePadraoRemove) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks/',
        method: 'DELETE',
        body: { name: taskNamePadraoRemove },
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('postTask', (taskNamePost) => {
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST',
        body: taskNamePost
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})