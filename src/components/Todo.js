import { Button } from "antd";
import React, {Component} from "react";
import img_x from "../img/x.png";

export default class Todo extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isComplete : this.props.isComplete,
            isDeleted : this.props.isDeleted,
        }
    }
    xOnClick(){
        if(this.state.isComplete === false){
            this.props.changeCnt(-1)
        }
        this.setState({
            isComplete : true,
            isDeleted : true
        })
        this.props.changeIsCompleted(true, this.props.id)
        this.props.changeIsDeleted(true, this.props.id)
        this.props.updateList()
    }
    checkboxOnClick(){
        if(this.state.isComplete === false){
            this.setState({
                isComplete : true
            })
            this.props.changeIsCompleted(true, this.props.id)
            this.props.changeCnt(-1)
        }
        else{
            this.setState({
                isComplete : false
            })
            this.props.changeIsCompleted(false, this.props.id)
            this.props.changeCnt(1)
        }
        this.props.updateList()
    }

    goToLoc(e){
        console.log("lat   "+this.props.lat)
        this.props.goToLoc(this.props.lat, this.props.lng)
    }

    render(){
        return (
            <li className = "todo-app__item">
                <div className = "todo-app__checkbox">
                    {/*<input type = "checkbox" id = {this.props.id} onClick = {()=>this.checkboxOnClick()}
                        checked = {this.state.isComplete && !this.state.isDeleted} onChange = {()=>{}}/>
                    <label htmlFor = {this.props.id}/>*/}
                    <Button type = "default" onClick = {(e)=>this.goToLoc(e)}>Go</Button>
                </div>
                <div className = "todo-app__item-detail">
                    <h1  style = {this.props.isComplete? {textDecoration : "line-through", opacity : 0.5} : {textDecoration : "", opacity : 1}}>
                        {this.props.name}
                    </h1>
                    <p className = "description"> 
                        {this.props.body}
                    </p>
                </div>
                <img className = "todo-app__item-x" src = {img_x} alt = "" onClick = {()=>this.xOnClick()}/>
            </li>
        )
    }
}