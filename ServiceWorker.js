const cacheName = "Helvest-Reverse Falls Open Project-1.0";
const contentToCache = [
    "Build/RF_Web_Beta.loader.js",
    "Build/cfe6b75c71d632710f52b8f055de42af.js.unityweb",
    "Build/55146a9b1b66f6a8b4d44e02cd494bd9.data.unityweb",
    "Build/eb42f7484aa396d10d4172a52f8c0065.wasm.unityweb",
    "TemplateData/style.css"
];
self.addEventListener('install', function (e) {
    //console.log('[Service Worker] Install');
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      //console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});
self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      //console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }
      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      //console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
