# Dependency Issues Report

## Project: 3d-force-graph v1.39.0

### Current Status
The project cannot build due to dependency version conflicts and outdated packages.

### Issues Identified

#### 1. **Three.js Version Conflict**
- **Current**: `three@0.94.0` (released ~2018)
- **Required by three-forcegraph**: `three>=0.118.3`
- **Impact**: Major version mismatch causing build failures

#### 2. **three-render-objects Incompatibility**
- Uses `SRGBColorSpace` which doesn't exist in three.js v0.94.0
- This constant was added in later versions of three.js

#### 3. **ngraph.graph Module Resolution**
- three-forcegraph tries to import ngraph.graph as ES module
- ngraph.graph exports as CommonJS/UMD
- Rollup cannot resolve the default export

#### 4. **Deprecated Build Tools**
- `rollup@0.63.4` (current stable is v4.x)
- `rollup-plugin-babel@3.0.7` (deprecated, use @rollup/plugin-babel)
- `rollup-plugin-commonjs@9.3.4` (deprecated, use @rollup/plugin-commonjs)
- `rollup-plugin-node-resolve@3.4.0` (deprecated, use @rollup/plugin-node-resolve)
- `babel-core@6.x` (deprecated, use @babel/core v7.x)

### Recommended Solutions

#### Option 1: Update All Dependencies (Recommended)
Update to modern versions of all packages:

\`\`\`json
{
  "dependencies": {
    "accessor-fn": "^1.2.2",
    "kapsule": "^1.14.0",
    "three": "^0.160.0",
    "three-dragcontrols": "^0.88.2",
    "three-forcegraph": "^1.43.0",
    "three-render-objects": "^1.29.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@rollup/plugin-babel": "^6.0.0",
    "@rollup/plugin-commonjs": "^25.0.0",
    "@rollup/plugin-node-resolve": "^15.0.0",
    "rollup": "^4.9.0",
    "rollup-plugin-postcss": "^4.0.0",
    "postcss": "^8.4.0",
    "postcss-nested": "^6.0.0",
    "postcss-simple-vars": "^7.0.0",
    "rimraf": "^5.0.0",
    "terser": "^5.26.0"
  }
}
\`\`\`

#### Option 2: Downgrade Dependencies
Pin all dependencies to compatible older versions (not recommended for security/features).

#### Option 3: Use Pre-built Distribution
If available from a previous successful build or CDN.

### Build System Migration Required

The rollup configuration needs to be updated to use modern plugins:

\`\`\`javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
\`\`\`

### Next Steps

1. Decide on dependency update strategy
2. Update package.json with compatible versions
3. Migrate rollup configuration to modern plugins
4. Update babel configuration to v7
5. Test build process
6. Verify examples still work

### Notes

- The project structure and source code appear sound
- The issues are purely dependency-related
- A full dependency update would also bring security patches and performance improvements
