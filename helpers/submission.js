// const client =  require('./index');
const { Client } = require('elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });


async function countChoices() {
    const response = await client.search({
      index: 'newsubmissions',
      body: {
        aggs: {
          choice_count: {
            terms: { 
              field: 'choice.keyword'
            }
          }
        }
      }
    });
  console.log('resonse',response);
    const choices = response.aggregations.choice_count.buckets;
  
    console.log(choices);
    client.close();
    return choices;
  }

  module.exports = {
    countChoices
  }