win-groups
==========

Local Windows Group Membership manipulation via 'net localgroup'

## Example:

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

    winGroups.isInGroup({user:username, domain: domain, group:group}, function(err,isInGroup){
      if(err)
        return console.log(err);

      console.log('Is in group:', isInGroup);
    });

> Note: This would test whether the currently logged on user is part of the Users group.
> Windows 8: This does not seem to work on Win8 anymore though since the users are not in automatically part of the Users group anymore.. 

# Features
- domain account name support
- check if account name belongs to a specific group
- get account names in a specific group
- add account name to a specific group
- remove account name from a spefic group