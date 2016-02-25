# ewd-globals
 
Abstracts a Global Storage Database as persistent JavaScript Objects and a fine-grained Document Database

This modules is primarily designed for integration with the ewd-qoper8 module, but can be used as a standalone module

## Installation

    npm install ewd-globals

## Using ewd-globals

ewd-globals is designed to be used with Global-storage based databases, specifically:

- Cache from InterSystems
- GlobalsDB from InterSystems
- GT.M

You first must open a connection to the database using the appropriate interface module, eg:

### Cache

    // The cache.node module is included with Cache builds

    var interface = require('cache');
    var db = new interface.Cache();
    var ok = db.open({
      path: '/opt/cache/mgr',
      username: '_SYSTEM',
      password: 'SYS',
      namespace: 'USER'
    });

### GT.M:

    // The nodem module for GT.M can be installed using npm install nodem

    var interface = require('nodem');
    var db = new interface.Gtm();
    var ok = db.open();

Now do the following:

    var abstraction = require('ewd-globals');
    var globalStore = new abstraction(db);

The resulting globalStore object provides a JavaScript abstraction of the Global Storage database.

For full details of the globalStore's Methods, Properties and Events, see [to be completed]


## License

 Copyright (c) 2013-16 M/Gateway Developments Ltd,                           
 Reigate, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  http://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License.  
   




    


