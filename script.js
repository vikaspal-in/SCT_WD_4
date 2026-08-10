let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

render();

}

function addTask(){

const text=document.getElementById("taskInput").value;

const date=document.getElementById("taskDate").value;

const time=document.getElementById("taskTime").value;

const priority=document.getElementById("priority").value;

if(text=="") return;

tasks.push({

text,

date,

time,

priority,

completed:false

});

document.getElementById("taskInput").value="";

save();

}

function render(filter="all"){

const list=document.getElementById("taskList");

list.innerHTML="";

let total=tasks.length;

let completed=tasks.filter(t=>t.completed).length;

let pending=total-completed;

document.getElementById("total").innerHTML="Total : "+total;

document.getElementById("completed").innerHTML="Completed : "+completed;

document.getElementById("pending").innerHTML="Pending : "+pending;

tasks.forEach((task,index)=>{

if(filter=="active" && task.completed) return;

if(filter=="completed" && !task.completed) return;

const li=document.createElement("li");

li.classList.add(task.priority.toLowerCase());

if(task.completed)

li.classList.add("done");

li.innerHTML=`

<div>

<h3>${task.text}</h3>

<p>${task.date} ${task.time}</p>

<p>${task.priority}</p>

</div>

<div class="actions">

<button onclick="toggle(${index})">✓</button>

<button onclick="editTask(${index})">✏</button>

<button onclick="removeTask(${index})">🗑</button>

</div>

`;

list.appendChild(li);

});

}

function toggle(i){

tasks[i].completed=!tasks[i].completed;

save();

}

function removeTask(i){

tasks.splice(i,1);

save();

}

function editTask(i){

const value=prompt("Edit Task",tasks[i].text);

if(value){

tasks[i].text=value;

save();

}

}

function filterTasks(type){

render(type);

}

render();