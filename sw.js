/* Retired app (lean plan, 2026-11-20): this service worker removes itself
   and clears the old app's caches. The page now redirects into the
   Sharma Customer app. No fetch handler — everything goes to the network. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll(); })
      .then(function (clients) {
        clients.forEach(function (c) { if (c.url && "navigate" in c) { try { c.navigate(c.url); } catch (err) {} } });
      })
  );
});
