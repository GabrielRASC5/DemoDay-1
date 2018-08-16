let account = localStorage.getItem('_account');
if(account == null){
  document.location.href ="index.html"
}
localStorage.removeItem('_account');
// console.log(account)
account = atob(account);
account = JSON.parse(account);
console.log(account)
let account = {
    NAME: "test",
    ID: 12345667
}
 
document.getElementById("username").innerHTML= account.NAME;
let sideBar= document.getElementById("sideBar");
const messageElement = document.getElementById("message");
const button = document.getElementById("pButton");
button.addEventListener("click",updateDB);
 
let database = firebase.database().ref("posts")
 
 
function updateDB(event){
  let id="";
  for(let i=0;i<5;i++){
    let x = Math.floor(Math.random() * 10);
      id += x;
    }
  event.preventDefault();
  database = firebase.database().ref("posts/"+ id)
  let name =  account.NAME;
  let message  = messageElement.value;
    messageElement.value  = "";
      // console.log(name + " : " + "\n" + message);
  let value = {
    ID:id,
    AUTHOR_ID: account.ID,
    MESSAGE: message,
    // Profile: img,
  }
  database.update(value);
}
 
const post = document.querySelector(".post")
database.on("child_added",addMessagetoBoard)
 
function addMessagetoBoard(rowdata){
  let row = rowdata.val();
  let profiles = firebase.database().ref("profiles/" + row.AUTHOR_ID)
  profiles.once("value",function(result){
    let user = result.val()
    let name= account.NAME;
    let message = row.MESSAGE;
    console.log(row)
    let pElement= document.createElement('p')
    pElement.setAttribute("id", "postP")
    pElement.innerText = name + ":" + "\n" + message;
    post.appendChild(pElement)
  })
}
 
 
function menu(){
  let eventElement = document.createElement("a");
  let petitionElement = document.createElement("a");
  let watchElement = document.createElement("a");
  let settingsElement = document.createElement("a");
  eventElement.id = "event";
  petitionElement.id = "petitions";
  watchElement.id = "watch";
  watchElement.addEventListener("click",function(){
    document.location.href="watch.html"
  });  
  settingsElement.id = "settings";
  eventElement.innerHTML = "Events";
  petitionElement.innerHTML = "Petitions";
  watchElement.innerHTML = "Watch";
  settingsElement.innerHTML = "Settings";
  sideBar.appendChild(eventElement);
  sideBar.appendChild(petitionElement);
  sideBar.appendChild(watchElement);
  sideBar.appendChild(settingsElement);
}
menu();
let url ="https://newsapi.org/v2/top-headlines?country=us&apiKey=0294eb9dc63942de8e76886e3c2aa5c1"
let myJson;
function printJson(response){
  return response.json();
}
 
fetch(url)
  .then(printJson)
  .then(function(response){
    myJson =response;
  })
 
function news(){
  for(let i=0;i<3;i++){
    let ref =myJson.articles[i]
    let title = ref.title;
    let descrp =ref.description;
    let link =ref.url;
    let img = ref.urlToImage;
    document.getElementById("news"+[i]).setAttribute("onclick","window.open('"+link+"');");
    document.getElementById("title"+[i]).innerHTML = "#"+title;
    document.getElementById("news"+[i]).style.backgroundImage = "url("+img+")";
  }
 
}
setTimeout(news,3000);

     function SearchFunction(){
       document.getElementById("myDropdown").classList.toggle("show");
     }
     function filterFunction(){
       var input,filter,ul,li,a,i;
       input=document.getElementById("myInput");
       filter= input.value.toUpperCase();
       div= document.getElementById("myDropdown")
       console.log(div)
       a = div.getElementsByTagName("a");
       for (i = 0; i<a.length; i ++){
         if (a[i].innerHTML.toUpperCase().indexOf(filter)>-1){
           a[i].style.display="";
         }
         else {
           a[i].style.display="none";
         }
       }
     }

