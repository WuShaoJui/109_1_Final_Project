import './App.css'
import React, { Component,  useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import Map from "./components/Map";

require('dotenv-defaults').config()

let num = process.env.GOOGLE_KEY;

class App extends Component {
    constructor(){
        super();

        this.state = {
            num_left : 0,
            showMode : 0,
            isClearCompleted : false,
            isDisplayFooter : false,
            //locations : [],
            nowLoc:{
                lat: "",
                lng: "",
            },
            isGoToAct: false,
            goTo:{
                lat: "",
                lng: "",
            }
        }
    }

    setNowLoc(loc){
        this.setState({
            nowLoc : {
                lat: loc.lat,
                lng: loc.lng
            }
        })
    }

    changeNum_left(n){
        this.setState({
            num_left : n
        })
    }
    changeShowMode(mode){
        this.setState({
            showMode : mode
        })
    }
    changeIsClearCompleted(){
        this.setState({
            isClearCompleted : true
        })
    }
    changeIsDisplayFooter(s){
        if(this.state.isDisplayFooter !== s)
        this.setState({
            isDisplayFooter : s
        })
    }
    componentDidUpdate(){
        if(this.state.isClearCompleted === true){
            this.setState({
                isClearCompleted : false
            })
        }
        /*if(this.state.nowLoc.lat !== ""){
          this.setState({
            nowLoc: {
              lat: "",
              lng: ""
            }
          })
        }*/
    }

    goToLoc(lat, lng){
      console.log(lat)
        this.setState({
            isGoToAct: true,
            goTo: {
              lat: lat,
              lng: lng
            },
        })
    }

    changeIsGoToAct(){
        if(this.state.isGoToAct === true){
            this.setState({
                isGoToAct: false,
                goTo:{
                    lat: "",
                    lng: ""
                }
            })
        }
    }
    

    render() {
        console.log(this.state.nowLoc)
        return (
            <div className="todo-app__root">
                <div className = "map">
                    <Map nowLoc={this.state.nowLoc} setNowLoc={(loc)=>this.setNowLoc(loc)} locations = {this.state.locations} 
                        isGoToAct={this.state.isGoToAct} goTo={this.state.goTo} changeIsGoToAct={(e)=>this.changeIsGoToAct(e)} />
                </div>
                <div className = "list">
                    <Header text = "旅遊／美食筆記" />
                    <Section nowLoc={this.state.nowLoc} changeNum_left = {(n)=>this.changeNum_left(n)} showMode = {this.state.showMode} isClearCompleted = {this.state.isClearCompleted}
                        isDisplayFooter = {this.state.isDisplayFooter} changeIsDisplayFooter = {(s)=>this.changeIsDisplayFooter(s)} goToLoc = {(lat,lng)=>this.goToLoc(lat,lng)} setNowLoc={(loc)=>this.setNowLoc(loc)}/>
                    <Footer num_left = {this.state.num_left} showMode = {this.state.showMode} changeShowMode = {(mode)=>this.changeShowMode(mode)} changeIsClearCompleted = {()=>this.changeIsClearCompleted()}
                        isDisplayFooter = {this.state.isDisplayFooter}/>
                </div>
                
            </div>
        );
    }
}

export default App;


/*function App() {
  const { status, opened, messages, sendMessage, clearMessages } = useChat()

  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')

  const bodyRef = useRef(null)

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  return (
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ name, body }, i) => ( //there change display
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
      </div>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }

          sendMessage({ name: username, body: msg })
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}

export default App*/
