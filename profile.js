const profiles =document.createElement("div");
profiles.setAttribute("class","profiles")
const proTop=document.createElement("div")
proTop.setAttribute('id',"proTop")
const pic=document.createElement("div")
pic.setAttribute('id',"pic")
const info =document.createElement("div")
info.setAttribute("class","info")
const buttons=document.createElement("div")
buttons.setAttribute('class',"buttons")
const nameDis = document.createElement("h5")
nameDis.setAttribute("id","nameDis")
const username = document.createElement("h3")
username.setAttribute("id","username")
const emailDis = document.createElement("h5")
emailDis.setAttribute("id","emailDis")
const useremail = document.createElement("h3")
useremail.setAttribute("id","useremail")
const interestsDis = document.createElement("h5")
interestsDis.setAttribute("id","interestsDis")
const userInt = document.createElement("h3")
userInt.setAttribute("id","userInt")
const connect =document.createElement("button")
connect.setAttribute("id","connect")
const follow =document.createElement("button")
follow.setAttribute("id","follow")



let url = 'https://randomuser.me/api/?results=100&nat=us'
let myJson;
function printJson(response) {
return response.json();
};
fetch(url)
.then(printJson)
.then(function(response){
  myJson =response;
  // alpha();
  createProfiles(myJson);
});


function firstName(personData){
  let namef = personData.first;
  let first_name= namef.charAt(0).toUpperCase() +namef.slice(1);
  return first_name;
}
function lastName(personData){
  let namel = personData.last
  let last_name= namel.charAt(0).toUpperCase()+namel.slice(1);
  return last_name;
}


function createProfiles(myJson){
  // let proTop = document.createElement("div");
  for(let i = 0; i<myJson.results.length;i++){
    const profiles =document.createElement("div");
    profiles.setAttribute("class","profiles")
    const proTop=document.createElement("div")
    proTop.setAttribute('id',"proTop")
    const pic=document.createElement("div")
    pic.setAttribute('id',"pic")
    const info =document.createElement("div")
    info.setAttribute("class","info")
    const buttons=document.createElement("div")
    buttons.setAttribute('class',"buttons")
    const nameDis = document.createElement("h5")
    nameDis.setAttribute("id","nameDis")
    const username = document.createElement("h3")
    username.setAttribute("id","username")
    const emailDis = document.createElement("h5")
    emailDis.setAttribute("id","emailDis")
    const useremail = document.createElement("h3")
    useremail.setAttribute("id","useremail")
    const interestsDis = document.createElement("h5")
    interestsDis.setAttribute("id","interestsDis")
    const userInt = document.createElement("h3")
    userInt.setAttribute("id","userInt")
    const connect =document.createElement("button")
    connect.setAttribute("id","connect")
    const follow =document.createElement("button")
    follow.setAttribute("id","follow")
    proTop.appendChild(pic)
    info.appendChild(nameDis)
    info.appendChild(username)
    info.appendChild(emailDis)
    info.appendChild(useremail)
    info.appendChild(interestsDis)
    info.appendChild(userInt)
    buttons.appendChild(connect)
    buttons.appendChild(follow)
    profiles.appendChild(proTop)
    profiles.appendChild(info)
    profiles.appendChild(buttons)
    document.body.appendChild(profiles)
    let picture =myJson.results[i].picture.large;
    pic.style.backgroundImage = "url('" + picture + "')";
    username.innerHTML = firstName(myJson.results[i].name) +" "+lastName(myJson.results[i].name)
    useremail.innerHTML = myJson.results[i].email
    nameDis.innerHTML="Name"
    emailDis.innerHTML="Email"
    connect.innerHTML="Connect"
    follow.innerHTML="Follow"
  }
}
