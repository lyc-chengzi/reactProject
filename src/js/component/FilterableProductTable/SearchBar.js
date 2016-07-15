var SearchBar = React.createClass({
    render: function () {
        return (
            <form>
                <input type="text" placeholder="input product name"
                       ref="filterTextInput"
                       value={this.props.filterName}
                       onChange={this.handleChange} /><br/>
                <input id="FPT_SearchBar_in_stock" type="checkbox"
                       ref="inputOnlyStock"
                       checked={this.props.onlyStock}
                       onChange={this.handleChange} />
                <label htmlFor="FPT_SearchBar_in_stock">only show product in stock</label>
            </form>
        );
    },
    handleChange:function(){
        this.props.onSearchChange(this.refs.filterTextInput.value, this.refs.inputOnlyStock.checked);
    }
});