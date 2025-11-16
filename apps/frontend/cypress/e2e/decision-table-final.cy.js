/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC013-TC016: Black-box - Decision Table Testing", () => {
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

  it("TC013: Login successful - Valid credentials", () => {
    loginPage.login(
      testData.validCredentials.email,
      testData.validCredentials.password
    );

    // Success = Redirect to home
    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });

  it("TC014: Invalid email or password - Valid email, wrong password", () => {
    loginPage.login(testData.validCredentials.email, "wrongpass");

    cy.wait(2000);
    cy.url().should("include", "/login");
  });

  it("TC015: Invalid email or password - Nonexistent email, any password", () => {
    loginPage.login("nonexistent@test.com", "testpass123");

    cy.wait(2000);
    cy.url().should("include", "/login");
  });

  it("TC016: Invalid email or password - Nonexistent email, wrong password", () => {
    loginPage.login("nonexistent@test.com", "wrongpass");

    cy.wait(2000);
    cy.url().should("include", "/login");
  });
});
