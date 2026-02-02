# Interactive Onboarding Tutorial

This directory contains examples of how to add interactive onboarding experiences to your 3D Force Graph visualizations.

## Files

- **`index.html`** - Complete standalone onboarding example with custom UI
- **`plugin-example.html`** - Example using the reusable ForceGraphOnboarding plugin
- **`../../src/force-graph-onboarding.js`** - The reusable onboarding plugin

## Features

### 🎓 Interactive Tutorial
- Step-by-step guided tour of 3D Force Graph features
- Beautiful, responsive overlay UI
- Progress tracking with visual indicators
- Previous/Next navigation
- Skip functionality

### 🎨 Customizable
- Custom step content with HTML support
- Configurable theme colors
- Custom actions per step (camera movements, highlights, etc.)
- Callback functions for completion/skip events

### 💾 Persistent State
- Remembers if user has completed onboarding
- Uses localStorage to avoid repetitive tutorials
- Easy reset functionality

## Quick Start

### Option 1: Standalone Example

Open `index.html` in your browser to see a complete onboarding implementation with:
- Custom styled overlay
- 7 comprehensive tutorial steps
- Interactive demonstrations
- Restart tutorial button

### Option 2: Using the Plugin

Include the plugin in your project:

```html
<script src="//unpkg.com/3d-force-graph"></script>
<script src="path/to/force-graph-onboarding.js"></script>

<script>
  // Initialize your graph
  const Graph = ForceGraph3D()
    (document.getElementById('graph'))
    .graphData(myData);

  // Add onboarding
  const onboarding = ForceGraphOnboarding(Graph, {
    autoStart: true,
    steps: [
      {
        title: 'Welcome! 👋',
        content: '<p>Welcome to your graph visualization!</p>',
        action: (graph) => {
          // Optional: perform actions when this step is shown
          graph.cameraPosition({ x: 0, y: 0, z: 300 }, null, 1000);
        }
      },
      // Add more steps...
    ]
  });
</script>
```

## Plugin API

### Constructor

```javascript
ForceGraphOnboarding(graphInstance, options)
```

**Parameters:**
- `graphInstance` - Your 3D Force Graph instance
- `options` - Configuration object (see below)

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `steps` | Array | Default steps | Array of tutorial step objects |
| `autoStart` | Boolean | `false` | Auto-start tutorial on first visit |
| `storageKey` | String | `'3d-force-graph-onboarding'` | LocalStorage key for state |
| `theme.primaryColor` | String | `'#007bff'` | Primary UI color |
| `theme.overlayColor` | String | `'rgba(0, 0, 0, 0.7)'` | Overlay background |
| `theme.borderRadius` | String | `'12px'` | Border radius for UI elements |
| `onComplete` | Function | `null` | Callback when tutorial completes |
| `onSkip` | Function | `null` | Callback when tutorial is skipped |

### Step Object Structure

```javascript
{
  title: 'Step Title',           // Required: Step heading
  content: '<p>Step content</p>', // Required: HTML content (can include lists, formatting, etc.)
  action: (graph) => {            // Optional: Function to execute when step is shown
    // Perform actions like moving camera, highlighting nodes, etc.
    graph.cameraPosition({ x: 100, y: 100, z: 100 });
  }
}
```

### Methods

| Method | Description |
|--------|-------------|
| `start()` | Start the onboarding tutorial |
| `next()` | Advance to the next step |
| `previous()` | Go back to the previous step |
| `skip()` | Skip the tutorial and mark as skipped |
| `complete()` | Complete the tutorial and mark as completed |
| `reset()` | Clear completion state from localStorage |
| `hasCompleted()` | Returns `true` if user has completed the tutorial |
| `destroy()` | Remove onboarding UI from DOM |
| `getCurrentStep()` | Get the current step index |
| `getTotalSteps()` | Get total number of steps |
| `isActive()` | Returns `true` if onboarding is currently active |

## Tutorial Step Best Practices

### 1. Welcome Step
Start with a friendly welcome that explains what users will learn:

```javascript
{
  title: 'Welcome to 3D Force Graph! 👋',
  content: `
    <p>This tutorial will teach you:</p>
    <ul>
      <li>How to navigate in 3D space</li>
      <li>Interacting with nodes and links</li>
      <li>Customization options</li>
    </ul>
  `
}
```

### 2. Interactive Navigation
Teach controls with hands-on practice:

