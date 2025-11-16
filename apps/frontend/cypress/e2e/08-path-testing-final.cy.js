/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC029-TC030: White-box - Path Testing", () => {
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

  it("TC029: Validation error path - Empty inputs", () => {
    loginPage.clickSubmit();

    // Should show validation errors
    loginPage.fieldError.should("have.length", 2);
    cy.url().should("include", "/login");
  });

  it("TC030: Success API → Redirect path - Valid credentials", () => {
    loginPage.login(
      testData.validCredentials.email,
      testData.validCredentials.password
    );

    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });
});
