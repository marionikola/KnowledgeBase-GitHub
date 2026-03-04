# 🤝 Contributing Guidelines

> Panduan Kontribusi untuk GitHub Project Blueprint

**Version**: 1.0.0-20260304-Selasa-23:33 WIB  
**Maintained by**: waktuberhenti

---

## 📖 Daftar Isi

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Style Guidelines](#style-guidelines)
6. [Commit Message Guidelines](#commit-message-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Reporting Bugs](#reporting-bugs)
9. [Suggesting Features](#suggesting-features)
10. [Questions](#questions)

---

## 📜 Code of Conduct

Project ini dan semua yang berpartisipasi di dalamnya diatur oleh [Code of Conduct](CODE_OF_CONDUCT.md). Dengan berpartisipasi, Anda diharapkan untuk menjaga standar ini.

---

## 🚀 Getting Started

### Prasyarat
- Akun GitHub
- Git terinstal di lokal
- Pemahaman dasar tentang Markdown
- Pemahaman dasar tentang Git workflow

### Setup Environment

1. **Fork Repository**
   ```bash
   # Klik tombol "Fork" di GitHub
   ```

2. **Clone Fork Anda**
   ```bash
   git clone https://github.com/YOUR_USERNAME/github-project-blueprint.git
   cd github-project-blueprint
   ```

3. **Setup Upstream Remote**
   ```bash
   git remote add upstream https://github.com/waktuberhenti/github-project-blueprint.git
   ```

4. **Create Branch Baru**
   ```bash
   git checkout -b feature/nama-fitur-anda
   ```

---

## 📝 How to Contribute

### Jenis Kontribusi yang Diterima

✅ **Sangat Diterima**:
- Perbaikan dokumentasi
- Bug fixes
- Fitur baru yang relevan
- Translation (terjemahan)
- Template baru
- Contoh penggunaan
- Tutorial dan guides

❌ **Tidak Diterima**:
- Perubahan yang melanggar Code of Conduct
- Konten yang melanggar hak cipta
- Spam atau promosi
- Malicious code

---

## 🔄 Development Workflow

### 1. Sync dengan Upstream
```bash
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Create Feature Branch
```bash
git checkout -b feature/nama-fitur-anda
# atau
git checkout -b fix/nama-bug-yang-di-fix
```

### 3. Make Changes
- Edit file yang diperlukan
- Test perubahan Anda
- Pastikan tidak ada error

### 4. Commit Changes
```bash
git add .
git commit -m "type(scope): deskripsi singkat"
```

### 5. Push dan Create PR
```bash
git push origin feature/nama-fitur-anda
```

---

## 🎨 Style Guidelines

### Markdown Style
- Gunakan heading yang konsisten
- Gunakan list untuk item yang berurutan
- Tambahkan link untuk referensi
- Gunakan emoji dengan bijak

### File Naming
- Gunakan lowercase
- Gunakan hyphens untuk pemisah kata
- Hindari spasi dalam nama file

### Folder Structure
```
docs/
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

---

## 💬 Commit Message Guidelines

Kami mengikuti [Conventional Commits](https://www.conventionalcommits.org/).

### Format
```
type(scope): subject

[optional body]

[optional footer]
```

### Types
| Type | Deskripsi |
|------|-----------|
| `feat` | Fitur baru |
| `fix` | Perbaikan bug |
| `docs` | Perubahan dokumentasi |
| `style` | Perubahan style (formatting, semicolon, etc) |
| `refactor` | Refactor code |
| `test` | Menambah atau memperbarui tests |
| `chore` | Maintenance tasks |

### Contoh
```
feat(docs): add contributing guidelines

fix(template): resolve issue with bug report template

docs(readme): update installation instructions
```

---

## 🔄 Pull Request Process

### Sebelum Membuat PR

1. **Pastikan Tests Pass**
   - Semua test harus pass
   - Tidak ada error linting

2. **Update Dokumentasi**
   - Update README jika diperlukan
   - Update CHANGELOG.md

3. **Sync dengan Main**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Membuat PR

1. **Judul PR**
   - Gunakan format: `type: Deskripsi singkat`
   - Contoh: `feat: Add GitHub Actions workflow`

2. **Deskripsi PR**
   - Jelaskan apa yang diubah
   - Jelaskan mengapa diubah
   - Referensikan issue terkait (jika ada)
   - Tambahkan screenshot jika relevan

3. **Template PR**
   ```markdown
   ## Deskripsi
   Deskripsi singkat tentang perubahan

   ## Perubahan
   - [ ] Fitur A
   - [ ] Fitur B

   ## Checklist
   - [ ] Tests pass
   - [ ] Dokumentasi updated
   - [ ] CHANGELOG.md updated

   ## Related Issues
   Closes #123
   ```

### Review Process

1. Maintainer akan review PR dalam 3-5 hari kerja
2. Address feedback jika ada
3. Setelah approve, PR akan di-merge

---

## 🐛 Reporting Bugs

### Sebelum Report
- Cek issue yang sudah ada
- Pastikan bug belum di-fix di versi terbaru

### Format Bug Report

Gunakan template [bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md)

```markdown
**Deskripsi Bug**
Deskripsi jelas tentang bug

**Cara Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
Apa yang seharusnya terjadi

**Actual Behavior**
Apa yang sebenarnya terjadi

**Screenshots**
Jika ada

**Environment**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

---

## 💡 Suggesting Features

### Format Feature Request

Gunakan template [feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md)

```markdown
**Fitur yang Diusulkan**
Deskripsi singkat fitur

**Motivasi**
Mengapa fitur ini diperlukan

**Solusi yang Diinginkan**
Bagaimana fitur ini harus bekerja

**Alternatif yang Dipertimbangkan**
Alternatif lain yang sudah dipertimbangkan

**Additional Context**
Context atau screenshot tambahan
```

---

## ❓ Questions

### Cara Bertanya
1. Cek dokumentasi terlebih dahulu
2. Cek FAQ di README
3. Search issue yang sudah ada
4. Buat issue baru dengan label `question`

### Channels
- GitHub Issues (untuk technical questions)
- GitHub Discussions (untuk general questions)

---

## 🏆 Recognition

Kontributor akan diakui di:
- README.md Contributors section
- Release notes
- Hall of Fame (future)

---

## 📞 Contact

Jika ada pertanyaan tentang kontribusi:
- Email: [your-email@example.com]
- GitHub: [@waktuberhenti](https://github.com/waktuberhenti)

---

## 📚 Resources

- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Open Source Guide](https://opensource.guide/)

---

<div align="center">

**Terima kasih atas kontribusi Anda! 🎉**

*Last Updated: 1.0.0-20260304-Selasa-23:33 WIB*

**Maintained by waktuberhenti**

</div>
