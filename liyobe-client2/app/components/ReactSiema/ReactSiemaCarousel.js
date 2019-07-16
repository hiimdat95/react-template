/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-string-refs */
/* eslint-disable prefer-destructuring */
import React, { Fragment } from 'react';
import ReactSiema from './lib';

export default class ReactSiemaCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.gotoNext = this.gotoNext.bind(this);
    this.renderDots = this.renderDots.bind(this);
    this.onDotClick = this.onDotClick.bind(this);
    this.updateAfterDrag = this.updateAfterDrag.bind(this);

    this.slider = null;
    this.state = {
      total: React.Children.count(this.props.children),
      perPage: 1,
      current: 0,
      activeDotIndex: 0,
    };
  }

  componentDidMount() {
    this.setState({
      current: this.refs.slider.currentSlide,
      perPage: this.refs.slider.getPerPage(),
    });
  }

  updateAfterDrag() {
    this.setState({
      current: this.refs.slider.currentSlide,
    });
  }

  gotoNext() {
    this.refs.slider.next();
    this.setState({
      current: this.refs.slider.currentSlide,
    });
  }

  gotoPrev() {
    this.refs.slider.prev();
    this.setState({
      current: this.refs.slider.currentSlide,
    });
  }

  onDotClick(dotIndex) {
    const perPage = this.state.perPage;
    let current = dotIndex * perPage;
    const total = this.state.total;

    this.setState({
      current,
    });

    if (perPage + current > total) {
      current = total - perPage;
    }

    this.refs.slider.goTo(current);
  }

  renderDots() {
    if (this.state.perPage === 0) {
      return <div />;
    }
    const dotCount = Math.ceil(this.state.total / this.state.perPage);
    const dots = [];

    const total = this.state.total;
    const current = this.state.current;
    const perPage = this.state.perPage;
    let dotIndex = Math.floor(current / perPage);
    if (current + perPage >= total) {
      dotIndex = dotCount - 1;
    }

    if (dotCount === 1) {
      return <div />;
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < dotCount; i++) {
      const className = i === dotIndex ? 'active' : '';
      dots.push(
        <button
          type="button"
          key={i}
          onClick={() => this.onDotClick(i)}
          className={`slider-dot ${className}`}
        />,
      );
    }
    return dots;
  }

  render() {
    return (
      <Fragment>
        <ReactSiema
          // eslint-disable-next-line react/no-string-refs
          ref="slider"
          onResize={perPage => {
            this.setState({
              perPage,
            });
          }}
          updateAfterDrag={this.updateAfterDrag}
          {...this.props}
        >
          {this.props.children}
        </ReactSiema>
        {this.props.controls !== false && (
          <div className="slider-nav text-center">
            <button
              type="button"
              className="left-arrow btn btn-link"
              onClick={() => this.gotoPrev()}
            >
              <i className="simple-icon-arrow-left" />
            </button>
            <div className="slider-dot-container">{this.renderDots()}</div>
            <button
              type="button"
              className="left-arrow btn btn-link"
              onClick={() => this.gotoNext()}
            >
              <i className="simple-icon-arrow-right" />
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}
