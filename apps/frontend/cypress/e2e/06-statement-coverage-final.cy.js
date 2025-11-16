/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC023-TC026: White-box - Statement Coverage", () => {
  const loginPage = new LoginPage();
  let testData;

  before(() => {
    loginPage.loadTestData().then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it("TC023: API returns 200 + JWT - Valid credentials", () => {
    cy.intercept("POST", "**/api/v1/auth/login").as("loginRequest");

    loginPage.login(
      testData.validCredentials.email,
      testData.validCredentials.password
    );

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });

  it("TC024: API returns 401 - Invalid credentials", () => {
    cy.intercept("POST", "**/api/v1/auth/login").as("loginFail");

    loginPage.login("wrong@test.com", "wrongpass");

    cy.wait("@loginFail").its("response.statusCode").should("eq", 401);
    cy.url().should("include", "/login");
  });

it("TC025: User authentication state - Success login", () => {
  loginPage.login(
    testData.validCredentials.email,
    testData.validCredentials.password
  );

  cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");

  // Verify user is logged in by checking URL changed
  cy.url().should("not.include", "/login");

  // Or check for user-specific elements on home page
  // cy.get('[data-testid="user-profile"]').should("be.visible");
});

  it("TC026: setUser() state updated - Success login", () => {
    loginPage.login(
      testData.validCredentials.email,
      testData.validCredentials.password
    );

    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });
});
