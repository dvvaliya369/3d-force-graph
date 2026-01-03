# Onboarding Example

This example demonstrates the onboarding feature for 3D Force Graph.

## Features

The onboarding feature provides an interactive tutorial that guides users through the key features of the 3D force graph:

1. **Welcome Message** - Introduces the graph visualization
2. **Camera Navigation** - Explains how to rotate, pan, and zoom
3. **Node Interactions** - Shows how to interact with nodes (hover, click, drag)
4. **Completion** - Confirms the user is ready to explore

## Usage

### Enable Onboarding

To enable onboarding, pass `enableOnboarding: true` when creating the graph:

```javascript
const Graph = ForceGraph3D({
  enableOnboarding: true
})
  (document.getElementById('3d-graph'))
  .graphData(myData);
```

### Customize LocalStorage Key

By default, the onboarding completion status is stored in localStorage with the key `'3d-force-graph-onboarding-completed'`. You can customize this:

```javascript
const Graph = ForceGraph3D({
  enableOnboarding: true,
  onboardingLocalStorageKey: 'my-custom-onboarding-key'
})
  (document.getElementById('3d-graph'))
  .graphData(myData);
```

### Manual Control

You can also manually control the onboarding:

```javascript
// Start onboarding manually
Graph.startOnboarding();

// Skip/hide onboarding
Graph.skipOnboarding();
```

## Behavior

- The onboarding overlay appears automatically on first visit (if enabled)
- Once completed or skipped, it won't show again (stored in localStorage)
- Users can navigate through steps using "Next" and "Previous" buttons
- Users can skip the tutorial at any time using the "Skip" button
- The onboarding has a beautiful gradient design with smooth animations

## Clearing Onboarding State

To reset the onboarding and show it again, clear the localStorage:

```javascript
localStorage.removeItem('3d-force-graph-onboarding-completed');
// Or your custom key:
localStorage.removeItem('my-custom-onboarding-key');
```

Then refresh the page.
