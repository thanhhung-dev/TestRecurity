/// <reference types="cypress" />

import LoginPage from "../support/pageObjects/LoginPage";

describe("TC017-TC018: Black-box - State Transition Testing", () => {
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

  it("TC017: Redirect to homepage - Login success state", () => {
    loginPage.login(
      testData.validCredentials.email,
      testData.validCredentials.password
    );

    cy.url({ timeout: 10000 }).should("eq", "http://localhost:3000/");
  });

  it("TC018: Stay on login page - Login error state", () => {
    loginPage.login("wrong@test.com", "wrongpass");

    cy.wait(2000);
    cy.url().should("include", "/login");
  });
});
