# 🧪 tests/ Folder

> Folder untuk Testing

**Version**: 1.0.0-20260304-Selasa-23:33 WIB  
**Maintained by**: waktuberhenti

---

## 📝 Deskripsi

Folder ini berisi semua file testing untuk project. Struktur folder ini dapat disesuaikan dengan framework testing yang Anda gunakan.

## 📁 Struktur Folder yang Disarankan

```
tests/
├── unit/             # Unit tests
│   └── *.test.js     # Test files
├── integration/      # Integration tests
│   └── *.test.js
├── e2e/              # End-to-end tests
│   └── *.spec.js
├── fixtures/         # Test data and fixtures
├── mocks/            # Mock data and functions
├── helpers/          # Test helpers and utilities
└── coverage/         # Test coverage reports (generated)
```

## 🚀 Framework Testing yang Disarankan

- **JavaScript/TypeScript**: Jest, Mocha, Vitest
- **Python**: pytest, unittest
- **Java**: JUnit, TestNG
- **Go**: testing, testify
- **Ruby**: RSpec, Minitest

## 📝 Best Practices

1. **Naming Convention**: Gunakan pattern `*.test.js` atau `*.spec.js`
2. **Struktur**: Mirror struktur folder src/
3. **Independence**: Setiap test harus independent
4. **Coverage**: Target minimal 80% code coverage
5. **Documentation**: Dokumentasikan test yang kompleks

## 📊 Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/example.test.js
```

---

*Last Updated: 1.0.0-20260304-Selasa-23:33 WIB*
