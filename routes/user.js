const Joi = require('joi');
const UserController =  require('../controllers/user');
const ProductController = require('../controllers/product');
const SubmissionControlller = require('../controllers/submission')


module.exports = [{
    method: 'GET',
    path: '/show-all',
    config : { auth: 'simple'},
    handler: UserController.showAllUsers
},
{
    method: 'GET',
    path: '/showUser/{id}',
    handler: UserController.showUser,
    config: {
        validate: {
            params:{
                id: Joi.string(),
            },
        },
},
},
{
    method: 'POST',
    path: '/createUser',
    handler: UserController.createUser,
    config: {
        validate: {
            payload : Joi.object({
                username: Joi.string(),
                email: Joi.string().email()
            })
        },
},
},
{
    method: 'PATCH',
    path: '/updateUser/{id}',
    handler: UserController.updateUser,
    config: {
        validate: {
            params: Joi.object({
                id: Joi.string(),
            }),
            payload : Joi.object({
                name: Joi.string(),
                email: Joi.string().email()
            })
        },
},
},
{
    method: 'DELETE',
    path: '/deleteUser/{id}',
    handler: UserController.deleteUser,
    config: {
        validate: {
            query: Joi.object({
                id: Joi.string(),
            })
        }
    },
},
{
    method: 'POST',
    path: '/subscribe/{userId}',
    handler: ProductController.subscribeProduct,
    config: {
        validate: {
            payload : Joi.object({
                productId: Joi.number(),
            })
        },
},
},
{
    method: 'POST',
    path: '/submission/{userId}',
    handler: SubmissionControlller.submitResponse,
    config: {
        validate: {
            payload : Joi.object({
                choice: Joi.string(),
            })
        },
},
},
{
    method: 'GET',
    path: '/submission/{userId}',
    handler: SubmissionControlller.getResponseBasedOnId,
},
{
    method: 'GET',
    path: '/result',
    handler: SubmissionControlller.getResult,
},
]