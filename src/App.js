import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
//import Lister from './Lister'
import VList from './virtualList'
import ChatBox from './ChatBox';
import logo from './logo.svg';
import './App.css';
//import { List } from 'react-virtualized'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: [],
    };
  }

  componentDidMount() {
    const username = window.prompt('Username: ', 'Anonymous');
    this.setState({ username });
    const pusher = new Pusher("22ae6b2c4ce1da757a39", {
      cluster: "ap2",
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post('http://localhost:5000/message', payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    /*
    function rowRenderer({key, index, isScrolling, isVisible, style}){
      console.log(key)
      console.log(style)
          return (
            <div key={key} style={style}>
              {list[index]}
            </div>
          )
        }
    */
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Let's just chat with Chatter!!!</h1>
        </header>
        <section>
          <br />
          
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
          <br />
          <div id="v-list">
          <VList chats={this.state.chats} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
