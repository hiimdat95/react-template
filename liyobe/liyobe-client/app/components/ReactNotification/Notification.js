import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { intlShape } from 'react-intl';
import mess from './messages';

class Notification extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    type: PropTypes.oneOf([
      'info',
      'success',
      'warning',
      'error',
      'primary',
      'secondary',
    ]),
    title: PropTypes.node,
    message: PropTypes.node.isRequired,
    timeOut: PropTypes.number,
    onClick: PropTypes.func,
    onRequestHide: PropTypes.func,
    customClassName: PropTypes.string,
    textColor: PropTypes.string,
  };

  static defaultProps = {
    type: 'info',
    title: null,
    timeOut: 5000,
    onClick: () => {},
    onRequestHide: () => {},
    customClassName: '',
    textColor: '',
  };

  componentDidMount = () => {
    const { timeOut } = this.props;
    if (timeOut !== 0) {
      this.timer = setTimeout(this.requestHide, timeOut);
    }
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
    this.requestHide();
  };

  requestHide = () => {
    const { onRequestHide } = this.props;
    if (onRequestHide) {
      onRequestHide();
    }
  };

  handleKeyDown = () => {};

  render() {
    const { type, message, textColor } = this.props;
    const { formatMessage } = this.context.intl;
    let { title } = this.props;
    const className = classnames([
      'notification',
      `notification-${type}`,
      this.props.customClassName,
    ]);
    title = title ? <h4 className="title">{title}</h4> : null;
    return (
      <div
        role="button"
        className={className}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        aria-hidden
      >
        <div className="notification-message" role="alert">
          {title}
          <div className={`${textColor}`}>{formatMessage(mess[message])}</div>
        </div>
      </div>
    );
  }
}

export default Notification;
