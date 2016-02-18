var React = require('react'),
  SessionsApiUtil = require('../util/sessions_api_util'),
  ReactRouter = require('react-router'),
  Search = require('./search'),
  Link = ReactRouter.Link,
  History = require('react-router').History,
  CurrentUserStore = require('../stores/current_user_store');

var Header = React.createClass({
  mixins: [History],

  logout: function () {
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/login");
    }.bind(this));
  },


  render: function() {
    var headerContent;

    if (CurrentUserStore.isLoggedIn()) {
      headerContent = (
        <div>
          <Search/>
          <div className="header-buttons">
            <Link className="my-button" to={'/'}>{CurrentUserStore.getCurrentUser().username}</Link>
            <div className="my-button" onClick={this.logout}>Sign Out</div>
          </div>
        </div>
      );
    } else {
      headerContent = (
        <div>
          <div className="header-buttons">
            <Link className="my-button" to={'/sign-up'}>Sign up</Link>
            <Link className="my-button" to={'/login'}>Log in</Link>
          </div>
        </div>
      );
    }

    return (
      <div className="my-header">
        <nav className="group header-nav">
          <Link className="header-logo" to={'/'}>
            kelp
          </Link>
          {headerContent}
        </nav>

      </div>
    );
  }
});

module.exports = Header;
