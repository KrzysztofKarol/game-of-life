describe('Game of Life', function() {
  it('The button is on the page', function() {
    cy.visit('http://localhost:3000/');
    cy.get('button');
  });
});
