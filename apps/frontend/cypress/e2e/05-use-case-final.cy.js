/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC020-TC022: Black-box - Use Case Testing", () => {
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

  it("TC020: Form submits - Press Enter key", () => {
    loginPage.loginWithEnter(
      testData.validCredentials.email,
      testData.validCredentials.password
    );

    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });

  it("TC021: Navigate to home - Click Back button", () => {
    loginPage.clickBackToHome();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("TC22: Nagive to create account - click create account link", () => {
    loginPage.clickCreateAccount();
    cy.url().should("eq", "http://localhost:3000/register")
  });
});
