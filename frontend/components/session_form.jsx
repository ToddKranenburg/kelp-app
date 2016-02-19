var React = require('react'),
  SessionsApiUtil = require('../util/sessions_api_util'),
  ReactRouter = require('react-router'),
  Link = ReactRouter.Link,
  History = ReactRouter.History;

var SessionForm = React.createClass({
  mixins: [History],

  submitForm: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  submitHiddenForm: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function () {
    return (
      <div className="main">
        <div className="sign-up group">
          <div className="sign-up-form">
            <form onSubmit={this.submitForm}>
              <h1>Log In</h1>

              <input
              type="text"
              name="username"
              placeholder="Username"/>

              <input
              type="password"
              name="password"
              placeholder="Password"/>

            <button className="my-button top-button">Log in to Kelp</button>
            <a className="facebook-link" href="/auth/facebook">
              <img className="facebook-button" src={window.facebookLogoPath}/>
              <div className="overlay"></div>
            </a>
            </form>
            <form onSubmit={this.submitHiddenForm}>
              <input type="hidden" name="username" value="Nemo"/>
              <input type="hidden" name="password" value="Password"/>
              <button className="my-button">Log in as Guest User</button>
            </form>
            <div className="user-link">
              <Link to={'/sign-up'}>No account? Sign up here.</Link>
            </div>
          </div>
          <div className="sign-up-content">
            <img src={window.kelpPhoto}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SessionForm;
