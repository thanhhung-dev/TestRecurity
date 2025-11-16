// ***********************************************************
// Support file sẽ được load trước tất cả test files
// ***********************************************************

// Import commands
import "./commands";

// Import Page Objects (optional, có thể import trong từng test file)
// import LoginPage from './pageObjects/LoginPage';

// Global before hook
before(() => {
  cy.log("STARTING LOGIN AUTOMATION TESTS");
});

// Global after hook
after(() => {
  cy.log("ALL TESTS COMPLETED");
});

// Global beforeEach
beforeEach(() => {
  // Clear cookies và localStorage trước mỗi test
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Catch uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // Chỉ return false nếu muốn ignore errors, không khuyến khích
  return false;
});
