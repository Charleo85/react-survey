"use strict";var precacheConfig=[["/react-survey/index.html","6dab8b9b0194489effd6f12761c5820f"],["/react-survey/static/css/main.bbd50701.css","17bb9bf9e1ddc4a8864ea974847cf7d4"],["/react-survey/static/js/main.c252c85a.js","23b52c22b5ebdcaa6c8a62b4a07efc7e"],["/react-survey/static/media/0_0.153c323a.png","153c323acf15743a36ee81d9684e37b7"],["/react-survey/static/media/0_1.3ff8c260.png","3ff8c2601301cc91b190c41db34f4667"],["/react-survey/static/media/10_0.b0f5335b.png","b0f5335b823609d33b1d84dc6526942f"],["/react-survey/static/media/10_1.732eafed.png","732eafed1f4a28d3ebab00fd7ab71b64"],["/react-survey/static/media/11_0.83422eb8.png","83422eb84e8376b7725209287f5dd51f"],["/react-survey/static/media/11_1.b2f8ce75.png","b2f8ce75ffd4c621844d61bcc24598ce"],["/react-survey/static/media/12_0.ccae9d27.png","ccae9d273428d462114f41cb1e37cdd5"],["/react-survey/static/media/12_1.d9c15f9e.png","d9c15f9ef1ae465a73e357f9a0ac685c"],["/react-survey/static/media/13_0.b3896119.png","b3896119ee44d11b1d7b649d6e87a29b"],["/react-survey/static/media/13_1.9dcea835.png","9dcea835a962023dafe05c80a6366236"],["/react-survey/static/media/14_0.7be4c5a6.png","7be4c5a6114e93b1b46f16d0f723b4fa"],["/react-survey/static/media/14_1.567ea53b.png","567ea53bd490d75dbd808745f8344dd6"],["/react-survey/static/media/15_0.bf6a4bd2.png","bf6a4bd236ee666a65bfa422d187c42e"],["/react-survey/static/media/15_1.a45bb3e7.png","a45bb3e7ae9d238cf7ecbddb242eee70"],["/react-survey/static/media/16_0.4c52e00c.png","4c52e00c442baaf227d92785fdafc74d"],["/react-survey/static/media/16_1.110ba978.png","110ba9782d05c1ea0fbfaba634b868d1"],["/react-survey/static/media/17_0.b9e525e8.png","b9e525e81d83f6006e9832598557796e"],["/react-survey/static/media/17_1.1e045e74.png","1e045e7492d59e920b3da132b9845cdc"],["/react-survey/static/media/18_0.31d2d1d6.png","31d2d1d66ebd209f6c67a0e40604e963"],["/react-survey/static/media/18_1.9247d239.png","9247d239b6e56ed9d300c7e315ee9825"],["/react-survey/static/media/19_0.679cc4e8.png","679cc4e8fb4c04c453ed4d3456093a29"],["/react-survey/static/media/19_1.7361968f.png","7361968f466346eb847e4311048982af"],["/react-survey/static/media/1_0.5e66911b.png","5e66911bcb4b44eff08416c465b639a0"],["/react-survey/static/media/1_1.da62c6a2.png","da62c6a21053a7ef860f3b702c4416ff"],["/react-survey/static/media/2_0.7bd6560f.png","7bd6560f5cde7c5696a0c2116a3947a6"],["/react-survey/static/media/2_1.febe2371.png","febe2371cb79126f4aed04f668474919"],["/react-survey/static/media/3_0.962291f2.png","962291f2fe2522fa171bc9a3dd0115e3"],["/react-survey/static/media/3_1.b39eef9a.png","b39eef9a4c6185b9ee5ea5b59b9bc2c0"],["/react-survey/static/media/4_0.cfb4b687.png","cfb4b6875b807e9f267099246af9b9eb"],["/react-survey/static/media/4_1.abc4d6a7.png","abc4d6a7974b70db72736049e45ab666"],["/react-survey/static/media/5_0.e25000ae.png","e25000ae9c0f6eb025b081e9b528a622"],["/react-survey/static/media/5_1.e18d274b.png","e18d274b2d66ebb81f6f1038f38e7301"],["/react-survey/static/media/6_0.4658c5ab.png","4658c5abe8a836ede060bc012bfeec22"],["/react-survey/static/media/6_1.75ba0f37.png","75ba0f37f33d77488aca227585e0d65c"],["/react-survey/static/media/7_0.6574f478.png","6574f4784d62d6f8a4ec6b4fb1775196"],["/react-survey/static/media/7_1.00aeedfd.png","00aeedfd4fd5bd67d980f705f5fe8c96"],["/react-survey/static/media/8_0.4b218de2.png","4b218de21a380f73ffef7ab866d12ad4"],["/react-survey/static/media/8_1.0f9d5e49.png","0f9d5e49c72a083104050d27f5184ce8"],["/react-survey/static/media/9_0.4afa9031.png","4afa90311494423515ab0b4197c04107"],["/react-survey/static/media/9_1.59fd6b61.png","59fd6b61c7d74ece2fd0c475d61acf3e"],["/react-survey/static/media/example.38aeebce.jpg","38aeebcea0c0c8322121a8fa3347621e"],["/react-survey/static/media/logo.5d5d9eef.svg","5d5d9eefa31e5e13a6610d9fa7a283bb"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var r=new URL(e);return c&&r.pathname.match(c)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),r=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var r="/react-survey/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});