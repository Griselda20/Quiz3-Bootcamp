import apiPage from '../../support/apiPage';

describe('Tugas 18 - API Automation Platzi Fixed', () => {

  // Variabel untuk menyimpan ID yang valid secara dinamis
  let validId;

  it('TC-01: GET All Categories - Success', () => {
    apiPage.getCategories().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      // Ambil ID pertama yang ada di database Platzi saat ini
      validId = response.body[0].id;
    });
  });

  it('TC-02: GET Single Category - Success', () => {
    // Gunakan validId yang didapat dari TC-01
    apiPage.getSingleCategory(validId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', validId);
    });
  });

  it('TC-03: GET Single Category - Not Found', () => {
    apiPage.getSingleCategory(99999).then((response) => {
      // Platzi memang mengembalikan 400 untuk ID yang sangat besar/ngawur
      expect(response.status).to.be.oneOf([400, 404]);
    });
  });

  it('TC-04: POST Create Category - Success', () => {
    // Kita hardcode datanya di sini untuk memastikan format yang diterima API
    const categoryData = {
      name: "Gadgets " + Math.floor(Math.random() * 1000),
      image: "https://placehold.co/600x400.png"
    };

    apiPage.createCategory(categoryData).then((response) => {
      // Jika masih 400, kita cek respon bodynya di console
      if (response.status !== 201) {
        cy.log('Error Detail: ' + JSON.stringify(response.body));
      }
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(categoryData.name);
    });
  });

  it('TC-05: POST Create Category - Invalid Payload', () => {
    apiPage.createCategory({ name: "" }).then((response) => {
      expect(response.status).to.eq(400); 
    });
  });

  it('TC-06: PUT Update Category - Success', () => {
    cy.fixture('apiData').then((data) => {
      // Update menggunakan validId yang ada
      apiPage.updateCategory(validId, data.updateCategory).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(data.updateCategory.name);
      });
    });
  });

  it('TC-07: DELETE Category - Success', () => {
    // Kita buat kategori baru dulu untuk dihapus agar tidak merusak data kategori utama
    apiPage.createCategory({ name: "Delete Me", image: "https://picsum.photos/200" }).then((res) => {
      const idToDelete = res.body.id;
      apiPage.deleteCategory(idToDelete).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('TC-08: GET List Products - Success', () => {
    apiPage.getProducts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('TC-09: GET Products with Pagination', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/products?offset=0&limit=5').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(5);
    });
  });

  it('TC-10: Verify Schema Category - Property Check', () => {
    apiPage.getSingleCategory(validId).then((response) => {
      expect(response.status).to.eq(200);
      // Gunakan .include.keys agar jika ada field tambahan dari server, test tidak failed
      expect(response.body).to.include.keys('id', 'name', 'image', 'creationAt', 'updatedAt');
      
      // Pastikan tipe datanya benar
      expect(response.body.id).to.be.a('number');
      expect(response.body.name).to.be.a('string');
    });
  });

  it('TC-11: GET All Users - Success', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/users').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('TC-12: POST Create User - Success', () => {
    const user = {
      name: "QA User",
      email: `qa_test_${Date.now()}@mail.com`, // Email harus unik setiap kali test jalan
      password: "password123",
      avatar: "https://picsum.photos/800"
    };
    cy.request('POST', 'https://api.escuelajs.co/api/v1/users', user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(user.name);
    });
  });

});