import React, { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const getMenuTitle = sub => <FormattedMessage {...messages[sub]} />;

const getUrl = (path, sub, index) => {
  if (index === 0) {
    return 'dashboard';
  }
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match }) => (
  <Fragment>
    {heading && <h1>{heading}</h1>}
    <BreadcrumbItems match={match} />
  </Fragment>
);

export const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter(x => x.indexOf(':') === -1);
  }
  return (
    <Fragment>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BreadcrumbItem key={index} active={paths.length === index + 1}>
            {paths.length !== index + 1 ? (
              <NavLink to={`/${getUrl(path, sub, index)}`}>
                {getMenuTitle(sub)}
              </NavLink>
            ) : (
              getMenuTitle(sub)
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Fragment>
  );
};

export default BreadcrumbContainer;
