/**
 * Created by liuyc14 on 2016/7/8.
 */
import React from 'react';
import Demo from './Demo';

export default class DemoList extends React.Component{
    constructor(props){
        super(props);
        this.demoList = [{
            "id": "demo1",
            "url": "src/pages/demo1/demo1.html",
            "text": "demo1 - 基本用法"
        }, {
            "id": "demo2",
            "url": "src/pages/demo2/demo2.html",
            "text": "demo2 - Flux基本使用"
        }, {
            "id": "demo3",
            "url": "src/pages/demo3/demo3.html",
            "text": "demo3 - 绑定事件"
        }];
    }

    render() {
        var demoNode = this.demoList.map(function (demo) {
            return (
                <Demo key={demo.id} url={demo.url} text={demo.text}/>
            );
        });
        return (
            <div className="panel panel-info">
                <div className="panel-heading">{this.props.title}</div>
                <div className="panel-body">
                    <ul className="list-group">
                        {demoNode}
                    </ul>
                </div>
            </div>
        );
    }
}