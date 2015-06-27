// Inspired by
// https://github.com/svenanders/react-breadcrumbs/blob/master/index.js

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

function getBreadcrumbs(router, getTitle) {
  const routes = router.getCurrentRoutes();
  const params = router.getCurrentParams();

  const breadcrumbs = routes.map(route => {
    let name = route.name ||
               route.handler.displayName ||
               route.handler.name;

    if (getTitle) {
      const title = getTitle(name, route, params);
      if (title || title === false) {
        name = title;
      }
    }

    return {
      to: route.name || '/',
      params,
      name
    };
  })
  .filter(obj => obj && (obj.name || obj.isActive));
  
  return breadcrumbs.map((obj, idx) => ({...obj, isActive: idx === breadcrumbs.length - 1}));
}

export default class Breadcrumbs extends Component {
  static propTypes = {
    getTitle: PropTypes.func,
    className: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  render() {
    const { router } = this.context;
    const { getTitle, className } = this.props;
    const breadcrumbs = getBreadcrumbs(router, getTitle);
  
    return (
      <ol className={className ? `breadcrumb ${className}` : 'breadcrumb'}>
        {breadcrumbs.map((breadcrumb, idx) =>
          <li className={breadcrumb.isActive && 'active'}
              key={`breadcrumb-${idx}`}>
            {breadcrumb.isActive ?
              breadcrumb.name || '...' :
              <Link to={breadcrumb.to}
                    params={breadcrumb.params}>
                {breadcrumb.name}
              </Link>
            }
          </li>
        )}
      </ol>
    );
  }
}
