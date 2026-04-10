Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Tugas Quiz 3 - OrangeHRM Login Functionality dengan Intercept', () => {

  beforeEach(() => {
    // Memastikan halaman login terbuka sebelum setiap test case
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC-01: Login sukses dengan akun valid', () => {
    // Intercept untuk memvalidasi request tipe password
    cy.intercept('GET', '**/auth/password/type').as('passwordType');
    
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Verifikasi berhasil masuk ke dashboard
    cy.url().should('include', '/dashboard/index');
    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
  });

  it('TC-02: Login gagal karena password salah', () => {
    // Intercept untuk memantau request POST login
    cy.intercept('POST', '**/auth/login*').as('loginAttempt');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Pastikan muncul pesan error invalid credentials
    cy.get('.oxd-alert-content-text', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('TC-03: Login gagal karena username salah', () => {
    // Intercept saat loading halaman login
    cy.intercept('GET', '**/auth/login').as('loginPageLoad');

    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('TC-04: Login gagal karena username dikosongkan', () => {
    // Intercept request file static icon
    cy.intercept('GET', '**/apple-touch-icon.png').as('staticAsset');

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Validasi pesan error input required
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  });

  it('TC-05: Login gagal karena password dikosongkan', () => {
    // Intercept request script vendor
    cy.intercept('GET', '**/vendor.js*').as('vendorScripts');

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  });

  it('TC-06: Login gagal karena username dan password kosong', () => {
    // Intercept request logo branding
    cy.intercept('GET', '**/branding/ohrm_logo.png').as('companyLogo');

    cy.get('button[type="submit"]').click();

    // Pastikan muncul 2 pesan error required
    cy.get('.oxd-input-group__message').should('have.length', 2);
  });

  it('TC-07: Logout dari Dashboard', () => {
    // Intercept proses logout
    cy.intercept('GET', '**/auth/logout').as('logoutProcess');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-userdropdown-tab').click();
    cy.get('a[href*="logout"]').click();
    
    // Tunggu proses logout selesai dan kembali ke halaman login
    cy.wait('@logoutProcess').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.url().should('include', '/auth/login');
  });

  it('TC-08: Pindah ke halaman Forgot Password', () => {
    // Intercept request halaman reset password
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPasswordPage');

    cy.get('.orangehrm-login-forgot-header').click();
    
    cy.wait('@forgotPasswordPage').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/auth/requestPasswordResetCode');
  });

  it('TC-09: Login menggunakan Username huruf kapital', () => {
    // Intercept request dashboard summary setelah login
    cy.intercept('GET', '**/dashboard/employees/action-summary').as('dashboardSummary');

    cy.get('input[name="username"]').type('ADMIN');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@dashboardSummary').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard/index');
  });

  it('TC-10: Cek tipe input password secara default', () => {
    // Intercept saat verifikasi tipe input
    cy.intercept('GET', '**/auth/login').as('verifyInput');

    // Memastikan input password tersembunyi (type="password")
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

});