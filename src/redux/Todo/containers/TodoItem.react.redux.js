/**
 * Created by liuyc14 on 2016/10/12.
 */
import {connect} from 'react-redux';
import item from '../components/TodoItem.react';
import action from '../action/TodoAction';

const mapDispatchToProps = function(dispatch, ownProps){
    return {
        toggleComplete: function(){
            dispatch(action.toggleComplete(ownProps.todo));
        },
        removeItem: function (){
            dispatch(action.remove(ownProps.todo.id));
        },
        updateText: function (text){
            dispatch(action.updateText(ownProps.todo.id, text));
        }
    };
};

export default connect((state) => ({
    todos: state.todos
}), mapDispatchToProps)(item);