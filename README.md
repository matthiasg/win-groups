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

## Example: Add Account Name to Group

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

  	winGroups.addUserGroup({user:username, domain: domain, group:group},function(err,msg){
  		console.log("User group assignement added");
  	});  

## Example: Delete Account Name from Group

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

  	winGroups.deleteUserGroup({user:username, domain: domain, group:group},function(err,msg){
  		console.log("User group assignement deleted");
  	});  

## Example: Get Account Names of a Group

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

	winGroups.getGroupMembers({group:group},function(err,users){
		if(err)
			return console.log(err);		

		console.log("\nGroup: " + group);
		console.log("Users: ");
		console.log("------------------------");
		users.forEach(function(user) {
    		console.log(user);
		});
		console.log("------------------------\n");		
	}); 	  	