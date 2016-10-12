/**
 * Created by liuyc14 on 2016/10/12.
 */
import {connect} from 'react-redux';
import todoBody from '../components/TodoBody.react';
import action from '../action/TodoAction';

const mapStateToProps = (state) => {
    var todos = state.todos || [];
    return {
        allTodos: todos,
        areAllComplete: function(){
            for(var i = 0; i < todos.length; i++){
                if(!todos[i].complete) return false;
            }
            return true;
        }()
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAllComplete: function(){
            dispatch(action.toggleCompleteAll());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(todoBody);