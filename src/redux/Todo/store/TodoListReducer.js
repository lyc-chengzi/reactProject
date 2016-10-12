/**
 * Created by liuyc14 on 2016/9/29.
 */

import TodoConstant from '../action/TodoConstant';

/**
 * 添加一个代办事项
 * @param 内容描述
 */
const create = (text) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    return {
        id: id,
        complete: false,
        text: text
    };
};

/**
 * 更新一个代办事项
 * @param id
 * @param 要更新的属性
 */
const update = (todos, id, updateOptions) => {
    var todo = _.find(todos, (o) => o.id==id);
    _.assign(todo || {}, updateOptions || {});
};

/**
 * 更新所有的待办事项
 * @param updates
 */
const updateAll = (todos, updates) => {
    for (let i = 0; i< todos.length; i++){
        var todo = todos[i];
        _.assign(todo || {}, updates);
    }
};

/**
 * 删除一个代办事项
 * @param id
 */
const remove = (todos, id) => {
    _.remove(todos, function(todo){
        return todo.id == id;
    });
};

/**
 * 删除已完成的代办事项
 */
const removeCompleted = (todos) => {
    _.remove(todos, function(todo){
        return todo.complete;
    });
};

//是否所有都已经完成
const areAllCompleted = (todos) => {
    if(!todos || todos.length < 1){return false;}
    for (let i = 0; i < todos.length; i++){
        if(!todos[i].complete){
            return false;
        }
    }
    return true;
};

function TodoListReducer(todos=[], action){
    let text;
    switch (action.type){
        case TodoConstant.TODO_CREATE:
            text = action.text.trim();
            if(text){
                return [...todos, create(text)];
            }else{
                return todos;
            }
            break;
        case TodoConstant.TODO_TOGGLE_COMPLETE_ALL:
            if (areAllCompleted(todos)) {
                updateAll(todos, {complete: false});
                return todos;
            } else {
                updateAll(todos, {complete: true});
                return todos;
            }
            break;
        case TodoConstant.TODO_UNDO_COMPLETE:
            update(todos, action.id, {complete: false});
            return todos;
            break;
        case TodoConstant.TODO_COMPLETE:
            update(todos, action.id, {complete: true});
            return todos;
            break;
        case TodoConstant.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(todos, action.id, {text: text});
                return todos;
            }else{
                return todos;
            }
            break;
        case TodoConstant.TODO_DESTROY:
            remove(todos, action.id);
            return todos;
            break;
        case TodoConstant.TODO_DESTROY_COMPLETED:
            removeCompleted(todos);
            return todos;
            break;
        default:
            return todos;
        // no op
    }
}

export {TodoListReducer};