# Onboarding Feature

## Overview
Added an interactive onboarding overlay to help new users understand how to interact with the 3D Force Graph visualization.

## Features
- **Welcome overlay** with step-by-step instructions
- **4 key interactions explained**:
  1. 🔄 Rotate View - Click and drag to rotate
  2. 🔍 Zoom - Scroll wheel to zoom in/out
  3. ✋ Pan View - Right-click and drag to pan
  4. 👆 Interact with Nodes - Hover, click, and drag nodes
- **"Don't show again" option** - Uses localStorage to remember user preference
- **Smooth animations** - Fade in/out transitions
- **Beautiful styling** - Modern gradient design with hover effects
- **Callback support** - `onOnboardingComplete` callback when user dismisses

## API

### New Props

#### `enableOnboarding` (Boolean, default: `false`)
Enable or disable the onboarding overlay.

```javascript
ForceGraph3D()
  .enableOnboarding(true)
```

#### `onboardingStorageKey` (String, default: `'3d-force-graph-onboarding-completed'`)
The localStorage key used to store whether the user has completed onboarding.

```javascript
ForceGraph3D()
  .enableOnboarding(true)
  .onboardingStorageKey('my-custom-onboarding-key')
```

#### `onOnboardingComplete` (Function, default: `() => {}`)
Callback function invoked when the user dismisses the onboarding overlay.

```javascript
ForceGraph3D()
  .enableOnboarding(true)
  .onOnboardingComplete(() => {
    console.log('User completed onboarding!');
  })
```

## Usage Example

```html
<!DOCTYPE html>
<html>
<head>
  <style> body { margin: 0; } </style>
  <script src="//unpkg.com/3d-force-graph"></script>
</head>
<body>
  <div id="3d-graph"></div>

  <script>
    // Create sample data
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };

    // Initialize graph with onboarding
    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
        .graphData(gData)
        .enableOnboarding(true)
        .onOnboardingComplete(() => {
          console.log('Onboarding completed!');
        });
  </script>
</body>
</html>
```

## Implementation Details

### Files Modified
1. **src/3d-force-graph.css** - Added onboarding overlay styles
2. **src/3d-force-graph.js** - Added onboarding logic and props
3. **example/onboarding/index.html** - Created example demonstrating the feature

### CSS Classes
- `.graph-onboarding-overlay` - Full-screen overlay container
- `.graph-onboarding-content` - Content card with gradient background
- `.graph-onboarding-title` - Main title
- `.graph-onboarding-steps` - Container for instruction steps
- `.graph-onboarding-step` - Individual step card
- `.graph-onboarding-step-icon` - Emoji icon for each step
- `.graph-onboarding-step-title` - Step title
- `.graph-onboarding-step-description` - Step description
- `.graph-onboarding-buttons` - Button container
- `.graph-onboarding-button` - Button base styles
- `.graph-onboarding-button-primary` - Primary button (Get Started)
- `.graph-onboarding-checkbox-container` - Checkbox and label container

### Behavior
1. When `enableOnboarding` is `true`, the component checks localStorage for the completion flag
2. If not found, the overlay is displayed on initialization
3. User can check "Don't show this again" before dismissing
4. Clicking "Get Started" triggers:
   - Save preference to localStorage (if checkbox checked)
   - Fade out animation
   - Remove overlay from DOM
   - Call `onOnboardingComplete` callback

### Browser Compatibility
- Works in all modern browsers with localStorage support
- Gracefully handles localStorage errors (e.g., private browsing mode)
- Falls back to showing onboarding if localStorage is unavailable

## Testing
To test the onboarding feature:

1. Open `example/onboarding/index.html` in a browser
2. The onboarding overlay should appear automatically
3. Click "Get Started" to dismiss
4. Refresh the page - overlay should reappear (checkbox not checked)
5. Check "Don't show this again" and click "Get Started"
6. Refresh the page - overlay should NOT appear
7. Clear localStorage to reset: `localStorage.removeItem('3d-force-graph-onboarding-completed')`

## Future Enhancements
- Multi-step interactive tutorial with highlights
- Customizable content and styling
- Support for custom onboarding steps
- Progress indicators
- Skip button option
- Keyboard navigation support
