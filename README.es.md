# Grafo 3D con Fuerzas Dirigidas

[![NPM](https://nodei.co/npm/3d-force-graph.png?compact=true)](https://nodei.co/npm/3d-force-graph/)

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph/example/large-graph/"><img width="80%" src="http://gist.github.com/vasturiano/02affe306ce445e423f992faeea13521/raw/preview.png"></a>
</p>

Un componente web para representar una estructura de datos de grafo en un espacio tridimensional utilizando un diseño iterativo de fuerzas dirigidas.
Utiliza [ThreeJS](https://github.com/mrdoob/three.js/)/WebGL para el renderizado 3D y [d3-force-3d](https://github.com/vasturiano/d3-force-3d) o [ngraph](https://github.com/anvaka/ngraph.forcelayout3d) como motor de física subyacente.

Consulta los ejemplos:
* [Básico](https://vasturiano.github.io/3d-force-graph/example/basic/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/basic/index.html))
* [Carga asíncrona](https://vasturiano.github.io/3d-force-graph/example/async-load/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/async-load/index.html))
* [Grafo grande (~4k elementos)](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [Flechas direccionales](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [Partículas direccionales en movimiento](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [Líneas curvas y auto-enlaces](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [Nodos/enlaces con colores automáticos](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [Texto como nodos](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [Geometrías de nodos personalizadas](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [Órbita automática de la cámara](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [Clic para enfocar en nodo](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [Resaltar nodos/enlaces](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [Cambios dinámicos de datos](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
* [Detección de colisiones de nodos](https://vasturiano.github.io/3d-force-graph/example/collision-detection/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/collision-detection/index.html))
* [Agregar objetos externos a la escena](https://vasturiano.github.io/3d-force-graph/example/scene/) ([código fuente](https://github.com/vasturiano/3d-force-graph/blob/master/example/scene/index.html))

Consulta también la [versión VR](https://github.com/vasturiano/3d-force-graph-vr) y la [versión 2D canvas](https://github.com/vasturiano/force-graph).

Y revisa los [bindings de React](https://github.com/vasturiano/react-force-graph).

## Inicio rápido

```
import ForceGraph3D from '3d-force-graph';
```
o
```
var ForceGraph3D = require('3d-force-graph');
```
o incluso
```
<script src="//unpkg.com/3d-force-graph"></script>
```
luego
```
var myGraph = ForceGraph3D();
myGraph(<miElementoDOM>)
    .graphData(<misDatos>);
```

## Referencia de la API

### Entrada de datos
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | Getter/setter para la estructura de datos del grafo (ver más abajo para detalles de sintaxis). También se puede usar para aplicar [actualizaciones incrementales](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6). | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | URL del archivo JSON para cargar los datos del grafo directamente, como alternativa a especificar <i>graphData</i> directamente. | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(alias: <i>idField</i>)</sub> | Atributo de acceso del objeto nodo para el id único del nodo (usado en los objetos de enlace source/target). | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(alias: <i>linkSourceField</i>)</sub> | Atributo de acceso del objeto enlace que hace referencia al id del nodo origen. | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(alias: <i>linkTargetField</i>)</sub> | Atributo de acceso del objeto enlace que hace referencia al id del nodo destino. | `target` |

### Diseño del contenedor
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | Getter/setter para el ancho del canvas. | *&lt;ancho de la ventana&gt;* |
| <b>height</b>([<i>px</i>]) | Getter/setter para la altura del canvas. | *&lt;altura de la ventana&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | Getter/setter para el color de fondo del gráfico. | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | Getter/setter para mostrar o no la información de controles de navegación en el pie de página. | `true` |

### Estilo de nodos
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | Getter/setter para la relación del volumen de la esfera del nodo (px cúbicos) por unidad de valor. | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) <br/><sub>(alias: <i>valField</i>)</sub> | Función de acceso del objeto nodo, atributo o constante numérica para el valor numérico del nodo (afecta el volumen de la esfera). | `val` |
| <b>nodeLabel</b>([<i>str</i> o <i>fn</i>]) <br/><sub>(alias: <i>nameField</i>)</sub> | Función de acceso del objeto nodo o atributo para el nombre (mostrado en la etiqueta). Admite texto plano o contenido HTML. | `name` |
| <b>nodeColor</b>([<i>str</i> o <i>fn</i>]) <br/><sub>(alias: <i>colorField</i>)</sub> | Función de acceso del objeto nodo o atributo para el color del nodo (afecta el color de la esfera). | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> o <i>fn</i>]) <br/><sub>(alias: <i>autoColorBy</i>)</sub> | Función de acceso del objeto nodo (`fn(node)`) o atributo (ej. `'type'`) para agrupar colores automáticamente. Solo afecta a nodos sin atributo de color. | |
| <b>nodeOpacity</b>([<i>num</i>]) | Getter/setter para la opacidad de la esfera de los nodos, entre [0,1]. | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | Getter/setter para la resolución geométrica de cada nodo, expresada en cuántos segmentos de corte dividir la circunferencia. Valores más altos producen esferas más suaves. | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto nodo o atributo para generar un objeto 3d personalizado para renderizar como nodos del grafo. Debe devolver una instancia de [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D). Si se devuelve un valor <i>falsy</i>, se usará el tipo de objeto 3d predeterminado para ese nodo.  | *el objeto de nodo predeterminado es una esfera, dimensionada según `val` y estilizada según `color`.* |

### Estilo de enlaces
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace o atributo para el nombre (mostrado en la etiqueta). Admite texto plano o contenido HTML. | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante booleana para mostrar o no la línea del enlace. Un valor de `false` mantiene la fuerza del enlace sin renderizarlo. | `true` |
| <b>linkColor</b>([<i>str</i> o <i>fn</i>]) <br/><sub>(alias: <i>linkColorField</i>)</sub> | Función de acceso del objeto enlace o atributo para el color de la línea. | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace (`fn(link)`) o atributo (ej. `'type'`) para agrupar colores automáticamente. Solo afecta a enlaces sin atributo de color. | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(alias: <i>lineOpacity</i>)</sub> | Getter/setter para la opacidad de línea de los enlaces, entre [0,1]. | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para el ancho de la línea del enlace. Un valor de cero renderizará una [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) cuyo ancho es constante (`1px`) independientemente de la distancia. Los valores se redondean al decimal más cercano para propósitos de indexación. | 0 |
| <b>linkResolution</b>([<i>num</i>]) | Getter/setter para la resolución geométrica de cada enlace, expresada en cuántos segmentos radiales dividir el cilindro. Valores más altos producen cilindros más suaves. Aplicable solo a enlaces con ancho positivo. | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para el radio de curvatura de la línea del enlace. Solo aplicable a enlaces que usan [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) (ancho `0`). Las líneas curvas se representan como curvas bezier 3D, y se acepta cualquier valor numérico. Un valor de `0` renderiza una línea recta. `1` indica un radio igual a la mitad de la longitud de la línea, haciendo que la curva se aproxime a un semicírculo. Para enlaces auto-referenciales (`source` igual a `target`) la curva se representa como un bucle alrededor del nodo, con longitud proporcional al valor de curvatura. Las líneas se curvan en sentido horario para valores positivos, y en sentido antihorario para valores negativos. Ten en cuenta que renderizar líneas curvas es puramente un efecto visual y no afecta el comportamiento de las fuerzas subyacentes. | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para la rotación a lo largo del eje de la línea para aplicar a la curva. No tiene efecto en líneas rectas. Con rotación `0`, la curva está orientada en la dirección de la intersección con el plano `XY`. El ángulo de rotación (en radianes) rotará la línea curva en sentido horario alrededor del eje "inicio-a-fin" desde esta orientación de referencia. | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace o atributo para especificar un material personalizado para estilizar los enlaces del grafo. Debe devolver una instancia de [ThreeJS Material](https://threejs.org/docs/#api/materials/Material). Si se devuelve un valor <i>falsy</i>, se usará el material predeterminado para ese enlace. | *el material de enlace predeterminado es [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial) estilizado según `color` y `opacity`.* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para la longitud de la punta de flecha que indica la direccionalidad del enlace. La flecha se muestra directamente sobre la línea del enlace, y apunta en la dirección de `source` > `target`. Un valor de `0` oculta la flecha. | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace o atributo para el color de la punta de flecha. | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para la posición longitudinal de la punta de flecha a lo largo de la línea del enlace, expresada como una relación entre `0` y `1`, donde `0` indica inmediatamente junto al nodo `source`, `1` junto al nodo `target`, y `0.5` justo en el medio. | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | Getter/setter para la resolución geométrica de la punta de flecha, expresada en cuántos segmentos de corte dividir la circunferencia de la base del cono. Valores más altos producen flechas más suaves. | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para el número de partículas (pequeñas esferas) a mostrar sobre la línea del enlace. Las partículas se distribuyen equiespaciadas a lo largo de la línea, viajan en la dirección `source` > `target`, y pueden usarse para indicar la direccionalidad del enlace. | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para la velocidad de las partículas direccionales, expresada como la relación de la longitud del enlace a recorrer por fotograma. Se desaconsejan valores superiores a `0.5`. | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace, atributo o constante numérica para el ancho de las partículas direccionales. Los valores se redondean al decimal más cercano para propósitos de indexación. | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> o <i>fn</i>]) | Función de acceso del objeto enlace o atributo para el color de las partículas direccionales. | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | Getter/setter para la resolución geométrica de cada partícula direccional, expresada en cuántos segmentos de corte dividir la circunferencia. Valores más altos producen partículas más suaves. | 4 |

### Control de renderizado
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>stopAnimation</b>() | Detiene el ciclo de renderizado del componente, congelando efectivamente la vista actual y cancelando toda interacción futura del usuario. Este método se puede usar para ahorrar rendimiento en circunstancias donde una imagen estática es suficiente. | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | Getter/setter para la posición de la cámara, en términos de coordenadas `x`, `y`, `z`. Cada una de las coordenadas es opcional, permitiendo movimiento en solo algunas dimensiones. El segundo argumento opcional se puede usar para definir la dirección a la que debe apuntar la cámara, en términos de un punto `{x,y,z}` en el espacio 3D. El tercer argumento opcional define la duración de la transición (en ms) para animar el movimiento de la cámara. Un valor de 0 (predeterminado) mueve la cámara inmediatamente a la posición final. | Por defecto, la cámara enfrentará el centro del grafo a una distancia `z` proporcional a la cantidad de nodos en el sistema. |
| <b>scene</b>() | Accede a la [Scene](https://threejs.org/docs/#api/scenes/Scene) interna de ThreeJS. Se puede usar para extender la escena actual con objetos adicionales no relacionados con 3d-force-graph. | |
| <b>camera</b>() | Accede a la [Camera](https://threejs.org/docs/#api/cameras/PerspectiveCamera) interna de ThreeJS. | |
| <b>renderer</b>() | Accede al [renderizador WebGL](https://threejs.org/docs/#api/renderers/WebGLRenderer) interno de ThreeJS. || 
| <b>tbControls</b>() | Accede a los [Trackball Controls](https://threejs.org/examples/misc_controls_trackball.html) internos de ThreeJS. ||

### Configuración del motor de fuerzas
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | Getter/setter para qué motor de simulación de fuerzas usar ([*d3*](https://github.com/vasturiano/d3-force-3d) o [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)). | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | Getter/setter para el número de dimensiones en las que ejecutar la simulación de fuerzas (1, 2 o 3). | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | Getter/setter para el parámetro de [decaimiento de intensidad de la simulación](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay), solo aplicable si se usa el motor de simulación d3. | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | Getter/setter para el [decaimiento de velocidad](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay) de los nodos que simula la resistencia del medio, solo aplicable si se usa el motor de simulación d3. | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | Getter/setter para las fuerzas internas que controlan el motor de simulación d3. Sigue la misma interfaz que [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force) de `d3-force-3d`. Tres fuerzas están incluidas por defecto: `'link'` (basada en [forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)), `'charge'` (basada en [forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)) y `'center'` (basada en [forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter)). Cada una de estas fuerzas puede ser reconfigurada, o se pueden agregar nuevas fuerzas al sistema. Este método solo es aplicable si se usa el motor de simulación d3. | |
| <b>warmupTicks</b>([<i>int</i>]) | Getter/setter para el número de ciclos del motor de diseño a ejecutar en seco al inicio antes de comenzar a renderizar. | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | Getter/setter para cuántos fotogramas integrados renderizar antes de detener y congelar el motor de diseño. | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | Getter/setter para cuánto tiempo (ms) renderizar antes de detener y congelar el motor de diseño. | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | Función de callback invocada en cada tick del motor de simulación. | - |
| <b>onEngineStop</b>(<i>fn</i>) | Función de callback invocada cuando el motor de simulación se detiene y el diseño se congela. | - |

### Interacción
| Método | Descripción | Por defecto |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | Función de callback para clics en nodos. El objeto nodo se incluye como único argumento `onNodeClick(node)`. | - |
| <b>onNodeHover</b>(<i>fn</i>) | Función de callback para eventos de mouse sobre nodos. El objeto nodo (o `null` si no hay ningún nodo bajo la línea de visión del mouse) se incluye como primer argumento, y el objeto nodo anterior (o null) como segundo argumento: `onNodeHover(node, prevNode)`. | - |
| <b>onNodeDrag</b>(<i>fn</i>) | Función de callback para interacciones de arrastre de nodos. Esta función se invoca repetidamente mientras se arrastra un nodo, cada vez que se actualiza su posición. El objeto nodo se incluye como único argumento `onNodeDrag(node)`. | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | Función de callback para el final de las interacciones de arrastre de nodos. Esta función se invoca cuando se suelta el nodo. El objeto nodo se incluye como único argumento `onNodeDragEnd(node)`. | - |
| <b>onLinkClick</b>(<i>fn</i>) | Función de callback para clics en enlaces. El objeto enlace se incluye como único argumento `onLinkClick(link)`. | - |
| <b>onLinkHover</b>(<i>fn</i>) | Función de callback para eventos de mouse sobre enlaces. El objeto enlace (o `null` si no hay ningún enlace bajo la línea de visión del mouse) se incluye como primer argumento, y el objeto enlace anterior (o null) como segundo argumento: `onLinkHover(link, prevLink)`. | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | Si mostrar la etiqueta del enlace al mirar el enlace de cerca (valor bajo) o desde lejos (valor alto). | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | Getter/setter para habilitar o no los eventos de seguimiento del mouse. Esto activa un rastreador interno de la posición del mouse en el canvas y habilita la funcionalidad de hover/clic de objetos y etiquetas de información, a costa del rendimiento. Si buscas la máxima ganancia en el rendimiento de tu grafo, se recomienda desactivar esta propiedad. | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | Getter/setter para habilitar o no la interacción del usuario para arrastrar nodos haciendo clic y arrastrando. Solo compatible con el motor de fuerzas `d3`. Si está habilitado, cada vez que se arrastra un nodo, la simulación se recalienta para que los otros nodos reaccionen a los cambios. Solo aplicable si enablePointerInteraction es `true` y se usa el motor de fuerzas `d3`. | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | Getter/setter para habilitar o no los controles de navegación trackball usados para mover la cámara usando interacciones del mouse (rotar/zoom/panorámica). | `true` |

### Sintaxis JSON de entrada
```
{
    "nodes": [ 
        { 
          "id": "id1",
          "name": "nombre1",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "nombre2",
          "val": 10 
        },
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        (...)
    ]
}
```
