# betterproduct

How to start this repo. 

Note: This app was built on NODE 14.5.0 and PostgreSQL 13

- rename server/env.sample.sh to env.sh and replace the appopraiate details
- cd server (change directory to the server folder via terminal )
- run install (`npm install` or  `yarn` )
- run npm `migrate:up` to migrate and insert sample data to the db
- cd ../ (change directory to the parent folder )
- cd client (change directory into the client folder)
- yarn (use yarn to install dependencies of the client)
- if you would like to update the BACKEND_URL on the REACT app, please edit `client/src/congig.js`
- build the front end code. `npm run build`
- Once the build is completed, move back to the server folder and run `npm start`
- navigate to http://localhost:8000