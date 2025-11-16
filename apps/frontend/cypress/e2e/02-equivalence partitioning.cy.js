/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC009-TC012: Black-box - Equivalence Partitioning", () => {
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

  it("TC009: Include @ in the input email - Missing @ symbol", () => {
    loginPage
      .typeEmail("invalid-email")
      .typePassword("Valid123456")
      .clickSubmit()
      .shouldShowFieldError("valid email");
  });

  it("TC010: Invalid email or password - Password with space", () => {
    loginPage
      .typeEmail("test@example.com")
      .typePassword(testData.boundaryData.passwordWithSpace)
      .clickSubmit();

    cy.wait(2000);
  });

  it("TC011: Invalid email or password - Special characters in password", () => {
    loginPage
      .typeEmail("test@example.com")
      .typePassword(testData.boundaryData.specialCharsPassword)
      .clickSubmit();

    cy.wait(2000);
  });

  it("TC012: Invalid email or password - SQL Injection attempt", () => {
    loginPage.login(
      testData.sqlInjection.email,
      testData.sqlInjection.password
    );

    cy.wait(2000);
  });
});
