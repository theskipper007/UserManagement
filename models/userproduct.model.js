const { DataTypes } = require('sequelize');
const db = require('./index');

module.exports = (sequelize, DataTypes) => {

const UserProducts = sequelize.define('UserProducts',{
      id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    user_id : {
        type : DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    product_id : {
        type : DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    // createdAt:true,
    // updatedAt: true,

},{
    indexes : [{
        name: 'unique_index_product_user',
        unique: true,
        fields: ['user_id', 'product_id'],
        // where: {
        //   deleted_at: null
        // }
}]
}
)
UserProducts.associate = function(models) {
    UserProducts.hasMany(models.Products,{as:'products',foreignKey:{ name:'id'},constraints: false});
    UserProducts.hasMany(models.Users,{as:'users',foreignKey:{ name:'id'},constraints: false});

  };

return UserProducts;
}

