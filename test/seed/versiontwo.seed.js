/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import pool from '../../src/database/config/pooler';

const user = {
  validUser: {
    id: 1,
    firstName: 'amadi',
    lastName: 'nonso',
    email: 'nonsoamadi@epic.com',
    password: '123456',
  },

  validUserTwo: {
    id: 2,
    firstName: 'Phillip',
    lastName: 'Newman',
    email: 'phillipnewman@aol.com',
    password: '1456789',
  },

  inValidUserEmptyfirstName: {
    firstName: '',
    lastName: 'Lasisi',
    password: '1234567',
    email: 'lasisielenu@gmail.com',
  },

  invalidUserEmptyLastName: {
    firstName: 'elenu',
    lastName: '',
    password: '123456789',
    email: 'lasisielenu@gmail.com',

  },

  invalidUserEmptyPass: {
    firstName: 'elenu',
    lastName: 'lasisi',
    password: '',
    email: 'lasisielenu@gmail.com',
  },

  invalidUserfirstNameNum: {
    firstName: 123445,
    lastName: 'lasisi',
    email: 'lasisielenu@gmail.com',
    password: '1234567',
  },
};

/**
 * @function generateToken  that generates a valid generateToken
 * @result  valid web token
 */

// eslint-disable-next-line no-unused-vars
const generateTokens = userDetails => jwt.sign({ userDetails }, process.env.JWT_SECRET_KEY).toString();

/**
 * @function dropandcreateTables  that drops ande creates database tables

 */

const createTables = async () => {
  const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
  const messagesDestroy = 'DROP TABLE IF EXISTS messages CASCADE; ';
  const userMessagesDestroy = 'DROP TABLE IF EXISTS usermessages CASCADE; ';
  const groupDestroy = 'DROP TABLE IF EXISTS groups CASCADE; ';
  const groupName = 'DROP TABLE IF EXISTS usergroup CASCADE;';


  const dropQuery = `${usersDestroy}${messagesDestroy}${userMessagesDestroy}${groupDestroy}${groupName}`;

  const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (40) NOT NULL,
    lastname VARCHAR (40) NOT NULL,
    email  VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(255)
);`;

  const createMessages = `
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY NOT NULL,
    subject VARCHAR (125) NOT NULL,
    message TEXT  NOT NULL,
    parentMessageId  SERIAL REFERENCES messages(id),
    senderId INTEGER,
    createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    draft BOOLEAN 

);`;

  const userMessages = `
CREATE TABLE IF NOT EXISTS usermessages (
    receiverId INTEGER REFERENCES users(id),
    messageId INTEGER REFERENCES messages(id),
    read BOOLEAN NOT NULL
);`;

  const group = `
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY ,
    name VARCHAR (125),
    ownerId INTEGER REFERENCES users(id),
    createdon TEXT NOT NULL
);`;

  const userGroup = `
CREATE TABLE IF NOT EXISTS usergroup (
    id SERIAL PRIMARY KEY NOT NULL,
    groudId INTEGER REFERENCES groups(id),
    members INTEGER REFERENCES users(id),
    email VARCHAR (255),
    messageId INTEGER REFERENCES messages(id)
);
`;

  const createdQuery = `${createUsers}${createMessages}${userMessages}${group}${userGroup}`;
  await pool.query(`${dropQuery}; ${createdQuery};`);
};

export {
  user,
  createTables,
  generateTokens,

};
