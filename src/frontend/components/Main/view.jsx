import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import RegisterForm from './RegisterForm';
import './style.scss';

export default class MainView extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isRegistered: false };
    this.registerForm = React.createRef();

    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    const { isRegistered } = this.state;

    if (!isRegistered) {
      console.log(this.registerForm.current);
      this.registerForm.current.openForm();
    }
  }

  render() {
    return (
      <main>
        <RegisterForm ref={this.registerForm} />
        <PrimaryButton onClick={this.openForm}>Open Form</PrimaryButton>
      </main>
    );
  }
}
