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

// standalone example demonstrating use of ewd-globals with Cache database
//  you may need to run this as sudo because of permissions

var abstraction = require('ewd-globals');
var interface = require('cache');
var db = new interface.Cache();
console.log('db: ' + JSON.stringify(db));

// Change these parameters to match your GlobalsDB or Cache system:

var ok = db.open({
  path: '/opt/cache/mgr',
  username: '_SYSTEM',
  password: 'SYS',
  namespace: 'USER'
});

console.log('ok: ' + JSON.stringify(ok));

var globalStore = new abstraction(db);

console.log(globalStore.version());

var rob = new globalStore.GlobalNode('rob');
console.log(JSON.stringify(rob._getDocument(), null, 2));

var temp = new globalStore.GlobalNode('temp', [1]);
console.log(JSON.stringify(temp._getDocument(), null, 2));

globalStore.on('afterSet', function(node) {
  console.log('afterSet: ' + JSON.stringify(node));
});

rob.$('x')._value = 'hello';
temp._value = 1234;

db.close();

