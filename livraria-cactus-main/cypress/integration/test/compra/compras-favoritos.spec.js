describe('Test da função favoritos',()=>{
    it(' Test busca e favoritar livros',() => {
      cy.visit('https://livraria-cactus.vercel.app')
      cy.wait(4000)
      cy.contains('Entre ou Cadastre-se').click()
      cy.wait(3000)
      cy.get('[type="email"]').type('meuemail@gmail.com').wait(1000)
      cy.get('[type="password"]').type('12345678').wait(1000)
      cy.contains('Entrar').click() 
      cy.wait(3000)
    
      cy.get('input').eq(0).type('A Maldição do Tigre')
      cy.wait(1000)
      cy.get('img').eq(0).click()
      cy.wait(4000)
      cy.contains('A Maldição do Tigre').click()
      cy.wait(4000)
      cy.contains('Favoritar').click()
      cy.wait(4000)

      cy.get('input').type('O Nome do Vento')
      cy.wait(1000)
      cy.get('img').eq(0).click()
      cy.wait(4000)
      cy.contains('O Nome do Vento').click()
      cy.wait(4000)
      cy.contains("Favoritar").click()
      cy.wait(4000)

      cy.get('input').type('Jogos Vorazes')
      cy.wait(1000)
      cy.get('img').eq(0).click()
      cy.wait(4000)
      cy.contains('Jogos Vorazes').click()
      cy.wait(4000)
      cy.contains("Favoritar").click()
      cy.wait(4000)
      
      cy.get('img').eq(1).click()
      cy.wait(5000)

});
})