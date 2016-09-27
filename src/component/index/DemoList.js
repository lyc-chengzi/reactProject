/**
 * Created by liuyc14 on 2016/7/8.
 */
import React from 'react';
import Demo from './Demo';

export default class DemoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {demoList: []};
    }

    render() {
        if(!this.state.demoList){
            return null;
        }
        var demoNode = this.state.demoList.map(function (demo) {
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

    componentDidMount(){
        var _this = this;
        $.get('/reactapi/demoList', function(data){
            _this.setState({demoList: data.data});
        }, 'json');
    }
}