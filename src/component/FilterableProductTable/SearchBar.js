import React from 'react';
import action from '../../flux/actions/ProductAction';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.filterNameChangeHandler = this.filterNameChangeHandler.bind(this);
        this.onlyStockChangeHandler = this.onlyStockChangeHandler.bind(this);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="input product name"
                       ref="filterTextInput"
                       value={this.props.filterName}
                       onChange={this.filterNameChangeHandler}/><br/>
                <input id="FPT_SearchBar_in_stock" type="checkbox"
                       ref="inputOnlyStock"
                       checked={this.props.onlyStock}
                       onChange={this.onlyStockChangeHandler}/>
                <label htmlFor="FPT_SearchBar_in_stock">only show product in stock</label>
            </form>
        );
    }

    filterNameChangeHandler(){
        action.setFilterName(this.refs.filterTextInput.value);
    }

    onlyStockChangeHandler(){
        action.toggleOnlyStock();
    }
}