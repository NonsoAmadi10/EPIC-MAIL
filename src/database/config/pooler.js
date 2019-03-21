import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from './db';

dotenv.config();
const env = process.env.NODE_ENV || 'development';

const { connection_uri } = config.development;
const pool = env === 'test' ? new Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new Pool({ connectionString: connection_uri });

export default pool;

