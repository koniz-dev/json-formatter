// JSON Formatter Application
class JSONFormatter {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.inputJson = document.getElementById('input-json');
        this.outputJson = document.getElementById('output-json');
        this.errorMessage = document.getElementById('error-message');
        this.formatBtn = document.getElementById('format-btn');
        this.minifyBtn = document.getElementById('minify-btn');
        this.validateBtn = document.getElementById('validate-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.exampleBtn = document.getElementById('example-btn');
        this.pasteBtn = document.getElementById('paste-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.sortKeys = document.getElementById('sort-keys');
        this.toastContainer = document.getElementById('toast-container');
    }

    bindEvents() {
        this.formatBtn.addEventListener('click', () => this.formatJSON());
        this.minifyBtn.addEventListener('click', () => this.minifyJSON());
        this.validateBtn.addEventListener('click', () => this.validateJSON());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        this.pasteBtn.addEventListener('click', () => this.pasteFromClipboard());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.downloadBtn.addEventListener('click', () => this.downloadJSON());
        
        // Auto-validate on input change (with debounce)
        let timeout;
        this.inputJson.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.inputJson.value.trim()) {
                    this.autoValidate();
                }
            }, 500);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.formatJSON();
                        break;
                    case 'k':
                        e.preventDefault();
                        this.clearAll();
                        break;
                    case 'c':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.copyToClipboard();
                        }
                        break;
                }
            }
        });
    }

    showErrorOld(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
        this.outputJson.innerHTML = '<code>Error: ' + message + '</code>';
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    parseJSON(input) {
        try {
            return JSON.parse(input);
        } catch (error) {
            throw new Error('Invalid JSON: ' + error.message);
        }
    }

    formatJSON() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.showError('Error!', 'Please enter JSON to format');
            return;
        }

        try {
            this.hideError();
            const parsed = this.parseJSON(input);
            
            let formatted;
            if (this.sortKeys.checked) {
                formatted = JSON.stringify(parsed, this.sortKeysReplacer, 2);
            } else {
                formatted = JSON.stringify(parsed, null, 2);
            }

            this.outputJson.innerHTML = this.syntaxHighlight(formatted);
            this.showSuccess('Success!', 'JSON has been formatted successfully!');
            
        } catch (error) {
            this.showError('JSON Error!', error.message);
        }
    }

    sortKeysReplacer(key, value) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const sortedObj = {};
            Object.keys(value).sort().forEach(k => {
                sortedObj[k] = value[k];
            });
            return sortedObj;
        }
        return value;
    }

    minifyJSON() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.showError('Error!', 'Please enter JSON to minify');
            return;
        }

        try {
            this.hideError();
            const parsed = this.parseJSON(input);
            
            let minified;
            if (this.sortKeys.checked) {
                minified = JSON.stringify(parsed, this.sortKeysReplacer);
            } else {
                minified = JSON.stringify(parsed);
            }
            
            this.outputJson.innerHTML = this.syntaxHighlight(minified);
            this.showSuccess('Success!', 'JSON has been minified successfully!');
            
        } catch (error) {
            this.showError('JSON Error!', error.message);
        }
    }

    validateJSON() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.hideError();
            this.showWarning('Warning!', 'Please enter JSON to validate');
            return;
        }

        try {
            this.parseJSON(input);
            this.hideError();
            this.showSuccess('Valid!', 'Your JSON is completely valid!');
            
        } catch (error) {
            this.showError('JSON Error!', error.message);
        }
    }

    autoValidate() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.hideError();
            return;
        }

        try {
            this.parseJSON(input);
            this.hideError();
        } catch (error) {
            this.showErrorOld(error.message);
        }
    }

    syntaxHighlight(json) {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
            let cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    clearAll() {
        this.inputJson.value = '';
        this.outputJson.innerHTML = '<code>Results will appear here...</code>';
        this.hideError();
        this.inputJson.focus();
    }

    loadExample() {
        const example = {
            "name": "JSON Formatter",
            "version": "1.0.0",
            "description": "Free JSON formatting tool",
            "features": [
                "Format JSON",
                "Validate JSON", 
                "Minify JSON",
                "Syntax highlighting"
            ],
            "author": {
                "name": "Developer",
                "email": "dev@example.com"
            },
            "settings": {
                "sortKeys": true,
                "indentSize": 2
            },
            "isActive": true,
            "createdAt": "2024-01-01T00:00:00.000Z"
        };

        this.inputJson.value = JSON.stringify(example, null, 2);
        this.formatJSON();
    }

    async pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            this.inputJson.value = text;
            this.formatJSON();
            this.showSuccess('Pasted!', 'Content has been pasted from clipboard successfully!');
        } catch (error) {
            this.showError('Error!', 'Cannot read from clipboard. Please paste manually.');
        }
    }

    async copyToClipboard() {
        const output = this.outputJson.textContent;
        
        if (!output || output === 'Results will appear here...') {
            this.showWarning('Warning!', 'No content to copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            this.showSuccess('Copied!', 'Content has been copied to clipboard!');
        } catch (error) {
            // Fallback for older browsers
            this.inputJson.select();
            document.execCommand('copy');
            this.showSuccess('Copied!', 'Content has been copied to clipboard!');
        }
    }

    downloadJSON() {
        const output = this.outputJson.textContent;
        
        if (!output || output === 'Results will appear here...') {
            this.showWarning('Warning!', 'No content to download');
            return;
        }

        const blob = new Blob([output], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccess('Downloaded!', 'JSON file has been downloaded successfully!');
    }

    showToast(type, title, message, duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        
        toast.innerHTML = `
            <i class="toast-icon ${iconMap[type]}"></i>
            <div class="toast-content">
                <h4 class="toast-title">${title}</h4>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }

    showSuccess(title, message) {
        this.showToast('success', title, message);
    }

    showError(title, message) {
        this.showToast('error', title, message);
    }

    showInfo(title, message) {
        this.showToast('info', title, message);
    }

    showWarning(title, message) {
        this.showToast('warning', title, message);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JSONFormatter();
});

