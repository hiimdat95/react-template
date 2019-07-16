import React, { Component } from 'react';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
  Label,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import { intlShape } from 'react-intl';
import messages from './messages';

export default class DataTablePagination extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  constructor(props) {
    super();

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
      lastIsActive : true,
      firstIsActive : true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages),
      });
    }
  }

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    }
    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total];
    }
    if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    }
    return [1, 2, 3, 4, 5, total];
  };

  filterPages = (visiblePages, totalPages) =>
    visiblePages.filter(page => page <= totalPages);

  changePage = page => {
    const visiblePages = this.getVisiblePages(page, this.props.pages);
    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages),
    });
    if (this.props.page !== page - 1) {
      console.log(page -1);
      this.props.onPageChange(page - 1);
    }
  };

  getFirstRecord(page, pageSize, totalSize) {
    if (!totalSize) {
      return 0;
    }
    return page * pageSize + 1;
  }

  getLastRecord(page, pageSize, totalSize, currentCount) {
    if (!totalSize) {
      return 0;
    }
    return this.getFirstRecord(page, pageSize, totalSize) + currentCount - 1;
  }

  pageClick = pageIndex => {
    this.changePage(pageIndex);
  };

  render() {
    const { formatMessage } = this.context.intl;
    const {
      page,
      canPrevious,
      canNext,
      pageSize,
      onPageSizeChange,
      totalSize,
      currentCount,
    } = this.props;
    const { visiblePages } = this.state;
    return (
      <Row className="mt-1">
        <Col xs="12" sm="4">
          <Form inline className="pt-sm-2 pl-2">
            <FormGroup className="mb-2 mr-1 mb-sm-0">
              <Label className="d-sm-block mr-2">
                {formatMessage(messages.PageText)}{' '}
                {this.getFirstRecord(page, pageSize, totalSize)}{' '}
                {formatMessage(messages.ToText)}{' '}
                {this.getLastRecord(page, pageSize, totalSize, currentCount)}{' '}
                {formatMessage(messages.OfText)} {totalSize}{' '}
                {formatMessage(messages.RowsText)}
              </Label>
            </FormGroup>
          </Form>
        </Col>
        <Col xs="12" sm="4">
          <Pagination
            size="sm"
            listClassName="justify-content-center"
            aria-label="Page navigation example"
          >
            {/* <PaginationItem className={`${!canPrevious && 'disabled'}`}>
              <PaginationLink
                className="page-link first"
                onClick={() => {
                  if (!canPrevious) return;
                  this.changePage(1);
                }}
                disabled={!canPrevious}
              >
                <i className="simple-icon-control-start" />
              </PaginationLink>
            </PaginationItem> */}
            <PaginationItem className={`${!canPrevious && 'disabled'}`}>
              <PaginationLink
                className="prev"
                onClick={() => {
                  if (!canPrevious) return;
                  this.changePage(page);
                }}
                disabled={!canPrevious}
              >
                <i className="simple-icon-arrow-left" />
              </PaginationLink>
            </PaginationItem>
            {visiblePages.map((p, index, array) => {
              const active = page + 1 === p;
              return (
                <PaginationItem key={p} active={active} className="vsdv">
                  <PaginationLink onClick={() => this.pageClick(p)}>
                    {array[index - 1] + 2 < p ? `...${p}` : p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem className={`${!canNext && 'disabled'}`}>
              <PaginationLink
                className="next"
                onClick={() => {
                  if (!canNext) return;
                  this.changePage(page + 2);
                }}
                disabled={!canNext}
              >
                <i className="simple-icon-arrow-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Col>
        <Col xs="12" sm="4">
          <Form inline className="pt-sm-2 pl-2 float-right">
            <FormGroup className="mb-2 mr-1 mb-sm-0">
              <Label className="mr-sm-1 ml-1">
                {formatMessage(messages.ShowText)}
              </Label>
              <Input
                type="number"
                className="input-rounded"
                bsSize="sm"
                max="100"
                min="0"
                maxLength="3"
                onChange={e => {
                  const reg = new RegExp(/^0*([0-9]|[1-8][0-9]|9[0-9]|100)$/);
                  const val = e.target.value.replace(/\D/g, '');
                  if (reg.test(e.target.value)) {
                    onPageSizeChange(Number(val));
                  }
                }}
                value={pageSize}
              />
              <Label className="mr-sm-2 ml-1">
                {formatMessage(messages.RowsText)}
              </Label>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}
