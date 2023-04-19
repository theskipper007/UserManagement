const Op = require('sequelize').Op
const db = require('../models');
const UserProductModel = db.UserProducts;


const subscribeProduct = async (request, reply) => {
    try{
    let createdData = await UserProductModel.create({user_id:request.params.userId,product_id:request.payload.productId});
    reply(createdData ? 'Subscribed sucessfuly' : 'Subscription exists')
    }
    catch(err){
        reply('Subscription Error : ').code(403)

    }

}
module.exports = {
    subscribeProduct
}

