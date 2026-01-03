import { AmbientLight, DirectionalLight } from 'three';

const three = window.THREE
  ? window.THREE // Prefer consumption from global THREE, if exists
  : { AmbientLight, DirectionalLight };

import ThreeDragControls from 'three-dragcontrols';
import ThreeForceGraph from 'three-forcegraph';
import ThreeRenderObjects from 'three-render-objects';

import accessorFn from 'accessor-fn';
import Kapsule from 'kapsule';

import linkKapsule from './kapsule-link.js';

//

const CAMERA_DISTANCE2NODES_FACTOR = 150;

//

// Expose config from forceGraph
const bindFG = linkKapsule('forceGraph', ThreeForceGraph);
const linkedFGProps = Object.assign(...[
  'jsonUrl',
  'graphData',
  'numDimensions',
  'nodeRelSize',
  'nodeId',
  'nodeVal',
  'nodeResolution',
  'nodeColor',
  'nodeAutoColorBy',
  'nodeOpacity',
  'nodeThreeObject',
  'linkSource',
  'linkTarget',
  'linkVisibility',
  'linkColor',
  'linkAutoColorBy',
  'linkOpacity',
  'linkWidth',
  'linkResolution',
  'linkCurvature',
  'linkCurveRotation',
  'linkMaterial',
  'linkDirectionalArrowLength',
  'linkDirectionalArrowColor',
  'linkDirectionalArrowRelPos',
  'linkDirectionalArrowResolution',
  'linkDirectionalParticles',
  'linkDirectionalParticleSpeed',
  'linkDirectionalParticleWidth',
  'linkDirectionalParticleColor',
  'linkDirectionalParticleResolution',
  'forceEngine',
  'd3AlphaDecay',
  'd3VelocityDecay',
  'warmupTicks',
  'cooldownTicks',
  'cooldownTime',
  'onEngineTick',
  'onEngineStop'
].map(p => ({ [p]: bindFG.linkProp(p)})));
const linkedFGMethods = Object.assign(...[
  'd3Force'
].map(p => ({ [p]: bindFG.linkMethod(p)})));

// Expose config from renderObjs
const bindRenderObjs = linkKapsule('renderObjs', ThreeRenderObjects);
const linkedRenderObjsProps = Object.assign(...[
  'width',
  'height',
  'backgroundColor',
  'showNavInfo',
  'enablePointerInteraction'
].map(p => ({ [p]: bindRenderObjs.linkProp(p)})));
const linkedRenderObjsMethods = Object.assign(...[
  'cameraPosition'
].map(p => ({ [p]: bindRenderObjs.linkMethod(p)})));

//

