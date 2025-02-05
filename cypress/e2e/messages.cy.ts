describe('Messages Page (Real API)', () => {
  beforeEach(() => {
    // Visit the login page and log in as Alice
    cy.visit('/login');

    cy.get('input[name="username"]').type('alice');
    cy.get('input[name="password"]').type('testPassword');
    cy.get('button[type="submit"]').click();

    // Ensure login redirects to /messages
    cy.url().should('include', '/messages');

    // Assert JWT token is stored
    cy.window().then((win) => {
      const jwt = win.sessionStorage.getItem('jwt');
      expect(jwt).to.exist;
    });
  });

  it('should load messages and display them correctly', () => {
    // Ensure messages are displayed
    cy.get('.message-card').should('have.length.greaterThan', 0);
    cy.get('.message-card').first().should('be.visible');
  });

  it('should navigate to message details when clicking a message', () => {
    // Click on the first message
    cy.get('.message-card').first().click();

    // Verify navigation to message details
    cy.url().should('include', '/messages/');

    // Ensure message details are displayed correctly
    cy.get('.message-detail').should('exist');
    cy.get('.message-detail h2').should('contain', '2025-01-01');
    cy.get('.message-detail p').should('contain', 'Hello Future Alice!');
  });
});
