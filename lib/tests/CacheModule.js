/*

 ----------------------------------------------------------------------------
 | ewd-globals: Abstraction of Global Storage database as persistent        |
 |              JavaScript Objects and Document Database                    |
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

  25 February 2016

*/

// ewd-qoper8 Worker Module example which connects to a Cache database

function workerListeners(worker) {

  worker.on('start', function(isFirst) {

    // establish the connection to Cache database

    var globals = require('ewd-globals');
    var interface = require('cache');
    this.db = new interface.Cache();
    console.log('db: ' + JSON.stringify(this.db));

    var ok = this.db.open({
      path: '/opt/cache/mgr',
      username: '_SYSTEM',
      password: 'SYS',
      namespace: 'USER'
    });

    console.log('ok: ' + JSON.stringify(ok));

    this.globalStore = new globals(this.db);

    // example handler for the afterSet event which is fired every time a GlobalNode value changes:

    this.globalStore.on('afterSet', function(node) {
      console.log('afterSet: ' + JSON.stringify(node));
    });

    //  Clear down the requests global when ewd-qoper8 first started:

    if (isFirst) {
      var glo = new this.globalStore.GlobalNode('requests');
      glo._delete();
    }
  });

  worker.on('message', function(messageObj) {
    
    // for example - save every incoming message object to the requests global

    var glo = new this.globalStore.GlobalNode('requests', [process.pid]);
    var ix = glo._increment();
    glo.$(ix)._setDocument(messageObj);

    var results = {
      hello: 'from worker ' + process.pid,
      time: new Date().toString()
    };
    this.hasFinished(messageObj.type, results);
  });
  
  worker.on('stop', function() {

    // make sure the connection to Cache is closed before the child process closes;

    console.log('Worker ' + process.pid + ' closing database');
    this.db.close();
  });

};

module.exports = workerListeners;