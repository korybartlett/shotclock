$(document).ready(function( {
  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyC844URQeH0lRk7ucJkR40rqenAx14XqOU",
      authDomain: "shotclock-b3cee.firebaseapp.com",
      databaseURL: "https://shotclock-b3cee.firebaseio.com",
      projectId: "shotclock-b3cee",
      storageBucket: "shotclock-b3cee.appspot.com",
      messagingSenderId: "284568572596"
  };
  firebase.initializeApp(config);

  //sign in
  btnSignIn.addEventListener('click', e=>{
    var auth = firebase.auth();
    //get values from fields
    // var email = .value
    // var password = .value 

    //check if email and password provided
    // if(!email || !password){
    //   console.log("email and password required");
    //   return;
    // }    

    // var promise = auth.signInWithEmailAndPassword(email, password);
    // promise.catch(e => console.log(e.message));
  });

  //register
  btnRegister.addEventListener('click', e=>{
    var auth = firebase.auth();
    var matchFound = 0;
    //get values from fields
    // var email = .value
    // var password = .value 

    //check if email and password provided
    // if(!email || !password){
    //   console.log("email and password required");
    //   return;
    // }

    //checks firebase if username already exists, maybe
    // var usersRef = new Firebase("https://shotclock-b3cee.firebaseio.com/");
    // usersRef.child(email).once('value', function(snapshot) {
    //   var exists = (snapshot.val() !== null);
    //   if(exists){
    //     alert("Username '" + email + "' already exists")
    //   }
    // });

    // var promise = auth.createUserWithEmailAndPassword(email, password);
    // promise.catch(e => console.log(e.message));
    promise.catch(function(error){
      console.log("registration error", error)
      if(error.code === 'auth/email-already-in-use' ){
        matchFound = 1;
      }
    });
    if(!matchFound){
      console.log("registration successful");
    }

  });

  //sign out
  btnSignOut.addEventListener('click', e=>{
    firebase.auth().signOut();
  });

  //track account state
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
      console.log(firebaseUser);
      btnSignOut.classList.remove('hide');
      loadUserSettings(firebaseUser);
    }
    else{
      console.log("Not logged in!");
      btnSignOut.classList.add('hide');
    }
  });

}));

/*
function loadUserSettings(firebaseUser){

  //finds the firebase user in database
  var dbRefObj = firebase.database().ref("users").child(firebaseUser);
}
*/

/*
//check if email and password provided
if(!email || !password){
  console.log("email and password required");
  return;
}f
*/  
