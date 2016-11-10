WHERE bower
IF %ERRORLEVEL% NEQ 0 npm install bower -g
git pull
call npm install
cd client
call bower install
cd ..
call node migrate.js
set /p DUMMY=Installing and Database Migration done, use node index.js to run the server