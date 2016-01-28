var React = require('react'),
  ReactDOM = require('react-dom'),
  ReactRouter = require('react-router'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  IndexRoute = ReactRouter.IndexRoute,
  App = require('./components/app'),
  Profile = require('./components/profile'),
  Review = require('./components/review_show'),
  Business = require('./components/business'),
  ReviewsIndex = require('./components/reviews_index'),
  browserHistory = ReactRouter.browserHistory;

var ProfileWrapper = React.createClass({
  render: function () {
    return <Profile userId={window.currentUserId}/>;
  }
});


var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={ProfileWrapper}/>
    <Route path="reviews/:id" component={Review}/>
    <Route path="businesses/:id" component={Business}/>
    <Route path="users/:username" component={Profile}/>
  </Route>
);


document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.getElementById('root');

  if (rootEl) {
    ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, rootEl);
  }
});
