# React Profile Page Design

A modern, responsive profile page design built with React.js featuring a beautiful gradient theme, smooth animations, and a clean user interface.

## 🎨 Features

- **Modern Design**: Beautiful gradient colors and smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Component-Based Architecture**: Organized into reusable React components
- **Interactive Elements**: Hover effects and transitions for better UX
- **Profile Stats**: Display key metrics with eye-catching cards
- **Skills Section**: Visual representation of skills with progress bars
- **Achievements Badges**: Showcase accomplishments with colorful badges
- **About Section**: Comprehensive information display

## 📦 Components

- **ProfileHeader**: Cover photo, avatar, user info, and action buttons
- **ProfileStats**: Grid display of user statistics (Posts, Followers, etc.)
- **ProfileAbout**: About me section with personal information
- **ProfileSkills**: Skills with progress bars and achievement badges

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## 🎨 Customization

### Change Colors

Edit the gradient colors in `src/App.css` and component CSS files:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Profile Data

Update the data in each component file:
- `ProfileHeader.jsx` - Name, title, location
- `ProfileStats.jsx` - Statistics values
- `ProfileAbout.jsx` - About text and info items
- `ProfileSkills.jsx` - Skills and badges

### Add New Sections

Create new components in the `src/components` directory and import them in `App.jsx`.

## 📱 Responsive Design

The profile page is fully responsive with breakpoints at:
- Desktop: > 768px
- Mobile: < 768px

## 🎯 Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Modern styling with animations and gradients
- **ES6+**: Modern JavaScript features

## 📝 Project Structure

```
react-profile-page/
├── public/
├── src/
│   ├── components/
│   │   ├── ProfileHeader.jsx
│   │   ├── ProfileHeader.css
│   │   ├── ProfileStats.jsx
│   │   ├── ProfileStats.css
│   │   ├── ProfileAbout.jsx
│   │   ├── ProfileAbout.css
│   │   ├── ProfileSkills.jsx
│   │   └── ProfileSkills.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Features

- **Gradient Backgrounds**: Eye-catching purple gradient theme
- **Smooth Animations**: Fade-in animations and hover effects
- **Card Layout**: Clean card-based design for content sections
- **Typography**: Modern font stack for readability
- **Icons**: Emoji icons for visual appeal
- **Online Status**: Green indicator showing online status
- **Progress Bars**: Animated skill level indicators
- **Badge System**: Achievement badges with custom colors

## 💡 Tips

- Replace the avatar URL in `ProfileHeader.jsx` with your own image
- Customize colors to match your brand
- Add more sections as needed (Portfolio, Contact, etc.)
- Integrate with a backend API for dynamic data
- Add routing for multiple pages

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Feel free to fork this project and customize it to your needs!

---

Built with ❤️ using React
