/**
 * Created by liuyc14 on 2016/9/28.
 */
const getCityByCode = (code) => {
    
};

export default function cityList(state, action){
    if(!state){state=[];}
    switch (action.type){
        case 'city_add':
            state.push(action.city);
            return state;
            break;        
        case 'city_getAll':
            return state;
            break;
        default:
            return state;
    }
}