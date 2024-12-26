# Color Reference Tool

A modern, interactive color reference tool for web developers and designers. Built with vanilla JavaScript, this tool provides an intuitive interface for color selection, manipulation, and organization.

## Features

- 🎨 Interactive Color Picker
  - RGB sliders with real-time preview
  - HEX, RGB, and HSL input support
  - Live color preview

- 📊 Dynamic Color Grid
  - Comprehensive color palette display
  - Color information display (HEX, RGB)
  - Interactive color swatches

- 🔍 Advanced Filtering Options
  - Sort by Hue
  - Sort by Saturation
  - Sort by Brightness
  - Sort by Contrast ratio

- 🎯 Color Management
  - Copy color values with one click
  - Real-time color updates
  - Smooth scrolling color grid

- 🌓 Theme Support
  - Light/Dark mode toggle
  - Theme persistence using localStorage
  - Automatic system theme detection

## Installation

1. Clone the repository:
```bash
git clone https://github.com/PixelCodeGH/color-reference.git
```

2. Open the project:
```bash
cd color-reference
```

3. Serve the files using a local server (e.g., using Live Server in VS Code or any HTTP server)

## Project Structure

```
color-reference/
├── src/
│   ├── components/
│   │   ├── colorGrid.js
│   │   ├── colorPicker.js
│   │   └── paletteGenerator.js
│   ├── utils/
│   │   └── colorUtils.js
│   ├── styles/
│   │   └── main.css
│   └── index.html
├── .gitignore
├── LICENSE
└── README.md
```

## Usage

1. **Color Picker**: Use the RGB sliders or input fields to select your desired color
2. **Color Grid**: Browse through the color grid to find complementary colors
3. **Filtering**: Use the filter buttons to sort colors by different properties
4. **Theme Toggle**: Click the theme toggle button (🌙/☀️) to switch between light and dark modes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with vanilla JavaScript
- Uses modern CSS features including CSS Grid and CSS Variables
- Implements color theory principles for palette generation
