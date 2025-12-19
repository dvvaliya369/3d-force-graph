# 3D फोर्स-डायरेक्टेड ग्राफ

[![NPM](https://nodei.co/npm/3d-force-graph.png?compact=true)](https://nodei.co/npm/3d-force-graph/)

<p align="center">
     <a href="https://vasturiano.github.io/3d-force-graph/example/large-graph/"><img width="80%" src="http://gist.github.com/vasturiano/02affe306ce445e423f992faeea13521/raw/preview.png"></a>
</p>

एक वेब घटक जो फोर्स-डायरेक्टेड इटरेटिव लेआउट का उपयोग करके 3-आयामी स्थान में ग्राफ डेटा संरचना का प्रतिनिधित्व करता है।
3D रेंडरिंग के लिए [ThreeJS](https://github.com/mrdoob/three.js/)/WebGL का उपयोग करता है और अंतर्निहित भौतिकी इंजन के लिए या तो [d3-force-3d](https://github.com/vasturiano/d3-force-3d) या [ngraph](https://github.com/anvaka/ngraph.forcelayout3d) का उपयोग करता है।

उदाहरण देखें:
* [बेसिक](https://vasturiano.github.io/3d-force-graph/example/basic/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/basic/index.html))
* [एसिंक्रोनस लोड](https://vasturiano.github.io/3d-force-graph/example/async-load/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/async-load/index.html))
* [बड़ा ग्राफ (~4k एलिमेंट्स)](https://vasturiano.github.io/3d-force-graph/example/large-graph/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/large-graph/index.html))
* [डायरेक्शनल ऐरो](https://vasturiano.github.io/3d-force-graph/example/directional-links-arrows/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-arrows/index.html))
* [डायरेक्शनल मूविंग पार्टिकल्स](https://vasturiano.github.io/3d-force-graph/example/directional-links-particles/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/directional-links-particles/index.html))
* [कर्व्ड लाइन्स और सेल्फ लिंक्स](https://vasturiano.github.io/3d-force-graph/example/curved-links/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/curved-links/index.html))
* [ऑटो-कलर्ड नोड्स/लिंक्स](https://vasturiano.github.io/3d-force-graph/example/auto-colored/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/auto-colored/index.html))
* [टेक्स्ट ऐज़ नोड्स](https://vasturiano.github.io/3d-force-graph/example/text-nodes/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/text-nodes/index.html))
* [कस्टम नोड ज्योमेट्री](https://vasturiano.github.io/3d-force-graph/example/custom-node-geometry/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/custom-node-geometry/index.html))
* [कैमरा ऑटोमेटिक ऑर्बिटिंग](https://vasturiano.github.io/3d-force-graph/example/camera-auto-orbit/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/camera-auto-orbit/index.html))
* [क्लिक टू फोकस ऑन नोड](https://vasturiano.github.io/3d-force-graph/example/click-to-focus/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html))
* [हाइलाइट नोड्स/लिंक्स](https://vasturiano.github.io/3d-force-graph/example/highlight/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/highlight/index.html))
* [डायनामिक डेटा चेंजेस](https://vasturiano.github.io/3d-force-graph/example/dynamic/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/dynamic/index.html))
* [नोड कॉलिजन डिटेक्शन](https://vasturiano.github.io/3d-force-graph/example/collision-detection/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/collision-detection/index.html))
* [सीन में एक्सटर्नल ऑब्जेक्ट्स ऐड करें](https://vasturiano.github.io/3d-force-graph/example/scene/) ([सोर्स](https://github.com/vasturiano/3d-force-graph/blob/master/example/scene/index.html))

[VR वर्जन](https://github.com/vasturiano/3d-force-graph-vr) और [2D कैनवस वर्जन](https://github.com/vasturiano/force-graph) भी देखें।

और [React बाइंडिंग्स](https://github.com/vasturiano/react-force-graph) चेक करें।

## क्विक स्टार्ट

```
import ForceGraph3D from '3d-force-graph';
```
या
```
var ForceGraph3D = require('3d-force-graph');
```
या तो
```
<script src="//unpkg.com/3d-force-graph"></script>
```
फिर
```
var myGraph = ForceGraph3D();
myGraph(<myDOMElement>)
    .graphData(<myData>);
```

## API रेफरेंस

### डेटा इनपुट
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>graphData</b>([<i>data</i>]) | ग्राफ डेटा संरचना के लिए गेटर/सेटर (सिंटेक्स डिटेल्स के लिए नीचे देखें)। [इन्क्रीमेंटल अपडेट्स](https://bl.ocks.org/vasturiano/2f602ea6c51c664c29ec56cbe2d6a5f6) को लागू करने के लिए भी इस्तेमाल किया जा सकता है। | `{ nodes: [], links: [] }` |
| <b>jsonUrl</b>([<i>url</i>]) | JSON फाइल का URL जिससे ग्राफ डेटा को सीधे लोड किया जाए, <i>graphData</i> को सीधे निर्दिष्ट करने का विकल्प। | |
| <b>nodeId</b>([<i>str</i>]) <br/><sub>(alias: <i>idField</i>)</sub> | नोड ऑब्जेक्ट एक्सेसर एट्रिब्यूट यूनिक नोड id के लिए (लिंक ऑब्जेक्ट्स source/target में इस्तेमाल किया जाता है)। | `id` |
| <b>linkSource</b>([<i>str</i>]) <br/><sub>(alias: <i>linkSourceField</i>)</sub> | लिंक ऑब्जेक्ट एक्सेसर एट्रिब्यूट जो सोर्स नोड के id को रेफर करता है। | `source` |
| <b>linkTarget</b>([<i>str</i>]) <br/><sub>(alias: <i>linkTargetField</i>)</sub> | लिंक ऑब्जेक्ट एक्सेसर एट्रिब्यूट जो टारगेट नोड के id को रेफर करता है। | `target` |

### कंटेनर लेआउट
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>width</b>([<i>px</i>]) | कैनवस की चौड़ाई के लिए गेटर/सेटर। | *&lt;window width&gt;* |
| <b>height</b>([<i>px</i>]) | कैनवस की ऊंचाई के लिए गेटर/सेटर। | *&lt;window height&gt;* |
| <b>backgroundColor</b>([<i>str</i>]) | चार्ट बैकग्राउंड कलर के लिए गेटर/सेटर। | `#000011` |
| <b>showNavInfo</b>([<i>boolean</i>]) | नेविगेशन कंट्रोल्स फुटर इन्फो दिखाने के लिए गेटर/सेटर। | `true` |

### नोड स्टाइलिंग
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>nodeRelSize</b>([<i>num</i>]) | नोड स्पेयर वॉल्यूम (क्यूबिक px) प्रति वैल्यू यूनिट के अनुपात के लिए गेटर/सेटर। | 4 |
| <b>nodeVal</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) <br/><sub>(alias: <i>valField</i>)</sub> | नोड ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट नोड न्यूमेरिक वैल्यू के लिए (स्पेयर वॉल्यूम को प्रभावित करता है)। | `val` |
| <b>nodeLabel</b>([<i>str</i> or <i>fn</i>]) <br/><sub>(alias: <i>nameField</i>)</sub> | नोड ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट नेम के लिए (लेबल में दिखाया जाता है)। प्लेन टेक्स्ट या HTML कंटेंट सपोर्ट करता है। | `name` |
| <b>nodeColor</b>([<i>str</i> or <i>fn</i>]) <br/><sub>(alias: <i>colorField</i>)</sub> | नोड ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट नोड कलर के लिए (स्पेयर कलर को प्रभावित करता है)। | `color` |
| <b>nodeAutoColorBy</b>([<i>str</i> or <i>fn</i>]) <br/><sub>(alias: <i>autoColorBy</i>)</sub> | नोड ऑब्जेक्ट एक्सेसर फंक्शन (`fn(node)`) या एट्रिब्यूट (e.g. `'type'`) ऑटोमेटिकली कलर ग्रुप करने के लिए। केवल उन नोड्स को प्रभावित करता है जिनके पास कलर एट्रिब्यूट नहीं है। | |
| <b>nodeOpacity</b>([<i>num</i>]) | नोड्स स्पेयर ओपेसिटी के लिए गेटर/सेटर, [0,1] के बीच। | 0.75   |
| <b>nodeResolution</b>([<i>num</i>]) | प्रत्येक नोड की ज्योमेट्रिक रेजोल्यूशन के लिए गेटर/सेटर, सर्कम्फरेंस को कितने स्लाइस सेगमेंट्स में डिवाइड करना है। उच्च वैल्यूज स्मूथर स्पेयर्स देते हैं। | 8 |
| <b>nodeThreeObject</b>([<i>Object3d</i>, <i>str</i> or <i>fn</i>]) | नोड ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट ग्राफ नोड्स के रूप में रेंडर करने के लिए कस्टम 3d ऑब्जेक्ट जनरेट करने के लिए। [ThreeJS Object3d](https://threejs.org/docs/index.html#api/core/Object3D) का इंस्टेंस रिटर्न करना चाहिए। अगर <i>falsy</i> वैल्यू रिटर्न की जाती है, तो उस नोड के लिए डिफॉल्ट 3d ऑब्जेक्ट टाइप इस्तेमाल किया जाएगा।  | *डिफॉल्ट नोड ऑब्जेक्ट एक स्पेयर है, `val` के अनुसार साइज्ड और `color` के अनुसार स्टाइल्ड।* |

### लिंक स्टाइलिंग
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>linkLabel</b>([<i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट नेम के लिए (लेबल में दिखाया जाता है)। प्लेन टेक्स्ट या HTML कंटेंट सपोर्ट करता है। | `name` |
| <b>linkVisibility</b>([<i>boolean</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या बूलियन कॉन्स्टेंट लिंक लाइन दिखाने के लिए। `false` की वैल्यू लिंक फोर्स को मेनटेन करती है बिना रेंडर किए। | `true` |
| <b>linkColor</b>([<i>str</i> or <i>fn</i>]) <br/><sub>(alias: <i>linkColorField</i>)</sub> | लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट लाइन कलर के लिए। | `color` |
| <b>linkAutoColorBy</b>([<i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन (`fn(link)`) या एट्रिब्यूट (e.g. `'type'`) ऑटोमेटिकली कलर ग्रुप करने के लिए। केवल उन लिंक्स को प्रभावित करता है जिनके पास कलर एट्रिब्यूट नहीं है। | |
| <b>linkOpacity</b>([<i>num</i>]) <br/><sub>(alias: <i>lineOpacity</i>)</sub> | लिंक्स की लाइन ओपेसिटी के लिए गेटर/सेटर, [0,1] के बीच। | 0.2 |
| <b>linkWidth</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट लिंक लाइन विड्थ के लिए। जीरो की वैल्यू एक [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) रेंडर करेगी जिसकी विड्थ कॉन्स्टेंट (`1px`) है रिजेक्शनल ऑफ डिस्टेंस। वैल्यूज इंडेक्सिंग पर्पोजेस के लिए नीयरेस्ट डेसिमल में राउंड की जाती हैं। | 0 |
| <b>linkResolution</b>([<i>num</i>]) | प्रत्येक लिंक की ज्योमेट्रिक रेजोल्यूशन के लिए गेटर/सेटर, सिलिंडर को कितने रेडियल सेगमेंट्स में डिवाइड करना है। उच्च वैल्यूज स्मूथर सिलिंडर्स देते हैं। केवल पॉजिटिव विड्थ वाले लिंक्स पर लागू। | 6 |
| <b>linkCurvature</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट लिंक लाइन की कर्वेचर रेडियस के लिए। केवल [ThreeJS Line](https://threejs.org/docs/#api/objects/Line) (`0` विड्थ) इस्तेमाल करने वाले लिंक्स पर लागू। कर्व्ड लाइन्स 3D बेजियर कर्व्स के रूप में रिप्रेजेंट की जाती हैं, और कोई भी न्यूमेरिक वैल्यू एक्सेप्टेड है। `0` की वैल्यू स्ट्रेट लाइन रेंडर करती है। `1` इंगित करता है कि रेडियस लाइन लेंथ के आधे के बराबर है, जिससे कर्व सेमी-सर्कल अप्रॉक्सिमेट करता है। सेल्फ-रेफरेंसिंग लिंक्स के लिए (`source` equal to `target`) कर्व नोड के चारों ओर एक लूप के रूप में रिप्रेजेंट किया जाता है, लेंथ कर्वेचर वैल्यू के प्रोपोर्शनल। लाइन्स पॉजिटिव वैल्यूज के लिए क्लॉकवाइज और नेगेटिव वैल्यूज के लिए काउंटर-क्लॉकवाइज कर्व्ड हैं। ध्यान दें कि कर्व्ड लाइन्स रेंडर करना केवल विजुअल इफेक्ट है और अंडरलाइंग फोर्सेस के बिहेवियर को प्रभावित नहीं करता। | 0 |
| <b>linkCurveRotation</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट कर्व को लाइन एक्सिस के साथ रोटेशन लागू करने के लिए। स्ट्रेट लाइन्स पर कोई इफेक्ट नहीं। `0` रोटेशन पर, कर्व `XY` प्लेन के इंटरसेक्शन की डायरेक्शन में ओरिएंटेड है। रोटेशन ऐंगल (रेडियंस में) "start-to-end" एक्सिस के चारों ओर क्लॉकवाइज रोटेट करेगा कर्व्ड लाइन को इस रेफरेंस ओरिएंटेशन से। | 0 |
| <b>linkMaterial</b>([<i>Material</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट ग्राफ लिंक्स को स्टाइल करने के लिए कस्टम मैटेरियल स्पेसिफाई करने के लिए। [ThreeJS Material](https://threejs.org/docs/#api/materials/Material) का इंस्टेंस रिटर्न करना चाहिए। अगर <i>falsy</i> वैल्यू रिटर्न की जाती है, तो उस लिंक के लिए डिफॉल्ट मैटेरियल इस्तेमाल किया जाएगा। | *डिफॉल्ट लिंक मैटेरियल [MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial) है `color` और `opacity` के अनुसार स्टाइल्ड।* |
| <b>linkDirectionalArrowLength</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट ऐरो हेड की लेंथ के लिए जो लिंक डायरेक्शनैलिटी इंगित करता है। ऐरो लिंक लाइन पर डायरेक्टली डिस्प्ले किया जाता है, और `source` > `target` की डायरेक्शन में पॉइंट करता है। `0` की वैल्यू ऐरो को हाइड करती है। | 0 |
| <b>linkDirectionalArrowColor</b>([<i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट ऐरो हेड के कलर के लिए। | `color` |
| <b>linkDirectionalArrowRelPos</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट लिंक लाइन के साथ ऐरो हेड की लॉन्गिट्यूडिनल पोजिशन के लिए, `0` और `1` के बीच रेशियो के रूप में एक्सप्रेस्ड, जहां `0` इंगित करता है `source` नोड के अगल, `1` `target` नोड के अगल, और `0.5` राइट इन द मिडल। | 0.5 |
| <b>linkDirectionalArrowResolution</b>([<i>num</i>]) | ऐरो हेड की ज्योमेट्रिक रेजोल्यूशन के लिए गेटर/सेटर, कों सर्कम्फरेंस को कितने स्लाइस सेगमेंट्स में डिवाइड करना है। उच्च वैल्यूज स्मूथर ऐरोज देते हैं। | 8 |
| <b>linkDirectionalParticles</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट पार्टिकल्स (स्मॉल स्पेयर्स) की संख्या के लिए जो लिंक लाइन पर डिस्प्ले किए जाएं। पार्टिकल्स लाइन के साथ इक्वि-स्पेस्ड डिस्ट्रीब्यूट किए जाते हैं, `source` > `target` की डायरेक्शन में ट्रेवल करते हैं, और लिंक डायरेक्शनैलिटी इंगित करने के लिए इस्तेमाल किए जा सकते हैं। | 0 |
| <b>linkDirectionalParticleSpeed</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट डायरेक्शनल पार्टिकल्स स्पीड के लिए, लिंक लेंथ टू ट्रेवल प्रति फ्रेम के रेशियो के रूप में एक्सप्रेस्ड। `0.5` से ऊपर की वैल्यूज डिस्करेज्ड हैं। | 0.01 |
| <b>linkDirectionalParticleWidth</b>([<i>num</i>, <i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन, एट्रिब्यूट या न्यूमेरिक कॉन्स्टेंट डायरेक्शनल पार्टिकल्स विड्थ के लिए। वैल्यूज इंडेक्सिंग पर्पोजेस के लिए नीयरेस्ट डेसिमल में राउंड की जाती हैं। | 0.5 |
| <b>linkDirectionalParticleColor</b>([<i>str</i> or <i>fn</i>]) | लिंक ऑब्जेक्ट एक्सेसर फंक्शन या एट्रिब्यूट डायरेक्शनल पार्टिकल्स कलर के लिए। | `color` |
| <b>linkDirectionalParticleResolution</b>([<i>num</i>]) | प्रत्येक डायरेक्शनल पार्टिकल की ज्योमेट्रिक रेजोल्यूशन के लिए गेटर/सेटर, सर्कम्फरेंस को कितने स्लाइस सेगमेंट्स में डिवाइड करना है। उच्च वैल्यूज स्मूथर पार्टिकल्स देते हैं। | 4 |

### रेंडर कंट्रोल
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>stopAnimation</b>() | कंपोनेंट के रेंडरिंग साइकल को स्टॉप करता है, इफेक्टिवली करंट व्यू को फ्रीज करता है और सभी फ्यूचर यूजर इंटरेक्शन को कैंसल करता है। यह मेथड स्टैटिक इमेज सुफिशिएंट होने की सर्कम्सटेंस में परफॉर्मेंस सेव करने के लिए इस्तेमाल किया जा सकता है। | |
| <b>cameraPosition</b>([<i>{x,y,z}</i>], [<i>lookAt</i>], [<i>ms</i>]) | कैमरा पोजिशन के लिए गेटर/सेटर, `x`, `y`, `z` कोऑर्डिनेट्स के टर्म्स में। प्रत्येक कोऑर्डिनेट ऑप्शनल है, कुछ डाइमेंशन्स में मोशन की अनुमति देता है। ऑप्शनल सेकंड आर्गुमेंट कैमरा को एआईम करने की डायरेक्शन डिफाइन करने के लिए इस्तेमाल किया जा सकता है, 3D स्पेस में `{x,y,z}` पॉइंट के टर्म्स में। 3rd ऑप्शनल आर्गुमेंट कैमरा मोशन को ऐनिमेट करने के लिए ट्रांजिशन की ड्यूरेशन (ms में) डिफाइन करता है। `0` (डिफॉल्ट) की वैल्यू कैमरा को इमीडिएटली फाइनल पोजिशन में ले जाती है। | डिफॉल्ट रूप से कैमरा ग्राफ के सेंटर को फेस करेगा `z` डिस्टेंस पर जो सिस्टम में नोड्स की संख्या के प्रोपोर्शनल है। |
| <b>scene</b>() | इंटरनल ThreeJS [Scene](https://threejs.org/docs/#api/scenes/Scene) को ऐक्सेस करें। करंट सीन को 3d-force-graph से रिलेटेड नहीं एक्स्ट्रा ऑब्जेक्ट्स के साथ एक्सटेंड करने के लिए इस्तेमाल किया जा सकता है। | |
| <b>camera</b>() | इंटरनल ThreeJS [Camera](https://threejs.org/docs/#api/cameras/PerspectiveCamera) को ऐक्सेस करें। | |
| <b>renderer</b>() | इंटरनल ThreeJS [WebGL renderer](https://threejs.org/docs/#api/renderers/WebGLRenderer) को ऐक्सेस करें। || 
| <b>tbControls</b>() | इंटरनल ThreeJS [Trackball Controls](https://threejs.org/examples/misc_controls_trackball.html) को ऐक्सेस करें। ||

### फोर्स इंजन कॉन्फिगरेशन 
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>forceEngine</b>([<i>str</i>]) | किस फोर्स-सिमुलेशन इंजन का इस्तेमाल करना है ([*d3*](https://github.com/vasturiano/d3-force-3d) या [*ngraph*](https://github.com/anvaka/ngraph.forcelayout)) के लिए गेटर/सेटर। | `d3` |
| <b>numDimensions</b>([<i>int</i>]) | फोर्स सिमुलेशन को रन करने के लिए डाइमेंशन्स की संख्या (1, 2 या 3) के लिए गेटर/सेटर। | 3 |
| <b>d3AlphaDecay</b>([<i>num</i>]) | [सिमुलेशन इंटेंसिटी डिके](https://github.com/vasturiano/d3-force-3d#simulation_alphaDecay) पैरामीटर के लिए गेटर/सेटर, केवल d3 सिमुलेशन इंजन इस्तेमाल करने पर लागू। | `0.0228` |
| <b>d3VelocityDecay</b>([<i>num</i>]) | नोड्स के [वेलोसिटी डिके](https://github.com/vasturiano/d3-force-3d#simulation_velocityDecay) के लिए गेटर/सेटर जो मीडियम रेजिस्टेंस सिमुलेट करता है, केवल d3 सिमुलेशन इंजन इस्तेमाल करने पर लागू। | `0.4` |
| <b>d3Force</b>(<i>str</i>, [<i>fn</i>]) | d3 सिमुलेशन इंजन को कंट्रोल करने वाले इंटरनल फोर्सेस के लिए गेटर/सेटर। `d3-force-3d`'s [simulation.force](https://github.com/vasturiano/d3-force-3d#simulation_force) के समान इंटरफेस फॉलो करता है। तीन फोर्सेस डिफॉल्ट रूप से शामिल हैं: `'link'` (बेस्ड ऑन [forceLink](https://github.com/vasturiano/d3-force-3d#forceLink)), `'charge'` (बेस्ड ऑन [forceManyBody](https://github.com/vasturiano/d3-force-3d#forceManyBody)) और `'center'` (बेस्ड ऑन [forceCenter](https://github.com/vasturiano/d3-force-3d#forceCenter))। इनमें से प्रत्येक फोर्स को री-कॉन्फिगर किया जा सकता है, या सिस्टम में नए फोर्सेस ऐड किए जा सकते हैं। यह मेथड केवल d3 सिमुलेशन इंजन इस्तेमाल करने पर लागू है। | |
| <b>warmupTicks</b>([<i>int</i>]) | इग्निशन से पहले रेंडरिंग शुरू करने से पहले ड्राई-रन करने के लिए लेआउट इंजन साइकल्स की संख्या के लिए गेटर/सेटर। | 0 |
| <b>cooldownTicks</b>([<i>int</i>]) | लेआउट इंजन को स्टॉप करने और फ्रीज करने से पहले रेंडर करने के लिए बिल्ट-इन फ्रेम्स की संख्या के लिए गेटर/सेटर। | Infinity |
| <b>cooldownTime</b>([<i>num</i>]) | लेआउट इंजन को स्टॉप करने और फ्रीज करने से पहले रेंडर करने के लिए (ms) के लिए गेटर/सेटर। | 15000 |
| <b>onEngineTick</b>(<i>fn</i>) | सिमुलेशन इंजन के प्रत्येक टिक पर इनवोक किया जाने वाला कॉलबैक फंक्शन। | - |
| <b>onEngineStop</b>(<i>fn</i>) | सिमुलेशन इंजन स्टॉप होने और लेआउट फ्रीज होने पर इनवोक किया जाने वाला कॉलबैक फंक्शन। | - |

### इंटरेक्शन
| मेथड | डिस्क्रिप्शन | डिफॉल्ट |
| --- | --- | :--: |
| <b>onNodeClick</b>(<i>fn</i>) | नोड क्लिक्स के लिए कॉलबैक फंक्शन। नोड ऑब्जेक्ट सिंगल आर्गुमेंट `onNodeClick(node)` के रूप में शामिल है। | - |
| <b>onNodeHover</b>(<i>fn</i>) | नोड माउस ओवर इवेंट्स के लिए कॉलबैक फंक्शन। नोड ऑब्जेक्ट (या `null` अगर माउस लाइन ऑफ साइट के तहत कोई नोड नहीं है) फर्स्ट आर्गुमेंट के रूप में शामिल है, और प्रीवियस नोड ऑब्जेक्ट (या null) सेकंड आर्गुमेंट के रूप में: `onNodeHover(node, prevNode)`। | - |
| <b>onNodeDrag</b>(<i>fn</i>) | नोड ड्रैग इंटरेक्शन्स के लिए कॉलबैक फंक्शन। यह फंक्शन रिपीटेडली इनवोक किया जाता है जब नोड ड्रैग किया जाता है, हर बार उसकी पोजिशन अपडेट होने पर। नोड ऑब्जेक्ट सिंगल आर्गुमेंट `onNodeDrag(node)` के रूप में शामिल है। | - |
| <b>onNodeDragEnd</b>(<i>fn</i>) | नोड ड्रैग इंटरेक्शन्स के एंड के लिए कॉलबैक फंक्शन। यह फंक्शन तब इनवोक किया जाता है जब नोड रिलीज़ किया जाता है। नोड ऑब्जेक्ट सिंगल आर्गुमेंट `onNodeDragEnd(node)` के रूप में शामिल है। | - |
| <b>onLinkClick</b>(<i>fn</i>) | लिंक क्लिक्स के लिए कॉलबैक फंक्शन। लिंक ऑब्जेक्ट सिंगल आर्गुमेंट `onLinkClick(link)` के रूप में शामिल है। | - |
| <b>onLinkHover</b>(<i>fn</i>) | लिंक माउस ओवर इवेंट्स के लिए कॉलबैक फंक्शन। लिंक ऑब्जेक्ट (या `null` अगर माउस लाइन ऑफ साइट के तहत कोई लिंक नहीं है) फर्स्ट आर्गुमेंट के रूप में शामिल है, और प्रीवियस लिंक ऑब्जेक्ट (या null) सेकंड आर्गुमेंट के रूप में: `onLinkHover(link, prevLink)`। | - |
| <b>linkHoverPrecision</b>([<i>int</i>]) | लिंक को क्लोजली गेज़ करने पर लिंक लेबल डिस्प्ले करना (लो वैल्यू) या फार अवे से (हाई वैल्यू)। | 1 |
| <b>enablePointerInteraction</b>([<i>boolean</i>]) | कैनवस माउस पोजिशन का इंटरनल ट्रैकर को एक्टिवेट करने और ऑब्जेक्ट हॉवर/क्लिक और टूलटिप लेबल्स की फंक्शनैलिटी को इनेबल करने के लिए गेटर/सेटर। अगर आप अपने ग्राफ परफॉर्मेंस में मैक्सिमम गेन चाहते हैं तो इस प्रॉपर्टी को स्विच ऑफ करना रेकमेंडेड है। | `true` |
| <b>enableNodeDrag</b>([<i>boolean</i>]) | क्लिक-ड्रैगिंग द्वारा नोड्स को ड्रैग करने के लिए यूजर इंटरेक्शन को इनेबल करने के लिए गेटर/सेटर। केवल `d3` फोर्स इंजन पर सपोर्टेड। अगर इनेबल्ड है, तो हर बार जब नोड ड्रैग किया जाता है तो सिमुलेशन री-हीटेड हो जाता है ताकि अन्य नोड्स चेंजेस पर रिएक्ट करें। केवल `enablePointerInteraction` `true` होने पर और `d3` फोर्स इंजन इस्तेमाल करने पर लागू। | `true` |
| <b>enableNavigationControls</b>([<i>boolean</i>]) | माउस इंटरेक्शन्स (रोटेट/जूम/पैन) का उपयोग करके कैमरा मूव करने के लिए ट्रैकबॉल नेविगेशन कंट्रोल्स को इनेबल करने के लिए गेटर/सेटर। | `true` |

### इनपुट JSON सिंटेक्स
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