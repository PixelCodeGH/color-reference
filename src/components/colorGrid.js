// Color Grid Component
class ColorGrid {
    constructor() {
        this.gridElement = document.getElementById('colorGrid');
        this.render();
        this.setupFilterButtons();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterType = button.dataset.filter;
                this.applyFilter(filterType);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    applyFilter(type) {
        const items = Array.from(this.gridElement.children);
        
        switch(type) {
            case 'hue':
                items.sort((a, b) => {
                    const colorA = colorUtils.hexToRgb(a.dataset.color);
                    const colorB = colorUtils.hexToRgb(b.dataset.color);
                    const hslA = colorUtils.rgbToHsl(colorA.r, colorA.g, colorA.b);
                    const hslB = colorUtils.rgbToHsl(colorB.r, colorB.g, colorB.b);
                    return hslA.h - hslB.h;
                });
                break;

            case 'saturation':
                items.sort((a, b) => {
                    const colorA = colorUtils.hexToRgb(a.dataset.color);
                    const colorB = colorUtils.hexToRgb(b.dataset.color);
                    const hslA = colorUtils.rgbToHsl(colorA.r, colorA.g, colorA.b);
                    const hslB = colorUtils.rgbToHsl(colorB.r, colorB.g, colorB.b);
                    return hslB.s - hslA.s;
                });
                break;

            case 'brightness':
                items.sort((a, b) => {
                    const colorA = colorUtils.hexToRgb(a.dataset.color);
                    const colorB = colorUtils.hexToRgb(b.dataset.color);
                    const hslA = colorUtils.rgbToHsl(colorA.r, colorA.g, colorA.b);
                    const hslB = colorUtils.rgbToHsl(colorB.r, colorB.g, colorB.b);
                    return hslB.l - hslA.l;
                });
                break;

            case 'contrast':
                const baseColor = window.colorPicker ? window.colorPicker.getColor().hex : '#FFFFFF';
                items.sort((a, b) => {
                    const ratioA = colorUtils.getContrastRatio(baseColor, a.dataset.color);
                    const ratioB = colorUtils.getContrastRatio(baseColor, b.dataset.color);
                    return ratioB - ratioA;
                });
                break;
        }

        const fragment = document.createDocumentFragment();
        items.forEach(item => fragment.appendChild(item));
        this.gridElement.appendChild(fragment);
    }

    render() {
        const fragment = document.createDocumentFragment();
        const [hueSteps, satSteps, lightSteps] = [30, 4, 5];
        const hueStep = 360 / hueSteps;
        const satStep = (100 - 20) / (satSteps - 1);
        const lightStep = (90 - 10) / (lightSteps - 1);

        for (let h = 0; h < 360; h += hueStep) {
            for (let s = 100; s >= 20; s -= satStep) {
                for (let l = 90; l >= 10; l -= lightStep) {
                    const rgb = colorUtils.hslToRgb(h, s, l);
                    const hex = colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
                    fragment.appendChild(this.createColorItem(hex, rgb));
                }
            }
        }

        this.gridElement.innerHTML = '';
        this.gridElement.appendChild(fragment);
    }

    createColorItem(hex, rgb) {
        const colorItem = document.createElement('div');
        colorItem.className = 'color-grid-item';
        colorItem.dataset.color = hex;
        
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info-top';
        colorInfo.innerHTML = `
            <div class="hex">${hex}</div>
            <div class="rgb">${colorUtils.rgbToString(rgb.r, rgb.g, rgb.b)}</div>
        `;
        
        const colorSwatch = document.createElement('div');
        colorSwatch.className = 'color-swatch';
        colorSwatch.style.backgroundColor = hex;
        
        colorItem.append(colorInfo, colorSwatch);
        return colorItem;
    }
}

const colorGrid = new ColorGrid();
window.colorGrid = colorGrid;
