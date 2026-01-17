# Portfolio Website

A modern, responsive portfolio website showcasing 3D data visualization projects and expertise.

## Features

- **Modern Design**: Clean, professional interface with gradient accents and smooth animations
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Interactive 3D Graph**: Live 3D force-directed graph visualization on the homepage
- **Multiple Pages**:
  - Home: Introduction and feature highlights
  - About: Background, skills, and experience
  - Projects: Showcase of 12 different visualization projects
  - Contact: Contact form and social links

## Technologies Used

- HTML5
- CSS3 (Modern features including CSS Grid, Flexbox, Custom Properties)
- JavaScript (ES6+)
- 3D Force Graph library
- ThreeJS
- WebGL

## Project Structure

```
portfolio/
├── index.html          # Homepage
├── about.html          # About page
├── projects.html       # Projects showcase
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── scripts.js          # JavaScript for 3D graph
└── README.md          # This file
```

## Getting Started

1. Open `index.html` in a modern web browser
2. Navigate through the site using the navigation menu
3. Interact with the 3D graph on the homepage
4. Explore the project demos linked from the Projects page

## Features Breakdown

### Homepage
- Auto-rotating 3D force-directed graph
- Interactive node clicking and hovering
- Feature cards highlighting capabilities
- Technology stack display

### About Page
- Professional background
- Technical skills with visual progress bars
- Areas of expertise
- Work experience timeline

### Projects Page
- 12 different visualization project cards
- Links to live demos
- Technology tags for each project
- Comprehensive project descriptions

### Contact Page
- Functional contact form with validation
- Success message on form submission
- Multiple contact methods
- Social media links

## Customization

### Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent: #22d3ee;
    /* ... more colors */
}
```

### Content
- Edit HTML files to update text content
- Modify `scripts.js` to adjust 3D graph parameters
- Update project cards in `projects.html`

### Graph Settings
Customize the 3D graph in `scripts.js`:
- Number of nodes: `numNodes` variable
- Colors: `colors` array
- Camera distance and rotation speed
- Node and link properties

## Browser Support

Works best in modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires WebGL support for 3D visualizations.

## Performance

- Optimized for smooth 60fps rendering
- Efficient CSS animations
- Lightweight JavaScript
- No external dependencies except 3D Force Graph library

## License

This portfolio template is free to use and modify for personal or commercial projects.

## Credits

Built using the [3D Force Graph](https://github.com/vasturiano/3d-force-graph) library by Vasco Asturiano.
