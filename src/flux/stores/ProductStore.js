/**
 * Created by liuyc14 on 2016/9/27.
 */
var EventEmitter = require('events').EventEmitter;
var  _ = require('lodash');
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProductConstant from '../constants/ProductConstant';

const CHANGE_EVENT = 'change';
let _productData = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

let _onlyStock = false;
let _filterName = "";

const createProduct = (product)=>{
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    product.id = id;
    _productData.push(product);
};

const toggleOnlyStock = ()=>{
    _onlyStock = !_onlyStock;
};

const setFilterName = (filterName)=>{
    _filterName = filterName;
};

var ProductStore = _.assign({}, EventEmitter.prototype, {
    getAllProducts(){
        return _productData;
    },
    getStore(){
          return {
              onlyStock: _onlyStock,
              filterName: _filterName,
              products: _productData
          };
    },
    emitChange(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }
});

/**
 * action为ProductAction传入的参数，必须包含action.actionType字段, action.data字段不是必须的
 */
AppDispatcher.register(function (action) {
    switch (action.actionType) {
        //创建一个新产品
        case ProductConstant.PRODUCT_CREATE:
            createProduct(action.data.product);
            ProductStore.emitChange();
            break;
        //设置只显示有库存数据
        case ProductConstant.PRODUCT_SET_ONLYSTOCK:
            toggleOnlyStock();
            ProductStore.emitChange();
            break;
        //过滤产品名称
        case ProductConstant.PRODUCT_SET_FILTERNAME:
            setFilterName(action.data.filterName);
            ProductStore.emitChange();
            break;
        default:
    }
});

export default ProductStore;

