//Populate Env Details Section
let envDetails=document.getElementById("envDetails");
envDetails.innerHTML="<button class='addNewEnv' onclick='openModal()' class='addNewEnv'>+</button>"
document.getElementById("getEnvDetails").classList.remove('show');
document.getElementById("getEnvDetails").classList.add('hide');
let envs=[];
function addNewEnv() {
    let fields=document.getElementsByClassName("field");
    let fieldNames=[];
    for (let index = 0; index < fields.length; index++) {
        fieldNames[index] = fields[index].value;
        
    }
    let fieldValues=document.getElementsByClassName("fieldValue");
    fieldsValues=[];
    for (let index = 0; index < fieldValues.length; index++) {
        fieldsValues[index] = fieldValues[index].value;
        
    }
    envs.push({
        envName:document.getElementById('envNameModal').value,
        fieldsName:fieldNames,
        fieldsValues:fieldsValues
        
    });
    localStorage.removeItem("SavedEnvs");
    let envJSON=JSON.stringify(envs);
    localStorage.setItem("SavedEnvs",envJSON);
    document.getElementById("getEnvDetails").classList.remove('show');
    document.getElementById("getEnvDetails").classList.add('hide');
    refreshEnvs();
}

function addNewDetail(){
    var newElement = document.createElement('div');
    newElement.ondblclick=function(){
        newElement.remove();
    };
    newElement.innerHTML = `<input type='text' placeholder='Field Name' class='inputForm field'/>&nbsp;<input type='text' placeholder='link' class='inputForm fieldValue'/>`;
    document.getElementById('mainDetails').appendChild(newElement);
}

