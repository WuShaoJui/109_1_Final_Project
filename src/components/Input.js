import React, {Component,  useEffect, useRef, useState} from "react";
import { Input, message, Button } from 'antd';
import useChat from '../useChat'
//import Save from "./Save"

const { TextArea } = Input;


function Save(props) {
    const { status, opened, messages, sendMessage, clearMessages } = useChat()
  
    const [username, setUsername] = useState('')
    const [body, setBody] = useState('')
  
    const bodyRef = useRef(null)

    let newLocation = ""
  
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
    
    const saveOnClick = (e)=>{
      if(props.newLocation.loc.lat !== ""){
        sendMessage({ name: props.newLocation.name, body: props.newLocation.body, lat: props.newLocation.loc.lat, lng: props.newLocation.loc.lng})
        props.setNowLoc({lat:"",lng:""})
      }
      props.handleSave()
    }

    /*const update = (e)=>{
      console.log(props.Locations)
    }*/
  
    /*useEffect(() => {
      displayStatus(status)
    }, [status])*/

    useEffect(() => {
        if(props.isClear === true){
            clearMessages()
        }
        if(props.cnt !== messages.length){
          
          messages.map(({ name, body, lat, lng }, i)=>{
            //console.log(name + "\n" + body + "\n" + lat + "\n" + lng)
            if(i !== messages.length-1){
              props.out(name, body, lat, lng, false, i)
              console.log(i)
              props.setNowLoc({lat:"", lng:""})
            }else{
              props.out(name, body, lat, lng, true, i)
              console.log(i)
              return
            }
            
          })
        }
          
        /*if(props.isInit === false ){
            console.log(messages)
            for (let i = 0; i < messages.length; i++) {
                let name = messages[i].name
                let body = messages[i].body
                let lat = messages[i].loc.lat;
                let lng = messages[i].loc.lng;
                console.log(lat)
                props.changeLoc(name, body, lat, lng)
            }
            //props.changeIsInit()
        }*/
    })
  
    return (
      <>
          {<Button onClick={(e)=>saveOnClick(e)} type="primary">-Save-</Button>}
      {/*<div className="App">
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
      </div>*/}
      </>
    )
  }

export default class InputBar extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            name: "",
            inputValue : ""
        }
    }
    handleInput(e){
        this.setState({
            inputValue : e.target.value
        })
    }
    handleNameInput(e){
        this.setState({
            name : e.target.value
        })
    }

    /*handleEnter(e){
        if(e.key === "Enter"){
            console.log(this.state.inputValue)
            this.setState({
                inputValue : this.state.inputValue + "\n"
            })
        }
    }*/
    handleSave(e){
        if(this.state.inputValue !== "" && this.state.name !== "" && this.props.nowLoc.lat !== ""){
            //this.props.createNewTodo( this.state.name, this.state.inputValue ,this.props.nowLoc.lat, this.props.nowLoc.lng )
            this.setState({
                inputValue : "",
                name : ""
            })
        }
    }
    render(){
        return (
            <>
                <div className = "location">
                    緯度:{this.props.nowLoc.lat + "\n"}
                    經度:{this.props.nowLoc.lng}
                </div>
                <Input placeholder = "Name" className = "nameInput" onChange = {(e)=>{this.handleNameInput(e)}} value = {this.state.name}/>
                <TextArea rows={4} placeholder = "Type something..." autoSize={true} className = "todo-app__input" 
                onChange = {(e)=>{this.handleInput(e)}} value = {this.state.inputValue}/>
                <div className="saveButton">
                    <Save isInit = {this.props.isInit} changeIsInit = {()=>this.props.changeIsInit()} changeLoc={(a,b,c,d)=>{this.props.changeLoc(a,b,c,d)}} isClear = {this.props.isClear} newLocation={{name:this.state.name, body:this.state.inputValue, loc: this.props.nowLoc }} handleSave = {()=> this.handleSave()}
                    out = {(a,b,c,d,e,f)=>{this.props.out(a,b,c,d,e,f)}} cnt = {this.props.cnt} setNowLoc={(loc)=>this.props.setNowLoc(loc)}></Save>
                </div>
                
            </>
        )
    }
    
};