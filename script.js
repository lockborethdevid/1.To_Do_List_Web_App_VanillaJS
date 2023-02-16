//Selectors
const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");
// console.log("Input", toDoInput);
// console.log("toDoList", toDoList);

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    // Create toDo div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("to-do");

    // Create li contain to do content and add to toDoDiv
    const newToDo = document.createElement("li");
    newToDo.innerText = todo;
    toDoDiv.appendChild(newToDo);

    // Create Edit Button and add to toDoDiv
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "edit-btn");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    toDoDiv.appendChild(editButton);

    // Create Delete Button and add to toDoDiv
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "delete-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    toDoDiv.appendChild(deleteButton);

    // Create Check Button and add to toDoDiv
    const checkButton = document.createElement("button");
    checkButton.classList.add("btn", "check-btn");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    toDoDiv.appendChild(checkButton);

    toDoList.appendChild(toDoDiv);
  });
};

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filterTodo.addEventListener("click", filterToDo);

//Functions
function addToDo(event) {
  // console.log("todoInput", toDoInput.value);
  //Prevent form from submitting
  event.preventDefault();
  if (toDoInput.value === "") {
    alert("Please enter a to do task");
    return;
  }
  // Create toDo div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("to-do");

  // Create li contain to do content and add to toDoDiv
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  toDoDiv.appendChild(newToDo);

  // Add to do to local storage
  saveTodoLocalStorage(toDoInput.value);

  // Create Edit Button and add to toDoDiv
  const editButton = document.createElement("button");
  editButton.classList.add("btn", "edit-btn");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  toDoDiv.appendChild(editButton);

  // Create Delete Button and add to toDoDiv
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "delete-btn");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  toDoDiv.appendChild(deleteButton);

  // Create Check Button and add to toDoDiv
  const checkButton = document.createElement("button");
  checkButton.classList.add("btn", "check-btn");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  toDoDiv.appendChild(checkButton);

  toDoList.appendChild(toDoDiv);
  //Clear toDoInput value
  toDoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  console.log("item", item.classList);
  // console.log("item", item);
  // console.log("item classList", item.classList);

  // // console.log("item", item.classList[0]);
  // // Delete to do
  if (item.classList[1] === "delete-btn") {
    const toDo = item.parentElement;
    // console.log("toDo", toDo);
    toDo.classList.add("fall");
    removeTodoLocalStorage(toDo);
    toDo.addEventListener("transitionend", function () {
      toDo.remove();
    });
    // toDo.remove();
  } else if (item.classList[1] === "fa-trash") {
    const toDo = item.parentElement.parentElement;
    toDo.classList.add("fall");
    removeTodoLocalStorage(toDo);
    toDo.addEventListener("transitionend", function () {
      toDo.remove();
    });
    // toDo.remove();
  }

  // Check to do
  if (item.classList[1] === "check-btn") {
    const toDo = item.parentElement;
    // console.log("toDo", toDo);
    toDo.classList.toggle("completed");
  } else if (item.classList[1] === "fa-check") {
    const toDo = item.parentElement.parentElement;
    toDo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const todos = toDoList.childNodes;
  console.log("todos", todos);
  todos.forEach((todo) => {
    // console.log("todo", todo);
    if (todo.nodeType === 1) {
      console.log("todo element", todo);
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

const saveTodoLocalStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoContent = todo.children[0].textContent;
  const todoIndex = todos.indexOf(todoContent);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
