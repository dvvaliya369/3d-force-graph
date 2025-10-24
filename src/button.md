# Button Component

A reusable button component built with Kapsule for the 3D Force Graph library.

## Installation

```javascript
import Button from './src/button.js';
import './src/button.css';
```

## Usage

### Basic Example

```javascript
const myButton = Button()
  (document.getElementById('button-container'))
  .label('Click Me')
  .onClick(() => {
    console.log('Button clicked!');
  });
```

### With Custom Styling

```javascript
Button()
  (document.getElementById('custom-button'))
  .label('Custom Button')
  .style({
    backgroundColor: '#10b981',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px'
  })
  .onClick((event) => {
    console.log('Custom button clicked!', event);
  });
```

### Disabled Button

```javascript
Button()
  (document.getElementById('disabled-button'))
  .label('Disabled')
  .disabled(true);
```

### With Custom Class

```javascript
Button()
  (document.getElementById('classed-button'))
  .label('Custom Class')
  .className('my-custom-class another-class')
  .onClick(() => {
    console.log('Button with custom classes clicked!');
  });
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **label** | `string` | `'Button'` | The text displayed on the button |
| **onClick** | `function` | `undefined` | Callback function invoked when button is clicked. Receives the click event as argument. |
| **disabled** | `boolean` | `false` | Whether the button is disabled |
| **className** | `string` | `''` | Additional CSS classes to apply to the button (space-separated) |
| **style** | `object` | `{}` | Inline styles to apply to the button (key-value pairs) |

### Methods

All properties can be accessed as getter/setter methods:

```javascript
const button = Button()(domElement);

// Setter
button.label('New Label');
button.disabled(true);

// Getter
console.log(button.label()); // 'New Label'
console.log(button.disabled()); // true
```

### Chaining

Methods can be chained for convenience:

```javascript
Button()
  (document.getElementById('my-button'))
  .label('Submit')
  .disabled(false)
  .className('primary-button')
  .style({ fontSize: '18px' })
  .onClick(() => console.log('Submitted!'));
```

## Styling

The button comes with default styles defined in `button.css`. The default button has:

- Modern, clean design
- Hover effects with smooth transitions
- Active state styling
- Disabled state styling
- Box shadow for depth

You can override these styles by:

1. Adding custom classes via the `className` property
2. Using inline styles via the `style` property
3. Overriding the `.force-graph-button` class in your own CSS

## Example

See the [button example](../../example/button/index.html) for a complete working demonstration.
