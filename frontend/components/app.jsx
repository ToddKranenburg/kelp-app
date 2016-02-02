var React = require('react');
var Header = require('./header');
var CurrentUserStore = require('../stores/current_user_store');
var Map = require('./map');

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
      <div>
        <Header/>
        <div className="main" id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;
