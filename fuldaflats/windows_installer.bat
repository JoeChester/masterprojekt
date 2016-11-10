WHERE bower
IF %ERRORLEVEL% NEQ 0 npm install bower -g
git pull
ECHO Installing Node Depenencies..
call npm install
cd client
ECHO Installing Bower Depenencies..
call bower install
cd ..
call node migrate.js
set /p DUMMY=Installing and Database Migration done, use node index.js to run the server