/**
 * LoginPage - Page Object Model cho RecruitJob Login
 */
class LoginPage {
  constructor() {
    this.testData = null;
  }

  /**
   * Load test data from fixtures
   */
  loadTestData() {
    return cy.fixture("login-data").then((data) => {
      this.testData = data;
      return data;
    });
  }

  // Element getters
  get emailInput() {
    return cy.get('[data-testid="email-input"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  get submitButton() {
    return cy.get('button[type="submit"]');
  }

  get errorAlert() {
    return cy.get(".ant-alert-error");
  }

  get successAlert() {
    return cy.get(".ant-alert-success");
  }

  get fieldError() {
    return cy.get(".ant-form-item-explain-error");
  }

  get forgotPasswordLink() {
    return cy.contains("Forgot Password");
  }

  get createAccountLink() {
    return cy.contains("Create Account");
  }

  get backToHomeButton() {
    return cy.contains("Back to home");
  }

  get passwordVisibilityIcon() {
    return cy.get(".anticon-eye, .anticon-eye-invisible").first();
  }

  // Actions
  visit(url = "http://localhost:3000/login") {
    cy.visit(url);
    cy.wait(1000);
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  clickSubmit() {
    this.submitButton.click();
    return this;
  }

  clickForgotPassword() {
    this.forgotPasswordLink.click();
    return this;
  }

  clickCreateAccount() {
    this.createAccountLink.click();
    return this;
  }

  clickBackToHome() {
    this.backToHomeButton.click();
    return this;
  }

  togglePasswordVisibility() {
    this.passwordVisibilityIcon.click();
    return this;
  }

  // Combined actions
  login(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSubmit();
    return this;
  }

  loginWithEnter(email, password) {
    this.typeEmail(email);
    this.passwordInput.clear().type(`${password}{enter}`);
    return this;
  }

  // Assertions
  shouldShowFieldError(message) {
    this.fieldError.should("be.visible");
    if (message) {
      this.fieldError.should("contain", message);
    }
    return this;
  }

  shouldShowErrorAlert(message) {
    this.errorAlert.should("be.visible");
    if (message) {
      this.errorAlert.should("contain", message);
    }
    return this;
  }

  shouldShowSuccessAlert(message) {
    this.successAlert.should("be.visible");
    if (message) {
      this.successAlert.should("contain", message);
    }
    return this;
  }

  shouldRedirectTo(url) {
    cy.url({ timeout: 10000 }).should("eq", url);
    return this;
  }

  shouldStayOnLogin() {
    cy.url().should("include", "/login");
    return this;
  }

  shouldHavePasswordMasked() {
    this.passwordInput.should("have.attr", "type", "password");
    return this;
  }

  shouldHavePasswordVisible() {
    cy.get('input[type="text"]').should("exist");
    return this;
  }
}

export default LoginPage;
