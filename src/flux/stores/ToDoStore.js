/**
 * Created by liuyc14 on 2016/9/23.
 */

var EventEmitter = require('events').EventEmitter;
var  _ = require('lodash');

import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstant from '../constants/TodoConstant';

const CHANGE_EVENT = 'change';

let _todos = {};

/**
 * 添加一个代办事项
 * @param 内容描述
 */
const create = (text) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
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
const update = (id, updateOptions) => {
    _todos[id] = _.assign(_todos[id] || {}, updateOptions || {});
};

/**
 * 更新所有的待办事项
 * @param updates
 */
const updateAll = (updates) => {
    for (let id in _todos){
        update(id, updates);
    }
};

/**
 * 删除一个代办事项
 * @param id
 */
const remove = (id) => {
    delete _todos[id];
};

/**
 * 删除已完成的代办事项
 */
const removeCompleted = () => {
    for (var id in _todos) {
        if (_todos[id].complete) {
            remove(id);
        }
    }
};

var TodoStore = _.assign({}, EventEmitter.prototype, {
    /**
     * 判断是否所有待办事项都已经完成
     * @returns boolean
     */
    areAllCompleted:function(){
        for (let id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    },
    /**
     * 获取所有待办事项
     * @returns {{}}
     */
    getAll:function(){
        return _todos;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {
    let text;
    switch (action.actionType){
        case TodoConstant.TODO_CREATE:
            text = action.text.trim();
            if(text){
                create(text);
                TodoStore.emitChange();
            }
            break;
        case TodoConstant.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllCompleted()) {
                updateAll({complete: false});
            } else {
                updateAll({complete: true});
            }
            TodoStore.emitChange();
            break;

        case TodoConstant.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            TodoStore.emitChange();
            break;

        case TodoConstant.TODO_COMPLETE:
            update(action.id, {complete: true});
            TodoStore.emitChange();
            break;

        case TodoConstant.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
                TodoStore.emitChange();
            }
            break;

        case TodoConstant.TODO_DESTROY:
            remove(action.id);
            TodoStore.emitChange();
            break;

        case TodoConstant.TODO_DESTROY_COMPLETED:
            removeCompleted();
            TodoStore.emitChange();
            break;

        default:
        // no op
    }
});

export default TodoStore;
