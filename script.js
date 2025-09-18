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
        this.copyBtn = document.getElementById('copy-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.sortKeys = document.getElementById('sort-keys');
        this.toastContainer = document.getElementById('toast-container');
        
        // New elements
        this.indentSelect = document.getElementById('indent-select');
        this.standardSelect = document.getElementById('standard-select');
        this.autoFix = document.getElementById('auto-fix');
        this.urlBtn = document.getElementById('url-btn');
        this.uploadBtn = document.getElementById('upload-btn');
        this.fileInput = document.getElementById('file-input');
        this.treeViewBtn = document.getElementById('tree-view-btn');
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.statsContainer = document.getElementById('stats-container');
        this.urlModal = document.getElementById('url-modal');
        this.urlModalClose = document.getElementById('url-modal-close');
        this.urlInput = document.getElementById('url-input');
        this.loadUrlBtn = document.getElementById('load-url-btn');
        this.cancelUrlBtn = document.getElementById('cancel-url-btn');
        
        // State
        this.isTreeView = false;
        this.currentJson = null;
    }

    bindEvents() {
        this.formatBtn.addEventListener('click', () => this.formatJSON());
        this.minifyBtn.addEventListener('click', () => this.minifyJSON());
        this.validateBtn.addEventListener('click', () => this.validateJSON());
        this.clearBtn.addEventListener('click', () => this.clearAll());
        this.exampleBtn.addEventListener('click', () => this.loadExample());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.downloadBtn.addEventListener('click', () => this.downloadJSON());
        
        // New event listeners
        this.urlBtn.addEventListener('click', () => this.showUrlModal());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.treeViewBtn.addEventListener('click', () => this.toggleTreeView());
        this.searchBtn.addEventListener('click', () => this.searchInJson());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchInJson();
        });
        
        // Real-time search highlighting
        this.searchInput.addEventListener('input', () => {
            this.highlightSearchRealTime();
        });
        
        // Modal events
        this.urlModalClose.addEventListener('click', () => this.hideUrlModal());
        this.cancelUrlBtn.addEventListener('click', () => this.hideUrlModal());
        this.loadUrlBtn.addEventListener('click', () => this.loadFromUrl());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.loadFromUrl();
        });
        
        // Close modal when clicking outside
        this.urlModal.addEventListener('click', (e) => {
            if (e.target === this.urlModal) this.hideUrlModal();
        });
        
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
            this.showWarning('Warning!', 'Please enter JSON to format');
            return;
        }

        try {
            this.hideError();
            let processedInput = input;
            
            // Auto-fix if enabled
            if (this.autoFix.checked) {
                processedInput = this.autoFixJSON(processedInput);
            }
            
            const parsed = this.parseJSON(processedInput);
            this.currentJson = parsed;
            
            // Get indentation
            const indentValue = this.indentSelect.value;
            const indent = indentValue === 'tab' ? '\t' : parseInt(indentValue);
            
            let formatted;
            if (this.sortKeys.checked) {
                formatted = JSON.stringify(parsed, this.sortKeysReplacer, indent);
            } else {
                formatted = JSON.stringify(parsed, null, indent);
            }

            if (this.isTreeView) {
                this.outputJson.innerHTML = this.createTreeView(parsed);
            } else {
                this.outputJson.innerHTML = this.syntaxHighlight(formatted);
            }
            
            this.updateStats(parsed);
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
            this.showWarning('Warning!', 'Please enter JSON to minify');
            return;
        }

        try {
            this.hideError();
            const parsed = this.parseJSON(input);
            this.currentJson = parsed;
            
            let minified;
            if (this.sortKeys.checked) {
                minified = JSON.stringify(parsed, this.sortKeysReplacer);
            } else {
                minified = JSON.stringify(parsed);
            }
            
            this.outputJson.innerHTML = this.syntaxHighlight(minified);
            this.updateStats(parsed);
            
            // Show size comparison
            const originalSize = input.length;
            const minifiedSize = minified.length;
            const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
            
            this.showSuccess('Success!', `JSON has been minified successfully! Size reduced by ${reduction}% (${this.formatBytes(originalSize)} → ${this.formatBytes(minifiedSize)})`);
            
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

    // Auto-fix JSON errors
    autoFixJSON(input) {
        let fixed = input;
        
        // Fix single quotes to double quotes
        fixed = fixed.replace(/'/g, '"');
        
        // Fix unquoted keys
        fixed = fixed.replace(/(\w+):/g, '"$1":');
        
        // Fix trailing commas
        fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
        
        // Fix missing commas between properties
        fixed = fixed.replace(/"\s*\n\s*"/g, '",\n"');
        fixed = fixed.replace(/}\s*\n\s*"/g, '},\n"');
        fixed = fixed.replace(/]\s*\n\s*"/g, '],\n"');
        
        // Fix comments (remove them)
        fixed = fixed.replace(/\/\/.*$/gm, '');
        fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');
        
        return fixed;
    }

    // URL modal methods
    showUrlModal() {
        this.urlModal.classList.add('show');
        this.urlInput.focus();
    }

    hideUrlModal() {
        this.urlModal.classList.remove('show');
        this.urlInput.value = '';
    }

    async loadFromUrl() {
        const url = this.urlInput.value.trim();
        
        if (!url) {
            this.showWarning('Warning!', 'Please enter a valid URL');
            return;
        }

        try {
            this.showInfo('Loading...', 'Fetching JSON from URL...');
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const jsonText = await response.text();
            this.inputJson.value = jsonText;
            this.hideUrlModal();
            this.formatJSON();
            this.showSuccess('Loaded!', 'JSON has been loaded from URL successfully!');
            
        } catch (error) {
            this.showError('Error!', `Failed to load JSON: ${error.message}`);
        }
    }

    // File upload methods
    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.inputJson.value = e.target.result;
            this.formatJSON();
            this.showSuccess('Uploaded!', 'JSON file has been uploaded successfully!');
        };
        reader.onerror = () => {
            this.showError('Error!', 'Failed to read the file');
        };
        reader.readAsText(file);
    }

    // Tree view methods
    toggleTreeView() {
        this.isTreeView = !this.isTreeView;
        this.treeViewBtn.innerHTML = this.isTreeView ? 
            '<i class="fas fa-code"></i> JSON View' : 
            '<i class="fas fa-sitemap"></i> Tree View';
        
        if (this.currentJson) {
            if (this.isTreeView) {
                this.outputJson.innerHTML = this.createTreeView(this.currentJson);
            } else {
                const indentValue = this.indentSelect.value;
                const indent = indentValue === 'tab' ? '\t' : parseInt(indentValue);
                const formatted = JSON.stringify(this.currentJson, null, indent);
                this.outputJson.innerHTML = this.syntaxHighlight(formatted);
            }
        }
    }

    createTreeView(obj, path = '') {
        if (obj === null) return '<span class="tree-value null">null</span>';
        if (typeof obj !== 'object') {
            const value = typeof obj === 'string' ? `"${obj}"` : obj;
            const className = typeof obj === 'number' ? 'number' : 
                            typeof obj === 'boolean' ? 'boolean' : 'string';
            return `<span class="tree-value ${className}">${value}</span>`;
        }

        if (Array.isArray(obj)) {
            if (obj.length === 0) return '<span class="tree-value">[]</span>';
            
            let html = '<span class="tree-node" data-path="' + path + '">';
            html += '<span class="tree-value">[</span>';
            html += '<span class="tree-toggle"><i class="fas fa-minus"></i></span>';
            html += '<span class="tree-children expanded">';
            
            obj.forEach((item, index) => {
                html += '<div class="tree-node">';
                html += `<span class="tree-key">${index}:</span> `;
                html += this.createTreeView(item, path + '[' + index + ']');
                html += '</div>';
            });
            
            html += '</span>';
            html += '<span class="tree-value">]</span>';
            html += '</span>';
            return html;
        }

        const keys = Object.keys(obj);
        if (keys.length === 0) return '<span class="tree-value">{}</span>';

        let html = '<span class="tree-node" data-path="' + path + '">';
        html += '<span class="tree-value">{</span>';
        html += '<span class="tree-toggle"><i class="fas fa-minus"></i></span>';
        html += '<span class="tree-children expanded">';

        keys.forEach(key => {
            html += '<div class="tree-node">';
            html += `<span class="tree-key">"${key}":</span> `;
            html += this.createTreeView(obj[key], path + '.' + key);
            html += '</div>';
        });

        html += '</span>';
        html += '<span class="tree-value">}</span>';
        html += '</span>';

        // Add click handlers for tree toggles
        setTimeout(() => {
            this.addTreeToggleHandlers();
        }, 0);

        return html;
    }

    addTreeToggleHandlers() {
        const toggles = this.outputJson.querySelectorAll('.tree-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const node = toggle.parentElement;
                const children = node.querySelector('.tree-children');
                if (children) {
                    const isExpanded = children.classList.contains('expanded');
                    children.classList.toggle('expanded');
                    toggle.innerHTML = isExpanded ? '<i class="fas fa-plus"></i>' : '<i class="fas fa-minus"></i>';
                    
                    // Add/remove ellipsis when collapsing/expanding
                    if (isExpanded) {
                        // Collapsing - add ellipsis
                        const closingBracket = node.querySelector('.tree-value:last-child');
                        if (closingBracket && (closingBracket.textContent === ']' || closingBracket.textContent === '}')) {
                            const ellipsis = document.createElement('span');
                            ellipsis.className = 'tree-ellipsis';
                            ellipsis.textContent = '...';
                            closingBracket.parentNode.insertBefore(ellipsis, closingBracket);
                        }
                    } else {
                        // Expanding - remove ellipsis
                        const ellipsis = node.querySelector('.tree-ellipsis');
                        if (ellipsis) {
                            ellipsis.remove();
                        }
                    }
                }
            });
        });
    }

    // Search functionality
    searchInJson() {
        const searchTerm = this.searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            this.showWarning('Warning!', 'Please enter a search term');
            return;
        }

        if (!this.currentJson) {
            this.showWarning('Warning!', 'No JSON to search in');
            return;
        }

        const results = this.searchInObject(this.currentJson, searchTerm, '');
        
        if (results.length === 0) {
            this.showWarning('Search Results', 'No matches found');
            return;
        }

        this.showSuccess('Search Results', `Found ${results.length} match(es)`);
        
        // Highlight matches in the output
        this.highlightSearchResults(searchTerm);
    }

    searchInObject(obj, term, path) {
        const results = [];
        
        if (typeof obj === 'string' && obj.toLowerCase().includes(term)) {
            results.push({ path, value: obj, type: 'string' });
        } else if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                obj.forEach((item, index) => {
                    results.push(...this.searchInObject(item, term, path + '[' + index + ']'));
                });
            } else {
                Object.keys(obj).forEach(key => {
                    if (key.toLowerCase().includes(term)) {
                        results.push({ path: path + '.' + key, value: key, type: 'key' });
                    }
                    results.push(...this.searchInObject(obj[key], term, path + '.' + key));
                });
            }
        }
        
        return results;
    }

    highlightSearchResults(term) {
        const output = this.outputJson.innerHTML;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlighted = output.replace(regex, '<mark>$1</mark>');
        this.outputJson.innerHTML = highlighted;
    }

    highlightSearchRealTime() {
        const searchTerm = this.searchInput.value.trim();
        
        if (!this.currentJson) {
            return;
        }

        // Get the original formatted JSON without any previous highlighting
        let originalOutput;
        if (this.isTreeView) {
            originalOutput = this.createTreeView(this.currentJson);
        } else {
            const indentValue = this.indentSelect.value;
            const indent = indentValue === 'tab' ? '\t' : parseInt(indentValue);
            const formatted = JSON.stringify(this.currentJson, null, indent);
            originalOutput = this.syntaxHighlight(formatted);
        }

        if (!searchTerm) {
            // If no search term, show original output
            this.outputJson.innerHTML = originalOutput;
            if (this.isTreeView) {
                setTimeout(() => {
                    this.addTreeToggleHandlers();
                }, 0);
            }
            return;
        }

        // Highlight search term in real-time
        const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const highlighted = originalOutput.replace(regex, '<mark>$1</mark>');
        this.outputJson.innerHTML = highlighted;

        // Re-add tree toggle handlers if in tree view
        if (this.isTreeView) {
            setTimeout(() => {
                this.addTreeToggleHandlers();
            }, 0);
        }
    }

    // Statistics
    updateStats(obj) {
        const stats = this.calculateStats(obj);
        
        // Get actual output size (without HTML tags)
        const actualOutput = this.outputJson.textContent || this.outputJson.innerText;
        const actualSize = actualOutput.length;
        
        document.getElementById('size-stat').textContent = this.formatBytes(actualSize);
        document.getElementById('depth-stat').textContent = stats.depth;
        document.getElementById('keys-stat').textContent = stats.keys;
        document.getElementById('arrays-stat').textContent = stats.arrays;
        
        this.statsContainer.style.display = 'flex';
    }

    calculateStats(obj, depth = 0) {
        let keys = 0;
        let arrays = 0;
        let maxDepth = depth;

        if (typeof obj === 'object' && obj !== null) {
            if (Array.isArray(obj)) {
                arrays++;
                obj.forEach(item => {
                    const childStats = this.calculateStats(item, depth + 1);
                    keys += childStats.keys;
                    arrays += childStats.arrays;
                    maxDepth = Math.max(maxDepth, childStats.depth);
                });
            } else {
                keys += Object.keys(obj).length;
                Object.values(obj).forEach(value => {
                    const childStats = this.calculateStats(value, depth + 1);
                    keys += childStats.keys;
                    arrays += childStats.arrays;
                    maxDepth = Math.max(maxDepth, childStats.depth);
                });
            }
        }

        return { keys, arrays, depth: maxDepth };
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JSONFormatter();
});

