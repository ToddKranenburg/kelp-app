var React = require('react'),
  ReactDOM = require('react-dom'),
  ReactRouter = require('react-router'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  IndexRoute = ReactRouter.IndexRoute,
  App = require('./components/app'),
  Profile = require('./components/profile'),
  Review = require('./components/reviews/review_show'),
  Business = require('./components/business'),
  ReviewsIndex = require('./components/reviews/reviews_index'),
  SessionForm = require('./components/session_form'),
  SessionsApiUtil = require('./util/sessions_api_util'),
  CurrentUserStore = require('./stores/current_user_store'),
  UserForm = require('./components/user_form'),
  browserHistory = ReactRouter.browserHistory;



var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Profile} onEnter={_ensureLoggedIn}/>
    <Route path="sign-up" component={UserForm}/>
    <Route path="login" component={SessionForm}/>
    <Route path="reviews/:id" component={Review} onEnter={_ensureLoggedIn}/>
    <Route path="businesses/:id" component={Business} onEnter={_ensureLoggedIn}/>
    <Route path="users/:username" component={Profile} onEnter={_ensureLoggedIn}/>
  </Route>
);

function _ensureLoggedIn(nextState, replace, callback) {
    if (CurrentUserStore.userHasBeenFetched()) {
      _redirectIfNotLoggedIn();
    } else {
      SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
    }
    function _redirectIfNotLoggedIn() {
      if (!CurrentUserStore.isLoggedIn()) {
        replace({}, "/login");
      }
      callback();
    }
}


document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.getElementById('root');

  if (rootEl) {
    ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, rootEl);
  }
});
