//var task = document.getElementById("tasks").value.trim();
var ul = document.getElementsByClassName("list-group")[0];
var array =[];

function addListFromLocalStorage(){
    let list = []
    if(localStorage.getItem("tasks")){
        list = JSON.parse(localStorage.getItem("tasks"));
    }
    
    console.log(list);
    list.forEach((item)=>{
        addToDom(item);
        
    })
}
addListFromLocalStorage();

function addToList(val){
    let obj = {
        title:val,
        status:"pending"
    }
    addToDom(obj);
}
function addToDom(task){
    //Unique id generator
    let id = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }


    if(task.title == "") return false;
    let li = document.createElement("li");
    li.classList.add("list-group-item");

    let div1 = document.createElement("div");
    div1.classList.add("form-check");

    let input = document.createElement("input");
    input.setAttribute('type','checkbox');
    input.classList.add("form-check-input");

    let label = document.createElement("label");
    label.classList.add("form-check-label");
    label.innerHTML = task.title;

    if(task.status == "ok"){
        input.setAttribute("checked","checked");
        label.style.textDecoration = "line-through";
    }
    if(task.status == "pending"){
    }

    //add to array
    let obj = {
        title:task.title,
        status:task.status
    }
    
    array.push(obj);
    localStorage.setItem("tasks",JSON.stringify(array));

    input.addEventListener("click",()=>{
        let sts = "pending";
        if(input.checked == true){
            label.style.textDecoration = "line-through";
            sts = "ok";
        }else{
            label.style.textDecoration = "none";
        }
        updateStatus(array, task, sts);

        
    });
    
    let span = document.createElement("span");

    //Edit button
    let i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-pen");

    //Close button
    let button = document.createElement("button");
    button.classList.add("btn-close");
    button.setAttribute('aria-label','Close');

    
    //Add to dom
    span.appendChild(i);
    span.appendChild(button);
    div1.appendChild(input);
    div1.appendChild(label);
    div1.appendChild(span);

    li.appendChild(div1);
    ul.appendChild(li);
    
    button.addEventListener("click",()=>{
        li.style.display = "none";
        let newarray = array.filter((data)=>{
            if(data.title != task.title ){
                return true;
            }
        });
        localStorage.setItem("tasks",JSON.stringify(newarray));
        array = newarray;
    });
    i.addEventListener("click",()=>{
        label.setAttribute("contenteditable","true");
        let range = new Range();

        range.setStart(label, 0);
        range.setEnd(label, 1);
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(range);
    // label.focus();

    })
    label.addEventListener("keydown",(event)=>{
        if(event.key == "Enter"){
            label.setAttribute("contenteditable","false");
            updateTitle(array,task, label.innerText);
        }
    })
    return false;
}

function updateStatus(myarr, mytask, mysts){
    myarr.forEach((data)=>{
        if(data.title == mytask.title){
            data.status = mysts;
        }
    });
    localStorage.setItem("tasks",JSON.stringify(myarr));
}

function updateTitle(myarr, mytask, mytitle){
    myarr.forEach((data)=>{
        if(data.title == mytask.title){
            data.title = mytitle;
        }
    });
    localStorage.setItem("tasks",JSON.stringify(myarr));
}



