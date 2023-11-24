var cache = "cacheFilokids"
var requestCache = [
    "/"
]
self.addEventListener("install", (installEvent) => {
    installEvent.waitUntill(
        caches.open(cache).then(async (cache) => {
            await cache.addAll(requestCache)
        }));
})