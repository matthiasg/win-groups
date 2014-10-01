win-groups
==========

Local Windows Group Membership manipulation via 'net localgroup'

# Installation

    npm install win-groups

## Example:

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

    winGroups.isGroupMember({user: username, domain: domain, group: group}, function(err,isGroupMember){
      if(err)
        return console.log(err);

      console.log('Is in group:', isGroupMember);
    });

> Note: This would test whether the currently logged on user is part of the Users group.
> Windows 8: This does not seem to work on Win8 anymore though since the users are not in automatically part of the Users group anymore.. 

# Features
- domain support
- check if account name belongs to a specific group (isGroupMember)
- add member to a group (addGroupMember)
- remove account name from a spefic group (deleteGroupMember)
- get all members of a group (getGroupMembers)

## Example: Add Member to Group

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

  	winGroups.addGroupMember({user: username, domain: domain, group: group},function(err,msg){
  		console.log("Group member added");
  	});  

## Example: Delete Member from Group

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

  	winGroups.deleteGroupMember({user: username, domain: domain, group: group},function(err,msg){
  		console.log("Group member deleted");
  	});  

## Example: Get Members of a Group

    var winGroups = require('win-groups');

	var username = process.env.username;
	var domain = process.env.userdomain;
	var group = 'Users';

	winGroups.getGroupMembers({group: group},function(err,users){
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