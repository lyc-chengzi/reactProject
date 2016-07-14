/**
 * Created by liuyc14 on 2016/7/8.
 */
var Demo = React.createClass({
    render: function(){
        return (<a href={this.props.url} className="list-group-item">{this.props.text}</a>);
    }
});