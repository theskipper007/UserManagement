const db = require('../models');
const UserModel = db.Users;
const UserHelper = require('../helpers/user')

const userHelper = new UserHelper();



const showAllUsers = async (request, reply) => {
    let users =  await userHelper.findAllValues({});
    reply(users);
}
const createUser = async (request, reply) => {
    let isValid = await userHelper.validatorFunc(request.payload);
    if(isValid) {
        let response = await userHelper.createValue(request.payload);
        reply(response);    
    }
    else reply('User already exists'); 
}
const showUser = async (request,reply) => {
    let whereCondition =  { 
        id : parseInt(request.params.id) 
    };
    // let includesArray = [
    //     {
    //         model: UserModel,
    //         as:"users",
    //         where: {}
    //     }
    // ]
    let userData = await userHelper.findAllValues(whereCondition,includesArray);
    console.log('userdata',userData.length,userData);
    reply(userData.length > 0 ? userData: 'No User found' ); 
    
}
const updateUser = async (request, reply) => {
    let whereCondition =  { 
            id : parseInt(request.params.id) 
        };
   
    let valueToUpdate = await userHelper.findAllValues(whereCondition); 
    console.log('valuetoupdate',valueToUpdate);
    if (valueToUpdate.length > 0) {
        let condition = {id : request.params.id};
        let response  = await userHelper.updateValue(request.params.id, request.payload,condition)
        reply(response);
    }
    else reply('User does not exist');
}
const deleteUser = async (request, reply) => {
    let whereCondition =  { 
        id : parseInt(request.params.id) 
    };
    let valueToDelete = await userHelper.findAllValues(whereCondition); 
    if (valueToDelete.length>0) {
        let condition =  {id:request.params.id};
        let response = await userHelper.deleteValue(request.params.id, condition)
        reply(response);
    }
    else reply('User not found');
}

module.exports = {
    createUser,
    showUser,
    showAllUsers,
    updateUser,
    deleteUser,
}