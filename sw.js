const cacheName = 'cacheV1'
const cacheFiles = [
    '/index.html',
    '/192.png',
    '/512.png',
    'src/App.vue',
    'src/app.js',
    'src/router.js',
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Cache file created')
            return cache.addAll(cacheFiles)
        })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
        .then(cacheKeys => {
            let deletePromises = []
            for (let i = 0; i < cacheKeys.length; i++) {
                if (cacheKeys[i] != cacheName) deletePromises.push(caches.delete(cacheKeys[i])) // check for old cachefiles
            }
            return Promise.all(deletePromises)
        })
    )
});