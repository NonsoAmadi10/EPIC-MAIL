const createUsers = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (40) NOT NULL,
    lastname VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255)
);`;

const createMessages = `
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY NOT NULL,
    subject VARCHAR (125) NOT NULL,
    message TEXT  NOT NULL,
    parentMessageId  SERIAL REFERENCES messages(id),
    createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    draft BOOLEAN NOT NULL

);`;

const userMessages = `
CREATE TABLE IF NOT EXISTS usermessages (
    id SERIAL PRIMARY KEY NOT NULL,
    senderId INTEGER REFERENCES users(id),
    messageId INTEGER REFERENCES messages(id),
    read BOOLEAN NOT NULL
);`;

const group = `
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY ,
    name VARCHAR (125)
);`;

const userGroup = `
CREATE TABLE IF NOT EXISTS usergroup (
    id SERIAL PRIMARY KEY NOT NULL,
    groudId INTEGER REFERENCES groups(id),
    members INTEGER REFERENCES users(id),
    ADMIN BOOLEAN 
);
`;

const createdQuery = `${createUsers}${createMessages}${userMessages}${group}${userGroup}`;
export default createdQuery;