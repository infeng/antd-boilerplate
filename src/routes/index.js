import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../containers/App';
import HelloWorld from '../components/HelloWorld';

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={HelloWorld} />
          <Route path="user" getComponent={(nextState, cb) => {        
            require.ensure([], require => {
              cb(null, require('../components/UserList').default);
            });        
          }} /> 
        </Route>
      </Router>
    );
  }
}

