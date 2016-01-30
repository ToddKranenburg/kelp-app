var React = require('react'),
  SessionsApiUtil = require('../util/sessions_api_util'),
  ReactRouter = require('react-router'),
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

  submitHiddenForm: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function() {
    var headerContent;

    if (CurrentUserStore.isLoggedIn()) {
      headerContent = (
        <div>
          <div className="header-buttons">
            <Link className="my-button" to={'/'}>{CurrentUserStore.getCurrentUser().username}</Link>
            <div className="my-button" onClick={this.logout}>Sign Out</div>
          </div>
        </div>
      );
    } else {
      headerContent = (
        <div>
          <div className="demo-form">
            <form onSubmit={this.submitHiddenForm}>
              <input type="hidden" name="username" value="Nemo"/>
              <input type="hidden" name="password" value="Password"/>
              <button className="demo-button my-button">Demo</button>
            </form>
          </div>
          <div className="header-buttons">
            <Link className="my-button" to={'/sign-up'}>Sign up</Link>
            <Link className="my-button" to={'/login'}>Sign in</Link>
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
