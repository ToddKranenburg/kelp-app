var React = require('react'),
  Profile = require('../components/profile');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Profile/>
      </div>
    );
  }
});

module.exports = App;
