import React, { Component, Fragment } from 'react';
import { Row, Card, CardBody } from 'reactstrap';
import { intlShape } from 'react-intl';
import ReactTable from 'react-table';
import { Colxx, Separator } from 'components/CustomBootstrap';
import BreadcrumbContainer from 'components/BreadcrumbContainer';
import DataTablePagination from 'components/DataTables/pagination';
import CustomTbodyComponent from 'components/DataTables/tablescroll';
import { ButtonIconTooltip } from 'components/PopoverTooltip/ButtonIconTooltip';
import { ConfirmModal } from 'components/ModalConfirm';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { pageIndex, pageSize, userPageOrderDefaut } from 'utils/constants';
import UserDetailModal from './userDetail';
import saga from './saga';
import reducer from './reducer';
import messages from './messages';
import * as actions from './actions';
import {
  makeSelectPagingRequest,
  makeSelectListUser,
  makeSelectListUserLoading,
  makeSelectDetailModalOpen,
  makeSelectConfirmModalOpen,
  makeSelectPageLoading,
} from './selector';

/* eslint-disable react/prefer-stateless-function */
export class UserPage extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  state = {
    userId: null,
    openFilter: false,
  };

  componentWillMount() {
    const { pagingRequest } = this.props;
    this.props.getListUserRequest(pagingRequest);
  }

  componentWillUnmount() {
    this.props.resetPaging();
  }

  onPageChange = e => {
    const { pagingRequest } = this.props;
    pagingRequest.pageIndex = e + 1;
    this.props.changePaging(pagingRequest);
    this.props.getListUserRequest(pagingRequest);
  };

  onPageSizeChange = e => {
    const { pagingRequest } = this.props;
    pagingRequest.pageSize = e;
    pagingRequest.pageIndex = 1;
    this.props.changePaging(pagingRequest);
    this.props.getListUserRequest(pagingRequest);
  };

  onSortedChange = e => {
    const { pagingRequest } = this.props;
    pagingRequest.orderBy = e[0].id;
    pagingRequest.isDesc = !e[0].desc;
    this.props.changePaging(pagingRequest);
    this.props.getListUserRequest(pagingRequest);
  };

  onFilteredChange = e => {
    const { pagingRequest } = this.props;
    pagingRequest.pageIndex = 1;
    // eslint-disable-next-line no-undef
    if (!_.isEmpty(e)) {
      pagingRequest.search = e;
    } else {
      pagingRequest.search = null;
    }
    this.props.changePaging(pagingRequest);
    this.props.getListUserRequest(pagingRequest);
  };

  onOpenFilter = () => {
    this.setState(prevState => ({
      openFilter: !prevState.openFilter,
    }));
  };

  onRefresh = () => {
    const { pagingRequest } = this.props;
    pagingRequest.search = null;
    pagingRequest.pageIndex = pageIndex;
    pagingRequest.pageSize = pageSize;
    pagingRequest.orderBy = userPageOrderDefaut;
    pagingRequest.isDesc = true;
    pagingRequest.includeDeleted = false;
    this.props.changePaging(pagingRequest);
    this.props.getListUserRequest(pagingRequest);
    this.setState(() => ({
      openFilter: false,
    }));
  };

  onToggleShowDeleted = () => {
    const { pagingRequest } = this.props;
    if (!pagingRequest.includeDeleted) {
      pagingRequest.includeDeleted = !pagingRequest.includeDeleted;
      this.props.changePaging(pagingRequest);
      this.props.getListUserRequest(pagingRequest);
    } else {
      this.onRefresh();
    }
  };

  render() {
    const { formatMessage } = this.context.intl;
    const {
      listUser,
      loading,
      detailModalOpen,
      confirmModalOpen,
      pageLoading,
      pagingRequest,
    } = this.props;
    const dataTableColumns = [
      {
        Header: formatMessage(messages.FullName),
        accessor: 'fullName',
        Cell: props => <p className="list-item-heading">{props.value}</p>,
      },
      {
        Header: formatMessage(messages.UserName),
        accessor: 'userName',
        Cell: props => <p className="text-muted">{props.value}</p>,
      },
      {
        Header: formatMessage(messages.Email),
        accessor: 'email',
        Cell: props => <p className="text-muted">{props.value}</p>,
      },
      {
        Header: formatMessage(messages.Status),
        accessor: 'isEnabled',
        sortable: false,
        maxWidth: 150,
        Cell: props => {
          if (props.value) {
            return (
              <p className="badge badge-secondary badge-pill">
                {formatMessage(messages.Active)}
              </p>
            );
          }
          return (
            <p className="badge badge-danger badge-pill">
              {formatMessage(messages.InActive)}
            </p>
          );
        },
        Filter: ({ filter, onChange }) => (
          <select
            className="select-rounded"
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="">{formatMessage(messages.ShowAll)}</option>
            <option value="true">{formatMessage(messages.Active)}</option>
            <option value="false">{formatMessage(messages.InActive)}</option>
          </select>
        ),
      },
      {
        Header: formatMessage(messages.IsDeleted),
        accessor: 'isDeleted',
        show: pagingRequest.includeDeleted,
        maxWidth: 150,
        Cell: props => {
          if (props.value) {
            return (
              <p className="">
                <i
                  className="simple-icon-check"
                  style={{ color: 'red', fontSize: '20px' }}
                />
              </p>
            );
          }
          return null;
        },
        Filter: ({ filter, onChange }) => (
          <select
            className="select-rounded"
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 'all'}
          >
            <option value="">{formatMessage(messages.ShowAll)}</option>
            <option value="true">{formatMessage(messages.IsDeleted)}</option>
            <option value="false">
              {formatMessage(messages.IsNotDeleted)}
            </option>
          </select>
        ),
      },
      {
        Header: formatMessage(messages.Action),
        accessor: '',
        sortable: false,
        filterable: false,
        maxWidth: 200,
        Cell: props => (
          <div>
            <ButtonIconTooltip
              key={`${props.index}-edit`}
              id={`${props.index}-edit`}
              onClick={() => {
                this.setState({
                  userId: props.value.id,
                });
                this.props.onToggleModal('detailModalOpen');
              }}
              item={{
                classButton: 'btn btn-outline-primary btn-circle-icon',
                placement: 'top',
                text: <i className="simple-icon-pencil" />,
                body: formatMessage(messages.ButtonToolTipEdit),
              }}
            />
            <ButtonIconTooltip
              key={`${props.index}-delete`}
              id={`${props.index}-delete`}
              onClick={() => {
                this.setState({
                  userId: props.value.id,
                });
                this.props.onToggleModal('confirmModalOpen');
              }}
              item={{
                classButton: 'btn btn-outline-danger btn-circle-icon',
                placement: 'top',
                text: <i className="simple-icon-trash" />,
                body: formatMessage(messages.ButtonToolTipDelete),
              }}
            />
          </div>
        ),
      },
    ];
    return pageLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={formatMessage(messages.USER)}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xl="12" lg="12" className="mb-4">
            <Card className="h-100">
              <CardBody>
                <div className="mb-2 text-right">
                  <ButtonIconTooltip
                    key="add-button"
                    id="add-button"
                    onClick={() => {
                      this.setState({
                        userId: null,
                      });
                      this.props.onToggleModal('detailModalOpen');
                    }}
                    item={{
                      classButton: 'btn btn-primary btn-square-icon',
                      placement: 'top',
                      text: <i className="simple-icon-plus" />,
                      body: formatMessage(messages.ButtonToolTipAdd),
                    }}
                  />
                  <ButtonIconTooltip
                    key="refesh-button"
                    id="refesh-button"
                    onClick={this.onRefresh}
                    item={{
                      classButton: 'btn btn-primary btn-square-icon',
                      placement: 'top',
                      text: <div className="simple-icon-refresh" />,
                      body: formatMessage(messages.ButtonToolTipRefresh),
                    }}
                  />
                  <ButtonIconTooltip
                    key="search-button"
                    id="search-button"
                    onClick={this.onOpenFilter}
                    item={{
                      classButton: 'btn btn btn-primary btn-square-icon',
                      placement: 'top',
                      text: <i className="simple-icon-magnifier" />,
                      body: formatMessage(messages.ButtonToolTipSearch),
                    }}
                  />
                  <ButtonIconTooltip
                    key="include-deleted"
                    id="include-deleted-button"
                    onClick={this.onToggleShowDeleted}
                    item={{
                      classButton: 'btn btn btn-primary btn-square-icon',
                      placement: 'top',
                      text: <i className="iconsmind-Arrow-Inside45" />,
                      body: !pagingRequest.includeDeleted
                        ? formatMessage(messages.ButtonToolTipShowColumn, {
                            column: formatMessage(
                              messages.IsDeleted,
                            ).toLowerCase(),
                          })
                        : formatMessage(messages.ButtonToolTipHideColumn, {
                            column: formatMessage(
                              messages.IsDeleted,
                            ).toLowerCase(),
                          }),
                    }}
                  />
                </div>
                {listUser ? (
                  <ReactTable
                    loading={loading}
                    manual
                    resizable={false}
                    defaultPageSize={listUser.pageSize}
                    pageSize={listUser.pageSize}
                    filterable={this.state.openFilter}
                    data={listUser.data}
                    page={listUser.pageIndex - 1}
                    pages={Math.ceil(listUser.totalRows / listUser.pageSize)}
                    columns={dataTableColumns}
                    minRows={3}
                    multiSort={false}
                    defaultSorted={[
                      {
                        id: userPageOrderDefaut,
                        desc: false,
                      },
                    ]}
                    PaginationComponent={DataTablePagination}
                    TbodyComponent={CustomTbodyComponent}
                    className="-highlight react-table-fixed-height"
                    onPageChange={e => this.onPageChange(e)}
                    onPageSizeChange={e => this.onPageSizeChange(e)}
                    onSortedChange={e => this.onSortedChange(e)}
                    onFilteredChange={e => this.onFilteredChange(e)}
                    nodataMessage={formatMessage(messages.NoData)}
                    loadingText={formatMessage(messages.Loading)}
                    noDataText={formatMessage(messages.NoDataText)}
                    getPaginationProps={() => ({
                      totalSize: listUser.totalRows,
                      currentCount: listUser.pageSize,
                    })}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {detailModalOpen ? (
          <UserDetailModal
            modalOpen={detailModalOpen}
            onToggleModal={() => this.props.onToggleModal('detailModalOpen')}
            userId={this.state.userId}
          />
        ) : null}
        {confirmModalOpen ? (
          <ConfirmModal
            modalOpen={confirmModalOpen}
            onToggleModal={() => this.props.onToggleModal('confirmModalOpen')}
            message="ConfirmDelete"
            onAcceptModal={() => this.props.onDeleteUser(this.state.userId)}
          />
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pagingRequest: makeSelectPagingRequest(),
  listUser: makeSelectListUser(),
  loading: makeSelectListUserLoading(),
  detailModalOpen: makeSelectDetailModalOpen(),
  confirmModalOpen: makeSelectConfirmModalOpen(),
  pageLoading: makeSelectPageLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListUserRequest: data => {
      dispatch(actions.getListUserRequest(data));
    },
    changePaging: data => {
      dispatch(actions.changePaging(data));
    },
    resetPaging: () => {
      dispatch(actions.resetPaging());
    },
    onToggleModal: modalType => {
      dispatch(actions.onToggleModal(modalType));
    },
    onDeleteUser: data => {
      dispatch(actions.onDeleteUserRequest(data));
    },
    dispatch,
  };
}

const withSaga = injectSaga({ key: 'userPage', saga });
const withReducer = injectReducer({ key: 'userPage', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(UserPage);
