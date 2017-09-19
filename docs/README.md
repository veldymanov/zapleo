# Zapleo

## Directory structure

```

```

## Service Worker
### Changes to the project
````
After making any changes to the project:
 1. In 'service-worker.js' change CACHE version here
    .....
    // Each time when make changes in project - change CACHE version
    const CACHE = 'templateCache-v1';
    ......
  2. Load changes to server and reload page to install new (changed) Service Worker. 
  3. Close (reload is not enough) the page (pages) in Browser and start it again to make 
  changed Service Worker active. Otherwise your application still will be under controll
  of previous Service Worker version.
````
### Service Worker
#### Short theory
````
A service worker is first registered.

After it is immediately downloaded when a user first accesses a service worker–controlled 
site/page.

Installation is attempted when the downloaded file is found to be new — either different 
to an existing service worker (byte-wise compared), or the first service worker encountered 
for this page/site.

If this is the first time a service worker has been made available, installation is attempted, 
then after a successful installation it is activated.

If there is an existing service worker available, the new version is installed in the background, 
but not yet activated — at this point it is called the worker in waiting. It is only activated 
when there are no longer any pages loaded that are still using the old service worker. 
As soon as there are no more such pages still loaded, the new service worker activates 
(becoming the active worker).

````
#### Coordination with server
````
As said above the Service Worker installation is attempted when the downloaded file 'service-worker.js'
is new or changed. And if your server cached this file the new version will be available only after server cache
renewal. And site/page will stay under control of old Srvice Worker version.
````