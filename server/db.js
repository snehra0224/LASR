const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.user_scores = require('./models/user_scores')(sequelize);
    db.user_system_engagement = require('./models/user_system_engagement')(sequelize);
    db.user_behaviors = require('./models/user_behaviors')(sequelize);
    db.user_psych = require('./models/user_psych')(sequelize);
    db.user_phys = require('./models/user_phys')(sequelize);

    // sync all models with database
    await sequelize.sync();
}