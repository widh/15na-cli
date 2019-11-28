import React from 'react';
import { hot } from 'react-hot-loader';

import RegisterForm from './RegisterForm';
import './style.scss';

interface RegisterInfo {
  name?: string
  areaCount?: number
  connected?: number
}

type States = {
  io: any
  regInfo: RegisterInfo
}

class Main extends React.Component<{}, States> {
  registerForm: React.RefObject<RegisterForm>

  constructor(props) {
    super(props);
    this.state = { io: null, regInfo: {} };
    this.registerSocket = this.registerSocket.bind(this);
    this.registerInfo = this.registerInfo.bind(this);
  }

  registerSocket(io) {
    this.setState({ io });
  }

  registerInfo(info, resolve, reject) {
    if (
      typeof info.name === 'string'
      && typeof info.areaCount === 'number'
      && typeof info.connected === 'number'
    ) {
      this.setState({ regInfo: info });
      resolve();
    } else {
      reject('Register result structure is wrong.');
    }
  }

  render() {
    const { io, regInfo } = this.state;

    return io !== null ? (
      <main>
        <h1>
          Registered as
          <span>{regInfo.name}</span>
        </h1>
      </main>
    ) : (
      <main>
        <RegisterForm
          registerInfo={this.registerInfo}
          registerSocket={this.registerSocket}
        />
      </main>
    );
  }
}

export default hot(module)(Main);
