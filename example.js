var winGroups = require('win-groups');

var username = process.env.username;
var domain = process.env.userdomain;
var group = 'Users';

console.log("Username: " + username);
console.log("Domain: " + domain);

function listGroupUsers(group){
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
}

listGroupUsers(group);

winGroups.isInGroup({user:username, group:group, domain: domain}, function(err,isInGroup){
  if(err)
    return console.log(err);
  
  console.log('Is in group:', isInGroup);

  if(isInGroup){
  	winGroups.deleteUserGroup({user:username, group:group, domain: domain},function(err,msg){
  		console.log("User group assignement deleted");
  		listGroupUsers(group);
  	});
  } else {
  	winGroups.addUserGroup({user:username, group:group, domain: domain},function(err,msg){
  		console.log("User group assignement added");
  		listGroupUsers(group);
  	});  	
  }
});