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
    senderEmail VARCHAR(125),
    createdon DATE,
    updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    draft BOOLEAN 

);`;

const userMessages = `
CREATE TABLE IF NOT EXISTS recipients (
    receiver VARCHAR REFERENCES users(email),
    messageId INTEGER REFERENCES messages(id),
    read BOOLEAN NOT NULL
);`;

const group = `
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY ,
    name VARCHAR (125),
    ownerId INTEGER REFERENCES users(id),
    createdon DATE 
);`;

const userGroup = `
CREATE TABLE IF NOT EXISTS usergroup (
    groupId INTEGER REFERENCES groups(id),
    members VARCHAR REFERENCES users(email),
    messageId INTEGER REFERENCES messages(id)
);
`;

const createdQuery = `${createUsers}${createMessages}${userMessages}${group}${userGroup}`;
export default createdQuery;