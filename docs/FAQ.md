# ❓ Frequently Asked Questions (FAQ)

> Common Questions and Answers for GitHub Project Blueprint

**Version**: 2.1.0-20260304-Selasa-23:48 WIB  
**Last Updated**: 2026-03-04  
**Maintained by**: waktuberhenti  
**Status**: Phase 4 - Polish

---

## 📋 Table of Contents

1. [General Questions](#general-questions)
2. [Getting Started](#getting-started)
3. [Templates](#templates)
4. [CLI Tool](#cli-tool)
5. [Customization](#customization)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)

---

## 🎯 General Questions

### Q: What is GitHub Project Blueprint?

**A:** GitHub Project Blueprint is a comprehensive template repository designed to standardize and accelerate the initialization of GitHub projects. It provides a professional structure with documentation, CI/CD workflows, templates, and best practices built-in.

### Q: Who should use this blueprint?

**A:** This blueprint is designed for:
- **Software Developers** starting new projects
- **Open Source Maintainers** seeking standardization
- **DevOps Engineers** requiring consistent CI/CD
- **Technical Leads** managing multiple projects
- **Students** learning best practices
- **Startups** needing rapid setup

### Q: Is this blueprint free to use?

**A:** Yes, this project is licensed under the MIT License, which means you can use, modify, and distribute it freely for both personal and commercial projects.

---

## 🚀 Getting Started

### Q: How do I start using the blueprint?

**A:** You have several options:

1. **Use as Template** (Recommended):
   ```bash
   # Click "Use this template" button on GitHub
   # Or fork the repository
   ```

2. **Clone and Customize**:
   ```bash
   git clone https://github.com/waktuberhenti/github-project-blueprint.git
   cd github-project-blueprint
   # Customize for your needs
   ```

3. **Use CLI Tool** (v2.0.0+):
   ```bash
   npm install -g github-project-blueprint
   gbp-cli create --template web-app my-project
   ```

### Q: What are the prerequisites?

**A:** Minimum requirements:
- Git 2.30+
- Node.js 16+ (for CLI tool)
- Text editor (VSCode recommended)
- GitHub account

### Q: Can I use this for non-Node.js projects?

**A:** Absolutely! While the CLI tool requires Node.js, the blueprint structure itself is language-agnostic. You can adapt the templates for any programming language or framework.

---

## 📦 Templates

### Q: What templates are available?

**A:** Current templates include:
- **web-app**: Full-stack web applications
- **library**: NPM packages and libraries
- **api-backend**: REST/GraphQL APIs
- **docs-site**: Documentation sites
- **mobile-app**: Cross-platform mobile apps

### Q: How do I create a custom template?

**A:** To create a custom template:

1. Create a new directory in `templates/`:
   ```bash
   mkdir templates/my-custom-template
   ```

2. Add required files:
   - `template.json` - Template metadata
   - `README.md` - Template documentation
   - Your project structure

3. Register the template:
   ```json
   {
     "name": "my-custom-template",
     "version": "1.0.0",
     "description": "My custom template"
   }
   ```

### Q: Can I modify existing templates?

**A:** Yes, you can modify any template to suit your needs. However, consider creating a new template if your modifications are significant, to maintain the integrity of the original templates.

---

## 🛠️ CLI Tool

### Q: How do I install the CLI tool?

**A:** Installation options:

```bash
# Install globally via NPM
npm install -g github-project-blueprint

# Or use npx (no installation)
npx github-project-blueprint create --template web-app my-project

# Or clone and link locally
git clone https://github.com/waktuberhenti/github-project-blueprint.git
cd github-project-blueprint
npm link
```

### Q: What commands are available?

**A:** Available commands:

| Command | Description | Example |
|---------|-------------|---------|
| `create` | Create new project | `gbp-cli create --template web-app my-project` |
| `list` | List all templates | `gbp-cli list` |
| `info` | Show template info | `gbp-cli info web-app` |
| `version` | Show version | `gbp-cli version` |
| `help` | Show help | `gbp-cli help` |

### Q: The CLI command is not found. What should I do?

**A:** Troubleshooting steps:

1. **Check global installation**:
   ```bash
   npm list -g github-project-blueprint
   ```

2. **Ensure npm global bin is in PATH**:
   ```bash
   npm bin -g
   # Add to your shell profile if needed
   ```

3. **Use npx instead**:
   ```bash
   npx github-project-blueprint <command>
   ```

---

## 🎨 Customization

### Q: How do I customize the blueprint for my organization?

**A:** Organization customization steps:

1. **Fork the repository** to your organization
2. **Update documentation**:
   - Modify `README.md` with org-specific info
   - Update `CONTRIBUTING.md` with org guidelines
   - Customize issue and PR templates

3. **Adjust templates**:
   - Add org-specific templates
   - Modify existing templates
   - Add org branding

4. **Configure CI/CD**:
   - Update GitHub Actions workflows
   - Add org-specific checks
   - Configure deployment pipelines

### Q: Can I remove features I don't need?

**A:** Yes, you can remove any features:

- Delete template directories you don't need
- Remove GitHub Actions workflows
- Simplify documentation
- Customize `.gitignore`

However, keep the core structure for consistency.

### Q: How do I add my own CI/CD pipeline?

**A:** To add custom CI/CD:

1. Create workflow file:
   ```bash
   touch .github/workflows/my-pipeline.yml
   ```

2. Define your workflow:
   ```yaml
   name: My Custom Pipeline
   on: [push, pull_request]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: My Step
           run: echo "Custom step"
   ```

---

## ⭐ Best Practices

### Q: What are the recommended best practices?

**A:** Key best practices:

1. **Version Control**:
   - Use semantic versioning
   - Write meaningful commit messages
   - Tag releases

2. **Documentation**:
   - Keep README up to date
   - Document all major decisions
   - Maintain CHANGELOG

3. **Code Quality**:
   - Use linting tools
   - Write tests
   - Code review all changes

4. **Security**:
   - Never commit secrets
   - Use environment variables
   - Regular dependency updates

### Q: How should I structure my commits?

**A:** Follow Conventional Commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Examples:
- `feat(auth): add login functionality`
- `fix(api): resolve timeout issue`
- `docs(readme): update installation steps`

### Q: What's the recommended workflow?

**A:** Recommended workflow:

1. Create feature branch
2. Make changes with tests
3. Update documentation
4. Create PR with checklist
5. Code review
6. Merge to main
7. Tag release

---

## 🔧 Troubleshooting

### Q: Why is my GitHub Actions workflow failing?

**A:** Common causes and solutions:

1. **Check workflow logs** in GitHub Actions tab
2. **Verify file syntax** using online YAML validator
3. **Check permissions** in repository settings
4. **Ensure secrets are configured** if needed

### Q: Template generation fails. What should I check?

**A:** Troubleshooting checklist:

- [ ] Template name is correct
- [ ] Template directory exists
- [ ] Sufficient disk space
- [ ] Write permissions in target directory
- [ ] Template files are not corrupted

### Q: How do I debug CLI issues?

**A:** Debug steps:

```bash
# Run with verbose output
gbp-cli create --template web-app my-project --verbose

# Check CLI version
gbp-cli version

# Verify installation
which gbp-cli
```

---

## 🤝 Contributing

### Q: How can I contribute to this project?

**A:** Contribution steps:

1. **Fork** the repository
2. **Create branch**: `git checkout -b feature/my-feature`
3. **Make changes** with tests
4. **Commit**: `git commit -m "feat: add new feature"`
5. **Push**: `git push origin feature/my-feature`
6. **Create Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Q: What type of contributions are welcome?

**A:** Welcome contributions:
- Bug fixes
- New templates
- Documentation improvements
- Feature enhancements
- Translations
- Examples and tutorials

### Q: How do I report a bug?

**A:** Bug reporting process:

1. Check existing issues
2. Use bug report template
3. Provide reproduction steps
4. Include environment details
5. Attach screenshots/logs if applicable

---

## 📚 Additional Resources

### Q: Where can I find more information?

**A:** Additional resources:

- [Architecture Documentation](ARCHITECTURE.md)
- [Development Guide](DEVELOPMENT_GUIDE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Security Policies](SECURITY.md)
- [GitHub Discussions](../../discussions)

### Q: Is there a community or support channel?

**A:** Support channels:

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: mario.nikola@yahoo.com

---

## 🔗 Reference Links

*For more detailed information, please refer to the following resources:*

- *[GitHub Documentation](https://docs.github.com/)*
- *[Git Documentation](https://git-scm.com/doc)*
- *[Conventional Commits](https://www.conventionalcommits.org/)*
- *[Semantic Versioning](https://semver.org/)*
- *[Open Source Guides](https://opensource.guide/)*
- *[Markdown Guide](https://www.markdownguide.org/)*

---

<div align="center">

**[⬆ Back to Top](#-frequently-asked-questions-faq)**

*Last Updated: 2.1.0-20260304-Selasa-23:48 WIB*

**Maintained by waktuberhenti**

</div>
