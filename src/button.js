import Kapsule from 'kapsule';
import accessorFn from 'accessor-fn';

export default Kapsule({
  props: {
    label: { default: 'Button' },
    onClick: { triggerUpdate: false },
    disabled: { default: false },
    className: { default: '' },
    style: { default: {} }
  },

  init(domElement, state) {
    // Create button element
    state.button = document.createElement('button');
    state.button.className = 'force-graph-button';
    
    // Add button to DOM
    domElement.appendChild(state.button);

    // Set up click handler
    state.button.addEventListener('click', (event) => {
      if (!state.disabled && state.onClick) {
        state.onClick(event);
      }
    });
  },

  update(state) {
    // Update button label
    const labelAccessor = accessorFn(state.label);
    state.button.textContent = labelAccessor();

    // Update disabled state
    state.button.disabled = state.disabled;

    // Update custom className
    if (state.className) {
      const customClasses = state.className.split(' ').filter(c => c);
      customClasses.forEach(cls => {
        if (!state.button.classList.contains(cls)) {
          state.button.classList.add(cls);
        }
      });
    }

    // Update inline styles
    if (state.style && typeof state.style === 'object') {
      Object.keys(state.style).forEach(key => {
        state.button.style[key] = state.style[key];
      });
    }
  }
});
