'use strict';

var winGroups = require('./index');

var username = process.env.username;
var testGroup = 'testg';

winGroups.isInGroup({user:username, group:testGroup}, function(err,isInGroup){
  if(err){
    console.log(err);
    throw err;
  }

  if( isInGroup ){
    console.log('OK: Is in group.', username, testGroup);
  } else {
    throw new Error('Current user should always be in User group (Unless its localized or a windows8 user)');
  }
});