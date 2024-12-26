                        // Palette Generator Component
class PaletteGenerator {
    constructor() {
        this.currentPalette = [];
        this.savedPalettes = [];
        this.initializeElements();
        this.setupEventListeners();
        // Generate initial palette with a default color
        this.generatePalette('complementary', '#4a90e2');
    }

    initializeElements() {
        this.paletteDisplay = document.getElementById('paletteDisplay');
        this.generateButtons = {
            complementary: document.getElementById('generateComplementary'),
            analogous: document.getElementById('generateAnalogous'),
            triadic: document.getElementById('generateTriadic'),
            monochromatic: document.getElementById('generateMonochromatic')
        };
    }

    setupEventListeners() {
        // Generate button events
        Object.entries(this.generateButtons).forEach(([type, button]) => {
            button.addEventListener('click', () => this.generatePalette(type));
        });

        // Listen for color picker changes
        document.addEventListener('colorchange', (e) => {
            const hex = e.detail.hex;
            this.updateBaseColor(hex);
        });

        // Palette display click delegation
        this.paletteDisplay.addEventListener('click', (e) => {
            const colorItem = e.target.closest('.palette-color');
            if (colorItem) {
                const hex = colorItem.dataset.hex;
                window.colorPicker.setColor(hex);
            }
        });
    }

    generatePalette(type) {
        const baseColor = window.colorPicker ? window.colorPicker.getColor().hex : '#4a90e2';
        
        switch (type) {
            case 'complementary':
                this.currentPalette = this.generateComplementaryPalette(baseColor);
                break;
            case 'analogous':
                this.currentPalette = colorUtils.getAnalogous(baseColor);
                break;
            case 'triadic':
                this.currentPalette = colorUtils.getTriadic(baseColor);
                break;
            case 'monochromatic':
                this.currentPalette = colorUtils.getMonochromatic(baseColor);
                break;
        }

        this.render();
    }

    generateComplementaryPalette(baseColor) {
        const complement = colorUtils.getComplementary(baseColor);
        return [baseColor, complement];
    }

    updateBaseColor(hex) {
        const type = this.getCurrentPaletteType();
        if (type) {
            this.generatePalette(type);
        }
    }

    getCurrentPaletteType() {
        if (this.currentPalette.length === 0) return null;
        
        if (this.currentPalette.length === 2) return 'complementary';
        if (this.currentPalette.length === 3) return 'analogous';
        if (this.currentPalette.length === 5) return 'monochromatic';
        
        return null;
    }

    render() {
        if (!this.paletteDisplay) return;
        this.paletteDisplay.innerHTML = '';
        
        this.currentPalette.forEach(hex => {
            const colorItem = document.createElement('div');
            colorItem.className = 'palette-color';
            colorItem.dataset.hex = hex;
            colorItem.style.backgroundColor = hex;
            
            // Create color information
            const info = document.createElement('div');
            info.className = 'color-info';
            
            const rgb = colorUtils.hexToRgb(hex);
            const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            info.innerHTML = `
                <div class="color-hex">${hex}</div>
                <div class="color-rgb">${colorUtils.rgbToString(rgb.r, rgb.g, rgb.b)}</div>
                <div class="color-hsl">${colorUtils.hslToString(hsl.h, hsl.s, hsl.l)}</div>
            `;
            
            colorItem.appendChild(info);
            
            // Add copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.textContent = 'Copy';
            copyButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.copyColorToClipboard(hex);
            });
            
            colorItem.appendChild(copyButton);
            this.paletteDisplay.appendChild(colorItem);
        });
    }

    copyColorToClipboard(hex) {
        navigator.clipboard.writeText(hex).then(() => {
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = 'Color copied!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
    }
}

// Initialize palette generator
const paletteGenerator = new PaletteGenerator();

// Export for use in other components
window.paletteGenerator = paletteGenerator;
