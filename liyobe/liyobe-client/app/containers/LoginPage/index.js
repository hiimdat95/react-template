import React, { Component, Fragment } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  Input,
  Button,
  Spinner,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Colxx } from 'components/CustomBootstrap';
import styled from 'styled-components';
import { intlShape } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';
import LoginBg from 'assets/img/balloon.jpg';
import CardBg from 'assets/img/login-bg.jpg';
import * as selectors from './selectors';
import saga from './saga';

import * as actionsDispatch from './actions';
import messages from './messages';

const LoginBgWrap = styled.div`
  background: url(${LoginBg}) no-repeat center center fixed;
`;
const CardBgWrap = styled.div`
  background: url(${CardBg}) no-repeat center top;
`;
const LoginTitle = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  componentDidMount() {
    document.body.classList.add('background');
  }

  componentWillMount(){
    const { user, history } = this.props;
    if (!_isEmpty(user)) {
      history.push('/dashboard/');
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('background');
  }

  render() {
    const { formatMessage } = this.context.intl;
    const LoginSchema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });
    return (
      <Fragment>
        <LoginBgWrap className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Spinner type="grow" color="dark" />
              <Colxx xxs="12" md="12" className="mx-auto my-auto">
                <Card className="auth-card">
                  <CardBgWrap className="position-relative image-side " />
                  <div className="form-side">
                    <CardTitle className="mb-4">
                      <LoginTitle>{formatMessage(messages.Login)}</LoginTitle>
                    </CardTitle>
                    <Formik
                      initialValues={{
                        username: '',
                        password: '',
                      }}
                      onSubmit={(values, actions) => {
                        setTimeout(() => {
                          this.props.onLogin(values, actions);
                          actions.setSubmitting(false);
                        }, 400);
                      }}
                      validationSchema={LoginSchema}
                      render={({
                        errors,
                        values,
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        touched,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <Label className="form-group has-float-label mt-2">
                            <Input
                              name="username"
                              type="text"
                              invalid={errors.username && touched.username}
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={50}
                            />
                            <span>{formatMessage(messages.UserName)}</span>
                          </Label>
                          <Label className="form-group has-float-label mt-2">
                            <Input
                              placeholder={formatMessage(messages.Password)}
                              type="password"
                              name="password"
                              invalid={errors.password && touched.password}
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              maxLength={50}
                            />
                            <span>{formatMessage(messages.Password)}</span>
                          </Label>
                          <div className="d-flex justify-content-between align-items-center">
                            <Button
                              color="primary"
                              className="btn-shadow"
                              size="lg"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {formatMessage(messages.Login)}
                              {isSubmitting ? (
                                <Spinner color="dark" size="sm" />
                              ) : null}
                            </Button>
                          </div>
                        </Form>
                      )}
                    />
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (values, actions) => {
      dispatch(actionsDispatch.loginUser(values, actions));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  user: selectors.makeSelectUser(),
  // locale: makeSelectLocale(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withSaga,
  withConnect,
)(LoginPage);
