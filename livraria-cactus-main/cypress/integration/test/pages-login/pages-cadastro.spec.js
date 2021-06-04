describe('Test da pagina Cadastro', () => {
    it('Testando componentes e função cadastrar"', () => {

      cy.visit('https://livraria-cactus.vercel.app')
      cy.wait(4000)
      cy.contains('Entre ou Cadastre-se').click()
      cy.wait(2000)
      cy.contains('Não é cadastrado? Cadastre-se aqui.').click()
      cy.wait(4000)
      cy.contains('Crie sua conta')

      cy.contains('Nome completo')
      cy.get('[type="text"]').eq(0).type('joao fulano').wait(1000)

      cy.contains('CPF')
      cy.get('[type="text"]').eq(1).type('10010010010').wait(1000)

      cy.contains('RG')
      cy.get('[type="text"]').eq(2).type('1100100').wait(1000)

      cy.contains('Cidade')
      cy.get('[type="text"]').eq(3).type('Afogados da Ingazeira').wait(1000)

      cy.contains('CEP')
      cy.get('[type="text"]').eq(4).type('56800000').wait(1000)

      cy.contains('Bairro')
      cy.get('[type="text"]').eq(5).type('São Brás').wait(1000)

      cy.contains('Estado')
      cy.get('select').select('Pernambuco').wait(1000)

      cy.contains('Rua')
      cy.get('[type="text"]').eq(6).type('Rua 2').wait(1000)

      cy.contains('Número')
      cy.get('[type="number').type('10').wait(1000)

      cy.contains('Email')
      cy.get('[type="email"]').type('meuemail@gmail.com').wait(1000)
    
      cy.contains('Senha')
      cy.get('[type="password"]').eq(0).type('12345678').wait(1000)

      cy.contains('Confirmar senha')
      cy.get('[type="password"]').eq(1).type('12345678').wait(1000)

      cy.get('[disabled]').click({force: true})
      
    })
  })