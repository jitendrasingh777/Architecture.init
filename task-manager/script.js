const input=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const list=document.getElementById("taskList");
const filters=document.querySelectorAll(".filter-row button");

let tasks=[];
let currentFilter="all";

addBtn.onclick=()=>{
if(!input.value.trim())return;
tasks.push({text:input.value,completed:false});
input.value="";
render();
};

function render(){
list.innerHTML="";
tasks.forEach((task,i)=>{
if(currentFilter==="pending"&&task.completed)return;
if(currentFilter==="completed"&&!task.completed)return;

const li=document.createElement("li");
li.className="task"+(task.completed?" completed":"");

const left=document.createElement("div");
left.className="left";

const check=document.createElement("input");
check.type="checkbox";
check.checked=task.completed;
check.onchange=()=>{task.completed=!task.completed;render();};

const text=document.createElement("span");
text.textContent=task.text;

left.appendChild(check);
left.appendChild(text);

const actions=document.createElement("div");
actions.className="actions";

const edit=document.createElement("button");
edit.className="edit";
edit.textContent="Edit";
edit.onclick=()=>{
const t=prompt("Edit task:",task.text);
if(t!==null&&t.trim()!==""){task.text=t;}
render();
};

const del=document.createElement("button");
del.className="del";
del.textContent="Delete";
del.onclick=()=>{tasks.splice(i,1);render();};

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
