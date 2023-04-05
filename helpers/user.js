const db = require('../models');
const UserModel = db.Users;
const UserProductModel = db.UserProducts;
const Op = require('sequelize').Op


class UserHelper{
    constructor(){
    }

 validatorFunc = async (val) => {
    let found = await UserModel.findOne({where : { [Op.or] : { email:val.email, username:val.username} }})
    if(found) return false;
    return true;
}
 findAllValues = async (whereObj,includeArr = [],options ={}) => {
    try{
    let found = await UserModel.findAll({ 
        where :{...whereObj},
        include:[...includeArr],
        ...options
    })
    return found;
}
catch(err){
    console.log('Error while finding value',err);
    return('Error thrown while finding value')
}
}
 createValue = async(payload,options = {}) => {
    try{
    let createdData = await UserModel.create(payload);    
    return(`User with id ${createdData.id}  created successfully !` )
    }
    catch(err){
        console.log('Creation error',err);
        return('Error while creating new user');
    }
}
 updateValue = async (id,payload, whereObj, options = {}) => {
    try{
    await UserModel.update({...payload},{where : {...whereObj }},options);
    return (`User with id ${id} updated successfuly`);
    }catch(err){
        console.log('error',err)
    }
    return ('Error while updating user')
}

 deleteValue = async(id,whereObj,options = {}) => {
    try{
        await UserModel.destroy({where : {...whereObj}},options);
        return (`User with id ${id} deleted successfuly`);
    }
    catch(err){
    console.log('err',err)
    return ('Error while deleting user')
    }
}
}
module.exports = UserHelper;
