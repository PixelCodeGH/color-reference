const colorUtils = {
    rgbToHex: (r, g, b) => 
        '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join(''),

    // Convert HEX to RGB
    hexToRgb: hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    rgbToHsl: (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        const l = (max + min) / 2;

        const h = !d ? 0 : max === r 
            ? ((g - b) / d + (g < b ? 6 : 0)) / 6
            : max === g 
                ? ((b - r) / d + 2) / 6
                : ((r - g) / d + 4) / 6;

        const s = !d ? 0 : d / (l > 0.5 ? (2 - max - min) : (max + min));

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },

    hslToRgb: (h, s, l) => {
        h /= 360;
        s /= 100;
        l /= 100;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        if (!s) return { r: l * 255, g: l * 255, b: l * 255 };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        return {
            r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
            g: Math.round(hue2rgb(p, q, h) * 255),
            b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
        };
    },


    rgbToString: (r, g, b) => `rgb(${r}, ${g}, ${b})`,
    hslToString: (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`,

    getComplementary: hex => {
        const rgb = colorUtils.hexToRgb(hex);
        const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.h = (hsl.h + 180) % 360;
        const complementRgb = colorUtils.hslToRgb(hsl.h, hsl.s, hsl.l);
        return colorUtils.rgbToHex(complementRgb.r, complementRgb.g, complementRgb.b);
    },
    getAnalogous: hex => {
        const rgb = colorUtils.hexToRgb(hex);
        const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return [-30, 0, 30].map(offset => {
            const h = (hsl.h + offset + 360) % 360;
            const rgb = colorUtils.hslToRgb(h, hsl.s, hsl.l);
            return colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
        });
    },

    getTriadic: hex => {
        const rgb = colorUtils.hexToRgb(hex);
        const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return [0, 120, 240].map(offset => {
            const h = (hsl.h + offset) % 360;
            const rgb = colorUtils.hslToRgb(h, hsl.s, hsl.l);
            return colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
        });
    },

    getMonochromatic: hex => {
        const rgb = colorUtils.hexToRgb(hex);
        const hsl = colorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        return [0.1, 0.3, 0.5, 0.7, 0.9].map(l => {
            const rgb = colorUtils.hslToRgb(hsl.h, hsl.s, l * 100);
            return colorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
        });
    },

    getContrastRatio: (hex1, hex2) => {
        const getLuminance = (hex) => {
            const rgb = colorUtils.hexToRgb(hex);
            const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(value => {
                value /= 255;
                return value <= 0.03928
                    ? value / 12.92
                    : Math.pow((value + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        const l1 = getLuminance(hex1);
        const l2 = getLuminance(hex2);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        return Math.round(ratio * 100) / 100;
    }
};

window.colorUtils = colorUtils;

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    });
}
