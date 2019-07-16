import React from 'react';
import { Button, Tooltip } from 'reactstrap';

export class TooltipItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false,
    };
  }

  toggle() {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  render() {
    return (
      <span>
        <Button
          className="mr-1 mb-2"
          color="secondary"
          id={`Tooltip-${this.props.id}`}
        >
          {this.props.item.text}
        </Button>
        <Tooltip
          placement={this.props.item.placement}
          isOpen={this.state.tooltipOpen}
          target={`Tooltip-${this.props.id}`}
          toggle={this.toggle}
        >
          {this.props.item.body}
        </Tooltip>
      </span>
    );
  }
}
