(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f57d0cf"],{"48aa":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panel-search",attrs:{flex:"dir:top"}},[n("div",{staticClass:"panel-search__input-group",attrs:{"flex-box":"0",flex:"dir:top main:center cross:center"},on:{click:function(t){return t.target!==t.currentTarget?null:e.handlePanelClick(t)}}},[n("d2-icon-svg",{staticClass:"panel-search__logo",attrs:{name:"d2-admin-text"}}),n("el-autocomplete",{ref:"input",staticClass:"panel-search__input",attrs:{"suffix-icon":"el-icon-search",placeholder:"搜索页面","fetch-suggestions":e.querySearch,"trigger-on-focus":!1,clearable:!0},on:{select:e.handleSelect},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.handleEsc(t)}},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.item;return n("d2-panel-search-item",{attrs:{item:t}})}}]),model:{value:e.searchText,callback:function(t){e.searchText=t},expression:"searchText"}}),n("div",{staticClass:"panel-search__tip"},[e._v("\n      您可以使用快捷键\n      "),n("span",{staticClass:"panel-search__key"},[e._v(e._s(e.hotkey.open))]),e._v("\n      唤醒搜索面板，按\n      "),n("span",{staticClass:"panel-search__key"},[e._v(e._s(e.hotkey.close))]),e._v("\n      关闭\n    ")])],1),e.resultsList.length>0?n("div",{staticClass:"panel-search__results-group",attrs:{"flex-box":"1"}},[n("el-card",[n("div",{staticClass:"panel-search__results-group-inner"},e._l(e.resultsList,function(t,r){return n("d2-panel-search-item",{key:r,attrs:{item:t,"hover-mode":!0},nativeOn:{click:function(n){return e.handleResultsGroupItemClick(t.path)}}})}),1)])],1):e._e()])},o=[],i=(n("8e6e"),n("ac6a"),n("456d"),n("386d"),n("bd86")),a=n("ffe7"),s=n.n(a),c=n("2f62"),l=n("b55f");function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach(function(t){Object(i["a"])(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var f={mixins:[l["a"]],components:{"d2-panel-search-item":function(){return n.e("chunk-44efdb0c").then(n.bind(null,"f1ee"))}},data:function(){return{searchText:"",results:[]}},computed:u({},Object(c["e"])("d2admin/search",["hotkey","pool"]),{resultsList:function(){return 0===this.results.length&&""===this.searchText?this.pool.map(function(e){return u({value:e.fullTitle},e)}):this.results}}),methods:{querySearch:function(e,t){var n=this.pool,r=this.query(e?n:[],e);this.results=r,t(r)},query:function(e,t){return new s.a(e,{shouldSort:!0,tokenize:!0,threshold:.6,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["fullTitle","path"]}).search(t).map(function(e){return u({value:e.fullTitle},e)})},focus:function(){var e=this;this.input="",setTimeout(function(){e.$refs.input&&e.$refs.input.focus(),e.searchText="",e.results=[]},500)},handleResultsGroupItemClick:function(e){e!==this.$route.path?this.handleMenuSelect(e):this.handleEsc()},handleSelect:function(e){var t=this,n=e.path;n!==this.$route.path?this.$nextTick(function(){t.handleMenuSelect(n)}):this.handleEsc()},closeSuggestion:function(){this.$refs.input.activated&&(this.$refs.input.suggestions=[],this.$refs.input.activated=!1)},handlePanelClick:function(){this.handleEsc()},handleEsc:function(){var e=this;this.closeSuggestion(),this.$nextTick(function(){e.$emit("close")})}}},p=f,d=(n("5d15"),n("2877")),v=function(e){e.options.__source="src/layout/header-aside/components/panel-search/index.vue"},g=v,y=Object(d["a"])(p,r,o,!1,null,"7271c670",null);"function"===typeof g&&g(y);t["default"]=y.exports},"5d15":function(e,t,n){"use strict";var r=n("d095"),o=n.n(r);o.a},d095:function(e,t,n){},ffe7:function(e,t,n){
/*!
 * Fuse.js v3.4.5 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(t,n){e.exports=n()}(0,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)}},function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=n(2),a=n(8),s=n(0),c=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,l=void 0===c?.6:c,h=n.maxPatternLength,u=void 0===h?32:h,f=n.caseSensitive,p=void 0!==f&&f,d=n.tokenSeparator,v=void 0===d?/ +/g:d,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m,b=n.id,x=void 0===b?null:b,S=n.keys,_=void 0===S?[]:S,M=n.shouldSort,w=void 0===M||M,O=n.getFn,C=void 0===O?a:O,L=n.sortFn,P=void 0===L?function(e,t){return e.score-t.score}:L,j=n.tokenize,T=void 0!==j&&j,A=n.matchAllTokens,I=void 0!==A&&A,E=n.includeMatches,$=void 0!==E&&E,z=n.includeScore,F=void 0!==z&&z,q=n.verbose,D=void 0!==q&&q;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:l,maxPatternLength:u,isCaseSensitive:p,tokenSeparator:v,findAllMatches:y,minMatchCharLength:k,id:x,keys:_,includeMatches:$,includeScore:F,shouldSort:w,getFn:C,sortFn:P,verbose:D,tokenize:T,matchAllTokens:I},this.setCollection(t)}var t,n,c;return t=e,(n=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var n=this._prepareSearchers(e),r=n.tokenSearchers,o=n.fullSearcher,i=this._search(r,o),a=i.weights,s=i.results;return this._computeScore(a,s),this.options.shouldSort&&this._sort(s),t.limit&&"number"==typeof t.limit&&(s=s.slice(0,t.limit)),this._format(s)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var n=e.split(this.options.tokenSeparator),r=0,o=n.length;r<o;r+=1)t.push(new i(n[r],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=this.list,r={},o=[];if("string"==typeof n[0]){for(var i=0,a=n.length;i<a;i+=1)this._analyze({key:"",value:n[i],record:i,index:i},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t});return{weights:null,results:o}}for(var s={},c=0,l=n.length;c<l;c+=1)for(var h=n[c],u=0,f=this.options.keys.length;u<f;u+=1){var p=this.options.keys[u];if("string"!=typeof p){if(s[p.name]={weight:1-p.weight||1},p.weight<=0||p.weight>1)throw new Error("Key weight has to be > 0 and <= 1");p=p.name}else s[p]={weight:1};this._analyze({key:p,value:this.options.getFn(h,p),record:h,index:c},{resultMap:r,results:o,tokenSearchers:e,fullSearcher:t})}return{weights:s,results:o}}},{key:"_analyze",value:function(e,t){var n=e.key,r=e.arrayIndex,o=void 0===r?-1:r,i=e.value,a=e.record,c=e.index,l=t.tokenSearchers,h=void 0===l?[]:l,u=t.fullSearcher,f=void 0===u?[]:u,p=t.resultMap,d=void 0===p?{}:p,v=t.results,g=void 0===v?[]:v;if(null!=i){var y=!1,m=-1,k=0;if("string"==typeof i){this._log("\nKey: ".concat(""===n?"-":n));var b=f.search(i);if(this._log('Full text: "'.concat(i,'", score: ').concat(b.score)),this.options.tokenize){for(var x=i.split(this.options.tokenSeparator),S=[],_=0;_<h.length;_+=1){var M=h[_];this._log('\nPattern: "'.concat(M.pattern,'"'));for(var w=!1,O=0;O<x.length;O+=1){var C=x[O],L=M.search(C),P={};L.isMatch?(P[C]=L.score,y=!0,w=!0,S.push(L.score)):(P[C]=1,this.options.matchAllTokens||S.push(1)),this._log('Token: "'.concat(C,'", score: ').concat(P[C]))}w&&(k+=1)}m=S[0];for(var j=S.length,T=1;T<j;T+=1)m+=S[T];m/=j,this._log("Token score average:",m)}var A=b.score;m>-1&&(A=(A+m)/2),this._log("Score average:",A);var I=!this.options.tokenize||!this.options.matchAllTokens||k>=h.length;if(this._log("\nCheck Matches: ".concat(I)),(y||b.isMatch)&&I){var E=d[c];E?E.output.push({key:n,arrayIndex:o,value:i,score:A,matchedIndices:b.matchedIndices}):(d[c]={item:a,output:[{key:n,arrayIndex:o,value:i,score:A,matchedIndices:b.matchedIndices}]},g.push(d[c]))}}else if(s(i))for(var $=0,z=i.length;$<z;$+=1)this._analyze({key:n,arrayIndex:$,value:i[$],record:a,index:c},{resultMap:d,results:g,tokenSearchers:h,fullSearcher:f})}}},{key:"_computeScore",value:function(e,t){this._log("\n\nComputing score:\n");for(var n=0,r=t.length;n<r;n+=1){for(var o=t[n].output,i=o.length,a=1,s=1,c=0;c<i;c+=1){var l=e?e[o[c].key].weight:1,h=(1===l?o[c].score:o[c].score||.001)*l;1!==l?s=Math.min(s,h):(o[c].nScore=h,a*=h)}t[n].score=1===s?a:s,this._log(t[n])}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var n=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===r(t)&&null!==t){if(-1!==n.indexOf(t))return;n.push(t)}return t})),n=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var n=e.output;t.matches=[];for(var r=0,o=n.length;r<o;r+=1){var i=n[r];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},l=0,h=o.length;l<h;l+=1)o[l](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,n),c&&o(t,c),e}();e.exports=c},function(e,t,n){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=n(3),i=n(4),a=n(7),s=function(){function e(t,n){var r=n.location,o=void 0===r?0:r,i=n.distance,s=void 0===i?100:i,c=n.threshold,l=void 0===c?.6:c,h=n.maxPatternLength,u=void 0===h?32:h,f=n.isCaseSensitive,p=void 0!==f&&f,d=n.tokenSeparator,v=void 0===d?/ +/g:d,g=n.findAllMatches,y=void 0!==g&&g,m=n.minMatchCharLength,k=void 0===m?1:m;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:l,maxPatternLength:u,isCaseSensitive:p,tokenSeparator:v,findAllMatches:y,minMatchCharLength:k},this.pattern=this.options.isCaseSensitive?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern))}var t,n,s;return t=e,(n=[{key:"search",value:function(e){if(this.options.isCaseSensitive||(e=e.toLowerCase()),this.pattern===e)return{isMatch:!0,score:0,matchedIndices:[[0,e.length-1]]};var t=this.options,n=t.maxPatternLength,r=t.tokenSeparator;if(this.pattern.length>n)return o(e,this.pattern,r);var a=this.options,s=a.location,c=a.distance,l=a.threshold,h=a.findAllMatches,u=a.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:s,distance:c,threshold:l,findAllMatches:h,minMatchCharLength:u})}}])&&r(t.prototype,n),s&&r(t,s),e}();e.exports=s},function(e,t){var n=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(n,"\\$&").replace(r,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,l=i.length;c<l;c+=1){var h=i[c];s.push([e.indexOf(h),h.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,n){var r=n(5),o=n(6);e.exports=function(e,t,n,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,l=void 0===c?100:c,h=i.threshold,u=void 0===h?.6:h,f=i.findAllMatches,p=void 0!==f&&f,d=i.minMatchCharLength,v=void 0===d?1:d,g=s,y=e.length,m=u,k=e.indexOf(t,g),b=t.length,x=[],S=0;S<y;S+=1)x[S]=0;if(-1!==k){var _=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:l});if(m=Math.min(_,m),-1!==(k=e.lastIndexOf(t,g+b))){var M=r(t,{errors:0,currentLocation:k,expectedLocation:g,distance:l});m=Math.min(M,m)}}k=-1;for(var w=[],O=1,C=b+y,L=1<<b-1,P=0;P<b;P+=1){for(var j=0,T=C;j<T;)r(t,{errors:P,currentLocation:g+T,expectedLocation:g,distance:l})<=m?j=T:C=T,T=Math.floor((C-j)/2+j);C=T;var A=Math.max(1,g-T+1),I=p?y:Math.min(g+T,y)+b,E=Array(I+2);E[I+1]=(1<<P)-1;for(var $=I;$>=A;$-=1){var z=$-1,F=n[e.charAt(z)];if(F&&(x[z]=1),E[$]=(E[$+1]<<1|1)&F,0!==P&&(E[$]|=(w[$+1]|w[$])<<1|1|w[$+1]),E[$]&L&&(O=r(t,{errors:P,currentLocation:z,expectedLocation:g,distance:l}))<=m){if(m=O,(k=z)<=g)break;A=Math.max(1,2*g-k)}}if(r(t,{errors:P+1,currentLocation:g,expectedLocation:g,distance:l})>m)break;w=E}return{isMatch:k>=0,score:0===O?.001:O,matchedIndices:o(x,v)}}},function(e,t){e.exports=function(e,t){var n=t.errors,r=void 0===n?0:n,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,l=void 0===c?100:c,h=r/e.length,u=Math.abs(s-i);return l?h+u/l:u?1:h}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===r?r=i:s||-1===r||((o=i-1)-r+1>=t&&n.push([r,o]),r=-1)}return e[i-1]&&i-r>=t&&n.push([r,i-1]),n}},function(e,t){e.exports=function(e){for(var t={},n=e.length,r=0;r<n;r+=1)t[e.charAt(r)]=0;for(var o=0;o<n;o+=1)t[e.charAt(o)]|=1<<n-o-1;return t}},function(e,t,n){var r=n(0);e.exports=function(e,t){return function e(t,n,o){if(n){var i=n.indexOf("."),a=n,s=null;-1!==i&&(a=n.slice(0,i),s=n.slice(i+1));var c=t[a];if(null!=c)if(s||"string"!=typeof c&&"number"!=typeof c)if(r(c))for(var l=0,h=c.length;l<h;l+=1)e(c[l],s,o);else s&&e(c,s,o);else o.push(c.toString())}else o.push(t);return o}(e,t,[])}}])})}}]);
//# sourceMappingURL=chunk-1f57d0cf.9e15ed0f.js.map