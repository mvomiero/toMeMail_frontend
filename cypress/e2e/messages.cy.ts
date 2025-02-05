describe('Messages Page (Real API)', () => {
  beforeEach(() => {
    // Step 1: Visit the login page and log in as Alice
    cy.visit('');
    cy.visit('/login');

    cy.get('input[name="username"]').type('alice');
    cy.get('input[name="password"]').type('testPassword');
    cy.get('button[type="submit"]').click();

    // Step 2: Ensure login redirects to /messages
    cy.url().should('include', '/messages');
  });

  it('should load messages and display them correctly', () => {
    // Step 3: Visit messages page (after login)
    cy.visit('/messages');

    // Step 4: Wait for messages to load and validate UI
    cy.get('.message-card').should('have.length.greaterThan', 0);
    cy.get('.message-card').first().should('be.visible');
  });

  it('should navigate to message details when clicking a message', () => {
    // Step 3: Visit messages page
    cy.visit('/messages');

    // Step 4: Click on the first message
    cy.get('.message-card').first().click();

    // Step 5: Verify navigation to message details
    cy.url().should('include', '/messages/');
    cy.get('.message-detail').should('exist');
  });
});
