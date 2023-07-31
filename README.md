# EA TODO App

## Some explanations

I haven't written tests for BE and FE because lack of time (I've had only 48 hrs from noon Friday) and very upset accident.
Yesterday (Jule 29th), at 6pm I almost finished it, and decied to deploy it to vercel. after few attemps and getting error that frontend/package.json cannot be found I decided to have a walk.
Then I came back and got an idea that it would be greate to move everything into single folder. After done so I commited changes aaand... findout that there is no FE files at all. I thought, ok, lets get back in history with help of git... But for some reason git haven't looked at my FE folder. Good moment that I understood why vercel have that error and I made few code optimisations. Bad that I lost all my progress...
So I started all over again.

I wanted to make it responsive to changes on backend.
It can be easily done with help of websocket and prisma middleware/query extension for example.
As I can see it and the easiest way.
When user starts the session we open WebSocket and server sends key for us. We store given keys somewhere on server (redis or DB).
On each DB update(for example move item into DONE) user sends key that he received. And backend sends message to every existing key that was given and active (basically to each websocket connection) except that sent that request that server is processing.

OR

[Trigger](https://edernegrete.medium.com/psql-event-triggers-in-node-js-ec27a0ba9baa) approach form Postgres can be used

OR

MongoDB has something similar to triggers.

OR 

GraphQL subscriptions

So there are some options on how to do it.

As for new features: I added only insert new todo by hitting enter. As for me this app is complete on new features (for current architecture). From possible things that can be added 2nd level tasks and user related tasks.

P.S. My guess that git haven't looked at FE folder because I created CRA and then moved it around, that possible can broke something.

## How To:

to install run npm run install from `root`, `frontend` and `backend` folders

to run app: `npm run start` from root folder
to run some tests `npm test` from frontend folder
