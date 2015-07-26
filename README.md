# react-bootstrap-breadcrumbs

Breadcrumbs for [React-Router](http://rackt.github.io/react-router/) and [Bootstrap](http://getbootstrap.com/components/#breadcrumbs)

Inspired by [React Breadcrumbs](https://github.com/svenanders/react-breadcrumbs)

## Installation

```
npm i -S react-bootstrap-breadcrumbs
```

## Example
```
<Route name='items' path='/items' handler={ItemsPage}>
  <Route name='item' path=':itemId' handler={ItemPage} />
</Route>

...

function getRouteTitle(name, route, params) {
  switch(name) {
  case 'items':
    return 'Items';
  case 'item':
    return 'Item #' + params.itemId;
  }
}

render() {
  return (
    <div>
      <Breadcrumbs getTitle={getRouteTitle} />
    </div>
  );
}
```

Render result:

```
<ol class="breadcrumbs">
  <li><a href="/items">Items</a></li>
  <li class="active">Item #42</li>
</ol>
```
