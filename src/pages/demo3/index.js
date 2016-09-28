/**
 * Created by liuyc14 on 2016/9/28.
 */
import * as redux from 'redux';
import city from '../../redux/CityReducer';
import counter from '../../redux/CounterReducer';

let app = redux.combineReducers({city, counter});
console.log('------------log Object:app------------');
console.log(app);

let store = redux.createStore(app);
console.log('------------log Object:store------------');
console.log(store.getState());

let unSubscribe = store.subscribe(()=>console.log(store.getState()));

store.dispatch({type:'counter_reduce'});
store.dispatch({type:'counter_add'});
store.dispatch({type:'counter_add'});
store.dispatch({type:'counter_add'});
store.dispatch({type:'counter_reduce'});
store.dispatch({type:'city_add', city:{code:'010', name:'北京'}});
store.dispatch({type:'city_add', city:{code:'020', name:'上海'}});

unSubscribe();