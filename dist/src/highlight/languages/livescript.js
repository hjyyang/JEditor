const KEYWORDS=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],LITERALS=["true","false","null","undefined","NaN","Infinity"],TYPES=["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer"],ERROR_TYPES=["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],BUILT_IN_GLOBALS=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],BUILT_IN_VARIABLES=["arguments","this","super","console","window","document","localStorage","module","global"],BUILT_INS=[].concat(BUILT_IN_GLOBALS,BUILT_IN_VARIABLES,TYPES,ERROR_TYPES);function livescript(e){var n={keyword:KEYWORDS.concat(["then","unless","until","loop","of","by","when","and","or","is","isnt","not","it","that","otherwise","from","to","til","fallthrough","case","enum","native","list","map","__hasProp","__extends","__slice","__bind","__indexOf"]).join(" "),literal:LITERALS.concat(["yes","no","on","off","it","that","void"]).join(" "),built_in:BUILT_INS.concat(["npm","print"]).join(" ")},a="[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*",t=e.inherit(e.TITLE_MODE,{begin:a}),r={className:"subst",begin:/#\{/,end:/}/,keywords:n},i={className:"subst",begin:/#[A-Za-z$_]/,end:/(?:\-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,keywords:n},s=[e.BINARY_NUMBER_MODE,{className:"number",begin:"(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)",relevance:0,starts:{end:"(\\s*/)?",relevance:0}},{className:"string",variants:[{begin:/'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE]},{begin:/'/,end:/'/,contains:[e.BACKSLASH_ESCAPE]},{begin:/"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,r,i]},{begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,r,i]},{begin:/\\/,end:/(\s|$)/,excludeEnd:!0}]},{className:"regexp",variants:[{begin:"//",end:"//[gim]*",contains:[r,e.HASH_COMMENT_MODE]},{begin:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W)/}]},{begin:"@"+a},{begin:"``",end:"``",excludeBegin:!0,excludeEnd:!0,subLanguage:"javascript"}];r.contains=s;var o={className:"params",begin:"\\(",returnBegin:!0,contains:[{begin:/\(/,end:/\)/,keywords:n,contains:["self"].concat(s)}]};return{name:"LiveScript",aliases:["ls"],keywords:n,illegal:/\/\*/,contains:s.concat([e.COMMENT("\\/\\*","\\*\\/"),e.HASH_COMMENT_MODE,{begin:"(#=>|=>|\\|>>|-?->|\\!->)"},{className:"function",contains:[t,o],returnBegin:!0,variants:[{begin:"("+a+"\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B\\->\\*?",end:"\\->\\*?"},{begin:"("+a+"\\s*(?:=|:=)\\s*)?!?(\\(.*\\))?\\s*\\B[-~]{1,2}>\\*?",end:"[-~]{1,2}>\\*?"},{begin:"("+a+"\\s*(?:=|:=)\\s*)?(\\(.*\\))?\\s*\\B!?[-~]{1,2}>\\*?",end:"!?[-~]{1,2}>\\*?"}]},{className:"class",beginKeywords:"class",end:"$",illegal:/[:="\[\]]/,contains:[{beginKeywords:"extends",endsWithParent:!0,illegal:/[:="\[\]]/,contains:[t]},t]},{begin:a+":",end:":",returnBegin:!0,returnEnd:!0,relevance:0}])}}module.exports=livescript;