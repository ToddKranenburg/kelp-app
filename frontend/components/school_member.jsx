var React = require('react'),
  History = require('react-router').History;

var SchoolMember = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return ({showName: false});
  },

  showName: function () {
    this.setState({showName: true});
  },

  unshowName: function () {
    this.setState({showName: false});
  },

  clickThumb: function () {
    this.unshowName();
    this.history.pushState({}, 'users/' + this.props.schoolMember.id);
  },

  render: function () {
    var name;
    if (this.state.showName) {
      name = <h3 className="school-member-name">{this.props.schoolMember.username}</h3>;
    }
    return (
      <div className="school-member" onClick={this.clickThumb} onMouseEnter={this.showName} onMouseLeave={this.unshowName}>
        <img className="school-member-thumb" src={this.props.schoolMember.image_url}/>
        {name}
      </div>
    );
  }
});

module.exports = SchoolMember;
