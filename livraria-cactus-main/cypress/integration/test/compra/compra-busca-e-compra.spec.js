describe('Test da função compra',()=>{
    it(' Test buscando e comprando o livro harry potter',() => {

       cy.visit('https://livraria-cactus.vercel.app')
      cy.wait(4000)
      cy.contains('Entre ou Cadastre-se').click()
      cy.wait(3000)
      cy.get('[type="email"]').type('meuemail@gmail.com').wait(1000)
      cy.get('[type="password"]').type('12345678').wait(1000)
      cy.contains('Entrar').click() 
      cy.wait(3000)
    
      cy.get('input').eq(0).type('pedra filosofal')
      cy.wait(1000)
      cy.get('img').eq(0).click()
      cy.wait(4000)
      cy.contains('Harry').click()
      cy.wait(4000)
      cy.contains('Adicionar').click()
      cy.wait(4000)
      cy.get('img').eq(2).click()
      cy.wait(4000)
      cy.contains('Fazer pedido').click()
      cy.wait(5000)

});
})