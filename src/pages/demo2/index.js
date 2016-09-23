/**
 * Created by liuyc14 on 2016/7/26.
 */
import FilterableProductTable from 'FilterableProductTable';//webpack中指定了全局变量
import React from 'react';
import ReactDom from 'react-dom';
import todo from '../../flux/stores/ToDoStore';

ReactDom.render(<FilterableProductTable />, document.getElementById('demo_list'));
