# JSON Formatter

<div align="center">

![JSON Formatter](https://img.shields.io/badge/JSON-Formatter-blue?style=for-the-badge&logo=json)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge)

**A professional, fast, and feature-rich JSON formatting tool built with vanilla JavaScript**

[🚀 Live Demo](https://koniz-dev.github.io/json-formatter) • [📖 Documentation](#-features) • [🐛 Report Bug](https://github.com/koniz-dev/json-formatter/issues) • [💡 Request Feature](https://github.com/koniz-dev/json-formatter/issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🛠️ Usage](#️-usage)
- [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
- [🏗️ Architecture](#️-architecture)
- [🚀 Deployment](#-deployment)
- [🛠️ Technologies](#️-technologies)
- [📱 Browser Support](#-browser-support)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🎯 Core Functionality
- **🔄 JSON Formatting** - Convert minified JSON to beautifully formatted, readable code
- **🔍 JSON Validation** - Real-time syntax validation with detailed error reporting
- **📦 JSON Minification** - Compress JSON to reduce file size
- **🎨 Syntax Highlighting** - Color-coded JSON elements for better readability

### 🚀 Advanced Features
- **📋 Clipboard Integration** - One-click copy/paste functionality
- **💾 File Export** - Download formatted JSON as `.json` files
- **⚙️ Customizable Options** - Sort keys, remove comments, and more
- **⌨️ Keyboard Shortcuts** - Power user shortcuts for faster workflow
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🌙 Modern UI** - Clean, professional interface with smooth animations

### 🔧 Developer Features
- **🚫 No Dependencies** - Pure vanilla JavaScript, no frameworks required
- **⚡ Fast Performance** - Optimized for large JSON files
- **🔒 Privacy-First** - All processing happens client-side, no data sent to servers
- **♿ Accessibility** - WCAG compliant with keyboard navigation support

---

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit the live application: **[https://koniz-dev.github.io/json-formatter](https://koniz-dev.github.io/json-formatter)**

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/koniz-dev/json-formatter.git
cd json-formatter

# Open in browser (no build process required)
open index.html
# or
python -m http.server 8000
# then visit http://localhost:8000
```

---

## 🛠️ Usage

### Basic JSON Formatting
1. **Input**: Paste or type your JSON in the input area
2. **Format**: Click "Format JSON" or press `Ctrl+Enter`
3. **Output**: View the formatted result with syntax highlighting

### JSON Validation
1. **Input**: Enter JSON to validate
2. **Validate**: Click "Validate" button
3. **Result**: See validation status with error details if invalid

### Advanced Options
- **Sort Keys**: Automatically alphabetize object keys
- **Remove Comments**: Strip JavaScript-style comments from JSON
- **Minify**: Compress JSON to minimal size

### Export Options
- **Copy**: Copy formatted JSON to clipboard
- **Download**: Save as `.json` file

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+Enter` | Format JSON | Format the current input |
| `Ctrl+K` | Clear All | Clear input and output |
| `Ctrl+Shift+C` | Copy Result | Copy output to clipboard |
| `Ctrl+V` | Paste | Paste from clipboard (when input focused) |

---

## 🏗️ Architecture

```
json-formatter/
├── 📄 index.html          # Main application structure
├── 🎨 styles.css          # Responsive styling and animations
├── ⚡ script.js           # Core application logic
├── 📖 README.md           # Project documentation
└── 🚫 .gitignore          # Git ignore rules
```

### Key Components

- **JSONFormatter Class**: Main application controller
- **Syntax Highlighter**: Custom JSON syntax highlighting engine
- **Error Handler**: Comprehensive error reporting system
- **Clipboard Manager**: Cross-browser clipboard integration
- **File Exporter**: Client-side file download functionality

---

## 🚀 Deployment

### GitHub Pages (Current)
This project is automatically deployed to GitHub Pages:

1. **Repository**: [koniz-dev/json-formatter](https://github.com/koniz-dev/json-formatter)
2. **Live URL**: [https://koniz-dev.github.io/json-formatter](https://koniz-dev.github.io/json-formatter)
3. **Auto-deploy**: Updates automatically on every push to `main` branch

### Custom Deployment
Deploy to any static hosting service:

```bash
# Build (no build process needed - just copy files)
cp -r . /path/to/web/server/

# Or use with any static site generator
# Files are ready for Netlify, Vercel, AWS S3, etc.
```

---

## 🛠️ Technologies

### Core Technologies
- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Advanced styling with Flexbox, Grid, and animations
- **Vanilla JavaScript (ES6+)** - Modern JavaScript without frameworks
- **Web APIs** - Clipboard API, File API, and Blob API

### External Resources
- **Google Fonts** - Inter font family for typography
- **Font Awesome** - Professional icon set
- **CSS Gradients** - Modern visual design

### Performance Optimizations
- **Debounced Input** - Optimized real-time validation
- **Efficient Parsing** - Fast JSON processing
- **Minimal DOM Manipulation** - Smooth user experience
- **Lazy Loading** - Resources loaded on demand

---

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full Support |
| Firefox | 55+ | ✅ Full Support |
| Safari | 12+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |
| IE | 11+ | ⚠️ Limited Support |

### Feature Support
- **Clipboard API**: Modern browsers only
- **File Download**: All supported browsers
- **JSON Parsing**: Universal support

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports
1. Check existing [issues](https://github.com/koniz-dev/json-formatter/issues)
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

### 💡 Feature Requests
1. Open an [issue](https://github.com/koniz-dev/json-formatter/issues)
2. Describe the feature and its benefits
3. Use the "enhancement" label

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### 📋 Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design
- Update documentation if needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

[⬆ Back to Top](#json-formatter)

</div>