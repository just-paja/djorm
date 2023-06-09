"use strict";(self.webpackChunkdjorm_docs=self.webpackChunkdjorm_docs||[]).push([[8400],{876:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>g});var r=t(2784);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),d=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=d(e.components);return r.createElement(p.Provider,{value:n},e.children)},l="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),l=d(t),m=o,g=l["".concat(p,".").concat(m)]||l[m]||u[m]||a;return t?r.createElement(g,i(i({ref:n},c),{},{components:t})):r.createElement(g,i({ref:n},c))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=m;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[l]="string"==typeof e?e:o,i[1]=s;for(var d=2;d<a;d++)i[d]=t[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},1587:(e,n,t)=>{t.r(n),t.d(n,{default:()=>c,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=t(7896),o=(t(2784),t(876));const a={sidebar_position:3},i={unversionedId:"getting-started/monorepo",id:"getting-started/monorepo",isDocsHomePage:!1,title:"Monorepo",description:"If your app lives inside a monorepo (for example managed by lerna), you should consider creating core package to handle configuration and model definition. All packages using models should then depend on the core package.",source:"@site/docs/getting-started/monorepo.md",sourceDirName:"getting-started",slug:"/getting-started/monorepo",permalink:"/djorm/docs/getting-started/monorepo",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/getting-started/monorepo.md",version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Create first model",permalink:"/djorm/docs/getting-started/create-first-model"},next:{title:"Connect your app",permalink:"/djorm/docs/getting-started/connect"}},s=[{value:"Dependencies",id:"dependencies",children:[]},{value:"Requiring models",id:"requiring-models",children:[]}],p={toc:s},d="wrapper";function c(e){let{components:n,...t}=e;return(0,o.kt)(d,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"If your app lives inside a monorepo (for example ",(0,o.kt)("a",{parentName:"p",href:"https://lerna.js.org/"},"managed by lerna"),"), you should consider creating core package to handle configuration and model definition. All packages using models should then depend on the core package."),(0,o.kt)("p",null,"This is an example of lerna package structure"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"spotify-stats-loader/\n\u251c\u2500 node_modules/\n\u251c\u2500 packages/\n\u2502  \u251c\u2500 core/\n\u2502  \u2502  \u251c\u2500 models.js\n\u2502  \u2502  \u251c\u2500 settings.js\n\u2502  \u2502  \u2514\u2500 package.json\n\u2502  \u251c\u2500 episode-loader/\n\u2502  \u2502  \u251c\u2500 index.js\n\u2502  \u2502  \u2514\u2500 package.json\n\u2502  \u2514\u2500 stats-loader/\n\u2502     \u251c\u2500 index.js\n\u2502     \u2514\u2500 package.json\n\u251c\u2500 .gitignore\n\u251c\u2500 package.json\n\u251c\u2500 package-lock.json\n\u2514\u2500 README.md\n")),(0,o.kt)("h2",{id:"dependencies"},"Dependencies"),(0,o.kt)("p",null,"Make sure that both ",(0,o.kt)("inlineCode",{parentName:"p"},"episode-loader")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"stats-loader")," depend on the ",(0,o.kt)("inlineCode",{parentName:"p"},"core"),". This would be ",(0,o.kt)("inlineCode",{parentName:"p"},"packages/episode-loader/package.json")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "stats-loader",\n  "dpendencies": {\n    "core": "file:../core"\n  }\n}\n')),(0,o.kt)("h2",{id:"requiring-models"},"Requiring models"),(0,o.kt)("p",null,"This could be body of the ",(0,o.kt)("inlineCode",{parentName:"p"},"packages/episode-loader/index.js")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const { SpotifyEpisode } = require('core/models')\n\nconst runJob = async () => {\n  const models = await SpotifyEpisode.objects.all()\n  console.log(models)\n}\n\nmodule.exports = {\n  runJob\n}\n")))}c.isMDXComponent=!0}}]);