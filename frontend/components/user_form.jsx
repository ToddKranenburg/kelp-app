var React = require('react'),
  SessionsApiUtil = require('../util/sessions_api_util'),
  ReactRouter = require('react-router'),
  Link = ReactRouter.Link,
  History = ReactRouter.History;

var UserForm = React.createClass({
  mixins: [History],

  submitForm: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.signUp(credentials, function () {
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
              <h1>Sign Up</h1>

              <input
              type="text"
              name="username"
              placeholder="Username"/>

              <input
              type="password"
              name="password"
              placeholder="Password"/>

              <button className="my-button">Sign up for Kelp</button>
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
              <Link to={'/login'}>Already have an account? Log in here.</Link>
            </div>
          </div>
          <div className="sign-up-content">
            <img src="http://www.herbalremediesinfo.com/images/kelp.jpg"/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserForm;
