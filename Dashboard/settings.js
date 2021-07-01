document.getElementById("chooseColors").style.display="none";
document.getElementById("uploadModel").style.display="none";
var mycolors=[];
var myfont="";
var myTone="";
getcolors();
getFont();
getTone();
let root = document.documentElement;
for (let index = 0; index < mycolors.length; index++) {
    root.style.setProperty('--'+mycolors[index].type,mycolors[index].value);
    
}
root.style.setProperty('--customfont',myfont);

function openColorDialog(){
    document.getElementById("chooseColors").style.display="flex";
    document.getElementById("base-color").value=mycolors[1].value;
    document.getElementById("primary-color").value=mycolors[0].value;
    document.getElementById("background-buttons").value=mycolors[2].value;
    document.getElementById("selectFont").value=myfont;


    let tones=document.getElementsByClassName("tone");
    for (let index = 0; index < tones.length; index++) {
        if(tones[index].classList.contains("toneButton")==false)
        {
            tones[index].classList.add("toneButton");
        }
        if(tones[index].classList.contains("toneButtonClicked")==true)
        {
            tones[index].classList.remove("toneButtonClicked");
        }
        
    }
    let selected=document.getElementById(myTone);
    selected.classList.remove("toneButton");
    selected.classList.add("toneButtonClicked");
}
function closeChooseColors(){
    document.getElementById("chooseColors").style.display="none";
}
function closeUploadModel(){
    document.getElementById("uploadModel").style.display="none";
}
function getcolors(){
    let colorsJSON=localStorage.getItem("Colors");
    if(colorsJSON==null)
    {
        mycolors.push({
            type:"primary-color",
            value:"#CCB3B3"
        })
        mycolors.push({
            type:"base-color",
            value:"#E3D3E4"
        })
        mycolors.push({
            type:"background-buttons",
            value:"#3E3C3C"
        })
        let colorsJSON=JSON.stringify(mycolors);
        localStorage.setItem("Colors",colorsJSON);
    }
    else{
        mycolors=JSON.parse(colorsJSON);
    }
}
function getFont(){
    let font=localStorage.getItem("Font");
    if(font==null)
    {
        myfont="monospace";
        localStorage.setItem("Font",myfont);
    }
    else{
        myfont=font;
    }
}
function getTone(){
    let tone=localStorage.getItem("Tone");
    if(tone==null)
    {
        myTone="notification";
        localStorage.setItem("Tone",myTone);
    }
    else{
        myTone=tone;
    }
}
function modifyFont(){
    let font=document.getElementById("selectFont").value;
    myfont=`${font},monospace`;
    localStorage.removeItem("Font");
    localStorage.setItem("Font",myfont);
    let root = document.documentElement;
    root.style.setProperty('--customfont',myfont);
    document.getElementById("selectFont").value=myfont;
    
}
function modifyColors(){
    let basecolor=document.getElementById("base-color").value;
    let primarycolor=document.getElementById("primary-color").value;
    let backgroundbuttons=document.getElementById("background-buttons").value;
    mycolors.forEach((value,index)=>{
        if(value.type=="base-color")
        {
            mycolors[index].value=basecolor;
        }
        else if(value.type=="primary-color")
        {
            mycolors[index].value=primarycolor;
        }
        else if(value.type=="background-buttons")
        {
            mycolors[index].value=backgroundbuttons;
        }
    })
    localStorage.removeItem("Colors");
    let colorsJSON=JSON.stringify(mycolors);
    localStorage.setItem("Colors",colorsJSON);
    let root = document.documentElement;
    for (let index = 0; index < mycolors.length; index++) {
        root.style.setProperty('--'+mycolors[index].type,mycolors[index].value);
    
    }
}

