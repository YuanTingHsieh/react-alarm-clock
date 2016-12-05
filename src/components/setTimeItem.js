import React from 'react';

export default class setTimeItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-4 offset-xs-2">
          <div className="row">
            <span className="fa fa-sort-asc offset-xs-6" aria-hidden="true"></span>
          </div>
          <div className="row">
          <div className="col-xs-2 offset-xs-5">
            <input type="text" placeholder={this.props.currentTime} className="form-control"></input>
          </div>
          </div>
          <div className="row">
            <span className="fa fa-sort-desc offset-xs-6" aria-hidden="true"></span>
          </div>    
        </div>
      </div>
    );
  }

}
