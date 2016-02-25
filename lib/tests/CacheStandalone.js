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

var temp = new globalStore.GlobalNode('temp', [1]);
console.log('_defined: ' + temp._defined);
console.log('_exists: ' + temp._exists);
console.log('_hasValue: ' + temp._hasValue);
console.log('_hasProperties: ' + temp._hasProperties);
console.log('_value: ' + temp._value);
console.log('_properties: ' + temp._properties);

console.log(JSON.stringify(temp._getDocument(), null, 2));

globalStore.on('afterSet', function(node) {
  console.log('afterSet: ' + JSON.stringify(node));
});

rob.$('x')._value = 'hello';
rob.$('y')._value = 'world';

var z = {
  a: 'this is a',
  b: 'this is b',
  c: ['a', 's', 'd'],
  d: {
    a: 'a',
    b: 'b'
  }
};

rob.$('z')._setDocument(z);

console.log(JSON.stringify(rob._getDocument(), null, 2));

console.log('_properties: ' + JSON.stringify(rob._properties));

console.log('forEach through rob global:');
rob._forEach(function(subscript) {
  console.log(subscript);
});

console.log('forPrefix through rob global starting x:');
rob._forPrefix('x', function(subscript) {
  console.log(subscript);
});

console.log('forEachLeafNode through rob global:');
rob._forEachLeafNode(function(data) {
  console.log(data);
});

console.log('Number of subscripts: ' + rob._count());

var roby = rob.x.$('y');
console.log('parent: ' + roby._parent._value);

var first = rob._first;
console.log('first: ' + first);
console.log('next = ' + rob._next(first));

var last = rob._last;
console.log('last: ' + last);
console.log('previous = ' + rob._previous(last));


temp._value = 1234;

temp._delete();

db.close();

