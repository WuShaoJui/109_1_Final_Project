import React, {Component} from "react";
import Todo from "../components/Todo";


let num = 0;
let cnt = 0;
let todos = []
let displayList = []

//const { status, opened, messages, sendMessage, clearMessages } = useChat()

export default class List extends Component{
    constructor(props){
        super(props)

        this.state = {
            isUpdate : false
        }
    }
    changeCnt(n){
        cnt = cnt + n
        this.props.changeNum_left(cnt)
    }
    changeIsCompleted(s, id){
        todos[id].isComplete = s;
    }
    changeIsDeleted(s, id){
        todos[id].isDeleted = s;
    }
    updateList(s){
        //this.props.changeLoc(todos)
        if(s){
            this.setState({
                isUpdate : true
            })
        }
        if(this.props.isClearCompleted){
            todos.forEach(e => (e.isDeleted = true)) //delete backend
            cnt = 0
            this.changeCnt(0)
        }

        if(todos.filter(e => (!e.isDeleted)).length === 0 && this.props.isDisplayFooter){
            this.props.changeIsDisplayFooter(false)
        }
        else if(todos.filter(e => (!e.isDeleted)).length !== 0 && !this.props.isDisplayFooter){
            this.props.changeIsDisplayFooter(true)
        }
    }
    displayTodos(mode){
        if(mode === 0){
            displayList = todos.filter(e => !e.isDeleted).map(e => (
                <Todo
                    key = {e.key}
                    id = {e.id}
                    loc = {e.loc}
                    changeCnt = {(n)=>this.changeCnt(n)}
                    isComplete = {e.isComplete}
                    isDeleted = {e.isDeleted}
                    changeIsCompleted = {(s, id)=>this.changeIsCompleted(s, id)}
                    changeIsDeleted = {(s, id)=>this.changeIsDeleted(s, id)}
                    updateList = {()=>this.updateList(true)}
                    goToLoc = {(loc)=>this.props.goToLoc(loc)}
                />
            ))
        }
        if(mode === 1){
            displayList = todos.filter(e => (!e.isDeleted && !e.isComplete)).map(e => (
                <Todo
                    key = {e.key}
                    id = {e.id}
                    loc = {e.loc}
                    changeCnt = {(n)=>this.changeCnt(n)}
                    isComplete = {e.isComplete}
                    isDeleted = {e.isDeleted}
                    changeIsCompleted = {(s, id)=>this.changeIsCompleted(s, id)}
                    changeIsDeleted = {(s, id)=>this.changeIsDeleted(s, id)}
                    updateList = {()=>this.updateList()}
                    goToLoc = {(loc)=>this.props.goToLoc(loc)}
                />
            ))
        }
        if(mode === 2){
            displayList = todos.filter(e => (!e.isDeleted && e.isComplete)).map(e => (
                <Todo
                    key = {e.key}
                    id = {e.id}
                    loc = {e.loc}
                    changeCnt = {(n)=>this.changeCnt(n)}
                    isComplete = {e.isComplete}
                    isDeleted = {e.isDeleted}
                    changeIsCompleted = {(s, id)=>this.changeIsCompleted(s, id)}
                    changeIsDeleted = {(s, id)=>this.changeIsDeleted(s, id)}
                    updateList = {()=>this.updateList()}
                    goToLoc = {(loc)=>this.props.goToLoc(loc)}
                />
            ))
        }
    }
    componentWillUpdate(){
        if(this.props.isCreateNew === true){
            /*todos[num] = <Todo key = {num} text = {this.props.newTodo} id = {num}
                            changeCnt = {(n)=>this.changeCnt(n)} getShowMode = {()=>{return this.props.showMode}}/>;*/
            todos[num] = {key : num, id : num, loc : this.props.newLoc,
                isComplete : false, isDeleted : false, changeIsCompleted : (s)=>this.changeIsCompleted(s), changeIsDeleted : (s)=>this.changeIsDeleted(s)}
            ++num
            this.changeCnt(1)
        }
    }
    componentDidUpdate(){
        if(this.state.isUpdate === true){
            this.setState({
                isUpdate : false
            })
        }
    }
    render(){
        this.updateList(false)
        this.displayTodos(this.props.showMode)
        return (
            <ul className = "todo-app__list">
                   {displayList}
            </ul>
        )
    }
}