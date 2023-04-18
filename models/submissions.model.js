const {DataTypes} = require('sequelize');
const db = require('./index');
const connectionHelper = require('../connection');

module.exports = (sequelize, DataTypes) => {
    const Submissions = sequelize.define('Submissions',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
        },
        choice :{
            type : DataTypes.STRING,
            allowNull : false,
        },
        user_id : {
            type : DataTypes.INTEGER,
            references : {
                model : 'Users',
                key : 'id'
            }
        }
    })


Submissions.associate = function(models) {
    Submissions.hasMany(models.Users, {as:'users',foreignKey:{ name:'id'},constraints : false})
};
Submissions.afterCreate(async function(){
    console.log('in');
    await connectionHelper.syncData();
})
return Submissions;

}