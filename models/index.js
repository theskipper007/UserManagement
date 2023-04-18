const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('arunmv','arunmv','',{
    host : 'localhost',
    port : 5432,
    dialect : 'postgres',
    operatorsAliases : false,
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./user.model') (sequelize, DataTypes)
db.Products =  require('./product.model') (sequelize, DataTypes)
db.UserProducts = require('./userproduct.model') (sequelize,DataTypes)
db.Submissions = require('./submissions.model')(sequelize, DataTypes)
// console.log('db',db.products);

Object.keys(db).forEach((key) => {
    if('associate' in db[key]){
        db[key].associate(db);
    }
})
// db.products.associate(db)
// db.users.associate(db)


module.exports = db;