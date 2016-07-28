/**
 * Created by liuyc14 on 2016/7/26.
 */
import React from 'react';
import ReactDom from 'react-dom';
import DemoList from '../../component/index/DemoList';

$(function () {
    ReactDom.render(<DemoList title='demo列表'/>, document.getElementById('demo_list'));
});