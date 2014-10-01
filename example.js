var winGroups = require('./index');

var username = process.env.username;
var domain = process.env.userdomain;
var group = 'Users';

console.log("Username: " + username);
console.log("Domain: " + domain);

function listUsersMembers(group){
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

listUsersMembers(group);

winGroups.isGroupMember({user: username, domain: domain, group: group}, function(err,isGroupMember){
  if(err)
    return console.log(err);
  
  console.log('Is in group:', isGroupMember);

  if(isGroupMember){
  	winGroups.deleteGroupMember({user: username, domain: domain, group: group},function(err,msg){
  		console.log("Group member deleted");
  		listUsersMembers(group);
  	});
  } else {
  	winGroups.addGroupMember({user: username, domain: domain, group: group},function(err,msg){
  		console.log("Group member added");
  		listUsersMembers(group);
  	});  	
  }
});