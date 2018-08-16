let login =document.createElement("div");
let logintxt = document.createElement("h1");
let info = document.createElement("div");
let txtEmail= document.createElement('input');
let txtPass=document.createElement('input');
let button = document.createElement("button");
let container = document.createElement("div");
let error = document.createElement("h3");

loginForm()
function loginForm(){
  document.getElementById("log").style.backgroundColor ="white";
  document.getElementById("sign").style.backgroundColor="grey";
  let user = document.body.getElementsByClassName("user")[0];
  //Contains the login section
  login.setAttribute("class", "login")
  user.appendChild(login)
  login =document.body.getElementsByClassName("login")[0];
  //Login text element
  logintxt.setAttribute("id","logintxt")
  logintxt.innerHTML = "Login into your existing JMM account, if you haven't made one yet, then please sign up!";
  login.appendChild(logintxt);
  //Info element containing email,password, and button
  info.setAttribute("class","info");
  login.appendChild(info);
  info =document.body.getElementsByClassName("info")[0];
  //Email element
  txtEmail.setAttribute("id","textEmail")
  txtEmail.setAttribute("placeholder","Email")
  txtEmail.setAttribute("type","email")
  info.appendChild(txtEmail);
  //Password element
  txtPass.setAttribute("id","textPass");
  txtPass.setAttribute("placeholder","Password");
  txtPass.setAttribute("type","password");
  info.appendChild(txtPass);
  //Div containing Button
  container.setAttribute("id","container");
  info.appendChild(container);
  //Button element
  button.setAttribute("id","login")
  button.setAttribute("onclick","startLog()")
  button.innerHTML ="Login"
  container.appendChild(button)
  document.getElementsByClassName("login")[0].style.display="flex";
  //Password wrong
  error.setAttribute("id","error")
  error.innerHTML ="Wrong username or password"
  container.appendChild(error)
}

function clickForm(){
  document.getElementsByClassName("signUp")[0].style.display="none";
  loginForm();
}


let signUp =document.createElement("div");
let signInfoText= document.createElement("h1")
let fullName = document.createElement("input");
let signEmail = document.createElement("input");
let signPass= document.createElement('input');
let confirmPass=document.createElement('input');
let signButton = document.createElement("button");
let checkPass = document.createElement("h4");
// let dropdown = document.createElement("div");
// let dropBtn = document.createElement("button")
// let dropCont = document.createElement("div")
// let role =document.createElement('a')
// let role2 =document.createElement('a')

function signUpForm() {
  document.getElementsByClassName("login")[0].style.display="none";
  document.getElementById("sign").style.backgroundColor = "white";
  document.getElementById("log").style.backgroundColor = "grey";
  let user = document.body.getElementsByClassName("user")[0];
  //Contains the sign up section
  signUp.setAttribute("class", "signUp")
  user.appendChild(signUp)
  signUp = document.body.getElementsByClassName("signUp")[0];
  //Sign up text Info
  signInfoText.setAttribute("id","signInfoText")
  signInfoText.innerHTML = "Sign up for a JMM account in order to join stuff..blah.blah";
  signUp.appendChild(signInfoText);
  //Full name text element
  fullName.setAttribute("id", "fullName")
  fullName.setAttribute("placeholder", "Full Name")
  signUp.appendChild(fullName);
  //Email element
  signEmail.setAttribute("id", "signEmail")
  signEmail.setAttribute("placeholder", "Email")
  signEmail.setAttribute("type", "email")
  signUp.appendChild(signEmail);
  //Password
  signPass.setAttribute("id", "signPass");
  signPass.setAttribute("placeholder", "Password");
  signPass.setAttribute("type", "password");
  signUp.appendChild(signPass);
  //Confirm password
  confirmPass.setAttribute("id", "confPass");
  confirmPass.setAttribute("placeholder", "Confirm Password");
  confirmPass.setAttribute("type", "password");
  signUp.appendChild(confirmPass);
//   //Selection
//   dropdown.setAttribute("class","dropdown");
//   dropBtn.setAttribute("class","dropBtn")
//   dropBtn.addEventListener("click",showDropDown)
//   dropBtn.innerHTML="Role"
//   dropCont.setAttribute('class','dropdown-content')
//   dropCont.setAttribute("id","myDropdown")
//   role.setAttribute("href","#")
//   role.innerHTML="User"
//   role2.setAttribute("href","#")
//   role2.innerHTML="Organization"
//   dropCont.appendChild(role)
//   dropCont.appendChild(role2)
//   dropdown.appendChild(dropBtn)
//   dropdown.appendChild(dropCont)
//   signUp.appendChild(dropdown)
  //Password check
  checkPass.setAttribute("id", "checkPass")
  signUp.appendChild(checkPass);
  //Button element
  signButton.setAttribute("id", "signUpBtn")
  signButton.innerHTML = "Sign Up"
  signUp.appendChild(signButton)
  document.getElementsByClassName("signUp")[0].style.display="flex";
}

confirmPass.addEventListener("keyup", function(){
  if(signPass.value ==confirmPass.value){
    confirmPass.value = signPass.value;
    document.getElementById("signPass").style.backgroundColor = "white";
    document.getElementById("confPass").style.backgroundColor = "white";
    checkPass.innerHTML ="";
  } else if(signPass.value !=confirmPass.value){
    checkPass.innerHTML = "Passwords do not match!!"
    document.getElementById("signPass").style.backgroundColor = "rgba(210, 45, 45, 0.74)";
    document.getElementById("confPass").style.backgroundColor = "rgba(210, 45, 45, 0.74)";
  }
})


signButton.addEventListener("click",updateDB);

//Set database object here
let database= firebase.database().ref()
/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    let name = fullName.value;
    let email = signEmail.value;
    let password = confirmPass.value;
    fullName.value = "";
    signEmail.value  = "";
    signPass.value="";
    confirmPass.value ="";
    //Update database here
  let id="";
  for(let i=0;i<5;i++){
    let x =Math.floor(Math.random()*10);
    id+=x
  }
  let value = {
    ID: id,
    NAME: name,
    EMAIL:  email,
    PASSWORD: password
}
let newProfile= firebase.database().ref("profiles/"+id)
  if(signPass.value!=null || confirmPass.value!=null || fullName.value!=null|| signEmail.value!=null){
  checkPass.innerHTML ="Please fill in all fields!"
} else if (signPass.value==null || confirmPass.value==null || fullName.value==null|| signEmail.value==null){
    newProfile.update(value);
  }
}

let profiles= firebase.database().ref("profiles")
function startLog(){

  profiles.on("value",logins);
}


function logins(rowData){
  let userProfiles = rowData.val()
  for(profile in userProfiles){
    if (userProfiles[profile].EMAIL ==txtEmail.value && userProfiles[profile].PASSWORD ==txtPass.value){
      var account = userProfiles[profile]
      account = JSON.stringify(account);
      account = btoa(account);
      localStorage.setItem('_account', account);
      document.location.href = "index.html"
      break;
    } else if (userProfiles[profile].EMAIL !=txtEmail.value || userProfiles[profile].PASSWORD != textPass.value){
      console.log("wrong password or username")
      document.getElementById("error").style.display = "flex";
    }
  }
  // let row= rowData.val()
  // let email=row.EMAIL;
  // console.log(email)
}

// function showDropDown() {
//     console.log("show");
//     document.getElementById("myDropdown").style.display = "block";
// }
// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//     if (!event.target.matches('.dropBtn')) {
//       document.getElementById("myDropdown").style.display = "none";
//     }
// }
