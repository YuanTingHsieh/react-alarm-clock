import React from 'react';

/* A clock component displaying the current time */
export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hours: 0, minutes: 0, seconds: 0, id: 0 };
    this.setTime.bind(this);
  }

  setTime() {

    var currentdate = new Date();
    let hours = currentdate.getHours();    

    // correct for number over 24, and negatives
    if(hours >= 24 ){ 
      hours -= 24; 
    }
    if( hours < 0   ){
      hours += 12;
    }

    // add leading zero, first convert hours to string
    hours = hours + '';
    if( hours.length == 1 ){
      hours = '0' + hours;
    }

    // minutes are the same on every time zone
    let minutes = currentdate.getUTCMinutes();
    // add leading zero, first convert hours to string
    minutes = minutes + '';
    if( minutes.length == 1 ){ minutes = '0' + minutes; }

    let seconds = currentdate.getUTCSeconds();
    //console.log(hours, minutes, seconds)
    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }


  componentWillMount() {
    this.setTime();
  }
  componentDidMount() {
    let newid = window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
    this.setState({id: newid})
  }
  componentWillUnmount() {
    clearInterval(this.state.id);
  }

  render() {
    return (<h1>
      {this.state.hours}:{this.state.minutes}:{this.state.seconds}
    </h1>
    );
  }
}
