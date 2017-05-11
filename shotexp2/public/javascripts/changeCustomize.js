var favBaskArr = [];
var favSocArr = [];
var username = "";
var userJSON;
var string = "test";

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
      username = email.split("@")[0];
      loadUserSettings();
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

function loadUserSettings(){
	//finds the firebase user in database
	//.ref() is the root of the database
	//.child(<param>), param goes to users in database
	var dbRefObj = firebase.database().ref().child("users").child(username);
  var JSONObj;
  dbRefObj.on('value', snap=>{
    userJSON = JSON.parse(JSON.stringify(snap.val()));
    //objS["basketball"]["Warriors"] = 0;
    if(userJSON == null){
      return;
    }
    console.log(userJSON);
    if(!jQuery.isEmptyObject(userJSON["soccer"])){
      favSocArr = userJSON["soccer"];
    }
    if(!jQuery.isEmptyObject(userJSON["basketball"])){
      favBaskArr = userJSON["basketball"];
    }
    console.log(favBaskArr);
    console.log(favSocArr);
    var pathname = window.location.pathname;
    populateFavTeams(pathname);
  });

}