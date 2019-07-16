/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/CustomBootstrap';

export class HomeFeatures extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx
            xxs={{ size: '12', offset: 0 }}
            lg={{ size: 8, offset: 2 }}
            className="text-center"
          >
            <h1>
              a
            </h1>
            <p>
              b
            </p>
          </Colxx>
        </Row>

        <Row className="feature-row">
          <Colxx xxs="12" md="6" lg="5" className="d-flex align-items-center">
            <div className="d-flex">
              <div className="feature-text-container">
                <h2>
                  class
                </h2>
                <p>
                  d
                  <br />
                  <br />
                e
                  <br />
                  <br />
                  f
                </p>
              </div>
            </div>
          </Colxx>
          <Colxx
            xxs="12"
            md={{ size: '6', offset: 0 }}
            lg={{ size: '6', offset: 1 }}
            className="position-relative"
          >
            <img
              alt="feature"
              className="feature-image-right feature-image-charts position-relative"
              src="/assets/img/landing-page/feature.png"
            />
          </Colxx>
        </Row>

        <Row className="featur1e-row">
          <Colxx xxs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }} lg="6">
            <img
              alt="feature"
              className="feature-image-left feature-image-charts"
              src="/assets/img/landing-page/feature-2.png"
            />
          </Colxx>
          <Colxx
            xxs={{ size: 12, order: 1 }}
            md={{ size: 6, offset: 0, order: 2 }}
            lg={{ size: 5, offset: 1 }}
            className="d-flex align-items-center"
          >
            >
            <div className="d-flex">
              <div className="feature-text-container">
                <h2>
                 12
                </h2>
                <p>
                 34
                  <br />
                  <br />
                45
                  <br />
                  <br />
                56
                </p>
              </div>
            </div>
          </Colxx>
        </Row>

        <Row className="feature-row">
          <Colxx xxs="12" md="6" lg="5" className="d-flex align-items-center">
            <div className="d-flex">
              <div className="feature-text-container">
                <h2>
              67
                </h2>
                <p>
                  78
                  <br />
                  <br />
                 89
                  <br />
                  <br />
                 56
                </p>
              </div>
            </div>
          </Colxx>
          <Colxx
            xxs="12"
            md={{ size: '6', offset: 0 }}
            lg={{ size: '6', offset: 1 }}
            className="position-relative"
          >
            <img
              alt="feature"
              className="feature-image-right feature-image-charts position-relative"
              src="/assets/img/landing-page/feature-3.png"
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default HomeFeatures;
