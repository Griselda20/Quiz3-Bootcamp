import loginPage from '../../support/loginPage';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Tugas 17 - Full 10 Test Cases OrangeHRM POM', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-01: Success Login with Valid Credentials', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputUsername(data.validUser.username);
      loginPage.inputPassword(data.validUser.password);
      loginPage.clickLogin();
      loginPage.verifyDashboard();
    });
  });

  it('TC-02: Failed Login with Invalid Password', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputUsername(data.invalidPassword.username);
      loginPage.inputPassword(data.invalidPassword.password);
      loginPage.clickLogin();
      loginPage.verifyErrorMessage('Invalid credentials');
    });
  });

  it('TC-03: Failed Login with Invalid Username', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputUsername(data.invalidUsername.username);
      loginPage.inputPassword(data.validUser.password);
      loginPage.clickLogin();
      loginPage.verifyErrorMessage('Invalid credentials');
    });
  });

  it('TC-04: Failed Login with Empty Username', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputPassword(data.validUser.password);
      loginPage.clickLogin();
      loginPage.verifyRequiredMessage(1);
    });
  });

  it('TC-05: Failed Login with Empty Password', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputUsername(data.validUser.username);
      loginPage.clickLogin();
      loginPage.verifyRequiredMessage(1);
    });
  });

  it('TC-06: Failed Login with Empty Username and Password', () => {
    loginPage.clickLogin();
    loginPage.verifyRequiredMessage(2);
  });

  it('TC-07: Success Logout from Dashboard', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputUsername(data.validUser.username);
      loginPage.inputPassword(data.validUser.password);
      loginPage.clickLogin();
      loginPage.logout();
      loginPage.verifyLoginPage();
    });
  });

  it('TC-08: Success Redirect to Forgot Password Page', () => {
    loginPage.clickForgotPassword();
    loginPage.verifyForgotPasswordPage();
  });

  it('TC-09: Login with Uppercase Username', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.inputUsername(data.validUser.username.toUpperCase());
      loginPage.inputPassword(data.validUser.password);
      loginPage.clickLogin();
      loginPage.verifyDashboard();
    });
  });

  it('TC-10: Verify Password Input Visibility', () => {
    loginPage.verifyPasswordVisibility();
  });
});