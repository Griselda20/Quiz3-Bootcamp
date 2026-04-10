Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('OrangeHRM Login Functionality', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC-01: Success Login with Valid Credentials', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
  });

  it('TC-02: Failed Login with Invalid Password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC-03: Failed Login with Invalid Username', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC-04: Failed Login with Empty Username', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message')
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC-05: Failed Login with Empty Password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message')
      .should('be.visible')
      .and('contain', 'Required');
  });

  it('TC-06: Failed Login with Empty Username and Password', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('have.length', 2);
    cy.get('.oxd-input-group__message').each(($el) => {
      expect($el).to.contain('Required');
    });
  });

  it('TC-07: Success Logout from Dashboard', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-userdropdown-tab').click();
    cy.get('a[href*="logout"]').click();
    
    cy.wait(2000); 

    cy.url().should('include', '/auth/login');
    cy.get('.orangehrm-login-title').should('have.text', 'Login');
  });

  it('TC-08: Success Redirect to Forgot Password Page', () => {
    cy.get('.orangehrm-login-forgot-header').click();
    
    cy.url().should('include', '/auth/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
  });

  it('TC-09: Login with Uppercase Username (Case Sensitivity Test)', () => {
    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
  });

  it('TC-10: Verify Password Input Visibility (Hidden by Default)', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

});