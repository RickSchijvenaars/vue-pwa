const cacheAppShell = 'cacheAppShell-v1'
const cacheProjects = 'cacheProjects-v1'
const apiProjectsPath = '/api/projects/'

const cacheFiles = [
    '/',
    '/192.png',
    '/512.png',
    '/manifest.json',
    '/main.js',
    '/runtime~main.js',
    '/vendors~main.js',
]


self.addEventListener('install', event => {
    self.skipWaiting()
    event.waitUntil(
        caches.open(cacheAppShell)
        .then(cache => {
            return cache.addAll(cacheFiles) //precache appshell
        })
    )
})

self.addEventListener('activate', event => {
    self.clients.claim()
    event.waitUntil(
        caches.keys() // get cache files
        .then(cacheKeys => {
            let deletePromises = []
            for (let i = 0; i < cacheKeys.length; i++) {
                if (cacheKeys[i] != cacheAppShell && cacheKeys[i] != cacheProjects) deletePromises.push(caches.delete(cacheKeys[i])) // check for old cachefiles
            }
            return Promise.all(deletePromises)
        })
    )
})

self.addEventListener('fetch', event => { // fetch controls every event
    const requestUrl = new URL(event.request.url)
    const requestPath = requestUrl.pathname
        // console.log(event)
    if (requestPath == apiProjectsPath) event.respondWith(networkFirstStrategy(event.request)); // for api call
    else event.respondWith(cacheFirstStrategy(event.request))
})

function cacheFirstStrategy(request) {
    return caches.match(request).then(cacheResponse => { // if request is in cache
        return cacheResponse || fetch(request)
            // .then(response => {

        // if (response.url) {
        //     const responseUrl = new URL(response.url)
        //     const responsePath = responseUrl.pathname
        //     if (responsePath == '/' || responsePath == '/runtime~main.js' || responsePath == '/vendors~main.js') {
        //         const responseCache = response.clone();

        //         caches.open(cacheAppShell)
        //             .then(function(cache) {
        //                 cache.put(request, responseCache);
        //             });

        //         return response;
        //     }
        // }

        // return response;
        // });
    });
}

function networkFirstStrategy(request) {
    return fetchRequestAndCache(request, cacheProjects) // try network
        .catch(response => { // if network problems
            return caches.match(request); // if older response in catch for same request, return old version
        })
}

function fetchRequestAndCache(request, cacheFile) {
    return fetch(request).then(networkResponse => { // if API-call successful and retrieved response
        caches.open(cacheFile) // get cache file
            .then(cache => {
                cache.put(request, networkResponse); // update cache file
            })
        return networkResponse.clone(); // already used at caching, a clone is needed or it will fail
    });
}