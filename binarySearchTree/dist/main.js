(()=>{"use strict";const t=Object.prototype.hasOwnProperty;class e extends Event{constructor(t,e){super(t),this.detail=e}}class n extends EventTarget{constructor(t={}){super();const{concurrency:e=1/0,timeout:n=0,autostart:r=!1,results:s=null}=t;this.concurrency=e,this.timeout=n,this.autostart=r,this.results=s,this.pending=0,this.session=0,this.running=!1,this.jobs=[],this.timers=[],this.addEventListener("error",this._errorHandler)}_errorHandler(t){this.end(t.detail.error)}pop(){return this.jobs.pop()}shift(){return this.jobs.shift()}indexOf(t,e){return this.jobs.indexOf(t,e)}lastIndexOf(t,e){return void 0!==e?this.jobs.lastIndexOf(t,e):this.jobs.lastIndexOf(t)}slice(t,e){return this.jobs=this.jobs.slice(t,e),this}reverse(){return this.jobs.reverse(),this}push(...t){const e=this.jobs.push(...t);return this.autostart&&this._start(),e}unshift(...t){const e=this.jobs.unshift(...t);return this.autostart&&this._start(),e}splice(t,e,...n){return this.jobs.splice(t,e,...n),this.autostart&&this._start(),this}get length(){return this.pending+this.jobs.length}start(t){if(this.running)throw new Error("already started");let e;return t?this._addCallbackToEndEvent(t):e=this._createPromiseToEndEvent(),this._start(),e}_start(){if(this.running=!0,this.pending>=this.concurrency)return;if(0===this.jobs.length)return void(0===this.pending&&this.done());const n=this.jobs.shift(),r=this.session,s=void 0!==n&&t.call(n,"timeout")?n.timeout:this.timeout;let i=!0,o=null,l=!1,u=null;const h=(t,...s)=>{i&&this.session===r&&(i=!1,this.pending--,null!==o&&(this.timers=this.timers.filter((t=>t!==o)),clearTimeout(o)),t?this.dispatchEvent(new e("error",{error:t,job:n})):l||(null!==u&&null!==this.results&&(this.results[u]=[...s]),this.dispatchEvent(new e("success",{result:[...s],job:n}))),this.session===r&&(0===this.pending&&0===this.jobs.length?this.done():this.running&&this._start()))};s&&(o=setTimeout((()=>{l=!0,this.dispatchEvent(new e("timeout",{next:h,job:n})),h()}),s),this.timers.push(o)),null!=this.results&&(u=this.results.length,this.results[u]=null),this.pending++,this.dispatchEvent(new e("start",{job:n})),n.promise=n(h),void 0!==n.promise&&"function"==typeof n.promise.then&&n.promise.then((function(t){return h(void 0,t)})).catch((function(t){return h(t||!0)})),this.running&&this.jobs.length>0&&this._start()}stop(){this.running=!1}end(t){this.clearTimers(),this.jobs.length=0,this.pending=0,this.done(t)}clearTimers(){this.timers.forEach((t=>{clearTimeout(t)})),this.timers=[]}_addCallbackToEndEvent(t){const e=n=>{this.removeEventListener("end",e),t(n.detail.error,this.results)};this.addEventListener("end",e)}_createPromiseToEndEvent(){return new Promise(((t,e)=>{this._addCallbackToEndEvent(((n,r)=>{n?e(n):t(r)}))}))}done(t){this.session++,this.running=!1,this.dispatchEvent(new e("end",{error:t}))}}function r(t){let e=0,n=0;return t.left&&(e=r(t.left)+1),t.right&&(n=r(t.right)+1),e>n?e:n}function s(t){let e=0,n=0;return t.left&&(e=s(t.left)+1),t.right&&(n=s(t.right)+1),e<n?e:n}function i(t,e){let n=0;return e.data<t.data&&(n=i(t.left,e)+1),e.data>t.data&&(n=i(t.right,e)+1),n}function o(t,e=null,n=null){return{data:t,left:e,right:n}}function l(t){let e=c(t);function o(t){return function(t,e){let n=[];return function t(r){null!==r&&(t(r.left),r.data=e(r.data),n.push(r.data),t(r.right))}(t),n}(e,t)}return{getRoot:function(){return e},insert:function(t){e=u(t,e)},deleteItem:function(t){e=h(t,e)},find:function(t){return a(t,e)},levelOrder:function(t){return function(t,e){let r=[],s=new n;for(s.push(t);s.length;){let t=s.shift(),n=e(t.data);r.push(n),t.left&&s.push(t.left),t.right&&s.push(t.right)}return r}(e,t)},inOrder:o,preOrder:function(t){return function(t,e){let n=[];return function t(r){null!==r&&(r.data=e(r.data),n.push(r.data),t(r.left),t(r.right))}(t),n}(e,t)},postOrder:function(t){return function(t,e){let n=[];return function t(r){null!==r&&(t(r.left),t(r.right),r.data=e(r.data),n.push(r.data))}(t),n}(e,t)},height:function(t){return r(t)},depth:function(t){return i(e,t)},isBalanced:function(){return r(e)-s(e)<=1},rebalance:function(){let t=o((t=>t));e=c(t)}}}function u(t,e){return null===e?o(t):(t<e.data&&(e.left=u(t,e.left)),t>e.data&&(e.right=u(t,e.right)),e)}function h(t,e){if(null===e)return e;if(t<e.data&&(e.left=h(t,e.left)),t>e.data&&(e.right=h(t,e.right)),t===e.data){if(null===e.left)return e.right;if(null===e.right)return e.left;e.data=function(t){let e=t.data;for(;null!==t.left;)e=t.left.data,t=t.left;return e}(e.right),e.right=h(e.data,e.right)}return e}function a(t,e){return null===e?null:t<e.data?a(t,e.left):t>e.data?a(t,e.right):e}function c(t){let e=function(t){return[...new Set(t)].sort(((t,e)=>t-e))}(t);return d(e,0,e.length-1)}function d(t,e,n){if(e>n)return null;let r=parseInt((e+n)/2),s=o(t[r]);return s.left=d(t,e,r-1),s.right=d(t,r+1,n),s}l([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);const f=(t,e="",n=!0)=>{null!==t&&(null!==t.right&&f(t.right,`${e}${n?"│   ":"    "}`,!1),console.log(`${e}${n?"└── ":"┌── "}${t.data}`),null!==t.left&&f(t.left,`${e}${n?"    ":"│   "}`,!0))};let g=function(){let t=[];for(let e=0;e<20;e++){let e=Math.floor(100*Math.random());t.push(e)}return l(t)}();console.log(g.isBalanced()),f(g.getRoot());const p=t=>t;console.log(g.levelOrder(p)),console.log(g.inOrder(p)),console.log(g.preOrder(p)),console.log(g.postOrder(p)),g.insert(101),g.insert(102),g.insert(103),g.insert(104),g.insert(105),console.log(g.isBalanced()),f(g.getRoot()),g.rebalance(),console.log(g.isBalanced()),f(g.getRoot()),console.log(g.levelOrder(p)),console.log(g.inOrder(p)),console.log(g.preOrder(p)),console.log(g.postOrder(p))})();
//# sourceMappingURL=main.js.map