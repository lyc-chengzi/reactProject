/**
 * Created by liuyc14 on 2016/9/27.
 */

class ResultModel{
    constructor(status, message, data){
        this.status = status || 200;
        this.message = message || "";
        this.data = data || null;
    }
}

module.exports = ResultModel;