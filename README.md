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
- **🔧 Auto-Fix Errors** - Automatically correct common JSON syntax issues

### 🚀 Advanced Features
- **📋 Clipboard Integration** - One-click copy/paste functionality
- **💾 File Export** - Download formatted JSON as `.json` files
- **📁 File Upload** - Upload and process JSON files directly
- **🔗 URL Loading** - Load JSON data from remote URLs
- **🌳 Tree View** - Interactive hierarchical view of JSON structure
- **🔍 Search & Filter** - Find specific keys or values within JSON
- **📊 Statistics** - View file size, depth, key count, and array statistics
- **⚙️ Customizable Options** - Sort keys, multiple indent options, and JSON standards
- **⌨️ Keyboard Shortcuts** - Power user shortcuts for faster workflow
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🌙 Modern UI** - Clean, professional interface with smooth animations

### 🔧 Developer Features
- **🚫 No Dependencies** - Pure vanilla JavaScript, no frameworks required
- **⚡ Fast Performance** - Optimized for large JSON files
- **🔒 Privacy-First** - All processing happens client-side, no data sent to servers
- **♿ Accessibility** - WCAG compliant with keyboard navigation support
- **📏 Multiple JSON Standards** - Support for RFC 8259, RFC 7159, RFC 4627, and ECMA-404
- **🎯 Flexible Indentation** - 2, 3, 4 spaces or tab indentation options

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
1. **Input**: Paste, type, upload, or load JSON from URL
2. **Format**: Click "Format JSON" or press `Ctrl+Enter`
3. **Output**: View the formatted result with syntax highlighting

### JSON Validation
1. **Input**: Enter JSON to validate
2. **Validate**: Click "Validate" button
3. **Result**: See validation status with error details if invalid
4. **Auto-Fix**: Enable auto-fix to automatically correct common errors

### Input Methods
- **📝 Manual Input**: Type or paste JSON directly
- **📁 File Upload**: Click "Upload File" to select a `.json` file
- **🔗 URL Loading**: Click "Load URL" to fetch JSON from a remote URL
- **💡 Example**: Click "Example" to load sample JSON data

### Advanced Options
- **Sort Keys**: Automatically alphabetize object keys
- **Indentation**: Choose 2, 3, 4 spaces or tab indentation
- **JSON Standard**: Select from RFC 8259, RFC 7159, RFC 4627, or ECMA-404
- **Auto-Fix Errors**: Automatically correct common JSON syntax issues
- **Minify**: Compress JSON to minimal size

### View Options
- **🌳 Tree View**: Switch to interactive hierarchical view
- **🔍 Search**: Find specific keys or values within JSON
- **📊 Statistics**: View file size, depth, key count, and array statistics

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
| `Ctrl+U` | Upload File | Open file upload dialog |
| `Ctrl+L` | Load URL | Open URL loading modal |
| `Ctrl+F` | Search | Focus search input |
| `Ctrl+T` | Tree View | Toggle tree view mode |
| `Ctrl+E` | Example | Load example JSON |
| `Escape` | Close Modal | Close any open modal |

---

## 🏗️ Architecture

```
json-formatter/
├── 📄 index.html          # Main application structure
├── 🎨 styles.css          # Responsive styling and animations
├── ⚡ script.js           # Core application logic
├── 📖 README.md           # Project documentation
├── 📄 LICENSE             # MIT License
├── 🚫 .gitignore          # Git ignore rules
└── 🖼️ favicon/            # Favicon assets
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    └── site.webmanifest
```

### Key Components

- **JSONFormatter Class**: Main application controller with comprehensive functionality
- **Syntax Highlighter**: Custom JSON syntax highlighting engine
- **Error Handler**: Comprehensive error reporting system with auto-fix capabilities
- **Clipboard Manager**: Cross-browser clipboard integration
- **File Exporter**: Client-side file download functionality
- **URL Loader**: Remote JSON fetching with CORS handling
- **File Upload Handler**: Local file processing and validation
- **Tree View Renderer**: Interactive hierarchical JSON visualization
- **Search Engine**: Real-time JSON content search and filtering
- **Statistics Calculator**: JSON structure analysis and metrics
- **Modal Manager**: User interface modal handling
- **Toast Notification System**: User feedback and status messages

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
- **Web APIs** - Clipboard API, File API, Blob API, and Fetch API

### External Resources
- **Google Fonts** - Inter font family for typography
- **Font Awesome 6.0** - Professional icon set via CDN
- **CSS Gradients** - Modern visual design
- **Web App Manifest** - PWA capabilities

### Performance Optimizations
- **Debounced Input** - Optimized real-time validation and search
- **Efficient Parsing** - Fast JSON processing with error recovery
- **Minimal DOM Manipulation** - Smooth user experience
- **Event Delegation** - Optimized event handling
- **Lazy Loading** - Resources loaded on demand
- **Memory Management** - Efficient tree view rendering
- **Caching** - Smart caching for URL-loaded content

### Browser APIs Used
- **Clipboard API** - Copy/paste functionality
- **File API** - File upload and processing
- **Blob API** - File download generation
- **Fetch API** - Remote JSON loading
- **URL API** - URL validation and processing
- **History API** - Browser history management

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
- **Clipboard API**: Modern browsers only (Chrome 66+, Firefox 63+, Safari 13.1+)
- **File Download**: All supported browsers
- **File Upload**: All supported browsers
- **URL Loading**: All supported browsers (with CORS support)
- **JSON Parsing**: Universal support
- **Tree View**: All supported browsers
- **Search & Filter**: All supported browsers
- **Statistics**: All supported browsers

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