import React, {Component} from "react";

export default class ClearButton extends Component{
    onClick(){
        this.props.changeIsClearCompleted()
    }
    render(){
        return (
            <button onClick = {()=>this.onClick()}>
                {this.props.text}
            </button>
        )
    }
}