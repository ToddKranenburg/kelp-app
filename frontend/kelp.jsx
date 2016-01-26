var React = require('react'),
  ReactDOM = require('react-dom'),
  ReactRouter = require('react-router'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  IndexRoute = ReactRouter.IndexRoute,
  App = require('./components/app'),
  Profile = require('./components/profile'),
  browserHistory = ReactRouter.browserHistory;

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Profile}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.getElementById('root');

  if (rootEl) {
    ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, rootEl);
  }
});
