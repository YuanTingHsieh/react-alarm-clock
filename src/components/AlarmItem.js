import React from 'react';

export default class AlarmItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem() {
    this.props.removeItem(this.props.idx, this.props.url);
    //alert("Playing  "+this.props.url);
  }

  componentDidUpdate() {
    if (this.props.remainSeconds <= 0) {
      this.removeItem();
    }
  }

  render() {
    return (
      <li className="">
        <div className="">
          {this.props.hours}:{this.props.minutes}, remain:{this.props.remainSeconds}
          <button className="destroy" onClick={this.removeItem} />
        </div>
      </li>
    );
  }
}
