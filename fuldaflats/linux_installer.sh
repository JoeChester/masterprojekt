sudo git pull
bower -v foo >/dev/null 2>&1 || { npm install bower -g }
sudo npm install
cd client
sudo bower install --allow-root
cd ..
NODE_ENV=development node migrate.js