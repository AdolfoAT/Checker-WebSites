# checker-webs

Test all web sites.

This project was bootstrapped with [Node.js](https://nodejs.org/es/).

## Available Scripts

Use

### `npm i`

Install all Script dependences

In the project directory, you can run:

### `mocha  ~/checker-webs/checkerwebs.js`

Check the conectify of the ShoreTel Server with a Ping command on Terminal, if have packages lost maybe had some problems on connectify.

How it can use in crontab

execute contrab -e and  add this code in the file and save, you can check if the contrab run only check the file checker.log

Check node and mocha directory and version

### `*/30 7-22 * * * /home/pi/.nvm/versions/node/v10.16.1/bin/node /home/pi/.nvm/versions/node/v10.16.1/bin/mocha  ~/Checker-WebSites/checkerwebs.js --reporter ~/Checker-WebSites/reporter.js >> ~/Checker-WebSites/checker.log`
