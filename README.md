win-groups
==========

Local Windows Group Membership tests via 'net localgroup'

## Example:

    var winGroups = require('win-groups');

    var username = process.env.username;
    var testGroup = 'Users';

    winGroups.isInGroup({user:username, group:testGroup}, function(err,isInGroup){
      if(err)
        return console.log(err);

      console.log('Is in group:', isInGroup);
    });

> Note: This would test whether the currently logged on user is part of the Users group.
> Windows 8: This does not seem to work on Win8 anymore though since the users are not in automatically part of the Users group anymore.. 