export default Kapsule({

  props: {
    nodeLabel: { default: 'name', triggerUpdate: false },
    linkLabel: { default: 'name', triggerUpdate: false },
    linkHoverPrecision: { default: 1, onChange: (p, state) => state.renderObjs.lineHoverPrecision(p), triggerUpdate: false },
    enableNavigationControls: {
      default: true,
      onChange(enable, state) {
        const tbControls = state.renderObjs.tbControls();
        if (tbControls) {
          tbControls.enabled = enable;
        }
      },
      triggerUpdate: false
    },
    enableNodeDrag: { default: true, triggerUpdate: false },
    onNodeDrag: { default: () => {}, triggerUpdate: false },
    onNodeDragEnd: { default: () => {}, triggerUpdate: false },
    onNodeClick: { default: () => {}, triggerUpdate: false },
    onNodeHover: { default: () => {}, triggerUpdate: false },
    onLinkClick: { default: () => {}, triggerUpdate: false },
    onLinkHover: { default: () => {}, triggerUpdate: false },
    onboardingEnabled: { default: false, triggerUpdate: false },
    onboardingSteps: { default: [], triggerUpdate: false },
    onboardingCurrentStep: { default: 0, triggerUpdate: false },
    onOnboardingStepChange: { default: () => {}, triggerUpdate: false },
    onOnboardingComplete: { default: () => {}, triggerUpdate: false },
    ...linkedFGProps,
    ...linkedRenderObjsProps
  },

  aliases: { // Prop names supported for backwards compatibility
    nameField: 'nodeLabel',
    idField: 'nodeId',
    valField: 'nodeVal',
    colorField: 'nodeColor',
    autoColorBy: 'nodeAutoColorBy',
    linkSourceField: 'linkSource',
    linkTargetField: 'linkTarget',
    linkColorField: 'linkColor',
    lineOpacity: 'linkOpacity'
  },

  methods: {
    stopAnimation: function(state) {
      if (state.animationFrameRequestId) {
        cancelAnimationFrame(state.animationFrameRequestId);
      }
      return this;
    },
    nextOnboardingStep: function(state) {
      if (state.onboardingEnabled && state.onboardingSteps.length > 0) {
        const nextStep = state.onboardingCurrentStep + 1;
        if (nextStep < state.onboardingSteps.length) {
          this.onboardingCurrentStep(nextStep);
          state.onOnboardingStepChange(state.onboardingSteps[nextStep], nextStep);
        } else {
          this.onboardingEnabled(false);
          state.onOnboardingComplete();
          if (state.onboardingOverlay) {
            state.onboardingOverlay.remove();
            state.onboardingOverlay = null;
          }
        }
      }
      return this;
    },
    prevOnboardingStep: function(state) {
      if (state.onboardingEnabled && state.onboardingCurrentStep > 0) {
        const prevStep = state.onboardingCurrentStep - 1;
        this.onboardingCurrentStep(prevStep);
        state.onOnboardingStepChange(state.onboardingSteps[prevStep], prevStep);
      }
      return this;
    },
    skipOnboarding: function(state) {
      if (state.onboardingEnabled) {
        this.onboardingEnabled(false);
        state.onOnboardingComplete();
        if (state.onboardingOverlay) {
          state.onboardingOverlay.remove();
          state.onboardingOverlay = null;
        }
      }
      return this;
    },
    scene: state => state.renderObjs.scene(), // Expose scene
    camera: state => state.renderObjs.camera(), // Expose camera
    renderer: state => state.renderObjs.renderer(), // Expose renderer
    tbControls: state => state.renderObjs.tbControls(), // Expose tbControls
    ...linkedFGMethods,
    ...linkedRenderObjsMethods
  },

  stateInit: () => ({
    forceGraph: new ThreeForceGraph(),
    renderObjs: ThreeRenderObjects()
  }),

  init: function(domNode, state) {
    // Wipe DOM
    domNode.innerHTML = '';

    // Add relative container
    domNode.appendChild(state.container = document.createElement('div'));
    state.container.style.position = 'relative';

    // Add renderObjs
    const roDomNode = document.createElement('div');
    state.container.appendChild(roDomNode);
    state.renderObjs(roDomNode);
    const camera = state.renderObjs.camera();
    const renderer = state.renderObjs.renderer();
    const tbControls = state.renderObjs.tbControls();
    tbControls.enabled = !!state.enableNavigationControls;
    state.lastSetCameraZ = camera.position.z;

    // Add info space
    let infoElem;
    state.container.appendChild(infoElem = document.createElement('div'));
    infoElem.className = 'graph-info-msg';
    infoElem.textContent = '';

    // Add onboarding overlay
    const createOnboardingOverlay = () => {
      if (state.onboardingOverlay) {
        state.onboardingOverlay.remove();
      }

      const overlay = document.createElement('div');
      overlay.className = 'onboarding-overlay';

      const modal = document.createElement('div');
      modal.className = 'onboarding-modal';

      const header = document.createElement('div');
      header.className = 'onboarding-header';

      const title = document.createElement('h3');
      title.className = 'onboarding-title';

      const stepIndicator = document.createElement('span');
      stepIndicator.className = 'onboarding-step-indicator';

      header.appendChild(title);
      header.appendChild(stepIndicator);

      const content = document.createElement('div');
      content.className = 'onboarding-content';

      const actions = document.createElement('div');
      actions.className = 'onboarding-actions';

      const prevBtn = document.createElement('button');
      prevBtn.className = 'onboarding-btn onboarding-btn-secondary';
      prevBtn.textContent = 'Previous';
      prevBtn.onclick = () => this.prevOnboardingStep();

      const skipBtn = document.createElement('button');
      skipBtn.className = 'onboarding-btn onboarding-btn-secondary';
      skipBtn.textContent = 'Skip';
      skipBtn.onclick = () => this.skipOnboarding();

      const nextBtn = document.createElement('button');
      nextBtn.className = 'onboarding-btn onboarding-btn-primary';
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => this.nextOnboardingStep();

      actions.appendChild(prevBtn);
      actions.appendChild(skipBtn);
      actions.appendChild(nextBtn);

      modal.appendChild(header);
      modal.appendChild(content);
      modal.appendChild(actions);
      overlay.appendChild(modal);

      state.container.appendChild(overlay);
      state.onboardingOverlay = overlay;
      state.onboardingModal = modal;
      state.onboardingTitle = title;
      state.onboardingStepIndicator = stepIndicator;
      state.onboardingContent = content;
      state.onboardingPrevBtn = prevBtn;
      state.onboardingNextBtn = nextBtn;

      return overlay;
    };

    const updateOnboardingUI = () => {
      if (!state.onboardingEnabled || !state.onboardingSteps.length) {
        if (state.onboardingOverlay) {
          state.onboardingOverlay.remove();
          state.onboardingOverlay = null;
        }
        return;
      }

      if (!state.onboardingOverlay) {
        createOnboardingOverlay();
      }

      const currentStep = state.onboardingSteps[state.onboardingCurrentStep];
      if (!currentStep) return;

      state.onboardingTitle.textContent = currentStep.title || 'Tutorial';
      state.onboardingContent.innerHTML = currentStep.content || '';
      state.onboardingStepIndicator.textContent = `${state.onboardingCurrentStep + 1} / ${state.onboardingSteps.length}`;

      // Update button states
      state.onboardingPrevBtn.disabled = state.onboardingCurrentStep === 0;
      state.onboardingPrevBtn.style.opacity = state.onboardingCurrentStep === 0 ? '0.5' : '1';

      const isLastStep = state.onboardingCurrentStep === state.onboardingSteps.length - 1;
      state.onboardingNextBtn.textContent = isLastStep ? 'Finish' : 'Next';

      // Position highlight if specified
      if (currentStep.highlightSelector && state.onboardingOverlay) {
        const targetElement = document.querySelector(currentStep.highlightSelector);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const containerRect = state.container.getBoundingClientRect();

          // Create or update highlight
          let highlight = state.container.querySelector('.onboarding-highlight');
          if (!highlight) {
            highlight = document.createElement('div');
            highlight.className = 'onboarding-highlight';
            state.container.appendChild(highlight);
          }

          highlight.style.left = `${rect.left - containerRect.left}px`;
          highlight.style.top = `${rect.top - containerRect.top}px`;
          highlight.style.width = `${rect.width}px`;
          highlight.style.height = `${rect.height}px`;
        }
      } else {
        const highlight = state.container.querySelector('.onboarding-highlight');
        if (highlight) {
          highlight.remove();
        }
      }
    };

    // Watch for onboarding changes
    const originalOnboardingEnabled = state.onboardingEnabled;
    Object.defineProperty(state, '_onboardingEnabled', { value: originalOnboardingEnabled, writable: true });
    delete state.onboardingEnabled;
    Object.defineProperty(state, 'onboardingEnabled', {
      get() { return this._onboardingEnabled; },
      set(val) {
        this._onboardingEnabled = val;
        updateOnboardingUI();
      }
    });

    const originalOnboardingCurrentStep = state.onboardingCurrentStep;
    Object.defineProperty(state, '_onboardingCurrentStep', { value: originalOnboardingCurrentStep, writable: true });
    delete state.onboardingCurrentStep;
    Object.defineProperty(state, 'onboardingCurrentStep', {
      get() { return this._onboardingCurrentStep; },
      set(val) {
        this._onboardingCurrentStep = val;
        updateOnboardingUI();
      }
    });

    // Initialize onboarding if enabled
    if (state.onboardingEnabled && state.onboardingSteps.length > 0) {
      setTimeout(() => {
        updateOnboardingUI();
        state.onOnboardingStepChange(state.onboardingSteps[0], 0);
      }, 100);
    }

    // config forcegraph
    state.forceGraph.onLoading(() => { infoElem.textContent = 'Loading...' });
    state.forceGraph.onFinishLoading(() => {
      infoElem.textContent = '';

      // sync graph data structures
      state.graphData = state.forceGraph.graphData();

      // re-aim camera, if still in default position (not user modified)
      if (camera.position.x === 0 && camera.position.y === 0 && camera.position.z === state.lastSetCameraZ) {
        camera.lookAt(state.forceGraph.position);
        state.lastSetCameraZ = camera.position.z = Math.cbrt(state.graphData.nodes.length) * CAMERA_DISTANCE2NODES_FACTOR;
      }

      // Setup node drag interaction
      if (state.enableNodeDrag && state.enablePointerInteraction && state.forceEngine === 'd3') { // Can't access node positions programatically in ngraph
        const dragControls = new ThreeDragControls(
          state.graphData.nodes.map(node => node.__threeObj),
          camera,
          renderer.domElement
        );

        dragControls.addEventListener('dragstart', function (event) {
          tbControls.enabled = false; // Disable trackball controls while dragging

          const node = event.object.__data;
          node.__initialFixedPos = {fx: node.fx, fy: node.fy, fz: node.fz};

          // lock node
          ['x', 'y', 'z'].forEach(c => node[`f${c}`] = node[c]);

          // keep engine running at low intensity throughout drag
          state.forceGraph.d3AlphaTarget(0.3);

          // drag cursor
          renderer.domElement.classList.add('grabbable');
        });

        dragControls.addEventListener('drag', function (event) {
          state.ignoreOneClick = true; // Don't click the node if it's being dragged

          const node = event.object.__data;

          // Move fx/fy/fz (and x/y/z) of nodes based on object new position
          ['x', 'y', 'z'].forEach(c => node[`f${c}`] = node[c] = event.object.position[c]);

          // prevent freeze while dragging
          state.forceGraph.resetCountdown();

          state.onNodeDrag(node);
        });

        dragControls.addEventListener('dragend', function (event) {
          const node = event.object.__data;
          const initPos = node.__initialFixedPos;

          if (initPos) {
            ['x', 'y', 'z'].forEach(c => {
              const fc = `f${c}`;
              if (initPos[fc] === undefined) {
                node[fc] = undefined
              }
            });
            delete(node.__initialFixedPos);

            state.onNodeDragEnd(node);
          }

          state.forceGraph
            .d3AlphaTarget(0)   // release engine low intensity
            .resetCountdown();  // let the engine readjust after releasing fixed nodes

          if (state.enableNavigationControls) {
            tbControls.enabled = true; // Re-enable trackball controls
          }

          // clear cursor
          renderer.domElement.classList.remove('grabbable');
        });
      }
    });

    // config renderObjs
    const getGraphObj = object => {
      let obj = object;
      // recurse up object chain until finding the graph object (only if using custom nodes)
      while (state.nodeThreeObject && obj && !obj.hasOwnProperty('__graphObjType')) {
        obj = obj.parent;
      }
      return obj;
    };

    state.renderObjs
      .objects([ // Populate scene
        new three.AmbientLight(0xbbbbbb),
        new three.DirectionalLight(0xffffff, 0.6),
        state.forceGraph
      ])
      .hoverOrderComparator((a, b) => {
        // Prioritize graph objects
        const aObj = getGraphObj(a);
        if (!aObj) return 1;
        const bObj = getGraphObj(b);
        if (!bObj) return -1;

        // Prioritize nodes over links
        const isNode = o => o.__graphObjType === 'node';
        return isNode(bObj) - isNode(aObj);
      })
      .tooltipContent(obj => {
        const graphObj = getGraphObj(obj);
        return graphObj ? accessorFn(state[`${graphObj.__graphObjType}Label`])(graphObj.__data) || '' : '';
      })
      .onHover(obj => {
        // Update tooltip and trigger onHover events
        const hoverObj = getGraphObj(obj);

        if (hoverObj !== state.hoverObj) {
          const prevObjType = state.hoverObj ? state.hoverObj.__graphObjType : null;
          const prevObjData = state.hoverObj ? state.hoverObj.__data : null;
          const objType = hoverObj ? hoverObj.__graphObjType : null;
          const objData = hoverObj ? hoverObj.__data : null;
          if (prevObjType && prevObjType !== objType) {
            // Hover out
            state[`on${prevObjType === 'node' ? 'Node' : 'Link'}Hover`](null, prevObjData);
          }
          if (objType) {
            // Hover in
            state[`on${objType === 'node' ? 'Node' : 'Link'}Hover`](objData, prevObjType === objType ? prevObjData : null);
          }

          state.hoverObj = hoverObj;
        }
      })
      .onClick(obj => {
        // Handle click events on objects
        if (state.ignoreOneClick) {
          // f.e. because of dragend event
          state.ignoreOneClick = false;
          return;
        }

        const graphObj = getGraphObj(obj);
        if (graphObj) {
          state[`on${graphObj.__graphObjType === 'node' ? 'Node' : 'Link'}Click`](graphObj.__data);
        }
      });

    //

    // Kick-off renderer
    (function animate() { // IIFE
      if (state.enablePointerInteraction) {
        // reset canvas cursor (override dragControls cursor)
        renderer.domElement.style.cursor = null;
      }

      // Frame cycle
      state.forceGraph.tickFrame();
      state.renderObjs.tick();
      state.animationFrameRequestId = requestAnimationFrame(animate);
    })();
  }
});
