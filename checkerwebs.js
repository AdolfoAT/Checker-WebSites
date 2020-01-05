/*
* Script verificador sitios web
* Verifica el tiempo de Respuesta del sitio Web
* Verifica el Status Code del sitio web
* Certificados SSL (los que tengan)
* @autor Adolfo Ascencio Trejo email: adolfo.as.tr.94@gmail.com pachuca202@gmail.com pachux202@live.com.mx
* Tel: 7717468962
* @version 1.0.0 [2 Enero 2020]
*/
var request = require('request');
var  notificar_slack= require('./slack-notification');
const expect = require('chai').expect

var URLs = {   // URL              : Status Code  200 correct
               'https://google.mx/':200,
               'https://youtube.com/':200,
               'https://facebook.com/':200,
               'http://github.mx/':200,
               'https://stackoverflow.com/':200
               // URL .....
              };

describe('Successful Response of web sites',  () => {
  describe("Request to Web Site", () => {
      for(var url in URLs)
      {
        it(url+ ' Sould return Status Code: ' + URLs[url], (done) => {
          request(url, function (error, response, body) {
            expect(error).to.be.a('null');
            expect(response.statusCode).to.equal(URLs[url]);
            done()
          });
        })
      }
    })
  })
