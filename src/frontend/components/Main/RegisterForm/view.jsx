import React from 'react';
import { Text, Modal } from 'office-ui-fabric-react';
import './style.scss';

export default class RegisterFormView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
    };

    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  closeForm() {
    this.setState({ showForm: false });
  }

  openForm() {
    this.setState({ showForm: true });
  }

  render() {
    const { showForm } = this.state;

    return (
      <Modal
        isOpen={showForm}
        onDismiss={this.closeForm}
        isBlocking={false}
      >
        <Text>Register</Text>
      </Modal>
    );
  }
}
