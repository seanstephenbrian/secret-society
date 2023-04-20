# [secret society](https://secret-society.up.railway.app/)

**secret society** is a members-only web bulletin built with express/node.js.

visitors to the site can sign up by providing an email address and password.
any registered user can make a post on the message board, but only members can
view the author and timestamp information for each message; to become a member,
you must provide a secret password. members can then become site administrators by
entering a second secret password; admins have the ability to edit and delete 
messages.

the web app uses middleware like passportjs and bcrypt to securely sign in users 
and hash their passwords before saving them to the database. other technologies
in use here include mongoose/mongodb and pug. 

if you wish to become a full member of the society, the secret password is:

```
supersecretpassword
```
