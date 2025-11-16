/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC019: Black-box - Error Guessing", () => {
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

  it("TC019: Account deactivated error - Deactivated account", () => {
    loginPage.login(
      testData.invalidCredentials[2].email,
      testData.invalidCredentials[2].password
    );

    cy.wait(2000);
    cy.url().should("include", "/login");
  });
});
