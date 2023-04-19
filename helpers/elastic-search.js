
const { sequelize } = require('../models');
const { Client } = require('elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });
// const client =  require('./index')
const db = require('../models/index');
const Submissions = db.Submissions;


const updateElasticSearch = async (submission, abc) => {
    console.log('dbdata',abc);
    console.log('submission', submission);
    const a = await abc.models.Submissions.findOne({
        where: {
            id: submission.id
        },
        include : [{
            model : abc.models.Users,
            as : "users",
        }]
    })
    // const users = await a.getUsers();
    console.log('users',a);
    const username = a.users ? a.users.user_name : null;
    const email = a.users ? a.users.user : null;
  
    const body = {
      id: a.id,
      choice: a.choice,
      username: username,
      email: email,
    };
  
    const params = {
      index: 'newsubmissions',
      id: a.id,
      body,
    };
  
    await client.index(params);
  };

  module.exports = {
    updateElasticSearch
  }