import React from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

import ProductStore from '../../flux/stores/ProductStore';

export default class FilterableProductTable extends React.Component{
    constructor(){
        super();
        this.state = {
            products: [],
            filterName: '',
            onlyStock: false
        };
        this.reloadProductState = this.reloadProductState.bind(this);
    }
    render () {
        return (
            <div>
                <SearchBar filterName={this.state.filterName} onlyStock={this.state.onlyStock}/>
                <ProductTable products={this.state.products} filterName={this.state.filterName} onlyStock={this.state.onlyStock}/>
            </div>
        );
    }

    //组件显示后(生命周期中的方法)
    componentDidMount () {
        setTimeout(function () {
            this.reloadProductState();
        }.bind(this), 2000);

        ProductStore.addChangeListener(this.reloadProductState);
    }

    componentWillUnmount (){
        ProductStore.removeChangeListener(this.reloadProductState);
    }

    //重新加载产品数据
    reloadProductState (){
        this.setState(ProductStore.getStore());
    }
    addOneProduct (product) {
        var oldData = this.state.products;
        var newData = {category: "Electronics", price: "$123", stocked: true, name: ((new Date).getMilliseconds() + " New Product")};
        oldData.push(product || newData);
        this.setState({products: oldData});
    }
}