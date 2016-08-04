import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

let render = () => {
  const App = require('../containers/App');
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
};

if (module.hot) {
  const renderNormally = render;
  const renderException = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error}/>, document.getElementById('root'));
  };
  render = () => {
    try {
      renderNormally();
    } catch (error) {
      console.error('error', error);
      renderException(error);
    }
  };
  module.hot.accept('../containers/App', () => {
    render();
  });
}

render();

