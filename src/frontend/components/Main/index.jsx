import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import View from './view';

const Main = connect(
  () => ({}),
  () => ({}),
)(View);

export default hot(module)(Main);
