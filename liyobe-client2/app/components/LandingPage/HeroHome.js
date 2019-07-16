import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/CustomBootstrap';
import HomeHeroImg from 'assets/img/bg-1.jpg';

export class HeroHome extends React.Component {
  componentDidMount() {
    this.onResizeLandingPage();
    window.addEventListener('resize', this.onResizeLandingPage, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeLandingPage, true);
  }

  onResizeLandingPage() {
    const rowOffestHome = document.querySelector('.home-row').offsetLeft;
    document.querySelector(
      '.landing-page .section.home',
    ).style.backgroundPositionX = `${rowOffestHome - 252}px`;
  }

  render() {
    return (
      <Row className="home-row">
        <Colxx xxs="12" className="d-block d-md-none">
          <img alt="mobile hero" className="mobile-hero" src={HomeHeroImg} />
        </Colxx>

        <Colxx xxs="12" xl="4" lg="5" md="6">
          <div className="home-text">
            <div className="display-1">
              Hello
              <br />
              Pikaso
            </div>
            <p className="white mb-5">
              Detailll
              <br />
              <br />
              Too much
              <br />
              <br />
              Nothing
            </p>
          </div>
        </Colxx>

        <Colxx
          xxs="12"
          xl={{ size: 7, offset: 1 }}
          md="6"
          lg="7"
          className="d-none d-md-block"
        >
          <img alt="hero" src={HomeHeroImg} />
        </Colxx>
      </Row>
    );
  }
}
