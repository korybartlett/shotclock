$(document).ready(function() {
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyC844URQeH0lRk7ucJkR40rqenAx14XqOU",
      authDomain: "shotclock-b3cee.firebaseapp.com",
      databaseURL: "https://shotclock-b3cee.firebaseio.com",
      projectId: "shotclock-b3cee",
      storageBucket: "shotclock-b3cee.appspot.com"
  };

  firebase.initializeApp(config);

  //sign in
  btnSignIn.addEventListener('click', e=>{
    var auth = firebase.auth();
    //get values from fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value; 

    //check if email and password provided
    if(!email || !password){
      console.log("email and password required");
    }    

    var promise = auth.signInWithEmailAndPassword(email, password);
    //promise.catch(e => console.log(e.message));
    promise.catch(function(error){
      if(error.code === 'auth/wrong-password'){
        console.log("wrong password");
        console.log(error);  
      }
      else if(error.code === 'auth/user-not-found'){
        console.log("user not found");
        console.log(error);  
      }
      else if(error.code === 'auth/invalid-email'){
        console.log("invalid email");
        console.log(error);  
      }
      else{
        console.log("successful login");
        console.log("Make it here");
      }
    });

    //checkStateChange();
  });

  //register
  btnRegister.addEventListener('click', e=>{
    var auth = firebase.auth();
    var matchFound = 0;
    //get values from fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value; 

    //check if email and password provided
    if(!email || !password){
      console.log("email and password required");
    }

    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    promise.catch(function(error){
      console.log("registration error", error)
      if(error.code === 'auth/email-already-in-use' ){
        console.log("failllll!");
      }
      else if( error.code === 'auth/weak-password'){
        console.log("weak password");
      }
      else if( error.code === 'auth/invalid-email'){
        console.log("invalid email format");
      }
      else{
        //checkStateChange();
        console.log("successful!");
      }
    });

  });

  //sign out
  btnSignOut.addEventListener('click', e=>{
    firebase.auth().signOut();
    //checkStateChange();
  });

  //track account state
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Sign Off"
      $("#btnSignOut").show();
      window.location.replace("loggedIn");
      //loadUserSettings(firebaseUser);
    }
    else{
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Customize Settings"
      $("#btnSignOut").hide();
    }
  });

});

// function checkStateChange(){
//     firebase.auth().onAuthStateChanged(firebaseUser =>{
//     if(firebaseUser){
//       console.log(firebaseUser);
//       $("#btnSignOut").show();
//       //loadUserSettings(firebaseUser);
//     }
//     else{
//       console.log("Not logged in!");
//       $("#btnSignOut").hide();
//     }
//   }); 
// }

/*
function loadUserSettings(firebaseUser){
  //finds the firebase user in database
  //.ref() is the root of the database
  //.child(<param>), param goes to users in database
  var dbRefObj = firebase.database().ref().child(firebaseUser);
  var dvRefBasketball = dbRefObj.child('basketball');
  var teamBJSON = dvRefBasketball['basketball'];
  var favBaskArr = [];
  for (var key in teamBJSON) {
    if (teamJSON.hasOwnProperty(key)) {
      faveBaskArr[key] = teamBJSON[key];
    }
  }

  var dvRefSoccer = dbRefObj.child('soccer');
  var teamSJSON = dvRefSoccer['soccer'];
  var favSocArr = [];
  for (var key in teamSJSON) {
    if (teamSJSON.hasOwnProperty(key)) {
      faveSocArr[key] = teamSJSON[key];
    }
  }

  dbRefObj.on('value', snap =>{
    <something> = JSON.stringify(snap.val(), null);
  });
}
*/

/*
//check if email and password provided
if(!email || !password){
  console.log("email and password required");
  return;
}f
*/  

$("#form").submit(function() {
    return false;
});

//enter button functionality
$(document).keypress(function(ev){
  if (ev.which == 13) {
    ev.preventDefault();
  }
});
