"use strict";(self.webpackChunkdjorm_docs=self.webpackChunkdjorm_docs||[]).push([[113],{876:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var n=r(2784);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(r),m=o,f=p["".concat(l,".").concat(m)]||p[m]||u[m]||i;return r?n.createElement(f,a(a({ref:t},d),{},{components:r})):n.createElement(f,a({ref:t},d))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1331:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>s});var n=r(7896),o=(r(2784),r(876));const i={sidebar_position:3},a={unversionedId:"concepts/fields",id:"concepts/fields",isDocsHomePage:!1,title:"Fields",description:"Fields are specified as class attributes - static properties. Be careful not to choose field names that conflict with the models API like save, create or delete.",source:"@site/docs/concepts/fields.md",sourceDirName:"concepts",slug:"/concepts/fields",permalink:"/djorm/docs/concepts/fields",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/concepts/fields.md",version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Models",permalink:"/djorm/docs/concepts/models"},next:{title:"Logger",permalink:"/djorm/docs/concepts/logger"}},s=[{value:"Field types",id:"field-types",children:[]},{value:"Field options",id:"field-options",children:[]}],l={toc:s},c="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(c,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Fields are specified as class attributes - static properties. Be careful not to choose field names that conflict with the ",(0,o.kt)("a",{parentName:"p",href:"/docs/models/DatabaseModel"},"models API")," like ",(0,o.kt)("strong",{parentName:"p"},"save"),", ",(0,o.kt)("strong",{parentName:"p"},"create")," or ",(0,o.kt)("strong",{parentName:"p"},"delete"),"."),(0,o.kt)("p",null,"Example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const { DatabaseModel } = require('djorm/models')\nconst { CharField } = require('djorm/fields/CharField')\nconst { DateField } = require('djorm/fields/DateField')\nconst { ForeignKey } = require('djorm/fields/ForeignKey')\nconst { PositiveIntegerField } = require('djorm/fields/PositiveIntegerField')\n\nclass Musician extends DatabaseModel {\n  id = new AutoField()\n  firstName = new CharField({ maxLength: 30 })\n  lastName = new CharField({ maxLength: 30 })\n  instrument = new CharField({ maxLength: 100 })\n}\n\nclass Album extends DatabaseModel {\n  artist = new ForeignKey({ model: 'Musician', onDelete: ForeignKey.CASCADE })\n  name = new CharField({ maxLength: 100 })\n  releaseDate = new DateField()\n  numStars = new PositiveIntegerField()\n}\n\nmodule.exports = { Musician, Album }\n")),(0,o.kt)("h2",{id:"field-types"},"Field types"),(0,o.kt)("p",null,"Each field in your model should be an instance of the appropriate ",(0,o.kt)("a",{parentName:"p",href:"/docs/models/fields/Field"},"Field class"),". Djorm uses the field class types to determine quite a few things:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The column type which tells the database what kind of data to store (e.g. INTEGER,VARCHAR,TEXT)"),(0,o.kt)("li",{parentName:"ul"},"The type validations")),(0,o.kt)("h2",{id:"field-options"},"Field options"),(0,o.kt)("p",null,"Each field takes a certain set of field-specific properties. For example ",(0,o.kt)("a",{parentName:"p",href:"/docs/models/fields/CharField"},"CharField")," requires maxLength."))}d.isMDXComponent=!0}}]);