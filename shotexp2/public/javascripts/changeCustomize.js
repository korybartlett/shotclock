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
      document.getElementById('customizeKeyword').onclick = signOut;
      var email = firebaseUser.email;
      username = email.split("@")[0];
      loadUserSettings();
    }
    else{
      console.log("Not logged in!");
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Customize Settings";
      document.getElementById('customizeKeyword').removeAttribute('onclick');
      document.getElementById('customizeKeyword').setAttribute('href', 'login');
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
    //user has no saved data
    if(userJSON == null){
      return;
    }

    console.log(userJSON);
    //checks if favorite soccer teams exsists, saves key-value pair array from JSON 
    if(!jQuery.isEmptyObject(userJSON["soccer"])){
      favSocArr = userJSON["soccer"];
    }

    //checks if favorite basketball teams exsists, saves key-value pair array from JSON
    if(!jQuery.isEmptyObject(userJSON["basketball"])){
      favBaskArr = userJSON["basketball"];
    }

    console.log(favBaskArr);
    console.log(favSocArr);

    //grabs the current pathway
    var pathname = window.location.pathname;
    //correclty populates the favorite teams
    populateFavTeams(pathname);
    //sets the background colors when selecting favorite team images
    colorBackgrounds();
  });
}

function signOut(){
  
  //save both teams array to json
  saveTeamsOnExit();

  //should be done last
  //logs out user
  firebase.auth().signOut();
}

function goHome(){
  var pathname = window.location.pathname;
  if(pathname === '/loggedInNBA'){
    saveBaskTeams(selectedTeams);
    window.location.replace("home");
  }
  else if (pathname === '/loggedInEPL'){
    saveSocTeams(selectedTeams);
    window.location.replace("home");
  }
}