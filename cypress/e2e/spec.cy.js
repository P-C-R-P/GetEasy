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
  // it('checks whether the email field is correctly formatted', function () {
  //   cy.get('#name').type('Test');
  //   cy.get('#email')
  //     .type('testemailcom')
  //   cy.get('#password')
  //     .type('testPassword1!')
  //   cy.get('form').submit();
  // });
  // it('checks whether the password field is correctly formatted', function () {});
  it('should have a login button which can be clicked', function () {
    cy.contains('Log in').click();
  });
  it('should have a signup button which can be clicked', function () {
    cy.contains('Sign up').click();
  });
  it('should login if the input fields are filled out correctly', function () {
    cy.contains('my items').should('not.exist');
    cy.get('#name').type('Test');
    cy.get('#email').type('test@email.com');
    cy.get('#password').type('testPassword1!');
    cy.get('form').submit();
    cy.contains('my items');
  });
});

describe.only('Dashboard component', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
    cy.get('#name').type('Test');
    cy.get('#email').type('test@email.com');
    cy.get('#password').type('testPassword1!');
    cy.get('form').submit();
  });
  it('should change to view details when you click the arrow button on each item card.', function () {
    cy.get('#view-arrow').click();
    cy.url().should('include', '/details/details');
  });
});

// possibility of checking incorrect password/email combination
