describe('Visit local host', () => {
  it('visits local host', () => {
    cy.visit('localhost:3000/');
  });
});

describe('Log in and sign up component', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });
  it('correctly inputs into form fields to log in', function () {
    cy.get('#name').type('Test').should('have.value', 'Test');
    cy.get('#email')
      .type('test@email.com')
      .should('have.value', 'test@email.com');
    cy.get('#password')
      .type('testPassword1!')
      .should('have.value', 'testPassword1!');
  });
  it.only('checks whether the email field is correctly formatted', function () {
    cy.get('#name').type('Test');
    cy.get('#email')
      .type('testemailcom')
    cy.get('#password')
      .type('testPassword1!')
    cy.get('form').submit();
  });
  it('checks whether the password field is correctly formatted', function () {});
  it('should have a submit button which can be clicked', function () {
    cy.contains('Submit').click();
  });
  it('should correctly submit if input fields are filled out correctly', function () {
    cy.get('#name').type('Test');
    cy.get('#email')
      .type('test@email.com');
    cy.get('#password')
      .type('testPassword1!');
    cy.get('form').submit();
  });
});

// describe('Dashboard component', () => {});

// possibility of checking incorrect password/email combination
