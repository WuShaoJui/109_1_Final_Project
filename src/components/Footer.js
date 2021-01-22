import React, {Component} from "react";
import ViewButton from "./ViewButton";
import ClearButton from "./ClearButton"

export default class Footer extends Component{
    constructor(){
        super()

        this.state = {
            display : "none"
        }
    }
    checkIsDisplay(){
        if(this.props.isDisplayFooter && this.state.display === "none"){
            this.setState({
                display : "flex"
            })
        }
        if(!this.props.isDisplayFooter && this.state.display === "flex"){
            this.setState({
                display : "none"
            })
        }
    }
    render(){
        this.checkIsDisplay()
        return (
            <footer className = "todo-app__footer" style = {{display : this.state.display}}>
                <div className = "todo-app__total">{"total: " + this.props.num_left}</div>
                <div className = "todo-app__clean">
                    <ClearButton text = {"Claer"} changeIsClearCompleted = {()=>this.props.changeIsClearCompleted()}/>
                </div>
            </footer>
        )
    }
}