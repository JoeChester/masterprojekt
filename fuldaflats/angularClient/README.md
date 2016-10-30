#Install Packages
npm install -g rimraf
npm install

#Build Project
Output folder: dist
Development: npm run build:dev
Production: npm run build:prod

#Start local web server with dev build
Development: npm run server:dev
Production: npm run server:prod 

#Debugging typescript files
Install "Debugger for Chrome"
Configure launch.json in .vscode.
To generate launch.json use "F5" and choose "Chrome"

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Chrome against localhost, with sourcemaps",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:8080",
            "sourceMaps": true,
            "webRoot": "${workspaceRoot}"
        }
    ]
}
