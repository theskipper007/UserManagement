const { Client } = require('elasticsearch');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'arunmv',
  host: 'localhost',
  database: 'arunmv',
  password: '',
  port: 5432, 
});

const esClient = new Client({ 
  host: 'localhost:9200', 
  log: 'trace' 
});

const pgTable = 'Submissions';
const esIndex = 'submissionssearch';

const pgToEsMapping = {
  id: 'id',
  user_id: 'user_id',
  choice: 'choice',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

async function syncData() {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM "${pgTable}"`);
    const { rows } = result;

    const bulkBody = [];
    rows.forEach((row) => {
      const doc = {};
      for (const [pgColumn, esField] of Object.entries(pgToEsMapping)) {
        doc[esField] = row[pgColumn];
      }
      bulkBody.push({ index: { _index: esIndex, _type: '_doc', _id: row.id } });
      bulkBody.push(doc);
    });

    const { body: bulkResponse } = await esClient.bulk({ refresh: true, body: bulkBody });
    if (bulkResponse && bulkResponse.errors) {
      console.log('Error syncing data:', bulkResponse.errors);
    } else {
      console.log('Data synced successfully');
    }
  } catch (error) {
    console.error('Error syncing data:', error);
  }
}
module.exports = {
syncData
};
