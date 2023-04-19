const UserHelper = require('../helpers/user')
const Redis = require('ioredis');
const redisClient = new Redis();
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


const getDataFromRedis = async (cacheKey,payload) => {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log('cacheddata',cachedData);
      return JSON.parse(cachedData);
    }
   
    const sourceData = await userHelper.findAllValues(whereCondition);
  
    await redis.set(cacheKey, JSON.stringify(sourceData));
  
    return sourceData;
  };
  
  
  const showUser = async (request,reply) => {
        let userData;
        const cachedData = await redisClient.get('cacheKey');
        if (cachedData) {
            userData = JSON.parse(cachedData);
            console.log('cacheddaa,',userData);
            reply(userData.length > 0 ? userData: 'No User found' ); 

        } else {
            let whereCondition =  { 
                id : parseInt(request.params.id) 
            };
            console.log('before 3');
            setTimeout(async function(){
            console.log('after 3');
            userData = await userHelper.findAllValues(whereCondition);
            await redisClient.set('cacheKey', JSON.stringify(userData));
            await redisClient.expire('cacheKey', 60); 
            reply(userData.length > 0 ? userData: 'No User found' ); 
            // Cache will expire in 60 seconds
        },3000);
    }

    
    //   console.log('userdata',userData.length,userData);
      
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