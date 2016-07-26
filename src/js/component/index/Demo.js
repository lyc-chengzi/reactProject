/**
 * Created by liuyc14 on 2016/7/8.
 */
import React from 'react';

export default class Demo extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<a href={this.props.url} className="list-group-item">{this.props.text}</a>);
    }
}