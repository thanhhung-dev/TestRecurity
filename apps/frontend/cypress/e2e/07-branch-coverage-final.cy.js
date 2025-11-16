/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC027-TC028: White-box - Branch Coverage", () => {
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

  it("TC027: If-email-valid branch executed", () => {
    loginPage
      .typeEmail("test@example.com")
      .typePassword("Valid123456")
      .clickSubmit();

    // Email valid - no validation error
    loginPage.fieldError.should("not.exist");
  });

  it("TC028: If-email-empty branch executed", () => {
    loginPage
      .typePassword("Valid123456")
      .clickSubmit()
      .shouldShowFieldError("email");
  });
});
