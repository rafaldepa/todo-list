import React, { Component } from 'react';
import './app.scss';
import ToDo from './components/ToDo';

class App extends Component {
  constructor(props) {
    super(props);

    this.lsTasks = localStorage.getItem('todo_tasks');
    this.lsArchive = localStorage.getItem('todo_archive');

    this.state = {
      tasks: (this.lsTasks) ? this.lsTasks : [],
      archive: (this.lsArchive) ? this.lsArchive : [],
    }    
  }

  // theme = () => {
  //   let themeClass = 'app';
  //   const time = new Date().getHours();
  //   ((time >= 17 && time <= 24) || (time >= 0 && time < 6)) ? themeClass += ' app--dark' : themeClass = themeClass;
  //   return themeClass;
  // }

  render() { 
    return (
      <div className="app">
        <ToDo {...this.state} />
      </div>
    );
  }  
}

export default App;