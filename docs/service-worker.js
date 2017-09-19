/**
 * To clear all caches set 'true'. (Not recommended to use)
 **/
const removeCache = false;

/**
 * Each time when make changes in project - change CACHE version. And:
 *   1. Reload page to install new (changed) Service Worker.
 *   2. Close (reload is not enough) the page (pages) in Browser and start it again.
 **/
const CACHE = 'zapleoCache-v5';

/**
 * Fill relative URLs for Service Worker cache
 * To stop Service Worker caching just remove all URLs
 * ('install' event fired when the browser runs the SW for the first time)
 * */
self.addEventListener('install', event => {
    console.log('The service worker is being installed.');

    event.waitUntil( caches.open(CACHE)
        .then( cache => {
            cache.addAll([
//                'main.php',
//                'css/home.css',
//                'js/main.min.js',
                'js/jquery.parallax.min.js',
                'fonts/functionpro_book.ttf',
                'fonts/functionpro_medium.ttf',
//                'images/evening_1.png',
 //               'images/evening_2.png',
//                'images/evening_3.png',
//                'images/evening_4.png',
//                'images/evening_5.png',
//                'images/footer_icons.svg',
//                'images/houses_lights_1.png',
 //               'images/houses_lights_2.png',
//                'images/houses_lights_3.png',
 //               'images/morning_1.png',
//                'images/morning_2.png',
//                'images/morning_3.png',
//                'images/morning_4.png',
 //               'images/morning_5.png',
 //               'images/night_1.png',
 //               'images/night_2.png',
//                'images/night_3.png',
 //               'images/night_4.png',
 //               'images/night_4_light.png',
//                'images/night_5.png',
//                'images/night_5_light.png',
 //               'images/work1.png',
 //               'images/work2.png',
 //               'images/work3.png',
 //               'images/work4.png'
            ])
        })
    );
});


// 'activate' event fired once the old SW is gone
self.addEventListener('activate', event => {
    console.log('The service worker is being activated');

    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if( CACHE != cacheName ) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 'fetch' event fired when any resource controlled by SW is fetched
self.addEventListener('fetch', event => {
    console.log('The service worker is serving the asset.');

    var url = new URL(event.request.url);

    // Clear cache during SW unregistering
    if ( removeCache ) {
        clearCache();
        return;
    }

    // offline-first
    // If match not found it results 'undefined' and starts 'fetch(event.request)'
    if (url.origin == location.origin && url.pathname == '/'){
        event.respondWith( caches.match('main.php')
            .then( response => response || fetch(event.request) )
//            .then( response => response && update(event) || fetch(event.request) )
        );
        return;
    }

    // If match not found it results 'undefined' and starts 'fetch(event.request)'
    event.respondWith(
        caches.match(event.request)
            .then( response => response || fetch(event.request) )
//            .then( response => response && update(event) || fetch(event.request) )
//            .then( response => response && console.log(response) || fetch(event.request) )
    );

});

///////////////////////////////////////////////////////////////////////
function update(event) {
    "use strict";

    var networkFetch = fetch(event.request);

    // …and waitUntil() to prevent the worker to be killed until the cache is updated.
    event.waitUntil(
        networkFetch.then( response => {
            //response can only be read once, that's why we clone
            const responseClone = response.clone();
            caches.open(CACHE)
                .then( cache => cache.put(event.request, responseClone) && console.log(event) );
        })
    );
}

function clearCache(){
    "use strict";

    //delete all Servise Worker caches
    caches.keys().then( cacheNames => {
        return Promise.all(
            cacheNames.map( cacheName => caches.delete(cacheName) )
        );
    });
//    console.log(navigator.serviceWorker);
    console.log("Service Worker's cache is cleared");
}