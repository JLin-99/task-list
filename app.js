const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

function getTasks(e) {
  const lsTasks = localStorage.getItem("tasks");
  let tasks;
  if (lsTasks == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(lsTasks);
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    li.textContent = task;

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
    return;
  }

  // Create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  li.textContent = taskInput.value;

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "<i class='fa fa-remove'></i>";
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  const lsTasks = localStorage.getItem("tasks");
  let tasks;
  if (lsTasks == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(lsTasks);
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove this task?")) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  const lsTasks = JSON.parse(localStorage.getItem("tasks"));

  lsTasks.forEach(function (task, index) {
    if (taskItem.textContent == task) {
      lsTasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(lsTasks))
}

function clearTasks(e) {
  if (taskList.firstChild && confirm("Are you sure you want to clear all tasks?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
  }
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    }
  );
}