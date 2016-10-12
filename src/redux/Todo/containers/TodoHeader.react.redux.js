/**
 * Created by liuyc14 on 2016/10/12.
 */
import {connect} from 'react-redux';
import header from '../components/TodoHeader.react';
import action from '../action/TodoAction';

const mapDispatchToProps = function(dispatch){
    return {
        addTodo: function(text){
            dispatch(action.create(text));
        }
    };
};

export default connect(null, mapDispatchToProps)(header);
