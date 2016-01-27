var React = require('react'),
  Profile = require('../components/profile');

var App = React.createClass({
  render: function() {
    return (
      <div className="main">
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
