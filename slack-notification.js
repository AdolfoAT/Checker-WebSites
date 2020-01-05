'use strict'
const errorSend = require('./mail')

const { IncomingWebhook } = require('@slack/client');
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook('https://hooks.slack.com/services/XXXXX'); // URL SLACK WEBHOOK

function notificar_slack(text){
  var texto = JSON.stringify(text, null, 2)
  var notification_slack={
              attachments:
              [
                  {
                        "fallback" : "¡Alert! Fallo de Sitios Web" ,
                        "color": "#FF0000",
                        "author_name": "Checker-WebSites" ,
                        "title": "Fallo de Sitios Web en DS",
                        "text": "```"+texto+"```",
                        "footer": "Checker-Notifications",
                        "ts": parseInt(Date.now()/1000),
                        "mrkdwn_in": ["text"]
                  }
                ]
              };
      webhook.send(notification_slack, function(err, res) {
          if (err) {
              console.log('Error:', err);
              errorSend(text)
              // message(err);
          } else {
              console.log('Mensaje Enviado! ', res);
              process.exit(0)
          }
      });
}
module.exports = notificar_slack
