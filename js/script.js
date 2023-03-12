// 1. get the data from localStorage and show the todo List
// 2. add new item to the List
// 3. mark as completed
// 4. filter active, completed, all the list item
// 5. delete list items
// 6. edit task
// 7. drag and drop to rearrange

// get the data and show the list

window.onload = publishList;

function publishList() {
  let todoList = JSON.parse(localStorage.getItem("tasks")) || [];

  const listItems = document.getElementById("list-items");
  todoList.forEach((item) => publishItem(item));

  let itemsLeft = 0;
  let completed = 0;

  for (const item of todoList) {
    item.isCompleted ? completed++ : itemsLeft++;
  }
  document.getElementById("tasks-left").innerText = itemsLeft;
  document.getElementById("completed-tasks").innerText = completed;
}

// add new items on form submit

const form = document
  .querySelector("form")
  .addEventListener("submit", addNewItem);

function addNewItem(e) {
  e.preventDefault();
  let countItem = 0;
  const inputField = document.getElementById("input-field");
  let userInput = inputField.value;
  let todoList = JSON.parse(localStorage.getItem("tasks")) || [];

  // validate user input
  if (userInput.trim() == "") {
    alert("Please Enter a task");
    inputField.value = "";
    return;
  }

  // check is exist

  for (const item of todoList) {
    if (item.task == userInput.trim()) {
      alert("This task is already exist");
      inputField.value = "";
      return;
    }
  }

  const newItem = {
    task: inputField.value,
    isCompleted: false,
  };

  todoList = Array.from([
    ...(JSON.parse(localStorage.getItem("tasks")) || []),
    newItem,
  ]);
  localStorage.setItem("tasks", JSON.stringify(todoList));
  inputField.value = "";
  // publish new item
  publishItem(newItem);

  let itemsLeft = 0;

  for (const item of todoList) {
    item.isCompleted ? itemsLeft : itemsLeft++;
  }
  document.getElementById("tasks-left").innerText = itemsLeft;
}

// publish item
function publishItem(item) {
  const listItems = document.getElementById("list-items");
  const li = document.createElement("li");

  li.innerHTML = `<input type='checkbox' ${
    item.isCompleted ? "checked" : ""
  } onclick='toggleIsCompleted(this)' > <input value=${
    item.task
  }  onfocus="getCurrentTask(this)" onblur='editTask(this)' '/><button onclick='deleteItem(this)'>&times;</button>`;
  li.setAttribute("class", "active list-item");
  listItems.insertBefore(li, listItems.children[0]);

  if (item.isCompleted) {
    li.className = "list-item completed";
  }
}

// handle is completed
function toggleIsCompleted(elem) {
  const todoList = Array.from(JSON.parse(localStorage.getItem("tasks")));

  todoList.forEach((item) => {
    if (item.task === elem.nextElementSibling.value) {
      item.isCompleted = !item.isCompleted;
      elem.parentElement.classList.toggle("completed");
      elem.parentElement.classList.toggle("active");
    }
  });

  localStorage.setItem("tasks", JSON.stringify(todoList));

  let itemsLeft = 0,
    completed = 0;

  for (const item of todoList) {
    item.isCompleted ? completed++ : itemsLeft++;
  }
  document.getElementById("tasks-left").innerText = itemsLeft;
  document.getElementById("completed-tasks").innerText = completed;
}

const clearCompletedBtn = document
  .getElementById("clear-completed")
  .addEventListener("click", clearCompleted);

// clear completed
function clearCompleted() {
  let todoList = Array.from(JSON.parse(localStorage.getItem("tasks")));
  const completedListItems = document.querySelectorAll(".completed");

  todoList = todoList.filter((item) => !item.isCompleted);

  localStorage.setItem("tasks", JSON.stringify(todoList));
  completedListItems.forEach((item) => item.remove());
  document.getElementById("completed-tasks").innerText = 0;
}

// delete Item

const deleteItem = (elem) => {
  todoList = Array.from(JSON.parse(localStorage.getItem("tasks")));
  const targetElem = elem.parentElement.children[1];

  todoList.forEach((item, index) => {
    if (item.task == targetElem.value) {
      todoList.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(todoList));
  elem.parentElement.remove();

  let itemsLeft = 0;
  let completed = 0;

  for (const item of todoList) {
    item.isCompleted ? completed++ : itemsLeft++;
  }
  document.getElementById("tasks-left").innerText = itemsLeft;
  document.getElementById("completed-tasks").innerText = completed;
};

// show completed items
function showCompleted() {
  const listItems = document.querySelectorAll(".list-item");
  for (const item of listItems) {
    if (item.className.includes("completed")) {
      item.classList.remove("hide");
      continue;
    } else {
      item.classList.add("hide");
    }
  }
}

// show active item

function showActive() {
  const listItems = document.querySelectorAll(".list-item");
  for (const item of listItems) {
    if (item.className.includes("active")) {
      item.classList.remove("hide");
      continue;
    } else {
      item.classList.add("hide");
    }
  }
}

//show all items

function showAll() {
  const listItems = document.querySelectorAll(".list-item");
  for (const item of listItems) {
    item.classList.remove("hide");
  }
}


let currentTask;

// get current task

function getCurrentTask(elem) {
  currentTask = elem.value;
}

// edit tasks

function editTask(elem) {
  
    
      const listItems = Array.from(JSON.parse(localStorage.getItem("tasks")));
      if (elem.value.trim() === "") {
        alert("Please, Enter a task");
        elem.value = currentTask;
        return;
      }
      // is exist
      for (const item of listItems) {
        if (item.task.trim() === elem.value.trim()) {
          alert("This task is already exist");
          elem.value = currentTask;
          return;
        }
      }

      localStorage.setItem("tasks", JSON.stringify(listItems));
}


// drag and drop features


// localStorage.clear()
