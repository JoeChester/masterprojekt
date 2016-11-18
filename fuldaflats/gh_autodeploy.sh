#############################################################
# File:            gh_autodeploy.sh
# Author:          Jonas Kleinkauf
# LastMod:         17.11.2016
# Description:     Shellscript run by gh_autodeploy.js to
#                  pull current GitHub state, 
#                  migrate the database and restart the server
#############################################################
sudo git pull
sudo npm install
cd client
sudo bower install --allow-root
cd ..
NODE_ENV=production node migrate.js
sudo pm2 reload test_website
sudo pm2 reload fuldaflats