var allreminders=[];
let rule=0;
refreshReminders();
document.getElementById("getNewReminder").style.display='none';
document.getElementById("CustomAlert").style.display='none';
function closeAlertModal(){
    document.getElementById("CustomAlert").style.display='none';
}
function showReminderModel(){
    document.getElementById("getNewReminder").style.display='flex';
    document.getElementById("Reminder").value="";
    document.getElementById("ReminderDesc").value="";
    document.getElementById("ReminderDesc").disabled=false;
    document.getElementById("ReminderDate").value="";
    document.getElementById("ReccurringTime").value='0';

}
function closeModalReminder(){
    document.getElementById("getNewReminder").style.display='none';
}
function updateSticky(){
    localStorage.removeItem("Sticky");
    localStorage.setItem("Sticky",document.getElementById("stickynote").innerHTML);
    // refreshSticky();
}
function refreshSticky(){
    document.getElementById("stickynote").innerHTML=localStorage.getItem("Sticky");
}
refreshSticky();

function enable20()
{
    console.log("Called");
    
    if(rule==1)
    {
        
       
        document.getElementById("enable2020").innerHTML='Enable 20-20-20 Rule';
        document.getElementById("enable2020").classList.add("enable20");
        document.getElementById("enable2020").classList.remove("disable20");
        disable2020rule();
    }
    else{
        
        document.getElementById("enable2020").innerHTML='Disable 20-20-20 Rule';
        document.getElementById("enable2020").classList.add("disable20");
        document.getElementById("enable2020").classList.remove("enable20");
        start2020rule();
    }
}
var myfunction=null;
function start2020rule(){
    console.log("Start");
    // myfunction=setInterval(remind, 5000);
    rule=1;
    localStorage.removeItem("Reminders");
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 20);
    console.log(dt);
    allreminders.push({
        reminderName:"2020Rule",
        date: dt,
        reminder:"Please follow 20-20-20 rule, That is look 20 metres away for 20 secs and I will remind you to do that every 20 minutes.",
        reccurring:0
    })
    let reminderJSON=JSON.stringify(allreminders);
    localStorage.setItem("Reminders",reminderJSON);
   
}
function disable2020rule(){
    rule=0;
    localStorage.removeItem("Reminders");
    allreminders.forEach((value,index)=>{
        if(value.reminderName=="2020Rule")
        {
            allreminders.splice(index,1);
            
        }
    });
    let reminderJSON=JSON.stringify(allreminders);
    localStorage.setItem("Reminders",reminderJSON);
    
    console.log("Stop");
    // clearTimeout(myfunction);
}
function remind()
{
    let tone=localStorage.getItem("Tone");
    var audio = new Audio(`${tone}.mp3`);
    audio.play();
    document.getElementById("CustomAlert").style.display="flex";
    document.getElementById("alertMessage").innerHTML='Please follow 20-20-20 rule, That is look 20 metres away for 20 secs and I will remind you to do that every 20 minutes.';
    //alert("Please follow 20-20-20 rule, That is look 20 metres away for 20 secs and I will remind you to do that every 20 minutes.");
    
}
function refreshReminders()
{
    let reminderJSON=localStorage.getItem("Reminders");
    if(reminderJSON==null)
    {
        let reminderJSON=JSON.stringify(allreminders);
        localStorage.setItem("Reminders",reminderJSON);
        setInterval(checkReminders,1000);
    }
    else{
        allreminders=JSON.parse(reminderJSON);
        setInterval(checkReminders,1000);
    }
    allreminders.forEach((value)=>{
        if(value.reminderName=="2020Rule")
        {
            document.getElementById("enable2020").innerHTML='Disable 20-20-20 Rule';
            document.getElementById("enable2020").classList.add("disable20");
            document.getElementById("enable2020").classList.remove("enable20");
            rule=1;
        }
    })
    
}

