import React from 'react';
import AlarmItem from './AlarmItem';
import Clock from './Clock'

class AlarmApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputHour: '',
      inputMinute: '',
      inputURL: '',
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.handleInputHour = this.handleInputHour.bind(this);
    this.handleInputMinute = this.handleInputMinute.bind(this);
    this.handleInputURL = this.handleInputURL.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.renderAlarmList = this.renderAlarmList.bind(this);
  }

  addItem(hour, minute, url) {
  	var date = new Date()
  	const remainSeconds = (((hour-date.getHours())*60)+(minute-date.getMinutes()))*60;
    this.setState({ items: [...this.state.items, { hours: hour, minutes: minute, remainSeconds: remainSeconds, url: url}] });
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

  handleAdd(e) {
      if (isNaN(this.state.inputMinute) || isNaN(this.state.inputHour)) {
      	this.setState({ inputHour: '', inputMinute: '' });
      	alert("Invalid Values");
      } else {
      	const hour = parseInt(this.state.inputHour);
      	const minutes = parseInt(this.state.inputMinute);
      	if(hour < 0 || hour > 24) {
      		alert("Hours should be in 0~24");
      		this.setState({ inputHour: ''});
      	} else if (minutes < 0 || minutes > 60) {
      		alert("Minutes should be in 0~60");
      		this.setState({ inputMinute: ''});
      	} else {
      		this.addItem(hour,minutes,this.state.inputURL);
            this.setState({ inputHour: '', inputMinute: '', inputURL: '' });
      	}
      }
    
  }

  handleInputHour(e) {
    this.setState({ inputHour: e.target.value + e.key });  
  }

  handleInputMinute(e) {
    this.setState({ inputMinute: e.target.value + e.key });  
  }

  handleInputURL(e) {
    this.setState({ inputURL: e.target.value + e.key });  
  }
  renderAlarmList() {
    if (this.state.length === 0) {
      return '';
    }

    return this.state.items.map(
      (v, i) => <AlarmItem
        key={i}
        idx={i}
        hours={v.hours}
        minutes={v.minutes}
        url={v.url}
        checkItem={this.checkItem}
        removeItem={this.removeItem}
        remainSeconds={v.remainSeconds}
       />
    );
  }

  render() {
    return (
      <div>
          <header className="header">
            <h1>Alarms</h1>
            <input
              className=""
              placeholder="Set hour (0-24)!"
              value={this.state.inputHour}
              onKeyPress={this.handleInputHour}
            />
            <input
              className=""
              placeholder="Set minutes (0-60)!"
              value={this.state.inputMinute}
              onKeyPress={this.handleInputMinute}
            />
            <input
              className=""
              placeholder="Music you want (URL)"
              value={this.state.inputURL}
              onKeyPress={this.handleInputURL}
            />
            <button onClick={this.handleAdd}>set this alarm</button>
            <Clock />
          </header>
        <section className="main">
          <ul className="">{this.renderAlarmList()}</ul>
        </section>
      </div>
    );
  }
}

export default AlarmApp;
