var React = require('react'),
  Profile = require('../components/profile');

var App = React.createClass({
  render: function() {
    return (
      this.props.children
    );
  }
});

module.exports = App;
