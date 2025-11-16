// ***********************************************
// Custom commands cho RecruitJob Login Testing
// ***********************************************

/**
 * Login command
 */
Cypress.Commands.add("loginUser", (email, password) => {
  cy.visit("http://localhost:3000/login");
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('button[type="submit"]').click();
});

/**
 * Take screenshot with test case number
 */
Cypress.Commands.add("screenshotTC", (tcNumber, description) => {
  cy.screenshot(`${tcNumber}-${description}`);
});

/**
 * Wait for page load
 */
Cypress.Commands.add("waitForPageLoad", () => {
  cy.wait(1000);
});

/**
 * Check validation error (frontend validation)
 */
Cypress.Commands.add("checkValidationError", (message) => {
  cy.get(".ant-form-item-explain-error").should("be.visible");
  if (message) {
    cy.get(".ant-form-item-explain-error").should("contain", message);
  }
});

/**
 * Check API error (backend error after submit)
 */
Cypress.Commands.add("checkAPIError", (message) => {
  cy.get(".ant-alert-error", { timeout: 5000 }).should("be.visible");
  if (message) {
    cy.get(".ant-alert-message").should("contain", message);
  }
});

/**
 * Check success message
 */
Cypress.Commands.add("checkSuccess", (message) => {
  cy.get(".ant-alert-success", { timeout: 10000 }).should("be.visible");
  if (message) {
    cy.get(".ant-alert-message").should("contain", message);
  }
});

/**
 * Intercept login API
 */
Cypress.Commands.add("interceptLogin", (statusCode = 200, body = {}) => {
  cy.intercept("POST", "**/api/v1/auth/login", {
    statusCode,
    body,
  }).as("loginRequest");
});

/**
 * Clear all storage and cookies
 */
Cypress.Commands.add("clearAll", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});
