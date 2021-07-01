document.getElementById("getNewLink").style.display='none';
function search(){
    var searchString=document.getElementById("searchLinks").value;
    console.log(searchString);

    var allLinks=document.getElementsByClassName("implink");
    for (let index = 0; index < allLinks.length; index++) {
       
        allLinks[index].classList.add("hide");
        if((allLinks[index].innerHTML.toLowerCase().indexOf(searchString.toLowerCase()))>=0)
        {
             
            allLinks[index].classList.remove("hide");
        }
        else{
            allLinks[index].classList.add("hide");
            
        }
    }
}
let links=[];
function addlink(){
    
    links.push({
        linkname:document.getElementById("linkname").value,
        link:document.getElementById("link").value
        
    });
    localStorage.removeItem("SavedLinks");
    let linksJSON=JSON.stringify(links);
    localStorage.setItem("SavedLinks",linksJSON);
    document.getElementById("getNewLink").style.display='none';
    refreshLinks();

}
function addNewLink(){
    document.getElementById("getNewLink").style.display='flex';
    document.getElementById("link").value="";
    document.getElementById("linkname").value="";
}
function closeModalLink(){
    document.getElementById("getNewLink").style.display='none';
}
function refreshLinks(){
    // document.getElementById("submitNow").style.display="inline-block";
    // document.getElementById("updateNow").style.display="none";
    let linksCont=document.getElementById("addedlinks");
    linksCont.innerHTML="";
    let linksJSON=localStorage.getItem("SavedLinks");
    links=JSON.parse(linksJSON);
    if(links!=null){
    links.forEach(function(value,index){
       
        var newElem=document.createElement("a");
        newElem.target="_blank";
        if(String(value.link).includes("http")==false)
        {
            newElem.href="https://"+value.link;
        }
        else{
            newElem.href=value.link;
        }
        newElem.innerHTML=value.linkname;
        newElem.classList.add("implink");
        newElem.ondragend=function(){
            let ans=confirm("Would you like to delete this Link?");
            if(ans==true)
            {
                deleteLink(index);
            }
            
        }
        linksCont.appendChild(newElem);
    
    });
    
}
else{
    links=[];
    let linksJSON=JSON.stringify(links);
    localStorage.setItem("SavedLinks",linksJSON);
}       
}
function deleteLink(index){
    links.splice(index,1);
    localStorage.removeItem("SavedLinks");
    let linkJSON=JSON.stringify(links);
    localStorage.setItem("SavedLinks",linkJSON);
    refreshLinks();
}
refreshLinks();