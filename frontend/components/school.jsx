var React = require('react'),
  SchoolMember = require('./school_member');

var School = React.createClass({
  render: function() {
    var schoolMembers = [];

    this.props.schoolMembers.forEach( function (schoolMember) {
      schoolMembers.push(
        <SchoolMember schoolMember={schoolMember} key={schoolMember.id}/>
      );
    });
    return (
      <div className="school group">
        <h2 className="school-header">{this.props.username + '\'s School'}</h2>
        {schoolMembers}
      </div>
    );
  }
});

module.exports = School;
