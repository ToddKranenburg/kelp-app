var React = require('react'),
  Profile = require('../components/profile');

var App = React.createClass({
  render: function() {
    return (
      <div className="main">
        <Profile userId={window.currentUserId}/>
      </div>
    );
  }
});

module.exports = App;
