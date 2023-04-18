const db = require('../models');
const SubmissionModel = db.Submissions;


const submitResponse = async (request,reply) => {
    try{
        let submittedResponse;
        await SubmissionModel.findOne({where:{user_id: request.params.userId}}).then(async function(obj){
            if(obj){
                submittedResponse = await SubmissionModel.update({choice:request.payload.choice}, {where : {user_id : request.params.userId}});
            }
            submittedResponse = await SubmissionModel.create({user_id : request.params.userId,choice:request.payload.choice});

        })
       console.log('res',submittedResponse);
       reply(submittedResponse ? 'Response submitted' : 'Response exists')
    }
    catch(err){
        reply('Submission error').code(403);

    }
}
module.exports = {
    submitResponse
}