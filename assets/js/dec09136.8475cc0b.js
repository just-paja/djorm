"use strict";(self.webpackChunkdjorm_docs=self.webpackChunkdjorm_docs||[]).push([[6588],{876:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||o;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},709:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return c}});var r=n(7896),a=n(1461),o=(n(2784),n(876)),i=["components"],l={sidebar_position:4},s={unversionedId:"settings",id:"settings",isDocsHomePage:!1,title:"Settings",description:"apps",source:"@site/docs/settings.md",sourceDirName:".",slug:"/settings",permalink:"/djorm/docs/settings",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/settings.md",version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Querying",permalink:"/djorm/docs/concepts/querying"},next:{title:"Database Model",permalink:"/djorm/docs/models/DatabaseModel"}},p=[{value:"apps",id:"apps",children:[]},{value:"databases",id:"databases",children:[{value:"driver",id:"driver",children:[]},{value:"connectionMaxAge",id:"connectionmaxage",children:[]},{value:"password",id:"password",children:[]},{value:"port",id:"port",children:[]},{value:"user",id:"user",children:[]}]},{value:"logger",id:"logger",children:[{value:"level",id:"level",children:[]},{value:"transport",id:"transport",children:[]}]},{value:"secretKey",id:"secretkey",children:[]}],u={toc:p};function c(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"apps"},"apps"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"[]")," (Empty array)"),(0,o.kt)("p",null,"Djorm borrows the concept of apps from Django. Some apps require initialization before they can be used. Reference them inside djorm settings so it can initialize and shutdown apps when the moment is right"),(0,o.kt)("h2",{id:"databases"},"databases"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"{}")," (Empty object)"),(0,o.kt)("p",null,"Configure database backends your application will communicate with. Key can be referenced in ",(0,o.kt)("a",{parentName:"p",href:"/docs/concepts/models"},"models")," to determine which database will be used."),(0,o.kt)("p",null,"The simplest possible settings is for single database setup using SQLite. This can be configured using following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"configure({\n  databases: {\n    default: {\n      driver: 'djorm-db-sqlite',\n      path: 'database.sqlite'\n    }\n  }\n})\n")),(0,o.kt)("p",null,"When connecting to other databas backends, such as PostgreSQL, MariaDB or MySQL, additional connection parameters will be required."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Usually you'll want to have separate configuration for local development and your other environments. Use environmental variables for that.")),(0,o.kt)("h3",{id:"driver"},"driver"),(0,o.kt)("p",null,"The database backend to use. Here are some of the supported drivers:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/just-paja/djorm/tree/master/packages/djorm-db-mysql"},(0,o.kt)("inlineCode",{parentName:"a"},"'djorm-db-mysql'"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/just-paja/djorm/tree/master/packages/djorm-db-gcp-bigquery"},(0,o.kt)("inlineCode",{parentName:"a"},"'djorm-db-gcp-bigquery'"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/just-paja/djorm/tree/master/packages/djorm-db-gcp-datastore"},(0,o.kt)("inlineCode",{parentName:"a"},"'djorm-db-gcp-datastore'"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/just-paja/djorm/tree/master/packages/djorm-db-sqlite"},(0,o.kt)("inlineCode",{parentName:"a"},"'djorm-db-sqlite'")))),(0,o.kt)("h3",{id:"connectionmaxage"},"connectionMaxAge"),(0,o.kt)("p",null,"Default: 0"),(0,o.kt)("p",null,"The lifetime of a database connection, as an integer of miliseconds. Use 0 to close database connections at the end of each request and ",(0,o.kt)("inlineCode",{parentName:"p"},"null")," for unlimited persistent connections."),(0,o.kt)("h3",{id:"password"},"password"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"null")),(0,o.kt)("p",null,"The password to use when connecting to the database."),(0,o.kt)("h3",{id:"port"},"port"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"null")),(0,o.kt)("p",null,"The port to use when connecting to the database. Use ",(0,o.kt)("inlineCode",{parentName:"p"},"null")," for the default port."),(0,o.kt)("h3",{id:"user"},"user"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"null")),(0,o.kt)("p",null,"The username to use when connecting to the database."),(0,o.kt)("h2",{id:"logger"},"logger"),(0,o.kt)("p",null,"Djorm uses ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/pinojs/pino"},"Pino.js")," internally as a logger. This configuration is passed directly to the logger."),(0,o.kt)("h3",{id:"level"},"level"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"'info'")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/pinojs/pino/blob/master/docs/api.md#logger-level"},"Pino.js level"),", the logger will display messages with severity same or higher to this setting."),(0,o.kt)("h3",{id:"transport"},"transport"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"null")),(0,o.kt)("p",null,"You can customize the transport that delivers your logs by specifying a require path."),(0,o.kt)("h2",{id:"secretkey"},"secretKey"),(0,o.kt)("p",null,"Default: ",(0,o.kt)("inlineCode",{parentName:"p"},"''")," (Empty string)"),(0,o.kt)("p",null,"A secret key for particular Djorm installation. This is used to provide cryptographic signing, and should be set to a unique unpredictable value."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Warning")),(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Keep this value secret.")),(0,o.kt)("p",{parentName:"blockquote"},"Running Djorm with a known ",(0,o.kt)("a",{parentName:"p",href:"#secretKey"},"secretKey")," defeats many of Djorm's security protections, and can lead to privilege escalation and remote code execution vulnerabilities.")))}c.isMDXComponent=!0}}]);