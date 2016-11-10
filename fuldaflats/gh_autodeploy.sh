sudo git pull
sudo npm install
cd client
sudo bower install --allow-root
cd ..
sudo pm2 reload test_website
sudo pm2 reload fuldaflats