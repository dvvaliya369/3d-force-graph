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

// Onboarding helper functions
const onboardingSteps = [
  {
    title: 'Welcome to 3D Force Graph! 🎉',
    content: `
      <p>This interactive tutorial will guide you through the key features of navigating and interacting with your 3D graph.</p>
      <p>Let's get started!</p>
    `
  },
  {
    title: 'Camera Navigation 🎥',
    content: `
      <p>Control the camera view with your mouse:</p>
      <ul>
        <li><strong>Left-click + Drag:</strong> Rotate the view</li>
        <li><strong>Right-click + Drag:</strong> Pan the view</li>
        <li><strong>Scroll:</strong> Zoom in and out</li>
      </ul>
      <p>Try moving around the graph now!</p>
    `
  },
  {
    title: 'Node Interactions 🔵',
    content: `
      <p>Interact with nodes in the graph:</p>
      <ul>
        <li><strong>Hover:</strong> See node information</li>
        <li><strong>Click:</strong> Trigger custom actions</li>
        <li><strong>Drag:</strong> Move nodes around (if enabled)</li>
      </ul>
      <p>Nodes are the building blocks of your graph!</p>
    `
  },
  {
    title: 'You\'re All Set! ✨',
    content: `
      <p>You now know the basics of navigating and interacting with your 3D force graph.</p>
      <p>Explore your data and discover insights!</p>
    `
  }
];

function createOnboardingHTML(state) {
  const backdrop = document.createElement('div');
  backdrop.className = 'graph-onboarding-backdrop';
  backdrop.style.display = 'none';
  
  const container = document.createElement('div');
  container.className = 'graph-onboarding-container';
  container.style.display = 'none';
  
  container.innerHTML = `
    <div class="graph-onboarding-header"></div>
    <div class="graph-onboarding-content"></div>
    <div class="graph-onboarding-footer">
      <div class="graph-onboarding-steps"></div>
      <div class="graph-onboarding-buttons">
        <button class="graph-onboarding-button graph-onboarding-button-skip">Skip</button>
        <button class="graph-onboarding-button graph-onboarding-button-prev" style="display: none;">Previous</button>
        <button class="graph-onboarding-button graph-onboarding-button-next">Next</button>
        <button class="graph-onboarding-button graph-onboarding-button-finish" style="display: none;">Finish</button>
      </div>
    </div>
  `;
  
  state.container.appendChild(backdrop);
  state.container.appendChild(container);
  
  state.onboardingBackdrop = backdrop;
  state.onboardingContainer = container;
  state.onboardingCurrentStep = 0;
  
  // Create step dots
  const stepsContainer = container.querySelector('.graph-onboarding-steps');
  onboardingSteps.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'graph-onboarding-step-dot';
    if (index === 0) dot.classList.add('active');
    stepsContainer.appendChild(dot);
  });
  
  // Add event listeners
  const skipBtn = container.querySelector('.graph-onboarding-button-skip');
  const prevBtn = container.querySelector('.graph-onboarding-button-prev');
  const nextBtn = container.querySelector('.graph-onboarding-button-next');
  const finishBtn = container.querySelector('.graph-onboarding-button-finish');
  
  skipBtn.addEventListener('click', () => hideOnboarding(state));
  prevBtn.addEventListener('click', () => {
    if (state.onboardingCurrentStep > 0) {
      state.onboardingCurrentStep--;
      updateOnboardingStep(state);
    }
  });
  nextBtn.addEventListener('click', () => {
    if (state.onboardingCurrentStep < onboardingSteps.length - 1) {
      state.onboardingCurrentStep++;
      updateOnboardingStep(state);
    }
  });
  finishBtn.addEventListener('click', () => hideOnboarding(state));
}

function updateOnboardingStep(state) {
  const container = state.onboardingContainer;
  const step = onboardingSteps[state.onboardingCurrentStep];
  
  container.querySelector('.graph-onboarding-header').textContent = step.title;
  container.querySelector('.graph-onboarding-content').innerHTML = step.content;
  
  // Update step dots
  const dots = container.querySelectorAll('.graph-onboarding-step-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === state.onboardingCurrentStep);
  });
  
  // Update buttons
  const prevBtn = container.querySelector('.graph-onboarding-button-prev');
  const nextBtn = container.querySelector('.graph-onboarding-button-next');
  const finishBtn = container.querySelector('.graph-onboarding-button-finish');
  
  prevBtn.style.display = state.onboardingCurrentStep > 0 ? 'block' : 'none';
  nextBtn.style.display = state.onboardingCurrentStep < onboardingSteps.length - 1 ? 'block' : 'none';
  finishBtn.style.display = state.onboardingCurrentStep === onboardingSteps.length - 1 ? 'block' : 'none';
}

function hideOnboarding(state) {
  if (state.onboardingContainer) {
    state.onboardingContainer.style.display = 'none';
    state.onboardingBackdrop.style.display = 'none';
    
    // Save to localStorage
    try {
      localStorage.setItem(state.onboardingLocalStorageKey, 'true');
    } catch (e) {
      // localStorage might not be available
    }
  }
}

function shouldShowOnboarding(state) {
  if (!state.enableOnboarding) return false;
  
  try {
    return !localStorage.getItem(state.onboardingLocalStorageKey);
  } catch (e) {
    // localStorage might not be available
    return true;
  }
}

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
    enableOnboarding: { default: false, triggerUpdate: false },
    onboardingLocalStorageKey: { default: '3d-force-graph-onboarding-completed', triggerUpdate: false },
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
    startOnboarding: function(state) {
      if (state.onboardingContainer) {
        state.onboardingCurrentStep = 0;
        state.onboardingContainer.style.display = 'block';
        state.onboardingBackdrop.style.display = 'block';
        updateOnboardingStep(state);
      }
      return this;
    },
    skipOnboarding: function(state) {
      hideOnboarding(state);
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

    // Setup onboarding
    if (state.enableOnboarding) {
      createOnboardingHTML(state);
      
      // Show onboarding if not completed before
      if (shouldShowOnboarding(state)) {
        // Delay showing onboarding slightly to let the graph initialize
        setTimeout(() => {
          state.onboardingContainer.style.display = 'block';
          state.onboardingBackdrop.style.display = 'block';
          updateOnboardingStep(state);
        }, 500);
      }
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
