const cacheAppShell = 'cacheAppShell'
const cacheProjects = 'cacheProjects'
const apiProjectsPath = '/api/projects/'

const cacheFiles = [
    '/index.html',
    '/192.png',
    '/512.png',
    'src/App.vue',
    'src/app.js',
    'src/router.js',
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
        caches.keys()
        .then(cacheKeys => {
            let deletePromises = []
            for (let i = 0; i < cacheKeys.length; i++) {
                if (cacheKeys[i] != cacheAppShell && cacheKeys[i] != cacheProjects) deletePromises.push(caches.delete(cacheKeys[i])) // check for old cachefiles
            }
            return Promise.all(deletePromises)
        })
    )
})

self.addEventListener('fetch', event => { // fetch controls every event (like api call)
    const requestUrl = new URL(event.request.url)
    const requestPath = requestUrl.pathname
    if (requestPath == apiProjectsPath) event.respondWith(networkFirstStrategy(event.request)); // for api call
    // else if (requestPath == '/') event.respondWith(cacheFirstStrategy(event.request))
})

function cacheFirstStrategy(request) {
    return caches.match(request).then(cacheResponse => {
        return cacheResponse || fetchRequestAndCache(request);
    });
}

function networkFirstStrategy(request) {
    return fetchRequestAndCache(request) // try network
        .catch(response => { // if network problems
            console.log('no network')
            return caches.match(request); // if older response in catch for same request, return old version
        })
}

function fetchRequestAndCache(request) {
    return fetch(request).then(networkResponse => { // if API-call successful and retrieved response
        caches.open(cacheProjects) // get cachefile
            .then(cache => {
                cache.put(request, networkResponse); // add cache file
            })
        return networkResponse.clone(); // already used at caching, a clone is needed or it will fail
    });
}