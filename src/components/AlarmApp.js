import React from 'react';
import AlarmItem from './AlarmItem';
import Clock from './Clock';
// import Music from './Music';

class AlarmApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalID: 0,
      items: [],
      inputHour: '',
      inputMinute: '',
      inputURL: '',
      statusMes: 'Status message!',
      // musicItems: [],
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.handleInputHour = this.handleInputHour.bind(this);
    this.handleInputMinute = this.handleInputMinute.bind(this);
    this.handleInputURL = this.handleInputURL.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.renderAlarmList = this.renderAlarmList.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.decreaseRemainSeconds = this.decreaseRemainSeconds.bind(this);
    // this.renderMusicList = this.renderMusicList.bind(this);
  }

  addItem(hour, minute, url, oneremainSeconds) {
    this.setState( { items: [...this.state.items, { hours: hour, minutes: minute, url: url, remainSeconds: oneremainSeconds}] } );
  }

  removeItem(idx, url) {
    this.setState({
      items: this.state.items.filter((v, i) => i !== idx),
    });
    this.setState({ statusMes: 'Playing ' + url });
    // this.setState({ musicItems: [...this.state.musicItems, url] });
  }

  checkItem(idx) {
    const newItems = [...this.state.items];
    newItems[idx].completed = !newItems[idx].completed;
    this.setState({
      items: newItems,
    });
  }

  handleAdd() {
      if (isNaN(this.state.inputMinute) || isNaN(this.state.inputHour)) {
        this.setState({ inputHour: '', inputMinute: '' });
        this.setState({ statusMes: "Invalid Values" });
      } else {
        const hour = parseInt(this.state.inputHour);
        const minutes = parseInt(this.state.inputMinute);
        if(hour < 0 || hour > 24) {
          this.setState({ statusMes: "Hours should be in 0~24" });
          this.setState({ inputHour: ''});
        } else if (minutes < 0 || minutes > 60) {
          this.setState({ statusMes: "Minutes should be in 0~60" });
          this.setState({ inputMinute: ''});
        } else {
          const date = new Date()
          const alarmTime = (hour * 60 + minutes) * 60;
          const currentTime = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
          const oneremainSeconds = alarmTime - currentTime;
          if (oneremainSeconds <= 0) {
            this.setState({ statusMes: "Invalid time!! Should be greater than Now!!" });
            this.setState({ inputHour: '', inputMinute: '' });
          } else {
            this.addItem(hour, minutes, this.state.inputURL, oneremainSeconds);
            this.setState({ inputHour: '', inputMinute: '', inputURL: '' });
          }
        }
      }
    
  }

  handleInputHour(e) {
    this.setState({ inputHour: e.target.value });  
  }

  handleInputMinute(e) {
    this.setState({ inputMinute: e.target.value });  
  }

  handleInputURL(e) {
    this.setState({ inputURL: e.target.value });  
  }

  decreaseTime(v) {
    v.remainSeconds = v.remainSeconds - 1;
    return v;
  }

  decreaseRemainSeconds() {
    this.setState({ items: this.state.items.map(this.decreaseTime) });
  }

  renderAlarmList() {
    if (this.state.items.length === 0) {
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

  // renderMusicList() {
  //   return this.state.musicItems.map(
  //     (v, i) => <Music url={v.url} />
  //   );
  // }

  componentDidMount() {
    const newid = window.setInterval(function () {
      this.decreaseRemainSeconds();
    }.bind(this), 1000);
    this.setState({ intervalID: newid });
  }

  componentWillUnmount() {
    clearInterval(this.state.id);
  }

  render() {
    return (
      <div>
          <header className="header">
            <h1>Alarms For Today</h1>
            <h2>{this.state.statusMes}</h2>
            <input
              className=""
              placeholder="Set hour (0-24)!"
              value={this.state.inputHour}
              onChange={this.handleInputHour}
            />
            <input
              className=""
              placeholder="Set minutes (0-60)!"
              value={this.state.inputMinute}
              onChange={this.handleInputMinute}
            />
            <input
              className=""
              placeholder="Music you want (URL)"
              value={this.state.inputURL}
              onChange={this.handleInputURL}
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
