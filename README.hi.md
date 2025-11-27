# 3D फोर्स-डायरेक्टेड ग्राफ

[![NPM](https://nodei.co/npm/3d-force-graph.png?compact=true)](https://nodei.co/npm/3d-force-graph/)

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph/example/large-graph/"><img width="80%" src="http://gist.github.com/vasturiano/02affe306ce445e423f992faeea13521/raw/preview.png"></a>
</p>

एक वेब कंपोनेंट जो फोर्स-डायरेक्टेड इटरेटिव लेआउट का उपयोग करके त्रि-आयामी स्थान में ग्राफ डेटा संरचना को प्रदर्शित करता है।
3D रेंडरिंग के लिए [ThreeJS](https://github.com/mrdoob/three.js/)/WebGL और अंतर्निहित फिजिक्स इंजन के लिए [d3-force-3d](https://github.com/vasturiano/d3-force-3d) या [ngraph](https://github.com/anvaka/ngraph.forcelayout3d) का उपयोग करता है।

उदाहरण देखें:
* [बेसिक](https://vasturiano.github.io/3d-force-graph/example/basic/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/basic/index.html))
* [एसिंक्रोनस लोड](https://vasturiano.github.io/3d-force-graph/example/async-load/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/async-load/index.html))
* [बड़ा ग्राफ (~4k एलिमेंट्स)](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [डायरेक्शनल एरो](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [डायरेक्शनल मूविंग पार्टिकल्स](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [कर्व्ड लाइन्स और सेल्फ लिंक्स](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [ऑटो-कलर्ड नोड्स/लिंक्स](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [टेक्स्ट नोड्स के रूप में](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [कस्टम नोड ज्योमेट्रीज](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [कैमरा ऑटोमेटिक ऑर्बिटिंग](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [नोड पर फोकस करने के लिए क्लिक करें](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [नोड्स/लिंक्स को हाइलाइट करें](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [डायनामिक डेटा परिवर्तन](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
* [नोड कोलिजन डिटेक्शन](https://vasturiano.github.io/3d-force-graph/example/collision-detection/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/collision-detection/index.html))
* [सीन में बाहरी ऑब्जेक्ट्स जोड़ें](https://vasturiano.github.io/3d-force-graph/example/scene/) ([सोर्स कोड](https://github.com/vasturiano/3d-force-graph/blob/master/example/scene/index.html))

[VR वर्जन](https://github.com/vasturiano/3d-force-graph-vr) और [2D कैनवास वर्जन](https://github.com/vasturiano/force-graph) भी देखें।

और [React बाइंडिंग्स](https://github.com/vasturiano/react-force-graph) भी चेक करें।

## त्वरित शुरुआत

```
import ForceGraph3D from '3d-force-graph';
```
या
```
var ForceGraph3D = require('3d-force-graph');
```
या फिर
```
<script src="//unpkg.com/3d-force-graph"></script>
```
फिर
```
var myGraph = ForceGraph3D();
myGraph(<myDOMElement>)
    .graphData(<myData>);
```

## API संदर्भ

### डेटा इनपुट
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | ग्राफ डेटा संरचना के लिए Getter/setter (सिंटैक्स विवरण के लिए नीचे देखें)। [इंक्रीमेंटल अपडेट्स](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6) लागू करने के लिए भी उपयोग किया जा सकता है। | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | ग्राफ डेटा को सीधे लोड करने के लिए JSON फ़ाइल का URL, <i>graphData</i> को सीधे निर्दिष्ट करने के विकल्प के रूप में। | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(उपनाम: <i>idField</i>)</sub> | यूनिक नोड id के लिए नोड ऑब्जेक्ट एक्सेसर एट्रिब्यूट (लिंक ऑब्जेक्ट्स source/target में उपयोग किया जाता है)। | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(उपनाम: <i>linkSourceField</i>)</sub> | लिंक ऑब्जेक्ट एक्सेसर एट्रिब्यूट जो सोर्स नोड की id को संदर्भित करता है। | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(उपनाम: <i>linkTargetField</i>)</sub> | लिंक ऑब्जेक्ट एक्सेसर एट्रिब्यूट जो टारगेट नोड की id को संदर्भित करता है। | `target` |

### कंटेनर लेआउट
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | कैनवास की चौड़ाई के लिए Getter/setter। | *&lt;विंडो की चौड़ाई&gt;* |
| <b>height</b>([<i>px</i>]) | कैनवास की ऊंचाई के लिए Getter/setter। | *&lt;विंडो की ऊंचाई&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | चार्ट बैकग्राउंड कलर के लिए Getter/setter। | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | नेविगेशन कंट्रोल्स फुटर जानकारी दिखाने या न दिखाने के लिए Getter/setter। | `true` |

### नोड स्टाइलिंग
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | वैल्यू यूनिट प्रति नोड स्फीयर वॉल्यूम (क्यूबिक px) के अनुपात के लिए Getter/setter। | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) <br/><sub>(उपनाम: <i>valField</i>)</sub> | नोड न्यूमेरिक वैल्यू के लिए नोड ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट (स्फीयर वॉल्यूम को प्रभावित करता है)। | `val` |
| <b>nodeLabel</b>([<i>str</i> या <i>fn</i>]) <br/><sub>(उपनाम: <i>nameField</i>)</sub> | नाम के लिए नोड ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट (लेबल में दिखाया गया)। प्लेन टेक्स्ट या HTML कंटेंट को सपोर्ट करता है। | `name` |
| <b>nodeColor</b>([<i>str</i> या <i>fn</i>]) <br/><sub>(उपनाम: <i>colorField</i>)</sub> | नोड कलर के लिए नोड ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट (स्फीयर कलर को प्रभावित करता है)। | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> या <i>fn</i>]) <br/><sub>(उपनाम: <i>autoColorBy</i>)</sub> | ऑटोमेटिक रूप से कलर्स को ग्रुप करने के लिए नोड ऑब्जेक्ट एक्सेसर फंक्शन (`fn(node)`) या एट्रिब्यूट (जैसे `'type'`)। केवल उन नोड्स को प्रभावित करता है जिनमें कलर एट्रिब्यूट नहीं है। | |
| <b>nodeOpacity</b>([<i>num</i>]) | नोड्स स्फीयर की अपारदर्शिता के लिए Getter/setter, [0,1] के बीच। | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | प्रत्येक नोड के ज्यामितीय रिज़ॉल्यूशन के लिए Getter/setter, जो परिधि को कितने स्लाइस सेगमेंट्स में विभाजित करना है में व्यक्त किया गया है। उच्च मान चिकने स्फीयर उत्पन्न करते हैं। | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> या <i>fn</i>]) | ग्राफ नोड्स के रूप में रेंडर करने के लिए कस्टम 3d ऑब्जेक्ट जेनरेट करने के लिए नोड ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट। [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D) का एक इंस्टेंस रिटर्न करना चाहिए। यदि <i>falsy</i> वैल्यू रिटर्न की जाती है, तो उस नोड के लिए डिफ़ॉल्ट 3d ऑब्जेक्ट टाइप का उपयोग किया जाएगा।  | *डिफ़ॉल्ट नोड ऑब्जेक्ट एक स्फीयर है, जो `val` के अनुसार आकार और `color` के अनुसार स्टाइल किया गया है।* |

### लिंक स्टाइलिंग
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> या <i>fn</i>]) | नाम के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट (लेबल में दिखाया गया)। प्लेन टेक्स्ट या HTML कंटेंट को सपोर्ट करता है। | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> या <i>fn</i>]) | लिंक लाइन को डिस्प्ले करने या न करने के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या बूलियन कॉन्स्टेंट। `false` की वैल्यू लिंक फोर्स को रेंडर किए बिना बनाए रखती है। | `true` |
| <b>linkColor</b>([<i>str</i> या <i>fn</i>]) <br/><sub>(उपनाम: <i>linkColorField</i>)</sub> | लाइन कलर के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट। | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> या <i>fn</i>]) | ऑटोमेटिक रूप से कलर्स को ग्रुप करने के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन (`fn(link)`) या एट्रिब्यूट (जैसे `'type'`)। केवल उन लिंक्स को प्रभावित करता है जिनमें कलर एट्रिब्यूट नहीं है। | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(उपनाम: <i>lineOpacity</i>)</sub> | लिंक्स की लाइन अपारदर्शिता के लिए Getter/setter, [0,1] के बीच। | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | लिंक लाइन की चौड़ाई के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट। शून्य की वैल्यू एक [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) रेंडर करेगी जिसकी चौड़ाई दूरी की परवाह किए बिना स्थिर (`1px`) है। इंडेक्सिंग उद्देश्यों के लिए वैल्यू को निकटतम दशमलव तक राउंड किया जाता है। | 0 |
| <b>linkResolution</b>([<i>num</i>]) | प्रत्येक लिंक के ज्यामितीय रिज़ॉल्यूशन के लिए Getter/setter, जो सिलेंडर को कितने रेडियल सेगमेंट्स में विभाजित करना है में व्यक्त किया गया है। उच्च मान चिकने सिलेंडर उत्पन्न करते हैं। केवल पॉजिटिव चौड़ाई वाले लिंक्स पर लागू। | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | लिंक लाइन की वक्रता त्रिज्या के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट। केवल [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) (`0` चौड़ाई) का उपयोग करने वाले लिंक्स पर लागू। कर्व्ड लाइन्स को 3D बेज़ियर कर्व्स के रूप में प्रदर्शित किया जाता है, और कोई भी न्यूमेरिक वैल्यू स्वीकार की जाती है। `0` की वैल्यू एक सीधी लाइन रेंडर करती है। `1` लाइन की लंबाई के आधे के बराबर त्रिज्या को इंगित करता है, जिससे वक्र एक अर्ध-वृत्त के करीब होता है। सेल्फ-रेफरेंसिंग लिंक्स (`source` `target` के बराबर) के लिए वक्र को नोड के चारों ओर एक लूप के रूप में प्रदर्शित किया जाता है, जिसकी लंबाई वक्रता वैल्यू के अनुपात में होती है। पॉजिटिव वैल्यू के लिए लाइन्स घड़ी की दिशा में और नेगेटिव वैल्यू के लिए घड़ी की विपरीत दिशा में कर्व होती हैं। ध्यान दें कि कर्व्ड लाइन्स को रेंडर करना विशुद्ध रूप से एक विज़ुअल इफेक्ट है और अंतर्निहित फोर्सेज के व्यवहार को प्रभावित नहीं करता है। | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | वक्र पर लागू करने के लिए लाइन एक्सिस के साथ रोटेशन के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट। सीधी लाइन्स पर कोई प्रभाव नहीं। `0` रोटेशन पर, वक्र `XY` प्लेन के साथ इंटरसेक्शन की दिशा में ओरिएंटेड होता है। रोटेशन एंगल (रेडियन में) इस रेफरेंस ओरिएंटेशन से "स्टार्ट-टू-एंड" एक्सिस के चारों ओर कर्व्ड लाइन को घड़ी की दिशा में घुमाएगा। | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> या <i>fn</i>]) | ग्राफ लिंक्स को स्टाइल करने के लिए कस्टम मटेरियल निर्दिष्ट करने के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट। [ThreeJS Material](https://threejs.org/docs/#api/materials/Material) का एक इंस्टेंस रिटर्न करना चाहिए। यदि <i>falsy</i> वैल्यू रिटर्न की जाती है, तो उस लिंक के लिए डिफ़ॉल्ट मटेरियल का उपयोग किया जाएगा। | *डिफ़ॉल्ट लिंक मटेरियल [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial) है जो `color` और `opacity` के अनुसार स्टाइल किया गया है।* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | लिंक डायरेक्शनैलिटी को इंगित करने वाले एरो हेड की लंबाई के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट। एरो सीधे लिंक लाइन के ऊपर प्रदर्शित होता है, और `source` > `target` की दिशा में पॉइंट करता है। `0` की वैल्यू एरो को छुपाती है। | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> या <i>fn</i>]) | एरो हेड के कलर के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट। | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | लिंक लाइन के साथ एरो हेड की लॉन्गिट्यूडिनल पोजीशन के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट, `0` और `1` के बीच अनुपात के रूप में व्यक्त किया गया है, जहां `0` `source` नोड के तुरंत बगल में, `1` `target` नोड के बगल में, और `0.5` बिल्कुल बीच में इंगित करता है। | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | एरो हेड के ज्यामितीय रिज़ॉल्यूशन के लिए Getter/setter, जो कोन बेस परिधि को कितने स्लाइस सेगमेंट्स में विभाजित करना है में व्यक्त किया गया है। उच्च मान चिकने एरो उत्पन्न करते हैं। | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | लिंक लाइन के ऊपर डिस्प्ले करने के लिए पार्टिकल्स (छोटे स्फीयर) की संख्या के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट। पार्टिकल्स लाइन के साथ समान रूप से वितरित होते हैं, `source` > `target` की दिशा में यात्रा करते हैं, और लिंक डायरेक्शनैलिटी को इंगित करने के लिए उपयोग किए जा सकते हैं। | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | डायरेक्शनल पार्टिकल्स की स्पीड के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट, प्रति फ्रेम यात्रा करने के लिए लिंक लंबाई के अनुपात के रूप में व्यक्त किया गया है। `0.5` से ऊपर की वैल्यू को हतोत्साहित किया जाता है। | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> या <i>fn</i>]) | डायरेक्शनल पार्टिकल्स की चौड़ाई के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट। इंडेक्सिंग उद्देश्यों के लिए वैल्यू को निकटतम दशमलव तक राउंड किया जाता है। | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> या <i>fn</i>]) | डायरेक्शनल पार्टिकल्स के कलर के लिए लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट। | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | प्रत्येक डायरेक्शनल पार्टिकल के ज्यामितीय रिज़ॉल्यूशन के लिए Getter/setter, जो परिधि को कितने स्लाइस सेगमेंट्स में विभाजित करना है में व्यक्त किया गया है। उच्च मान चिकने पार्टिकल्स उत्पन्न करते हैं। | 4 |

### रेंडर कंट्रोल
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>stopAnimation</b>() | कंपोनेंट के रेंडरिंग साइकिल को रोकता है, प्रभावी रूप से वर्तमान व्यू को फ्रीज करता है और सभी भविष्य के यूजर इंटरैक्शन को कैंसल करता है। इस मेथड का उपयोग उन परिस्थितियों में परफॉर्मेंस बचाने के लिए किया जा सकता है जहां एक स्टैटिक इमेज पर्याप्त है। | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | कैमरा पोजीशन के लिए Getter/setter, `x`, `y`, `z` कोऑर्डिनेट्स के संदर्भ में। प्रत्येक कोऑर्डिनेट ऑप्शनल है, जो केवल कुछ डायमेंशन्स में मोशन की अनुमति देता है। ऑप्शनल दूसरे आर्गुमेंट का उपयोग उस दिशा को परिभाषित करने के लिए किया जा सकता है जिस पर कैमरे को लक्ष्य करना चाहिए, 3D स्पेस में एक `{x,y,z}` पॉइंट के संदर्भ में। तीसरा ऑप्शनल आर्गुमेंट कैमरा मोशन को एनिमेट करने के लिए ट्रांजिशन की अवधि (ms में) को परिभाषित करता है। 0 की वैल्यू (डिफ़ॉल्ट) कैमरे को तुरंत अंतिम पोजीशन पर ले जाती है। | डिफ़ॉल्ट रूप से कैमरा सिस्टम में नोड्स की मात्रा के अनुपात में `z` दूरी पर ग्राफ के केंद्र का सामना करेगा। |
| <b>scene</b>() | आंतरिक ThreeJS [Scene](https://threejs.org/docs/#api/scenes/Scene) तक पहुंच। वर्तमान सीन को 3d-force-graph से संबंधित नहीं अतिरिक्त ऑब्जेक्ट्स के साथ विस्तारित करने के लिए उपयोग किया जा सकता है। | |
| <b>camera</b>() | आंतरिक ThreeJS [Camera](https://threejs.org/docs/#api/cameras/PerspectiveCamera) तक पहुंच। | |
| <b>renderer</b>() | आंतरिक ThreeJS [WebGL renderer](https://threejs.org/docs/#api/renderers/WebGLRenderer) तक पहुंच। || 
| <b>tbControls</b>() | आंतरिक ThreeJS [Trackball Controls](https://threejs.org/examples/misc_controls_trackball.html) तक पहुंच। ||

### फोर्स इंजन कॉन्फ़िगरेशन
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | किस फोर्स-सिमुलेशन इंजन का उपयोग करना है ([*d3*](https://github.com/vasturiano/d3-force-3d) या [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)) के लिए Getter/setter। | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | फोर्स सिमुलेशन को चलाने के लिए डायमेंशन्स की संख्या (1, 2 या 3) के लिए Getter/setter। | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | [सिमुलेशन इंटेंसिटी डिके](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay) पैरामीटर के लिए Getter/setter, केवल d3 सिमुलेशन इंजन का उपयोग करने पर लागू। | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | नोड्स की [वेलोसिटी डिके](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay) के लिए Getter/setter जो मीडियम रेजिस्टेंस को सिमुलेट करती है, केवल d3 सिमुलेशन इंजन का उपयोग करने पर लागू। | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | आंतरिक फोर्सेज के लिए Getter/setter जो d3 सिमुलेशन इंजन को कंट्रोल करते हैं। `d3-force-3d` के [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force) के समान इंटरफेस का पालन करता है। डिफ़ॉल्ट रूप से तीन फोर्सेज शामिल हैं: `'link'` ([forceLink](https://github.com/vasturiano/d3-force-3d#forceLink) पर आधारित), `'charge'` ([forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody) पर आधारित) और `'center'` ([forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter) पर आधारित)। इनमें से प्रत्येक फोर्स को रीकॉन्फ़िगर किया जा सकता है, या सिस्टम में नए फोर्सेज जोड़े जा सकते हैं। यह मेथड केवल d3 सिमुलेशन इंजन का उपयोग करने पर लागू है। | |
| <b>warmupTicks</b>([<i>int</i>]) | रेंडर करना शुरू करने से पहले इग्निशन पर ड्राई-रन करने के लिए लेआउट इंजन साइकिल्स की संख्या के लिए Getter/setter। | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | लेआउट इंजन को रोकने और फ्रीज करने से पहले कितने बिल्ट-इन फ्रेम्स को रेंडर करना है के लिए Getter/setter। | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | लेआउट इंजन को रोकने और फ्रीज करने से पहले कितने समय (ms) तक रेंडर करना है के लिए Getter/setter। | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | सिमुलेशन इंजन के प्रत्येक टिक पर इनवोक किया गया कॉलबैक फंक्शन। | - |
| <b>onEngineStop</b>(<i>fn</i>) | जब सिमुलेशन इंजन रुकता है और लेआउट फ्रीज होता है तो इनवोक किया गया कॉलबैक फंक्शन। | - |

### इंटरैक्शन
| मेथड | विवरण | डिफ़ॉल्ट |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | नोड क्लिक्स के लिए कॉलबैक फंक्शन। नोड ऑब्जेक्ट को सिंगल आर्गुमेंट `onNodeClick(node)` के रूप में शामिल किया गया है। | - |
| <b>onNodeHover</b>(<i>fn</i>) | नोड माउस ओवर इवेंट्स के लिए कॉलबैक फंक्शन। नोड ऑब्जेक्ट (या `null` यदि माउस की दृष्टि रेखा के नीचे कोई नोड नहीं है) को पहले आर्गुमेंट के रूप में, और पिछले नोड ऑब्जेक्ट (या null) को दूसरे आर्गुमेंट के रूप में शामिल किया गया है: `onNodeHover(node, prevNode)`। | - |
| <b>onNodeDrag</b>(<i>fn</i>) | नोड ड्रैग इंटरैक्शन्स के लिए कॉलबैक फंक्शन। यह फंक्शन नोड को ड्रैग करते समय बार-बार इनवोक किया जाता है, हर बार जब इसकी पोजीशन अपडेट होती है। नोड ऑब्जेक्ट को सिंगल आर्गुमेंट `onNodeDrag(node)` के रूप में शामिल किया गया है। | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | नोड ड्रैग इंटरैक्शन्स के अंत के लिए कॉलबैक फंक्शन। यह फंक्शन तब इनवोक किया जाता है जब नोड को रिलीज किया जाता है। नोड ऑब्जेक्ट को सिंगल आर्गुमेंट `onNodeDragEnd(node)` के रूप में शामिल किया गया है। | - |
| <b>onLinkClick</b>(<i>fn</i>) | लिंक क्लिक्स के लिए कॉलबैक फंक्शन। लिंक ऑब्जेक्ट को सिंगल आर्गुमेंट `onLinkClick(link)` के रूप में शामिल किया गया है। | - |
| <b>onLinkHover</b>(<i>fn</i>) | लिंक माउस ओवर इवेंट्स के लिए कॉलबैक फंक्शन। लिंक ऑब्जेक्ट (या `null` यदि माउस की दृष्टि रेखा के नीचे कोई लिंक नहीं है) को पहले आर्गुमेंट के रूप में, और पिछले लिंक ऑब्जेक्ट (या null) को दूसरे आर्गुमेंट के रूप में शामिल किया गया है: `onLinkHover(link, prevLink)`। | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | लिंक को करीब से (कम वैल्यू) या दूर से (उच्च वैल्यू) देखते समय लिंक लेबल को डिस्प्ले करना है या नहीं। | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | माउस ट्रैकिंग इवेंट्स को सक्षम करने या न करने के लिए Getter/setter। यह कैनवास माउस पोजीशन के एक आंतरिक ट्रैकर को सक्रिय करता है और ऑब्जेक्ट होवर/क्लिक और टूलटिप लेबल्स की कार्यक्षमता को सक्षम करता है, परफॉर्मेंस की कीमत पर। यदि आप अपने ग्राफ परफॉर्मेंस में अधिकतम लाभ की तलाश कर रहे हैं तो इस प्रॉपर्टी को बंद करने की सिफारिश की जाती है। | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | क्लिक-ड्रैगिंग द्वारा नोड्स को ड्रैग करने के लिए यूजर इंटरैक्शन को सक्षम करने या न करने के लिए Getter/setter। केवल `d3` फोर्स इंजन पर समर्थित। यदि सक्षम है, तो हर बार जब एक नोड को ड्रैग किया जाता है तो सिमुलेशन को फिर से गर्म किया जाता है ताकि अन्य नोड्स परिवर्तनों पर प्रतिक्रिया करें। केवल तभी लागू होता है जब enablePointerInteraction `true` हो और `d3` फोर्स इंजन का उपयोग कर रहे हों। | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | माउस इंटरैक्शन्स (रोटेट/ज़ूम/पैन) का उपयोग करके कैमरे को मूव करने के लिए उपयोग किए जाने वाले ट्रैकबॉल नेविगेशन कंट्रोल्स को सक्षम करने या न करने के लिए Getter/setter। | `true` |

### इनपुट JSON सिंटैक्स
```
{
    "nodes": [ 
        { 
          "id": "id1",
          "name": "name1",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "name2",
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
