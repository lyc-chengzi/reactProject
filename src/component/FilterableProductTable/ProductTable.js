import React from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

export default class ProductTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var products = this.formatProducts();
        return (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                </tr>
                </thead>
                <tbody>
                {products}
                </tbody>
            </table>
        );
    }

    //根据数据获得需要render的rows
    formatProducts() {
        var result = [];
        var category = "";
        this.props.products.forEach((product)=> {
            if (product.name.toLowerCase().indexOf(this.props.filterName) === -1 || (this.props.onlyStock && !product.stocked)) {
                return false;
            }
            if (category !== product.category) {
                result.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            }
            result.push(<ProductRow product={product} key={product.name}/>);
            category = product.category;
        });
        return result;
    }

}