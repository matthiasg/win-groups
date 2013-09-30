'use strict';

var child_process = require('child_process');

module.exports.isInGroup = function(data,callback){

  child_process.exec('net localgroup ' + data.group, function(error,stdout){
    if(error)
      return callback(error,false);

    try{
      var remainingText = retrieveTextAfterDividerLineKeepNewlineBeforeFirstLine(stdout);
      var found = findUserInLines(data.user,remainingText);
      return callback(null,found);

    } catch( err ) {
      return callback(err,false);
    }

  });
};

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

function findUserInLines(userName,textLines){
  var lowerCasedUsers = textLines.toLowerCase().replace(/\r\n/g,'\n');
  var userNameLineWeAreLookingFor = '\n' + userName.toLowerCase().trim() + '\n';
  var indexOfUser = lowerCasedUsers.indexOf(userNameLineWeAreLookingFor);
  return indexOfUser >= 0;
}