import React, {Component} from "react";

export default class Button extends Component{
    constructor(){
        super()
        
        this.style = "white"
        this.state = {
            style : "white"
        }
    }
    componentWillMount(){
        if(this.props.text === "All" && this.props.showMode === 0){
            this.setState({
                style : "rgba(0, 0, 0, 0.312)"
            })
        }
        if(this.props.text === "Active" && this.props.showMode === 1){
            this.setState({
                style : "rgba(0, 0, 0, 0.312)"
            })
        }
        if(this.props.text === "Completed" && this.props.showMode === 2){
            this.setState({
                style : "rgba(0, 0, 0, 0.312)"
            })
        }
    }
    componentDidUpdate(){
        if(this.props.text === "All" && this.props.showMode !== 0 && this.state.style !== "white"){
            this.setState({
                style : "white"
            })
        }
        if(this.props.text === "Active" && this.props.showMode !== 1 && this.state.style !== "white"){
            this.setState({
                style : "white"
            })
        }
        if(this.props.text === "Completed" && this.props.showMode !== 2 && this.state.style !== "white"){
            this.setState({
                style : "white"
            })
        }
    }
    onClick(){
        if(this.props.text === "All" && this.props.showMode !== 0){
            this.props.changeShowMode(0)
            this.setState({
                style : "rgba(0, 0, 0, 0.312)"
            })
        }
        if(this.props.text === "Active" && this.props.showMode !== 1){
            this.props.changeShowMode(1)
            this.setState({
                style : "rgba(0, 0, 0, 0.312)"
            })
        }
        if(this.props.text === "Completed" && this.props.showMode !== 2){
            this.props.changeShowMode(2)
            this.setState({
                style : "rgba(0, 0, 0, 0.312)"
            })
        }
    }
    render(){
        return (
            <button onClick = {()=>this.onClick()} style = {{borderColor : this.state.style}}>
                {this.props.text}
            </button>
        )
    }
}