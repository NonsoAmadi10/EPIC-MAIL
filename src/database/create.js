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
export default createdQuery;