# 🚀 Quiz 3 - Automation Testing Bootcamp

![Cypress](https://img.shields.io/badge/-cypress-%23E9C46A?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Proyek ini adalah bagian dari tugas **Bootcamp QA Automation** yang berfokus pada pengujian fungsionalitas login pada platform **OrangeHRM**. Pengujian dilakukan secara otomatis menggunakan framework **Cypress**.

---

## 📋 Deskripsi Proyek
Repositori ini berisi serangkaian skenario pengujian untuk memastikan sistem autentikasi berjalan dengan baik, mulai dari skenario positif (login berhasil) hingga skenario negatif (input salah/kosong) dan fitur pendukung seperti *Forgot Password*.

## 🛠️ Persyaratan Sistem & Instalasi
Pastikan kamu sudah memiliki [Node.js](https://nodejs.org/) terinstal di komputer kamu.

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/Griselda20/Quiz3-Bootcamp.git](https://github.com/Griselda20/Quiz3-Bootcamp.git)
   ```
2. **Masuk ke folder proyek:**
   ```bash
   cd Quiz3-Bootcamp
   ```
3. **Instal semua dependensi:**
   ```bash
   npm install
   ```

## 🚀 Cara Menjalankan Testing
Terdapat dua cara untuk menjalankan test case:

**A. Melalui Cypress Test Runner (UI Mode):**
```bash
npx cypress open
```

**B. Melalui Terminal (Headless Mode):**
```bash
npx cypress run
```

## 📂 Struktur Proyek
```text
├── cypress
│   ├── e2e                # Folder berisi file test script (.cy.js)
│   ├── fixtures           # Data testing (JSON)
│   └── support            # Konfigurasi global & custom commands
├── cypress.config.js      # File konfigurasi utama Cypress
├── package.json           # File metadata & list dependensi
└── README.md              # Dokumentasi proyek
```

## 🧪 Daftar Skenario Pengujian (Test Cases)

| ID | Nama Test Case | Deskripsi Singkat |
|:---|:---|:---|
| **TC-01** | Success Login | Login dengan username & password valid. |
| **TC-02** | Invalid Password | Login dengan password salah. |
| **TC-03** | Invalid Username | Login dengan username salah. |
| **TC-04** | Empty Username | Mengosongkan username saat login. |
| **TC-05** | Empty Password | Mengosongkan password saat login. |
| **TC-06** | Both Empty | Username & Password dikosongkan. |
| **TC-07** | Logout Function | Memastikan user bisa keluar dengan aman. |
| **TC-08** | Forgot PWD Link | Mengecek tombol 'Forgot your password?'. |
| **TC-09** | Case Sensitivity | Login menggunakan username huruf kapital. |
| **TC-10** | Password Masking | Memastikan input password tidak terlihat. |

---
**Dibuat oleh [Griselda20](https://github.com/Griselda20)**