// Color Picker Component
class ColorPicker {
    constructor() {
        this.currentColor = {
            hex: '#4a90e2',
            rgb: { r: 74, g: 144, b: 226 },
            hsl: { h: 210, s: 69, l: 59 }
        };
        this.initializeElements();
        this.setupEventListeners();
        this.updateUI();
    }

    initializeElements() {
        const $ = id => document.getElementById(id);
        this.preview = $('colorPreview');
        this.sliders = {
            red: $('redSlider'),
            green: $('greenSlider'),
            blue: $('blueSlider')
        };
        this.values = {
            red: $('redValue'),
            green: $('greenValue'),
            blue: $('blueValue')
        };
        this.inputs = {
            hex: $('hexInput'),
            rgb: $('rgbInput'),
            hsl: $('hslInput')
        };
    }

    setupEventListeners() {
        Object.entries(this.sliders).forEach(([color, slider]) => {
            slider.addEventListener('input', () => {
                this.updateFromRGB();
                this.notifyColorChange();
            });
        });

        this.inputs.hex.addEventListener('change', () => {
            this.updateFromHex(this.inputs.hex.value);
            this.notifyColorChange();
        });

        this.inputs.rgb.addEventListener('change', () => {
            const [_, r, g, b] = this.inputs.rgb.value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/) || [];
            if (r) {
                this.sliders.red.value = r;
                this.sliders.green.value = g;
                this.sliders.blue.value = b;
                this.updateFromRGB();
                this.notifyColorChange();
            }
        });
    }

    updateFromRGB() {
        const rgb = Object.fromEntries(
            Object.entries(this.sliders).map(([k, v]) => [k[0], parseInt(v.value)])
        );

        this.currentColor = {
            rgb,
            hex: colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b),
            hsl: colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b)
        };

        this.updateUI();
    }

    updateFromHex(hex) {
        if (!/^#[0-9A-F]{6}$/i.test(hex)) return;
        const rgb = colorUtils.hexToRgb(hex);
        if (!rgb) return;

        this.currentColor = {
            hex,
            rgb,
            hsl: colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b)
        };

        this.updateUI();
    }

    updateUI() {
        this.preview.style.backgroundColor = this.currentColor.hex;
        
        Object.entries(this.values).forEach(([color, element]) => {
            const value = this.currentColor.rgb[color[0]];
            element.textContent = value;
            this.sliders[color].value = value;
        });

        const { rgb, hex, hsl } = this.currentColor;
        this.inputs.hex.value = hex;
        this.inputs.rgb.value = colorUtils.rgbToString(rgb.r, rgb.g, rgb.b);
        this.inputs.hsl.value = colorUtils.hslToString(hsl.h, hsl.s, hsl.l);
    }

    notifyColorChange() {
        document.dispatchEvent(new CustomEvent('colorchange', {
            detail: { ...this.currentColor }
        }));
    }

    getColor() {
        return this.currentColor;
    }

    setColor(hex) {
        this.updateFromHex(hex);
        this.notifyColorChange();
    }
}

const colorPicker = new ColorPicker();
window.colorPicker = colorPicker;
