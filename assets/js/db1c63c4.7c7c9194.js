"use strict";(self.webpackChunkdjorm_docs=self.webpackChunkdjorm_docs||[]).push([[1614],{876:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,h=u["".concat(c,".").concat(m)]||u[m]||p[m]||l;return n?r.createElement(h,i(i({ref:t},d),{},{components:n})):r.createElement(h,i({ref:t},d))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[u]="string"==typeof e?e:a,i[1]=o;for(var s=2;s<l;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3178:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>o});var r=n(7896),a=(n(2784),n(876));const l={sidebar_position:60},i={unversionedId:"models/SelectQuery",id:"models/SelectQuery",isDocsHomePage:!1,title:"Select Query",description:"When you query model via ObjectManager, you'll get a Select object.",source:"@site/docs/models/SelectQuery.md",sourceDirName:"models",slug:"/models/SelectQuery",permalink:"/djorm/docs/models/SelectQuery",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/models/SelectQuery.md",version:"current",sidebarPosition:60,frontMatter:{sidebar_position:60},sidebar:"tutorialSidebar",previous:{title:"TextField",permalink:"/djorm/docs/models/fields/TextField"},next:{title:"Init",permalink:"/djorm/docs/init"}},o=[{value:"Select instance methods",id:"select-instance-methods",children:[{value:"<code>all</code>",id:"all",children:[]},{value:"<code>count</code>",id:"count",children:[]},{value:"<code>distinct</code>",id:"distinct",children:[]},{value:"<code>exclude</code>",id:"exclude",children:[]},{value:"<code>filter</code>",id:"filter",children:[]},{value:"<code>first</code>",id:"first",children:[]},{value:"<code>get</code>",id:"get",children:[]},{value:"<code>last</code>",id:"last",children:[]},{value:"<code>limit</code>",id:"limit",children:[]},{value:"<code>selectRelated</code>",id:"selectrelated",children:[]},{value:"<code>stream</code>",id:"stream",children:[]}]}],c={toc:o},s="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"When you query model via ",(0,a.kt)("a",{parentName:"p",href:"/djorm/docs/models/ObjectManager"},"ObjectManager"),", you'll get a Select object."),(0,a.kt)("h2",{id:"select-instance-methods"},"Select instance methods"),(0,a.kt)("h3",{id:"all"},(0,a.kt)("inlineCode",{parentName:"h3"},"all")),(0,a.kt)("p",null,"Promise to return all model instances"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.all()\n")),(0,a.kt)("h3",{id:"count"},(0,a.kt)("inlineCode",{parentName:"h3"},"count")),(0,a.kt)("p",null,"Promise to count all model instances"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.count()\n")),(0,a.kt)("h3",{id:"distinct"},(0,a.kt)("inlineCode",{parentName:"h3"},"distinct")),(0,a.kt)("p",null,"Select only distinct records."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.distinct().all()\n")),(0,a.kt)("h3",{id:"exclude"},(0,a.kt)("inlineCode",{parentName:"h3"},"exclude")),(0,a.kt)("p",null,"Exclude records matching filter. This is an inversion of ",(0,a.kt)("a",{parentName:"p",href:"#filter"},".filter")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.exclude({ name: 'John' }).all()\n")),(0,a.kt)("h3",{id:"filter"},(0,a.kt)("inlineCode",{parentName:"h3"},"filter")),(0,a.kt)("p",null,"Include only records matching filter. This an inversion of ",(0,a.kt)("a",{parentName:"p",href:"#exclude"},".exclude"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.filter({ name: 'John' }).all()\n")),(0,a.kt)("h3",{id:"first"},(0,a.kt)("inlineCode",{parentName:"h3"},"first")),(0,a.kt)("p",null,"Promise to return first model instance. This is an inversion of ",(0,a.kt)("a",{parentName:"p",href:"#last"},".last")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.first()\n")),(0,a.kt)("h3",{id:"get"},(0,a.kt)("inlineCode",{parentName:"h3"},"get")),(0,a.kt)("p",null,"Filter model instances and get the first one or throw ObjectDoesNotExist"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.filter({ id: 1 }).get()\n")),(0,a.kt)("h3",{id:"last"},(0,a.kt)("inlineCode",{parentName:"h3"},"last")),(0,a.kt)("p",null,"Promise to return the last model instance. This is an inversion of ",(0,a.kt)("a",{parentName:"p",href:"#first"},".first"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.last()\n")),(0,a.kt)("h3",{id:"limit"},(0,a.kt)("inlineCode",{parentName:"h3"},"limit")),(0,a.kt)("p",null,"Select only certain amount of records."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"\nawait Pet.objects.query.filter({ alive: true }).limit(100).all()\n  \n### `orderBy`\n\nCreate sorted query\n\n```javascript\nawait Pet.objects.query.orderBy('name').all()\n")),(0,a.kt)("h3",{id:"selectrelated"},(0,a.kt)("inlineCode",{parentName:"h3"},"selectRelated")),(0,a.kt)("p",null,"Joins selected ForeignKey fields and automatically maps the model instances."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"await Pet.objects.query.selectRelated('owner', 'home').all()\n\n/*\nThe pet objects will have owner and home preloaded\n\n[\n  {\n    id: 1,\n    ownerId: 101,\n    homeId: 202,\n    owner: {\n      id: 101,\n      name: 'John',\n    },\n    homeId: {\n      id: 202,\n      location: 'Prague'\n    }\n  },\n  ...\n]\n*/\n")),(0,a.kt)("h3",{id:"stream"},(0,a.kt)("inlineCode",{parentName:"h3"},"stream")),(0,a.kt)("p",null,"Stream read model instances with Node.js streams. Returns instance of ",(0,a.kt)("a",{parentName:"p",href:"https://nodejs.org/api/stream.html#stream_class_stream_readable"},"Readable"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"const src = Promise.objects.stream()\n")))}d.isMDXComponent=!0}}]);