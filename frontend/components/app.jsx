var React = require('react');
var Header = require('./header');
var CurrentUserStore = require('../stores/current_user_store');

var App = React.createClass({
  componentDidMount: function () {
    this.currentUserStoreListener =
      CurrentUserStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.currentUserStoreListener.remove();
  },

  render: function() {
    return (
      <div className="main">
        <Header/>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
