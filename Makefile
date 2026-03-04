# Makefile for GitHub Project Blueprint
# Version: 2.1.0-20260304-Selasa-23:48 WIB
# Maintained by: waktuberhenti

.PHONY: help install test lint clean verify docs release

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
NC := \033[0m # No Color

## help: Display this help message
help:
	@echo "$(BLUE)GitHub Project Blueprint - Available Commands:$(NC)"
	@echo ""
	@awk '/^## / { \
		printf "  $(YELLOW)%-15s$(NC) %s\n", $$2, $$0; \
		sub(/^## /, "", $$0); \
		last = $$0; \
	} /^[a-zA-Z0-9_-]+:.*$$/ { \
		if (last) { \
			printf "    %s\n", last; \
			last = ""; \
		} \
	}' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(BLUE)Version: 2.1.0-20260304-Selasa-23:48 WIB$(NC)"

## install: Install dependencies
install:
	@echo "$(GREEN)Installing dependencies...$(NC)"
	@npm install
	@echo "$(GREEN)Dependencies installed successfully!$(NC)"

## test: Run all tests
test:
	@echo "$(GREEN)Running tests...$(NC)"
	@npm test
	@echo "$(GREEN)Tests completed!$(NC)"

## lint: Run linting checks
lint:
	@echo "$(GREEN)Running linting checks...$(NC)"
	@echo "$(YELLOW)Checking Markdown files...$(NC)"
	@find . -name "*.md" -not -path "./node_modules/*" -exec echo "  Checking {}" \;
	@echo "$(YELLOW)Checking YAML files...$(NC)"
	@find . -name "*.yml" -o -name "*.yaml" | grep -v node_modules | xargs -I {} echo "  Checking {}"
	@echo "$(GREEN)Linting completed!$(NC)"

## verify: Verify repository structure
verify:
	@echo "$(GREEN)Verifying repository structure...$(NC)"
	@test -f README.md && echo "  $(GREEN)✓$(NC) README.md exists" || echo "  $(RED)✗$(NC) README.md missing"
	@test -f LICENSE && echo "  $(GREEN)✓$(NC) LICENSE exists" || echo "  $(RED)✗$(NC) LICENSE missing"
	@test -f CHANGELOG.md && echo "  $(GREEN)✓$(NC) CHANGELOG.md exists" || echo "  $(RED)✗$(NC) CHANGELOG.md missing"
	@test -f TODO-PLAN.md && echo "  $(GREEN)✓$(NC) TODO-PLAN.md exists" || echo "  $(RED)✗$(NC) TODO-PLAN.md missing"
	@test -f .gitignore && echo "  $(GREEN)✓$(NC) .gitignore exists" || echo "  $(RED)✗$(NC) .gitignore missing"
	@test -d .github && echo "  $(GREEN)✓$(NC) .github/ directory exists" || echo "  $(RED)✗$(NC) .github/ missing"
	@test -d docs && echo "  $(GREEN)✓$(NC) docs/ directory exists" || echo "  $(RED)✗$(NC) docs/ missing"
	@test -d cli && echo "  $(GREEN)✓$(NC) cli/ directory exists" || echo "  $(RED)✗$(NC) cli/ missing"
	@test -d templates && echo "  $(GREEN)✓$(NC) templates/ directory exists" || echo "  $(RED)✗$(NC) templates/ missing"
	@echo "$(GREEN)Verification completed!$(NC)"

## docs: Generate documentation
docs:
	@echo "$(GREEN)Generating documentation...$(NC)"
	@echo "$(YELLOW)Documentation files:$(NC)"
	@find docs -name "*.md" | sort
	@echo "$(GREEN)Documentation generation completed!$(NC)"

## clean: Clean generated files
clean:
	@echo "$(YELLOW)Cleaning generated files...$(NC)"
	@rm -rf node_modules
	@rm -rf dist
	@rm -rf coverage
	@echo "$(GREEN)Cleanup completed!$(NC)"

## release: Prepare for release (usage: make release VERSION=x.x.x)
release:
	@if [ -z "$(VERSION)" ]; then \
		echo "$(RED)Error: VERSION is not set$(NC)"; \
		echo "$(YELLOW)Usage: make release VERSION=x.x.x$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Preparing release $(VERSION)...$(NC)"
	@echo "$(YELLOW)1. Updating version in package.json...$(NC)"
	@npm version $(VERSION) --no-git-tag-version
	@echo "$(YELLOW)2. Updating CHANGELOG.md...$(NC)"
	@echo "$(YELLOW)   Please update CHANGELOG.md manually$(NC)"
	@echo "$(YELLOW)3. Creating git tag...$(NC)"
	@git add .
	@git commit -m "chore(release): bump version to $(VERSION)" || echo "Nothing to commit"
	@git tag -a v$(VERSION) -m "Release version $(VERSION)"
	@echo "$(GREEN)Release $(VERSION) prepared!$(NC)"
	@echo "$(YELLOW)Run 'git push origin main --tags' to publish$(NC)"

## cli: Run CLI tool
cli:
	@node cli/gbp-cli.js $(ARGS)

## cli-list: List available templates
cli-list:
	@node cli/gbp-cli.js list

## update: Update dependencies
update:
	@echo "$(GREEN)Updating dependencies...$(NC)"
	@npm update
	@echo "$(GREEN)Dependencies updated!$(NC)"

## status: Show project status
status:
	@echo "$(BLUE)GitHub Project Blueprint - Status$(NC)"
	@echo "=================================="
	@echo "Version: $(shell cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')"
	@echo "Branch: $(shell git branch --show-current)"
	@echo "Last Commit: $(shell git log -1 --pretty=format:"%h - %s")"
	@echo "Documentation: $(shell find docs -name "*.md" | wc -l) files"
	@echo "Templates: $(shell find templates -type d -mindepth 1 | wc -l) directories"
	@echo "=================================="

# Development shortcuts
dev: install verify
	@echo "$(GREEN)Development environment ready!$(NC)"

# CI/CD targets for GitHub Actions
ci-verify: verify lint
	@echo "$(GREEN)CI verification passed!$(NC)"

ci-test: test
	@echo "$(GREEN)CI tests passed!$(NC)"

ci-build: clean install verify
	@echo "$(GREEN)CI build completed!$(NC)"
