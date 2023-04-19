const db = require('../models');
const SubmissionModel = db.Submissions;
const SubmissionHelper = require('../helpers/submission')
const { Client } = require('elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });


const submitResponse = async (request,reply) => {
    try{
        let submission = await SubmissionModel.findOne({where:{user_id: request.params.userId}})
        if(submission){
            submission.choice = request.payload.choice;
            await submission.save();

        } else {
            submission = await SubmissionModel.create({user_id : request.params.userId,choice:request.payload.choice});
        }
       client.close()
       reply('Response recorded')
    }
    catch(err){
        console.log('err',err);
        reply('Submission error').code(403);

    }
}
const getResult = async(request,reply) => {
    try{
        let resultData =  await SubmissionHelper.countChoices();
        if(resultData) {
            console.log('Result',resultData);
            client.close();
            reply('Result fetched');
        }
        else{
            client.close();
            reply('Empty')
        }
    }
    catch(err){
        console.log('err',err);
        client.close();
        reply(' Result cant be shown').code(403);

    }
}
const getResponseBasedOnId = async(request,reply) => {
    try{
        let index = 'newsubmissions';
        let id = request.params.userId;
            const result = await client.get({
              index,
              id,
            });
          console.log('result',result);
          client.close();
            reply( result.found ? result._source: 'Response not found');
          
    }
    catch(err){
        console.log('err',err);
        client.close();
        reply('Response not found').code(403);

    }
}
module.exports = {
    submitResponse,
    getResult,
    getResponseBasedOnId
}