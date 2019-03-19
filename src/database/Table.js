import { Pool } from 'pg';
import dotenv from 'dotenv';
import dropQuery from './drop';
import createQuery from './create';
import config from './config/db';

dotenv.config();

const { connection_uri } = config.development;

const dbQuery = `${dropQuery}${createQuery}`;
const pool = new Pool({ connectionString: connection_uri });

pool.connect().then((client) => {
  client
    .query(dbQuery)
    .then(() => {
      client.release();
    }).catch((err) => {
      console.log(err);
    });
})
  .catch((error) => {
    /* eslint-disable no-console */
    console.log(error);
  });

export default pool;
