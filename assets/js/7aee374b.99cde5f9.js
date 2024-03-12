"use strict";(self.webpackChunkdjorm_docs=self.webpackChunkdjorm_docs||[]).push([[2531],{876:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(2784);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),d=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=d(r),m=o,f=p["".concat(s,".").concat(m)]||p[m]||u[m]||i;return r?n.createElement(f,a(a({ref:t},c),{},{components:r})):n.createElement(f,a({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:o,a[1]=l;for(var d=2;d<i;d++)a[d]=r[d];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},957:(e,t,r)=>{r.r(t),r.d(t,{default:()=>c,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var n=r(7896),o=(r(2784),r(876));const i={sidebar_position:40},a={unversionedId:"models/fields/DateField",id:"models/fields/DateField",isDocsHomePage:!1,title:"DateField",description:"A date, represented by Date object instance. It is stored in the database without time.",source:"@site/docs/models/fields/DateField.md",sourceDirName:"models/fields",slug:"/models/fields/DateField",permalink:"/djorm/docs/models/fields/DateField",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/models/fields/DateField.md",version:"current",sidebarPosition:40,frontMatter:{sidebar_position:40},sidebar:"tutorialSidebar",previous:{title:"CharField",permalink:"/djorm/docs/models/fields/CharField"},next:{title:"DateField",permalink:"/djorm/docs/models/fields/DateTimeField"}},l=[],s={toc:l},d="wrapper";function c(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"A date, represented by ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"},"Date object")," instance. It is stored in the database without time."),(0,o.kt)("p",null,"A good example for ",(0,o.kt)("strong",{parentName:"p"},"DateField")," is date of birth - you don't want to store time with birth date."))}c.isMDXComponent=!0}}]);