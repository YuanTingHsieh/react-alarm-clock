import React from 'react';

export default class setTimeItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2">
            <div className="center-block"><span className="glyphicon glyphicon-triangle-top"></span></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <input className="center-block" placeholder="GGWP" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <div className="center-block"><span className="glyphicon glyphicon-triangle-bottom"></span></div>
          </div>
        </div>
      </div>
    );
  }

}