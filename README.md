# EPIC-MAIL

[![Build Status](https://travis-ci.org/NonsoAmadi10/EPIC-MAIL.svg?branch=develop)](https://travis-ci.org/NonsoAmadi10/EPIC-MAIL)
[![Coverage Status](https://coveralls.io/repos/github/NonsoAmadi10/EPIC-MAIL/badge.svg?branch=develop)](https://coveralls.io/github/NonsoAmadi10/EPIC-MAIL?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/820933e5bb3b7d6edf26/maintainability)](https://codeclimate.com/github/NonsoAmadi10/EPIC-MAIL/maintainability)

---
A web application that allows Users  exchange of information over the Internet
Project Overview
The internet is increasingly becoming an integral part of lives. Ever since the invention of
electronic mail by Ray Tomlinson, emails have grown to become the primary medium of
exchanging information over the internet between two or more people, until the advent of Instant
Messaging (IM) Apps.
As EPIC Andelans who work towards advancing human potential and giving back to the society,
we wish to empower others by building a web app that helps people exchange
messages/information over the internet.

###### Required Features
1. Users can sign up.
2. Users can login.
3. Users can create groups.
4. Users can send a message to individuals.
5. Users can view their inbox and read messages.
6. Users can retract sent messages.
7. Users can save an email as draft and send it later or delete it.

---

``` Entity Specification
User
{
“id” : Integer,
“email” : String,
“firstName” : String,
“lastName” : String,
“password” : String,
...
}
Contacts
{
“id” : Integer,
“email” : String,
“firstName” : String,
“lastName” : String,
...
}
Messages
{
“id” : Integer,
“createdOn” : DateTime,
“subject” : String,
“message” : String,
”parentMessageId” : Integer,
“status” : String, // draft, sent, or read
...
}
Sent
{
“senderId” : Integer,
“messageId” : String,
“createdOn” : DateTime,
...
}
Inbox
{
“receiverId” : Integer,
“messageId” : String,
“createdOn” : DateTime,
}

Group
{
“id” : Integer,
“name” : String,
...
}
Group Members
{
“groupId” : Integer,
“memberId” : Integer,
...
}

 ```

### API Endpoint Specification
#### Endpoint: POST /auth/signup
##### Create a user account.
- Response spec:
``` {
“status” : Integer,
“data” : [{
“token” : “45erkjherht45495783”,
}]

```
}

### Endpoint: POST /auth/login
### Login a user
- Response spec:
``` {
“status” : 200,
“data” : [{
“token” : “ahd64jfhHG7832KFM5”,
}] 
```

#### Endpoint: POST /messages
- Create or send an email.
- Response spec:
``` {
“status” : Integer,
“data” : [{
“id” : Integer, // message unique id
“createdOn” : DateTime,
“subject” : String,
“message” : String,
”parentMessageId” : Integer,
“status” : String,
}]
```
} 
### Endpoint: GET /messages
- Fetch all received emails
- GET /messages/unread
- Fetch all unread received emails
- GET /messages/sent
- Fetch all sent emails

``` 
{
“status” : Integer,
“data” : [
{
“id” : Integer,
“createdOn” : DateTime,
“subject” : String,
“message” : String,
“senderId” : Integer,
“receiverId” : Integer,
”parentMessageId” : Integer,
“status” : String,
}, {
“id” : Integer,
“createdOn” : DateTime,
“subject” : String,
“message” : String,
“senderId” : Integer,
“receiverId” : Integer,
”parentMessageId” : Integer,
“status” : String,
}
] ```

### Endpoint: GET /messages/<message-id>
- Fetch a specific email record
- Response spec:
```
{
“status” : Integer,
“data” : [{
“id” : Integer,
“createdOn” : DateTime,
“subject” : String,
“message” : String,
“senderId” : Integer,
“receiverId” : Integer,
”parentMessageId” : Integer,
“status” : String,
}]
}
Endpoint: DELETE /messages/<message-id>
Delete a specific email record
Response spec:
{
“status” : Integer,
“data” : [{
“message” : String
}]
}
```