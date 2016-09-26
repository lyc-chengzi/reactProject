/**
 * Created by liuyc14 on 2016/9/26.
 */
var React = require('react');
//var Footer = require('./Footer.react');
import TodoHeader from './TodoHeader.react';
import TodoBody from './TodoBody.react';
import TodoFooter from './TodoFooter.react';
import TodoStore from '../../flux/stores/TodoStore';

export default class TodoComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = this.getTodos();
        this.changeHandler = this.changeHandler.bind(this);
    }

    render(){
        return (
            <div>
                <TodoHeader />
                <TodoBody
                    allTodos={this.state.allTodos}
                    areAllComplete={this.state.areAllComplete}
                />
                <TodoFooter allTodos={this.state.allTodos}/>
            </div>
        );
    }

    componentDidMount(){
        TodoStore.addChangeListener(this.changeHandler)
    }
    componentWillUnmount(){
        TodoStore.removeChangeListener(this.changeHandler);
    }

    getTodos(){
        console.log(TodoStore);
        return {
            allTodos: TodoStore.getAll(),
            areAllComplete: TodoStore.areAllCompleted()
        };
    }

    changeHandler(){
        this.setState(this.getTodos());
    }
}

