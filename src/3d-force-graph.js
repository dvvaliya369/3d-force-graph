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
    // Node search & highlight props
    nodeSearchTerm: {
      default: '',
      triggerUpdate: false,
      onChange(term, state) {
        state._applyNodeSearch(term);
      }
    },
    nodeSearchHighlightColor: { default: 'rgb(255, 200, 0)', triggerUpdate: false },
    onNodeSearchResult: { default: () => {}, triggerUpdate: false },
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
    scene: state => state.renderObjs.scene(), // Expose scene
    camera: state => state.renderObjs.camera(), // Expose camera
    renderer: state => state.renderObjs.renderer(), // Expose renderer
    tbControls: state => state.renderObjs.tbControls(), // Expose tbControls

    // Smoothly fly the camera to a specific node object or node id
    focusOnNode: function(state, nodeOrId, transitionMs = 1000) {
      const nodes = (state.graphData && state.graphData.nodes) || [];
      const node = (typeof nodeOrId === 'object' && nodeOrId !== null)
        ? nodeOrId
        : nodes.find(n => accessorFn(state.nodeId || 'id')(n) === nodeOrId);

      if (!node) return this;

      const camera = state.renderObjs.camera();
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);

      state.renderObjs.cameraPosition(
        { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
        node,
        transitionMs
      );

      return this;
    },

    ...linkedFGMethods,
    ...linkedRenderObjsMethods
  },

  stateInit: () => ({
    forceGraph: new ThreeForceGraph(),
    renderObjs: ThreeRenderObjects(),
    _highlightedNodes: new Set(),
    _originalNodeColor: null,
    _applyNodeSearch: () => {}
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

    // Intercept nodeColor changes so we can preserve the user's color accessor
    // while still layering the search highlight on top.
    const origNodeColorSetter = state.forceGraph.nodeColor.bind(state.forceGraph);
    state.forceGraph.nodeColor = function(colorVal) {
      if (arguments.length === 0) return origNodeColorSetter(); // getter
      state._userNodeColor = colorVal;
      // If a search term is active re-apply so the highlight wraps the new base color
      if (state._highlightedNodes && state._highlightedNodes.size > 0) {
        state._applyNodeSearch(state.nodeSearchTerm);
      } else {
        origNodeColorSetter(colorVal);
      }
      return state.forceGraph;
    };

    // Node search & highlight logic
    // We store the user-supplied nodeColor accessor and override it to blend highlight colors.
    state._applyNodeSearch = function(term) {
      const nodes = (state.graphData && state.graphData.nodes) || [];
      const labelFn = accessorFn(state.nodeLabel || 'name');
      const idFn    = accessorFn(state.nodeId    || 'id');

      if (!term || !term.trim()) {
        // Clear all highlights
        state._highlightedNodes = new Set();
        origNodeColorSetter(state._userNodeColor !== undefined ? state._userNodeColor : 'nodeColor');
        state.onNodeSearchResult([], term);
        return;
      }

      const lowerTerm = term.trim().toLowerCase();
      const matched = nodes.filter(node => {
        const label = String(labelFn(node) || idFn(node) || '').toLowerCase();
        return label.includes(lowerTerm);
      });

      state._highlightedNodes = new Set(matched);

      // Override nodeColor to highlight matched nodes
      const highlightColor = state.nodeSearchHighlightColor;
      const baseColorFn = typeof state._userNodeColor === 'function'
        ? state._userNodeColor
        : (typeof state._userNodeColor === 'string'
            ? () => state._userNodeColor
            : () => null);

      origNodeColorSetter(node =>
        state._highlightedNodes.has(node)
          ? highlightColor
          : (baseColorFn(node) || undefined)
      );

      state.onNodeSearchResult(matched, term);
    };

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
