/// <reference types="cypress" />


describe('tarefas', () => {
    
    let testData;

    //Before: utilizado apenas no primeiro teste
    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })        
    })

    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler um livro Node.js'
            
            cy.removeTaskByName(taskName) //Função Request        
            cy.createTask(taskName) //Função Login
            cy.get('main div p').contains(taskName).should('be.visible') //Validar um unico elemento        
            cy.contains('main div p', taskName).should('be.visible'); //Válidar vários elementos (uma lista): localizador combinado com o texto
        })    

        it('Não deve permitir tarefa duplicada', ()=>{
    
            const task = testData.duplicate
    
            cy.removeTaskByName(task.name) //Função Request
            cy.postTask(task) //Função POST      
            cy.createTask(task.name) //Função Login    
            //Então: vejo a mensagem de duplicidade ela é cadastrada        
            cy.get('.swal2-html-container').should('be.visible').should('have.text','Task already exists!')
        })

        it('Campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })

    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            
            const task = {
                name: 'Passear com o cachorro',
                is_done: false
            }

            cy.removeTaskByName(task.name) //Removo a tarefa concluida. Removo com a propiedade (nome)
            cy.postTask(task) //Recadastro a tarefa via api. Registro o objeto inteiro (task)

            cy.visit('/')

            //Cypresss não aceita elemento xPath, usa a função contais para acessar os elementos
            //xPath: (//p[contains(text(), 'Fazer compras')]/..//button)[1]
            cy.contains('p', task.name)
                .parent() //identifica o elemento pai da tarefa (simula o ../ do xPath)
                .find('button[class*=ItemToggle]') //busca um elemento dentro do elemento pai. Usando expressão regular (fixa)
                .click()

            //Verificar se o texto ficou taxado
            cy.contains('p', task.name)
               .should('have.css', 'text-decoration-line', 'line-through') //Esta marcação é um estilo do css
        })
    })

    context('exclusão', () => {
        it('deve remover uma tarefa', () => {
            
            //Massa de testes
            const task = {
                name: 'Estudar cypress',
                is_done: false
            }

            cy.removeTaskByName(task.name) //Removo a tarefa concluida. Removo com a propiedade (nome)
            cy.postTask(task) //Recadastro a tarefa via api. Registro o objeto inteiro (task)

            cy.visit('/')

            //Cypresss não aceita elemento xPath, usa a função contais para acessar os elementos
            //xPath: (//p[contains(text(), 'Fazer compras')]/..//button)[1]
            cy.contains('p', task.name)
                .parent() //identifica o elemento pai da tarefa (simula o ../ do xPath)
                .find('button[class*=ItemDelete]') //busca um elemento dentro do elemento pai. Usando expressão regular (fixa)
                .click()

            //Verificar se o texto ficou taxado
            cy.contains('p', task.name)
               .should('not.exist') //Esta marcação é um estilo do css
        })
    })
})