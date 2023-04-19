const {DataTypes} = require('sequelize');
const connectionHelper = require('../helpers/elastic-search');



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
Submissions.afterCreate((submission) => connectionHelper.updateElasticSearch(submission, sequelize))
  
  Submissions.afterUpdate((submission) => connectionHelper.updateElasticSearch(submission, sequelize))
  
//   Submissions.afterDestroy(async (user) => {
//     await client.delete({
//       index: 'newsubmissions',
//       id: user.id
//     });
//   });

return Submissions;

}

