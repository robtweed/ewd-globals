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

  27 February 2016

*/

var events = require("events");

var GlobalNode = function(parent, globalName, subscripts) {
  this.parent = parent;
  subscripts = subscripts || [];
  this._node = {global: globalName, subscripts: subscripts};
  // this.subscripts returns a clone of the subscripts array
  this._subscripts = subscripts.slice(0);
  this._globalName = globalName;
};

// Now define all its instance methods

var proto = GlobalNode.prototype;
proto._keys = Object.keys(proto).slice(0);

Object.defineProperty(proto, '_defined', require('./proto/defined'));
Object.defineProperty(proto, '_exists', require('./proto/exists'));
Object.defineProperty(proto, '_hasValue', require('./proto/hasValue'));
Object.defineProperty(proto, '_hasProperties', require('./proto/hasProperties'));
Object.defineProperty(proto, '_value', require('./proto/value'));
Object.defineProperty(proto, '_reservedNames', require('./proto/reservedNames'));
Object.defineProperty(proto, '_properties', require('./proto/properties'));
Object.defineProperty(proto, '_parent', require('./proto/parent'));
Object.defineProperty(proto, '_first', require('./proto/first'));
Object.defineProperty(proto, '_last', require('./proto/last'));

proto._increment = require('./proto/increment');
proto._delete = require('./proto/delete');
proto.$ = require('./proto/dollar');
proto._forEach = require('./proto/forEach');
proto._forRange = require('./proto/forRange');
proto._forPrefix = require('./proto/forPrefix');
proto._forEachLeafNode = require('./proto/forEachLeafNode');
proto._count = require('./proto/count');
proto._next = require('./proto/next');
proto._previous = require('./proto/previous');
proto._getDocument = require('./proto/getDocument');
proto._setDocument = require('./proto/setDocument');
proto.set = require('./proto/set');


// =============  Top-level Constructor =============

var globalDB = function(db) {
  this.version = function() {
    return db.version();
  };
  this.db = db;
  events.EventEmitter.call(this);
  this.GlobalNode = GlobalNode.bind(undefined, this);
};

proto = globalDB.prototype;
proto.__proto__ = events.EventEmitter.prototype;
proto.run = require('./proto/run');
proto.list = require('./proto/list');

module.exports = globalDB;