function checkReminders()
{
    for (let index = 0; index < allreminders.length; index++) {
        var fetchedDate=new Date(allreminders[index].date);
        // console.log("Fetched Date:"+fetchedDate);
        var currentDate=new Date();
        // console.log("Current Date:"+currentDate)
        if(fetchedDate>currentDate)
        {
            // console.log("Dates dont match");
            
        }
        else if(fetchedDate<currentDate)
        {
            // console.log("Dates Match");
            let tone=localStorage.getItem("Tone");
            var audio = new Audio(`${tone}.mp3`);
            audio.play();
            let currentRem=allreminders[index].reminder;
            let currentRemName=allreminders[index].reminderName;
            let recurringTime= parseInt(allreminders[index].reccurring);
            
            allreminders.splice(index,1);
            localStorage.removeItem("Reminders");
            let reminderJSON=JSON.stringify(allreminders);
            localStorage.setItem("Reminders",reminderJSON);
            document.getElementById("CustomAlert").style.display="flex";
            document.getElementById("alertMessage").innerHTML=`<b>${currentRemName}</b><br/><br/>${currentRem}`;
           // alert(currentRem);
            if(rule=1 && currentRemName=="2020Rule")
            {
                start2020rule();
            }
            if(recurringTime>0)
            {
                console.log("Im inside recurring");
                localStorage.removeItem("Reminders");
                var dt = new Date();
                dt.setMinutes(dt.getMinutes() + recurringTime);
                console.log(dt);
                allreminders.push({
                    reminderName:currentRemName,
                    date: dt,
                    reminder:currentRem,
                    reccurring:recurringTime
                })
                let reminderJSON=JSON.stringify(allreminders);
                localStorage.setItem("Reminders",reminderJSON);
            }
            displayReminders();
            tasks.forEach((value,index)=>{
                if(value.task==currentRem)
                {
                    console.log("Inside");
                    if(recurringTime>0)
                    {
                        tasks[index].reminder=currentRem;
                    }
                    else{
                        tasks[index].reminder="";
                    }
                    
                }
            })
            localStorage.removeItem("Tasks");
            let taskJSON=JSON.stringify(tasks);
            localStorage.setItem("Tasks",taskJSON);
            displayTasks();
        }
        
    }
    
}
 

function addReminder()
{
    
    let reminder=document.getElementById("Reminder").value;
    let reminderDesc=document.getElementById("ReminderDesc").value;
    let reminderDate=document.getElementById("ReminderDate").value;
    let reccurringTime=document.getElementById("ReccurringTime").value;
    let flag=1;
    if(reminder!="" && reminderDesc!="" && reminderDate!=""){
        
        allreminders.forEach((value,index)=>{
            if(value.reminderName.toLowerCase()==reminder.toLowerCase())
            {
                flag=0;
            }
            
        })
        if(flag)
        {
            document.getElementById("getNewReminder").style.display='none';
            document.getElementById("Reminder").value="";
            document.getElementById("ReminderDesc").value="";
            document.getElementById("ReminderDate").value="";
            document.getElementById("ReccurringTime").value="";
            
            // console.log(reminder,reminderDesc,reminderDate,reccurringTime);
            
            
            allreminders.push({
                reminderName:reminder,
                date: reminderDate,
                reminder:reminderDesc,
                reccurring:reccurringTime
            })
            localStorage.removeItem("Reminders");
            let reminderJSON=JSON.stringify(allreminders);
            localStorage.setItem("Reminders",reminderJSON);
            tasks.forEach((value,index)=>{
                if(value.task==reminderDesc)
                {
                    console.log("Inside");
                    tasks[index].reminder=reminder;
                    
                }
            })
            localStorage.removeItem("Tasks");
            let taskJSON=JSON.stringify(tasks);
            localStorage.setItem("Tasks",taskJSON);
            displayTasks();
            displayReminders();
        }
        else{
            
            alert("Reminder name already in use");
        }
        
    }
    else{
        alert("All fields are mandatory");
    }
    
    
    
}

function displayReminders(){
        let listofremcont=document.getElementById("allreminders");
        listofremcont.innerHTML="";
        allreminders.forEach((value,index)=>{
            if(value.reminderName!="2020Rule")
            {
                
                var newElem=document.createElement("div");
                newElem.classList.add("remind");
                newElem.onclick=function(){
                    let reminderd=value.date;
                    var mydate=new Date(reminderd);
                    let ans=confirm(`Would you like to dismiss this alarm, Due on ${mydate}?`);
                    if(ans==true)
                    {
                        allreminders.splice(index,1);
                        localStorage.removeItem("Reminders");
                        let reminderJSON=JSON.stringify(allreminders);
                        localStorage.setItem("Reminders",reminderJSON);
                        displayReminders();
                        tasks.forEach((myvalue,myindex)=>{
                            if(myvalue.task==value.reminder)
                            {
                                console.log("InDel");
                                tasks[myindex].reminder="";
                                
                            }
                            else{
                                console.log("NoDel");
                            }
                        })
                        localStorage.removeItem("Tasks");
                        let taskJSON=JSON.stringify(tasks);
                        localStorage.setItem("Tasks",taskJSON);
                        displayTasks();
                    }
                };
                var newElem2=document.createElement("div");
                newElem2.classList.add("icon");
                var newElem3=document.createElement("div");
                newElem3.classList.add("remname");
                var newElem4=document.createElement("i");
                newElem4.classList.add("mainicon");
                newElem4.classList.add("fa");
                newElem4.classList.add("fa-bell");
                newElem2.appendChild(newElem4);
                newElem3.innerHTML=value.reminderName;
                newElem.appendChild(newElem2);
                newElem.appendChild(newElem3);
                listofremcont.appendChild(newElem);
            }
        })
        
}