function openUploadModel(){
    document.getElementById("uploadModel").style.display="flex";
    var cont=document.getElementById("allEnvs");
    cont.innerHTML="";
    let envJSON=localStorage.getItem("SavedEnvs");
    let envs=JSON.parse(envJSON);
    envs.forEach((value,index)=>{
        let elem=document.createElement("div");
        elem.classList.add("theEnv");
        elem.classList.add("selectBoxes");
        elem.innerHTML=value.envName;
        elem.onclick=function(){
            if(elem.classList.contains("selectBoxes"))
            {
                elem.classList.remove("selectBoxes");
                elem.classList.add("selectedBoxes");
            }
            else if(elem.classList.contains("selectedBoxes")){
                elem.classList.add("selectBoxes");
                elem.classList.remove("selectedBoxes");
            }
            
        }
        cont.appendChild(elem);
    });
    var contNew=document.getElementById("allLinks");
    contNew.innerHTML="";
    let linksJSON=localStorage.getItem("SavedLinks");
    let links=JSON.parse(linksJSON);
    links.forEach((value,index)=>{
        let elem=document.createElement("div");
        elem.classList.add("theLink");
        elem.classList.add("selectBoxes");
        elem.innerHTML=value.linkname;
        elem.onclick=function(){
            if(elem.classList.contains("selectBoxes"))
            {
                elem.classList.remove("selectBoxes");
                elem.classList.add("selectedBoxes");
            }
            else if(elem.classList.contains("selectedBoxes")){
                elem.classList.add("selectBoxes");
                elem.classList.remove("selectedBoxes");
            }
            
        }
        contNew.appendChild(elem);
    });
    // document.getElementById("downloadText").value=localStorage.getItem("SavedEnvs");
    // document.getElementById("downloadText").value+="|"+localStorage.getItem("SavedLinks");
    let data=document.getElementById("uploadText").value="";
}
function selectAllEnvs(){
    var theEnvs=document.getElementsByClassName("theEnv");
    for (let index = 0; index < theEnvs.length; index++) {
        if(theEnvs[index].classList.contains("selectBoxes"))
        {
            theEnvs[index].classList.remove("selectBoxes");
            theEnvs[index].classList.add("selectedBoxes");
        }
        
    }
}
function selectAllLinks()
{
    var theLinks=document.getElementsByClassName("theLink");
    for (let index = 0; index < theLinks.length; index++) {
        if(theLinks[index].classList.contains("selectBoxes"))
        {
            theLinks[index].classList.remove("selectBoxes");
            theLinks[index].classList.add("selectedBoxes");
        }
        
    }
}
function CopyUploadCode()
{
    var envDetails=[];
    var linkDetails=[];
    let linksJSON=localStorage.getItem("SavedLinks");
    let links=JSON.parse(linksJSON);
    let envJSON=localStorage.getItem("SavedEnvs");
    let envs=JSON.parse(envJSON);
    var data=document.getElementsByClassName("selectedBoxes");
    for (let index = 0; index < data.length; index++) {
        if(data[index].classList.contains("theLink"))
        {
            links.forEach((value,index2)=>{
                if(value.linkname==data[index].innerHTML)
                {
                    linkDetails.push(links[index2]);
                }
            })
        }
        else if(data[index].classList.contains("theEnv")){
            envs.forEach((value,index2)=>{
                if(value.envName==data[index].innerHTML)
                {
                    envDetails.push(envs[index2]);
                }
            })
        }
        
        
    }
    let linksJS=JSON.stringify(linkDetails);
    let envsJs=JSON.stringify(envDetails);
    let myJSON=envsJs+"|"+linksJS;
    document.getElementById("codeToCopy").value=myJSON;
    var copyText = document.getElementById("codeToCopy");
    copyText.select();
    document.execCommand("copy");
   
    
}
function overwriteData(){
    let data=document.getElementById("uploadText").value;
    let envDetails=data.split("|");
    let linksJSON=localStorage.getItem("SavedLinks");
    let links=JSON.parse(linksJSON);
    let envJSON=localStorage.getItem("SavedEnvs");
    let envs=JSON.parse(envJSON);
    JSON.parse(envDetails[0]).forEach((value)=>{
        envs.push(value);
    })
    JSON.parse(envDetails[1]).forEach((value)=>{
        links.push(value);
    })
    
    // console.log(envs);
    // console.log(links);
    localStorage.removeItem("SavedEnvs");
    localStorage.setItem("SavedEnvs",JSON.stringify(envs));
    refreshEnvs();
    localStorage.removeItem("SavedLinks");
    localStorage.setItem("SavedLinks",JSON.stringify(links));
    refreshLinks();
    document.getElementById("uploadModel").style.display="none";
}

function changeSelectedTone(selTone)
{
    let tones=document.getElementsByClassName("tone");
    for (let index = 0; index < tones.length; index++) {
        if(tones[index].classList.contains("toneButton")==false)
        {
            tones[index].classList.add("toneButton");
        }
        if(tones[index].classList.contains("toneButtonClicked")==true)
        {
            tones[index].classList.remove("toneButtonClicked");
        }
        
    }
    let selected=document.getElementById(selTone);
    selected.classList.remove("toneButton");
    selected.classList.add("toneButtonClicked");
    var audio = new Audio(`${selTone}.mp3`);
    audio.play();
}
function modifyTone(){
    let tones=document.getElementsByClassName("toneButtonClicked");
    console.log(tones[0].id);
    myTone=tones[0].id;
    localStorage.removeItem("Tone");
    localStorage.setItem("Tone",myTone);
    
}