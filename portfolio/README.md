# 3D Force Graph Portfolio Website

A modern, interactive portfolio website showcasing the 3D Force Graph library.

## Features

- **Interactive 3D Hero Section**: Live 3D force-directed graph visualization with auto-rotating camera
- **Modern Dark Theme**: Beautiful gradient accents and smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Code Examples**: Interactive code blocks with copy-to-clipboard functionality
- **Examples Gallery**: Showcase of various graph visualization demos
- **Performance Optimized**: Efficient rendering and scroll animations

## Structure

```
portfolio/
├── index.html      # Main HTML file with all sections
├── styles.css      # Complete styling with responsive design
├── app.js          # JavaScript for interactivity and 3D graph
└── README.md       # This file
```

## Sections

1. **Hero Section**: Interactive 3D graph background with call-to-action
2. **About Section**: Overview of library capabilities
3. **Features Section**: Key features with detailed descriptions
4. **Examples Section**: Gallery of live demos
5. **Documentation Section**: Quick start guide with code examples
6. **Footer**: Links to resources and related projects

## Usage

Simply open `index.html` in a modern web browser. The portfolio uses:
- CDN-hosted 3D Force Graph library
- Google Fonts (Inter & JetBrains Mono)
- Pure CSS animations (no additional dependencies)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --bg-dark: #0a0a0f;
    /* ... */
}
```

### Graph Configuration
Modify graph settings in `app.js`:
```javascript
const graph = ForceGraph3D()
    .nodeColor(...)
    .linkColor(...)
    .backgroundColor(...)
    // ... more options
```

### Content
Update text, links, and sections directly in `index.html`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

Requires WebGL support for 3D visualization.

## Performance

- Optimized for 60fps rendering
- Lazy loading for scroll animations
- Efficient graph physics simulation
- Responsive image loading

## Credits

Built for the [3D Force Graph](https://github.com/vasturiano/3d-force-graph) library by Vasco Asturiano.
