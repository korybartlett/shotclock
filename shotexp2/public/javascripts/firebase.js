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
        alert("wrong password");
        console.log(error);  
      }
      else if(error.code === 'auth/user-not-found'){
        alert("user not found");
        console.log(error);  
      }
      else if(error.code === 'auth/invalid-email'){
        alert("invalid email");
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
      alert("email and password required");
    }

    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    promise.catch(function(error){
      console.log("registration error", error)
      if(error.code === 'auth/email-already-in-use' ){
        alert("email already registered");
      }
      else if( error.code === 'auth/weak-password'){
        alert("weak password");
      }
      else if( error.code === 'auth/invalid-email'){
        alert("invalid email format");
      }
      else{
        console.log("successful!");
      }
    });

  });

  //sign out
  btnSignOut.addEventListener('click', e=>{
    firebase.auth().signOut();
  });

  //track account state
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Sign Off"
      $("#btnSignOut").show();
      var email = firebaseUser.email;
      username = email.split("@")[0];
      checkIfUserNotExsits(username);
    }
    else{
      var element = document.getElementById('customizeKeyword');
      element.innerHTML = "Customize Settings"
      $("#btnSignOut").hide();
    }
  });

});

function checkIfUserNotExsits(username){
  var usersRef = firebase.database().ref().child("users")
  var writePromise = usersRef.child(username).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    if (!exists){
      firebase.database().ref().child("users").child(username).child("basketball").set({
        "daHolderVariable" : 0
      });

      firebase.database().ref().child("users").child(username).child("soccer").set({
        "daHolderVariable" : 0
      },function(error){
        if(error){
          alert("failed to save data" + error);
        }
        else {
          window.location.replace("loggedInNBA");
        }
      });
    }
    else{
      window.location.replace("loggedInNBA");
    }
  });
}  

$("#form").submit(function() {
    return false;
});

//enter button functionality
$(document).keypress(function(ev){
  if (ev.which == 13) {
    ev.preventDefault();
  }
});
