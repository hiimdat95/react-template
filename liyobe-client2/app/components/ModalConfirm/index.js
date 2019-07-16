/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { intlShape } from 'react-intl';
import messages from './messages';

export class ConfirmModal extends React.Component {
  static contextTypes = {
    intl: intlShape,
  };

  render() {
    const { formatMessage } = this.context.intl;
    const {
      message,
      modalOpen,
      onToggleModal,
      onAcceptModal,
      className,
    } = this.props;

    const closeBtn = (
      <button className="close" type="button" onClick={onToggleModal}>
        &times;
      </button>
    );
    return (
      <Modal isOpen={modalOpen} toggle={onToggleModal} className={className}>
        <ModalHeader toggle={onToggleModal} close={closeBtn}>
          {formatMessage(messages.ConfirmTitle)}
        </ModalHeader>
        <ModalBody>{formatMessage(messages[message])}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAcceptModal}>
            {formatMessage(messages.ButtonOk)}
          </Button>
          <Button outline onClick={onToggleModal}>
            {formatMessage(messages.ButtonCancel)}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default ConfirmModal;
