const input=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const list=document.getElementById("taskList");
const filters=document.querySelectorAll(".filter-row button");
const toggle=document.getElementById("themeToggle");
const prioritySelect=document.getElementById("prioritySelect");

let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter="all";



if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
toggle.textContent="Light Mode";
}

toggle.onclick=()=>{
document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
toggle.textContent="Light Mode";
}else{
localStorage.setItem("theme","light");
toggle.textContent="Dark Mode";
}
};



addBtn.onclick=()=>{
if(!input.value.trim())return;

tasks.push({
text:input.value,
completed:false,
priority:prioritySelect.value
});

localStorage.setItem("tasks",JSON.stringify(tasks));
input.value="";
render();
};

input.addEventListener("keydown",(e)=>{
if(e.key==="Enter") addBtn.click();
});



function render(){
list.innerHTML="";

tasks.forEach((task,i)=>{
if(currentFilter==="pending"&&task.completed)return;
if(currentFilter==="completed"&&!task.completed)return;

const li=document.createElement("li");
li.className=`task ${task.priority}`+(task.completed?" completed":"");

const left=document.createElement("div");
left.className="left";

const check=document.createElement("input");
check.type="checkbox";
check.checked=task.completed;
check.onchange=()=>{
task.completed=!task.completed;
localStorage.setItem("tasks",JSON.stringify(tasks));
render();
};

const text=document.createElement("span");
text.textContent=`${task.text} (${task.priority})`;

left.appendChild(check);
left.appendChild(text);

const actions=document.createElement("div");
actions.className="actions";

const edit=document.createElement("button");
edit.className="edit";
edit.textContent="Edit";
edit.onclick=()=>{
const t=prompt("Edit task:",task.text);
if(t!==null&&t.trim()!==""){
task.text=t;
localStorage.setItem("tasks",JSON.stringify(tasks));
}
render();
};

const del=document.createElement("button");
del.className="del";
del.textContent="Delete";
del.onclick=()=>{
tasks.splice(i,1);
localStorage.setItem("tasks",JSON.stringify(tasks));
render();
};

actions.appendChild(edit);
actions.appendChild(del);

li.appendChild(left);
li.appendChild(actions);
list.appendChild(li);
});
}



filters.forEach(btn=>{
btn.onclick=()=>{
filters.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
currentFilter=btn.dataset.filter;
render();
};
});

render();
