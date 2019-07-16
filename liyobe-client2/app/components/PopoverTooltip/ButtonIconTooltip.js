import React from 'react';
import { Tooltip } from 'reactstrap';

export class ButtonIconTooltip extends React.Component {
  isMount = false;

  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false,
    };
  }

  componentWillMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  toggle = () => {
    if (this.isMount) {
      this.setState(prevState => ({
        tooltipOpen: !prevState.tooltipOpen,
      }));
    }
  };

  render() {
    const { tooltipOpen } = this.state;
    return (
      <span className="mr-2">
        <button
          onClick={this.props.onClick}
          type="button"
          className={this.props.item.classButton}
          color="secondary"
          id={`Tooltip-${this.props.id}`}
        >
          {this.props.item.text}
        </button>
        <Tooltip
          delay={{ show: 500, hide: 100 }}
          placement={this.props.item.placement}
          isOpen={tooltipOpen}
          target={`Tooltip-${this.props.id}`}
          toggle={this.toggle}
          trigger="hover"
        >
          {this.props.item.body}
        </Tooltip>
      </span>
    );
  }
}
