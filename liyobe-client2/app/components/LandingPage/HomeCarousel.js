import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Card, CardBody } from 'reactstrap';
import { Colxx } from 'components/CustomBootstrap';
import { intlShape } from 'react-intl';
import ReactSiemaCarousel from 'components/ReactSiema/ReactSiemaCarousel';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class HomeCarousel extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  render() {
    return (
      <Row>
        <Colxx xxs="12" className="pl-0 pr-0 mb-5 home-carousel">
          <ReactSiemaCarousel
            perPage={{
              0: 1,
              768: 2,
              1200: 3,
              1440: 4,
            }}
            controls={false}
            loop={false}
          >
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Cupcake large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      a
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      b
                    </p>
                  </div>
                  <NavLink
                    className="btn btn-link font-weight-semibold"
                    to="/features"
                  >
                    c
                  </NavLink>
                </CardBody>
              </Card>
            </div>
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Line-Chart2 large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      d
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      e
                    </p>
                  </div>
                  <NavLink
                    className="btn btn-link font-weight-semibold"
                    to="/features"
                  >
                    f
                  </NavLink>
                </CardBody>
              </Card>
            </div>
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Three-ArrowFork large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      g
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      h
                    </p>
                  </div>
                  <NavLink
                    className="btn btn-link font-weight-semibold"
                    to="/features"
                  >
                   i
                  </NavLink>
                </CardBody>
              </Card>
            </div>

            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Funny-Bicycle large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      k
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      l
                    </p>
                  </div>
                  <NavLink
                    className="btn btn-link font-weight-semibold"
                    to="/features"
                  >
                    m
                  </NavLink>
                </CardBody>
              </Card>
            </div>
            <div className="pr-3 pl-3">
              <Card>
                <CardBody className="text-center">
                  <div>
                    <i className="iconsmind-Full-View large-icon" />
                    <h5 className="mb-0 font-weight-semibold">
                      h
                    </h5>
                  </div>
                  <div>
                    <p className="detail-text">
                      o
                    </p>
                  </div>
                  <NavLink
                    className="btn btn-link font-weight-semibold"
                    to="/features"
                  >
                  perPage
                  </NavLink>
                </CardBody>
              </Card>
            </div>
          </ReactSiemaCarousel>
        </Colxx>
      </Row>
    );
  }
}

export default HomeCarousel;
