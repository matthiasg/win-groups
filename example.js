'use strict';

var winGroups = require('.');

var username = process.env.username;
var testGroup = 'Users';

winGroups.isInGroup({user:username, group:testGroup}, function(err,isInGroup){
  if(err)
    return console.log(err);

  console.log('Is in group:', isInGroup);
});