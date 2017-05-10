var favBaskArr = [];
var favSocArr = [];

$(document).ready(function() {
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyC844URQeH0lRk7ucJkR40rqenAx14XqOU",
      authDomain: "shotclock-b3cee.firebaseapp.com",
      databaseURL: "https://shotclock-b3cee.firebaseio.com/",
      projectId: "shotclock-b3cee",
      storageBucket: "shotclock-b3cee.appspot.com"
  };

  firebase.initializeApp(config);

  //track account state
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      console.log(firebaseUser);
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Sign Off";
      document.getElementById('customizeKeyword').removeAttribute("href");
      document.getElementById('customizeKeyword').onclick = function(){ firebase.auth().signOut();};
      var email = firebaseUser.email;
      var username = email.split("@")[0];
      loadUserSettings(username);
    }
    else{
      console.log("Not logged in!");
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Customize Settings";
      document.getElementById('customizeKeyword').setAttribute("href", "login");
      //$("#btnSignOut").hide();
    }
  });
  
});

function loadUserSettings(username){
	//finds the firebase user in database
	//.ref() is the root of the database
	//.child(<param>), param goes to users in database
	var dbRefObj = firebase.database().ref().child("users").child(username)
	var dbRefObjBask = dbRefObj.child("basketball");
	var dbRefObjSoc = dbRefObj.child("soccer");
	var JSONObj;

	dbRefObjBask.on('value', snap=> {
		//console.log(JSON.stringify(snap.val(), null, 3));
		JSONObj = JSON.stringify(snap.val(), null, 3);
		favBaskArr = JSON.parse(JSONObj);
		console.log(favBaskArr);
		
	});

	dbRefObjSoc.on('value', snap=> {
		//console.log(JSON.stringify(snap.val(), null, 3));
		JSONObj = JSON.stringify(snap.val(), null, 3);
		favSocArr = JSON.parse(JSONObj);
		console.log(favSocArr);
		
	});
}