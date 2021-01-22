import React, {Component} from "react";
import Input from "../components/Input";
import Todo from "../components/Todo";
//import List from "../components/List"

let Locations = []

let num = 0;
let cnt = 0;
let todos = []
let displayList = []

class List extends Component{
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
                    name = {e.name}
                    body = {e.body}
                    lat = {e.lat}
                    lng = {e.lng}
                    changeCnt = {(n)=>this.changeCnt(n)}
                    isComplete = {e.isComplete}
                    isDeleted = {e.isDeleted}
                    changeIsCompleted = {(s, id)=>this.changeIsCompleted(s, id)}
                    changeIsDeleted = {(s, id)=>this.changeIsDeleted(s, id)}
                    updateList = {()=>this.updateList(true)}
                    goToLoc = {(lat,lng)=>this.props.goToLoc(lat,lng)}
                />
            ))
        }
        if(mode === 1){
            displayList = todos.filter(e => (!e.isDeleted && !e.isComplete)).map(e => (
                <Todo
                    key = {e.key}
                    id = {e.id}
                    name = {e.name}
                    body = {e.body}
                    lat = {e.lat}
                    lng = {e.lng}
                    changeCnt = {(n)=>this.changeCnt(n)}
                    isComplete = {e.isComplete}
                    isDeleted = {e.isDeleted}
                    changeIsCompleted = {(s, id)=>this.changeIsCompleted(s, id)}
                    changeIsDeleted = {(s, id)=>this.changeIsDeleted(s, id)}
                    updateList = {()=>this.updateList()}
                    goToLoc = {(lat,lng)=>this.props.goToLoc(lat,lng)}
                />
            ))
        }
        if(mode === 2){
            displayList = todos.filter(e => (!e.isDeleted && e.isComplete)).map(e => (
                <Todo
                    key = {e.key}
                    id = {e.id}
                    name = {e.name}
                    body = {e.body}
                    lat = {e.lat}
                    lng = {e.lng}
                    changeCnt = {(n)=>this.changeCnt(n)}
                    isComplete = {e.isComplete}
                    isDeleted = {e.isDeleted}
                    changeIsCompleted = {(s, id)=>this.changeIsCompleted(s, id)}
                    changeIsDeleted = {(s, id)=>this.changeIsDeleted(s, id)}
                    updateList = {()=>this.updateList()}
                    goToLoc = {(lat,lng)=>this.props.goToLoc(lat,lng)}
                />
            ))
        }
    }
    componentWillUpdate(){
        if(this.props.isCreateNew === true){
            /*todos[num] = <Todo key = {num} text = {this.props.newTodo} id = {num}
                            changeCnt = {(n)=>this.changeCnt(n)} getShowMode = {()=>{return this.props.showMode}}/>;
            todos[num] = {key : num, id : num, loc : this.props.newLoc,
                isComplete : false, isDeleted : false, changeIsCompleted : (s)=>this.changeIsCompleted(s), changeIsDeleted : (s)=>this.changeIsDeleted(s)}
            ++num
            this.changeCnt(1)*/
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


export default class Section extends Component{
    constructor(props) {
        super(props)
        
        this.state = {
            newLoc : "",
            isCreateNew : false,
            isInit: false
        }
    }
    //test
    out(n,b,t,g, isInit, i){
        console.log(n + "\n" + b + "\n" + t + "\n" + g)
        cnt = i + 1
        console.log(cnt)
        console.log(isInit + "sjaiisa")
        todos[i] = {key : i, id : i, name: n, body: b, lat: t, lng: g,
            isComplete : false, isDeleted : false, changeIsCompleted : (s)=>this.changeIsCompleted(s), changeIsDeleted : (s)=>this.changeIsDeleted(s)}
        if(isInit && !this.state.isInit){
            console.log("isisisisisisi  " + isInit)
            this.setState({isInit: true, isCreateNew:true})
            this.props.changeNum_left(cnt)
        }
        if(isInit){
            this.props.changeNum_left(cnt)
        }
    }

    changeLoc(name, body, lat, lng){
        this.createNewTodo(name, body, {lat: lat, lng: lng})
    }

    changeIsInit(){
        this.setState({
            isInit: true
        })
    }

    createNewTodo(name, des, loc){
        this.setState({
            newLoc : {
                name : name,
                des : des,
                loc : loc,
            },
            isCreateNew : true
        })
    }

    componentDidUpdate(){
        if(this.state.isCreateNew === true){
            this.setState({
                isCreateNew : false
            })
        }
        if(this.state.isInit === false){
            this.setState({
                isInit : true
            })
        }
        
        //this.props.changeNum_left(cnt)
    }

    render(){
        console.log(todos[0] +"\n" + this.state.isInit)
        return(
            <section className = "todo-app__main">
                <Input createNewTodo = {(name, des, loc)=>this.createNewTodo(name, des, loc)} nowLoc={this.props.nowLoc} 
                    isClear = {this.props.isClearCompleted} isInit = {this.state.isInit}  changeLoc={(a,b,c,d)=>{this.changeLoc(a,b,c,d)}}
                    changeIsInit = {()=>this.changeIsInit()} out = {(a,b,c,d,e,f)=>{this.out(a,b,c,d,e,f)}} cnt = {cnt} setNowLoc={(loc)=>this.props.setNowLoc(loc)}/>
                <List isCreateNew = {this.state.isCreateNew} newLoc = {this.state.newLoc} showMode = {this.props.showMode} changeNum_left = {(n)=>this.props.changeNum_left(n)} isClearCompleted = {this.props.isClearCompleted}
                    isDisplayFooter = {this.props.isDisplayFooter} changeIsDisplayFooter = {(s)=>this.props.changeIsDisplayFooter(s)} goToLoc = {(lat,lng)=>this.props.goToLoc(lat,lng)}
                    />
            </section>
        )
    }
}