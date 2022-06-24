const MongoClient = require("mongodb").MongoClient;

let _connection = null;
const open = function(){
    if(get()==null){
        MongoClient.connect(process.env.DB_URL, function(err, client){
            if(err){
                console.log("DB Connection failed");
                return;
            }
            _connection = client.db(process.env.DB_NAME);
            console.log("DB connection open", _connection);
        });
    }
};
const get = function(){
    return _connection;
}
module.exports = {
    open:open,
    get:get
};