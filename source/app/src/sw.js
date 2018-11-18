importScripts("workbox-v3.6.3/workbox-sw.js");

workbox.setConfig({modulePathPrefix: 'workbox-v3.6.3/'})

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);

const dataCacheConfig = {
    cacheName: 'meme-data'
};

workbox.routing.registerRoute(/.*categories/, workbox.strategies.cacheFirst(dataCacheConfig), 'GET');
workbox.routing.registerRoute(/.*templates/, workbox.strategies.cacheFirst(dataCacheConfig), 'GET');
workbox.routing.registerRoute(/.*memes\/.\w+/, workbox.strategies.staleWhileRevalidate(dataCacheConfig), 'GET');

workbox.routing.registerRoute(
    /.*.(?:png|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'meme-images'
    }), 
    'GET');

self.addEventListener('install', function(event) {
    self.skipWaiting();
    });
