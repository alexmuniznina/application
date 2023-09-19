async function connect() {
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://user:password@localhost:3306/my_database");
    global.connection = connection;
    return connection;
}

async function rootConnection() {
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/my_database");
    global.connection = connection;
    return connection;
}

module.exports = {connect, rootConnection}