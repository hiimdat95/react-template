import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { intlShape } from 'react-intl';
import { changeLocale } from 'containers/LanguageProvider/actions';
import Flag from 'react-world-flags';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import {
  makeSelectLocale,
  makeSelectListLocales,
} from 'containers/LanguageProvider/selectors';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class ChangeLanguage extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  render() {
    const { formatMessage } = this.context.intl;
    const localeOptions = this.props.listLocales;
    const flag = code => {
      if (code === 'vi') {
        return <Flag code="vn" height="16" width="24" className="mr-1" />;
      }
      if (code === 'en') {
        return <Flag code="gb" height="16" width="24" className="mr-1" />;
      }
      if (code === 'ja') {
        return <Flag code="jp" height="16" width="24" className="mr-1" />;
      }
      if (code === 'ko') {
        return <Flag code="kr" height="16" width="24" className="mr-1" />;
      }
      if (code === 'zh') {
        return <Flag code="cn" height="16" width="24" className="mr-1" />;
      }
    };
    return (
      <UncontrolledDropdown className="ml-2">
        <DropdownToggle
          caret
          color="light"
          size="sm"
          className="language-button"
        >
          <span className="name">
            {formatMessage(messages[this.props.locale])}
          </span>
        </DropdownToggle>
        <DropdownMenu className="mt-3" right>
          {localeOptions.map(l => (
            <DropdownItem
              onClick={() => this.props.onLocaleToggle(l.localeNo)}
              key={l.localeNo}
            >
              {flag(l.localeNo)}
              {formatMessage(messages[l.localeNo])}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

ChangeLanguage.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  listLocales: makeSelectListLocales(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: value => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeLanguage);