function openModal(){
    document.getElementById("getEnvDetails").classList.remove('hide');
    document.getElementById("mainDetails").innerHTML="<input type='text' placeholder='Env Name' id='envNameModal' class='inputForm'>";
    document.getElementById("getEnvDetails").classList.add('show');
    document.getElementById("submitNow").style.display="inline-block";
    document.getElementById("updateNow").style.display="none";
}
function closeModal() {
    document.getElementById("getEnvDetails").classList.remove('show');
    document.getElementById("getEnvDetails").classList.add('hide');
}
function refreshEnvs(){
    document.getElementById("submitNow").style.display="inline-block";
    document.getElementById("updateNow").style.display="none";
    let envDetails=document.getElementById("envDetails");
    envDetails.innerHTML="";
    let envJSON=localStorage.getItem("SavedEnvs");
    envs=JSON.parse(envJSON);
    
    if(envs!=null){
    envs.forEach(function(value,index){
        var newElement = document.createElement('div');
        newElement.classList.add("name");
        newElement.innerHTML=value.envName;
        var newElement2=document.createElement('div');
        newElement2.classList.add("links");
        let elemnts=new Array(value.fieldsName.length);

        for (let index = 0; index < value.fieldsName.length; index++) {
        elemnts[index]=document.createElement('div');
        elemnts[index].classList.add("envD");
        let newElem3=document.createElement('a');
        newElem3.classList.add("mainlink");
        newElem3.target="_blank";
        newElem3.innerHTML=value.fieldsName[index];
        if(String(value.fieldsValues[index]).includes("http")==false)
        {
            newElem3.href="https://"+value.fieldsValues[index];
        }
        else{
            newElem3.href=value.fieldsValues[index];
        }
        console.log("Im here");
        elemnts[index].appendChild(newElem3);
        let newElem4=document.createElement("div");
        newElem4.innerHTML=`<button class='envCopyButton' onclick='copyEnv("${value.fieldsValues[index]}")'><i class='fa fa-copy'></i></button>`;
        elemnts[index].appendChild(newElem4);
        newElement2.appendChild(elemnts[index]);
        };
        var newElement3=document.createElement('span');
        newElement3.classList.add("mainlink");
        newElement3.innerHTML=`<a class='mainlink' onclick='openModal2(${index})'>Add/Edit</a>`;
        newElement3.id=index;
        newElement2.appendChild(newElement3);
        var newElement3=document.createElement('span');
        newElement3.classList.add("mainlink");
        newElement3.innerHTML=`<a class='mainlink' onclick='delEnv(${index})'>Delete</a>`;
        newElement3.id=index;
        newElement2.appendChild(newElement3);
        newElement.appendChild(newElement2);
        envDetails.appendChild(newElement);
        
        
    
    });
    
}
else{
    envs=[];
    let envsJSON=JSON.stringify(envs);
    localStorage.setItem("SavedEnvs",envsJSON);
}
    envDetails.innerHTML += `<button class='addNewEnv' onclick='openModal()' class='addNewEnv'>+</button>`;
        
}
function copyEnv(detail)
{
    let copyText=document.getElementById("copyEnvText");
    copyText.value=detail;
    console.log(copyText.value);
    copyText.select();
    document.execCommand("copy");
   
    
}
function openLink(link)
{
    console.log(link);
}
refreshEnvs();
function openModal2(index){
    console.log(index);
    document.getElementById("selectedIndex").value=index;
    document.getElementById("getEnvDetails").classList.remove('hide');
    document.getElementById("mainDetails").innerHTML="<input type='text' placeholder='Env Name' id='envNameModal' class='inputForm'>";
    document.getElementById("getEnvDetails").classList.add('show');
    document.getElementById("envNameModal").value=envs[index].envName;
    let newElements=new Array(envs[index].fieldsName.length);
    for (let index2 = 0; index2 < envs[index].fieldsName.length; index2++) {
        newElements[index2] = document.createElement('div');
        newElements[index2].ondblclick=function(){
            newElements[index2].remove();
        };
        newElements[index2].innerHTML = `<input value='${envs[index].fieldsName[index2]}' type='text' placeholder='Field Name' class='inputForm field'/>&nbsp;<input value='${envs[index].fieldsValues[index2]}' type='text' placeholder='link' class='inputForm fieldValue'/>`;
        document.getElementById('mainDetails').appendChild(newElements[index2]);
    }
    document.getElementById("submitNow").style.display="none";
    document.getElementById("updateNow").style.display="inline-block";

}
function delEnv(index){
    // console.log(index);
    let ans=confirm("Would you like to delete this Env Info?");
    if(ans==true)
    {
        envs.splice(index,1);
        localStorage.removeItem("SavedEnvs");
        let envJSON=JSON.stringify(envs);
        localStorage.setItem("SavedEnvs",envJSON);
        refreshEnvs();
    }
    
}
function updateEnv(){
   
    let selectedIndex=document.getElementById("selectedIndex").value;
    envs[selectedIndex].envName="";
    envs[selectedIndex].fieldsName=[];
    envs[selectedIndex].fieldsValues=[];
    let fields=document.getElementsByClassName("field");
    let fieldNames=[];

    for (let index = 0; index < fields.length; index++) {
        fieldNames[index] = fields[index].value;
        
    }
    let fieldValues=document.getElementsByClassName("fieldValue");
    fieldsValues=[];
    for (let index = 0; index < fieldValues.length; index++) {
        fieldsValues[index] = fieldValues[index].value;
        
    }
    envs[selectedIndex].envName=document.getElementById('envNameModal').value;
    for (let index = 0; index < fieldNames.length; index++) {
        envs[selectedIndex].fieldsName[index] = fieldNames[index];
        envs[selectedIndex].fieldsValues[index] = fieldsValues[index];
    }
    localStorage.removeItem("SavedEnvs");
    let envJSON=JSON.stringify(envs);
    localStorage.setItem("SavedEnvs",envJSON);
    document.getElementById("getEnvDetails").classList.remove('show');
    document.getElementById("getEnvDetails").classList.add('hide');
    refreshEnvs();
}
function updateGoLinks(){
    // console.stdlog = console.log.bind(console);
   
    
    let cdrm=document.getElementById("cdrm");
    let ovm=document.getElementById("ovm");
    let almvideo=document.getElementById("almvideo");
    // let myframe=document.getElementById("myframe");
    cdrm.href=`https://fuscdrmsmc${document.getElementById('urlno').value}-fa-ext.us.oracle.com/hcmUI/faces/FuseWelcome`;
    ovm.href=`https://fusovmsmc${document.getElementById('urlno').value}-fa-ext.us.oracle.com/hcmUI/faces/FuseWelcome`;
    almvideo.href=`http://reefoats.us.oracle.com:8080/atsresultviewer/displayresult?alm_run_id=${document.getElementById('urlno').value}&type=alm`;
    // myframe.src=`http://reefoats.us.oracle.com:8080/atsresultviewer/displayresult?alm_run_id=${document.getElementById('urlno').value}&type=alm`;
    // // let myUrl=document.getElementById("myframe").contentWindow.location.href;
    // setTimeout(()=>{
    //     console.log(document.getElementById("myframe").curren);
    // },3000);
    
    
}