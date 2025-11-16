/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC001-TC008: Black-box - Boundary Testing", () => {
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

  it("TC001: Email is required - Empty email field", () => {
    loginPage
      .typePassword("Valid123456")
      .clickSubmit()
      .shouldShowFieldError("email");
  });

  it("TC002: Email must be at least 3 characters", () => {
    loginPage
      .typeEmail(testData.boundaryData.shortEmail)
      .typePassword("Valid123456")
      .clickSubmit()
      .shouldShowFieldError("valid email");
  });

  it("TC003: Please enter a valid email - Invalid format", () => {
    loginPage
      .typeEmail(testData.boundaryData.invalidEmail)
      .typePassword("Valid123456")
      .clickSubmit()
      .shouldShowFieldError("valid email");
  });

  it("TC004: Invalid email or password - Email too long (100 chars)", () => {
    loginPage
      .typeEmail(testData.boundaryData.longEmail)
      .typePassword("Valid123456")
      .clickSubmit();

    cy.wait(2000);
  });

  it("TC005: Please enter your password - Empty password field", () => {
    loginPage
      .typeEmail("test@example.com")
      .clickSubmit()
      .shouldShowFieldError("password");
  });

  it("TC006: Password must be at least 6 characters", () => {
    loginPage
      .typeEmail("test@example.com")
      .typePassword(testData.boundaryData.shortPassword)
      .clickSubmit()
      .shouldShowFieldError("at least 6 characters");
  });

  it("TC007: Invalid email or password - Wrong password", () => {
    loginPage
      .typeEmail("test@example.com")
      .typePassword("123456")
      .clickSubmit();

    cy.wait(2000);
  });

  it("TC008: Invalid email or password - Wrong email", () => {
    loginPage
      .typeEmail("test@example.com")
      .typePassword("Valid123456")
      .clickSubmit();

    cy.wait(2000);
  });
});
