/**
 * Created by liuyc14 on 2016/9/28.
 */
function counter(state = 0, action){
    switch (action.type){
        case 'counter_add':
            return ++state;
            break;
        case 'counter_reduce':
            if(state){
                return --state;
            }else{
                return state;
            }
            break;
        default:
            return state;
    }
}

export default counter;
