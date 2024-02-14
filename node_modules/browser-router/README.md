browser-router
==============

> A simple router for one page browser apps.


## WHY

> This is an effort of abstracting the routing such that applications can utilize a similar router on the client as on the server. The server counterpart is yet to be built.

## INSTALL

```
npm install --save browser-router
```

### USE

```
> var router = require('browser-router');
```

## API

### route(path, params, title)

```
> router.route('/login', { next: '/secret' }, 'Log In');
undefined
```

Make the router execute a route. This does a browser pushState to change the URL and params, while keeping the client app running.


### onRoute(handler)

```
  router.onRoute(function myHandler(route, params, title) {
  	// handle this change in browser state
  });
```

Catch an incoming route from the browser. This happens when:

* The user changes the route
* Browser back button, or `back()`
* Browser forward button, or `forward()`
* `route()`
* `setPath()`
* `setParams()`, `setParam()`, `removeParam()`, `toggleParam()`

Changes in the title do not cause routes. It is provided to the route handler as a convenience.


### offRoute(handler)

```
> router.offRoute(myHandler);
undefined
```

Remove a handler that was listening to the router via `onRoute`.

### getPath()

```
> router.getPath();
'/login'
```

Grab the current path. Excludes search query and hashstring parameters.

### setPath()

```
> router.setPath('/login/securely');
undefined
```

Change the current path, causing a route.

### getTitle()


```
> router.getTitle();
'Log In'
```

Get the title of the current location.


### setTitle()


```
> router.setTitle('Secure Log In');
undefined
```

Set the title of the current location. This alters the current spot in history and does *not* cause a route.


### getParams()

```
> router.getParams();
{ next: '/secret' }
```

Grab the current parameters object from the search query.

### getParam(paramName)

```
> router.getParam('next');
'/secret'
```

Grab a single search query string parameter.

### setParams(params)

```
> router.setParam({ next: '/secret/extra_secret', rememberMe: null });
undefined
```

Set a new params object, replacing the query string, causing a route.

This example would route to `?next=/secret/extra_secret&rememberMe`

When the values are `null`, the param will be present but have no value, like the `rememberMe` param in the example.

### hasParam(paramName)

```
> router.hasParam('rememberMe')
true
```

Checks for the presence of an item in the query string.

Useful for checking flags in the query, IE when the query string is `?next=/secret&rememberMe`

### setParam(paramName [, value])

```
> router.setParam('securityLevel', '3')
undefined
```

Set a single parameter in the query string without wiping out the rest of the params. Causes a route.

This example would route to `?next=/secret/extra_secret&rememberMe&securityLevel=3`

When the value is missing or `null`, the param will be present but have no value, like the `rememberMe` param in the example above.

### removeParam(paramName)

```
> router.removeParam('securityLevel')
undefined
```

This example would route to `?next=/secret/extra_secret&rememberMe`

Removes a parameter from the search query string. Mostly the inverse of `setParam`.

### toggleParam(paramName [, value])

```
> router.toggleParam('rememberMe')
undefined
```

This example would route to `?next=/secret/extra_secret`

Toggles the presence of a param in the query string. If setting the param, use the provided value.
