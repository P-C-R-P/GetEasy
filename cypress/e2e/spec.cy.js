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
    // First need to 'Sign up' new test cases, then 'Log in'
    cy.get('button').contains('Log in').click();
    cy.get('form').submit();
    cy.contains('my items');
  });
});

describe('Dashboard component', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
    cy.get('#name').type('Test');
    cy.get('#email').type('test@email.com');
    cy.get('#password').type('testPassword1!');
    cy.get('form').submit();
  });
  it('should change to view details when you click the arrow button on each item card', function () {
    cy.get('#view-arrow').click();
    cy.url().should('include', '/details/details');
  });
  it('should change to the create item page when you click create item', function () {
    cy.get('li').contains('create item').click();
    cy.contains('Submit');
  });
  it('should change to my items when you click on my items', function () {
    cy.get('li').contains('my items').click();
    cy.get('li').contains('all items');
  });
  //
  it('should change to all items when you click on the logo', function () {
    cy.get('li').contains('my items').click();
    cy.get('#brand-logo').click();
    cy.get('li').contains('my items');
  });
});

describe('Create item component', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
    cy.get('#name').type('Test');
    cy.get('#email').type('test@email.com');
    cy.get('#password').type('testPassword1!');
    cy.get('form').submit();
    cy.get('li').contains('create item').click();
    cy.contains('Submit');
  });
  it.only('correctly inputs into form fields to create item on dashboard', function () {
    // Typed values need to be changed upon every test.
    cy.get('#name').type('New test item').should('have.value', 'New test item');
    cy.get('#description')
      .type('A new item.')
      .should('have.value', 'A new item.');
    cy.get('#weight').type('123').should('have.value', '123');
    cy.get('#weightMeasurement').select('lb').should('have.value', 'lb');
    cy.get('#maps').click(100, 100);
    cy.get('#yes').click();
    cy.get('#maps').click(200, 200).click(500, 500);
  });
});
