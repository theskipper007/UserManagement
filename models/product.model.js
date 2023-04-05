const { DataTypes } = require('sequelize');
const db = require('./index');
module.exports = (sequelize, DataTypes) => {

const Products = sequelize.define('Products',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    // user_id :{
    //     type : DataTypes.INTEGER,
    //     references: {
    //         model: 'Users',
    //         key: 'id'
    //     }
    // },
    product_name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique: {
            args: true,
            msg: 'Product name already in use!'
        }
    },
    // createdAt:true,
    // updatedAt: true,

}
)
// Products.associate = function(models) {
//     Products.belongsTo(models.Users, {as:'users',foreignKey:{ name:'user_id'}});
//   };

return Products;
}



