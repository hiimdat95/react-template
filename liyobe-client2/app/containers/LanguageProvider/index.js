/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { withCookies } from 'react-cookie';
import { compose } from 'redux';
import { CookieListLocale } from 'utils/constants';
import saga from './saga';
import { getLocaleRequest, setLocale } from './actions';
import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.initLocale();
  }

  initLocale = () => {
    const { cookies } = this.props;
    const listLocale = cookies.get(CookieListLocale);
    if (listLocale) {
      this.props.setLocale(listLocale);
    } else {
      this.props.onRequestLocale(cookies);
    }
  };

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

function mapDispatchToProps(dispatch) {
  return {
    onRequestLocale: cookies => dispatch(getLocaleRequest(cookies)),
    setLocale: values => dispatch(setLocale(values)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'locale', saga });

export default compose(
  withCookies,
  withSaga,
  withConnect,
)(LanguageProvider);
