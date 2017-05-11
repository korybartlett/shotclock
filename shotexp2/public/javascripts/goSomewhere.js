function populateFavTeams(pathname){
	if(pathname === '/loggedInNBA'){
		for(var key in favBaskArr){
			if(key === 'daHolder'){
				continue;
			}
			if(selectedTeams.indexOf(key) === -1){
				selectedTeams.push(key);	
			}
		}	
	}
	else if (pathname === '/loggedInEPL'){
		for(var key in favSocArr){
			if(key === 'daHolder'){
				continue;
			}
			if(selectedTeams.indexOf(key) === -1){
				selectedTeams.push(key);	
			}
		}
	}
}



function saveBaskTeams(selectedTeams){
	var saveArr = [];
	if(jQuery.isEmptyObject(userJSON["basketball"])){
		userJSON["basketball"] = {};
		for(var i = 0; i < selectedTeams.length; i++){
			saveArr[selectedTeams[i]] = 0;
		}
	}
	else{
		for(var i = 0; i < selectedTeams.length; i++){
			if(!favBaskArr.hasOwnProperty(selectedTeams[i])){
				saveArr[selectedTeams[i]] = 0;
			}
			else{
				saveArr[selectedTeams[i]] = favBaskArr[selectedTeams[i]];
			}	
		}	
	}
	
	userJSON["basketball"] = saveArr;
	//console.log(userJSON["basketball"]);
	firebase.database().ref().child("users").child(username).set(userJSON);
}

function saveSocTeams(selectedTeams){
	var saveArr = [];
	if(jQuery.isEmptyObject(userJSON["soccer"])){
		userJSON["soccer"] = {};
		for(var i = 0; i < selectedTeams.length; i++){
			saveArr[selectedTeams[i]] = 0;
		}
	}
	else{
		for(var i = 0; i < selectedTeams.length; i++){
		  	if(!favSocArr.hasOwnProperty(selectedTeams[i])){
		  		saveArr[selectedTeams[i]] = 0;
		  	}	
		  	else{
				saveArr[selectedTeams[i]] = favSocArr[selectedTeams[i]];
			}
	  	}
	}	
	userJSON["soccer"] = saveArr;
	firebase.database().ref().child("users").child(username).set(userJSON);
}