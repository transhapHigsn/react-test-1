import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import VList from './virtualList'
import UList from './virtualUser'
//import Lister from './Lister'
import ChatBox from './ChatBox';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: [],
      names:[]
    };
  }

  componentDidMount() {
    var username = window.prompt('Username: ', 'Anonymous');
    if (!username){
      username = 'Mr. X'
    }
    console.log(username)
    const currentObj = this
    var names = []

    //creating pusher client
    const pusher = new Pusher("App_key", {
      cluster: "App_cluster",
      encrypted: true,
      auth : {
        params: {
          name: username
        }
      }, 
      authEndpoint: 'http://localhost:5000/pusher/auth',
      authTransport: 'ajax' 
    });
    
    //subscribing to the channel
    const channel = pusher.subscribe('presence-chat');
    
    //runs after successful subscription to the channel
    channel.bind('pusher:subscription_succeeded', function() {
      console.log("Connection successful")
      console.log("Members count "  + channel.members.count)

      console.log(channel.members.me.info, channel.members.me.id)  
      
      //calculates number of members subscribed to channel and
      //then uses that setState, so that online members list can be renedered. 
      if (channel.members.count <= 1){
        names = [channel.members.me.info.name]
        currentObj.setState({ names })
      } else {
        channel.members.each(function(membr){
          names = [...names, membr.info.name]
        })
        currentObj.setState({names})
      }
      console.log(currentObj.state.names, 'Let;')

    })

    //runs if there is an error while channel subscription
    channel.bind('pusher:subscription_error', function(status) {
      console.log("Subscription declined " + status)
    });

    //runs when a new member connects to the channel
    channel.bind('pusher:member_added', function(member) {
      console.log("Member added", member.info.name)

      names = [...names, member.info.name]  
      currentObj.setState({ names })
    });

    //runs when an existing member is removed
    channel.bind('pusher:member_removed', function(member) {
      console.log("Member removed", member.info.name)
      let idx = names.indexOf(member.info.name)
      names.splice(idx, 1)
      currentObj.setState({ names })      
    });
    
    //runs when a message is sent
    channel.bind('message', data => {
      console.log('Sending message')
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });

    //sets state of the component
    this.setState({ username });
    
    //binds the method to the component
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
            <UList names={this.state.names} />
            <VList chats={this.state.chats} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
