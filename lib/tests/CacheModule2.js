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

  26 February 2016

*/

// ewd-qoper8 Worker Module example which connects to a Cache database

function workerListeners(worker) {

  worker.on('start', function(isFirst) {

    var connectCacheTo = require('ewd-qoper8-cache');
    connectCacheTo(this);

    if (isFirst) {

      // clear down the request global when ewd-qoper8 first starts

      var glo = new this.globalStore.GlobalNode('requests');
      glo._delete();
    }
  });

  // ewd-qoper8-cache provides these additional three events...

  worker.on('dbOpened', function(status) {
    console.log('Cache was opened by worker ' + process.pid + ': status = ' + JSON.stringify(status));
  });

  worker.on('globalStoreStarted', function() {

    // this is a good place to define global store event handlers
    //  eg for maintaining index globals

    this.globalStore.on('afterSet', function(node) {
      console.log('afterSet: ' + JSON.stringify(node));
    });
  });

  // If you use ewd-qoper8-cache, it handles the 'stop' event for you, and provides this instead:

  worker.on('dbClosed', function() {
    console.log('Worker ' + process.pid + ' has closed the connection to Cache');
    // worker will exit immediately after this event
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

};

module.exports = workerListeners;