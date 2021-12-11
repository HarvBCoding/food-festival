const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js",
];

// service workers run before the window object has been created, self refers to the service worker
self.addEventListener("install", function (e) {
  // tells the browser to wait until the work is complete before terminating the service worker
  // so that the service worker doesn't move on from the installing phase until it's finished executing all of its code
  e.waitUntil(
    // cache.open finds the specific cache by name, then add every file in the FILES_TO_CACHE array to the cache
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

//delete outdated caches
self.addEventListener("activate", function (e) {
  e.waitUntil(
    // .keys() returns an array of all cache names called keylist; keylist is a parameter that contains all cache names
    caches.keys().then(function (keyList) {
      let cacheKeeplist = keyList.filter(function (key) {
        // capture caches that have the APP_PREFIX prefix
        return key.indexOf(APP_PREFIX);
      });
      //add current cache name to keeplist
      cacheKeeplist.push(CACHE_NAME);

      // promise will resolve once all old versions of the cache have been deleted
      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// Respond w/ cached resources
self.addEventListener("fetch", function (e) {
  console.log("fetch request : " + e.request.url);
  // respondWith method will intercept the fetch request
  e.respondWith(
      // .match() will determine if the resource already exists in caches
    caches.match(e.request).then(function (request) {
        // if it does, log the url to the console w/ a message
      if (request) {
        console.log("responding with cache : " + e.request.url);
        //  & then return the cached resource
        return request;
        // if it's not in caches, allow the resource to be retrieved from the online network
      } else {
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }

      // You can omit if/else for console.log & put one line below like this:
      // return request || fetch(e.request)
    })
  );
});
