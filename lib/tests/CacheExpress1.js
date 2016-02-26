/*

 ----------------------------------------------------------------------------
 | ewd-qoper8.js: Node.js Queue and Multi-process Manager                   |
 |                                                                          |
 | Copyright (c) 2016 M/Gateway Developments Ltd,                           |
 | Reigate, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

  25 January 2016

  Demonstrates use of CacheModule.js worker module which connects each
  worker process to the Cache database, intergrated with Express

    start using:

      node node_modules/ewd-globals/lib/tests/CacheExpress1

    You may need to run this as sudo due to Cache permissions

*/

var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var qx = require('ewd-qoper8-express');

var app = express();
app.use(bodyParser.json());

var q = new qoper8.masterProcess();
qx.init(q);

app.post('/qoper8', function (req, res) {
    qx.handleMessage(req.body, function(resultObj) {
      delete resultObj.finished;
      res.send(resultObj);
    });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

q.on('started', function() {

  // Worker processes will load the CacheModule1.js module:

  this.worker.module = 'ewd-globals/lib/tests/CacheModule1';
  this.setWorkerIdleLimit(300000); // optional
  var q = this;

  var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("EWD-Express listening at http://%s:%s", host, port);
    console.log('__dirname = ' + __dirname);
  });

  var io = require('socket.io')(server);

  io.on('connection', function (socket) {
    socket.on('my-request', function (data) {
      qx.handleMessage(data, function(resultObj) {
        delete resultObj.finished;
        socket.emit('my-response', resultObj);
      });
    });
  });

});

q.start();

