import React from 'react';

export default class AlarmItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { remainSeconds: this.props.remainSeconds, id: 0 };

    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }

  removeItem() {
    this.props.removeItem(this.props.idx);
    alert("Playing  "+this.props.url);
  }

  checkItem() {
    this.props.checkItem(this.props.idx);
  }

  setTime() {
    this.setState({remainSeconds: this.state.remainSeconds-1});
  }

  componentDidMount() {
    let newid = window.setInterval(function () {
      this.setTime();
      if (this.state.remainSeconds == 0){
        this.removeItem();
      }
    }.bind(this), 1000);
    this.setState({id: newid});
  }

  componentWillUnmount() {
    clearInterval(this.state.id);
  }

  render() {
    return (
      <li className="">
        <div className="">
          {this.props.hours}:{this.props.minutes}, remain:{this.state.remainSeconds}
          <button className="destroy" onClick={this.removeItem} />
        </div>
      </li>
    );
  }
}
