# Contributing to CN University

Thanks for considering contributing to CN University! This document outlines the process for contributing to this project.

## How to Contribute

1. **Fork the repository** - Create your own copy of the repository to make changes.

2. **Create a branch** - Make a branch for your changes with a descriptive name:
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes** - Implement your feature or bug fix.

4. **Test your changes** - Ensure your changes don't break existing functionality.

5. **Commit your changes** - Use clear, descriptive commit messages:
```bash
git commit -m "Add feature: your feature description"
```

6. **Push to your fork** - Upload your changes to your forked repository:
```bash
git push origin feature/your-feature-name
```

7. **Create a Pull Request** - Submit a pull request from your fork to the main repository.

## Development Environment Setup

1. Make sure you have the following prerequisites:
   - Node.js (v16 or higher)
   - DFX SDK (v0.14.0 or higher)
   - Internet Computer Wallet for deployment

2. Clone the repository:
```bash
git clone https://github.com/yourusername/cn-university.git
cd cn-university/simple_project
```

3. Start the local Internet Computer replica:
```bash
dfx start --background
```

4. Deploy locally:
```bash
dfx deploy
```

## Code Style Guidelines

- Use 4 spaces for indentation (HTML/CSS/JavaScript)
- Follow standard HTML5 semantics
- Comment your code where necessary
- Keep lines under 100 characters when possible

## Pull Request Process

1. Update the README.md and documentation with details of changes if applicable
2. Update the CHANGELOG.md with details of changes
3. The PR will be merged once it has been reviewed and approved

## Questions?

If you have any questions, please reach out to us at contact@cnuniversity.io 