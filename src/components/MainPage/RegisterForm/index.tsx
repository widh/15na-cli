import React from 'react';
import {
  Text, Label, TextField, getId, PrimaryButton, Spinner, MessageBar, MessageBarType,
} from 'office-ui-fabric-react';
import './style.scss';

import socket from 'socket.io-client';

const storage = window.module.require('electron-json-storage');

type Props = {
  registerSocket: (io: any) => void
  registerInfo: (
    info: object,
    resolve: () => void,
    reject: (reason: string) => void
  ) => void
  registerHost: (host: string) => void
}

type States = {
  serverURLInputID: string
  clidInputID: string
  serverConStatus: string
  serverConErrorMessage: string
  clidInputErrorMessage: string
  serverURLInputErrorMessage: string
  showForm: boolean
  recentServerURL: string
  recentCLID: string
}

export default class RegisterForm extends React.Component<Props, States> {
  constructor(props) {
    super(props);

    this.state = {
      serverURLInputID: getId('serverURLInput'),
      clidInputID: getId('clidInput'),
      serverConStatus: '',
      serverConErrorMessage: '',
      clidInputErrorMessage: '',
      serverURLInputErrorMessage: '',
      showForm: true,
      recentCLID: '',
      recentServerURL: '',
    };

    storage.getMany(
      ['recentCLID', 'recentServerURL'],
      (error, data) => {
        if (!error) {
          this.setState(data);
        }
      },
    );

    this.hideServerConErrorMessage = this.hideServerConErrorMessage.bind(this);
    this.hideClidInputErrorMessage = this.hideClidInputErrorMessage.bind(this);
    this.hideServerURLInputErrorMessage = this.hideServerURLInputErrorMessage.bind(this);
    this.connectIRONA = this.connectIRONA.bind(this);
  }

  componentDidMount() {
    const { serverURLInputID } = this.state;
    document.getElementById(serverURLInputID).focus();
  }

  connectIRONA() {
    const {
      registerInfo, registerSocket, registerHost,
    } = this.props;
    const {
      serverURLInputID, clidInputID, recentCLID, recentServerURL,
    } = this.state;
    const serverURL = (
      document.getElementById(serverURLInputID) as HTMLInputElement
    ).value || recentServerURL;
    const clid = (
      document.getElementById(clidInputID) as HTMLInputElement
    ).value || recentCLID;
    const setError = (error) => this.setState({ serverConErrorMessage: error });
    setError('');

    let canContinue = true;
    if (serverURL.length === 0) {
      this.setState({ serverURLInputErrorMessage: 'Server URL cannot be empty.' });
      canContinue = false;
    }
    if (clid.length === 0) {
      this.setState({ clidInputErrorMessage: 'Client ID cannot be empty.' });
      canContinue = false;
    } else if (Number.isNaN(Number(`0x${clid}`))) {
      this.setState({ clidInputErrorMessage: 'Client ID is invalid.' });
      canContinue = false;
    }

    if (canContinue) {
      const serverInputDOM = document.getElementById(serverURLInputID);
      const setStatus = (state: string) => {
        this.setState({ serverConStatus: state });
        if (state.length === 0) {
          if (serverInputDOM && serverInputDOM.focus) {
            serverInputDOM.focus();
          }
        }
      };
      const hideForm = () => this.setState({ showForm: false });
      const host = `https://${serverURL}/`;
      const io = socket(`${host}15na-ws/out`);
      setStatus('Connecting to central host...');
      io.on('connect_error', (error) => {
        io.close();
        console.error(error);
        setError('Failed to connect central host.');
        setStatus('');
      });
      io.on('connect_timeout', () => {
        io.close();
        console.error('Connection timed out.');
        setError('Connection timed out.');
        setStatus('');
      });
      io.on('connect', () => {
        setStatus('Registering the client...');
        const regTimeout = setTimeout(() => {
          io.close();
          console.error('Registration timed out.');
          setError('Registration timed out.');
          setStatus('');
        }, 20000);
        io.on('regResult', (DATA) => {
          setStatus('Saving registration result...');
          const data = JSON.parse(DATA);
          if (data instanceof Object) {
            registerInfo(
              data,
              () => {
                clearTimeout(regTimeout);
                storage.set('recentServerURL', serverURL);
                storage.set('recentCLID', clid);
                hideForm();
                setTimeout(() => {
                  setStatus('');
                  registerHost(host);
                  registerSocket(io);
                }, 500);
              },
              (reason) => {
                clearTimeout(regTimeout);
                console.error(reason);
                setError(`Failed to register. ${reason}`);
                setStatus('');
              },
            );
          } else {
            io.close();
            console.error(data);
            setError(data);
            setStatus('');
          }
        });
        io.emit('reg', JSON.stringify(clid));
      });
      io.on('disconnect', (reason) => {
        io.close();
        setError(`Disconnected while registering: ${reason}`);
        setStatus('');
      });
    }
  }

  hideServerConErrorMessage() {
    this.setState({ serverConErrorMessage: '' });
  }

  hideClidInputErrorMessage() {
    this.setState({ clidInputErrorMessage: '' });
  }

  hideServerURLInputErrorMessage() {
    this.setState({ serverURLInputErrorMessage: '' });
  }

  render() {
    const {
      serverURLInputID, clidInputID,
      serverConStatus, serverConErrorMessage,
      clidInputErrorMessage, serverURLInputErrorMessage,
      recentCLID, recentServerURL,
      showForm,
    } = this.state;

    return (
      <div
        styleName="register-form"
        style={{
          padding: `calc(50vh - ${172 + (serverConErrorMessage.length > 0 ? 28 : 0) + (serverURLInputErrorMessage.length > 0 ? 10.5 : 0) + (clidInputErrorMessage.length > 0 ? 10.5 : 0)}px) 12vw`,
          opacity: showForm ? 1 : 0,
        }}
      >
        <Text variant="xxLarge" styleName="register-title">Register</Text>
        {serverConErrorMessage.length > 0 && (
          <MessageBar
            styleName="register-message"
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={this.hideServerConErrorMessage}
            dismissButtonAriaLabel="Okay"
          >
            {serverConErrorMessage}
          </MessageBar>
        )}
        <div styleName="register-inputs">
          <Label required htmlFor={serverURLInputID}>Central Host</Label>
          <TextField
            id={serverURLInputID}
            styleName="register-field"
            placeholder={recentServerURL.length > 0 ? recentServerURL : 'irona.example.org:8000'}
            prefix="https://"
            disabled={serverConStatus.length > 0}
            errorMessage={serverURLInputErrorMessage.length > 0 && serverURLInputErrorMessage}
            onChange={this.hideServerURLInputErrorMessage}
          />
          <Label required htmlFor={clidInputID}>Client ID</Label>
          <TextField
            id={clidInputID}
            styleName="register-field"
            placeholder={recentCLID}
            disabled={serverConStatus.length > 0}
            errorMessage={clidInputErrorMessage.length > 0 && clidInputErrorMessage}
            onChange={this.hideClidInputErrorMessage}
          />
        </div>
        <PrimaryButton
          styleName="register-button"
          onClick={this.connectIRONA}
          disabled={serverConStatus.length > 0}
        >
          Register
        </PrimaryButton>
        {serverConStatus.length > 0 && (
          <Spinner
            styleName="register-spinner"
            label={serverConStatus}
            ariaLive="assertive"
            labelPosition="right"
          />
        )}
        <Text variant="smallPlus" styleName="register-info">Before enter in IRONA client, you have to issue a new client ID for this computer at IRONA central server.</Text>
      </div>
    );
  }
}
