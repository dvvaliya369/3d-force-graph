/**
 * 3D Force Graph Onboarding Plugin
 * 
 * A reusable onboarding/tutorial system for 3D Force Graph visualizations.
 * Can be easily integrated into any project using the library.
 * 
 * Usage:
 *   const onboarding = ForceGraphOnboarding(graphInstance);
 *   onboarding.start();
 * 
 * @param {Object} graphInstance - The 3D Force Graph instance
 * @param {Object} options - Configuration options
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ForceGraphOnboarding = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function ForceGraphOnboarding(graphInstance, options) {
    const defaults = {
      steps: [],
      autoStart: false,
      storageKey: '3d-force-graph-onboarding',
      theme: {
        primaryColor: '#007bff',
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '12px'
      },
      onComplete: null,
      onSkip: null
    };

    const config = Object.assign({}, defaults, options);
    let currentStep = 0;
    let overlayElement = null;
    let isActive = false;

    // Default steps if none provided
    if (config.steps.length === 0) {
      config.steps = getDefaultSteps();
    }

    /**
     * Create and inject the onboarding overlay into the DOM
     */
    function createOverlay() {
      if (overlayElement) return;

      // Create overlay container
      overlayElement = document.createElement('div');
      overlayElement.className = 'fg-onboarding-overlay';
      overlayElement.innerHTML = `
        <div class="fg-onboarding-content">
          <div class="fg-onboarding-header">
            <h2 class="fg-onboarding-title"></h2>
            <button class="fg-onboarding-close" aria-label="Close">&times;</button>
          </div>
          <div class="fg-onboarding-body"></div>
          <div class="fg-onboarding-footer">
            <div class="fg-onboarding-progress">
              <span class="fg-onboarding-progress-text"></span>
              <div class="fg-onboarding-progress-bar">
                <div class="fg-onboarding-progress-fill"></div>
              </div>
            </div>
            <div class="fg-onboarding-buttons">
              <button class="fg-onboarding-btn fg-onboarding-btn-skip">Skip</button>
              <button class="fg-onboarding-btn fg-onboarding-btn-prev">Previous</button>
              <button class="fg-onboarding-btn fg-onboarding-btn-next">Next</button>
            </div>
          </div>
        </div>
      `;

      // Add styles
      injectStyles();

      // Add event listeners
      const closeBtn = overlayElement.querySelector('.fg-onboarding-close');
      const skipBtn = overlayElement.querySelector('.fg-onboarding-btn-skip');
      const prevBtn = overlayElement.querySelector('.fg-onboarding-btn-prev');
      const nextBtn = overlayElement.querySelector('.fg-onboarding-btn-next');

      closeBtn.addEventListener('click', () => skip());
      skipBtn.addEventListener('click', () => skip());
      prevBtn.addEventListener('click', () => previous());
      nextBtn.addEventListener('click', () => next());

      document.body.appendChild(overlayElement);
    }

    /**
     * Inject CSS styles for the onboarding overlay
     */
    function injectStyles() {
      if (document.getElementById('fg-onboarding-styles')) return;

      const style = document.createElement('style');
      style.id = 'fg-onboarding-styles';
      style.textContent = `
        .fg-onboarding-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${config.theme.overlayColor};
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .fg-onboarding-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .fg-onboarding-content {
          background: white;
          border-radius: ${config.theme.borderRadius};
          padding: 0;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: fg-slideIn 0.4s ease;
        }

        @keyframes fg-slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .fg-onboarding-header {
          padding: 24px 30px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fg-onboarding-title {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #333;
        }

        .fg-onboarding-close {
          background: none;
          border: none;
          font-size: 32px;
          color: #999;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 32px;
          height: 32px;
          transition: color 0.2s;
        }

        .fg-onboarding-close:hover {
          color: #333;
        }

        .fg-onboarding-body {
          padding: 30px;
          font-size: 16px;
          line-height: 1.6;
          color: #666;
        }

        .fg-onboarding-body h3 {
          color: #333;
          margin-top: 0;
        }

        .fg-onboarding-body ul {
          margin: 15px 0;
          padding-left: 24px;
        }

        .fg-onboarding-body li {
          margin: 10px 0;
        }

        .fg-onboarding-body strong {
          color: #333;
        }

        .fg-onboarding-body code {
          background: #f8f9fa;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 14px;
        }

        .fg-onboarding-footer {
          padding: 20px 30px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
          border-radius: 0 0 ${config.theme.borderRadius} ${config.theme.borderRadius};
        }

        .fg-onboarding-progress {
          margin-bottom: 15px;
        }

        .fg-onboarding-progress-text {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .fg-onboarding-progress-bar {
          width: 100%;
          height: 6px;
          background: #dee2e6;
          border-radius: 3px;
          overflow: hidden;
        }

        .fg-onboarding-progress-fill {
          height: 100%;
          background: ${config.theme.primaryColor};
          transition: width 0.3s ease;
          border-radius: 3px;
        }

        .fg-onboarding-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .fg-onboarding-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fg-onboarding-btn-next {
          background: ${config.theme.primaryColor};
          color: white;
        }

        .fg-onboarding-btn-next:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .fg-onboarding-btn-prev {
          background: #6c757d;
          color: white;
        }

        .fg-onboarding-btn-prev:hover {
          opacity: 0.9;
        }

        .fg-onboarding-btn-prev:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .fg-onboarding-btn-skip {
          background: transparent;
          color: #6c757d;
        }

        .fg-onboarding-btn-skip:hover {
          color: #333;
        }
      `;
      document.head.appendChild(style);
    }

    /**
     * Display a specific step
     */
    function showStep(stepIndex) {
      if (stepIndex < 0 || stepIndex >= config.steps.length) return;

      currentStep = stepIndex;
      const step = config.steps[stepIndex];

      const titleEl = overlayElement.querySelector('.fg-onboarding-title');
      const bodyEl = overlayElement.querySelector('.fg-onboarding-body');
      const progressText = overlayElement.querySelector('.fg-onboarding-progress-text');
      const progressFill = overlayElement.querySelector('.fg-onboarding-progress-fill');
      const prevBtn = overlayElement.querySelector('.fg-onboarding-btn-prev');
      const nextBtn = overlayElement.querySelector('.fg-onboarding-btn-next');

      titleEl.textContent = step.title;
      bodyEl.innerHTML = step.content;
      progressText.textContent = `Step ${stepIndex + 1} of ${config.steps.length}`;
      progressFill.style.width = ((stepIndex + 1) / config.steps.length * 100) + '%';

      prevBtn.disabled = stepIndex === 0;
      prevBtn.style.display = stepIndex === 0 ? 'none' : 'inline-block';
      nextBtn.textContent = stepIndex === config.steps.length - 1 ? 'Finish' : 'Next';

      // Execute step action if provided
      if (step.action && typeof step.action === 'function') {
        setTimeout(() => step.action(graphInstance), 300);
      }
    }

    /**
     * Start the onboarding
     */
    function start() {
      if (isActive) return;
      
      createOverlay();
      isActive = true;
      currentStep = 0;
      showStep(0);
      overlayElement.classList.add('active');
    }

    /**
     * Go to next step
     */
    function next() {
      if (currentStep < config.steps.length - 1) {
        showStep(currentStep + 1);
      } else {
        complete();
      }
    }

    /**
     * Go to previous step
     */
    function previous() {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    }

    /**
     * Skip the onboarding
     */
    function skip() {
      if (overlayElement) {
        overlayElement.classList.remove('active');
      }
      isActive = false;
      
      if (config.storageKey) {
        localStorage.setItem(config.storageKey + '-skipped', 'true');
      }
      
      if (config.onSkip && typeof config.onSkip === 'function') {
        config.onSkip();
      }
    }

    /**
     * Complete the onboarding
     */
    function complete() {
      if (overlayElement) {
        overlayElement.classList.remove('active');
      }
      isActive = false;
      
      if (config.storageKey) {
        localStorage.setItem(config.storageKey + '-completed', 'true');
      }
      
      if (config.onComplete && typeof config.onComplete === 'function') {
        config.onComplete();
      }
    }

    /**
     * Check if onboarding has been completed
     */
    function hasCompleted() {
      if (!config.storageKey) return false;
      return localStorage.getItem(config.storageKey + '-completed') === 'true';
    }

    /**
     * Reset onboarding state
     */
    function reset() {
      if (config.storageKey) {
        localStorage.removeItem(config.storageKey + '-completed');
        localStorage.removeItem(config.storageKey + '-skipped');
      }
    }

    /**
     * Destroy the onboarding instance
     */
    function destroy() {
      if (overlayElement && overlayElement.parentNode) {
        overlayElement.parentNode.removeChild(overlayElement);
      }
      overlayElement = null;
      isActive = false;
    }

    /**
     * Get default onboarding steps
     */
    function getDefaultSteps() {
      return [
        {
          title: 'Welcome to 3D Force Graph!',
          content: `
            <p>This library helps you visualize network data in 3D space using force-directed graph layouts.</p>
            <p>Let's take a quick tour of the main features!</p>
          `
        },
        {
          title: 'Navigation',
          content: `
            <h3>Camera Controls</h3>
            <ul>
              <li><strong>Left-click + Drag</strong> - Rotate the camera around the graph</li>
              <li><strong>Right-click + Drag</strong> - Pan the view</li>
              <li><strong>Scroll Wheel</strong> - Zoom in and out</li>
            </ul>
            <p>Try moving the camera now to get comfortable with the controls!</p>
          `
        },
        {
          title: 'Interacting with Nodes',
          content: `
            <h3>Node Interactions</h3>
            <ul>
              <li><strong>Hover</strong> - View node information</li>
              <li><strong>Click</strong> - Select or trigger custom actions</li>
              <li><strong>Drag</strong> - Reposition nodes (if enabled)</li>
            </ul>
            <p>Nodes can be customized with different colors, sizes, and even custom 3D geometries!</p>
          `,
          action: (graph) => {
            // Example: highlight a random node
            const data = graph.graphData();
            if (data.nodes && data.nodes.length > 0) {
              const node = data.nodes[0];
              graph.cameraPosition(
                { x: node.x * 2, y: node.y * 2, z: node.z * 2 },
                node,
                1000
              );
            }
          }
        },
        {
          title: 'Understanding Links',
          content: `
            <h3>Link Visualization</h3>
            <p>Links represent relationships between nodes and can be customized with:</p>
            <ul>
              <li><strong>Colors and opacity</strong> - Visual emphasis</li>
              <li><strong>Directional arrows</strong> - Show flow or hierarchy</li>
              <li><strong>Particles</strong> - Animated direction indicators</li>
              <li><strong>Curvature</strong> - Handle multiple links between nodes</li>
            </ul>
          `
        },
        {
          title: 'Force Simulation',
          content: `
            <h3>How It Works</h3>
            <p>The layout uses physics simulation with forces:</p>
            <ul>
              <li><strong>Link Force</strong> - Pulls connected nodes together</li>
              <li><strong>Charge Force</strong> - Pushes all nodes apart</li>
              <li><strong>Center Force</strong> - Keeps the graph centered</li>
            </ul>
            <p>These forces balance out to create an organized, readable layout automatically!</p>
          `
        },
        {
          title: 'You're Ready!',
          content: `
            <h3>Next Steps</h3>
            <p>Now you know the basics! Explore the documentation to learn about:</p>
            <ul>
              <li>Customizing node and link appearance</li>
              <li>Adding custom 3D objects</li>
              <li>Handling click and hover events</li>
              <li>Optimizing performance for large graphs</li>
            </ul>
            <p>Happy visualizing! 🚀</p>
          `
        }
      ];
    }

    // Auto-start if configured and not completed
    if (config.autoStart && !hasCompleted()) {
      setTimeout(start, 500);
    }

    // Public API
    return {
      start: start,
      next: next,
      previous: previous,
      skip: skip,
      complete: complete,
      reset: reset,
      destroy: destroy,
      hasCompleted: hasCompleted,
      getCurrentStep: () => currentStep,
      getTotalSteps: () => config.steps.length,
      isActive: () => isActive
    };
  }

  return ForceGraphOnboarding;
}));
