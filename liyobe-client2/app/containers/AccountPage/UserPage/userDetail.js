import React, { Component } from 'react';
import {
  Button,
  Form,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  Input,
} from 'reactstrap';
import { intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Select from 'react-select';
import CustomSelectInput from 'components/CustomSelectInput';
import { withCookies } from 'react-cookie';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import vi from 'date-fns/locale/vi';
import {
  CookieDropDownRole,
  usernameRegExp,
  phoneRegExp,
} from 'utils/constants';
import { Formik } from 'formik';
import moment from 'moment';
import _ from 'lodash';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import * as Yup from 'yup';
import * as actions from './actions';
import { makeSelectUserDetail, makeSelectRoleDropDown } from './selector';
import messages from './messages';

moment.locale(['gb', 'vi']);
registerLocale('en', enGB);
registerLocale('vi', vi);

export class UserDetail extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  initDropDown() {
    const { cookies } = this.props;
    const dropDownRole = cookies.get(CookieDropDownRole);
    if (dropDownRole) {
      this.props.setDropDownRole(dropDownRole);
    } else {
      this.props.onRoleDropDownRequest(cookies);
    }
  }

  componentWillMount(){
    this.initDropDown();
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.props.onUserDetailRequest(userId);
    } else {
      this.props.initUserDetail();
    }
  }

  componentWillUnmount() {
    this.props.onUserDetailReset();
  }

  render() {
    const { formatMessage } = this.context.intl;
    const { userDetail, dropdownRole, userId } = this.props;
    let roleOption = null;
    const UserDetailSchema = Yup.object().shape({
      userName: Yup.string()
        .matches(usernameRegExp)
        .required(),
      roles: Yup.array()
        .min(1)
        .required(),
      email: Yup.string()
        .email()
        .required(),
      fullName: Yup.string().required(),
      birthday: Yup.string().required(),
      phonenumber: Yup.string().matches(phoneRegExp),
    });
    if (dropdownRole) {
      roleOption = dropdownRole.map((x, i) => ({
        label: x.name,
        value: x.id,
        key: i,
      }));
    }
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.props.onToggleModal}
        wrapClassName="modal-right"
      >
        <ModalHeader toggle={this.toggleModal}>
          <FormattedMessage
            {...messages.DetailHeader}
            values={{
              Match: formatMessage(messages.USER),
            }}
          />
        </ModalHeader>
        {userDetail ? (
          <Formik
            initialValues={{
              id: userDetail.id ? userDetail.id : '',
              fullName: userDetail.fullName ? userDetail.fullName : '',
              userName: userDetail.userName ? userDetail.userName : '',
              email: userDetail.email ? userDetail.email : '',
              birthday: userDetail.birthday
                ? moment(new Date(userDetail.birthday)).toDate()
                : moment().toDate(),
              address: userDetail.address ? userDetail.address : '',
              phonenumber: userDetail.phoneNumber ? userDetail.phoneNumber : '',
              isEnabled: userDetail.isEnabled ? userDetail.isEnabled : true,
              isDeleted: userDetail.isDeleted ? userDetail.isDeleted : false,
              roles:
                roleOption && userDetail.roles
                  ? _(roleOption)
                      .keyBy('value')
                      .at(userDetail.roles)
                      .value()
                  : [],
            }}
            onSubmit={values => {
              if (userId) {
                this.props.onUpdateUser(values);
              } else {
                this.props.onCreateUser(values);
              }
            }}
            validationSchema={UserDetailSchema}
            render={({
              errors,
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
              isValidating,
            }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <Label className="form-group has-top-label mt-2">
                    <Input
                      name="userName"
                      type="text"
                      value={values.userName}
                      invalid={!!errors.userName}
                      disabled={!!userId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={50}
                    />
                    <span>{formatMessage(messages.UserName)}</span>
                  </Label>

                  <Label className="form-group has-top-label mt-2">
                    <Input
                      name="fullName"
                      type="text"
                      value={values.fullName}
                      invalid={!!errors.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={50}
                    />
                    <span> {formatMessage(messages.FullName)}</span>
                  </Label>
                  <Label className="form-group has-top-label mt-2">
                    <Input
                      name="email"
                      type="text"
                      value={values.email}
                      invalid={!!errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={50}
                    />
                    <span> {formatMessage(messages.Email)}</span>
                  </Label>
                  <Label
                    className="form-group has-top-label mt-2"
                    onClick={e => e.preventDefault()}
                  >
                    <DatePicker
                      selected={values.birthday}
                      name="birthday"
                      dateFormat="d MMMM yyyy"
                      className={
                        errors.birthday
                          ? 'is-invalid form-control'
                          : 'form-control'
                      }
                      onChange={e => {
                        setFieldValue('birthday', e);
                      }}
                      showMonthDropdown
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={80}
                      onChangeRaw={e => e.preventDefault()}
                      maxDate={moment().toDate()}
                      locale={this.props.locale}
                    />
                    <span>{formatMessage(messages.DetailBoD)}</span>
                  </Label>
                  <Label className="form-group has-top-label mt-2">
                    <Input
                      name="address"
                      type="text"
                      value={values.address}
                      invalid={!!errors.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={100}
                    />
                    <span>{formatMessage(messages.DetailAddress)}</span>
                  </Label>
                  <Label className="form-group has-top-label mt-2">
                    <Input
                      name="phonenumber"
                      type="text"
                      value={values.phonenumber}
                      invalid={!!errors.phonenumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={50}
                    />
                    <span>{formatMessage(messages.DetailPhoneNumber)}</span>
                  </Label>
                  {dropdownRole ? (
                    <Label className="form-group has-top-label mt-2">
                      <Select
                        name="roles"
                        components={{ Input: CustomSelectInput }}
                        className={
                          errors.roles
                            ? `react-select dropdown-invalid`
                            : `react-select`
                        }
                        classNamePrefix="react-select"
                        isMulti
                        value={values.roles}
                        invalid={!!errors.roles}
                        onChange={e => {
                          setFieldValue('roles', e);
                        }}
                        onBlur={() => {
                          setFieldTouched('roles', true);
                        }}
                        options={roleOption}
                      />
                      <span>{formatMessage(messages.Roles)}</span>
                    </Label>
                  ) : null}
                  <CustomInput
                    type="checkbox"
                    id="isEnabledCheckBox"
                    name="isEnabled"
                    onChange={e => {
                      if (e.target.checked) {
                        setFieldValue('isEnabled', true);
                      } else {
                        setFieldValue('isEnabled', false);
                      }
                    }}
                    onBlur={handleBlur}
                    checked={values.isEnabled}
                    label={formatMessage(messages.Status)}
                  />
                  <CustomInput
                    type="checkbox"
                    id="isDeletedCheckBox"
                    name="isDeleted"
                    onChange={e => {
                      if (e.target.checked) {
                        setFieldValue('isDeleted', true);
                      } else {
                        setFieldValue('isDeleted', false);
                      }
                    }}
                    onBlur={handleBlur}
                    checked={values.isDeleted}
                    label={formatMessage(messages.IsDeleted)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="button"
                    disabled={isSubmitting && isValidating}
                    onClick={handleSubmit}
                  >
                    {formatMessage(messages.ButtonSubmit)}
                  </Button>
                  <Button
                    color="secondary"
                    outline
                    onClick={this.props.onToggleModal}
                  >
                    {formatMessage(messages.ButtonCancel)}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          />
        ) : null}
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userDetail: makeSelectUserDetail(),
  dropdownRole: makeSelectRoleDropDown(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUserDetailRequest: data => {
      dispatch(actions.getUserDetailRequest(data));
    },
    onRoleDropDownRequest: cookie => {
      dispatch(actions.getDropDownRoleRequest(cookie));
    },
    onUserDetailReset: () => {
      dispatch(actions.onResetUserDetail());
    },
    setDropDownRole: data => {
      dispatch(actions.setDropDownRole(data));
    },
    initUserDetail: () => {
      dispatch(actions.initUserDetail());
    },
    onUpdateUser: data => {
      dispatch(actions.onUpdateUserRequest(data));
    },
    onCreateUser: data => {
      dispatch(actions.onCreateUserRequest(data));
    },
    dispatch,
  };
}

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserDetail),
);
