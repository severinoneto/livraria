describe('Test da pagina Login', () => {
    it('Testando componentes e função logar"', () => {

      cy.visit('https://livraria-cactus.vercel.app')
      cy.wait(4000)
      cy.contains('Entre ou Cadastre-se').click()
      cy.wait(3000)

      cy.contains('Acesse sua conta')
      cy.contains('Email')
      cy.contains('Senha')
      cy.get('[type="email"]').type('meuemail@gmail.com').wait(1000)
      cy.get('[type="password"]').type('12345678').wait(1000)
      cy.contains('Entrar').click() 
      cy.wait(4000)
      
    })
  })