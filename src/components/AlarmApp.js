import React from 'react';
import AlarmItem from './AlarmItem';

class AlarmApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputText: '',
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.renderAlarmList = this.renderAlarmList.bind(this);
  }

  addItem(text) {
    this.setState({ items: [...this.state.items, { content: text, completed: false }] });
  }

  removeItem(idx) {
    this.setState({
      items: this.state.items.filter((v, i) => i !== idx),
    });
  }

  checkItem(idx) {
    const newItems = [...this.state.items];
    newItems[idx].completed = !newItems[idx].completed;
    this.setState({
      items: newItems,
    });
  }

  handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      if (this.state.inputText.trim() !== '') {
        this.addItem(this.state.inputText);
        this.setState({ inputText: '' });
      }
    } else {
      this.setState({ inputText: e.target.value + e.key });
    }
  }

  renderAlarmList() {
    if (this.state.length === 0) {
      return '';
    }

    return this.state.items.map(
      (v, i) => <AlarmItem
        key={i}
        idx={i}
        content={v.content}
        completed={v.completed}
        checkItem={this.checkItem}
        removeItem={this.removeItem}
       />
    );
  }

  render() {
    const activeAlarmCount = this.state.items.reduce((accum, todo) =>
       (todo.completed ? accum : accum + 1)
    , 0);
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>Alarms</h1>
            <input
              className="new-todo"
              placeholder="Set an alarm!"
              value={this.state.inputText}
              onKeyPress={this.handleInputKeyPress}
            />
          </header>
        </section>
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            checked={activeAlarmCount === 0}
          />
          <ul className="todo-list">{this.renderAlarmList()}</ul>
        </section>
        <div>Still have {activeAlarmCount} todos not finished yet!!!</div>
      </div>
    );
  }
}
