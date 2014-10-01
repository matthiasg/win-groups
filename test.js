'use strict';

var winGroups = require('./index');

var username = 'NT AUTHORITY\\INTERACTIVE';
var group = 'Users';

winGroups.isGroupMember({user: username, group: group}, function(err,isInGroup){
  if(err){
    console.log(err);
    throw err;
  }

  if( isInGroup ){
    console.log('OK: Is in group.', username, group);
  } else {
    throw new Error('Current user should always be in User group (Unless its localized or a windows8 user)');
  }
});