'use strict';

var child_process = require('child_process');

module.exports.addGroupMember = function(data,callback){
  if(!data.user){
    return callback('data.user is not defined', false);
  }

  if(!data.group){
    return callback('data.group is not defined', false);
  }  

  if(process.platform !== 'win32'){
    return callback('This command only works on windows', false);
  }

  data.accountName = getAccountName(data);

  //net localgroup groupname username /add
  child_process.exec('net localgroup "' + data.group + '" "' + data.accountName + '" /add', function(error,stdout){
    if(error)
      return callback(error,false);

    return callback(null,stdout);
  });
};

module.exports.deleteGroupMember = function(data,callback){
  if(!data.user){
    return callback('data.user is not defined', false);
  }

  if(!data.group){
    return callback('data.group is not defined', false);
  }  

  if(process.platform !== 'win32'){
    return callback('This command only works on windows', false);
  }

  data.accountName = getAccountName(data);

  //net localgroup groupname username /delete
  var cmd = 'net localgroup "' + data.group + '" "' + data.accountName + '" /delete';
  //console.log("CMD", cmd);
  child_process.exec(cmd, function(error,stdout){
    if(error)
      return callback(error,false);

    return callback(null,stdout);
  });
};

module.exports.getGroupMembers = function(data,callback){
  if(!data.group){
    return callback('data.group is not defined', false);
  } 

  if(process.platform !== 'win32'){
    return callback('This command only works on windows', false);
  }

  child_process.exec('net localgroup "' + data.group + '"', function(error,stdout){
    if(error)
      return callback(error,false);

    try{
      var remainingText = retrieveTextAfterDividerLineKeepNewlineBeforeFirstLine(stdout);

      var users = parseGroupUsers(remainingText);
      if(Array.isArray(users)){
        users = users.slice(0,-1)
      }

      return callback(null,users);

    } catch( err ) {
      return callback(err,false);
    }
  });
};

module.exports.isInGroup = function(data,callback){
  if(!data.user){
    return callback('data.user is not defined', false);
  }

  if(process.platform !== 'win32'){
    return callback('This command only works on windows', false);
  }

  child_process.exec('net localgroup "' + data.group + '"', function(error,stdout){
    if(error)
      return callback(error,false);

    try{
      var remainingText = retrieveTextAfterDividerLineKeepNewlineBeforeFirstLine(stdout);
      var accountName = getAccountName(data);
      var found = findUserInLines(accountName,remainingText);

      return callback(null,found);

    } catch( err ) {
      return callback(err,false);
    }

  });
};

module.exports.isGroupMember = module.exports.isInGroup;

function retrieveTextAfterDividerLineKeepNewlineBeforeFirstLine(netLocalgroupResponseText){
  var startOfDivider = netLocalgroupResponseText.indexOf('\n-');
  if(startOfDivider<=0){
    throw new Error('Error with output format');
  }

  var textFromDivider = netLocalgroupResponseText.substr(startOfDivider+1);
  var lineAfterDivider = textFromDivider.indexOf('\n');
  if(lineAfterDivider<=0){
    throw new Error('Error with output format');
  }

  var remainingText = textFromDivider.substr(lineAfterDivider);

  return remainingText;
}

function findUserInLines(accountName,textLines){
  var lowerCasedUsers = textLines.toLowerCase().replace(/\r\n/g,'\n');
  var accountNameLineWeAreLookingFor = '\n' + accountName.toLowerCase().trim() + '\n';
  var indexOfUser = lowerCasedUsers.indexOf(accountNameLineWeAreLookingFor);
  return indexOfUser >= 0;
}

function parseGroupUsers(textLines){
  var lowerCasedUsers = textLines.toLowerCase().replace(/\r\n/g,'\n');
  var users = lowerCasedUsers.match(/[^\r\n]+/g);
  return users;
}

function getAccountName(data){
  data.accountName = data.user.toLowerCase().trim();
  if(data.domain){
    data.accountName = (data.domain + '\\' + data.accountName).toLowerCase().trim();
  }
  return data.accountName;
}