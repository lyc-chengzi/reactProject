class FilterableProductTable extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
            filterName: '',
            onlyStock: false
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    render () {
        return (
            <div>
                <SearchBar filterName={this.state.filterName} onlyStock={this.state.onlyStock} onSearchChange={this.handleSearchChange}/>
                <ProductTable products={this.state.data} filterName={this.state.filterName} onlyStock={this.state.onlyStock}/>
            </div>
        );
    }

    //组件显示后(生命周期中的方法)
    componentDidMount () {
        var defaultData = [
            {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
            {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
            {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
            {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
            {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
            {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
        ];
        setTimeout(function () {
            this.setState({data: defaultData});
        }.bind(this), 2000);
    }
    //当搜索框变化时的处理函数
    handleSearchChange(filterName, onlyStock){
        this.setState({
            filterName: filterName,
            onlyStock: onlyStock
        });
    }
    addOneProduct () {
        var oldData = this.state.data;
        var newData = {category: "Electronics", price: "$123", stocked: true, name: (new Date) - 0};
        oldData.push(newData);
        this.setState({data: oldData});
    }
}