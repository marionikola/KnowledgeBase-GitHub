# 📂 Project Templates

> Collection of Specialized Project Templates

**Version**: 2.0.0-20260304-Selasa-23:48 WIB  
**Last Updated**: 2026-03-04  
**Maintained by**: waktuberhenti  
**Status**: Phase 3 - Scale

---

## 📋 Overview

This directory contains specialized project templates for different use cases. Each template is designed to accelerate project initialization with pre-configured structures, workflows, and best practices.

## 📁 Available Templates

### 1. Web Application Template
Location: [`web-app/`](web-app/)

**Use Cases**:
- Single Page Applications (SPA)
- Progressive Web Apps (PWA)
- Full-stack web applications

**Features**:
- Frontend framework setup (React/Vue/Angular)
- Backend API structure
- Database configuration
- Docker support
- CI/CD pipeline

### 2. Library/Package Template
Location: [`library/`](library/)

**Use Cases**:
- Open source libraries
- NPM packages
- Reusable components

**Features**:
- Package.json configuration
- Build system setup
- Testing framework
- Publishing workflow
- Documentation site

### 3. API/Backend Template
Location: [`api-backend/`](api-backend/)

**Use Cases**:
- REST APIs
- GraphQL APIs
- Microservices

**Features**:
- Server framework setup
- Database integration
- Authentication/Authorization
- API documentation
- Load balancing config

### 4. Documentation Site Template
Location: [`docs-site/`](docs-site/)

**Use Cases**:
- Project documentation
- Knowledge bases
- Technical blogs

**Features**:
- Static site generator
- Markdown support
- Search functionality
- Theming system

### 5. Mobile App Template
Location: [`mobile-app/`](mobile-app/)

**Use Cases**:
- React Native apps
- Flutter apps
- Ionic apps

**Features**:
- Cross-platform setup
- Native module integration
- App store configuration
- Push notifications

---

## 🚀 Usage

### Using the CLI Tool

```bash
# Generate project from template
gbp-cli create --template web-app my-web-project

# List available templates
gbp-cli list-templates

# Get template info
gbp-cli info web-app
```

### Manual Installation

```bash
# Copy template to new project
cp -r templates/web-app/ my-new-project/
cd my-new-project

# Customize for your needs
# Edit package.json, README.md, etc.
```

---

## 🛠️ Creating Custom Templates

### Template Structure

```
template-name/
├── template.json          # Template metadata
├── README.md             # Template documentation
├── LICENSE               # License file
├── src/                  # Source files
├── tests/                # Test files
└── .github/              # GitHub configurations
```

### Template Metadata (template.json)

```json
{
  "name": "template-name",
  "version": "1.0.0",
  "description": "Template description",
  "author": "Your Name",
  "tags": ["web", "frontend", "react"],
  "dependencies": {
    "required": ["node", "npm"],
    "optional": ["docker"]
  }
}
```

---

## 📊 Template Comparison

| Template | Complexity | Setup Time | Best For |
|----------|------------|------------|----------|
| Web App | High | 5 min | Full-stack projects |
| Library | Medium | 3 min | Reusable packages |
| API Backend | Medium | 4 min | Backend services |
| Docs Site | Low | 2 min | Documentation |
| Mobile App | High | 6 min | Cross-platform apps |

---

## 🤝 Contributing Templates

To contribute a new template:

1. Create template directory
2. Add template.json metadata
3. Include comprehensive README
4. Add example usage
5. Submit PR with template documentation

---

<div align="center">

**[⬆ Back to Top](#-project-templates)**

*Last Updated: 2.0.0-20260304-Selasa-23:48 WIB*

**Maintained by waktuberhenti**

</div>