displayReminders();


var tasks=[];
refreshTasks();
displayTasks();

closeTaskModel();


function refreshTasks(){
    let tasksJSON=localStorage.getItem("Tasks");
    if(tasksJSON==null)
    {
        let tasksJSON=JSON.stringify(tasks);
        localStorage.setItem("Tasks",tasksJSON);
    }
    else{
        tasks=JSON.parse(tasksJSON);
    }
}
function showimpNotUrg(){
    document.getElementById("valueimpNotUrg").value="";
    document.getElementById("valueimpAndUrg").value="";
    document.getElementById("valuenotImpNotUrgnt").value="";
    document.getElementById("valuenotImpButUrg").value="";
    document.getElementById("modeladdimpNotUrg").style.display="flex";
    document.getElementById("modeladdimpAndUrg").style.display="none";
    document.getElementById("modeladdnotImpNotUrgnt").style.display="none";
    document.getElementById("modeladdnotImpButUrg").style.display="none";

}
function showimpAndUrg(){
    document.getElementById("valueimpNotUrg").value="";
    document.getElementById("valueimpAndUrg").value="";
    document.getElementById("valuenotImpNotUrgnt").value="";
    document.getElementById("valuenotImpButUrg").value="";
    document.getElementById("modeladdimpAndUrg").style.display="flex";
    document.getElementById("modeladdimpNotUrg").style.display="none";
    document.getElementById("modeladdnotImpNotUrgnt").style.display="none";
    document.getElementById("modeladdnotImpButUrg").style.display="none";

}
function shownotImpNotUrgnt(){
    document.getElementById("valueimpNotUrg").value="";
    document.getElementById("valueimpAndUrg").value="";
    document.getElementById("valuenotImpNotUrgnt").value="";
    document.getElementById("valuenotImpButUrg").value="";
    document.getElementById("modeladdnotImpNotUrgnt").style.display="flex";
    document.getElementById("modeladdimpNotUrg").style.display="none";
    document.getElementById("modeladdimpAndUrg").style.display="none";
    document.getElementById("modeladdnotImpButUrg").style.display="none";

}
function shownotImpButUrg(){
    document.getElementById("valueimpNotUrg").value="";
    document.getElementById("valueimpAndUrg").value="";
    document.getElementById("valuenotImpNotUrgnt").value="";
    document.getElementById("valuenotImpButUrg").value="";
    document.getElementById("modeladdnotImpButUrg").style.display="flex";
    document.getElementById("modeladdimpNotUrg").style.display="none";
    document.getElementById("modeladdimpAndUrg").style.display="none";
    document.getElementById("modeladdnotImpNotUrgnt").style.display="none";
}
function closeTaskModel(){
    document.getElementById("modeladdimpNotUrg").style.display="none";
    document.getElementById("modeladdimpAndUrg").style.display="none";
    document.getElementById("modeladdnotImpNotUrgnt").style.display="none";
    document.getElementById("modeladdnotImpButUrg").style.display="none";
}

