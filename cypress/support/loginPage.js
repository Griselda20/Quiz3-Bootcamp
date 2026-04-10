class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  inputPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  clickForgotPassword() {
    cy.get('.orangehrm-login-forgot-header').click();
  }

  logout() {
    cy.get('.oxd-userdropdown-tab').click();
    cy.get('a[href*="logout"]').click();
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
  }

  verifyErrorMessage(message) {
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', message);
  }

  verifyRequiredMessage(count = 1) {
    if (count === 1) {
      cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
    } else {
      cy.get('.oxd-input-group__message').should('have.length', count).each(($el) => {
        expect($el).to.contain('Required');
      });
    }
  }

  verifyForgotPasswordPage() {
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
  }

  verifyLoginPage() {
    cy.url().should('include', '/auth/login');
    cy.get('.orangehrm-login-title').should('have.text', 'Login');
  }

  verifyPasswordVisibility() {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  }
}

export default new LoginPage();