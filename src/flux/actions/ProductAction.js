/**
 * Created by liuyc14 on 2016/9/27.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProductConstant from '../constants/ProductConstant';

var ProductAction = {
    create: function(product){
        AppDispatcher.dispatch({
            actionType: ProductConstant.PRODUCT_CREATE,
            data: {product: product}
        });
    },
    toggleOnlyStock: function(){
        AppDispatcher.dispatch({
            actionType: ProductConstant.PRODUCT_SET_ONLYSTOCK
        });
    },
    setFilterName: function(filterName){
        AppDispatcher.dispatch({
            actionType: ProductConstant.PRODUCT_SET_FILTERNAME,
            data: {filterName: filterName}
        });
    }
};

export default ProductAction;