function addimpNotUrg(){
    let fetchedTask=document.getElementById("valueimpNotUrg").value;
    console.log("addimpNotUrg:"+fetchedTask);
    refreshTasks();
    tasks.push({
        cat:"impNotUrg",
        task:fetchedTask,
        reminder:""
    });
    localStorage.removeItem("Tasks");
    let tasksJSON=JSON.stringify(tasks);
    localStorage.setItem("Tasks",tasksJSON);
    closeTaskModel();
    displayTasks();
    

}
function addimpAndUrg(){
    let fetchedTask=document.getElementById("valueimpAndUrg").value;
    console.log("addimpAndUrg:"+fetchedTask);
    refreshTasks();
    tasks.push({
        cat:"impAndUrg",
        task:fetchedTask,
        reminder:""
    });
    localStorage.removeItem("Tasks");
    let tasksJSON=JSON.stringify(tasks);
    localStorage.setItem("Tasks",tasksJSON);
    closeTaskModel();
    displayTasks();
}
function addnotImpNotUrgnt(){
    let fetchedTask=document.getElementById("valuenotImpNotUrgnt").value;
    console.log("addnotImpNotUrgnt:"+fetchedTask);
    refreshTasks();
    tasks.push({
        cat:"notImpNotUrgnt",
        task:fetchedTask,
        reminder:""
    });
    localStorage.removeItem("Tasks");
    let tasksJSON=JSON.stringify(tasks);
    localStorage.setItem("Tasks",tasksJSON);
    closeTaskModel();
    displayTasks();
}
function addnotImpButUrg(){
    let fetchedTask=document.getElementById("valuenotImpButUrg").value;
    console.log("addnotImpButUrg:"+fetchedTask);
    refreshTasks();
    tasks.push({
        cat:"notImpButUrg",
        task:fetchedTask,
        reminder:""
    });
    localStorage.removeItem("Tasks");
    let tasksJSON=JSON.stringify(tasks);
    localStorage.setItem("Tasks",tasksJSON);
    closeTaskModel();
    displayTasks();
}
function displayTasks(){
    let taskImpNotUrg=document.getElementById("taskImpNotUrg");
    let taskImpAndUrg=document.getElementById("taskImpAndUrg");
    let taskNotImpNotUrgnt=document.getElementById("taskNotImpNotUrgnt");
    let taskNotImpButUrg=document.getElementById("taskNotImpButUrg");
    taskImpNotUrg.innerHTML="";
    taskImpAndUrg.innerHTML="";
    taskNotImpNotUrgnt.innerHTML="";
    taskNotImpButUrg.innerHTML="";
    let elemnts=new Array(tasks.length);
    tasks.forEach((value,index)=>{
        elemnts[index]=document.createElement("div");
        elemnts[index].classList.add("task");
        let elem2=document.createElement("div");
        elem2.classList.add("tasktext");
        elem2.innerHTML=value.task;
        elemnts[index].appendChild(elem2);
        let elem3=document.createElement("div");
        elem3.classList.add("taskreminder");
        if(value.reminder==""){
            elem3.innerHTML=`<i class="fa fa-bell-slash"></i>`;
        }
        else{
            elem3.innerHTML=`<i class="fa fa-bell"></i>`;
        }
        elemnts[index].appendChild(elem3);
        elemnts[index].draggable='true';
        elemnts[index].ondragend=function(){
            let ans=confirm("Would you like to delete this task?");
            if(ans==true)
            {
                if(tasks[index].reminder!="")
                {
                    allreminders.forEach((myvalue,myindex)=>{
                        if(myvalue.reminder==tasks[index].task)
                        {
                            allreminders.splice(myindex,1);
                        }
                    })
                    localStorage.removeItem("Reminders");
                    let reminderJSON=JSON.stringify(allreminders);
                    localStorage.setItem("Reminders",reminderJSON);
                    displayReminders();
                }
                tasks.splice(index,1);
                localStorage.removeItem("Tasks");
                let taskJSON=JSON.stringify(tasks);
                localStorage.setItem("Tasks",taskJSON);
                displayTasks();
            }
        }
        elemnts[index].onclick=function(){
            if(value.reminder=="")
            {
                document.getElementById("getNewReminder").style.display='flex';
                document.getElementById("Reminder").value=value.task;
                document.getElementById("ReminderDesc").value=value.task;
                document.getElementById("ReminderDesc").disabled=true;
                document.getElementById("ReminderDate").value="";
                document.getElementById("ReccurringTime").value="0";
            }
            else{
                    let reminderd;
                    allreminders.forEach((myvalue,myindex)=>{
                        if(myvalue.reminder==value.task)
                        {
                            // allreminders.splice(myindex,1);
                            reminderd=allreminders[myindex].date;
                        }
                    })
                    var mydate=new Date(reminderd);
                    let ans=confirm(`Would you like to dismiss this alarm due on ${mydate}?`);
                    if(ans==true)
                    {
                        allreminders.forEach((myvalue,myindex)=>{
                            if(myvalue.reminder==value.task)
                            {
                                allreminders.splice(myindex,1);
                            }
                        })
                        localStorage.removeItem("Reminders");
                        let reminderJSON=JSON.stringify(allreminders);
                        localStorage.setItem("Reminders",reminderJSON);
                        displayReminders();
                        tasks[index].reminder="";
                        localStorage.removeItem("Tasks");
                        let taskJSON=JSON.stringify(tasks);
                        localStorage.setItem("Tasks",taskJSON);
                        displayTasks();
                    }
            }
        }
        if(value.cat=="impNotUrg")
        {
            
            taskImpNotUrg.appendChild(elemnts[index]);

        }
        else if(value.cat=="impAndUrg")
        {
            taskImpAndUrg.appendChild(elemnts[index]);
        }
        else if(value.cat=="notImpNotUrgnt")
        {
            taskNotImpNotUrgnt.appendChild(elemnts[index]);
        }
        else if(value.cat=="notImpButUrg")
        {
            taskNotImpButUrg.appendChild(elemnts[index]);
        }
    })
}
