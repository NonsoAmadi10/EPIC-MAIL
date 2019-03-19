const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const messagesDestroy = 'DROP TABLE IF EXISTS messages CASCADE; ';
const userMessagesDestroy = 'DROP TABLE IF EXISTS usermessages CASCADE; ';
const groupDestroy = 'DROP TABLE IF EXISTS groups CASCADE; ';
const groupName = 'DROP TABLE IF EXISTS usergroup CASCADE;';

const dropQuery = `${usersDestroy}${messagesDestroy}${userMessagesDestroy}${groupDestroy}${groupName}`;

export default dropQuery;
