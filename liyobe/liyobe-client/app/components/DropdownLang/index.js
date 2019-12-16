import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { intlShape } from 'react-intl';
import {
  changeLocale,
  getLocaleRequest,
} from 'containers/LanguageProvider/actions';
import Flag from 'react-world-flags';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import {
  makeSelectLocale,
  makeSelectListLocales,
} from 'containers/LanguageProvider/selectors';
import commonMessage from 'utils/commonMessage';

/* eslint-disable react/prefer-stateless-function */
export class ChangeLanguage extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  state = {
    dropdownOpen: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  componentWillMount() {
    this.props.onRequestLocale();
    window.addEventListener('scroll', this.hideDropDown);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideDropDown);
  }

  hideDropDown = () => {
    this.setState({
      dropdownOpen: false,
    });
  };

  flag = code => {
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
    return null;
  };

  render() {
    const { formatMessage } = this.context.intl;
    const localeOptions = this.props.listLocales;
    const { isPageLd } = this.props;
    return (
      <Dropdown
        nav={isPageLd}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle
          id="dropLang"
          nav={isPageLd}
          caret
          color="link"
          size="sm"
          className="language-button"
        >
          <span className="name">
            {formatMessage(commonMessage[this.props.locale])}
          </span>
        </DropdownToggle>
        <DropdownMenu right id="dropdownLang">
          {localeOptions.map(l => (
            <DropdownItem
              onClick={() => this.props.onLocaleToggle(l.Id)}
              key={l.Id}
            >
              {this.flag(l.Id)}
              {formatMessage(commonMessage[l.Id])}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
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
    onRequestLocale: () => dispatch(getLocaleRequest()),
    onLocaleToggle: value => dispatch(changeLocale(value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeLanguage);