```javascript
{
  title: 'Camera Navigation 🎥',
  content: `
    <p>Try these controls:</p>
    <ul>
      <li><strong>Left-click + Drag</strong> - Rotate</li>
      <li><strong>Right-click + Drag</strong> - Pan</li>
      <li><strong>Scroll</strong> - Zoom</li>
    </ul>
  `,
  action: (graph) => {
    // Demonstrate by moving camera
    graph.cameraPosition({ x: 200, y: 200, z: 200 }, null, 2000);
  }
}
```

### 3. Feature Demonstrations
Show features in action:

```javascript
{
  title: 'Node Interactions 🎯',
  content: `
    <p>Hover over nodes to see details, click to focus.</p>
  `,
  action: (graph) => {
    const nodes = graph.graphData().nodes;
    if (nodes.length > 0) {
      const node = nodes[0];
      // Focus on a specific node
      graph.cameraPosition(
        { x: node.x * 2, y: node.y * 2, z: node.z * 2 },
        node,
        1500
      );
    }
  }
}
```

### 4. Closing Step
End with next steps and resources:

```javascript
{
  title: 'You\'re All Set! 🚀',
  content: `
    <p>Explore the API docs for advanced features:</p>
    <ul>
      <li><a href="..." target="_blank">API Reference</a></li>
      <li><a href="..." target="_blank">More Examples</a></li>
    </ul>
  `
}
```

## Customization Examples

### Custom Theme

```javascript
const onboarding = ForceGraphOnboarding(Graph, {
  theme: {
    primaryColor: '#ff6b6b',
    overlayColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '16px'
  }
});
```

### With Callbacks

```javascript
const onboarding = ForceGraphOnboarding(Graph, {
  onComplete: () => {
    console.log('Tutorial completed!');
    // Track analytics, show congratulations, etc.
  },
  onSkip: () => {
    console.log('Tutorial skipped');
    // Track skip event
  }
});
```

### Manual Control

```javascript
// Don't auto-start
const onboarding = ForceGraphOnboarding(Graph, {
  autoStart: false
});

// Start manually when user clicks a button
document.getElementById('help-btn').addEventListener('click', () => {
  onboarding.start();
});
```

### Check Completion Status

```javascript
const onboarding = ForceGraphOnboarding(Graph);

if (!onboarding.hasCompleted()) {
  // Show a hint that tutorial is available
  showTutorialHint();
}

// Allow users to restart
document.getElementById('restart-tutorial').addEventListener('click', () => {
  onboarding.reset();
  onboarding.start();
});
```

## Advanced Usage

### Dynamic Steps Based on Data

```javascript
const steps = [
  {
    title: 'Your Network Overview',
    content: `
      <p>Your graph contains:</p>
      <ul>
        <li>${Graph.graphData().nodes.length} nodes</li>
        <li>${Graph.graphData().links.length} connections</li>
      </ul>
    `
  },
  // More steps...
];

const onboarding = ForceGraphOnboarding(Graph, { steps });
```

### Conditional Step Actions

```javascript
{
  title: 'Exploring Communities',
  content: '<p>Notice how nodes are grouped by color...</p>',
  action: (graph) => {
    const data = graph.graphData();
    // Find the largest cluster
    const clusterCounts = {};
    data.nodes.forEach(node => {
      clusterCounts[node.group] = (clusterCounts[node.group] || 0) + 1;
    });
    
    const largestCluster = Object.keys(clusterCounts)
      .reduce((a, b) => clusterCounts[a] > clusterCounts[b] ? a : b);
    
    // Focus on a node from the largest cluster
    const targetNode = data.nodes.find(n => n.group == largestCluster);
    if (targetNode) {
      graph.cameraPosition(
        { x: targetNode.x * 2, y: targetNode.y * 2, z: targetNode.z * 2 },
        targetNode,
        1500
      );
    }
  }
}
```

### Integration with Graph Events

```javascript
const onboarding = ForceGraphOnboarding(Graph, {
  steps: [...],
  onComplete: () => {
    // Enable advanced features after tutorial
    Graph.enableNodeDrag(true);
  }
});

// During onboarding, limit interactions
if (onboarding.isActive()) {
  Graph.enableNodeDrag(false);
}
```

## Browser Compatibility

The onboarding plugin works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

Uses localStorage API which has >95% browser support.

## License

Same as 3D Force Graph - MIT License

## Contributing

Found a bug or have a suggestion? Please open an issue on the main repository!
