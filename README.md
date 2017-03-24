Fuldaflats.de
=============
Masterproject HS Fulda Fall2016 Team 1

**Application to be developed:** Online apartment rental site tailored to Fulda Students

## Leaders:
**Project leader:** Michelle Rothenbücher  
**Technic leader:** Jonas Kleinkauf  

## Appointments:
**Team meeting:** Thursdays after presentation.  
**Presentation preparation:** Thursdays 8:00 - 9:30 or after lunch

## Branches:  
**master**: stable version  
**dev**: latest current development state

## Weekly documentation:  
[TaskSchedule](https://www.dropbox.com/s/ckslouywg9wwy7h/Task%20Shedule.docx?dl=0)

## Milestone documents
### Milestone 1
- [FuldaFall 2016 Milestone 1 Team 1](https://github.com/JoeChester/masterprojekt/blob/dev/documentation/milestone1/FuldaFall%202016%20Milestone1%20Team1.pdf)
- [FuldaFall 2016 Milestone 1 Team 1 Submission Version 2](https://github.com/JoeChester/masterprojekt/blob/dev/documentation/milestone1/FuldaFall%202016%20Milestone1%20Team1.pdf)

### Milestone 2
- [FuldaFall 2016 Milestone 2 Team 1 Submission Version 1](https://github.com/JoeChester/masterprojekt/blob/dev/documentation/milestone2/FuldaFall%202016%20Milestone2%20Team1%20Submission%20Version%201.pdf)

### Milestone 3
- [FuldaFall 2016 Milestone 3 Team 1 Submission Version 1.pdf](https://github.com/JoeChester/masterprojekt/blob/dev/documentation/milestone3/FuldaFall%202016%20Milestone%203%20Team1%20Submission%20Version%201.pdf)

## Installation
1. Install bower package with node package manager (npm)
    1. Execute `npm install -g bower`    
2. Install front-end client dependent packages
    1. Go into folder `fuldaflats/client`
    2. `bower install`
3. Install back-end server dependent packages
    1. Go into folder `fuldaflats`
    2. Execute `npm install`
4. Install mysql server
5. Configure back-end server
   1. Go into folder `fuldaflats`
   2. Update `config.json` with your mysql connection informations.
      1. Optional you can change the http server port and the upload folder
4. Initialize mysql database
    1. Go into folder `fuldaflats`
    2. Execute `node migrate.js`
    
## Server execution
1. Go into folder `fuldaflats`
2. Execute `node index.js`

## Execute server as a background service
You can use the node package [pm2](https://github.com/Unitech/pm2) to execute the fuldaflats server as a background service.

## Presentation server commands
#### Start static website
sudo pm2 start test_website.js --name="test_website"

#### Start github auto deployer
sudo pm2 start gh_autodeploy.js --name="gh_autodeploy"

#### Restart a specific / all services
sudo pm2 reload <service name>
sudo pm2 reload all
