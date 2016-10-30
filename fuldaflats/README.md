#Install Packages
npm install -g rimraf
npm install
npm run install:client
npm run install:server

#Build Server and client
Output folder: dist
Development: npm run build:dev
Production: npm run build:prod

#Run expess server local
Install Packages
Build Server and client
npm start

#Deploy to server
Install Packages
npm run build:prod
Copy dist folder to server
Run "node static.js" in dist folder
