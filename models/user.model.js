const { DataTypes } = require('sequelize');
const db = require('./index');

module.exports = (sequelize, DataTypes) => {

const Users = sequelize.define('Users',{
      id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: {
            args: true,
            msg: 'Username already in use!'
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
      },
    // createdAt:true,
    // updatedAt: true,

})
// Users.associate = function(models) {
//     Users.hasOne(models.Products,{as:'products',foreignKey:{ name:'user_id'}});
//   };

return Users;
}

