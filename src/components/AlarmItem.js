import React from 'react';

export default class AlarmItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
  }

  removeItem() {
    this.props.removeItem(this.props.idx);
  }

  checkItem() {
    this.props.checkItem(this.props.idx);
  }

  render() {
    return (
      <li className={this.props.completed ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onClick={this.checkItem}
          />
          <label>{this.props.content}</label>
          <button className="destroy" onClick={this.removeItem} />
        </div>
      </li>
    );
  }
}
