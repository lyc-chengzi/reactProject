var routes_index = require('./index');
var routes_users = require('./users');
var routes_react = require('./reactAPI');

var routesConfig = {
    routeList:[
        {url: '/', routeRule: routes_index},
        {url: '/users', routeRule: routes_users},
        {url: '/reactapi', routeRule: routes_react}
    ],
    initRoutes: function(app){
        for(var i = 0; i < this.routeList.length; i++){
            app.use(this.routeList[i].url, this.routeList[i].routeRule);
        }
    }
};


module.exports = routesConfig;