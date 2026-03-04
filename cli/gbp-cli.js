#!/usr/bin/env node

/**
 * GitHub Project Blueprint CLI Tool
 * 
 * A command-line interface for generating projects from templates
 * 
 * @version 2.0.0-20260304-Selasa-23:48 WIB
 * @author waktuberhenti
 * @license MIT
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// CLI Configuration
const CLI_VERSION = '2.0.0-20260304-Selasa-23:48 WIB';
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

// ANSI Color Codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Print colored message
 */
function print(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Display CLI Banner
 */
function showBanner() {
  console.log(`
${colors.cyan}${colors.bright}╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     GitHub Project Blueprint CLI (gbp-cli)               ║
║     Version: ${CLI_VERSION}              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}
  `);
}

/**
 * Display Help Information
 */
function showHelp() {
  showBanner();
  console.log(`
${colors.bright}USAGE:${colors.reset}
  gbp-cli <command> [options]

${colors.bright}COMMANDS:${colors.reset}
  create, c     Create a new project from template
  list, l       List all available templates
  info, i       Show detailed information about a template
  help, h       Show this help message
  version, v    Show CLI version

${colors.bright}OPTIONS:${colors.reset}
  --template, -t    Specify template name
  --name, -n        Specify project name
  --path, -p        Specify output path (default: current directory)
  --help, -h        Show help

${colors.bright}EXAMPLES:${colors.reset}
  gbp-cli create --template web-app --name my-project
  gbp-cli list
  gbp-cli info api-backend
  gbp-cli create -t library -n my-awesome-lib

${colors.bright}TEMPLATES:${colors.reset}
  web-app         Full-stack web application
  library         NPM package/library
  api-backend     REST/GraphQL API backend
  docs-site       Documentation site
  mobile-app      Cross-platform mobile app

For more information, visit: https://github.com/waktuberhenti/github-project-blueprint
  `);
}

/**
 * List all available templates
 */
function listTemplates() {
  showBanner();
  print('bright', '\n📂 Available Templates:\n');
  
  try {
    const templates = fs.readdirSync(TEMPLATES_DIR)
      .filter(dir => fs.statSync(path.join(TEMPLATES_DIR, dir)).isDirectory())
      .filter(dir => dir !== 'node_modules');

    if (templates.length === 0) {
      print('yellow', '  No templates found.');
      return;
    }

    templates.forEach(template => {
      const templatePath = path.join(TEMPLATES_DIR, template);
      const readmePath = path.join(templatePath, 'README.md');
      const configPath = path.join(templatePath, 'template.json');
      
      let description = 'No description available';
      
      if (fs.existsSync(configPath)) {
        try {
          const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
          description = config.description || description;
        } catch (e) {
          // Ignore JSON parse errors
        }
      } else if (fs.existsSync(readmePath)) {
        const readme = fs.readFileSync(readmePath, 'utf8');
        const match = readme.match(/# .+\n+(.+)/);
        if (match) description = match[1].trim();
      }

      print('green', `  ✓ ${template}`);
      console.log(`    ${description}\n`);
    });

    print('cyan', `\nTotal templates: ${templates.length}`);
    console.log('\nUse "gbp-cli info <template>" for detailed information.\n');

  } catch (error) {
    print('red', `Error reading templates: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Show detailed information about a template
 */
function showTemplateInfo(templateName) {
  showBanner();
  
  if (!templateName) {
    print('red', 'Error: Template name is required');
    console.log('\nUsage: gbp-cli info <template-name>');
    return;
  }

  const templatePath = path.join(TEMPLATES_DIR, templateName);
  
  if (!fs.existsSync(templatePath)) {
    print('red', `Error: Template "${templateName}" not found`);
    console.log('\nUse "gbp-cli list" to see available templates.');
    return;
  }

  const configPath = path.join(templatePath, 'template.json');
  const readmePath = path.join(templatePath, 'README.md');
  
  print('bright', `\n📋 Template: ${templateName}\n`);
  
  // Read template.json
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      print('blue', 'Configuration:');
      console.log(`  Name: ${config.name || templateName}`);
      console.log(`  Version: ${config.version || 'N/A'}`);
      console.log(`  Author: ${config.author || 'N/A'}`);
      console.log(`  Description: ${config.description || 'N/A'}`);
      
      if (config.tags && config.tags.length > 0) {
        console.log(`  Tags: ${config.tags.join(', ')}`);
      }
      
      if (config.dependencies) {
        console.log('\n  Dependencies:');
        if (config.dependencies.required) {
          console.log(`    Required: ${config.dependencies.required.join(', ')}`);
        }
        if (config.dependencies.optional) {
          console.log(`    Optional: ${config.dependencies.optional.join(', ')}`);
        }
      }
    } catch (e) {
      print('yellow', '  Warning: Could not parse template.json');
    }
  }
  
  // Read README.md
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    const firstParagraph = readme.split('\n\n')[1];
    if (firstParagraph) {
      print('blue', '\nDescription:');
      console.log(`  ${firstParagraph.trim()}\n`);
    }
  }
  
  console.log(`\nUse "gbp-cli create --template ${templateName} --name <project-name>" to create a project.`);
}

/**
 * Create a new project from template
 */
function createProject(options) {
  showBanner();
  
  const { template, name, outputPath = '.' } = options;
  
  if (!template || !name) {
    print('red', 'Error: Both --template and --name are required');
    console.log('\nUsage: gbp-cli create --template <template> --name <project-name>');
    console.log('   or: gbp-cli create -t <template> -n <project-name>');
    return;
  }
  
  const templatePath = path.join(TEMPLATES_DIR, template);
  const projectPath = path.resolve(outputPath, name);
  
  // Validate template exists
  if (!fs.existsSync(templatePath)) {
    print('red', `Error: Template "${template}" not found`);
    console.log('\nUse "gbp-cli list" to see available templates.');
    return;
  }
  
  // Check if project directory already exists
  if (fs.existsSync(projectPath)) {
    print('red', `Error: Directory "${name}" already exists`);
    return;
  }
  
  print('cyan', `\n🚀 Creating project "${name}" from template "${template}"...\n`);
  
  try {
    // Copy template to new project
    copyDirectory(templatePath, projectPath);
    
    // Update project-specific files
    updateProjectFiles(projectPath, name);
    
    print('green', `✅ Project "${name}" created successfully!\n`);
    
    console.log('Next steps:');
    console.log(`  cd ${name}`);
    console.log('  npm install    # Install dependencies');
    console.log('  npm start      # Start development server');
    console.log('\nHappy coding! 🎉\n');
    
  } catch (error) {
    print('red', `Error creating project: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Copy directory recursively
 */
function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Update project-specific files
 */
function updateProjectFiles(projectPath, projectName) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.name = projectName;
      packageJson.version = '1.0.0';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    } catch (e) {
      // Ignore errors
    }
  }
  
  // Update README.md title
  const readmePath = path.join(projectPath, 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');
    readme = readme.replace(/# .+/, `# ${projectName}`);
    fs.writeFileSync(readmePath, readme);
  }
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = {};
  
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];
    
    switch (arg) {
      case '--template':
      case '-t':
        options.template = nextArg;
        i++;
        break;
      case '--name':
      case '-n':
        options.name = nextArg;
        i++;
        break;
      case '--path':
      case '-p':
        options.outputPath = nextArg;
        i++;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
    }
  }
  
  return { command, options };
}

/**
 * Main CLI Entry Point
 */
function main() {
  const { command, options } = parseArgs();
  
  if (options.help || !command) {
    showHelp();
    return;
  }
  
  switch (command) {
    case 'create':
    case 'c':
      createProject(options);
      break;
    case 'list':
    case 'l':
      listTemplates();
      break;
    case 'info':
    case 'i':
      showTemplateInfo(options.template || process.argv[3]);
      break;
    case 'version':
    case 'v':
      showBanner();
      console.log(`Version: ${CLI_VERSION}`);
      break;
    case 'help':
    case 'h':
      showHelp();
      break;
    default:
      print('red', `Unknown command: ${command}`);
      console.log('\nUse "gbp-cli help" for available commands.');
      process.exit(1);
  }
}

