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

  render: function () {
    return (
      <div className="main">
        <div className="sign-up group">
          <form className="sign-up-form" onSubmit={this.submitForm}>
            <h1>Sign up</h1>

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
            <div className="user-link">
              <Link to={'/login'}>Already have an account? Sign in here.</Link>
            </div>
          </form>
          <div className="sign-up-content">
            <img src="http://www.herbalremediesinfo.com/images/kelp.jpg"/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserForm;
