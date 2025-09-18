// JSON Formatter Application
class JSONFormatter {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadExample();
    }

    initializeElements() {
        this.inputJson = document.getElementById('inputJson');
        this.outputJson = document.getElementById('outputJson');
        this.errorMessage = document.getElementById('errorMessage');
        this.formatBtn = document.getElementById('formatBtn');
        this.minifyBtn = document.getElementById('minifyBtn');
        this.validateBtn = document.getElementById('validateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.exampleBtn = document.getElementById('exampleBtn');
        this.pasteBtn = document.getElementById('pasteBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.sortKeys = document.getElementById('sortKeys');
        this.removeComments = document.getElementById('removeComments');
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
        
        // Auto-format on input change (with debounce)
        let timeout;
        this.inputJson.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.inputJson.value.trim()) {
                    this.validateJSON();
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

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
        this.outputJson.innerHTML = '<code>Lỗi: ' + message + '</code>';
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    parseJSON(input) {
        try {
            // Remove comments if option is enabled
            let cleanInput = input;
            if (this.removeComments.checked) {
                cleanInput = this.removeJSONComments(input);
            }
            
            return JSON.parse(cleanInput);
        } catch (error) {
            throw new Error('JSON không hợp lệ: ' + error.message);
        }
    }

    removeJSONComments(jsonString) {
        // Remove single-line comments (// ...)
        jsonString = jsonString.replace(/\/\/.*$/gm, '');
        // Remove multi-line comments (/* ... */)
        jsonString = jsonString.replace(/\/\*[\s\S]*?\*\//g, '');
        return jsonString;
    }

    formatJSON() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.showError('Vui lòng nhập JSON để format');
            return;
        }

        try {
            this.hideError();
            const parsed = this.parseJSON(input);
            
            let formatted;
            if (this.sortKeys.checked) {
                formatted = JSON.stringify(parsed, null, 2);
            } else {
                formatted = JSON.stringify(parsed, null, 2);
            }

            this.outputJson.innerHTML = this.syntaxHighlight(formatted);
            this.showSuccess(this.formatBtn, 'Đã format thành công!');
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    minifyJSON() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.showError('Vui lòng nhập JSON để minify');
            return;
        }

        try {
            this.hideError();
            const parsed = this.parseJSON(input);
            const minified = JSON.stringify(parsed);
            
            this.outputJson.innerHTML = this.syntaxHighlight(minified);
            this.showSuccess(this.minifyBtn, 'Đã minify thành công!');
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    validateJSON() {
        const input = this.inputJson.value.trim();
        
        if (!input) {
            this.hideError();
            this.outputJson.innerHTML = '<code>Nhập JSON để validate...</code>';
            return;
        }

        try {
            this.parseJSON(input);
            this.hideError();
            this.outputJson.innerHTML = '<code style="color: #28a745;">✓ JSON hợp lệ!</code>';
            this.showSuccess(this.validateBtn, 'JSON hợp lệ!');
            
        } catch (error) {
            this.showError(error.message);
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
        this.outputJson.innerHTML = '<code>Kết quả sẽ hiển thị ở đây...</code>';
        this.hideError();
        this.inputJson.focus();
    }

    loadExample() {
        const example = {
            "name": "JSON Formatter",
            "version": "1.0.0",
            "description": "Công cụ format JSON miễn phí",
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
                "removeComments": false,
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
            this.showSuccess(this.pasteBtn, 'Đã paste từ clipboard!');
        } catch (error) {
            this.showError('Không thể đọc từ clipboard. Vui lòng paste thủ công.');
        }
    }

    async copyToClipboard() {
        const output = this.outputJson.textContent;
        
        if (!output || output === 'Kết quả sẽ hiển thị ở đây...') {
            this.showError('Không có nội dung để copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(output);
            this.showSuccess(this.copyBtn, 'Đã copy vào clipboard!');
        } catch (error) {
            // Fallback for older browsers
            this.inputJson.select();
            document.execCommand('copy');
            this.showSuccess(this.copyBtn, 'Đã copy vào clipboard!');
        }
    }

    downloadJSON() {
        const output = this.outputJson.textContent;
        
        if (!output || output === 'Kết quả sẽ hiển thị ở đây...') {
            this.showError('Không có nội dung để download');
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
        
        this.showSuccess(this.downloadBtn, 'Đã download file!');
    }

    showSuccess(button, message) {
        const originalText = button.innerHTML;
        const originalClass = button.className;
        
        button.innerHTML = '<i class="fas fa-check"></i> ' + message;
        button.className = button.className.replace(/btn-\w+/, 'btn-success');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.className = originalClass;
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JSONFormatter();
    
    // Add some helpful tips
    console.log('💡 Tips:');
    console.log('- Ctrl+Enter: Format JSON');
    console.log('- Ctrl+K: Clear all');
    console.log('- Ctrl+Shift+C: Copy result');
    console.log('- Paste JSON directly from clipboard');
});
