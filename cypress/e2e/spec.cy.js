describe('template spec', () => {
  it('doesnot do much', () => {
    cy.visit('https://example.cypress.io')

    cy.contains("type")
  })
})