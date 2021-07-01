fetch("https://type.fit/api/quotes")
.then((Response)=>{
  return Response.json();
  
})
.then((data) => {
  let random=Math.round(Math.random()*1000);
  document.getElementById("myLoader").style.display="none";
  document.getElementById("quote1").innerHTML=data[random].text;
  document.getElementById("author").innerHTML=`~ ${data[random].author}`;


})
.catch((error)=>{
  console.log("Got error"+error)
});