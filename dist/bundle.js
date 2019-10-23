!function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=86)}([function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i(33),r=i(3);i.d(t,"b",(function(){return r.a}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=Object(n.a)(HTMLElement)},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));const n=e=>window.translation?window.translation[e]?window.translation[e]:(console.warn(`i18n: Translation not found for "${e}"`),e):e},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const n=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e},function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class n{constructor(e){this.value=e.toString()}toString(){return this.value}}function r(e){if(e instanceof n)return e.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)}const a=function(e,...t){const i=document.createElement("template");return i.innerHTML=t.reduce((t,i,a)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof n)return r(e);throw new Error(`non-template value passed to Polymer's html function: ${e}`)}(i)+e[a+1],e[0]),i}},function(e,t,i){"use strict";i(10);var n=i(2),r=(i(8),i(50)),a=i(14);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function s(e){return"slot"===e.localName}let o=class{static getFlattenedNodes(e){const t=Object(n.a)(e);return s(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map(e=>s(e)?(e=e,Object(n.a)(e).assignedNodes({flatten:!0})):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){s(this._target)?this._listenSlots([this._target]):Object(n.a)(this._target).children&&(this._listenSlots(Object(n.a)(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){s(this._target)?this._unlistenSlots([this._target]):Object(n.a)(this._target).children&&(this._unlistenSlots(Object(n.a)(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,a.a.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let i=e[t];i.addedNodes&&this._listenSlots(i.addedNodes),i.removedNodes&&this._unlistenSlots(i.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),i=Object(r.a)(t,this._effectiveNodes);for(let t,n=0;n<i.length&&(t=i[n]);n++)for(let i,n=0;n<t.removed.length&&(i=t.removed[n]);n++)e.removedNodes.push(i);for(let n,r=0;r<i.length&&(n=i[r]);r++)for(let i=n.index;i<n.index+n.addedCount;i++)e.addedNodes.push(t[i]);this._effectiveNodes=t;let n=!1;return(e.addedNodes.length||e.removedNodes.length)&&(n=!0,this.callback.call(this._target,e)),n}_listenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];s(i)&&i.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let i=e[t];s(i)&&i.removeEventListener("slotchange",this._boundSchedule)}}};i(24),i(18);i.d(t,"b",(function(){return h})),i.d(t,"a",(function(){return g}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const l=Element.prototype,c=l.matches||l.matchesSelector||l.mozMatchesSelector||l.msMatchesSelector||l.oMatchesSelector||l.webkitMatchesSelector,h=function(e,t){return c.call(e,t)};class d{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new o(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(Object(n.a)(this.node).contains(e))return!0;let t=e,i=e.ownerDocument;for(;t&&t!==i&&t!==this.node;)t=Object(n.a)(t).parentNode||Object(n.a)(t).host;return t===this.node}getOwnerRoot(){return Object(n.a)(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?Object(n.a)(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=Object(n.a)(this.node).assignedSlot;for(;t;)e.push(t),t=Object(n.a)(t).assignedSlot;return e}importNode(e,t){let i=this.node instanceof Document?this.node:this.node.ownerDocument;return Object(n.a)(i).importNode(e,t)}getEffectiveChildNodes(){return o.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),i=[];for(let n,r=0,a=t.length;r<a&&(n=t[r]);r++)n.nodeType===Node.ELEMENT_NODE&&h(n,e)&&i.push(n);return i}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function u(e,t){for(let i=0;i<t.length;i++){let n=t[i];Object.defineProperty(e,n,{get:function(){return this.node[n]},configurable:!0})}}class p{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}d.prototype.cloneNode,d.prototype.appendChild,d.prototype.insertBefore,d.prototype.removeChild,d.prototype.replaceChild,d.prototype.setAttribute,d.prototype.removeAttribute,d.prototype.querySelector,d.prototype.querySelectorAll,d.prototype.parentNode,d.prototype.firstChild,d.prototype.lastChild,d.prototype.nextSibling,d.prototype.previousSibling,d.prototype.firstElementChild,d.prototype.lastElementChild,d.prototype.nextElementSibling,d.prototype.previousElementSibling,d.prototype.childNodes,d.prototype.children,d.prototype.classList,d.prototype.textContent,d.prototype.innerHTML;let m=d;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(d.prototype).forEach(t=>{"activeElement"!=t&&(e.prototype[t]=d.prototype[t])}),u(e.prototype,["classList"]),m=e,Object.defineProperties(p.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&g(e).getOwnerRoot(),i=this.path;for(let e=0;e<i.length;e++){const n=i[e];if(g(n).getOwnerRoot()===t)return n}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let i=0;i<t.length;i++){let n=t[i];e[n]=function(){return this.node[n].apply(this.node,arguments)}}}(d.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),u(d.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let i=0;i<t.length;i++){let n=t[i];Object.defineProperty(e,n,{get:function(){return this.node[n]},set:function(e){this.node[n]=e},configurable:!0})}}(d.prototype,["textContent","innerHTML","className"]);const g=function(e){if((e=e||document)instanceof m)return e;if(e instanceof p)return e;let t=e.__domApi;return t||(t=e instanceof Event?new p(e):new m(e),e.__domApi=t),t}},function(e,t,i){"use strict";var n=i(39),r=(i(7),i(29));i(10);var a=i(34),s=i(25),o=i(49),l=i(8),c=i(2),h=i(36);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const d=Object(o.a)(Object(s.b)(Object(a.a)(HTMLElement)));customElements.define("dom-bind",class extends d{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),l.g)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,i,n){this.mutableData=!0}connectedCallback(){Object(h.a)()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){Object(c.a)(Object(c.a)(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(!(e=e||this.querySelector("template"))){let t=new MutationObserver(()=>{if(!(e=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});var u=i(0),p=i(18),m=i(24),g=i(6),f=i(14);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const v=Object(s.b)(u.a);class b extends v{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),Object(h.a)()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=Object(c.a)(Object(c.a)(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){let e=this.template=this.querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let t={};t[this.as]=!0,t[this.indexAs]=!0,t[this.itemsIndexAs]=!0,this.__ctor=Object(r.b)(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:t,forwardHostProp:function(e,t){let i=this.__instances;for(let n,r=0;r<i.length&&(n=i[r]);r++)n.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,i){if(Object(g.e)(this.as,t)){let n=e[this.itemsIndexAs];t==this.as&&(this.items[n]=i);let r=Object(g.i)(this.as,`${JSCompiler_renameProperty("items",this)}.${n}`,t);this.notifyPath(r,i)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,i=this.__getMethodHost();return function(){return i[t].apply(i,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let e=performance.now(),t=this._targetFrameTime/(e-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*t)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=e,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let i=0;i<t.length;i++)0===e.indexOf(t[i])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(e,t=0){this.__renderDebouncer=p.a.debounce(this.__renderDebouncer,t>0?f.b.after(t):f.a,e.bind(this)),Object(m.a)(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),Object(m.b)()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let e=this.items||[],t=new Array(e.length);for(let i=0;i<e.length;i++)t[i]=i;this.__filterFn&&(t=t.filter((t,i,n)=>this.__filterFn(e[t],i,n))),this.__sortFn&&t.sort((t,i)=>this.__sortFn(e[t],e[i]));const i=this.__itemsIdxToInstIdx={};let n=0;const r=Math.min(t.length,this.__limit);for(;n<r;n++){let r=this.__instances[n],a=t[n],s=e[a];i[a]=n,r?(r._setPendingProperty(this.as,s),r._setPendingProperty(this.indexAs,n),r._setPendingProperty(this.itemsIndexAs,a),r._flushProperties()):this.__insertInstance(s,n,a)}for(let e=this.__instances.length-1;e>=n;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const i=Object(c.a)(t.root);for(let e=0;e<t.children.length;e++){let n=t.children[e];i.appendChild(n)}return t}__attachInstance(e,t){let i=this.__instances[e];t.insertBefore(i.root,this)}__detachAndRemoveInstance(e){let t=this.__detachInstance(e);t&&this.__pool.push(t),this.__instances.splice(e,1)}__stampInstance(e,t,i){let n={};return n[this.as]=e,n[this.indexAs]=t,n[this.itemsIndexAs]=i,new this.__ctor(n)}__insertInstance(e,t,i){let n=this.__pool.pop();n?(n._setPendingProperty(this.as,e),n._setPendingProperty(this.indexAs,t),n._setPendingProperty(this.itemsIndexAs,i),n._flushProperties()):n=this.__stampInstance(e,t,i);let r=this.__instances[t+1],a=r?r.children[0]:this;return Object(c.a)(Object(c.a)(this).parentNode).insertBefore(n.root,a),this.__instances[t]=n,n}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let i=e.slice(6),n=i.indexOf("."),r=n<0?i:i.substring(0,n);if(r==parseInt(r,10)){let e=n<0?"":i.substring(n+1);this.__handleObservedPaths(e);let a=this.__itemsIdxToInstIdx[r],s=this.__instances[a];if(s){let i=this.as+(e?"."+e:"");s._setPendingPropertyOrPath(i,t,!1,!0),s._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return Object(r.a)(this.template,e)}}customElements.define(b.is,b);i(55);var _=i(12),y=i(50),w=i(33);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let C=Object(_.a)(e=>{let t=Object(w.a)(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let i=t.path;if(i==JSCompiler_renameProperty("items",this)){let i=t.base||[],n=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),n){let e=Object(y.a)(i,n);this.__applySplices(e)}this.__lastItems=i,this.__lastMulti=e}else if(t.path==`${JSCompiler_renameProperty("items",this)}.splices`)this.__applySplices(t.value.indexSplices);else{let e=i.slice(`${JSCompiler_renameProperty("items",this)}.`.length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let i=0;i<e.length;i++){let n=e[i];t.forEach((e,i)=>{e<n.index||(e>=n.index+n.removed.length?t.set(i,e+n.addedCount-n.removed.length):t.set(i,-1))});for(let e=0;e<n.addedCount;e++){let i=n.index+e;t.has(this.items[i])&&t.set(this.items[i],i)}}this.__updateLinks();let i=0;t.forEach((e,n)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null,t.delete(n)):i++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)})}else this.__selectedMap.forEach(e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((i,n)=>{t==e++&&this.deselect(n)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice(`${JSCompiler_renameProperty("selected",this)}.`.length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let i;this.__selectedMap.delete(e),this.multi&&(i=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),i,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})(u.a);class z extends C{static get is(){return"array-selector"}static get template(){return null}}customElements.define(z.is,z);var E=i(62),A=i(27),S=i(15);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const M=new E.a;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,i){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,i){},styleSubtree(e,t){M.processStyles(),Object(A.c)(e,t)},styleElement(e){M.processStyles()},styleDocument(e){M.processStyles(),Object(A.c)(document.body,e)},getComputedStyleValue:(e,t)=>Object(A.b)(e,t),flushCustomStyles(){},nativeCss:S.c,nativeShadow:S.d,cssBuild:S.a,disableRuntime:S.b}),window.ShadyCSS.CustomStyleInterface=M;var x=i(42);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const T="include",I=window.ShadyCSS.CustomStyleInterface;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let k;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,I.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute(T);return t&&(e.removeAttribute(T),e.textContent=Object(x.a)(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}),k=s.a._mutablePropertyChange;Boolean;var O=i(3);i.d(t,"a",(function(){return H})),i.d(t,"b",(function(){return O.a}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const H=Object(n.a)(HTMLElement).prototype},function(e,t,i){"use strict";i.d(t,"d",(function(){return n})),i.d(t,"g",(function(){return r})),i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"i",(function(){return o})),i.d(t,"e",(function(){return l})),i.d(t,"f",(function(){return c})),i.d(t,"a",(function(){return d})),i.d(t,"h",(function(){return u}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function n(e){return e.indexOf(".")>=0}function r(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function a(e,t){return 0===e.indexOf(t+".")}function s(e,t){return 0===t.indexOf(e+".")}function o(e,t,i){return t+i.slice(e.length)}function l(e,t){return e===t||a(e,t)||s(e,t)}function c(e){if(Array.isArray(e)){let t=[];for(let i=0;i<e.length;i++){let n=e[i].toString().split(".");for(let e=0;e<n.length;e++)t.push(n[e])}return t.join(".")}return e}function h(e){return Array.isArray(e)?c(e).split("."):e.toString().split(".")}function d(e,t,i){let n=e,r=h(t);for(let e=0;e<r.length;e++){if(!n)return;n=n[r[e]]}return i&&(i.path=r.join(".")),n}function u(e,t,i){let n=e,r=h(t),a=r[r.length-1];if(r.length>1){for(let e=0;e<r.length-1;e++){if(!(n=n[r[e]]))return}n[a]=i}else n[t]=i;return r.join(".")}},function(e,t,i){"use strict";var n=i(39),r=i(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},s={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},o=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},s);function l(e,t,i,n){!function(e,t,i){const n=e._noAccessors,r=Object.getOwnPropertyNames(e);for(let a=0;a<r.length;a++){let s=r[a];if(!(s in i))if(n)t[s]=e[s];else{let i=Object.getOwnPropertyDescriptor(e,s);i&&(i.configurable=!0,Object.defineProperty(t,s,i))}}}(t,e,n);for(let e in a)t[e]&&(i[e]=i[e]||[],i[e].push(t[e]))}function c(e,t){for(const i in t){const n=e[i],r=t[i];e[i]=!("value"in r)&&n&&"value"in n?Object.assign({value:n.value},r):r}}function h(e,t,i){let n;const a={};class h extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(n)for(let e,t=0;t<n.length;t++)(e=n[t]).properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(n)for(let e=0;e<n.length;e++)c(t,n[e].properties);return c(t,e.properties),t}static get observers(){let t=[];if(n)for(let e,i=0;i<n.length;i++)(e=n[i]).observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=a.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=h.prototype;if(!e.hasOwnProperty("__hasRegisterFinished")){e.__hasRegisterFinished=!0,super._registered(),r.c&&d(e);const t=Object.getPrototypeOf(this);let i=a.beforeRegister;if(i)for(let e=0;e<i.length;e++)i[e].call(t);if(i=a.registered)for(let e=0;e<i.length;e++)i[e].call(t)}}_applyListeners(){super._applyListeners();const e=a.listeners;if(e)for(let t=0;t<e.length;t++){const i=e[t];if(i)for(let e in i)this._addMethodEventListenerToNode(this,e,i[e])}}_ensureAttributes(){const e=a.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const i=e[t];for(let e in i)this._ensureAttribute(e,i[e])}super._ensureAttributes()}ready(){super.ready();let e=a.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=a.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=a.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,i){super.attributeChanged();let n=a.attributeChanged;if(n)for(let r=0;r<n.length;r++)n[r].call(this,e,t,i)}}if(i){Array.isArray(i)||(i=[i]);let e=t.prototype.behaviors;n=function e(t,i,n){i=i||[];for(let r=t.length-1;r>=0;r--){let a=t[r];a?Array.isArray(a)?e(a,i):i.indexOf(a)<0&&(!n||n.indexOf(a)<0)&&i.unshift(a):console.warn("behavior is null, check for missing or 404 import")}return i}(i,null,e),h.prototype.behaviors=e?e.concat(i):n}const d=t=>{n&&function(e,t,i){for(let n=0;n<t.length;n++)l(e,t[n],i,o)}(t,n,a),l(t,e,a,s)};return r.c||d(h.prototype),h.generatedFrom=e,h}i(10);i.d(t,"a",(function(){return d}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const d=function(e){let t;return t="function"==typeof e?e:d.Class(e),customElements.define(t.is,t),t};d.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let i=t?t(Object(n.a)(HTMLElement)):Object(n.a)(HTMLElement);return(i=h(e,i,e.behaviors)).is=i.prototype.is=e.is,i}},function(e,t,i){"use strict";i.d(t,"i",(function(){return r})),i.d(t,"e",(function(){return a})),i.d(t,"f",(function(){return s})),i.d(t,"d",(function(){return o})),i.d(t,"g",(function(){return l})),i.d(t,"a",(function(){return c})),i.d(t,"c",(function(){return h})),i.d(t,"h",(function(){return d})),i.d(t,"b",(function(){return u}));i(10);var n=i(16);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=!window.ShadyDOM;Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let a=Object(n.a)(document.baseURI||window.location.href);let s=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let o=!1;let l=!1;let c=!1;let h=!1;let d=!1;let u=!0},function(e,t){const i=document.createElement("div");i.setAttribute("style","display: none;"),i.innerHTML='\n  <dom-module id="tangy-common-styles">\n  <template>\n  <style is="tangy-common-styles">\n      paper-fab, paper-card {\n        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n        transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n      }\n      paper-button {\n        background: var(--accent-color);\n        color: var(--accent-text-color);\n        /* fix for the fact that padding is not being taken into account in \n           button position. There is probably a better way to do this. */\n        display: inline-flex;\n        min-width: 1em;\n        height:40px; \n        text-transform:capitalize;\n        font-size: 1.2rem;\n      }\n\n      .card-actions paper-button {\n        font-size: 1.2rem;\n      }\n      paper-checkbox {\n        --paper-checkbox-size: 1.25em;\n        --paper-checkbox-checked-color: var(--primary-color);\n        --paper-checkbox-vertical-align: top;\n      }\n      paper-radio-button {\n        --paper-radio-button-size: 1.5em;\n        --paper-radio-button-checked-color: var(--primary-color);\n      }\n      label.hint-text {\n        font-family: var(--paper-font-common-base_-_font-family);\n        color: gray;\n        font-size: 0.8rem;\n        font-weight: lighter;\n      }\n\n    .b-b-2 {\n      border-bottom: 2px solid #efefef;\n    }\n  </style>\n  </template>\n  </dom-module>\n',document.head.appendChild(i)},function(e,t,i){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.JSCompiler_renameProperty=function(e,t){return e}},function(e,t){HTMLElement.prototype.getAttributes=function(){let e=[].slice.call(this.attributes),t={};return e.forEach(e=>t[e.name]=e.value),t},HTMLElement.prototype.setAttributes=function(e={}){for(let t in e)this.setAttribute(t,e[t])},HTMLElement.prototype.getProps=function(){if(this.constructor.hasOwnProperty("_props")&&Array.isArray(this.constructor._props)){return this.constructor._props.reduce((e,t)=>Object.assign({},e,{[t]:this[t]}),{tagName:this.tagName})}let e=this.constructor.properties;if(!e)return Object.assign({},this.getAttributes(),{tagName:this.tagName,constructorName:this.constructor.name});let t={};for(let i in e)e[i].type===Boolean?(this.hasOwnProperty(i)&&!1!==this[i]||(t[i]=!1),""!==this[i]&&!0!==this[i]||(t[i]=!0)):t[i]=this[i];return this.hasAttribute("id")&&(t.id=this.getAttribute("id")),Object.assign({},t,{tagName:this.tagName})},HTMLElement.prototype.setProps=function(e={}){let t=Object.assign({},e);delete t.tagName,delete t.constructorName,Object.assign(this,t)}},function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let n=0;function r(){}r.prototype.__mixinApplications,r.prototype.__mixinSet;const a=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let i=n++;return function(n){let r=n.__mixinSet;if(r&&r[i])return n;let a=t,s=a.get(n);s||(s=e(n),a.set(n,s));let o=Object.create(s.__mixinSet||r||null);return o[i]=!0,s.__mixinSet=o,s}}},function(e,t){const i=document.createElement("div");i.setAttribute("style","display: none;"),i.innerHTML='<dom-module id="tangy-element-styles">\n  <template><style is="tangy-element-styles">\n      :host {\n        color: var(--primary-text-color);\n        display: block;\n        position: relative;\n        border: var(--tangy-element-border, solid white 5px);\n        padding: 0px;\n        margin: var(--tangy-element-margin, 10px);\n      }\n\n      :host(:not([hidden])) {\n        -webkit-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;\n        -moz-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;\n        -ms-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;\n        -o-transition: opacity .5s ease-in-out, max-height .5s ease-in-out;\n        opacity: 1;\n        max-height: 99999999999999999px;\n      }\n\n      :host([hidden]) {\n        -webkit-transition: \n          opacity .5s ease-in-out, \n          max-height .5s ease-in-out,\n          border .5s ease-in-out, \n          margin .5s ease-in-out, \n          padding .5s ease-in-out;\n        opacity: 0;\n        max-height: 0px;\n        border: 0px;\n        margin: 0px;\n        padding: 0px;\n      }\n\n      :host([disabled]:not([hidden])) {\n        color: var(--disabled-color);\n        opacity: .7;\n      }\n\n      /*\n      :host([invalid]) {\n        border: solid var(--error-color) 5px;\n      }\n      */\n     \n      :host([required]:not([disabled]))::before  { \n        content: "*"; \n        color: var(--accent-color); \n        position: absolute;\n        top: -2px;\n        left: -18px;\n        font-size: 2em;\n      }\n\n      :host([disabled]) label {\n        /* color: var(--disabled-color); */\n      }\n\n      .flex-container {\n        display: flex;\n      }\n      .flex-container > #qnum-content {\n        width: 100%;\n        padding-right: 2em;\n      }\n      #qnum-number > label {\n        margin-right: 0.5rem;\n        min-width: 2em;\n      }\n      #qnum-number > label:empty {\n        margin: 0;\n        min-width: 0;\n      }\n\n      label {\n        font-family: var(--paper-font-common-base_-_font-family);\n        display: block;\n        font-size: 1.2rem;\n        color: var(--primary-text-color);\n        margin-bottom: 5px;\n      }\n\n      #error-text, #errorText {\n        font-family: var(--paper-font-common-base_-_font-family);\n        font-size: medium;\n        font-weight: bold;\n        color: var(--error-color);\n        display: flex;\n        margin-bottom: 30px;\n      }\n      #error-text > iron-icon, #errorText > iron-icon {\n        padding-right: 0.8em;\n        height: 24px;\n        width: 24px;\n      }\n      #error-text > div, #errorText > div {\n        line-height: 24px;\n      }\n      #error-text:empty, #errorText:empty {\n        margin-bottom: 0;\n      }\n   \n      .secondary_color {\n        color: var(--accent-color);\n      }\n\n      .m-y-25 {\n        margin: 25px 0;\n      }\n   \n      \n     \n  \n    </style>\n    </template>\n    </dom-module>\n    ',document.head.appendChild(i)},function(e,t,i){"use strict";i.d(t,"b",(function(){return l})),i.d(t,"a",(function(){return c}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let n=0,r=0,a=[],s=0,o=document.createTextNode("");new window.MutationObserver((function(){const e=a.length;for(let t=0;t<e;t++){let e=a[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}a.splice(0,e),r+=e})).observe(o,{characterData:!0});const l={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},c={run:e=>(o.textContent=s++,a.push(e),n++),cancel(e){const t=e-r;if(t>=0){if(!a[t])throw new Error("invalid async handle: "+e);a[t]=null}}}},function(e,t,i){"use strict";i.d(t,"d",(function(){return n})),i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return l}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const n=!(window.ShadyDOM&&window.ShadyDOM.inUse);let r,a;function s(e){r=(!e||!e.shimcssproperties)&&(n||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(a=window.ShadyCSS.cssBuild);const o=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?r=window.ShadyCSS.nativeCss:window.ShadyCSS?(s(window.ShadyCSS),window.ShadyCSS=void 0):s(window.WebComponents&&window.WebComponents.flags);const l=r},function(e,t,i){"use strict";i.d(t,"c",(function(){return o})),i.d(t,"b",(function(){return l})),i.d(t,"a",(function(){return c}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let n,r,a=/(url\()([^)]*)(\))/g,s=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function o(e,t){if(e&&s.test(e))return e;if("//"===e)return e;if(void 0===n){n=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",n="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),n)try{return new URL(e,t).href}catch(t){return e}return r||((r=document.implementation.createHTMLDocument("temp")).base=r.createElement("base"),r.head.appendChild(r.base),r.anchor=r.createElement("a"),r.body.appendChild(r.anchor)),r.base.href=t,r.anchor.href=e,r.anchor.href||e}function l(e,t){return e.replace(a,(function(e,i,n,r){return i+"'"+o(n.replace(/["']/g,""),t)+"'"+r}))}function c(e){return e.substring(0,e.lastIndexOf("/")+1)}},function(e,t,i){"use strict";i(23),i(41);var n=i(7),r=i(4),a=i(3),s=i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({_template:a.a`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;

        vertical-align: middle;

        fill: var(--iron-icon-fill-color, currentcolor);
        stroke: var(--iron-icon-stroke-color, none);

        width: var(--iron-icon-width, 24px);
        height: var(--iron-icon-height, 24px);
        @apply --iron-icon;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
`,is:"iron-icon",properties:{icon:{type:String},theme:{type:String},src:{type:String},_meta:{value:s.a.create("iron-meta",{type:"iconset"})}},observers:["_updateIcon(_meta, isAttached)","_updateIcon(theme, isAttached)","_srcChanged(src, isAttached)","_iconChanged(icon, isAttached)"],_DEFAULT_ICONSET:"icons",_iconChanged:function(e){var t=(e||"").split(":");this._iconName=t.pop(),this._iconsetName=t.pop()||this._DEFAULT_ICONSET,this._updateIcon()},_srcChanged:function(e){this._updateIcon()},_usesIconset:function(){return this.icon||!this.src},_updateIcon:function(){this._usesIconset()?(this._img&&this._img.parentNode&&Object(r.a)(this.root).removeChild(this._img),""===this._iconName?this._iconset&&this._iconset.removeIcon(this):this._iconsetName&&this._meta&&(this._iconset=this._meta.byKey(this._iconsetName),this._iconset?(this._iconset.applyIcon(this,this._iconName,this.theme),this.unlisten(window,"iron-iconset-added","_updateIcon")):this.listen(window,"iron-iconset-added","_updateIcon"))):(this._iconset&&this._iconset.removeIcon(this),this._img||(this._img=document.createElement("img"),this._img.style.width="100%",this._img.style.height="100%",this._img.draggable=!1),this._img.src=this.src,Object(r.a)(this.root).appendChild(this._img))}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return n})),i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s}));i(10),i(12),i(14);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class n{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,r.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),r.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,i){return e instanceof n?e._cancelAsync():e=new n,e.setConfig(t,i),e}}let r=new Set;const a=function(e){r.add(e)},s=function(){const e=Boolean(r.size);return r.forEach(e=>{try{e.flush()}catch(e){setTimeout(()=>{throw e})}}),e}},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i(5),i(4);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const n={properties:{focused:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,notify:!0,observer:"_disabledChanged",reflectToAttribute:!0},_oldTabIndex:{type:String},_boundFocusBlurHandler:{type:Function,value:function(){return this._focusBlurHandler.bind(this)}}},observers:["_changedControlState(focused, disabled)"],ready:function(){this.addEventListener("focus",this._boundFocusBlurHandler,!0),this.addEventListener("blur",this._boundFocusBlurHandler,!0)},_focusBlurHandler:function(e){this._setFocused("focus"===e.type)},_disabledChanged:function(e,t){this.setAttribute("aria-disabled",e?"true":"false"),this.style.pointerEvents=e?"none":"",e?(this._oldTabIndex=this.getAttribute("tabindex"),this._setFocused(!1),this.tabIndex=-1,this.blur()):void 0!==this._oldTabIndex&&(null===this._oldTabIndex?this.removeAttribute("tabindex"):this.setAttribute("tabindex",this._oldTabIndex))},_changedControlState:function(){this._controlStateChanged&&this._controlStateChanged()}}},function(e,t,i){"use strict";i.d(t,"b",(function(){return s})),i.d(t,"a",(function(){return o}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const n={},r=/-[a-z]/g,a=/([A-Z])/g;function s(e){return n[e]||(n[e]=e.indexOf("-")<0?e:e.replace(r,e=>e[1].toUpperCase()))}function o(e){return n[e]||(n[e]=e.replace(a,"-$1").toLowerCase())}},function(e,t,i){"use strict";i.d(t,"c",(function(){return n})),i.d(t,"b",(function(){return r})),i.d(t,"a",(function(){return a}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const n=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,r=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,a=/@media\s(.*)/},function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"a",(function(){return s}));i(5),i(19);var n=i(28),r=i(4);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const a={properties:{pressed:{type:Boolean,readOnly:!0,value:!1,reflectToAttribute:!0,observer:"_pressedChanged"},toggles:{type:Boolean,value:!1,reflectToAttribute:!0},active:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},pointerDown:{type:Boolean,readOnly:!0,value:!1},receivedFocusFromKeyboard:{type:Boolean,readOnly:!0},ariaActiveAttribute:{type:String,value:"aria-pressed",observer:"_ariaActiveAttributeChanged"}},listeners:{down:"_downHandler",up:"_upHandler",tap:"_tapHandler"},observers:["_focusChanged(focused)","_activeChanged(active, ariaActiveAttribute)"],keyBindings:{"enter:keydown":"_asyncClick","space:keydown":"_spaceKeyDownHandler","space:keyup":"_spaceKeyUpHandler"},_mouseEventRe:/^mouse/,_tapHandler:function(){this.toggles?this._userActivate(!this.active):this.active=!1},_focusChanged:function(e){this._detectKeyboardFocus(e),e||this._setPressed(!1)},_detectKeyboardFocus:function(e){this._setReceivedFocusFromKeyboard(!this.pointerDown&&e)},_userActivate:function(e){this.active!==e&&(this.active=e,this.fire("change"))},_downHandler:function(e){this._setPointerDown(!0),this._setPressed(!0),this._setReceivedFocusFromKeyboard(!1)},_upHandler:function(){this._setPointerDown(!1),this._setPressed(!1)},_spaceKeyDownHandler:function(e){var t=e.detail.keyboardEvent,i=Object(r.a)(t).localTarget;this.isLightDescendant(i)||(t.preventDefault(),t.stopImmediatePropagation(),this._setPressed(!0))},_spaceKeyUpHandler:function(e){var t=e.detail.keyboardEvent,i=Object(r.a)(t).localTarget;this.isLightDescendant(i)||(this.pressed&&this._asyncClick(),this._setPressed(!1))},_asyncClick:function(){this.async((function(){this.click()}),1)},_pressedChanged:function(e){this._changedButtonState()},_ariaActiveAttributeChanged:function(e,t){t&&t!=e&&this.hasAttribute(t)&&this.removeAttribute(t)},_activeChanged:function(e,t){this.toggles?this.setAttribute(this.ariaActiveAttribute,e?"true":"false"):this.removeAttribute(this.ariaActiveAttribute),this._changedButtonState()},_controlStateChanged:function(){this.disabled?this._setPressed(!1):this._changedButtonState()},_changedButtonState:function(){this._buttonStateChanged&&this._buttonStateChanged()}},s=[n.a,a]},function(e,t,i){"use strict";i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const n=i(3).a`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;n.setAttribute("style","display: none;"),document.head.appendChild(n.content);var r=document.createElement("style");r.textContent="[hidden] { display: none !important; }",document.head.appendChild(r)},function(e,t,i){"use strict";i.d(t,"b",(function(){return r}));i(10);var n=i(18);i.d(t,"a",(function(){return n.b}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=Object(n.c)()}while(e||t)}},function(e,t,i){"use strict";i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return s}));var n=i(12);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function r(e,t,i,n,r){let a;r&&(a="object"==typeof i&&null!==i)&&(n=e.__dataTemp[t]);let s=n!==i&&(n==n||i==i);return a&&s&&(e.__dataTemp[t]=i),s}const a=Object(n.a)(e=>{return class extends e{_shouldPropertyChange(e,t,i){return r(this,e,t,i,!0)}}}),s=Object(n.a)(e=>{return class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,i){return r(this,e,t,i,this.mutableData)}}});a._mutablePropertyChange=r},function(e,t,i){"use strict";i(5);var n=i(28),r=i(7),a=i(4),s=i(3),o={distance:function(e,t,i,n){var r=e-i,a=t-n;return Math.sqrt(r*r+a*a)},now:window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now};function l(e){this.element=e,this.width=this.boundingRect.width,this.height=this.boundingRect.height,this.size=Math.max(this.width,this.height)}function c(e){this.element=e,this.color=window.getComputedStyle(e).color,this.wave=document.createElement("div"),this.waveContainer=document.createElement("div"),this.wave.style.backgroundColor=this.color,this.wave.classList.add("wave"),this.waveContainer.classList.add("wave-container"),Object(a.a)(this.waveContainer).appendChild(this.wave),this.resetInteractionState()}l.prototype={get boundingRect(){return this.element.getBoundingClientRect()},furthestCornerDistanceFrom:function(e,t){var i=o.distance(e,t,0,0),n=o.distance(e,t,this.width,0),r=o.distance(e,t,0,this.height),a=o.distance(e,t,this.width,this.height);return Math.max(i,n,r,a)}},c.MAX_RADIUS=300,c.prototype={get recenters(){return this.element.recenters},get center(){return this.element.center},get mouseDownElapsed(){var e;return this.mouseDownStart?(e=o.now()-this.mouseDownStart,this.mouseUpStart&&(e-=this.mouseUpElapsed),e):0},get mouseUpElapsed(){return this.mouseUpStart?o.now()-this.mouseUpStart:0},get mouseDownElapsedSeconds(){return this.mouseDownElapsed/1e3},get mouseUpElapsedSeconds(){return this.mouseUpElapsed/1e3},get mouseInteractionSeconds(){return this.mouseDownElapsedSeconds+this.mouseUpElapsedSeconds},get initialOpacity(){return this.element.initialOpacity},get opacityDecayVelocity(){return this.element.opacityDecayVelocity},get radius(){var e=this.containerMetrics.width*this.containerMetrics.width,t=this.containerMetrics.height*this.containerMetrics.height,i=1.1*Math.min(Math.sqrt(e+t),c.MAX_RADIUS)+5,n=1.1-i/c.MAX_RADIUS*.2,r=this.mouseInteractionSeconds/n,a=i*(1-Math.pow(80,-r));return Math.abs(a)},get opacity(){return this.mouseUpStart?Math.max(0,this.initialOpacity-this.mouseUpElapsedSeconds*this.opacityDecayVelocity):this.initialOpacity},get outerOpacity(){var e=.3*this.mouseUpElapsedSeconds,t=this.opacity;return Math.max(0,Math.min(e,t))},get isOpacityFullyDecayed(){return this.opacity<.01&&this.radius>=Math.min(this.maxRadius,c.MAX_RADIUS)},get isRestingAtMaxRadius(){return this.opacity>=this.initialOpacity&&this.radius>=Math.min(this.maxRadius,c.MAX_RADIUS)},get isAnimationComplete(){return this.mouseUpStart?this.isOpacityFullyDecayed:this.isRestingAtMaxRadius},get translationFraction(){return Math.min(1,this.radius/this.containerMetrics.size*2/Math.sqrt(2))},get xNow(){return this.xEnd?this.xStart+this.translationFraction*(this.xEnd-this.xStart):this.xStart},get yNow(){return this.yEnd?this.yStart+this.translationFraction*(this.yEnd-this.yStart):this.yStart},get isMouseDown(){return this.mouseDownStart&&!this.mouseUpStart},resetInteractionState:function(){this.maxRadius=0,this.mouseDownStart=0,this.mouseUpStart=0,this.xStart=0,this.yStart=0,this.xEnd=0,this.yEnd=0,this.slideDistance=0,this.containerMetrics=new l(this.element)},draw:function(){var e,t,i;this.wave.style.opacity=this.opacity,e=this.radius/(this.containerMetrics.size/2),t=this.xNow-this.containerMetrics.width/2,i=this.yNow-this.containerMetrics.height/2,this.waveContainer.style.webkitTransform="translate("+t+"px, "+i+"px)",this.waveContainer.style.transform="translate3d("+t+"px, "+i+"px, 0)",this.wave.style.webkitTransform="scale("+e+","+e+")",this.wave.style.transform="scale3d("+e+","+e+",1)"},downAction:function(e){var t=this.containerMetrics.width/2,i=this.containerMetrics.height/2;this.resetInteractionState(),this.mouseDownStart=o.now(),this.center?(this.xStart=t,this.yStart=i,this.slideDistance=o.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)):(this.xStart=e?e.detail.x-this.containerMetrics.boundingRect.left:this.containerMetrics.width/2,this.yStart=e?e.detail.y-this.containerMetrics.boundingRect.top:this.containerMetrics.height/2),this.recenters&&(this.xEnd=t,this.yEnd=i,this.slideDistance=o.distance(this.xStart,this.yStart,this.xEnd,this.yEnd)),this.maxRadius=this.containerMetrics.furthestCornerDistanceFrom(this.xStart,this.yStart),this.waveContainer.style.top=(this.containerMetrics.height-this.containerMetrics.size)/2+"px",this.waveContainer.style.left=(this.containerMetrics.width-this.containerMetrics.size)/2+"px",this.waveContainer.style.width=this.containerMetrics.size+"px",this.waveContainer.style.height=this.containerMetrics.size+"px"},upAction:function(e){this.isMouseDown&&(this.mouseUpStart=o.now())},remove:function(){Object(a.a)(this.waveContainer.parentNode).removeChild(this.waveContainer)}},Object(r.a)({_template:s.a`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,is:"paper-ripple",behaviors:[n.a],properties:{initialOpacity:{type:Number,value:.25},opacityDecayVelocity:{type:Number,value:.8},recenters:{type:Boolean,value:!1},center:{type:Boolean,value:!1},ripples:{type:Array,value:function(){return[]}},animating:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!1},holdDown:{type:Boolean,value:!1,observer:"_holdDownChanged"},noink:{type:Boolean,value:!1},_animating:{type:Boolean},_boundAnimate:{type:Function,value:function(){return this.animate.bind(this)}}},get target(){return this.keyEventTarget},keyBindings:{"enter:keydown":"_onEnterKeydown","space:keydown":"_onSpaceKeydown","space:keyup":"_onSpaceKeyup"},attached:function(){11==this.parentNode.nodeType?this.keyEventTarget=Object(a.a)(this).getOwnerRoot().host:this.keyEventTarget=this.parentNode;var e=this.keyEventTarget;this.listen(e,"up","uiUpAction"),this.listen(e,"down","uiDownAction")},detached:function(){this.unlisten(this.keyEventTarget,"up","uiUpAction"),this.unlisten(this.keyEventTarget,"down","uiDownAction"),this.keyEventTarget=null},get shouldKeepAnimating(){for(var e=0;e<this.ripples.length;++e)if(!this.ripples[e].isAnimationComplete)return!0;return!1},simulatedRipple:function(){this.downAction(null),this.async((function(){this.upAction()}),1)},uiDownAction:function(e){this.noink||this.downAction(e)},downAction:function(e){this.holdDown&&this.ripples.length>0||(this.addRipple().downAction(e),this._animating||(this._animating=!0,this.animate()))},uiUpAction:function(e){this.noink||this.upAction(e)},upAction:function(e){this.holdDown||(this.ripples.forEach((function(t){t.upAction(e)})),this._animating=!0,this.animate())},onAnimationComplete:function(){this._animating=!1,this.$.background.style.backgroundColor=null,this.fire("transitionend")},addRipple:function(){var e=new c(this);return Object(a.a)(this.$.waves).appendChild(e.waveContainer),this.$.background.style.backgroundColor=e.color,this.ripples.push(e),this._setAnimating(!0),e},removeRipple:function(e){var t=this.ripples.indexOf(e);t<0||(this.ripples.splice(t,1),e.remove(),this.ripples.length||this._setAnimating(!1))},animate:function(){if(this._animating){var e,t;for(e=0;e<this.ripples.length;++e)(t=this.ripples[e]).draw(),this.$.background.style.opacity=t.outerOpacity,t.isOpacityFullyDecayed&&!t.isRestingAtMaxRadius&&this.removeRipple(t);this.shouldKeepAnimating||0!==this.ripples.length?window.requestAnimationFrame(this._boundAnimate):this.onAnimationComplete()}},animateRipple:function(){return this.animate()},_onEnterKeydown:function(){this.uiDownAction(),this.async(this.uiUpAction,1)},_onSpaceKeydown:function(){this.uiDownAction()},_onSpaceKeyup:function(){this.uiUpAction()},_holdDownChanged:function(e,t){void 0!==t&&(e?this.downAction():this.upAction())}});var h=i(22);i.d(t,"a",(function(){return d}));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const d={properties:{noink:{type:Boolean,observer:"_noinkChanged"},_rippleContainer:{type:Object}},_buttonStateChanged:function(){this.focused&&this.ensureRipple()},_downHandler:function(e){h.b._downHandler.call(this,e),this.pressed&&this.ensureRipple(e)},ensureRipple:function(e){if(!this.hasRipple()){this._ripple=this._createRipple(),this._ripple.noink=this.noink;var t=this._rippleContainer||this.root;if(t&&Object(a.a)(t).appendChild(this._ripple),e){var i=Object(a.a)(this._rippleContainer||this),n=Object(a.a)(e).rootTarget;i.deepContains(n)&&this._ripple.uiDownAction(e)}}},getRipple:function(){return this.ensureRipple(),this._ripple},hasRipple:function(){return Boolean(this._ripple)},_createRipple:function(){return document.createElement("paper-ripple")},_noinkChanged:function(e){this.hasRipple()&&(this._ripple.noink=e)}}},function(e,t,i){"use strict";i.d(t,"c",(function(){return r})),i.d(t,"b",(function(){return a})),i.d(t,"a",(function(){return s}));var n=i(21);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function r(e,t){for(let i in t)null===i?e.style.removeProperty(i):e.style.setProperty(i,t[i])}function a(e,t){const i=window.getComputedStyle(e).getPropertyValue(t);return i?i.trim():""}function s(e){const t=n.b.test(e)||n.c.test(e);return n.b.lastIndex=0,n.c.lastIndex=0,t}},function(e,t,i){"use strict";i.d(t,"a",(function(){return g}));i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var n={"U+0008":"backspace","U+0009":"tab","U+001B":"esc","U+0020":"space","U+007F":"del"},r={8:"backspace",9:"tab",13:"enter",27:"esc",33:"pageup",34:"pagedown",35:"end",36:"home",32:"space",37:"left",38:"up",39:"right",40:"down",46:"del",106:"*"},a={shift:"shiftKey",ctrl:"ctrlKey",alt:"altKey",meta:"metaKey"},s=/[a-z0-9*]/,o=/U\+/,l=/^arrow/,c=/^space(bar)?/,h=/^escape$/;function d(e,t){var i="";if(e){var n=e.toLowerCase();" "===n||c.test(n)?i="space":h.test(n)?i="esc":1==n.length?t&&!s.test(n)||(i=n):i=l.test(n)?n.replace("arrow",""):"multiply"==n?"*":n}return i}function u(e,t){return e.key?d(e.key,t):e.detail&&e.detail.key?d(e.detail.key,t):(i=e.keyIdentifier,a="",i&&(i in n?a=n[i]:o.test(i)?(i=parseInt(i.replace("U+","0x"),16),a=String.fromCharCode(i).toLowerCase()):a=i.toLowerCase()),a||function(e){var t="";return Number(e)&&(t=e>=65&&e<=90?String.fromCharCode(32+e):e>=112&&e<=123?"f"+(e-112+1):e>=48&&e<=57?String(e-48):e>=96&&e<=105?String(e-96):r[e]),t}(e.keyCode)||"");var i,a}function p(e,t){return u(t,e.hasModifiers)===e.key&&(!e.hasModifiers||!!t.shiftKey==!!e.shiftKey&&!!t.ctrlKey==!!e.ctrlKey&&!!t.altKey==!!e.altKey&&!!t.metaKey==!!e.metaKey)}function m(e){return e.trim().split(" ").map((function(e){return function(e){return 1===e.length?{combo:e,key:e,event:"keydown"}:e.split("+").reduce((function(e,t){var i=t.split(":"),n=i[0],r=i[1];return n in a?(e[a[n]]=!0,e.hasModifiers=!0):(e.key=n,e.event=r||"keydown"),e}),{combo:e.split(":").shift()})}(e)}))}const g={properties:{keyEventTarget:{type:Object,value:function(){return this}},stopKeyboardEventPropagation:{type:Boolean,value:!1},_boundKeyHandlers:{type:Array,value:function(){return[]}},_imperativeKeyBindings:{type:Object,value:function(){return{}}}},observers:["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],keyBindings:{},registered:function(){this._prepKeyBindings()},attached:function(){this._listenKeyEventListeners()},detached:function(){this._unlistenKeyEventListeners()},addOwnKeyBinding:function(e,t){this._imperativeKeyBindings[e]=t,this._prepKeyBindings(),this._resetKeyEventListeners()},removeOwnKeyBindings:function(){this._imperativeKeyBindings={},this._prepKeyBindings(),this._resetKeyEventListeners()},keyboardEventMatchesKeys:function(e,t){for(var i=m(t),n=0;n<i.length;++n)if(p(i[n],e))return!0;return!1},_collectKeyBindings:function(){var e=this.behaviors.map((function(e){return e.keyBindings}));return-1===e.indexOf(this.keyBindings)&&e.push(this.keyBindings),e},_prepKeyBindings:function(){for(var e in this._keyBindings={},this._collectKeyBindings().forEach((function(e){for(var t in e)this._addKeyBinding(t,e[t])}),this),this._imperativeKeyBindings)this._addKeyBinding(e,this._imperativeKeyBindings[e]);for(var t in this._keyBindings)this._keyBindings[t].sort((function(e,t){var i=e[0].hasModifiers;return i===t[0].hasModifiers?0:i?-1:1}))},_addKeyBinding:function(e,t){m(e).forEach((function(e){this._keyBindings[e.event]=this._keyBindings[e.event]||[],this._keyBindings[e.event].push([e,t])}),this)},_resetKeyEventListeners:function(){this._unlistenKeyEventListeners(),this.isAttached&&this._listenKeyEventListeners()},_listenKeyEventListeners:function(){this.keyEventTarget&&Object.keys(this._keyBindings).forEach((function(e){var t=this._keyBindings[e],i=this._onKeyBindingEvent.bind(this,t);this._boundKeyHandlers.push([this.keyEventTarget,e,i]),this.keyEventTarget.addEventListener(e,i)}),this)},_unlistenKeyEventListeners:function(){for(var e,t,i,n;this._boundKeyHandlers.length;)t=(e=this._boundKeyHandlers.pop())[0],i=e[1],n=e[2],t.removeEventListener(i,n)},_onKeyBindingEvent:function(e,t){if(this.stopKeyboardEventPropagation&&t.stopPropagation(),!t.defaultPrevented)for(var i=0;i<e.length;i++){var n=e[i][0],r=e[i][1];if(p(n,t)&&(this._triggerKeyHandler(n,r,t),t.defaultPrevented))return}},_triggerKeyHandler:function(e,t,i){var n=Object.create(e);n.keyboardEvent=i;var r=new CustomEvent(e.event,{detail:n,cancelable:!0});this[t].call(this,r),r.defaultPrevented&&i.preventDefault()}}},function(e,t,i){"use strict";i.d(t,"b",(function(){return _})),i.d(t,"a",(function(){return y}));i(10);var n=i(34),r=i(25),a=i(8),s=i(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o=null;function l(){return o}l.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:l,writable:!0}});const c=Object(n.a)(l),h=Object(r.a)(c);const d=Object(n.a)(class{});class u extends d{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let i=this.__templatizeOptions;(e&&i.instanceProps||!i.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,i){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,i(e)});else{let n=this.__dataHost.__dataHost;n&&n._addEventListenerToNode(e,t,i)}}_showHideChildren(e){let t=this.children;for(let i=0;i<t.length;i++){let n=t[i];if(Boolean(e)!=Boolean(n.__hideTemplateChildren__))if(n.nodeType===Node.TEXT_NODE)e?(n.__polymerTextContent__=n.textContent,n.textContent=""):n.textContent=n.__polymerTextContent__;else if("slot"===n.localName)if(e)n.__polymerReplaced__=document.createComment("hidden-slot"),Object(s.a)(Object(s.a)(n).parentNode).replaceChild(n.__polymerReplaced__,n);else{const e=n.__polymerReplaced__;e&&Object(s.a)(Object(s.a)(e).parentNode).replaceChild(n,e)}else n.style&&(e?(n.__polymerDisplay__=n.style.display,n.style.display="none"):n.style.display=n.__polymerDisplay__);n.__hideTemplateChildren__=e,n._showHideChildren&&n._showHideChildren(e)}}_setUnmanagedPropertyToNode(e,t,i){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=i:super._setUnmanagedPropertyToNode(e,t,i)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}u.prototype.__dataHost,u.prototype.__templatizeOptions,u.prototype._methodHost,u.prototype.__templatizeOwner,u.prototype.__hostProps;const p=Object(r.a)(u);function m(e){let t=e.__dataHost;return t&&t._methodHost||t}function g(e,t,i){let n=i.mutableData?p:u;_.mixin&&(n=_.mixin(n));let r=class extends n{};return r.prototype.__templatizeOptions=i,r.prototype._bindTemplate(e),function(e,t,i,n){let r=i.hostProps||{};for(let t in n.instanceProps){delete r[t];let i=n.notifyInstanceProp;i&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:b(t,i)})}if(n.forwardHostProp&&t.__dataHost)for(let t in r)i.hasHostProps||(i.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,i){e.__dataHost._setPendingPropertyOrPath("_host_"+t,i[t],!0,!0)}})}(r,e,t,i),r}function f(e,t,i){let n=i.forwardHostProp;if(n&&t.hasHostProps){let r=t.templatizeTemplateClass;if(!r){let e=i.mutableData?h:c;r=t.templatizeTemplateClass=class extends e{};let a=t.hostProps;for(let e in a)r.prototype._addPropertyEffect("_host_"+e,r.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:v(e,n)}),r.prototype._createNotifyingProperty("_host_"+e)}!function(e,t){o=e,Object.setPrototypeOf(e,t.prototype),new t,o=null}(e,r),e.__dataProto&&Object.assign(e.__data,e.__dataProto),e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties()}}function v(e,t){return function(e,i,n){t.call(e.__templatizeOwner,i.substring("_host_".length),n[i])}}function b(e,t){return function(e,i,n){t.call(e.__templatizeOwner,e,i,n[i])}}function _(e,t,i){if(a.g&&!m(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(i=i||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let n=(t?t.constructor:u)._parseTemplate(e),r=n.templatizeInstanceClass;r||(r=g(e,n,i),n.templatizeInstanceClass=r),f(e,n,i);let s=class extends r{};return s.prototype._methodHost=m(e),s.prototype.__dataHost=e,s.prototype.__templatizeOwner=t,s.prototype.__hostProps=n.hostProps,s=s}function y(e,t){let i;for(;t;)if(i=t.__templatizeInstance){if(i.__dataHost==e)return i;t=i.__dataHost}else t=Object(s.a)(t).parentNode;return null}},function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));i(5);var n=i(41);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
let r=null;const a={properties:{validator:{type:String},invalid:{notify:!0,reflectToAttribute:!0,type:Boolean,value:!1,observer:"_invalidChanged"}},registered:function(){r=new n.a({type:"validator"})},_invalidChanged:function(){this.invalid?this.setAttribute("aria-invalid","true"):this.removeAttribute("aria-invalid")},get _validator(){return r&&r.byKey(this.validator)},hasValidator:function(){return null!=this._validator},validate:function(e){return void 0===e&&void 0!==this.value?this.invalid=!this._getValidity(this.value):this.invalid=!this._getValidity(e),!this.invalid},_getValidity:function(e){return!this.hasValidator()||this._validator.validate(e)}}},function(e,t,i){"use strict";i(5),i(56);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const n=i(3).a`
<custom-style>
  <style is="custom-style">
    html {
      /*
       * You can use these generic variables in your elements for easy theming.
       * For example, if all your elements use \`--primary-text-color\` as its main
       * color, then switching from a light to a dark theme is just a matter of
       * changing the value of \`--primary-text-color\` in your application.
       */
      --primary-text-color: var(--light-theme-text-color);
      --primary-background-color: var(--light-theme-background-color);
      --secondary-text-color: var(--light-theme-secondary-color);
      --disabled-text-color: var(--light-theme-disabled-color);
      --divider-color: var(--light-theme-divider-color);
      --error-color: var(--paper-deep-orange-a700);

      /*
       * Primary and accent colors. Also see color.js for more colors.
       */
      --primary-color: var(--paper-indigo-500);
      --light-primary-color: var(--paper-indigo-100);
      --dark-primary-color: var(--paper-indigo-700);

      --accent-color: var(--paper-pink-a200);
      --light-accent-color: var(--paper-pink-a100);
      --dark-accent-color: var(--paper-pink-a400);


      /*
       * Material Design Light background theme
       */
      --light-theme-background-color: #ffffff;
      --light-theme-base-color: #000000;
      --light-theme-text-color: var(--paper-grey-900);
      --light-theme-secondary-color: #737373;  /* for secondary text and icons */
      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
      --light-theme-divider-color: #dbdbdb;

      /*
       * Material Design Dark background theme
       */
      --dark-theme-background-color: var(--paper-grey-900);
      --dark-theme-base-color: #ffffff;
      --dark-theme-text-color: #ffffff;
      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
      --dark-theme-disabled-color: #646464;  /* disabled/hint text */
      --dark-theme-divider-color: #3c3c3c;

      /*
       * Deprecated values because of their confusing names.
       */
      --text-primary-color: var(--dark-theme-text-color);
      --default-primary-color: var(--primary-color);
    }
  </style>
</custom-style>`;n.setAttribute("style","display: none;"),document.head.appendChild(n.content)},function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let n=!1,r=[],a=[];function s(){n=!0,requestAnimationFrame((function(){n=!1,o(r),setTimeout((function(){!function(e){for(let t=0,i=e.length;t<i;t++)l(e.shift())}(a)}))}))}function o(e){for(;e.length;)l(e.shift())}function l(e){const t=e[0],i=e[1],n=e[2];try{i.apply(t,n)}catch(e){setTimeout(()=>{throw e})}}function c(e,t,i){n||s(),a.push([e,t,i])}},function(e,t,i){"use strict";i(10);var n=i(8),r=i(12),a=i(42),s=i(16),o=i(35),l=i(34);const c=[];var h=i(47);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const d=Object(r.a)(e=>{const t=Object(h.a)(e);function i(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof r?t:null}function n(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const i=e.properties;i&&(t=function(e){const t={};for(let i in e){const n=e[i];t[i]="function"==typeof n?{type:n}:n}return t}(i))}e.__ownProperties=t}return e.__ownProperties}class r extends t{static get observedAttributes(){if(!this.hasOwnProperty("__observedAttributes")){e=this.prototype,c.push(e);const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(e=>this.attributeNameForProperty(e)):[]}var e;return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=i(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=n(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=i(this);this.__properties=Object.assign({},e&&e._properties,n(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){0,this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return r});var u=i(2);i.d(t,"a",(function(){return g}));
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const p="3.3.0",m=window.ShadyCSS&&window.ShadyCSS.cssBuild,g=Object(r.a)(e=>{const t=d(Object(l.a)(e));return class extends t{static get polymerElementVersion(){return p}static _finalizeClass(){t._finalizeClass.call(this);const e=((i=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",i))||(i.__ownObservers=i.hasOwnProperty(JSCompiler_renameProperty("observers",i))?i.observers:null),i.__ownObservers);var i;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):n.c||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let a in e)t=this.prototype,i=a,n=e[a],r=e,n.computed&&(n.readOnly=!0),n.computed&&(t._hasReadOnlyEffect(i)?console.warn(`Cannot redefine computed property '${i}'.`):t._createComputedProperty(i,n.computed,r)),n.readOnly&&!t._hasReadOnlyEffect(i)?t._createReadOnlyProperty(i,!n.computed):!1===n.readOnly&&t._hasReadOnlyEffect(i)&&console.warn(`Cannot make readOnly property '${i}' non-readOnly.`),n.reflectToAttribute&&!t._hasReflectEffect(i)?t._createReflectedProperty(i):!1===n.reflectToAttribute&&t._hasReflectEffect(i)&&console.warn(`Cannot make reflected property '${i}' non-reflected.`),n.notify&&!t._hasNotifyEffect(i)?t._createNotifyingProperty(i):!1===n.notify&&t._hasNotifyEffect(i)&&console.warn(`Cannot make notify property '${i}' non-notify.`),n.observer&&t._createPropertyObserver(i,n.observer,r[n.observer]),t._addPropertyToAttributeMap(i);var t,i,n,r}static createObservers(e,t){const i=this.prototype;for(let n=0;n<e.length;n++)i._createMethodObserver(e[n],t)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(e){let t=null;if(e&&(!n.g||n.a)&&(t=o.a.import(e,"template"),n.g&&!t))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=Object(s.a)(e.url);else{const e=o.a.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=n.e,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let i in t){let n=t[i];"value"in n&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[i]=n)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let i=e[t];if(!this.hasOwnProperty(t)){let e="function"==typeof i.value?i.value.call(this):i.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}static _processStyleText(e,t){return Object(s.b)(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const i=this.importPath;!function(e,t,i,n){if(!m){const r=t.content.querySelectorAll("style"),s=Object(a.c)(t),o=Object(a.b)(i),l=t.content.firstElementChild;for(let i=0;i<o.length;i++){let r=o[i];r.textContent=e._processStyleText(r.textContent,n),t.content.insertBefore(r,l)}let c=0;for(let t=0;t<s.length;t++){let i=s[t],a=r[c];a!==i?(i=i.cloneNode(!0),a.parentNode.insertBefore(i,a)):c++,i.textContent=e._processStyleText(i.textContent,n)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,i)}(this,t,e,i?Object(s.c)(i):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=Object(u.a)(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e)),n.h&&window.ShadyDOM&&ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=Object(s.c)(this.importPath)),Object(s.c)(e,t)}static _parseTemplateContent(e,i,n){return i.dynamicFns=i.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,i,n)}static _addTemplatePropertyEffect(e,i,r){return!n.c||i in this._properties||console.warn(`Property '${i}' used in template but not declared in 'properties'; `+"attribute will not be observed."),t._addTemplatePropertyEffect.call(this,e,i,r)}}})},function(e,t,i){"use strict";i(10);var n=i(2),r=i(12),a=i(6),s=i(20),o=i(46);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const l={"dom-if":!0,"dom-repeat":!0};function c(e){let t=e.getAttribute("is");if(t&&l[t]){let i=e;for(i.removeAttribute("is"),e=i.ownerDocument.createElement(t),i.parentNode.replaceChild(e,i),e.appendChild(i);i.attributes.length;)e.setAttribute(i.attributes[0].name,i.attributes[0].value),i.removeAttribute(i.attributes[0].name)}return e}function h(e,t){let i=t.parentInfo&&h(e,t.parentInfo);if(!i)return e;for(let e=i.firstChild,n=0;e;e=e.nextSibling)if(t.parentIndex===n++)return e}function d(e,t,i,n){n.id&&(t[n.id]=i)}function u(e,t,i){if(i.events&&i.events.length)for(let n,r=0,a=i.events;r<a.length&&(n=a[r]);r++)e._addMethodEventListenerToNode(t,n.name,n.value,e)}function p(e,t,i){i.templateInfo&&(t._templateInfo=i.templateInfo)}const m=Object(r.a)(e=>{return class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let i=e._templateInfo={};i.nodeInfoList=[],i.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,i,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,i){return this._parseTemplateNode(e.content,t,i)}static _parseTemplateNode(e,t,i){let n=!1,r=e;return"template"!=r.localName||r.hasAttribute("preserve-content")?"slot"===r.localName&&(t.hasInsertionPoint=!0):n=this._parseTemplateNestedTemplate(r,t,i)||n,r.firstChild&&this._parseTemplateChildNodes(r,t,i),r.hasAttributes&&r.hasAttributes()&&(n=this._parseTemplateNodeAttributes(r,t,i)||n),n}static _parseTemplateChildNodes(e,t,i){if("script"!==e.localName&&"style"!==e.localName)for(let n,r=e.firstChild,a=0;r;r=n){if("template"==r.localName&&(r=c(r)),n=r.nextSibling,r.nodeType===Node.TEXT_NODE){let i=n;for(;i&&i.nodeType===Node.TEXT_NODE;)r.textContent+=i.textContent,n=i.nextSibling,e.removeChild(i),i=n;if(t.stripWhiteSpace&&!r.textContent.trim()){e.removeChild(r);continue}}let s={parentIndex:a,parentInfo:i};this._parseTemplateNode(r,t,s)&&(s.infoIndex=t.nodeInfoList.push(s)-1),r.parentNode&&a++}}static _parseTemplateNestedTemplate(e,t,i){let n=e,r=this._parseTemplate(n,t);return(r.content=n.content.ownerDocument.createDocumentFragment()).appendChild(n.content),i.templateInfo=r,!0}static _parseTemplateNodeAttributes(e,t,i){let n=!1,r=Array.from(e.attributes);for(let a,s=r.length-1;a=r[s];s--)n=this._parseTemplateNodeAttribute(e,t,i,a.name,a.value)||n;return n}static _parseTemplateNodeAttribute(e,t,i,n,r){return"on-"===n.slice(0,3)?(e.removeAttribute(n),i.events=i.events||[],i.events.push({name:n.slice(3),value:r}),!0):"id"===n&&(i.id=r,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let t=this.constructor._parseTemplate(e),i=t.nodeInfoList,n=t.content||e.content,r=document.importNode(n,!0);r.__noInsertionPoint=!t.hasInsertionPoint;let a=r.nodeList=new Array(i.length);r.$={};for(let e,t=0,n=i.length;t<n&&(e=i[t]);t++){let i=a[t]=h(r,e);d(0,r.$,i,e),p(0,i,e),u(this,i,e)}return r=r}_addMethodEventListenerToNode(e,t,i,n){let r=function(e,t,i){return e=e._methodHost||e,function(t){e[i]?e[i](t,t.detail):console.warn("listener method `"+i+"` not defined")}}(n=n||e,0,i);return this._addEventListenerToNode(e,t,r),r}_addEventListenerToNode(e,t,i){e.addEventListener(t,i)}_removeEventListenerFromNode(e,t,i){e.removeEventListener(t,i)}}});var g=i(8);i.d(t,"a",(function(){return q}));
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
let f=0;const v={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},b=/[A-Z]/;function _(e,t){let i=e[t];if(i){if(!e.hasOwnProperty(t)){i=e[t]=Object.create(e[t]);for(let e in i){let t=i[e],n=i[e]=Array(t.length);for(let e=0;e<t.length;e++)n[e]=t[e]}}}else i=e[t]={};return i}function y(e,t,i,n,r,a){if(t){let s=!1,o=f++;for(let l in i)w(e,t,o,l,i,n,r,a)&&(s=!0);return s}return!1}function w(e,t,i,n,r,s,o,l){let c=!1,h=t[o?Object(a.g)(n):n];if(h)for(let t,a=0,d=h.length;a<d&&(t=h[a]);a++)t.info&&t.info.lastRun===i||o&&!C(n,t.trigger)||(t.info&&(t.info.lastRun=i),t.fn(e,n,r,s,t.info,o,l),c=!0);return c}function C(e,t){if(t){let i=t.name;return i==e||!(!t.structured||!Object(a.b)(i,e))||!(!t.wildcard||!Object(a.c)(i,e))}return!0}function z(e,t,i,n,r){let a="string"==typeof r.method?e[r.method]:r.method,s=r.property;a?a.call(e,e.__data[s],n[s]):r.dynamicFn||console.warn("observer method `"+r.method+"` not defined")}function E(e,t,i){let n=Object(a.g)(t);if(n!==t){return A(e,Object(s.a)(n)+"-changed",i[t],t),!0}return!1}function A(e,t,i,r){let a={value:i,queueProperty:!0};r&&(a.path=r),Object(n.a)(e).dispatchEvent(new CustomEvent(t,{detail:a}))}function S(e,t,i,n,r,s){let o=(s?Object(a.g)(t):t)!=t?t:null,l=o?Object(a.a)(e,o):e.__data[t];o&&void 0===l&&(l=i[t]),A(e,r.eventName,l,o)}function M(e,t,i,n,r){let a=e.__data[t];g.f&&(a=Object(g.f)(a,r.attrName,"attribute",e)),e._propertyToAttribute(t,r.attrName,a)}function x(e,t,i,n,r){let a=V(e,t,i,n,r),s=r.methodInfo;e.__dataHasAccessor&&e.__dataHasAccessor[s]?e._setPendingProperty(s,a,!0):e[s]=a}function T(e,t,i,n,r,a,o){i.bindings=i.bindings||[];let l={kind:n,target:r,parts:a,literal:o,isCompound:1!==a.length};if(i.bindings.push(l),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(l)){let{event:e,negate:t}=l.parts[0];l.listenerEvent=e||Object(s.a)(r)+"-changed",l.listenerNegate=t}let c=t.nodeInfoList.length;for(let i=0;i<l.parts.length;i++){let n=l.parts[i];n.compoundIndex=i,I(e,t,l,n,c)}}function I(e,t,i,n,r){if(!n.literal)if("attribute"===i.kind&&"-"===i.target[0])console.warn("Cannot set attribute "+i.target+' because "-" is not a valid attribute starting character');else{let a=n.dependencies,s={index:r,binding:i,part:n,evaluator:e};for(let i=0;i<a.length;i++){let n=a[i];"string"==typeof n&&((n=B(n)).wildcard=!0),e._addTemplatePropertyEffect(t,n.rootProperty,{fn:k,info:s,trigger:n})}}}function k(e,t,i,n,r,s,o){let l=o[r.index],c=r.binding,h=r.part;if(s&&h.source&&t.length>h.source.length&&"property"==c.kind&&!c.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[c.target]){let n=i[t];t=Object(a.i)(h.source,c.target,t),l._setPendingPropertyOrPath(t,n,!1,!0)&&e._enqueueClient(l)}else{!function(e,t,i,n,r){r=function(e,t,i,n){if(i.isCompound){let r=e.__dataCompoundStorage[i.target];r[n.compoundIndex]=t,t=r.join("")}"attribute"!==i.kind&&("textContent"!==i.target&&("value"!==i.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,r,i,n),g.f&&(r=Object(g.f)(r,i.target,i.kind,t));if("attribute"==i.kind)e._valueToNodeAttribute(t,r,i.target);else{let n=i.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[n]?t[v.READ_ONLY]&&t[v.READ_ONLY][n]||t._setPendingProperty(n,r)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,n,r)}}(e,l,c,h,r.evaluator._evaluateBinding(e,h,t,i,n,s))}}function O(e,t){if(t.isCompound){let i=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),r=t.parts,a=new Array(r.length);for(let e=0;e<r.length;e++)a[e]=r[e].literal;let s=t.target;i[s]=a,t.literal&&"property"==t.kind&&("className"===s&&(e=Object(n.a)(e)),e[s]=t.literal)}}function H(e,t,i){if(i.listenerEvent){let n=i.parts[0];e.addEventListener(i.listenerEvent,(function(e){!function(e,t,i,n,r){let s,o=e.detail,l=o&&o.path;l?(n=Object(a.i)(i,n,l),s=o&&o.value):s=e.currentTarget[i],s=r?!s:s,t[v.READ_ONLY]&&t[v.READ_ONLY][n]||!t._setPendingPropertyOrPath(n,s,!0,Boolean(l))||o&&o.queueProperty||t._invalidateProperties()}(e,t,i.target,n.source,n.negate)}))}}function L(e,t,i,n,r,a){a=t.static||a&&("object"!=typeof a||a[t.methodName]);let s={methodName:t.methodName,args:t.args,methodInfo:r,dynamicFn:a};for(let r,a=0;a<t.args.length&&(r=t.args[a]);a++)r.literal||e._addPropertyEffect(r.rootProperty,i,{fn:n,info:s,trigger:r});a&&e._addPropertyEffect(t.methodName,i,{fn:n,info:s})}function V(e,t,i,n,r){let a=e._methodHost||e,s=a[r.methodName];if(s){let n=e._marshalArgs(r.args,t,i);return s.apply(a,n)}r.dynamicFn||console.warn("method `"+r.methodName+"` not defined")}const D=[],N=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function R(e){let t="";for(let i=0;i<e.length;i++){t+=e[i].literal||""}return t}function P(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:D};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let i=B(e);return i.literal||(t.static=!1),i}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function B(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),i={name:t,value:"",literal:!1},n=t[0];switch("-"===n&&(n=t[1]),n>="0"&&n<="9"&&(n="#"),n){case"'":case'"':i.value=t.slice(1,-1),i.literal=!0;break;case"#":i.value=Number(t),i.literal=!0}return i.literal||(i.rootProperty=Object(a.g)(t),i.structured=Object(a.d)(t),i.structured&&(i.wildcard=".*"==t.slice(-2),i.wildcard&&(i.name=t.slice(0,-2)))),i}function F(e,t,i){let n=Object(a.a)(e,i);return void 0===n&&(n=t[i]),n}function j(e,t,i,n){e.notifyPath(i+".splices",{indexSplices:n}),e.notifyPath(i+".length",t.length)}function U(e,t,i,n,r,a){j(e,t,i,[{index:n,addedCount:r,removed:a,object:t,type:"splice"}])}const q=Object(r.a)(e=>{const t=m(Object(o.a)(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return v}_initializeProperties(){super._initializeProperties(),$.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[v.READ_ONLY];for(let i in e)t&&t[i]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[i]=this.__dataPending[i]=e[i])}_addPropertyEffect(e,t,i){this._createPropertyAccessor(e,t==v.READ_ONLY);let n=_(this,t)[e];n||(n=this[t][e]=[]),n.push(i)}_removePropertyEffect(e,t,i){let n=_(this,t)[e],r=n.indexOf(i);r>=0&&n.splice(r,1)}_hasPropertyEffect(e,t){let i=this[t];return Boolean(i&&i[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,v.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,v.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,v.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,v.COMPUTE)}_setPendingPropertyOrPath(e,t,i,n){if(n||Object(a.g)(Array.isArray(e)?e[0]:e)!==e){if(!n){let i=Object(a.a)(this,e);if(!(e=Object(a.h)(this,e,t))||!super._shouldPropertyChange(e,t,i))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,i))return function(e,t,i){let n=e.__dataLinkedPaths;if(n){let r;for(let s in n){let o=n[s];Object(a.c)(s,t)?(r=Object(a.i)(s,o,t),e._setPendingPropertyOrPath(r,i,!0,!0)):Object(a.c)(o,t)&&(r=Object(a.i)(o,s,t),e._setPendingPropertyOrPath(r,i,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,i);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,i){i===e[t]&&"object"!=typeof i||("className"===t&&(e=Object(n.a)(e)),e[t]=i)}_setPendingProperty(e,t,i){let n=this.__dataHasPaths&&Object(a.d)(e),r=n?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,r[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),n?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(n||this[v.NOTIFY]&&this[v.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=i),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let i=e[t];i.__dataEnabled?i.__dataPending&&i._flushProperties():i._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let i in e)!t&&this[v.READ_ONLY]&&this[v.READ_ONLY][i]||this._setPendingPropertyOrPath(i,e[i],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,i){let n=this.__dataHasPaths;this.__dataHasPaths=!1,function(e,t,i,n){let r=e[v.COMPUTE];if(r){let a=t;for(;y(e,r,a,i,n);)Object.assign(i,e.__dataOld),Object.assign(t,e.__dataPending),a=e.__dataPending,e.__dataPending=null}}(this,t,i,n);let r=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(t,i,n),this._flushClients(),y(this,this[v.REFLECT],t,i,n),y(this,this[v.OBSERVE],t,i,n),r&&function(e,t,i,n,r){let a,s,o=e[v.NOTIFY],l=f++;for(let s in t)t[s]&&(o&&w(e,o,l,s,i,n,r)?a=!0:r&&E(e,s,i)&&(a=!0));a&&(s=e.__dataHost)&&s._invalidateProperties&&s._invalidateProperties()}(this,r,t,i,n),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,i){this[v.PROPAGATE]&&y(this,this[v.PROPAGATE],e,t,i);let n=this.__templateInfo;for(;n;)y(this,n.propertyEffects,e,t,i,n.nodeList),n=n.nextTemplateInfo}linkPaths(e,t){e=Object(a.f)(e),t=Object(a.f)(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=Object(a.f)(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let i={path:""};j(this,Object(a.a)(this,e,i),i.path,t)}get(e,t){return Object(a.a)(t||this,e)}set(e,t,i){i?Object(a.h)(i,e,t):this[v.READ_ONLY]&&this[v.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let i={path:""},n=Object(a.a)(this,e,i),r=n.length,s=n.push(...t);return t.length&&U(this,n,i.path,r,t.length,[]),s}pop(e){let t={path:""},i=Object(a.a)(this,e,t),n=Boolean(i.length),r=i.pop();return n&&U(this,i,t.path,i.length,0,[r]),r}splice(e,t,i,...n){let r,s={path:""},o=Object(a.a)(this,e,s);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),r=2===arguments.length?o.splice(t):o.splice(t,i,...n),(n.length||r.length)&&U(this,o,s.path,t,n.length,r),r}shift(e){let t={path:""},i=Object(a.a)(this,e,t),n=Boolean(i.length),r=i.shift();return n&&U(this,i,t.path,0,0,[r]),r}unshift(e,...t){let i={path:""},n=Object(a.a)(this,e,i),r=n.unshift(...t);return t.length&&U(this,n,i.path,0,t.length,[]),r}notifyPath(e,t){let i;if(1==arguments.length){let n={path:""};t=Object(a.a)(this,e,n),i=n.path}else i=Array.isArray(e)?Object(a.f)(e):e;this._setPendingPropertyOrPath(i,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var i;this._addPropertyEffect(e,v.READ_ONLY),t&&(this["_set"+(i=e,i[0].toUpperCase()+i.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,i){let n={property:e,method:t,dynamicFn:Boolean(i)};this._addPropertyEffect(e,v.OBSERVE,{fn:z,info:n,trigger:{name:e}}),i&&this._addPropertyEffect(t,v.OBSERVE,{fn:z,info:n,trigger:{name:t}})}_createMethodObserver(e,t){let i=P(e);if(!i)throw new Error("Malformed observer expression '"+e+"'");L(this,i,v.OBSERVE,V,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,v.NOTIFY,{fn:S,info:{eventName:Object(s.a)(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,v.REFLECT,{fn:M,info:{attrName:t}})}_createComputedProperty(e,t,i){let n=P(t);if(!n)throw new Error("Malformed computed expression '"+t+"'");L(this,n,v.COMPUTE,x,e,i)}_marshalArgs(e,t,i){const n=this.__data,r=[];for(let s=0,o=e.length;s<o;s++){let{name:o,structured:l,wildcard:c,value:h,literal:d}=e[s];if(!d)if(c){const e=Object(a.c)(o,t),r=F(n,i,e?t:o);h={path:e?t:o,value:r,base:e?Object(a.a)(n,o):r}}else h=l?F(n,i,o):n[o];r[s]=h}return r}static addPropertyEffect(e,t,i){this.prototype._addPropertyEffect(e,t,i)}static createPropertyObserver(e,t,i){this.prototype._createPropertyObserver(e,t,i)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,i){this.prototype._createComputedProperty(e,t,i)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let i=this.constructor._parseTemplate(e),n=this.__templateInfo==i;if(!n)for(let e in i.propertyEffects)this._createPropertyAccessor(e);if(t&&((i=Object.create(i)).wasPreBound=n,!n&&this.__templateInfo)){let e=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=e.nextTemplateInfo=i,i.previousTemplateInfo=e,i}return this.__templateInfo=i}static _addTemplatePropertyEffect(e,t,i){(e.hostProps=e.hostProps||{})[t]=!0;let n=e.propertyEffects=e.propertyEffects||{};(n[t]=n[t]||[]).push(i)}_stampTemplate(e){$.beginHosting(this);let t=super._stampTemplate(e);$.endHosting(this);let i=this._bindTemplate(e,!0);if(i.nodeList=t.nodeList,!i.wasPreBound){let e=i.childNodes=[];for(let i=t.firstChild;i;i=i.nextSibling)e.push(i)}return t.templateInfo=i,function(e,t){let{nodeList:i,nodeInfoList:n}=t;if(n.length)for(let t=0;t<n.length;t++){let r=n[t],a=i[t],s=r.bindings;if(s)for(let t=0;t<s.length;t++){let i=s[t];O(a,i),H(a,e,i)}a.__dataHost=e}}(this,i),this.__dataReady&&y(this,i.propertyEffects,this.__data,null,!1,i.nodeList),t}_removeBoundDom(e){let t=e.templateInfo;t.previousTemplateInfo&&(t.previousTemplateInfo.nextTemplateInfo=t.nextTemplateInfo),t.nextTemplateInfo&&(t.nextTemplateInfo.previousTemplateInfo=t.previousTemplateInfo),this.__templateInfoLast==t&&(this.__templateInfoLast=t.previousTemplateInfo),t.previousTemplateInfo=t.nextTemplateInfo=null;let i=t.childNodes;for(let e=0;e<i.length;e++){let t=i[e];t.parentNode.removeChild(t)}}static _parseTemplateNode(e,i,n){let r=t._parseTemplateNode.call(this,e,i,n);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,i);t&&(e.textContent=R(t)||" ",T(this,i,n,"text","textContent",t),r=!0)}return r}static _parseTemplateNodeAttribute(e,i,n,r,a){let o=this._parseBindings(a,i);if(o){let t=r,a="property";b.test(r)?a="attribute":"$"==r[r.length-1]&&(r=r.slice(0,-1),a="attribute");let l=R(o);return l&&"attribute"==a&&("class"==r&&e.hasAttribute("class")&&(l+=" "+e.getAttribute(r)),e.setAttribute(r,l)),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===a&&(r=Object(s.b)(r)),T(this,i,n,a,r,o,l),!0}return t._parseTemplateNodeAttribute.call(this,e,i,n,r,a)}static _parseTemplateNestedTemplate(e,i,n){let r=t._parseTemplateNestedTemplate.call(this,e,i,n),a=n.templateInfo.hostProps;for(let e in a){T(this,i,n,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}])}return r}static _parseBindings(e,t){let i,n=[],r=0;for(;null!==(i=N.exec(e));){i.index>r&&n.push({literal:e.slice(r,i.index)});let a=i[1][0],s=Boolean(i[2]),o=i[3].trim(),l=!1,c="",h=-1;"{"==a&&(h=o.indexOf("::"))>0&&(c=o.substring(h+2),o=o.substring(0,h),l=!0);let d=P(o),u=[];if(d){let{args:e,methodName:i}=d;for(let t=0;t<e.length;t++){let i=e[t];i.literal||u.push(i)}let n=t.dynamicFns;(n&&n[i]||d.static)&&(u.push(i),d.dynamicFn=!0)}else u.push(o);n.push({source:o,mode:a,negate:s,customEvent:l,signature:d,dependencies:u,event:c}),r=N.lastIndex}if(r&&r<e.length){let t=e.substring(r);t&&n.push({literal:t})}return n.length?n:null}static _evaluateBinding(e,t,i,n,r,s){let o;return o=t.signature?V(e,i,n,0,t.signature):i!=t.source?Object(a.a)(e,t.source):s&&Object(a.d)(i)?Object(a.a)(e,i):e.__data[i],t.negate&&(o=!o),o}}});const $=new class{constructor(){this.stack=[]}registerHost(e){if(this.stack.length){this.stack[this.stack.length-1]._enqueueClient(e)}}beginHosting(e){this.stack.push(e)}endHosting(e){let t=this.stack.length;t&&this.stack[t-1]==e&&this.stack.pop()}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));i(10);var n=i(16),r=i(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let a={},s={};function o(e,t){a[e]=s[e.toLowerCase()]=t}function l(e){return a[e]||s[e.toLowerCase()]}class c extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let i=l(e);return i&&t?i.querySelector(t):i}return null}attributeChangedCallback(e,t,i,n){t!==i&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=Object(n.c)(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=Object(n.a)(t)}return this.__assetpath}register(e){if(e=e||this.id){if(r.g&&void 0!==l(e))throw o(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,o(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}c.prototype.modules=a,customElements.define("dom-module",c)},function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let r=!1;function a(){if(n.c&&!n.i){if(!r){r=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const n={properties:{name:{type:String},value:{notify:!0,type:String},required:{type:Boolean,value:!1}},attached:function(){},detached:function(){}}},function(e,t,i){"use strict";i.d(t,"b",(function(){return s})),i.d(t,"a",(function(){return o}));i(5);var n=i(22),r=i(19),a=i(26);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const s={observers:["_focusedChanged(receivedFocusFromKeyboard)"],_focusedChanged:function(e){e&&this.ensureRipple(),this.hasRipple()&&(this._ripple.holdDown=e)},_createRipple:function(){var e=a.a._createRipple();return e.id="ink",e.setAttribute("center",""),e.classList.add("circle"),e}},o=[n.a,r.a,a.a,s]},function(e,t,i){"use strict";var n=i(15);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class r{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function a(e){return function e(t,i){let n=i.substring(t.start,t.end-1);t.parsedCssText=t.cssText=n.trim();if(t.parent){let e=t.previous?t.previous.end:t.parent.start;n=(n=(n=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(n=i.substring(e,t.start-1))).replace(h.multipleSpaces," ")).substring(n.lastIndexOf(";")+1);let r=t.parsedSelector=t.selector=n.trim();t.atRule=0===r.indexOf(p),t.atRule?0===r.indexOf(u)?t.type=o.MEDIA_RULE:r.match(h.keyframesRule)&&(t.type=o.KEYFRAMES_RULE,t.keyframesName=t.selector.split(h.multipleSpaces).pop()):0===r.indexOf(d)?t.type=o.MIXIN_RULE:t.type=o.STYLE_RULE}let r=t.rules;if(r)for(let t,n=0,a=r.length;n<a&&(t=r[n]);n++)e(t,i);return t}(function(e){let t=new r;t.start=0,t.end=e.length;let i=t;for(let n=0,a=e.length;n<a;n++)if(e[n]===l){i.rules||(i.rules=[]);let e=i,t=e.rules[e.rules.length-1]||null;(i=new r).start=n+1,i.parent=e,i.previous=t,e.rules.push(i)}else e[n]===c&&(i.end=n+1,i=i.parent||t);return t}(e=e.replace(h.comments,"").replace(h.port,"")),e)}function s(e,t,i=""){let n="";if(e.cssText||e.rules){let i=e.rules;if(i&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(d)}(i))for(let e,r=0,a=i.length;r<a&&(e=i[r]);r++)n=s(e,t,n);else(n=(n=t?e.cssText:function(e){return function(e){return e.replace(h.mixinApply,"").replace(h.varApply,"")}(e=function(e){return e.replace(h.customProp,"").replace(h.mixinProp,"")}(e))}(e.cssText)).trim())&&(n="  "+n+"\n")}return n&&(e.selector&&(i+=e.selector+" "+l+"\n"),i+=n,e.selector&&(i+=c+"\n\n")),i}const o={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},l="{",c="}",h={comments:/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},d="--",u="@media",p="@";var m=i(21);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const g=new Set,f="shady-unscoped";function v(e){const t=e.textContent;if(!g.has(t)){g.add(t);const i=e.cloneNode(!0);document.head.appendChild(i)}}function b(e){return e.hasAttribute(f)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function _(e,t){return e?("string"==typeof e&&(e=a(e)),t&&w(e,t),s(e,n.c)):""}function y(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=a(e.textContent)),e.__cssRules||null}function w(e,t,i,n){if(!e)return;let r=!1,a=e.type;if(n&&a===o.MEDIA_RULE){let t=e.selector.match(m.a);t&&(window.matchMedia(t[1]).matches||(r=!0))}a===o.STYLE_RULE?t(e):i&&a===o.KEYFRAMES_RULE?i(e):a===o.MIXIN_RULE&&(r=!0);let s=e.rules;if(s&&!r)for(let e,r=0,a=s.length;r<a&&(e=s[r]);r++)w(e,t,i,n)}function C(e,t){let i=0;for(let n=t,r=e.length;n<r;n++)if("("===e[n])i++;else if(")"===e[n]&&0==--i)return n;return-1}window.ShadyDOM&&window.ShadyDOM.wrap;const z="css-build";function E(e){if(void 0!==n.a)return n.a;if(void 0===e.__cssBuild){const t=e.getAttribute(z);if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if(e[0]===z)return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}function A(e){return""!==E(e)}var S=i(27);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const M=/;\s*/m,x=/^\s*(initial)|(inherit)\s*$/,T=/\s*!important/,I="_-_";class k{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let O=null;class H{constructor(){this._currentElement=null,this._measureElement=null,this._map=new k}detectMixin(e){return Object(S.a)(e)}gatherStyles(e){const t=function(e){const t=[],i=e.querySelectorAll("style");for(let e=0;e<i.length;e++){const r=i[e];b(r)?n.d||(v(r),r.parentNode.removeChild(r)):(t.push(r.textContent),r.parentNode.removeChild(r))}return t.join("").trim()}(e.content);if(t){const i=document.createElement("style");return i.textContent=t,e.content.insertBefore(i,e.content.firstChild),i}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const i=e._gatheredStyle;return i?this.transformStyle(i,t):null}transformStyle(e,t=""){let i=y(e);return this.transformRules(i,t),e.textContent=_(i),i}transformCustomStyle(e){let t=y(e);return w(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=_(t),t}transformRules(e,t){this._currentElement=t,w(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(m.c,(e,i,n,r)=>this._produceCssProperties(e,i,n,r,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const i={};let n=!1;return w(t,t=>{(n=n||t===e)||t.selector===e.selector&&Object.assign(i,this._cssTextToMap(t.parsedCssText))}),i}_consumeCssProperties(e,t){let i=null;for(;i=m.b.exec(e);){let n=i[0],r=i[1],a=i.index,s=a+n.indexOf("@apply"),o=a+n.length,l=e.slice(0,s),c=e.slice(o),h=t?this._fallbacksFromPreviousRules(t):{};Object.assign(h,this._cssTextToMap(l));let d=this._atApplyToCssProperties(r,h);e=`${l}${d}${c}`,m.b.lastIndex=a+d.length}return e}_atApplyToCssProperties(e,t){e=e.replace(M,"");let i=[],n=this._map.get(e);if(n||(this._map.set(e,{}),n=this._map.get(e)),n){let r,a,s;this._currentElement&&(n.dependants[this._currentElement]=!0);const o=n.properties;for(r in o)s=t&&t[r],a=[r,": var(",e,I,r],s&&a.push(",",s.replace(T,"")),a.push(")"),T.test(o[r])&&a.push(" !important"),i.push(a.join(""))}return i.join("; ")}_replaceInitialOrInherit(e,t){let i=x.exec(t);return i&&(t=i[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let i,n,r=e.split(";"),a={};for(let e,s,o=0;o<r.length;o++)(e=r[o])&&(s=e.split(":")).length>1&&(i=s[0].trim(),n=s.slice(1).join(":"),t&&(n=this._replaceInitialOrInherit(i,n)),a[i]=n);return a}_invalidateMixinEntry(e){if(O)for(let t in e.dependants)t!==this._currentElement&&O(t)}_produceCssProperties(e,t,i,n,r){if(i&&function e(t,i){let n=t.indexOf("var(");if(-1===n)return i(t,"","","");let r=C(t,n+3),a=t.substring(n+4,r),s=t.substring(0,n),o=e(t.substring(r+1),i),l=a.indexOf(",");return-1===l?i(s,a.trim(),"",o):i(s,a.substring(0,l).trim(),a.substring(l+1).trim(),o)}(i,(e,t)=>{t&&this._map.get(t)&&(n=`@apply ${t};`)}),!n)return e;let a=this._consumeCssProperties(""+n,r),s=e.slice(0,e.indexOf("--")),o=this._cssTextToMap(a,!0),l=o,c=this._map.get(t),h=c&&c.properties;h?l=Object.assign(Object.create(h),o):this._map.set(t,l);let d,u,p=[],m=!1;for(d in l)void 0===(u=o[d])&&(u="initial"),!h||d in h||(m=!0),p.push(`${t}${I}${d}: ${u}`);return m&&this._invalidateMixinEntry(c),c&&(c.properties=l),i&&(s=`${e};${s}`),`${s}${p.join("; ")};`}}H.prototype.detectMixin=H.prototype.detectMixin,H.prototype.transformStyle=H.prototype.transformStyle,H.prototype.transformCustomStyle=H.prototype.transformCustomStyle,H.prototype.transformRules=H.prototype.transformRules,H.prototype.transformRule=H.prototype.transformRule,H.prototype.transformTemplate=H.prototype.transformTemplate,H.prototype._separator=I,Object.defineProperty(H.prototype,"invalidCallback",{get:()=>O,set(e){O=e}});var L=H;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var V={};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const D="_applyShimCurrentVersion",N="_applyShimNextVersion",R="_applyShimValidatingVersion",P=Promise.resolve();function B(e){let t=V[e];t&&function(e){e[D]=e[D]||0,e[R]=e[R]||0,e[N]=(e[N]||0)+1}(t)}function F(e){return e[D]===e[N]}function j(e){return!F(e)&&e[R]===e[N]}function U(e){e[R]=e[N],e._validating||(e._validating=!0,P.then((function(){e[D]=e[N],e._validating=!1})))}i(62);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const q=new L;class ${constructor(){this.customStyleInterface=null,q.invalidCallback=B}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{q.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})})}prepareTemplate(e,t){if(this.ensure(),A(e))return;V[t]=e;let i=q.transformTemplate(e,t);e._styleAst=i}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let i=e[t],n=this.customStyleInterface.getStyleForCustomStyle(i);n&&q.transformCustomStyle(n)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&Object(S.c)(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,i="",n="";return t?t.indexOf("-")>-1?i=t:(n=t,i=e.getAttribute&&e.getAttribute("is")||""):(i=e.is,n=e.extends),{is:i,typeExtension:n}}(e),i=V[t];if((!i||!A(i))&&i&&!F(i)){j(i)||(this.prepareTemplate(i,t),U(i));let n=e.shadowRoot;if(n){let e=n.querySelector("style");e&&(e.__cssRules=i._styleAst,e.textContent=_(i._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new $;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,i,n){e.flushCustomStyles(),e.prepareTemplate(t,i)},prepareTemplateStyles(e,t,i){window.ShadyCSS.prepareTemplate(e,t,i)},prepareTemplateDom(e,t){},styleSubtree(t,i){e.flushCustomStyles(),e.styleSubtree(t,i)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>Object(S.b)(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:n.c,nativeShadow:n.d,cssBuild:n.a,disableRuntime:n.b},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=q;var K=i(33),W=i(49),G=i(46),Y=i(12);
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
const X=/:host\(:dir\((ltr|rtl)\)\)/g,Z=':host([dir="$1"])',J=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Q=':host([dir="$2"]) $1',ee=/:dir\((?:ltr|rtl)\)/,te=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),ie=[];let ne=null,re="";function ae(){re=document.documentElement.getAttribute("dir")}function se(e){if(!e.__autoDirOptOut){e.setAttribute("dir",re)}}function oe(){ae(),re=document.documentElement.getAttribute("dir");for(let e=0;e<ie.length;e++)se(ie[e])}const le=Object(Y.a)(e=>{te||ne||(ae(),(ne=new MutationObserver(oe)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=Object(G.a)(e);class i extends t{static _processStyleText(e,i){return e=t._processStyleText.call(this,e,i),!te&&ee.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=(t=t.replace(X,Z)).replace(J,Q)}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(ne&&ne.takeRecords().length&&oe(),ie.push(this),se(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=ie.indexOf(this);e>-1&&ie.splice(e,1)}}}return i.__activateDir=!1,i});i(32);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function ce(){document.body.removeAttribute("unresolved")}"interactive"===document.readyState||"complete"===document.readyState?ce():window.addEventListener("DOMContentLoaded",ce);var he=i(4),de=i(43),ue=i(18),pe=i(14),me=i(6),ge=i(2);i(10);
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const fe=window.ShadyDOM,ve=window.ShadyCSS;function be(e,t){return Object(ge.a)(e).getRootNode()===t}i.d(t,"a",(function(){return ye}));
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let _e=window.ShadyCSS;const ye=Object(Y.a)(e=>{const t=le(Object(W.a)(Object(K.a)(e))),i={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class n extends t{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(e,t,i,n){t!==i&&(super.attributeChangedCallback(e,t,i,n),this.attributeChanged(e,t,i))}attributeChanged(e,t,i){}_initializeProperties(){let e=Object.getPrototypeOf(this);e.hasOwnProperty("__hasRegisterFinished")||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),this._applyListeners()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,i){this._propertyToAttribute(e,t,i)}serializeValueToAttribute(e,t,i){this._valueToNodeAttribute(i||this,e,t)}extend(e,t){if(!e||!t)return e||t;let i=Object.getOwnPropertyNames(t);for(let n,r=0;r<i.length&&(n=i[r]);r++){let i=Object.getOwnPropertyDescriptor(t,n);i&&Object.defineProperty(e,n,i)}return e}mixin(e,t){for(let i in t)e[i]=t[i];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,i){i=i||{},t=null==t?{}:t;let n=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});n.detail=t;let r=i.node||this;return Object(ge.a)(r).dispatchEvent(n),n}listen(e,t,i){e=e||this;let n=this.__boundListeners||(this.__boundListeners=new WeakMap),r=n.get(e);r||(r={},n.set(e,r));let a=t+i;r[a]||(r[a]=this._addMethodEventListenerToNode(e,t,i,this))}unlisten(e,t,i){e=e||this;let n=this.__boundListeners&&this.__boundListeners.get(e),r=t+i,a=n&&n[r];a&&(this._removeEventListenerFromNode(e,t,a),n[r]=null)}setScrollDirection(e,t){Object(de.c)(t||this,i[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=Object(ge.a)(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=Object(he.a)(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return Object(he.a)(this).getEffectiveChildNodes()}queryDistributedElements(e){return Object(he.a)(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let i,n=0;i=e[n];n++)i.nodeType!==Node.COMMENT_NODE&&t.push(i.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?Object(he.a)(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){return this!==e&&Object(ge.a)(this).contains(e)&&Object(ge.a)(this).getRootNode()===Object(ge.a)(e).getRootNode()}isLocalDescendant(e){return this.root===Object(ge.a)(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!fe||!ve)return null;if(!fe.handlesDynamicScoping)return null;const i=ve.ScopingShim;if(!i)return null;const n=i.scopeForNode(e),r=Object(ge.a)(e).getRootNode(),a=e=>{if(!be(e,r))return;const t=Array.from(fe.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const a=t[e];if(!be(a,r))continue;const s=i.currentScopeForNode(a);s!==n&&(""!==s&&i.unscopeNode(a,s),i.scopeNode(a,n))}};if(a(e),t){const t=new MutationObserver(e=>{for(let t=0;t<e.length;t++){const i=e[t];for(let e=0;e<i.addedNodes.length;e++){const t=i.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&a(t)}}});return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return _e.getComputedStyleValue(this,e)}debounce(e,t,i){return this._debouncers=this._debouncers||{},this._debouncers[e]=ue.a.debounce(this._debouncers[e],i>0?pe.b.after(i):pe.a,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?pe.b.run(e.bind(this),t):~pe.a.run(e.bind(this))}cancelAsync(e){e<0?pe.a.cancel(~e):pe.b.cancel(e)}create(e,t){let i=document.createElement(e);if(t)if(i.setProperties)i.setProperties(t);else for(let e in t)i[e]=t[e];return i}elementMatches(e,t){return Object(he.b)(t||this,e)}toggleAttribute(e,t){let i=this;return 3===arguments.length&&(i=arguments[2]),1==arguments.length&&(t=!i.hasAttribute(e)),t?(Object(ge.a)(i).setAttribute(e,""),!0):(Object(ge.a)(i).removeAttribute(e),!1)}toggleClass(e,t,i){i=i||this,1==arguments.length&&(t=!i.classList.contains(e)),t?i.classList.add(e):i.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,i,n){n=n||this,this.transform("translate3d("+e+","+t+","+i+")",n)}arrayDelete(e,t){let i;if(Array.isArray(e)){if((i=e.indexOf(t))>=0)return e.splice(i,1)}else{if((i=Object(me.a)(this,e).indexOf(t))>=0)return this.splice(e,i,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return n.prototype.is="",n})},function(e,t,i){"use strict";i(5);var n=i(41),r=i(7),a=i(4);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(r.a)({is:"iron-iconset-svg",properties:{name:{type:String,observer:"_nameChanged"},size:{type:Number,value:24},rtlMirroring:{type:Boolean,value:!1},useGlobalRtlAttribute:{type:Boolean,value:!1}},created:function(){this._meta=new n.a({type:"iconset",key:null,value:null})},attached:function(){this.style.display="none"},getIconNames:function(){return this._icons=this._createIconMap(),Object.keys(this._icons).map((function(e){return this.name+":"+e}),this)},applyIcon:function(e,t){this.removeIcon(e);var i=this._cloneIcon(t,this.rtlMirroring&&this._targetIsRTL(e));if(i){var n=Object(a.a)(e.root||e);return n.insertBefore(i,n.childNodes[0]),e._svgIcon=i}return null},removeIcon:function(e){e._svgIcon&&(Object(a.a)(e.root||e).removeChild(e._svgIcon),e._svgIcon=null)},_targetIsRTL:function(e){if(null==this.__targetIsRTL)if(this.useGlobalRtlAttribute){var t=document.body&&document.body.hasAttribute("dir")?document.body:document.documentElement;this.__targetIsRTL="rtl"===t.getAttribute("dir")}else e&&e.nodeType!==Node.ELEMENT_NODE&&(e=e.host),this.__targetIsRTL=e&&"rtl"===window.getComputedStyle(e).direction;return this.__targetIsRTL},_nameChanged:function(){this._meta.value=null,this._meta.key=this.name,this._meta.value=this,this.async((function(){this.fire("iron-iconset-added",this,{node:window})}))},_createIconMap:function(){var e=Object.create(null);return Object(a.a)(this).querySelectorAll("[id]").forEach((function(t){e[t.id]=t})),e},_cloneIcon:function(e,t){return this._icons=this._icons||this._createIconMap(),this._prepareSvgClone(this._icons[e],this.size,t)},_prepareSvgClone:function(e,t,i){if(e){var n=e.cloneNode(!0),r=document.createElementNS("http://www.w3.org/2000/svg","svg"),a=n.getAttribute("viewBox")||"0 0 "+t+" "+t,s="pointer-events: none; display: block; width: 100%; height: 100%;";return i&&n.hasAttribute("mirror-in-rtl")&&(s+="-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;"),r.setAttribute("viewBox",a),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("focusable","false"),r.style.cssText=s,r.appendChild(n).removeAttribute("id"),r}return null}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));i(5);var n=i(7);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class r{constructor(e){r[" "](e),this.type=e&&e.type||"default",this.key=e&&e.key,e&&"value"in e&&(this.value=e.value)}get value(){var e=this.type,t=this.key;if(e&&t)return r.types[e]&&r.types[e][t]}set value(e){var t=this.type,i=this.key;t&&i&&(t=r.types[t]=r.types[t]||{},null==e?delete t[i]:t[i]=e)}get list(){if(this.type){var e=r.types[this.type];return e?Object.keys(e).map((function(e){return a[this.type][e]}),this):[]}}byKey(e){return this.key=e,this.value}}r[" "]=function(){},r.types={};var a=r.types;Object(n.a)({is:"iron-meta",properties:{type:{type:String,value:"default"},key:{type:String},value:{type:String,notify:!0},self:{type:Boolean,observer:"_selfChanged"},__meta:{type:Boolean,computed:"__computeMeta(type, key, value)"}},hostAttributes:{hidden:!0},__computeMeta:function(e,t,i){var n=new r({type:e,key:t});return void 0!==i&&i!==n.value?n.value=i:this.value!==n.value&&(this.value=n.value),n},get list(){return this.__meta&&this.__meta.list},_selfChanged:function(e){e&&(this.value=this)},byKey:function(e){return new r({type:this.type,key:e}).value}})},function(e,t,i){"use strict";i.d(t,"c",(function(){return u})),i.d(t,"b",(function(){return p})),i.d(t,"a",(function(){return g}));var n=i(35),r=i(16);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a="link[rel=import][type~=css]",s="include",o="shady-unscoped";function l(e){return n.a.import(e)}function c(e){let t=e.body?e.body:e;const i=Object(r.b)(t.textContent,e.baseURI),n=document.createElement("style");return n.textContent=i,n}function h(e){const t=e.trim().split(/\s+/),i=[];for(let e=0;e<t.length;e++)i.push(...d(t[e]));return i}function d(e){const t=l(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...m(t));const i=t.querySelector("template");i&&e.push(...u(i,t.assetpath)),t._styles=e}return t._styles}function u(e,t){if(!e._styles){const i=[],n=e.content.querySelectorAll("style");for(let e=0;e<n.length;e++){let a=n[e],o=a.getAttribute(s);o&&i.push(...h(o).filter((function(e,t,i){return i.indexOf(e)===t}))),t&&(a.textContent=Object(r.b)(a.textContent,t)),i.push(a)}e._styles=i}return e._styles}function p(e){let t=l(e);return t?m(t):[]}function m(e){const t=[],i=e.querySelectorAll(a);for(let e=0;e<i.length;e++){let n=i[e];if(n.import){const e=n.import,i=n.hasAttribute(o);if(i&&!e._unscopedStyle){const t=c(e);t.setAttribute(o,""),e._unscopedStyle=t}else e._style||(e._style=c(e));t.push(i?e._unscopedStyle:e._style)}}return t}function g(e){let t=e.trim().split(/\s+/),i="";for(let e=0;e<t.length;e++)i+=f(t[e]);return i}function f(e){let t=l(e);if(t&&void 0===t._cssText){let e=v(t),i=t.querySelector("template");i&&(e+=function(e,t){let i="";const n=u(e,t);for(let e=0;e<n.length;e++){let t=n[e];t.parentNode&&t.parentNode.removeChild(t),i+=t.textContent}return i}(i,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}function v(e){let t="",i=m(e);for(let e=0;e<i.length;e++)t+=i[e].textContent;return t}},function(e,t,i){"use strict";i.d(t,"a",(function(){return D})),i.d(t,"b",(function(){return N})),i.d(t,"c",(function(){return P}));i(10);var n=i(14),r=i(18),a=i(8),s=i(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o="string"==typeof document.head.style.touchAction,l="__polymerGestures",c="__polymerGesturesHandled",h="__polymerGesturesTouchAction",d=25,u=5,p=2500,m=["mousedown","mousemove","mouseup","click"],g=[0,1,4,2],f=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function v(e){return m.indexOf(e)>-1}let b=!1;function _(e){if(!v(e)&&"touchend"!==e)return o&&b&&a.d?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){b=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let y=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const w=[],C={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},z={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function E(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let i=e.getRootNode();if(e.id){let n=i.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<n.length;e++)t.push(n[e])}}return t}let A=function(e){let t=e.sourceCapabilities;var i;if((!t||t.firesTouchEvents)&&(e[c]={skip:!0},"click"===e.type)){let t=!1,n=k(e);for(let e=0;e<n.length;e++){if(n[e].nodeType===Node.ELEMENT_NODE)if("label"===n[e].localName)w.push(n[e]);else if(i=n[e],C[i.localName]){let i=E(n[e]);for(let e=0;e<i.length;e++)t=t||w.indexOf(i[e])>-1}if(n[e]===x.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function S(e){let t=y?["click"]:m;for(let i,n=0;n<t.length;n++)i=t[n],e?(w.length=0,document.addEventListener(i,A,!0)):document.removeEventListener(i,A,!0)}function M(e){let t=e.type;if(!v(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!f&&(t=g[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let x={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function T(e,t,i){e.movefn=t,e.upfn=i,document.addEventListener("mousemove",t),document.addEventListener("mouseup",i)}function I(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}a.b&&document.addEventListener("touchend",(function(e){if(!a.b)return;x.mouse.mouseIgnoreJob||S(!0),x.mouse.target=k(e)[0],x.mouse.mouseIgnoreJob=r.a.debounce(x.mouse.mouseIgnoreJob,n.b.after(p),(function(){S(),x.mouse.target=null,x.mouse.mouseIgnoreJob=null}))}),!!b&&{passive:!0});const k=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],O={},H=[];function L(e){const t=k(e);return t.length>0?t[0]:e.target}function V(e){let t,i=e.type,n=e.currentTarget[l];if(!n)return;let r=n[i];if(r){if(!e[c]&&(e[c]={},"touch"===i.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===i&&1===e.touches.length&&(x.touch.id=t.identifier),x.touch.id!==t.identifier)return;o||"touchstart"!==i&&"touchmove"!==i||function(e){let t=e.changedTouches[0],i=e.type;if("touchstart"===i)x.touch.x=t.clientX,x.touch.y=t.clientY,x.touch.scrollDecided=!1;else if("touchmove"===i){if(x.touch.scrollDecided)return;x.touch.scrollDecided=!0;let i=function(e){let t="auto",i=k(e);for(let e,n=0;n<i.length;n++)if((e=i[n])[h]){t=e[h];break}return t}(e),n=!1,r=Math.abs(x.touch.x-t.clientX),a=Math.abs(x.touch.y-t.clientY);e.cancelable&&("none"===i?n=!0:"pan-x"===i?n=a>r:"pan-y"===i&&(n=r>a)),n?e.preventDefault():F("track")}}(e)}if(!(t=e[c]).skip){for(let i,n=0;n<H.length;n++)r[(i=H[n]).name]&&!t[i.name]&&i.flow&&i.flow.start.indexOf(e.type)>-1&&i.reset&&i.reset();for(let n,a=0;a<H.length;a++)r[(n=H[a]).name]&&!t[n.name]&&(t[n.name]=!0,n[i](e))}}}function D(e,t,i){return!!O[t]&&(function(e,t,i){let n=O[t],r=n.deps,a=n.name,s=e[l];s||(e[l]=s={});for(let t,i,n=0;n<r.length;n++)t=r[n],y&&v(t)&&"click"!==t||((i=s[t])||(s[t]=i={_count:0}),0===i._count&&e.addEventListener(t,V,_(t)),i[a]=(i[a]||0)+1,i._count=(i._count||0)+1);e.addEventListener(t,i),n.touchAction&&P(e,n.touchAction)}(e,t,i),!0)}function N(e,t,i){return!!O[t]&&(function(e,t,i){let n=O[t],r=n.deps,a=n.name,s=e[l];if(s)for(let t,i,n=0;n<r.length;n++)t=r[n],(i=s[t])&&i[a]&&(i[a]=(i[a]||1)-1,i._count=(i._count||1)-1,0===i._count&&e.removeEventListener(t,V,_(t)));e.removeEventListener(t,i)}(e,t,i),!0)}function R(e){H.push(e);for(let t=0;t<e.emits.length;t++)O[e.emits[t]]=e}function P(e,t){o&&e instanceof HTMLElement&&n.a.run(()=>{e.style.touchAction=t}),e[h]=t}function B(e,t,i){let n=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(n.detail=i,Object(s.a)(e).dispatchEvent(n),n.defaultPrevented){let e=i.preventer||i.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function F(e){let t=function(e){for(let t,i=0;i<H.length;i++){t=H[i];for(let i,n=0;n<t.emits.length;n++)if((i=t.emits[n])===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function j(e,t,i,n){t&&B(t,e,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:n,prevent:function(e){return F(e)}})}function U(e,t,i){if(e.prevent)return!1;if(e.started)return!0;let n=Math.abs(e.x-t),r=Math.abs(e.y-i);return n>=u||r>=u}function q(e,t,i){if(!t)return;let n,r=e.moves[e.moves.length-2],a=e.moves[e.moves.length-1],s=a.x-e.x,o=a.y-e.y,l=0;r&&(n=a.x-r.x,l=a.y-r.y),B(t,"track",{state:e.state,x:i.clientX,y:i.clientY,dx:s,dy:o,ddx:n,ddy:l,sourceEvent:i,hover:function(){return function(e,t){let i=document.elementFromPoint(e,t),n=i;for(;n&&n.shadowRoot&&!window.ShadyDOM;){if(n===(n=n.shadowRoot.elementFromPoint(e,t)))break;n&&(i=n)}return i}(i.clientX,i.clientY)}})}function $(e,t,i){let n=Math.abs(t.clientX-e.x),r=Math.abs(t.clientY-e.y),a=L(i||t);!a||z[a.localName]&&a.hasAttribute("disabled")||(isNaN(n)||isNaN(r)||n<=d&&r<=d||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=L(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let i=t.getBoundingClientRect(),n=e.pageX,r=e.pageY;return!(n>=i.left&&n<=i.right&&r>=i.top&&r<=i.bottom)}return!1}(t))&&(e.prevent||B(a,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:i}))}R({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){I(this.info)},mousedown:function(e){if(!M(e))return;let t=L(e),i=this;T(this.info,(function(e){M(e)||(j("up",t,e),I(i.info))}),(function(e){M(e)&&j("up",t,e),I(i.info)})),j("down",t,e)},touchstart:function(e){j("down",L(e),e.changedTouches[0],e)},touchend:function(e){j("up",L(e),e.changedTouches[0],e)}}),R({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,I(this.info)},mousedown:function(e){if(!M(e))return;let t=L(e),i=this,n=function(e){let n=e.clientX,r=e.clientY;U(i.info,n,r)&&(i.info.state=i.info.started?"mouseup"===e.type?"end":"track":"start","start"===i.info.state&&F("tap"),i.info.addMove({x:n,y:r}),M(e)||(i.info.state="end",I(i.info)),t&&q(i.info,t,e),i.info.started=!0)};T(this.info,n,(function(e){i.info.started&&n(e),I(i.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=L(e),i=e.changedTouches[0],n=i.clientX,r=i.clientY;U(this.info,n,r)&&("start"===this.info.state&&F("tap"),this.info.addMove({x:n,y:r}),q(this.info,t,i),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=L(e),i=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),q(this.info,t,i))}}),R({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){M(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){M(e)&&$(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){$(this.info,e.changedTouches[0],e)}})},function(e,t,i){"use strict";i.d(t,"b",(function(){return s})),i.d(t,"a",(function(){return o}));i(5);var n=i(22),r=i(19),a=i(26);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const s={properties:{elevation:{type:Number,reflectToAttribute:!0,readOnly:!0}},observers:["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)","_computeKeyboardClass(receivedFocusFromKeyboard)"],hostAttributes:{role:"button",tabindex:"0",animated:!0},_calculateElevation:function(){var e=1;this.disabled?e=0:this.active||this.pressed?e=4:this.receivedFocusFromKeyboard&&(e=3),this._setElevation(e)},_computeKeyboardClass:function(e){this.toggleClass("keyboard-focus",e)},_spaceKeyDownHandler:function(e){n.b._spaceKeyDownHandler.call(this,e),this.hasRipple()&&this.getRipple().ripples.length<1&&this._ripple.uiDownAction()},_spaceKeyUpHandler:function(e){n.b._spaceKeyUpHandler.call(this,e),this.hasRipple()&&this._ripple.uiUpAction()}},o=[n.a,r.a,a.a,s]},function(e,t,i){"use strict";i(23),i(60);var n=i(44),r=i(7);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const a=i(5).b`
  <style include="paper-material-styles">
    /* Need to specify the same specificity as the styles imported from paper-material. */
    :host {
      @apply --layout-inline;
      @apply --layout-center-center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      background: transparent;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      font: inherit;
      text-transform: uppercase;
      outline-width: 0;
      border-radius: 3px;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;

      @apply --paper-font-common-base;
      @apply --paper-button;
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([raised].keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-raised-keyboard-focus;
    }

    :host(:not([raised]).keyboard-focus) {
      font-weight: bold;
      @apply --paper-button-flat-keyboard-focus;
    }

    :host([disabled]) {
      background: none;
      color: #a8a8a8;
      cursor: auto;
      pointer-events: none;

      @apply --paper-button-disabled;
    }

    :host([disabled][raised]) {
      background: #eaeaea;
    }


    :host([animated]) {
      @apply --shadow-transition;
    }

    paper-ripple {
      color: var(--paper-button-ink-color);
    }
  </style>

  <slot></slot>`;a.setAttribute("strip-whitespace",""),Object(r.a)({_template:a,is:"paper-button",behaviors:[n.a],properties:{raised:{type:Boolean,reflectToAttribute:!0,value:!1,observer:"_calculateElevation"}},_calculateElevation:function(){this.raised?n.b._calculateElevation.apply(this):this._setElevation(0)}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return l}));i(10);var n=i(12),r=i(20),a=i(47);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s={};let o=HTMLElement.prototype;for(;o;){let e=Object.getOwnPropertyNames(o);for(let t=0;t<e.length;t++)s[e[t]]=!0;o=Object.getPrototypeOf(o)}const l=Object(n.a)(e=>{const t=Object(a.a)(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(Object(r.b)(e[t]))}static attributeNameForProperty(e){return Object(r.a)(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const i=this;i.hasAttribute(e)||this._valueToNodeAttribute(i,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let i;switch(t){case Object:try{i=JSON.parse(e)}catch(t){i=e}break;case Array:try{i=JSON.parse(e)}catch(t){i=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)}break;case Date:i=isNaN(e)?String(e):Number(e),i=new Date(i);break;default:i=super._deserializeValue(e,t)}return i}_definePropertyAccessor(e,t){!function(e,t){if(!s[t]){let i=e[t];void 0!==i&&(e.__data?e._setPendingProperty(t,i):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=i))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));i(10);var n=i(12),r=i(14),a=i(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s=r.a,o=Object(n.a)(e=>{return class extends e{static createProperties(e){const t=this.prototype;for(let i in e)i in t||t._createPropertyAccessor(i)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[e]){const t=this.constructor.attributeNameForProperty(e);this.__dataAttributes[t]=e}}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this._getProperty(e)},set:t?function(){}:function(t){this._setProperty(e,t)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,i){let n=this.__data[e],r=this._shouldPropertyChange(e,t,n);return r&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||e in this.__dataOld||(this.__dataOld[e]=n),this.__data[e]=t,this.__dataPending[e]=t),r}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,s.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const e=this.__data,t=this.__dataPending,i=this.__dataOld;this._shouldPropertiesChange(e,t,i)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,i))}_shouldPropertiesChange(e,t,i){return Boolean(t)}_propertiesChanged(e,t,i){}_shouldPropertyChange(e,t,i){return i!==t&&(i==i||t==t)}attributeChangedCallback(e,t,i,n){t!==i&&this._attributeToProperty(e,i),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,i,n)}_attributeToProperty(e,t,i){if(!this.__serializing){const n=this.__dataAttributes,r=n&&n[e]||e;this[r]=this._deserializeValue(t,i||this.constructor.typeForProperty(r))}}_propertyToAttribute(e,t,i){this.__serializing=!0,i=arguments.length<3?this[e]:i,this._valueToNodeAttribute(this,i,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,i){const n=this._serializeValue(t);"class"!==i&&"name"!==i&&"slot"!==i||(e=Object(a.a)(e)),void 0===n?e.removeAttribute(i):e.setAttribute(i,n)}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));class n{constructor(e){this.element=e,this.inputs=[].slice.call(this.element.querySelectorAll("[name]")),"object"!=typeof this.inputs&&(this.inputs=[])}goTo(e,t=!1){this.element.goTo(e,t)}goToEnd(e=!1){this.element.goTo([...this.element.parentElement.querySelectorAll("tangy-form-item")].pop().id,e)}getValue(e){let t="",i=void 0;if(this.inputs.forEach(t=>{t.name===e&&(i=t)}),!i){let t=this.element.store.getState(),n=[];t.items.forEach(e=>n=[...n,...e.inputs]),i=n.find(t=>{if(t.name===e)return t})}if(i&&"object"==typeof i.value){let e=[];i.value.forEach(t=>{t.value&&e.push(t.name)}),t=e}else i&&void 0!==i.value&&(t=i.value);return i&&"TANGY-RADIO-BUTTONS"===i.tagName&&Array.isArray(t)&&(t=t.length>0?t[0]:""),t||(t=""),t}isChecked(e){return"on"===this.inputs.find(t=>e===t.name).value}notChecked(e){return"on"!==this.inputs.find(t=>e===t.name).value}inputShow(e){this.inputs.forEach(t=>{t.name===e&&(t.hidden=!1)})}inputHide(e){this.inputs.forEach(t=>{t.name===e&&(t.hidden=!0)})}inputEnable(e){this.inputs.forEach(t=>{t.name===e&&(t.disabled=!1)})}inputDisable(e){this.inputs.forEach(t=>{t.name===e&&(t.disabled=!0)})}itemsPerMinute(e){if(!e)return;if("TANGY-TIMED"!==e.tagName)return;let t=this.numberOfItemsAttempted(e)-this.numberOfIncorrectItems(e),i=e.duration-e.timeRemaining;return Math.round(t/(i/60))}numberOfItemsAttempted(e){if(e)return e.value.findIndex(e=>e.highlighted)+1}numberOfCorrectItems(e){if(e)return this.numberOfItemsAttempted(e)-this.numberOfIncorrectItems(e)}numberOfIncorrectItems(e){if(e)return e.value.filter(e=>e.value).length}gridAutoStopped(e){return!!e.value.find(e=>e.gridAutoStopped)}hideInputsUponThreshhold(e){let t=!1;if(e.querySelectorAll("[correct]").length>0){let i=[...e.children].filter(e=>"TANGY-RADIO-BUTTONS"===e.tagName),n=[],r=0,a=0;i.forEach((e,t)=>{const i=e.querySelectorAll("[correct]"),s=Array.from(i).map(e=>e.value);let o=e.value.find(e=>"on"===e.value);o&&(s.join().includes(o.name)?r=0:(n=[...n,t],t==++a?++r:r=1,a=t))},[]),t=r>=e.incorrectThreshold;let s=Math.max(...n)+1;i.slice(s).forEach((e,i)=>{e.hidden=!!t})}return t}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));i(10);var n=i(12),r=i(43);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=Object(n.a)(e=>{return class extends e{_addEventListenerToNode(e,t,i){Object(r.a)(e,t,i)||super._addEventListenerToNode(e,t,i)}_removeEventListenerFromNode(e,t,i){Object(r.b)(e,t,i)||super._removeEventListenerFromNode(e,t,i)}}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));i(10);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function n(e,t,i){return{index:e,removed:t,addedCount:i}}const r=0,a=1,s=2,o=3;function l(e,t,i,l,c,d){let u,p=0,m=0,g=Math.min(i-t,d-c);if(0==t&&0==c&&(p=function(e,t,i){for(let n=0;n<i;n++)if(!h(e[n],t[n]))return n;return i}(e,l,g)),i==e.length&&d==l.length&&(m=function(e,t,i){let n=e.length,r=t.length,a=0;for(;a<i&&h(e[--n],t[--r]);)a++;return a}(e,l,g-p)),c+=p,d-=m,(i-=m)-(t+=p)==0&&d-c==0)return[];if(t==i){for(u=n(t,[],0);c<d;)u.removed.push(l[c++]);return[u]}if(c==d)return[n(t,[],i-t)];let f=function(e){let t=e.length-1,i=e[0].length-1,n=e[t][i],l=[];for(;t>0||i>0;){if(0==t){l.push(s),i--;continue}if(0==i){l.push(o),t--;continue}let c,h=e[t-1][i-1],d=e[t-1][i],u=e[t][i-1];(c=d<u?d<h?d:h:u<h?u:h)==h?(h==n?l.push(r):(l.push(a),n=h),t--,i--):c==d?(l.push(o),t--,n=d):(l.push(s),i--,n=u)}return l.reverse(),l}(function(e,t,i,n,r,a){let s=a-r+1,o=i-t+1,l=new Array(s);for(let e=0;e<s;e++)l[e]=new Array(o),l[e][0]=e;for(let e=0;e<o;e++)l[0][e]=e;for(let i=1;i<s;i++)for(let a=1;a<o;a++)if(h(e[t+a-1],n[r+i-1]))l[i][a]=l[i-1][a-1];else{let e=l[i-1][a]+1,t=l[i][a-1]+1;l[i][a]=e<t?e:t}return l}(e,t,i,l,c,d));u=void 0;let v=[],b=t,_=c;for(let e=0;e<f.length;e++)switch(f[e]){case r:u&&(v.push(u),u=void 0),b++,_++;break;case a:u||(u=n(b,[],0)),u.addedCount++,b++,u.removed.push(l[_]),_++;break;case s:u||(u=n(b,[],0)),u.addedCount++,b++;break;case o:u||(u=n(b,[],0)),u.removed.push(l[_]),_++}return u&&v.push(u),v}function c(e,t){return l(e,0,e.length,t,0,t.length)}function h(e,t){return e===t}},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const n={attached:function(){this.fire("addon-attached")},update:function(e){}}},function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));i(5);var n=i(28),r=i(19),a=i(4),s=i(0);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const o={NextLabelID:1,NextAddonID:1,NextInputID:1},l={properties:{label:{type:String},value:{notify:!0,type:String},disabled:{type:Boolean,value:!1},invalid:{type:Boolean,value:!1,notify:!0},allowedPattern:{type:String},type:{type:String},list:{type:String},pattern:{type:String},required:{type:Boolean,value:!1},errorMessage:{type:String},charCounter:{type:Boolean,value:!1},noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},autoValidate:{type:Boolean,value:!1},validator:{type:String},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,observer:"_autofocusChanged"},inputmode:{type:String},minlength:{type:Number},maxlength:{type:Number},min:{type:String},max:{type:String},step:{type:String},name:{type:String},placeholder:{type:String,value:""},readonly:{type:Boolean,value:!1},size:{type:Number},autocapitalize:{type:String,value:"none"},autocorrect:{type:String,value:"off"},autosave:{type:String},results:{type:Number},accept:{type:String},multiple:{type:Boolean},_ariaDescribedBy:{type:String,value:""},_ariaLabelledBy:{type:String,value:""},_inputId:{type:String,value:""}},listeners:{"addon-attached":"_onAddonAttached"},keyBindings:{"shift+tab:keydown":"_onShiftTabDown"},hostAttributes:{tabindex:0},get inputElement(){return this.$||(this.$={}),this.$.input||(this._generateInputId(),this.$.input=this.$$("#"+this._inputId)),this.$.input},get _focusableElement(){return this.inputElement},created:function(){this._typesThatHaveText=["date","datetime","datetime-local","month","time","week","file"]},attached:function(){this._updateAriaLabelledBy(),!s.a&&this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.inputElement.type)&&(this.alwaysFloatLabel=!0)},_appendStringWithSpace:function(e,t){return e=e?e+" "+t:t},_onAddonAttached:function(e){var t=Object(a.a)(e).rootTarget;if(t.id)this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,t.id);else{var i="paper-input-add-on-"+o.NextAddonID++;t.id=i,this._ariaDescribedBy=this._appendStringWithSpace(this._ariaDescribedBy,i)}},validate:function(){return this.inputElement.validate()},_focusBlurHandler:function(e){r.a._focusBlurHandler.call(this,e),this.focused&&!this._shiftTabPressed&&this._focusableElement&&this._focusableElement.focus()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");this._shiftTabPressed=!0,this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),this._shiftTabPressed=!1}),1)},_handleAutoValidate:function(){this.autoValidate&&this.validate()},updateValueAndPreserveCaret:function(e){try{var t=this.inputElement.selectionStart;this.value=e,this.inputElement.selectionStart=t,this.inputElement.selectionEnd=t}catch(t){this.value=e}},_computeAlwaysFloatLabel:function(e,t){return t||e},_updateAriaLabelledBy:function(){var e,t=Object(a.a)(this.root).querySelector("label");t?(t.id?e=t.id:(e="paper-input-label-"+o.NextLabelID++,t.id=e),this._ariaLabelledBy=e):this._ariaLabelledBy=""},_generateInputId:function(){this._inputId&&""!==this._inputId||(this._inputId="input-"+o.NextInputID++)},_onChange:function(e){this.shadowRoot&&this.fire(e.type,{sourceEvent:e},{node:this,bubbles:e.bubbles,cancelable:e.cancelable})},_autofocusChanged:function(){if(this.autofocus&&this._focusableElement){var e=document.activeElement;e instanceof HTMLElement&&e!==document.body&&e!==document.documentElement||this._focusableElement.focus()}}},c=[r.a,n.a,l]},function(e,t,i){"use strict";i(5);var n=i(37),r=i(30);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const a={properties:{checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0,observer:"_checkedChanged"},toggles:{type:Boolean,value:!0,reflectToAttribute:!0},value:{type:String,value:"on",observer:"_valueChanged"}},observers:["_requiredChanged(required)"],created:function(){this._hasIronCheckedElementBehavior=!0},_getValidity:function(e){return this.disabled||!this.required||this.checked},_requiredChanged:function(){this.required?this.setAttribute("aria-required","true"):this.removeAttribute("aria-required")},_checkedChanged:function(){this.active=this.checked,this.fire("iron-change")},_valueChanged:function(){void 0!==this.value&&null!==this.value||(this.value="on")}},s=[n.a,r.a,a];var o=i(38),l=i(26);i.d(t,"a",(function(){return h}));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const c={_checkedChanged:function(){a._checkedChanged.call(this),this.hasRipple()&&(this.checked?this._ripple.setAttribute("checked",""):this._ripple.removeAttribute("checked"))},_buttonStateChanged:function(){l.a._buttonStateChanged.call(this),this.disabled||this.isAttached&&(this.checked=this.active)}},h=[o.a,s,c]},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));i(83);class n{static flatten(e={locations:{},locationsLevels:[]}){let t=[],i=[...e.locationsLevels];return function e(n,r=0){if(!n.children)return;const a=i[r];let s=[];for(let e in n.children)s.push(Object.assign({},n.children[e],{level:a}));for(;s&&s.length>0;){let i=s.pop();t.push(Object.assign({},i,{parent:n.id,children:{}})),e(i,r+1)}}({children:e.locations,id:"root"},0),Object.assign({},e,{locations:t})}static unflatten(e={locations:[],locationsLevels:[]}){for(let t of[...e.locationsLevels].reverse())e.locations.filter(e=>e.level===t).forEach(t=>{const i=e.locations.filter(e=>e.parent===t.id).reduce((e,t)=>({...e,[t.id]:t}),{});t.children=i});return JSON.parse(JSON.stringify({...e,locations:e.locations.filter(t=>t.level===e.locationsLevels[0]).reduce((e,t)=>({...e,[t.id]:t}),{})},(()=>{const e=new WeakSet;return(t,i)=>{if("object"==typeof i&&null!==i){if(e.has(i))return;e.add(i)}return i}})()))}static filterById(e={locations:{},locationsLevels:[]},t=[],i=!0){const n=this.flatten(e).locations,r=t.map(e=>{let t=[e],i=n.find(t=>e===t.id).parent;for(t.push(i.slice());"root"!==i;)i=n.find(e=>i===e.id).parent,t.push(i.slice());return t.reverse()}).reduce((e,t)=>[...new Set([...e,...t])],[]);let a=n.filter(e=>-1!==r.indexOf(e.id));if(i){const e=a.reduce((e,t)=>a.filter(e=>e.parent===t.id).length>0?e:[...e,t],[]);for(let t of e)this.findDecendents(n,t.id).forEach(e=>a.push(e))}return this.unflatten(Object.assign({},e,{locations:a}))}static filterToDecendentsByParentIdAndLevel(e={locations:{},locationsLevels:[]},t="",i=""){const n=this.flatten(e).locations;return this.findDecendents(n,t).filter(e=>e.level===i)}static flatFilterToDecendentsByParentIdAndLevel(e={locations:{},locationsLevels:[]},t="",i=""){const n=e.locations;return this.findDecendents(n,t).filter(e=>e.level===i)}static findDecendents(e,t){let i=[];return function t(n){e.filter(e=>e.parent===n).forEach(e=>{i.push(e),t(e.id)})}(t),i}static calculateDescendantCounts(e={}){const t=this.flatten(e);for(let i of[...e.locationsLevels].reverse())t.locations.filter(e=>e.level===i).forEach(e=>{const i=t.locations.filter(t=>t.parent===e.id);i.length>0?e.descendantsCount=i.reduce((e,t)=>0===t.descendantsCount?e+1:e+t.descendantsCount,0):e.descendantsCount=0});return this.unflatten(t)}static query(e,t,i,r,a){var s,o,l,c,h,d,u,p;for(null==t&&(t={}),p=i.locations,0,[],d=[],o=l=0,c=(u=i.locationsLevels).length;l<c;o=++l)h=u[o],-1===_.indexOf(e,h)?d[o]=null:d[o]=h;s=n.getCurrentLevelIndex(e,t,d),r(n._query(0,s,p,d,t))}static _query(e,t,i,r,a){var s,o,l,c,h,d;if(e===t)return _.map(i,(function(e){return{id:e.id,label:e.label}}));if(null!=r[e]&&e<t&&a[r[e]]&&i[a[r[e]]]&&i[a[r[e]]].hasOwnProperty("children"))return n._query(e+1,t,i[a[r[e]]].children,r,a);if(null==r[e]&&e<t){for(h={},o=l=0,c=(s=_.map(i,(function(e){return e.children}))).length;l<c;o=++l)d=s[o],_.extend(h,d);return n._query(e+1,t,h,r,a)}return console.log("_query: (depth, targetDepth, data, levelMap, criteria)",e,t,i,r,a),console.log("ERROR: Cannot find location. I should never reach this."),{}}static getCurrentLevelIndex(e,t,i){var n,r,a,s;for(n=r=0,a=e.length;r<a;n=++r)if(null==t[s=e[n]])return _.indexOf(i,s);return _.indexOf(i,_.last(e))}}},function(e,t,i){"use strict";var n=i(0),r=i(29),a=i(18),s=i(24),o=i(14),l=i(6),c=i(2),h=i(36);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class d extends n.a{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=a.a.debounce(this.__renderDebouncer,o.a,()=>this.__render()),Object(s.a)(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=Object(c.a)(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||Object(c.a)(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),Object(h.a)()||(this.style.display="none"),this.if&&this.__debounceRender()}render(){Object(s.b)()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let e=Object(c.a)(this).parentNode;if(e){if(!this.__ctor){let e=Object(c.a)(this).querySelector("template");if(!e){let e=new MutationObserver(()=>{if(!Object(c.a)(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__ctor=Object(r.b)(e,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Object(l.g)(e)]=!0))}})}if(this.__instance){this.__syncHostProperties();let t=this.__instance.children;if(t&&t.length){if(Object(c.a)(this).previousSibling!==t[t.length-1])for(let i,n=0;n<t.length&&(i=t[n]);n++)Object(c.a)(e).insertBefore(i,this)}}else this.__instance=new this.__ctor,Object(c.a)(e).insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let e=this.__invalidProps;if(e){for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=Object(c.a)(e[0]).parentNode;if(t){t=Object(c.a)(t);for(let i,n=0;n<e.length&&(i=e[n]);n++)t.removeChild(i)}}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let e=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(e)}}customElements.define(d.is,d)},function(e,t,i){"use strict";i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const n=i(3).a`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;n.setAttribute("style","display: none;"),document.head.appendChild(n.content)},function(e,t,i){"use strict";i(5),i(31);var n=i(53),r=i(38),a=i(7),s=i(3),o=i(32);
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const l=s.a`<style>
  :host {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);
    /* -1px is a sentinel for the default and is replaced in \`attached\`. */
    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);
    @apply --paper-font-common-base;
    line-height: 0;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:focus) {
    outline: none;
  }

  .hidden {
    display: none;
  }

  #checkboxContainer {
    display: inline-block;
    position: relative;
    width: var(--calculated-paper-checkbox-size);
    height: var(--calculated-paper-checkbox-size);
    min-width: var(--calculated-paper-checkbox-size);
    margin: var(--paper-checkbox-margin, initial);
    vertical-align: var(--paper-checkbox-vertical-align, middle);
    background-color: var(--paper-checkbox-unchecked-background-color, transparent);
  }

  #ink {
    position: absolute;

    /* Center the ripple in the checkbox by negative offsetting it by
     * (inkWidth - rippleWidth) / 2 */
    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    width: var(--calculated-paper-checkbox-ink-size);
    height: var(--calculated-paper-checkbox-ink-size);
    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));
    opacity: 0.6;
    pointer-events: none;
  }

  #ink:dir(rtl) {
    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);
    left: auto;
  }

  #ink[checked] {
    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));
  }

  #checkbox {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    border: solid 2px;
    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
    border-radius: 2px;
    pointer-events: none;
    -webkit-transition: background-color 140ms, border-color 140ms;
    transition: background-color 140ms, border-color 140ms;

    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);
    transition-duration: var(--paper-checkbox-animation-duration, 140ms);
  }

  /* checkbox checked animations */
  #checkbox.checked #checkmark {
    -webkit-animation: checkmark-expand 140ms ease-out forwards;
    animation: checkmark-expand 140ms ease-out forwards;

    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);
    animation-duration: var(--paper-checkbox-animation-duration, 140ms);
  }

  @-webkit-keyframes checkmark-expand {
    0% {
      -webkit-transform: scale(0, 0) rotate(45deg);
    }
    100% {
      -webkit-transform: scale(1, 1) rotate(45deg);
    }
  }

  @keyframes checkmark-expand {
    0% {
      transform: scale(0, 0) rotate(45deg);
    }
    100% {
      transform: scale(1, 1) rotate(45deg);
    }
  }

  #checkbox.checked {
    background-color: var(--paper-checkbox-checked-color, var(--primary-color));
    border-color: var(--paper-checkbox-checked-color, var(--primary-color));
  }

  #checkmark {
    position: absolute;
    width: 36%;
    height: 70%;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));
    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));
    border-color: var(--paper-checkbox-checkmark-color, white);
    -webkit-transform-origin: 97% 86%;
    transform-origin: 97% 86%;
    box-sizing: content-box; /* protect against page-level box-sizing */
  }

  #checkmark:dir(rtl) {
    -webkit-transform-origin: 50% 14%;
    transform-origin: 50% 14%;
  }

  /* label */
  #checkboxLabel {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding-left: var(--paper-checkbox-label-spacing, 8px);
    white-space: normal;
    line-height: normal;
    color: var(--paper-checkbox-label-color, var(--primary-text-color));
    @apply --paper-checkbox-label;
  }

  :host([checked]) #checkboxLabel {
    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));
    @apply --paper-checkbox-label-checked;
  }

  #checkboxLabel:dir(rtl) {
    padding-right: var(--paper-checkbox-label-spacing, 8px);
    padding-left: 0;
  }

  #checkboxLabel[hidden] {
    display: none;
  }

  /* disabled state */

  :host([disabled]) #checkbox {
    opacity: 0.5;
    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
  }

  :host([disabled][checked]) #checkbox {
    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled]) #checkboxLabel  {
    opacity: 0.65;
  }

  /* invalid state */
  #checkbox.invalid:not(.checked) {
    border-color: var(--paper-checkbox-error-color, var(--error-color));
  }
</style>

<div id="checkboxContainer">
  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">
    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>
  </div>
</div>

<div id="checkboxLabel"><slot></slot></div>`;l.setAttribute("strip-whitespace",""),Object(a.a)({_template:l,is:"paper-checkbox",behaviors:[n.a],hostAttributes:{role:"checkbox","aria-checked":!1,tabindex:0},properties:{ariaActiveAttribute:{type:String,value:"aria-checked"}},attached:function(){Object(o.a)(this,(function(){if("-1px"===this.getComputedStyleValue("--calculated-paper-checkbox-ink-size").trim()){var e=this.getComputedStyleValue("--calculated-paper-checkbox-size").trim(),t="px",i=e.match(/[A-Za-z]+$/);null!==i&&(t=i[0]);var n=parseFloat(e),r=8/3*n;"px"===t&&(r=Math.floor(r))%2!=n%2&&r++,this.updateStyles({"--paper-checkbox-ink-size":r+t})}}))},_computeCheckboxClass:function(e,t){var i="";return e&&(i+="checked "),t&&(i+="invalid"),i},_computeCheckmarkClass:function(e){return e?"":"hidden"},_createRipple:function(){return this._rippleContainer=this.$.checkboxContainer,r.b._createRipple.call(this)}})},function(e,t,i){"use strict";i(17),i(40);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const n=i(3).a`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(n.content)},function(e,t,i){"use strict";i(5),i(23);var n=i(7),r=i(3),a=i(16);
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({_template:r.a`
    <style>
      :host {
        display: inline-block;
        overflow: hidden;
        position: relative;
      }

      #baseURIAnchor {
        display: none;
      }

      #sizedImgDiv {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        display: none;
      }

      #img {
        display: block;
        width: var(--iron-image-width, auto);
        height: var(--iron-image-height, auto);
      }

      :host([sizing]) #sizedImgDiv {
        display: block;
      }

      :host([sizing]) #img {
        display: none;
      }

      #placeholder {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        background-color: inherit;
        opacity: 1;

        @apply --iron-image-placeholder;
      }

      #placeholder.faded-out {
        transition: opacity 0.5s linear;
        opacity: 0;
      }
    </style>

    <a id="baseURIAnchor" href="#"></a>
    <div id="sizedImgDiv" role="img" hidden$="[[_computeImgDivHidden(sizing)]]" aria-hidden$="[[_computeImgDivARIAHidden(alt)]]" aria-label$="[[_computeImgDivARIALabel(alt, src)]]"></div>
    <img id="img" alt$="[[alt]]" hidden$="[[_computeImgHidden(sizing)]]" crossorigin$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">
    <div id="placeholder" hidden$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>
`,is:"iron-image",properties:{src:{type:String,value:""},alt:{type:String,value:null},crossorigin:{type:String,value:null},preventLoad:{type:Boolean,value:!1},sizing:{type:String,value:null,reflectToAttribute:!0},position:{type:String,value:"center"},preload:{type:Boolean,value:!1},placeholder:{type:String,value:null,observer:"_placeholderChanged"},fade:{type:Boolean,value:!1},loaded:{notify:!0,readOnly:!0,type:Boolean,value:!1},loading:{notify:!0,readOnly:!0,type:Boolean,value:!1},error:{notify:!0,readOnly:!0,type:Boolean,value:!1},width:{observer:"_widthChanged",type:Number,value:null},height:{observer:"_heightChanged",type:Number,value:null}},observers:["_transformChanged(sizing, position)","_loadStateObserver(src, preventLoad)"],created:function(){this._resolvedSrc=""},_imgOnLoad:function(){this.$.img.src===this._resolveSrc(this.src)&&(this._setLoading(!1),this._setLoaded(!0),this._setError(!1))},_imgOnError:function(){this.$.img.src===this._resolveSrc(this.src)&&(this.$.img.removeAttribute("src"),this.$.sizedImgDiv.style.backgroundImage="",this._setLoading(!1),this._setLoaded(!1),this._setError(!0))},_computePlaceholderHidden:function(){return!this.preload||!this.fade&&!this.loading&&this.loaded},_computePlaceholderClassName:function(){return this.preload&&this.fade&&!this.loading&&this.loaded?"faded-out":""},_computeImgDivHidden:function(){return!this.sizing},_computeImgDivARIAHidden:function(){return""===this.alt?"true":void 0},_computeImgDivARIALabel:function(){return null!==this.alt?this.alt:""===this.src?"":this._resolveSrc(this.src).replace(/[?|#].*/g,"").split("/").pop()},_computeImgHidden:function(){return!!this.sizing},_widthChanged:function(){this.style.width=isNaN(this.width)?this.width:this.width+"px"},_heightChanged:function(){this.style.height=isNaN(this.height)?this.height:this.height+"px"},_loadStateObserver:function(e,t){var i=this._resolveSrc(e);i!==this._resolvedSrc&&(this._resolvedSrc="",this.$.img.removeAttribute("src"),this.$.sizedImgDiv.style.backgroundImage="",""===e||t?(this._setLoading(!1),this._setLoaded(!1),this._setError(!1)):(this._resolvedSrc=i,this.$.img.src=this._resolvedSrc,this.$.sizedImgDiv.style.backgroundImage='url("'+this._resolvedSrc+'")',this._setLoading(!0),this._setLoaded(!1),this._setError(!1)))},_placeholderChanged:function(){this.$.placeholder.style.backgroundImage=this.placeholder?'url("'+this.placeholder+'")':""},_transformChanged:function(){var e=this.$.sizedImgDiv.style,t=this.$.placeholder.style;e.backgroundSize=t.backgroundSize=this.sizing,e.backgroundPosition=t.backgroundPosition=this.sizing?this.position:"",e.backgroundRepeat=t.backgroundRepeat=this.sizing?"no-repeat":""},_resolveSrc:function(e){var t=Object(a.c)(e,this.$.baseURIAnchor.href);return t.length>=2&&"/"===t[0]&&"/"!==t[1]&&(t=(location.origin||location.protocol+"//"+location.host)+t),t}});i(60),i(31);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({_template:r.a`
    <style include="paper-material-styles">
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        background-color: var(--paper-card-background-color, var(--primary-background-color));
        border-radius: 2px;

        @apply --paper-font-common-base;
        @apply --paper-card;
      }

      /* IE 10 support for HTML5 hidden attr */
      :host([hidden]), [hidden] {
        display: none !important;
      }

      .header {
        position: relative;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        overflow: hidden;

        @apply --paper-card-header;
      }

      .header iron-image {
        display: block;
        width: 100%;
        --iron-image-width: 100%;
        pointer-events: none;

        @apply --paper-card-header-image;
      }

      .header .title-text {
        padding: 16px;
        font-size: 24px;
        font-weight: 400;
        color: var(--paper-card-header-color, #000);

        @apply --paper-card-header-text;
      }

      .header .title-text.over-image {
        position: absolute;
        bottom: 0px;

        @apply --paper-card-header-image-text;
      }

      :host ::slotted(.card-content) {
        padding: 16px;
        position:relative;

        @apply --paper-card-content;
      }

      :host ::slotted(.card-actions) {
        border-top: 1px solid #e8e8e8;
        padding: 5px 16px;
        position:relative;

        @apply --paper-card-actions;
      }

      :host([elevation="1"]) {
        @apply --paper-material-elevation-1;
      }

      :host([elevation="2"]) {
        @apply --paper-material-elevation-2;
      }

      :host([elevation="3"]) {
        @apply --paper-material-elevation-3;
      }

      :host([elevation="4"]) {
        @apply --paper-material-elevation-4;
      }

      :host([elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>

    <div class="header">
      <iron-image hidden\$="[[!image]]" aria-hidden\$="[[_isHidden(image)]]" src="[[image]]" alt="[[alt]]" placeholder="[[placeholderImage]]" preload="[[preloadImage]]" fade="[[fadeImage]]"></iron-image>
      <div hidden\$="[[!heading]]" class\$="title-text [[_computeHeadingClass(image)]]">[[heading]]</div>
    </div>

    <slot></slot>
`,is:"paper-card",properties:{heading:{type:String,value:"",observer:"_headingChanged"},image:{type:String,value:""},alt:{type:String},preloadImage:{type:Boolean,value:!1},fadeImage:{type:Boolean,value:!1},placeholderImage:{type:String,value:null},elevation:{type:Number,value:1,reflectToAttribute:!0},animatedShadow:{type:Boolean,value:!1},animated:{type:Boolean,reflectToAttribute:!0,readOnly:!0,computed:"_computeAnimated(animatedShadow)"}},_isHidden:function(e){return e?"false":"true"},_headingChanged:function(e){var t=this.getAttribute("heading"),i=this.getAttribute("aria-label");"string"==typeof i&&i!==t||this.setAttribute("aria-label",e)},_computeHeadingClass:function(e){return e?" over-image":""},_computeAnimated:function(e){return e}})},function(e,t,i){"use strict";i(5);var n=i(3);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const r=n.a`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;r.setAttribute("style","display: none;"),document.head.appendChild(r.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const a=n.a`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;a.setAttribute("style","display: none;"),document.head.appendChild(a.content)},function(e,t,i){"use strict";i(5);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/if(!window.polymerSkipLoadingFontRoboto){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.crossOrigin="anonymous",e.href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic",document.head.appendChild(e)}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const n=i(3).a`<custom-style>
  <style is="custom-style">
    html {

      /* Shared Styles */
      --paper-font-common-base: {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-code: {
        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
        -webkit-font-smoothing: antialiased;
      };

      --paper-font-common-expensive-kerning: {
        text-rendering: optimizeLegibility;
      };

      --paper-font-common-nowrap: {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      };

      /* Material Font Styles */

      --paper-font-display4: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 112px;
        font-weight: 300;
        letter-spacing: -.044em;
        line-height: 120px;
      };

      --paper-font-display3: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 56px;
        font-weight: 400;
        letter-spacing: -.026em;
        line-height: 60px;
      };

      --paper-font-display2: {
        @apply --paper-font-common-base;

        font-size: 45px;
        font-weight: 400;
        letter-spacing: -.018em;
        line-height: 48px;
      };

      --paper-font-display1: {
        @apply --paper-font-common-base;

        font-size: 34px;
        font-weight: 400;
        letter-spacing: -.01em;
        line-height: 40px;
      };

      --paper-font-headline: {
        @apply --paper-font-common-base;

        font-size: 24px;
        font-weight: 400;
        letter-spacing: -.012em;
        line-height: 32px;
      };

      --paper-font-title: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
      };

      --paper-font-subhead: {
        @apply --paper-font-common-base;

        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      };

      --paper-font-body2: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-body1: {
        @apply --paper-font-common-base;

        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      };

      --paper-font-caption: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.011em;
        line-height: 20px;
      };

      --paper-font-menu: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 13px;
        font-weight: 500;
        line-height: 24px;
      };

      --paper-font-button: {
        @apply --paper-font-common-base;
        @apply --paper-font-common-nowrap;

        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.018em;
        line-height: 24px;
        text-transform: uppercase;
      };

      --paper-font-code2: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      };

      --paper-font-code1: {
        @apply --paper-font-common-code;

        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      };

    }

  </style>
</custom-style>`;n.setAttribute("style","display: none;"),document.head.appendChild(n.content)},function(e,t,i){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let n,r=null,a=window.HTMLImports&&window.HTMLImports.whenReady||null;function s(e){requestAnimationFrame((function(){a?a(e):(r||(r=new Promise(e=>{n=e}),"complete"===document.readyState?n():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&n()})),r.then((function(){e&&e()})))}))}i.d(t,"a",(function(){return d}));const o="__seenByShadyCSS",l="__shadyCSSCachedStyle";let c=null,h=null;class d{constructor(){this.customStyles=[],this.enqueued=!1,s(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&h&&(this.enqueued=!0,s(h))}addCustomStyle(e){e[o]||(e[o]=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[l])return e[l];let t;return t=e.getStyle?e.getStyle():e}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const i=e[t];if(i[l])continue;const n=this.getStyleForCustomStyle(i);if(n){const e=n.__appliedElement||n;c&&c(e),i[l]=e}}return e}}d.prototype.addCustomStyle=d.prototype.addCustomStyle,d.prototype.getStyleForCustomStyle=d.prototype.getStyleForCustomStyle,d.prototype.processStyles=d.prototype.processStyles,Object.defineProperties(d.prototype,{transformCallback:{get:()=>c,set(e){c=e}},validateCallback:{get:()=>h,set(e){let t=!1;h||(t=!0),h=e,t&&this.enqueueDocumentValidation()}}})},function(e,t,i){"use strict";var n=i(0);i(11),i(59),i(9),i(13);class r extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
    :host {
      position: relative;
    }
    paper-card { width: 100%; }
    paper-fab {
      position: absolute;
      top: -15px;
      right: -15px;
      --paper-fab-background: var(--accent-color);
      --paper-fab-keyboard-focus-background: var(--accent-color);
    }
    </style>
    <paper-card id="content">
      <slot></slot>
    </paper-card>
    <paper-fab mini icon="close" id="remove" on-click="remove"></paper-fab>
    `}static get is(){return"tangy-input-group"}static get _props(){return["name","value","label","disabled","invalid","incomplete","hidden"]}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback()}get value(){return this.shadowRoot&&this.$.content.querySelectorAll("[name]").length>0&&(this._value=[...this.$.content.querySelectorAll("[name]")].map(e=>e.getProps())),this._value?this._value:[]}set value(e){this._value=e,this._value.forEach(e=>this.$.content.querySelector(`[name=${e.name}]`).setProps(e))}validate(){return!0}remove(){this.dispatchEvent(new CustomEvent("input-group-remove"))}}window.customElements.define(r.is,r)},function(e,t,i){"use strict";i(5),i(17),i(31);var n=i(38),r=i(7),a=i(3);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(r.a)({is:"paper-icon-button",_template:a.a`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        line-height: 1;

        width: 40px;
        height: 40px;

        /*
          NOTE: Both values are needed, since some phones require the value to
          be \`transparent\`.
        */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        /* Because of polymer/2558, this style has lower specificity than * */
        box-sizing: border-box !important;

        @apply --paper-icon-button;
      }

      :host #ink {
        color: var(--paper-icon-button-ink-color, var(--primary-text-color));
        opacity: 0.6;
      }

      :host([disabled]) {
        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));
        pointer-events: none;
        cursor: auto;

        @apply --paper-icon-button-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:hover) {
        @apply --paper-icon-button-hover;
      }

      iron-icon {
        --iron-icon-width: 100%;
        --iron-icon-height: 100%;
      }
    </style>

    <iron-icon id="icon" src="[[src]]" icon="[[icon]]"
               alt$="[[alt]]"></iron-icon>
  `,hostAttributes:{role:"button",tabindex:"0"},behaviors:[n.a],registered:function(){this._template.setAttribute("strip-whitespace","")},properties:{src:{type:String},icon:{type:String},alt:{type:String,observer:"_altChanged"}},_altChanged:function(e,t){var i=this.getAttribute("aria-label");i&&t!=i||this.setAttribute("aria-label",e)}})},function(e,t,i){"use strict";i(5),i(23);var n=i(22),r=i(19),a=i(26),s=i(7),o=i(4),l=i(3);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Object(s.a)({_template:l.a`
    <style>
      :host {
        @apply --layout-inline;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --layout-flex-auto;

        position: relative;
        padding: 0 12px;
        overflow: hidden;
        cursor: pointer;
        vertical-align: middle;

        @apply --paper-font-common-base;
        @apply --paper-tab;
      }

      :host(:focus) {
        outline: none;
      }

      :host([link]) {
        padding: 0;
      }

      .tab-content {
        height: 100%;
        transform: translateZ(0);
          -webkit-transform: translateZ(0);
        transition: opacity 0.1s cubic-bezier(0.4, 0.0, 1, 1);
        @apply --layout-horizontal;
        @apply --layout-center-center;
        @apply --layout-flex-auto;
        @apply --paper-tab-content;
      }

      :host(:not(.iron-selected)) > .tab-content {
        opacity: 0.8;

        @apply --paper-tab-content-unselected;
      }

      :host(:focus) .tab-content {
        opacity: 1;
        font-weight: 700;

        @apply --paper-tab-content-focused;
      }

      paper-ripple {
        color: var(--paper-tab-ink, var(--paper-yellow-a100));
      }

      .tab-content > ::slotted(a) {
        @apply --layout-flex-auto;

        height: 100%;
      }
    </style>

    <div class="tab-content">
      <slot></slot>
    </div>
`,is:"paper-tab",behaviors:[r.a,n.a,a.a],properties:{link:{type:Boolean,value:!1,reflectToAttribute:!0}},hostAttributes:{role:"tab"},listeners:{down:"_updateNoink",tap:"_onTap"},attached:function(){this._updateNoink()},get _parentNoink(){var e=Object(o.a)(this).parentNode;return!!e&&!!e.noink},_updateNoink:function(){this.noink=!!this.noink||!!this._parentNoink},_onTap:function(e){if(this.link){var t=this.queryEffectiveChildren("a");if(!t)return;if(e.target===t)return;t.click()}}})},function(e,t,i){"use strict";i(5),i(61);var n=i(7),r=i(3),a=i(51);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({_template:r.a`
    <style>
      :host {
        display: inline-block;
        float: right;

        @apply --paper-font-caption;
        @apply --paper-input-char-counter;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host(:dir(rtl)) {
        float: left;
      }
    </style>

    <span>[[_charCounterStr]]</span>
`,is:"paper-input-char-counter",behaviors:[a.a],properties:{_charCounterStr:{type:String,value:"0"}},update:function(e){if(e.inputElement){e.value=e.value||"";var t=e.value.toString().length.toString();e.inputElement.hasAttribute("maxlength")&&(t+="/"+e.inputElement.getAttribute("maxlength")),this._charCounterStr=t}}})},function(e,t,i){"use strict";i(5),i(23),i(31),i(61);var n=i(7),r=i(4),a=i(20),s=i(3);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const o=s.a`
<custom-style>
  <style is="custom-style">
    html {
      --paper-input-container-shared-input-style: {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: var(--paper-input-container-input-align, bottom);

        @apply --paper-font-subhead;
      };
    }
  </style>
</custom-style>
`;o.setAttribute("style","display: none;"),document.head.appendChild(o.content),Object(n.a)({_template:s.a`
    <style>
      :host {
        display: block;
        padding: 8px 0;
        @apply --paper-input-container;
      }

      :host([inline]) {
        display: inline-block;
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.33;

        @apply --paper-input-container-disabled;
      }

      :host([hidden]) {
        display: none !important;
      }

      [hidden] {
        display: none !important;
      }

      .floated-label-placeholder {
        @apply --paper-font-caption;
      }

      .underline {
        height: 2px;
        position: relative;
      }

      .focused-line {
        @apply --layout-fit;
        border-bottom: 2px solid var(--paper-input-container-focus-color, var(--primary-color));

        -webkit-transform-origin: center center;
        transform-origin: center center;
        -webkit-transform: scale3d(0,1,1);
        transform: scale3d(0,1,1);

        @apply --paper-input-container-underline-focus;
      }

      .underline.is-highlighted .focused-line {
        -webkit-transform: none;
        transform: none;
        -webkit-transition: -webkit-transform 0.25s;
        transition: transform 0.25s;

        @apply --paper-transition-easing;
      }

      .underline.is-invalid .focused-line {
        border-color: var(--paper-input-container-invalid-color, var(--error-color));
        -webkit-transform: none;
        transform: none;
        -webkit-transition: -webkit-transform 0.25s;
        transition: transform 0.25s;

        @apply --paper-transition-easing;
      }

      .unfocused-line {
        @apply --layout-fit;
        border-bottom: 1px solid var(--paper-input-container-color, var(--secondary-text-color));
        @apply --paper-input-container-underline;
      }

      :host([disabled]) .unfocused-line {
        border-bottom: 1px dashed;
        border-color: var(--paper-input-container-color, var(--secondary-text-color));
        @apply --paper-input-container-underline-disabled;
      }

      .input-wrapper {
        @apply --layout-horizontal;
        @apply --layout-center;
        position: relative;
      }

      .input-content {
        @apply --layout-flex-auto;
        @apply --layout-relative;
        max-width: 100%;
      }

      .input-content ::slotted(label),
      .input-content ::slotted(.paper-input-label) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font: inherit;
        color: var(--paper-input-container-color, var(--secondary-text-color));
        -webkit-transition: -webkit-transform 0.25s, width 0.25s;
        transition: transform 0.25s, width 0.25s;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        /* Fix for safari not focusing 0-height date/time inputs with -webkit-apperance: none; */
        min-height: 1px;

        @apply --paper-font-common-nowrap;
        @apply --paper-font-subhead;
        @apply --paper-input-container-label;
        @apply --paper-transition-easing;
      }

      .input-content.label-is-floating ::slotted(label),
      .input-content.label-is-floating ::slotted(.paper-input-label) {
        -webkit-transform: translateY(-75%) scale(0.75);
        transform: translateY(-75%) scale(0.75);

        /* Since we scale to 75/100 of the size, we actually have 100/75 of the
        original space now available */
        width: 133%;

        @apply --paper-input-container-label-floating;
      }

      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(label),
      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(.paper-input-label) {
        right: 0;
        left: auto;
        -webkit-transform-origin: right top;
        transform-origin: right top;
      }

      .input-content.label-is-highlighted ::slotted(label),
      .input-content.label-is-highlighted ::slotted(.paper-input-label) {
        color: var(--paper-input-container-focus-color, var(--primary-color));

        @apply --paper-input-container-label-focus;
      }

      .input-content.is-invalid ::slotted(label),
      .input-content.is-invalid ::slotted(.paper-input-label) {
        color: var(--paper-input-container-invalid-color, var(--error-color));
      }

      .input-content.label-is-hidden ::slotted(label),
      .input-content.label-is-hidden ::slotted(.paper-input-label) {
        visibility: hidden;
      }

      .input-content ::slotted(input),
      .input-content ::slotted(iron-input),
      .input-content ::slotted(textarea),
      .input-content ::slotted(iron-autogrow-textarea),
      .input-content ::slotted(.paper-input-input) {
        @apply --paper-input-container-shared-input-style;
        /* The apply shim doesn't apply the nested color custom property,
          so we have to re-apply it here. */
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        @apply --paper-input-container-input;
      }

      .input-content ::slotted(input)::-webkit-outer-spin-button,
      .input-content ::slotted(input)::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      .input-content.focused ::slotted(input),
      .input-content.focused ::slotted(iron-input),
      .input-content.focused ::slotted(textarea),
      .input-content.focused ::slotted(iron-autogrow-textarea),
      .input-content.focused ::slotted(.paper-input-input) {
        @apply --paper-input-container-input-focus;
      }

      .input-content.is-invalid ::slotted(input),
      .input-content.is-invalid ::slotted(iron-input),
      .input-content.is-invalid ::slotted(textarea),
      .input-content.is-invalid ::slotted(iron-autogrow-textarea),
      .input-content.is-invalid ::slotted(.paper-input-input) {
        @apply --paper-input-container-input-invalid;
      }

      .prefix ::slotted(*) {
        display: inline-block;
        @apply --paper-font-subhead;
        @apply --layout-flex-none;
        @apply --paper-input-prefix;
      }

      .suffix ::slotted(*) {
        display: inline-block;
        @apply --paper-font-subhead;
        @apply --layout-flex-none;

        @apply --paper-input-suffix;
      }

      /* Firefox sets a min-width on the input, which can cause layout issues */
      .input-content ::slotted(input) {
        min-width: 0;
      }

      .input-content ::slotted(textarea) {
        resize: none;
      }

      .add-on-content {
        position: relative;
      }

      .add-on-content.is-invalid ::slotted(*) {
        color: var(--paper-input-container-invalid-color, var(--error-color));
      }

      .add-on-content.is-highlighted ::slotted(*) {
        color: var(--paper-input-container-focus-color, var(--primary-color));
      }
    </style>

    <div class="floated-label-placeholder" aria-hidden="true" hidden="[[noLabelFloat]]">&nbsp;</div>

    <div class="input-wrapper">
      <span class="prefix"><slot name="prefix"></slot></span>

      <div class$="[[_computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent)]]" id="labelAndInputContainer">
        <slot name="label"></slot>
        <slot name="input"></slot>
      </div>

      <span class="suffix"><slot name="suffix"></slot></span>
    </div>

    <div class$="[[_computeUnderlineClass(focused,invalid)]]">
      <div class="unfocused-line"></div>
      <div class="focused-line"></div>
    </div>

    <div class$="[[_computeAddOnContentClass(focused,invalid)]]">
      <slot name="add-on"></slot>
    </div>
`,is:"paper-input-container",properties:{noLabelFloat:{type:Boolean,value:!1},alwaysFloatLabel:{type:Boolean,value:!1},attrForValue:{type:String,value:"bind-value"},autoValidate:{type:Boolean,value:!1},invalid:{observer:"_invalidChanged",type:Boolean,value:!1},focused:{readOnly:!0,type:Boolean,value:!1,notify:!0},_addons:{type:Array},_inputHasContent:{type:Boolean,value:!1},_inputSelector:{type:String,value:"input,iron-input,textarea,.paper-input-input"},_boundOnFocus:{type:Function,value:function(){return this._onFocus.bind(this)}},_boundOnBlur:{type:Function,value:function(){return this._onBlur.bind(this)}},_boundOnInput:{type:Function,value:function(){return this._onInput.bind(this)}},_boundValueChanged:{type:Function,value:function(){return this._onValueChanged.bind(this)}}},listeners:{"addon-attached":"_onAddonAttached","iron-input-validate":"_onIronInputValidate"},get _valueChangedEvent(){return this.attrForValue+"-changed"},get _propertyForValue(){return Object(a.b)(this.attrForValue)},get _inputElement(){return Object(r.a)(this).querySelector(this._inputSelector)},get _inputElementValue(){return this._inputElement[this._propertyForValue]||this._inputElement.value},ready:function(){this.__isFirstValueUpdate=!0,this._addons||(this._addons=[]),this.addEventListener("focus",this._boundOnFocus,!0),this.addEventListener("blur",this._boundOnBlur,!0)},attached:function(){this.attrForValue?this._inputElement.addEventListener(this._valueChangedEvent,this._boundValueChanged):this.addEventListener("input",this._onInput),this._inputElementValue&&""!=this._inputElementValue?this._handleValueAndAutoValidate(this._inputElement):this._handleValue(this._inputElement)},_onAddonAttached:function(e){this._addons||(this._addons=[]);var t=e.target;-1===this._addons.indexOf(t)&&(this._addons.push(t),this.isAttached&&this._handleValue(this._inputElement))},_onFocus:function(){this._setFocused(!0)},_onBlur:function(){this._setFocused(!1),this._handleValueAndAutoValidate(this._inputElement)},_onInput:function(e){this._handleValueAndAutoValidate(e.target)},_onValueChanged:function(e){var t=e.target;this.__isFirstValueUpdate&&(this.__isFirstValueUpdate=!1,void 0===t.value||""===t.value)||this._handleValueAndAutoValidate(e.target)},_handleValue:function(e){var t=this._inputElementValue;t||0===t||"number"===e.type&&!e.checkValidity()?this._inputHasContent=!0:this._inputHasContent=!1,this.updateAddons({inputElement:e,value:t,invalid:this.invalid})},_handleValueAndAutoValidate:function(e){var t;this.autoValidate&&e&&(t=e.validate?e.validate(this._inputElementValue):e.checkValidity(),this.invalid=!t);this._handleValue(e)},_onIronInputValidate:function(e){this.invalid=this._inputElement.invalid},_invalidChanged:function(){this._addons&&this.updateAddons({invalid:this.invalid})},updateAddons:function(e){for(var t,i=0;t=this._addons[i];i++)t.update(e)},_computeInputContentClass:function(e,t,i,n,r){var a="input-content";if(e)r&&(a+=" label-is-hidden"),n&&(a+=" is-invalid");else{var s=this.querySelector("label");t||r?(a+=" label-is-floating",this.$.labelAndInputContainer.style.position="static",n?a+=" is-invalid":i&&(a+=" label-is-highlighted")):(s&&(this.$.labelAndInputContainer.style.position="relative"),n&&(a+=" is-invalid"))}return i&&(a+=" focused"),a},_computeUnderlineClass:function(e,t){var i="underline";return t?i+=" is-invalid":e&&(i+=" is-highlighted"),i},_computeAddOnContentClass:function(e,t){var i="add-on-content";return t?i+=" is-invalid":e&&(i+=" is-highlighted"),i}})},function(e,t,i){"use strict";i(5),i(31),i(61);var n=i(7),r=i(3),a=i(51);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({_template:r.a`
    <style>
      :host {
        display: inline-block;
        visibility: hidden;

        color: var(--paper-input-container-invalid-color, var(--error-color));

        @apply --paper-font-caption;
        @apply --paper-input-error;
        position: absolute;
        left:0;
        right:0;
      }

      :host([invalid]) {
        visibility: visible;
      }

      #a11yWrapper {
        visibility: hidden;
      }

      :host([invalid]) #a11yWrapper {
        visibility: visible;
      }
    </style>

    <!--
    If the paper-input-error element is directly referenced by an
    \`aria-describedby\` attribute, such as when used as a paper-input add-on,
    then applying \`visibility: hidden;\` to the paper-input-error element itself
    does not hide the error.

    For more information, see:
    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description
    -->
    <div id="a11yWrapper">
      <slot></slot>
    </div>
`,is:"paper-input-error",behaviors:[a.a],properties:{invalid:{readOnly:!0,reflectToAttribute:!0,type:Boolean}},update:function(e){this._setInvalid(e.invalid)}})},function(e,t){const i=document.createElement("div");i.setAttribute("style","display: none;"),i.innerHTML='\n  <dom-module id="mdc-select-style">\n  <template>\n  <style is="mdc-select-style">\n      \n\n\n\n\n\n/* materialize select styles */\n  .mdc-select {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: var(--tangy-select-container-font-size, 1rem);\n    width: 100%;\n    line-height: var(--tangy-select-container-line-height, 1.75rem);\n    font-weight: 400;\n    letter-spacing: 0.04em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    /* @alternate */\n    color: rgba(0, 0, 0, 0.87);\n    color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    position: relative;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    height: var(--tangy-select-container-height, 56px);\n    border: none;\n    border-radius: 4px 4px 0 0;\n    outline: none;\n    background-repeat: no-repeat;\n    background-position: right 10px center;\n    cursor: pointer;\n    overflow: visible; }\n    [dir="rtl"] .mdc-select, .mdc-select[dir="rtl"] {\n      background-position: left 10px center; }\n    .mdc-select--theme-dark .mdc-select,\n    .mdc-theme--dark .mdc-select {\n      background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);\n      background-color: rgba(255, 255, 255, 0.1); }\n    .mdc-select__menu {\n      position: fixed;\n      top: 0;\n      left: 0;\n      max-height: 100%;\n      -webkit-transform-origin: center center;\n              transform-origin: center center;\n      z-index: 4; }\n    .mdc-select__surface {\n      font-family: Roboto, sans-serif;\n      -moz-osx-font-smoothing: grayscale;\n      -webkit-font-smoothing: antialiased;\n      font-size: var(--tangy-select-font-size, 1rem);\n      line-height: var(--tangy-select-line-height, 1.75rem);\n      font-weight: 400;\n      letter-spacing: 0.04em;\n      text-decoration: inherit;\n      text-transform: inherit;\n      /* @alternate */\n      color: rgba(0, 0, 0, 0.87);\n      color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));\n      padding-left: var(--tangy-select-padding-left, 16px);\n      padding-right: var(--tangy-select-padding-right, 26px);\n      --mdc-ripple-fg-size: 0;\n      --mdc-ripple-left: 0;\n      --mdc-ripple-top: 0;\n      --mdc-ripple-fg-scale: 1;\n      --mdc-ripple-fg-translate-end: 0;\n      --mdc-ripple-fg-translate-start: 0;\n      -webkit-tap-highlight-color: transparent;\n      will-change: transform, opacity;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      position: relative;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1;\n      width: 100%;\n      height: var(--tangy-select-height, 56px);\n      border: none;\n      border-radius: var(--tangy-select-border-radius, 4px 4px 0 0);\n      outline: none;\n      background-color: var(--tangy-select-background-color, rgba(0, 0, 0, 0.04));\n      -webkit-appearance: none;\n         -moz-appearance: none;\n              appearance: none;\n      overflow: hidden;}\n      [dir="rtl"] .mdc-select .mdc-select__surface,\n      .mdc-select[dir="rtl"] .mdc-select__surface {\n        padding-left: 26px;\n        padding-right: 16px; }\n      .mdc-select__surface::before, .mdc-select__surface::after {\n        position: absolute;\n        border-radius: 50%;\n        opacity: 0;\n        pointer-events: none;\n        content: ""; }\n      .mdc-select__surface::before {\n        -webkit-transition: opacity 15ms linear;\n        transition: opacity 15ms linear; }\n      .mdc-select__surface.mdc-ripple-upgraded::after {\n        top: 0;\n        left: 0;\n        -webkit-transform: scale(0);\n                transform: scale(0);\n        -webkit-transform-origin: center center;\n                transform-origin: center center; }\n      .mdc-select__surface.mdc-ripple-upgraded--unbounded::after {\n        top: var(--mdc-ripple-top, 0);\n        left: var(--mdc-ripple-left, 0); }\n      .mdc-select__surface.mdc-ripple-upgraded--foreground-activation::after {\n        -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;\n                animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n      .mdc-select__surface.mdc-ripple-upgraded--foreground-deactivation::after {\n        -webkit-animation: 150ms mdc-ripple-fg-opacity-out;\n                animation: 150ms mdc-ripple-fg-opacity-out;\n        -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));\n                transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n      .mdc-select__surface::before, .mdc-select__surface::after {\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%; }\n      .mdc-select__surface.mdc-ripple-upgraded::before {\n        top: calc(50% - 100%);\n        left: calc(50% - 100%);\n        width: 200%;\n        height: 200%;\n        -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));\n                transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n      .mdc-select__surface.mdc-ripple-upgraded--unbounded::before {\n        top: var(--mdc-ripple-top, calc(50% - 50%));\n        left: var(--mdc-ripple-left, calc(50% - 50%));\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: var(--mdc-ripple-fg-size, 100%);\n        -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));\n                transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n      .mdc-select__surface.mdc-ripple-upgraded::after {\n        width: var(--mdc-ripple-fg-size, 100%);\n        height: var(--mdc-ripple-fg-size, 100%); }\n      .mdc-select__surface::before, .mdc-select__surface::after {\n        background-color: black; }\n      .mdc-select__surface:hover::before {\n        opacity: 0.04; }\n      .mdc-select__surface:not(.mdc-ripple-upgraded):focus::before, .mdc-select__surface.mdc-ripple-upgraded--background-focused::before {\n        -webkit-transition-duration: 75ms;\n                transition-duration: 75ms;\n        opacity: 0.12; }\n      .mdc-select__surface:not(.mdc-ripple-upgraded)::after {\n        -webkit-transition: opacity 150ms linear;\n        transition: opacity 150ms linear; }\n      .mdc-select__surface:not(.mdc-ripple-upgraded):active::after {\n        -webkit-transition-duration: 75ms;\n                transition-duration: 75ms;\n        opacity: 0.16; }\n      .mdc-select__surface.mdc-ripple-upgraded {\n        --mdc-ripple-fg-opacity: 0.16; }\n      .mdc-select--theme-dark .mdc-select__surface::before, .mdc-select--theme-dark .mdc-select__surface::after,\n      .mdc-theme--dark .mdc-select__surface::before,\n      .mdc-theme--dark .mdc-select__surface::after {\n        background-color: white; }\n      .mdc-select--theme-dark .mdc-select__surface:hover::before,\n      .mdc-theme--dark .mdc-select__surface:hover::before {\n        opacity: 0.08; }\n      .mdc-select--theme-dark .mdc-select__surface:not(.mdc-ripple-upgraded):focus::before, .mdc-select--theme-dark .mdc-select__surface.mdc-ripple-upgraded--background-focused::before,\n      .mdc-theme--dark .mdc-select__surface:not(.mdc-ripple-upgraded):focus::before,\n      .mdc-theme--dark .mdc-select__surface.mdc-ripple-upgraded--background-focused::before {\n        -webkit-transition-duration: 75ms;\n                transition-duration: 75ms;\n        opacity: 0.24; }\n      .mdc-select--theme-dark .mdc-select__surface:not(.mdc-ripple-upgraded)::after,\n      .mdc-theme--dark .mdc-select__surface:not(.mdc-ripple-upgraded)::after {\n        -webkit-transition: opacity 150ms linear;\n        transition: opacity 150ms linear; }\n      .mdc-select--theme-dark .mdc-select__surface:not(.mdc-ripple-upgraded):active::after,\n      .mdc-theme--dark .mdc-select__surface:not(.mdc-ripple-upgraded):active::after {\n        -webkit-transition-duration: 75ms;\n                transition-duration: 75ms;\n        opacity: 0.32; }\n      .mdc-select--theme-dark .mdc-select__surface.mdc-ripple-upgraded,\n      .mdc-theme--dark .mdc-select__surface.mdc-ripple-upgraded {\n        --mdc-ripple-fg-opacity: 0.32; }\n      .mdc-select__surface::-ms-expand {\n        display: none; }\n    .mdc-select__label {\n      left: 16px;\n      right: initial;\n      position: absolute;\n      bottom: 12px;\n      -webkit-transform-origin: left top;\n              transform-origin: left top;\n      -webkit-transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      color: rgba(0, 0, 0, 0.6);\n      pointer-events: none;\n      will-change: transform; }\n      [dir="rtl"] .mdc-select__label, .mdc-select__label[dir="rtl"] {\n        left: initial;\n        right: 16px; }\n      .mdc-select--theme-dark .mdc-select__label,\n      .mdc-theme--dark .mdc-select__label {\n        /* @alternate */\n        color: rgba(255, 255, 255, 0.7);\n        color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }\n      [dir="rtl"] .mdc-select .mdc-select__label,\n      .mdc-select[dir="rtl"] .mdc-select__label {\n        -webkit-transform-origin: right top;\n                transform-origin: right top; }\n      .mdc-select__label--float-above {\n        -webkit-transform: translateY(-40%) scale(0.75, 0.75);\n                transform: translateY(-40%) scale(0.75, 0.75); }\n    .mdc-select__selected-text {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: end;\n          -ms-flex-align: end;\n              align-items: flex-end;\n      margin-bottom: 6px;\n      -webkit-transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n      transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n      transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n      transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);\n      white-space: nowrap;\n      overflow: hidden; }\n      .mdc-select--theme-dark .mdc-select__selected-text,\n      .mdc-theme--dark .mdc-select__selected-text {\n        /* @alternate */\n        color: rgba(255, 255, 255, 0.7);\n        color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }\n    .mdc-select__bottom-line {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 1px;\n      -webkit-transform: scaleY(1);\n              transform: scaleY(1);\n      -webkit-transform-origin: bottom;\n              transform-origin: bottom;\n      -webkit-transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n      background-color: var(--tangy-select-bottom-line-background-color, rgba(0, 0, 0, 0.5)); }\n      .mdc-select__bottom-line::after {\n        /* @alternate */\n        background-color: var(--primary-color);\n        position: absolute;\n        bottom: -1px;\n        left: 0;\n        width: 100%;\n        height: 2px;\n        -webkit-transform: scaleX(0);\n                transform: scaleX(0);\n        -webkit-transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n        transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);\n        opacity: 0;\n        content: "";\n        z-index: 2; }\n    .mdc-select__bottom-line--active::after {\n      -webkit-transform: scaleX(1);\n              transform: scaleX(1);\n      opacity: 1; }\n    .mdc-select__surface:focus .mdc-select__bottom-line,\n    .mdc-select__surface:focus ~ .mdc-select__bottom-line {\n      /* @alternate */\n      background-color: var(--primary-color);\n      -webkit-transform: scaleY(2);\n              transform: scaleY(2); }\n      .mdc-select__surface:focus .mdc-select__bottom-line::after,\n      .mdc-select__surface:focus ~ .mdc-select__bottom-line::after {\n        opacity: 1; }\n  .mdc-select--open .mdc-select__surface::before {\n    opacity: 0.12; }\n    .mdc-select--theme-dark .mdc-select--open .mdc-select__surface::before,\n    .mdc-theme--dark .mdc-select--open .mdc-select__surface::before {\n      opacity: 0.24; }\n  .mdc-select--open .mdc-select__selected-text {\n    -webkit-transform: translateY(8px);\n            transform: translateY(8px);\n    -webkit-transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);\n    opacity: 0; }\n  .mdc-select--open .mdc-select__bottom-line {\n    /* @alternate */\n    background-color: var(--primary-color);\n    -webkit-transform: scaleY(2);\n            transform: scaleY(2); }\n    .mdc-select--open .mdc-select__bottom-line::after {\n      opacity: 1; }\n  .mdc-select--disabled,\n  .mdc-select[disabled] {\n    /* @alternate */\n    color: rgba(0, 0, 0, 0.38);\n    color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));\n    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.38%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);\n    border-bottom-width: 1px;\n    border-bottom-style: dotted;\n    opacity: .38;\n    cursor: default;\n    pointer-events: none;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none; }\n    .mdc-select--disabled .mdc-select__bottom-line,\n    .mdc-select[disabled] .mdc-select__bottom-line {\n      display: none; }\n  .mdc-select--theme-dark.mdc-select--disabled,\n  .mdc-theme--dark .mdc-select--disabled {\n    /* @alternate */\n    color: rgba(255, 255, 255, 0.5);\n    color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5));\n    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23ffffff%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.38%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);\n    border-bottom: 1px dotted rgba(255, 255, 255, 0.38); }\n  .mdc-select--theme-dark.mdc-select[disabled],\n  .mdc-theme--dark .mdc-select[disabled] {\n    /* @alternate */\n    color: rgba(255, 255, 255, 0.5);\n    color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5));\n    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23ffffff%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.38%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);\n    border-bottom: 1px dotted rgba(255, 255, 255, 0.38); }\n  .mdc-select__menu .mdc-list-item {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1rem;\n    line-height: 1.75rem;\n    font-weight: 400;\n    letter-spacing: 0.04em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    /* @alternate */\n    color: rgba(0, 0, 0, 0.54);\n    color: var(--mdc-theme-text-secondary-on-light, rgba(0, 0, 0, 0.54)); }\n    .mdc-select__menu .mdc-list-item[aria-selected="true"] {\n      /* @alternate */\n      color: rgba(0, 0, 0, 0.87);\n      color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)); }\n    .mdc-select--theme-dark .mdc-select__menu .mdc-list-item,\n    .mdc-theme--dark .mdc-select__menu .mdc-list-item {\n      /* @alternate */\n      color: rgba(255, 255, 255, 0.7);\n      color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }\n      .mdc-select--theme-dark .mdc-select__menu .mdc-list-item[aria-selected="true"],\n      .mdc-theme--dark .mdc-select__menu .mdc-list-item[aria-selected="true"] {\n        /* @alternate */\n        color: white;\n        color: var(--mdc-theme-text-primary-on-dark, white); }\n    .mdc-select__menu .mdc-list-item::before, .mdc-select__menu .mdc-list-item::after {\n      top: calc(50% - 50%);\n      left: calc(50% - 50%);\n      width: 100%;\n      height: 100%; }\n    .mdc-select__menu .mdc-list-item.mdc-ripple-upgraded::before {\n      top: calc(50% - 50%);\n      left: calc(50% - 50%);\n      width: 100%;\n      height: 100%;\n      -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));\n              transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-select__menu .mdc-list-item.mdc-ripple-upgraded--unbounded::before {\n      top: var(--mdc-ripple-top, calc(50% - 25%));\n      left: var(--mdc-ripple-left, calc(50% - 25%));\n      width: var(--mdc-ripple-fg-size, 50%);\n      height: var(--mdc-ripple-fg-size, 50%);\n      -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));\n              transform: scale(var(--mdc-ripple-fg-scale, 0)); }\n    .mdc-select__menu .mdc-list-item.mdc-ripple-upgraded::after {\n      width: var(--mdc-ripple-fg-size, 50%);\n      height: var(--mdc-ripple-fg-size, 50%); }\n    .mdc-select__menu .mdc-list-item::before, .mdc-select__menu .mdc-list-item::after {\n      border-radius: 0; }\n  .mdc-select__menu .mdc-list-group,\n  .mdc-select__menu .mdc-list-group > .mdc-list-item:first-child {\n    margin-top: 12px; }\n  .mdc-select__menu .mdc-list-group {\n    /* @alternate */\n    color: rgba(0, 0, 0, 0.38);\n    color: var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38));\n    font-weight: normal; }\n    .mdc-select__menu .mdc-list-group .mdc-list-item {\n      /* @alternate */\n      color: rgba(0, 0, 0, 0.87);\n      color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)); }\n  .mdc-select--theme-dark .mdc-select__menu .mdc-list-group,\n  .mdc-theme--dark .mdc-select__menu .mdc-list-group {\n    /* @alternate */\n    color: rgba(255, 255, 255, 0.5);\n    color: var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)); }\n    .mdc-select--theme-dark .mdc-select__menu .mdc-list-group .mdc-list-item,\n    .mdc-theme--dark .mdc-select__menu .mdc-list-group .mdc-list-item {\n      /* @alternate */\n      color: white;\n      color: var(--mdc-theme-text-primary-on-dark, white); }\n       .mdc-select option:checked, option:hover {\n      color: #ffffff;\n      background-color: var(--primary-color);\n   }\n\n    select option {\n      text-transform: capitalize;\n    }\n  /* End of Materialize Select Styles */\n\n  label:empty {\n    margin: 0;\n  }\n\n\n\n\n\n\n\n  </style>\n  </template>\n  </dom-module>\n',document.head.appendChild(i)},function(e,t,i){"use strict";i(5);var n=i(7),r=i(3);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const a=Object(n.a)({_template:r.a`
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,is:"iron-a11y-announcer",properties:{mode:{type:String,value:"polite"},_text:{type:String,value:""}},created:function(){a.instance||(a.instance=this),document.body.addEventListener("iron-announce",this._onIronAnnounce.bind(this))},announce:function(e){this._text="",this.async((function(){this._text=e}),100)},_onIronAnnounce:function(e){e.detail&&e.detail.text&&this.announce(e.detail.text)}});a.instance=null,a.requestAvailability=function(){a.instance||(a.instance=document.createElement("iron-a11y-announcer")),document.body.appendChild(a.instance)};var s=i(30),o=i(4);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({_template:r.a`
    <style>
      :host {
        display: inline-block;
      }
    </style>
    <slot id="content"></slot>
`,is:"iron-input",behaviors:[s.a],properties:{bindValue:{type:String,value:""},value:{type:String,computed:"_computeValue(bindValue)"},allowedPattern:{type:String},autoValidate:{type:Boolean,value:!1},_inputElement:Object},observers:["_bindValueChanged(bindValue, _inputElement)"],listeners:{input:"_onInput",keypress:"_onKeypress"},created:function(){a.requestAvailability(),this._previousValidInput="",this._patternAlreadyChecked=!1},attached:function(){this._observer=Object(o.a)(this).observeNodes(function(e){this._initSlottedInput()}.bind(this))},detached:function(){this._observer&&(Object(o.a)(this).unobserveNodes(this._observer),this._observer=null)},get inputElement(){return this._inputElement},_initSlottedInput:function(){this._inputElement=this.getEffectiveChildren()[0],this.inputElement&&this.inputElement.value&&(this.bindValue=this.inputElement.value),this.fire("iron-input-ready")},get _patternRegExp(){var e;if(this.allowedPattern)e=new RegExp(this.allowedPattern);else switch(this.inputElement.type){case"number":e=/[0-9.,e-]/}return e},_bindValueChanged:function(e,t){t&&(void 0===e?t.value=null:e!==t.value&&(this.inputElement.value=e),this.autoValidate&&this.validate(),this.fire("bind-value-changed",{value:e}))},_onInput:function(){this.allowedPattern&&!this._patternAlreadyChecked&&(this._checkPatternValidity()||(this._announceInvalidCharacter("Invalid string of characters not entered."),this.inputElement.value=this._previousValidInput));this.bindValue=this._previousValidInput=this.inputElement.value,this._patternAlreadyChecked=!1},_isPrintable:function(e){var t=8==e.keyCode||9==e.keyCode||13==e.keyCode||27==e.keyCode,i=19==e.keyCode||20==e.keyCode||45==e.keyCode||46==e.keyCode||144==e.keyCode||145==e.keyCode||e.keyCode>32&&e.keyCode<41||e.keyCode>111&&e.keyCode<124;return!(t||0==e.charCode&&i)},_onKeypress:function(e){if(this.allowedPattern||"number"===this.inputElement.type){var t=this._patternRegExp;if(t&&!(e.metaKey||e.ctrlKey||e.altKey)){this._patternAlreadyChecked=!0;var i=String.fromCharCode(e.charCode);this._isPrintable(e)&&!t.test(i)&&(e.preventDefault(),this._announceInvalidCharacter("Invalid character "+i+" not entered."))}}},_checkPatternValidity:function(){var e=this._patternRegExp;if(!e)return!0;for(var t=0;t<this.inputElement.value.length;t++)if(!e.test(this.inputElement.value[t]))return!1;return!0},validate:function(){if(!this.inputElement)return this.invalid=!1,!0;var e=this.inputElement.checkValidity();return e&&(this.required&&""===this.bindValue?e=!1:this.hasValidator()&&(e=s.a.validate.call(this,this.bindValue))),this.invalid=!e,this.fire("iron-input-validate"),e},_announceInvalidCharacter:function(e){this.fire("iron-announce",{text:e})},_computeValue:function(e){return e}});i(66),i(67),i(68);var l=i(37),c=(i(35),i(52));
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(n.a)({is:"paper-input",_template:r.a`
    <style>
      :host {
        display: block;
      }

      :host([focused]) {
        outline: none;
      }

      :host([hidden]) {
        display: none !important;
      }

      input {
        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;
      }

      /* In 1.x, the <input> is distributed to paper-input-container, which styles it.
      In 2.x the <iron-input> is distributed to paper-input-container, which styles
      it, but in order for this to work correctly, we need to reset some
      of the native input's properties to inherit (from the iron-input) */
      iron-input > input {
        @apply --paper-input-container-shared-input-style;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        line-height: inherit;
        text-shadow: inherit;
        color: inherit;
        cursor: inherit;
      }

      input:disabled {
        @apply --paper-input-container-input-disabled;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      input::-webkit-clear-button {
        @apply --paper-input-container-input-webkit-clear;
      }

      input::-webkit-calendar-picker-indicator {
        @apply --paper-input-container-input-webkit-calendar-picker-indicator;
      }

      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-ms-clear {
        @apply --paper-input-container-ms-clear;
      }

      input::-ms-reveal {
        @apply --paper-input-container-ms-reveal;
      }

      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      label {
        pointer-events: none;
      }
    </style>

    <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]">

      <slot name="prefix" slot="prefix"></slot>

      <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>

      <!-- Need to bind maxlength so that the paper-input-char-counter works correctly -->
      <iron-input bind-value="{{value}}" slot="input" class="input-element" id$="[[_inputId]]" maxlength$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">
        <input aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" disabled$="[[disabled]]" title$="[[title]]" type$="[[type]]" pattern$="[[pattern]]" required$="[[required]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]" min$="[[min]]" max$="[[max]]" step$="[[step]]" name$="[[name]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" list$="[[list]]" size$="[[size]]" autocapitalize$="[[autocapitalize]]" autocorrect$="[[autocorrect]]" on-change="_onChange" tabindex$="[[tabIndex]]" autosave$="[[autosave]]" results$="[[results]]" accept$="[[accept]]" multiple$="[[multiple]]">
      </iron-input>

      <slot name="suffix" slot="suffix"></slot>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
  `,behaviors:[c.a,l.a],properties:{value:{type:String}},get _focusableElement(){return this.inputElement._inputElement},listeners:{"iron-input-ready":"_onIronInputReady"},_onIronInputReady:function(){this.$.nativeInput||(this.$.nativeInput=this.$$("input")),this.inputElement&&-1!==this._typesThatHaveText.indexOf(this.$.nativeInput.type)&&(this.alwaysFloatLabel=!0),this.inputElement.bindValue&&this.$.container._handleValueAndAutoValidate(this.inputElement)}})},function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));const n={_id:"form-1",formId:"",collection:"TangyFormResponse",startDate:(new Date).toLocaleString(),items:[],inputs:[]},r=function(e=n,t){var i,r={},s=0;switch(t.type){case"FORM_OPEN":(i=Object.assign({},t.response)).items=t.itemsInDom.map(e=>{let t=i.items.find(t=>t.id===e.id),n={...e,...t};return t?n:e}),s=i.items.findIndex(e=>!1===e.disabled),i.items[s].hideBackButton=!0,-1!==i.items.findIndex(e=>!0===e.summary)&&(i.form.hasSummary=!0),i.form.complete||(i.form.linearMode=!0,i.form.hideClosedItems=!0);let n=i.items.length-([...i.items].reverse().findIndex(e=>!e.summary&&!e.disabled)+1);return i.items[n].hideNextButton=!0,i.items[n].showCompleteButton=!0,i.form.complete||i.items.find(e=>e.open)||(i.items[s].open=!0),!0===i.form.hideClosedItems&&i.items.forEach(e=>e.hidden=!e.open),!0===i.form.linearMode&&i.items.forEach(e=>e.hideButtons=!0),!0===i.form.fullscreen&&i.items.forEach(e=>e.fullscreen=!0),i;case"FORM_RESPONSE_COMPLETE":return Object.assign({},e,{complete:!0,form:Object.assign({},e.form,{complete:!0,linearMode:!1,hideClosedItems:!1,fullscreen:!1,fullscreenEnabled:!1}),items:e.items.map(e=>{let t={};return e.disabled?t.hidden=!0:(t.hidden=!1,t.open=!1,t.hideButtons=!1),e.summary||(t.locked=!0),t.hideBackButton=!0,t.hideNextButton=!0,t.fullscreen=!1,t.fullscreenEnabled=!1,t.inputs=e.inputs.map(e=>"TANGY-TIMED"===e.tagName?Object.assign({},e,{disabled:!0,mode:"TANGY_TIMED_MODE_DISABLED"}):"TANGY-UNTIMED-GRID"===e.tagName?Object.assign({},e,{disabled:!0,mode:"TANGY_UNTIMED_GRID_MODE_DISABLED"}):Object.assign({},e,{disabled:!0})),e.feedback&&(t.open=!0),Object.assign({},e,t)})});case"SHOW_RESPONSE":return Object.assign({},e,{form:Object.assign({},e.form,{tabIndex:1,showResponse:!0,showSummary:!1}),items:e.items.map(e=>e.summary?Object.assign({},e,{hidden:!0}):Object.assign({},e,{hidden:!1}))});case"SHOW_SUMMARY":return Object.assign({},e,{form:Object.assign({},e.form,{tabIndex:0,showResponse:!1,showSummary:!0}),items:e.items.map(e=>e.summary?Object.assign({},e,{open:!0,hidden:!1}):Object.assign({},e,{hidden:!0}))});case"ITEM_OPEN":return(i=Object.assign({},e)).focusIndex=i.items.findIndex(e=>e.id===t.itemId),Object.assign({},i,{items:e.items.map(e=>e.id==t.itemId?Object.assign({},e,{open:!0}):e)});case"ITEM_CHANGE":return i=Object.assign({},e),Object.assign({},i,{items:e.items.map(e=>e.id==t.itemId?Object.assign({},e,{isDirty:!0}):e)});case"ITEM_CLOSE":return r.itemIndex=e.items.findIndex(e=>e.id===t.itemId),i=Object.assign({},e),Object.assign(i,{progress:e.items.filter(e=>e.valid).length/e.items.length*100,items:e.items.map(e=>e.id==t.itemId?Object.assign({},e,{open:!1,isDirty:!1,valid:!0,hideButtons:!1}):Object.assign({},e))}),Object.assign(i,a(i)),i;case"ITEM_GO_TO":return a({...e,items:e.items.map(e=>({...e,open:e.id===t.itemId,hidden:e.id!==t.itemId}))});case"ITEM_BACK":case"ITEM_NEXT":return r.itemIndex=e.items.findIndex(e=>e.id===t.itemId),i=Object.assign({},e),Object.assign(i,a(i)),Object.assign(i,{progress:e.items.filter(e=>e.valid).length/e.items.filter(e=>!e.disabled).length*100,items:i.items.map(e=>{let n={};return e.id==t.itemId&&(n.open=!1),"ITEM_BACK"===t.type&&i.previousItemId===e.id&&(n.open=!0),"ITEM_NEXT"===t.type&&i.nextItemId===e.id&&(n.open=!0),!0!==i.form.hideClosedItems||n.open?n.hidden=!1:n.hidden=!0,Object.assign({},e,n)})}),Object.assign(i,a(i)),i;case"ITEM_ENABLE":return a(i=Object.assign({},e,{items:e.items.map(e=>e.id==t.itemId?Object.assign({},e,{disabled:!1}):e)}));case"ITEM_SAVE":i=Object.assign({},e,{items:e.items.map(e=>e.id==t.item.id?Object.assign({},e,t.item,{isDirty:!1}):e)});const o=t.item.inputs.find(e=>"location"===e.name&&"TANGY-LOCATION"===e.tagName);if(o)for(const e of o.value)i.location={...i.location,[e.level]:e.value};return i;case"ITEM_DISABLE":return a(i=Object.assign({},e,{items:e.items.map(e=>e.id==t.itemId?Object.assign({},e,{disabled:!0}):e)}));case"ENABLE_ITEM_READONLY":return Object.assign({},e,{items:e.items.map(e=>{let t={locked:!0};return t.inputs=e.inputs.map(e=>"TANGY-TIMED"===e.tagName?Object.assign({},e,{disabled:!0,mode:"TANGY_TIMED_MODE_DISABLED"}):"TANGY-UNTIMED-GRID"===e.tagName?Object.assign({},e,{disabled:!0,mode:"TANGY_UNTIMED_GRID_MODE_DISABLED"}):Object.assign({},e,{disabled:!0})),Object.assign({},e,t)})});case"DISABLE_ITEM_READONLY":return Object.assign({},e,{items:e.items.map(e=>{let t={locked:!1};return t.inputs=e.inputs.map(e=>"TANGY-TIMED"===e.tagName?Object.assign({},e,{disabled:!1,mode:"TANGY_TIMED_MODE_DISABLED"}):"TANGY-UNTIMED-GRID"===e.tagName?Object.assign({},e,{disabled:!1,mode:"TANGY_UNTIMED_GRID_MODE_DISABLED"}):Object.assign({},e,{disabled:!1})),Object.assign({},e,t)})});case"HIDE_ITEM_BUTTONS":return i=Object.assign({},e,{items:e.items.map(e=>(e.hideButtons=!0,e))});case"SHOW_ITEM_BUTTONS":return i=Object.assign({},e,{items:e.items.map(e=>(e.hideButtons=!1,e))});case"ENTER_FULLSCREEN":return{...e,form:{...e.form,fullscreenEnabled:!0,exitClicks:e.form.exitClicks},items:e.items.map(t=>({...t,fullscreenEnabled:!0,exitClicks:e.form.exitClicks}))};case"EXIT_FULLSCREEN":return{...e,form:{...e.form,fullscreenEnabled:!1},items:e.items.map(e=>({...e,fullscreenEnabled:!1}))};default:return e}return e};function a(e){let t={},i=Object.assign({},e);i.focusIndex=i.items.findIndex(e=>e.open),i.nextFocusIndex=e.items.findIndex((e,t)=>t>i.focusIndex&&(!e.hasOwnProperty("disabled")||!1===e.disabled)),i.items.reverse(),t.focusIndexReversed=i.items.length-i.focusIndex-1,i.previousFocusIndex=i.items.findIndex((e,i)=>i>t.focusIndexReversed&&(!e.hasOwnProperty("disabled")||!1===e.disabled)),-1!==i.previousFocusIndex&&(i.previousFocusIndex=i.items.length-i.previousFocusIndex-1),i.items.reverse(),-1!==i.nextFocusIndex?i.nextItemId=i.items[i.nextFocusIndex].id:i.nextItemId=void 0,-1!==i.previousFocusIndex?i.previousItemId=i.items[i.previousFocusIndex].id:i.previousItemId=void 0;let n=i.items.length-([...i.items].reverse().findIndex(e=>!e.summary&&!e.disabled)+1);return i.items=i.items.map((e,t)=>Object.assign({},e,{showCompleteButton:n===t})),i}},function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));class n{constructor(e){this._id=function(){var e,t,i="";for(e=0;e<32;e++)t=16*Math.random()|0,8!=e&&12!=e&&16!=e&&20!=e||(i+="-"),i+=(12==e?4:16==e?3&t|8:t).toString(16);return i}(),this.collection="TangyFormResponse",this.form={},this.items=[],this.complete=!1,this.focusIndex=0,this.nextFocusIndex=1,this.previousFocusIndex=-1,this.startDatetime=(new Date).toLocaleString(),this.startUnixtime=Date.now(),this.uploadDatetime="",this.location={},e&&e.hasOwnProperty("inputs")&&delete e.inputs,Object.assign(this,e)}get inputs(){return this.items.reduce((e,t)=>(t.inputs.forEach(t=>{"TANGY-CARDS"===t.tagName?t.value.forEach(t=>t.value.forEach(t=>e.push(t))):e.push(t)}),e),[])}get inputsByName(){return this.inputs.reduce((e,t)=>(e.hasOwnProperty(t.name)?Array.isArray(e[t.name])?e[t.name]=e[t.name].push(t):e[t.name]=[t,e[t.name]]:e[t.name]=t,e),{})}}},function(e,t,i){!function(e){
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])};function i(e,t){void 0===t&&(t=e.constructor);var i=Error.captureStackTrace;i&&i(e,t)}var n=function(e){function n(t){var n,r,a,s=this.constructor,o=e.call(this,t)||this;return Object.defineProperty(o,"name",{value:s.name,enumerable:!1}),n=o,r=s.prototype,(a=Object.setPrototypeOf)?a(n,r):n.__proto__=r,i(o),o}return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}(n,e),n}(Error);e.CustomError=n,e.customErrorFactory=function(e,t){function n(){for(var r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];if(!(this instanceof n))return new(n.bind.apply(n,[void 0].concat(r)));t.apply(this,r),e.apply(this,r),this.name=e.name||t.name,i(this,n)}return void 0===t&&(t=Error),Object.defineProperties(n,{prototype:{value:Object.create(t.prototype,{constructor:{value:n,writable:!0,configurable:!0}})}})}}(t)},function(module,__webpack_exports__,__webpack_require__){"use strict";var _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_polymer_polymer_lib_utils_render_status_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(32),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(11),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_2__),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(9),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_3__),_util_t_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(1),_tangy_form_reducer_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(71),_tangy_form_response_model_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(72),_tangy_form_item_callback_helpers_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(48),_tangy_form_item_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(75),_tangy_complete_button_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(76),_tangy_overlay_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(77),_tangy_input_groups_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(78),_tangy_input_group_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(63),_tangy_list_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(88),_tangy_template_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(79),_polymer_paper_fab_paper_fab_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(80),_polymer_paper_icon_button_paper_icon_button_js__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(64),_polymer_paper_tabs_paper_tab_js__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(65),_polymer_paper_tabs_paper_tabs_js__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(87),translation_web_component_t_lang_js__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(81);class TangyForm extends _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.a{getMeta(){return{form:this.getProps(),items:[...this.querySelectorAll("tangy-form-item")].map(e=>({...e.getProps(),inputs:e.getInputsMeta()}))}}newResponse(){let e=new _tangy_form_response_model_js__WEBPACK_IMPORTED_MODULE_6__.a;e.form=this.getProps(),this.querySelectorAll("tangy-form-item").forEach(t=>{e.items.push(t.getProps())}),this.response=e}set response(e){this._responseHasBeenSet=!0,this.store.dispatch({type:"FORM_OPEN",response:e,itemsInDom:[...this.querySelectorAll("tangy-form-item")].map(e=>e.getProps())}),this.fireHook("on-open")}get response(){return this._responseHasBeenSet?this.store.getState():null}get inputs(){return this.response.items.reduce((e,t)=>[...e,...t.inputs],[])}get values(){return this.inputs.reduce((e,t)=>Object.assign({},e,{[t.name]:t.value}),{})}getValue(e){let t=this.store.getState(),i=[];t.items.forEach(e=>i=[...i,...e.inputs]);let n=i.find(t=>t.name===e&&t.value);if(n&&"object"==typeof n.value){let e=[];return n.value.forEach(t=>{t.value&&e.push(t.name)}),e}return n&&n.hasOwnProperty("value")?n.value:""}next(){this.querySelector('tangy-form-item[open=""]').next()}back(){this.querySelector('tangy-form-item[open=""]').back()}itemDisable(e){let t=this.store.getState().items.find(t=>e===t.id);t&&!t.disabled&&this.store.dispatch({type:"ITEM_DISABLE",itemId:e})}itemEnable(e){let t=this.store.getState().items.find(t=>e===t.id);t&&t.disabled&&this.store.dispatch({type:"ITEM_ENABLE",itemId:e})}enableItemReadOnly(){this.store.dispatch({type:"ENABLE_ITEM_READONLY"})}disableItemReadOnly(){this.store.dispatch({type:"DISABLE_ITEM_READONLY"})}hideItemButtons(){this.store.dispatch({type:"HIDE_ITEM_BUTTONS"})}showItemButtons(){this.store.dispatch({type:"SHOW_ITEM_BUTTONS"})}static get template(){return _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.b`
     
      <style include="tangy-common-styles"></style>
        
      <style>
        :host {
          width: 100%;
          display: block;
          margin: 0px;
          padding: 0px;
        }
        #previousItemButton,
        #nextItemButton {
            position: relative;
            color: #ffffff;
        }
        
        #previousItemButton[disabled],
        #nextItemButton[disabled] {
            color: #979797;
        }
        #previousItemButton {
          float: left;
        }
        #nextItemButton {
          float: right;
        }
        #markCompleteFab, #lockedFab {
          position: fixed;
          right: 7px;
          top: 24px;
        }

        #markCompleteButton {
          position: fixed;
          right: 7px;
          bottom: 2px;
          color: var(--accent-text-color);
        }

        #markCompleteFab {}
        :host(:not([linear-mode])) #nextItemButton,
        :host(:not([linear-mode])) #previousItemButton
         {
          display: none;
        }
        :host([hide-complete-fab]) #markCompleteFab {
          display: none !important;
        }
        #progress {
          position: fixed;
          bottom: 0px;
        }
        paper-progress {
          width: 100%;
        }
        #bar {
          width:100%;
          background-color: var(--primary-color);
          color: var(--accent-color);
        }
        #bar-filler {
          height: 45px;
        }
      
      #markCompleteButton,
      #previousItemButton,
      #nextItemButton {
        padding: 0;
        color: var(--accent-color);
        --paper-fab-iron-icon: {
          color: var(--accent-color);
          height: 75px;
          width: 75px;
        };
      }
      #markCompleteButton paper-icon-button,
      #previousItemButton paper-icon-button,
      #nextItemButton paper-icon-button, paper-icon-button {
        width: 75px;
        height: 75px;

      }
      paper-fab[disabled] {
        background-color: #cccccc !important;
      }
      paper-fab.pressed {
        background-color: #3c5b8d !important;
      }
      paper-fab.keyboard-focus {
        background-color: #1976d2;
      }
      paper-tab[aria-selected=true] {
        background: #f26f10;
        color: #FFF
      }
      :host(:not[error-logging]) #errors {
        display: none;
      }
      .error {
        background: white;
        border: solid 5px red;
        padding: 5px;
      }
      </style>
      <div id="nav"></div>
      <template is="dom-if" if="{{complete}}">
        <div id="bar">
          <paper-tabs selected="[[tabIndex]]" scrollable>
            <template is="dom-if" if="{{hasSummary}}">
              <paper-tab id="summary-button" on-click="onClickSummaryTab">[[t.summary]]</paper-tab>
            </template>
            <paper-tab id="response-button" on-click="onClickResponseTab">[[t.response]]</paper-tab>
          </paper-tabs>
        </div>
      </template>
      <div id="errors"></div>
      <div id="items"><slot></slot></div> 

        `}onClickSummaryTab(){this.store.dispatch({type:"SHOW_SUMMARY"}),setTimeout(()=>{this.querySelector("[summary]").scrollIntoView({behavior:"smooth",block:"start"})},200)}onClickResponseTab(){this.store.dispatch({type:"SHOW_RESPONSE"}),this.querySelectorAll("tangy-form-item")[0].scrollIntoView({behavior:"smooth",block:"center"})}static get is(){return"tangy-form"}static get properties(){return{fullscreen:{type:Boolean,value:!1,reflectToAttribute:!0},title:{type:String,value:""},complete:{type:Boolean,value:!1,reflectToAttribute:!0},linearMode:{type:Boolean,value:!1,reflectToAttribute:!0},hideClosedItems:{type:Boolean,value:!1,reflectToAttribute:!0},hideCompleteFab:{type:Boolean,value:!1,reflectToAttribute:!0},tabIndex:{type:Number,value:0,reflectToAttribute:!0},showResponse:{type:Boolean,value:!1,reflectToAttribute:!0},showSummary:{type:Boolean,value:!1,reflectToAttribute:!0},hasSummary:{type:Boolean,value:!1,reflectToAttribute:!0},fullScreenGranted:{type:Boolean,value:!1},exitClicks:{type:Number,value:void 0,reflectToAttribute:!0}}}constructor(){super(),this.t={summary:"summary",response:"response"},this._responseHasBeenSet=!1,this.store=Redux.createStore(_tangy_form_reducer_js__WEBPACK_IMPORTED_MODULE_5__.a,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())}ready(){super.ready(),this.hasLazyItems=!1,this.querySelectorAll("tangy-form-item").forEach(e=>{e.getAttribute("src")&&(this.hasLazyItems=!0),e.store=this.store,this.linearMode&&(e.noButtons=!0),e.addEventListener("change",this.onItemChange.bind(this)),e.addEventListener("ITEM_NEXT",this.onItemNext.bind(this)),e.addEventListener("ITEM_BACK",this.onItemBack.bind(this)),e.addEventListener("ITEM_CLOSED",this.onItemClosed.bind(this)),e.addEventListener("ITEM_OPENED",this.onItemOpened.bind(this)),e.addEventListener("FORM_RESPONSE_COMPLETE",this.onFormResponseComplete.bind(this)),e.addEventListener("FORM_RESPONSE_NO_CONSENT",this.onFormResponseNoConsent.bind(this)),e.addEventListener("logic-error",this.onItemError.bind(this)),e.addEventListener("go-to",e=>this.onItemGoTo(e))}),this.hasLazyItems?this.unsubscribe=this.store.subscribe(this.throttledReflect.bind(this)):this.unsubscribe=this.store.subscribe(this.reflect.bind(this)),this.store.subscribe(e=>{this.dispatchEvent(new CustomEvent("TANGY_FORM_UPDATE"))}),this.hasAttribute("on-submit")&&this.addEventListener("submit",e=>{this.fireHook("on-submit")}),Object(_polymer_polymer_lib_utils_render_status_js__WEBPACK_IMPORTED_MODULE_1__.a)(this,(function(){!1===this._responseHasBeenSet&&this.newResponse()})),this.addEventListener("enter-fullscreen",()=>{this.store.dispatch({type:"ENTER_FULLSCREEN"})}),this.addEventListener("exit-fullscreen",()=>{this.store.dispatch({type:"EXIT_FULLSCREEN"})})}disconnectedCallback(){this.unsubscribe&&this.unsubscribe()}onFormResponseComplete(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()}),this.dispatchEvent(new CustomEvent("submit",{cancelable:!0}))&&(this.store.dispatch({type:"FORM_RESPONSE_COMPLETE"}),!this.dispatchEvent(new CustomEvent("tangy-form-complete",{cancelable:!0}))||(this.hasSummary?this.store.dispatch({type:"SHOW_SUMMARY"}):this.store.dispatch({type:"SHOW_RESPONSE"})))}onFormResponseNoConsent(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()}),!this.dispatchEvent(new CustomEvent("submit",{cancelable:!0}))||(this.store.dispatch({type:"FORM_RESPONSE_COMPLETE"}),this.hasSummary?this.store.dispatch({type:"SHOW_SUMMARY"}):this.store.dispatch({type:"SHOW_RESPONSE"}))}onItemChange(e){this.store.dispatch({type:"ITEM_CHANGE",itemId:e.target.id})}onItemNext(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()}),this.fireHook("on-change"),this.focusOnNextItem()}onItemBack(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()}),this.fireHook("on-change"),this.focusOnPreviousItem()}onItemGoTo(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()}),this.fireHook("on-change"),this.store.dispatch({type:"ITEM_GO_TO",itemId:e.detail})}onItemOpened(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()})}onItemClosed(e){this.store.dispatch({type:"ITEM_SAVE",item:e.target.getProps()})}onItemError(e){this.errorMessage(e.detail)}throttledReflect(e=!1){this.reflectQueued&&!e||(this.reflectRunning?(this.reflectQueued=!0,setTimeout(()=>this.throttledReflect(!0),200)):(this.reflectRunning=!0,this.reflect(),this.reflectRunning=!1,e&&(this.reflectQueued=!1)))}reflect(){let e=this.store.getState();this.previousState||(this.previousState=e),this.setProps(e.form),e.form&&e.form.complete;let t=[].slice.call(this.querySelectorAll("tangy-form-item"));t.forEach(t=>{let i=e.items.findIndex(e=>t.id==e.id);-1!==i&&t.setProps(e.items[i])}),e.focusIndex!==this.previousState.focusIndex&&t[e.focusIndex]&&t[e.focusIndex].scrollIntoView({behavior:"smooth",block:"start"});let i=this.previousState.items.filter(e=>!e.open).length,n=e.items.filter(e=>!e.open).length;i!==n&&n===e.items.length&&this.dispatchEvent(new CustomEvent("ALL_ITEMS_CLOSED")),e.form&&e.form.fullscreen?!this.previousState.form.fullscreenEnabled&&e.form.fullscreenEnabled?this.enableFullscreen():this.previousState.form.fullscreenEnabled&&!e.form.fullscreenEnabled&&this.disableFullscreen():this.previousState.form.fullscreen&&!e.form.fullscreen&&this.disableFullscreen(),this.previousState=Object.assign({},e)}fireHook(hook,event){if(this.locked)return;if(!this.getAttribute(hook))return;let state=this.store.getState(),inputsArray=[];state.items.forEach(e=>inputsArray=[...inputsArray,...e.inputs]);let inputsKeyedByName={};inputsArray.forEach(e=>inputsKeyedByName[e.name]=e);let inputs=inputsKeyedByName,items={};state.items.forEach(e=>items[e.name]=e);let inputEls=this.shadowRoot.querySelectorAll("[name]"),tangyFormStore=this.store,itemEnable=e=>this.itemEnable(e),itemDisable=e=>this.itemDisable(e),sectionEnable=e=>this.itemEnable(e),sectionDisable=e=>this.itemDisable(e),helpers=new _tangy_form_item_callback_helpers_js__WEBPACK_IMPORTED_MODULE_7__.a(this),getValue=e=>this.getValue(e),inputHide=e=>helpers.inputHide(e),inputShow=e=>helpers.inputShow(e),inputDisable=e=>helpers.inputDisable(e),inputEnable=e=>helpers.inputEnable(e),itemsPerMinute=e=>helpers.itemsPerMinute(e),numberOfItemsAttempted=e=>helpers.numberOfItemsAttempted(e),numberOfCorrectItems=e=>helpers.numberOfCorrectItems(e),numberOfIncorrectItems=e=>helpers.numberOfIncorrectItems(e),gridAutoStopped=e=>helpers.gridAutoStopped(e),itemInputs=[...this.shadowRoot.querySelectorAll("[name]")].reduce((e,t)=>Object.assign({},e,{[t.name]:t}),{});try{eval(this.getAttribute(hook))}catch(e){const t=`${Object(_util_t_js__WEBPACK_IMPORTED_MODULE_4__.a)("Error detected in the form's logic:")} ${hook}`;console.log(t),console.log(e),this.errorMessage(t)}}errorMessage(e){if(!this.hasAttribute("error-logging"))return;const t=document.createElement("div");t.innerHTML=e,t.classList.add("error"),this.shadowRoot.querySelector("#errors").appendChild(t),this.style.background="red",setTimeout(()=>{this.style.background="transparent"},400)}focusOnPreviousItem(e){let t=this.store.getState().items.find(e=>e.open);this.store.dispatch({type:"ITEM_BACK",itemId:t.id})}focusOnNextItem(e){let t=this.store.getState().items.find(e=>e.open);this.store.dispatch({type:"ITEM_NEXT",itemId:t.id})}disableFullscreen(){document.webkitExitFullscreen&&document.webkitExitFullscreen(),document.exitFullscreen&&document.exitFullscreen(),this.removeEventListener("click",this.enableFullscreen,!0)}enableFullscreen(){this.requestFullscreen?this.requestFullscreen().then(e=>{this.fullScreenGranted=!0}).catch(e=>{console.log(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`),this.fullScreenGranted=!1,this.dispatchEvent(new CustomEvent("fullscreen-rejected"))}):this.mozRequestFullScreen?this.mozRequestFullScreen():this.webkitRequestFullscreen?this.webkitRequestFullscreen():this.msRequestFullscreen&&this.msRequestFullscreen()}}window.customElements.define(TangyForm.is,TangyForm)},function(module,__webpack_exports__,__webpack_require__){"use strict";var _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_util_t_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(11),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_2__),_polymer_paper_card_paper_card_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(59),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(9),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_4__),_tangy_form_item_callback_helpers_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(48);class TangyFormItem extends _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.a{static get is(){return"tangy-form-item"}connectedCallback(){this.querySelector("template")?this.template=this.querySelector("template").innerHTML:this.template=this.innerHTML,this.innerHTML="",super.connectedCallback(),this.t={back:Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("back"),next:Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("next"),open:Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("open"),close:Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("close"),save:Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("save"),submit:Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("submit")}}static get template(){return _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.b`
      <style include="tangy-common-styles"></style>
      <style>
        :host {
          margin: 15px;
        }
        :host([disabled]) {
          display: none;
        }
        /*
        * Card
        */
        paper-card {
          -webkit-transition: .4s;
          -moz-transition: .4s;
          -ms-transition: .4s;
          -o-transition: .4s;
          display: block;
          max-width: 325px;
          margin: /*30px*/ auto;
        }
        :host([open]) paper-card {
          -webkit-transition: .4s;
          -moz-transition: .4s;
          -ms-transition: .4s;
          -o-transition: .4s;
          display: block;
          max-width: 920px;
        }
        :host([disabled]) paper-card {
          --paper-card-background-color: gray !important;
          --paper-card-header-color: #CCC;
        }
        :host([hidden]) {
          display: none;
        }

       /*
        * Fullscreen 
        */
        :host([fullscreen-enabled]) paper-card {
          width: 100%;
          max-width: 100% !important;
          height: 100vh;
        }
        :host([fullscreen-enabled]) {
          margin: 0px
        }
        :host([fullscreen-enabled]) paper-card  {
          padding-top: 53px;
          overflow: scroll;
        }
        :host([fullscreen-enabled]) .card-actions {
          position: fixed;
          top: 0px;
          width: 100%;
          right: 0px;
          padding: 0px;
          margin: 0px;
        }
        :host([fullscreen-enabled]) paper-button {
          background: white;
          color: grey;
        }
        :host([fullscreen-enabled]) paper-button#complete {
          float: right;
          margin: 15px;
          background: green;
          color: white; 
        }
        :host([fullscreen-enabled]) paper-button#complete paper-button {
          display: none;
        }
        :host([fullscreen-enabled]) label.heading {
          display: none;
        }
        :host([fullscreen-enabled]) .card-content {
          padding-top: 0px;
        }
        :host(:not([fullscreen])) #enable-fullscreen,
        :host(:not([fullscreen])) #disable-fullscreen,
        :host([fullscreen]:not([fullscreen-enabled])) #disable-fullscreen,
        :host([fullscreen]):host([fullscreen-enabled]) #enable-fullscreen
        {
          display: none;
        }
        #disable-fullscreen,
        #enable-fullscreen 
        {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);  
        }


        /*
        * Action Buttons
        */
        .card-actions {
          height: 45px;
          margin-bottom: 100px;
        }
        :host([open]) #open {
          display: none;
        }
        :host([locked]) #complete {
          display: none;
        }
        :host(:not([open])) #close {
          display: none;
        }
        :host([disabled]) #open {
          display: none;
        }
        label.heading {
          font-size: 21px !important;
          margin-bottom: 20px;
          display: block;
          color: var(--primary-color);
          font-weight: 700;
        }

        #next {
          float: right;
        }
        #next iron-icon {
          margin: 0px 0px 0px 5px;
        }

        #back {
          float: left;
        }
        #back iron-icon {
          margin: 0 5px 0 0;
        }

        .card-actions paper-button {
          font-size: 1.2rem;
          line-height: 1rem;
        }
      </style>
      <paper-card id="card" class="shrunk">
        <div class="card-content">
          <label class="heading"></label>
          <slot></slot>
        </div>
        <div class="card-actions">
          <paper-button id="disable-fullscreen" on-click="onExitFullscreenClick" >
            <iron-icon icon="fullscreen-exit"></iron-icon>
          </paper-button>
          <paper-button id="enable-fullscreen" on-click="onEnterFullscreenClick" >
            <iron-icon icon="fullscreen"></iron-icon>
          </paper-button>
          <template is="dom-if" if="{{!hideButtons}}">
            <paper-button id="open" on-click="onOpenButtonPress">[[t.open]]</paper-button>
            <template is="dom-if" if="{{!locked}}">
              <paper-button id="close" on-click="onCloseButtonPress">[[t.save]]</paper-button>
            </template>
            <template is="dom-if" if="{{locked}}">
              <paper-button id="close" on-click="onCloseButtonPress">[[t.close]]</paper-button>
            </template>
          </template>
          <template is="dom-if" if="{{open}}">
            <template is="dom-if" if="{{rightToLeft}}">
              <template is="dom-if" if="{{showCompleteButton}}">
                <paper-button id="complete" on-click="clickedComplete" style="float:left">
                  [[t.submit]]
                </paper-button>
              </template>
              <template is="dom-if" if="{{!hideNextButton}}">
                <paper-button id="back" on-click="next" >
                  <template is="dom-if" if="{{!hideNavIcons}}">
                    <iron-icon icon="arrow-back"></iron-icon>
                  </template>
                  <template is="dom-if" if="{{!hideNavLabels}}">
                    [[t.next]]
                  </template>
                </paper-button>
              </template>
              <template is="dom-if" if="{{!hideBackButton}}">
                <paper-button id="next" on-click="back" >
                 <template is="dom-if" if="{{!hideNavLabels}}">
                    [[t.back]]
                  </template>
                  <template is="dom-if" if="{{!hideNavIcons}}">
                    <iron-icon icon="arrow-forward"></iron-icon>
                  </template>
                </paper-button>
              </template>
            </template>
            <template is="dom-if" if="{{!rightToLeft}}">
              <template is="dom-if" if="{{!hideBackButton}}">
                <paper-button id="back" on-click="back" >
                  <template is="dom-if" if="{{!hideNavIcons}}">
                    <iron-icon icon="arrow-back"></iron-icon>
                  </template>
                  <template is="dom-if" if="{{!hideNavLabels}}">
                    [[t.back]]
                  </template>
                </paper-button>
              </template>
              <template is="dom-if" if="{{!hideNextButton}}">
                <paper-button id="next" on-click="next" >
                 <template is="dom-if" if="{{!hideNavLabels}}">
                    [[t.next]]
                  </template>
                  <template is="dom-if" if="{{!hideNavIcons}}">
                    <iron-icon icon="arrow-forward"></iron-icon>
                  </template>
                </paper-button>
              </template>
              <template is="dom-if" if="{{showCompleteButton}}">
                <paper-button id="complete" on-click="clickedComplete" style="float:right" >
                  [[t.submit]]
                </paper-button>
              </template>
            </template>
          </template>
          <template is="dom-if" if="{{!incomplete}}">
            <iron-icon style="color: var(--primary-color); float: right; margin-top: 10px" icon="icons:check-circle"></iron-icon>
          </template>
        </div>
      </paper-card>
    `}static get properties(){return{id:{type:String,value:"tangy-form-item",reflectToAttribute:!0},title:{type:String,value:"",reflectToAttribute:!0},summary:{type:Boolean,value:!1,reflectToAttribute:!0},fullscreen:{type:Boolean,value:!1,reflectToAttribute:!0},fullscreenEnabled:{type:Boolean,value:!1,reflectToAttribute:!0},hideButtons:{type:Boolean,value:!1,reflectToAttribute:!0},hideBackButton:{type:Boolean,value:!1,reflectToAttribute:!0},hideNavIcons:{type:Boolean,value:!1,reflectToAttribute:!0},hideNavLabels:{type:Boolean,value:!1,reflectToAttribute:!0},rightToLeft:{type:Boolean,value:!1,reflectToAttribute:!0},hideNextButton:{type:Boolean,value:!1,reflectToAttribute:!0},showCompleteButton:{type:Boolean,value:!1,reflectToAttribute:!0},inputs:{type:Array,observer:"reflect",value:[]},open:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"onOpenChange"},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},locked:{type:Boolean,value:!1,reflectToAttribute:!0},isDirty:{type:Boolean,value:!1,reflectToAttribute:!0},incorrectThreshold:{type:Number,value:void 0,reflectToAttribute:!0},exitClicks:{type:Number,value:void 0,reflectToAttribute:!0}}}reflect(){this.shadowRoot.querySelector(".heading").innerHTML=this.hasAttribute("title")?this.getAttribute("title"):"",this.inputs.filter(e=>"TANGY-INPUT-GROUPS"===e.tagName).forEach(e=>{let t=this.querySelector(`[name="${e.name}"]`);t&&(t.setProps(e),t.value=e.value)}),this.inputs.filter(e=>"TANGY-INPUT-GROUPS"!==e.tagName).forEach(e=>{let t=this.querySelector(`[name="${e.name}"]`);t&&t.setProps(e)})}fireHook(e,t){if(this.locked)return;this.eval(this.getAttribute(e),e);let i={visible:{truthy:e=>this.eval(`inputShow("${e}")`,"show-if",e),falsey:e=>this.eval(`inputHide("${e}")`,"show-if",e)},editable:{truthy:e=>this.eval(`inputEnable("${e}")`,"disable-if",e),falsey:e=>this.eval(`inputDisable("${e}")`,"disable-if",e)}};this.querySelectorAll("[name]").forEach(e=>{e.hasAttribute("show-if")&&(this.eval(e.getAttribute("show-if"),"show-if",e.getAttribute("name"))?i.visible.truthy(e.name):i.visible.falsey(e.name)),e.hasAttribute("disable-if")&&(this.eval(e.getAttribute("disable-if"),"disable-if",e.getAttribute("name"))?i.editable.falsey(e.name):i.editable.truthy(e.name)),e.hasAttribute("tangy-if")&&e.hasAttribute("tangy-action")?this.eval(e.getAttribute("tangy-if"),"tangy-if",e.getAttribute("name"))?i[e.getAttribute("tangy-action")].truthy(e.name):i[e.getAttribute("tangy-action")].falsey(e.name):e.hasAttribute("tangy-if")&&!e.hasAttribute("tangy-action")&&(this.eval(e.getAttribute("tangy-if"),"tangy-if",e.getAttribute("name"))?i.visible.truthy(e.name):i.visible.falsey(e.name))}),this.querySelectorAll("tangy-template").forEach(e=>{e.shadowRoot&&(e.$.container.innerHTML=this.eval("`"+e.template+"`","tangy-template",e.getAttribute("name")))})}eval(code,hook,context=""){let state=this.store.getState(),inputsArray=[];state.items.forEach(e=>inputsArray=[...inputsArray,...e.inputs]),this.querySelectorAll("[name]").forEach(e=>inputsArray.push(e));let inputsKeyedByName={};inputsArray.forEach(e=>inputsKeyedByName[e.name]=e);let inputs=inputsKeyedByName,elementsById={};this.querySelectorAll("[id]").forEach(e=>elementsById[e.id]=e);let items={};state.items.forEach(e=>items[e.name]=e);let inputEls=this.querySelectorAll("[name]"),tangyFormStore=this.store,{getValue:getValue,inputHide:inputHide,inputShow:inputShow,inputDisable:inputDisable,inputEnable:inputEnable,itemHide:itemHide,itemShow:itemShow,itemDisable:itemDisable,itemEnable:itemEnable,isChecked:isChecked,notChecked:notChecked,itemsPerMinute:itemsPerMinute,numberOfItemsAttempted:numberOfItemsAttempted,numberOfCorrectItems:numberOfCorrectItems,numberOfIncorrectItems:numberOfIncorrectItems,gridAutoStopped:gridAutoStopped,hideInputsUponThreshhold:hideInputsUponThreshhold,goTo:goTo,goToEnd:goToEnd}=this.exposeHelperFunctions();this.hasAttribute("incorrect-threshold")&&hideInputsUponThreshhold(this);try{const result=eval(code);return result}catch(e){const t=`${Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("Error detected in the section logic:")} ${context} :: ${hook} :: <br> <pre> ${code} </pre>`;return console.log(t),console.log(e),this.dispatchEvent(new CustomEvent("logic-error",{detail:t})),!1}}exposeHelperFunctions(){let e=new _tangy_form_item_callback_helpers_js__WEBPACK_IMPORTED_MODULE_5__.a(this);return{getValue:t=>e.getValue(t),inputHide:t=>e.inputHide(t),inputShow:t=>e.inputShow(t),inputDisable:t=>e.inputDisable(t),inputEnable:t=>e.inputEnable(t),itemHide:t=>e.inputHide(t),itemShow:t=>e.inputShow(t),itemDisable:t=>e.inputDisable(t),itemEnable:t=>e.inputEnable(t),isChecked:t=>e.isChecked(t),notChecked:t=>e.notChecked(t),itemsPerMinute:t=>e.itemsPerMinute(t),numberOfItemsAttempted:t=>e.numberOfItemsAttempted(t),numberOfCorrectItems:t=>e.numberOfCorrectItems(t),numberOfIncorrectItems:t=>e.numberOfIncorrectItems(t),gridAutoStopped:t=>e.gridAutoStopped(t),hideInputsUponThreshhold:t=>e.hideInputsUponThreshhold(t),goTo:(t,i=!1)=>e.goTo(t,i),goToEnd:(t=!1)=>e.goToEnd(t)}}onOpenButtonPress(){this.open=!0,this.dispatchEvent(new CustomEvent("ITEM_OPENED"))}onCloseButtonPress(){this.locked?(this.open=!1,this.dispatchEvent(new CustomEvent("ITEM_CLOSED"))):this.validate()&&(this.submit(),this.open=!1,this.dispatchEvent(new CustomEvent("ITEM_CLOSED")))}onOpenChange(e){!1===e&&(this.innerHTML=""),!0===e&&""===this.innerHTML&&this.openWithContent(this.template)}openWithContent(e){this.innerHTML=e,this.querySelectorAll("[name]").forEach(e=>{e.addEventListener("next",()=>this.next()),e.addEventListener("change",e=>{this.fireHook("on-change",e)})});let t=this.querySelector("tangy-complete-button");t&&(this.showCompleteButton=!1,t.addEventListener("click",this.clickedComplete.bind(this)));let i=this.querySelector("tangy-consent");i&&(this.showCompleteButton=!1,i.addEventListener("TANGY_INPUT_CONSENT_NO",this.clickedNoConsent.bind(this))),this.reflect(),!0===this.open&&(this.fireHook("on-open"),this.fireHook("on-change")),this.dispatchEvent(new CustomEvent("TANGY_FORM_ITEM_OPENED"))}onDisabledChange(e,t){!0===e&&!1===t&&this.dispatch({type:ITEM_DISABLED,itemId:this.id})}submit(){let e=[];return this.querySelectorAll("[name]").forEach(t=>e.push(t.getProps())),this.inputs=e,window.devtools&&window.devtools.open&&console.table(this.inputs.map(e=>({name:e.name,value:e.value}))),!0}validate(){let inputEls=[...this.children].filter(e=>e.hasAttribute("name"));const inputs=inputEls.reduce((e,t)=>({[t.name]:t,...e}),{});let invalidInputNames=[],validInputNames=[];for(let input of inputEls)if(input.hidden)input.invalid=!1,validInputNames.push(input.name);else{let{getValue:getValue,inputHide:inputHide,inputShow:inputShow,inputDisable:inputDisable,inputEnable:inputEnable,itemHide:itemHide,itemShow:itemShow,itemDisable:itemDisable,itemEnable:itemEnable,isChecked:isChecked,notChecked:notChecked,itemsPerMinute:itemsPerMinute,numberOfItemsAttempted:numberOfItemsAttempted,numberOfCorrectItems:numberOfCorrectItems,numberOfIncorrectItems:numberOfIncorrectItems,gridAutoStopped:gridAutoStopped,hideInputsUponThreshhold:hideInputsUponThreshhold}=this.exposeHelperFunctions();input.validate&&!input.validate()||input.hasAttribute("valid-if")&&!eval(input.getAttribute("valid-if"))?(input.invalid=!0,invalidInputNames.push(input.name)):(input.invalid=!1,validInputNames.push(input.name))}return 0!==invalidInputNames.length?(this.querySelector(`[name="${invalidInputNames[0]}"]`).scrollIntoView({behavior:"smooth",block:"start"}),this.incomplete=!0,this.fireHook("on-change"),!1):(this.incomplete=!1,this.fireHook("on-change"),!0)}onExitFullscreenClick(){this._exitClicks=isNaN(this._exitClicks)?1:this._exitClicks+1,(!this.hasAttribute("exit-clicks")||this.hasAttribute("exit-clicks")&&this._exitClicks>=parseInt(this.getAttribute("exit-clicks")))&&this.dispatchEvent(new CustomEvent("exit-fullscreen",{bubbles:!0}))}onEnterFullscreenClick(){this.dispatchEvent(new CustomEvent("enter-fullscreen",{bubbles:!0}))}next(){this.validate()&&(this.submit(),this.dispatchEvent(new CustomEvent("ITEM_NEXT")))}back(){this.submit(),this.dispatchEvent(new CustomEvent("ITEM_BACK"))}goTo(e,t=!1){t&&!this.validate()||(this.submit(),this.dispatchEvent(new CustomEvent("go-to",{detail:e})))}clickedComplete(){this.validate()&&(this.submit(),this.dispatchEvent(new CustomEvent("FORM_RESPONSE_COMPLETE",{bubbles:!0})))}clickedNoConsent(){this.validate()&&(this.submit(),this.dispatchEvent(new CustomEvent("FORM_RESPONSE_NO_CONSENT",{bubbles:!0})))}getInputsMeta(){const e=document.createElement("div");return e.innerHTML=this.template,[...e.querySelectorAll("[name]")].map(e=>{const t=e.getProps(),i=[...e.querySelectorAll("option")].map(e=>({label:e.innerHTML,value:e.hasAttribute("name")?e.getAttribute("name"):e.getAttribute("value")}));return{...t,value:i.length>0?i:t.value}}).reduce((e,t)=>"OPTION"===t.tagName?e:[...e,t],[])}}window.customElements.define(TangyFormItem.is,TangyFormItem)},function(e,t,i){"use strict";var n=i(0);i(11),i(13),i(9);class r extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style>
      
      :host([hidden]) {
        display: none;
      }
      
     
      :host([required]:not([disabled])) label::before  { 
        content: "*"; 
        color: red; 
        position: absolute;
        top: 4px;
        right: 5px;
      }
      .text-outer {
        position: relative;
        height: 100%;
      }
      .text-inner {
        /*
        position: absolute;
        top: 20px;
        left: 20px;
        height: 30%;
        /*width: 50%;
        margin: -15% 0 0 -25%;*/
      }
      .text-inner ::slotted(*) {
      }
      
    </style>
    <paper-button id="button">
      <slot></slot>
    </paper-button>
      
`}static get is(){return"tangy-complete-button"}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},value:{type:String,value:"",reflectToAttribute:!0,observer:"onValueChange"},disabled:{type:Boolean,value:!1,observer:"onDisabledChange",reflectToAttribute:!0},goHome:{type:Boolean,value:!1,reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.completePressed.bind(this))}completePressed(){this.goHome&&(window.location.href="./index.html"),this.disabled||(""==this.value?this.value="on":this.value="")}onDisabledChange(e,t){this.$.button=this.disabled}onValueChange(e,t){this.pressed=""!=e}}window.customElements.define(r.is,r)},function(module,__webpack_exports__,__webpack_require__){"use strict";var _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(11),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_1__),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(9),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_2__);class TangyOverlay extends _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.a{static get template(){return _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.b`

    <style include="tangy-common-styles"></style>
    <style>
    #overlay {
      position: fixed; /* Sit on top of the page content */
      display: none; /* Hidden by default */
      width: 100%; /* Full width (cover the whole page) */
      height: 100%; /* Full height (cover the whole page) */
      top: 0; 
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5); /* Black background with opacity */
      z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
      cursor: pointer; /* Add a pointer on hover */
      text-align:center;
    }
    #lightbox {
      width: calc(100vw - 100px);
      height: calc(100vh - 100px);
      overflow-y: scroll;
      overscroll-behavior: contain;
      /*margin: 0;*/
      padding: 0;
      background-color: #fafafa;
      margin:auto;
    }
    
    .media-button-top-left {
      position: fixed;
      left:20px;
      padding: 10px;
      margin-left: -10px;
      margin-top: -20px;
      z-index: 999999999999999;
    }
    .media-button-top-right {
      position: fixed;
      top:30px;
      right:30px;
      padding: 10px;
      margin-top: -20px;
      z-index: 999999999999999;
    }
    .media-button-bottom-left {
      position: fixed;
      bottom:0;
      left:20px;
      margin:10px;
      z-index: 999999999999999;
    }
    .media-button-bottom-right {
      position: fixed;
      bottom:50px;
      right:50px;
      margin:0px;
      z-index: 999999999999999;
    }

    </style>

    <div id="media-button" on-click="handleMediaButtonClick" >
    </div>
    
    <div id="overlay">
        <div id="lightbox" on-click="handleLightboxClick">
        </div>
    </div>
    <br/>
    
    `}static get is(){return"tangy-overlay"}static get properties(){return{onOpen:{type:String,value:""},open:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"reflect"},position:{type:String,value:"",reflectToAttribute:!0},overlayContent:{type:String,value:""},icon:{type:String,value:"icons:open-with"}}}connectedCallback(){super.connectedCallback(),this.store=window.tangyFormStore,this.$["media-button"].innerHTML=`\n      <paper-fab icon="${this.icon}" raised on-click="open"></paper-fab>\n    `,"top-right"===this.position?this.shadowRoot.getElementById("media-button").className="media-button-top-right":"top-left"===this.position?this.shadowRoot.getElementById("media-button").className="media-button-top-left":"bottom-right"===this.position?this.shadowRoot.getElementById("media-button").className="media-button-bottom-right":"bottom-left"===this.position&&(this.shadowRoot.getElementById("media-button").className="media-button-bottom-left")}reflect(ev){if(this.open?this.shadowRoot.getElementById("overlay").style.display="block":this.shadowRoot.getElementById("overlay").style.display="none",this.onOpen){let getValue=this.getValue.bind(this),newOverlayContent="";eval(`\n        function go() {\n          ${this.onOpen}\n        }\n        newOverlayContent = go()\n      `),this.$.lightbox.innerHTML=newOverlayContent}else this.$.lightbox.innerHTML=this.innerHTML}getValue(e){let t=this.store.getState().inputs.find(t=>t.name==e);if(t)return t.value}handleMediaButtonClick(){this.open=!this.open}handleLightboxClick(){this.position||(this.open=!this.open)}}window.customElements.define(TangyOverlay.is,TangyOverlay)},function(e,t,i){"use strict";var n=i(0);i(11),i(57),i(9),i(13),i(63);class r extends n.a{static get is(){return"tangy-input-groups"}static get _props(){return["name","value","label","disabled","invalid","incomplete","hidden"]}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},maxCount:{type:Number,value:999,reflectToAttribute:!0},initialCount:{type:Number,value:1,reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <div id="groups">
        <slot></slot>
      </div>
      <paper-button on-click="newGroup" style="margin-left: 15px; background: var(--accent-color); color: var(--accent-text-color);" raised class="add-another"><iron-icon icon="add-circle"></iron-icon>ADD ANOTHER</paper-button>
    `}set value(e){if(!Array.isArray(e))return;this._value=e;const t=e,i=[...this.querySelectorAll("tangy-input-group[name]")].map(e=>e.name),n=t.filter(e=>-1===i.indexOf(e)),r=i.filter(e=>-1===t.indexOf(e));n.forEach(e=>{const t=document.createElement("tangy-input-group");t.innerHTML=this._template,t.setAttribute("name",e),t.addEventListener("input-group-remove",e=>this.removeGroup(e.target.name)),t.querySelectorAll("[name]").forEach(t=>t.setAttribute("name",`${e}.${t.getAttribute("name")}`)),this.appendChild(t)}),r.forEach(e=>{this.removeChild(this.querySelector(`[name="${e}"]`))})}get value(){return this._value?this._value:[]}connectedCallback(){if(super.connectedCallback(),this._template=this.innerHTML,this.innerHTML="",!this.getAttribute("value")){let e=[];for(let t=0;t<this.initialCount;t++)e.push(`${this.name}.${t}`);this.value=e}}newGroup(){this.value=[...this.value,`${this.name}.${this.value.length}`]}appendGroup(e){}removeGroup(e){this.value=this.value.filter(t=>t!==e)}validate(){return!0}}window.customElements.define(r.is,r)},function(e,t,i){"use strict";var n=i(0);i(11),i(9),i(13);class r extends n.a{static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <div id="container"></div>
    `}static get is(){return"tangy-template"}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},value:{type:String,value:"",observer:"render",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.template=this.innerHTML}}window.customElements.define(r.is,r)},function(e,t,i){"use strict";i(5),i(23),i(17),i(60),i(56),i(31);var n=i(44),r=i(7);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const a=i(3).a`
  <style include="paper-material-styles">
    :host {
      @apply --layout-vertical;
      @apply --layout-center-center;

      background: var(--paper-fab-background, var(--accent-color));
      border-radius: 50%;
      box-sizing: border-box;
      color: var(--text-primary-color);
      cursor: pointer;
      height: 56px;
      min-width: 0;
      outline: none;
      padding: 16px;
      position: relative;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      width: 56px;
      z-index: 0;

      /* NOTE: Both values are needed, since some phones require the value \`transparent\`. */
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;

      @apply --paper-fab;
    }

    [hidden] {
      display: none !important;
    }

    :host([mini]) {
      width: 40px;
      height: 40px;
      padding: 8px;

      @apply --paper-fab-mini;
    }

    :host([disabled]) {
      color: var(--paper-fab-disabled-text, var(--paper-grey-500));
      background: var(--paper-fab-disabled-background, var(--paper-grey-300));

      @apply --paper-fab-disabled;
    }

    iron-icon {
      @apply --paper-fab-iron-icon;
    }

    span {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;

      @apply --paper-fab-label;
    }

    :host(.keyboard-focus) {
      background: var(--paper-fab-keyboard-focus-background, var(--paper-pink-900));
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }
  </style>

  <iron-icon id="icon" hidden\$="{{!_computeIsIconFab(icon, src)}}" src="[[src]]" icon="[[icon]]"></iron-icon>
  <span hidden\$="{{_computeIsIconFab(icon, src)}}">{{label}}</span>
`;a.setAttribute("strip-whitespace",""),Object(r.a)({_template:a,is:"paper-fab",behaviors:[n.a],properties:{src:{type:String,value:""},icon:{type:String,value:""},mini:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,observer:"_labelChanged"}},_labelChanged:function(){this.setAttribute("aria-label",this.label)},_computeIsIconFab:function(e,t){return e.length>0||t.length>0}})},function(e,t,i){"use strict";var n=i(0);window.customElements.define("t-lang",class extends n.a{static get template(){return n.b`
      <slot></slot>
    `}connectedCallback(){super.connectedCallback(),this.render(),document.body.addEventListener("lang-change",this.render.bind(this))}render(){document.documentElement.lang.length>0&&(this.attributes.hasOwnProperty(document.documentElement.lang.toLowerCase())?this.style.setProperty("display","inline"):this.style.setProperty("display","none"))}})},function(module,__webpack_exports__,__webpack_require__){"use strict";var _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),_util_t_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1),_util_loc_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(54),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(11),_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_util_html_element_props_js__WEBPACK_IMPORTED_MODULE_3__),_polymer_paper_input_paper_input_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(70),_style_tangy_element_styles_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(13),_style_tangy_element_styles_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_style_tangy_element_styles_js__WEBPACK_IMPORTED_MODULE_5__),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9),_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(_style_tangy_common_styles_js__WEBPACK_IMPORTED_MODULE_6__);class TangyLocation extends _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.a{static get is(){return"tangy-location"}constructor(){super(),this.localList=void 0}static get template(){return _polymer_polymer_polymer_element_js__WEBPACK_IMPORTED_MODULE_0__.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
   /* materialize select styles */
  .mdc-select {
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
    width: 100%;
    line-height: 1.75rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-decoration: inherit;
    text-transform: inherit;
    /* @alternate */
    color: rgba(0, 0, 0, 0.87);
    color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));
    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    position: relative;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    height: 56px;
    border: none;
    border-radius: 4px 4px 0 0;
    outline: none;
    background-repeat: no-repeat;
    background-position: right 10px center;
    cursor: pointer;
    overflow: visible; }
    [dir="rtl"] .mdc-select, .mdc-select[dir="rtl"] {
      background-position: left 10px center; }
    .mdc-select--theme-dark .mdc-select,
    .mdc-theme--dark .mdc-select {
      background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
      background-color: rgba(255, 255, 255, 0.1); }
    .mdc-select__menu {
      position: fixed;
      top: 0;
      left: 0;
      max-height: 100%;
      -webkit-transform-origin: center center;
              transform-origin: center center;
      z-index: 4; }
    .mdc-select__surface {
      font-family: Roboto, sans-serif;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-size: 1rem;
      line-height: 1.75rem;
      font-weight: 400;
      letter-spacing: 0.04em;
      text-decoration: inherit;
      text-transform: inherit;
      /* @alternate */
      color: rgba(0, 0, 0, 0.87);
      color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87));
      padding-left: 16px;
      padding-right: 26px;
      --mdc-ripple-fg-size: 0;
      --mdc-ripple-left: 0;
      --mdc-ripple-top: 0;
      --mdc-ripple-fg-scale: 1;
      --mdc-ripple-fg-translate-end: 0;
      --mdc-ripple-fg-translate-start: 0;
      -webkit-tap-highlight-color: transparent;
      will-change: transform, opacity;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: relative;
      -webkit-box-flex: 1;
          -ms-flex-positive: 1;
              flex-grow: 1;
      width: 100%;
      height: 56px;
      border: none;
      border-radius: 4px 4px 0 0;
      outline: none;
      background-color: rgba(0, 0, 0, 0.04);
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      overflow: hidden;}
      [dir="rtl"] .mdc-select .mdc-select__surface,
      .mdc-select[dir="rtl"] .mdc-select__surface {
        padding-left: 26px;
        padding-right: 16px; }
      .mdc-select__surface::before, .mdc-select__surface::after {
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: ""; }
      .mdc-select__surface::before {
        -webkit-transition: opacity 15ms linear;
        transition: opacity 15ms linear; }
      .mdc-select__surface.mdc-ripple-upgraded::after {
        top: 0;
        left: 0;
        -webkit-transform: scale(0);
                transform: scale(0);
        -webkit-transform-origin: center center;
                transform-origin: center center; }
      .mdc-select__surface.mdc-ripple-upgraded--unbounded::after {
        top: var(--mdc-ripple-top, 0);
        left: var(--mdc-ripple-left, 0); }
      .mdc-select__surface.mdc-ripple-upgraded--foreground-activation::after {
        -webkit-animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards;
                animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }
      .mdc-select__surface.mdc-ripple-upgraded--foreground-deactivation::after {
        -webkit-animation: 150ms mdc-ripple-fg-opacity-out;
                animation: 150ms mdc-ripple-fg-opacity-out;
        -webkit-transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));
                transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }
      .mdc-select__surface::before, .mdc-select__surface::after {
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%; }
      .mdc-select__surface.mdc-ripple-upgraded::before {
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));
                transform: scale(var(--mdc-ripple-fg-scale, 0)); }
      .mdc-select__surface.mdc-ripple-upgraded--unbounded::before {
        top: var(--mdc-ripple-top, calc(50% - 50%));
        left: var(--mdc-ripple-left, calc(50% - 50%));
        width: var(--mdc-ripple-fg-size, 100%);
        height: var(--mdc-ripple-fg-size, 100%);
        -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));
                transform: scale(var(--mdc-ripple-fg-scale, 0)); }
      .mdc-select__surface.mdc-ripple-upgraded::after {
        width: var(--mdc-ripple-fg-size, 100%);
        height: var(--mdc-ripple-fg-size, 100%); }
      .mdc-select__surface::before, .mdc-select__surface::after {
        background-color: black; }
      .mdc-select__surface:hover::before {
        opacity: 0.04; }
      .mdc-select__surface:not(.mdc-ripple-upgraded):focus::before, .mdc-select__surface.mdc-ripple-upgraded--background-focused::before {
        -webkit-transition-duration: 75ms;
                transition-duration: 75ms;
        opacity: 0.12; }
      .mdc-select__surface:not(.mdc-ripple-upgraded)::after {
        -webkit-transition: opacity 150ms linear;
        transition: opacity 150ms linear; }
      .mdc-select__surface:not(.mdc-ripple-upgraded):active::after {
        -webkit-transition-duration: 75ms;
                transition-duration: 75ms;
        opacity: 0.16; }
      .mdc-select__surface.mdc-ripple-upgraded {
        --mdc-ripple-fg-opacity: 0.16; }
      .mdc-select--theme-dark .mdc-select__surface::before, .mdc-select--theme-dark .mdc-select__surface::after,
      .mdc-theme--dark .mdc-select__surface::before,
      .mdc-theme--dark .mdc-select__surface::after {
        background-color: white; }
      .mdc-select--theme-dark .mdc-select__surface:hover::before,
      .mdc-theme--dark .mdc-select__surface:hover::before {
        opacity: 0.08; }
      .mdc-select--theme-dark .mdc-select__surface:not(.mdc-ripple-upgraded):focus::before, .mdc-select--theme-dark .mdc-select__surface.mdc-ripple-upgraded--background-focused::before,
      .mdc-theme--dark .mdc-select__surface:not(.mdc-ripple-upgraded):focus::before,
      .mdc-theme--dark .mdc-select__surface.mdc-ripple-upgraded--background-focused::before {
        -webkit-transition-duration: 75ms;
                transition-duration: 75ms;
        opacity: 0.24; }
      .mdc-select--theme-dark .mdc-select__surface:not(.mdc-ripple-upgraded)::after,
      .mdc-theme--dark .mdc-select__surface:not(.mdc-ripple-upgraded)::after {
        -webkit-transition: opacity 150ms linear;
        transition: opacity 150ms linear; }
      .mdc-select--theme-dark .mdc-select__surface:not(.mdc-ripple-upgraded):active::after,
      .mdc-theme--dark .mdc-select__surface:not(.mdc-ripple-upgraded):active::after {
        -webkit-transition-duration: 75ms;
                transition-duration: 75ms;
        opacity: 0.32; }
      .mdc-select--theme-dark .mdc-select__surface.mdc-ripple-upgraded,
      .mdc-theme--dark .mdc-select__surface.mdc-ripple-upgraded {
        --mdc-ripple-fg-opacity: 0.32; }
      .mdc-select__surface::-ms-expand {
        display: none; }
    .mdc-select__label {
      left: 16px;
      right: initial;
      position: absolute;
      bottom: 12px;
      -webkit-transform-origin: left top;
              transform-origin: left top;
      -webkit-transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      color: rgba(0, 0, 0, 0.6);
      pointer-events: none;
      will-change: transform; }
      [dir="rtl"] .mdc-select__label, .mdc-select__label[dir="rtl"] {
        left: initial;
        right: 16px; }
      .mdc-select--theme-dark .mdc-select__label,
      .mdc-theme--dark .mdc-select__label {
        /* @alternate */
        color: rgba(255, 255, 255, 0.7);
        color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }
      [dir="rtl"] .mdc-select .mdc-select__label,
      .mdc-select[dir="rtl"] .mdc-select__label {
        -webkit-transform-origin: right top;
                transform-origin: right top; }
      .mdc-select__label--float-above {
        -webkit-transform: translateY(-40%) scale(0.75, 0.75);
                transform: translateY(-40%) scale(0.75, 0.75); }
    .mdc-select__selected-text {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: end;
          -ms-flex-align: end;
              align-items: flex-end;
      margin-bottom: 6px;
      -webkit-transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
      transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
      transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
      transition: opacity 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 125ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
      white-space: nowrap;
      overflow: hidden; }
      .mdc-select--theme-dark .mdc-select__selected-text,
      .mdc-theme--dark .mdc-select__selected-text {
        /* @alternate */
        color: rgba(255, 255, 255, 0.7);
        color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }
    .mdc-select__bottom-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: bottom;
              transform-origin: bottom;
      -webkit-transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
      background-color: rgba(0, 0, 0, 0.5); }
      .mdc-select__bottom-line::after {
        /* @alternate */
        background-color: var(--primary-color);
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        -webkit-transform: scaleX(0);
                transform: scaleX(0);
        -webkit-transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        content: "";
        z-index: 2; }
    .mdc-select__bottom-line--active::after {
      -webkit-transform: scaleX(1);
              transform: scaleX(1);
      opacity: 1; }
    .mdc-select__surface:focus .mdc-select__bottom-line,
    .mdc-select__surface:focus ~ .mdc-select__bottom-line {
      /* @alternate */
      background-color: var(--primary-color);
      -webkit-transform: scaleY(2);
              transform: scaleY(2); }
      .mdc-select__surface:focus .mdc-select__bottom-line::after,
      .mdc-select__surface:focus ~ .mdc-select__bottom-line::after {
        opacity: 1; }
  .mdc-select--open .mdc-select__surface::before {
    opacity: 0.12; }
    .mdc-select--theme-dark .mdc-select--open .mdc-select__surface::before,
    .mdc-theme--dark .mdc-select--open .mdc-select__surface::before {
      opacity: 0.24; }
  .mdc-select--open .mdc-select__selected-text {
    -webkit-transform: translateY(8px);
            transform: translateY(8px);
    -webkit-transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);
    transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);
    transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);
    transition: opacity 125ms 125ms cubic-bezier(0, 0, 0.2, 1), transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 125ms 125ms cubic-bezier(0, 0, 0.2, 1);
    opacity: 0; }
  .mdc-select--open .mdc-select__bottom-line {
    /* @alternate */
    background-color: var(--primary-color);
    -webkit-transform: scaleY(2);
            transform: scaleY(2); }
    .mdc-select--open .mdc-select__bottom-line::after {
      opacity: 1; }
  .mdc-select--disabled,
  .mdc-select[disabled] {
    /* @alternate */
    color: rgba(0, 0, 0, 0.38);
    color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));
    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.38%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
    border-bottom-width: 1px;
    border-bottom-style: dotted;
    opacity: .38;
    cursor: default;
    pointer-events: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none; }
    .mdc-select--disabled .mdc-select__bottom-line,
    .mdc-select[disabled] .mdc-select__bottom-line {
      display: none; }
  .mdc-select--theme-dark.mdc-select--disabled,
  .mdc-theme--dark .mdc-select--disabled {
    /* @alternate */
    color: rgba(255, 255, 255, 0.5);
    color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5));
    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23ffffff%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.38%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
    border-bottom: 1px dotted rgba(255, 255, 255, 0.38); }
  .mdc-select--theme-dark.mdc-select[disabled],
  .mdc-theme--dark .mdc-select[disabled] {
    /* @alternate */
    color: rgba(255, 255, 255, 0.5);
    color: var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5));
    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%23ffffff%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.38%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
    border-bottom: 1px dotted rgba(255, 255, 255, 0.38); }
  .mdc-select__menu .mdc-list-item {
    font-family: Roboto, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
    line-height: 1.75rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    text-decoration: inherit;
    text-transform: inherit;
    /* @alternate */
    color: rgba(0, 0, 0, 0.54);
    color: var(--mdc-theme-text-secondary-on-light, rgba(0, 0, 0, 0.54)); }
    .mdc-select__menu .mdc-list-item[aria-selected="true"] {
      /* @alternate */
      color: rgba(0, 0, 0, 0.87);
      color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)); }
    .mdc-select--theme-dark .mdc-select__menu .mdc-list-item,
    .mdc-theme--dark .mdc-select__menu .mdc-list-item {
      /* @alternate */
      color: rgba(255, 255, 255, 0.7);
      color: var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)); }
      .mdc-select--theme-dark .mdc-select__menu .mdc-list-item[aria-selected="true"],
      .mdc-theme--dark .mdc-select__menu .mdc-list-item[aria-selected="true"] {
        /* @alternate */
        color: white;
        color: var(--mdc-theme-text-primary-on-dark, white); }
    .mdc-select__menu .mdc-list-item::before, .mdc-select__menu .mdc-list-item::after {
      top: calc(50% - 50%);
      left: calc(50% - 50%);
      width: 100%;
      height: 100%; }
    .mdc-select__menu .mdc-list-item.mdc-ripple-upgraded::before {
      top: calc(50% - 50%);
      left: calc(50% - 50%);
      width: 100%;
      height: 100%;
      -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));
              transform: scale(var(--mdc-ripple-fg-scale, 0)); }
    .mdc-select__menu .mdc-list-item.mdc-ripple-upgraded--unbounded::before {
      top: var(--mdc-ripple-top, calc(50% - 25%));
      left: var(--mdc-ripple-left, calc(50% - 25%));
      width: var(--mdc-ripple-fg-size, 50%);
      height: var(--mdc-ripple-fg-size, 50%);
      -webkit-transform: scale(var(--mdc-ripple-fg-scale, 0));
              transform: scale(var(--mdc-ripple-fg-scale, 0)); }
    .mdc-select__menu .mdc-list-item.mdc-ripple-upgraded::after {
      width: var(--mdc-ripple-fg-size, 50%);
      height: var(--mdc-ripple-fg-size, 50%); }
    .mdc-select__menu .mdc-list-item::before, .mdc-select__menu .mdc-list-item::after {
      border-radius: 0; }
  .mdc-select__menu .mdc-list-group,
  .mdc-select__menu .mdc-list-group > .mdc-list-item:first-child {
    margin-top: 12px; }
  .mdc-select__menu .mdc-list-group {
    /* @alternate */
    color: rgba(0, 0, 0, 0.38);
    color: var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38));
    font-weight: normal; }
    .mdc-select__menu .mdc-list-group .mdc-list-item {
      /* @alternate */
      color: rgba(0, 0, 0, 0.87);
      color: var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)); }
  .mdc-select--theme-dark .mdc-select__menu .mdc-list-group,
  .mdc-theme--dark .mdc-select__menu .mdc-list-group {
    /* @alternate */
    color: rgba(255, 255, 255, 0.5);
    color: var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)); }
    .mdc-select--theme-dark .mdc-select__menu .mdc-list-group .mdc-list-item,
    .mdc-theme--dark .mdc-select__menu .mdc-list-group .mdc-list-item {
      /* @alternate */
      color: white;
      color: var(--mdc-theme-text-primary-on-dark, white); }
       .mdc-select option:checked, option:hover {
      color: #ffffff;
      background-color: var(--primary-color);
   }

    select option {
      text-transform: capitalize;
    }
  /* End of Materialize Select Styles */
      </style>
      <div id="container"></div>
`}static get properties(){return{name:{type:String,value:"location"},hintText:{type:String,value:""},errorText:{type:String,value:""},value:{type:Array,value:[],observer:"render"},required:{type:Boolean,value:!1,observer:"render"},invalid:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"onInvalidChange"},showMetaData:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"render"},locationSrc:{type:String,value:"./assets/location-list.json",observer:"render"},showLevels:{type:String,value:"",observer:"render"},hidden:{type:Boolean,reflectToAttribute:!0,value:!1},disabled:{type:Boolean,value:!1,observer:"render"},filterBy:{type:String,value:"",observer:"render"},filterByGlobal:{type:Boolean,value:!1,observer:"render"}}}get locationList(){return this._locationList&&this.filterBy&&this.filterBy.length>0?_util_loc_js__WEBPACK_IMPORTED_MODULE_2__.a.filterById(this._locationList,this.filterBy.split(",")):this._locationList?this._locationList:void 0}set locationList(e){this._locationList=e,this._flatLocationList=_util_loc_js__WEBPACK_IMPORTED_MODULE_2__.a.flatten(e)}async connectedCallback(){super.connectedCallback(),this._template=this.innerHTML,this.filterByGlobal&&(this.filterBy=window.tangyLocationFilterBy),this.shadowRoot.addEventListener("change",this.onSelectionChange.bind(this));let e=this;const t=new XMLHttpRequest;t.onreadystatechange=function(){try{e.locationList=JSON.parse(this.responseText),e.render(),e.locationListLoaded=!0,e.dispatchEvent(new CustomEvent("location-list-loaded"))}catch(e){}},t.open("GET",this.locationSrc),t.send()}render(){if(!this.locationList)return this.$.container.innerHTML=Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("loading");let levels=[];""!==this.showLevels?this.showLevels.split(",").forEach(e=>levels.push(e)):this.locationList.locationsLevels.forEach(e=>levels.push(e));let selections=[...this.value];0===selections.length&&levels.forEach(e=>{selections=[...selections,{level:e,value:""}]});let options=this.calculateLevelOptions(selections,levels);this.$.container.innerHTML=`\n\n    <div class="flex-container m-y-25">\n      <div id="qnum-number">${this.hasAttribute("question-number")?`<label>${this.getAttribute("question-number")}</label>`:""}</div>\n      <div id="qnum-content">\n \n  ${selections.map((selection,i)=>`\n    \n    <div class="mdc-select">\n        <select class="mdc-select__surface"\n      name=${selection.level}\n      ${0===options[selection.level].length?"hidden":""}\n      ${this.disabled?"disabled":""}\n    > \n      <option value="" default selected ${0===options[selection.level].length?"hidden":""} disabled='disabled'>${Object(_util_t_js__WEBPACK_IMPORTED_MODULE_1__.a)("Pick a")} ${selection.level} </option>\n      \n      ${options[selection.level].map((e,t)=>`\n        <option \n          value="${e.id}" \n          ${selection.value===e.id?"selected":""}\n         >\n          ${e.label}\n        </option>\n      `)}\n    </select>\n    <div class="mdc-select__bottom-line"></div>\n    \n    </div>\n    ${this.showMetaData&&selection.value?`\n      <div id="metadata">\n        ${[this._flatLocationList.locations.find(e=>e.id===selection.value)].map(node=>this._template?eval(`\`${this._template}\``):Object.keys(node).map(e=>"parent"!==e&&"children"!==e?`<b>${e}</b>: ${node[e]}<br>`:"").join("")).join("")}\n      </div>\n    `:""}\n    <br />\n    <br />\n\n      `).join("")}\n        ${this.hintText?`<label id="hint-text" class="hint-text">${this.hintText}</label>`:""}\n        <div id="error-text">\n        </div>\n      </div>\n    </div>\n    `}onInvalidChange(e){this.shadowRoot.querySelector("#error-text")&&(this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:"")}calculateLevelOptions(e,t){let i={},n={},r="",a=e.find(e=>""===e.value);return r=a?a.level:"",e.forEach((t,i)=>{if(""===t.value&&t.level!==r)return;let a=e.slice(0,i),s=a.map(e=>e.level),o={};a.forEach(e=>o[e.level]=e.value),n[t.level]={levels:s,criteria:o}}),e.forEach(e=>{if(n[e.level]){let r=n[e.level];_util_loc_js__WEBPACK_IMPORTED_MODULE_2__.a.query(t,r.criteria,this.locationList,t=>{i[e.level]=t})}else i[e.level]=[]}),i}onSelectionChange(e){let t=this.showLevels.split(","),i=[...this.value];0===i.length&&t.forEach(e=>{i=[...i,{level:e,value:""}]});let n=i.map(i=>i.level===e.target.name?{level:e.target.name,value:e.target.value}:t.indexOf(i.level)>t.indexOf(e.target.name)?{level:i.level,value:""}:i),r=!1;n.find(e=>""===e.value),this.value=n,this.dispatchEvent(new Event("change"))}validate(){if(this.required&&!this.locationListLoaded)return!1;let e=!1;return this.shadowRoot.querySelectorAll("select").forEach(t=>{t.value||(e=!0)}),this.required&&(!this.required||this.disabled||this.hidden||e)?(this.invalid=!0,!1):(this.invalid=!1,!0)}getSelectedLocation(){let e=!1;if(this.shadowRoot.querySelectorAll("select").forEach(t=>{t.value||(e=!0)}),e)return!1;let t=[...this.value],i=this.locationList.locations[t.shift().value];return t.forEach(e=>i=i.children[e.value]),i}}window.customElements.define(TangyLocation.is,TangyLocation)},function(e,t,i){(function(e,i){var n;!function(){var r="object"==typeof self&&self.self===self&&self||"object"==typeof e&&e.global===e&&e||this||{},a=r._,s=Array.prototype,o=Object.prototype,l="undefined"!=typeof Symbol?Symbol.prototype:null,c=s.push,h=s.slice,d=o.toString,u=o.hasOwnProperty,p=Array.isArray,m=Object.keys,g=Object.create,f=function(){},v=function(e){return e instanceof v?e:this instanceof v?void(this._wrapped=e):new v(e)};t.nodeType?r._=v:(!i.nodeType&&i.exports&&(t=i.exports=v),t._=v),v.VERSION="1.9.1";var b,_=function(e,t,i){if(void 0===t)return e;switch(null==i?3:i){case 1:return function(i){return e.call(t,i)};case 3:return function(i,n,r){return e.call(t,i,n,r)};case 4:return function(i,n,r,a){return e.call(t,i,n,r,a)}}return function(){return e.apply(t,arguments)}},y=function(e,t,i){return v.iteratee!==b?v.iteratee(e,t):null==e?v.identity:v.isFunction(e)?_(e,t,i):v.isObject(e)&&!v.isArray(e)?v.matcher(e):v.property(e)};v.iteratee=b=function(e,t){return y(e,t,1/0)};var w=function(e,t){return t=null==t?e.length-1:+t,function(){for(var i=Math.max(arguments.length-t,0),n=Array(i),r=0;r<i;r++)n[r]=arguments[r+t];switch(t){case 0:return e.call(this,n);case 1:return e.call(this,arguments[0],n);case 2:return e.call(this,arguments[0],arguments[1],n)}var a=Array(t+1);for(r=0;r<t;r++)a[r]=arguments[r];return a[t]=n,e.apply(this,a)}},C=function(e){if(!v.isObject(e))return{};if(g)return g(e);f.prototype=e;var t=new f;return f.prototype=null,t},z=function(e){return function(t){return null==t?void 0:t[e]}},E=function(e,t){return null!=e&&u.call(e,t)},A=function(e,t){for(var i=t.length,n=0;n<i;n++){if(null==e)return;e=e[t[n]]}return i?e:void 0},S=Math.pow(2,53)-1,M=z("length"),x=function(e){var t=M(e);return"number"==typeof t&&t>=0&&t<=S};v.each=v.forEach=function(e,t,i){var n,r;if(t=_(t,i),x(e))for(n=0,r=e.length;n<r;n++)t(e[n],n,e);else{var a=v.keys(e);for(n=0,r=a.length;n<r;n++)t(e[a[n]],a[n],e)}return e},v.map=v.collect=function(e,t,i){t=y(t,i);for(var n=!x(e)&&v.keys(e),r=(n||e).length,a=Array(r),s=0;s<r;s++){var o=n?n[s]:s;a[s]=t(e[o],o,e)}return a};var T=function(e){var t=function(t,i,n,r){var a=!x(t)&&v.keys(t),s=(a||t).length,o=e>0?0:s-1;for(r||(n=t[a?a[o]:o],o+=e);o>=0&&o<s;o+=e){var l=a?a[o]:o;n=i(n,t[l],l,t)}return n};return function(e,i,n,r){var a=arguments.length>=3;return t(e,_(i,r,4),n,a)}};v.reduce=v.foldl=v.inject=T(1),v.reduceRight=v.foldr=T(-1),v.find=v.detect=function(e,t,i){var n=(x(e)?v.findIndex:v.findKey)(e,t,i);if(void 0!==n&&-1!==n)return e[n]},v.filter=v.select=function(e,t,i){var n=[];return t=y(t,i),v.each(e,(function(e,i,r){t(e,i,r)&&n.push(e)})),n},v.reject=function(e,t,i){return v.filter(e,v.negate(y(t)),i)},v.every=v.all=function(e,t,i){t=y(t,i);for(var n=!x(e)&&v.keys(e),r=(n||e).length,a=0;a<r;a++){var s=n?n[a]:a;if(!t(e[s],s,e))return!1}return!0},v.some=v.any=function(e,t,i){t=y(t,i);for(var n=!x(e)&&v.keys(e),r=(n||e).length,a=0;a<r;a++){var s=n?n[a]:a;if(t(e[s],s,e))return!0}return!1},v.contains=v.includes=v.include=function(e,t,i,n){return x(e)||(e=v.values(e)),("number"!=typeof i||n)&&(i=0),v.indexOf(e,t,i)>=0},v.invoke=w((function(e,t,i){var n,r;return v.isFunction(t)?r=t:v.isArray(t)&&(n=t.slice(0,-1),t=t[t.length-1]),v.map(e,(function(e){var a=r;if(!a){if(n&&n.length&&(e=A(e,n)),null==e)return;a=e[t]}return null==a?a:a.apply(e,i)}))})),v.pluck=function(e,t){return v.map(e,v.property(t))},v.where=function(e,t){return v.filter(e,v.matcher(t))},v.findWhere=function(e,t){return v.find(e,v.matcher(t))},v.max=function(e,t,i){var n,r,a=-1/0,s=-1/0;if(null==t||"number"==typeof t&&"object"!=typeof e[0]&&null!=e)for(var o=0,l=(e=x(e)?e:v.values(e)).length;o<l;o++)null!=(n=e[o])&&n>a&&(a=n);else t=y(t,i),v.each(e,(function(e,i,n){((r=t(e,i,n))>s||r===-1/0&&a===-1/0)&&(a=e,s=r)}));return a},v.min=function(e,t,i){var n,r,a=1/0,s=1/0;if(null==t||"number"==typeof t&&"object"!=typeof e[0]&&null!=e)for(var o=0,l=(e=x(e)?e:v.values(e)).length;o<l;o++)null!=(n=e[o])&&n<a&&(a=n);else t=y(t,i),v.each(e,(function(e,i,n){((r=t(e,i,n))<s||r===1/0&&a===1/0)&&(a=e,s=r)}));return a},v.shuffle=function(e){return v.sample(e,1/0)},v.sample=function(e,t,i){if(null==t||i)return x(e)||(e=v.values(e)),e[v.random(e.length-1)];var n=x(e)?v.clone(e):v.values(e),r=M(n);t=Math.max(Math.min(t,r),0);for(var a=r-1,s=0;s<t;s++){var o=v.random(s,a),l=n[s];n[s]=n[o],n[o]=l}return n.slice(0,t)},v.sortBy=function(e,t,i){var n=0;return t=y(t,i),v.pluck(v.map(e,(function(e,i,r){return{value:e,index:n++,criteria:t(e,i,r)}})).sort((function(e,t){var i=e.criteria,n=t.criteria;if(i!==n){if(i>n||void 0===i)return 1;if(i<n||void 0===n)return-1}return e.index-t.index})),"value")};var I=function(e,t){return function(i,n,r){var a=t?[[],[]]:{};return n=y(n,r),v.each(i,(function(t,r){var s=n(t,r,i);e(a,t,s)})),a}};v.groupBy=I((function(e,t,i){E(e,i)?e[i].push(t):e[i]=[t]})),v.indexBy=I((function(e,t,i){e[i]=t})),v.countBy=I((function(e,t,i){E(e,i)?e[i]++:e[i]=1}));var k=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;v.toArray=function(e){return e?v.isArray(e)?h.call(e):v.isString(e)?e.match(k):x(e)?v.map(e,v.identity):v.values(e):[]},v.size=function(e){return null==e?0:x(e)?e.length:v.keys(e).length},v.partition=I((function(e,t,i){e[i?0:1].push(t)}),!0),v.first=v.head=v.take=function(e,t,i){return null==e||e.length<1?null==t?void 0:[]:null==t||i?e[0]:v.initial(e,e.length-t)},v.initial=function(e,t,i){return h.call(e,0,Math.max(0,e.length-(null==t||i?1:t)))},v.last=function(e,t,i){return null==e||e.length<1?null==t?void 0:[]:null==t||i?e[e.length-1]:v.rest(e,Math.max(0,e.length-t))},v.rest=v.tail=v.drop=function(e,t,i){return h.call(e,null==t||i?1:t)},v.compact=function(e){return v.filter(e,Boolean)};var O=function(e,t,i,n){for(var r=(n=n||[]).length,a=0,s=M(e);a<s;a++){var o=e[a];if(x(o)&&(v.isArray(o)||v.isArguments(o)))if(t)for(var l=0,c=o.length;l<c;)n[r++]=o[l++];else O(o,t,i,n),r=n.length;else i||(n[r++]=o)}return n};v.flatten=function(e,t){return O(e,t,!1)},v.without=w((function(e,t){return v.difference(e,t)})),v.uniq=v.unique=function(e,t,i,n){v.isBoolean(t)||(n=i,i=t,t=!1),null!=i&&(i=y(i,n));for(var r=[],a=[],s=0,o=M(e);s<o;s++){var l=e[s],c=i?i(l,s,e):l;t&&!i?(s&&a===c||r.push(l),a=c):i?v.contains(a,c)||(a.push(c),r.push(l)):v.contains(r,l)||r.push(l)}return r},v.union=w((function(e){return v.uniq(O(e,!0,!0))})),v.intersection=function(e){for(var t=[],i=arguments.length,n=0,r=M(e);n<r;n++){var a=e[n];if(!v.contains(t,a)){var s;for(s=1;s<i&&v.contains(arguments[s],a);s++);s===i&&t.push(a)}}return t},v.difference=w((function(e,t){return t=O(t,!0,!0),v.filter(e,(function(e){return!v.contains(t,e)}))})),v.unzip=function(e){for(var t=e&&v.max(e,M).length||0,i=Array(t),n=0;n<t;n++)i[n]=v.pluck(e,n);return i},v.zip=w(v.unzip),v.object=function(e,t){for(var i={},n=0,r=M(e);n<r;n++)t?i[e[n]]=t[n]:i[e[n][0]]=e[n][1];return i};var H=function(e){return function(t,i,n){i=y(i,n);for(var r=M(t),a=e>0?0:r-1;a>=0&&a<r;a+=e)if(i(t[a],a,t))return a;return-1}};v.findIndex=H(1),v.findLastIndex=H(-1),v.sortedIndex=function(e,t,i,n){for(var r=(i=y(i,n,1))(t),a=0,s=M(e);a<s;){var o=Math.floor((a+s)/2);i(e[o])<r?a=o+1:s=o}return a};var L=function(e,t,i){return function(n,r,a){var s=0,o=M(n);if("number"==typeof a)e>0?s=a>=0?a:Math.max(a+o,s):o=a>=0?Math.min(a+1,o):a+o+1;else if(i&&a&&o)return n[a=i(n,r)]===r?a:-1;if(r!=r)return(a=t(h.call(n,s,o),v.isNaN))>=0?a+s:-1;for(a=e>0?s:o-1;a>=0&&a<o;a+=e)if(n[a]===r)return a;return-1}};v.indexOf=L(1,v.findIndex,v.sortedIndex),v.lastIndexOf=L(-1,v.findLastIndex),v.range=function(e,t,i){null==t&&(t=e||0,e=0),i||(i=t<e?-1:1);for(var n=Math.max(Math.ceil((t-e)/i),0),r=Array(n),a=0;a<n;a++,e+=i)r[a]=e;return r},v.chunk=function(e,t){if(null==t||t<1)return[];for(var i=[],n=0,r=e.length;n<r;)i.push(h.call(e,n,n+=t));return i};var V=function(e,t,i,n,r){if(!(n instanceof t))return e.apply(i,r);var a=C(e.prototype),s=e.apply(a,r);return v.isObject(s)?s:a};v.bind=w((function(e,t,i){if(!v.isFunction(e))throw new TypeError("Bind must be called on a function");var n=w((function(r){return V(e,n,t,this,i.concat(r))}));return n})),v.partial=w((function(e,t){var i=v.partial.placeholder,n=function(){for(var r=0,a=t.length,s=Array(a),o=0;o<a;o++)s[o]=t[o]===i?arguments[r++]:t[o];for(;r<arguments.length;)s.push(arguments[r++]);return V(e,n,this,this,s)};return n})),v.partial.placeholder=v,v.bindAll=w((function(e,t){var i=(t=O(t,!1,!1)).length;if(i<1)throw new Error("bindAll must be passed function names");for(;i--;){var n=t[i];e[n]=v.bind(e[n],e)}})),v.memoize=function(e,t){var i=function(n){var r=i.cache,a=""+(t?t.apply(this,arguments):n);return E(r,a)||(r[a]=e.apply(this,arguments)),r[a]};return i.cache={},i},v.delay=w((function(e,t,i){return setTimeout((function(){return e.apply(null,i)}),t)})),v.defer=v.partial(v.delay,v,1),v.throttle=function(e,t,i){var n,r,a,s,o=0;i||(i={});var l=function(){o=!1===i.leading?0:v.now(),n=null,s=e.apply(r,a),n||(r=a=null)},c=function(){var c=v.now();o||!1!==i.leading||(o=c);var h=t-(c-o);return r=this,a=arguments,h<=0||h>t?(n&&(clearTimeout(n),n=null),o=c,s=e.apply(r,a),n||(r=a=null)):n||!1===i.trailing||(n=setTimeout(l,h)),s};return c.cancel=function(){clearTimeout(n),o=0,n=r=a=null},c},v.debounce=function(e,t,i){var n,r,a=function(t,i){n=null,i&&(r=e.apply(t,i))},s=w((function(s){if(n&&clearTimeout(n),i){var o=!n;n=setTimeout(a,t),o&&(r=e.apply(this,s))}else n=v.delay(a,t,this,s);return r}));return s.cancel=function(){clearTimeout(n),n=null},s},v.wrap=function(e,t){return v.partial(t,e)},v.negate=function(e){return function(){return!e.apply(this,arguments)}},v.compose=function(){var e=arguments,t=e.length-1;return function(){for(var i=t,n=e[t].apply(this,arguments);i--;)n=e[i].call(this,n);return n}},v.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},v.before=function(e,t){var i;return function(){return--e>0&&(i=t.apply(this,arguments)),e<=1&&(t=null),i}},v.once=v.partial(v.before,2),v.restArguments=w;var D=!{toString:null}.propertyIsEnumerable("toString"),N=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],R=function(e,t){var i=N.length,n=e.constructor,r=v.isFunction(n)&&n.prototype||o,a="constructor";for(E(e,a)&&!v.contains(t,a)&&t.push(a);i--;)(a=N[i])in e&&e[a]!==r[a]&&!v.contains(t,a)&&t.push(a)};v.keys=function(e){if(!v.isObject(e))return[];if(m)return m(e);var t=[];for(var i in e)E(e,i)&&t.push(i);return D&&R(e,t),t},v.allKeys=function(e){if(!v.isObject(e))return[];var t=[];for(var i in e)t.push(i);return D&&R(e,t),t},v.values=function(e){for(var t=v.keys(e),i=t.length,n=Array(i),r=0;r<i;r++)n[r]=e[t[r]];return n},v.mapObject=function(e,t,i){t=y(t,i);for(var n=v.keys(e),r=n.length,a={},s=0;s<r;s++){var o=n[s];a[o]=t(e[o],o,e)}return a},v.pairs=function(e){for(var t=v.keys(e),i=t.length,n=Array(i),r=0;r<i;r++)n[r]=[t[r],e[t[r]]];return n},v.invert=function(e){for(var t={},i=v.keys(e),n=0,r=i.length;n<r;n++)t[e[i[n]]]=i[n];return t},v.functions=v.methods=function(e){var t=[];for(var i in e)v.isFunction(e[i])&&t.push(i);return t.sort()};var P=function(e,t){return function(i){var n=arguments.length;if(t&&(i=Object(i)),n<2||null==i)return i;for(var r=1;r<n;r++)for(var a=arguments[r],s=e(a),o=s.length,l=0;l<o;l++){var c=s[l];t&&void 0!==i[c]||(i[c]=a[c])}return i}};v.extend=P(v.allKeys),v.extendOwn=v.assign=P(v.keys),v.findKey=function(e,t,i){t=y(t,i);for(var n,r=v.keys(e),a=0,s=r.length;a<s;a++)if(t(e[n=r[a]],n,e))return n};var B,F,j=function(e,t,i){return t in i};v.pick=w((function(e,t){var i={},n=t[0];if(null==e)return i;v.isFunction(n)?(t.length>1&&(n=_(n,t[1])),t=v.allKeys(e)):(n=j,t=O(t,!1,!1),e=Object(e));for(var r=0,a=t.length;r<a;r++){var s=t[r],o=e[s];n(o,s,e)&&(i[s]=o)}return i})),v.omit=w((function(e,t){var i,n=t[0];return v.isFunction(n)?(n=v.negate(n),t.length>1&&(i=t[1])):(t=v.map(O(t,!1,!1),String),n=function(e,i){return!v.contains(t,i)}),v.pick(e,n,i)})),v.defaults=P(v.allKeys,!0),v.create=function(e,t){var i=C(e);return t&&v.extendOwn(i,t),i},v.clone=function(e){return v.isObject(e)?v.isArray(e)?e.slice():v.extend({},e):e},v.tap=function(e,t){return t(e),e},v.isMatch=function(e,t){var i=v.keys(t),n=i.length;if(null==e)return!n;for(var r=Object(e),a=0;a<n;a++){var s=i[a];if(t[s]!==r[s]||!(s in r))return!1}return!0},B=function(e,t,i,n){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return!1;if(e!=e)return t!=t;var r=typeof e;return("function"===r||"object"===r||"object"==typeof t)&&F(e,t,i,n)},F=function(e,t,i,n){e instanceof v&&(e=e._wrapped),t instanceof v&&(t=t._wrapped);var r=d.call(e);if(r!==d.call(t))return!1;switch(r){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object Symbol]":return l.valueOf.call(e)===l.valueOf.call(t)}var a="[object Array]"===r;if(!a){if("object"!=typeof e||"object"!=typeof t)return!1;var s=e.constructor,o=t.constructor;if(s!==o&&!(v.isFunction(s)&&s instanceof s&&v.isFunction(o)&&o instanceof o)&&"constructor"in e&&"constructor"in t)return!1}n=n||[];for(var c=(i=i||[]).length;c--;)if(i[c]===e)return n[c]===t;if(i.push(e),n.push(t),a){if((c=e.length)!==t.length)return!1;for(;c--;)if(!B(e[c],t[c],i,n))return!1}else{var h,u=v.keys(e);if(c=u.length,v.keys(t).length!==c)return!1;for(;c--;)if(h=u[c],!E(t,h)||!B(e[h],t[h],i,n))return!1}return i.pop(),n.pop(),!0},v.isEqual=function(e,t){return B(e,t)},v.isEmpty=function(e){return null==e||(x(e)&&(v.isArray(e)||v.isString(e)||v.isArguments(e))?0===e.length:0===v.keys(e).length)},v.isElement=function(e){return!(!e||1!==e.nodeType)},v.isArray=p||function(e){return"[object Array]"===d.call(e)},v.isObject=function(e){var t=typeof e;return"function"===t||"object"===t&&!!e},v.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],(function(e){v["is"+e]=function(t){return d.call(t)==="[object "+e+"]"}})),v.isArguments(arguments)||(v.isArguments=function(e){return E(e,"callee")});var U=r.document&&r.document.childNodes;"object"!=typeof Int8Array&&"function"!=typeof U&&(v.isFunction=function(e){return"function"==typeof e||!1}),v.isFinite=function(e){return!v.isSymbol(e)&&isFinite(e)&&!isNaN(parseFloat(e))},v.isNaN=function(e){return v.isNumber(e)&&isNaN(e)},v.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===d.call(e)},v.isNull=function(e){return null===e},v.isUndefined=function(e){return void 0===e},v.has=function(e,t){if(!v.isArray(t))return E(e,t);for(var i=t.length,n=0;n<i;n++){var r=t[n];if(null==e||!u.call(e,r))return!1;e=e[r]}return!!i},v.noConflict=function(){return r._=a,this},v.identity=function(e){return e},v.constant=function(e){return function(){return e}},v.noop=function(){},v.property=function(e){return v.isArray(e)?function(t){return A(t,e)}:z(e)},v.propertyOf=function(e){return null==e?function(){}:function(t){return v.isArray(t)?A(e,t):e[t]}},v.matcher=v.matches=function(e){return e=v.extendOwn({},e),function(t){return v.isMatch(t,e)}},v.times=function(e,t,i){var n=Array(Math.max(0,e));t=_(t,i,1);for(var r=0;r<e;r++)n[r]=t(r);return n},v.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},v.now=Date.now||function(){return(new Date).getTime()};var q={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},$=v.invert(q),K=function(e){var t=function(t){return e[t]},i="(?:"+v.keys(e).join("|")+")",n=RegExp(i),r=RegExp(i,"g");return function(e){return e=null==e?"":""+e,n.test(e)?e.replace(r,t):e}};v.escape=K(q),v.unescape=K($),v.result=function(e,t,i){v.isArray(t)||(t=[t]);var n=t.length;if(!n)return v.isFunction(i)?i.call(e):i;for(var r=0;r<n;r++){var a=null==e?void 0:e[t[r]];void 0===a&&(a=i,r=n),e=v.isFunction(a)?a.call(e):a}return e};var W=0;v.uniqueId=function(e){var t=++W+"";return e?e+t:t},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var G=/(.)^/,Y={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},X=/\\|'|\r|\n|\u2028|\u2029/g,Z=function(e){return"\\"+Y[e]};v.template=function(e,t,i){!t&&i&&(t=i),t=v.defaults({},t,v.templateSettings);var n,r=RegExp([(t.escape||G).source,(t.interpolate||G).source,(t.evaluate||G).source].join("|")+"|$","g"),a=0,s="__p+='";e.replace(r,(function(t,i,n,r,o){return s+=e.slice(a,o).replace(X,Z),a=o+t.length,i?s+="'+\n((__t=("+i+"))==null?'':_.escape(__t))+\n'":n?s+="'+\n((__t=("+n+"))==null?'':__t)+\n'":r&&(s+="';\n"+r+"\n__p+='"),t})),s+="';\n",t.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{n=new Function(t.variable||"obj","_",s)}catch(e){throw e.source=s,e}var o=function(e){return n.call(this,e,v)},l=t.variable||"obj";return o.source="function("+l+"){\n"+s+"}",o},v.chain=function(e){var t=v(e);return t._chain=!0,t};var J=function(e,t){return e._chain?v(t).chain():t};v.mixin=function(e){return v.each(v.functions(e),(function(t){var i=v[t]=e[t];v.prototype[t]=function(){var e=[this._wrapped];return c.apply(e,arguments),J(this,i.apply(v,e))}})),v},v.mixin(v),v.each(["pop","push","reverse","shift","sort","splice","unshift"],(function(e){var t=s[e];v.prototype[e]=function(){var i=this._wrapped;return t.apply(i,arguments),"shift"!==e&&"splice"!==e||0!==i.length||delete i[0],J(this,i)}})),v.each(["concat","join","slice"],(function(e){var t=s[e];v.prototype[e]=function(){return J(this,t.apply(this._wrapped,arguments))}})),v.prototype.value=function(){return this._wrapped},v.prototype.valueOf=v.prototype.toJSON=v.prototype.value,v.prototype.toString=function(){return String(this._wrapped)},void 0===(n=function(){return v}.apply(t,[]))||(i.exports=n)}()}).call(this,i(84),i(85)(e))},function(e,t){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(e){"object"==typeof window&&(i=window)}e.exports=i},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,i){"use strict";i.r(t);i(74);var n=i(0),r=(i(11),i(5),i(31),i(23),i(53)),a=i(7),s=i(3),o=i(32);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const l=s.a`
<style>
  :host {
    display: inline-block;
    line-height: 0;
    white-space: nowrap;
    cursor: pointer;
    @apply --paper-font-common-base;
    --calculated-paper-radio-button-size: var(--paper-radio-button-size, 16px);
    /* -1px is a sentinel for the default and is replace in \`attached\`. */
    --calculated-paper-radio-button-ink-size: var(--paper-radio-button-ink-size, -1px);
  }

  :host(:focus) {
    outline: none;
  }

  #radioContainer {
    @apply --layout-inline;
    @apply --layout-center-center;
    position: relative;
    width: var(--calculated-paper-radio-button-size);
    height: var(--calculated-paper-radio-button-size);
    vertical-align: middle;

    @apply --paper-radio-button-radio-container;
  }

  #ink {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    width: var(--calculated-paper-radio-button-ink-size);
    height: var(--calculated-paper-radio-button-ink-size);
    color: var(--paper-radio-button-unchecked-ink-color, var(--primary-text-color));
    opacity: 0.6;
    pointer-events: none;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  #ink[checked] {
    color: var(--paper-radio-button-checked-ink-color, var(--primary-color));
  }

  #offRadio, #onRadio {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  #offRadio {
    border: 2px solid var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    background-color: var(--paper-radio-button-unchecked-background-color, transparent);
    transition: border-color 0.28s;
  }

  #onRadio {
    background-color: var(--paper-radio-button-checked-color, var(--primary-color));
    -webkit-transform: scale(0);
    transform: scale(0);
    transition: -webkit-transform ease 0.28s;
    transition: transform ease 0.28s;
    will-change: transform;
  }

  :host([checked]) #offRadio {
    border-color: var(--paper-radio-button-checked-color, var(--primary-color));
  }

  :host([checked]) #onRadio {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  #radioLabel {
    line-height: normal;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: var(--paper-radio-button-label-spacing, 10px);
    white-space: normal;
    color: var(--paper-radio-button-label-color, var(--primary-text-color));

    @apply --paper-radio-button-label;
  }

  :host([checked]) #radioLabel {
    @apply --paper-radio-button-label-checked;
  }

  #radioLabel:dir(rtl) {
    margin-left: 0;
    margin-right: var(--paper-radio-button-label-spacing, 10px);
  }

  #radioLabel[hidden] {
    display: none;
  }

  /* disabled state */

  :host([disabled]) #offRadio {
    border-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled][checked]) #onRadio {
    background-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled]) #radioLabel {
    /* slightly darker than the button, so that it's readable */
    opacity: 0.65;
  }
</style>

<div id="radioContainer">
  <div id="offRadio"></div>
  <div id="onRadio"></div>
</div>

<div id="radioLabel"><slot></slot></div>`;l.setAttribute("strip-whitespace",""),Object(a.a)({_template:l,is:"paper-radio-button",behaviors:[r.a],hostAttributes:{role:"radio","aria-checked":!1,tabindex:0},properties:{ariaActiveAttribute:{type:String,value:"aria-checked"}},ready:function(){this._rippleContainer=this.$.radioContainer},attached:function(){Object(o.a)(this,(function(){if("-1px"===this.getComputedStyleValue("--calculated-paper-radio-button-ink-size").trim()){var e=parseFloat(this.getComputedStyleValue("--calculated-paper-radio-button-size").trim()),t=Math.floor(3*e);t%2!=e%2&&t++,this.updateStyles({"--paper-radio-button-ink-size":t+"px"})}}))}});i(9),i(13);class c extends n.a{static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <slot></slot>
    `}static get is(){return"tangy-box"}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},value:{type:String,value:"",observer:"render",reflectToAttribute:!0}}}}window.customElements.define(c.is,c);var h=i(1),d=i(19),u=i(30),p=i(4);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(a.a)({_template:s.a`
    <style>
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        border: 1px solid;
        padding: 2px;
        -moz-appearance: textarea;
        -webkit-appearance: textarea;
        overflow: hidden;
      }

      .mirror-text {
        visibility: hidden;
        word-wrap: break-word;
        @apply --iron-autogrow-textarea;
      }

      .fit {
        @apply --layout-fit;
      }

      textarea {
        position: relative;
        outline: none;
        border: none;
        resize: none;
        background: inherit;
        color: inherit;
        /* see comments in template */
        width: 100%;
        height: 100%;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        text-align: inherit;
        @apply --iron-autogrow-textarea;
      }

      textarea::-webkit-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea::-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-ms-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }
    </style>

    <!-- the mirror sizes the input/textarea so it grows with typing -->
    <!-- use &#160; instead &nbsp; of to allow this element to be used in XHTML -->
    <div id="mirror" class="mirror-text" aria-hidden="true">&nbsp;</div>

    <!-- size the input/textarea with a div, because the textarea has intrinsic size in ff -->
    <div class="textarea-container fit">
      <textarea id="textarea" name\$="[[name]]" aria-label\$="[[label]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" required\$="[[required]]" disabled\$="[[disabled]]" rows\$="[[rows]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]"></textarea>
    </div>
`,is:"iron-autogrow-textarea",behaviors:[u.a,d.a],properties:{value:{observer:"_valueChanged",type:String,notify:!0},bindValue:{observer:"_bindValueChanged",type:String,notify:!0},rows:{type:Number,value:1,observer:"_updateCached"},maxRows:{type:Number,value:0,observer:"_updateCached"},autocomplete:{type:String,value:"off"},autofocus:{type:Boolean,value:!1},inputmode:{type:String},placeholder:{type:String},readonly:{type:String},required:{type:Boolean},minlength:{type:Number},maxlength:{type:Number},label:{type:String}},listeners:{input:"_onInput"},get textarea(){return this.$.textarea},get selectionStart(){return this.$.textarea.selectionStart},get selectionEnd(){return this.$.textarea.selectionEnd},set selectionStart(e){this.$.textarea.selectionStart=e},set selectionEnd(e){this.$.textarea.selectionEnd=e},attached:function(){navigator.userAgent.match(/iP(?:[oa]d|hone)/)&&(this.$.textarea.style.marginLeft="-3px")},validate:function(){var e=this.$.textarea.validity.valid;return e&&(this.required&&""===this.value?e=!1:this.hasValidator()&&(e=u.a.validate.call(this,this.value))),this.invalid=!e,this.fire("iron-input-validate"),e},_bindValueChanged:function(e){this.value=e},_valueChanged:function(e){var t=this.textarea;t&&(t.value!==e&&(t.value=e||0===e?e:""),this.bindValue=e,this.$.mirror.innerHTML=this._valueForMirror(),this.fire("bind-value-changed",{value:this.bindValue}))},_onInput:function(e){var t=Object(p.a)(e).path;this.value=t?t[0].value:e.target.value},_constrain:function(e){var t;for(e=e||[""],t=this.maxRows>0&&e.length>this.maxRows?e.slice(0,this.maxRows):e.slice(0);this.rows>0&&t.length<this.rows;)t.push("");return t.join("<br/>")+"&#160;"},_valueForMirror:function(){var e=this.textarea;if(e)return this.tokens=e&&e.value?e.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this._constrain(this.tokens)},_updateCached:function(){this.$.mirror.innerHTML=this._constrain(this.tokens)}});i(66),i(67),i(68);var m=i(37),g=i(52);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object(a.a)({_template:s.a`
    <style>
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none !important;
      }

      label {
        pointer-events: none;
      }
    </style>

    <paper-input-container no-label-float$="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]">

      <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>

      <iron-autogrow-textarea class="paper-input-input" slot="input" id$="[[_inputId]]" aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" bind-value="{{value}}" invalid="{{invalid}}" validator$="[[validator]]" disabled$="[[disabled]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" name$="[[name]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" required$="[[required]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]" autocapitalize$="[[autocapitalize]]" rows$="[[rows]]" max-rows$="[[maxRows]]" on-change="_onChange"></iron-autogrow-textarea>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

      <template is="dom-if" if="[[charCounter]]">
        <paper-input-char-counter slot="add-on"></paper-input-char-counter>
      </template>

    </paper-input-container>
`,is:"paper-textarea",behaviors:[g.a,m.a],properties:{_ariaLabelledBy:{observer:"_ariaLabelledByChanged",type:String},_ariaDescribedBy:{observer:"_ariaDescribedByChanged",type:String},value:{type:String},rows:{type:Number,value:1},maxRows:{type:Number,value:0}},get selectionStart(){return this.$.input.textarea.selectionStart},set selectionStart(e){this.$.input.textarea.selectionStart=e},get selectionEnd(){return this.$.input.textarea.selectionEnd},set selectionEnd(e){this.$.input.textarea.selectionEnd=e},_ariaLabelledByChanged:function(e){this._focusableElement.setAttribute("aria-labelledby",e)},_ariaDescribedByChanged:function(e){this._focusableElement.setAttribute("aria-describedby",e)},get _focusableElement(){return this.inputElement.textarea}});i(70);function f(e,t){let i=document.createElement("template");return i.innerHTML=e,t=(t=t||document.documentElement.lang)||"en",i.content.querySelectorAll("t-lang").forEach(e=>{e.hasAttribute(t)?function(e){var t=e.parentNode;for(;e.firstChild;)t.insertBefore(e.firstChild,e);t.removeChild(e)}(e):e.remove()}),i.innerHTML}class v extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
      paper-input, paper-textarea {
        --paper-input-container-shared-input-style_-_font-size: 1em;
        --paper-font-subhead_-_font-size: 1em;
        --paper-font-subhead_-_line-height: 1em;
      }
      :host([invalid]) #hintText {
        position: relative;
        top: 5px;
      }

    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <div id="container"></div>
      </div>
    </div>

  `}static get is(){return"tangy-input"}static get properties(){return{name:{type:String,value:""},private:{type:Boolean,value:!1},label:{type:String,observer:"reflect",value:""},innerLabel:{type:String,observer:"reflect",value:""},placeholder:{type:String,observer:"reflect",value:""},hintText:{type:String,observer:"reflect",value:""},type:{type:String,observer:"reflect",value:""},required:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},value:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},min:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},max:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},questionNumber:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},errorText:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},allowedPattern:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},errorMessage:{type:String,observer:"reflect",value:""}}}connectedCallback(){super.connectedCallback(),this.$.container.innerHTML=`   \n      <label id="label"></label>\n      <label id="hintText" class="hint-text"></label>\n      ${"email"===this.getAttribute("type")||"number"===this.getAttribute("type")||"date"===this.getAttribute("type")||"time"===this.getAttribute("type")||this.getAttribute("allowed-pattern")?'<paper-input id="input"></paper-input>':'<paper-textarea id="input"></paper-textarea>'}\n      <div id="error-text"></div>    \n    \n    `,this.shadowRoot.querySelector("#input").addEventListener("value-changed",e=>{if(this.justReflectedValue)return void(this.justReflectedValue=!1);this.value=e.target.value;let t=""===e.target.value;this.dispatchEvent(new Event("change",{detail:{inputName:this.name,inputValue:e.target.value,inputIncomplete:t,inputInvalid:!this.shadowRoot.querySelector("#input").validate()},bubbles:!0}))}),this.ready=!0,this.reflect()}reflect(){if(!this.ready)return;if(!this.shadowRoot.querySelector("#input"))return;this.hasAttribute("disabled")&&this.hasAttribute("invalid")&&(this.removeAttribute("invalid"),this.shadowRoot.querySelector("#input").removeAttribute("invalid")),this.$["qnum-number"].innerHTML=`<label>${this.questionNumber}</label>`,this.shadowRoot.querySelector("#hintText").innerHTML=this.hintText,this.shadowRoot.querySelector("#label").innerHTML=this.label,this.shadowRoot.querySelector("#input").placeholder=f(this.placeholder),this.shadowRoot.querySelector("#input").label=""===this.innerLabel?Object(h.a)("Enter your response to above question here"):f(this.innerLabel),this.shadowRoot.querySelector("#input").errorMessage=f(this.errorMessage),this.shadowRoot.querySelector("#input").allowedPattern=this.allowedPattern,this.shadowRoot.querySelector("#input").setAttribute("type",this.type?this.type:"text"),(this.value?this.value:"")===(this.shadowRoot.querySelector("#input").value?this.shadowRoot.querySelector("#input").value:"")&&void 0!==this.shadowRoot.querySelector("#input").value||(this.justReflectedValue=!0,this.shadowRoot.querySelector("#input").value=this.value),this.shadowRoot.querySelector("#input").setAttribute("min",this.min),this.shadowRoot.querySelector("#input").setAttribute("max",this.max),!1===this.required?this.shadowRoot.querySelector("#input").removeAttribute("required"):this.shadowRoot.querySelector("#input").setAttribute("required",!0),!1===this.disabled?this.shadowRoot.querySelector("#input").removeAttribute("disabled"):this.shadowRoot.querySelector("#input").setAttribute("disabled",!0)}onInvalidChange(e){this.shadowRoot.querySelector("#error-text")&&(this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:"")}validate(){return this.hasAttribute("disabled")||this.hasAttribute("hidden")?(this.removeAttribute("invalid"),!0):this.shadowRoot.querySelector("#input").validate()?(this.removeAttribute("invalid"),!0):(this.setAttribute("invalid",""),!1)}}window.customElements.define(v.is,v);i(45),i(58),i(17),i(40);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const b=s.a`<iron-iconset-svg name="av" size="24">
<svg><defs>
<g id="add-to-queue"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2h-3v3h-2v-3H8v-2h3V7h2v3h3z"></path></g>
<g id="airplay"><path d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="album"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path></g>
<g id="art-track"><path d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3-1.75 2.26-1.25-1.51L3.5 15h7z"></path></g>
<g id="av-timer"><path d="M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"></path></g>
<g id="branding-watermark"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16h-9v-6h9v6z"></path></g>
<g id="call-to-action"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3v-3h18v3z"></path></g>
<g id="closed-caption"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"></path></g>
<g id="equalizer"><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"></path></g>
<g id="explicit"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z"></path></g>
<g id="fast-forward"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path></g>
<g id="fast-rewind"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path></g>
<g id="featured-play-list"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8H3V9h9v2zm0-4H3V5h9v2z"></path></g>
<g id="featured-video"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9H3V5h9v7z"></path></g>
<g id="fiber-dvr"><path d="M17.5 10.5h2v1h-2zm-13 0h2v3h-2zM21 3H3c-1.11 0-2 .89-2 2v14c0 1.1.89 2 2 2h18c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zM8 13.5c0 .85-.65 1.5-1.5 1.5H3V9h3.5c.85 0 1.5.65 1.5 1.5v3zm4.62 1.5h-1.5L9.37 9h1.5l1 3.43 1-3.43h1.5l-1.75 6zM21 11.5c0 .6-.4 1.15-.9 1.4L21 15h-1.5l-.85-2H17.5v2H16V9h3.5c.85 0 1.5.65 1.5 1.5v1z"></path></g>
<g id="fiber-manual-record"><circle cx="12" cy="12" r="8"></circle></g>
<g id="fiber-new"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM8.5 15H7.3l-2.55-3.5V15H3.5V9h1.25l2.5 3.5V9H8.5v6zm5-4.74H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4v1.26zm7 3.74c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25v5z"></path></g>
<g id="fiber-pin"><path d="M5.5 10.5h2v1h-2zM20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zM9 11.5c0 .85-.65 1.5-1.5 1.5h-2v2H4V9h3.5c.85 0 1.5.65 1.5 1.5v1zm3.5 3.5H11V9h1.5v6zm7.5 0h-1.2l-2.55-3.5V15H15V9h1.25l2.5 3.5V9H20v6z"></path></g>
<g id="fiber-smart-record"><g><circle cx="9" cy="12" r="8"></circle><path d="M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z"></path></g></g>
<g id="forward-10"><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.8 3H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="forward-30"><path d="M9.6 13.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5zM4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8z"></path></g>
<g id="forward-5"><path d="M4 13c0 4.4 3.6 8 8 8s8-3.6 8-8h-2c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6v4l5-5-5-5v4c-4.4 0-8 3.6-8 8zm6.7.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.5.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.6z"></path></g>
<g id="games"><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"></path></g>
<g id="hd"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z"></path></g>
<g id="hearing"><path d="M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z"></path></g>
<g id="high-quality"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 11H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm7-1c0 .55-.45 1-1 1h-.75v1.5h-1.5V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4zm-3.5-.5h2v-3h-2v3z"></path></g>
<g id="library-add"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="library-books"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path></g>
<g id="library-music"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path></g>
<g id="loop"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"></path></g>
<g id="mic"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="mic-none"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1.2-9.1c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2l-.01 6.2c0 .66-.53 1.2-1.19 1.2-.66 0-1.2-.54-1.2-1.2V4.9zm6.5 6.1c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="mic-off"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path></g>
<g id="movie"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path></g>
<g id="music-video"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z"></path></g>
<g id="new-releases"><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="not-interested"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"></path></g>
<g id="note"><path d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z"></path></g>
<g id="pause"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g>
<g id="pause-circle-filled"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path></g>
<g id="pause-circle-outline"><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path></g>
<g id="play-arrow"><path d="M8 5v14l11-7z"></path></g>
<g id="play-circle-filled"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></g>
<g id="play-circle-outline"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="playlist-add"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"></path></g>
<g id="playlist-add-check"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"></path></g>
<g id="playlist-play"><path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"></path></g>
<g id="queue"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="queue-music"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"></path></g>
<g id="queue-play-next"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h2v-2H3V5h18v8h2V5c0-1.11-.9-2-2-2zm-8 7V7h-2v3H8v2h3v3h2v-3h3v-2h-3zm11 8l-4.5 4.5L18 21l3-3-3-3 1.5-1.5L24 18z"></path></g>
<g id="radio"><path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.11-.89-2-2-2H8.3l8.26-3.34L15.88 1 3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-2h-2v2H4V8h16v4z"></path></g>
<g id="recent-actors"><path d="M21 5v14h2V5h-2zm-4 14h2V5h-2v14zM14 5H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM8 7.75c1.24 0 2.25 1.01 2.25 2.25S9.24 12.25 8 12.25 5.75 11.24 5.75 10 6.76 7.75 8 7.75zM12.5 17h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17z"></path></g>
<g id="remove-from-queue"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2H8v-2h8z"></path></g>
<g id="repeat"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></g>
<g id="repeat-one"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"></path></g>
<g id="replay"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path></g>
<g id="replay-10"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16zm4.3-1.8c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1c.2.1.3.2.5.3s.2.3.3.6.1.5.1.8v.7zm-.9-.8v-.5s-.1-.2-.1-.3-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="replay-30"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-2.4 8.5h.4c.2 0 .4-.1.5-.2s.2-.2.2-.4v-.2s-.1-.1-.1-.2-.1-.1-.2-.1h-.5s-.1.1-.2.1-.1.1-.1.2v.2h-1c0-.2 0-.3.1-.5s.2-.3.3-.4.3-.2.4-.2.4-.1.5-.1c.2 0 .4 0 .6.1s.3.1.5.2.2.2.3.4.1.3.1.5v.3s-.1.2-.1.3-.1.2-.2.2-.2.1-.3.2c.2.1.4.2.5.4s.2.4.2.6c0 .2 0 .4-.1.5s-.2.3-.3.4-.3.2-.5.2-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.4-.1-.6h.8v.2s.1.1.1.2.1.1.2.1h.5s.1-.1.2-.1.1-.1.1-.2v-.5s-.1-.1-.1-.2-.1-.1-.2-.1h-.6v-.7zm5.7.7c0 .3 0 .6-.1.8l-.3.6s-.3.3-.5.3-.4.1-.6.1-.4 0-.6-.1-.3-.2-.5-.3-.2-.3-.3-.6-.1-.5-.1-.8v-.7c0-.3 0-.6.1-.8l.3-.6s.3-.3.5-.3.4-.1.6-.1.4 0 .6.1.3.2.5.3.2.3.3.6.1.5.1.8v.7zm-.8-.8v-.5c0-.1-.1-.2-.1-.3s-.1-.1-.2-.2-.2-.1-.3-.1-.2 0-.3.1l-.2.2s-.1.2-.1.3v2s.1.2.1.3.1.1.2.2.2.1.3.1.2 0 .3-.1l.2-.2s.1-.2.1-.3v-1.5z"></path></g>
<g id="replay-5"><path d="M12 5V1L7 6l5 5V7c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6H4c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm-1.3 8.9l.2-2.2h2.4v.7h-1.7l-.1.9s.1 0 .1-.1.1 0 .1-.1.1 0 .2 0h.2c.2 0 .4 0 .5.1s.3.2.4.3.2.3.3.5.1.4.1.6c0 .2 0 .4-.1.5s-.1.3-.3.5-.3.2-.4.3-.4.1-.6.1c-.2 0-.4 0-.5-.1s-.3-.1-.5-.2-.2-.2-.3-.4-.1-.3-.1-.5h.8c0 .2.1.3.2.4s.2.1.4.1c.1 0 .2 0 .3-.1l.2-.2s.1-.2.1-.3v-.6l-.1-.2-.2-.2s-.2-.1-.3-.1h-.2s-.1 0-.2.1-.1 0-.1.1-.1.1-.1.1h-.7z"></path></g>
<g id="shuffle"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path></g>
<g id="skip-next"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></g>
<g id="skip-previous"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></g>
<g id="slow-motion-video"><path d="M13.05 9.79L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zM11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zm1.61 6.74C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"></path></g>
<g id="snooze"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-3-9h3.63L9 15.2V17h6v-2h-3.63L15 10.8V9H9v2z"></path></g>
<g id="sort-by-alpha"><path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"></path></g>
<g id="stop"><path d="M6 6h12v12H6z"></path></g>
<g id="subscriptions"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"></path></g>
<g id="subtitles"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"></path></g>
<g id="surround-sound"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.76 16.24l-1.41 1.41C4.78 16.1 4 14.05 4 12c0-2.05.78-4.1 2.34-5.66l1.41 1.41C6.59 8.93 6 10.46 6 12s.59 3.07 1.76 4.24zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.66 1.66l-1.41-1.41C17.41 15.07 18 13.54 18 12s-.59-3.07-1.76-4.24l1.41-1.41C19.22 7.9 20 9.95 20 12c0 2.05-.78 4.1-2.34 5.66zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="video-call"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></g>
<g id="video-label"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></g>
<g id="video-library"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></g>
<g id="videocam"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></g>
<g id="videocam-off"><path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"></path></g>
<g id="volume-down"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path></g>
<g id="volume-mute"><path d="M7 9v6h4l5 5V4l-5 5H7z"></path></g>
<g id="volume-off"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></g>
<g id="volume-up"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g>
<g id="web"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"></path></g>
<g id="web-asset"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(b.content);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const _=s.a`<iron-iconset-svg name="editor" size="24">
<svg><defs>
<g id="attach-file"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path></g>
<g id="attach-money"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></g>
<g id="border-all"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"></path></g>
<g id="border-bottom"><path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"></path></g>
<g id="border-clear"><path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>
<g id="border-color"><path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>
<g id="border-horizontal"><path d="M3 21h2v-2H3v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zm4 4h2v-2H7v2zM5 3H3v2h2V3zm4 0H7v2h2V3zm8 0h-2v2h2V3zm-4 4h-2v2h2V7zm0-4h-2v2h2V3zm6 14h2v-2h-2v2zm-8 4h2v-2h-2v2zm-8-8h18v-2H3v2zM19 3v2h2V3h-2zm0 6h2V7h-2v2zm-8 8h2v-2h-2v2zm4 4h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="border-inner"><path d="M3 21h2v-2H3v2zm4 0h2v-2H7v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zM9 3H7v2h2V3zM5 3H3v2h2V3zm12 0h-2v2h2V3zm2 6h2V7h-2v2zm0-6v2h2V3h-2zm-4 18h2v-2h-2v2zM13 3h-2v8H3v2h8v8h2v-8h8v-2h-8V3zm6 18h2v-2h-2v2zm0-4h2v-2h-2v2z"></path></g>
<g id="border-left"><path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>
<g id="border-outer"><path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"></path></g>
<g id="border-right"><path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"></path></g>
<g id="border-style"><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"></path></g>
<g id="border-top"><path d="M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z"></path></g>
<g id="border-vertical"><path d="M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"></path></g>
<g id="bubble-chart"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8"></circle></g>
<g id="drag-handle"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></g>
<g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>
<g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>
<g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>
<g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>
<g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
<g id="format-clear"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></g>
<g id="format-color-fill"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>
<g id="format-color-reset"><path d="M18 14c0-4-6-10.8-6-10.8s-1.33 1.51-2.73 3.52l8.59 8.59c.09-.42.14-.86.14-1.31zm-.88 3.12L12.5 12.5 5.27 5.27 4 6.55l3.32 3.32C6.55 11.32 6 12.79 6 14c0 3.31 2.69 6 6 6 1.52 0 2.9-.57 3.96-1.5l2.63 2.63 1.27-1.27-2.74-2.74z"></path></g>
<g id="format-color-text"><path fill-opacity=".36" d="M0 20h24v4H0z"></path><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path></g>
<g id="format-indent-decrease"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>
<g id="format-indent-increase"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>
<g id="format-italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>
<g id="format-line-spacing"><path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"></path></g>
<g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>
<g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>
<g id="format-paint"><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"></path></g>
<g id="format-quote"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></g>
<g id="format-shapes"><path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z"></path></g>
<g id="format-size"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"></path></g>
<g id="format-strikethrough"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path></g>
<g id="format-textdirection-l-to-r"><path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z"></path></g>
<g id="format-textdirection-r-to-l"><path d="M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z"></path></g>
<g id="format-underlined"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></g>
<g id="functions"><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"></path></g>
<g id="highlight"><path d="M6 14l3 3v5h6v-5l3-3V9H6zm5-12h2v3h-2zM3.5 5.875L4.914 4.46l2.12 2.122L5.62 7.997zm13.46.71l2.123-2.12 1.414 1.414L18.375 8z"></path></g>
<g id="insert-chart"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="insert-comment"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g>
<g id="insert-drive-file"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></g>
<g id="insert-emoticon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>
<g id="insert-invitation"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="insert-link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="insert-photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
<g id="linear-scale"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"></path></g>
<g id="merge-type"><path d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"></path></g>
<g id="mode-comment"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"></path></g>
<g id="mode-edit"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="monetization-on"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path></g>
<g id="money-off"><path d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.53.12-1.03.3-1.48.54l1.47 1.47c.41-.17.91-.27 1.51-.27zM5.33 4.06L4.06 5.33 7.5 8.77c0 2.08 1.56 3.21 3.91 3.91l3.51 3.51c-.34.48-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.82-.55 2.45-1.12l2.22 2.22 1.27-1.27L5.33 4.06z"></path></g>
<g id="multiline-chart"><path d="M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z"></path></g>
<g id="pie-chart"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"></path></g>
<g id="pie-chart-outlined"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 2.07c3.61.45 6.48 3.33 6.93 6.93H13V4.07zM4 12c0-4.06 3.07-7.44 7-7.93v15.87c-3.93-.5-7-3.88-7-7.94zm9 7.93V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93z"></path></g>
<g id="publish"><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></g>
<g id="short-text"><path d="M4 9h16v2H4zm0 4h10v2H4z"></path></g>
<g id="show-chart"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path></g>
<g id="space-bar"><path d="M18 9v4H6V9H4v6h16V9z"></path></g>
<g id="strikethrough-s"><path d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75-.14-.31-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58.16.45.37.85.65 1.21.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H21z"></path></g>
<g id="text-fields"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g>
<g id="title"><path d="M5 4v3h5.5v12h3V7H19V4z"></path></g>
<g id="vertical-align-bottom"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></g>
<g id="vertical-align-center"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></g>
<g id="vertical-align-top"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></g>
<g id="wrap-text"><path d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3 3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(_.content);class y extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style>
      :host {
        display: inline-block;
        border: solid 3px #777;
        border-radius: 10px;
        padding: 0 3px;
        color: #777;
        font-size: var(--tangy-toggle-button-font-size, 1);
      }
      :host([hidden]) {
        display: none;
      }
      :host([pressed]) {
        background-color: var(--primary-color);
        color: #FFF;
        background-image: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        background-repeat: no-repeat;
        background-position: top left; 
      }
      
      :host([highlighted]) {
        border-color: var(--accent-color);
      }
      :host([captured]){
        border-color: var(--error-color);
      }
      :host([required]:not([disabled])) label::before  { 
        content: "*"; 
        color: red; 
        position: absolute;
        top: 4px;
        right: 5px;
      }
      .text-outer {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .text-inner {
        /*
        position: absolute;
        top: 20px;
        left: 20px;
        height: 30%;
        /*width: 50%;
        margin: -15% 0 0 -25%;*/
        text-align: center;
      }
      .text-inner ::slotted(*) {
      }
      
      </style>
      <div class="text-outer">
        <div class="text-inner">
          <slot></slot>
        </div>
      </div>
  `}static get is(){return"tangy-toggle-button"}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},value:{type:String,value:"",reflectToAttribute:!0,observer:"onValueChange"},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},highlighted:{type:Boolean,value:!1,reflectToAttribute:!0},captured:{type:Boolean,value:!1,reflectToAttribute:!0},pressed:{type:Boolean,value:!1,reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.togglePressed.bind(this))}togglePressed(){this.disabled||(""==this.value?this.value="on":this.value="")}onValueChange(e,t){this.pressed=""!=e}}window.customElements.define(y.is,y);const w="TANGY_TIMED_MODE_UNTOUCHED",C="TANGY_TIMED_MODE_RUN",z="TANGY_TIMED_MODE_MARK",E="TANGY_TIMED_MODE_LAST_ATTEMPTED",A="TANGY_TIMED_MODE_DONE",S="TANGY_TIMED_MODE_DISABLED",M="TANGY_TIMED_CAPTURE_ITEM_AT";class x extends n.a{constructor(){super(),this.t={mark:Object(h.a)("MARK"),lastAttempted:Object(h.a)("LAST ATTEMPTED"),start:Object(h.a)("START"),stop:Object(h.a)("STOP"),reset:Object(h.a)("RESET")}}static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style>
      :host {
        display: block;
        font-size: 1.5em;
      }
      
      :host #icon {
        display: block;
      }
      tangy-toggle-button { 
        display: block;
        width: 90%;
        height:60px;
        --tangy-toggle-button-font-size:5em;
      }
      table{
        width: 100%;
        border-collapse:collapse;
      }
      tr {
        width: 100%;
      }
      
      td{
          text-align: left;
          border: none;
      } 
      td.row-marker {
          padding: 0 0 0 15px;
          width: 50px;
          text-align: left;
          border: none;
      }
      #container {
        overflow: scroll;
        width: 100%;
        position: relative;
      }
            
      #grid {
        width: 100%;
      }
      #stopWatch paper-button {
        color: #FFF;
      }
      
      #stopWatch paper-button.pressed {
        background: var(--primary-color);
      }

      :host([disabled]) #bar {
        display: none;
      }

      #bar {
        position: absolute;
        right: 50px;
        top: 0px;
        z-index: 1000000;
      }
      #stopWatch {
        float: right;
        margin-right: 15px;
        background: white;
        border: solid 1px #c5c5c5;
        border-radius: 10px;
        padding: 5px;
        color: #333;
        text-align: center;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 255, .2);
      }

      #bar paper-button {
        font-size: .6em;
      }

      #touchPalette {
        float: right;
        background: white;
        border: solid 1px #c5c5c5;
        border-radius: 10px;
        padding: 5px;
        color: #333;
        text-align: center;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 255, .2);
      }
      
      #timeRemaining {
        font-size: 1em;
        position: relative;
        top: 7px;
      }
      #timeRemaining,
      paper-button {
        display: inline-block;
      }
      
      #stopWatch, #touchPalette {
        padding: 5px 5px 10px 5px;
      }
      
      #timeRemaining,
      #stopWatch paper-button {
        /*margin: 0px 0px 0px 10px;*/
      }
      
      paper-button {
        background-color: var(--accent-color) !important;
      }
      
      paper-button[disabled] {
        background-color: #cccccc !important;
      }

      paper-button.pressed {
        background-color: var(--primary-color) !important;
      }
      paper-button.keyboard-focus {
        background-color: #1976d2;
      }

      #info {
        padding-top: 70px;
      }

      .blink-green-bg{
          animation-name: animation;
          animation-duration: 0.2s;
          animation-timing-function: steps(5);
          animation-iteration-count: 3;    
          animation-play-state: running;
      }
      @keyframes animation {
        0.0%     {background-color:var(--document-background-color);}
        50.0%  {background-color:green;}
        100.0%  {background-color:var(--document-background-color);}
    }
      
    </style>
    <label class="hint-text">[[hintText]]</label>
    <div id="container">
      
      <div id="info">
          <div id="statusMessage"> [[statusMessage]] </div>
          <div id="bar">
            <div id="touchPalette">
              <paper-button id="markButton" mini on-click="onMarkClick">
                <iron-icon icon="editor:mode-edit"></iron-icon> 
                <template is="dom-if" if="{{showLabels}}">
                  [[t.mark]] 
                </template>
              </paper-button>
              <paper-button id="lastAttemptedButton" mini on-click="onLastAttemptedClick">
                <iron-icon icon="av:playlist-add-check"></iron-icon> 
                <template is="dom-if" if="{{showLabels}}">
                  [[t.lastAttempted]]
                </template>
              </paper-button>
            </div>
            <div id="stopWatch">
              <div id="timeRemaining">⏱ [[timeRemaining]]</div>
              <paper-button id="startButton" on-click="onStartClick">
                <iron-icon icon="av:play-arrow"></iron-icon>
                <template is="dom-if" if="{{showLabels}}">
                  [[t.start]]
                </template>
              </paper-button>
              <paper-button id="stopButton" on-click="onStopClick">
                <iron-icon icon="av:stop"></iron-icon>
                <template is="dom-if" if="{{showLabels}}">
                  [[t.stop]]
                </template>
              </paper-button>
              <paper-button id="resetButton" on-click="onResetClick">
                <iron-icon icon="av:replay"></iron-icon>
                <template is="dom-if" if="{{showLabels}}">
                  [[t.reset]]
                </template>
              </paper-button>
            </div>
          </div>
      </div>

      

      <table id="grid">
      </table>

    </div>
`}static get is(){return"tangy-timed"}static get properties(){return{name:{type:String,value:"tangy-timed"},value:{type:Array,value:[],observer:"reflect",reflectToAttribute:!0},autoStop:{type:Number,value:void 0,reflectToAttribute:!0},gridVarItemAtTime:{type:Number,reflectToAttribute:!0},gridVarTimeIntermediateCaptured:{type:Number,reflectToAttribute:!0},gridAutoStopped:{type:Boolean,value:void 0,reflectToAttribute:!0},hintText:{type:String,value:"",reflectToAttribute:!0},mode:{state:!0,value:w,type:String,observer:"onModeChange",reflectToAttribute:!0},duration:{type:Number,value:60,reflectToAttribute:!0},captureItemAt:{type:Number,value:void 0,reflectToAttribute:!0},columns:{type:Number,value:4,reflectToAttribute:!0},showLabels:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},required:{type:Boolean,value:!1},disabled:{type:Boolean,onserver:"onDisabledChange",value:!1,reflectToAttribute:!0},rowMarkers:{type:Boolean,value:!1},timeRemaining:{type:Number,value:void 0,reflectToAttribute:!0},startTime:{type:Number,value:0,reflectToAttribute:!0},endTime:{type:Number,value:0,reflectToAttribute:!0},scoreTarget:{type:Number,value:0,reflectToAttribute:!0},scoreBaseline:{type:Number,value:0,reflectToAttribute:!0},scoreSpread:{type:Number,value:0,reflectToAttribute:!0},optionFontSize:{type:Number,value:.7,reflectToAttribute:!0}}}ready(){super.ready();const e=document.createElement("style");e.innerHTML=`tangy-toggle-button { \n        --tangy-toggle-button-font-size:${this.optionFontSize}em;\n      }`,this.shadowRoot.appendChild(e),setTimeout(()=>{this.render(),this.reflect()},400),setInterval(e=>{this.getBoundingClientRect().y<0&&this.getBoundingClientRect().y+this.getBoundingClientRect().height>0?this.shadowRoot.querySelector("#bar").style.position="fixed":this.shadowRoot.querySelector("#bar").style.position="absolute",this.offsetWidth>645?this.shadowRoot.querySelector("#info").style.paddingTop="70px":this.shadowRoot.querySelector("#info").style.paddingTop="150px"},1e3)}reflect(){this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>{let t=this.value.find(t=>e.name==t.name);e.setProps(t)})}render(){this.$.grid.innerHTML="",this.timeRemaining=void 0===this.timeRemaining?this.duration:this.timeRemaining;const e=[document.createElement("tr")];let t=0,i=1;this.querySelectorAll("option").forEach((n,r)=>{let a=document.createElement("td");a.style.width=`${Math.floor(100/this.columns)}%`;let s=document.createElement("tangy-toggle-button");if(s.setAttribute("name",n.value),s.innerHTML=n.innerHTML,s.disabled=!0,this.disabled&&(s.disabled=!0),a.appendChild(s),0!==i&&i%this.columns==0){if(e.push(document.createElement("tr")),e[t].appendChild(a),this.rowMarkers){const i=document.createElement("td");i.setAttribute("class","row-marker"),i.rowNumber=t,i.addEventListener("click",e=>{this.rowMarkerClicked(e.target.parentElement.rowNumber)}),i.innerHTML='<iron-icon icon="done-all"></iron-icon>',e[t].appendChild(i)}i=1,t++}else e[t].appendChild(a),i++});for(let t of e)this.$.grid.appendChild(t);let n=[];this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>{e.addEventListener("click",this.onTangyToggleButtonClick.bind(this)),n.push(e.getProps())}),this.value.length<n.length&&(this.value.forEach(e=>{let t=n.findIndex(t=>t.name===e.name);-1!==t&&(n[t]=e)}),this.value=n)}onModeChange(e){[].slice.call(this.shadowRoot.querySelectorAll("tangy-toggle-button")),[].slice.call(this.querySelectorAll("[name]"));switch([].slice.call(this.shadowRoot.querySelectorAll("paper-button")).forEach(e=>e.classList.remove("pressed")),e){case S:this.timeRemaining=0,this.statusMessage="",this.$.startButton.hidden=!1,this.$.stopButton.hidden=!1,this.$.resetButton.hidden=!1,this.$.markButton.hidden=!1,this.$.lastAttemptedButton.hidden=!0,this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));case w:this.timeRemaining=this.duration,this.statusMessage=Object(h.a)("Click the play button to get started."),this.$.startButton.hidden=!1,this.$.stopButton.hidden=!0,this.$.resetButton.hidden=!0,this.$.markButton.disabled=!0,this.$.lastAttemptedButton.disabled=!0,this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));break;case C:this.statusMessage=Object(h.a)("Tap items to mark them incorrect."),this.$.startButton.classList.add("pressed"),this.$.startButton.hidden=!0,this.$.stopButton.hidden=!1,this.$.resetButton.hidden=!0,this.$.markButton.classList.add("pressed"),this.$.markButton.disabled=!1,this.$.lastAttemptedButton.disabled=!0,this.isItemCaptured?(clearInterval(this.timer),this.timer2=setInterval(()=>{let e=Math.floor((Date.now()-this.startTime)/1e3);this.timeRemaining=this.duration-e,this.timeRemaining<=0&&this.stopGrid()},200)):(clearInterval(this.timer2),this.value=this.value.map(e=>Object.assign({},e,{highlighted:!1,disabled:!1})),this.startTime=Date.now(),this.timer=setInterval(()=>{let e=Math.floor((Date.now()-this.startTime)/1e3);this.timeRemaining=this.duration-e,this.timeRemaining<=0&&this.stopGrid()},200));break;case z:this.statusMessage=Object(h.a)("Tap any boxes that were incorrect during the test."),this.$.markButton.classList.add("pressed"),this.$.startButton.hidden=!0,this.$.stopButton.hidden=!0,this.$.resetButton.hidden=!1,this.$.markButton.disabled=!0,this.$.lastAttemptedButton.disabled=!1,this.value=this.value.map(e=>Object.assign({},e,{disabled:!1}));break;case E:this.statusMessage=Object(h.a)("Tap the item last attempted."),this.$.lastAttemptedButton.classList.add("pressed"),this.$.startButton.hidden=!0,this.$.stopButton.hidden=!0,this.$.resetButton.hidden=!1,this.$.markButton.disabled=!1,this.$.lastAttemptedButton.disabled=!0,this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));break;case A:this.statusMessage=Object(h.a)("You may proceed."),this.$.startButton.hidden=!0,this.$.stopButton.hidden=!0,this.$.resetButton.hidden=!1,this.$.markButton.disabled=!1,this.$.lastAttemptedButton.disabled=!1,this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));break;case M:this.statusMessage=Object(h.a)(`Tap the item at ${this.captureItemAt} seconds`),this.shadowRoot.querySelector("#container").classList.add("blink-green-bg"),setTimeout(()=>{this.shadowRoot.querySelector("#container").classList.remove("blink-green-bg")},4e3)}}shouldGridAutoStop(){const e=[].slice.call(this.shadowRoot.querySelectorAll("tangy-toggle-button"));if(e[0].pressed){const t=e.slice(0,this.autoStop).map((e,t)=>t);let i=[];return e.reduce((e,t,n)=>{t.pressed&&(i=[...i,n])},[]),((e,t)=>e.size===t.size&&[...e].every(e=>t.has(e)))(new Set(t),new Set(i))}return!1}stopGrid(){clearInterval(this.timer),clearInterval(this.timer2),this.isItemCaptured=!1,this.style.background="red",this.value=this.value.map((e,t)=>Object.assign({},e,{highlighted:this.value.length-1===t})),setTimeout(()=>this.style.background="white",200),setTimeout(()=>this.style.background="red",400),setTimeout(()=>this.style.background="white",600),setTimeout(()=>alert(Object(h.a)("Please tap on last item attempted.")),800),this.mode=E}rowMarkerClicked(e){switch(this.mode){case z:case C:this.shadowRoot.querySelectorAll("tr")[e].querySelectorAll("tangy-toggle-button").forEach(e=>{e.pressed=!0,e.value="on"});let t=[];this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>t.push(e.getProps())),this.value=t}}onTangyToggleButtonClick(e){[].slice.call(this.shadowRoot.querySelectorAll("tangy-toggle-button")),[].slice.call(this.querySelectorAll("[name]"));let t=[];switch(this.mode){case w:break;case z:case C:let i=this.value.findIndex(e=>!!e.highlighted),n=this.value.findIndex(t=>t.name===e.target.name);if(-1!=i&&i<n)return e.target.value="",void alert(Object(h.a)("You may not mark an item incorrect that is beyond the last item attempted."));this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>t.push(e.getProps())),this.value=t,this.dispatchEvent(new Event("change"));break;case E:let r=0;this.value.forEach((e,t)=>r=e.pressed?t:r),t=this.value.map((t,i)=>(t.name===e.target.name&&i>=r?t.highlighted=!0:t.name===e.target.name&&i<r?(alert(Object(h.a)("Last attempted cannot be before an item marked.")),t.highlighted=!1):t.highlighted=!1,t)),this.value=t,this.dispatchEvent(new Event("change"));break;case M:t=this.value.map((t,i)=>t.name===e.target.name?(this.isItemCaptured=!0,this.gridVarItemAtTime=i+1,this.gridVarTimeIntermediateCaptured=this.duration-this.timeRemaining,{...t,captured:!0,disabled:!1}):{...t}),this.value=t,this.mode=C}this.autoStop&&this.shouldGridAutoStop()&&(e.target.highlighted=!0,this.stopGrid(),this.gridAutoStopped=!0,this.onStopClick(null,e.target.name))}onStartClick(){this.reset(),this.mode=C,this.captureItemAt&&setTimeout(()=>{this.mode=M},1e3*this.captureItemAt)}onStopClick(e,t){this.endTime=Date.now(),clearInterval(this.timer),clearInterval(this.timer2),this.isItemCaptured=!1,this.value="string"==typeof t?this.value.map((e,i)=>Object.assign({},e,{highlighted:t===e.name})):this.value.map((e,t)=>Object.assign({},e,{highlighted:this.value.length-1===t})),this.mode=E}onResetClick(){this.reset(),this.mode=w}onMarkClick(){this.mode!=C&&(this.mode=z)}onLastAttemptedClick(e){this.mode=E}onDisabledChange(){!0===this.disabled&&(this.mode=S)}reset(){this.value=this.value.map(e=>(e.highlighted=!1,e.captured=!1,e.value="",e.pressed=!1,e.hidden=!0,e))}validate(){let e=this.value.find(e=>!!e.highlighted&&e);return!this.required||this.hidden||e?this.invalid=!1:this.invalid=!0,!this.invalid}}window.customElements.define(x.is,x);const T="TANGY_UNTIMED_GRID_MODE_UNTOUCHED",I="TANGY_UNTIMED_GRID_MODE_RUN",k="TANGY_UNTIMED_GRID_MODE_MARK",O="TANGY_UNTIMED_GRID_MODE_LAST_ATTEMPTED",H="TANGY_UNTIMED_GRID_MODE_DONE",L="TANGY_UNTIMED_GRID_MODE_DISABLED";class V extends n.a{constructor(){super(),this.t={mark:Object(h.a)("MARK"),lastAttempted:Object(h.a)("LAST ATTEMPTED"),start:Object(h.a)("START"),stop:Object(h.a)("STOP"),reset:Object(h.a)("RESET")}}static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style>
      :host {
        display: block;
        font-size: 1.5em;
      }
      
      :host #icon {
        display: block;
      }
      tangy-toggle-button { 
        display: block;
        width: 90%;
        height:60px;
      }
      table{
        width: 100%;
        border-collapse:collapse;
      }
      tr {
        width: 100%;
      }
      
      td{
          text-align: left;
          border: none;
      } 
      td.row-marker {
          padding: 0 0 0 15px;
          width: 50px;
          text-align: left;
          border: none;
      }
      #container {
        width: 100%;
        position: relative;
      }
            
      #grid {
        width: 100%;
      }

      :host([disabled]) #bar {
        display: none;
      }

      #bar {
        position: absolute;
        right: 50px;
        top: 0px;
        z-index: 1000000;
      }

      #bar paper-button {
        font-size: .6em;
      }

      #touchPalette {
        float: right;
        background: white;
        border: solid 1px #c5c5c5;
        border-radius: 10px;
        padding: 5px;
        color: #333;
        text-align: center;
        box-shadow: 3px 3px 10px 1px rgba(0, 0, 255, .2);
        padding: 5px 5px 10px 5px;
      }
      
      paper-button {
        background-color: var(--accent-color) !important;
        display: inline-block;
      }
      
      paper-button[disabled] {
        background-color: #cccccc !important;
      }

      paper-button.pressed {
        background-color: var(--primary-color) !important;
      }

      paper-button.keyboard-focus {
        background-color: #1976d2;
      }

      #info {
        padding-top: 70px;
      }
    </style>
    <label class="hint-text">[[hintText]]</label>
    <div id="container">
      
      <div id="info">
          <div id="statusMessage"> [[statusMessage]] </div>
      </div>

      <table id="grid">
      </table>

    </div>
`}static get is(){return"tangy-untimed-grid"}static get properties(){return{name:{type:String,value:"tangy-untimed-grid"},value:{type:Array,value:[],observer:"reflect",reflectToAttribute:!0},autoStop:{type:Number,value:void 0,reflectToAttribute:!0},gridAutoStopped:{type:Boolean,value:void 0,reflectToAttribute:!0},hintText:{type:String,value:"",reflectToAttribute:!0},mode:{state:!0,value:T,type:String,observer:"onModeChange",reflectToAttribute:!0},columns:{type:Number,value:4,reflectToAttribute:!0},showLabels:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},required:{type:Boolean,value:!1},disabled:{type:Boolean,onserver:"onDisabledChange",value:!1,reflectToAttribute:!0},rowMarkers:{type:Boolean,value:!1},scoreTarget:{type:Number,value:0,reflectToAttribute:!0},scoreBaseline:{type:Number,value:0,reflectToAttribute:!0},scoreSpread:{type:Number,value:0,reflectToAttribute:!0},optionFontSize:{type:Number,value:.7,reflectToAttribute:!0}}}ready(){super.ready();const e=document.createElement("style");e.innerHTML=`tangy-toggle-button { \n        --tangy-toggle-button-font-size:${this.optionFontSize}em;\n      }`,this.shadowRoot.appendChild(e),setTimeout(()=>{this.render(),this.reflect(),this.mode=I},400)}reflect(){this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>{let t=this.value.find(t=>e.name==t.name);e.setProps(t)})}render(){this.$.grid.innerHTML="";const e=[document.createElement("tr")];let t=0,i=1;this.querySelectorAll("option").forEach((n,r)=>{let a=document.createElement("td");a.style.width=`${Math.floor(100/this.columns)}%`;let s=document.createElement("tangy-toggle-button");if(s.setAttribute("name",n.value),s.innerHTML=n.innerHTML,s.disabled=!0,this.disabled&&(s.disabled=!0),a.appendChild(s),0!==i&&i%this.columns==0){if(e.push(document.createElement("tr")),e[t].appendChild(a),this.rowMarkers){const i=document.createElement("td");i.setAttribute("class","row-marker"),i.rowNumber=t,i.addEventListener("click",e=>{this.rowMarkerClicked(e.target.parentElement.rowNumber)}),i.innerHTML='<iron-icon icon="done-all"></iron-icon>',e[t].appendChild(i)}i=1,t++}else e[t].appendChild(a),i++});for(let t of e)this.$.grid.appendChild(t);let n=[];this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>{e.addEventListener("click",this.onTangyToggleButtonClick.bind(this)),n.push(e.getProps())}),this.value.length<n.length&&(this.value.forEach(e=>{let t=n.findIndex(t=>t.name===e.name);-1!==t&&(n[t]=e)}),this.value=n)}onModeChange(e){[].slice.call(this.shadowRoot.querySelectorAll("tangy-toggle-button")),[].slice.call(this.querySelectorAll("[name]"));switch(e){case L:this.statusMessage="",this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));case T:this.statusMessage=Object(h.a)("untouched"),this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));break;case I:this.statusMessage=Object(h.a)("Tap items to mark them incorrect."),this.value=this.value.map(e=>Object.assign({},e,{highlighted:!1,disabled:!1}));break;case k:this.statusMessage=Object(h.a)("Tap any boxes that were incorrect during the test."),this.value=this.value.map(e=>Object.assign({},e,{disabled:!1}));break;case O:this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}));break;case H:this.statusMessage=Object(h.a)("You may proceed."),this.value=this.value.map(e=>Object.assign({},e,{disabled:!0}))}}rowMarkerClicked(e){switch(this.mode){case k:case I:this.shadowRoot.querySelectorAll("tr")[e].querySelectorAll("tangy-toggle-button").forEach(e=>{e.pressed=!0});let t=[];this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>t.push(e.getProps())),this.value=t}}onTangyToggleButtonClick(e){[].slice.call(this.shadowRoot.querySelectorAll("tangy-toggle-button")),[].slice.call(this.querySelectorAll("[name]"));let t=[];switch(this.mode){case T:break;case k:case I:let i=this.value.findIndex(e=>!!e.highlighted),n=this.value.findIndex(t=>t.name===e.target.name);if(-1!=i&&i<n)return e.target.value="",void alert(Object(h.a)("You may not mark an item incorrect that is beyond the last item attempted."));this.shadowRoot.querySelectorAll("tangy-toggle-button").forEach(e=>t.push(e.getProps())),this.value=t,this.dispatchEvent(new Event("change"))}this.autoStop&&this.shouldGridAutoStop()&&this.mode!==O&&(e.target.highlighted=!0,this.mode=O,this.gridAutoStopped=!0,this.onStopClick(null,e.target.name))}shouldGridAutoStop(){const e=[].slice.call(this.shadowRoot.querySelectorAll("tangy-toggle-button"));if(e[0].pressed){const t=e.slice(0,this.autoStop).map((e,t)=>t);let i=[];return e.reduce((e,t,n)=>{t.pressed&&(i=[...i,n])},[]),((e,t)=>e.size===t.size&&[...e].every(e=>t.has(e)))(new Set(t),new Set(i))}return!1}onStopClick(e,t){this.endTime=Date.now(),clearInterval(this.timer),this.value="string"==typeof t?this.value.map((e,i)=>Object.assign({},e,{highlighted:t===e.name})):this.value.map((e,t)=>Object.assign({},e,{highlighted:this.value.length-1===t})),this.mode=O}validate(){return!0}}window.customElements.define(V.is,V);i(57);class D extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <paper-checkbox id="checkbox" id="checkbox">
          <div id="checkbox-text">
          </div>
          <label class="hint-text">
          </label>
        </paper-checkbox>
        <div id="error-text"></div>
      </div>
    </div>
    `}static get is(){return"tangy-checkbox"}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},label:{type:String,value:"",observer:"applyLabel",reflectToAttribute:!0},required:{type:Boolean,value:!1,observer:"onRequiredChange",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,observer:"onDisabledChange",reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},value:{type:String,value:"",observer:"onValueChange",reflectToAttribute:!0},errorText:{type:String,value:"",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.value&&(this.$.checkbox.checked=!0),""==this.label&&""!==this.innerHTML&&(this.label=this.innerHTML),this.$.checkbox.addEventListener("change",e=>{e.stopPropagation();let t=!e.target.checked;this.value=e.target.checked?"on":"",this.dispatchEvent(new Event("change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("INPUT_VALUE_CHANGE",{bubbles:!0,detail:{inputName:this.name,inputValue:!!e.target.checked,inputIncomplete:t,inputInvalid:!this.$.checkbox.validate()}}))}),this.shadowRoot.querySelector(".hint-text").innerHTML=this.hasAttribute("hint-text")?this.getAttribute("hint-text"):"",this.shadowRoot.querySelector("#qnum-number").innerHTML=this.hasAttribute("question-number")?`<label>${this.getAttribute("question-number")}</label>`:""}applyLabel(e){this.$.checkbox.children["checkbox-text"].innerHTML=this.label}onRequiredChange(e){!1===e?this.$.checkbox.removeAttribute("required"):this.$.checkbox.setAttribute("required",!0)}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}onDisabledChange(e){!1===e?this.$.checkbox.removeAttribute("disabled"):this.$.checkbox.setAttribute("disabled",!0)}onValueChange(e){e&&this.$.checkbox.setAttribute("checked",!0),e||this.$.checkbox.removeAttribute("checked")}validate(){return!0===this.required&&""===this.value&&!1===this.disabled&&!1===this.hidden?(this.invalid=!0,!1):(this.invalid=!1,!0)}}window.customElements.define(D.is,D);class N extends n.a{static get is(){return"tangy-checkboxes"}constructor(){super(),this.t={selectOneOrMore:Object(h.a)("Select one or more")}}static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>

        :host {
          @apply --tangy-font-common-base;
          /*--tangy-element-margin: 15px 25px 10px 10px;*/
        }
        
        :host([invalid]) #hintText {
          position: relative;
          top: 5px;
        }

          tangy-checkbox {
            margin: 10px 0 15px;
          }

      </style>

      <div class="flex-container m-y-25">
        <div id="qnum-number"></div>
        <div id="qnum-content">
          <label id="label" for="group"></label>
          <label id="hint-text" class="hint-text"></label>
          <div id="checkboxes"></div>
          <label id="error-text" class="error-text"></label>
        </div>
      </div>

    `}static get properties(){return{name:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},value:{type:Array,value:[],observer:"reflect",reflectToAttribute:!0},hintText:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},atLeast:{type:Number,value:0,observer:"reflect",reflectToAttribute:!0},required:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},label:{type:String,observer:"reflect",value:""},hidden:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,observer:"reflect",reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},errorText:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},questionNumber:{type:String,value:"",observer:"reflect",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.render(),this.reflect()}reflect(){this.shadowRoot.querySelectorAll("tangy-checkbox").forEach(e=>{let t=this.value.find(t=>e.name==t.name);e.setProps(t),e.disabled=this.disabled,e.hidden=this.hidden})}render(){this.$["qnum-number"].innerHTML=`<label>${this.questionNumber}</label>`,this.$.label.innerHTML=this.label,this.$["hint-text"].innerHTML=this.hintText,this.$.checkboxes.innerHTML="";let e=this.querySelectorAll("option");for(let t of e){let e=document.createElement("tangy-checkbox");t.hasAttribute("hint-text")&&e.setAttribute("hint-text",t.getAttribute("hint-text")),e.name=t.value,e.innerHTML=t.innerHTML,e.hintText=t.getAttribute("hint-text"),this.$.checkboxes.appendChild(e)}let t=[];this.shadowRoot.querySelectorAll("tangy-checkbox").forEach(e=>{e.addEventListener("change",this.onCheckboxClick.bind(this)),t.push(e.getProps())}),(!this.value||"object"==typeof this.value&&this.value.length<t.length)&&(this.value=t)}onCheckboxClick(e){let t=[];this.shadowRoot.querySelectorAll("tangy-checkbox").forEach(e=>t.push(e.getProps())),this.value=t,this.dispatchEvent(new CustomEvent("change"))}validate(){let e=!1;return this.shadowRoot.querySelectorAll("[name]").forEach(t=>{"on"===t.value&&(e=!0)}),!this.required||this.hidden||this.disabled||e?(this.invalid=!1,this.$["error-text"].innerHTML="",!0):(this.invalid=!0,!1)}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}}window.customElements.define(N.is,N);class R extends n.a{static get is(){return"tangy-checkboxes-dynamic"}constructor(){super(),this.t={selectOneOrMore:Object(h.a)("Select one or more")}}static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>

        :host {
          @apply --tangy-font-common-base;
        }
        
        tangy-checkbox {
          margin-top: 15px;
          margin-right: 25px;
        }
        span {
          font-size: .75em;
          display: block;
        }
        
        
      </style>
      <div class="container">
      </div>
    `}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},value:{type:Array,value:[],reflectToAttribute:!0},atLeast:{type:Number,value:0,reflectToAttribute:!0},required:{type:Boolean,value:!1,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:""},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},optionsListSource:{type:String,value:""},optionsListProperties:{type:String,value:""},optionsListExcludes:{type:String,value:""},optionsListExcludeBy:{type:String,value:""}}}get optionsList(){return this._optionsList?this._optionsList:void 0}set optionsList(e){this._optionsList=e}connectedCallback(){super.connectedCallback();let e=this;const t=new XMLHttpRequest;t.onreadystatechange=function(){if(4===this.readyState&&200===this.status)try{e.optionsList=[];let t=JSON.parse(this.responseText),i=e.optionsListProperties.split(","),n=e.optionsListExcludes.split(","),r=i[0],a=i[1];for(let i of t){let t=!1;for(let r of n)i[e.optionsListExcludeBy]===r&&(t=!0);if(!t){let t={name:i[r],innerHTML:i[a]};e.optionsList.push(t)}}e.render(),e.dispatchEvent(new CustomEvent("checkbox-options-loaded"))}catch(e){}},t.open("GET",this.optionsListSource),t.send()}render(){let e=this.shadowRoot.querySelector(".container"),t=document.createElement("tangy-checkboxes");for(let e of this.optionsList){let i=document.createElement("option");i.name=e.name,i.value=e.name,i.innerHTML=e.innerHTML;try{t.appendChild(i)}catch(e){console.log("e: "+e)}}let i=[];t.addEventListener("change",this.onCheckboxesClick.bind(this)),i=t.getProps(),(!this.value||"object"==typeof this.value&&this.value.length<i.length)&&(this.value=i),e.appendChild(t)}onCheckboxesClick(e){let t=[];t=this.shadowRoot.querySelector("tangy-checkboxes").getProps(),this.value=t.value,this.dispatchEvent(new CustomEvent("change"))}}window.customElements.define(R.is,R);class P extends n.a{static get template(){return n.b``}static get is(){return"tangy-radio-button"}static get properties(){return{hideButton:{type:Boolean,value:!1,reflectToAttribute:!0},name:{type:String,value:"",reflectToAttribute:!0},label:{type:String,value:""},required:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},value:{type:String,value:"",observer:"render",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.render()}render(){this.shadowRoot.innerHTML=`    \n      <style include="tangy-common-styles"></style>\n      <style include="tangy-element-styles"></style>\n      <style>\n        .hint-text {\n            color: gray;\n            font-size: 0.8rem;\n            font-weight: lighter;\n        }\n      </style>\n      <paper-radio-button\n        ${this.required?"required":""}\n        ${this.invalid?"invalid":""}\n        ${this.disabled?"disabled":""}\n        ${this.hidden?"hidden":""}\n        ${this.value?"checked":""}\n        >\n        <div>\n          ${this.label?this.label:this.innerHTML}\n        </div>\n        ${this.hasAttribute("hint-text")?`\n          <label class="hint-text">\n            ${this.getAttribute("hint-text")}\n          </label>\n        `:""}\n      </paper-radio-button>\n    `,this.hideButton&&(this.shadowRoot.querySelector("paper-radio-button").shadowRoot.querySelector("#radioContainer").style.display="none"),this.shadowRoot.querySelector("paper-radio-button").addEventListener("change",e=>{e.stopPropagation();let t=!e.target.checked;this.value=e.target.checked?"on":"",this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.dispatchEvent(new CustomEvent("INPUT_VALUE_CHANGE",{bubbles:!0,detail:{inputName:this.name,inputValue:!!e.target.checked,inputIncomplete:t,inputInvalid:!this.shadowRoot.querySelector("paper-radio-button").validate()}}))})}}window.customElements.define(P.is,P);class B extends n.a{static get is(){return"tangy-radio-buttons"}constructor(){super(),this.value=[],this.t={selectOnlyOne:Object(h.a)("Select only one")}}static get template(){return n.b`
      <style include="tangy-element-styles"></style>
      <style include="tangy-common-styles"></style>

      <style>
        table {
          table-layout: fixed;
        }
        span {
          font-size: .75em;
          display: block;
        }
        :host([columns]) tangy-radio-button {
          padding: 0px;
          /*margin: 15px 0px 0px;*/
          margin: 10px 0 15px;
        }
        :host([hide-buttons]) tangy-radio-button {
          border: 5px solid white;
        }
        :host([hide-buttons]) tangy-radio-button[value="on"] {
          border: 5px solid green;
        }
        :host([no-margin]) tangy-radio-button {
          padding: 0px;
          margin: 0px 0px !important;
          border: 0px;
        }
        :host([columns="0"]) tangy-radio-button {
          display: block;
        }
        :host(:not([columns="0"])) tangy-radio-button {
          display: inline-block;
        }
      
        #hint-text {
          color: gray;
          font-size: 1em;
          font-weight: lighter;
        }
      </style>
      
      <div class="flex-container m-y-25">
        <div id="qnum-number"></div>
        <div id="qnum-content">
          <label id="label" for="group"></label>
          <label class="hint-text"></label>
          <div id="container"></div>
          <label id="error-text"></label>
        </div>
      </div>
    `}static get properties(){return{hideButtons:{type:Boolean,value:!1,reflectToAttribute:!0},hideHelpText:{type:Boolean,value:!1,reflectToAttribute:!0},name:{type:String,value:"",observer:"reflect",reflectToAttribute:!0},value:{type:Array,value:[],observer:"reflect",reflectToAttribute:!0},required:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,observer:"reflect",reflectToAttribute:!0},columns:{type:Number,value:0,observer:"render",reflectToAttribute:!0},noMargin:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},questionNumber:{type:String,value:"",observer:"reflect",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.render(),this.reflect(),this.shadowRoot.querySelector(".hint-text").innerHTML=this.hasAttribute("hint-text")?this.getAttribute("hint-text"):"",this.shadowRoot.querySelector("#label").innerHTML=this.hasAttribute("label")?this.getAttribute("label"):""}reflect(){this.shadowRoot.querySelectorAll("tangy-radio-button").forEach(e=>{let t=this.value.find(t=>e.name==t.name);e.setProps(t),e.disabled=this.disabled,e.hidden=this.hidden})}render(){this.$["qnum-number"].innerHTML=`<label>${this.questionNumber}</label>`,this.$.container.innerHTML="";let e=this.querySelectorAll("option"),t=0,i=document.createElement("table"),n=document.createElement("tr");for(let r of e){let a=document.createElement("tangy-radio-button");if(r.hasAttribute("hint-text")&&a.setAttribute("hint-text",r.getAttribute("hint-text")),a.hideButton=!!this.hideButtons,a.name=r.value,a.innerHTML=r.innerHTML,this.columns>0){let r=document.createElement("td");r.style.width=`${Math.floor(1/this.columns*100)}%`,r.appendChild(a),(t+1)%this.columns==0?(n.appendChild(r),i.appendChild(n),n=document.createElement("tr")):n.appendChild(r),t+1===e.length&&this.$.container.appendChild(i),t++}else this.$.container.appendChild(a)}let r=[];this.shadowRoot.querySelectorAll("tangy-radio-button").forEach(e=>{e.addEventListener("change",this.onRadioButtonChange.bind(this)),r.push(e.getProps())}),(!this.value||"object"==typeof this.value&&this.value.length<r.length)&&(this.value=r)}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}onRadioButtonChange(e){let t=e.target;(t.value="on")&&this.$.container.querySelectorAll("tangy-radio-button").forEach(e=>{e.name!==t.name&&"on"==t.value&&(e.value="")});let i=[];this.shadowRoot.querySelectorAll("tangy-radio-button").forEach(e=>i.push(e.getProps())),this.value=i,this.dispatchEvent(new CustomEvent("change"))}validate(){let e=!1;return this.shadowRoot.querySelectorAll("[name]").forEach(t=>{"on"===t.value&&(e=!0)}),!this.required||this.hidden||this.disabled||e?(this.invalid=!1,!0):(this.invalid=!0,!1)}}window.customElements.define(B.is,B);i(69);class F extends n.a{static get template(){return n.b`
    <style include="tangy-element-styles"></style>
    <style include="tangy-common-styles"></style>
    <style include="mdc-select-style"></style>

    <style>
    #errorText {
      padding: 10px 10px 10px 0px;
      font-size: medium;
      font-weight: bold;
      color: var(--error-color);
    }
 
    </style>

    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <div id="container">
      </div>
    </div>
    `}static get is(){return"tangy-select"}static get properties(){return{name:{type:String,value:""},value:{type:String,value:"",reflectToAttribute:!0},hintText:{type:String,value:"",reflectToAttribute:!0},required:{type:Boolean,value:!1},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},optionSelectLabel:{type:String,value:Object(h.a)("----"),reflectToAttribute:!0},secondaryLabel:{type:String,value:"",reflectToAttribute:!0},hidden:{type:Boolean,value:!1},invalid:{type:Boolean,observer:"onInvalidChange",value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0},questionNumber:{type:String,value:"",reflectToAttribute:!0},errorText:{type:String,value:"",observer:"onInvalidChange",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),new MutationObserver(this.render.bind(this)).observe(this,{attributes:!0,childList:!0,subtree:!0}),this.render()}render(){this.$["qnum-number"].innerHTML=`<label>${this.questionNumber}</label>`,this.$.container.innerHTML="";let e=[];this.querySelectorAll("option").forEach(t=>e.push(t)),this.optionSelectLabel=""===this.secondaryLabel?this.optionSelectLabel:this.secondaryLabel,this.$.container.innerHTML=`\n      <label for="group">${this.label}</label>\n      <label class="hint-text">${this.hintText}</label>\n      <div class="mdc-select">\n        <select class="mdc-select__surface" value="${this.value}" ${this.disabled?"disabled":""}>\n            <option value="" default selected disabled>${this.optionSelectLabel}</option>\n          ${e.map((e,t)=>`\n            <option \n              value="${e.value}" \n              ${this.value===e.value?"selected":""}\n            >\n              ${f(e.innerHTML)}\n            </option>\n          `)}\n        </select>\n        <div class="mdc-select__bottom-line"></div>\n      </div>\n      <label id="error-text">\n        ${this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}\n      </label>\n    `,this._onChangeListener=this.shadowRoot.querySelector("select").addEventListener("change",this.onChange.bind(this)),this.dispatchEvent(new CustomEvent("render"))}onInvalidChange(e){this.shadowRoot.querySelector("#error-text")&&(this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:"")}onChange(e){this.value=e.target.value,this.dispatchEvent(new CustomEvent("change"))}validate(){return!this.required||this.hidden||this.disabled||this.value?(this.invalid=!1,!0):(this.invalid=!0,!1)}}window.customElements.define(F.is,F);i(82);class j extends n.a{static get is(){return"tangy-gps"}constructor(){super(),this.t={searching:Object(h.a)("Searching"),latitude:Object(h.a)("Latitude"),longitude:Object(h.a)("Longitude"),accuracy:Object(h.a)("Accuracy"),accuracyLevel:Object(h.a)("Accuracy Level"),distanceFromReference:Object(h.a)("Distance from reference")}}static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
      :host {
        display: block;
      }
      :host([required]:not([disabled])) label::before  { 
        content: "*"; 
        color: red; 
        position: absolute;
        top: 4px;
        right: 5px;
      }
      :host([hide-coordinates]) #lat-long {
        display:none;
      }
      :host([hide-accuracy-level]) #accuracy-level {
        display:none;
      }
      :host([hide-accuracy-distance]) #accuracy-distance {
        display:none;
      }
      :host([in-geofence]) .geofence-message {
        display: inline;
        animation: fadein 2s;
      }
      :host([invalid]) .geofence-message {
        display: inline;
        animation: fadein 2s;
        background-color: red;
      }
      .geofence-message-container {
        text-align: center;
        margin-top: 15px;
      }
      .geofence-message {
        display: none;
        margin: 5px; 0px 0px;
        background: #28a745;
        color: white;
        padding: 5px;
        border-radius: 5px;
      }
      @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .label {
          font-weight: bold;
      }
      .coordinates {
        margin: 5px 15px;
      }
      #hint-text{
        margin-top:6px;
      }
      .hint-text {
        margin-left: 15px;
        margin-right: 15px;
      }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <div class="coordinates">
          <div id="lat-long">
            <span class="label">[[t.latitude]]:</span> [[currentLatitude]] <br>
            <span class="label">[[t.longitude]]:</span> [[currentLongitude]] <br>
          </div>

          <template is="dom-if" if="[[currentLatitude]]">
            <div id="accuracy-distance">
              <span class="label">[[t.accuracy]]:</span> [[currentAccuracy]] meters<br>
            </div>
            <div id="accuracy-level">
              <span class="label">[[t.accuracyLevel]]:</span> [[accuracyLevel]]
            </div>
          </template> 

          <template is="dom-if" if="{{hasDelta}}">
            <br> 
            <span class="label">[[t.disanceFromReference]]:</span> [[currentDelta]] meters
          </template>
        </div>

        <div>
          <template is="dom-if" if="[[!currentLatitude]]">
              [[t.searching]]...
          </template>
          <div class="geofence-message-container"> 
            <div class="geofence-message"> [[geofenceMessage]]</div>
          </div>
        </div>
        <label class="hint-text"></label>
        <div id="error-text"></div>
      </div>
    </div>
  `}static get properties(){return{name:{type:String,value:"tangy-gps"},value:{type:Object,value:{latitude:void 0,longitude:void 0,accuracy:void 0},observer:"reflect",reflectToAttribute:!0},hintText:{type:String,value:"",observer:"onHintTextChange",reflectToAttribute:!0},required:{type:Boolean,value:!1,observer:"reflect",reflectToAttribute:!0},hideAccuracyDistance:{type:Boolean,value:!1,reflectToAttribute:!0},hideAccuracyLevel:{type:Boolean,value:!1,reflectToAttribute:!0},hideCoordinates:{type:Boolean,value:!1,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},referenceLatitude:{type:Number,observer:"saveCurrentPosition",value:void 0},referenceLongitude:{type:Number,observer:"saveCurrentPosition",value:void 0},inGeofence:{type:Boolean,value:!1,reflectToAttribute:!0},validMaxDelta:{type:Number,value:void 0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},hintText:{type:String,value:"",observer:"onHintTextChange",reflectToAttribute:!0},errorText:{type:String,value:"",reflectToAttribute:!0}}}ready(){this.hasDelta=!1,super.ready(),this.active=!0,this.getGeolocationPosition(),this.currentAccuracy="...",this.accuracyLevel="...",this.shadowRoot.querySelector("#qnum-number").innerHTML=this.hasAttribute("question-number")?`<label>${this.getAttribute("question-number")}</label>`:""}disconnectedCallback(){super.disconnectedCallback(),this.active=!1}reflect(){this.recordedLatitude=this.value.recordedLatitude,this.recordedLongitude=this.value.recordedLongitude,this.recordedAccuracy=this.value.recordedAccuracy}onHintTextChange(e){this.shadowRoot.querySelector(".hint-text").innerHTML=e||""}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}getGeolocationPosition(){const e=JSON.parse(localStorage.getItem("gpsQueue"))?JSON.parse(localStorage.getItem("gpsQueue")):void 0;void 0!==e&&((new Date).getTime()-e.timestamp)/1e3/60<=5&&(this.currentLatitude=e.latitude,this.currentLongitude=e.longitude,this.currentAccuracy=e.accuracy,this.disabled||this.saveCurrentPosition()),navigator.geolocation.getCurrentPosition(t=>{if(this.active){if(!e||void 0!==e&&(t.timestamp-e.timestamp)/1e3>=15||e.accuracy>=t.coords.accuracy){this.currentLatitude=t.coords.latitude,this.currentLongitude=t.coords.longitude,this.currentAccuracy=t.coords.accuracy;const e={accuracy:t.coords.accuracy,altitude:t.coords.altitude,altitudeAccuracy:t.coords.altitudeAccuracy,heading:t.coords.heading,latitude:t.coords.latitude,longitude:t.coords.longitude,speed:t.coords.speed,timestamp:t.timestamp};localStorage.setItem("gpsQueue",JSON.stringify(e)),this.disabled||this.saveCurrentPosition()}else this.currentLatitude=e.latitude,this.currentLongitude=e.longitude,this.currentAccuracy=e.accuracy,this.disabled||this.saveCurrentPosition();this.getGeolocationPosition()}},e=>{},{enableHighAccuracy:!0})}saveCurrentPosition(){void 0===this.referenceLatitude&&void 0===this.referenceLongitude?this.value={latitude:this.currentLatitude,longitude:this.currentLongitude,accuracy:this.currentAccuracy}:(this.value={latitude:this.currentLatitude,longitude:this.currentLongitude,accuracy:this.currentAccuracy,delta:this._getDistanceFromLatLonInKm(this.currentLatitude,this.currentLongitude,this.referenceLatitude,this.referenceLongitude)},this.currentDelta=Math.floor(1e3*this.value.delta),this.hasDelta=!0,this.validMaxDelta&&(this.hasGeofence=!0,this.inGeofence=this.validMaxDelta>this.currentDelta,this.invalid=!(this.validMaxDelta>this.currentDelta),this.geofenceMessage=this.inGeofence?`✔ ${Object(h.a)("location verified")}`:Object(h.a)(`✗ ${Object(h.a)("location not verified")}`))),this.currentAccuracy<50&&(this.accuracyLevel="Good"),this.currentAccuracy>50&&(this.accuracyLevel="Poor")}validate(){return!this.required||(this.value.latitude&&this.value.longitude&&this.value.accuracy?(this.removeAttribute("invalid"),!0):(this.setAttribute("invalid",""),!1))}_isAdvancedMode(e,t){return e&&t}_getDistanceFromLatLonInKm(e,t,i,n){var r=this._deg2rad(i-e),a=this._deg2rad(n-t),s=Math.sin(r/2)*Math.sin(r/2)+Math.cos(this._deg2rad(e))*Math.cos(this._deg2rad(i))*Math.sin(a/2)*Math.sin(a/2);return 6371*(2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)))}_deg2rad(e){return e*(Math.PI/180)}}window.customElements.define(j.is,j);class U extends n.a{constructor(){super(),this.t={replay:"replay"}}static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>

    <style>
      paper-radio-button {
        margin-right: 25px;
        --paper-radio-button-size: 2em;
      }
      .eftouch-selected {
        border: 10px solid #af0;
        border-radius: 10px;
      }
      paper-button.indigo {
        background-color: var(--paper-indigo-500);
        color: white;
        --paper-button-raised-keyboard-focus: {
          background-color: var(--paper-pink-a200) !important;
          color: white !important;
        };
      }
      paper-button.indigo:hover {
        background-color: var(--paper-indigo-400);
      }
    </style>

    <div class="container">
      <label for="group">[[label]]</label>
      <paper-button id="replay" raised class="indigo" on-click="replay">[[t.replay]]</paper-button>
      <paper-radio-group name="group" id="paper-radio-group">
      </paper-radio-group>
    </div>
    `}static get is(){return"tangy-acasi"}static get properties(){return{name:{type:String,value:""},introSrc:{type:String,value:"./assets/sounds/1.mp3"},transitionSrc:{type:String,value:"./assets/sounds/swish.mp3"},touchSrc:{type:String,value:"./assets/sounds/pop.mp3"},touchSources:{type:Array},images:{type:String,value:"./assets/images/never.png,./assets/images/once.png,./assets/images/few.png,./assets/images/many.png"},onChange:{type:String,value:"",reflectToAttribute:!0},value:{type:String,value:"",reflectToAttribute:!0,observer:"onValueChange"},required:{type:Boolean,value:!1,reflectToAttribute:!0},disabled:{type:Boolean,value:!1,observer:"onDisabledChange",reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,observer:"onHiddenChange",reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.isReady=!1,this.renderOptions()}renderOptions(){let e=this.shadowRoot.querySelector("paper-radio-group");e.addEventListener("change",this.onPaperRadioGroupChange.bind(this),!1);let t=this.getAttribute("images").split(",");for(let i of t){let t=document.createElement("paper-radio-button"),n=i.split("/"),r=n[n.length-1].replace(".png","");t.name=r,this.disabled&&t.setAttribute("disabled",!0);let a=document.createElement("img");a.src=i,a.className="acasi-image",t.innerHTML=a.outerHTML,e.appendChild(t)}e.selected=this.value,this.required&&(e.required=!0),this.isReady=!0,this.imgElements=Array.prototype.slice.call(this.shadowRoot.querySelectorAll("img"));for(let e=0,t=this.imgElements.length;e<t;e++){let t=this.imgElements[e];if(void 0!==this.touchSources&&this.touchSources.length>1){let i=this.touchSources[e];t.dataTouchSrc=i}else t.dataTouchSrc=this.touchSrc}}ready(){super.ready();this.getAttribute("introSrc")?this.introSound=new Audio(this.getAttribute("introSrc")):this.introSound=new Audio("./assets/sounds/swish.mp3"),this.introSound.load(),setTimeout(()=>this.introSound.play(),0),this.getAttribute("touchsrc")&&(this.touchSources=this.getAttribute("touchsrc").split(","),1==this.touchSources.length&&(this.touchSound=new Audio(this.touchSources[0]),this.touchSound.load())),setTimeout(()=>this._prepareForm(),200)}_prepareForm(){Array.prototype.slice.call(this.shadowRoot.querySelectorAll("paper-radio-button")).forEach(e=>{e.$.radioContainer.style="display:none"});let e=e=>{this.imgElements=Array.prototype.slice.call(this.shadowRoot.querySelectorAll("img"));for(let e=0,t=this.imgElements.length;e<t;e++){let t=this.imgElements[e],i="eftouch-selected";if(!!t.className.match(new RegExp("(\\s|^)"+i+"(\\s|$)"))){let e=new RegExp("(\\s|^)"+i+"(\\s|$)");t.className=t.className.replace(e," ")}}let t=e.srcElement,i="eftouch-selected";!!t.className.match(new RegExp("(\\s|^)"+i+"(\\s|$)"))||(t.className+=" "+i);const n=this.querySelector("#foo");if(null!==n&&(n.value=e.srcElement.id),this.touchSources.length>1){let e=new Audio(t.dataTouchSrc);e.load(),e.play()}else this.touchSound.play()};this.imgElements.forEach(t=>{t.addEventListener("click",e)})}onPaperRadioGroupChange(e){if(e.stopPropagation(),!this.isReady)return;let t=[];this.shadowRoot.querySelectorAll("paper-radio-button").forEach(e=>t.push(e.getProps())),this.value=e.target.name,this.dispatchEvent(new CustomEvent("change"))}onValueChange(e){this.isReady&&(this.$["paper-radio-group"].selected=e)}onDisabledChange(e){let t=this.shadowRoot.querySelectorAll("paper-radio-button");1==e&&t.forEach(e=>e.setAttribute("disabled",!0)),0==e&&t.forEach(e=>e.removeAttribute("disabled"))}onHiddenChange(e){}replay(){console.log("Replay"),this.introSound=new Audio(this.getAttribute("introSrc")),this.introSound.play()}validate(){return this.required&&""===this.value?(this.invalid=!0,!1):(this.invalid=!1,!0)}}window.customElements.define(U.is,U);class q extends n.a{static get is(){return"tangy-eftouch"}static get properties(){return{fromTopOfScreen:{type:Number,value:115,reflectToAttribute:!0,observer:"render"},height:{type:Number,value:400,reflectToAttribute:!0,observer:"render"},hintText:{type:String,value:"",reflectToAttribute:!0},errorMessage:{type:String,value:"",reflectToAttribute:!0},width:{type:Number,reflectToAttribute:!0,observer:"render"},goNextOnTimeLimit:{type:Boolean,value:!1,reflectToAttribute:!0},correct:{type:Boolean,value:!1,reflectToAttribute:!0},incorrect:{type:Boolean,value:!1,reflectToAttribute:!0},transitionMessage:{type:String,value:"",reflectToAttribute:!0},transitionSound:{type:String,value:"",reflectToAttribute:!0},openSound:{type:String,value:"",reflectToAttribute:!0},transitionDelay:{type:Number,value:0,reflectToAttribute:!0},inputSound:{type:String,value:"",reflectToAttribute:!0},timeLimit:{type:Number,value:0,reflectToAttribute:!0},warningTime:{type:Number,value:0,reflectToAttribute:!0},warningMessage:{type:String,value:"",reflectToAttribute:!0},name:{type:String,value:""},onChange:{type:String,value:"",reflectToAttribute:!0},value:{type:Object,value:{startTime:0,selectionTime:0,selection:""},reflectToAttribute:!0,observer:"render"},required:{type:Boolean,value:!1},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},inputSoundTriggered:{type:Boolean,value:!1},openSoundTriggered:{type:Boolean,value:!1},transitionSoundTriggered:{type:Boolean,value:!1}}}static get template(){return n.b``}connectedCallback(){super.connectedCallback(),this.openSound&&(new Audio(this.openSound).play(),this.openSoundTriggered=!0),this.width||(this.width=document.documentElement.offsetWidth),this.style.width=`${this.width}px`,this.style.height=`${this.height}px`,this.render(),0===this.value.startTime&&(this.value.startTime=(new Date).getTime()),this.warningMessage&&(this.warningTimeout=setTimeout(()=>{this.setAttribute("warning-triggered",!0)},this.warningTime)),this.timeLimit&&(this.timeLimitTimeout=setTimeout(()=>{this.disabled=!0,this.hasAttribute("go-next-on-time-limit")&&this.transition(!0)},this.timeLimit)),this.fitItInterval=setInterval(this.fitIt.bind(this),Math.floor(1e3/30)),this.fitIt()}disconnectedCallback(){super.disconnectedCallback(),this.fitItInterval&&clearInterval(this.fitItInterval),this.warningTimeout&&clearTimeout(this.warningTimeout),this.timeLimitTimeout&&clearTimeout(this.timeLimitTimeout),this.transitionSound&&!this.transitionSoundTriggered&&(new Audio(this.transitionSound).play(),this.transitionSoundTriggered=!0,this.dispatchEvent(new CustomEvent("manual-next")))}render(e){const t=[...this.querySelectorAll("option")];this.shadowRoot&&(this.shadowRoot.innerHTML=`\n      <style>\n        :host {\n          width: 100%\n        }\n        :host tangy-radio-buttons {\n          opacity: 0;\n        }\n        :host([fullscreen-size-complete]) tangy-radio-buttons {\n          opacity: 1 !important;\n        }\n\n        tangy-radio-buttons {\n          margin: 0 auto;\n        }\n        #transition {\n          padding: 0px;\n        }\n        :host(:not([transition-triggered])) #transition {\n          opacity: 0;\n        }\n        :host([transition-triggered]) #transition {\n          opacity: 1;\n          transition: opacity .5s ease-in-out;\n          -webkit-transition: opacity .5s ease-in-out;\n          -moz-transition: opacity .5s ease-in-out;\n          -ms-transition: opacity .5s ease-in-out;\n          -o-transition: opacity .5s ease-in-out;\n        }\n        #warning {\n          padding: 0px;\n        }\n        :host(:not([warning-triggered])) #warning {\n          opacity: 0;\n        }\n        :host([warning-triggered]) #warning {\n          opacity: 1;\n          transition: opacity .5s ease-in-out;\n          -webkit-transition: opacity .5s ease-in-out;\n          -moz-transition: opacity .5s ease-in-out;\n          -ms-transition: opacity .5s ease-in-out;\n          -o-transition: opacity .5s ease-in-out;\n        }\n        #messages-box {\n          height: 60px;\n        }\n        #cell img {\n          border: #FFF solid 5px;\n        }\n        #cell[selected] img {\n          border: green solid 5px;\n        }\n        #cell {\n          padding: 5px;\n          text-align: center;\n        }\n        :host([highlight-correct]) #cell[correct] img {\n          border: yellow solid 5px;\n        }\n\n      </style>\n      <div id="messages-box">\n        ${this.transitionMessage?`\n          <div id="transition">\n            ${this.transitionMessage}\n          </div>\n        `:""}\n        ${this.warningMessage?`\n          <div id="warning">\n            ${this.warningMessage}\n          </div>\n        `:""}\n        ${this.incorrect&&this.hasAttribute("incorrect-message")?`\n          <div id="incorrect">\n            ${this.getAttribute("incorrect-message")}\n          </div>\n        `:""}\n        ${this.correct&&this.hasAttribute("correct-message")?`\n          <div id="correct">\n            ${this.getAttribute("correct-message")}\n          </div>\n        `:""}\n        ${this.invalid&&this.hasAttribute("error-message")?`\n          <div id="error-message">\n            ${this.getAttribute("error-message")}\n          </div>\n        `:""}\n      </div>\n      <div id="options-box" style="opacity: 0; display: flex; flex-wrap: wrap;">\n      ${t.map(e=>`\n        <span \n          id="cell"\n          ef-width="${e.getAttribute("width")}"\n          ef-height="${e.getAttribute("height")}"\n          ${e.hasAttribute("correct")?"correct":""}\n          ${this.hasAttribute("multi-select")?!e.hasAttribute("disabled")&&this.value.selection.includes(e.value)?"selected":"":e.hasAttribute("disabled")||this.value.selection!==e.value?"":"selected"}\n          style="\n            display: block;\n            width:${Math.floor(e.getAttribute("width")/100*this.width)}px;\n            height:${Math.floor(e.getAttribute("height")/100*(this.height-60))}px;\n          ">\n          <img \n            ${e.hasAttribute("disabled")?"disabled":""}\n            value="${e.value}" \n            ${e.hasAttribute("src")&&""!==e.getAttribute("src")?`\n              style="\n                max-height: 100%;\n                max-width: 100%;\n              "\n              src="${e.getAttribute("src")}"\n            `:'\n              disabled\n              style="\n                height: 100%;\n                width: 100%;\n              " \n              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="\n            '}\n          >\n        </span>\n      `).join("")}\n      </div>\n    `,this.shadowRoot.querySelectorAll("img:not([disabled])").forEach(e=>e.addEventListener("click",e=>this.onSelection(e.target))))}onSelection(e){if(!(!0===this.disabled||e.hasAttribute("disabled")||this.hasAttribute("no-corrections")&&this.value&&this.value.selection)){if(this.inputSound&&(new Audio(this.inputSound).play(),this.inputSoundTriggered=!0),this.value=Object.assign({},this.value,{selection:this.hasAttribute("multi-select")?this.value.selection.includes(e.getAttribute("value"))?this.value.selection.reduce((t,i)=>i!==e.getAttribute("value")?[i,...t]:t,[]):[...this.value.selection,e.getAttribute("value")]:e.getAttribute("value"),selectionTime:(new Date).getTime()}),this.querySelectorAll("[correct]").length>0){const e=[...this.querySelectorAll("[correct]")].map(e=>e.getAttribute("value"));this.value={...this.value,correct:this.hasAttribute("multi-select")?e.reduce((e,t)=>!1!==e&&this.value.selection.includes(t),!0):e.includes(this.value.selection)},this.value.correct?(this.correct=!0,this.incorrect=!1):(this.correct=!1,this.incorrect=!0)}this.hasAttribute("if-incorrect-then-highlight-correct")&&!0===this.incorrect?this.setAttribute("highlight-correct",""):this.hasAttribute("if-incorrect-then-highlight-correct")&&!0===this.correct&&this.removeAttribute("highlight-correct"),this.render(),this.dispatchEvent(new Event("change")),this.hasAttribute("go-next-on-selection")&&this.value&&this.value.selection&&this.value.selection.length>=parseInt(this.getAttribute("go-next-on-selection"))&&this.validate()&&this.transition(!0)}}transition(e=!1){if(this.hasAttribute("transition-triggered"))return;this.setAttribute("transition-triggered",!0);const t=()=>{this.transitionSound&&(new Audio(this.transitionSound).play(),this.transitionSoundTriggered=!0),e&&this.dispatchEvent(new CustomEvent("next"))};this.transitionDelay>0?setTimeout(()=>{t()},this.transitionDelay):t()}fitIt(){const e=this.shadowRoot.querySelector("#options-box"),t=window.innerHeight-e.offsetTop-60,i=e.clientWidth;i>0&&(e.style.opacity="1");e.querySelectorAll("#cell").forEach(e=>{e.setAttribute("style",`\n        display: inline-block;\n        width:${Math.floor(e.getAttribute("ef-width")/100*i)-10-10}px;\n        height:${Math.floor(e.getAttribute("ef-height")/100*t)-10}px;\n      `)})}validate(){return this.hasAttribute("required-correct")?!!this.value.correct:this.hasAttribute("required")&&this.hasAttribute("multi-select")?!!(this.value.selection&&this.value.selection.length>0):!this.hasAttribute("required")||!!this.value.selection}}window.customElements.define(q.is,q);class $ extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
      img {
        width: 100%;
      }
      .hint-text{
        margin-top:6px;
        margin-left:4px;
      }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <img id="image"/>
        <paper-button on-click="capturePhoto"><iron-icon icon="camera-enhance"></iron-icon> capture photo </paper-button>
        <label class="hint-text"></label>
        <div id="error-text"></div>
      </div>
    </div>
    `}static get is(){return"tangy-photo-capture"}static get properties(){return{name:{type:String,value:""},hintText:{type:String,observer:"onHintTextChange",value:""},errorText:{type:String,value:""},private:{type:Boolean,value:!1},disabled:{type:Boolean,value:!1,observer:"onDisabledChange",reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},value:{type:String,value:""}}}connectedCallback(){super.connectedCallback(),navigator.mediaDevices.getUserMedia({video:!0}).then(e=>this.gotMedia(e)).catch(e=>console.error("getUserMedia() error:",e)),this.shadowRoot.querySelector("#qnum-number").innerHTML=this.hasAttribute("question-number")?`<label>${this.getAttribute("question-number")}</label>`:""}onHintTextChange(e){this.shadowRoot.querySelector(".hint-text").innerHTML=e}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}validate(){return this.hasAttribute("required")&&!this.value?(this.invalid=!0,!1):(this.invalid=!1,!0)}gotMedia(e){const t=e.getVideoTracks()[0];this.imageCapture=new ImageCapture(t)}async capturePhoto(){let e=await this.imageCapture.takePhoto();this.value=btoa(e),this.$.image.src=URL.createObjectURL(e),this.$.image.onload=()=>{URL.revokeObjectURL(this.src)}}downscaleImage(e,t,i,n){var r,a,s,o,l;return i=i||"image/jpeg",n=n||.7,(r=new Image).src=e,a=r.width,s=r.height,o=Math.floor(s/a*t),(l=document.createElement("canvas")).width=t,l.height=o,l.getContext("2d").drawImage(r,0,0,t,o),l.toDataURL(i,n)}}window.customElements.define($.is,$);var K=i(73);class W extends K.CustomError{constructor(e){super(e),this.message=e}}class G extends W{}class Y extends W{}class X{constructor(e){if(this.binarizer=e,null===e)throw new Y("Binarizer must be non-null.")}getWidth(){return this.binarizer.getWidth()}getHeight(){return this.binarizer.getHeight()}getBlackRow(e,t){return this.binarizer.getBlackRow(e,t)}getBlackMatrix(){return null!==this.matrix&&void 0!==this.matrix||(this.matrix=this.binarizer.getBlackMatrix()),this.matrix}isCropSupported(){return this.binarizer.getLuminanceSource().isCropSupported()}crop(e,t,i,n){const r=this.binarizer.getLuminanceSource().crop(e,t,i,n);return new X(this.binarizer.createBinarizer(r))}isRotateSupported(){return this.binarizer.getLuminanceSource().isRotateSupported()}rotateCounterClockwise(){const e=this.binarizer.getLuminanceSource().rotateCounterClockwise();return new X(this.binarizer.createBinarizer(e))}rotateCounterClockwise45(){const e=this.binarizer.getLuminanceSource().rotateCounterClockwise45();return new X(this.binarizer.createBinarizer(e))}toString(){try{return this.getBlackMatrix().toString()}catch(e){return""}}}class Z extends W{}var J=class{constructor(e){this.source=e}getLuminanceSource(){return this.source}getWidth(){return this.source.getWidth()}getHeight(){return this.source.getHeight()}};class Q{static arraycopy(e,t,i,n,r){for(;r--;)i[n++]=e[t++]}static currentTimeMillis(){return Date.now()}}class ee{static numberOfTrailingZeros(e){let t;if(0===e)return 32;let i=31;return 0!==(t=e<<16)&&(i-=16,e=t),0!==(t=e<<8)&&(i-=8,e=t),0!==(t=e<<4)&&(i-=4,e=t),0!==(t=e<<2)&&(i-=2,e=t),i-(e<<1>>>31)}static numberOfLeadingZeros(e){if(0===e)return 32;let t=1;return e>>>16==0&&(t+=16,e<<=16),e>>>24==0&&(t+=8,e<<=8),e>>>28==0&&(t+=4,e<<=4),e>>>30==0&&(t+=2,e<<=2),t-=e>>>31}static toHexString(e){return e.toString(16)}static bitCount(e){return e=(e=(858993459&(e-=e>>>1&1431655765))+(e>>>2&858993459))+(e>>>4)&252645135,e+=e>>>8,63&(e+=e>>>16)}}ee.MIN_VALUE_32_BITS=-2147483648;class te{static equals(e,t){if(!e)return!1;if(!t)return!1;if(!e.length)return!1;if(!t.length)return!1;if(e.length!==t.length)return!1;for(let i=0,n=e.length;i<n;i++)if(e[i]!==t[i])return!1;return!0}static hashCode(e){if(null===e)return 0;let t=1;for(const i of e)t=31*t+i;return t}static fillUint8Array(e,t){for(let i=0;i!==e.length;i++)e[i]=t}static copyOf(e,t){const i=new Int32Array(t);return Q.arraycopy(e,0,i,0,Math.min(e.length,t)),i}static binarySearch(e,t,i){void 0===i&&(i=te.numberComparator);let n=0,r=e.length-1;for(;n<=r;){const a=r+n>>1,s=i(t,e[a]);if(s>0)n=a+1;else{if(!(s<0))return a;r=a-1}}return-n-1}static numberComparator(e,t){return e-t}}class ie{constructor(e,t){void 0===e?(this.size=0,this.bits=new Int32Array(1)):(this.size=e,this.bits=null==t?ie.makeArray(e):t)}getSize(){return this.size}getSizeInBytes(){return Math.floor((this.size+7)/8)}ensureCapacity(e){if(e>32*this.bits.length){const t=ie.makeArray(e);Q.arraycopy(this.bits,0,t,0,this.bits.length),this.bits=t}}get(e){return 0!=(this.bits[Math.floor(e/32)]&1<<(31&e))}set(e){this.bits[Math.floor(e/32)]|=1<<(31&e)}flip(e){this.bits[Math.floor(e/32)]^=1<<(31&e)}getNextSet(e){const t=this.size;if(e>=t)return t;const i=this.bits;let n=Math.floor(e/32),r=i[n];r&=~((1<<(31&e))-1);const a=i.length;for(;0===r;){if(++n===a)return t;r=i[n]}const s=32*n+ee.numberOfTrailingZeros(r);return s>t?t:s}getNextUnset(e){const t=this.size;if(e>=t)return t;const i=this.bits;let n=Math.floor(e/32),r=~i[n];r&=~((1<<(31&e))-1);const a=i.length;for(;0===r;){if(++n===a)return t;r=~i[n]}const s=32*n+ee.numberOfTrailingZeros(r);return s>t?t:s}setBulk(e,t){this.bits[Math.floor(e/32)]=t}setRange(e,t){if(t<e||e<0||t>this.size)throw new Y;if(t===e)return;t--;const i=Math.floor(e/32),n=Math.floor(t/32),r=this.bits;for(let a=i;a<=n;a++){const s=(2<<(a<n?31:31&t))-(1<<(a>i?0:31&e));r[a]|=s}}clear(){const e=this.bits.length,t=this.bits;for(let i=0;i<e;i++)t[i]=0}isRange(e,t,i){if(t<e||e<0||t>this.size)throw new Y;if(t===e)return!0;t--;const n=Math.floor(e/32),r=Math.floor(t/32),a=this.bits;for(let s=n;s<=r;s++){const o=(2<<(s<r?31:31&t))-(1<<(s>n?0:31&e))&4294967295;if((a[s]&o)!==(i?o:0))return!1}return!0}appendBit(e){this.ensureCapacity(this.size+1),e&&(this.bits[Math.floor(this.size/32)]|=1<<(31&this.size)),this.size++}appendBits(e,t){if(t<0||t>32)throw new Y("Num bits must be between 0 and 32");this.ensureCapacity(this.size+t);this.appendBit;for(let i=t;i>0;i--)this.appendBit(1==(e>>i-1&1))}appendBitArray(e){const t=e.size;this.ensureCapacity(this.size+t);this.appendBit;for(let i=0;i<t;i++)this.appendBit(e.get(i))}xor(e){if(this.size!==e.size)throw new Y("Sizes don't match");const t=this.bits;for(let i=0,n=t.length;i<n;i++)t[i]^=e.bits[i]}toBytes(e,t,i,n){for(let r=0;r<n;r++){let n=0;for(let t=0;t<8;t++)this.get(e)&&(n|=1<<7-t),e++;t[i+r]=n}}getBitArray(){return this.bits}reverse(){const e=new Int32Array(this.bits.length),t=Math.floor((this.size-1)/32),i=t+1,n=this.bits;for(let r=0;r<i;r++){let i=n[r];i=(i=(i=(i=(i=i>>1&1431655765|(1431655765&i)<<1)>>2&858993459|(858993459&i)<<2)>>4&252645135|(252645135&i)<<4)>>8&16711935|(16711935&i)<<8)>>16&65535|(65535&i)<<16,e[t-r]=i}if(this.size!==32*i){const t=32*i-this.size;let n=e[0]>>>t;for(let r=1;r<i;r++){const i=e[r];n|=i<<32-t,e[r-1]=n,n=i>>>t}e[i-1]=n}this.bits=e}static makeArray(e){return new Int32Array(Math.floor((e+31)/32))}equals(e){if(!(e instanceof ie))return!1;const t=e;return this.size===t.size&&te.equals(this.bits,t.bits)}hashCode(){return 31*this.size+te.hashCode(this.bits)}toString(){let e="";for(let t=0,i=this.size;t<i;t++)0==(7&t)&&(e+=" "),e+=this.get(t)?"X":".";return e}clone(){return new ie(this.size,this.bits.slice())}}class ne{constructor(e=""){this.value=e}append(e){return this.value+="string"==typeof e?e.toString():String.fromCharCode(e),this}length(){return this.value.length}charAt(e){return this.value.charAt(e)}deleteCharAt(e){this.value=this.value.substr(0,e)+this.value.substring(e+1)}setCharAt(e,t){this.value=this.value.substr(0,e)+t+this.value.substr(e+1)}toString(){return this.value}insert(e,t){this.value=this.value.substr(0,e)+t+this.value.substr(e+t.length)}}class re{constructor(e,t,i,n){if(this.width=e,this.height=t,this.rowSize=i,this.bits=n,null==t&&(t=e),this.height=t,e<1||t<1)throw new Y("Both dimensions must be greater than 0");null==i&&(i=Math.floor((e+31)/32)),this.rowSize=i,null==n&&(this.bits=new Int32Array(this.rowSize*this.height))}static parseFromBooleanArray(e){const t=e.length,i=e[0].length,n=new re(i,t);for(let r=0;r<t;r++){const t=e[r];for(let e=0;e<i;e++)t[e]&&n.set(e,r)}return n}static parseFromString(e,t,i){if(null===e)throw new Y("stringRepresentation cannot be null");const n=new Array(e.length);let r=0,a=0,s=-1,o=0,l=0;for(;l<e.length;)if("\n"===e.charAt(l)||"\r"===e.charAt(l)){if(r>a){if(-1===s)s=r-a;else if(r-a!==s)throw new Y("row lengths do not match");a=r,o++}l++}else if(e.substring(l,l+t.length)===t)l+=t.length,n[r]=!0,r++;else{if(e.substring(l,l+i.length)!==i)throw new Y("illegal character encountered: "+e.substring(l));l+=i.length,n[r]=!1,r++}if(r>a){if(-1===s)s=r-a;else if(r-a!==s)throw new Y("row lengths do not match");o++}const c=new re(s,o);for(let e=0;e<r;e++)n[e]&&c.set(Math.floor(e%s),Math.floor(e/s));return c}get(e,t){const i=t*this.rowSize+Math.floor(e/32);return 0!=(this.bits[i]>>>(31&e)&1)}set(e,t){const i=t*this.rowSize+Math.floor(e/32);this.bits[i]|=1<<(31&e)&4294967295}unset(e,t){const i=t*this.rowSize+Math.floor(e/32);this.bits[i]&=~(1<<(31&e)&4294967295)}flip(e,t){const i=t*this.rowSize+Math.floor(e/32);this.bits[i]^=1<<(31&e)&4294967295}xor(e){if(this.width!==e.getWidth()||this.height!==e.getHeight()||this.rowSize!==e.getRowSize())throw new Y("input matrix dimensions do not match");const t=new ie(Math.floor(this.width/32)+1),i=this.rowSize,n=this.bits;for(let r=0,a=this.height;r<a;r++){const a=r*i,s=e.getRow(r,t).getBitArray();for(let e=0;e<i;e++)n[a+e]^=s[e]}}clear(){const e=this.bits,t=e.length;for(let i=0;i<t;i++)e[i]=0}setRegion(e,t,i,n){if(t<0||e<0)throw new Y("Left and top must be nonnegative");if(n<1||i<1)throw new Y("Height and width must be at least 1");const r=e+i,a=t+n;if(a>this.height||r>this.width)throw new Y("The region must fit inside the matrix");const s=this.rowSize,o=this.bits;for(let i=t;i<a;i++){const t=i*s;for(let i=e;i<r;i++)o[t+Math.floor(i/32)]|=1<<(31&i)&4294967295}}getRow(e,t){null==t||t.getSize()<this.width?t=new ie(this.width):t.clear();const i=this.rowSize,n=this.bits,r=e*i;for(let e=0;e<i;e++)t.setBulk(32*e,n[r+e]);return t}setRow(e,t){Q.arraycopy(t.getBitArray(),0,this.bits,e*this.rowSize,this.rowSize)}rotate180(){const e=this.getWidth(),t=this.getHeight();let i=new ie(e),n=new ie(e);for(let e=0,r=Math.floor((t+1)/2);e<r;e++)i=this.getRow(e,i),n=this.getRow(t-1-e,n),i.reverse(),n.reverse(),this.setRow(e,n),this.setRow(t-1-e,i)}getEnclosingRectangle(){const e=this.width,t=this.height,i=this.rowSize,n=this.bits;let r=e,a=t,s=-1,o=-1;for(let e=0;e<t;e++)for(let t=0;t<i;t++){const l=n[e*i+t];if(0!==l){if(e<a&&(a=e),e>o&&(o=e),32*t<r){let e=0;for(;0==(l<<31-e&4294967295);)e++;32*t+e<r&&(r=32*t+e)}if(32*t+31>s){let e=31;for(;l>>>e==0;)e--;32*t+e>s&&(s=32*t+e)}}}return s<r||o<a?null:Int32Array.from([r,a,s-r+1,o-a+1])}getTopLeftOnBit(){const e=this.rowSize,t=this.bits;let i=0;for(;i<t.length&&0===t[i];)i++;if(i===t.length)return null;const n=i/e;let r=i%e*32;const a=t[i];let s=0;for(;0==(a<<31-s&4294967295);)s++;return r+=s,Int32Array.from([r,n])}getBottomRightOnBit(){const e=this.rowSize,t=this.bits;let i=t.length-1;for(;i>=0&&0===t[i];)i--;if(i<0)return null;const n=Math.floor(i/e);let r=32*Math.floor(i%e);const a=t[i];let s=31;for(;a>>>s==0;)s--;return r+=s,Int32Array.from([r,n])}getWidth(){return this.width}getHeight(){return this.height}getRowSize(){return this.rowSize}equals(e){if(!(e instanceof re))return!1;const t=e;return this.width===t.width&&this.height===t.height&&this.rowSize===t.rowSize&&te.equals(this.bits,t.bits)}hashCode(){let e=this.width;return e=31*(e=31*(e=31*(e=31*e+this.width)+this.height)+this.rowSize)+te.hashCode(this.bits)}toString(e="x",t=" ",i="\n"){return this.buildToString(e,t,i)}buildToString(e,t,i){let n=new ne;n.append(i);for(let r=0,a=this.height;r<a;r++){for(let i=0,a=this.width;i<a;i++)n.append(this.get(i,r)?e:t);n.append(i)}return n.toString()}clone(){return new re(this.width,this.height,this.rowSize,this.bits.slice())}}class ae extends W{}class se extends J{constructor(e){super(e),this.luminances=se.EMPTY,this.buckets=new Int32Array(se.LUMINANCE_BUCKETS)}getBlackRow(e,t){const i=this.getLuminanceSource(),n=i.getWidth();null==t||t.getSize()<n?t=new ie(n):t.clear(),this.initArrays(n);const r=i.getRow(e,this.luminances),a=this.buckets;for(let e=0;e<n;e++)a[(255&r[e])>>se.LUMINANCE_SHIFT]++;const s=se.estimateBlackPoint(a);if(n<3)for(let e=0;e<n;e++)(255&r[e])<s&&t.set(e);else{let e=255&r[0],i=255&r[1];for(let a=1;a<n-1;a++){const n=255&r[a+1];(4*i-e-n)/2<s&&t.set(a),e=i,i=n}}return t}getBlackMatrix(){const e=this.getLuminanceSource(),t=e.getWidth(),i=e.getHeight(),n=new re(t,i);this.initArrays(t);const r=this.buckets;for(let n=1;n<5;n++){const a=i*n/5,s=e.getRow(a,this.luminances),o=Math.floor(4*t/5);for(let e=Math.floor(t/5);e<o;e++){r[(255&s[e])>>se.LUMINANCE_SHIFT]++}}const a=se.estimateBlackPoint(r),s=e.getMatrix();for(let e=0;e<i;e++){const i=e*t;for(let r=0;r<t;r++){(255&s[i+r])<a&&n.set(r,e)}}return n}createBinarizer(e){return new se(e)}initArrays(e){this.luminances.length<e&&(this.luminances=new Uint8ClampedArray(e));const t=this.buckets;for(let e=0;e<se.LUMINANCE_BUCKETS;e++)t[e]=0}static estimateBlackPoint(e){const t=e.length;let i=0,n=0,r=0;for(let a=0;a<t;a++)e[a]>r&&(n=a,r=e[a]),e[a]>i&&(i=e[a]);let a=0,s=0;for(let i=0;i<t;i++){const t=i-n,r=e[i]*t*t;r>s&&(a=i,s=r)}if(n>a){const e=n;n=a,a=e}if(a-n<=t/16)throw new ae;let o=a-1,l=-1;for(let t=a-1;t>n;t--){const r=t-n,s=r*r*(a-t)*(i-e[t]);s>l&&(o=t,l=s)}return o<<se.LUMINANCE_SHIFT}}se.LUMINANCE_BITS=5,se.LUMINANCE_SHIFT=8-se.LUMINANCE_BITS,se.LUMINANCE_BUCKETS=1<<se.LUMINANCE_BITS,se.EMPTY=Uint8ClampedArray.from([0]);class oe extends se{constructor(e){super(e),this.matrix=null}getBlackMatrix(){if(null!==this.matrix)return this.matrix;const e=this.getLuminanceSource(),t=e.getWidth(),i=e.getHeight();if(t>=oe.MINIMUM_DIMENSION&&i>=oe.MINIMUM_DIMENSION){const n=e.getMatrix();let r=t>>oe.BLOCK_SIZE_POWER;0!=(t&oe.BLOCK_SIZE_MASK)&&r++;let a=i>>oe.BLOCK_SIZE_POWER;0!=(i&oe.BLOCK_SIZE_MASK)&&a++;const s=oe.calculateBlackPoints(n,r,a,t,i),o=new re(t,i);oe.calculateThresholdForBlock(n,r,a,t,i,s,o),this.matrix=o}else this.matrix=super.getBlackMatrix();return this.matrix}createBinarizer(e){return new oe(e)}static calculateThresholdForBlock(e,t,i,n,r,a,s){const o=r-oe.BLOCK_SIZE,l=n-oe.BLOCK_SIZE;for(let r=0;r<i;r++){let c=r<<oe.BLOCK_SIZE_POWER;c>o&&(c=o);const h=oe.cap(r,2,i-3);for(let i=0;i<t;i++){let r=i<<oe.BLOCK_SIZE_POWER;r>l&&(r=l);const o=oe.cap(i,2,t-3);let d=0;for(let e=-2;e<=2;e++){const t=a[h+e];d+=t[o-2]+t[o-1]+t[o]+t[o+1]+t[o+2]}const u=d/25;oe.thresholdBlock(e,r,c,u,n,s)}}}static cap(e,t,i){return e<t?t:e>i?i:e}static thresholdBlock(e,t,i,n,r,a){for(let s=0,o=i*r+t;s<oe.BLOCK_SIZE;s++,o+=r)for(let r=0;r<oe.BLOCK_SIZE;r++)(255&e[o+r])<=n&&a.set(t+r,i+s)}static calculateBlackPoints(e,t,i,n,r){const a=r-oe.BLOCK_SIZE,s=n-oe.BLOCK_SIZE,o=new Array(i);for(let r=0;r<i;r++){o[r]=new Int32Array(t);let i=r<<oe.BLOCK_SIZE_POWER;i>a&&(i=a);for(let a=0;a<t;a++){let t=a<<oe.BLOCK_SIZE_POWER;t>s&&(t=s);let l=0,c=255,h=0;for(let r=0,a=i*n+t;r<oe.BLOCK_SIZE;r++,a+=n){for(let t=0;t<oe.BLOCK_SIZE;t++){const i=255&e[a+t];l+=i,i<c&&(c=i),i>h&&(h=i)}if(h-c>oe.MIN_DYNAMIC_RANGE)for(r++,a+=n;r<oe.BLOCK_SIZE;r++,a+=n)for(let t=0;t<oe.BLOCK_SIZE;t++)l+=255&e[a+t]}let d=l>>2*oe.BLOCK_SIZE_POWER;if(h-c<=oe.MIN_DYNAMIC_RANGE&&(d=c/2,r>0&&a>0)){const e=(o[r-1][a]+2*o[r][a-1]+o[r-1][a-1])/4;c<e&&(d=e)}o[r][a]=d}}return o}}oe.BLOCK_SIZE_POWER=3,oe.BLOCK_SIZE=1<<oe.BLOCK_SIZE_POWER,oe.BLOCK_SIZE_MASK=oe.BLOCK_SIZE-1,oe.MINIMUM_DIMENSION=5*oe.BLOCK_SIZE,oe.MIN_DYNAMIC_RANGE=24;class le extends W{}class ce extends W{}var he=class{constructor(e,t){this.width=e,this.height=t}getWidth(){return this.width}getHeight(){return this.height}isCropSupported(){return!1}crop(e,t,i,n){throw new ce("This luminance source does not support cropping.")}isRotateSupported(){return!1}rotateCounterClockwise(){throw new ce("This luminance source does not support rotation by 90 degrees.")}rotateCounterClockwise45(){throw new ce("This luminance source does not support rotation by 45 degrees.")}toString(){const e=new Uint8ClampedArray(this.width);let t=new ne;for(let i=0;i<this.height;i++){const n=this.getRow(i,e);for(let e=0;e<this.width;e++){const i=255&n[e];let r;r=i<64?"#":i<128?"+":i<192?".":" ",t.append(r)}t.append("\n")}return t.toString()}};class de extends he{constructor(e){super(e.getWidth(),e.getHeight()),this.delegate=e}getRow(e,t){const i=this.delegate.getRow(e,t),n=this.getWidth();for(let e=0;e<n;e++)i[e]=255-(255&i[e]);return i}getMatrix(){const e=this.delegate.getMatrix(),t=this.getWidth()*this.getHeight(),i=new Uint8ClampedArray(t);for(let n=0;n<t;n++)i[n]=255-(255&e[n]);return i}isCropSupported(){return this.delegate.isCropSupported()}crop(e,t,i,n){return new de(this.delegate.crop(e,t,i,n))}isRotateSupported(){return this.delegate.isRotateSupported()}invert(){return this.delegate}rotateCounterClockwise(){return new de(this.delegate.rotateCounterClockwise())}rotateCounterClockwise45(){return new de(this.delegate.rotateCounterClockwise45())}}class ue extends he{constructor(e){super(e.width,e.height),this.canvas=e,this.tempCanvasElement=null,this.buffer=ue.makeBufferFromCanvasImageData(e)}static makeBufferFromCanvasImageData(e){const t=e.getContext("2d").getImageData(0,0,e.width,e.height);return ue.toGrayscaleBuffer(t.data,e.width,e.height)}static toGrayscaleBuffer(e,t,i){const n=new Uint8ClampedArray(t*i);for(let t=0,i=0,r=e.length;t<r;t+=4,i++){let r;if(0===e[t+3])r=255;else{r=306*e[t]+601*e[t+1]+117*e[t+2]+512>>10}n[i]=r}return n}getRow(e,t){if(e<0||e>=this.getHeight())throw new Y("Requested row is outside the image: "+e);const i=this.getWidth(),n=e*i;return null===t?t=this.buffer.slice(n,n+i):(t.length<i&&(t=new Uint8ClampedArray(i)),t.set(this.buffer.slice(n,n+i))),t}getMatrix(){return this.buffer}isCropSupported(){return!0}crop(e,t,i,n){return this.crop(e,t,i,n),this}isRotateSupported(){return!0}rotateCounterClockwise(){return this.rotate(-90),this}rotateCounterClockwise45(){return this.rotate(-45),this}getTempCanvasElement(){if(null===this.tempCanvasElement){const e=this.canvas.ownerDocument.createElement("canvas");e.width=this.canvas.width,e.height=this.canvas.height,this.tempCanvasElement=e}return this.tempCanvasElement}rotate(e){const t=this.getTempCanvasElement(),i=t.getContext("2d"),n=e*ue.DEGREE_TO_RADIANS,r=this.canvas.width,a=this.canvas.height,s=Math.ceil(Math.abs(Math.cos(n))*r+Math.abs(Math.sin(n))*a),o=Math.ceil(Math.abs(Math.sin(n))*r+Math.abs(Math.cos(n))*a);return t.width=s,t.height=o,i.translate(s/2,o/2),i.rotate(n),i.drawImage(this.canvas,r/-2,a/-2),this.buffer=ue.makeBufferFromCanvasImageData(t),this}invert(){return new de(this)}}ue.DEGREE_TO_RADIANS=Math.PI/180;class pe{constructor(e,t,i){this.deviceId=e,this.label=t,this.kind="videoinput",this.groupId=i||void 0}toJSON(){return{kind:this.kind,groupId:this.groupId,deviceId:this.deviceId,label:this.label}}}var me,ge=function(e,t,i,n){return new(i||(i=Promise))((function(r,a){function s(e){try{l(n.next(e))}catch(e){a(e)}}function o(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,o)}l((n=n.apply(e,t||[])).next())}))};class fe{constructor(e,t=500,i){this.reader=e,this.timeBetweenScansMillis=t,this._hints=i,this._stopContinuousDecode=!1,this._stopAsyncDecode=!1,this._timeBetweenDecodingAttempts=0}get hasNavigator(){return"undefined"!=typeof navigator}get isMediaDevicesSuported(){return this.hasNavigator&&!!navigator.mediaDevices}get canEnumerateDevices(){return!(!this.isMediaDevicesSuported||!navigator.mediaDevices.enumerateDevices)}get timeBetweenDecodingAttempts(){return this._timeBetweenDecodingAttempts}set timeBetweenDecodingAttempts(e){this._timeBetweenDecodingAttempts=e<0?0:e}set hints(e){this._hints=e||null}get hints(){return this._hints}listVideoInputDevices(){return ge(this,void 0,void 0,(function*(){if(!this.hasNavigator)throw new Error("Can't enumerate devices, navigator is not present.");if(!this.canEnumerateDevices)throw new Error("Can't enumerate devices, method not supported.");const e=yield navigator.mediaDevices.enumerateDevices(),t=[];for(const i of e){const e="video"===i.kind?"videoinput":i.kind;if("videoinput"!==e)continue;const n={deviceId:i.deviceId||i.id,label:i.label||`Video device ${t.length+1}`,kind:e,groupId:i.groupId};t.push(n)}return t}))}getVideoInputDevices(){return ge(this,void 0,void 0,(function*(){return(yield this.listVideoInputDevices()).map(e=>new pe(e.deviceId,e.label))}))}findDeviceById(e){return ge(this,void 0,void 0,(function*(){const t=yield this.listVideoInputDevices();return t?t.find(t=>t.deviceId===e):null}))}decodeFromInputVideoDevice(e,t){return ge(this,void 0,void 0,(function*(){return yield this.decodeOnceFromVideoDevice(e,t)}))}decodeOnceFromVideoDevice(e,t){return ge(this,void 0,void 0,(function*(){let i;this.reset();const n={video:i=e?{deviceId:{exact:e}}:{facingMode:"environment"}};return yield this.decodeOnceFromConstraints(n,t)}))}decodeOnceFromConstraints(e,t){return ge(this,void 0,void 0,(function*(){const i=yield navigator.mediaDevices.getUserMedia(e);return yield this.decodeOnceFromStream(i,t)}))}decodeOnceFromStream(e,t){return ge(this,void 0,void 0,(function*(){this.reset();const i=yield this.attachStreamToVideo(e,t);return yield this.decodeOnce(i)}))}decodeFromInputVideoDeviceContinuously(e,t,i){return ge(this,void 0,void 0,(function*(){return yield this.decodeFromVideoDevice(e,t,i)}))}decodeFromVideoDevice(e,t,i){return ge(this,void 0,void 0,(function*(){let n;const r={video:n=e?{deviceId:{exact:e}}:{facingMode:"environment"}};return yield this.decodeFromConstraints(r,t,i)}))}decodeFromConstraints(e,t,i){return ge(this,void 0,void 0,(function*(){const n=yield navigator.mediaDevices.getUserMedia(e);return yield this.decodeFromStream(n,t,i)}))}decodeFromStream(e,t,i){return ge(this,void 0,void 0,(function*(){this.reset();const n=yield this.attachStreamToVideo(e,t);return yield this.decodeContinuously(n,i)}))}stopAsyncDecode(){this._stopAsyncDecode=!0}stopContinuousDecode(){this._stopContinuousDecode=!0}attachStreamToVideo(e,t){return ge(this,void 0,void 0,(function*(){const i=this.prepareVideoElement(t);return this.addVideoSource(i,e),this.videoElement=i,this.stream=e,yield this.playVideoOnLoadAsync(i),i}))}playVideoOnLoadAsync(e){return new Promise((t,i)=>this.playVideoOnLoad(e,()=>t()))}playVideoOnLoad(e,t){this.videoEndedListener=()=>this.stopStreams(),this.videoCanPlayListener=()=>this.tryPlayVideo(e),e.addEventListener("ended",this.videoEndedListener),e.addEventListener("canplay",this.videoCanPlayListener),e.addEventListener("playing",t),this.tryPlayVideo(e)}isVideoPlaying(e){return e.currentTime>0&&!e.paused&&!e.ended&&e.readyState>2}tryPlayVideo(e){return ge(this,void 0,void 0,(function*(){if(this.isVideoPlaying(e))console.warn("Trying to play video that is already playing.");else try{yield e.play()}catch(e){console.warn("It was not possible to play the video.")}}))}getMediaElement(e,t){const i=document.getElementById(e);if(!i)throw new G(`element with id '${e}' not found`);if(i.nodeName.toLowerCase()!==t.toLowerCase())throw new G(`element with id '${e}' must be an ${t} element`);return i}decodeFromImage(e,t){if(!e&&!t)throw new G("either imageElement with a src set or an url must be provided");return t&&!e?this.decodeFromImageUrl(t):this.decodeFromImageElement(e)}decodeFromVideo(e,t){if(!e&&!t)throw new G("Either an element with a src set or an URL must be provided");return t&&!e?this.decodeFromVideoUrl(t):this.decodeFromVideoElement(e)}decodeFromVideoContinuously(e,t,i){if(void 0===e&&void 0===t)throw new G("Either an element with a src set or an URL must be provided");return t&&!e?this.decodeFromVideoUrlContinuously(t,i):this.decodeFromVideoElementContinuously(e,i)}decodeFromImageElement(e){if(!e)throw new G("An image element must be provided.");this.reset();const t=this.prepareImageElement(e);let i;return this.imageElement=t,i=this.isImageLoaded(t)?this.decodeOnce(t,!1,!0):this._decodeOnLoadImage(t)}decodeFromVideoElement(e){const t=this._decodeFromVideoElementSetup(e);return this._decodeOnLoadVideo(t)}decodeFromVideoElementContinuously(e,t){const i=this._decodeFromVideoElementSetup(e);return this._decodeOnLoadVideoContinuously(i,t)}_decodeFromVideoElementSetup(e){if(!e)throw new G("A video element must be provided.");this.reset();const t=this.prepareVideoElement(e);return this.videoElement=t,t}decodeFromImageUrl(e){if(!e)throw new G("An URL must be provided.");this.reset();const t=this.prepareImageElement();this.imageElement=t;const i=this._decodeOnLoadImage(t);return t.src=e,i}decodeFromVideoUrl(e){if(!e)throw new G("An URL must be provided.");this.reset();const t=this.prepareVideoElement(),i=this.decodeFromVideoElement(t);return t.src=e,i}decodeFromVideoUrlContinuously(e,t){if(!e)throw new G("An URL must be provided.");this.reset();const i=this.prepareVideoElement(),n=this.decodeFromVideoElementContinuously(i,t);return i.src=e,n}_decodeOnLoadImage(e){return new Promise((t,i)=>{this.imageLoadedListener=()=>this.decodeOnce(e,!1,!0).then(t,i),e.addEventListener("load",this.imageLoadedListener)})}_decodeOnLoadVideo(e){return ge(this,void 0,void 0,(function*(){return yield this.playVideoOnLoadAsync(e),yield this.decodeOnce(e)}))}_decodeOnLoadVideoContinuously(e,t){return ge(this,void 0,void 0,(function*(){yield this.playVideoOnLoadAsync(e),this.decodeContinuously(e,t)}))}isImageLoaded(e){return!!e.complete&&0!==e.naturalWidth}prepareImageElement(e){let t;return void 0===e&&((t=document.createElement("img")).width=200,t.height=200),"string"==typeof e&&(t=this.getMediaElement(e,"img")),e instanceof HTMLImageElement&&(t=e),t}prepareVideoElement(e){let t;return e||"undefined"==typeof document||((t=document.createElement("video")).width=200,t.height=200),"string"==typeof e&&(t=this.getMediaElement(e,"video")),e instanceof HTMLVideoElement&&(t=e),t.setAttribute("autoplay","true"),t.setAttribute("muted","true"),t.setAttribute("playsinline","true"),t}decodeOnce(e,t=!0,i=!0){this._stopAsyncDecode=!1;const n=(r,a)=>{if(this._stopAsyncDecode)return a(new ae("Video stream has ended before any code could be detected.")),void(this._stopAsyncDecode=void 0);try{const t=this.decode(e);r(t)}catch(e){const s=(e instanceof Z||e instanceof le)&&i;if(t&&e instanceof ae||s)return setTimeout(()=>n(r,a),this._timeBetweenDecodingAttempts);a(e)}};return new Promise((e,t)=>n(e,t))}decodeContinuously(e,t){this._stopContinuousDecode=!1;const i=()=>{if(this._stopContinuousDecode)this._stopContinuousDecode=void 0;else try{const n=this.decode(e);t(n,null),setTimeout(()=>i(),this.timeBetweenScansMillis)}catch(e){t(null,e);const n=e instanceof ae;(e instanceof Z||e instanceof le||n)&&setTimeout(()=>i(),this._timeBetweenDecodingAttempts)}};i()}decode(e){const t=this.createBinaryBitmap(e);return this.decodeBitmap(t)}createBinaryBitmap(e){const t=this.getCaptureCanvasContext(e);this.drawImageOnCanvas(t,e);const i=this.getCaptureCanvas(e),n=new ue(i),r=new oe(n);return new X(r)}getCaptureCanvasContext(e){if(!this.captureCanvasContext){const t=this.getCaptureCanvas(e).getContext("2d");this.captureCanvasContext=t}return this.captureCanvasContext}getCaptureCanvas(e){if(!this.captureCanvas){const t=this.createCaptureCanvas(e);this.captureCanvas=t}return this.captureCanvas}drawImageOnCanvas(e,t){e.drawImage(t,0,0)}decodeBitmap(e){return this.reader.decode(e,this._hints)}createCaptureCanvas(e){if("undefined"==typeof document)return this._destroyCaptureCanvas(),null;const t=document.createElement("canvas");let i,n;return void 0!==e&&(e instanceof HTMLVideoElement?(i=e.videoWidth,n=e.videoHeight):e instanceof HTMLImageElement&&(i=e.naturalWidth||e.width,n=e.naturalHeight||e.height)),t.style.width=i+"px",t.style.height=n+"px",t.width=i,t.height=n,t}stopStreams(){this.stream&&(this.stream.getVideoTracks().forEach(e=>e.stop()),this.stream=void 0),!1===this._stopAsyncDecode&&this.stopAsyncDecode(),!1===this._stopContinuousDecode&&this.stopContinuousDecode()}reset(){this.stopStreams(),this._destroyVideoElement(),this._destroyImageElement(),this._destroyCaptureCanvas()}_destroyVideoElement(){this.videoElement&&(void 0!==this.videoEndedListener&&this.videoElement.removeEventListener("ended",this.videoEndedListener),void 0!==this.videoPlayingEventListener&&this.videoElement.removeEventListener("playing",this.videoPlayingEventListener),void 0!==this.videoCanPlayListener&&this.videoElement.removeEventListener("loadedmetadata",this.videoCanPlayListener),this.cleanVideoSource(this.videoElement),this.videoElement=void 0)}_destroyImageElement(){this.imageElement&&(void 0!==this.imageLoadedListener&&this.imageElement.removeEventListener("load",this.imageLoadedListener),this.imageElement.src=void 0,this.imageElement.removeAttribute("src"),this.imageElement=void 0)}_destroyCaptureCanvas(){this.captureCanvasContext=void 0,this.captureCanvas=void 0}addVideoSource(e,t){try{e.srcObject=t}catch(i){e.src=URL.createObjectURL(t)}}cleanVideoSource(e){try{e.srcObject=null}catch(t){e.src=""}this.videoElement.removeAttribute("src")}}!function(e){e[e.AZTEC=0]="AZTEC",e[e.CODABAR=1]="CODABAR",e[e.CODE_39=2]="CODE_39",e[e.CODE_93=3]="CODE_93",e[e.CODE_128=4]="CODE_128",e[e.DATA_MATRIX=5]="DATA_MATRIX",e[e.EAN_8=6]="EAN_8",e[e.EAN_13=7]="EAN_13",e[e.ITF=8]="ITF",e[e.MAXICODE=9]="MAXICODE",e[e.PDF_417=10]="PDF_417",e[e.QR_CODE=11]="QR_CODE",e[e.RSS_14=12]="RSS_14",e[e.RSS_EXPANDED=13]="RSS_EXPANDED",e[e.UPC_A=14]="UPC_A",e[e.UPC_E=15]="UPC_E",e[e.UPC_EAN_EXTENSION=16]="UPC_EAN_EXTENSION"}(me||(me={}));var ve,be=me;!function(e){e[e.OTHER=0]="OTHER",e[e.PURE_BARCODE=1]="PURE_BARCODE",e[e.POSSIBLE_FORMATS=2]="POSSIBLE_FORMATS",e[e.TRY_HARDER=3]="TRY_HARDER",e[e.CHARACTER_SET=4]="CHARACTER_SET",e[e.ALLOWED_LENGTHS=5]="ALLOWED_LENGTHS",e[e.ASSUME_CODE_39_CHECK_DIGIT=6]="ASSUME_CODE_39_CHECK_DIGIT",e[e.ASSUME_GS1=7]="ASSUME_GS1",e[e.RETURN_CODABAR_START_END=8]="RETURN_CODABAR_START_END",e[e.NEED_RESULT_POINT_CALLBACK=9]="NEED_RESULT_POINT_CALLBACK",e[e.ALLOWED_EAN_EXTENSIONS=10]="ALLOWED_EAN_EXTENSIONS"}(ve||(ve={}));var _e,ye=ve;!function(e){e[e.OTHER=0]="OTHER",e[e.ORIENTATION=1]="ORIENTATION",e[e.BYTE_SEGMENTS=2]="BYTE_SEGMENTS",e[e.ERROR_CORRECTION_LEVEL=3]="ERROR_CORRECTION_LEVEL",e[e.ISSUE_NUMBER=4]="ISSUE_NUMBER",e[e.SUGGESTED_PRICE=5]="SUGGESTED_PRICE",e[e.POSSIBLE_COUNTRY=6]="POSSIBLE_COUNTRY",e[e.UPC_EAN_EXTENSION=7]="UPC_EAN_EXTENSION",e[e.PDF417_EXTRA_METADATA=8]="PDF417_EXTRA_METADATA",e[e.STRUCTURED_APPEND_SEQUENCE=9]="STRUCTURED_APPEND_SEQUENCE",e[e.STRUCTURED_APPEND_PARITY=10]="STRUCTURED_APPEND_PARITY"}(_e||(_e={}));var we,Ce,ze,Ee=_e;class Ae{MathUtils(){}static round(e){return NaN===e?0:e<=Number.MIN_SAFE_INTEGER?Number.MIN_SAFE_INTEGER:e>=Number.MAX_SAFE_INTEGER?Number.MAX_SAFE_INTEGER:e+(e<0?-.5:.5)|0}static distance(e,t,i,n){const r=e-i,a=t-n;return Math.sqrt(r*r+a*a)}static sum(e){let t=0;for(let i=0,n=e.length;i!==n;i++){t+=e[i]}return t}}class Se{static floatToIntBits(e){return e}}class Me{constructor(e,t){this.x=e,this.y=t}getX(){return this.x}getY(){return this.y}equals(e){if(e instanceof Me){const t=e;return this.x===t.x&&this.y===t.y}return!1}hashCode(){return 31*Se.floatToIntBits(this.x)+Se.floatToIntBits(this.y)}toString(){return"("+this.x+","+this.y+")"}static orderBestPatterns(e){const t=this.distance(e[0],e[1]),i=this.distance(e[1],e[2]),n=this.distance(e[0],e[2]);let r,a,s;if(i>=t&&i>=n?(a=e[0],r=e[1],s=e[2]):n>=i&&n>=t?(a=e[1],r=e[0],s=e[2]):(a=e[2],r=e[0],s=e[1]),this.crossProductZ(r,a,s)<0){const e=r;r=s,s=e}e[0]=r,e[1]=a,e[2]=s}static distance(e,t){return Ae.distance(e.x,e.y,t.x,t.y)}static crossProductZ(e,t,i){const n=t.x,r=t.y;return(i.x-n)*(e.y-r)-(i.y-r)*(e.x-n)}}class xe{decode(e,t){try{return this.doDecode(e,t)}catch(i){if(t&&!0===t.get(ye.TRY_HARDER)&&e.isRotateSupported()){const i=e.rotateCounterClockwise(),n=this.doDecode(i,t),r=n.getResultMetadata();let a=270;null!==r&&!0===r.get(Ee.ORIENTATION)&&(a+=r.get(Ee.ORIENTATION)%360),n.putMetadata(Ee.ORIENTATION,a);const s=n.getResultPoints();if(null!==s){const e=i.getHeight();for(let t=0;t<s.length;t++)s[t]=new Me(e-s[t].getY()-1,s[t].getX())}return n}throw new ae}}reset(){}doDecode(e,t){const i=e.getWidth(),n=e.getHeight();let r=new ie(i);const a=t&&!0===t.get(ye.TRY_HARDER),s=Math.max(1,n>>(a?8:5));let o;o=a?n:15;const l=Math.trunc(n/2);for(let a=0;a<o;a++){const o=Math.trunc((a+1)/2),c=l+s*(0==(1&a)?o:-o);if(c<0||c>=n)break;try{r=e.getBlackRow(c,r)}catch(e){continue}for(let e=0;e<2;e++){if(1===e&&(r.reverse(),t&&!0===t.get(ye.NEED_RESULT_POINT_CALLBACK))){const e=new Map;t.forEach((t,i)=>e.set(i,t)),e.delete(ye.NEED_RESULT_POINT_CALLBACK),t=e}try{const n=this.decodeRow(c,r,t);if(1===e){n.putMetadata(Ee.ORIENTATION,180);const e=n.getResultPoints();null!==e&&(e[0]=new Me(i-e[0].getX()-1,e[0].getY()),e[1]=new Me(i-e[1].getX()-1,e[1].getY()))}return n}catch(e){}}}throw new ae}static recordPattern(e,t,i){const n=i.length;for(let e=0;e<n;e++)i[e]=0;const r=e.getSize();if(t>=r)throw new ae;let a=!e.get(t),s=0,o=t;for(;o<r;){if(e.get(o)!==a)i[s]++;else{if(++s===n)break;i[s]=1,a=!a}o++}if(s!==n&&(s!==n-1||o!==r))throw new ae}static recordPatternInReverse(e,t,i){let n=i.length,r=e.get(t);for(;t>0&&n>=0;)e.get(--t)!==r&&(n--,r=!r);if(n>=0)throw new ae;xe.recordPattern(e,t+1,i)}static patternMatchVariance(e,t,i){const n=e.length;let r=0,a=0;for(let i=0;i<n;i++)r+=e[i],a+=t[i];if(r<a)return Number.POSITIVE_INFINITY;const s=r/a;i*=s;let o=0;for(let r=0;r<n;r++){const n=e[r],a=t[r]*s,l=n>a?n-a:a-n;if(l>i)return Number.POSITIVE_INFINITY;o+=l}return o/r}}class Te{constructor(e,t,i,n,r,a){this.text=e,this.rawBytes=t,this.numBits=i,this.resultPoints=n,this.format=r,this.timestamp=a,this.text=e,this.rawBytes=t,this.numBits=null==i?null==t?0:8*t.length:i,this.resultPoints=n,this.format=r,this.resultMetadata=null,this.timestamp=null==a?Q.currentTimeMillis():a}getText(){return this.text}getRawBytes(){return this.rawBytes}getNumBits(){return this.numBits}getResultPoints(){return this.resultPoints}getBarcodeFormat(){return this.format}getResultMetadata(){return this.resultMetadata}putMetadata(e,t){null===this.resultMetadata&&(this.resultMetadata=new Map),this.resultMetadata.set(e,t)}putAllMetadata(e){null!==e&&(null===this.resultMetadata?this.resultMetadata=e:this.resultMetadata=new Map(e))}addResultPoints(e){const t=this.resultPoints;if(null===t)this.resultPoints=e;else if(null!==e&&e.length>0){const i=new Me[t.length+e.length];Q.arraycopy(t,0,i,0,t.length),Q.arraycopy(e,0,i,t.length,e.length),this.resultPoints=i}}getTimestamp(){return this.timestamp}toString(){return this.text}}class Ie extends xe{constructor(e=!1,t=!1){super(),this.usingCheckDigit=e,this.extendedMode=t,this.decodeRowResult="",this.counters=new Array(9)}decodeRow(e,t,i){let n=this.counters;n.fill(0),this.decodeRowResult="";let r,a,s=Ie.findAsteriskPattern(t,n),o=t.getNextSet(s[1]),l=t.getSize();do{Ie.recordPattern(t,o,n);let e=Ie.toNarrowWidePattern(n);if(e<0)throw new ae;r=Ie.patternToChar(e),this.decodeRowResult+=r,a=o;for(let e of n)o+=e;o=t.getNextSet(o)}while("*"!==r);this.decodeRowResult=this.decodeRowResult.substring(0,this.decodeRowResult.length-1);let c,h=0;for(let e of n)h+=e;if(o!==l&&2*(o-a-h)<h)throw new ae;if(this.usingCheckDigit){let e=this.decodeRowResult.length-1,t=0;for(let i=0;i<e;i++)t+=Ie.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(i));if(this.decodeRowResult.charAt(e)!==Ie.ALPHABET_STRING.charAt(t%43))throw new Z;this.decodeRowResult=this.decodeRowResult.substring(0,e)}if(0===this.decodeRowResult.length)throw new ae;c=this.extendedMode?Ie.decodeExtended(this.decodeRowResult):this.decodeRowResult;let d=(s[1]+s[0])/2,u=a+h/2;return new Te(c,null,0,[new Me(d,e),new Me(u,e)],be.CODE_39,(new Date).getTime())}static findAsteriskPattern(e,t){let i=e.getSize(),n=e.getNextSet(0),r=0,a=n,s=!1,o=t.length;for(let l=n;l<i;l++)if(e.get(l)!==s)t[r]++;else{if(r===o-1){if(this.toNarrowWidePattern(t)===Ie.ASTERISK_ENCODING&&e.isRange(Math.max(0,a-Math.floor((l-a)/2)),a,!1))return[a,l];a+=t[0]+t[1],t.copyWithin(0,2,2+r-1),t[r-1]=0,t[r]=0,r--}else r++;t[r]=1,s=!s}throw new ae}static toNarrowWidePattern(e){let t,i=e.length,n=0;do{let r=2147483647;for(let t of e)t<r&&t>n&&(r=t);n=r,t=0;let a=0,s=0;for(let r=0;r<i;r++){let o=e[r];o>n&&(s|=1<<i-1-r,t++,a+=o)}if(3===t){for(let r=0;r<i&&t>0;r++){let i=e[r];if(i>n&&(t--,2*i>=a))return-1}return s}}while(t>3);return-1}static patternToChar(e){for(let t=0;t<Ie.CHARACTER_ENCODINGS.length;t++)if(Ie.CHARACTER_ENCODINGS[t]===e)return Ie.ALPHABET_STRING.charAt(t);if(e===Ie.ASTERISK_ENCODING)return"*";throw new ae}static decodeExtended(e){let t=e.length,i="";for(let n=0;n<t;n++){let t=e.charAt(n);if("+"===t||"$"===t||"%"===t||"/"===t){let r=e.charAt(n+1),a="\0";switch(t){case"+":if(!(r>="A"&&r<="Z"))throw new le;a=String.fromCharCode(r.charCodeAt(0)+32);break;case"$":if(!(r>="A"&&r<="Z"))throw new le;a=String.fromCharCode(r.charCodeAt(0)-64);break;case"%":if(r>="A"&&r<="E")a=String.fromCharCode(r.charCodeAt(0)-38);else if(r>="F"&&r<="J")a=String.fromCharCode(r.charCodeAt(0)-11);else if(r>="K"&&r<="O")a=String.fromCharCode(r.charCodeAt(0)+16);else if(r>="P"&&r<="T")a=String.fromCharCode(r.charCodeAt(0)+43);else if("U"===r)a="\0";else if("V"===r)a="@";else if("W"===r)a="`";else{if("X"!==r&&"Y"!==r&&"Z"!==r)throw new le;a=""}break;case"/":if(r>="A"&&r<="O")a=String.fromCharCode(r.charCodeAt(0)-32);else{if("Z"!==r)throw new le;a=":"}}i+=a,n++}else i+=t}return i}}Ie.ALPHABET_STRING="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%",Ie.CHARACTER_ENCODINGS=[52,289,97,352,49,304,112,37,292,100,265,73,328,25,280,88,13,268,76,28,259,67,322,19,274,82,7,262,70,22,385,193,448,145,400,208,133,388,196,168,162,138,42],Ie.ASTERISK_ENCODING=148;class ke extends xe{static findStartPattern(e){const t=e.getSize(),i=e.getNextSet(0);let n=0;const r=[0,0,0,0,0,0];let a=i,s=!1;for(let o=i;o<t;o++)if(e.get(o)!==s)r[n]++;else{if(5===n){let t=ke.MAX_AVG_VARIANCE,i=-1;for(let e=ke.CODE_START_A;e<=ke.CODE_START_C;e++){const n=xe.patternMatchVariance(r,ke.CODE_PATTERNS[e],ke.MAX_INDIVIDUAL_VARIANCE);n<t&&(t=n,i=e)}if(i>=0&&e.isRange(Math.max(0,a-(o-a)/2),a,!1))return[a,o,i];a+=r[0]+r[1],r.splice(0,2),r[n-1]=0,r[n]=0,n--}else n++;r[n]=1,s=!s}throw new ae}static decodeCode(e,t,i){xe.recordPattern(e,i,t);let n=ke.MAX_AVG_VARIANCE,r=-1;for(let e=0;e<ke.CODE_PATTERNS.length;e++){const i=ke.CODE_PATTERNS[e],a=this.patternMatchVariance(t,i,ke.MAX_INDIVIDUAL_VARIANCE);a<n&&(n=a,r=e)}if(r>=0)return r;throw new ae}decodeRow(e,t,i){const n=i&&!0===i.get(ye.ASSUME_GS1),r=ke.findStartPattern(t),a=r[2];let s=0;const o=new Uint8Array(20);let l;switch(o[s++]=a,a){case ke.CODE_START_A:l=ke.CODE_CODE_A;break;case ke.CODE_START_B:l=ke.CODE_CODE_B;break;case ke.CODE_START_C:l=ke.CODE_CODE_C;break;default:throw new le}let c=!1,h=!1,d="",u=r[0],p=r[1];const m=[0,0,0,0,0,0];let g=0,f=0,v=a,b=0,_=!0,y=!1,w=!1;for(;!c;){const e=h;switch(h=!1,g=f,f=ke.decodeCode(t,m,p),o[s++]=f,f!==ke.CODE_STOP&&(_=!0),f!==ke.CODE_STOP&&(v+=++b*f),u=p,p+=m.reduce((e,t)=>e+t,0),f){case ke.CODE_START_A:case ke.CODE_START_B:case ke.CODE_START_C:throw new le}switch(l){case ke.CODE_CODE_A:if(f<64)d+=w===y?String.fromCharCode(" ".charCodeAt(0)+f):String.fromCharCode(" ".charCodeAt(0)+f+128),w=!1;else if(f<96)d+=w===y?String.fromCharCode(f-64):String.fromCharCode(f+64),w=!1;else switch(f!==ke.CODE_STOP&&(_=!1),f){case ke.CODE_FNC_1:n&&(0===d.length?d+="]C1":d+=String.fromCharCode(29));break;case ke.CODE_FNC_2:case ke.CODE_FNC_3:break;case ke.CODE_FNC_4_A:!y&&w?(y=!0,w=!1):y&&w?(y=!1,w=!1):w=!0;break;case ke.CODE_SHIFT:h=!0,l=ke.CODE_CODE_B;break;case ke.CODE_CODE_B:l=ke.CODE_CODE_B;break;case ke.CODE_CODE_C:l=ke.CODE_CODE_C;break;case ke.CODE_STOP:c=!0}break;case ke.CODE_CODE_B:if(f<96)d+=w===y?String.fromCharCode(" ".charCodeAt(0)+f):String.fromCharCode(" ".charCodeAt(0)+f+128),w=!1;else switch(f!==ke.CODE_STOP&&(_=!1),f){case ke.CODE_FNC_1:n&&(0===d.length?d+="]C1":d+=String.fromCharCode(29));break;case ke.CODE_FNC_2:case ke.CODE_FNC_3:break;case ke.CODE_FNC_4_B:!y&&w?(y=!0,w=!1):y&&w?(y=!1,w=!1):w=!0;break;case ke.CODE_SHIFT:h=!0,l=ke.CODE_CODE_A;break;case ke.CODE_CODE_A:l=ke.CODE_CODE_A;break;case ke.CODE_CODE_C:l=ke.CODE_CODE_C;break;case ke.CODE_STOP:c=!0}break;case ke.CODE_CODE_C:if(f<100)f<10&&(d+="0"),d+=f;else switch(f!==ke.CODE_STOP&&(_=!1),f){case ke.CODE_FNC_1:n&&(0===d.length?d+="]C1":d+=String.fromCharCode(29));break;case ke.CODE_CODE_A:l=ke.CODE_CODE_A;break;case ke.CODE_CODE_B:l=ke.CODE_CODE_B;break;case ke.CODE_STOP:c=!0}}e&&(l=l===ke.CODE_CODE_A?ke.CODE_CODE_B:ke.CODE_CODE_A)}const C=p-u;if(p=t.getNextUnset(p),!t.isRange(p,Math.min(t.getSize(),p+(p-u)/2),!1))throw new ae;if((v-=b*g)%103!==g)throw new Z;const z=d.length;if(0===z)throw new ae;z>0&&_&&(d=l===ke.CODE_CODE_C?d.substring(0,z-2):d.substring(0,z-1));const E=(r[1]+r[0])/2,A=u+C/2,S=o.length,M=new Uint8Array(S);for(let e=0;e<S;e++)M[e]=o[e];const x=[new Me(E,e),new Me(A,e)];return new Te(d,M,0,x,be.CODE_128,(new Date).getTime())}}ke.CODE_PATTERNS=[[2,1,2,2,2,2],[2,2,2,1,2,2],[2,2,2,2,2,1],[1,2,1,2,2,3],[1,2,1,3,2,2],[1,3,1,2,2,2],[1,2,2,2,1,3],[1,2,2,3,1,2],[1,3,2,2,1,2],[2,2,1,2,1,3],[2,2,1,3,1,2],[2,3,1,2,1,2],[1,1,2,2,3,2],[1,2,2,1,3,2],[1,2,2,2,3,1],[1,1,3,2,2,2],[1,2,3,1,2,2],[1,2,3,2,2,1],[2,2,3,2,1,1],[2,2,1,1,3,2],[2,2,1,2,3,1],[2,1,3,2,1,2],[2,2,3,1,1,2],[3,1,2,1,3,1],[3,1,1,2,2,2],[3,2,1,1,2,2],[3,2,1,2,2,1],[3,1,2,2,1,2],[3,2,2,1,1,2],[3,2,2,2,1,1],[2,1,2,1,2,3],[2,1,2,3,2,1],[2,3,2,1,2,1],[1,1,1,3,2,3],[1,3,1,1,2,3],[1,3,1,3,2,1],[1,1,2,3,1,3],[1,3,2,1,1,3],[1,3,2,3,1,1],[2,1,1,3,1,3],[2,3,1,1,1,3],[2,3,1,3,1,1],[1,1,2,1,3,3],[1,1,2,3,3,1],[1,3,2,1,3,1],[1,1,3,1,2,3],[1,1,3,3,2,1],[1,3,3,1,2,1],[3,1,3,1,2,1],[2,1,1,3,3,1],[2,3,1,1,3,1],[2,1,3,1,1,3],[2,1,3,3,1,1],[2,1,3,1,3,1],[3,1,1,1,2,3],[3,1,1,3,2,1],[3,3,1,1,2,1],[3,1,2,1,1,3],[3,1,2,3,1,1],[3,3,2,1,1,1],[3,1,4,1,1,1],[2,2,1,4,1,1],[4,3,1,1,1,1],[1,1,1,2,2,4],[1,1,1,4,2,2],[1,2,1,1,2,4],[1,2,1,4,2,1],[1,4,1,1,2,2],[1,4,1,2,2,1],[1,1,2,2,1,4],[1,1,2,4,1,2],[1,2,2,1,1,4],[1,2,2,4,1,1],[1,4,2,1,1,2],[1,4,2,2,1,1],[2,4,1,2,1,1],[2,2,1,1,1,4],[4,1,3,1,1,1],[2,4,1,1,1,2],[1,3,4,1,1,1],[1,1,1,2,4,2],[1,2,1,1,4,2],[1,2,1,2,4,1],[1,1,4,2,1,2],[1,2,4,1,1,2],[1,2,4,2,1,1],[4,1,1,2,1,2],[4,2,1,1,1,2],[4,2,1,2,1,1],[2,1,2,1,4,1],[2,1,4,1,2,1],[4,1,2,1,2,1],[1,1,1,1,4,3],[1,1,1,3,4,1],[1,3,1,1,4,1],[1,1,4,1,1,3],[1,1,4,3,1,1],[4,1,1,1,1,3],[4,1,1,3,1,1],[1,1,3,1,4,1],[1,1,4,1,3,1],[3,1,1,1,4,1],[4,1,1,1,3,1],[2,1,1,4,1,2],[2,1,1,2,1,4],[2,1,1,2,3,2],[2,3,3,1,1,1,2]],ke.MAX_AVG_VARIANCE=.25,ke.MAX_INDIVIDUAL_VARIANCE=.7,ke.CODE_SHIFT=98,ke.CODE_CODE_C=99,ke.CODE_CODE_B=100,ke.CODE_CODE_A=101,ke.CODE_FNC_1=102,ke.CODE_FNC_2=97,ke.CODE_FNC_3=96,ke.CODE_FNC_4_A=101,ke.CODE_FNC_4_B=100,ke.CODE_START_A=103,ke.CODE_START_B=104,ke.CODE_START_C=105,ke.CODE_STOP=106;class Oe extends xe{constructor(){super(),this.decodeFinderCounters=new Array(4),this.dataCharacterCounters=new Array(8),this.oddRoundingErrors=new Array(4),this.evenRoundingErrors=new Array(4),this.oddCounts=new Array(this.dataCharacterCounters.length/2),this.evenCounts=new Array(this.dataCharacterCounters.length/2)}getDecodeFinderCounters(){return this.decodeFinderCounters}getDataCharacterCounters(){return this.dataCharacterCounters}getOddRoundingErrors(){return this.oddRoundingErrors}getEvenRoundingErrors(){return this.evenRoundingErrors}getOddCounts(){return this.oddCounts}getEvenCounts(){return this.evenCounts}parseFinderValue(e,t){for(let i=0;i<t.length;i++)if(xe.patternMatchVariance(e,t[i],Oe.MAX_INDIVIDUAL_VARIANCE)<Oe.MAX_AVG_VARIANCE)return i;throw new ae}static count(e){return Ae.sum(new Int32Array(e))}static increment(e,t){let i=0,n=t[0];for(let r=1;r<e.length;r++)t[r]>n&&(n=t[r],i=r);e[i]++}static decrement(e,t){let i=0,n=t[0];for(let r=1;r<e.length;r++)t[r]<n&&(n=t[r],i=r);e[i]--}static isFinderPattern(e){let t=e[0]+e[1],i=t/(t+e[2]+e[3]);if(i>=Oe.MIN_FINDER_PATTERN_RATIO&&i<=Oe.MAX_FINDER_PATTERN_RATIO){let t=Number.MAX_SAFE_INTEGER,i=Number.MIN_SAFE_INTEGER;for(let n of e)n>i&&(i=n),n<t&&(t=n);return i<10*t}return!1}}Oe.MAX_AVG_VARIANCE=.2,Oe.MAX_INDIVIDUAL_VARIANCE=.45,Oe.MIN_FINDER_PATTERN_RATIO=9.5/12,Oe.MAX_FINDER_PATTERN_RATIO=12.5/14;class He{constructor(e,t){this.value=e,this.checksumPortion=t}getValue(){return this.value}getChecksumPortion(){return this.checksumPortion}toString(){return this.value+"("+this.checksumPortion+")"}equals(e){if(!(e instanceof He))return!1;const t=e;return this.value===t.value&&this.checksumPortion===t.checksumPortion}hashCode(){return this.value^this.checksumPortion}}class Le extends He{constructor(e,t,i){super(e,t),this.count=0,this.finderPattern=i}getFinderPattern(){return this.finderPattern}getCount(){return this.count}incrementCount(){this.count++}}class Ve{constructor(e,t,i,n,r){this.value=e,this.startEnd=t,this.value=e,this.startEnd=t,this.resultPoints=new Array,this.resultPoints.push(new Me(i,r)),this.resultPoints.push(new Me(n,r))}getValue(){return this.value}getStartEnd(){return this.startEnd}getResultPoints(){return this.resultPoints}equals(e){if(!(e instanceof Ve))return!1;const t=e;return this.value===t.value}hashCode(){return this.value}}class De{RSSUtils(){}static getRSSvalue(e,t,i){let n=0;for(let t of e)n+=t;let r=0,a=0,s=e.length;for(let o=0;o<s-1;o++){let l;for(l=1,a|=1<<o;l<e[o];l++,a&=~(1<<o)){let e=De.combins(n-l-1,s-o-2);if(i&&0===a&&n-l-(s-o-1)>=s-o-1&&(e-=De.combins(n-l-(s-o),s-o-2)),s-o-1>1){let i=0;for(let e=n-l-(s-o-2);e>t;e--)i+=De.combins(n-l-e-1,s-o-3);e-=i*(s-1-o)}else n-l>t&&e--;r+=e}n-=l}return r}static combins(e,t){let i,n;e-t>t?(n=t,i=e-t):(n=e-t,i=t);let r=1,a=1;for(let t=e;t>i;t--)r*=t,a<=n&&(r/=a,a++);for(;a<=n;)r/=a,a++;return r}}class Ne extends Oe{constructor(){super(...arguments),this.possibleLeftPairs=[],this.possibleRightPairs=[]}decodeRow(e,t,i){const n=this.decodePair(t,!1,e,i);Ne.addOrTally(this.possibleLeftPairs,n),t.reverse();let r=this.decodePair(t,!0,e,i);Ne.addOrTally(this.possibleRightPairs,r),t.reverse();for(let e of this.possibleLeftPairs)if(e.getCount()>1)for(let t of this.possibleRightPairs)if(t.getCount()>1&&Ne.checkChecksum(e,t))return Ne.constructResult(e,t);throw new ae}static addOrTally(e,t){if(null==t)return;let i=!1;for(let n of e)if(n.getValue()===t.getValue()){n.incrementCount(),i=!0;break}i||e.push(t)}reset(){this.possibleLeftPairs.length=0,this.possibleRightPairs.length=0}static constructResult(e,t){let i=4537077*e.getValue()+t.getValue(),n=new String(i).toString(),r=new ne;for(let e=13-n.length;e>0;e--)r.append("0");r.append(n);let a=0;for(let e=0;e<13;e++){let t=r.charAt(e).charCodeAt(0)-"0".charCodeAt(0);a+=0==(1&e)?3*t:t}10===(a=10-a%10)&&(a=0),r.append(a.toString());let s=e.getFinderPattern().getResultPoints(),o=t.getFinderPattern().getResultPoints();return new Te(r.toString(),null,0,[s[0],s[1],o[0],o[1]],be.RSS_14,(new Date).getTime())}static checkChecksum(e,t){let i=(e.getChecksumPortion()+16*t.getChecksumPortion())%79,n=9*e.getFinderPattern().getValue()+t.getFinderPattern().getValue();return n>72&&n--,n>8&&n--,i===n}decodePair(e,t,i,n){try{let r=this.findFinderPattern(e,t),a=this.parseFoundFinderPattern(e,i,t,r),s=null==n?null:n.get(ye.NEED_RESULT_POINT_CALLBACK);if(null!=s){let n=(r[0]+r[1])/2;t&&(n=e.getSize()-1-n),s.foundPossibleResultPoint(new Me(n,i))}let o=this.decodeDataCharacter(e,a,!0),l=this.decodeDataCharacter(e,a,!1);return new Le(1597*o.getValue()+l.getValue(),o.getChecksumPortion()+4*l.getChecksumPortion(),a)}catch(e){return null}}decodeDataCharacter(e,t,i){let n=this.getDataCharacterCounters();for(let e=0;e<n.length;e++)n[e]=0;if(i)xe.recordPatternInReverse(e,t.getStartEnd()[0],n);else{xe.recordPattern(e,t.getStartEnd()[1]+1,n);for(let e=0,t=n.length-1;e<t;e++,t--){let i=n[e];n[e]=n[t],n[t]=i}}let r=i?16:15,a=Ae.sum(new Int32Array(n))/r,s=this.getOddCounts(),o=this.getEvenCounts(),l=this.getOddRoundingErrors(),c=this.getEvenRoundingErrors();for(let e=0;e<n.length;e++){let t=n[e]/a,i=Math.floor(t+.5);i<1?i=1:i>8&&(i=8);let r=Math.floor(e/2);0==(1&e)?(s[r]=i,l[r]=t-i):(o[r]=i,c[r]=t-i)}this.adjustOddEvenCounts(i,r);let h=0,d=0;for(let e=s.length-1;e>=0;e--)d*=9,d+=s[e],h+=s[e];let u=0,p=0;for(let e=o.length-1;e>=0;e--)u*=9,u+=o[e],p+=o[e];let m=d+3*u;if(i){if(0!=(1&h)||h>12||h<4)throw new ae;let e=(12-h)/2,t=Ne.OUTSIDE_ODD_WIDEST[e],i=9-t,n=De.getRSSvalue(s,t,!1),r=De.getRSSvalue(o,i,!0),a=Ne.OUTSIDE_EVEN_TOTAL_SUBSET[e],l=Ne.OUTSIDE_GSUM[e];return new He(n*a+r+l,m)}{if(0!=(1&p)||p>10||p<4)throw new ae;let e=(10-p)/2,t=Ne.INSIDE_ODD_WIDEST[e],i=9-t,n=De.getRSSvalue(s,t,!0),r=De.getRSSvalue(o,i,!1),a=Ne.INSIDE_ODD_TOTAL_SUBSET[e],l=Ne.INSIDE_GSUM[e];return new He(r*a+n+l,m)}}findFinderPattern(e,t){let i=this.getDecodeFinderCounters();i[0]=0,i[1]=0,i[2]=0,i[3]=0;let n=e.getSize(),r=!1,a=0;for(;a<n&&t!==(r=!e.get(a));)a++;let s=0,o=a;for(let t=a;t<n;t++)if(e.get(t)!==r)i[s]++;else{if(3===s){if(Oe.isFinderPattern(i))return[o,t];o+=i[0]+i[1],i[0]=i[2],i[1]=i[3],i[2]=0,i[3]=0,s--}else s++;i[s]=1,r=!r}throw new ae}parseFoundFinderPattern(e,t,i,n){let r=e.get(n[0]),a=n[0]-1;for(;a>=0&&r!==e.get(a);)a--;a++;let s=n[0]-a,o=this.getDecodeFinderCounters(),l=new Array(o.length);Q.arraycopy(o,0,l,1,o.length-1),l[0]=s;let c=this.parseFinderValue(l,Ne.FINDER_PATTERNS),h=a,d=n[1];return i&&(h=e.getSize()-1-h,d=e.getSize()-1-d),new Ve(c,[a,n[1]],h,d,t)}adjustOddEvenCounts(e,t){let i=Ae.sum(new Int32Array(this.getOddCounts())),n=Ae.sum(new Int32Array(this.getEvenCounts())),r=!1,a=!1,s=!1,o=!1;e?(i>12?a=!0:i<4&&(r=!0),n>12?o=!0:n<4&&(s=!0)):(i>11?a=!0:i<5&&(r=!0),n>10?o=!0:n<4&&(s=!0));let l=i+n-t,c=(1&i)==(e?1:0),h=1==(1&n);if(1===l)if(c){if(h)throw new ae;a=!0}else{if(!h)throw new ae;o=!0}else if(-1===l)if(c){if(h)throw new ae;r=!0}else{if(!h)throw new ae;s=!0}else{if(0!==l)throw new ae;if(c){if(!h)throw new ae;i<n?(r=!0,o=!0):(a=!0,s=!0)}else if(h)throw new ae}if(r){if(a)throw new ae;Oe.increment(this.getOddCounts(),this.getOddRoundingErrors())}if(a&&Oe.decrement(this.getOddCounts(),this.getOddRoundingErrors()),s){if(o)throw new ae;Oe.increment(this.getEvenCounts(),this.getOddRoundingErrors())}o&&Oe.decrement(this.getEvenCounts(),this.getEvenRoundingErrors())}}Ne.OUTSIDE_EVEN_TOTAL_SUBSET=[1,10,34,70,126],Ne.INSIDE_ODD_TOTAL_SUBSET=[4,20,48,81],Ne.OUTSIDE_GSUM=[0,161,961,2015,2715],Ne.INSIDE_GSUM=[0,336,1036,1516],Ne.OUTSIDE_ODD_WIDEST=[8,6,4,3,1],Ne.INSIDE_ODD_WIDEST=[2,4,6,8],Ne.FINDER_PATTERNS=[[3,8,2,1],[3,5,5,1],[3,3,7,1],[3,1,9,1],[2,7,4,1],[2,5,6,1],[2,3,8,1],[1,5,7,1],[1,3,9,1]];class Re extends xe{constructor(){super(...arguments),this.narrowLineWidth=-1}decodeRow(e,t,i){let n=this.decodeStart(t),r=this.decodeEnd(t),a=new ne;Re.decodeMiddle(t,n[1],r[0],a);let s=a.toString(),o=null;null!=i&&(o=i.get(ye.ALLOWED_LENGTHS)),null==o&&(o=Re.DEFAULT_ALLOWED_LENGTHS);let l=s.length,c=!1,h=0;for(let e of o){if(l===e){c=!0;break}e>h&&(h=e)}if(!c&&l>h&&(c=!0),!c)throw new le;const d=[new Me(n[1],e),new Me(r[0],e)];return new Te(s,null,0,d,be.ITF,(new Date).getTime())}static decodeMiddle(e,t,i,n){let r=new Array(10),a=new Array(5),s=new Array(5);for(r.fill(0),a.fill(0),s.fill(0);t<i;){xe.recordPattern(e,t,r);for(let e=0;e<5;e++){let t=2*e;a[e]=r[t],s[e]=r[t+1]}let i=Re.decodeDigit(a);n.append(i.toString()),i=this.decodeDigit(s),n.append(i.toString()),r.forEach((function(e){t+=e}))}}decodeStart(e){let t=Re.skipWhiteSpace(e),i=Re.findGuardPattern(e,t,Re.START_PATTERN);return this.narrowLineWidth=(i[1]-i[0])/4,this.validateQuietZone(e,i[0]),i}validateQuietZone(e,t){let i=10*this.narrowLineWidth;i=i<t?i:t;for(let n=t-1;i>0&&n>=0&&!e.get(n);n--)i--;if(0!==i)throw new ae}static skipWhiteSpace(e){const t=e.getSize(),i=e.getNextSet(0);if(i===t)throw new ae;return i}decodeEnd(e){e.reverse();try{let t,i=Re.skipWhiteSpace(e);try{t=Re.findGuardPattern(e,i,Re.END_PATTERN_REVERSED[0])}catch(n){t=Re.findGuardPattern(e,i,Re.END_PATTERN_REVERSED[1])}this.validateQuietZone(e,t[0]);let n=t[0];return t[0]=e.getSize()-t[1],t[1]=e.getSize()-n,t}finally{e.reverse()}}static findGuardPattern(e,t,i){let n=i.length,r=new Array(n),a=e.getSize(),s=!1,o=0,l=t;r.fill(0);for(let c=t;c<a;c++)if(e.get(c)!==s)r[o]++;else{if(o===n-1){if(xe.patternMatchVariance(r,i,Re.MAX_INDIVIDUAL_VARIANCE)<Re.MAX_AVG_VARIANCE)return[l,c];l+=r[0]+r[1],Q.arraycopy(r,2,r,0,o-1),r[o-1]=0,r[o]=0,o--}else o++;r[o]=1,s=!s}throw new ae}static decodeDigit(e){let t=Re.MAX_AVG_VARIANCE,i=-1,n=Re.PATTERNS.length;for(let r=0;r<n;r++){let n=Re.PATTERNS[r],a=xe.patternMatchVariance(e,n,Re.MAX_INDIVIDUAL_VARIANCE);a<t?(t=a,i=r):a===t&&(i=-1)}if(i>=0)return i%10;throw new ae}}Re.W=3,Re.w=2,Re.N=1,Re.PATTERNS=[[1,1,2,2,1],[2,1,1,1,2],[1,2,1,1,2],[2,2,1,1,1],[1,1,2,1,2],[2,1,2,1,1],[1,2,2,1,1],[1,1,1,2,2],[2,1,1,2,1],[1,2,1,2,1],[1,1,3,3,1],[3,1,1,1,3],[1,3,1,1,3],[3,3,1,1,1],[1,1,3,1,3],[3,1,3,1,1],[1,3,3,1,1],[1,1,1,3,3],[3,1,1,3,1],[1,3,1,3,1]],Re.MAX_AVG_VARIANCE=.38,Re.MAX_INDIVIDUAL_VARIANCE=.5,Re.DEFAULT_ALLOWED_LENGTHS=[6,8,10,12,14],Re.START_PATTERN=[1,1,1,1],Re.END_PATTERN_REVERSED=[[1,1,2],[1,1,3]];class Pe{constructor(){this.CHECK_DIGIT_ENCODINGS=[24,20,18,17,12,6,3,10,9,5],this.decodeMiddleCounters=[0,0,0,0],this.decodeRowStringBuffer=""}decodeRow(e,t,i){let n=this.decodeRowStringBuffer,r=this.decodeMiddle(t,i,n),a=n.toString(),s=Pe.parseExtensionString(a),o=[new Me((i[0]+i[1])/2,e),new Me(r,e)],l=new Te(a,null,0,o,be.UPC_EAN_EXTENSION,(new Date).getTime());return null!=s&&l.putAllMetadata(s),l}decodeMiddle(e,t,i){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=e.getSize(),a=t[1],s=0;for(let t=0;t<5&&a<r;t++){let r=je.decodeDigit(e,n,a,je.L_AND_G_PATTERNS);i+=String.fromCharCode("0".charCodeAt(0)+r%10);for(let e of n)a+=e;r>=10&&(s|=1<<4-t),4!==t&&(a=e.getNextSet(a),a=e.getNextUnset(a))}if(5!==i.length)throw new ae;let o=this.determineCheckDigit(s);if(Pe.extensionChecksum(i.toString())!==o)throw new ae;return a}static extensionChecksum(e){let t=e.length,i=0;for(let n=t-2;n>=0;n-=2)i+=e.charAt(n).charCodeAt(0)-"0".charCodeAt(0);i*=3;for(let n=t-1;n>=0;n-=2)i+=e.charAt(n).charCodeAt(0)-"0".charCodeAt(0);return(i*=3)%10}determineCheckDigit(e){for(let t=0;t<10;t++)if(e===this.CHECK_DIGIT_ENCODINGS[t])return t;throw new ae}static parseExtensionString(e){if(5!==e.length)return null;let t=Pe.parseExtension5String(e);return null==t?null:new Map([[Ee.SUGGESTED_PRICE,t]])}static parseExtension5String(e){let t;switch(e.charAt(0)){case"0":t="£";break;case"5":t="$";break;case"9":switch(e){case"90000":return null;case"99991":return"0.00";case"99990":return"Used"}t="";break;default:t=""}let i=parseInt(e.substring(1)),n=i%100;return t+(i/100).toString()+"."+(n<10?"0"+n:n.toString())}}class Be{constructor(){this.decodeMiddleCounters=[0,0,0,0],this.decodeRowStringBuffer=""}decodeRow(e,t,i){let n=this.decodeRowStringBuffer,r=this.decodeMiddle(t,i,n),a=n.toString(),s=Be.parseExtensionString(a),o=[new Me((i[0]+i[1])/2,e),new Me(r,e)],l=new Te(a,null,0,o,be.UPC_EAN_EXTENSION,(new Date).getTime());return null!=s&&l.putAllMetadata(s),l}decodeMiddle(e,t,i){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=e.getSize(),a=t[1],s=0;for(let t=0;t<2&&a<r;t++){let r=je.decodeDigit(e,n,a,je.L_AND_G_PATTERNS);i+=String.fromCharCode("0".charCodeAt(0)+r%10);for(let e of n)a+=e;r>=10&&(s|=1<<1-t),1!==t&&(a=e.getNextSet(a),a=e.getNextUnset(a))}if(2!==i.length)throw new ae;if(parseInt(i.toString())%4!==s)throw new ae;return a}static parseExtensionString(e){return 2!==e.length?null:new Map([[Ee.ISSUE_NUMBER,parseInt(e)]])}}class Fe{static decodeRow(e,t,i){let n=je.findGuardPattern(t,i,!1,this.EXTENSION_START_PATTERN,new Array(this.EXTENSION_START_PATTERN.length).fill(0));try{return(new Pe).decodeRow(e,t,n)}catch(i){return(new Be).decodeRow(e,t,n)}}}Fe.EXTENSION_START_PATTERN=[1,1,2];class je extends xe{constructor(){super(),this.decodeRowStringBuffer="",this.decodeRowStringBuffer="",je.L_AND_G_PATTERNS=je.L_PATTERNS.map((function(e){return e.slice()}));for(let e=10;e<20;e++){let t=je.L_PATTERNS[e-10],i=new Array(t.length);for(let e=0;e<t.length;e++)i[e]=t[t.length-e-1];je.L_AND_G_PATTERNS[e]=i}}static findStartGuardPattern(e){let t=!1,i=null,n=0,r=[0,0,0];for(;!t;){r=[0,0,0];let a=(i=je.findGuardPattern(e,n,!1,this.START_END_PATTERN,r))[0],s=a-((n=i[1])-a);s>=0&&(t=e.isRange(s,a,!1))}return i}decodeRow(e,t,i){let n=je.findStartGuardPattern(t),r=null==i?null:i.get(ye.NEED_RESULT_POINT_CALLBACK);if(null!=r){const t=new Me((n[0]+n[1])/2,e);r.foundPossibleResultPoint(t)}let a=this.decodeMiddle(t,n,this.decodeRowStringBuffer),s=a.rowOffset,o=a.resultString;if(null!=r){const t=new Me(s,e);r.foundPossibleResultPoint(t)}let l=je.decodeEnd(t,s);if(null!=r){const t=new Me((l[0]+l[1])/2,e);r.foundPossibleResultPoint(t)}let c=l[1],h=c+(c-l[0]);if(h>=t.getSize()||!t.isRange(c,h,!1))throw new ae;let d=o.toString();if(d.length<8)throw new le;if(!je.checkChecksum(d))throw new Z;let u=(n[1]+n[0])/2,p=(l[1]+l[0])/2,m=this.getBarcodeFormat(),g=[new Me(u,e),new Me(p,e)],f=new Te(d,null,0,g,m,(new Date).getTime()),v=0;try{let i=Fe.decodeRow(e,t,l[1]);f.putMetadata(Ee.UPC_EAN_EXTENSION,i.getText()),f.putAllMetadata(i.getResultMetadata()),f.addResultPoints(i.getResultPoints()),v=i.getText().length}catch(e){}let b=null==i?null:i.get(ye.ALLOWED_EAN_EXTENSIONS);if(null!=b){let e=!1;for(let t in b)if(v.toString()===t){e=!0;break}if(!e)throw new ae}return m===be.EAN_13||be.UPC_A,f}static checkChecksum(e){return je.checkStandardUPCEANChecksum(e)}static checkStandardUPCEANChecksum(e){let t=e.length;if(0===t)return!1;let i=parseInt(e.charAt(t-1),10);return je.getStandardUPCEANChecksum(e.substring(0,t-1))===i}static getStandardUPCEANChecksum(e){let t=e.length,i=0;for(let n=t-1;n>=0;n-=2){let t=e.charAt(n).charCodeAt(0)-"0".charCodeAt(0);if(t<0||t>9)throw new le;i+=t}i*=3;for(let n=t-2;n>=0;n-=2){let t=e.charAt(n).charCodeAt(0)-"0".charCodeAt(0);if(t<0||t>9)throw new le;i+=t}return(1e3-i)%10}static decodeEnd(e,t){return je.findGuardPattern(e,t,!1,je.START_END_PATTERN,new Array(je.START_END_PATTERN.length).fill(0))}static findGuardPattern(e,t,i,n,r){let a=e.getSize(),s=0,o=t=i?e.getNextUnset(t):e.getNextSet(t),l=n.length,c=i;for(let i=t;i<a;i++)if(e.get(i)!==c)r[s]++;else{if(s===l-1){if(xe.patternMatchVariance(r,n,je.MAX_INDIVIDUAL_VARIANCE)<je.MAX_AVG_VARIANCE)return[o,i];o+=r[0]+r[1];let e=r.slice(2,r.length);for(let t=0;t<s-1;t++)r[t]=e[t];r[s-1]=0,r[s]=0,s--}else s++;r[s]=1,c=!c}throw new ae}static decodeDigit(e,t,i,n){this.recordPattern(e,i,t);let r=this.MAX_AVG_VARIANCE,a=-1,s=n.length;for(let e=0;e<s;e++){let i=n[e],s=xe.patternMatchVariance(t,i,je.MAX_INDIVIDUAL_VARIANCE);s<r&&(r=s,a=e)}if(a>=0)return a;throw new ae}}je.MAX_AVG_VARIANCE=.48,je.MAX_INDIVIDUAL_VARIANCE=.7,je.START_END_PATTERN=[1,1,1],je.MIDDLE_PATTERN=[1,1,1,1,1],je.END_PATTERN=[1,1,1,1,1,1],je.L_PATTERNS=[[3,2,1,1],[2,2,2,1],[2,1,2,2],[1,4,1,1],[1,1,3,2],[1,2,3,1],[1,1,1,4],[1,3,1,2],[1,2,1,3],[3,1,1,2]];class Ue extends je{constructor(){super(),this.decodeMiddleCounters=[0,0,0,0]}decodeMiddle(e,t,i){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=e.getSize(),a=t[1],s=0;for(let t=0;t<6&&a<r;t++){let r=je.decodeDigit(e,n,a,je.L_AND_G_PATTERNS);i+=String.fromCharCode("0".charCodeAt(0)+r%10);for(let e of n)a+=e;r>=10&&(s|=1<<5-t)}i=Ue.determineFirstDigit(i,s),a=je.findGuardPattern(e,a,!0,je.MIDDLE_PATTERN,new Array(je.MIDDLE_PATTERN.length).fill(0))[1];for(let t=0;t<6&&a<r;t++){let t=je.decodeDigit(e,n,a,je.L_PATTERNS);i+=String.fromCharCode("0".charCodeAt(0)+t);for(let e of n)a+=e}return{rowOffset:a,resultString:i}}getBarcodeFormat(){return be.EAN_13}static determineFirstDigit(e,t){for(let i=0;i<10;i++)if(t===this.FIRST_DIGIT_ENCODINGS[i])return e=String.fromCharCode("0".charCodeAt(0)+i)+e;throw new ae}}Ue.FIRST_DIGIT_ENCODINGS=[0,11,13,14,19,25,28,21,22,26];class qe extends je{constructor(){super(),this.decodeMiddleCounters=[0,0,0,0]}decodeMiddle(e,t,i){let n=this.decodeMiddleCounters;n[0]=0,n[1]=0,n[2]=0,n[3]=0;let r=e.getSize(),a=t[1];for(let t=0;t<4&&a<r;t++){let t=je.decodeDigit(e,n,a,je.L_PATTERNS);i+=String.fromCharCode("0".charCodeAt(0)+t);for(let e of n)a+=e}a=je.findGuardPattern(e,a,!0,je.MIDDLE_PATTERN,new Array(je.MIDDLE_PATTERN.length).fill(0))[1];for(let t=0;t<4&&a<r;t++){let t=je.decodeDigit(e,n,a,je.L_PATTERNS);i+=String.fromCharCode("0".charCodeAt(0)+t);for(let e of n)a+=e}return{rowOffset:a,resultString:i}}getBarcodeFormat(){return be.EAN_8}}class $e extends xe{constructor(e){super();let t=null==e?null:e.get(ye.POSSIBLE_FORMATS),i=[];null!=t&&(t.indexOf(be.EAN_13)>-1&&i.push(new Ue),t.indexOf(be.EAN_8)>-1&&i.push(new qe)),0===i.length&&(i.push(new Ue),i.push(new qe)),this.readers=i}decodeRow(e,t,i){for(let n of this.readers)try{return n.decodeRow(e,t,i)}catch(e){}throw new ae}reset(){for(let e of this.readers)e.reset()}}class Ke extends xe{constructor(e){super(),this.readers=[];const t=e?e.get(ye.POSSIBLE_FORMATS):null,i=e&&void 0!==e.get(ye.ASSUME_CODE_39_CHECK_DIGIT);t&&((t.includes(be.EAN_13)||t.includes(be.EAN_8))&&this.readers.push(new $e(e)),t.includes(be.CODE_39)&&this.readers.push(new Ie(i)),t.includes(be.CODE_128)&&this.readers.push(new ke),t.includes(be.ITF)&&this.readers.push(new Re),t.includes(be.RSS_14)&&this.readers.push(new Ne)),0===this.readers.length&&(this.readers.push(new Ie),this.readers.push(new $e(e)),this.readers.push(new ke),this.readers.push(new Re),this.readers.push(new Ne))}decodeRow(e,t,i){for(let n=0;n<this.readers.length;n++)try{return this.readers[n].decodeRow(e,t,i)}catch(e){}throw new ae}reset(){this.readers.forEach(e=>e.reset())}}class We{constructor(e,t){if(0===t.length)throw new Y;this.field=e;const i=t.length;if(i>1&&0===t[0]){let e=1;for(;e<i&&0===t[e];)e++;e===i?this.coefficients=Int32Array.from([0]):(this.coefficients=new Int32Array(i-e),Q.arraycopy(t,e,this.coefficients,0,this.coefficients.length))}else this.coefficients=t}getCoefficients(){return this.coefficients}getDegree(){return this.coefficients.length-1}isZero(){return 0===this.coefficients[0]}getCoefficient(e){return this.coefficients[this.coefficients.length-1-e]}evaluateAt(e){if(0===e)return this.getCoefficient(0);const t=this.coefficients;let i;if(1===e){i=0;for(let e=0,n=t.length;e!==n;e++){const n=t[e];i=Ye.addOrSubtract(i,n)}return i}i=t[0];const n=t.length,r=this.field;for(let a=1;a<n;a++)i=Ye.addOrSubtract(r.multiply(e,i),t[a]);return i}addOrSubtract(e){if(!this.field.equals(e.field))throw new Y("GenericGFPolys do not have same GenericGF field");if(this.isZero())return e;if(e.isZero())return this;let t=this.coefficients,i=e.coefficients;if(t.length>i.length){const e=t;t=i,i=e}let n=new Int32Array(i.length);const r=i.length-t.length;Q.arraycopy(i,0,n,0,r);for(let e=r;e<i.length;e++)n[e]=Ye.addOrSubtract(t[e-r],i[e]);return new We(this.field,n)}multiply(e){if(!this.field.equals(e.field))throw new Y("GenericGFPolys do not have same GenericGF field");if(this.isZero()||e.isZero())return this.field.getZero();const t=this.coefficients,i=t.length,n=e.coefficients,r=n.length,a=new Int32Array(i+r-1),s=this.field;for(let e=0;e<i;e++){const i=t[e];for(let t=0;t<r;t++)a[e+t]=Ye.addOrSubtract(a[e+t],s.multiply(i,n[t]))}return new We(s,a)}multiplyScalar(e){if(0===e)return this.field.getZero();if(1===e)return this;const t=this.coefficients.length,i=this.field,n=new Int32Array(t),r=this.coefficients;for(let a=0;a<t;a++)n[a]=i.multiply(r[a],e);return new We(i,n)}multiplyByMonomial(e,t){if(e<0)throw new Y;if(0===t)return this.field.getZero();const i=this.coefficients,n=i.length,r=new Int32Array(n+e),a=this.field;for(let e=0;e<n;e++)r[e]=a.multiply(i[e],t);return new We(a,r)}divide(e){if(!this.field.equals(e.field))throw new Y("GenericGFPolys do not have same GenericGF field");if(e.isZero())throw new Y("Divide by 0");const t=this.field;let i=t.getZero(),n=this;const r=e.getCoefficient(e.getDegree()),a=t.inverse(r);for(;n.getDegree()>=e.getDegree()&&!n.isZero();){const r=n.getDegree()-e.getDegree(),s=t.multiply(n.getCoefficient(n.getDegree()),a),o=e.multiplyByMonomial(r,s),l=t.buildMonomial(r,s);i=i.addOrSubtract(l),n=n.addOrSubtract(o)}return[i,n]}toString(){let e="";for(let t=this.getDegree();t>=0;t--){let i=this.getCoefficient(t);if(0!==i){if(i<0?(e+=" - ",i=-i):e.length>0&&(e+=" + "),0===t||1!==i){const t=this.field.log(i);0===t?e+="1":1===t?e+="a":(e+="a^",e+=t)}0!==t&&(1===t?e+="x":(e+="x^",e+=t))}}return e}}class Ge extends W{}class Ye{constructor(e,t,i){this.primitive=e,this.size=t,this.generatorBase=i;const n=new Int32Array(t);let r=1;for(let i=0;i<t;i++)n[i]=r,(r*=2)>=t&&(r^=e,r&=t-1);this.expTable=n;const a=new Int32Array(t);for(let e=0;e<t-1;e++)a[n[e]]=e;this.logTable=a,this.zero=new We(this,Int32Array.from([0])),this.one=new We(this,Int32Array.from([1]))}getZero(){return this.zero}getOne(){return this.one}buildMonomial(e,t){if(e<0)throw new Y;if(0===t)return this.zero;const i=new Int32Array(e+1);return i[0]=t,new We(this,i)}static addOrSubtract(e,t){return e^t}exp(e){return this.expTable[e]}log(e){if(0===e)throw new Y;return this.logTable[e]}inverse(e){if(0===e)throw new Ge;return this.expTable[this.size-this.logTable[e]-1]}multiply(e,t){return 0===e||0===t?0:this.expTable[(this.logTable[e]+this.logTable[t])%(this.size-1)]}getSize(){return this.size}getGeneratorBase(){return this.generatorBase}toString(){return"GF(0x"+ee.toHexString(this.primitive)+","+this.size+")"}equals(e){return e===this}}Ye.AZTEC_DATA_12=new Ye(4201,4096,1),Ye.AZTEC_DATA_10=new Ye(1033,1024,1),Ye.AZTEC_DATA_6=new Ye(67,64,1),Ye.AZTEC_PARAM=new Ye(19,16,1),Ye.QR_CODE_FIELD_256=new Ye(285,256,0),Ye.DATA_MATRIX_FIELD_256=new Ye(301,256,1),Ye.AZTEC_DATA_8=Ye.DATA_MATRIX_FIELD_256,Ye.MAXICODE_FIELD_64=Ye.AZTEC_DATA_6;class Xe extends W{}class Ze extends W{}class Je{constructor(e){this.field=e}decode(e,t){const i=this.field,n=new We(i,e),r=new Int32Array(t);let a=!0;for(let e=0;e<t;e++){const t=n.evaluateAt(i.exp(e+i.getGeneratorBase()));r[r.length-1-e]=t,0!==t&&(a=!1)}if(a)return;const s=new We(i,r),o=this.runEuclideanAlgorithm(i.buildMonomial(t,1),s,t),l=o[0],c=o[1],h=this.findErrorLocations(l),d=this.findErrorMagnitudes(c,h);for(let t=0;t<h.length;t++){const n=e.length-1-i.log(h[t]);if(n<0)throw new Xe("Bad error location");e[n]=Ye.addOrSubtract(e[n],d[t])}}runEuclideanAlgorithm(e,t,i){if(e.getDegree()<t.getDegree()){const i=e;e=t,t=i}const n=this.field;let r=e,a=t,s=n.getZero(),o=n.getOne();for(;a.getDegree()>=(i/2|0);){let e=r,t=s;if(s=o,(r=a).isZero())throw new Xe("r_{i-1} was zero");a=e;let i=n.getZero();const l=r.getCoefficient(r.getDegree()),c=n.inverse(l);for(;a.getDegree()>=r.getDegree()&&!a.isZero();){const e=a.getDegree()-r.getDegree(),t=n.multiply(a.getCoefficient(a.getDegree()),c);i=i.addOrSubtract(n.buildMonomial(e,t)),a=a.addOrSubtract(r.multiplyByMonomial(e,t))}if(o=i.multiply(s).addOrSubtract(t),a.getDegree()>=r.getDegree())throw new Ze("Division algorithm failed to reduce polynomial?")}const l=o.getCoefficient(0);if(0===l)throw new Xe("sigmaTilde(0) was zero");const c=n.inverse(l);return[o.multiplyScalar(c),a.multiplyScalar(c)]}findErrorLocations(e){const t=e.getDegree();if(1===t)return Int32Array.from([e.getCoefficient(1)]);const i=new Int32Array(t);let n=0;const r=this.field;for(let a=1;a<r.getSize()&&n<t;a++)0===e.evaluateAt(a)&&(i[n]=r.inverse(a),n++);if(n!==t)throw new Xe("Error locator degree does not match number of roots");return i}findErrorMagnitudes(e,t){const i=t.length,n=new Int32Array(i),r=this.field;for(let a=0;a<i;a++){const s=r.inverse(t[a]);let o=1;for(let e=0;e<i;e++)if(a!==e){const i=r.multiply(t[e],s),n=0==(1&i)?1|i:-2&i;o=r.multiply(o,n)}n[a]=r.multiply(e.evaluateAt(s),r.inverse(o)),0!==r.getGeneratorBase()&&(n[a]=r.multiply(n[a],s))}return n}}class Qe{constructor(e,t,i){this.ecCodewords=e,this.ecBlocks=[t],i&&this.ecBlocks.push(i)}getECCodewords(){return this.ecCodewords}getECBlocks(){return this.ecBlocks}}class et{constructor(e,t){this.count=e,this.dataCodewords=t}getCount(){return this.count}getDataCodewords(){return this.dataCodewords}}class tt{constructor(e,t,i,n,r,a){this.versionNumber=e,this.symbolSizeRows=t,this.symbolSizeColumns=i,this.dataRegionSizeRows=n,this.dataRegionSizeColumns=r,this.ecBlocks=a;let s=0;const o=a.getECCodewords(),l=a.getECBlocks();for(let e of l)s+=e.getCount()*(e.getDataCodewords()+o);this.totalCodewords=s}getVersionNumber(){return this.versionNumber}getSymbolSizeRows(){return this.symbolSizeRows}getSymbolSizeColumns(){return this.symbolSizeColumns}getDataRegionSizeRows(){return this.dataRegionSizeRows}getDataRegionSizeColumns(){return this.dataRegionSizeColumns}getTotalCodewords(){return this.totalCodewords}getECBlocks(){return this.ecBlocks}static getVersionForDimensions(e,t){if(0!=(1&e)||0!=(1&t))throw new le;for(let i of tt.VERSIONS)if(i.symbolSizeRows===e&&i.symbolSizeColumns===t)return i;throw new le}toString(){return""+this.versionNumber}static buildVersions(){return[new tt(1,10,10,8,8,new Qe(5,new et(1,3))),new tt(2,12,12,10,10,new Qe(7,new et(1,5))),new tt(3,14,14,12,12,new Qe(10,new et(1,8))),new tt(4,16,16,14,14,new Qe(12,new et(1,12))),new tt(5,18,18,16,16,new Qe(14,new et(1,18))),new tt(6,20,20,18,18,new Qe(18,new et(1,22))),new tt(7,22,22,20,20,new Qe(20,new et(1,30))),new tt(8,24,24,22,22,new Qe(24,new et(1,36))),new tt(9,26,26,24,24,new Qe(28,new et(1,44))),new tt(10,32,32,14,14,new Qe(36,new et(1,62))),new tt(11,36,36,16,16,new Qe(42,new et(1,86))),new tt(12,40,40,18,18,new Qe(48,new et(1,114))),new tt(13,44,44,20,20,new Qe(56,new et(1,144))),new tt(14,48,48,22,22,new Qe(68,new et(1,174))),new tt(15,52,52,24,24,new Qe(42,new et(2,102))),new tt(16,64,64,14,14,new Qe(56,new et(2,140))),new tt(17,72,72,16,16,new Qe(36,new et(4,92))),new tt(18,80,80,18,18,new Qe(48,new et(4,114))),new tt(19,88,88,20,20,new Qe(56,new et(4,144))),new tt(20,96,96,22,22,new Qe(68,new et(4,174))),new tt(21,104,104,24,24,new Qe(56,new et(6,136))),new tt(22,120,120,18,18,new Qe(68,new et(6,175))),new tt(23,132,132,20,20,new Qe(62,new et(8,163))),new tt(24,144,144,22,22,new Qe(62,new et(8,156),new et(2,155))),new tt(25,8,18,6,16,new Qe(7,new et(1,5))),new tt(26,8,32,6,14,new Qe(11,new et(1,10))),new tt(27,12,26,10,24,new Qe(14,new et(1,16))),new tt(28,12,36,10,16,new Qe(18,new et(1,22))),new tt(29,16,36,14,16,new Qe(24,new et(1,32))),new tt(30,16,48,14,22,new Qe(28,new et(1,49)))]}}tt.VERSIONS=tt.buildVersions();class it{constructor(e){const t=e.getHeight();if(t<8||t>144||0!=(1&t))throw new le;this.version=it.readVersion(e),this.mappingBitMatrix=this.extractDataRegion(e),this.readMappingMatrix=new re(this.mappingBitMatrix.getWidth(),this.mappingBitMatrix.getHeight())}getVersion(){return this.version}static readVersion(e){const t=e.getHeight(),i=e.getWidth();return tt.getVersionForDimensions(t,i)}readCodewords(){const e=new Int8Array(this.version.getTotalCodewords());let t=0,i=4,n=0;const r=this.mappingBitMatrix.getHeight(),a=this.mappingBitMatrix.getWidth();let s=!1,o=!1,l=!1,c=!1;do{if(i!==r||0!==n||s)if(i!==r-2||0!==n||0==(3&a)||o)if(i!==r+4||2!==n||0!=(7&a)||l)if(i!==r-2||0!==n||4!=(7&a)||c){do{i<r&&n>=0&&!this.readMappingMatrix.get(n,i)&&(e[t++]=255&this.readUtah(i,n,r,a)),i-=2,n+=2}while(i>=0&&n<a);i+=1,n+=3;do{i>=0&&n<a&&!this.readMappingMatrix.get(n,i)&&(e[t++]=255&this.readUtah(i,n,r,a)),i+=2,n-=2}while(i<r&&n>=0);i+=3,n+=1}else e[t++]=255&this.readCorner4(r,a),i-=2,n+=2,c=!0;else e[t++]=255&this.readCorner3(r,a),i-=2,n+=2,l=!0;else e[t++]=255&this.readCorner2(r,a),i-=2,n+=2,o=!0;else e[t++]=255&this.readCorner1(r,a),i-=2,n+=2,s=!0}while(i<r||n<a);if(t!==this.version.getTotalCodewords())throw new le;return e}readModule(e,t,i,n){return e<0&&(e+=i,t+=4-(i+4&7)),t<0&&(t+=n,e+=4-(n+4&7)),this.readMappingMatrix.set(t,e),this.mappingBitMatrix.get(t,e)}readUtah(e,t,i,n){let r=0;return this.readModule(e-2,t-2,i,n)&&(r|=1),r<<=1,this.readModule(e-2,t-1,i,n)&&(r|=1),r<<=1,this.readModule(e-1,t-2,i,n)&&(r|=1),r<<=1,this.readModule(e-1,t-1,i,n)&&(r|=1),r<<=1,this.readModule(e-1,t,i,n)&&(r|=1),r<<=1,this.readModule(e,t-2,i,n)&&(r|=1),r<<=1,this.readModule(e,t-1,i,n)&&(r|=1),r<<=1,this.readModule(e,t,i,n)&&(r|=1),r}readCorner1(e,t){let i=0;return this.readModule(e-1,0,e,t)&&(i|=1),i<<=1,this.readModule(e-1,1,e,t)&&(i|=1),i<<=1,this.readModule(e-1,2,e,t)&&(i|=1),i<<=1,this.readModule(0,t-2,e,t)&&(i|=1),i<<=1,this.readModule(0,t-1,e,t)&&(i|=1),i<<=1,this.readModule(1,t-1,e,t)&&(i|=1),i<<=1,this.readModule(2,t-1,e,t)&&(i|=1),i<<=1,this.readModule(3,t-1,e,t)&&(i|=1),i}readCorner2(e,t){let i=0;return this.readModule(e-3,0,e,t)&&(i|=1),i<<=1,this.readModule(e-2,0,e,t)&&(i|=1),i<<=1,this.readModule(e-1,0,e,t)&&(i|=1),i<<=1,this.readModule(0,t-4,e,t)&&(i|=1),i<<=1,this.readModule(0,t-3,e,t)&&(i|=1),i<<=1,this.readModule(0,t-2,e,t)&&(i|=1),i<<=1,this.readModule(0,t-1,e,t)&&(i|=1),i<<=1,this.readModule(1,t-1,e,t)&&(i|=1),i}readCorner3(e,t){let i=0;return this.readModule(e-1,0,e,t)&&(i|=1),i<<=1,this.readModule(e-1,t-1,e,t)&&(i|=1),i<<=1,this.readModule(0,t-3,e,t)&&(i|=1),i<<=1,this.readModule(0,t-2,e,t)&&(i|=1),i<<=1,this.readModule(0,t-1,e,t)&&(i|=1),i<<=1,this.readModule(1,t-3,e,t)&&(i|=1),i<<=1,this.readModule(1,t-2,e,t)&&(i|=1),i<<=1,this.readModule(1,t-1,e,t)&&(i|=1),i}readCorner4(e,t){let i=0;return this.readModule(e-3,0,e,t)&&(i|=1),i<<=1,this.readModule(e-2,0,e,t)&&(i|=1),i<<=1,this.readModule(e-1,0,e,t)&&(i|=1),i<<=1,this.readModule(0,t-2,e,t)&&(i|=1),i<<=1,this.readModule(0,t-1,e,t)&&(i|=1),i<<=1,this.readModule(1,t-1,e,t)&&(i|=1),i<<=1,this.readModule(2,t-1,e,t)&&(i|=1),i<<=1,this.readModule(3,t-1,e,t)&&(i|=1),i}extractDataRegion(e){const t=this.version.getSymbolSizeRows(),i=this.version.getSymbolSizeColumns();if(e.getHeight()!==t)throw new Y("Dimension of bitMatrix must match the version size");const n=this.version.getDataRegionSizeRows(),r=this.version.getDataRegionSizeColumns(),a=t/n|0,s=i/r|0,o=new re(s*r,a*n);for(let t=0;t<a;++t){const i=t*n;for(let a=0;a<s;++a){const s=a*r;for(let l=0;l<n;++l){const c=t*(n+2)+1+l,h=i+l;for(let t=0;t<r;++t){const i=a*(r+2)+1+t;if(e.get(i,c)){const e=s+t;o.set(e,h)}}}}}return o}}class nt{constructor(e,t){this.numDataCodewords=e,this.codewords=t}static getDataBlocks(e,t){const i=t.getECBlocks();let n=0;const r=i.getECBlocks();for(let e of r)n+=e.getCount();const a=new Array(n);let s=0;for(let e of r)for(let t=0;t<e.getCount();t++){const t=e.getDataCodewords(),n=i.getECCodewords()+t;a[s++]=new nt(t,new Uint8Array(n))}const o=a[0].codewords.length-i.getECCodewords(),l=o-1;let c=0;for(let t=0;t<l;t++)for(let i=0;i<s;i++)a[i].codewords[t]=e[c++];const h=24===t.getVersionNumber(),d=h?8:s;for(let t=0;t<d;t++)a[t].codewords[o-1]=e[c++];const u=a[0].codewords.length;for(let t=o;t<u;t++)for(let i=0;i<s;i++){const n=h?(i+8)%s:i,r=h&&n>7?t-1:t;a[n].codewords[r]=e[c++]}if(c!==e.length)throw new Y;return a}getNumDataCodewords(){return this.numDataCodewords}getCodewords(){return this.codewords}}class rt{constructor(e,t,i,n,r=-1,a=-1){this.rawBytes=e,this.text=t,this.byteSegments=i,this.ecLevel=n,this.structuredAppendSequenceNumber=r,this.structuredAppendParity=a,this.numBits=null==e?0:8*e.length}getRawBytes(){return this.rawBytes}getNumBits(){return this.numBits}setNumBits(e){this.numBits=e}getText(){return this.text}getByteSegments(){return this.byteSegments}getECLevel(){return this.ecLevel}getErrorsCorrected(){return this.errorsCorrected}setErrorsCorrected(e){this.errorsCorrected=e}getErasures(){return this.erasures}setErasures(e){this.erasures=e}getOther(){return this.other}setOther(e){this.other=e}hasStructuredAppend(){return this.structuredAppendParity>=0&&this.structuredAppendSequenceNumber>=0}getStructuredAppendParity(){return this.structuredAppendParity}getStructuredAppendSequenceNumber(){return this.structuredAppendSequenceNumber}}class at{constructor(e){this.bytes=e,this.byteOffset=0,this.bitOffset=0}getBitOffset(){return this.bitOffset}getByteOffset(){return this.byteOffset}readBits(e){if(e<1||e>32||e>this.available())throw new Y(""+e);let t=0,i=this.bitOffset,n=this.byteOffset;const r=this.bytes;if(i>0){const a=8-i,s=e<a?e:a,o=a-s,l=255>>8-s<<o;t=(r[n]&l)>>o,e-=s,8===(i+=s)&&(i=0,n++)}if(e>0){for(;e>=8;)t=t<<8|255&r[n],n++,e-=8;if(e>0){const a=8-e,s=255>>a<<a;t=t<<e|(r[n]&s)>>a,i+=e}}return this.bitOffset=i,this.byteOffset=n,t}available(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset}}!function(e){e[e.Cp437=0]="Cp437",e[e.ISO8859_1=1]="ISO8859_1",e[e.ISO8859_2=2]="ISO8859_2",e[e.ISO8859_3=3]="ISO8859_3",e[e.ISO8859_4=4]="ISO8859_4",e[e.ISO8859_5=5]="ISO8859_5",e[e.ISO8859_6=6]="ISO8859_6",e[e.ISO8859_7=7]="ISO8859_7",e[e.ISO8859_8=8]="ISO8859_8",e[e.ISO8859_9=9]="ISO8859_9",e[e.ISO8859_10=10]="ISO8859_10",e[e.ISO8859_11=11]="ISO8859_11",e[e.ISO8859_13=12]="ISO8859_13",e[e.ISO8859_14=13]="ISO8859_14",e[e.ISO8859_15=14]="ISO8859_15",e[e.ISO8859_16=15]="ISO8859_16",e[e.SJIS=16]="SJIS",e[e.Cp1250=17]="Cp1250",e[e.Cp1251=18]="Cp1251",e[e.Cp1252=19]="Cp1252",e[e.Cp1256=20]="Cp1256",e[e.UnicodeBigUnmarked=21]="UnicodeBigUnmarked",e[e.UTF8=22]="UTF8",e[e.ASCII=23]="ASCII",e[e.Big5=24]="Big5",e[e.GB18030=25]="GB18030",e[e.EUC_KR=26]="EUC_KR"}(we||(we={}));class st{constructor(e,t,i,...n){this.valueIdentifier=e,this.name=i,this.values="number"==typeof t?Int32Array.from([t]):t,this.otherEncodingNames=n,st.VALUE_IDENTIFIER_TO_ECI.set(e,this),st.NAME_TO_ECI.set(i,this);const r=this.values;for(let e=0,t=r.length;e!==t;e++){const t=r[e];st.VALUES_TO_ECI.set(t,this)}for(const e of n)st.NAME_TO_ECI.set(e,this)}getValueIdentifier(){return this.valueIdentifier}getName(){return this.name}getValue(){return this.values[0]}static getCharacterSetECIByValue(e){if(e<0||e>=900)throw new le("incorect value");const t=st.VALUES_TO_ECI.get(e);if(void 0===t)throw new le("incorect value");return t}static getCharacterSetECIByName(e){const t=st.NAME_TO_ECI.get(e);if(void 0===t)throw new le("incorect value");return t}equals(e){if(!(e instanceof st))return!1;const t=e;return this.getName()===t.getName()}}st.VALUE_IDENTIFIER_TO_ECI=new Map,st.VALUES_TO_ECI=new Map,st.NAME_TO_ECI=new Map,st.Cp437=new st(we.Cp437,Int32Array.from([0,2]),"Cp437"),st.ISO8859_1=new st(we.ISO8859_1,Int32Array.from([1,3]),"ISO-8859-1","ISO88591","ISO8859_1"),st.ISO8859_2=new st(we.ISO8859_2,4,"ISO-8859-2","ISO88592","ISO8859_2"),st.ISO8859_3=new st(we.ISO8859_3,5,"ISO-8859-3","ISO88593","ISO8859_3"),st.ISO8859_4=new st(we.ISO8859_4,6,"ISO-8859-4","ISO88594","ISO8859_4"),st.ISO8859_5=new st(we.ISO8859_5,7,"ISO-8859-5","ISO88595","ISO8859_5"),st.ISO8859_6=new st(we.ISO8859_6,8,"ISO-8859-6","ISO88596","ISO8859_6"),st.ISO8859_7=new st(we.ISO8859_7,9,"ISO-8859-7","ISO88597","ISO8859_7"),st.ISO8859_8=new st(we.ISO8859_8,10,"ISO-8859-8","ISO88598","ISO8859_8"),st.ISO8859_9=new st(we.ISO8859_9,11,"ISO-8859-9","ISO88599","ISO8859_9"),st.ISO8859_10=new st(we.ISO8859_10,12,"ISO-8859-10","ISO885910","ISO8859_10"),st.ISO8859_11=new st(we.ISO8859_11,13,"ISO-8859-11","ISO885911","ISO8859_11"),st.ISO8859_13=new st(we.ISO8859_13,15,"ISO-8859-13","ISO885913","ISO8859_13"),st.ISO8859_14=new st(we.ISO8859_14,16,"ISO-8859-14","ISO885914","ISO8859_14"),st.ISO8859_15=new st(we.ISO8859_15,17,"ISO-8859-15","ISO885915","ISO8859_15"),st.ISO8859_16=new st(we.ISO8859_16,18,"ISO-8859-16","ISO885916","ISO8859_16"),st.SJIS=new st(we.SJIS,20,"SJIS","Shift_JIS"),st.Cp1250=new st(we.Cp1250,21,"Cp1250","windows-1250"),st.Cp1251=new st(we.Cp1251,22,"Cp1251","windows-1251"),st.Cp1252=new st(we.Cp1252,23,"Cp1252","windows-1252"),st.Cp1256=new st(we.Cp1256,24,"Cp1256","windows-1256"),st.UnicodeBigUnmarked=new st(we.UnicodeBigUnmarked,25,"UnicodeBigUnmarked","UTF-16BE","UnicodeBig"),st.UTF8=new st(we.UTF8,26,"UTF8","UTF-8"),st.ASCII=new st(we.ASCII,Int32Array.from([27,170]),"ASCII","US-ASCII"),st.Big5=new st(we.Big5,28,"Big5"),st.GB18030=new st(we.GB18030,29,"GB18030","GB2312","EUC_CN","GBK"),st.EUC_KR=new st(we.EUC_KR,30,"EUC_KR","EUC-KR");class ot{static decode(e,t){const i=this.encodingName(t);return"undefined"==typeof TextDecoder?this.decodeFallback(e,i):new TextDecoder(i).decode(e)}static encode(e,t){if(!ot.isBrowser()){return new TextEncoder(this.encodingName(t),{NONSTANDARD_allowLegacyEncoding:!0}).encode(e)}return"undefined"==typeof TextEncoder?this.encodeFallback(e):(new TextEncoder).encode(e)}static isBrowser(){return"undefined"!=typeof window&&"[object Window]"==={}.toString.call(window)}static encodingName(e){return"string"==typeof e?e:e.getName()}static encodingCharacterSet(e){return st.getCharacterSetECIByName(this.encodingName(e))}static decodeFallback(e,t){const i=this.encodingCharacterSet(t);if(i.equals(st.UTF8)||i.equals(st.ISO8859_1)||i.equals(st.ASCII)){let t="";for(let i=0,n=e.length;i<n;i++){let n=e[i].toString(16);n.length<2&&(n="0"+n),t+="%"+n}return decodeURIComponent(t)}if(i.equals(st.UnicodeBigUnmarked))return String.fromCharCode.apply(null,new Uint16Array(e.buffer));throw new ce(`Encoding ${this.encodingName(t)} not supported by fallback.`)}static encodeFallback(e){const t=btoa(unescape(encodeURIComponent(e))).split(""),i=[];for(let e=0;e<t.length;e++)i.push(t[e].charCodeAt(0));return new Uint8Array(i)}}(ze=Ce||(Ce={}))[ze.PAD_ENCODE=0]="PAD_ENCODE",ze[ze.ASCII_ENCODE=1]="ASCII_ENCODE",ze[ze.C40_ENCODE=2]="C40_ENCODE",ze[ze.TEXT_ENCODE=3]="TEXT_ENCODE",ze[ze.ANSIX12_ENCODE=4]="ANSIX12_ENCODE",ze[ze.EDIFACT_ENCODE=5]="EDIFACT_ENCODE",ze[ze.BASE256_ENCODE=6]="BASE256_ENCODE";class lt{static decode(e){const t=new at(e),i=new ne,n=new ne,r=new Array;let a=Ce.ASCII_ENCODE;do{if(a===Ce.ASCII_ENCODE)a=this.decodeAsciiSegment(t,i,n);else{switch(a){case Ce.C40_ENCODE:this.decodeC40Segment(t,i);break;case Ce.TEXT_ENCODE:this.decodeTextSegment(t,i);break;case Ce.ANSIX12_ENCODE:this.decodeAnsiX12Segment(t,i);break;case Ce.EDIFACT_ENCODE:this.decodeEdifactSegment(t,i);break;case Ce.BASE256_ENCODE:this.decodeBase256Segment(t,i,r);break;default:throw new le}a=Ce.ASCII_ENCODE}}while(a!==Ce.PAD_ENCODE&&t.available()>0);return n.length()>0&&i.append(n.toString()),new rt(e,i.toString(),0===r.length?null:r,null)}static decodeAsciiSegment(e,t,i){let n=!1;do{let r=e.readBits(8);if(0===r)throw new le;if(r<=128)return n&&(r+=128),t.append(String.fromCharCode(r-1)),Ce.ASCII_ENCODE;if(129===r)return Ce.PAD_ENCODE;if(r<=229){const e=r-130;e<10&&t.append("0"),t.append(""+e)}else switch(r){case 230:return Ce.C40_ENCODE;case 231:return Ce.BASE256_ENCODE;case 232:t.append(String.fromCharCode(29));break;case 233:case 234:break;case 235:n=!0;break;case 236:t.append("[)>05"),i.insert(0,"");break;case 237:t.append("[)>06"),i.insert(0,"");break;case 238:return Ce.ANSIX12_ENCODE;case 239:return Ce.TEXT_ENCODE;case 240:return Ce.EDIFACT_ENCODE;case 241:break;default:if(254!==r||0!==e.available())throw new le}}while(e.available()>0);return Ce.ASCII_ENCODE}static decodeC40Segment(e,t){let i=!1;const n=[];let r=0;do{if(8===e.available())return;const a=e.readBits(8);if(254===a)return;this.parseTwoBytes(a,e.readBits(8),n);for(let e=0;e<3;e++){const a=n[e];switch(r){case 0:if(a<3)r=a+1;else{if(!(a<this.C40_BASIC_SET_CHARS.length))throw new le;{const e=this.C40_BASIC_SET_CHARS[a];i?(t.append(String.fromCharCode(e.charCodeAt(0)+128)),i=!1):t.append(e)}}break;case 1:i?(t.append(String.fromCharCode(a+128)),i=!1):t.append(String.fromCharCode(a)),r=0;break;case 2:if(a<this.C40_SHIFT2_SET_CHARS.length){const e=this.C40_SHIFT2_SET_CHARS[a];i?(t.append(String.fromCharCode(e.charCodeAt(0)+128)),i=!1):t.append(e)}else switch(a){case 27:t.append(String.fromCharCode(29));break;case 30:i=!0;break;default:throw new le}r=0;break;case 3:i?(t.append(String.fromCharCode(a+224)),i=!1):t.append(String.fromCharCode(a+96)),r=0;break;default:throw new le}}}while(e.available()>0)}static decodeTextSegment(e,t){let i=!1,n=[],r=0;do{if(8===e.available())return;const a=e.readBits(8);if(254===a)return;this.parseTwoBytes(a,e.readBits(8),n);for(let e=0;e<3;e++){const a=n[e];switch(r){case 0:if(a<3)r=a+1;else{if(!(a<this.TEXT_BASIC_SET_CHARS.length))throw new le;{const e=this.TEXT_BASIC_SET_CHARS[a];i?(t.append(String.fromCharCode(e.charCodeAt(0)+128)),i=!1):t.append(e)}}break;case 1:i?(t.append(String.fromCharCode(a+128)),i=!1):t.append(String.fromCharCode(a)),r=0;break;case 2:if(a<this.TEXT_SHIFT2_SET_CHARS.length){const e=this.TEXT_SHIFT2_SET_CHARS[a];i?(t.append(String.fromCharCode(e.charCodeAt(0)+128)),i=!1):t.append(e)}else switch(a){case 27:t.append(String.fromCharCode(29));break;case 30:i=!0;break;default:throw new le}r=0;break;case 3:if(!(a<this.TEXT_SHIFT3_SET_CHARS.length))throw new le;{const e=this.TEXT_SHIFT3_SET_CHARS[a];i?(t.append(String.fromCharCode(e.charCodeAt(0)+128)),i=!1):t.append(e),r=0}break;default:throw new le}}}while(e.available()>0)}static decodeAnsiX12Segment(e,t){const i=[];do{if(8===e.available())return;const n=e.readBits(8);if(254===n)return;this.parseTwoBytes(n,e.readBits(8),i);for(let e=0;e<3;e++){const n=i[e];switch(n){case 0:t.append("\r");break;case 1:t.append("*");break;case 2:t.append(">");break;case 3:t.append(" ");break;default:if(n<14)t.append(String.fromCharCode(n+44));else{if(!(n<40))throw new le;t.append(String.fromCharCode(n+51))}}}}while(e.available()>0)}static parseTwoBytes(e,t,i){let n=(e<<8)+t-1,r=Math.floor(n/1600);i[0]=r,n-=1600*r,r=Math.floor(n/40),i[1]=r,i[2]=n-40*r}static decodeEdifactSegment(e,t){do{if(e.available()<=16)return;for(let i=0;i<4;i++){let i=e.readBits(6);if(31===i){const t=8-e.getBitOffset();return void(8!==t&&e.readBits(t))}0==(32&i)&&(i|=64),t.append(String.fromCharCode(i))}}while(e.available()>0)}static decodeBase256Segment(e,t,i){let n=1+e.getByteOffset();const r=this.unrandomize255State(e.readBits(8),n++);let a;if((a=0===r?e.available()/8|0:r<250?r:250*(r-249)+this.unrandomize255State(e.readBits(8),n++))<0)throw new le;const s=new Uint8Array(a);for(let t=0;t<a;t++){if(e.available()<8)throw new le;s[t]=this.unrandomize255State(e.readBits(8),n++)}i.push(s);try{t.append(ot.decode(s,kt.ISO88591))}catch(e){throw new Ze("Platform does not support required encoding: "+e.message)}}static unrandomize255State(e,t){const i=e-(149*t%255+1);return i>=0?i:i+256}}lt.C40_BASIC_SET_CHARS=["*","*","*"," ","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],lt.C40_SHIFT2_SET_CHARS=["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_"],lt.TEXT_BASIC_SET_CHARS=["*","*","*"," ","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],lt.TEXT_SHIFT2_SET_CHARS=lt.C40_SHIFT2_SET_CHARS,lt.TEXT_SHIFT3_SET_CHARS=["`","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","{","|","}","~",String.fromCharCode(127)];class ct{constructor(){this.rsDecoder=new Je(Ye.DATA_MATRIX_FIELD_256)}decode(e){const t=new it(e),i=t.getVersion(),n=t.readCodewords(),r=nt.getDataBlocks(n,i);let a=0;for(let e of r)a+=e.getNumDataCodewords();const s=new Uint8Array(a),o=r.length;for(let e=0;e<o;e++){const t=r[e],i=t.getCodewords(),n=t.getNumDataCodewords();this.correctErrors(i,n);for(let t=0;t<n;t++)s[t*o+e]=i[t]}return lt.decode(s)}correctErrors(e,t){e.length;const i=new Int32Array(e);try{this.rsDecoder.decode(i,e.length-t)}catch(e){throw new Z}for(let n=0;n<t;n++)e[n]=i[n]}}class ht{constructor(e,t){this.bits=e,this.points=t}getBits(){return this.bits}getPoints(){return this.points}}var dt,ut,pt,mt,gt=class{static checkAndNudgePoints(e,t){const i=e.getWidth(),n=e.getHeight();let r=!0;for(let e=0;e<t.length&&r;e+=2){const a=Math.floor(t[e]),s=Math.floor(t[e+1]);if(a<-1||a>i||s<-1||s>n)throw new ae;r=!1,-1===a?(t[e]=0,r=!0):a===i&&(t[e]=i-1,r=!0),-1===s?(t[e+1]=0,r=!0):s===n&&(t[e+1]=n-1,r=!0)}r=!0;for(let e=t.length-2;e>=0&&r;e-=2){const a=Math.floor(t[e]),s=Math.floor(t[e+1]);if(a<-1||a>i||s<-1||s>n)throw new ae;r=!1,-1===a?(t[e]=0,r=!0):a===i&&(t[e]=i-1,r=!0),-1===s?(t[e+1]=0,r=!0):s===n&&(t[e+1]=n-1,r=!0)}}};class ft{constructor(e,t,i,n,r,a,s,o,l){this.a11=e,this.a21=t,this.a31=i,this.a12=n,this.a22=r,this.a32=a,this.a13=s,this.a23=o,this.a33=l}static quadrilateralToQuadrilateral(e,t,i,n,r,a,s,o,l,c,h,d,u,p,m,g){const f=ft.quadrilateralToSquare(e,t,i,n,r,a,s,o);return ft.squareToQuadrilateral(l,c,h,d,u,p,m,g).times(f)}transformPoints(e){const t=e.length,i=this.a11,n=this.a12,r=this.a13,a=this.a21,s=this.a22,o=this.a23,l=this.a31,c=this.a32,h=this.a33;for(let d=0;d<t;d+=2){const t=e[d],u=e[d+1],p=r*t+o*u+h;e[d]=(i*t+a*u+l)/p,e[d+1]=(n*t+s*u+c)/p}}transformPointsWithValues(e,t){const i=this.a11,n=this.a12,r=this.a13,a=this.a21,s=this.a22,o=this.a23,l=this.a31,c=this.a32,h=this.a33,d=e.length;for(let u=0;u<d;u++){const d=e[u],p=t[u],m=r*d+o*p+h;e[u]=(i*d+a*p+l)/m,t[u]=(n*d+s*p+c)/m}}static squareToQuadrilateral(e,t,i,n,r,a,s,o){const l=e-i+r-s,c=t-n+a-o;if(0===l&&0===c)return new ft(i-e,r-i,e,n-t,a-n,t,0,0,1);{const h=i-r,d=s-r,u=n-a,p=o-a,m=h*p-d*u,g=(l*p-d*c)/m,f=(h*c-l*u)/m;return new ft(i-e+g*i,s-e+f*s,e,n-t+g*n,o-t+f*o,t,g,f,1)}}static quadrilateralToSquare(e,t,i,n,r,a,s,o){return ft.squareToQuadrilateral(e,t,i,n,r,a,s,o).buildAdjoint()}buildAdjoint(){return new ft(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21)}times(e){return new ft(this.a11*e.a11+this.a21*e.a12+this.a31*e.a13,this.a11*e.a21+this.a21*e.a22+this.a31*e.a23,this.a11*e.a31+this.a21*e.a32+this.a31*e.a33,this.a12*e.a11+this.a22*e.a12+this.a32*e.a13,this.a12*e.a21+this.a22*e.a22+this.a32*e.a23,this.a12*e.a31+this.a22*e.a32+this.a32*e.a33,this.a13*e.a11+this.a23*e.a12+this.a33*e.a13,this.a13*e.a21+this.a23*e.a22+this.a33*e.a23,this.a13*e.a31+this.a23*e.a32+this.a33*e.a33)}}class vt{static setGridSampler(e){vt.gridSampler=e}static getInstance(){return vt.gridSampler}}vt.gridSampler=new class extends gt{sampleGrid(e,t,i,n,r,a,s,o,l,c,h,d,u,p,m,g,f,v,b){const _=ft.quadrilateralToQuadrilateral(n,r,a,s,o,l,c,h,d,u,p,m,g,f,v,b);return this.sampleGridWithTransform(e,t,i,_)}sampleGridWithTransform(e,t,i,n){if(t<=0||i<=0)throw new ae;const r=new re(t,i),a=new Float32Array(2*t);for(let t=0;t<i;t++){const i=a.length,s=t+.5;for(let e=0;e<i;e+=2)a[e]=e/2+.5,a[e+1]=s;n.transformPoints(a),gt.checkAndNudgePoints(e,a);try{for(let n=0;n<i;n+=2)e.get(Math.floor(a[n]),Math.floor(a[n+1]))&&r.set(n/2,t)}catch(e){throw new ae}}return r}};class bt{constructor(e,t,i,n){this.image=e,this.height=e.getHeight(),this.width=e.getWidth(),null==t&&(t=bt.INIT_SIZE),null==i&&(i=e.getWidth()/2|0),null==n&&(n=e.getHeight()/2|0);const r=t/2|0;if(this.leftInit=i-r,this.rightInit=i+r,this.upInit=n-r,this.downInit=n+r,this.upInit<0||this.leftInit<0||this.downInit>=this.height||this.rightInit>=this.width)throw new ae}detect(){let e=this.leftInit,t=this.rightInit,i=this.upInit,n=this.downInit,r=!1,a=!0,s=!1,o=!1,l=!1,c=!1,h=!1;const d=this.width,u=this.height;for(;a;){a=!1;let p=!0;for(;(p||!o)&&t<d;)(p=this.containsBlackPoint(i,n,t,!1))?(t++,a=!0,o=!0):o||t++;if(t>=d){r=!0;break}let m=!0;for(;(m||!l)&&n<u;)(m=this.containsBlackPoint(e,t,n,!0))?(n++,a=!0,l=!0):l||n++;if(n>=u){r=!0;break}let g=!0;for(;(g||!c)&&e>=0;)(g=this.containsBlackPoint(i,n,e,!1))?(e--,a=!0,c=!0):c||e--;if(e<0){r=!0;break}let f=!0;for(;(f||!h)&&i>=0;)(f=this.containsBlackPoint(e,t,i,!0))?(i--,a=!0,h=!0):h||i--;if(i<0){r=!0;break}a&&(s=!0)}if(!r&&s){const r=t-e;let a=null;for(let t=1;null===a&&t<r;t++)a=this.getBlackPointOnSegment(e,n-t,e+t,n);if(null==a)throw new ae;let s=null;for(let t=1;null===s&&t<r;t++)s=this.getBlackPointOnSegment(e,i+t,e+t,i);if(null==s)throw new ae;let o=null;for(let e=1;null===o&&e<r;e++)o=this.getBlackPointOnSegment(t,i+e,t-e,i);if(null==o)throw new ae;let l=null;for(let e=1;null===l&&e<r;e++)l=this.getBlackPointOnSegment(t,n-e,t-e,n);if(null==l)throw new ae;return this.centerEdges(l,a,o,s)}throw new ae}getBlackPointOnSegment(e,t,i,n){const r=Ae.round(Ae.distance(e,t,i,n)),a=(i-e)/r,s=(n-t)/r,o=this.image;for(let i=0;i<r;i++){const n=Ae.round(e+i*a),r=Ae.round(t+i*s);if(o.get(n,r))return new Me(n,r)}return null}centerEdges(e,t,i,n){const r=e.getX(),a=e.getY(),s=t.getX(),o=t.getY(),l=i.getX(),c=i.getY(),h=n.getX(),d=n.getY(),u=bt.CORR;return r<this.width/2?[new Me(h-u,d+u),new Me(s+u,o+u),new Me(l-u,c-u),new Me(r+u,a-u)]:[new Me(h+u,d+u),new Me(s+u,o-u),new Me(l-u,c+u),new Me(r-u,a-u)]}containsBlackPoint(e,t,i,n){const r=this.image;if(n){for(let n=e;n<=t;n++)if(r.get(n,i))return!0}else for(let n=e;n<=t;n++)if(r.get(i,n))return!0;return!1}}bt.INIT_SIZE=10,bt.CORR=1;class _t{constructor(e){this.image=e,this.rectangleDetector=new bt(e)}detect(){const e=this.rectangleDetector.detect(),t=e[0],i=e[1],n=e[2],r=e[3],a=[];a.push(this.transitionsBetween(t,i)),a.push(this.transitionsBetween(t,n)),a.push(this.transitionsBetween(i,r)),a.push(this.transitionsBetween(n,r)),a.sort(yt.resultPointsAndTransitionsComparator);const s=a[0],o=a[1],l=new Map;_t.increment(l,s.getFrom()),_t.increment(l,s.getTo()),_t.increment(l,o.getFrom()),_t.increment(l,o.getTo());let c=null,h=null,d=null;for(let[e,t]of Array.from(l.entries()))2===t?h=e:null==c?c=e:d=e;if(null==c||null==h||null==d)throw new ae;const u=[c,h,d];Me.orderBestPatterns(u);const p=u[0];h=u[1];const m=u[2];let g;g=l.has(t)?l.has(i)?l.has(n)?r:n:i:t;let f,v,b=this.transitionsBetween(m,g).getTransitions(),_=this.transitionsBetween(p,g).getTransitions();if(1==(1&b)&&b++,1==(1&_)&&_++,4*(b+=2)>=7*(_+=2)||4*_>=7*b)null==(v=this.correctTopRightRectangular(h,p,m,g,b,_))&&(v=g),1==(1&(b=this.transitionsBetween(m,v).getTransitions()))&&b++,1==(1&(_=this.transitionsBetween(p,v).getTransitions()))&&_++,f=_t.sampleGrid(this.image,m,h,p,v,b,_);else{const e=Math.min(_,b);null==(v=this.correctTopRight(h,p,m,g,e))&&(v=g);let t=Math.max(this.transitionsBetween(m,v).getTransitions(),this.transitionsBetween(p,v).getTransitions());1==(1&++t)&&t++,f=_t.sampleGrid(this.image,m,h,p,v,t,t)}return new ht(f,[m,h,p,v])}correctTopRightRectangular(e,t,i,n,r,a){let s=_t.distance(e,t)/r,o=_t.distance(i,n),l=(n.getX()-i.getX())/o,c=(n.getY()-i.getY())/o;const h=new Me(n.getX()+s*l,n.getY()+s*c);s=_t.distance(e,i)/a,o=_t.distance(t,n),l=(n.getX()-t.getX())/o,c=(n.getY()-t.getY())/o;const d=new Me(n.getX()+s*l,n.getY()+s*c);return this.isValid(h)?this.isValid(d)?Math.abs(r-this.transitionsBetween(i,h).getTransitions())+Math.abs(a-this.transitionsBetween(t,h).getTransitions())<=Math.abs(r-this.transitionsBetween(i,d).getTransitions())+Math.abs(a-this.transitionsBetween(t,d).getTransitions())?h:d:h:this.isValid(d)?d:null}correctTopRight(e,t,i,n,r){let a=_t.distance(e,t)/r,s=_t.distance(i,n),o=(n.getX()-i.getX())/s,l=(n.getY()-i.getY())/s;const c=new Me(n.getX()+a*o,n.getY()+a*l);a=_t.distance(e,i)/r,s=_t.distance(t,n),o=(n.getX()-t.getX())/s,l=(n.getY()-t.getY())/s;const h=new Me(n.getX()+a*o,n.getY()+a*l);return this.isValid(c)?this.isValid(h)?Math.abs(this.transitionsBetween(i,c).getTransitions()-this.transitionsBetween(t,c).getTransitions())<=Math.abs(this.transitionsBetween(i,h).getTransitions()-this.transitionsBetween(t,h).getTransitions())?c:h:c:this.isValid(h)?h:null}isValid(e){return e.getX()>=0&&e.getX()<this.image.getWidth()&&e.getY()>0&&e.getY()<this.image.getHeight()}static distance(e,t){return Ae.round(Me.distance(e,t))}static increment(e,t){const i=e.get(t);e.set(t,null==i?1:i+1)}static sampleGrid(e,t,i,n,r,a,s){return vt.getInstance().sampleGrid(e,a,s,.5,.5,a-.5,.5,a-.5,s-.5,.5,s-.5,t.getX(),t.getY(),r.getX(),r.getY(),n.getX(),n.getY(),i.getX(),i.getY())}transitionsBetween(e,t){let i=0|e.getX(),n=0|e.getY(),r=0|t.getX(),a=0|t.getY();const s=Math.abs(a-n)>Math.abs(r-i);if(s){let e=i;i=n,n=e,e=r,r=a,a=e}const o=Math.abs(r-i),l=Math.abs(a-n);let c=-o/2;const h=n<a?1:-1,d=i<r?1:-1;let u=0,p=this.image.get(s?n:i,s?i:n);for(let e=i,t=n;e!==r;e+=d){const i=this.image.get(s?t:e,s?e:t);if(i!==p&&(u++,p=i),(c+=l)>0){if(t===a)break;t+=h,c-=o}}return new yt(e,t,u)}}class yt{constructor(e,t,i){this.from=e,this.to=t,this.transitions=i}getFrom(){return this.from}getTo(){return this.to}getTransitions(){return this.transitions}toString(){return this.from+"/"+this.to+"/"+this.transitions}static resultPointsAndTransitionsComparator(e,t){return e.getTransitions()-t.getTransitions()}}class wt{constructor(){this.decoder=new ct}decode(e,t=null){let i,n;if(null!=t&&t.has(ye.PURE_BARCODE)){const t=wt.extractPureBits(e.getBlackMatrix());i=this.decoder.decode(t),n=wt.NO_POINTS}else{const t=new _t(e.getBlackMatrix()).detect();i=this.decoder.decode(t.getBits()),n=t.getPoints()}const r=i.getRawBytes(),a=new Te(i.getText(),r,8*r.length,n,be.DATA_MATRIX,Q.currentTimeMillis()),s=i.getByteSegments();null!=s&&a.putMetadata(Ee.BYTE_SEGMENTS,s);const o=i.getECLevel();return null!=o&&a.putMetadata(Ee.ERROR_CORRECTION_LEVEL,o),a}reset(){}static extractPureBits(e){const t=e.getTopLeftOnBit(),i=e.getBottomRightOnBit();if(null==t||null==i)throw new ae;const n=this.moduleSize(t,e);let r=t[1];const a=i[1];let s=t[0];const o=(i[0]-s+1)/n,l=(a-r+1)/n;if(o<=0||l<=0)throw new ae;const c=n/2;r+=c,s+=c;const h=new re(o,l);for(let t=0;t<l;t++){const i=r+t*n;for(let r=0;r<o;r++)e.get(s+r*n,i)&&h.set(r,t)}return h}static moduleSize(e,t){const i=t.getWidth();let n=e[0];const r=e[1];for(;n<i&&t.get(n,r);)n++;if(n===i)throw new ae;const a=n-e[0];if(0===a)throw new ae;return a}}wt.NO_POINTS=[];!function(e){e[e.L=0]="L",e[e.M=1]="M",e[e.Q=2]="Q",e[e.H=3]="H"}(dt||(dt={}));class Ct{constructor(e,t,i){this.value=e,this.stringValue=t,this.bits=i,Ct.FOR_BITS.set(i,this),Ct.FOR_VALUE.set(e,this)}getValue(){return this.value}getBits(){return this.bits}static fromString(e){switch(e){case"L":return Ct.L;case"M":return Ct.M;case"Q":return Ct.Q;case"H":return Ct.H;default:throw new G(e+"not available")}}toString(){return this.stringValue}equals(e){if(!(e instanceof Ct))return!1;const t=e;return this.value===t.value}static forBits(e){if(e<0||e>=Ct.FOR_BITS.size)throw new Y;return Ct.FOR_BITS.get(e)}}Ct.FOR_BITS=new Map,Ct.FOR_VALUE=new Map,Ct.L=new Ct(dt.L,"L",1),Ct.M=new Ct(dt.M,"M",0),Ct.Q=new Ct(dt.Q,"Q",3),Ct.H=new Ct(dt.H,"H",2);class zt{constructor(e){this.errorCorrectionLevel=Ct.forBits(e>>3&3),this.dataMask=7&e}static numBitsDiffering(e,t){return ee.bitCount(e^t)}static decodeFormatInformation(e,t){const i=zt.doDecodeFormatInformation(e,t);return null!==i?i:zt.doDecodeFormatInformation(e^zt.FORMAT_INFO_MASK_QR,t^zt.FORMAT_INFO_MASK_QR)}static doDecodeFormatInformation(e,t){let i=Number.MAX_SAFE_INTEGER,n=0;for(const r of zt.FORMAT_INFO_DECODE_LOOKUP){const a=r[0];if(a===e||a===t)return new zt(r[1]);let s=zt.numBitsDiffering(e,a);s<i&&(n=r[1],i=s),e!==t&&(s=zt.numBitsDiffering(t,a))<i&&(n=r[1],i=s)}return i<=3?new zt(n):null}getErrorCorrectionLevel(){return this.errorCorrectionLevel}getDataMask(){return this.dataMask}hashCode(){return this.errorCorrectionLevel.getBits()<<3|this.dataMask}equals(e){if(!(e instanceof zt))return!1;const t=e;return this.errorCorrectionLevel===t.errorCorrectionLevel&&this.dataMask===t.dataMask}}zt.FORMAT_INFO_MASK_QR=21522,zt.FORMAT_INFO_DECODE_LOOKUP=[Int32Array.from([21522,0]),Int32Array.from([20773,1]),Int32Array.from([24188,2]),Int32Array.from([23371,3]),Int32Array.from([17913,4]),Int32Array.from([16590,5]),Int32Array.from([20375,6]),Int32Array.from([19104,7]),Int32Array.from([30660,8]),Int32Array.from([29427,9]),Int32Array.from([32170,10]),Int32Array.from([30877,11]),Int32Array.from([26159,12]),Int32Array.from([25368,13]),Int32Array.from([27713,14]),Int32Array.from([26998,15]),Int32Array.from([5769,16]),Int32Array.from([5054,17]),Int32Array.from([7399,18]),Int32Array.from([6608,19]),Int32Array.from([1890,20]),Int32Array.from([597,21]),Int32Array.from([3340,22]),Int32Array.from([2107,23]),Int32Array.from([13663,24]),Int32Array.from([12392,25]),Int32Array.from([16177,26]),Int32Array.from([14854,27]),Int32Array.from([9396,28]),Int32Array.from([8579,29]),Int32Array.from([11994,30]),Int32Array.from([11245,31])];class Et{constructor(e,...t){this.ecCodewordsPerBlock=e,this.ecBlocks=t}getECCodewordsPerBlock(){return this.ecCodewordsPerBlock}getNumBlocks(){let e=0;const t=this.ecBlocks;for(const i of t)e+=i.getCount();return e}getTotalECCodewords(){return this.ecCodewordsPerBlock*this.getNumBlocks()}getECBlocks(){return this.ecBlocks}}class At{constructor(e,t){this.count=e,this.dataCodewords=t}getCount(){return this.count}getDataCodewords(){return this.dataCodewords}}class St{constructor(e,t,...i){this.versionNumber=e,this.alignmentPatternCenters=t,this.ecBlocks=i;let n=0;const r=i[0].getECCodewordsPerBlock(),a=i[0].getECBlocks();for(const e of a)n+=e.getCount()*(e.getDataCodewords()+r);this.totalCodewords=n}getVersionNumber(){return this.versionNumber}getAlignmentPatternCenters(){return this.alignmentPatternCenters}getTotalCodewords(){return this.totalCodewords}getDimensionForVersion(){return 17+4*this.versionNumber}getECBlocksForLevel(e){return this.ecBlocks[e.getValue()]}static getProvisionalVersionForDimension(e){if(e%4!=1)throw new le;try{return this.getVersionForNumber((e-17)/4)}catch(e){throw new le}}static getVersionForNumber(e){if(e<1||e>40)throw new Y;return St.VERSIONS[e-1]}static decodeVersionInformation(e){let t=Number.MAX_SAFE_INTEGER,i=0;for(let n=0;n<St.VERSION_DECODE_INFO.length;n++){const r=St.VERSION_DECODE_INFO[n];if(r===e)return St.getVersionForNumber(n+7);const a=zt.numBitsDiffering(e,r);a<t&&(i=n+7,t=a)}return t<=3?St.getVersionForNumber(i):null}buildFunctionPattern(){const e=this.getDimensionForVersion(),t=new re(e);t.setRegion(0,0,9,9),t.setRegion(e-8,0,8,9),t.setRegion(0,e-8,9,8);const i=this.alignmentPatternCenters.length;for(let e=0;e<i;e++){const n=this.alignmentPatternCenters[e]-2;for(let r=0;r<i;r++)0===e&&(0===r||r===i-1)||e===i-1&&0===r||t.setRegion(this.alignmentPatternCenters[r]-2,n,5,5)}return t.setRegion(6,9,1,e-17),t.setRegion(9,6,e-17,1),this.versionNumber>6&&(t.setRegion(e-11,0,3,6),t.setRegion(0,e-11,6,3)),t}toString(){return""+this.versionNumber}}St.VERSION_DECODE_INFO=Int32Array.from([31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017]),St.VERSIONS=[new St(1,new Int32Array(0),new Et(7,new At(1,19)),new Et(10,new At(1,16)),new Et(13,new At(1,13)),new Et(17,new At(1,9))),new St(2,Int32Array.from([6,18]),new Et(10,new At(1,34)),new Et(16,new At(1,28)),new Et(22,new At(1,22)),new Et(28,new At(1,16))),new St(3,Int32Array.from([6,22]),new Et(15,new At(1,55)),new Et(26,new At(1,44)),new Et(18,new At(2,17)),new Et(22,new At(2,13))),new St(4,Int32Array.from([6,26]),new Et(20,new At(1,80)),new Et(18,new At(2,32)),new Et(26,new At(2,24)),new Et(16,new At(4,9))),new St(5,Int32Array.from([6,30]),new Et(26,new At(1,108)),new Et(24,new At(2,43)),new Et(18,new At(2,15),new At(2,16)),new Et(22,new At(2,11),new At(2,12))),new St(6,Int32Array.from([6,34]),new Et(18,new At(2,68)),new Et(16,new At(4,27)),new Et(24,new At(4,19)),new Et(28,new At(4,15))),new St(7,Int32Array.from([6,22,38]),new Et(20,new At(2,78)),new Et(18,new At(4,31)),new Et(18,new At(2,14),new At(4,15)),new Et(26,new At(4,13),new At(1,14))),new St(8,Int32Array.from([6,24,42]),new Et(24,new At(2,97)),new Et(22,new At(2,38),new At(2,39)),new Et(22,new At(4,18),new At(2,19)),new Et(26,new At(4,14),new At(2,15))),new St(9,Int32Array.from([6,26,46]),new Et(30,new At(2,116)),new Et(22,new At(3,36),new At(2,37)),new Et(20,new At(4,16),new At(4,17)),new Et(24,new At(4,12),new At(4,13))),new St(10,Int32Array.from([6,28,50]),new Et(18,new At(2,68),new At(2,69)),new Et(26,new At(4,43),new At(1,44)),new Et(24,new At(6,19),new At(2,20)),new Et(28,new At(6,15),new At(2,16))),new St(11,Int32Array.from([6,30,54]),new Et(20,new At(4,81)),new Et(30,new At(1,50),new At(4,51)),new Et(28,new At(4,22),new At(4,23)),new Et(24,new At(3,12),new At(8,13))),new St(12,Int32Array.from([6,32,58]),new Et(24,new At(2,92),new At(2,93)),new Et(22,new At(6,36),new At(2,37)),new Et(26,new At(4,20),new At(6,21)),new Et(28,new At(7,14),new At(4,15))),new St(13,Int32Array.from([6,34,62]),new Et(26,new At(4,107)),new Et(22,new At(8,37),new At(1,38)),new Et(24,new At(8,20),new At(4,21)),new Et(22,new At(12,11),new At(4,12))),new St(14,Int32Array.from([6,26,46,66]),new Et(30,new At(3,115),new At(1,116)),new Et(24,new At(4,40),new At(5,41)),new Et(20,new At(11,16),new At(5,17)),new Et(24,new At(11,12),new At(5,13))),new St(15,Int32Array.from([6,26,48,70]),new Et(22,new At(5,87),new At(1,88)),new Et(24,new At(5,41),new At(5,42)),new Et(30,new At(5,24),new At(7,25)),new Et(24,new At(11,12),new At(7,13))),new St(16,Int32Array.from([6,26,50,74]),new Et(24,new At(5,98),new At(1,99)),new Et(28,new At(7,45),new At(3,46)),new Et(24,new At(15,19),new At(2,20)),new Et(30,new At(3,15),new At(13,16))),new St(17,Int32Array.from([6,30,54,78]),new Et(28,new At(1,107),new At(5,108)),new Et(28,new At(10,46),new At(1,47)),new Et(28,new At(1,22),new At(15,23)),new Et(28,new At(2,14),new At(17,15))),new St(18,Int32Array.from([6,30,56,82]),new Et(30,new At(5,120),new At(1,121)),new Et(26,new At(9,43),new At(4,44)),new Et(28,new At(17,22),new At(1,23)),new Et(28,new At(2,14),new At(19,15))),new St(19,Int32Array.from([6,30,58,86]),new Et(28,new At(3,113),new At(4,114)),new Et(26,new At(3,44),new At(11,45)),new Et(26,new At(17,21),new At(4,22)),new Et(26,new At(9,13),new At(16,14))),new St(20,Int32Array.from([6,34,62,90]),new Et(28,new At(3,107),new At(5,108)),new Et(26,new At(3,41),new At(13,42)),new Et(30,new At(15,24),new At(5,25)),new Et(28,new At(15,15),new At(10,16))),new St(21,Int32Array.from([6,28,50,72,94]),new Et(28,new At(4,116),new At(4,117)),new Et(26,new At(17,42)),new Et(28,new At(17,22),new At(6,23)),new Et(30,new At(19,16),new At(6,17))),new St(22,Int32Array.from([6,26,50,74,98]),new Et(28,new At(2,111),new At(7,112)),new Et(28,new At(17,46)),new Et(30,new At(7,24),new At(16,25)),new Et(24,new At(34,13))),new St(23,Int32Array.from([6,30,54,78,102]),new Et(30,new At(4,121),new At(5,122)),new Et(28,new At(4,47),new At(14,48)),new Et(30,new At(11,24),new At(14,25)),new Et(30,new At(16,15),new At(14,16))),new St(24,Int32Array.from([6,28,54,80,106]),new Et(30,new At(6,117),new At(4,118)),new Et(28,new At(6,45),new At(14,46)),new Et(30,new At(11,24),new At(16,25)),new Et(30,new At(30,16),new At(2,17))),new St(25,Int32Array.from([6,32,58,84,110]),new Et(26,new At(8,106),new At(4,107)),new Et(28,new At(8,47),new At(13,48)),new Et(30,new At(7,24),new At(22,25)),new Et(30,new At(22,15),new At(13,16))),new St(26,Int32Array.from([6,30,58,86,114]),new Et(28,new At(10,114),new At(2,115)),new Et(28,new At(19,46),new At(4,47)),new Et(28,new At(28,22),new At(6,23)),new Et(30,new At(33,16),new At(4,17))),new St(27,Int32Array.from([6,34,62,90,118]),new Et(30,new At(8,122),new At(4,123)),new Et(28,new At(22,45),new At(3,46)),new Et(30,new At(8,23),new At(26,24)),new Et(30,new At(12,15),new At(28,16))),new St(28,Int32Array.from([6,26,50,74,98,122]),new Et(30,new At(3,117),new At(10,118)),new Et(28,new At(3,45),new At(23,46)),new Et(30,new At(4,24),new At(31,25)),new Et(30,new At(11,15),new At(31,16))),new St(29,Int32Array.from([6,30,54,78,102,126]),new Et(30,new At(7,116),new At(7,117)),new Et(28,new At(21,45),new At(7,46)),new Et(30,new At(1,23),new At(37,24)),new Et(30,new At(19,15),new At(26,16))),new St(30,Int32Array.from([6,26,52,78,104,130]),new Et(30,new At(5,115),new At(10,116)),new Et(28,new At(19,47),new At(10,48)),new Et(30,new At(15,24),new At(25,25)),new Et(30,new At(23,15),new At(25,16))),new St(31,Int32Array.from([6,30,56,82,108,134]),new Et(30,new At(13,115),new At(3,116)),new Et(28,new At(2,46),new At(29,47)),new Et(30,new At(42,24),new At(1,25)),new Et(30,new At(23,15),new At(28,16))),new St(32,Int32Array.from([6,34,60,86,112,138]),new Et(30,new At(17,115)),new Et(28,new At(10,46),new At(23,47)),new Et(30,new At(10,24),new At(35,25)),new Et(30,new At(19,15),new At(35,16))),new St(33,Int32Array.from([6,30,58,86,114,142]),new Et(30,new At(17,115),new At(1,116)),new Et(28,new At(14,46),new At(21,47)),new Et(30,new At(29,24),new At(19,25)),new Et(30,new At(11,15),new At(46,16))),new St(34,Int32Array.from([6,34,62,90,118,146]),new Et(30,new At(13,115),new At(6,116)),new Et(28,new At(14,46),new At(23,47)),new Et(30,new At(44,24),new At(7,25)),new Et(30,new At(59,16),new At(1,17))),new St(35,Int32Array.from([6,30,54,78,102,126,150]),new Et(30,new At(12,121),new At(7,122)),new Et(28,new At(12,47),new At(26,48)),new Et(30,new At(39,24),new At(14,25)),new Et(30,new At(22,15),new At(41,16))),new St(36,Int32Array.from([6,24,50,76,102,128,154]),new Et(30,new At(6,121),new At(14,122)),new Et(28,new At(6,47),new At(34,48)),new Et(30,new At(46,24),new At(10,25)),new Et(30,new At(2,15),new At(64,16))),new St(37,Int32Array.from([6,28,54,80,106,132,158]),new Et(30,new At(17,122),new At(4,123)),new Et(28,new At(29,46),new At(14,47)),new Et(30,new At(49,24),new At(10,25)),new Et(30,new At(24,15),new At(46,16))),new St(38,Int32Array.from([6,32,58,84,110,136,162]),new Et(30,new At(4,122),new At(18,123)),new Et(28,new At(13,46),new At(32,47)),new Et(30,new At(48,24),new At(14,25)),new Et(30,new At(42,15),new At(32,16))),new St(39,Int32Array.from([6,26,54,82,110,138,166]),new Et(30,new At(20,117),new At(4,118)),new Et(28,new At(40,47),new At(7,48)),new Et(30,new At(43,24),new At(22,25)),new Et(30,new At(10,15),new At(67,16))),new St(40,Int32Array.from([6,30,58,86,114,142,170]),new Et(30,new At(19,118),new At(6,119)),new Et(28,new At(18,47),new At(31,48)),new Et(30,new At(34,24),new At(34,25)),new Et(30,new At(20,15),new At(61,16)))],function(e){e[e.DATA_MASK_000=0]="DATA_MASK_000",e[e.DATA_MASK_001=1]="DATA_MASK_001",e[e.DATA_MASK_010=2]="DATA_MASK_010",e[e.DATA_MASK_011=3]="DATA_MASK_011",e[e.DATA_MASK_100=4]="DATA_MASK_100",e[e.DATA_MASK_101=5]="DATA_MASK_101",e[e.DATA_MASK_110=6]="DATA_MASK_110",e[e.DATA_MASK_111=7]="DATA_MASK_111"}(ut||(ut={}));class Mt{constructor(e,t){this.value=e,this.isMasked=t}unmaskBitMatrix(e,t){for(let i=0;i<t;i++)for(let n=0;n<t;n++)this.isMasked(i,n)&&e.flip(n,i)}}Mt.values=new Map([[ut.DATA_MASK_000,new Mt(ut.DATA_MASK_000,(e,t)=>0==(e+t&1))],[ut.DATA_MASK_001,new Mt(ut.DATA_MASK_001,(e,t)=>0==(1&e))],[ut.DATA_MASK_010,new Mt(ut.DATA_MASK_010,(e,t)=>t%3==0)],[ut.DATA_MASK_011,new Mt(ut.DATA_MASK_011,(e,t)=>(e+t)%3==0)],[ut.DATA_MASK_100,new Mt(ut.DATA_MASK_100,(e,t)=>0==(Math.floor(e/2)+Math.floor(t/3)&1))],[ut.DATA_MASK_101,new Mt(ut.DATA_MASK_101,(e,t)=>e*t%6==0)],[ut.DATA_MASK_110,new Mt(ut.DATA_MASK_110,(e,t)=>e*t%6<3)],[ut.DATA_MASK_111,new Mt(ut.DATA_MASK_111,(e,t)=>0==(e+t+e*t%3&1))]]);class xt{constructor(e){const t=e.getHeight();if(t<21||1!=(3&t))throw new le;this.bitMatrix=e}readFormatInformation(){if(null!==this.parsedFormatInfo&&void 0!==this.parsedFormatInfo)return this.parsedFormatInfo;let e=0;for(let t=0;t<6;t++)e=this.copyBit(t,8,e);e=this.copyBit(7,8,e),e=this.copyBit(8,8,e),e=this.copyBit(8,7,e);for(let t=5;t>=0;t--)e=this.copyBit(8,t,e);const t=this.bitMatrix.getHeight();let i=0;const n=t-7;for(let e=t-1;e>=n;e--)i=this.copyBit(8,e,i);for(let e=t-8;e<t;e++)i=this.copyBit(e,8,i);if(this.parsedFormatInfo=zt.decodeFormatInformation(e,i),null!==this.parsedFormatInfo)return this.parsedFormatInfo;throw new le}readVersion(){if(null!==this.parsedVersion&&void 0!==this.parsedVersion)return this.parsedVersion;const e=this.bitMatrix.getHeight(),t=Math.floor((e-17)/4);if(t<=6)return St.getVersionForNumber(t);let i=0;const n=e-11;for(let t=5;t>=0;t--)for(let r=e-9;r>=n;r--)i=this.copyBit(r,t,i);let r=St.decodeVersionInformation(i);if(null!==r&&r.getDimensionForVersion()===e)return this.parsedVersion=r,r;i=0;for(let t=5;t>=0;t--)for(let r=e-9;r>=n;r--)i=this.copyBit(t,r,i);if(null!==(r=St.decodeVersionInformation(i))&&r.getDimensionForVersion()===e)return this.parsedVersion=r,r;throw new le}copyBit(e,t,i){return(this.isMirror?this.bitMatrix.get(t,e):this.bitMatrix.get(e,t))?i<<1|1:i<<1}readCodewords(){const e=this.readFormatInformation(),t=this.readVersion(),i=Mt.values.get(e.getDataMask()),n=this.bitMatrix.getHeight();i.unmaskBitMatrix(this.bitMatrix,n);const r=t.buildFunctionPattern();let a=!0;const s=new Uint8Array(t.getTotalCodewords());let o=0,l=0,c=0;for(let e=n-1;e>0;e-=2){6===e&&e--;for(let t=0;t<n;t++){const i=a?n-1-t:t;for(let t=0;t<2;t++)r.get(e-t,i)||(c++,l<<=1,this.bitMatrix.get(e-t,i)&&(l|=1),8===c&&(s[o++]=l,c=0,l=0))}a=!a}if(o!==t.getTotalCodewords())throw new le;return s}remask(){if(null===this.parsedFormatInfo)return;const e=Mt.values[this.parsedFormatInfo.getDataMask()],t=this.bitMatrix.getHeight();e.unmaskBitMatrix(this.bitMatrix,t)}setMirror(e){this.parsedVersion=null,this.parsedFormatInfo=null,this.isMirror=e}mirror(){const e=this.bitMatrix;for(let t=0,i=e.getWidth();t<i;t++)for(let i=t+1,n=e.getHeight();i<n;i++)e.get(t,i)!==e.get(i,t)&&(e.flip(i,t),e.flip(t,i))}}class Tt{constructor(e){this.mirrored=e}isMirrored(){return this.mirrored}applyMirroredCorrection(e){if(!this.mirrored||null===e||e.length<3)return;const t=e[0];e[0]=e[2],e[2]=t}}class It{constructor(e,t){this.numDataCodewords=e,this.codewords=t}static getDataBlocks(e,t,i){if(e.length!==t.getTotalCodewords())throw new Y;const n=t.getECBlocksForLevel(i);let r=0;const a=n.getECBlocks();for(const e of a)r+=e.getCount();const s=new Array(r);let o=0;for(const e of a)for(let t=0;t<e.getCount();t++){const t=e.getDataCodewords(),i=n.getECCodewordsPerBlock()+t;s[o++]=new It(t,new Uint8Array(i))}const l=s[0].codewords.length;let c=s.length-1;for(;c>=0;){if(s[c].codewords.length===l)break;c--}c++;const h=l-n.getECCodewordsPerBlock();let d=0;for(let t=0;t<h;t++)for(let i=0;i<o;i++)s[i].codewords[t]=e[d++];for(let t=c;t<o;t++)s[t].codewords[h]=e[d++];const u=s[0].codewords.length;for(let t=h;t<u;t++)for(let i=0;i<o;i++){const n=i<c?t:t+1;s[i].codewords[n]=e[d++]}return s}getNumDataCodewords(){return this.numDataCodewords}getCodewords(){return this.codewords}}class kt{StringUtils(){}static guessEncoding(e,t){if(null!=t&&void 0!==t.get(ye.CHARACTER_SET))return t.get(ye.CHARACTER_SET).toString();const i=e.length;let n=!0,r=!0,a=!0,s=0,o=0,l=0,c=0,h=0,d=0,u=0,p=0,m=0,g=0,f=0;const v=e.length>3&&239===e[0]&&187===e[1]&&191===e[2];for(let t=0;t<i&&(n||r||a);t++){const i=255&e[t];a&&(s>0?0==(128&i)?a=!1:s--:0!=(128&i)&&(0==(64&i)?a=!1:(s++,0==(32&i)?o++:(s++,0==(16&i)?l++:(s++,0==(8&i)?c++:a=!1))))),n&&(i>127&&i<160?n=!1:i>159&&(i<192||215===i||247===i)&&f++),r&&(h>0?i<64||127===i||i>252?r=!1:h--:128===i||160===i||i>239?r=!1:i>160&&i<224?(d++,p=0,++u>m&&(m=u)):i>127?(h++,u=0,++p>g&&(g=p)):(u=0,p=0))}return a&&s>0&&(a=!1),r&&h>0&&(r=!1),a&&(v||o+l+c>0)?kt.UTF8:r&&(kt.ASSUME_SHIFT_JIS||m>=3||g>=3)?kt.SHIFT_JIS:n&&r?2===m&&2===d||10*f>=i?kt.SHIFT_JIS:kt.ISO88591:n?kt.ISO88591:r?kt.SHIFT_JIS:a?kt.UTF8:kt.PLATFORM_DEFAULT_ENCODING}}kt.SHIFT_JIS=st.SJIS.getName(),kt.GB2312="GB2312",kt.ISO88591=st.ISO8859_1.getName(),kt.EUC_JP="EUC_JP",kt.UTF8=st.UTF8.getName(),kt.PLATFORM_DEFAULT_ENCODING=kt.UTF8,kt.ASSUME_SHIFT_JIS=!1,function(e){e[e.TERMINATOR=0]="TERMINATOR",e[e.NUMERIC=1]="NUMERIC",e[e.ALPHANUMERIC=2]="ALPHANUMERIC",e[e.STRUCTURED_APPEND=3]="STRUCTURED_APPEND",e[e.BYTE=4]="BYTE",e[e.ECI=5]="ECI",e[e.KANJI=6]="KANJI",e[e.FNC1_FIRST_POSITION=7]="FNC1_FIRST_POSITION",e[e.FNC1_SECOND_POSITION=8]="FNC1_SECOND_POSITION",e[e.HANZI=9]="HANZI"}(pt||(pt={}));class Ot{constructor(e,t,i,n){this.value=e,this.stringValue=t,this.characterCountBitsForVersions=i,this.bits=n,Ot.FOR_BITS.set(n,this),Ot.FOR_VALUE.set(e,this)}static forBits(e){const t=Ot.FOR_BITS.get(e);if(void 0===t)throw new Y;return t}getCharacterCountBits(e){const t=e.getVersionNumber();let i;return i=t<=9?0:t<=26?1:2,this.characterCountBitsForVersions[i]}getValue(){return this.value}getBits(){return this.bits}equals(e){if(!(e instanceof Ot))return!1;const t=e;return this.value===t.value}toString(){return this.stringValue}}Ot.FOR_BITS=new Map,Ot.FOR_VALUE=new Map,Ot.TERMINATOR=new Ot(pt.TERMINATOR,"TERMINATOR",Int32Array.from([0,0,0]),0),Ot.NUMERIC=new Ot(pt.NUMERIC,"NUMERIC",Int32Array.from([10,12,14]),1),Ot.ALPHANUMERIC=new Ot(pt.ALPHANUMERIC,"ALPHANUMERIC",Int32Array.from([9,11,13]),2),Ot.STRUCTURED_APPEND=new Ot(pt.STRUCTURED_APPEND,"STRUCTURED_APPEND",Int32Array.from([0,0,0]),3),Ot.BYTE=new Ot(pt.BYTE,"BYTE",Int32Array.from([8,16,16]),4),Ot.ECI=new Ot(pt.ECI,"ECI",Int32Array.from([0,0,0]),7),Ot.KANJI=new Ot(pt.KANJI,"KANJI",Int32Array.from([8,10,12]),8),Ot.FNC1_FIRST_POSITION=new Ot(pt.FNC1_FIRST_POSITION,"FNC1_FIRST_POSITION",Int32Array.from([0,0,0]),5),Ot.FNC1_SECOND_POSITION=new Ot(pt.FNC1_SECOND_POSITION,"FNC1_SECOND_POSITION",Int32Array.from([0,0,0]),9),Ot.HANZI=new Ot(pt.HANZI,"HANZI",Int32Array.from([8,10,12]),13);class Ht{static decode(e,t,i,n){const r=new at(e);let a=new ne;const s=new Array;let o=-1,l=-1;try{let e,i=null,c=!1;do{if(r.available()<4)e=Ot.TERMINATOR;else{const t=r.readBits(4);e=Ot.forBits(t)}switch(e){case Ot.TERMINATOR:break;case Ot.FNC1_FIRST_POSITION:case Ot.FNC1_SECOND_POSITION:c=!0;break;case Ot.STRUCTURED_APPEND:if(r.available()<16)throw new le;o=r.readBits(8),l=r.readBits(8);break;case Ot.ECI:const h=Ht.parseECIValue(r);if(null===(i=st.getCharacterSetECIByValue(h)))throw new le;break;case Ot.HANZI:const d=r.readBits(4),u=r.readBits(e.getCharacterCountBits(t));d===Ht.GB2312_SUBSET&&Ht.decodeHanziSegment(r,a,u);break;default:const p=r.readBits(e.getCharacterCountBits(t));switch(e){case Ot.NUMERIC:Ht.decodeNumericSegment(r,a,p);break;case Ot.ALPHANUMERIC:Ht.decodeAlphanumericSegment(r,a,p,c);break;case Ot.BYTE:Ht.decodeByteSegment(r,a,p,i,s,n);break;case Ot.KANJI:Ht.decodeKanjiSegment(r,a,p);break;default:throw new le}}}while(e!==Ot.TERMINATOR)}catch(e){throw new le}return new rt(e,a.toString(),0===s.length?null:s,null===i?null:i.toString(),o,l)}static decodeHanziSegment(e,t,i){if(13*i>e.available())throw new le;const n=new Uint8Array(2*i);let r=0;for(;i>0;){const t=e.readBits(13);let a=t/96<<8&4294967295|t%96;a+=a<959?41377:42657,n[r]=a>>8&255,n[r+1]=255&a,r+=2,i--}try{t.append(ot.decode(n,kt.GB2312))}catch(e){throw new le(e)}}static decodeKanjiSegment(e,t,i){if(13*i>e.available())throw new le;const n=new Uint8Array(2*i);let r=0;for(;i>0;){const t=e.readBits(13);let a=t/192<<8&4294967295|t%192;a+=a<7936?33088:49472,n[r]=a>>8,n[r+1]=a,r+=2,i--}try{t.append(ot.decode(n,kt.SHIFT_JIS))}catch(e){throw new le(e)}}static decodeByteSegment(e,t,i,n,r,a){if(8*i>e.available())throw new le;const s=new Uint8Array(i);for(let t=0;t<i;t++)s[t]=e.readBits(8);let o;o=null===n?kt.guessEncoding(s,a):n.getName();try{t.append(ot.decode(s,o))}catch(e){throw new le(e)}r.push(s)}static toAlphaNumericChar(e){if(e>=Ht.ALPHANUMERIC_CHARS.length)throw new le;return Ht.ALPHANUMERIC_CHARS[e]}static decodeAlphanumericSegment(e,t,i,n){const r=t.length();for(;i>1;){if(e.available()<11)throw new le;const n=e.readBits(11);t.append(Ht.toAlphaNumericChar(Math.floor(n/45))),t.append(Ht.toAlphaNumericChar(n%45)),i-=2}if(1===i){if(e.available()<6)throw new le;t.append(Ht.toAlphaNumericChar(e.readBits(6)))}if(n)for(let e=r;e<t.length();e++)"%"===t.charAt(e)&&(e<t.length()-1&&"%"===t.charAt(e+1)?t.deleteCharAt(e+1):t.setCharAt(e,String.fromCharCode(29)))}static decodeNumericSegment(e,t,i){for(;i>=3;){if(e.available()<10)throw new le;const n=e.readBits(10);if(n>=1e3)throw new le;t.append(Ht.toAlphaNumericChar(Math.floor(n/100))),t.append(Ht.toAlphaNumericChar(Math.floor(n/10)%10)),t.append(Ht.toAlphaNumericChar(n%10)),i-=3}if(2===i){if(e.available()<7)throw new le;const i=e.readBits(7);if(i>=100)throw new le;t.append(Ht.toAlphaNumericChar(Math.floor(i/10))),t.append(Ht.toAlphaNumericChar(i%10))}else if(1===i){if(e.available()<4)throw new le;const i=e.readBits(4);if(i>=10)throw new le;t.append(Ht.toAlphaNumericChar(i))}}static parseECIValue(e){const t=e.readBits(8);if(0==(128&t))return 127&t;if(128==(192&t)){return(63&t)<<8&4294967295|e.readBits(8)}if(192==(224&t)){return(31&t)<<16&4294967295|e.readBits(16)}throw new le}}Ht.ALPHANUMERIC_CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",Ht.GB2312_SUBSET=1;class Lt{constructor(){this.rsDecoder=new Je(Ye.QR_CODE_FIELD_256)}decodeBooleanArray(e,t){return this.decodeBitMatrix(re.parseFromBooleanArray(e),t)}decodeBitMatrix(e,t){const i=new xt(e);let n=null;try{return this.decodeBitMatrixParser(i,t)}catch(e){n=e}try{i.remask(),i.setMirror(!0),i.readVersion(),i.readFormatInformation(),i.mirror();const e=this.decodeBitMatrixParser(i,t);return e.setOther(new Tt(!0)),e}catch(e){if(null!==n)throw n;throw e}}decodeBitMatrixParser(e,t){const i=e.readVersion(),n=e.readFormatInformation().getErrorCorrectionLevel(),r=e.readCodewords(),a=It.getDataBlocks(r,i,n);let s=0;for(const e of a)s+=e.getNumDataCodewords();const o=new Uint8Array(s);let l=0;for(const e of a){const t=e.getCodewords(),i=e.getNumDataCodewords();this.correctErrors(t,i);for(let e=0;e<i;e++)o[l++]=t[e]}return Ht.decode(o,i,n,t)}correctErrors(e,t){e.length;const i=new Int32Array(e);try{this.rsDecoder.decode(i,e.length-t)}catch(e){throw new Z}for(let n=0;n<t;n++)e[n]=i[n]}}class Vt extends Me{constructor(e,t,i,n){super(e,t),this.estimatedModuleSize=i,this.count=n,void 0===n&&(this.count=1)}getEstimatedModuleSize(){return this.estimatedModuleSize}getCount(){return this.count}aboutEquals(e,t,i){if(Math.abs(t-this.getY())<=e&&Math.abs(i-this.getX())<=e){const t=Math.abs(e-this.estimatedModuleSize);return t<=1||t<=this.estimatedModuleSize}return!1}combineEstimate(e,t,i){const n=this.count+1,r=(this.count*this.getX()+t)/n,a=(this.count*this.getY()+e)/n,s=(this.count*this.estimatedModuleSize+i)/n;return new Vt(r,a,s,n)}}class Dt{constructor(e){this.bottomLeft=e[0],this.topLeft=e[1],this.topRight=e[2]}getBottomLeft(){return this.bottomLeft}getTopLeft(){return this.topLeft}getTopRight(){return this.topRight}}class Nt{constructor(e,t){this.image=e,this.resultPointCallback=t,this.possibleCenters=[],this.crossCheckStateCount=new Int32Array(5),this.resultPointCallback=t}getImage(){return this.image}getPossibleCenters(){return this.possibleCenters}find(e){const t=null!=e&&void 0!==e.get(ye.TRY_HARDER),i=null!=e&&void 0!==e.get(ye.PURE_BARCODE),n=this.image,r=n.getHeight(),a=n.getWidth();let s=Math.floor(3*r/(4*Nt.MAX_MODULES));(s<Nt.MIN_SKIP||t)&&(s=Nt.MIN_SKIP);let o=!1;const l=new Int32Array(5);for(let e=s-1;e<r&&!o;e+=s){l[0]=0,l[1]=0,l[2]=0,l[3]=0,l[4]=0;let t=0;for(let r=0;r<a;r++)if(n.get(r,e))1==(1&t)&&t++,l[t]++;else if(0==(1&t))if(4===t)if(Nt.foundPatternCross(l)){if(!0!==this.handlePossibleCenter(l,e,r,i)){l[0]=l[2],l[1]=l[3],l[2]=l[4],l[3]=1,l[4]=0,t=3;continue}if(s=2,!0===this.hasSkipped)o=this.haveMultiplyConfirmedCenters();else{const t=this.findRowSkip();t>l[2]&&(e+=t-l[2]-s,r=a-1)}t=0,l[0]=0,l[1]=0,l[2]=0,l[3]=0,l[4]=0}else l[0]=l[2],l[1]=l[3],l[2]=l[4],l[3]=1,l[4]=0,t=3;else l[++t]++;else l[t]++;if(Nt.foundPatternCross(l)){!0===this.handlePossibleCenter(l,e,a,i)&&(s=l[0],this.hasSkipped&&(o=this.haveMultiplyConfirmedCenters()))}}const c=this.selectBestPatterns();return Me.orderBestPatterns(c),new Dt(c)}static centerFromEnd(e,t){return t-e[4]-e[3]-e[2]/2}static foundPatternCross(e){let t=0;for(let i=0;i<5;i++){const n=e[i];if(0===n)return!1;t+=n}if(t<7)return!1;const i=t/7,n=i/2;return Math.abs(i-e[0])<n&&Math.abs(i-e[1])<n&&Math.abs(3*i-e[2])<3*n&&Math.abs(i-e[3])<n&&Math.abs(i-e[4])<n}getCrossCheckStateCount(){const e=this.crossCheckStateCount;return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e}crossCheckDiagonal(e,t,i,n){const r=this.getCrossCheckStateCount();let a=0;const s=this.image;for(;e>=a&&t>=a&&s.get(t-a,e-a);)r[2]++,a++;if(e<a||t<a)return!1;for(;e>=a&&t>=a&&!s.get(t-a,e-a)&&r[1]<=i;)r[1]++,a++;if(e<a||t<a||r[1]>i)return!1;for(;e>=a&&t>=a&&s.get(t-a,e-a)&&r[0]<=i;)r[0]++,a++;if(r[0]>i)return!1;const o=s.getHeight(),l=s.getWidth();for(a=1;e+a<o&&t+a<l&&s.get(t+a,e+a);)r[2]++,a++;if(e+a>=o||t+a>=l)return!1;for(;e+a<o&&t+a<l&&!s.get(t+a,e+a)&&r[3]<i;)r[3]++,a++;if(e+a>=o||t+a>=l||r[3]>=i)return!1;for(;e+a<o&&t+a<l&&s.get(t+a,e+a)&&r[4]<i;)r[4]++,a++;if(r[4]>=i)return!1;const c=r[0]+r[1]+r[2]+r[3]+r[4];return Math.abs(c-n)<2*n&&Nt.foundPatternCross(r)}crossCheckVertical(e,t,i,n){const r=this.image,a=r.getHeight(),s=this.getCrossCheckStateCount();let o=e;for(;o>=0&&r.get(t,o);)s[2]++,o--;if(o<0)return NaN;for(;o>=0&&!r.get(t,o)&&s[1]<=i;)s[1]++,o--;if(o<0||s[1]>i)return NaN;for(;o>=0&&r.get(t,o)&&s[0]<=i;)s[0]++,o--;if(s[0]>i)return NaN;for(o=e+1;o<a&&r.get(t,o);)s[2]++,o++;if(o===a)return NaN;for(;o<a&&!r.get(t,o)&&s[3]<i;)s[3]++,o++;if(o===a||s[3]>=i)return NaN;for(;o<a&&r.get(t,o)&&s[4]<i;)s[4]++,o++;if(s[4]>=i)return NaN;const l=s[0]+s[1]+s[2]+s[3]+s[4];return 5*Math.abs(l-n)>=2*n?NaN:Nt.foundPatternCross(s)?Nt.centerFromEnd(s,o):NaN}crossCheckHorizontal(e,t,i,n){const r=this.image,a=r.getWidth(),s=this.getCrossCheckStateCount();let o=e;for(;o>=0&&r.get(o,t);)s[2]++,o--;if(o<0)return NaN;for(;o>=0&&!r.get(o,t)&&s[1]<=i;)s[1]++,o--;if(o<0||s[1]>i)return NaN;for(;o>=0&&r.get(o,t)&&s[0]<=i;)s[0]++,o--;if(s[0]>i)return NaN;for(o=e+1;o<a&&r.get(o,t);)s[2]++,o++;if(o===a)return NaN;for(;o<a&&!r.get(o,t)&&s[3]<i;)s[3]++,o++;if(o===a||s[3]>=i)return NaN;for(;o<a&&r.get(o,t)&&s[4]<i;)s[4]++,o++;if(s[4]>=i)return NaN;const l=s[0]+s[1]+s[2]+s[3]+s[4];return 5*Math.abs(l-n)>=n?NaN:Nt.foundPatternCross(s)?Nt.centerFromEnd(s,o):NaN}handlePossibleCenter(e,t,i,n){const r=e[0]+e[1]+e[2]+e[3]+e[4];let a=Nt.centerFromEnd(e,i),s=this.crossCheckVertical(t,Math.floor(a),e[2],r);if(!isNaN(s)&&(a=this.crossCheckHorizontal(Math.floor(a),Math.floor(s),e[2],r),!isNaN(a)&&(!n||this.crossCheckDiagonal(Math.floor(s),Math.floor(a),e[2],r)))){const e=r/7;let t=!1;const i=this.possibleCenters;for(let n=0,r=i.length;n<r;n++){const r=i[n];if(r.aboutEquals(e,s,a)){i[n]=r.combineEstimate(s,a,e),t=!0;break}}if(!t){const t=new Vt(a,s,e);i.push(t),null!==this.resultPointCallback&&void 0!==this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(t)}return!0}return!1}findRowSkip(){if(this.possibleCenters.length<=1)return 0;let e=null;for(const t of this.possibleCenters)if(t.getCount()>=Nt.CENTER_QUORUM){if(null!=e)return this.hasSkipped=!0,Math.floor((Math.abs(e.getX()-t.getX())-Math.abs(e.getY()-t.getY()))/2);e=t}return 0}haveMultiplyConfirmedCenters(){let e=0,t=0;const i=this.possibleCenters.length;for(const i of this.possibleCenters)i.getCount()>=Nt.CENTER_QUORUM&&(e++,t+=i.getEstimatedModuleSize());if(e<3)return!1;const n=t/i;let r=0;for(const e of this.possibleCenters)r+=Math.abs(e.getEstimatedModuleSize()-n);return r<=.05*t}selectBestPatterns(){const e=this.possibleCenters.length;if(e<3)throw new ae;const t=this.possibleCenters;let i;if(e>3){let n=0,r=0;for(const e of this.possibleCenters){const t=e.getEstimatedModuleSize();n+=t,r+=t*t}i=n/e;let a=Math.sqrt(r/e-i*i);t.sort((e,t)=>{const n=Math.abs(t.getEstimatedModuleSize()-i),r=Math.abs(e.getEstimatedModuleSize()-i);return n<r?-1:n>r?1:0});const s=Math.max(.2*i,a);for(let e=0;e<t.length&&t.length>3;e++){const n=t[e];Math.abs(n.getEstimatedModuleSize()-i)>s&&(t.splice(e,1),e--)}}if(t.length>3){let e=0;for(const i of t)e+=i.getEstimatedModuleSize();i=e/t.length,t.sort((e,t)=>{if(t.getCount()===e.getCount()){const n=Math.abs(t.getEstimatedModuleSize()-i),r=Math.abs(e.getEstimatedModuleSize()-i);return n<r?1:n>r?-1:0}return t.getCount()-e.getCount()}),t.splice(3)}return[t[0],t[1],t[2]]}}Nt.CENTER_QUORUM=2,Nt.MIN_SKIP=3,Nt.MAX_MODULES=57;class Rt extends Me{constructor(e,t,i){super(e,t),this.estimatedModuleSize=i}aboutEquals(e,t,i){if(Math.abs(t-this.getY())<=e&&Math.abs(i-this.getX())<=e){const t=Math.abs(e-this.estimatedModuleSize);return t<=1||t<=this.estimatedModuleSize}return!1}combineEstimate(e,t,i){const n=(this.getX()+t)/2,r=(this.getY()+e)/2,a=(this.estimatedModuleSize+i)/2;return new Rt(n,r,a)}}class Pt{constructor(e,t,i,n,r,a,s){this.image=e,this.startX=t,this.startY=i,this.width=n,this.height=r,this.moduleSize=a,this.resultPointCallback=s,this.possibleCenters=[],this.crossCheckStateCount=new Int32Array(3)}find(){const e=this.startX,t=this.height,i=e+this.width,n=this.startY+t/2,r=new Int32Array(3),a=this.image;for(let s=0;s<t;s++){const t=n+(0==(1&s)?Math.floor((s+1)/2):-Math.floor((s+1)/2));r[0]=0,r[1]=0,r[2]=0;let o=e;for(;o<i&&!a.get(o,t);)o++;let l=0;for(;o<i;){if(a.get(o,t))if(1===l)r[1]++;else if(2===l){if(this.foundPatternCross(r)){const e=this.handlePossibleCenter(r,t,o);if(null!==e)return e}r[0]=r[2],r[1]=1,r[2]=0,l=1}else r[++l]++;else 1===l&&l++,r[l]++;o++}if(this.foundPatternCross(r)){const e=this.handlePossibleCenter(r,t,i);if(null!==e)return e}}if(0!==this.possibleCenters.length)return this.possibleCenters[0];throw new ae}static centerFromEnd(e,t){return t-e[2]-e[1]/2}foundPatternCross(e){const t=this.moduleSize,i=t/2;for(let n=0;n<3;n++)if(Math.abs(t-e[n])>=i)return!1;return!0}crossCheckVertical(e,t,i,n){const r=this.image,a=r.getHeight(),s=this.crossCheckStateCount;s[0]=0,s[1]=0,s[2]=0;let o=e;for(;o>=0&&r.get(t,o)&&s[1]<=i;)s[1]++,o--;if(o<0||s[1]>i)return NaN;for(;o>=0&&!r.get(t,o)&&s[0]<=i;)s[0]++,o--;if(s[0]>i)return NaN;for(o=e+1;o<a&&r.get(t,o)&&s[1]<=i;)s[1]++,o++;if(o===a||s[1]>i)return NaN;for(;o<a&&!r.get(t,o)&&s[2]<=i;)s[2]++,o++;if(s[2]>i)return NaN;const l=s[0]+s[1]+s[2];return 5*Math.abs(l-n)>=2*n?NaN:this.foundPatternCross(s)?Pt.centerFromEnd(s,o):NaN}handlePossibleCenter(e,t,i){const n=e[0]+e[1]+e[2],r=Pt.centerFromEnd(e,i),a=this.crossCheckVertical(t,r,2*e[1],n);if(!isNaN(a)){const t=(e[0]+e[1]+e[2])/3;for(const e of this.possibleCenters)if(e.aboutEquals(t,a,r))return e.combineEstimate(a,r,t);const i=new Rt(r,a,t);this.possibleCenters.push(i),null!==this.resultPointCallback&&void 0!==this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(i)}return null}}class Bt{constructor(e){this.image=e}getImage(){return this.image}getResultPointCallback(){return this.resultPointCallback}detect(e){this.resultPointCallback=null==e?null:e.get(ye.NEED_RESULT_POINT_CALLBACK);const t=new Nt(this.image,this.resultPointCallback).find(e);return this.processFinderPatternInfo(t)}processFinderPatternInfo(e){const t=e.getTopLeft(),i=e.getTopRight(),n=e.getBottomLeft(),r=this.calculateModuleSize(t,i,n);if(r<1)throw new ae("No pattern found in proccess finder.");const a=Bt.computeDimension(t,i,n,r),s=St.getProvisionalVersionForDimension(a),o=s.getDimensionForVersion()-7;let l=null;if(s.getAlignmentPatternCenters().length>0){const e=i.getX()-t.getX()+n.getX(),a=i.getY()-t.getY()+n.getY(),s=1-3/o,c=Math.floor(t.getX()+s*(e-t.getX())),h=Math.floor(t.getY()+s*(a-t.getY()));for(let e=4;e<=16;e<<=1)try{l=this.findAlignmentInRegion(r,c,h,e);break}catch(e){if(!(e instanceof ae))throw e}}const c=Bt.createTransform(t,i,n,l,a),h=Bt.sampleGrid(this.image,c,a);let d;return new ht(h,d=null===l?[n,t,i]:[n,t,i,l])}static createTransform(e,t,i,n,r){const a=r-3.5;let s,o,l,c;return null!==n?(s=n.getX(),o=n.getY(),c=l=a-3):(s=t.getX()-e.getX()+i.getX(),o=t.getY()-e.getY()+i.getY(),l=a,c=a),ft.quadrilateralToQuadrilateral(3.5,3.5,a,3.5,l,c,3.5,a,e.getX(),e.getY(),t.getX(),t.getY(),s,o,i.getX(),i.getY())}static sampleGrid(e,t,i){return vt.getInstance().sampleGridWithTransform(e,i,i,t)}static computeDimension(e,t,i,n){const r=Ae.round(Me.distance(e,t)/n),a=Ae.round(Me.distance(e,i)/n);let s=Math.floor((r+a)/2)+7;switch(3&s){case 0:s++;break;case 2:s--;break;case 3:throw new ae("Dimensions could be not found.")}return s}calculateModuleSize(e,t,i){return(this.calculateModuleSizeOneWay(e,t)+this.calculateModuleSizeOneWay(e,i))/2}calculateModuleSizeOneWay(e,t){const i=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(e.getX()),Math.floor(e.getY()),Math.floor(t.getX()),Math.floor(t.getY())),n=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.getX()),Math.floor(t.getY()),Math.floor(e.getX()),Math.floor(e.getY()));return isNaN(i)?n/7:isNaN(n)?i/7:(i+n)/14}sizeOfBlackWhiteBlackRunBothWays(e,t,i,n){let r=this.sizeOfBlackWhiteBlackRun(e,t,i,n),a=1,s=e-(i-e);s<0?(a=e/(e-s),s=0):s>=this.image.getWidth()&&(a=(this.image.getWidth()-1-e)/(s-e),s=this.image.getWidth()-1);let o=Math.floor(t-(n-t)*a);return a=1,o<0?(a=t/(t-o),o=0):o>=this.image.getHeight()&&(a=(this.image.getHeight()-1-t)/(o-t),o=this.image.getHeight()-1),s=Math.floor(e+(s-e)*a),(r+=this.sizeOfBlackWhiteBlackRun(e,t,s,o))-1}sizeOfBlackWhiteBlackRun(e,t,i,n){const r=Math.abs(n-t)>Math.abs(i-e);if(r){let r=e;e=t,t=r,r=i,i=n,n=r}const a=Math.abs(i-e),s=Math.abs(n-t);let o=-a/2;const l=e<i?1:-1,c=t<n?1:-1;let h=0;const d=i+l;for(let i=e,u=t;i!==d;i+=l){const l=r?u:i,d=r?i:u;if(1===h===this.image.get(l,d)){if(2===h)return Ae.distance(i,u,e,t);h++}if((o+=s)>0){if(u===n)break;u+=c,o-=a}}return 2===h?Ae.distance(i+l,n,e,t):NaN}findAlignmentInRegion(e,t,i,n){const r=Math.floor(n*e),a=Math.max(0,t-r),s=Math.min(this.image.getWidth()-1,t+r);if(s-a<3*e)throw new ae("Alignment top exceeds estimated module size.");const o=Math.max(0,i-r),l=Math.min(this.image.getHeight()-1,i+r);if(l-o<3*e)throw new ae("Alignment bottom exceeds estimated module size.");return new Pt(this.image,a,o,s-a,l-o,e,this.resultPointCallback).find()}}class Ft{constructor(){this.decoder=new Lt}getDecoder(){return this.decoder}decode(e,t){let i,n;if(null!=t&&void 0!==t.get(ye.PURE_BARCODE)){const r=Ft.extractPureBits(e.getBlackMatrix());i=this.decoder.decodeBitMatrix(r,t),n=Ft.NO_POINTS}else{const r=new Bt(e.getBlackMatrix()).detect(t);i=this.decoder.decodeBitMatrix(r.getBits(),t),n=r.getPoints()}i.getOther()instanceof Tt&&i.getOther().applyMirroredCorrection(n);const r=new Te(i.getText(),i.getRawBytes(),void 0,n,be.QR_CODE,void 0),a=i.getByteSegments();null!==a&&r.putMetadata(Ee.BYTE_SEGMENTS,a);const s=i.getECLevel();return null!==s&&r.putMetadata(Ee.ERROR_CORRECTION_LEVEL,s),i.hasStructuredAppend()&&(r.putMetadata(Ee.STRUCTURED_APPEND_SEQUENCE,i.getStructuredAppendSequenceNumber()),r.putMetadata(Ee.STRUCTURED_APPEND_PARITY,i.getStructuredAppendParity())),r}reset(){}static extractPureBits(e){const t=e.getTopLeftOnBit(),i=e.getBottomRightOnBit();if(null===t||null===i)throw new ae;const n=this.moduleSize(t,e);let r=t[1],a=i[1],s=t[0],o=i[0];if(s>=o||r>=a)throw new ae;if(a-r!=o-s&&(o=s+(a-r))>=e.getWidth())throw new ae;const l=Math.round((o-s+1)/n),c=Math.round((a-r+1)/n);if(l<=0||c<=0)throw new ae;if(c!==l)throw new ae;const h=Math.floor(n/2);r+=h;const d=(s+=h)+Math.floor((l-1)*n)-o;if(d>0){if(d>h)throw new ae;s-=d}const u=r+Math.floor((c-1)*n)-a;if(u>0){if(u>h)throw new ae;r-=u}const p=new re(l,c);for(let t=0;t<c;t++){const i=r+Math.floor(t*n);for(let r=0;r<l;r++)e.get(s+Math.floor(r*n),i)&&p.set(r,t)}return p}static moduleSize(e,t){const i=t.getHeight(),n=t.getWidth();let r=e[0],a=e[1],s=!0,o=0;for(;r<n&&a<i;){if(s!==t.get(r,a)){if(5==++o)break;s=!s}r++,a++}if(r===n||a===i)throw new ae;return(r-e[0])/7}}Ft.NO_POINTS=new Array;class jt extends W{}class Ut{decode(e,t){return this.setHints(t),this.decodeInternal(e)}decodeWithState(e){return null!==this.readers&&void 0!==this.readers||this.setHints(null),this.decodeInternal(e)}setHints(e){this.hints=e;const t=null!=e&&void 0!==e.get(ye.TRY_HARDER),i=null==e?null:e.get(ye.POSSIBLE_FORMATS),n=new Array;if(null!=i){const r=i.some(e=>e===be.UPC_A||e===be.UPC_E||e===be.EAN_13||e===be.EAN_8||e===be.CODABAR||e===be.CODE_39||e===be.CODE_93||e===be.CODE_128||e===be.ITF||e===be.RSS_14||e===be.RSS_EXPANDED);r&&!t&&n.push(new Ke(e)),i.includes(be.QR_CODE)&&n.push(new Ft),i.includes(be.DATA_MATRIX)&&n.push(new wt),r&&t&&n.push(new Ke(e))}0===n.length&&(t||n.push(new Ke(e)),n.push(new Ft),n.push(new wt),t&&n.push(new Ke(e))),this.readers=n}reset(){if(null!==this.readers)for(const e of this.readers)e.reset()}decodeInternal(e){if(null===this.readers)throw new jt("No readers where selected, nothing can be read.");for(const t of this.readers)try{return t.decode(e,this.hints)}catch(e){if(e instanceof jt)continue}throw new ae("No MultiFormat Readers were able to detect the code.")}}class qt extends fe{constructor(e=null,t=500){const i=new Ut;i.setHints(e),super(i,t)}decodeBitmap(e){return this.reader.decodeWithState(e)}}!function(e){e[e.ERROR_CORRECTION=0]="ERROR_CORRECTION",e[e.CHARACTER_SET=1]="CHARACTER_SET",e[e.DATA_MATRIX_SHAPE=2]="DATA_MATRIX_SHAPE",e[e.MIN_SIZE=3]="MIN_SIZE",e[e.MAX_SIZE=4]="MAX_SIZE",e[e.MARGIN=5]="MARGIN",e[e.PDF417_COMPACT=6]="PDF417_COMPACT",e[e.PDF417_COMPACTION=7]="PDF417_COMPACTION",e[e.PDF417_DIMENSIONS=8]="PDF417_DIMENSIONS",e[e.AZTEC_LAYERS=9]="AZTEC_LAYERS",e[e.QR_VERSION=10]="QR_VERSION"}(mt||(mt={}));var $t=mt;class Kt{constructor(e){this.field=e,this.cachedGenerators=[],this.cachedGenerators.push(new We(e,Int32Array.from([1])))}buildGenerator(e){const t=this.cachedGenerators;if(e>=t.length){let i=t[t.length-1];const n=this.field;for(let r=t.length;r<=e;r++){const e=i.multiply(new We(n,Int32Array.from([1,n.exp(r-1+n.getGeneratorBase())])));t.push(e),i=e}}return t[e]}encode(e,t){if(0===t)throw new Y("No error correction bytes");const i=e.length-t;if(i<=0)throw new Y("No data bytes provided");const n=this.buildGenerator(t),r=new Int32Array(i);Q.arraycopy(e,0,r,0,i);let a=new We(this.field,r);const s=(a=a.multiplyByMonomial(t,1)).divide(n)[1].getCoefficients(),o=t-s.length;for(let t=0;t<o;t++)e[i+t]=0;Q.arraycopy(s,0,e,i+o,s.length)}}class Wt{constructor(){}static applyMaskPenaltyRule1(e){return Wt.applyMaskPenaltyRule1Internal(e,!0)+Wt.applyMaskPenaltyRule1Internal(e,!1)}static applyMaskPenaltyRule2(e){let t=0;const i=e.getArray(),n=e.getWidth(),r=e.getHeight();for(let e=0;e<r-1;e++){const r=i[e];for(let a=0;a<n-1;a++){const n=r[a];n===r[a+1]&&n===i[e+1][a]&&n===i[e+1][a+1]&&t++}}return Wt.N2*t}static applyMaskPenaltyRule3(e){let t=0;const i=e.getArray(),n=e.getWidth(),r=e.getHeight();for(let e=0;e<r;e++)for(let a=0;a<n;a++){const s=i[e];a+6<n&&1===s[a]&&0===s[a+1]&&1===s[a+2]&&1===s[a+3]&&1===s[a+4]&&0===s[a+5]&&1===s[a+6]&&(Wt.isWhiteHorizontal(s,a-4,a)||Wt.isWhiteHorizontal(s,a+7,a+11))&&t++,e+6<r&&1===i[e][a]&&0===i[e+1][a]&&1===i[e+2][a]&&1===i[e+3][a]&&1===i[e+4][a]&&0===i[e+5][a]&&1===i[e+6][a]&&(Wt.isWhiteVertical(i,a,e-4,e)||Wt.isWhiteVertical(i,a,e+7,e+11))&&t++}return t*Wt.N3}static isWhiteHorizontal(e,t,i){t=Math.max(t,0),i=Math.min(i,e.length);for(let n=t;n<i;n++)if(1===e[n])return!1;return!0}static isWhiteVertical(e,t,i,n){i=Math.max(i,0),n=Math.min(n,e.length);for(let r=i;r<n;r++)if(1===e[r][t])return!1;return!0}static applyMaskPenaltyRule4(e){let t=0;const i=e.getArray(),n=e.getWidth(),r=e.getHeight();for(let e=0;e<r;e++){const r=i[e];for(let e=0;e<n;e++)1===r[e]&&t++}const a=e.getHeight()*e.getWidth();return Math.floor(10*Math.abs(2*t-a)/a)*Wt.N4}static getDataMaskBit(e,t,i){let n,r;switch(e){case 0:n=i+t&1;break;case 1:n=1&i;break;case 2:n=t%3;break;case 3:n=(i+t)%3;break;case 4:n=Math.floor(i/2)+Math.floor(t/3)&1;break;case 5:n=(1&(r=i*t))+r%3;break;case 6:n=(1&(r=i*t))+r%3&1;break;case 7:n=(r=i*t)%3+(i+t&1)&1;break;default:throw new Y("Invalid mask pattern: "+e)}return 0===n}static applyMaskPenaltyRule1Internal(e,t){let i=0;const n=t?e.getHeight():e.getWidth(),r=t?e.getWidth():e.getHeight(),a=e.getArray();for(let e=0;e<n;e++){let n=0,s=-1;for(let o=0;o<r;o++){const r=t?a[e][o]:a[o][e];r===s?n++:(n>=5&&(i+=Wt.N1+(n-5)),n=1,s=r)}n>=5&&(i+=Wt.N1+(n-5))}return i}}Wt.N1=3,Wt.N2=3,Wt.N3=40,Wt.N4=10;class Gt{constructor(e,t){this.width=e,this.height=t;const i=new Array(t);for(let n=0;n!==t;n++)i[n]=new Uint8Array(e);this.bytes=i}getHeight(){return this.height}getWidth(){return this.width}get(e,t){return this.bytes[t][e]}getArray(){return this.bytes}setNumber(e,t,i){this.bytes[t][e]=i}setBoolean(e,t,i){this.bytes[t][e]=i?1:0}clear(e){for(const t of this.bytes)te.fillUint8Array(t,e)}equals(e){if(!(e instanceof Gt))return!1;const t=e;if(this.width!==t.width)return!1;if(this.height!==t.height)return!1;for(let e=0,i=this.height;e<i;++e){const i=this.bytes[e],n=t.bytes[e];for(let e=0,t=this.width;e<t;++e)if(i[e]!==n[e])return!1}return!0}toString(){const e=new ne;for(let t=0,i=this.height;t<i;++t){const i=this.bytes[t];for(let t=0,n=this.width;t<n;++t)switch(i[t]){case 0:e.append(" 0");break;case 1:e.append(" 1");break;default:e.append("  ")}e.append("\n")}return e.toString()}}class Yt{constructor(){this.maskPattern=-1}getMode(){return this.mode}getECLevel(){return this.ecLevel}getVersion(){return this.version}getMaskPattern(){return this.maskPattern}getMatrix(){return this.matrix}toString(){const e=new ne;return e.append("<<\n"),e.append(" mode: "),e.append(this.mode?this.mode.toString():"null"),e.append("\n ecLevel: "),e.append(this.ecLevel?this.ecLevel.toString():"null"),e.append("\n version: "),e.append(this.version?this.version.toString():"null"),e.append("\n maskPattern: "),e.append(this.maskPattern.toString()),this.matrix?(e.append("\n matrix:\n"),e.append(this.matrix.toString())):e.append("\n matrix: null\n"),e.append(">>\n"),e.toString()}setMode(e){this.mode=e}setECLevel(e){this.ecLevel=e}setVersion(e){this.version=e}setMaskPattern(e){this.maskPattern=e}setMatrix(e){this.matrix=e}static isValidMaskPattern(e){return e>=0&&e<Yt.NUM_MASK_PATTERNS}}Yt.NUM_MASK_PATTERNS=8;class Xt extends W{}class Zt{constructor(){}static clearMatrix(e){e.clear(255)}static buildMatrix(e,t,i,n,r){Zt.clearMatrix(r),Zt.embedBasicPatterns(i,r),Zt.embedTypeInfo(t,n,r),Zt.maybeEmbedVersionInfo(i,r),Zt.embedDataBits(e,n,r)}static embedBasicPatterns(e,t){Zt.embedPositionDetectionPatternsAndSeparators(t),Zt.embedDarkDotAtLeftBottomCorner(t),Zt.maybeEmbedPositionAdjustmentPatterns(e,t),Zt.embedTimingPatterns(t)}static embedTypeInfo(e,t,i){const n=new ie;Zt.makeTypeInfoBits(e,t,n);for(let e=0,t=n.getSize();e<t;++e){const t=n.get(n.getSize()-1-e),r=Zt.TYPE_INFO_COORDINATES[e],a=r[0],s=r[1];if(i.setBoolean(a,s,t),e<8){const n=i.getWidth()-e-1,r=8;i.setBoolean(n,r,t)}else{const n=8,r=i.getHeight()-7+(e-8);i.setBoolean(n,r,t)}}}static maybeEmbedVersionInfo(e,t){if(e.getVersionNumber()<7)return;const i=new ie;Zt.makeVersionInfoBits(e,i);let n=17;for(let e=0;e<6;++e)for(let r=0;r<3;++r){const a=i.get(n);n--,t.setBoolean(e,t.getHeight()-11+r,a),t.setBoolean(t.getHeight()-11+r,e,a)}}static embedDataBits(e,t,i){let n=0,r=-1,a=i.getWidth()-1,s=i.getHeight()-1;for(;a>0;){for(6===a&&(a-=1);s>=0&&s<i.getHeight();){for(let r=0;r<2;++r){const o=a-r;if(!Zt.isEmpty(i.get(o,s)))continue;let l;n<e.getSize()?(l=e.get(n),++n):l=!1,255!==t&&Wt.getDataMaskBit(t,o,s)&&(l=!l),i.setBoolean(o,s,l)}s+=r}s+=r=-r,a-=2}if(n!==e.getSize())throw new Xt("Not all bits consumed: "+n+"/"+e.getSize())}static findMSBSet(e){return 32-ee.numberOfLeadingZeros(e)}static calculateBCHCode(e,t){if(0===t)throw new Y("0 polynomial");const i=Zt.findMSBSet(t);for(e<<=i-1;Zt.findMSBSet(e)>=i;)e^=t<<Zt.findMSBSet(e)-i;return e}static makeTypeInfoBits(e,t,i){if(!Yt.isValidMaskPattern(t))throw new Xt("Invalid mask pattern");const n=e.getBits()<<3|t;i.appendBits(n,5);const r=Zt.calculateBCHCode(n,Zt.TYPE_INFO_POLY);i.appendBits(r,10);const a=new ie;if(a.appendBits(Zt.TYPE_INFO_MASK_PATTERN,15),i.xor(a),15!==i.getSize())throw new Xt("should not happen but we got: "+i.getSize())}static makeVersionInfoBits(e,t){t.appendBits(e.getVersionNumber(),6);const i=Zt.calculateBCHCode(e.getVersionNumber(),Zt.VERSION_INFO_POLY);if(t.appendBits(i,12),18!==t.getSize())throw new Xt("should not happen but we got: "+t.getSize())}static isEmpty(e){return 255===e}static embedTimingPatterns(e){for(let t=8;t<e.getWidth()-8;++t){const i=(t+1)%2;Zt.isEmpty(e.get(t,6))&&e.setNumber(t,6,i),Zt.isEmpty(e.get(6,t))&&e.setNumber(6,t,i)}}static embedDarkDotAtLeftBottomCorner(e){if(0===e.get(8,e.getHeight()-8))throw new Xt;e.setNumber(8,e.getHeight()-8,1)}static embedHorizontalSeparationPattern(e,t,i){for(let n=0;n<8;++n){if(!Zt.isEmpty(i.get(e+n,t)))throw new Xt;i.setNumber(e+n,t,0)}}static embedVerticalSeparationPattern(e,t,i){for(let n=0;n<7;++n){if(!Zt.isEmpty(i.get(e,t+n)))throw new Xt;i.setNumber(e,t+n,0)}}static embedPositionAdjustmentPattern(e,t,i){for(let n=0;n<5;++n){const r=Zt.POSITION_ADJUSTMENT_PATTERN[n];for(let a=0;a<5;++a)i.setNumber(e+a,t+n,r[a])}}static embedPositionDetectionPattern(e,t,i){for(let n=0;n<7;++n){const r=Zt.POSITION_DETECTION_PATTERN[n];for(let a=0;a<7;++a)i.setNumber(e+a,t+n,r[a])}}static embedPositionDetectionPatternsAndSeparators(e){const t=Zt.POSITION_DETECTION_PATTERN[0].length;Zt.embedPositionDetectionPattern(0,0,e),Zt.embedPositionDetectionPattern(e.getWidth()-t,0,e),Zt.embedPositionDetectionPattern(0,e.getWidth()-t,e);Zt.embedHorizontalSeparationPattern(0,7,e),Zt.embedHorizontalSeparationPattern(e.getWidth()-8,7,e),Zt.embedHorizontalSeparationPattern(0,e.getWidth()-8,e);Zt.embedVerticalSeparationPattern(7,0,e),Zt.embedVerticalSeparationPattern(e.getHeight()-7-1,0,e),Zt.embedVerticalSeparationPattern(7,e.getHeight()-7,e)}static maybeEmbedPositionAdjustmentPatterns(e,t){if(e.getVersionNumber()<2)return;const i=e.getVersionNumber()-1,n=Zt.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[i];for(let e=0,i=n.length;e!==i;e++){const r=n[e];if(r>=0)for(let e=0;e!==i;e++){const i=n[e];i>=0&&Zt.isEmpty(t.get(i,r))&&Zt.embedPositionAdjustmentPattern(i-2,r-2,t)}}}}Zt.POSITION_DETECTION_PATTERN=Array.from([Int32Array.from([1,1,1,1,1,1,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,1,1,1,1,1,1])]),Zt.POSITION_ADJUSTMENT_PATTERN=Array.from([Int32Array.from([1,1,1,1,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,0,1,0,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,1,1,1,1])]),Zt.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE=Array.from([Int32Array.from([-1,-1,-1,-1,-1,-1,-1]),Int32Array.from([6,18,-1,-1,-1,-1,-1]),Int32Array.from([6,22,-1,-1,-1,-1,-1]),Int32Array.from([6,26,-1,-1,-1,-1,-1]),Int32Array.from([6,30,-1,-1,-1,-1,-1]),Int32Array.from([6,34,-1,-1,-1,-1,-1]),Int32Array.from([6,22,38,-1,-1,-1,-1]),Int32Array.from([6,24,42,-1,-1,-1,-1]),Int32Array.from([6,26,46,-1,-1,-1,-1]),Int32Array.from([6,28,50,-1,-1,-1,-1]),Int32Array.from([6,30,54,-1,-1,-1,-1]),Int32Array.from([6,32,58,-1,-1,-1,-1]),Int32Array.from([6,34,62,-1,-1,-1,-1]),Int32Array.from([6,26,46,66,-1,-1,-1]),Int32Array.from([6,26,48,70,-1,-1,-1]),Int32Array.from([6,26,50,74,-1,-1,-1]),Int32Array.from([6,30,54,78,-1,-1,-1]),Int32Array.from([6,30,56,82,-1,-1,-1]),Int32Array.from([6,30,58,86,-1,-1,-1]),Int32Array.from([6,34,62,90,-1,-1,-1]),Int32Array.from([6,28,50,72,94,-1,-1]),Int32Array.from([6,26,50,74,98,-1,-1]),Int32Array.from([6,30,54,78,102,-1,-1]),Int32Array.from([6,28,54,80,106,-1,-1]),Int32Array.from([6,32,58,84,110,-1,-1]),Int32Array.from([6,30,58,86,114,-1,-1]),Int32Array.from([6,34,62,90,118,-1,-1]),Int32Array.from([6,26,50,74,98,122,-1]),Int32Array.from([6,30,54,78,102,126,-1]),Int32Array.from([6,26,52,78,104,130,-1]),Int32Array.from([6,30,56,82,108,134,-1]),Int32Array.from([6,34,60,86,112,138,-1]),Int32Array.from([6,30,58,86,114,142,-1]),Int32Array.from([6,34,62,90,118,146,-1]),Int32Array.from([6,30,54,78,102,126,150]),Int32Array.from([6,24,50,76,102,128,154]),Int32Array.from([6,28,54,80,106,132,158]),Int32Array.from([6,32,58,84,110,136,162]),Int32Array.from([6,26,54,82,110,138,166]),Int32Array.from([6,30,58,86,114,142,170])]),Zt.TYPE_INFO_COORDINATES=Array.from([Int32Array.from([8,0]),Int32Array.from([8,1]),Int32Array.from([8,2]),Int32Array.from([8,3]),Int32Array.from([8,4]),Int32Array.from([8,5]),Int32Array.from([8,7]),Int32Array.from([8,8]),Int32Array.from([7,8]),Int32Array.from([5,8]),Int32Array.from([4,8]),Int32Array.from([3,8]),Int32Array.from([2,8]),Int32Array.from([1,8]),Int32Array.from([0,8])]),Zt.VERSION_INFO_POLY=7973,Zt.TYPE_INFO_POLY=1335,Zt.TYPE_INFO_MASK_PATTERN=21522;class Jt{constructor(e,t){this.dataBytes=e,this.errorCorrectionBytes=t}getDataBytes(){return this.dataBytes}getErrorCorrectionBytes(){return this.errorCorrectionBytes}}class Qt{constructor(){}static calculateMaskPenalty(e){return Wt.applyMaskPenaltyRule1(e)+Wt.applyMaskPenaltyRule2(e)+Wt.applyMaskPenaltyRule3(e)+Wt.applyMaskPenaltyRule4(e)}static encode(e,t,i=null){let n=Qt.DEFAULT_BYTE_MODE_ENCODING;const r=null!==i&&void 0!==i.get($t.CHARACTER_SET);r&&(n=i.get($t.CHARACTER_SET).toString());const a=this.chooseMode(e,n),s=new ie;if(a===Ot.BYTE&&(r||Qt.DEFAULT_BYTE_MODE_ENCODING!==n)){const e=st.getCharacterSetECIByName(n);void 0!==e&&this.appendECI(e,s)}this.appendModeInfo(a,s);const o=new ie;let l;if(this.appendBytes(e,a,o,n),null!==i&&void 0!==i.get($t.QR_VERSION)){const e=Number.parseInt(i.get($t.QR_VERSION).toString(),10);l=St.getVersionForNumber(e);const n=this.calculateBitsNeeded(a,s,o,l);if(!this.willFit(n,l,t))throw new Xt("Data too big for requested version")}else l=this.recommendVersion(t,a,s,o);const c=new ie;c.appendBitArray(s);const h=a===Ot.BYTE?o.getSizeInBytes():e.length;this.appendLengthInfo(h,l,a,c),c.appendBitArray(o);const d=l.getECBlocksForLevel(t),u=l.getTotalCodewords()-d.getTotalECCodewords();this.terminateBits(u,c);const p=this.interleaveWithECBytes(c,l.getTotalCodewords(),u,d.getNumBlocks()),m=new Yt;m.setECLevel(t),m.setMode(a),m.setVersion(l);const g=l.getDimensionForVersion(),f=new Gt(g,g),v=this.chooseMaskPattern(p,t,l,f);return m.setMaskPattern(v),Zt.buildMatrix(p,t,l,v,f),m.setMatrix(f),m}static recommendVersion(e,t,i,n){const r=this.calculateBitsNeeded(t,i,n,St.getVersionForNumber(1)),a=this.chooseVersion(r,e),s=this.calculateBitsNeeded(t,i,n,a);return this.chooseVersion(s,e)}static calculateBitsNeeded(e,t,i,n){return t.getSize()+e.getCharacterCountBits(n)+i.getSize()}static getAlphanumericCode(e){return e<Qt.ALPHANUMERIC_TABLE.length?Qt.ALPHANUMERIC_TABLE[e]:-1}static chooseMode(e,t=null){if(st.SJIS.getName()===t&&this.isOnlyDoubleByteKanji(e))return Ot.KANJI;let i=!1,n=!1;for(let t=0,r=e.length;t<r;++t){const r=e.charAt(t);if(Qt.isDigit(r))i=!0;else{if(-1===this.getAlphanumericCode(r.charCodeAt(0)))return Ot.BYTE;n=!0}}return n?Ot.ALPHANUMERIC:i?Ot.NUMERIC:Ot.BYTE}static isOnlyDoubleByteKanji(e){let t;try{t=ot.encode(e,st.SJIS)}catch(e){return!1}const i=t.length;if(i%2!=0)return!1;for(let e=0;e<i;e+=2){const i=255&t[e];if((i<129||i>159)&&(i<224||i>235))return!1}return!0}static chooseMaskPattern(e,t,i,n){let r=Number.MAX_SAFE_INTEGER,a=-1;for(let s=0;s<Yt.NUM_MASK_PATTERNS;s++){Zt.buildMatrix(e,t,i,s,n);let o=this.calculateMaskPenalty(n);o<r&&(r=o,a=s)}return a}static chooseVersion(e,t){for(let i=1;i<=40;i++){const n=St.getVersionForNumber(i);if(Qt.willFit(e,n,t))return n}throw new Xt("Data too big")}static willFit(e,t,i){return t.getTotalCodewords()-t.getECBlocksForLevel(i).getTotalECCodewords()>=(e+7)/8}static terminateBits(e,t){const i=8*e;if(t.getSize()>i)throw new Xt("data bits cannot fit in the QR Code"+t.getSize()+" > "+i);for(let e=0;e<4&&t.getSize()<i;++e)t.appendBit(!1);const n=7&t.getSize();if(n>0)for(let e=n;e<8;e++)t.appendBit(!1);const r=e-t.getSizeInBytes();for(let e=0;e<r;++e)t.appendBits(0==(1&e)?236:17,8);if(t.getSize()!==i)throw new Xt("Bits size does not equal capacity")}static getNumDataBytesAndNumECBytesForBlockID(e,t,i,n,r,a){if(n>=i)throw new Xt("Block ID too large");const s=e%i,o=i-s,l=Math.floor(e/i),c=l+1,h=Math.floor(t/i),d=h+1,u=l-h,p=c-d;if(u!==p)throw new Xt("EC bytes mismatch");if(i!==o+s)throw new Xt("RS blocks mismatch");if(e!==(h+u)*o+(d+p)*s)throw new Xt("Total bytes mismatch");n<o?(r[0]=h,a[0]=u):(r[0]=d,a[0]=p)}static interleaveWithECBytes(e,t,i,n){if(e.getSizeInBytes()!==i)throw new Xt("Number of bits and data bytes does not match");let r=0,a=0,s=0;const o=new Array;for(let l=0;l<n;++l){const c=new Int32Array(1),h=new Int32Array(1);Qt.getNumDataBytesAndNumECBytesForBlockID(t,i,n,l,c,h);const d=c[0],u=new Uint8Array(d);e.toBytes(8*r,u,0,d);const p=Qt.generateECBytes(u,h[0]);o.push(new Jt(u,p)),a=Math.max(a,d),s=Math.max(s,p.length),r+=c[0]}if(i!==r)throw new Xt("Data bytes does not match offset");const l=new ie;for(let e=0;e<a;++e)for(const t of o){const i=t.getDataBytes();e<i.length&&l.appendBits(i[e],8)}for(let e=0;e<s;++e)for(const t of o){const i=t.getErrorCorrectionBytes();e<i.length&&l.appendBits(i[e],8)}if(t!==l.getSizeInBytes())throw new Xt("Interleaving error: "+t+" and "+l.getSizeInBytes()+" differ.");return l}static generateECBytes(e,t){const i=e.length,n=new Int32Array(i+t);for(let t=0;t<i;t++)n[t]=255&e[t];new Kt(Ye.QR_CODE_FIELD_256).encode(n,t);const r=new Uint8Array(t);for(let e=0;e<t;e++)r[e]=n[i+e];return r}static appendModeInfo(e,t){t.appendBits(e.getBits(),4)}static appendLengthInfo(e,t,i,n){const r=i.getCharacterCountBits(t);if(e>=1<<r)throw new Xt(e+" is bigger than "+((1<<r)-1));n.appendBits(e,r)}static appendBytes(e,t,i,n){switch(t){case Ot.NUMERIC:Qt.appendNumericBytes(e,i);break;case Ot.ALPHANUMERIC:Qt.appendAlphanumericBytes(e,i);break;case Ot.BYTE:Qt.append8BitBytes(e,i,n);break;case Ot.KANJI:Qt.appendKanjiBytes(e,i);break;default:throw new Xt("Invalid mode: "+t)}}static getDigit(e){return e.charCodeAt(0)-48}static isDigit(e){const t=Qt.getDigit(e);return t>=0&&t<=9}static appendNumericBytes(e,t){const i=e.length;let n=0;for(;n<i;){const r=Qt.getDigit(e.charAt(n));if(n+2<i){const i=Qt.getDigit(e.charAt(n+1)),a=Qt.getDigit(e.charAt(n+2));t.appendBits(100*r+10*i+a,10),n+=3}else if(n+1<i){const i=Qt.getDigit(e.charAt(n+1));t.appendBits(10*r+i,7),n+=2}else t.appendBits(r,4),n++}}static appendAlphanumericBytes(e,t){const i=e.length;let n=0;for(;n<i;){const r=Qt.getAlphanumericCode(e.charCodeAt(n));if(-1===r)throw new Xt;if(n+1<i){const i=Qt.getAlphanumericCode(e.charCodeAt(n+1));if(-1===i)throw new Xt;t.appendBits(45*r+i,11),n+=2}else t.appendBits(r,6),n++}}static append8BitBytes(e,t,i){let n;try{n=ot.encode(e,i)}catch(e){throw new Xt(e)}for(let e=0,i=n.length;e!==i;e++){const i=n[e];t.appendBits(i,8)}}static appendKanjiBytes(e,t){let i;try{i=ot.encode(e,st.SJIS)}catch(e){throw new Xt(e)}const n=i.length;for(let e=0;e<n;e+=2){const n=(255&i[e])<<8&4294967295|255&i[e+1];let r=-1;if(n>=33088&&n<=40956?r=n-33088:n>=57408&&n<=60351&&(r=n-49472),-1===r)throw new Xt("Invalid byte sequence");const a=192*(r>>8)+(255&r);t.appendBits(a,13)}}static appendECI(e,t){t.appendBits(Ot.ECI.getBits(),4),t.appendBits(e.getValue(),8)}}Qt.ALPHANUMERIC_TABLE=Int32Array.from([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,37,38,-1,-1,-1,-1,39,40,-1,41,42,43,0,1,2,3,4,5,6,7,8,9,44,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,-1,-1,-1,-1,-1]),Qt.DEFAULT_BYTE_MODE_ENCODING=st.UTF8.getName();class ei{write(e,t,i,n=null){if(0===e.length)throw new Y("Found empty contents");if(t<0||i<0)throw new Y("Requested dimensions are too small: "+t+"x"+i);let r=Ct.L,a=ei.QUIET_ZONE_SIZE;null!==n&&(void 0!==n.get($t.ERROR_CORRECTION)&&(r=Ct.fromString(n.get($t.ERROR_CORRECTION).toString())),void 0!==n.get($t.MARGIN)&&(a=Number.parseInt(n.get($t.MARGIN).toString(),10)));const s=Qt.encode(e,r,n);return this.renderResult(s,t,i,a)}writeToDom(e,t,i,n,r=null){"string"==typeof e&&(e=document.querySelector(e));const a=this.write(t,i,n,r);e&&e.appendChild(a)}renderResult(e,t,i,n){const r=e.getMatrix();if(null===r)throw new Ze;const a=r.getWidth(),s=r.getHeight(),o=a+2*n,l=s+2*n,c=Math.max(t,o),h=Math.max(i,l),d=Math.min(Math.floor(c/o),Math.floor(h/l)),u=Math.floor((c-a*d)/2),p=Math.floor((h-s*d)/2),m=this.createSVGElement(c,h);for(let e=0,t=p;e<s;e++,t+=d)for(let i=0,n=u;i<a;i++,n+=d)if(1===r.get(i,e)){const e=this.createSvgRectElement(n,t,d,d);m.appendChild(e)}return m}createSVGElement(e,t){const i=document.createElementNS(ei.SVG_NS,"svg");return i.setAttributeNS(null,"height",e.toString()),i.setAttributeNS(null,"width",t.toString()),i}createSvgRectElement(e,t,i,n){const r=document.createElementNS(ei.SVG_NS,"rect");return r.setAttributeNS(null,"x",e.toString()),r.setAttributeNS(null,"y",t.toString()),r.setAttributeNS(null,"height",i.toString()),r.setAttributeNS(null,"width",n.toString()),r.setAttributeNS(null,"fill","#000000"),r}}ei.QUIET_ZONE_SIZE=4,ei.SVG_NS="http://www.w3.org/2000/svg";class ti{encode(e,t,i,n,r){if(0===e.length)throw new Y("Found empty contents");if(t!==be.QR_CODE)throw new Y("Can only encode QR_CODE, but got "+t);if(i<0||n<0)throw new Y(`Requested dimensions are too small: ${i}x${n}`);let a=Ct.L,s=ti.QUIET_ZONE_SIZE;null!==r&&(void 0!==r.get($t.ERROR_CORRECTION)&&(a=Ct.fromString(r.get($t.ERROR_CORRECTION).toString())),void 0!==r.get($t.MARGIN)&&(s=Number.parseInt(r.get($t.MARGIN).toString(),10)));const o=Qt.encode(e,a,r);return ti.renderResult(o,i,n,s)}static renderResult(e,t,i,n){const r=e.getMatrix();if(null===r)throw new Ze;const a=r.getWidth(),s=r.getHeight(),o=a+2*n,l=s+2*n,c=Math.max(t,o),h=Math.max(i,l),d=Math.min(Math.floor(c/o),Math.floor(h/l)),u=Math.floor((c-a*d)/2),p=Math.floor((h-s*d)/2),m=new re(c,h);for(let e=0,t=p;e<s;e++,t+=d)for(let i=0,n=u;i<a;i++,n+=d)1===r.get(i,e)&&m.setRegion(n,t,d,d);return m}}ti.QUIET_ZONE_SIZE=4;class ii extends he{constructor(e,t,i,n,r,a,s,o){if(super(a,s),this.yuvData=e,this.dataWidth=t,this.dataHeight=i,this.left=n,this.top=r,n+a>t||r+s>i)throw new Y("Crop rectangle does not fit within image data.");o&&this.reverseHorizontal(a,s)}getRow(e,t){if(e<0||e>=this.getHeight())throw new Y("Requested row is outside the image: "+e);const i=this.getWidth();(null==t||t.length<i)&&(t=new Uint8ClampedArray(i));const n=(e+this.top)*this.dataWidth+this.left;return Q.arraycopy(this.yuvData,n,t,0,i),t}getMatrix(){const e=this.getWidth(),t=this.getHeight();if(e===this.dataWidth&&t===this.dataHeight)return this.yuvData;const i=e*t,n=new Uint8ClampedArray(i);let r=this.top*this.dataWidth+this.left;if(e===this.dataWidth)return Q.arraycopy(this.yuvData,r,n,0,i),n;for(let i=0;i<t;i++){const t=i*e;Q.arraycopy(this.yuvData,r,n,t,e),r+=this.dataWidth}return n}isCropSupported(){return!0}crop(e,t,i,n){return new ii(this.yuvData,this.dataWidth,this.dataHeight,this.left+e,this.top+t,i,n,!1)}renderThumbnail(){const e=this.getWidth()/ii.THUMBNAIL_SCALE_FACTOR,t=this.getHeight()/ii.THUMBNAIL_SCALE_FACTOR,i=new Int32Array(e*t),n=this.yuvData;let r=this.top*this.dataWidth+this.left;for(let a=0;a<t;a++){const t=a*e;for(let a=0;a<e;a++){const e=255&n[r+a*ii.THUMBNAIL_SCALE_FACTOR];i[t+a]=4278190080|65793*e}r+=this.dataWidth*ii.THUMBNAIL_SCALE_FACTOR}return i}getThumbnailWidth(){return this.getWidth()/ii.THUMBNAIL_SCALE_FACTOR}getThumbnailHeight(){return this.getHeight()/ii.THUMBNAIL_SCALE_FACTOR}reverseHorizontal(e,t){const i=this.yuvData;for(let n=0,r=this.top*this.dataWidth+this.left;n<t;n++,r+=this.dataWidth){const t=r+e/2;for(let n=r,a=r+e-1;n<t;n++,a--){const e=i[n];i[n]=i[a],i[a]=e}}}invert(){return new de(this)}}ii.THUMBNAIL_SCALE_FACTOR=2;i(55);
/**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const ni=s.a`<iron-iconset-svg name="image" size="24">
<svg><defs>
<g id="add-a-photo"><path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"></path></g>
<g id="add-to-photos"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g>
<g id="adjust"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"></path></g>
<g id="assistant"><path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11l-4.12 1.88z"></path></g>
<g id="assistant-photo"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="audiotrack"><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"></path></g>
<g id="blur-circular"><path d="M10 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM7 9.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm3 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-3-3c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm3-6c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM14 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-1.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm3 6c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-4c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm2-3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-3.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"></path></g>
<g id="blur-linear"><path d="M5 17.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM9 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zM3 21h18v-2H3v2zM5 9.5c.83 0 1.5-.67 1.5-1.5S5.83 6.5 5 6.5 3.5 7.17 3.5 8 4.17 9.5 5 9.5zm0 4c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM9 17c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8-.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM3 3v2h18V3H3zm14 5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm0 4c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM13 9c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"></path></g>
<g id="blur-off"><path d="M14 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-.2 4.48l.2.02c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5l.02.2c.09.67.61 1.19 1.28 1.28zM14 3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-4 0c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm11 7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM10 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8 8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-4 13.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM2.5 5.27l3.78 3.78L6 9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.03-.19-.06-.28l2.81 2.81c-.71.11-1.25.73-1.25 1.47 0 .83.67 1.5 1.5 1.5.74 0 1.36-.54 1.47-1.25l2.81 2.81c-.09-.03-.18-.06-.28-.06-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.03-.19-.06-.28l3.78 3.78L20 20.23 3.77 4 2.5 5.27zM10 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm11-3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM3 9.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 11c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3-3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z"></path></g>
<g id="blur-on"><path d="M6 13c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-3 .5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM6 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm15 5.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM14 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-3.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zm-11 10c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm0-17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5zM10 7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 5.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm8 .5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm3 8.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM14 17c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm0 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm-4-12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0 8.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="brightness-1"><circle cx="12" cy="12" r="10"></circle></g>
<g id="brightness-2"><path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"></path></g>
<g id="brightness-3"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"></path></g>
<g id="brightness-4"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></g>
<g id="brightness-5"><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></g>
<g id="brightness-6"><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></g>
<g id="brightness-7"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></g>
<g id="broken-image"><path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z"></path></g>
<g id="brush"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"></path></g>
<g id="burst-mode"><path d="M1 5h2v14H1zm4 0h2v14H5zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM11 17l2.5-3.15L15.29 16l2.5-3.22L21 17H11z"></path></g>
<g id="camera"><path d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"></path></g>
<g id="camera-alt"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></g>
<g id="camera-front"><path d="M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zM12 8c1.1 0 2-.9 2-2s-.9-2-2-2-1.99.9-1.99 2S10.9 8 12 8zm5-8H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zM7 2h10v10.5c0-1.67-3.33-2.5-5-2.5s-5 .83-5 2.5V2z"></path></g>
<g id="camera-rear"><path d="M10 20H5v2h5v2l3-3-3-3v2zm4 0v2h5v-2h-5zm3-20H7C5.9 0 5 .9 5 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-5 6c-1.11 0-2-.9-2-2s.89-2 1.99-2 2 .9 2 2C14 5.1 13.1 6 12 6z"></path></g>
<g id="camera-roll"><path d="M14 5c0-1.1-.9-2-2-2h-1V2c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2h8V5h-8zm-2 13h-2v-2h2v2zm0-9h-2V7h2v2zm4 9h-2v-2h2v2zm0-9h-2V7h2v2zm4 9h-2v-2h2v2zm0-9h-2V7h2v2z"></path></g>
<g id="center-focus-strong"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-7 7H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z"></path></g>
<g id="center-focus-weak"><path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="collections"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path></g>
<g id="collections-bookmark"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z"></path></g>
<g id="color-lens"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="colorize"><path d="M20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-3.12 3.12-1.93-1.91-1.41 1.41 1.42 1.42L3 16.25V21h4.75l8.92-8.92 1.42 1.42 1.41-1.41-1.92-1.92 3.12-3.12c.4-.4.4-1.03.01-1.42zM6.92 19L5 17.08l8.06-8.06 1.92 1.92L6.92 19z"></path></g>
<g id="compare"><path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="control-point"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="control-point-duplicate"><path d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM2 12c0-2.79 1.64-5.2 4.01-6.32V3.52C2.52 4.76 0 8.09 0 12s2.52 7.24 6.01 8.48v-2.16C3.64 17.2 2 14.79 2 12zm13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"></path></g>
<g id="crop"><path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"></path></g>
<g id="crop-16-9"><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"></path></g>
<g id="crop-3-2"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z"></path></g>
<g id="crop-5-4"><path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path></g>
<g id="crop-7-5"><path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"></path></g>
<g id="crop-din"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"></path></g>
<g id="crop-free"><path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="crop-landscape"><path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path></g>
<g id="crop-original"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"></path></g>
<g id="crop-portrait"><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"></path></g>
<g id="crop-rotate"><path d="M7.47 21.49C4.2 19.93 1.86 16.76 1.5 13H0c.51 6.16 5.66 11 11.95 11 .23 0 .44-.02.66-.03L8.8 20.15l-1.33 1.34zM12.05 0c-.23 0-.44.02-.66.04l3.81 3.81 1.33-1.33C19.8 4.07 22.14 7.24 22.5 11H24c-.51-6.16-5.66-11-11.95-11zM16 14h2V8c0-1.11-.9-2-2-2h-6v2h6v6zm-8 2V4H6v2H4v2h2v8c0 1.1.89 2 2 2h8v2h2v-2h2v-2H8z"></path></g>
<g id="crop-square"><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"></path></g>
<g id="dehaze"><path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"></path></g>
<g id="details"><path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"></path></g>
<g id="edit"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="exposure"><path d="M15 17v2h2v-2h2v-2h-2v-2h-2v2h-2v2h2zm5-15H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 5h6v2H5V5zm15 15H4L20 4v16z"></path></g>
<g id="exposure-neg-1"><path d="M4 11v2h8v-2H4zm15 7h-2V7.38L14 8.4V6.7L18.7 5h.3v13z"></path></g>
<g id="exposure-neg-2"><path d="M15.05 16.29l2.86-3.07c.38-.39.72-.79 1.04-1.18.32-.39.59-.78.82-1.17.23-.39.41-.78.54-1.17s.19-.79.19-1.18c0-.53-.09-1.02-.27-1.46-.18-.44-.44-.81-.78-1.11-.34-.31-.77-.54-1.26-.71-.51-.16-1.08-.24-1.72-.24-.69 0-1.31.11-1.85.32-.54.21-1 .51-1.36.88-.37.37-.65.8-.84 1.3-.18.47-.27.97-.28 1.5h2.14c.01-.31.05-.6.13-.87.09-.29.23-.54.4-.75.18-.21.41-.37.68-.49.27-.12.6-.18.96-.18.31 0 .58.05.81.15.23.1.43.25.59.43.16.18.28.4.37.65.08.25.13.52.13.81 0 .22-.03.43-.08.65-.06.22-.15.45-.29.7-.14.25-.32.53-.56.83-.23.3-.52.65-.88 1.03l-4.17 4.55V18H21v-1.71h-5.95zM2 11v2h8v-2H2z"></path></g>
<g id="exposure-plus-1"><path d="M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z"></path></g>
<g id="exposure-plus-2"><path d="M16.05 16.29l2.86-3.07c.38-.39.72-.79 1.04-1.18.32-.39.59-.78.82-1.17.23-.39.41-.78.54-1.17.13-.39.19-.79.19-1.18 0-.53-.09-1.02-.27-1.46-.18-.44-.44-.81-.78-1.11-.34-.31-.77-.54-1.26-.71-.51-.16-1.08-.24-1.72-.24-.69 0-1.31.11-1.85.32-.54.21-1 .51-1.36.88-.37.37-.65.8-.84 1.3-.18.47-.27.97-.28 1.5h2.14c.01-.31.05-.6.13-.87.09-.29.23-.54.4-.75.18-.21.41-.37.68-.49.27-.12.6-.18.96-.18.31 0 .58.05.81.15.23.1.43.25.59.43.16.18.28.4.37.65.08.25.13.52.13.81 0 .22-.03.43-.08.65-.06.22-.15.45-.29.7-.14.25-.32.53-.56.83-.23.3-.52.65-.88 1.03l-4.17 4.55V18H22v-1.71h-5.95zM8 7H6v4H2v2h4v4h2v-4h4v-2H8V7z"></path></g>
<g id="exposure-zero"><path d="M16.14 12.5c0 1-.1 1.85-.3 2.55-.2.7-.48 1.27-.83 1.7-.36.44-.79.75-1.3.95-.51.2-1.07.3-1.7.3-.62 0-1.18-.1-1.69-.3-.51-.2-.95-.51-1.31-.95-.36-.44-.65-1.01-.85-1.7-.2-.7-.3-1.55-.3-2.55v-2.04c0-1 .1-1.85.3-2.55.2-.7.48-1.26.84-1.69.36-.43.8-.74 1.31-.93C10.81 5.1 11.38 5 12 5c.63 0 1.19.1 1.7.29.51.19.95.5 1.31.93.36.43.64.99.84 1.69.2.7.3 1.54.3 2.55v2.04zm-2.11-2.36c0-.64-.05-1.18-.13-1.62-.09-.44-.22-.79-.4-1.06-.17-.27-.39-.46-.64-.58-.25-.13-.54-.19-.86-.19-.32 0-.61.06-.86.18s-.47.31-.64.58c-.17.27-.31.62-.4 1.06s-.13.98-.13 1.62v2.67c0 .64.05 1.18.14 1.62.09.45.23.81.4 1.09s.39.48.64.61.54.19.87.19c.33 0 .62-.06.87-.19s.46-.33.63-.61c.17-.28.3-.64.39-1.09.09-.45.13-.99.13-1.62v-2.66z"></path></g>
<g id="filter"><path d="M15.96 10.29l-2.75 3.54-1.96-2.36L8.5 15h11l-3.54-4.71zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></g>
<g id="filter-1"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm11 10h2V5h-4v2h2v8zm7-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></g>
<g id="filter-2"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-4-4h-4v-2h2c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2h-4v2h4v2h-2c-1.1 0-2 .89-2 2v4h6v-2z"></path></g>
<g id="filter-3"><path d="M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-4v2h4v2h-2v2h2v2h-4v2h4c1.1 0 2-.89 2-2z"></path></g>
<g id="filter-4"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm12 10h2V5h-2v4h-2V5h-2v6h4v4zm6-14H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></g>
<g id="filter-5"><path d="M21 1H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm14 8v-2c0-1.11-.9-2-2-2h-2V7h4V5h-6v6h4v2h-4v2h4c1.1 0 2-.89 2-2z"></path></g>
<g id="filter-6"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-2c0-1.11-.9-2-2-2h-2V7h4V5h-4c-1.1 0-2 .89-2 2v6c0 1.11.9 2 2 2zm0-4h2v2h-2v-2z"></path></g>
<g id="filter-7"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2l4-8V5h-6v2h4l-4 8h2z"></path></g>
<g id="filter-8"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zm-8-2h2c1.1 0 2-.89 2-2v-1.5c0-.83-.67-1.5-1.5-1.5.83 0 1.5-.67 1.5-1.5V7c0-1.11-.9-2-2-2h-2c-1.1 0-2 .89-2 2v1.5c0 .83.67 1.5 1.5 1.5-.83 0-1.5.67-1.5 1.5V13c0 1.11.9 2 2 2zm0-8h2v2h-2V7zm0 4h2v2h-2v-2z"></path></g>
<g id="filter-9"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14zM15 5h-2c-1.1 0-2 .89-2 2v2c0 1.11.9 2 2 2h2v2h-4v2h4c1.1 0 2-.89 2-2V7c0-1.11-.9-2-2-2zm0 4h-2V7h2v2z"></path></g>
<g id="filter-9-plus"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm11 7V8c0-1.11-.9-2-2-2h-1c-1.1 0-2 .89-2 2v1c0 1.11.9 2 2 2h1v1H9v2h3c1.1 0 2-.89 2-2zm-3-3V8h1v1h-1zm10-8H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 8h-2V7h-2v2h-2v2h2v2h2v-2h2v6H7V3h14v6z"></path></g>
<g id="filter-b-and-w"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16l-7-8v8H5l7-8V5h7v14z"></path></g>
<g id="filter-center-focus"><path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="filter-drama"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.61 5.64 5.36 8.04 2.35 8.36 0 10.9 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4h2c0-2.76-1.86-5.08-4.4-5.78C8.61 6.88 10.2 6 12 6c3.03 0 5.5 2.47 5.5 5.5v.5H19c1.65 0 3 1.35 3 3s-1.35 3-3 3z"></path></g>
<g id="filter-frames"><path d="M20 4h-4l-4-4-4 4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H4V6h4.52l3.52-3.5L15.52 6H20v14zM18 8H6v10h12"></path></g>
<g id="filter-hdr"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"></path></g>
<g id="filter-none"><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></g>
<g id="filter-tilt-shift"><path d="M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zm7.32.19C16.84 3.05 15.01 2.25 13 2.05v2.02c1.46.18 2.79.76 3.9 1.62l1.42-1.43zM19.93 11h2.02c-.2-2.01-1-3.84-2.21-5.32L18.31 7.1c.86 1.11 1.44 2.44 1.62 3.9zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zM15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm3.31 4.9l1.43 1.43c1.21-1.48 2.01-3.32 2.21-5.32h-2.02c-.18 1.45-.76 2.78-1.62 3.89zM13 19.93v2.02c2.01-.2 3.84-1 5.32-2.21l-1.43-1.43c-1.1.86-2.43 1.44-3.89 1.62zm-7.32-.19C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43z"></path></g>
<g id="filter-vintage"><path d="M18.7 12.4c-.28-.16-.57-.29-.86-.4.29-.11.58-.24.86-.4 1.92-1.11 2.99-3.12 3-5.19-1.79-1.03-4.07-1.11-6 0-.28.16-.54.35-.78.54.05-.31.08-.63.08-.95 0-2.22-1.21-4.15-3-5.19C10.21 1.85 9 3.78 9 6c0 .32.03.64.08.95-.24-.2-.5-.39-.78-.55-1.92-1.11-4.2-1.03-6 0 0 2.07 1.07 4.08 3 5.19.28.16.57.29.86.4-.29.11-.58.24-.86.4-1.92 1.11-2.99 3.12-3 5.19 1.79 1.03 4.07 1.11 6 0 .28-.16.54-.35.78-.54-.05.32-.08.64-.08.96 0 2.22 1.21 4.15 3 5.19 1.79-1.04 3-2.97 3-5.19 0-.32-.03-.64-.08-.95.24.2.5.38.78.54 1.92 1.11 4.2 1.03 6 0-.01-2.07-1.08-4.08-3-5.19zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></g>
<g id="flare"><path d="M7 11H1v2h6v-2zm2.17-3.24L7.05 5.64 5.64 7.05l2.12 2.12 1.41-1.41zM13 1h-2v6h2V1zm5.36 6.05l-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12zM17 11v2h6v-2h-6zm-5-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm2.83 7.24l2.12 2.12 1.41-1.41-2.12-2.12-1.41 1.41zm-9.19.71l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12zM11 23h2v-6h-2v6z"></path></g>
<g id="flash-auto"><path d="M3 2v12h3v9l7-12H9l4-9H3zm16 0h-2l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L19 2zm-2.15 5.65L18 4l1.15 3.65h-2.3z"></path></g>
<g id="flash-off"><path d="M3.27 3L2 4.27l5 5V13h3v9l3.58-6.14L17.73 20 19 18.73 3.27 3zM17 10h-4l4-8H7v2.18l8.46 8.46L17 10z"></path></g>
<g id="flash-on"><path d="M7 2v11h3v9l7-12h-4l4-8z"></path></g>
<g id="flip"><path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"></path></g>
<g id="gradient"><path d="M11 9h2v2h-2zm-2 2h2v2H9zm4 0h2v2h-2zm2-2h2v2h-2zM7 9h2v2H7zm12-6H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14v6z"></path></g>
<g id="grain"><path d="M10 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-4 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="grid-off"><path d="M8 4v1.45l2 2V4h4v4h-3.45l2 2H14v1.45l2 2V10h4v4h-3.45l2 2H20v1.45l2 2V4c0-1.1-.9-2-2-2H4.55l2 2H8zm8 0h4v4h-4V4zM1.27 1.27L0 2.55l2 2V20c0 1.1.9 2 2 2h15.46l2 2 1.27-1.27L1.27 1.27zM10 12.55L11.45 14H10v-1.45zm-6-6L5.45 8H4V6.55zM8 20H4v-4h4v4zm0-6H4v-4h3.45l.55.55V14zm6 6h-4v-4h3.45l.55.54V20zm2 0v-1.46L17.46 20H16z"></path></g>
<g id="grid-on"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path></g>
<g id="hdr-off"><path d="M17.5 15v-2h1.1l.9 2H21l-.9-2.1c.5-.2.9-.8.9-1.4v-1c0-.8-.7-1.5-1.5-1.5H16v4.9l1.1 1.1h.4zm0-4.5h2v1h-2v-1zm-4.5 0v.4l1.5 1.5v-1.9c0-.8-.7-1.5-1.5-1.5h-1.9l1.5 1.5h.4zm-3.5-1l-7-7-1.1 1L6.9 9h-.4v2h-2V9H3v6h1.5v-2.5h2V15H8v-4.9l1.5 1.5V15h3.4l7.6 7.6 1.1-1.1-12.1-12z"></path></g>
<g id="hdr-on"><path d="M21 11.5v-1c0-.8-.7-1.5-1.5-1.5H16v6h1.5v-2h1.1l.9 2H21l-.9-2.1c.5-.3.9-.8.9-1.4zm-1.5 0h-2v-1h2v1zm-13-.5h-2V9H3v6h1.5v-2.5h2V15H8V9H6.5v2zM13 9H9.5v6H13c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5zm0 4.5h-2v-3h2v3z"></path></g>
<g id="hdr-strong"><path d="M17 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="hdr-weak"><path d="M5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm12-2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></g>
<g id="healing"><path d="M17.73 12.02l3.98-3.98c.39-.39.39-1.02 0-1.41l-4.34-4.34c-.39-.39-1.02-.39-1.41 0l-3.98 3.98L8 2.29C7.8 2.1 7.55 2 7.29 2c-.25 0-.51.1-.7.29L2.25 6.63c-.39.39-.39 1.02 0 1.41l3.98 3.98L2.25 16c-.39.39-.39 1.02 0 1.41l4.34 4.34c.39.39 1.02.39 1.41 0l3.98-3.98 3.98 3.98c.2.2.45.29.71.29.26 0 .51-.1.71-.29l4.34-4.34c.39-.39.39-1.02 0-1.41l-3.99-3.98zM12 9c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4.71 1.96L3.66 7.34l3.63-3.63 3.62 3.62-3.62 3.63zM10 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2.66 9.34l-3.63-3.62 3.63-3.63 3.62 3.62-3.62 3.63z"></path></g>
<g id="image"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
<g id="image-aspect-ratio"><path d="M16 10h-2v2h2v-2zm0 4h-2v2h2v-2zm-8-4H6v2h2v-2zm4 0h-2v2h2v-2zm8-6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"></path></g>
<g id="iso"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5.5 7.5h2v-2H9v2h2V9H9v2H7.5V9h-2V7.5zM19 19H5L19 5v14zm-2-2v-1.5h-5V17h5z"></path></g>
<g id="landscape"><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"></path></g>
<g id="leak-add"><path d="M6 3H3v3c1.66 0 3-1.34 3-3zm8 0h-2c0 4.97-4.03 9-9 9v2c6.08 0 11-4.93 11-11zm-4 0H8c0 2.76-2.24 5-5 5v2c3.87 0 7-3.13 7-7zm0 18h2c0-4.97 4.03-9 9-9v-2c-6.07 0-11 4.93-11 11zm8 0h3v-3c-1.66 0-3 1.34-3 3zm-4 0h2c0-2.76 2.24-5 5-5v-2c-3.87 0-7 3.13-7 7z"></path></g>
<g id="leak-remove"><path d="M10 3H8c0 .37-.04.72-.12 1.06l1.59 1.59C9.81 4.84 10 3.94 10 3zM3 4.27l2.84 2.84C5.03 7.67 4.06 8 3 8v2c1.61 0 3.09-.55 4.27-1.46L8.7 9.97C7.14 11.24 5.16 12 3 12v2c2.71 0 5.19-.99 7.11-2.62l2.5 2.5C10.99 15.81 10 18.29 10 21h2c0-2.16.76-4.14 2.03-5.69l1.43 1.43C14.55 17.91 14 19.39 14 21h2c0-1.06.33-2.03.89-2.84L19.73 21 21 19.73 4.27 3 3 4.27zM14 3h-2c0 1.5-.37 2.91-1.02 4.16l1.46 1.46C13.42 6.98 14 5.06 14 3zm5.94 13.12c.34-.08.69-.12 1.06-.12v-2c-.94 0-1.84.19-2.66.52l1.6 1.6zm-4.56-4.56l1.46 1.46C18.09 12.37 19.5 12 21 12v-2c-2.06 0-3.98.58-5.62 1.56z"></path></g>
<g id="lens"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path></g>
<g id="linked-camera"><circle cx="12" cy="14" r="3.2"></circle><path d="M16 3.33c2.58 0 4.67 2.09 4.67 4.67H22c0-3.31-2.69-6-6-6v1.33M16 6c1.11 0 2 .89 2 2h1.33c0-1.84-1.49-3.33-3.33-3.33V6"></path><path d="M17 9c0-1.11-.89-2-2-2V4H9L7.17 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9h-5zm-5 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></g>
<g id="looks"><path d="M12 10c-3.86 0-7 3.14-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.86-3.14-7-7-7zm0-4C5.93 6 1 10.93 1 17h2c0-4.96 4.04-9 9-9s9 4.04 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="looks-3"><path d="M19.01 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 7.5c0 .83-.67 1.5-1.5 1.5.83 0 1.5.67 1.5 1.5V15c0 1.11-.9 2-2 2h-4v-2h4v-2h-2v-2h2V9h-4V7h4c1.1 0 2 .89 2 2v1.5z"></path></g>
<g id="looks-4"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 14h-2v-4H9V7h2v4h2V7h2v10z"></path></g>
<g id="looks-5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h2c1.1 0 2 .89 2 2v2c0 1.11-.9 2-2 2H9v-2h4v-2H9V7h6v2z"></path></g>
<g id="looks-6"><path d="M11 15h2v-2h-2v2zm8-12H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h2c1.1 0 2 .89 2 2v2c0 1.11-.9 2-2 2h-2c-1.1 0-2-.89-2-2V9c0-1.11.9-2 2-2h4v2z"></path></g>
<g id="looks-one"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"></path></g>
<g id="looks-two"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.11-.9 2-2 2h-2v2h4v2H9v-4c0-1.11.9-2 2-2h2V9H9V7h4c1.1 0 2 .89 2 2v2z"></path></g>
<g id="loupe"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10h8c1.1 0 2-.9 2-2v-8c0-5.51-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="monochrome-photos"><path d="M20 5h-3.2L15 3H9L7.2 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14h-8v-1c-2.8 0-5-2.2-5-5s2.2-5 5-5V7h8v12zm-3-6c0-2.8-2.2-5-5-5v1.8c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2V18c2.8 0 5-2.2 5-5zm-8.2 0c0 1.8 1.4 3.2 3.2 3.2V9.8c-1.8 0-3.2 1.4-3.2 3.2z"></path></g>
<g id="movie-creation"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path></g>
<g id="movie-filter"><path d="M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z"></path></g>
<g id="music-note"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></g>
<g id="nature"><path d="M13 16.12c3.47-.41 6.17-3.36 6.17-6.95 0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.89V20H5v2h14v-2h-6v-3.88z"></path></g>
<g id="nature-people"><path d="M22.17 9.17c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.89V20H6v-3h1v-4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v4h1v5h16v-2h-3v-3.88c3.47-.41 6.17-3.36 6.17-6.95zM4.5 11c.83 0 1.5-.67 1.5-1.5S5.33 8 4.5 8 3 8.67 3 9.5 3.67 11 4.5 11z"></path></g>
<g id="navigate-before"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="navigate-next"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="palette"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="panorama"><path d="M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z"></path></g>
<g id="panorama-fish-eye"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="panorama-horizontal"><path d="M20 6.54v10.91c-2.6-.77-5.28-1.16-8-1.16-2.72 0-5.4.39-8 1.16V6.54c2.6.77 5.28 1.16 8 1.16 2.72.01 5.4-.38 8-1.16M21.43 4c-.1 0-.2.02-.31.06C18.18 5.16 15.09 5.7 12 5.7c-3.09 0-6.18-.55-9.12-1.64-.11-.04-.22-.06-.31-.06-.34 0-.57.23-.57.63v14.75c0 .39.23.62.57.62.1 0 .2-.02.31-.06 2.94-1.1 6.03-1.64 9.12-1.64 3.09 0 6.18.55 9.12 1.64.11.04.21.06.31.06.33 0 .57-.23.57-.63V4.63c0-.4-.24-.63-.57-.63z"></path></g>
<g id="panorama-vertical"><path d="M19.94 21.12c-1.1-2.94-1.64-6.03-1.64-9.12 0-3.09.55-6.18 1.64-9.12.04-.11.06-.22.06-.31 0-.34-.23-.57-.63-.57H4.63c-.4 0-.63.23-.63.57 0 .1.02.2.06.31C5.16 5.82 5.71 8.91 5.71 12c0 3.09-.55 6.18-1.64 9.12-.05.11-.07.22-.07.31 0 .33.23.57.63.57h14.75c.39 0 .63-.24.63-.57-.01-.1-.03-.2-.07-.31zM6.54 20c.77-2.6 1.16-5.28 1.16-8 0-2.72-.39-5.4-1.16-8h10.91c-.77 2.6-1.16 5.28-1.16 8 0 2.72.39 5.4 1.16 8H6.54z"></path></g>
<g id="panorama-wide-angle"><path d="M12 6c2.45 0 4.71.2 7.29.64.47 1.78.71 3.58.71 5.36 0 1.78-.24 3.58-.71 5.36-2.58.44-4.84.64-7.29.64s-4.71-.2-7.29-.64C4.24 15.58 4 13.78 4 12c0-1.78.24-3.58.71-5.36C7.29 6.2 9.55 6 12 6m0-2c-2.73 0-5.22.24-7.95.72l-.93.16-.25.9C2.29 7.85 2 9.93 2 12s.29 4.15.87 6.22l.25.89.93.16c2.73.49 5.22.73 7.95.73s5.22-.24 7.95-.72l.93-.16.25-.89c.58-2.08.87-4.16.87-6.23s-.29-4.15-.87-6.22l-.25-.89-.93-.16C17.22 4.24 14.73 4 12 4z"></path></g>
<g id="photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
<g id="photo-album"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm0 15l3-3.86 2.14 2.58 3-3.86L18 19H6z"></path></g>
<g id="photo-camera"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></g>
<g id="photo-filter"><path d="M19.02 10v9H5V5h9V3H5.02c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2zM17 10l.94-2.06L20 7l-2.06-.94L17 4l-.94 2.06L14 7l2.06.94zm-3.75.75L12 8l-1.25 2.75L8 12l2.75 1.25L12 16l1.25-2.75L16 12z"></path></g>
<g id="photo-library"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path></g>
<g id="photo-size-select-actual"><path d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"></path></g>
<g id="photo-size-select-large"><path d="M21 15h2v2h-2v-2zm0-4h2v2h-2v-2zm2 8h-2v2c1 0 2-1 2-2zM13 3h2v2h-2V3zm8 4h2v2h-2V7zm0-4v2h2c0-1-1-2-2-2zM1 7h2v2H1V7zm16-4h2v2h-2V3zm0 16h2v2h-2v-2zM3 3C2 3 1 4 1 5h2V3zm6 0h2v2H9V3zM5 3h2v2H5V3zm-4 8v8c0 1.1.9 2 2 2h12V11H1zm2 8l2.5-3.21 1.79 2.15 2.5-3.22L13 19H3z"></path></g>
<g id="photo-size-select-small"><path d="M23 15h-2v2h2v-2zm0-4h-2v2h2v-2zm0 8h-2v2c1 0 2-1 2-2zM15 3h-2v2h2V3zm8 4h-2v2h2V7zm-2-4v2h2c0-1-1-2-2-2zM3 21h8v-6H1v4c0 1.1.9 2 2 2zM3 7H1v2h2V7zm12 12h-2v2h2v-2zm4-16h-2v2h2V3zm0 16h-2v2h2v-2zM3 3C2 3 1 4 1 5h2V3zm0 8H1v2h2v-2zm8-8H9v2h2V3zM7 3H5v2h2V3z"></path></g>
<g id="picture-as-pdf"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"></path></g>
<g id="portrait"><path d="M12 12.25c1.24 0 2.25-1.01 2.25-2.25S13.24 7.75 12 7.75 9.75 8.76 9.75 10s1.01 2.25 2.25 2.25zm4.5 4c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9v-.75zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"></path></g>
<g id="remove-red-eye"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="rotate-90-degrees-ccw"><path d="M7.34 6.41L.86 12.9l6.49 6.48 6.49-6.48-6.5-6.49zM3.69 12.9l3.66-3.66L11 12.9l-3.66 3.66-3.65-3.66zm15.67-6.26C17.61 4.88 15.3 4 13 4V.76L8.76 5 13 9.24V6c1.79 0 3.58.68 4.95 2.05 2.73 2.73 2.73 7.17 0 9.9C16.58 19.32 14.79 20 13 20c-.97 0-1.94-.21-2.84-.61l-1.49 1.49C10.02 21.62 11.51 22 13 22c2.3 0 4.61-.88 6.36-2.64 3.52-3.51 3.52-9.21 0-12.72z"></path></g>
<g id="rotate-left"><path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"></path></g>
<g id="rotate-right"><path d="M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"></path></g>
<g id="slideshow"><path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"></path></g>
<g id="straighten"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"></path></g>
<g id="style"><path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"></path></g>
<g id="switch-camera"><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"></path></g>
<g id="switch-video"><path d="M18 9.5V6c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-3.5l4 4v-13l-4 4zm-5 6V13H7v2.5L3.5 12 7 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"></path></g>
<g id="tag-faces"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>
<g id="texture"><path d="M19.51 3.08L3.08 19.51c.09.34.27.65.51.9.25.24.56.42.9.51L20.93 4.49c-.19-.69-.73-1.23-1.42-1.41zM11.88 3L3 11.88v2.83L14.71 3h-2.83zM5 3c-1.1 0-2 .9-2 2v2l4-4H5zm14 18c.55 0 1.05-.22 1.41-.59.37-.36.59-.86.59-1.41v-2l-4 4h2zm-9.71 0h2.83L21 12.12V9.29L9.29 21z"></path></g>
<g id="timelapse"><path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="timer"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="timer-10"><path d="M0 7.72V9.4l3-1V18h2V6h-.25L0 7.72zm23.78 6.65c-.14-.28-.35-.53-.63-.74-.28-.21-.61-.39-1.01-.53s-.85-.27-1.35-.38c-.35-.07-.64-.15-.87-.23-.23-.08-.41-.16-.55-.25-.14-.09-.23-.19-.28-.3-.05-.11-.08-.24-.08-.39 0-.14.03-.28.09-.41.06-.13.15-.25.27-.34.12-.1.27-.18.45-.24s.4-.09.64-.09c.25 0 .47.04.66.11.19.07.35.17.48.29.13.12.22.26.29.42.06.16.1.32.1.49h1.95c0-.39-.08-.75-.24-1.09-.16-.34-.39-.63-.69-.88-.3-.25-.66-.44-1.09-.59C21.49 9.07 21 9 20.46 9c-.51 0-.98.07-1.39.21-.41.14-.77.33-1.06.57-.29.24-.51.52-.67.84-.16.32-.23.65-.23 1.01s.08.69.23.96c.15.28.36.52.64.73.27.21.6.38.98.53.38.14.81.26 1.27.36.39.08.71.17.95.26s.43.19.57.29c.13.1.22.22.27.34.05.12.07.25.07.39 0 .32-.13.57-.4.77-.27.2-.66.29-1.17.29-.22 0-.43-.02-.64-.08-.21-.05-.4-.13-.56-.24-.17-.11-.3-.26-.41-.44-.11-.18-.17-.41-.18-.67h-1.89c0 .36.08.71.24 1.05.16.34.39.65.7.93.31.27.69.49 1.15.66.46.17.98.25 1.58.25.53 0 1.01-.06 1.44-.19.43-.13.8-.31 1.11-.54.31-.23.54-.51.71-.83.17-.32.25-.67.25-1.06-.02-.4-.09-.74-.24-1.02zm-9.96-7.32c-.34-.4-.75-.7-1.23-.88-.47-.18-1.01-.27-1.59-.27-.58 0-1.11.09-1.59.27-.48.18-.89.47-1.23.88-.34.41-.6.93-.79 1.59-.18.65-.28 1.45-.28 2.39v1.92c0 .94.09 1.74.28 2.39.19.66.45 1.19.8 1.6.34.41.75.71 1.23.89.48.18 1.01.28 1.59.28.59 0 1.12-.09 1.59-.28.48-.18.88-.48 1.22-.89.34-.41.6-.94.78-1.6.18-.65.28-1.45.28-2.39v-1.92c0-.94-.09-1.74-.28-2.39-.18-.66-.44-1.19-.78-1.59zm-.92 6.17c0 .6-.04 1.11-.12 1.53-.08.42-.2.76-.36 1.02-.16.26-.36.45-.59.57-.23.12-.51.18-.82.18-.3 0-.58-.06-.82-.18s-.44-.31-.6-.57c-.16-.26-.29-.6-.38-1.02-.09-.42-.13-.93-.13-1.53v-2.5c0-.6.04-1.11.13-1.52.09-.41.21-.74.38-1 .16-.25.36-.43.6-.55.24-.11.51-.17.81-.17.31 0 .58.06.81.17.24.11.44.29.6.55.16.25.29.58.37.99.08.41.13.92.13 1.52v2.51z"></path></g>
<g id="timer-3"><path d="M11.61 12.97c-.16-.24-.36-.46-.62-.65-.25-.19-.56-.35-.93-.48.3-.14.57-.3.8-.5.23-.2.42-.41.57-.64.15-.23.27-.46.34-.71.08-.24.11-.49.11-.73 0-.55-.09-1.04-.28-1.46-.18-.42-.44-.77-.78-1.06-.33-.28-.73-.5-1.2-.64-.45-.13-.97-.2-1.53-.2-.55 0-1.06.08-1.52.24-.47.17-.87.4-1.2.69-.33.29-.6.63-.78 1.03-.2.39-.29.83-.29 1.29h1.98c0-.26.05-.49.14-.69.09-.2.22-.38.38-.52.17-.14.36-.25.58-.33.22-.08.46-.12.73-.12.61 0 1.06.16 1.36.47.3.31.44.75.44 1.32 0 .27-.04.52-.12.74-.08.22-.21.41-.38.57-.17.16-.38.28-.63.37-.25.09-.55.13-.89.13H6.72v1.57H7.9c.34 0 .64.04.91.11.27.08.5.19.69.35.19.16.34.36.44.61.1.24.16.54.16.87 0 .62-.18 1.09-.53 1.42-.35.33-.84.49-1.45.49-.29 0-.56-.04-.8-.13-.24-.08-.44-.2-.61-.36-.17-.16-.3-.34-.39-.56-.09-.22-.14-.46-.14-.72H4.19c0 .55.11 1.03.32 1.45.21.42.5.77.86 1.05s.77.49 1.24.63.96.21 1.48.21c.57 0 1.09-.08 1.58-.23.49-.15.91-.38 1.26-.68.36-.3.64-.66.84-1.1.2-.43.3-.93.3-1.48 0-.29-.04-.58-.11-.86-.08-.25-.19-.51-.35-.76zm9.26 1.4c-.14-.28-.35-.53-.63-.74-.28-.21-.61-.39-1.01-.53s-.85-.27-1.35-.38c-.35-.07-.64-.15-.87-.23-.23-.08-.41-.16-.55-.25-.14-.09-.23-.19-.28-.3-.05-.11-.08-.24-.08-.39s.03-.28.09-.41c.06-.13.15-.25.27-.34.12-.1.27-.18.45-.24s.4-.09.64-.09c.25 0 .47.04.66.11.19.07.35.17.48.29.13.12.22.26.29.42.06.16.1.32.1.49h1.95c0-.39-.08-.75-.24-1.09-.16-.34-.39-.63-.69-.88-.3-.25-.66-.44-1.09-.59-.43-.15-.92-.22-1.46-.22-.51 0-.98.07-1.39.21-.41.14-.77.33-1.06.57-.29.24-.51.52-.67.84-.16.32-.23.65-.23 1.01s.08.68.23.96c.15.28.37.52.64.73.27.21.6.38.98.53.38.14.81.26 1.27.36.39.08.71.17.95.26s.43.19.57.29c.13.1.22.22.27.34.05.12.07.25.07.39 0 .32-.13.57-.4.77-.27.2-.66.29-1.17.29-.22 0-.43-.02-.64-.08-.21-.05-.4-.13-.56-.24-.17-.11-.3-.26-.41-.44-.11-.18-.17-.41-.18-.67h-1.89c0 .36.08.71.24 1.05.16.34.39.65.7.93.31.27.69.49 1.15.66.46.17.98.25 1.58.25.53 0 1.01-.06 1.44-.19.43-.13.8-.31 1.11-.54.31-.23.54-.51.71-.83.17-.32.25-.67.25-1.06-.02-.4-.09-.74-.24-1.02z"></path></g>
<g id="timer-off"><path d="M19.04 4.55l-1.42 1.42C16.07 4.74 14.12 4 12 4c-1.83 0-3.53.55-4.95 1.48l1.46 1.46C9.53 6.35 10.73 6 12 6c3.87 0 7 3.13 7 7 0 1.27-.35 2.47-.94 3.49l1.45 1.45C20.45 16.53 21 14.83 21 13c0-2.12-.74-4.07-1.97-5.61l1.42-1.42-1.41-1.42zM15 1H9v2h6V1zm-4 8.44l2 2V8h-2v1.44zM3.02 4L1.75 5.27 4.5 8.03C3.55 9.45 3 11.16 3 13c0 4.97 4.02 9 9 9 1.84 0 3.55-.55 4.98-1.5l2.5 2.5 1.27-1.27-7.71-7.71L3.02 4zM12 20c-3.87 0-7-3.13-7-7 0-1.28.35-2.48.95-3.52l9.56 9.56c-1.03.61-2.23.96-3.51.96z"></path></g>
<g id="tonality"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"></path></g>
<g id="transform"><path d="M22 18v-2H8V4h2L7 1 4 4h2v2H2v2h4v8c0 1.1.9 2 2 2h8v2h-2l3 3 3-3h-2v-2h4zM10 8h6v6h2V8c0-1.1-.9-2-2-2h-6v2z"></path></g>
<g id="tune"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></g>
<g id="view-comfy"><path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4zm5 9h4v-4h-4v4zM3 19h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zm5 0h4v-4h-4v4zm0-14v4h4V5h-4z"></path></g>
<g id="view-compact"><path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"></path></g>
<g id="vignette"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15c-4.42 0-8-2.69-8-6s3.58-6 8-6 8 2.69 8 6-3.58 6-8 6z"></path></g>
<g id="wb-auto"><path d="M6.85 12.65h2.3L8 9l-1.15 3.65zM22 7l-1.2 6.29L19.3 7h-1.6l-1.49 6.29L15 7h-.76C12.77 5.17 10.53 4 8 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.13 0 5.84-1.81 7.15-4.43l.1.43H17l1.5-6.1L20 16h1.75l2.05-9H22zm-11.7 9l-.7-2H6.4l-.7 2H3.8L7 7h2l3.2 9h-1.9z"></path></g>
<g id="wb-cloudy"><path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"></path></g>
<g id="wb-incandescent"><path d="M3.55 18.54l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM11 22.45h2V19.5h-2v2.95zM4 10.5H1v2h3v-2zm11-4.19V1.5H9v4.81C7.21 7.35 6 9.28 6 11.5c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.22-1.21-4.15-3-5.19zm5 4.19v2h3v-2h-3zm-2.76 7.66l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4z"></path></g>
<g id="wb-iridescent"><path d="M5 14.5h14v-6H5v6zM11 .55V3.5h2V.55h-2zm8.04 2.5l-1.79 1.79 1.41 1.41 1.8-1.79-1.42-1.41zM13 22.45V19.5h-2v2.95h2zm7.45-3.91l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM3.55 4.46l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zm1.41 15.49l1.79-1.8-1.41-1.41-1.79 1.79 1.41 1.42z"></path></g>
<g id="wb-sunny"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(ni.content);window.customElements.define("tangy-qr",class extends n.a{static get template(){return n.b`

      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
        :host {
          display: block;
        }
        
        #canvas {
          width:100%;
          border-color: black;
          border-style: solid;
          border-width: 0px;
        }
        :host([just-found-data]) #canvas {
          border-color: red;
        }
        :host([hide-output]) #output {
          display:none;
        }
        label {
          display: block;
          font-size: 1.2em;
          margin-bottom: 15px;
          color: var(--primary-text-color);
          margin-bottom: 15px;
        }
        #scan-icon, #container, #canvas {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        paper-card {
          margin-bottom: 15px;
        }
      </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
    
        <label id="label"></label>
        <paper-card>
            <div class="card-content">
            <div id="container">
                <iron-icon id="scan-icon" icon="image:center-focus-weak"></iron-icon>
            </div>
            <paper-textarea value="[[value]]" placeholder="[[statusMessage]]" id="output" readonly></paper-textarea>
            </div>
            <div class="card-actions">
            <template is="dom-if" if="{{notScanning}}">
                <paper-button id="start-scan-button" on-click="startScanning">{{t.scan}}</paper-button>
            </template>
            <template is="dom-if" if="{{isScanning}}">
                <paper-button id="stop-scan-button" on-click="stopScanning">{{t.cancel}}</paper-button>
            </template>
            </div>
        </paper-card>
        <label class="hint-text"></label>
        <div id="error-text"></div>
      </div>
    </div>
    `}static get properties(){return{name:{type:String,value:""},value:{type:String,value:"",reflectToAttribute:!0},justFoundData:{type:Boolean,value:!1,reflectToAttribute:!0},isScanning:{type:Boolean,value:!1,reflectToAttribute:!0},notScanning:{type:Boolean,value:!0,reflectToAttribute:!0},required:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},statusMessage:{type:String,value:"",reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},hideOutput:{type:Boolean,value:!1,reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.t={scan:Object(h.a)("scan"),scanning:Object(h.a)("scanning"),cancel:Object(h.a)("cancel")},this.shadowRoot.querySelector(".hint-text").innerHTML=this.hasAttribute("hint-text")?this.getAttribute("hint-text"):"",this.shadowRoot.querySelector("#label").innerHTML=this.hasAttribute("label")?this.getAttribute("label"):"",this.shadowRoot.querySelector("#qnum-number").innerHTML=this.hasAttribute("question-number")?`<label>${this.getAttribute("question-number")}</label>`:""}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}stopScanning(){this.statusMessage="",this.notScanning=!0,this.isScanning=!1,this.dispatchEvent(new CustomEvent("cancel"))}startScanning(){this.value="",this.statusMessage=`${this.t.scanning}...`,this.notScanning=!1,this.isScanning=!0,this.$.container.innerHTML='\n      <canvas id="canvas"></canvas>\n    ';var e=document.createElement("video"),t=this.shadowRoot.querySelector("canvas"),i=t.getContext("2d");function n(e,t,n){i.beginPath(),i.moveTo(e.x,e.y),i.lineTo(t.x,t.y),i.lineWidth=4,i.strokeStyle=n,i.stroke()}navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then((function(t){e.srcObject=t,e.setAttribute("playsinline",!0),e.play(),requestAnimationFrame(a)}));const r=this;async function a(){if(r.value)return e.srcObject.getTracks()[0].stop();if(e.readyState===e.HAVE_ENOUGH_DATA){t.height=e.videoHeight,t.width=e.videoWidth,i.drawImage(e,0,0,t.width,t.height);const a=document.createElement("img");a.setAttribute("src",t.toDataURL());const s=new qt;try{const e=await s.decodeFromImageElement(a);n(e.resultPoints[0],e.resultPoints[1],"#FF3B58"),n(e.resultPoints[1],e.resultPoints[2],"#FF3B58"),n(e.resultPoints[2],e.resultPoints[3],"#FF3B58"),n(e.resultPoints[3],e.resultPoints[0],"#FF3B58"),r.value!==e.text&&(r.value=e.text,r.stopScanning(),r.dispatchEvent(new Event("change")))}catch(e){}}r.isScanning&&requestAnimationFrame(a)}this.dispatchEvent(new CustomEvent("scanning"))}validate(){return this.required&&!this.value?(this.invalid=!0,!1):(this.invalid=!1,!0)}});class ri extends n.a{static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <style>
        :host {
          display: block;
        }
        
        #canvas {
          width:100%;
          border-color: black;
          border-style: solid;
          border-width: 0px;
        }
        :host([just-found-data]) #canvas {
          border-color: red;
        }
        :host([hide-output]) #output {
          display:none;
        }
        label {
          display: block;
          font-size: 1.2em;
          margin-bottom: 15px;
          color: var(--primary-text-color);
          margin-bottom: 15px;
        }
        #scan-icon, #container, #canvans {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
        paper-button.pressed {
          background-color: var(--primary-color) !important;
        }
        #statusMessage {
          margin-top: 1em;
          font-weight: bold;
          color: red;
        }
        paper-card {
          margin-bottom: 10px;
        }
      </style>
      <div class="flex-container m-y-25">
        <div id="qnum-number"></div>
        <div id="qnum-content">
          <paper-card>
            <div class="card-content">
              <div id="container">
                <span id="prompt"></span>
                <div id="statusMessage"> [[statusMessage]] </div>
                <label class="hint-text">
                </label>
              </div>
            </div>
            <div class="card-actions">
                <paper-button id="consentYesButton" on-click="clickedConsentYes">{{t.consent_yes}}</paper-button>
                <paper-button id="consentNoButton" on-click="clickedConsentNo">{{t.consent_no}}</paper-button>
            </div>
          </paper-card>
          <div id="error-text"></div>
        </div>
      </div>
  `}static get is(){return"tangy-consent"}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},value:{type:String,value:"",reflectToAttribute:!0,observer:"onValueChange"},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},required:{type:Boolean,value:!1,reflectToAttribute:!0},prompt:{type:String,value:"Does the child consent?",observer:"onPromptChange",reflectToAttribute:!0},invalid:{type:Boolean,value:!1,observer:"onInvalidChange",reflectToAttribute:!0},hintText:{type:String,value:"",observer:"onHintTextChange",reflectToAttribute:!0},errorText:{type:String,value:"",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.t={consent:Object(h.a)("Does the child consent?"),consent_yes:Object(h.a)("yes, continue"),consent_no:Object(h.a)("no, stop"),message_yes:Object(h.a)("You marked Yes"),message_no:Object(h.a)("You marked No")},this.shadowRoot.querySelector("#qnum-number").innerHTML=this.hasAttribute("question-number")?`<label>${this.getAttribute("question-number")}</label>`:""}onHintTextChange(e){this.shadowRoot.querySelector(".hint-text").innerHTML=e||""}onPromptChange(e){this.shadowRoot.querySelector("#prompt").innerHTML=e||""}onInvalidChange(e){this.shadowRoot.querySelector("#error-text").innerHTML=this.invalid?`<iron-icon icon="error"></iron-icon> <div> ${this.hasAttribute("error-text")?this.getAttribute("error-text"):""} </div>`:""}clickedConsentYes(){this.value="yes"}clickedConsentNo(){this.value="no"}inputPressed(){this.disabled||(""==this.value?this.value="on":this.value="")}onValueChange(e){switch([].slice.call(this.shadowRoot.querySelectorAll("paper-button")).forEach(e=>e.classList.remove("pressed")),e){case"yes":this.statusMessage=this.t.message_yes,this.$.consentYesButton.classList.add("pressed");break;case"no":this.statusMessage=this.t.message_no,this.$.consentNoButton.classList.add("pressed"),this.dispatchEvent(new CustomEvent("TANGY_INPUT_CONSENT_NO",{bubbles:!0}))}}validate(){return this.required&&!this.value?(this.setAttribute("invalid",""),!1):(this.removeAttribute("invalid"),!0)}}window.customElements.define(ri.is,ri);class ai extends n.a{static get template(){return n.b`
    <style include="tangy-element-styles"></style>
    <style include="tangy-common-styles"></style>
    <style include="mdc-select-style"></style>
    <style>
      :host {
        --iron-icon-width: 32px;
        --iron-icon-height: 32px;
      }
      .partial-date-select {
        background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E);
        background-repeat: no-repeat;
        background-position: right 10px center;
        border-bottom: 1px solid black;
      }
      .partial-date-format {
        background-image: none;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .partial-date-float {
        /*float:left;*/
        margin-right:15px;
      }
      .partial-date-headings {
        color: black;
        font-size: smaller;
        font-weight: normal;
      }
      #errorText {
        padding: 10px 10px 10px 0px;
        font-size: medium;
        font-weight: bold;
        color: var(--error-color);
      }
      :host([invalid]) {
        border: none;
      }
    </style>
    <div class="flex-container m-y-25">
      <div id="qnum-number"></div>
      <div id="qnum-content">
        <div id="container"></div>
      </div>
    </div>
    `}static get is(){return"tangy-partial-date"}static get properties(){return{name:{type:String,value:""},value:{type:String,value:"",reflectToAttribute:!0,observer:"render"},hintText:{type:String,value:"",reflectToAttribute:!0},required:{type:Boolean,value:!1},disabled:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"render"},label:{type:String,value:"",reflectToAttribute:!0},hidden:{type:Boolean,value:!1},invalid:{type:Boolean,value:!1,observer:"render",reflectToAttribute:!0},incomplete:{type:Boolean,value:!0},minYear:{type:Number,value:0,observer:"render",reflectToAttribute:!0},maxYear:{type:Number,value:0,observer:"render",reflectToAttribute:!0},allowUnknownDay:{type:Boolean,observer:"render",reflectToAttribute:!0},allowUnknownMonth:{type:Boolean,observer:"render",reflectToAttribute:!0},allowUnknownYear:{type:Boolean,observer:"render",reflectToAttribute:!0},numericMonth:{type:Boolean,value:!1,reflectToAttribute:!0},disallowFutureDate:{type:Boolean,observer:"render",reflectToAttribute:!0},showTodayButton:{type:Boolean,observer:"render",reflectToAttribute:!0},errorText:{type:String,value:"",observer:"render"},missingDateErrorText:{type:String,value:"",observer:"render",reflectToAttribute:!0},invalidDateErrorText:{type:String,value:"",observer:"render",reflectToAttribute:!0},futureDateErrorText:{type:String,value:"",observer:"render",reflectToAttribute:!0},questionNumber:{type:String,value:"",observer:"render",reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback(),this.missingDateErrorText=""===this.missingDateErrorText?Object(h.a)("The date is missing. Please enter a valid date."):this.missingDateErrorText,this.invalidDateErrorText=""===this.invalidDateErrorText?Object(h.a)("The date is not valid. Please enter a valid date."):this.invalidDateErrorText,this.futureDateErrorText=""===this.futureDateErrorText?Object(h.a)("The date cannot be in the future. Please enter a date that is on or before today."):this.futureDateErrorText,this.render()}render(){const e=[Object(h.a)("January"),Object(h.a)("February"),Object(h.a)("March"),Object(h.a)("April"),Object(h.a)("May"),Object(h.a)("June"),Object(h.a)("July"),Object(h.a)("August"),Object(h.a)("September"),Object(h.a)("October"),Object(h.a)("November"),Object(h.a)("December")],t=Array.from({length:31},(e,t)=>t+1),i=Array.from({length:parseInt(this.maxYear)-parseInt(this.minYear)+1},(e,t)=>parseInt(this.minYear)+t),n=Object(h.a)("Unknown");if(this.allowUnknownDay&&t.push(99),this.allowUnknownMonth&&e.push(n),this.allowUnknownYear&&i.push(9999),this.$["qnum-number"].innerHTML=`<label>${this.questionNumber}</label>`,this.$.container.innerHTML=`\n      <label for="group">${this.label}</label>\n      <label class="hint-text">${this.hintText}</label>\n      <div class="mdc-select partial-date-format">\n        <div class='partial-date-float'>\n          <label for='day' class='partial-date-headings'>${Object(h.a)("Day")}:</label>\n          <select class="mdc-select__surface partial-date-select" name="day" value="${this.value}" ${this.disabled?"disabled":""}>\n            <option value="" default selected disabled></option>\n            ${t.map((e,t)=>`\n              <option value="${e}">\n                ${99===e?Object(h.a)("Unknown"):e}\n              </option>\n            `)}\n          </select>\n        </div>\n        <div class='partial-date-float'>\n          <label for='day' class='partial-date-headings'>${Object(h.a)("Month")}:</label>\n          <select class="mdc-select__surface partial-date-select" name="month" value="${this.value}" ${this.disabled?"disabled":""}>\n            <option value="" default selected disabled></option>\n            ${e.map((t,i)=>`\n              <option value="${t===n?99:e.indexOf(t)+1}">\n                ${this.numericMonth?t===n?n:e.indexOf(t)+1:t===n?n:t}\n              </option>\n            `)}    \n          </select>\n        </div>\n        <div class='partial-date-float'>\n          <label for='year' class='partial-date-headings'>${Object(h.a)("Year")}:</label>\n            <select class="mdc-select__surface partial-date-select" name="year" value="${this.value}" ${this.disabled?"disabled":""}>\n              <option value="" default selected disabled></option>\n              ${i.map((e,t)=>`\n                <option value="${e}">\n                ${9999===e?Object(h.a)("Unknown"):e}\n                </option>\n              `)}\n            </select>\n        </div>  \n        ${this.showTodayButton?` \n          <paper-button style="align-self:flex-end;" id="today" on-click="setToday" ${this.disabled?"disabled":""}>\n            <iron-icon icon="query-builder"></iron-icon>&nbsp;\n            ${Object(h.a)("Today")}\n          </paper-button>`:""}\n      </div>\n      ${this.invalid&&this.errorText&&!this.internalErrorText?`\n        <div id="error-text">\n          <iron-icon icon="error"></iron-icon>\n            <div>${this.errorText}</div>\n        </div>      \n      `:""}\n      ${this.invalid&&this.internalErrorText?`\n        <div id="error-text">\n          <iron-icon icon="error"></iron-icon>\n            <div>${this.internalErrorText}</div>\n        </div>      \n      `:""}\n    `,this.showTodayButton&&(this._onClickListener=this.shadowRoot.querySelector("paper-button").addEventListener("click",this.onTodayClick.bind(this))),this._onChangeListener=this.shadowRoot.querySelector('select[name="day"]').addEventListener("change",this.onChange.bind(this)),this._onChangeListener=this.shadowRoot.querySelector('select[name="month"]').addEventListener("change",this.onChange.bind(this)),this._onChangeListener=this.shadowRoot.querySelector('select[name="year"]').addEventListener("change",this.onChange.bind(this)),this.dispatchEvent(new CustomEvent("render")),""!==this.value){const e=this.value;this.shadowRoot.querySelector("select[name='day']").value=this.unpad(e.split("-")[2]),this.shadowRoot.querySelector("select[name='month']").value=this.unpad(e.split("-")[1]),this.shadowRoot.querySelector("select[name='year']").value=e.split("-")[0]}}onTodayClick(e){const t=new Date,i=String(t.getDate()).padStart(2,"0"),n=String(t.getMonth()+1).padStart(2,"0"),r=t.getFullYear();this.value=r+"-"+n+"-"+i,this.shadowRoot.querySelector("select[name='day']").value=r,this.shadowRoot.querySelector("select[name='month']").value=n,this.shadowRoot.querySelector("select[name='year']").value=i,this.render()}onChange(e){this.value=this.shadowRoot.querySelector("select[name='year']").value+"-"+this.pad(this.shadowRoot.querySelector("select[name='month']").value,2)+"-"+this.pad(this.shadowRoot.querySelector("select[name='day']").value,2),console.log("Date value updated to "+this.value),this.dispatchEvent(new CustomEvent("change"))}validate(){return!this.required||this.hidden||this.disabled||this.value?this.isValidDate(this.value)?this.disallowFutureDate&&this.isFutureDate(this.value)?(this.internalErrorText=this.futureDateErrorText,this.invalid=!0,!1):(this.internalErrorText="",this.invalid=!1,!0):(this.internalErrorText=this.invalidDateErrorText,this.invalid=!0,!1):(this.internalErrorText=this.missingDateErrorText,this.invalid=!0,!1)}pad(e,t){return""!==e?(1e15+e+"").slice(-t):""}unpad(e){return+e}isFutureDate(e){const t=new Date,i=parseInt(this.unpad(e.split("-")[2])),n=parseInt(this.unpad(e.split("-")[1])),r=parseInt(e.split("-")[0]);if(99!==i&&99!==n&&9999!==r){return new Date(r,n-1,i)>t}if(99!==n&&9999!==r){return new Date(r,n-1,1)>t}if(9999!==r){return new Date(r,0,1)>t}return!1}isValidDate(e){var t=e.split("-");if(t.length<3)return!1;var i=parseInt(t[2]),n=parseInt(t[1]),r=parseInt(t[0]);if(isNaN(i)||isNaN(n)||isNaN(r))return!1;if(i<1||r<1)return!1;if((n>12||n<1)&99!==n)return!1;if((1==n||3==n||5==n||7==n||8==n||10==n||12==n)&&i>31&&99!==i)return!1;if((4==n||6==n||9==n||11==n)&&i>30&99!==i)return!1;if(2==n){if(99===i)return!0;if(r%4==0&&r%100!=0||r%400==0&&r%100==0){if(i>29)return!1}else if(i>28)return!1}return!0}}window.customElements.define(ai.is,ai)},function(e,t,i){"use strict";i(5),i(23),i(17),i(64),i(56),i(40);var n=i(3);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=n.a`<iron-iconset-svg name="paper-tabs" size="24">
<svg><defs>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(r.content);i(65);var a=i(28),s=i(4),o=i(20);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
class l{constructor(e){this.selection=[],this.selectCallback=e}get(){return this.multi?this.selection.slice():this.selection[0]}clear(e){this.selection.slice().forEach((function(t){(!e||e.indexOf(t)<0)&&this.setItemSelected(t,!1)}),this)}isSelected(e){return this.selection.indexOf(e)>=0}setItemSelected(e,t){if(null!=e&&t!==this.isSelected(e)){if(t)this.selection.push(e);else{var i=this.selection.indexOf(e);i>=0&&this.selection.splice(i,1)}this.selectCallback&&this.selectCallback(e,t)}}select(e){this.multi?this.toggle(e):this.get()!==e&&(this.setItemSelected(this.get(),!1),this.setItemSelected(e,!0))}toggle(e){this.setItemSelected(e,!this.isSelected(e))}}
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const c={properties:{attrForSelected:{type:String,value:null},selected:{type:String,notify:!0},selectedItem:{type:Object,readOnly:!0,notify:!0},activateEvent:{type:String,value:"tap",observer:"_activateEventChanged"},selectable:String,selectedClass:{type:String,value:"iron-selected"},selectedAttribute:{type:String,value:null},fallbackSelection:{type:String,value:null},items:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}},_excludedLocalNames:{type:Object,value:function(){return{template:1,"dom-bind":1,"dom-if":1,"dom-repeat":1}}}},observers:["_updateAttrForSelected(attrForSelected)","_updateSelected(selected)","_checkFallback(fallbackSelection)"],created:function(){this._bindFilterItem=this._filterItem.bind(this),this._selection=new l(this._applySelection.bind(this))},attached:function(){this._observer=this._observeItems(this),this._addListener(this.activateEvent)},detached:function(){this._observer&&Object(s.a)(this).unobserveNodes(this._observer),this._removeListener(this.activateEvent)},indexOf:function(e){return this.items?this.items.indexOf(e):-1},select:function(e){this.selected=e},selectPrevious:function(){var e=this.items.length,t=e-1;void 0!==this.selected&&(t=(Number(this._valueToIndex(this.selected))-1+e)%e),this.selected=this._indexToValue(t)},selectNext:function(){var e=0;void 0!==this.selected&&(e=(Number(this._valueToIndex(this.selected))+1)%this.items.length),this.selected=this._indexToValue(e)},selectIndex:function(e){this.select(this._indexToValue(e))},forceSynchronousItemUpdate:function(){this._observer&&"function"==typeof this._observer.flush?this._observer.flush():this._updateItems()},get _shouldUpdateSelection(){return null!=this.selected},_checkFallback:function(){this._updateSelected()},_addListener:function(e){this.listen(this,e,"_activateHandler")},_removeListener:function(e){this.unlisten(this,e,"_activateHandler")},_activateEventChanged:function(e,t){this._removeListener(t),this._addListener(e)},_updateItems:function(){var e=Object(s.a)(this).queryDistributedElements(this.selectable||"*");e=Array.prototype.filter.call(e,this._bindFilterItem),this._setItems(e)},_updateAttrForSelected:function(){this.selectedItem&&(this.selected=this._valueForItem(this.selectedItem))},_updateSelected:function(){this._selectSelected(this.selected)},_selectSelected:function(e){if(this.items){var t=this._valueToItem(this.selected);t?this._selection.select(t):this._selection.clear(),this.fallbackSelection&&this.items.length&&void 0===this._selection.get()&&(this.selected=this.fallbackSelection)}},_filterItem:function(e){return!this._excludedLocalNames[e.localName]},_valueToItem:function(e){return null==e?null:this.items[this._valueToIndex(e)]},_valueToIndex:function(e){if(!this.attrForSelected)return Number(e);for(var t,i=0;t=this.items[i];i++)if(this._valueForItem(t)==e)return i},_indexToValue:function(e){if(!this.attrForSelected)return e;var t=this.items[e];return t?this._valueForItem(t):void 0},_valueForItem:function(e){if(!e)return null;if(!this.attrForSelected){var t=this.indexOf(e);return-1===t?null:t}var i=e[Object(o.b)(this.attrForSelected)];return null!=i?i:e.getAttribute(this.attrForSelected)},_applySelection:function(e,t){this.selectedClass&&this.toggleClass(this.selectedClass,t,e),this.selectedAttribute&&this.toggleAttribute(this.selectedAttribute,t,e),this._selectionChange(),this.fire("iron-"+(t?"select":"deselect"),{item:e})},_selectionChange:function(){this._setSelectedItem(this._selection.get())},_observeItems:function(e){return Object(s.a)(e).observeNodes((function(e){this._updateItems(),this._updateSelected(),this.fire("iron-items-changed",e,{bubbles:!1,cancelable:!1})}))},_activateHandler:function(e){for(var t=e.target,i=this.items;t&&t!=this;){var n=i.indexOf(t);if(n>=0){var r=this._indexToValue(n);return void this._itemActivate(r,t)}t=t.parentNode}},_itemActivate:function(e,t){this.fire("iron-activate",{selected:e,item:t},{cancelable:!0}).defaultPrevented||this.select(e)}},h={properties:{multi:{type:Boolean,value:!1,observer:"multiChanged"},selectedValues:{type:Array,notify:!0,value:function(){return[]}},selectedItems:{type:Array,readOnly:!0,notify:!0,value:function(){return[]}}},observers:["_updateSelected(selectedValues.splices)"],select:function(e){this.multi?this._toggleSelected(e):this.selected=e},multiChanged:function(e){this._selection.multi=e,this._updateSelected()},get _shouldUpdateSelection(){return null!=this.selected||null!=this.selectedValues&&this.selectedValues.length},_updateAttrForSelected:function(){this.multi?this.selectedItems&&this.selectedItems.length>0&&(this.selectedValues=this.selectedItems.map((function(e){return this._indexToValue(this.indexOf(e))}),this).filter((function(e){return null!=e}),this)):c._updateAttrForSelected.apply(this)},_updateSelected:function(){this.multi?this._selectMulti(this.selectedValues):this._selectSelected(this.selected)},_selectMulti:function(e){e=e||[];var t=(this._valuesToItems(e)||[]).filter((function(e){return null!=e}));this._selection.clear(t);for(var i=0;i<t.length;i++)this._selection.setItemSelected(t[i],!0);this.fallbackSelection&&!this._selection.get().length&&(this._valueToItem(this.fallbackSelection)&&this.select(this.fallbackSelection))},_selectionChange:function(){var e=this._selection.get();this.multi?(this._setSelectedItems(e),this._setSelectedItem(e.length?e[0]:null)):null!=e?(this._setSelectedItems([e]),this._setSelectedItem(e)):(this._setSelectedItems([]),this._setSelectedItem(null))},_toggleSelected:function(e){var t=this.selectedValues.indexOf(e);t<0?this.push("selectedValues",e):this.splice("selectedValues",t,1)},_valuesToItems:function(e){return null==e?null:e.map((function(e){return this._valueToItem(e)}),this)}},d={properties:{focusedItem:{observer:"_focusedItemChanged",readOnly:!0,type:Object},attrForItemTitle:{type:String},disabled:{type:Boolean,value:!1,observer:"_disabledChanged"}},_MODIFIER_KEYS:["Alt","AltGraph","CapsLock","Control","Fn","FnLock","Hyper","Meta","NumLock","OS","ScrollLock","Shift","Super","Symbol","SymbolLock"],_SEARCH_RESET_TIMEOUT_MS:1e3,_previousTabIndex:0,hostAttributes:{role:"menu"},observers:["_updateMultiselectable(multi)"],listeners:{focus:"_onFocus",keydown:"_onKeydown","iron-items-changed":"_onIronItemsChanged"},keyBindings:{up:"_onUpKey",down:"_onDownKey",esc:"_onEscKey","shift+tab:keydown":"_onShiftTabDown"},attached:function(){this._resetTabindices()},select:function(e){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null);var t=this._valueToItem(e);t&&t.hasAttribute("disabled")||(this._setFocusedItem(t),h.select.apply(this,arguments))},_resetTabindices:function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this.items.forEach((function(t){t.setAttribute("tabindex",t===e?"0":"-1"),t.setAttribute("aria-selected",this._selection.isSelected(t))}),this)},_updateMultiselectable:function(e){e?this.setAttribute("aria-multiselectable","true"):this.removeAttribute("aria-multiselectable")},_focusWithKeyboardEvent:function(e){if(-1===this._MODIFIER_KEYS.indexOf(e.key)){this.cancelDebouncer("_clearSearchText");for(var t,i=this._searchText||"",n=(i+=(e.key&&1==e.key.length?e.key:String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length,r=0;t=this.items[r];r++)if(!t.hasAttribute("disabled")){var a=this.attrForItemTitle||"textContent",s=(t[a]||t.getAttribute(a)||"").trim();if(!(s.length<n)&&s.slice(0,n).toLocaleLowerCase()==i){this._setFocusedItem(t);break}}this._searchText=i,this.debounce("_clearSearchText",this._clearSearchText,this._SEARCH_RESET_TIMEOUT_MS)}},_clearSearchText:function(){this._searchText=""},_focusPrevious:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),i=1;i<e+1;i++){var n=this.items[(t-i+e)%e];if(!n.hasAttribute("disabled")){var r=Object(s.a)(n).getOwnerRoot()||document;if(this._setFocusedItem(n),Object(s.a)(r).activeElement==n)return}}},_focusNext:function(){for(var e=this.items.length,t=Number(this.indexOf(this.focusedItem)),i=1;i<e+1;i++){var n=this.items[(t+i)%e];if(!n.hasAttribute("disabled")){var r=Object(s.a)(n).getOwnerRoot()||document;if(this._setFocusedItem(n),Object(s.a)(r).activeElement==n)return}}},_applySelection:function(e,t){t?e.setAttribute("aria-selected","true"):e.setAttribute("aria-selected","false"),c._applySelection.apply(this,arguments)},_focusedItemChanged:function(e,t){t&&t.setAttribute("tabindex","-1"),!e||e.hasAttribute("disabled")||this.disabled||(e.setAttribute("tabindex","0"),e.focus())},_onIronItemsChanged:function(e){e.detail.addedNodes.length&&this._resetTabindices()},_onShiftTabDown:function(e){var t=this.getAttribute("tabindex");d._shiftTabPressed=!0,this._setFocusedItem(null),this.setAttribute("tabindex","-1"),this.async((function(){this.setAttribute("tabindex",t),d._shiftTabPressed=!1}),1)},_onFocus:function(e){if(!d._shiftTabPressed){var t=Object(s.a)(e).rootTarget;(t===this||void 0===t.tabIndex||this.isLightDescendant(t))&&(this._defaultFocusAsync=this.async((function(){var e=this.multi?this.selectedItems&&this.selectedItems[0]:this.selectedItem;this._setFocusedItem(null),e?this._setFocusedItem(e):this.items[0]&&this._focusNext()})))}},_onUpKey:function(e){this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onEscKey:function(e){var t=this.focusedItem;t&&t.blur()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down esc")||this._focusWithKeyboardEvent(e),e.stopPropagation()},_activateHandler:function(e){c._activateHandler.call(this,e),e.stopPropagation()},_disabledChanged:function(e){e?(this._previousTabIndex=this.hasAttribute("tabindex")?this.tabIndex:0,this.removeAttribute("tabindex")):this.hasAttribute("tabindex")||this.setAttribute("tabindex",this._previousTabIndex)},_shiftTabPressed:!1},u=[[[c,h],a.a,d],{hostAttributes:{role:"menubar"},keyBindings:{left:"_onLeftKey",right:"_onRightKey"},_onUpKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},_onDownKey:function(e){this.focusedItem.click(),e.detail.keyboardEvent.preventDefault()},get _isRTL(){return"rtl"===window.getComputedStyle(this).direction},_onLeftKey:function(e){this._isRTL?this._focusNext():this._focusPrevious(),e.detail.keyboardEvent.preventDefault()},_onRightKey:function(e){this._isRTL?this._focusPrevious():this._focusNext(),e.detail.keyboardEvent.preventDefault()},_onKeydown:function(e){this.keyboardEventMatchesKeys(e,"up down left right esc")||this._focusWithKeyboardEvent(e)}}];
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/var p=i(8),m=new Set;
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const g={properties:{_parentResizable:{type:Object,observer:"_parentResizableChanged"},_notifyingDescendant:{type:Boolean,value:!1}},listeners:{"iron-request-resize-notifications":"_onIronRequestResizeNotifications"},created:function(){this._interestedResizables=[],this._boundNotifyResize=this.notifyResize.bind(this),this._boundOnDescendantIronResize=this._onDescendantIronResize.bind(this)},attached:function(){this._requestResizeNotifications()},detached:function(){this._parentResizable?this._parentResizable.stopResizeNotificationsFor(this):(m.delete(this),window.removeEventListener("resize",this._boundNotifyResize)),this._parentResizable=null},notifyResize:function(){this.isAttached&&(this._interestedResizables.forEach((function(e){this.resizerShouldNotify(e)&&this._notifyDescendant(e)}),this),this._fireResize())},assignParentResizable:function(e){this._parentResizable&&this._parentResizable.stopResizeNotificationsFor(this),this._parentResizable=e,e&&-1===e._interestedResizables.indexOf(this)&&(e._interestedResizables.push(this),e._subscribeIronResize(this))},stopResizeNotificationsFor:function(e){var t=this._interestedResizables.indexOf(e);t>-1&&(this._interestedResizables.splice(t,1),this._unsubscribeIronResize(e))},_subscribeIronResize:function(e){e.addEventListener("iron-resize",this._boundOnDescendantIronResize)},_unsubscribeIronResize:function(e){e.removeEventListener("iron-resize",this._boundOnDescendantIronResize)},resizerShouldNotify:function(e){return!0},_onDescendantIronResize:function(e){this._notifyingDescendant?e.stopPropagation():p.i||this._fireResize()},_fireResize:function(){this.fire("iron-resize",null,{node:this,bubbles:!1})},_onIronRequestResizeNotifications:function(e){var t=Object(s.a)(e).rootTarget;t!==this&&(t.assignParentResizable(this),this._notifyDescendant(t),e.stopPropagation())},_parentResizableChanged:function(e){e&&window.removeEventListener("resize",this._boundNotifyResize)},_notifyDescendant:function(e){this.isAttached&&(this._notifyingDescendant=!0,e.notifyResize(),this._notifyingDescendant=!1)},_requestResizeNotifications:function(){if(this.isAttached)if("loading"===document.readyState){var e=this._requestResizeNotifications.bind(this);document.addEventListener("readystatechange",(function t(){document.removeEventListener("readystatechange",t),e()}))}else this._findParent(),this._parentResizable?this._parentResizable._interestedResizables.forEach((function(e){e!==this&&e._findParent()}),this):(m.forEach((function(e){e!==this&&e._findParent()}),this),window.addEventListener("resize",this._boundNotifyResize),this.notifyResize())},_findParent:function(){this.assignParentResizable(null),this.fire("iron-request-resize-notifications",null,{node:this,bubbles:!0,cancelable:!0}),this._parentResizable?m.delete(this):m.add(this)}};var f=i(7);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/Object(f.a)({_template:n.a`
    <style>
      :host {
        @apply --layout;
        @apply --layout-center;

        height: 48px;
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;

        /* NOTE: Both values are needed, since some phones require the value to be \`transparent\`. */
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;

        @apply --paper-tabs;
      }

      :host(:dir(rtl)) {
        @apply --layout-horizontal-reverse;
      }

      #tabsContainer {
        position: relative;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        @apply --layout-flex-auto;
        @apply --paper-tabs-container;
      }

      #tabsContent {
        height: 100%;
        -moz-flex-basis: auto;
        -ms-flex-basis: auto;
        flex-basis: auto;
        @apply --paper-tabs-content;
      }

      #tabsContent.scrollable {
        position: absolute;
        white-space: nowrap;
      }

      #tabsContent:not(.scrollable),
      #tabsContent.scrollable.fit-container {
        @apply --layout-horizontal;
      }

      #tabsContent.scrollable.fit-container {
        min-width: 100%;
      }

      #tabsContent.scrollable.fit-container > ::slotted(*) {
        /* IE - prevent tabs from compressing when they should scroll. */
        -ms-flex: 1 0 auto;
        -webkit-flex: 1 0 auto;
        flex: 1 0 auto;
      }

      .hidden {
        display: none;
      }

      .not-visible {
        opacity: 0;
        cursor: default;
      }

      paper-icon-button {
        width: 48px;
        height: 48px;
        padding: 12px;
        margin: 0 4px;
      }

      #selectionBar {
        position: absolute;
        height: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 2px solid var(--paper-tabs-selection-bar-color, var(--paper-yellow-a100));
          -webkit-transform: scale(0);
        transform: scale(0);
          -webkit-transform-origin: left center;
        transform-origin: left center;
          transition: -webkit-transform;
        transition: transform;

        @apply --paper-tabs-selection-bar;
      }

      #selectionBar.align-bottom {
        top: 0;
        bottom: auto;
      }

      #selectionBar.expand {
        transition-duration: 0.15s;
        transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
      }

      #selectionBar.contract {
        transition-duration: 0.18s;
        transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);
      }

      #tabsContent > ::slotted(:not(#selectionBar)) {
        height: 100%;
      }
    </style>

    <paper-icon-button icon="paper-tabs:chevron-left" class$="[[_computeScrollButtonClass(_leftHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onLeftScrollButtonDown" tabindex="-1"></paper-icon-button>

    <div id="tabsContainer" on-track="_scroll" on-down="_down">
      <div id="tabsContent" class$="[[_computeTabsContentClass(scrollable, fitContainer)]]">
        <div id="selectionBar" class$="[[_computeSelectionBarClass(noBar, alignBottom)]]" on-transitionend="_onBarTransitionEnd"></div>
        <slot></slot>
      </div>
    </div>

    <paper-icon-button icon="paper-tabs:chevron-right" class$="[[_computeScrollButtonClass(_rightHidden, scrollable, hideScrollButtons)]]" on-up="_onScrollButtonUp" on-down="_onRightScrollButtonDown" tabindex="-1"></paper-icon-button>
`,is:"paper-tabs",behaviors:[g,u],properties:{noink:{type:Boolean,value:!1,observer:"_noinkChanged"},noBar:{type:Boolean,value:!1},noSlide:{type:Boolean,value:!1},scrollable:{type:Boolean,value:!1},fitContainer:{type:Boolean,value:!1},disableDrag:{type:Boolean,value:!1},hideScrollButtons:{type:Boolean,value:!1},alignBottom:{type:Boolean,value:!1},selectable:{type:String,value:"paper-tab"},autoselect:{type:Boolean,value:!1},autoselectDelay:{type:Number,value:0},_step:{type:Number,value:10},_holdDelay:{type:Number,value:1},_leftHidden:{type:Boolean,value:!1},_rightHidden:{type:Boolean,value:!1},_previousTab:{type:Object}},hostAttributes:{role:"tablist"},listeners:{"iron-resize":"_onTabSizingChanged","iron-items-changed":"_onTabSizingChanged","iron-select":"_onIronSelect","iron-deselect":"_onIronDeselect"},keyBindings:{"left:keyup right:keyup":"_onArrowKeyup"},created:function(){this._holdJob=null,this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,this._bindDelayedActivationHandler=this._delayedActivationHandler.bind(this),this.addEventListener("blur",this._onBlurCapture.bind(this),!0)},ready:function(){this.setScrollDirection("y",this.$.tabsContainer)},detached:function(){this._cancelPendingActivation()},_noinkChanged:function(e){Object(s.a)(this).querySelectorAll("paper-tab").forEach(e?this._setNoinkAttribute:this._removeNoinkAttribute)},_setNoinkAttribute:function(e){e.setAttribute("noink","")},_removeNoinkAttribute:function(e){e.removeAttribute("noink")},_computeScrollButtonClass:function(e,t,i){return!t||i?"hidden":e?"not-visible":""},_computeTabsContentClass:function(e,t){return e?"scrollable"+(t?" fit-container":""):" fit-container"},_computeSelectionBarClass:function(e,t){return e?"hidden":t?"align-bottom":""},_onTabSizingChanged:function(){this.debounce("_onTabSizingChanged",(function(){this._scroll(),this._tabChanged(this.selectedItem)}),10)},_onIronSelect:function(e){this._tabChanged(e.detail.item,this._previousTab),this._previousTab=e.detail.item,this.cancelDebouncer("tab-changed")},_onIronDeselect:function(e){this.debounce("tab-changed",(function(){this._tabChanged(null,this._previousTab),this._previousTab=null}),1)},_activateHandler:function(){this._cancelPendingActivation(),d._activateHandler.apply(this,arguments)},_scheduleActivation:function(e,t){this._pendingActivationItem=e,this._pendingActivationTimeout=this.async(this._bindDelayedActivationHandler,t)},_delayedActivationHandler:function(){var e=this._pendingActivationItem;this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0,e.fire(this.activateEvent,null,{bubbles:!0,cancelable:!0})},_cancelPendingActivation:function(){void 0!==this._pendingActivationTimeout&&(this.cancelAsync(this._pendingActivationTimeout),this._pendingActivationItem=void 0,this._pendingActivationTimeout=void 0)},_onArrowKeyup:function(e){this.autoselect&&this._scheduleActivation(this.focusedItem,this.autoselectDelay)},_onBlurCapture:function(e){e.target===this._pendingActivationItem&&this._cancelPendingActivation()},get _tabContainerScrollSize(){return Math.max(0,this.$.tabsContainer.scrollWidth-this.$.tabsContainer.offsetWidth)},_scroll:function(e,t){if(this.scrollable){var i=t&&-t.ddx||0;this._affectScroll(i)}},_down:function(e){this.async((function(){this._defaultFocusAsync&&(this.cancelAsync(this._defaultFocusAsync),this._defaultFocusAsync=null)}),1)},_affectScroll:function(e){this.$.tabsContainer.scrollLeft+=e;var t=this.$.tabsContainer.scrollLeft;this._leftHidden=0===t,this._rightHidden=t===this._tabContainerScrollSize},_onLeftScrollButtonDown:function(){this._scrollToLeft(),this._holdJob=setInterval(this._scrollToLeft.bind(this),this._holdDelay)},_onRightScrollButtonDown:function(){this._scrollToRight(),this._holdJob=setInterval(this._scrollToRight.bind(this),this._holdDelay)},_onScrollButtonUp:function(){clearInterval(this._holdJob),this._holdJob=null},_scrollToLeft:function(){this._affectScroll(-this._step)},_scrollToRight:function(){this._affectScroll(this._step)},_tabChanged:function(e,t){if(!e)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(0,0);var i=this.$.tabsContent.getBoundingClientRect(),n=i.width,r=e.getBoundingClientRect(),a=r.left-i.left;if(this._pos={width:this._calcPercent(r.width,n),left:this._calcPercent(a,n)},this.noSlide||null==t)return this.$.selectionBar.classList.remove("expand"),this.$.selectionBar.classList.remove("contract"),void this._positionBar(this._pos.width,this._pos.left);var s=t.getBoundingClientRect(),o=this.items.indexOf(t),l=this.items.indexOf(e);this.$.selectionBar.classList.add("expand");var c=o<l;this._isRTL&&(c=!c),c?this._positionBar(this._calcPercent(r.left+r.width-s.left,n)-5,this._left):this._positionBar(this._calcPercent(s.left+s.width-r.left,n)-5,this._calcPercent(a,n)+5),this.scrollable&&this._scrollToSelectedIfNeeded(r.width,a)},_scrollToSelectedIfNeeded:function(e,t){var i=t-this.$.tabsContainer.scrollLeft;i<0?this.$.tabsContainer.scrollLeft+=i:(i+=e-this.$.tabsContainer.offsetWidth)>0&&(this.$.tabsContainer.scrollLeft+=i)},_calcPercent:function(e,t){return 100*e/t},_positionBar:function(e,t){e=e||0,t=t||0,this._width=e,this._left=t,this.transform("translateX("+t+"%) scaleX("+e/100+")",this.$.selectionBar)},_onBarTransitionEnd:function(e){var t=this.$.selectionBar.classList;t.contains("expand")?(t.remove("expand"),t.add("contract"),this._positionBar(this._pos.width,this._pos.left)):t.contains("contract")&&t.remove("contract")}})},function(e,t,i){"use strict";var n=i(0);i(11),i(57),i(45),i(17),i(58),i(9),i(13),i(59);class r extends n.a{static get template(){return n.b`
    <style include="tangy-common-styles"></style>
    <style include="tangy-element-styles"></style>
    <style>
    :host {
      position: relative;
    }
    paper-card { width: 100%; }
    paper-fab {
      position: absolute;
      top: -15px;
      right: -15px;
      --paper-fab-background: var(--accent-color);
      --paper-fab-keyboard-focus-background: var(--accent-color);
    }
    </style>
    <paper-card id="content">
      <slot></slot>
    </paper-card>
    <paper-fab mini icon="close" id="remove" on-click="onRemoveClick"></paper-fab>
    `}static get is(){return"tangy-list-item"}static get _props(){return["name","value","label","disabled","invalid","incomplete","hidden","correct"]}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0},correct:{type:Boolean,value:!1,reflectToAttribute:!0}}}connectedCallback(){super.connectedCallback()}get value(){return this.shadowRoot&&this.querySelectorAll("[name]").length>0&&(this._value=[...this.querySelectorAll("[name]")].map(e=>e.getProps())),this._value?this._value:[]}set value(e){this._value=e,this._value.forEach(e=>this.querySelector(`[name=${e.name}]`).setProps(e))}validate(){return[...this.querySelectorAll("[name]")].reduce((e,t)=>!!t.validate()&&e,!0)}onRemoveClick(){this.remove()}}window.customElements.define(r.is,r);class a extends n.a{static get is(){return"tangy-list"}static get _props(){return["name","value","label","disabled","invalid","incomplete","hidden"]}static get properties(){return{name:{type:String,value:"",reflectToAttribute:!0},maxCount:{type:Number,value:999,reflectToAttribute:!0},initialCount:{type:Number,value:1,reflectToAttribute:!0},label:{type:String,value:"",reflectToAttribute:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},invalid:{type:Boolean,value:!1,reflectToAttribute:!0},incomplete:{type:Boolean,value:!0,reflectToAttribute:!0},hidden:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get template(){return n.b`
      <style include="tangy-common-styles"></style>
      <style include="tangy-element-styles"></style>
      <div id="items">
      </div>
      <paper-button on-click="onClickNewItem" style="margin-left: 15px; background: var(--accent-color); color: var(--accent-text-color);" raised class="add-another"><iron-icon icon="add-circle"></iron-icon>ADD ANOTHER</paper-button>
    `}set value(e){this.$.items.innerHTML="",e.forEach(e=>this.addItem(e))}get value(){return[...this.shadowRoot.querySelectorAll("tangy-list-item")].map(e=>e.value)}connectedCallback(){if(super.connectedCallback(),this.querySelector('template[type="tangy-list/initial-items"]'))this.$.items.innerHTML=this.querySelector('template[type="tangy-list/initial-items"]').innerHTML;else for(let e=0;e<this.initialCount;e++)this.addItem()}onClickNewItem(e){this.addItem()}addItem(e){const t=document.createElement("tangy-list-item");t.innerHTML=this.querySelector('template[type="tangy-list/new-item"]').innerHTML,e&&(t.value=e),this.$.items.appendChild(t)}validate(){return[...this.$.items.querySelectorAll("tangy-list-item")].reduce((e,t)=>!!t.validate()&&e,!0)}}window.customElements.define(a.is,a)}]);