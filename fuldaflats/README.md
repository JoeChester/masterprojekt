#Install Packages
npm install -g bower

bower is a html dependency manager, it will come in handy 
for the frontend-team later

npm install

#Start Static Website
sudo pm2 start test_website.js --name="test_website"

#Start GitHub AutoDeployer
sudo pm2 start gh_autodeploy.js --name="gh_autodeploy"
