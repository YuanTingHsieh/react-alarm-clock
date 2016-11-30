import React from 'react';

export default class Music extends React.Component {
  constructor(props) {
    super(props);

    //this.removeItem = this.removeItem.bind(this);
  }

  //removeItem() {
    //this.props.removeItem(this.props.idx, this.props.url);
    //alert("Playing  "+this.props.url);
  //}

  //componentDidUpdate() {
  //  if (this.props.remainSeconds <= 0) {
  //    this.removeItem();
  //  }
  //}

  render() {
    return (
      <li className="">
        <iframe src={this.props.url}></iframe>
      </li>
    );
  }
}
