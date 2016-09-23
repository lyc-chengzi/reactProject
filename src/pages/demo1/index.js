/**
 * Created by liuyc14 on 2016/7/26.
 */
import FilterableProductTable from 'FilterableProductTable';//webpack中指定了全局变量
import React from 'react';
import ReactDom from 'react-dom';

var fbp = ReactDom.render(<FilterableProductTable />, document.getElementById('demo_list'));
console.log(fbp);

setTimeout(function(){
    fbp.addOneProduct({category: "电脑", price: "￥3999", stocked: true, name: 'YOGA Book'});
}, 4000);
