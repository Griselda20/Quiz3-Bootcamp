describe('template spec', () => {
  it('passes', () => {
    describe('OrangeHRM Login Functionality', () => {
    
      // Menjalankan perintah ini sebelum setiap test case
      beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      });
    
      it('TC-01: Success Login with Valid Credentials', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    
        // Assertion: Memastikan user diarahkan ke Dashboard
        cy.url().should('include', '/dashboard/index');
        cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard');
      });
    
      it('TC-02: Failed Login with Invalid Password', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();
    
        // Assertion: Muncul pesan error "Invalid credentials"
        cy.get('.oxd-alert-content-text')
          .should('be.visible')
          .and('contain', 'Invalid credentials');
      });
    
      it('TC-03: Failed Login with Invalid Username', () => {
        cy.get('input[name="username"]').type('WrongUser');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    
        // Assertion: Muncul pesan error "Invalid credentials"
        cy.get('.oxd-alert-content-text')
          .should('be.visible')
          .and('contain', 'Invalid credentials');
      });
    
      it('TC-04: Failed Login with Empty Username', () => {
        // Kosongkan username, langsung isi password
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    
        // Assertion: Muncul validasi "Required" di bawah field username
        cy.get('.oxd-input-group__message')
          .should('be.visible')
          .and('contain', 'Required');
      });
    
      it('TC-05: Failed Login with Empty Password', () => {
        cy.get('input[name="username"]').type('Admin');
        // Password sengaja tidak diisi
        cy.get('button[type="submit"]').click();
    
        // Assertion: Muncul validasi "Required" di bawah field password
        cy.get('.oxd-input-group__message')
          .should('be.visible')
          .and('contain', 'Required');
      });
    
    });
  })
})