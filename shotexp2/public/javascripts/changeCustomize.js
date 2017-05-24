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
      if(window.location.pathname == "/home" || window.location.pathname == "/"){
        searchVideoLogIn()
      }
    var pathname = window.location.pathname;
    populateFavTeams(pathname);
    // if(typeof selectedTeams !== 'undefined' && selectedTeams.length>0){
    //   var id;
    //   for(var j = 0; j<selectedTeams.length;j++){
    //     $('img').each(function(idx, img) {
    //         console.log(img.src);
    //         //http://localhost:3000/images/basketball/150px/Atlanta_Hawks.png
    //         var team = selectedTeams[j];
    //         var regString = "http://localhost:3000/images/[basketball|soccer]/150px/"+team+".png"
    //         var re = new RegExp(regString, "g");
    //         if (re.test(img.src)) { 
    //           console.log("in the if");
    //           id=this.parentNode.id;
    //           //break;

    //         }
    //     })
    //     selectorFunction(selectedTeams[j], id);
    //   }
    // }
  });

}